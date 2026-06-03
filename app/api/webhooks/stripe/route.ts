import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Stripe webhook signature error:', message)
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 })
  }

  const supabase = await createServiceClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const listingId = session.metadata?.listing_id
        const tier = session.metadata?.tier

        if (!listingId || !tier) break

        await supabase
          .from('ed_listings')
          .update({
            listing_tier: tier,
            listing_tier_rank: tier === 'featured' ? 2 : 1,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            updated_at: new Date().toISOString(),
          })
          .eq('id', listingId)

        await supabase.from('ed_payments').insert({
          listing_id: listingId,
          stripe_session_id: session.id,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          amount: session.amount_total || 0,
          currency: session.currency || 'usd',
          tier,
          status: 'paid',
        })
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const status = sub.status
        const customerId = sub.customer as string

        if (status === 'active') {
          const tierPrice = sub.items.data[0]?.price?.id
          const tier =
            tierPrice === process.env.STRIPE_FEATURED_PRICE_ID ? 'featured' : 'verified'

          await supabase
            .from('ed_listings')
            .update({
              listing_tier: tier,
              listing_tier_rank: tier === 'featured' ? 2 : 1,
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_customer_id', customerId)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = sub.customer as string

        await supabase
          .from('ed_listings')
          .update({
            listing_tier: 'free',
            listing_tier_rank: 0,
            stripe_subscription_id: null,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        console.error('Payment failed for customer:', invoice.customer)
        break
      }
    }
  } catch (err) {
    console.error('Webhook processing error:', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

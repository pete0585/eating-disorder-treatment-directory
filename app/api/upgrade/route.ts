import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PRICES } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const listingId = searchParams.get('listing_id')
  const tier = searchParams.get('tier') as 'verified' | 'featured' | null

  if (!listingId || !tier || !['verified', 'featured'].includes(tier)) {
    return NextResponse.json({ error: 'Missing listing_id or tier' }, { status: 400 })
  }

  return handleUpgrade(listingId, tier)
}

export async function POST(req: NextRequest) {
  let body: { listing_id?: string; tier?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { listing_id: listingId, tier } = body

  if (!listingId || !tier || !['verified', 'featured'].includes(tier)) {
    return NextResponse.json({ error: 'Missing listing_id or tier' }, { status: 400 })
  }

  return handleUpgrade(listingId, tier as 'verified' | 'featured')
}

async function handleUpgrade(listingId: string, tier: 'verified' | 'featured') {
  const supabase = await createServiceClient()
  const { data: listing, error } = await supabase
    .from('ed_listings')
    .select('id, provider_name, facility_name, listing_type, city, state')
    .eq('id', listingId)
    .single()

  if (error || !listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  const name =
    listing.listing_type === 'center'
      ? (listing.facility_name ?? listing.provider_name ?? 'Treatment Center')
      : (listing.provider_name ?? listing.facility_name ?? 'Provider')

  const priceId = STRIPE_PRICES[tier]
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eatingdisordertreatmentfinder.com'
  const profilePath =
    listing.listing_type === 'center'
      ? `/center/${listingId}`
      : `/provider/${listingId}`

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      listing_id: listingId,
      tier,
    },
    subscription_data: {
      metadata: {
        listing_id: listingId,
        tier,
      },
    },
    success_url: `${siteUrl}${profilePath}?upgraded=true`,
    cancel_url: `${siteUrl}${profilePath}`,
    customer_email: undefined,
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
    custom_text: {
      submit: {
        message: `Upgrade ${name} to ${tier.charAt(0).toUpperCase() + tier.slice(1)} tier`,
      },
    },
  })

  return NextResponse.redirect(session.url!, { status: 303 })
}

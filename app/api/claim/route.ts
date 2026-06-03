import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  let body: { listing_id?: string; email?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { listing_id: listingId, email } = body

  if (!listingId || !email) {
    return NextResponse.json({ error: 'listing_id and email are required' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data: listing, error: listingError } = await supabase
    .from('ed_listings')
    .select('id, provider_name, facility_name, listing_type, slug')
    .eq('id', listingId)
    .single()

  if (listingError || !listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()

  await supabase.from('ed_claims').insert({
    listing_id: listingId,
    email,
    token,
    verified: false,
    expires_at: expiresAt,
  })

  const name =
    listing.listing_type === 'center'
      ? (listing.facility_name ?? 'Treatment Center')
      : (listing.provider_name ?? 'Provider')

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eatingdisordertreatmentfinder.com'
  const verifyUrl = `${siteUrl}/claim/${listingId}?token=${token}`

  // Send via Resend
  const emailPayload = {
    from: process.env.RESEND_FROM_EMAIL || 'hello@mail.eatingdisordertreatmentfinder.com',
    to: email,
    subject: `Verify your claim for ${name} on Eating Disorder Treatment Finder`,
    html: `
      <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; color: #2D2535;">
        <h2 style="color: #6B4C96;">Verify Your Listing Claim</h2>
        <p>You requested to claim the listing for <strong>${name}</strong> on Eating Disorder Treatment Finder.</p>
        <p>Click the button below to verify ownership. This link expires in 72 hours.</p>
        <a href="${verifyUrl}" style="display: inline-block; background: #6B4C96; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 16px 0;">
          Verify My Listing
        </a>
        <p style="color: #666; font-size: 13px;">Or copy this link: ${verifyUrl}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
        <p style="color: #999; font-size: 12px;">If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    })

    if (!response.ok) {
      console.error('Resend error:', await response.text())
    }
  } catch (err) {
    console.error('Email send error:', err)
  }

  return NextResponse.json({ success: true })
}

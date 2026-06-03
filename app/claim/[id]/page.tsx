import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ClaimForm from './ClaimForm'
import { createClient } from '@/lib/supabase/server'
import { getDisplayName } from '@/lib/utils'
import { EDListing } from '@/lib/types'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ token?: string; verified?: string }>
}

export const metadata: Metadata = {
  title: 'Claim Your Listing',
  description: 'Claim and manage your eating disorder practice listing.',
  alternates: { canonical: '/submit' },
}

export default async function ClaimPage({ params, searchParams }: Props) {
  const { id } = await params
  const { token, verified } = await searchParams

  const supabase = await createClient()
  const { data: listing, error } = await supabase
    .from('ed_listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !listing) notFound()

  const typedListing = listing as EDListing
  const name = getDisplayName(typedListing)

  // Handle token verification
  if (token) {
    const { data: claim } = await supabase
      .from('ed_claims')
      .select('*')
      .eq('listing_id', id)
      .eq('token', token)
      .eq('verified', false)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (!claim) {
      return (
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✗</span>
          </div>
          <h1 className="text-2xl font-bold text-brand-charcoal mb-3">Link Expired or Invalid</h1>
          <p className="text-gray-600 mb-6">
            This verification link has expired or already been used. Request a new verification email.
          </p>
          <a href={`/claim/${id}`} className="btn-primary inline-block">
            Request New Link
          </a>
        </div>
      )
    }

    // Mark claim verified
    await supabase
      .from('ed_claims')
      .update({ verified: true, verified_at: new Date().toISOString() })
      .eq('id', claim.id)

    await supabase
      .from('ed_listings')
      .update({ claimed: true, claimed_at: new Date().toISOString() })
      .eq('id', id)

    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-brand-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold text-brand-charcoal mb-3">
          Listing Claimed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          You&apos;ve verified ownership of <strong>{name}</strong>. Upgrade to Verified or Featured to
          unlock your full profile and appear at the top of search results.
        </p>
        <a
          href={`/api/upgrade?listing_id=${id}&tier=verified`}
          className="btn-primary inline-block"
        >
          Upgrade to Verified — $149/yr
        </a>
      </div>
    )
  }

  if (verified === 'true') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-brand-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold text-brand-charcoal mb-3">Email Sent!</h1>
        <p className="text-gray-600">
          Check your inbox for a verification link for <strong>{name}</strong>. The link expires in
          72 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-brand-charcoal mb-2">Claim Your Listing</h1>
        <p className="text-gray-600 mb-6">
          Verify you&apos;re the owner of <strong>{name}</strong> to unlock profile editing and upgrade
          options.
        </p>
        <ClaimForm listingId={id} listingName={name} />
      </div>
    </div>
  )
}

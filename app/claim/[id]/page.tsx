import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ClaimForm from './ClaimForm'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'
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

    // Get monthly views for upgrade page
    const serviceClient = await createServiceClient()
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
    const { count: viewCount } = await serviceClient.from('listing_views').select('*', { count: 'exact', head: true })
      .eq('directory_slug', 'eating-disorder-treatment').eq('listing_id', id).gte('viewed_at', monthStart)
    const monthlyViews = viewCount ?? 0

    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-brand-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold text-brand-charcoal mb-3">
          Listing Claimed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          You&apos;ve verified ownership of <strong>{name}</strong>.
        </p>

        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-gray-900">{monthlyViews}</div>
          <div className="text-gray-500 mt-1">people viewed your profile this month</div>
          <div className="mt-3 text-red-600 font-semibold">0 could contact you — your phone and website are hidden</div>
        </div>

        <div className="space-y-3 mb-6 text-left">
          {([
            ['Your phone number visible to searchers', 'They can call you directly'],
            ['Your website linked', 'Drive traffic to your practice site'],
            ['Your full bio displayed', 'Build trust before they reach out'],
            ['Verified badge', 'Stand out from unclaimed profiles'],
          ] as [string, string][]).map(([title, sub]) => (
            <div key={title} className="flex items-start gap-3">
              <span className="text-green-500 text-lg">✓</span>
              <div><div className="font-medium">{title}</div><div className="text-sm text-gray-500">{sub}</div></div>
            </div>
          ))}
        </div>

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
    const serviceClient = await createServiceClient()
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
    const { count: viewCount } = await serviceClient.from('listing_views').select('*', { count: 'exact', head: true })
      .eq('directory_slug', 'eating-disorder-treatment').eq('listing_id', id).gte('viewed_at', monthStart)
    const monthlyViews = viewCount ?? 0

    return (
      <div className="max-w-lg mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand-charcoal mb-2">Upgrade Your Listing</h1>
          <p className="text-gray-600">Your listing for <strong>{name}</strong> is verified.</p>
        </div>

        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-gray-900">{monthlyViews}</div>
          <div className="text-gray-500 mt-1">people viewed your profile this month</div>
          <div className="mt-3 text-red-600 font-semibold">0 could contact you — your phone and website are hidden</div>
        </div>

        <div className="space-y-3 mb-6 text-left">
          {([
            ['Your phone number visible to searchers', 'They can call you directly'],
            ['Your website linked', 'Drive traffic to your practice site'],
            ['Your full bio displayed', 'Build trust before they reach out'],
            ['Verified badge', 'Stand out from unclaimed profiles'],
          ] as [string, string][]).map(([title, sub]) => (
            <div key={title} className="flex items-start gap-3">
              <span className="text-green-500 text-lg">✓</span>
              <div><div className="font-medium">{title}</div><div className="text-sm text-gray-500">{sub}</div></div>
            </div>
          ))}
        </div>

        <a
          href={`/api/upgrade?listing_id=${id}&tier=verified`}
          className="btn-primary inline-block w-full text-center"
        >
          Upgrade to Verified — $149/yr
        </a>
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

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin, Phone, Globe, CheckCircle, Star, ArrowLeft,
  Mail, Video, Building2, Shield
} from 'lucide-react'
import { getListingBySlug } from '@/lib/data'
import { getDisplayName, formatPhone, formatState } from '@/lib/utils'
import { createServiceClient } from '@/lib/supabase/server'
import { ViewTracker } from '@/components/ViewTracker'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  if (!listing) return {}

  const name = getDisplayName(listing)
  const locationStr = `${listing.city}, ${listing.state}`

  return {
    title: `${name} — Eating Disorder Treatment Center in ${locationStr}`,
    description:
      listing.bio ||
      `${name} is an eating disorder treatment center in ${locationStr}. Offering ${listing.levels_of_care?.join(', ') || 'residential and outpatient treatment'}.`,
    alternates: { canonical: `/center/${slug}` },
    openGraph: {
      title: `${name} — Eating Disorder Treatment Center`,
      description: listing.bio || `Eating disorder treatment center in ${locationStr}.`,
    },
  }
}

export default async function CenterPage({ params }: Props) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)

  if (!listing || listing.listing_type !== 'center') notFound()

  const isClaimed = listing.claimed === true
  const name = getDisplayName(listing)
  const stateName = formatState(listing.state)

  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  const supabase = await createServiceClient()
  const { count: viewCount } = await supabase.from('listing_views').select('*', { count: 'exact', head: true })
    .eq('directory_slug', 'eating-disorder-treatment').eq('listing_id', String(listing.id)).gte('viewed_at', monthStart)
  const monthlyViews = viewCount ?? 0

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address || undefined,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip || undefined,
      addressCountry: 'US',
    },
    telephone: listing.phone || undefined,
    url: listing.website_url || undefined,
    description: listing.bio || undefined,
    medicalSpecialty: 'MentalHealth',
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ViewTracker listingId={String(listing.id)} directorySlug="eating-disorder-treatment" />

        <Link
          href="/eating-disorder-treatment"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-plum mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to directory
        </Link>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-brand-plum/10 to-brand-teal-light h-24" />
          <div className="px-6 pb-6 -mt-10">
            <div className="flex items-end gap-4 mb-4">
              {listing.photo_url ? (
                <img
                  src={listing.photo_url}
                  alt={name}
                  className="w-20 h-20 rounded-xl border-4 border-white object-cover shadow"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl border-4 border-white bg-brand-plum-light flex items-center justify-center shadow">
                  <Building2 className="w-9 h-9 text-brand-plum" />
                </div>
              )}
              <div className="pb-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="badge-type-center">Treatment Center</span>
                  {listing.listing_tier === 'featured' && (
                    <span className="badge-tier-featured flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                  {listing.listing_tier === 'verified' && (
                    <span className="badge-tier-verified flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-brand-charcoal">{name}</h1>
                {listing.accreditations && listing.accreditations.length > 0 && (
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Shield className="w-3 h-3" />
                    {listing.accreditations.join(' · ')}
                  </p>
                )}
              </div>
            </div>

            {/* Location & options */}
            <div className="flex flex-wrap gap-4 mb-5">
              {(listing.city || listing.state) && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {listing.city}, {listing.state} — {stateName}
                </div>
              )}
              {listing.telehealth_available && (
                <div className="flex items-center gap-1.5 text-sm text-brand-teal">
                  <Video className="w-4 h-4" />
                  Virtual Program Available
                </div>
              )}
              {listing.accepting_new_patients && (
                <div className="flex items-center gap-1.5 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Accepting Admissions
                </div>
              )}
            </div>

            {/* CTA buttons — gated for unclaimed */}
            {isClaimed ? (
              <div className="flex flex-wrap gap-3">
                {listing.phone && (
                  <a
                    href={`tel:${listing.phone}`}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {formatPhone(listing.phone)}
                  </a>
                )}
                {listing.website_url && (
                  <a
                    href={listing.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    Visit Website
                  </a>
                )}
                {listing.email && (
                  <a
                    href={`mailto:${listing.email}`}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email Us
                  </a>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-500">Phone, website, and bio are only visible after this provider claims their listing.</p>
                <a href={`/claim/${listing.id}`} className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline">
                  Is this you? Claim your free profile →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Monthly views stats (claimed only) */}
        {isClaimed && (
          <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Profile Activity</p>
            <p className="mt-1 text-3xl font-bold text-blue-900">{monthlyViews}</p>
            <p className="text-sm text-blue-700">people viewed your profile this month</p>
            <p className="mt-2 text-xs text-blue-600">0 could contact you. <a href={`/claim/${listing.id}?upgrade=true`} className="underline font-medium">Upgrade to be reachable →</a></p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio — gated for unclaimed */}
            {isClaimed && listing.bio && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-brand-charcoal mb-3">About This Program</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{listing.bio}</p>
              </div>
            )}

            {listing.disorders_treated && listing.disorders_treated.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-brand-charcoal mb-3">Conditions Treated</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.disorders_treated.map((d) => (
                    <span key={d} className="text-sm bg-brand-plum-light text-brand-plum-dark px-3 py-1 rounded-full">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {listing.treatment_approaches && listing.treatment_approaches.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-brand-charcoal mb-3">Treatment Approaches</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.treatment_approaches.map((t) => (
                    <span key={t} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {listing.communities_served && listing.communities_served.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-brand-charcoal mb-3">Communities Served</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.communities_served.map((c) => (
                    <span key={c} className="text-sm bg-brand-rose-light text-rose-700 px-3 py-1 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {listing.levels_of_care && listing.levels_of_care.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-brand-charcoal mb-3">Levels of Care Offered</h3>
                <div className="space-y-1.5">
                  {listing.levels_of_care.map((l) => (
                    <div key={l} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {listing.ages_served && listing.ages_served.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-brand-charcoal mb-3">Ages Served</h3>
                <div className="flex flex-wrap gap-1.5">
                  {listing.ages_served.map((a) => (
                    <span key={a} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {listing.genders_served && listing.genders_served.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-brand-charcoal mb-3">Genders Served</h3>
                <div className="flex flex-wrap gap-1.5">
                  {listing.genders_served.map((g) => (
                    <span key={g} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {listing.insurance_accepted && listing.insurance_accepted.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-brand-charcoal mb-3">Insurance Accepted</h3>
                <div className="space-y-1">
                  {listing.insurance_accepted.map((ins) => (
                    <div key={ins} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                      {ins}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {listing.listing_tier === 'free' && (
              <div className="bg-brand-plum-light border border-brand-plum/20 rounded-xl p-5">
                <h3 className="font-semibold text-brand-plum mb-2">Manage this listing</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Claim to add photos, detailed program description, insurance info, and more.
                </p>
                <Link href={`/claim/${listing.id}`} className="btn-primary text-sm py-2 block text-center">
                  Claim Listing
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}

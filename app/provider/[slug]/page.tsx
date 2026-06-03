import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin, Phone, Globe, CheckCircle, Star, ArrowLeft,
  Mail, Video, Users, Heart
} from 'lucide-react'
import { getListingBySlug } from '@/lib/data'
import { getDisplayName, formatPhone, formatState } from '@/lib/utils'

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
    title: `${name}, Eating Disorder Therapist in ${locationStr}`,
    description:
      listing.bio ||
      `${name} is an eating disorder specialist in ${locationStr}. Offering ${listing.levels_of_care?.join(', ') || 'outpatient therapy'}.`,
    alternates: { canonical: `/provider/${slug}` },
    openGraph: {
      title: `${name} — Eating Disorder Specialist`,
      description: listing.bio || `Eating disorder provider in ${locationStr}.`,
    },
  }
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)

  if (!listing || listing.listing_type !== 'provider') notFound()

  const name = getDisplayName(listing)
  const stateName = formatState(listing.state)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
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
    medicalSpecialty: 'PsychiatricCare',
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/eating-disorder-treatment"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-plum mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to directory
        </Link>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-brand-lavender to-brand-teal-light h-24" />
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
                  <Heart className="w-9 h-9 text-brand-plum" />
                </div>
              )}
              <div className="pb-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="badge-type-provider">Provider</span>
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
                {listing.credentials && listing.credentials.length > 0 && (
                  <p className="text-sm text-gray-500">{listing.credentials.join(', ')}</p>
                )}
              </div>
            </div>

            {/* Location & contact */}
            <div className="flex flex-wrap gap-4 mb-5">
              {(listing.city || listing.state) && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {listing.city && listing.state
                    ? `${listing.city}, ${listing.state} — ${stateName}`
                    : listing.city || listing.state}
                </div>
              )}
              {listing.telehealth_available && (
                <div className="flex items-center gap-1.5 text-sm text-brand-teal">
                  <Video className="w-4 h-4" />
                  Telehealth Available
                </div>
              )}
              {listing.accepting_new_patients && (
                <div className="flex items-center gap-1.5 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Accepting New Patients
                </div>
              )}
            </div>

            {/* CTA buttons */}
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
                  Send Email
                </a>
              )}
              {!listing.claimed && (
                <Link
                  href={`/claim/${listing.id}`}
                  className="text-sm text-gray-500 hover:text-brand-plum border border-gray-200 px-4 py-2 rounded-lg transition-colors"
                >
                  Claim this listing
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            {listing.bio && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-brand-charcoal mb-3">About</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{listing.bio}</p>
              </div>
            )}

            {/* Disorders */}
            {listing.disorders_treated && listing.disorders_treated.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-brand-charcoal mb-3">Disorders Treated</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.disorders_treated.map((d) => (
                    <span
                      key={d}
                      className="text-sm bg-brand-plum-light text-brand-plum-dark px-3 py-1 rounded-full"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Treatment approaches */}
            {listing.treatment_approaches && listing.treatment_approaches.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-brand-charcoal mb-3">Treatment Approaches</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.treatment_approaches.map((t) => (
                    <span
                      key={t}
                      className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Communities */}
            {listing.communities_served && listing.communities_served.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-brand-charcoal mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-plum" />
                  Communities Served
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listing.communities_served.map((c) => (
                    <span
                      key={c}
                      className="text-sm bg-brand-rose-light text-rose-700 px-3 py-1 rounded-full"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Levels of care */}
            {listing.levels_of_care && listing.levels_of_care.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-brand-charcoal mb-3">Levels of Care</h3>
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

            {/* Ages served */}
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

            {/* Insurance */}
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

            {/* Upgrade CTA */}
            {listing.listing_tier === 'free' && (
              <div className="bg-brand-plum-light border border-brand-plum/20 rounded-xl p-5">
                <h3 className="font-semibold text-brand-plum mb-2">Is this your listing?</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Claim and upgrade to add photos, bio, specialties, and appear above free listings.
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

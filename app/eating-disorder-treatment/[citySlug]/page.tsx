import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, ArrowLeft } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'
import { parseCitySlug, formatState } from '@/lib/utils'

export async function generateStaticParams() {
  return [
    { citySlug: 'denver-co' },
    { citySlug: 'tucson-az' },
    { citySlug: 'chicago-il' },
    { citySlug: 'san-diego-ca' },
    { citySlug: 'tampa-fl' },
    { citySlug: 'houston-tx' },
    { citySlug: 'colorado-springs-co' },
    { citySlug: 'charlotte-nc' },
    { citySlug: 'philadelphia-pa' },
    { citySlug: 'jacksonville-fl' },
    { citySlug: 'atlanta-ga' },
    { citySlug: 'portland-or' },
    { citySlug: 'new-york-ny' },
    { citySlug: 'austin-tx' },
    { citySlug: 'seattle-wa' },
  ]
}

interface Props {
  params: Promise<{ citySlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug } = await params
  const parsed = parseCitySlug(citySlug)
  if (!parsed) return {}

  const { city, state } = parsed
  const stateName = formatState(state)

  return {
    title: `Eating Disorder Treatment in ${city}, ${state} — Therapists, Centers & Dietitians`,
    description: `Find eating disorder therapists, dietitians, and treatment programs in ${city}, ${stateName}. Compare providers by specialty, level of care, and insurance.`,
    alternates: { canonical: `/eating-disorder-treatment/${citySlug}` },
    openGraph: {
      title: `Eating Disorder Treatment in ${city}, ${state}`,
      description: `Find specialized eating disorder care in ${city}, ${stateName}.`,
    },
  }
}

export default async function CityPage({ params }: Props) {
  const { citySlug } = await params
  const parsed = parseCitySlug(citySlug)

  if (!parsed) notFound()

  const { city, state } = parsed
  const listings = await getListingsByCity(city, state, 50)

  if (listings.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-brand-charcoal mb-4">
          No listings found in {city}, {state}
        </h1>
        <p className="text-gray-600 mb-8">
          We haven&apos;t indexed providers in this city yet. Check back soon or search nearby cities.
        </p>
        <Link href="/eating-disorder-treatment" className="btn-primary inline-block">
          Browse All Providers
        </Link>
      </div>
    )
  }

  const centers = listings.filter((l) => l.listing_type === 'center')
  const providers = listings.filter((l) => l.listing_type === 'provider')
  const stateName = formatState(state)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link
            href="/eating-disorder-treatment"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-plum mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all providers
          </Link>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{city}, {state} &middot; {stateName}</span>
          </div>
          <h1 className="text-3xl font-bold text-brand-charcoal mb-3">
            Eating Disorder Treatment in {city}, {state}
          </h1>
          <p className="text-gray-600 max-w-2xl">
            {listings.length} eating disorder specialist{listings.length !== 1 ? 's' : ''} and treatment
            program{listings.length !== 1 ? 's' : ''} in {city}, {stateName} — including therapists,
            dietitians, psychiatrists, and residential programs.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Treatment Centers */}
        {centers.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-charcoal mb-5 flex items-center gap-2">
              Treatment Centers &amp; Programs
              <span className="text-sm font-normal text-gray-500">({centers.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {centers.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        )}

        {/* Individual Providers */}
        {providers.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-charcoal mb-5 flex items-center gap-2">
              Therapists, Dietitians &amp; Psychiatrists
              <span className="text-sm font-normal text-gray-500">({providers.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {providers.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        )}

        {/* FAQ structured data */}
        <section className="bg-white rounded-xl border border-gray-100 p-6 mt-6">
          <h2 className="text-xl font-bold text-brand-charcoal mb-5">
            Eating Disorder Treatment in {city} — FAQ
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                What types of eating disorder treatment are available in {city}?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {city} has providers offering multiple levels of eating disorder care — from weekly
                outpatient therapy and dietitian appointments to intensive outpatient (IOP), partial
                hospitalization (PHP), and, if needed, residential treatment programs. The right level
                of care depends on medical stability, weight, and how much support is needed daily.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                How do I find an ARFID specialist in {city}?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Filter this page by &quot;ARFID&quot; in the disorder type filter, or search for &quot;ARFID&quot; in the
                search bar. ARFID specialists are often pediatric OTs, SLPs, or psychologists with
                sensory processing training — not all general eating disorder therapists treat ARFID.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Does insurance cover eating disorder treatment in {city}?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Under the Mental Health Parity and Addiction Equity Act (MHPAEA), most insurance plans
                must cover eating disorder treatment at the same level as other medical conditions.
                Individual providers and treatment centers can share their insurance panels — use the
                insurance filter on this page to narrow your search.
              </p>
            </div>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: `What types of eating disorder treatment are available in ${city}?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${city} has providers offering multiple levels of eating disorder care — outpatient therapy, IOP, PHP, and residential treatment programs.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `How do I find an ARFID specialist in ${city}?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Filter by ARFID in the disorder type filter. ARFID specialists are often pediatric OTs, SLPs, or psychologists with sensory processing training.',
                  },
                },
              ],
            }),
          }}
        />
      </div>
    </div>
  )
}

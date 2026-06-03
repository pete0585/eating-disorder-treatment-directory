import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Eating Disorder Treatment in Denver, CO — Top Therapists & Programs',
  description:
    'Find top-rated eating disorder therapists, dietitians, and treatment programs in Denver, Colorado. 49+ providers covering all disorder types and levels of care.',
  alternates: { canonical: '/best/eating-disorder-treatment-in-denver-co' },
  openGraph: {
    title: 'Best Eating Disorder Treatment in Denver, CO',
    description:
      'Top eating disorder therapists, dietitians, and treatment centers in Denver, Colorado.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many eating disorder providers are in Denver, CO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Denver has 49+ eating disorder specialists in our directory, including individual therapists, registered dietitians, and treatment centers. Denver is one of the strongest markets for eating disorder care in the Mountain West, with both major treatment center programs (residential, PHP, IOP) and a robust network of outpatient specialists.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Denver have residential eating disorder treatment programs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Denver and the greater Denver-Boulder area have multiple residential eating disorder treatment programs, including programs operated by major national networks. Colorado\'s strong behavioral health infrastructure and proximity to mountain wellness environments makes it a regional hub for higher levels of eating disorder care. Filter by "Residential" on the browse page to find current programs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there ARFID specialists in Denver?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Denver has eating disorder specialists who treat ARFID, including providers at children\'s hospital affiliated programs and private practice occupational therapists with sensory processing training. Filter by "ARFID" on the browse page or use the disorder search on the Denver listing page to identify specialists.',
      },
    },
  ],
}

export default async function BestEDTreatmentDenver() {
  const listings = await getListingsByCity('Denver', 'CO', 50)
  const centers = listings.filter((l) => l.listing_type === 'center').slice(0, 6)
  const providers = listings.filter((l) => l.listing_type === 'provider').slice(0, 6)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-brand-plum py-12 px-4">
        <div className="max-w-5xl mx-auto text-white">
          <div className="flex items-center gap-2 text-brand-plum-light/70 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>Denver, Colorado</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Best Eating Disorder Treatment in Denver, CO
          </h1>
          <p className="text-brand-plum-light/80 text-lg max-w-2xl">
            Denver has {listings.length}+ eating disorder specialists — therapists, dietitians,
            and treatment centers covering all levels of care across the metro.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Context */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-xl font-bold text-brand-charcoal mb-3">
            Eating Disorder Care in Denver
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            Denver is the largest eating disorder care market in the Mountain West. The city
            has a high concentration of specialized providers — therapists trained in FBT and
            CBT-E, registered dietitians with ED specialties, and both independent outpatient
            practices and structured treatment center programs operating at PHP, IOP, and
            residential levels.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The Denver-Boulder corridor has become a regional hub for higher-level-of-care
            eating disorder programs, partly driven by the area&apos;s strong behavioral health
            infrastructure and the population of young adults in a high-pressure academic and
            outdoor-culture environment — a combination that correlates with elevated eating
            disorder prevalence. Families from Wyoming, New Mexico, and western Kansas frequently
            come to Denver for PHP and residential programs unavailable in their home states.
          </p>
        </section>

        {/* Centers */}
        {centers.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-charcoal mb-5">
              Treatment Centers &amp; Programs in Denver
              <span className="text-sm font-normal text-gray-500 ml-2">({centers.length} shown)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {centers.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        )}

        {/* Providers */}
        {providers.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-charcoal mb-5">
              Therapists &amp; Dietitians in Denver
              <span className="text-sm font-normal text-gray-500 ml-2">({providers.length} shown)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {providers.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        )}

        <div className="text-center mb-10">
          <Link
            href="/eating-disorder-treatment/denver-co"
            className="inline-flex items-center gap-2 bg-brand-plum text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-plum/90 transition-colors"
          >
            See All {listings.length} Denver Providers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* FAQ */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-xl font-bold text-brand-charcoal mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqJsonLd.mainEntity.map((faq, i) => (
              <div key={i}>
                <h3 className="font-semibold text-gray-800 mb-2">{faq.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nearby cities */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-brand-charcoal mb-4">Also Browse Nearby</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Colorado Springs, CO', slug: 'colorado-springs-co' },
              { label: 'Aurora, CO', slug: 'aurora-co' },
              { label: 'Boulder, CO', slug: 'boulder-co' },
              { label: 'Fort Collins, CO', slug: 'fort-collins-co' },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/eating-disorder-treatment/${city.slug}`}
                className="text-sm text-brand-plum bg-brand-plum-light px-3 py-1.5 rounded-full hover:bg-brand-plum hover:text-white transition-colors"
              >
                {city.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Submit CTA */}
        <div className="bg-gray-100 rounded-2xl p-6 text-center">
          <p className="text-gray-600 text-sm mb-3">
            Are you a Denver eating disorder provider not in the directory?
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 text-sm text-brand-plum font-semibold hover:underline"
          >
            Submit a listing — it&apos;s free
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  )
}

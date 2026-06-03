import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Eating Disorder Treatment in San Diego, CA — Top Therapists & Programs',
  description:
    'Find top-rated eating disorder therapists, dietitians, and treatment programs in San Diego, California. 42+ providers covering all disorder types and levels of care.',
  alternates: { canonical: '/best/eating-disorder-treatment-in-san-diego-ca' },
  openGraph: {
    title: 'Best Eating Disorder Treatment in San Diego, CA',
    description:
      'Top eating disorder therapists, dietitians, and treatment centers in San Diego, California.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many eating disorder providers are in San Diego, CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'San Diego has 42+ eating disorder specialists in our directory, including therapists, registered dietitians, and treatment centers. San Diego is one of the stronger markets for eating disorder care in Southern California, with a mix of private practice specialists and structured treatment programs at multiple levels of care.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does California insurance cover eating disorder treatment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'California has some of the strongest mental health parity laws in the country. The California Mental Health Parity Act and California Insurance Code Section 10144.5 require fully insured plans to cover eating disorder treatment. California\'s Department of Managed Health Care (DMHC) actively enforces parity — if your insurer denies coverage, you can file a complaint with DMHC in addition to your standard internal appeal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there eating disorder programs for athletes or college students in San Diego?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'San Diego\'s large military, college, and athletic communities create specific sub-populations with eating disorder presentations. UCSD and USD both have campus mental health resources. Several San Diego providers specialize in athletes and high-performance individuals — particularly relevant given San Diego\'s triathlon, surfing, and military fitness culture. Use the "Athletes" community filter to find relevant providers.',
      },
    },
  ],
}

export default async function BestEDTreatmentSanDiego() {
  const listings = await getListingsByCity('San Diego', 'CA', 50)
  const centers = listings.filter((l) => l.listing_type === 'center').slice(0, 6)
  const providers = listings.filter((l) => l.listing_type === 'provider').slice(0, 6)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-brand-plum py-12 px-4">
        <div className="max-w-5xl mx-auto text-white">
          <div className="flex items-center gap-2 text-brand-plum-light/70 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>San Diego, California</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Best Eating Disorder Treatment in San Diego, CA
          </h1>
          <p className="text-brand-plum-light/80 text-lg max-w-2xl">
            San Diego has {listings.length}+ eating disorder specialists — therapists, dietitians,
            and treatment centers across the city and North County.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Context */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-xl font-bold text-brand-charcoal mb-3">
            Eating Disorder Care in San Diego
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            San Diego has a well-developed eating disorder care ecosystem — a mix of private
            practice specialists trained at UCSD&apos;s psychology and medicine programs, and
            structured treatment centers at PHP and IOP levels that serve both local patients
            and those who travel for San Diego&apos;s lower-intensity residential alternatives.
          </p>
          <p className="text-gray-600 leading-relaxed">
            San Diego&apos;s demographics create specific clinical patterns: the large military
            and veteran population (Camp Pendleton, Naval Base San Diego) correlates with higher
            rates of disordered eating tied to fitness culture and deployment stress. The
            university population (UCSD, USD, SDSU) creates a significant collegiate eating
            disorder patient population. And the city&apos;s fitness and outdoor culture creates
            conditions for exercise addiction, orthorexia, and muscle dysmorphia that less
            culturally-aware providers may miss. California&apos;s strong insurance parity laws
            make coverage for higher levels of care more reliable here than in many other states.
          </p>
        </section>

        {/* Centers */}
        {centers.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-charcoal mb-5">
              Treatment Centers &amp; Programs in San Diego
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
              Therapists &amp; Dietitians in San Diego
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
            href="/eating-disorder-treatment/san-diego-ca"
            className="inline-flex items-center gap-2 bg-brand-plum text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-plum/90 transition-colors"
          >
            See All {listings.length} San Diego Providers
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
              { label: 'Los Angeles, CA', slug: 'los-angeles-ca' },
              { label: 'San Francisco, CA', slug: 'san-francisco-ca' },
              { label: 'Sacramento, CA', slug: 'sacramento-ca' },
              { label: 'Las Vegas, NV', slug: 'las-vegas-nv' },
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
            Are you a San Diego eating disorder provider not in the directory?
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

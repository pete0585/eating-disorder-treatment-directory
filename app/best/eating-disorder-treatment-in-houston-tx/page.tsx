import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Eating Disorder Treatment in Houston, TX — Top Therapists & Programs',
  description:
    'Find top-rated eating disorder therapists, dietitians, and treatment programs in Houston, Texas. Spanish-speaking providers, LGBTQ+-affirming care, and Texas Medical Center programs.',
  alternates: { canonical: '/best/eating-disorder-treatment-in-houston-tx' },
  openGraph: {
    title: 'Best Eating Disorder Treatment in Houston, TX',
    description:
      'Top eating disorder therapists, dietitians, and treatment centers in Houston, Texas — including Texas Medical Center specialists.',
  },
}

export const revalidate = 86400

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are there Spanish-speaking eating disorder providers in Houston?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Houston has a large Spanish-speaking population and several eating disorder therapists and dietitians who provide services in Spanish. When searching this directory, look for providers who list Spanish as a language of service. Texas Medical Center-affiliated programs also have access to medical interpreters for patients who need language support in clinical settings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Houston have IOP (intensive outpatient) eating disorder programs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Houston has a well-developed IOP market for eating disorders. Multiple programs offer structured IOP — typically 9-12 hours per week — that allow patients to maintain work, school, or family commitments while receiving more support than weekly individual therapy. IOP is appropriate for individuals who are medically stable but need daily meal support, group therapy, and structured accountability. Filter by "IOP" on the browse page to see current Houston programs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there LGBTQ+-affirming eating disorder providers in Houston?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Houston's Montrose and Midtown neighborhoods are historically LGBTQ+-affirming communities with concentrations of affirming mental health providers. Eating disorders affect LGBTQ+ individuals at higher rates than the general population — finding a provider who is specifically affirming (not just tolerant) matters for treatment outcomes. Look for providers who list LGBTQ+ as a community they serve in this directory, or ask directly when scheduling a consultation.",
      },
    },
  ],
}

export default async function BestEDTreatmentHouston() {
  const listings = await getListingsByCity('Houston', 'TX', 50)
  const centers = listings.filter((l) => l.listing_type === 'center').slice(0, 6)
  const providers = listings.filter((l) => l.listing_type === 'provider').slice(0, 6)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-brand-plum py-12 px-4">
        <div className="max-w-5xl mx-auto text-white">
          <div className="flex items-center gap-2 text-brand-plum-light/70 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>Houston, Texas</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Best Eating Disorder Treatment in Houston, TX
          </h1>
          <p className="text-brand-plum-light/80 text-lg max-w-2xl">
            Houston has {listings.length > 0 ? `${listings.length}+` : 'dozens of'} eating disorder
            specialists — therapists, dietitians, and treatment centers covering all levels of care
            across the metro.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Context */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-xl font-bold text-brand-charcoal mb-3">
            Eating Disorder Care in Houston
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            Houston is one of the most diverse cities in the United States, and its eating disorder
            treatment community reflects that diversity. Spanish-speaking therapists and dietitians
            serve the city&apos;s large Latino population, and BIPOC- and LGBTQ+-affirming practices are
            concentrated in the Montrose and Midtown neighborhoods.
          </p>
          <p className="text-gray-600 leading-relaxed mb-3">
            Texas Medical Center — the largest medical complex in the world — includes several
            specialty eating disorder programs within its network of hospitals and outpatient clinics.
            For patients needing higher levels of care, TMC-affiliated programs offer residential,
            PHP, and IOP treatment with multidisciplinary teams.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Houston&apos;s IOP (intensive outpatient) programs are particularly well-developed compared to
            other Texas cities, giving patients a strong option for structured support without
            full-day or residential commitment. For patients stepping down from residential or PHP,
            Houston&apos;s outpatient network supports a complete continuum of care.
          </p>
        </section>

        {/* Centers */}
        {centers.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-charcoal mb-5">
              Treatment Centers &amp; Programs in Houston
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
              Therapists &amp; Dietitians in Houston
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
            href="/eating-disorder-treatment/houston-tx"
            className="inline-flex items-center gap-2 bg-brand-plum text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-plum/90 transition-colors"
          >
            See All Houston Providers
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
              { label: 'Dallas, TX', slug: 'dallas-tx' },
              { label: 'Austin, TX', slug: 'austin-tx' },
              { label: 'San Antonio, TX', slug: 'san-antonio-tx' },
              { label: 'Fort Worth, TX', slug: 'fort-worth-tx' },
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
            Are you a Houston eating disorder provider not in the directory?
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

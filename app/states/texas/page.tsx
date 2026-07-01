import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Eating Disorder Treatment in Texas — Find Therapists & Programs',
  description:
    'Find eating disorder therapists, dietitians, and treatment centers in Texas. 275+ providers in Houston, Dallas, Austin, San Antonio, and beyond.',
  alternates: { canonical: 'https://eatingdisordertreatmentfinder.com/states/texas' },
  openGraph: {
    title: 'Eating Disorder Treatment in Texas',
    description:
      'Browse 275+ eating disorder providers in Texas — therapists, dietitians, and treatment centers across Houston, Dallas, Austin, and more.',
  },
}

export const revalidate = 86400

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Texas Medicaid cover eating disorder treatment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Texas Medicaid covers inpatient eating disorder treatment when medically necessary. Outpatient coverage varies by managed care organization (MCO) — Texas Medicaid operates through private MCOs like Amerigroup, Molina, and UnitedHealthcare Community Plan, each with different prior authorization processes for outpatient and IOP eating disorder care. Contact your specific MCO to verify outpatient and IOP benefits before starting treatment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is the best eating disorder treatment in Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Texas has strong eating disorder programs across its major cities. UT Southwestern Medical Center in Dallas has one of the most recognized eating disorder programs in the South, with both adult and adolescent services. Houston has a dense concentration of outpatient providers, IOP programs, and the resources of Texas Medical Center — the largest medical complex in the world. Austin has a growing network of outpatient specialists and is particularly strong for young adult and university-affiliated care.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there eating disorder residential programs in Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Texas has multiple eating disorder residential programs, primarily in the Dallas-Fort Worth and Houston metro areas. Programs operated by national treatment center networks (including Eating Recovery Center, Alsana, and others) have Texas locations. For families in rural Texas, residential programs in Dallas or Houston are often the nearest option — telehealth for outpatient step-down after residential is widely available.',
      },
    },
  ],
}

export default async function TexasStatePage() {
  const { listings } = await getListings({ state: 'TX' })
  const featured = listings.slice(0, 9)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-brand-plum py-12 px-4">
        <div className="max-w-5xl mx-auto text-white">
          <div className="flex items-center gap-2 text-brand-plum-light/70 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>Texas</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Eating Disorder Treatment in Texas
          </h1>
          <p className="text-brand-plum-light/80 text-lg max-w-2xl">
            Texas has 275+ eating disorder treatment providers across the state — find therapists,
            dietitians, and programs in Houston, Dallas, Austin, San Antonio, and Fort Worth.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Overview */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-xl font-bold text-brand-charcoal mb-3">
            Eating Disorder Care in Texas
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Texas has over 275 eating disorder treatment providers, with the largest concentrations
            in Houston, Dallas, Austin, and San Antonio. The state covers the full range of care
            levels — from outpatient individual therapy to residential treatment programs.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Texas Medicaid covers inpatient eating disorder treatment, though outpatient coverage
            varies by managed care organization. Patients on commercial insurance generally have
            access to a broader range of covered outpatient services under federal mental health
            parity laws.
          </p>
          <p className="text-gray-600 leading-relaxed">
            UT Southwestern Medical Center in Dallas has one of the most recognized eating disorder
            programs in the Southern United States, combining academic research with clinical care
            for adults and adolescents. Houston&apos;s Texas Medical Center — the largest medical complex
            in the world — includes several specialty eating disorder programs within its network of
            affiliated hospitals and outpatient clinics.
          </p>
        </section>

        {/* Cities */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-xl font-bold text-brand-charcoal mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Houston', slug: 'houston-tx' },
              { label: 'Dallas', slug: 'dallas-tx' },
              { label: 'Austin', slug: 'austin-tx' },
              { label: 'San Antonio', slug: 'san-antonio-tx' },
              { label: 'Fort Worth', slug: 'fort-worth-tx' },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/eating-disorder-treatment/${city.slug}`}
                className="flex items-center gap-2 text-sm text-brand-plum bg-brand-plum-light px-4 py-3 rounded-xl hover:bg-brand-plum hover:text-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                {city.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Featured listings */}
        {featured.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-charcoal mb-5">
              Featured Texas Providers
              <span className="text-sm font-normal text-gray-500 ml-2">({featured.length} shown)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/eating-disorder-treatment?state=TX"
                className="inline-flex items-center gap-2 bg-brand-plum text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-plum/90 transition-colors"
              >
                See All Texas Providers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}

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

        {/* Related states */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-brand-charcoal mb-4">Browse Other States</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'California', href: '/states/california' },
              { label: 'Florida', href: '/eating-disorder-treatment/tampa-fl' },
              { label: 'New York', href: '/eating-disorder-treatment/new-york-ny' },
              { label: 'Colorado', href: '/eating-disorder-treatment/denver-co' },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-sm text-brand-plum bg-brand-plum-light px-3 py-1.5 rounded-full hover:bg-brand-plum hover:text-white transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Submit CTA */}
        <div className="bg-gray-100 rounded-2xl p-6 text-center">
          <p className="text-gray-600 text-sm mb-3">
            Are you a Texas eating disorder provider not in the directory?
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

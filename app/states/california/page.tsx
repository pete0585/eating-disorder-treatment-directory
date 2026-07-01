import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Eating Disorder Treatment in California — Find Therapists & Programs',
  description:
    'Find eating disorder therapists, dietitians, and treatment centers in California. 300+ providers across Los Angeles, San Francisco, San Diego, Sacramento, and more.',
  alternates: { canonical: 'https://eatingdisordertreatmentfinder.com/states/california' },
  openGraph: {
    title: 'Eating Disorder Treatment in California',
    description:
      'Browse 300+ eating disorder providers in California — therapists, dietitians, and treatment centers across the state.',
  },
}

export const revalidate = 86400

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What eating disorders does Medi-Cal cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Since SB 855 took effect in January 2022, California Medi-Cal (Medicaid) is required to cover evidence-based treatment for all eating disorders — including anorexia nervosa, bulimia nervosa, binge eating disorder, ARFID, and OSFED — at all medically necessary levels of care (outpatient, IOP, PHP, residential). Prior to SB 855, insurers could impose arbitrary limits on residential and higher-level care; that practice is now prohibited under state law.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a referral for eating disorder treatment in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For outpatient therapists and dietitians, most California commercial insurance plans do not require a referral — you can call a provider directly. For treatment centers (PHP, IOP, residential), most insurers require prior authorization, which is typically requested by the treatment center\'s admissions team on your behalf. Some HMO plans (like Kaiser) do require primary care referrals before specialty mental health services.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best eating disorder programs in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'California has several nationally recognized eating disorder programs. UCLA\'s Eating Disorders Program and UCSF\'s eating disorder services are academic medical center programs with strong research ties. Cedars-Sinai in Los Angeles offers a comprehensive eating disorder track within its behavioral health division. Stanford Medicine has a highly regarded program for adolescents, particularly for anorexia nervosa using the Family-Based Treatment (Maudsley) model. Beyond academic centers, California has dozens of private treatment centers ranging from residential to outpatient levels throughout the state.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a HAES-affirming provider in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Health at Every Size (HAES)-affirming providers prioritize wellbeing over weight and use non-diet approaches in treatment. In California, HAES-aligned practitioners are most concentrated in the Bay Area and Los Angeles — search this directory and look for providers who list "HAES," "intuitive eating," or "weight-neutral" in their profile. The Association for Size Diversity and Health (ASDAH) also maintains a provider directory at sizediversityandhealth.org.',
      },
    },
  ],
}

export default async function CaliforniaStatePage() {
  const { listings } = await getListings({ state: 'CA' })
  const featured = listings.slice(0, 9)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-brand-plum py-12 px-4">
        <div className="max-w-5xl mx-auto text-white">
          <div className="flex items-center gap-2 text-brand-plum-light/70 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>California</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Eating Disorder Treatment in California
          </h1>
          <p className="text-brand-plum-light/80 text-lg max-w-2xl">
            California has 300+ eating disorder treatment providers — more than any other state.
            Find therapists, dietitians, and treatment programs near you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Overview */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-xl font-bold text-brand-charcoal mb-3">
            Eating Disorder Care in California
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            California leads the nation in eating disorder treatment resources. The state has more
            than 300 specialized providers — therapists, registered dietitians, and treatment
            centers — spread across its major metro areas and, increasingly, available via telehealth
            to rural and underserved communities.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            In 2022, California expanded Medi-Cal coverage for eating disorder treatment under SB 855,
            eliminating arbitrary insurance limits on residential and higher-level-of-care programs.
            This makes California one of the strongest states for insurance coverage of eating disorder
            treatment, particularly for patients on Medicaid.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Academic medical centers — UCLA, UCSF, Stanford, and Cedars-Sinai — all have dedicated
            eating disorder programs with research-backed protocols. Stanford&apos;s Family-Based Treatment
            (Maudsley method) program for adolescents is among the most cited in the country.
          </p>
        </section>

        {/* Cities */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-xl font-bold text-brand-charcoal mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Los Angeles', slug: 'los-angeles-ca' },
              { label: 'San Francisco', slug: 'san-francisco-ca' },
              { label: 'San Diego', slug: 'san-diego-ca' },
              { label: 'Sacramento', slug: 'sacramento-ca' },
              { label: 'San Jose', slug: 'san-jose-ca' },
              { label: 'Orange County', slug: 'anaheim-ca' },
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
              Featured California Providers
              <span className="text-sm font-normal text-gray-500 ml-2">({featured.length} shown)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/eating-disorder-treatment?state=CA"
                className="inline-flex items-center gap-2 bg-brand-plum text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-plum/90 transition-colors"
              >
                See All California Providers
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
              { label: 'Texas', href: '/states/texas' },
              { label: 'New York', href: '/eating-disorder-treatment/new-york-ny' },
              { label: 'Florida', href: '/eating-disorder-treatment/tampa-fl' },
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
            Are you a California eating disorder provider not in the directory?
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

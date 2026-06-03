import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Eating Disorder Treatment in Chicago, IL — Top Therapists & Programs',
  description:
    'Find top-rated eating disorder therapists, dietitians, and treatment programs in Chicago, Illinois. 44+ providers covering all disorder types and levels of care.',
  alternates: { canonical: '/best/eating-disorder-treatment-in-chicago-il' },
  openGraph: {
    title: 'Best Eating Disorder Treatment in Chicago, IL',
    description:
      'Top eating disorder therapists, dietitians, and treatment centers in Chicago, Illinois.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many eating disorder providers are in Chicago, IL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chicago has 44+ eating disorder specialists in our directory, including therapists, registered dietitians, and treatment centers at multiple levels of care. The Chicago metro area — including suburbs like Evanston, Oak Park, Naperville, and Schaumburg — has a dense network of specialized ED providers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Chicago have eating disorder programs for adolescents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Chicago has specialized eating disorder programs for adolescents, including programs with Family-Based Treatment (FBT/Maudsley) as the primary model, which is the gold-standard approach for adolescent anorexia and bulimia. Several children\'s hospital affiliated programs in the Chicago area offer multi-disciplinary adolescent eating disorder care. Use the "Adolescents" community filter to identify providers who specialize in this age group.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there eating disorder treatment centers in Chicago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Chicago has eating disorder treatment centers offering multiple levels of care — including residential, PHP, and IOP programs. Major national eating disorder treatment networks have programs in or near Chicago. The Illinois insurance market generally has strong parity protections, which can make accessing higher levels of care more achievable than in some other states.',
      },
    },
  ],
}

export default async function BestEDTreatmentChicago() {
  const listings = await getListingsByCity('Chicago', 'IL', 50)
  const centers = listings.filter((l) => l.listing_type === 'center').slice(0, 6)
  const providers = listings.filter((l) => l.listing_type === 'provider').slice(0, 6)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-brand-plum py-12 px-4">
        <div className="max-w-5xl mx-auto text-white">
          <div className="flex items-center gap-2 text-brand-plum-light/70 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>Chicago, Illinois</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Best Eating Disorder Treatment in Chicago, IL
          </h1>
          <p className="text-brand-plum-light/80 text-lg max-w-2xl">
            Chicago has {listings.length}+ eating disorder specialists — therapists, dietitians,
            and treatment centers serving the city and surrounding suburbs.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Context */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-xl font-bold text-brand-charcoal mb-3">
            Eating Disorder Care in Chicago
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            Chicago is the largest eating disorder care market in the Midwest. The city and its
            suburbs have a deep network of specialized ED providers — from individual CBT-E and
            DBT-trained therapists and CEDRD-credentialed dietitians to full treatment center
            programs with residential, PHP, and IOP tracks.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Northwestern Medicine, University of Chicago, and Lurie Children&apos;s Hospital all
            have eating disorder specialty programs that contribute to the training pipeline for
            the city&apos;s private practice ecosystem. Illinois&apos;s mental health parity
            enforcement is active, making insurance coverage for higher levels of care more
            reliable than in states with weaker enforcement. Providers throughout the greater
            metro — Evanston, Oak Park, Naperville, Schaumburg, and the North Shore suburbs —
            are included in the directory.
          </p>
        </section>

        {/* Centers */}
        {centers.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-charcoal mb-5">
              Treatment Centers &amp; Programs in Chicago
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
              Therapists &amp; Dietitians in Chicago
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
            href="/eating-disorder-treatment/chicago-il"
            className="inline-flex items-center gap-2 bg-brand-plum text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-plum/90 transition-colors"
          >
            See All {listings.length} Chicago Providers
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
              { label: 'Evanston, IL', slug: 'evanston-il' },
              { label: 'Naperville, IL', slug: 'naperville-il' },
              { label: 'Indianapolis, IN', slug: 'indianapolis-in' },
              { label: 'Milwaukee, WI', slug: 'milwaukee-wi' },
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
            Are you a Chicago eating disorder provider not in the directory?
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

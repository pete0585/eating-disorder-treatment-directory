import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByLevelOfCare } from '@/lib/data'
import { LEVELS_OF_CARE } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

const LOC_CONTENT: Record<string, {
  title: string
  subtitle: string
  description: string
  whoIsItFor: string
  whatToExpect: string
  faqs: Array<{ q: string; a: string }>
}> = {
  'residential': {
    title: 'Residential Eating Disorder Treatment',
    subtitle: '24/7 structured care for medical stabilization and intensive recovery',
    description: 'Residential treatment provides 24-hour structured support in a live-in setting. Appropriate for individuals who are medically unstable, at low weight, or unable to sustain recovery in a lower level of care.',
    whoIsItFor: 'Residential is typically recommended when someone is medically unstable (electrolyte imbalances, cardiac monitoring needed), at a dangerously low weight, unable to eat without constant support, or when outpatient and IOP/PHP have not been effective.',
    whatToExpect: 'Most residential stays run 4-12 weeks. Meals are supported by staff, medical monitoring happens daily, and the day is structured with individual therapy, group therapy, dietitian sessions, and family work. Average cost ranges from $30,000-100,000+ for a full stay — insurance coverage varies significantly by plan and state.',
    faqs: [
      { q: 'How long does residential eating disorder treatment last?', a: 'Most residential stays range from 4-12 weeks, depending on medical progress, weight restoration goals, and behavioral stabilization. Some individuals need shorter stays; others with medical complications may stay longer. Discharge planning typically starts in the first week.' },
      { q: 'Does insurance cover residential eating disorder treatment?', a: 'Under the Mental Health Parity Act, most commercial insurance plans must cover residential eating disorder treatment if it is medically necessary. Coverage varies significantly — copays, deductibles, and prior authorization requirements differ by plan. A treatment center\'s admissions team can verify your benefits before admission.' },
    ],
  },
  'partial-hospitalization': {
    title: 'Partial Hospitalization Program (PHP) for Eating Disorders',
    subtitle: '5-7 days/week intensive day treatment — home at night',
    description: 'PHP (Partial Hospitalization) is a structured day treatment program — typically 6-8 hours/day, 5 days a week — that provides intensive eating disorder support while allowing you to return home or to a sober living environment each night.',
    whoIsItFor: 'PHP is appropriate for individuals who are medically stable but still need multiple supported meals per day, intensive therapy, and structured support. It is often used as a step-down from residential or as a step up from IOP when outpatient is not sufficient.',
    whatToExpect: 'A typical PHP day includes 2-3 supported meals, individual therapy, group therapy (CBT, DBT, or FBT groups), dietitian sessions, and family therapy (especially for adolescents). PHP runs 5-6 hours per day. Average cost: $1,000-3,000/day — typically covered by insurance as medically necessary intensive outpatient care.',
    faqs: [
      { q: 'What is the difference between PHP and IOP for eating disorders?', a: 'PHP (Partial Hospitalization) typically runs 5-7 days/week for 6-8 hours/day and includes multiple supported meals. IOP (Intensive Outpatient) is typically 3 days/week for 3-4 hours/day and may include one supported meal. PHP provides more intensive support and is used earlier in recovery or when more structure is needed.' },
    ],
  },
  'intensive-outpatient': {
    title: 'Intensive Outpatient Program (IOP) for Eating Disorders',
    subtitle: '3-4 days/week group therapy with meal support',
    description: 'IOP (Intensive Outpatient) provides structured group and individual therapy 3-4 times per week, often including at least one supported meal per session. It allows you to maintain work, school, or family obligations while receiving more support than weekly outpatient therapy.',
    whoIsItFor: 'IOP is appropriate for individuals who are medically stable, able to manage most meals independently at home, and ready for the transition from more intensive care — or those who need more than weekly outpatient therapy but cannot do PHP or residential.',
    whatToExpect: 'IOP typically meets 3 evenings per week for 3-4 hours. Sessions include group therapy, individual therapy, and usually one supported meal or snack. Most IOP programs run 8-12 weeks. Average cost: $300-800/day.',
    faqs: [
      { q: 'Can I work or go to school while in eating disorder IOP?', a: 'Yes — IOP is specifically designed to fit around work and school schedules. Most programs offer morning, midday, or evening tracks. Many people successfully maintain employment or full-time school while in IOP, which is one of its main advantages over PHP or residential.' },
    ],
  },
  'outpatient': {
    title: 'Outpatient Eating Disorder Therapy',
    subtitle: 'Weekly individual therapy and dietitian appointments',
    description: 'Outpatient therapy is the most flexible level of eating disorder care — weekly or bi-weekly individual therapy sessions with an eating disorder specialist, often paired with dietitian appointments. Best for individuals who are medically stable and able to manage most meals independently.',
    whoIsItFor: 'Outpatient is appropriate for individuals who are medically stable, at a healthy weight (or in early recovery at a manageable weight), not engaging in daily binge/purge cycles, and have some support at home. It is also appropriate as a maintenance level of care after completing more intensive programs.',
    whatToExpect: 'Outpatient typically involves 1-2 therapy sessions per week and 1 dietitian appointment per week. Evidence-based approaches include CBT-E (Cognitive Behavioral Therapy — Enhanced), FBT (Family-Based Treatment for adolescents), DBT, and ACT. The gold-standard outpatient treatment for bulimia (CBT-E) typically runs 20 sessions over 20 weeks.',
    faqs: [
      { q: 'Do I need both a therapist and a dietitian for eating disorder outpatient treatment?', a: 'For most eating disorders, yes — a therapist-dietitian team provides the most comprehensive outpatient care. The therapist addresses the psychological and behavioral aspects; the dietitian addresses nutrition rehabilitation, meal planning, and food-related fears. Some individuals with BED work primarily with a therapist and add dietitian support as needed.' },
      { q: 'What is CBT-E for eating disorders?', a: 'CBT-E (Cognitive Behavioral Therapy — Enhanced) is the most evidence-based individual therapy for eating disorders in adults. Developed by Christopher Fairburn at Oxford, it addresses the maintaining factors of the eating disorder — overvaluation of shape/weight, dietary restriction, and other behaviors. It runs ~20 sessions for bulimia and up to 40 for complex cases of anorexia.' },
    ],
  },
  'telehealth': {
    title: 'Telehealth Eating Disorder Treatment',
    subtitle: 'Online therapy and dietitian appointments for eating disorder recovery',
    description: 'Telehealth eating disorder treatment allows you to work with an ED-specialized therapist and dietitian from home via secure video. Access expands dramatically with telehealth — particularly for ARFID, rural patients, and those with transportation barriers.',
    whoIsItFor: 'Telehealth is appropriate for individuals who are medically stable, able to manage most meals independently, and may be limited by geography, transportation, or schedule. Some programs (like Equip Health and Within Health) offer comprehensive virtual PHP/IOP, making higher levels of care accessible remotely.',
    whatToExpect: 'Telehealth sessions are conducted via HIPAA-compliant video platforms. Many therapists and dietitians see telehealth patients across state lines (where licensed). Virtual PHP and IOP programs provide the same structured treatment as in-person — group therapy, supported meals via video, individual therapy — all from home.',
    faqs: [
      { q: 'Is telehealth effective for eating disorder treatment?', a: 'Yes — multiple studies show that telehealth eating disorder treatment produces outcomes comparable to in-person care for many individuals. The biggest advantages are access and convenience. Telehealth is particularly valuable for ARFID (many specialists are in limited cities), for rural patients, and for anyone who needs to maintain work/school while in treatment.' },
      { q: 'Can I do eating disorder PHP or IOP via telehealth?', a: 'Yes — several virtual-only eating disorder programs offer full PHP and IOP via telehealth. Programs like Equip Health and Within Health operate nationally and provide family-based treatment (Equip, for adolescents) and adult PHP/IOP through video. These programs are typically covered by insurance as intensive outpatient care.' },
    ],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const content = LOC_CONTENT[slug]
  if (!content) return {}

  return {
    title: `${content.title} — Find Programs Near You`,
    description: content.description,
    alternates: { canonical: `/level-of-care/${slug}` },
  }
}

export default async function LevelOfCarePage({ params }: Props) {
  const { slug } = await params
  const content = LOC_CONTENT[slug]
  if (!content) notFound()

  const level = LEVELS_OF_CARE.find((l) => l.slug === slug)
  if (!level) notFound()

  const listings = await getListingsByLevelOfCare(slug, 12)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/eating-disorder-treatment"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-plum mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to directory
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <span className="bg-brand-teal-light px-3 py-1 rounded-full">Level of Care</span>
          </div>
          <h1 className="text-3xl font-bold text-brand-charcoal mb-2">{content.title}</h1>
          <p className="text-lg text-gray-500 mb-4">{content.subtitle}</p>
          <p className="text-gray-700 leading-relaxed">{content.description}</p>
        </div>

        {/* Who is it for / What to expect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-brand-charcoal mb-3">Who is this for?</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{content.whoIsItFor}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-brand-charcoal mb-3">What to expect</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{content.whatToExpect}</p>
          </div>
        </div>

        {/* Listings */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-brand-charcoal mb-5">
            {level.label} Providers
            {listings.length > 0 && (
              <span className="text-sm font-normal text-gray-500 ml-2">({listings.length} found)</span>
            )}
          </h2>
          {listings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-500 mb-4">No providers listed for this level of care yet.</p>
              <Link href="/eating-disorder-treatment" className="btn-primary inline-block">
                Browse All Providers
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-brand-charcoal mb-5">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {content.faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Other levels */}
        <section>
          <h2 className="text-lg font-bold text-brand-charcoal mb-4">Other Levels of Care</h2>
          <div className="flex flex-wrap gap-2">
            {LEVELS_OF_CARE.filter((l) => l.slug !== slug).map((l) => (
              <Link
                key={l.slug}
                href={`/level-of-care/${l.slug}`}
                className="text-sm text-brand-teal bg-brand-teal-light px-3 py-1.5 rounded-full hover:bg-brand-teal hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  )
}

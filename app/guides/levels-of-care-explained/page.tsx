import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Eating Disorder Levels of Care Explained',
  description:
    'Understand the five levels of eating disorder care — residential, PHP, IOP, outpatient, and telehealth. What each level involves, who it is for, and typical costs.',
  alternates: { canonical: '/guides/levels-of-care-explained' },
  openGraph: {
    title: 'Eating Disorder Levels of Care Explained',
    description:
      'Residential, PHP, IOP, outpatient, telehealth — what each level of eating disorder care involves and who it is for.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between PHP and IOP for eating disorders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PHP (Partial Hospitalization Program) typically runs 5-6 days per week for 6-8 hours per day and includes multiple supported meals. IOP (Intensive Outpatient Program) typically runs 3-4 days per week for 3-4 hours and may include one supported meal or snack. PHP provides more intensive support and medical monitoring, and is used when someone needs more structure than IOP can provide but does not need 24-hour residential care.',
      },
    },
    {
      '@type': 'Question',
      name: 'When does eating disorder treatment require residential care?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Residential treatment is typically recommended when someone is medically unstable (electrolyte imbalances, cardiac monitoring needed), at a dangerously low weight, unable to maintain safety at lower levels of care, or when outpatient, IOP, and PHP have not produced sufficient progress. The decision involves a physician and ED-trained therapist assessment. Adolescents may be admitted at higher weights than adults if medical instability is present.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is telehealth effective for eating disorder treatment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Telehealth has proven effective for outpatient eating disorder therapy and dietitian appointments for medically stable individuals. Research shows comparable outcomes to in-person therapy for bulimia, BED, and ARFID. Telehealth is generally not appropriate for residential, PHP, or IOP levels of care, which require in-person meal support and medical monitoring. Virtual IOP programs exist but are more appropriate for maintenance and step-down care than acute intervention.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does eating disorder treatment take at each level of care?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Residential stays typically run 4-12 weeks. PHP programs typically run 4-8 weeks before stepping down to IOP. IOP programs typically run 8-12 weeks. Outpatient therapy for eating disorder recovery typically runs 1-3 years, with session frequency decreasing as recovery progresses. Recovery is not linear — many people step up to higher levels of care during difficult periods and return to outpatient.',
      },
    },
  ],
}

const levels = [
  {
    slug: 'residential',
    title: 'Residential Treatment',
    subtitle: '24/7 structured live-in care',
    color: 'brand-plum',
    costRange: '$30,000–$100,000+',
    costNote: 'for a 4-8 week stay',
    timeCommitment: '24 hours/day, 4–12 weeks',
    whoForPoints: [
      'Medically unstable (electrolyte imbalances, cardiac arrhythmias)',
      'BMI below 15 or significant rapid weight loss',
      'Unable to maintain safety without constant support',
      'Multiple failed attempts at lower levels of care',
      'Active suicidality alongside the eating disorder',
    ],
    whatToExpect: 'Residents live at the treatment facility full-time. Days are structured with supported meals (typically 6 eating opportunities per day), individual therapy, group therapy, family sessions, dietitian appointments, and medical check-ins. The structure is the treatment — removing the ability to restrict, purge, or act on other ED behaviors while building the skills to do so independently.',
    insuranceNote: 'Most commercial insurance plans cover residential treatment as medically necessary under MHPAEA. Prior authorization is required. Coverage varies — typical stays may require significant out-of-pocket costs.',
    link: '/level-of-care/residential',
  },
  {
    slug: 'partial-hospitalization',
    title: 'Partial Hospitalization (PHP)',
    subtitle: 'Full-day programming — home at night',
    color: 'brand-teal',
    costRange: '$1,000–$3,000',
    costNote: 'per day',
    timeCommitment: '5–7 days/week, 6–8 hours/day',
    whoForPoints: [
      'Medically stable but needs multiple supported meals per day',
      'Stepping down from residential treatment',
      'Needs more structure than IOP but can sleep at home safely',
      'Requires daily medical monitoring or vital sign checks',
    ],
    whatToExpect: 'PHP days typically include breakfast and lunch at the program, individual therapy, multiple group sessions (CBT, DBT, or FBT-based), dietitian sessions, and family therapy (especially for adolescents). Most programs run Monday through Friday, with some Saturday programming. Evenings and weekends are spent at home or in a sober-living-style transitional residence.',
    insuranceNote: 'Typically covered by commercial insurance as intensive outpatient care. Prior authorization required. Some insurers distinguish PHP from IOP at different coverage tiers.',
    link: '/level-of-care/partial-hospitalization',
  },
  {
    slug: 'intensive-outpatient',
    title: 'Intensive Outpatient (IOP)',
    subtitle: '3–4 days/week group therapy with meal support',
    color: 'brand-rose',
    costRange: '$300–$800',
    costNote: 'per day',
    timeCommitment: '3–4 days/week, 3–4 hours/day',
    whoForPoints: [
      'Medically stable and able to manage most meals independently',
      'Stepping down from PHP',
      'Needs more than weekly outpatient therapy but can maintain work or school',
      'Living in a stable, supportive home environment',
    ],
    whatToExpect: 'IOP programs meet 3-4 evenings per week (or mornings for some). Sessions include group therapy (CBT, DBT, or meal process groups), individual therapy once weekly, and usually at least one supported meal or snack. Program duration is typically 8-12 weeks. IOP is specifically designed to fit around work and school schedules.',
    insuranceNote: 'Most commonly covered level of intensive care. Requires prior authorization. Benefits are often better than for residential because less expensive for the insurer.',
    link: '/level-of-care/intensive-outpatient',
  },
  {
    slug: 'outpatient',
    title: 'Outpatient Therapy',
    subtitle: 'Weekly individual therapy and/or dietitian',
    color: 'green-600',
    costRange: '$130–$250',
    costNote: 'per session',
    timeCommitment: '1–3 appointments/week',
    whoForPoints: [
      'Medically stable with no acute risk',
      'Able to manage meals without daily supported eating',
      'Early in the disorder with less medical severity',
      'Stepping down from IOP or PHP as a maintenance level',
    ],
    whatToExpect: 'Outpatient treatment typically involves weekly or biweekly sessions with a specialized therapist and possibly a separate registered dietitian. Evidence-based models at this level include CBT-E (for adults), Family-Based Treatment (for adolescents), and DBT. Many people in long-term outpatient therapy see significant recovery — outpatient is not just for mild cases.',
    insuranceNote: 'Most commonly covered level. Check your plan\'s mental health benefits — many plans now cover telehealth outpatient at in-person rates.',
    link: '/level-of-care/outpatient',
  },
  {
    slug: 'telehealth',
    title: 'Telehealth / Virtual',
    subtitle: 'Remote therapy and dietitian appointments',
    color: 'purple-600',
    costRange: '$100–$250',
    costNote: 'per session',
    timeCommitment: '1–3 appointments/week',
    whoForPoints: [
      'Medically stable and appropriate for outpatient-level care',
      'Limited local provider options (rural areas, niche specialties like ARFID)',
      'Schedule or access barriers to in-person appointments',
      'Preference for therapy in a familiar home environment',
    ],
    whatToExpect: 'Telehealth eating disorder care includes individual therapy, RD appointments, and some virtual IOP programs via secure video. Research shows telehealth is comparably effective to in-person for bulimia, BED, and outpatient anorexia care in medically stable patients. Telehealth is not appropriate for residential, PHP, or in-person IOP levels which require supervised meal support.',
    insuranceNote: 'Telehealth parity laws now require most commercial plans to cover telehealth at the same rate as in-person visits in most states.',
    link: '/level-of-care/telehealth',
  },
]

export default function LevelsOfCareGuide() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-brand-plum py-12 px-4">
        <div className="max-w-3xl mx-auto text-white">
          <div className="text-brand-plum-light/70 text-sm mb-3">
            <Link href="/eating-disorder-treatment" className="hover:text-white transition-colors">
              Browse Providers
            </Link>
            {' / '}
            <span>Guide</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Eating Disorder Levels of Care Explained
          </h1>
          <p className="text-brand-plum-light/80 text-lg">
            Residential, PHP, IOP, outpatient, and telehealth — what each means,
            who it&apos;s for, and what to expect.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <section className="prose prose-gray max-w-none mb-10">
          <p className="text-gray-700 leading-relaxed text-lg">
            &quot;Level of care&quot; is the term clinicians use to describe how intensive eating
            disorder treatment is. The right level is the one that matches how much daily support
            you need to maintain recovery behaviors — not necessarily the most intensive option
            available or the cheapest one your insurance approves. This guide walks through each
            level in plain terms.
          </p>
        </section>

        {levels.map((level, index) => (
          <section
            key={level.slug}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-6"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-2 py-1 rounded-full">
                  Level {index + 1}
                </span>
                <h2 className="text-2xl font-bold text-brand-charcoal mt-2">{level.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{level.subtitle}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-bold text-brand-plum">{level.costRange}</p>
                <p className="text-xs text-gray-400">{level.costNote}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Time Commitment</p>
                <p className="text-sm text-gray-600">{level.timeCommitment}</p>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">Who This Level is For</p>
              <ul className="space-y-1.5">
                {level.whoForPoints.map((point, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600">
                    <span className="text-brand-teal mt-0.5">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">What to Expect</p>
              <p className="text-sm text-gray-600 leading-relaxed">{level.whatToExpect}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
              <span className="font-semibold text-gray-700">Insurance: </span>
              {level.insuranceNote}
            </div>

            <div className="mt-5">
              <Link
                href={level.link}
                className="inline-flex items-center gap-1.5 text-sm text-brand-teal font-medium hover:underline"
              >
                Find {level.title} providers
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-6">
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

        {/* CTA */}
        <div className="bg-brand-plum rounded-2xl p-7 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Find Providers by Level of Care</h2>
          <p className="text-brand-plum-light/80 mb-5 text-sm">
            Filter by residential, PHP, IOP, outpatient, or telehealth — plus disorder type and city.
          </p>
          <Link
            href="/eating-disorder-treatment"
            className="inline-flex items-center gap-2 bg-white text-brand-plum font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Browse All Providers
            <ArrowRight className="w-4 h-4" />
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

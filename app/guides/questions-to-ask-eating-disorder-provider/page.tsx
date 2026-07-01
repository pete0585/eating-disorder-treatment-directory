import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: '15 Questions to Ask an Eating Disorder Provider Before Starting',
  description:
    'Asking the right questions before starting eating disorder treatment saves time, money, and avoids mismatched care. A practical checklist covering treatment approach, logistics, and red flags.',
  alternates: { canonical: '/guides/questions-to-ask-eating-disorder-provider' },
  openGraph: {
    title: '15 Questions to Ask an Eating Disorder Treatment Provider Before Starting',
    description:
      'A practical checklist for vetting eating disorder therapists and programs — what to ask, what to listen for, and red flags to avoid.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should I ask an eating disorder therapist at a first consultation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ask about their specific eating disorder training (beyond general licensure), what evidence-based models they use (FBT, CBT-E, DBT), whether they work with a registered dietitian, and how they approach weight restoration vs. weight-neutral care. The goal is to separate genuine ED specialists from generalist therapists who list eating disorders as one of many specialties.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a HAES-affirming eating disorder provider?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A HAES (Health at Every Size)-affirming provider focuses on wellbeing, eating behaviors, and relationship with food rather than weight loss or weight restoration as a primary goal. For patients with binge eating disorder and OSFED in particular, HAES-aligned treatment has strong evidence. For anorexia nervosa, weight restoration is medically necessary — a good provider can hold both perspectives without shaming.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it a red flag if a provider promises full recovery in a specific timeframe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Eating disorder recovery does not follow a fixed timeline. Providers who make promises about specific outcomes, guaranteed recovery timelines, or weight goals are overstating what any treatment can deliver. Evidence-based treatment gives the best chance of recovery, but recovery is a process that varies significantly by disorder type, severity, duration, and individual factors.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I ask about telehealth availability when choosing a provider?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — especially for ongoing outpatient therapy and dietitian sessions. Telehealth maintains continuity when you travel, are sick, or face scheduling challenges. Ask specifically whether the provider uses telehealth as a full option or only as a backup. Some higher-level care (meal support, PHP, residential) requires in-person attendance by design — but for weekly therapy and dietitian check-ins, telehealth works well for most patients.",
      },
    },
  ],
}

const questions = [
  {
    section: 'About the Provider',
    items: [
      {
        q: 'What eating disorder-specific training have you completed beyond your core licensure?',
        note: 'Look for: postgraduate ED training, supervised clinical hours with ED patients, certifications like CEDS (Certified Eating Disorders Specialist) or CEDRD (Certified Eating Disorders Registered Dietitian).',
      },
      {
        q: 'What evidence-based treatment models do you use?',
        note: 'Established ED models include FBT (Family-Based Treatment / Maudsley) for adolescents, CBT-E (Enhanced Cognitive Behavioral Therapy) for adults with anorexia or bulimia, DBT for emotional dysregulation and BED, and SSCM (Specialist Supportive Clinical Management) for anorexia.',
      },
      {
        q: 'Are you HAES-affirming? What is your philosophy around weight in treatment?',
        note: 'This matters for BED, OSFED, and patients who have experienced weight stigma in prior treatment. For anorexia, weight restoration is medically necessary — a good provider should be able to explain how they balance both without shaming.',
      },
      {
        q: 'Do you work collaboratively with a registered dietitian? Can you provide a referral?',
        note: 'For most eating disorders, a therapist-dietitian team produces better outcomes than therapy alone. A provider who does not work with RDs or dismisses dietitian involvement may not be following current best practices.',
      },
    ],
  },
  {
    section: 'About the Approach',
    items: [
      {
        q: 'Do you use structured meal plans, intuitive eating approaches, or both?',
        note: "The answer should reflect the type of disorder. Meal plans are standard early in anorexia recovery; intuitive eating principles are more applicable in BED and OSFED. A provider who gives the same answer for every disorder isn't tailoring treatment.",
      },
      {
        q: 'How do you approach weight restoration if it is medically necessary?',
        note: 'For restrictive eating disorders, weight restoration is a treatment goal — not just a side effect. Ask how it is discussed with patients, how it is monitored, and what the process looks like.',
      },
      {
        q: 'Do you involve family in treatment? What does that look like?',
        note: 'For adolescents, family involvement (especially FBT/Maudsley) is the gold standard. For adults, family involvement is more variable. Neither "always" nor "never" is the right answer for all cases.',
      },
      {
        q: 'How do you handle a crisis or a period when I am not making progress?',
        note: 'Ask about their process for level-of-care escalation — what triggers a referral to IOP or PHP, and how they communicate that transition.',
      },
    ],
  },
  {
    section: 'About Logistics and Cost',
    items: [
      {
        q: 'Do you take my insurance? Are you in-network or out-of-network?',
        note: 'For out-of-network providers, ask if they provide a superbill for reimbursement. Also ask about single case agreements if you strongly prefer their practice.',
      },
      {
        q: 'What are your self-pay rates? Do you offer a sliding scale?',
        note: "Eating disorder treatment can be expensive. Many providers offer sliding scale fees for patients without insurance coverage. Don't assume — ask directly.",
      },
      {
        q: 'Is telehealth available? Would I be able to do sessions remotely when needed?',
        note: 'Telehealth continuity matters — especially for patients who travel or have unpredictable schedules. Confirm whether they use video or phone, and whether telehealth is a full option or a backup.',
      },
      {
        q: 'What is your cancellation policy?',
        note: 'Late cancellation fees vary widely. Understand the policy upfront — eating disorder symptoms can affect whether a patient feels able to attend a session.',
      },
    ],
  },
]

const redFlags = [
  {
    flag: 'Providers who promise specific weight outcomes',
    detail: 'No ethical provider can promise what a patient\'s weight will be after treatment. "You will reach X lbs by Y date" is not an evidence-based claim.',
  },
  {
    flag: 'Providers who focus only on food rules without addressing underlying causes',
    detail: 'Eating disorders are not primarily food problems — they are complex disorders with psychological, genetic, and neurobiological components. A provider who only gives meal plans without addressing the psychological drivers is treating symptoms, not the disorder.',
  },
  {
    flag: 'Providers without eating disorder specialty training',
    detail: 'Any licensed therapist can legally treat eating disorders. "I work with eating disorders" should prompt follow-up: What is your specific training? What ED-focused CE have you completed? How many ED patients do you currently see?',
  },
  {
    flag: 'Programs that use punitive approaches or take away meals as consequences',
    detail: 'Removing meal access or using food as a reward/punishment is not evidence-based and can be harmful. Ethical programs use collaborative, compassionate approaches.',
  },
]

export default function QuestionsToAskGuide() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-brand-plum py-12 px-4">
        <div className="max-w-3xl mx-auto text-white">
          <div className="text-brand-plum-light/70 text-sm mb-3">
            <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
            {' / '}
            <span>Questions to Ask a Provider</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            15 Questions to Ask an Eating Disorder Treatment Provider Before Starting
          </h1>
          <p className="text-brand-plum-light/80 text-lg">
            Asking the right questions upfront saves time, money, and avoids mismatched care.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        <section className="prose prose-gray max-w-none mb-10">
          <p className="text-gray-700 leading-relaxed text-lg">
            Starting treatment is a huge step. But not all eating disorder providers are created
            equal — and mismatched care can waste months of time and thousands of dollars. A single
            15-minute consultation call, armed with the right questions, tells you most of what you
            need to know before committing to a provider.
          </p>
          <p className="text-gray-700 leading-relaxed">
            These questions are organized into three areas: what to ask about the provider
            themselves, what to ask about their treatment approach, and what to ask about logistics
            and cost. At the end, we cover red flags to watch for — responses that should give you
            pause regardless of how polished the provider appears.
          </p>
        </section>

        {questions.map((group) => (
          <section key={group.section} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
            <h2 className="text-2xl font-bold text-brand-charcoal mb-5">{group.section}</h2>
            <div className="space-y-5">
              {group.items.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="bg-brand-plum text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">{item.q}</p>
                    <p className="text-sm text-gray-600 leading-relaxed italic">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Red flags */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-2">Red Flags to Watch For</h2>
          <p className="text-gray-600 text-sm mb-5">
            These are responses or practices that should prompt serious reconsideration, regardless
            of the provider&apos;s credentials or reputation.
          </p>
          <div className="space-y-5">
            {redFlags.map((item, i) => (
              <div key={i} className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800 mb-1">{item.flag}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

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
          <h2 className="text-xl font-bold mb-2">Ready to Find a Provider?</h2>
          <p className="text-brand-plum-light/80 mb-5 text-sm">
            Search therapists, dietitians, and treatment centers filtered by disorder type,
            level of care, and location.
          </p>
          <Link
            href="/eating-disorder-treatment"
            className="inline-flex items-center gap-2 bg-white text-brand-plum font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Browse All Providers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related guides */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-brand-charcoal mb-4">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/guides/how-to-find-eating-disorder-treatment', title: 'How to Find Treatment', desc: 'Step-by-step guide from first call to first appointment' },
              { href: '/guides/levels-of-care-explained', title: 'Levels of Care Explained', desc: 'Residential, PHP, IOP, outpatient — what each means' },
              { href: '/guides/insurance-coverage-eating-disorders', title: 'Insurance Navigation', desc: 'How to use your insurance benefits for ED treatment' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-brand-plum transition-colors group">
                <p className="font-semibold text-brand-charcoal group-hover:text-brand-plum transition-colors mb-1 text-sm">{g.title}</p>
                <p className="text-xs text-gray-500">{g.desc}</p>
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

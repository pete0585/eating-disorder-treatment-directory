import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Insurance Coverage for Eating Disorder Treatment',
  description:
    'How to use your insurance for eating disorder treatment — the Mental Health Parity Act, verifying benefits, appealing denials, and single case agreements.',
  alternates: { canonical: '/guides/insurance-coverage-eating-disorders' },
  openGraph: {
    title: 'Insurance Coverage for Eating Disorder Treatment',
    description:
      'How the Mental Health Parity Act protects you, how to verify benefits, and how to appeal insurance denials for eating disorder care.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does insurance cover eating disorder treatment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the Mental Health Parity and Addiction Equity Act (MHPAEA), most commercial insurance plans must cover eating disorder treatment at the same level as other medical or surgical conditions. In practice, this means residential, PHP, IOP, and outpatient eating disorder treatment should all be covered when medically necessary. However, coverage varies by plan, and prior authorization is typically required for all levels above weekly outpatient.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a single case agreement for eating disorder treatment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A single case agreement (SCA) is a one-time agreement between your insurance company and an out-of-network provider to reimburse the provider at in-network rates for your specific treatment. SCAs are not guaranteed but are worth requesting when your preferred specialist does not take your insurance. Contact your insurance company\'s behavioral health department and provide the provider\'s credentials and clinical necessity information.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do if my insurance denies residential eating disorder treatment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Appeal the denial immediately. Every insurance denial can be appealed. Your treatment team can write a clinical letter of medical necessity. You can request an internal appeal, and if that fails, an independent external review. The NEDA Helpline (1-800-931-2237) offers free insurance navigation support and can help you understand your appeal rights. Many denials are overturned on appeal when supported by clinical documentation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does my employer\'s health plan have to cover eating disorder treatment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most employer-sponsored health plans are subject to MHPAEA and must cover eating disorder treatment at parity with medical conditions. Self-insured employer plans are subject to federal MHPAEA rules. Fully-insured plans in most states are subject to both federal MHPAEA and state mental health parity laws (some states have stronger parity protections). Individual market plans purchased through the ACA marketplace must include mental health coverage.',
      },
    },
  ],
}

export default function InsuranceCoverageGuide() {
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
            Insurance Coverage for Eating Disorder Treatment
          </h1>
          <p className="text-brand-plum-light/80 text-lg">
            The Mental Health Parity Act protects your right to coverage — here is how to use it.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 mb-1">Important: Get a clinical assessment first</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              Insurance coverage for higher levels of care (residential, PHP, IOP) requires medical
              necessity documentation from a physician or licensed clinician. Start with a clinical
              assessment — it is the foundation of every successful prior authorization and appeal.
            </p>
          </div>
        </div>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            The Mental Health Parity Act: Your Legal Protection
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Mental Health Parity and Addiction Equity Act (MHPAEA), strengthened by the
            Consolidated Appropriations Act of 2021, requires most commercial insurance plans to
            cover mental health and eating disorder treatment at the same level as other medical
            and surgical conditions.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            In plain terms: if your insurance covers a 30-day hospital stay for a broken leg,
            it must use the same standards for a 30-day residential eating disorder admission.
            If it covers 20 physical therapy sessions, it must apply the same criteria to 20
            sessions of eating disorder outpatient therapy.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            In practice, insurance companies frequently deny coverage for eating disorder treatment
            using medical necessity criteria that are stricter than those applied to physical
            conditions — which is illegal under MHPAEA. Knowing this gives you standing to appeal.
          </p>
          <div className="bg-brand-plum-light rounded-xl p-4 text-sm text-brand-charcoal">
            <span className="font-semibold">Key coverage scope:</span> MHPAEA applies to most
            employer-sponsored plans (including self-insured plans), fully insured plans, and
            ACA marketplace plans. It does not cover grandfathered individual plans or retiree-only
            plans. Medicaid managed care plans in most states are also covered.
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-5">
            Step-by-Step: How to Use Your Insurance for Eating Disorder Treatment
          </h2>
          <div className="space-y-6">
            {[
              {
                n: '1',
                title: 'Call the behavioral health number on the back of your insurance card',
                body: 'Most insurers have a separate behavioral health line. Ask: (1) Does my plan cover eating disorder treatment? (2) What levels of care are covered — outpatient, IOP, PHP, residential? (3) Is prior authorization required? (4) What is my out-of-pocket maximum and current deductible status? Get the representative\'s name and the call reference number.',
              },
              {
                n: '2',
                title: 'Have the treatment provider verify benefits before you start',
                body: 'Most treatment centers have dedicated admissions staff who handle insurance verification. They will call your insurance, request a benefits quote, and often identify prior authorization requirements. Individual therapists may not do this — ask their billing contact for a benefits verification before your first session.',
              },
              {
                n: '3',
                title: 'Obtain prior authorization before higher levels of care',
                body: 'For IOP, PHP, and residential, prior authorization (PA) is almost always required. Your treatment team initiates the PA with clinical documentation — diagnosis, assessment results, and justification for the requested level of care. PA can take 1-5 business days. Starting treatment before authorization may result in denied coverage — confirm before admission.',
              },
              {
                n: '4',
                title: 'Request a single case agreement for out-of-network specialists',
                body: 'If your preferred specialist or treatment center does not take your insurance, contact your insurance\'s behavioral health department and request a single case agreement (SCA). Provide the provider\'s NPI number, specialty, and the clinical necessity for that specific provider. SCAs are not guaranteed but are approved more often than people expect — especially for ARFID specialists or other subspecialties with few in-network providers.',
              },
              {
                n: '5',
                title: 'Appeal every denial',
                body: 'Insurance denials for eating disorder treatment are common and frequently overturned. You have the right to an internal appeal (reviewed within 60 days for standard, 72 hours for urgent) and, if that fails, an independent external review by a clinical reviewer not employed by your insurer. Your treatment provider can write a letter of medical necessity that addresses the specific denial reason. Document everything in writing.',
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-4">
                <div className="bg-brand-plum text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.n}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1.5">{item.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-5">
            Coverage by Level of Care
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-brand-plum text-white">
                  <th className="text-left p-3 rounded-tl-lg">Level of Care</th>
                  <th className="text-left p-3">Typical Coverage</th>
                  <th className="text-left p-3 rounded-tr-lg">PA Required?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Outpatient therapy', 'Covered by most plans; deductible/copay applies', 'Usually no (first sessions)'],
                  ['IOP', 'Covered by most plans as intensive outpatient', 'Usually yes'],
                  ['PHP', 'Covered under outpatient or inpatient benefits; varies', 'Yes'],
                  ['Residential', 'Covered as inpatient or residential behavioral health', 'Yes (often strict)'],
                  ['Telehealth', 'Covered at parity in most states post-2020', 'Usually no'],
                ].map(([loc, cov, pa]) => (
                  <tr key={loc} className="bg-white hover:bg-gray-50">
                    <td className="p-3 font-semibold text-brand-plum">{loc}</td>
                    <td className="p-3 text-gray-600">{cov}</td>
                    <td className="p-3 text-gray-500">{pa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Coverage varies significantly by plan and state. Use this as a starting point, not a guarantee.</p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Resources for Insurance Navigation
          </h2>
          <div className="space-y-3">
            {[
              { name: 'NEDA Helpline', desc: 'Free insurance navigation support. Call 1-800-931-2237 or text "NEDA" to 741741.', note: 'Free' },
              { name: 'NEDA Insurance Resources', desc: 'Scripts for calling insurance, appeal letter templates, and state-specific parity info.', note: 'Free' },
              { name: 'Eating Disorders Coalition', desc: 'Advocacy organization with state insurance parity resources and legislative updates.', note: 'Free' },
            ].map((r) => (
              <div key={r.name} className="flex justify-between items-start gap-4 py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                </div>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full flex-shrink-0">{r.note}</span>
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
          <h2 className="text-xl font-bold mb-2">Find a Provider Who Accepts Your Insurance</h2>
          <p className="text-brand-plum-light/80 mb-5 text-sm">
            Browse 2,000+ eating disorder providers and filter by insurance accepted, level of care, and location.
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

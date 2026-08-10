import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How Much Does Eating Disorder Treatment Cost? | EatingDisorderTreatmentFinder.com',
  description:
    'Eating disorder treatment costs range from $500/month for outpatient therapy to $1,500–$2,000/day for residential programs. Here is a full breakdown — and how to use insurance to reduce costs.',
  openGraph: {
    title: 'How Much Does Eating Disorder Treatment Cost?',
    description:
      'Outpatient to residential: what eating disorder treatment actually costs, how insurance works, and what financial assistance is available.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'How much does residential eating disorder treatment cost?',
    a: "Residential eating disorder treatment typically costs $1,200–$2,000 per day, or $36,000–$60,000 per month. A standard 30-day residential stay can run $50,000–$90,000 before insurance. These costs reflect 24-hour medical and psychiatric supervision, specialized dietary support, individual and group therapy, and around-the-clock nursing care. With insurance, your out-of-pocket cost depends on your plan's deductible, out-of-pocket maximum, and in-network status of the facility.",
  },
  {
    q: 'What does outpatient eating disorder treatment cost?',
    a: 'Outpatient therapy with an eating disorder specialist typically costs $150–$350 per session without insurance. A weekly therapist plus weekly dietitian appointment runs $300–$700/month at private pay rates. Intensive outpatient programs (IOP — 3 hours/day, 3–5 days/week) cost $300–$600 per day, or roughly $4,000–$8,000/month. Most insurance plans cover IOP when medical necessity criteria are met.',
  },
  {
    q: 'Does insurance cover eating disorder treatment?',
    a: 'Yes — the Mental Health Parity and Addiction Equity Act (MHPAEA) requires that mental health and substance use disorder benefits be covered at parity with medical benefits. Eating disorders are classified as mental health conditions, so insurers must cover eating disorder treatment under the same rules as other medical care. Coverage is not automatic — it depends on medical necessity documentation, level of care criteria, and whether the provider is in-network. Insurance denials are common and should be appealed; a treatment team experienced with insurance appeals is valuable.',
  },
  {
    q: 'What is the Mental Health Parity Act and how does it help?',
    a: 'The Mental Health Parity and Addiction Equity Act (MHPAEA, 2008) prohibits insurance plans from applying stricter benefit limits to mental health treatment than to medical/surgical treatment. For eating disorders, this means: if your plan covers hospital stays for medical conditions without a day limit, it cannot apply a day limit to eating disorder residential treatment. If it covers specialist visits for medical conditions, it must cover eating disorder specialist visits at the same rate. When an insurer denies eating disorder treatment, parity violations are frequently the basis for successful appeals.',
  },
  {
    q: 'Are there lower-cost eating disorder treatment options?',
    a: 'Yes. Community mental health centers often provide eating disorder therapy on a sliding scale. Training clinics at universities with clinical psychology programs offer supervised therapy at reduced rates. Some non-profits — including NEDA (National Eating Disorders Association) and Project HEAL — offer treatment navigation assistance and scholarship funding for individuals who cannot afford treatment. Some treatment centers also offer income-based financial assistance when other funding sources are exhausted.',
  },
]

const COST_ROWS = [
  { 'level': 'Individual Therapy (Outpatient)', 'private': '$150–$350/session', 'insurance': 'Copay $30–$80 in-network' },
  { 'level': 'Registered Dietitian (Outpatient)', 'private': '$100–$250/session', 'insurance': 'Often covered under medical benefits' },
  { 'level': 'Psychiatrist (Medication Management)', 'private': '$300–$600 initial, $100–$200 follow-up', 'insurance': 'Specialist copay $40–$100' },
  { 'level': 'Intensive Outpatient (IOP)', 'private': '$300–$600/day ($4k–$8k/month)', 'insurance': 'Covered when medically necessary' },
  { 'level': 'Partial Hospitalization (PHP)', 'private': '$600–$1,200/day ($12k–$25k/month)', 'insurance': 'Covered when medically necessary' },
  { 'level': 'Residential Treatment', 'private': '$1,200–$2,000/day ($36k–$60k/month)', 'insurance': 'Covered in-network; frequent prior auth denials' },
  { 'level': 'Inpatient Medical Stabilization', 'private': '$2,000–$4,000+/day', 'insurance': 'Covered as acute medical care' },
]

export default function EatingDisorderCostPage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="bg-gray-50 min-h-screen">
        <div className="bg-brand-plum py-12 px-4">
          <div className="max-w-3xl mx-auto text-white">
            <nav className="flex items-center gap-1.5 text-brand-plum-light/70 text-sm mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/listings" className="hover:text-white">Find Treatment</Link>
              <span>/</span>
              <span>Cost Guide</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
              How Much Does Eating Disorder Treatment Cost?
            </h1>
            <p className="text-brand-plum-light/80 text-lg">
              From weekly outpatient therapy to 24-hour residential care — and how insurance factors in at every level.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-brand-charcoal mb-5">Cost by Level of Care</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-plum text-white">
                    <th className="text-left p-3 font-semibold">Level of Care</th>
                    <th className="text-left p-3 font-semibold">Private Pay</th>
                    <th className="text-left p-3 font-semibold">With Insurance</th>
                  </tr>
                </thead>
                <tbody>
                  {COST_ROWS.map((row, i) => (
                    <tr key={row.level} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 font-medium text-brand-charcoal">{row.level}</td>
                      <td className="p-3 text-gray-600">{row.private}</td>
                      <td className="p-3 text-gray-600">{row.insurance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-charcoal mb-4">What Determines Your Out-of-Pocket Cost</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { factor: 'In-network vs. Out-of-network', detail: 'Specialized eating disorder programs are frequently out-of-network. Out-of-network care is covered at a lower reimbursement rate — or not at all on some plans. Verify network status before starting treatment.' },
                { factor: 'Deductible and OOP Maximum', detail: 'Most plans have an annual deductible ($1,000–$5,000) that must be met before insurance pays. Once your out-of-pocket maximum is hit (typically $5,000–$10,000), insurance covers 100%.' },
                { factor: 'Medical Necessity Authorization', detail: 'Insurance companies require prior authorization for PHP, residential, and inpatient levels. They use criteria (typically Milliman or InterQual) to determine if a higher level of care is "medically necessary."' },
                { factor: 'Parity Law Protections', detail: 'The Mental Health Parity Act requires insurers to cover mental health treatment at parity with medical benefits. Denials that violate parity can be appealed — and frequently are overturned.' },
              ].map((item) => (
                <div key={item.factor} className="bg-white border border-gray-200 rounded-xl p-5">
                  <p className="font-bold text-brand-charcoal mb-2">{item.factor}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-charcoal mb-4">When Treatment Is Denied</h2>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <p className="text-brand-charcoal font-semibold mb-3">Insurance denials are common — and often overturned on appeal.</p>
              <ul className="space-y-2">
                {[
                  'Request the denial reason in writing — insurers are required to provide it',
                  'Ask for a peer-to-peer review: your treatment provider speaks directly with the insurance medical reviewer',
                  'File a formal appeal with supporting clinical documentation from your treatment team',
                  'Request an external independent medical review (IMR) — available in most states',
                  'Contact your state insurance commissioner if parity law violations are suspected',
                ].map((step) => (
                  <li key={step} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-brand-plum font-bold mt-0.5">→</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-charcoal">Frequently Asked Questions</h2>
            {FAQ.map((faq) => (
              <div key={faq.q} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-brand-charcoal mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </section>

          <div className="bg-brand-plum rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Find an Eating Disorder Treatment Program</h2>
            <p className="text-brand-plum-light/80 mb-6 text-sm">
              Search programs by level of care, insurance accepted, and location. Filter for programs that take your insurance.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-white text-brand-plum font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Find Treatment Near Me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-bold text-brand-charcoal mb-3">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/insurance-coverage-eating-disorders" className="text-sm text-brand-plum hover:underline font-medium">Insurance Coverage Guide →</Link>
              <Link href="/guides/levels-of-care-explained" className="text-sm text-brand-plum hover:underline font-medium">Levels of Care Explained →</Link>
              <Link href="/guides/questions-to-ask-eating-disorder-provider" className="text-sm text-brand-plum hover:underline font-medium">Questions to Ask a Provider →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

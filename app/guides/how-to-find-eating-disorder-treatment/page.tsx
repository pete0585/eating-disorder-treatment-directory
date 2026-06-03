import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Find Eating Disorder Treatment',
  description:
    'A practical guide to finding eating disorder treatment — understanding levels of care, what to ask a potential provider, and how to navigate insurance.',
  alternates: { canonical: '/guides/how-to-find-eating-disorder-treatment' },
  openGraph: {
    title: 'How to Find Eating Disorder Treatment',
    description:
      'A practical guide to finding eating disorder treatment — levels of care, how to choose a provider, and insurance navigation.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where do I start looking for eating disorder treatment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start with your primary care physician or pediatrician for a medical evaluation and referral. For specialized therapists and dietitians, a niche directory like this one filters by disorder type and level of care, which general therapist directories cannot. For treatment centers, ask specifically about their disorder focus and whether they treat your specific eating disorder.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a therapist, dietitian, and treatment center for eating disorders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An eating disorder therapist provides psychotherapy (CBT-E, FBT, DBT) addressing the psychological drivers of the eating disorder. An ED-specialized registered dietitian addresses nutritional rehabilitation, meal planning, and the food relationship — they are not a replacement for therapy but a critical part of the treatment team. A treatment center provides structured, multi-disciplinary care at residential, PHP, or IOP levels — combining therapy, dietitian support, medical monitoring, and meals in one program.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know what level of care I need?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Level of care is determined by medical stability, weight status, ability to function at lower levels of support, and how much daily structure you need to maintain recovery behaviors. A physician and an ED-trained therapist can complete a formal level-of-care assessment. As a general rule: weekly outpatient therapy for medically stable individuals; IOP for those who need more structure without full-day support; PHP for medically stable but requiring multiple supported meals per day; residential for medical instability, very low weight, or repeated failed attempts at lower levels.',
      },
    },
    {
      '@type': 'Question',
      name: 'What questions should I ask a potential eating disorder therapist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Ask: What eating disorder training do you have beyond general mental health licensure? What evidence-based models do you use (FBT, CBT-E, DBT)? Have you treated my specific disorder (ARFID, BED, bulimia, anorexia)? What is your approach to weight restoration and nutritional rehabilitation? Do you work with a registered dietitian? How do you involve family, if at all? What does a typical session look like? These questions separate trained ED specialists from general therapists who list eating disorders as one of 20+ specialties.",
      },
    },
  ],
}

export default function HowToFindEDTreatmentGuide() {
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
            How to Find Eating Disorder Treatment
          </h1>
          <p className="text-brand-plum-light/80 text-lg">
            A practical guide for patients and families — from first call to first appointment.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        <section className="prose prose-gray max-w-none mb-10">
          <p className="text-gray-700 leading-relaxed text-lg">
            Finding eating disorder treatment is harder than it should be. Most therapist directories
            don&apos;t filter by specialty. Treatment center marketing is aggressive and not always
            honest. Insurance coverage is genuinely complicated. This guide cuts through the noise
            and tells you exactly what to do — and what to watch out for.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Step 1: Understand What Type of Provider You Need
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Eating disorder treatment involves multiple disciplines. Most people need more than
            one provider — often a therapist and a dietitian working as a team, with medical
            oversight from a physician when weight or medical complications are involved.
          </p>
          <div className="space-y-4">
            {[
              {
                title: 'Eating Disorder Therapist (LCSW, PhD, LPC, MFT)',
                body: 'Provides psychotherapy using evidence-based approaches: Family-Based Treatment (FBT/Maudsley) for adolescents, CBT-Enhanced (CBT-E) for adults with anorexia or bulimia, Dialectical Behavior Therapy (DBT) for emotional dysregulation and BED. Not all therapists who list eating disorders have actual specialty training — ask specifically about their ED training and models used.',
              },
              {
                title: 'Registered Dietitian (RD/RDN) — Eating Disorder Specialized',
                body: 'Addresses nutritional rehabilitation, meal support, and the food relationship. An ED-specialized RD is not a weight-loss dietitian — their goal is normalizing eating behavior, not restricting it. For anorexia and weight-restricting disorders, a dietitian is essential alongside the therapist. Look for credentials like CEDRD (Certified Eating Disorders Registered Dietitian) or specific ED training.',
              },
              {
                title: 'Psychiatrist (MD/DO)',
                body: 'Provides medical monitoring and manages co-occurring psychiatric conditions — depression, anxiety, OCD, ADHD — that frequently accompany eating disorders. Medications do not treat eating disorders directly but can reduce co-occurring symptoms that make recovery harder.',
              },
              {
                title: 'Treatment Center (Residential, PHP, or IOP)',
                body: 'Multi-disciplinary programs that combine all of the above in a structured setting. Residential is 24/7 live-in care. PHP is full-day programming (return home at night). IOP is part-time (typically 3 evenings/week). Treatment centers are appropriate when outpatient individual therapy is not providing enough support.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Step 2: Determine the Right Level of Care
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Level of care matches the intensity of support to the severity of the eating disorder.
            The American Psychiatric Association&apos;s guidelines and ASAM criteria provide a
            framework — but in practice, a physician plus an ED-trained therapist should conduct
            the assessment.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-brand-plum text-white">
                  <th className="text-left p-3 rounded-tl-lg">Level of Care</th>
                  <th className="text-left p-3">Who It&apos;s For</th>
                  <th className="text-left p-3 rounded-tr-lg">Time Commitment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Outpatient', 'Medically stable, able to manage most meals independently', '1–3 hours/week'],
                  ['IOP', 'Needs more structure; can maintain work or school', '9–12 hours/week'],
                  ['PHP', 'Medically stable but needs multiple supported meals per day', '30–40 hours/week'],
                  ['Residential', 'Medically unstable, very low weight, or not responding to lower LOC', '24/7 live-in'],
                ].map(([loc, who, time]) => (
                  <tr key={loc} className="bg-white hover:bg-gray-50">
                    <td className="p-3 font-semibold text-brand-plum">{loc}</td>
                    <td className="p-3 text-gray-600">{who}</td>
                    <td className="p-3 text-gray-500">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            See our detailed{' '}
            <Link href="/guides/levels-of-care-explained" className="text-brand-teal hover:underline">
              levels of care guide
            </Link>{' '}
            for a full breakdown.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Step 3: Questions to Ask a Potential Provider
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Most therapist directories do not verify specialty claims. &quot;I treat eating
            disorders&quot; can mean anything from a 3-hour online CE course to 10 years of
            supervised clinical training. Ask directly.
          </p>
          <div className="space-y-3">
            {[
              'What eating disorder-specific training have you completed beyond your core licensure?',
              'What evidence-based treatment models do you use? (FBT, CBT-E, DBT, HAES — ask about specific approaches)',
              'Have you treated my specific disorder? (ARFID, BED, and bulimia require different skills than anorexia)',
              'Do you work collaboratively with a registered dietitian? Can you make a referral?',
              'How do you approach weight restoration vs. weight-neutral care?',
              'What is your policy for medical emergencies or hospitalization if I become medically unstable?',
              'Do you involve family in treatment? How?',
              'What does your cancellation policy look like — I want to know I can reach you in a crisis.',
            ].map((q, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="bg-brand-plum text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Step 4: Navigate Insurance
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Mental Health Parity and Addiction Equity Act (MHPAEA) requires most commercial
            insurance plans to cover eating disorder treatment at the same level as other medical
            conditions. In practice, coverage requires persistence. Here is what actually works:
          </p>
          <div className="space-y-4">
            {[
              {
                step: 'Call your insurance before starting treatment',
                detail: 'Ask: Does my plan cover eating disorder treatment? What levels of care are covered (outpatient, IOP, PHP, residential)? What is the prior authorization process? What is my out-of-pocket maximum?',
              },
              {
                step: 'Get the treatment center or provider to verify benefits for you',
                detail: 'Most treatment centers have a dedicated admissions team that will call your insurance and verify coverage before you commit. Individual therapists may not do this — ask your therapist\'s billing contact.',
              },
              {
                step: 'Request a single case agreement if your provider is out-of-network',
                detail: 'If your preferred provider does not take your insurance, you can request a single case agreement (SCA) from your insurance company — an agreement to reimburse at in-network rates for that specific provider. These are not guaranteed but are worth requesting, especially for specialized care.',
              },
              {
                step: 'Appeal denials',
                detail: 'Insurance companies frequently deny prior authorizations for higher levels of care. Every denial can be appealed. Your treatment provider can write a clinical letter of necessity. The NEDA helpline (1-800-931-2237) can connect you with insurance navigation support.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="bg-brand-plum-light text-brand-plum font-bold text-lg w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">{item.step}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-5">
            See our full{' '}
            <Link href="/guides/insurance-coverage-eating-disorders" className="text-brand-teal hover:underline">
              insurance navigation guide
            </Link>{' '}
            for more detail.
          </p>
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
            Search 2,000+ therapists, dietitians, and treatment centers filtered by disorder type,
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
              { href: '/guides/levels-of-care-explained', title: 'Levels of Care Explained', desc: 'Residential, PHP, IOP, outpatient — what each means and who needs it' },
              { href: '/guides/arfid-specialists', title: 'Finding an ARFID Specialist', desc: 'ARFID requires a different type of provider than most ED therapists' },
              { href: '/guides/insurance-coverage-eating-disorders', title: 'Insurance Navigation', desc: 'How to use your insurance benefits for eating disorder treatment' },
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

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Binge Eating Disorder Treatment: What Actually Works | EatingDisorderTreatmentFinder.com',
  description:
    'BED is the most common eating disorder in the United States — and among the most undertreated. Here is what evidence-based treatment looks like, who provides it, and how to find help.',
  openGraph: {
    title: 'Binge Eating Disorder Treatment: What Actually Works',
    description:
      'BED affects 2.8 million Americans. Here is the evidence on CBT, DBT, medication, and how to find specialized treatment.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Is binge eating disorder a real medical condition?',
    a: 'Yes. Binge Eating Disorder (BED) was added to the DSM-5 in 2013 as a stand-alone eating disorder diagnosis — the same diagnostic manual used for anorexia and bulimia. BED is characterized by recurrent episodes of eating a large amount of food in a short period, accompanied by a sense of loss of control and marked distress afterward. It affects approximately 2.8 million Americans across all body sizes, genders, and backgrounds. BED is the most common eating disorder in the United States, more common than anorexia and bulimia combined.',
  },
  {
    q: 'What does evidence-based BED treatment look like?',
    a: 'The strongest evidence for BED is for Cognitive Behavioral Therapy (CBT) — specifically a structured protocol that addresses the thoughts, feelings, and behaviors maintaining the binge cycle. CBT for BED typically runs 16–20 sessions. Dialectical Behavior Therapy (DBT) adapted for eating disorders has strong evidence for BED, particularly for individuals with significant emotional dysregulation. A registered dietitian specializing in eating disorders provides nutritional rehabilitation and works on normalized eating — essential alongside therapy. For some individuals, medication (see below) is part of the treatment plan.',
  },
  {
    q: 'Is there medication for binge eating disorder?',
    a: 'Yes. Vyvanse (lisdexamfetamine) is the only FDA-approved medication specifically for moderate-to-severe BED in adults. Clinical trials showed a significant reduction in binge episodes compared to placebo. Some psychiatrists also use topiramate (off-label) or SSRIs, which have evidence for reducing binge frequency, though medication alone is not considered sufficient — it works best combined with therapy. Medication decisions should be made with a psychiatrist who understands eating disorders.',
  },
  {
    q: 'Can I treat BED without therapy — through diet and willpower?',
    a: 'Restrictive dieting typically makes BED worse, not better. The restrict-binge cycle is often maintained by food restriction: limiting intake during the day creates hunger and food preoccupation that drives binge episodes. Evidence-based BED treatment explicitly avoids caloric restriction and instead focuses on normalized eating, addressing the emotional and psychological triggers for bingeing, and developing distress tolerance skills. Recovery from BED is possible — but it requires treating the psychological pattern, not just the food behavior.',
  },
  {
    q: 'How do I find a therapist who specializes in binge eating disorder?',
    a: 'Look for therapists credentialed as Certified Eating Disorder Specialists (CEDS) through the International Association of Eating Disorders Professionals (IAEDP) or listed in the directory. Ask specifically about CBT-E (Enhanced Cognitive Behavioral Therapy for Eating Disorders) or DBT-E training. Your outpatient team should include a therapist and a registered dietitian — ideally both with eating disorder specialization. General therapists and dietitians without eating disorder training often do not provide the specific protocols that have evidence for BED.',
  },
]

export default function BingeEatingDisorderTreatmentPage() {
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
              <span>Binge Eating Disorder</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
              Binge Eating Disorder Treatment: What Actually Works
            </h1>
            <p className="text-brand-plum-light/80 text-lg">
              BED is the most common eating disorder in the United States — and among the most undertreated.
              Evidence-based treatment exists. Here is what it looks like.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-brand-charcoal mb-4">Understanding Binge Eating Disorder</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Binge Eating Disorder (BED) is characterized by recurrent episodes of eating a large amount of food
              in a short time — accompanied by a feeling of loss of control and significant distress afterward.
              Unlike bulimia, there is no compensatory purging. Unlike stress eating or emotional eating, BED
              involves a clinical pattern that causes meaningful life disruption.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { stat: '2.8M', label: 'Americans with BED', note: 'More common than anorexia and bulimia combined' },
                { stat: '3.5%', label: 'Women affected lifetime', note: 'vs. 2% for bulimia, 0.9% for anorexia' },
                { stat: '< 50%', label: 'Who receive treatment', note: 'The most undertreated eating disorder' },
              ].map((item) => (
                <div key={item.stat} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                  <div className="text-3xl font-extrabold text-brand-plum mb-1">{item.stat}</div>
                  <div className="font-semibold text-brand-charcoal text-sm mb-1">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.note}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-charcoal mb-4">Evidence-Based Treatments</h2>
            <div className="space-y-4">
              {[
                {
                  name: 'Cognitive Behavioral Therapy (CBT-E)',
                  evidence: 'First-line',
                  detail: 'Enhanced CBT for eating disorders is the most researched and widely recommended therapy for BED. It targets the thoughts, behaviors, and mood triggers that maintain the binge cycle — not food restriction. A structured 16–20 session protocol. Delivered by a CEDS-credentialed therapist with CBT-E training.',
                },
                {
                  name: 'Dialectical Behavior Therapy (DBT)',
                  evidence: 'Strong evidence',
                  detail: 'DBT adapted for eating disorders has substantial evidence for BED, especially when emotional dysregulation (intense emotions triggering binge episodes) is a core feature. DBT adds distress tolerance, emotional regulation, and interpersonal effectiveness skills alongside the core eating disorder focus.',
                },
                {
                  name: 'Vyvanse (lisdexamfetamine)',
                  evidence: 'FDA-approved for BED',
                  detail: 'The only FDA-approved medication for moderate-to-severe BED. Demonstrated significant reduction in binge episode frequency in clinical trials. Requires psychiatric evaluation and ongoing monitoring. Best used in combination with therapy — medication alone without addressing the underlying patterns has limited lasting effect.',
                },
                {
                  name: 'Nutrition Rehabilitation',
                  evidence: 'Essential alongside therapy',
                  detail: "Working with a registered dietitian who specializes in eating disorders is a core component of BED treatment. The focus is normalized eating (regular meals without restriction), not caloric restriction. Restriction typically worsens the binge cycle — a dietitian trained in eating disorders understands this and won't put you on a diet.",
                },
              ].map((item) => (
                <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-bold text-brand-charcoal">{item.name}</p>
                    <span className="text-xs bg-brand-plum/10 text-brand-plum font-semibold px-2 py-1 rounded-full whitespace-nowrap">{item.evidence}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-charcoal mb-4">What Does Not Work</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <p className="font-semibold text-brand-charcoal mb-3">These approaches are not evidence-based for BED and may make it worse:</p>
              <ul className="space-y-2">
                {[
                  'Caloric restriction diets — the restrict-binge cycle is central to BED; restriction feeds it',
                  'General weight loss programs without eating disorder specialization',
                  'Therapists or dietitians without specific eating disorder training',
                  '"Willpower" approaches that treat BED as a moral failing rather than a clinical disorder',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-amber-500 font-bold mt-0.5">✕</span>
                    <span>{item}</span>
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
            <h2 className="text-2xl font-bold mb-3">Find a BED Treatment Specialist</h2>
            <p className="text-brand-plum-light/80 mb-6 text-sm">
              Search our directory for CEDS-credentialed therapists and eating disorder registered dietitians
              who specialize in binge eating disorder.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-white text-brand-plum font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Find a Specialist Near Me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-bold text-brand-charcoal mb-3">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/eating-disorder-for-men" className="text-sm text-brand-plum hover:underline font-medium">BED in Men →</Link>
              <Link href="/guides/levels-of-care-explained" className="text-sm text-brand-plum hover:underline font-medium">Levels of Care Explained →</Link>
              <Link href="/guides/insurance-coverage-eating-disorders" className="text-sm text-brand-plum hover:underline font-medium">Insurance Coverage Guide →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

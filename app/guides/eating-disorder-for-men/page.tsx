import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Eating Disorders in Men: Finding the Right Treatment',
  description:
    'Eating disorders affect 1 in 3 people with an ED who are male — but men are diagnosed later, seek help less often, and face a treatment system built primarily around women. A guide to finding male-affirming care.',
  alternates: { canonical: '/guides/eating-disorder-for-men' },
  openGraph: {
    title: 'Eating Disorders in Men: Finding the Right Treatment',
    description:
      'Men represent 1 in 3 people with eating disorders but are underdiagnosed and underserved. A guide to recognizing symptoms, finding male-affirming treatment, and what to look for in a provider.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How common are eating disorders in men?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eating disorders affect approximately 1 in 3 people diagnosed with an eating disorder who are male — roughly 10 million men in the US at some point in their lifetime. Despite this, men represent a small fraction of those who seek treatment, primarily because eating disorders are still culturally framed as a female condition, diagnostic criteria historically skewed toward female presentations, and male patients experience significant stigma about seeking help for a disorder perceived as "not for men."',
      },
    },
    {
      '@type': 'Question',
      name: 'What eating disorders are most common in men?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Binge eating disorder (BED) is the most common eating disorder in men. Anorexia and bulimia also affect men, though they are more commonly associated with women in cultural perception. Muscle dysmorphia — a preoccupation with not being muscular enough, often accompanied by extreme exercise, protein supplementation, and restricted eating — is a predominantly male-presenting pattern that frequently co-occurs with or precedes an eating disorder diagnosis. Orthorexia (obsessive clean eating) is also more common in men than traditional eating disorder presentations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a male-affirming eating disorder treatment program?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When evaluating programs, ask directly: Do you have experience treating male patients? What percentage of your current caseload is male? Does your program use gender-inclusive language and materials? Are group therapy sessions co-ed or gender-separate, and can I choose? Programs that have genuinely treated male patients will have thoughtful answers to these questions. Programs that pause at the question of male patients may not have the experience you need.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do gay and bisexual men have higher rates of eating disorders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Research consistently shows that gay and bisexual men have significantly higher rates of eating disorders and body image concerns than heterosexual men. This is attributed to appearance-related pressures within some gay male communities, the overlap between gay male culture and bodybuilding/physique culture, and the compounding effects of minority stress. Finding a provider who is explicitly LGBTQ+-affirming — not just tolerant — matters for treatment outcomes in this population.',
      },
    },
  ],
}

export default function EatingDisorderForMenGuide() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-brand-plum py-12 px-4">
        <div className="max-w-3xl mx-auto text-white">
          <div className="text-brand-plum-light/70 text-sm mb-3">
            <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
            {' / '}
            <span>Eating Disorders in Men</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Eating Disorders in Men: Finding the Right Treatment
          </h1>
          <p className="text-brand-plum-light/80 text-lg">
            Men represent 1 in 3 people with eating disorders — but face a system built primarily
            around women. Here&apos;s what you need to know.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        <section className="prose prose-gray max-w-none mb-10">
          <p className="text-gray-700 leading-relaxed text-lg">
            Eating disorders affect 1 in 3 people with an ED who are male — but men are diagnosed
            later, seek help less often, and face a treatment system built primarily around women.
            The result: years of unrecognized suffering, delayed intervention, and higher medical
            complications by the time treatment begins.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This guide covers why men are underdiagnosed, what symptoms look like in male
            patients, how to find male-affirming treatment, and what LGBTQ+ men should look for
            in a provider.
          </p>
        </section>

        {/* Why underdiagnosed */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Why Men Are Underdiagnosed
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            The cultural image of an eating disorder patient — young, thin, female — is wrong, but
            it shapes everything from public health messaging to clinical training. This creates
            multiple layers of diagnostic failure for male patients.
          </p>
          <div className="space-y-4">
            {[
              {
                title: 'Symptoms present differently in men',
                body: 'Muscle dysmorphia (a preoccupation with not being muscular enough, sometimes called "reverse anorexia"), orthorexia (obsessive clean eating), and restriction combined with excessive exercise are common male-presenting patterns that don\'t match the media image of anorexia in a thin woman. Clinicians trained primarily on female presentations may not recognize these as eating disorder symptoms.',
              },
              {
                title: 'Diagnostic criteria historically skewed female',
                body: 'Earlier versions of the DSM included the criterion "refusal to maintain a minimally normal body weight" without acknowledging muscle gain as an equivalent preoccupation. Revisions have improved this, but training gaps persist in clinical practice.',
              },
              {
                title: 'Stigma prevents help-seeking',
                body: 'Men face significant social stigma around eating disorders — a condition culturally framed as a female problem. Many men do not identify with the eating disorder label even when they meet full diagnostic criteria, and delay seeking help until symptoms become severe.',
              },
              {
                title: 'Treatment environments feel unwelcoming',
                body: 'Men who do seek treatment often find group therapy sessions, educational materials, and even facility marketing that assumes all patients are female-presenting. This reduces engagement and increases dropout from treatment.',
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

        {/* Warning signs */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Warning Signs in Men
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Male eating disorder presentations often look like health and fitness behaviors at
            first glance — which makes them easy to miss or rationalize. These patterns warrant
            closer attention:
          </p>
          <div className="space-y-3">
            {[
              'Obsessive exercise — inability to skip workouts even when injured, sick, or asked to by a provider; significant distress when exercise is prevented',
              'Extreme "clean eating" — rigid elimination of food categories, anxiety around non-"clean" foods, moralizing food choices',
              'Body image distress focused on muscularity — spending significant time checking muscles, significant distress about being "small" or "soft" despite objective muscle mass',
              'Not eating with others — avoiding social meals, lying about eating, eating in secret',
              'Hiding food behaviors — throwing away food, pretending to eat, lying about what has been eaten',
              'Supplement overuse — excessive protein powder, weight gainers, or fat burners used beyond training needs',
              'Significant weight loss or weight cycling accompanied by denial that anything is wrong',
            ].map((sign, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="bg-brand-plum text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{sign}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Finding male-affirming treatment */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Finding Male-Affirming Treatment
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Not every eating disorder program has meaningful experience with male patients. The
            questions below help you evaluate a provider before committing.
          </p>
          <div className="space-y-4">
            {[
              {
                q: 'Do you have experience treating male patients?',
                detail: 'Ask what percentage of their current caseload is male. A provider who has genuinely treated male patients can give a real answer. Vague reassurance without specifics suggests limited experience.',
              },
              {
                q: 'Is your program or practice familiar with muscle dysmorphia and orthorexia?',
                detail: 'These are the most common male-presenting ED patterns and require different clinical framing than anorexia or bulimia. A provider who is unfamiliar with either may not be the right fit.',
              },
              {
                q: 'Does your group therapy include male patients, or are groups gender-separate?',
                detail: 'Many group therapy programs are predominantly or exclusively female. Ask whether you would be the only male in a group, and whether gender-separated groups are available. Some men do well in mixed groups; others prefer male-only support.',
              },
              {
                q: 'Are your educational materials gender-inclusive?',
                detail: 'Workbooks, handouts, and program materials that use exclusively female pronouns and examples signal a program that has not adapted to diverse patient populations.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="bg-brand-plum-light text-brand-plum font-bold text-lg w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">{item.q}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LGBTQ+ men */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            LGBTQ+ Men and Eating Disorders
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Research consistently shows higher rates of eating disorders and body image concerns
            in gay and bisexual men compared to heterosexual men. Contributing factors include
            appearance-related pressures within some gay male social contexts, the overlap between
            gay male culture and physique culture (gym culture, aesthetic ideals), and minority
            stress from navigating a world where LGBTQ+ identity still requires vigilance.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            For LGBTQ+ men seeking eating disorder treatment, finding a provider who is
            explicitly affirming — not just tolerant — matters for treatment outcomes. &quot;Affirming&quot;
            means providers who understand how identity, community pressures, and minority stress
            interact with eating disorder development and recovery. It does not mean providers who
            simply do not object to LGBTQ+ patients.
          </p>
          <p className="text-gray-600 leading-relaxed">
            When evaluating providers, ask specifically whether they have experience with LGBTQ+
            patients and whether their practice or program uses affirming language and materials.
            In large cities, LGBTQ+-affirming eating disorder specialists are increasingly available.
            For patients in smaller markets, telehealth access to affirming providers in major cities
            is a practical option.
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
          <h2 className="text-xl font-bold mb-2">Find a Provider Who Gets It</h2>
          <p className="text-brand-plum-light/80 mb-5 text-sm">
            Search therapists and treatment centers — filter by location and specialty to find
            providers with experience treating male patients.
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
              { href: '/guides/how-to-find-eating-disorder-treatment', title: 'How to Find Treatment', desc: 'Practical steps from first call to first appointment' },
              { href: '/guides/questions-to-ask-eating-disorder-provider', title: '15 Questions to Ask', desc: 'Vet a provider before committing to treatment' },
              { href: '/guides/levels-of-care-explained', title: 'Levels of Care Explained', desc: 'PHP, IOP, residential — what each level means' },
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

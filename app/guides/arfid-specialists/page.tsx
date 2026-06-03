import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByDisorder } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Finding an ARFID Specialist — A Guide for Patients and Families',
  description:
    'ARFID (Avoidant/Restrictive Food Intake Disorder) requires a specific type of specialist — not all eating disorder therapists treat it. Here is how to find one.',
  alternates: { canonical: '/guides/arfid-specialists' },
  openGraph: {
    title: 'Finding an ARFID Specialist',
    description:
      'ARFID requires a different type of provider than most eating disorders. This guide explains who treats ARFID and how to find them.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What type of therapist treats ARFID?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ARFID is treated by a multidisciplinary team that typically includes a psychologist or therapist trained in exposure-based therapy (CBT for ARFID, FBT-ARFID), an occupational therapist with sensory processing expertise for sensory-driven ARFID, and an ED-specialized registered dietitian. For young children, a feeding-specialized speech-language pathologist (SLP) is often involved. Not all eating disorder therapists are trained in ARFID — always ask explicitly about ARFID experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ARFID more common in autism and ADHD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ARFID has significantly higher rates among autistic individuals, those with ADHD, and people with OCD or anxiety disorders. Sensory sensitivities — to food texture, smell, temperature, and appearance — are a major driver of ARFID in neurodivergent people. Providers who specialize in both neurodiversity and ARFID are the strongest match for this population. If your child or you are neurodivergent, ask specifically about the provider\'s experience treating ARFID in autistic or ADHD patients.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can adults have ARFID?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ARFID affects both children and adults, though it is more commonly diagnosed in childhood. Adults with ARFID often grew up as "picky eaters" who were never properly identified and treated. Adult ARFID can cause significant nutritional deficiencies, social impairment (avoiding restaurants, social meals), and relationship strain. Treatment for adults typically uses CBT-based exposure therapy, occupational therapy approaches, and dietitian support — the same multidisciplinary framework used for children.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is ARFID different from anorexia nervosa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ARFID and anorexia are both eating disorders involving food restriction, but the driver is completely different. Anorexia is driven by fear of weight gain and body image disturbance. ARFID is driven by sensory sensitivities, fear of choking or vomiting, or extreme low appetite — with no concern about weight or body image. This difference is clinically important because ARFID requires different treatment approaches (exposure therapy for sensory and fear drivers rather than CBT-E or FBT for weight restoration).',
      },
    },
  ],
}

export default async function ArfidSpecialistsGuide() {
  const arfidListings = await getListingsByDisorder('arfid', 6)

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
            Finding an ARFID Specialist
          </h1>
          <p className="text-brand-plum-light/80 text-lg">
            ARFID requires a different type of provider than most eating disorders —
            here is who actually treats it and how to find one.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">What Is ARFID?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            ARFID — Avoidant/Restrictive Food Intake Disorder — was added to the DSM-5 in 2013.
            It describes a pattern of eating that is severely limited by sensory sensitivity,
            fear of adverse consequences (choking, vomiting, allergic reaction), or extremely
            low appetite — without any concern about body weight or shape.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            ARFID is not selective eating. It is not a preference or a phase. It is a disorder
            that causes genuine nutritional deficiencies, significant social impairment (avoiding
            restaurants, school lunches, family dinners), and, in severe cases, medical
            hospitalization for malnutrition.
          </p>
          <p className="text-gray-600 leading-relaxed">
            It is significantly more common in neurodivergent individuals — particularly autistic
            people, those with ADHD, and people with OCD or anxiety disorders — due to sensory
            processing differences. But ARFID occurs in neurotypical individuals as well, often
            triggered by a traumatic food event like choking or a severe allergic reaction.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-5">
            Who Treats ARFID — and Why It&apos;s Different
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            This is where ARFID gets complicated for patients and families: most eating disorder
            directories and referral networks are not built with ARFID in mind. The majority of
            ED specialists are trained in the weight- and body-image-driven disorders (anorexia,
            bulimia, BED) — which require fundamentally different approaches than ARFID.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Asking an anorexia specialist to treat ARFID is like asking a hand surgeon to treat
            a hip replacement. The field overlaps, but the specialty does not.
          </p>

          <div className="space-y-6">
            {[
              {
                title: 'Psychologist or Therapist — Exposure-Based Therapy',
                detail: 'The primary psychological treatment for ARFID is exposure-based therapy — specifically, systematic, graded food exposure that reduces the fear or aversion response. CBT for ARFID and FBT-ARFID (a modified version of Family-Based Treatment) are the two most researched approaches. The provider you are looking for has specific ARFID training, not just general eating disorder experience.',
                badge: 'Core provider',
              },
              {
                title: 'Occupational Therapist (OT) — Sensory Processing',
                detail: 'For sensory-driven ARFID — where texture, temperature, smell, or appearance drives the avoidance — an occupational therapist with sensory integration training is often the most important member of the treatment team. Pediatric OTs with feeding specialties are particularly skilled at sensory desensitization work. Many adult ARFID patients also benefit significantly from OT-based sensory approaches.',
                badge: 'For sensory ARFID',
              },
              {
                title: 'Speech-Language Pathologist (SLP) — Feeding Therapy',
                detail: 'For young children (under 6) with ARFID, a feeding-specialized SLP addresses oral motor function, swallowing, and the mechanics of eating — separate from the sensory and psychological components. SLPs trained in the Sequential Oral Sensory (SOS) approach or DIR/Floortime-based feeding therapy are particularly relevant. For older children and adults, SLP involvement is less common unless there is an underlying swallowing or oral motor component.',
                badge: 'Young children',
              },
              {
                title: 'Registered Dietitian — Nutritional Rehabilitation',
                detail: 'An ED-specialized RD who understands ARFID supports nutritional adequacy — identifying safe foods, supplementation as needed, and gradually expanding the food repertoire alongside therapy. The RD does not push foods aggressively; they coordinate with the therapy team on pacing and exposure hierarchy. Look for RDs with ARFID-specific experience, not general pediatric nutrition or weight management.',
                badge: 'Part of the team',
              },
            ].map((item) => (
              <div key={item.title} className="border-l-4 border-brand-teal pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <span className="text-xs bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            How to Find an ARFID Specialist
          </h2>
          <div className="space-y-4">
            {[
              {
                n: '1',
                step: 'Search specifically for ARFID — not just "eating disorder"',
                detail: 'Use the ARFID filter on this directory. When calling providers, ask directly: "Do you have specific training and experience treating ARFID? What approach do you use?" A provider who treats mostly anorexia and bulimia will not be the right fit.',
              },
              {
                n: '2',
                step: 'Ask about neurodiversity experience if relevant',
                detail: 'If you or your child are autistic or have ADHD, ask whether the provider has experience treating ARFID in neurodivergent patients. Sensory sensitivities in neurodivergent individuals require different approaches than ARFID driven by fear of choking.',
              },
              {
                n: '3',
                step: 'Consider telehealth if local specialists are limited',
                detail: 'ARFID specialists are concentrated in major metros and academic medical centers. If you are in a smaller market, telehealth from a specialized program may be your best option. Multiple national programs offer virtual ARFID treatment.',
              },
              {
                n: '4',
                step: 'Look for feeding clinics at children\'s hospitals',
                detail: 'For children with severe ARFID, the multi-disciplinary feeding programs at children\'s hospitals (e.g., Children\'s Hospital of Philadelphia, Boston Children\'s, Cincinnati Children\'s) are among the most comprehensive ARFID treatment settings available. These programs combine all four provider types in one coordinated team.',
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-4">
                <div className="bg-brand-plum text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  {item.n}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">{item.step}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live listings */}
        {arfidListings.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-brand-charcoal mb-4">
              ARFID Specialists in the Directory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {arfidListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <Link
              href="/disorder/arfid"
              className="inline-flex items-center gap-1.5 text-sm text-brand-teal font-medium hover:underline"
            >
              See all ARFID specialists in the directory
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        )}

        {/* FAQ */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-8">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-6">
            Frequently Asked Questions About ARFID
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
        <div className="bg-brand-plum rounded-2xl p-7 text-white text-center mb-8">
          <h2 className="text-xl font-bold mb-2">Find an ARFID Specialist Near You</h2>
          <p className="text-brand-plum-light/80 mb-5 text-sm">
            Filter by ARFID in the disorder type filter to find providers with specific ARFID training.
          </p>
          <Link
            href="/disorder/arfid"
            className="inline-flex items-center gap-2 bg-white text-brand-plum font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Browse ARFID Specialists
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related guides */}
        <section>
          <h2 className="text-lg font-bold text-brand-charcoal mb-4">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/guides/how-to-find-eating-disorder-treatment', title: 'How to Find Eating Disorder Treatment', desc: 'Step-by-step guide for patients and families' },
              { href: '/guides/levels-of-care-explained', title: 'Levels of Care Explained', desc: 'When to seek residential, PHP, IOP, or outpatient care' },
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

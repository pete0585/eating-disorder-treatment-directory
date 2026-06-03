import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByDisorder } from '@/lib/data'
import { DISORDERS } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

const DISORDER_CONTENT: Record<string, {
  title: string
  description: string
  longDescription: string
  faqs: Array<{ q: string; a: string }>
}> = {
  'anorexia-nervosa': {
    title: 'Anorexia Nervosa',
    description: 'Find therapists and treatment programs specializing in anorexia nervosa — from outpatient therapy to residential programs.',
    longDescription: 'Anorexia nervosa is characterized by severe food restriction, intense fear of weight gain, and distorted body image. It has the highest mortality rate of any psychiatric disorder. Treatment typically involves medical stabilization, nutritional rehabilitation, and evidence-based therapy (Family-Based Treatment for adolescents, CBT-E for adults). Many providers below specialize in FBT, CBT-E, and DBT-based approaches.',
    faqs: [
      { q: 'What is the most effective treatment for anorexia nervosa?', a: 'For adolescents, Family-Based Treatment (FBT/Maudsley) has the strongest evidence base. For adults, CBT-Enhanced (CBT-E) and the MANTRA model show the best outcomes. Severe cases require medical stabilization and may need residential or PHP-level care before outpatient therapy begins.' },
      { q: 'When does anorexia require residential treatment?', a: 'Medical instability (electrolyte imbalances, cardiac arrhythmias, BMI < 15), failure to progress in lower levels of care, or active suicidality are common indicators for residential admission. A physician and ED-trained therapist can assess the right level of care.' },
    ],
  },
  'bulimia-nervosa': {
    title: 'Bulimia Nervosa',
    description: 'Find bulimia treatment specialists — therapists, dietitians, and programs using CBT-E, DBT, and nutritional counseling.',
    longDescription: 'Bulimia nervosa involves recurring cycles of binge eating and compensatory behaviors (purging, fasting, excessive exercise). CBT-Enhanced (CBT-E) is the gold-standard outpatient treatment for adults. Many individuals with bulimia do not need residential care — an outpatient therapist and dietitian team is often sufficient. The providers below specialize in bulimia recovery.',
    faqs: [
      { q: 'Can bulimia be treated in outpatient therapy?', a: 'Yes — most individuals with bulimia nervosa are treated successfully in outpatient therapy. CBT-Enhanced (CBT-E) is the gold standard and typically runs 20 sessions. Many people see significant reduction in binge/purge cycles within 12 weeks.' },
      { q: 'Do I need a dietitian alongside a therapist for bulimia?', a: 'Yes. An ED-specialized registered dietitian is a critical part of the treatment team for bulimia. They help normalize eating patterns, address food rules and restriction that drive binge cycles, and support medical monitoring of nutritional status.' },
    ],
  },
  'binge-eating-disorder': {
    title: 'Binge Eating Disorder (BED)',
    description: 'Find binge eating disorder treatment specialists — therapists, dietitians, and programs using CBT, DBT, and HAES-aligned approaches.',
    longDescription: 'Binge Eating Disorder (BED) is the most common eating disorder in the US, affecting ~3.5% of women and 2% of men. It involves recurrent episodes of eating large amounts of food rapidly, often to the point of discomfort, accompanied by shame and distress — but without compensatory behaviors. CBT, DBT, and Interpersonal Therapy are all evidence-based for BED. Many providers use HAES (Health at Every Size) and non-diet approaches.',
    faqs: [
      { q: 'What is the difference between BED and overeating?', a: 'BED episodes are characterized by a sense of loss of control — eating much more than intended, eating faster than normal, eating past fullness, eating alone due to embarrassment, and significant distress after episodes. Occasional overeating (like at holidays) does not meet the BED diagnostic threshold of at least once a week for three months.' },
      { q: 'Does BED treatment require weight loss?', a: 'No. The primary treatment goals for BED are reducing binge frequency, improving quality of life, and addressing underlying emotional drivers. Weight loss is not a treatment target in evidence-based BED care. HAES-aligned providers focus on health behaviors and relationship with food, not weight.' },
    ],
  },
  'arfid': {
    title: 'ARFID (Avoidant/Restrictive Food Intake Disorder)',
    description: 'Find ARFID specialists — therapists, occupational therapists, and programs treating avoidant/restrictive food intake disorder in children and adults.',
    longDescription: 'ARFID is a newer diagnosis (added to DSM-5 in 2013) characterized by extreme food avoidance or restriction without body image concerns — often driven by sensory sensitivities, fear of choking or vomiting, or low appetite. It is significantly more common in neurodivergent individuals (autism, ADHD, OCD). Specialists include pediatric OTs with sensory processing training, SLPs, and psychologists trained in exposure-based therapy. Not all eating disorder therapists treat ARFID — use the filter to find true ARFID specialists.',
    faqs: [
      { q: 'What type of therapist treats ARFID?', a: 'ARFID treatment often involves a multidisciplinary team: a psychologist trained in exposure-based therapy (CBT or FBT-ARFID), an occupational therapist with sensory processing expertise, and an ED-specialized dietitian. For young children, a feeding-specialized SLP is often involved. Not all eating disorder therapists are trained in ARFID — always ask directly about ARFID experience.' },
      { q: 'Is ARFID more common in autism and ADHD?', a: 'Yes. ARFID has significantly higher rates among autistic individuals, those with ADHD, and people with OCD or anxiety disorders. Sensory sensitivities — particularly to food texture, smell, temperature, and appearance — are a major driver of ARFID in neurodivergent people. Providers who specialize in both neurodiversity and ARFID are the strongest match for this population.' },
    ],
  },
  'osfed': {
    title: 'OSFED (Other Specified Feeding or Eating Disorder)',
    description: 'Find treatment providers for OSFED — the most common eating disorder diagnosis, covering atypical anorexia, purging disorder, and more.',
    longDescription: 'OSFED covers eating disorder presentations that cause significant distress and impairment but do not meet the full criteria for anorexia, bulimia, or BED. This includes atypical anorexia (all features of anorexia but at normal weight), subthreshold bulimia or BED, purging disorder, and night eating syndrome. Treatment is symptom-based and follows the same evidence-based approaches used for the full diagnostic categories.',
    faqs: [
      { q: 'Is OSFED as serious as anorexia or bulimia?', a: 'Yes. OSFED — and especially atypical anorexia — can be just as medically serious as full-threshold eating disorders. A person with atypical anorexia who has lost a significant amount of weight may have electrolyte abnormalities and cardiac risk even if their current BMI is normal. Severity is based on symptoms and medical status, not diagnosis name.' },
    ],
  },
  'orthorexia': {
    title: 'Orthorexia',
    description: 'Find orthorexia treatment specialists — therapists and dietitians who address obsessive healthy eating and food purity concerns.',
    longDescription: 'Orthorexia is characterized by an obsessive focus on "healthy" or "clean" eating that impairs quality of life — social isolation due to food rules, extreme anxiety about "impure" foods, and progressive restriction. It is not yet a formal DSM diagnosis but is widely recognized and treated by ED specialists. Treatment involves CBT, ACT, and working with an ED dietitian to normalize flexible eating.',
    faqs: [
      { q: 'Is orthorexia recognized as a real eating disorder?', a: 'Orthorexia is not yet formally listed in the DSM-5, but it is widely recognized and treated by eating disorder specialists. The core features — obsessive dietary rules, significant distress when rules are broken, and social and nutritional impairment — are consistent with eating disorder criteria. Many ED therapists and dietitians treat orthorexia using CBT and Acceptance and Commitment Therapy (ACT).' },
    ],
  },
  'muscle-dysmorphia': {
    title: 'Muscle Dysmorphia',
    description: 'Find muscle dysmorphia and disordered eating treatment specialists — particularly for male athletes and bodybuilding communities.',
    longDescription: 'Muscle dysmorphia is a subtype of body dysmorphic disorder involving obsessive preoccupation with not being muscular enough — leading to compulsive exercise, restrictive eating, supplement overuse, and sometimes anabolic steroid use. It disproportionately affects men. Finding a provider experienced with both eating disorders and body image issues in male patients is critical — most ED directories skew female.',
    faqs: [
      { q: 'What is the difference between muscle dysmorphia and a healthy gym routine?', a: 'Muscle dysmorphia is characterized by significant impairment — missing social events to work out, continuing to exercise through injury, experiencing extreme anxiety when unable to train, and persistent belief that you are not muscular enough despite objective evidence to the contrary. The key is whether the pursuit of muscularity is causing distress and interfering with daily functioning.' },
    ],
  },
  'other': {
    title: 'Other Eating Disorders',
    description: 'Find eating disorder specialists for pica, diabulimia, night eating syndrome, and other eating disorder presentations.',
    longDescription: 'Eating disorder presentations beyond the most recognized diagnoses include pica (persistent eating of non-food substances), diabulimia (insulin restriction in Type 1 diabetes for weight control), night eating syndrome, and others. Specialists with broad eating disorder training are best equipped to treat these presentations.',
    faqs: [
      { q: 'What is diabulimia?', a: 'Diabulimia is the informal term for intentional insulin restriction in people with Type 1 diabetes for weight control. It is a serious and life-threatening form of disordered eating that requires a treatment team familiar with both eating disorders and diabetes management. Providers who list "diabulimia" or "diabetes and eating disorders" as a specialty have relevant training.' },
    ],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const content = DISORDER_CONTENT[slug]
  if (!content) return {}

  return {
    title: `${content.title} Treatment Providers Near You`,
    description: content.description,
    alternates: { canonical: `/disorder/${slug}` },
  }
}

export default async function DisorderPage({ params }: Props) {
  const { slug } = await params
  const content = DISORDER_CONTENT[slug]

  if (!content) notFound()

  const disorder = DISORDERS.find((d) => d.slug === slug)
  if (!disorder) notFound()

  const listings = await getListingsByDisorder(slug, 12)

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
          <div className="flex items-center gap-2 text-brand-plum text-sm font-medium mb-3">
            <span className="bg-brand-plum-light px-3 py-1 rounded-full">Disorder Type</span>
          </div>
          <h1 className="text-3xl font-bold text-brand-charcoal mb-3">{content.title}</h1>
          <p className="text-gray-700 leading-relaxed max-w-2xl">{content.longDescription}</p>
        </div>

        {/* Listings */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-brand-charcoal mb-5">
            Providers Specializing in {content.title}
            {listings.length > 0 && (
              <span className="text-sm font-normal text-gray-500 ml-2">({listings.length} found)</span>
            )}
          </h2>
          {listings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-500 mb-4">No providers listed for this disorder yet.</p>
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
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-brand-charcoal mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {content.faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Other disorders */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-brand-charcoal mb-4">Browse Other Disorders</h2>
          <div className="flex flex-wrap gap-2">
            {DISORDERS.filter((d) => d.slug !== slug).map((d) => (
              <Link
                key={d.slug}
                href={`/disorder/${d.slug}`}
                className="text-sm text-brand-plum bg-brand-plum-light px-3 py-1.5 rounded-full hover:bg-brand-plum hover:text-white transition-colors"
              >
                {d.label}
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

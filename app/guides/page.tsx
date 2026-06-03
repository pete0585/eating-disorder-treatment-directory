import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Eating Disorder Treatment Guides',
  description:
    'Practical guides for finding eating disorder treatment — levels of care, how to choose a provider, ARFID specialists, and insurance navigation.',
  alternates: { canonical: '/guides' },
}

const guides = [
  {
    href: '/guides/how-to-find-eating-disorder-treatment',
    title: 'How to Find Eating Disorder Treatment',
    description: 'A step-by-step guide for patients and families — understanding provider types, levels of care, questions to ask, and insurance navigation.',
    tag: 'Getting Started',
    readTime: '8 min read',
  },
  {
    href: '/guides/levels-of-care-explained',
    title: 'Eating Disorder Levels of Care Explained',
    description: 'Residential, PHP, IOP, outpatient, and telehealth — what each level involves, who it is for, and typical costs.',
    tag: 'Treatment',
    readTime: '7 min read',
  },
  {
    href: '/guides/arfid-specialists',
    title: 'Finding an ARFID Specialist',
    description: 'ARFID requires a different type of provider than most eating disorders. This guide explains who treats ARFID and how to find them.',
    tag: 'ARFID',
    readTime: '6 min read',
  },
  {
    href: '/guides/insurance-coverage-eating-disorders',
    title: 'Insurance Coverage for Eating Disorder Treatment',
    description: 'How the Mental Health Parity Act protects you, how to verify benefits, and how to appeal insurance denials.',
    tag: 'Insurance',
    readTime: '7 min read',
  },
]

export default function GuidesIndex() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-brand-plum py-12 px-4">
        <div className="max-w-3xl mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Eating Disorder Treatment Guides
          </h1>
          <p className="text-brand-plum-light/80 text-lg">
            Practical resources to help patients and families navigate treatment — from first
            call to recovery.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="space-y-4">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-brand-plum transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full">
                      {guide.tag}
                    </span>
                    <span className="text-xs text-gray-400">{guide.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-brand-charcoal group-hover:text-brand-plum transition-colors mb-2">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{guide.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-plum transition-colors flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-brand-plum rounded-2xl p-7 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Ready to Find a Provider?</h2>
          <p className="text-brand-plum-light/80 mb-5 text-sm">
            Browse 2,000+ eating disorder therapists, dietitians, and treatment centers — filter
            by disorder type, level of care, and city.
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
    </div>
  )
}

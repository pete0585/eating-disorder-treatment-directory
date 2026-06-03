import type { Metadata } from 'next'
import { Suspense } from 'react'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'Add Your Eating Disorder Practice Listing',
  description:
    'Free listings for eating disorder therapists, dietitians, psychiatrists, and treatment centers. Get found by patients searching for specialized care.',
  alternates: { canonical: '/submit' },
}

export default function SubmitPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-brand-charcoal mb-3">
            List Your Eating Disorder Practice
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Free basic listings for all ED specialists. Upgrade to Verified or Featured after
            approval to appear at the top of city and disorder-type search results.
          </p>
        </div>

        {/* Pricing preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <div className="text-lg font-bold text-brand-charcoal mb-1">Free</div>
            <div className="text-2xl font-bold text-gray-400 mb-2">$0</div>
            <ul className="text-xs text-gray-500 space-y-1 text-left">
              <li>✓ Name, location, phone</li>
              <li>✓ Appears in search results</li>
              <li>✓ Reviewed within 24h</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border-2 border-brand-teal p-5 text-center relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-teal text-white text-xs px-3 py-1 rounded-full font-semibold">
              Popular
            </div>
            <div className="text-lg font-bold text-brand-charcoal mb-1">Verified</div>
            <div className="text-2xl font-bold text-brand-teal mb-2">$149/yr</div>
            <ul className="text-xs text-gray-600 space-y-1 text-left">
              <li>✓ Everything in Free</li>
              <li>✓ Photo, bio, specialties</li>
              <li>✓ Priority placement</li>
              <li>✓ Verified badge</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border-2 border-brand-rose p-5 text-center">
            <div className="text-lg font-bold text-brand-charcoal mb-1">Featured</div>
            <div className="text-2xl font-bold text-brand-rose mb-2">$299/yr</div>
            <ul className="text-xs text-gray-600 space-y-1 text-left">
              <li>✓ Everything in Verified</li>
              <li>✓ Top of city pages</li>
              <li>✓ Disorder-type feature</li>
              <li>✓ Featured badge</li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <Suspense>
            <SubmitForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

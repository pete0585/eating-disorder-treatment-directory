'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { DISORDERS, LEVELS_OF_CARE, COMMUNITIES, AGE_GROUPS } from '@/lib/utils'

const schema = z.object({
  listing_type: z.enum(['provider', 'center']),
  provider_name: z.string().optional(),
  facility_name: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required').max(2),
  address: z.string().optional(),
  zip: z.string().optional(),
  phone: z.string().optional(),
  website_url: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  bio: z.string().max(1000).optional(),
  telehealth_available: z.boolean(),
  accepting_new_patients: z.boolean(),
  disorders_treated: z.array(z.string()),
  levels_of_care: z.array(z.string()),
  communities_served: z.array(z.string()),
})

type FormData = z.infer<typeof schema>

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      listing_type: 'provider',
      telehealth_available: false,
      accepting_new_patients: true,
      disorders_treated: [],
      levels_of_care: [],
      communities_served: [],
    },
  })

  const listingType = watch('listing_type')
  const disordersTreated = watch('disorders_treated')
  const levelsOfCare = watch('levels_of_care')
  const communitiesServed = watch('communities_served')

  function toggleArray(field: 'disorders_treated' | 'levels_of_care' | 'communities_served', value: string) {
    const current = (field === 'disorders_treated' ? disordersTreated : field === 'levels_of_care' ? levelsOfCare : communitiesServed) || []
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value]
    setValue(field, updated)
  }

  async function onSubmit(data: FormData) {
    setError('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json()
        setError(json.error || 'Submission failed. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 px-6 max-w-md mx-auto">
        <div className="w-16 h-16 bg-brand-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-brand-charcoal mb-3">Listing Submitted!</h2>
        <p className="text-gray-600 leading-relaxed">
          Your listing is under review and will appear in the directory within 24 hours.
          You&apos;ll receive an email when it goes live.
        </p>
        <a href="/eating-disorder-treatment" className="mt-6 inline-block btn-primary">
          Browse the Directory
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
      {/* Type */}
      <div>
        <label className="form-label">I am listing a *</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'provider', label: 'Individual Provider', sub: 'Therapist, dietitian, psychiatrist, coach' },
            { value: 'center', label: 'Treatment Center', sub: 'Residential, PHP, IOP program' },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`cursor-pointer border-2 rounded-xl p-4 transition-colors ${
                listingType === opt.value
                  ? 'border-brand-plum bg-brand-plum-light'
                  : 'border-gray-200 hover:border-brand-plum/50'
              }`}
            >
              <input
                type="radio"
                value={opt.value}
                {...register('listing_type')}
                className="hidden"
              />
              <span className="font-semibold text-sm block">{opt.label}</span>
              <span className="text-xs text-gray-500">{opt.sub}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {listingType === 'provider' ? (
          <div className="sm:col-span-2">
            <label className="form-label">Your Full Name *</label>
            <input {...register('provider_name')} className="form-input" placeholder="Jane Smith, LCSW" />
          </div>
        ) : (
          <div className="sm:col-span-2">
            <label className="form-label">Facility / Program Name *</label>
            <input {...register('facility_name')} className="form-input" placeholder="Monte Nido Treatment Center" />
          </div>
        )}
      </div>

      {/* Location */}
      <div>
        <h3 className="font-semibold text-brand-charcoal mb-3">Location</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="form-label">Street Address</label>
            <input {...register('address')} className="form-input" placeholder="123 Main St" />
          </div>
          <div>
            <label className="form-label">City *</label>
            <input {...register('city')} className="form-input" placeholder="New York" />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
          </div>
          <div>
            <label className="form-label">State (2-letter) *</label>
            <input {...register('state')} className="form-input" placeholder="NY" maxLength={2} />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
          </div>
          <div>
            <label className="form-label">ZIP Code</label>
            <input {...register('zip')} className="form-input" placeholder="10001" />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div>
        <h3 className="font-semibold text-brand-charcoal mb-3">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Phone</label>
            <input {...register('phone')} className="form-input" type="tel" placeholder="(555) 000-0000" />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input {...register('email')} className="form-input" type="email" placeholder="hello@example.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="form-label">Website URL</label>
            <input {...register('website_url')} className="form-input" type="url" placeholder="https://example.com" />
            {errors.website_url && <p className="text-red-500 text-xs mt-1">{errors.website_url.message}</p>}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="form-label">Bio / Program Description</label>
        <textarea
          {...register('bio')}
          rows={4}
          className="form-input resize-none"
          placeholder="Brief description of your practice, specialties, and treatment approach..."
        />
      </div>

      {/* Disorders */}
      <div>
        <h3 className="font-semibold text-brand-charcoal mb-3">Disorders Treated</h3>
        <div className="flex flex-wrap gap-2">
          {DISORDERS.map((d) => (
            <button
              key={d.slug}
              type="button"
              onClick={() => toggleArray('disorders_treated', d.slug)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                disordersTreated.includes(d.slug)
                  ? 'bg-brand-plum text-white border-brand-plum'
                  : 'border-gray-300 text-gray-600 hover:border-brand-plum'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Levels of care */}
      <div>
        <h3 className="font-semibold text-brand-charcoal mb-3">Levels of Care Offered</h3>
        <div className="flex flex-wrap gap-2">
          {LEVELS_OF_CARE.map((l) => (
            <button
              key={l.slug}
              type="button"
              onClick={() => toggleArray('levels_of_care', l.slug)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                levelsOfCare.includes(l.slug)
                  ? 'bg-brand-teal text-white border-brand-teal'
                  : 'border-gray-300 text-gray-600 hover:border-brand-teal'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Communities */}
      <div>
        <h3 className="font-semibold text-brand-charcoal mb-3">Communities Served</h3>
        <div className="flex flex-wrap gap-2">
          {COMMUNITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggleArray('communities_served', c)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                communitiesServed.includes(c)
                  ? 'bg-brand-rose text-white border-brand-rose'
                  : 'border-gray-300 text-gray-600 hover:border-brand-rose'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('telehealth_available')}
            className="accent-brand-plum w-4 h-4"
          />
          <span className="text-sm font-medium">Telehealth / Virtual sessions available</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('accepting_new_patients')}
            className="accent-brand-plum w-4 h-4"
          />
          <span className="text-sm font-medium">Currently accepting new patients</span>
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-60 py-4 text-base"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Free Listing'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Basic listings are free and reviewed within 24 hours.
        Upgrade to Verified or Featured after your listing is approved.
      </p>
    </form>
  )
}

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { Filter } from 'lucide-react'
import { DISORDERS, LEVELS_OF_CARE, COMMUNITIES } from '@/lib/utils'

export default function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function setFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    startTransition(() => {
      router.push(`/eating-disorder-treatment?${params.toString()}`)
    })
  }

  function toggleFilter(key: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (params.get(key)) {
      params.delete(key)
    } else {
      params.set(key, 'true')
    }
    params.delete('page')
    startTransition(() => {
      router.push(`/eating-disorder-treatment?${params.toString()}`)
    })
  }

  const activeDisorder = searchParams.get('disorder')
  const activeLoc = searchParams.get('level_of_care')
  const activeType = searchParams.get('listing_type')
  const activeCommunity = searchParams.get('community')
  const telehealth = searchParams.get('telehealth')
  const accepting = searchParams.get('accepting')

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-20">
        <div className="flex items-center gap-2 mb-5">
          <Filter className="w-4 h-4 text-brand-plum" />
          <h2 className="font-semibold text-brand-charcoal">Filter Results</h2>
          {isPending && (
            <span className="ml-auto text-xs text-gray-400">Loading...</span>
          )}
        </div>

        {/* Provider type */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Provider Type
          </h3>
          <div className="space-y-1.5">
            {[
              { value: '', label: 'All Types' },
              { value: 'provider', label: 'Individual Providers' },
              { value: 'center', label: 'Treatment Centers' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter('listing_type', opt.value || null)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  (activeType || '') === opt.value
                    ? 'bg-brand-plum-light text-brand-plum font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Disorder type */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Disorder Type
          </h3>
          <div className="space-y-1.5">
            <button
              onClick={() => setFilter('disorder', null)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                !activeDisorder
                  ? 'bg-brand-plum-light text-brand-plum font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Disorders
            </button>
            {DISORDERS.map((d) => (
              <button
                key={d.slug}
                onClick={() => setFilter('disorder', activeDisorder === d.slug ? null : d.slug)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  activeDisorder === d.slug
                    ? 'bg-brand-plum-light text-brand-plum font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Level of care */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Level of Care
          </h3>
          <div className="space-y-1.5">
            <button
              onClick={() => setFilter('level_of_care', null)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                !activeLoc
                  ? 'bg-brand-plum-light text-brand-plum font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Levels
            </button>
            {LEVELS_OF_CARE.map((l) => (
              <button
                key={l.slug}
                onClick={() => setFilter('level_of_care', activeLoc === l.slug ? null : l.slug)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  activeLoc === l.slug
                    ? 'bg-brand-plum-light text-brand-plum font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Community served */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Community Served
          </h3>
          <div className="space-y-1.5">
            <button
              onClick={() => setFilter('community', null)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                !activeCommunity
                  ? 'bg-brand-plum-light text-brand-plum font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Communities
            </button>
            {COMMUNITIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter('community', activeCommunity === c ? null : c)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  activeCommunity === c
                    ? 'bg-brand-plum-light text-brand-plum font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Quick toggles */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Options
          </h3>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="checkbox"
              checked={!!telehealth}
              onChange={() => toggleFilter('telehealth')}
              className="accent-brand-plum w-4 h-4"
            />
            Telehealth Available
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="checkbox"
              checked={!!accepting}
              onChange={() => toggleFilter('accepting')}
              className="accent-brand-plum w-4 h-4"
            />
            Accepting New Patients
          </label>
        </div>

        {/* Clear filters */}
        {(activeDisorder || activeLoc || activeType || activeCommunity || telehealth || accepting) && (
          <button
            onClick={() => startTransition(() => router.push('/eating-disorder-treatment'))}
            className="mt-5 w-full text-sm text-brand-rose hover:text-rose-700 font-medium py-1"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </aside>
  )
}

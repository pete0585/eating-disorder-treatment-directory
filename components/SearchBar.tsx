'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Search, MapPin } from 'lucide-react'

interface Props {
  defaultQ?: string
  defaultLocation?: string
  placeholder?: string
}

export default function SearchBar({ defaultQ = '', defaultLocation = '', placeholder }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [q, setQ] = useState(defaultQ)
  const [location, setLocation] = useState(defaultLocation)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (q.trim()) {
      params.set('q', q.trim())
    } else {
      params.delete('q')
    }
    if (location.trim()) {
      const parts = location.trim().split(',')
      const city = parts[0]?.trim()
      const state = parts[1]?.trim().toUpperCase().slice(0, 2)
      if (city) params.set('city', city)
      if (state && state.length === 2) params.set('state', state)
    } else {
      params.delete('city')
      params.delete('state')
    }
    params.delete('page')
    startTransition(() => {
      router.push(`/eating-disorder-treatment?${params.toString()}`)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder || 'Disorder, treatment type, or provider name'}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-plum bg-white shadow-sm"
        />
      </div>
      <div className="relative sm:w-52">
        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, ST"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-plum bg-white shadow-sm"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-brand-plum text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-plum-dark transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {isPending ? 'Searching...' : 'Find Treatment'}
      </button>
    </form>
  )
}

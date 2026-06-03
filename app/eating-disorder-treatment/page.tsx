import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import FilterSidebar from '@/components/FilterSidebar'
import ListingCard from '@/components/ListingCard'
import { getListings } from '@/lib/data'
import { BrowseFilters } from '@/lib/types'
import { formatState } from '@/lib/utils'

interface Props {
  searchParams: Promise<Record<string, string | undefined>>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams
  const city = params.city
  const state = params.state
  const disorder = params.disorder

  let title = 'Eating Disorder Treatment Providers & Centers Near You'
  let description =
    'Find eating disorder therapists, dietitians, and treatment programs near you. Filter by disorder type, level of care, and community served.'

  if (city && state) {
    title = `Eating Disorder Treatment in ${city}, ${state}`
    description = `Find eating disorder specialists and treatment centers in ${city}, ${state}. Therapists, dietitians, PHP programs, and residential care.`
  } else if (state) {
    title = `Eating Disorder Treatment in ${formatState(state)}`
    description = `Browse eating disorder treatment providers and programs in ${formatState(state)}.`
  } else if (disorder) {
    title = `${disorder.replace(/-/g, ' ')} Treatment Providers`
  }

  return {
    title,
    description,
    alternates: { canonical: '/eating-disorder-treatment' },
  }
}

async function ListingsResults({ filters }: { filters: BrowseFilters }) {
  const { listings, total, page, totalPages } = await getListings(filters)

  if (listings.length === 0) {
    return (
      <div className="text-center py-16 col-span-2">
        <p className="text-gray-500 text-lg mb-4">No providers found matching your search.</p>
        <Link href="/eating-disorder-treatment" className="btn-primary inline-block">
          Clear Filters
        </Link>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-5">
        {total.toLocaleString()} result{total !== 1 ? 's' : ''} found
        {filters.city ? ` in ${filters.city}${filters.state ? `, ${filters.state}` : ''}` : ''}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {page > 1 && (
            <Link
              href={`/eating-disorder-treatment?${new URLSearchParams({
                ...(filters as Record<string, string>),
                page: String(page - 1),
              }).toString()}`}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-brand-plum transition-colors"
            >
              Previous
            </Link>
          )}
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/eating-disorder-treatment?${new URLSearchParams({
                ...(filters as Record<string, string>),
                page: String(page + 1),
              }).toString()}`}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-brand-plum transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default async function BrowsePage({ searchParams }: Props) {
  const params = await searchParams
  const filters: BrowseFilters = {
    q: params.q,
    city: params.city,
    state: params.state,
    listing_type: params.listing_type,
    disorder: params.disorder,
    level_of_care: params.level_of_care,
    community: params.community,
    telehealth: params.telehealth === 'true',
    accepting: params.accepting === 'true',
    tier: params.tier,
    page: params.page ? parseInt(params.page) : 1,
  }

  const city = params.city
  const state = params.state

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search hero */}
      <div className="bg-brand-plum py-10 px-4">
        <div className="max-w-3xl mx-auto text-center text-white mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {city && state
              ? `Eating Disorder Treatment in ${city}, ${state}`
              : 'Find Eating Disorder Treatment'}
          </h1>
          <p className="text-brand-plum-light/80 text-sm">
            Therapists, dietitians, psychiatrists &amp; treatment centers — all levels of care
          </p>
        </div>
        <Suspense>
          <SearchBar defaultQ={params.q || ''} defaultLocation={city && state ? `${city}, ${state}` : ''} />
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <Suspense>
            <FilterSidebar />
          </Suspense>

          <div className="flex-1 min-w-0">
            <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading results...</div>}>
              <ListingsResults filters={filters} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

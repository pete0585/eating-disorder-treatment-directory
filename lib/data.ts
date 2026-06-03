import { createClient } from './supabase/server'
import { BrowseFilters, EDListing } from './types'

const PAGE_SIZE = 20

export async function getListings(filters: BrowseFilters = {}): Promise<{
  listings: EDListing[]
  total: number
  page: number
  totalPages: number
}> {
  const supabase = await createClient()
  const page = filters.page || 1
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('ed_listings')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier_rank', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (filters.q) {
    query = query.textSearch('search_vector', filters.q, { type: 'websearch' })
  }
  if (filters.city) {
    query = query.ilike('city', `%${filters.city}%`)
  }
  if (filters.state) {
    query = query.eq('state', filters.state.toUpperCase())
  }
  if (filters.listing_type) {
    query = query.eq('listing_type', filters.listing_type)
  }
  if (filters.disorder) {
    query = query.contains('disorders_treated', [filters.disorder])
  }
  if (filters.level_of_care) {
    query = query.contains('levels_of_care', [filters.level_of_care])
  }
  if (filters.community) {
    query = query.contains('communities_served', [filters.community])
  }
  if (filters.telehealth) {
    query = query.eq('telehealth_available', true)
  }
  if (filters.accepting) {
    query = query.eq('accepting_new_patients', true)
  }
  if (filters.tier) {
    query = query.eq('listing_tier', filters.tier)
  }

  const { data, count, error } = await query

  if (error) {
    console.error('getListings error:', error)
    return { listings: [], total: 0, page, totalPages: 0 }
  }

  const total = count || 0
  return {
    listings: (data as EDListing[]) || [],
    total,
    page,
    totalPages: Math.ceil(total / PAGE_SIZE),
  }
}

export async function getListingBySlug(slug: string): Promise<EDListing | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ed_listings')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .eq('is_approved', true)
    .single()

  if (error) return null
  return data as EDListing
}

export async function getListingsByCity(city: string, state: string, limit = 50): Promise<EDListing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ed_listings')
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .ilike('city', city)
    .eq('state', state.toUpperCase())
    .order('listing_tier_rank', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data as EDListing[]) || []
}

export async function getListingsByDisorder(disorder: string, limit = 20): Promise<EDListing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ed_listings')
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .contains('disorders_treated', [disorder])
    .order('listing_tier_rank', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data as EDListing[]) || []
}

export async function getListingsByLevelOfCare(level: string, limit = 20): Promise<EDListing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ed_listings')
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .contains('levels_of_care', [level])
    .order('listing_tier_rank', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data as EDListing[]) || []
}

export async function getFeaturedListings(limit = 6): Promise<EDListing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ed_listings')
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .eq('listing_tier', 'featured')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data as EDListing[]) || []
}

export async function getRecentListings(limit = 12): Promise<EDListing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ed_listings')
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier_rank', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data as EDListing[]) || []
}

export async function getCityCount(): Promise<number> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ed_listings')
    .select('city, state')
    .eq('is_active', true)
    .eq('is_approved', true)

  if (error || !data) return 0
  const unique = new Set(data.map((r: { city: string; state: string }) => `${r.city}-${r.state}`))
  return unique.size
}

export async function getTotalCount(): Promise<number> {
  const supabase = await createClient()
  const { count, error } = await supabase
    .from('ed_listings')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
    .eq('is_approved', true)

  if (error) return 0
  return count || 0
}

export async function getCities(): Promise<Array<{ city: string; state: string; count: number }>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ed_listings')
    .select('city, state')
    .eq('is_active', true)
    .eq('is_approved', true)

  if (error || !data) return []

  const cityMap = new Map<string, { city: string; state: string; count: number }>()
  for (const row of data as Array<{ city: string; state: string }>) {
    const key = `${row.city}-${row.state}`
    const existing = cityMap.get(key)
    if (existing) {
      existing.count++
    } else {
      cityMap.set(key, { city: row.city, state: row.state, count: 1 })
    }
  }

  return Array.from(cityMap.values())
    .filter((c) => c.count >= 2)
    .sort((a, b) => b.count - a.count)
}

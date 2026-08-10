import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getCities } from '@/lib/data'
import { DISORDERS, LEVELS_OF_CARE } from '@/lib/utils'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://eatingdisordertreatmentfinder.com'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const [cities, { data: listings }] = await Promise.all([
    getCities(),
    supabase
      .from('ed_listings')
      .select('slug, listing_type, updated_at')
      .eq('is_active', true)
      .eq('is_approved', true)
      .range(0, 9999),
  ])

  const cityUrls = cities.map(({ city, state }) => {
    const citySlug = `${city.toLowerCase().replace(/\s+/g, '-')}-${state.toLowerCase()}`
    return {
      url: `${BASE_URL}/eating-disorder-treatment/${citySlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })

  const disorderUrls = DISORDERS.map((d) => ({
    url: `${BASE_URL}/disorder/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const locUrls = LEVELS_OF_CARE.map((l) => ({
    url: `${BASE_URL}/level-of-care/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const centerUrls: MetadataRoute.Sitemap = (listings ?? [])
    .filter((l) => l.listing_type === 'center')
    .map((l) => ({
      url: `${BASE_URL}/center/${l.slug}`,
      lastModified: l.updated_at ? new Date(l.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  const providerUrls: MetadataRoute.Sitemap = (listings ?? [])
    .filter((l) => l.listing_type === 'provider')
    .map((l) => ({
      url: `${BASE_URL}/provider/${l.slug}`,
      lastModified: l.updated_at ? new Date(l.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/eating-disorder-treatment`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...cityUrls,
    ...disorderUrls,
    ...locUrls,
    ...centerUrls,
    ...providerUrls,
  ]
}

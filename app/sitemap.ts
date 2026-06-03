import { MetadataRoute } from 'next'
import { getCities } from '@/lib/data'
import { DISORDERS, LEVELS_OF_CARE } from '@/lib/utils'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://eatingdisordertreatmentfinder.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cities = await getCities()

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
  ]
}

import { existsSync, readdirSync } from 'fs'
import { join } from 'path'

const CITY_PAGE_PREFIX = 'eating-disorder-treatment-'
const PAGE_FILES = ['page.tsx', 'page.ts', 'page.jsx', 'page.js']

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://eatingdisordertreatmentfinder.com').replace(
    /\/$/,
    ''
  )
}

export function getBestCityPageSlugs(): string[] {
  const bestDir = join(process.cwd(), 'app', 'best')
  if (!existsSync(bestDir)) return []

  return readdirSync(bestDir, { withFileTypes: true })
    .filter((entry) => {
      if (!entry.isDirectory()) return false
      if (!entry.name.startsWith(CITY_PAGE_PREFIX)) return false
      return PAGE_FILES.some((file) => existsSync(join(bestDir, entry.name, file)))
    })
    .map((entry) => entry.name)
    .sort()
}

export function bestCityCanonical(slug: string): string {
  return `${getSiteUrl()}/best/${slug}`
}

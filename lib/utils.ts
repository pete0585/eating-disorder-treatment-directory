import { EDListing } from './types'

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getDisplayName(listing: EDListing): string {
  if (listing.listing_type === 'center') {
    return listing.facility_name || listing.provider_name || 'Treatment Center'
  }
  return listing.provider_name || listing.facility_name || 'Provider'
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return phone
}

export function formatState(state: string): string {
  const states: Record<string, string> = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
    CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
    HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
    KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
    MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
    MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
    NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
    OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
    SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
    VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
    DC: 'Washington D.C.',
  }
  return states[state.toUpperCase()] || state
}

export function citySlug(city: string, state: string): string {
  return `${slugify(city)}-${state.toLowerCase()}`
}

export function parseCitySlug(citySlug: string): { city: string; state: string } | null {
  const parts = citySlug.split('-')
  if (parts.length < 2) return null
  const state = parts[parts.length - 1].toUpperCase()
  const city = parts
    .slice(0, parts.length - 1)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ')
  return { city, state }
}

export const DISORDERS = [
  { slug: 'anorexia-nervosa', label: 'Anorexia Nervosa' },
  { slug: 'bulimia-nervosa', label: 'Bulimia Nervosa' },
  { slug: 'binge-eating-disorder', label: 'Binge Eating Disorder (BED)' },
  { slug: 'arfid', label: 'ARFID' },
  { slug: 'osfed', label: 'OSFED' },
  { slug: 'orthorexia', label: 'Orthorexia' },
  { slug: 'muscle-dysmorphia', label: 'Muscle Dysmorphia' },
  { slug: 'other', label: 'Other Eating Disorders' },
]

export const LEVELS_OF_CARE = [
  { slug: 'residential', label: 'Residential Treatment' },
  { slug: 'partial-hospitalization', label: 'Partial Hospitalization (PHP)' },
  { slug: 'intensive-outpatient', label: 'Intensive Outpatient (IOP)' },
  { slug: 'outpatient', label: 'Outpatient Therapy' },
  { slug: 'telehealth', label: 'Telehealth / Virtual' },
]

export const PROVIDER_TYPES = [
  { value: 'provider', label: 'Individual Providers' },
  { value: 'center', label: 'Treatment Centers' },
]

export const COMMUNITIES = [
  'LGBTQ+ Affirming',
  'Men',
  'Adolescents',
  'Athletes',
  'ARFID Specialists',
  'BIPOC',
  'Military / Veterans',
]

export const AGE_GROUPS = ['Children', 'Adolescents', 'Adults', 'Older Adults', 'All Ages']

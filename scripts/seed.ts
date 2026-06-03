/**
 * Seed script for eating-disorder-treatment directory.
 *
 * Primary sources:
 * 1. SAMHSA findtreatment.gov — filter by eating disorder treatment
 *    Download: https://findtreatment.gov/locator (CSV export by state)
 * 2. DataForSEO Google Maps — "eating disorder therapist [city]", "eating disorder dietitian [city]"
 * 3. NEDA/ANAD provider directories (Firecrawl)
 *
 * Run: npx ts-node scripts/seed.ts
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const SAMPLE_LISTINGS = [
  {
    listing_type: 'center',
    facility_name: 'The Center for Eating Disorders',
    slug: 'center-for-eating-disorders-baltimore-md',
    city: 'Baltimore',
    state: 'MD',
    phone: '(410) 427-2100',
    website_url: 'https://www.sheppardpratt.org/care-treatment/programs/eating-disorders/',
    disorders_treated: ['anorexia-nervosa', 'bulimia-nervosa', 'binge-eating-disorder', 'arfid', 'osfed'],
    levels_of_care: ['residential', 'partial-hospitalization', 'intensive-outpatient', 'outpatient'],
    listing_tier: 'free',
    listing_tier_rank: 0,
    is_active: true,
    is_approved: true,
  },
  {
    listing_type: 'center',
    facility_name: 'Renfrew Center',
    slug: 'renfrew-center-philadelphia-pa',
    city: 'Philadelphia',
    state: 'PA',
    phone: '(800) 736-3739',
    website_url: 'https://renfrewcenter.com/',
    disorders_treated: ['anorexia-nervosa', 'bulimia-nervosa', 'binge-eating-disorder', 'osfed'],
    levels_of_care: ['residential', 'partial-hospitalization', 'intensive-outpatient', 'outpatient'],
    listing_tier: 'free',
    listing_tier_rank: 0,
    is_active: true,
    is_approved: true,
  },
  {
    listing_type: 'provider',
    provider_name: 'Dr. Sarah Johnson, PhD',
    slug: 'dr-sarah-johnson-new-york-ny',
    city: 'New York',
    state: 'NY',
    phone: '(212) 555-0100',
    credentials: ['PhD', 'CEDS-S'],
    disorders_treated: ['anorexia-nervosa', 'bulimia-nervosa', 'binge-eating-disorder', 'arfid'],
    levels_of_care: ['outpatient', 'telehealth'],
    treatment_approaches: ['CBT-E', 'DBT', 'FBT'],
    communities_served: ['LGBTQ+ Affirming', 'Adolescents', 'Adults'],
    telehealth_available: true,
    accepting_new_patients: true,
    listing_tier: 'free',
    listing_tier_rank: 0,
    is_active: true,
    is_approved: true,
  },
]

async function seed() {
  console.log('Seeding eating disorder treatment listings...')

  for (const listing of SAMPLE_LISTINGS) {
    const { error } = await supabase.from('ed_listings').upsert(
      {
        ...listing,
        telehealth_available: listing.telehealth_available ?? false,
        accepting_new_patients: listing.accepting_new_patients ?? null,
      },
      { onConflict: 'slug' }
    )

    if (error) {
      console.error(`Failed to seed ${listing.slug}:`, error.message)
    } else {
      console.log(`✓ Seeded: ${listing.slug}`)
    }
  }

  console.log('\nSeed complete.')
  console.log('\nNext steps for full seeding:')
  console.log('1. Download SAMHSA N-MHSS data filtered for eating disorder treatment:')
  console.log('   https://findtreatment.gov/locator — CSV export by state')
  console.log('2. Run DataForSEO Google Maps for "eating disorder therapist [city]" across top 100 US cities')
  console.log('3. Scrape NEDA provider directory via Firecrawl:')
  console.log('   map.nationaleatingdisorders.org')
}

seed().catch(console.error)

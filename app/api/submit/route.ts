import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { slugify } from '@/lib/utils'

const schema = z.object({
  listing_type: z.enum(['provider', 'center']),
  provider_name: z.string().optional(),
  facility_name: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(2).max(2),
  address: z.string().optional(),
  zip: z.string().optional(),
  phone: z.string().optional(),
  website_url: z.string().url().optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  bio: z.string().max(1000).optional(),
  telehealth_available: z.boolean(),
  accepting_new_patients: z.boolean(),
  disorders_treated: z.array(z.string()),
  levels_of_care: z.array(z.string()),
  communities_served: z.array(z.string()),
})

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 422 })
  }

  const data = result.data
  const name =
    data.listing_type === 'center'
      ? data.facility_name || data.provider_name
      : data.provider_name || data.facility_name

  if (!name) {
    return NextResponse.json({ error: 'Provider or facility name is required' }, { status: 422 })
  }

  const supabase = await createServiceClient()

  // Generate unique slug
  let baseSlug = slugify(`${name} ${data.city} ${data.state}`)
  let slug = baseSlug
  let attempt = 0

  while (attempt < 10) {
    const { data: existing } = await supabase
      .from('ed_listings')
      .select('id')
      .eq('slug', slug)
      .single()

    if (!existing) break
    attempt++
    slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`
  }

  const { error } = await supabase.from('ed_listings').insert({
    listing_type: data.listing_type,
    provider_name: data.provider_name || null,
    facility_name: data.facility_name || null,
    slug,
    city: data.city,
    state: data.state.toUpperCase(),
    address: data.address || null,
    zip: data.zip || null,
    phone: data.phone || null,
    website_url: data.website_url || null,
    email: data.email || null,
    bio: data.bio || null,
    telehealth_available: data.telehealth_available,
    accepting_new_patients: data.accepting_new_patients,
    disorders_treated: data.disorders_treated,
    levels_of_care: data.levels_of_care,
    communities_served: data.communities_served,
    listing_tier: 'free',
    listing_tier_rank: 0,
    is_active: true,
    is_approved: false,
    claimed: false,
    outreach_step: 0,
  })

  if (error) {
    console.error('Submit error:', error)
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

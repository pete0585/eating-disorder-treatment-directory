export type ListingTier = 'free' | 'verified' | 'featured'
export type ListingType = 'provider' | 'center'

export interface EDListing {
  id: string
  listing_type: ListingType
  provider_name?: string | null
  facility_name?: string | null
  slug: string
  address?: string | null
  city: string
  state: string
  zip?: string | null
  phone?: string | null
  website_url?: string | null
  email?: string | null
  email_source?: string | null
  bio?: string | null
  photo_url?: string | null
  credentials?: string[] | null
  disorders_treated?: string[] | null
  levels_of_care?: string[] | null
  treatment_approaches?: string[] | null
  insurance_accepted?: string[] | null
  telehealth_available: boolean
  ages_served?: string[] | null
  genders_served?: string[] | null
  communities_served?: string[] | null
  accreditations?: string[] | null
  accepting_new_patients?: boolean | null
  listing_tier: ListingTier
  listing_tier_rank: number
  is_active: boolean
  is_approved: boolean
  stripe_customer_id?: string | null
  stripe_subscription_id?: string | null
  plan_expires_at?: string | null
  claimed: boolean
  claimed_at?: string | null
  outreach_step: number
  outreach_sent_at?: string | null
  created_at: string
  updated_at: string
}

export interface EDClaim {
  id: string
  listing_id: string
  email: string
  token: string
  verified: boolean
  verified_at?: string | null
  created_at: string
  expires_at: string
  nudge_sent_at?: string | null
}

export interface EDPayment {
  id: string
  listing_id: string
  stripe_session_id?: string | null
  stripe_customer_id?: string | null
  stripe_subscription_id?: string | null
  amount: number
  currency: string
  tier: string
  status: string
  created_at: string
}

export interface BrowseFilters {
  city?: string
  state?: string
  listing_type?: string
  disorder?: string
  level_of_care?: string
  insurance?: string
  telehealth?: boolean
  community?: string
  age_group?: string
  gender?: string
  accepting?: boolean
  tier?: string
  q?: string
  page?: number
}

-- Eating Disorder Treatment Finder — Initial Schema
-- Project: fbuqrnzofktepkzyfmhy (Directories)

-- Drop any bootstrap-created generic tables
DROP TABLE IF EXISTS eating_disorder_treatment_claims CASCADE;
DROP TABLE IF EXISTS eating_disorder_treatment_listings CASCADE;
DROP TABLE IF EXISTS eating_disorder_treatment_payments CASCADE;

-- ed_listings
CREATE TABLE IF NOT EXISTS ed_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_type varchar NOT NULL DEFAULT 'provider', -- 'provider', 'center'
  provider_name varchar,
  facility_name varchar,
  slug varchar UNIQUE NOT NULL,
  address varchar,
  city varchar NOT NULL,
  state varchar(2) NOT NULL,
  zip varchar,
  phone varchar,
  website_url varchar,
  email varchar,
  email_source varchar,
  bio text,
  photo_url varchar,
  credentials text[],
  disorders_treated text[],
  levels_of_care text[],
  treatment_approaches text[],
  insurance_accepted text[],
  telehealth_available boolean NOT NULL DEFAULT false,
  ages_served text[],
  genders_served text[],
  communities_served text[],
  accreditations text[],
  accepting_new_patients boolean,
  listing_tier varchar NOT NULL DEFAULT 'free', -- 'free', 'verified', 'featured'
  listing_tier_rank integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  is_approved boolean NOT NULL DEFAULT false,
  stripe_customer_id varchar,
  stripe_subscription_id varchar,
  plan_expires_at timestamptz,
  claimed boolean NOT NULL DEFAULT false,
  claimed_at timestamptz,
  outreach_step integer NOT NULL DEFAULT 0,
  outreach_sent_at timestamptz,
  search_vector tsvector,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Full-text search vector trigger
CREATE OR REPLACE FUNCTION ed_listings_search_vector_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.provider_name, '') || ' ' || coalesce(NEW.facility_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.city, '') || ' ' || coalesce(NEW.state, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.bio, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ed_listings_search_update ON ed_listings;
CREATE TRIGGER ed_listings_search_update
  BEFORE INSERT OR UPDATE ON ed_listings
  FOR EACH ROW EXECUTE FUNCTION ed_listings_search_vector_trigger();

-- Indexes
CREATE INDEX IF NOT EXISTS ed_listings_city_state ON ed_listings(city, state);
CREATE INDEX IF NOT EXISTS ed_listings_state ON ed_listings(state);
CREATE INDEX IF NOT EXISTS ed_listings_listing_type ON ed_listings(listing_type);
CREATE INDEX IF NOT EXISTS ed_listings_listing_tier ON ed_listings(listing_tier);
CREATE INDEX IF NOT EXISTS ed_listings_tier_rank ON ed_listings(listing_tier_rank DESC);
CREATE INDEX IF NOT EXISTS ed_listings_active_approved ON ed_listings(is_active, is_approved);
CREATE INDEX IF NOT EXISTS ed_listings_search_vector ON ed_listings USING gin(search_vector);
CREATE INDEX IF NOT EXISTS ed_listings_disorders ON ed_listings USING gin(disorders_treated);
CREATE INDEX IF NOT EXISTS ed_listings_levels_of_care ON ed_listings USING gin(levels_of_care);
CREATE INDEX IF NOT EXISTS ed_listings_communities ON ed_listings USING gin(communities_served);

-- ed_claims
CREATE TABLE IF NOT EXISTS ed_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL REFERENCES ed_listings(id) ON DELETE CASCADE,
  email text NOT NULL,
  token text UNIQUE NOT NULL,
  verified boolean NOT NULL DEFAULT false,
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  nudge_sent_at timestamptz
);

CREATE INDEX IF NOT EXISTS ed_claims_listing_id ON ed_claims(listing_id);
CREATE INDEX IF NOT EXISTS ed_claims_token ON ed_claims(token);

-- ed_payments
CREATE TABLE IF NOT EXISTS ed_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL REFERENCES ed_listings(id) ON DELETE CASCADE,
  stripe_session_id varchar,
  stripe_customer_id varchar,
  stripe_subscription_id varchar,
  amount integer NOT NULL DEFAULT 0,
  currency varchar(3) NOT NULL DEFAULT 'usd',
  tier varchar NOT NULL,
  status varchar NOT NULL DEFAULT 'paid',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ed_payments_listing_id ON ed_payments(listing_id);

-- inbound_emails (shared table across all directories)
CREATE TABLE IF NOT EXISTS inbound_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  directory varchar NOT NULL,
  from_email text NOT NULL,
  from_name text,
  subject text,
  body_text text,
  body_html text,
  listing_id uuid,
  listing_slug varchar,
  processed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS inbound_emails_processed ON inbound_emails(processed);
CREATE INDEX IF NOT EXISTS inbound_emails_directory ON inbound_emails(directory);

-- Row Level Security
ALTER TABLE ed_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ed_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE ed_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE inbound_emails ENABLE ROW LEVEL SECURITY;

-- Allow public read of approved/active listings
CREATE POLICY "Public can read approved listings"
  ON ed_listings FOR SELECT
  USING (is_active = true AND is_approved = true);

-- Service role has full access (bypasses RLS by default)
-- No additional policies needed for service role

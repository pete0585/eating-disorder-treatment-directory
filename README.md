# Eating Disorder Treatment Finder

The first standalone commercial directory covering the full continuum of eating disorder care — therapists, dietitians, psychiatrists, and residential programs — with SEO-optimized city pages, disorder-type pages, and level-of-care pages.

**Domain:** eatingdisordertreatmentfinder.com  
**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Supabase · Stripe · Vercel

---

## Local Development

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with your values (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` for local work. Production values live in **Vercel → Project → Settings → Environment Variables**. Do not commit live `whsec_`, `sk_`, JWT, or IndexNow values.

| Variable | Source |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NEXT_PUBLIC_SITE_URL` | `https://eatingdisordertreatmentfinder.com` |
| `STRIPE_SECRET_KEY` | Stripe secret key (Dashboard → API keys) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_REPLACE_ME`) — set in Vercel, never commit |
| `STRIPE_VERIFIED_PRICE_ID` | `price_REPLACE_ME` ($149/yr) — set in Vercel |
| `STRIPE_FEATURED_PRICE_ID` | `price_REPLACE_ME` ($299/yr) — set in Vercel |
| `RESEND_API_KEY` | Resend dashboard |
| `RESEND_FROM_EMAIL` | `hello@mail.eatingdisordertreatmentfinder.com` |
| `INDEXNOW_KEY` | IndexNow key — set in Vercel only; do not commit |

---

## Database Setup

### Apply migration

```bash
# Via Supabase CLI (if configured)
supabase db push

# Or run the SQL directly in the Supabase dashboard
# File: supabase/migrations/001_initial_schema.sql
```

This creates: `ed_listings`, `ed_claims`, `ed_payments`, `inbound_emails` (shared).

### Seed initial data

```bash
npx ts-node scripts/seed.ts
```

For production seeding:
1. Download SAMHSA N-MHSS data (eating disorder filter) from findtreatment.gov
2. Use the data-seeder agent with keywords: "eating disorder therapist", "eating disorder dietitian", "eating disorder treatment center"

---

## Vercel Deployment

The Vercel project was created by the bootstrap agent (`prj_VshAG1IDkMVHaQsUjuafvFyIthad`). 

To deploy:
1. Push this directory to `pete0585/eating-disorder-treatment-directory`
2. Vercel auto-deploys on push

Custom domains already configured:
- `eatingdisordertreatmentfinder.com`
- `www.eatingdisordertreatmentfinder.com`

---

## Stripe Setup

Stripe products already created by bootstrap. Use the live Price IDs from the Stripe Dashboard (or Vercel env vars); do not commit them:

- **Verified listing**: $149/yr — set `STRIPE_VERIFIED_PRICE_ID` to `price_REPLACE_ME`
- **Featured listing**: $299/yr — set `STRIPE_FEATURED_PRICE_ID` to `price_REPLACE_ME`

Webhook endpoint: `https://www.eatingdisordertreatmentfinder.com/api/webhooks/stripe`  
Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`

---

## Resend Setup

Sending domain: `mail.eatingdisordertreatmentfinder.com`  
Resend domain ID: `d9bf08df-0e0a-4af7-a326-e963066c06f1`

Inbound webhook: `https://www.eatingdisordertreatmentfinder.com/api/inbound-email`

---

## IndexNow

The live IndexNow key is **not stored in git**. It lives in the Vercel env var `INDEXNOW_KEY`, and Bing/IndexNow expect a matching verification file at `public/{key}.txt` (also not committed).

Submit sitemap after launch (replace the placeholder with the value from Vercel):
```bash
curl "https://api.indexnow.org/indexnow?url=https://eatingdisordertreatmentfinder.com/sitemap.xml&key=REPLACE_ME"
```

---

## Directory Structure

```
app/
├── page.tsx                              # Homepage with hero search
├── eating-disorder-treatment/
│   ├── page.tsx                          # Browse/search with filters
│   └── [citySlug]/page.tsx              # City landing pages (e.g. /eating-disorder-treatment/new-york-ny)
├── provider/[slug]/page.tsx              # Individual provider detail
├── center/[slug]/page.tsx               # Treatment center detail
├── disorder/[slug]/page.tsx             # Disorder-type pages (anorexia, bulimia, etc.)
├── level-of-care/[slug]/page.tsx        # Level-of-care pages (residential, PHP, etc.)
├── submit/page.tsx                       # Submit listing form
├── claim/[id]/page.tsx                   # Claim listing flow
├── admin/page.tsx                        # Admin panel (approve/reject)
└── api/
    ├── webhooks/stripe/route.ts          # Stripe webhook handler
    ├── inbound-email/route.ts            # Resend inbound email handler
    ├── upgrade/route.ts                  # Stripe checkout session creator
    ├── claim/route.ts                    # Claim verification email sender
    ├── submit/route.ts                   # Listing submission
    └── admin/{approve,reject}/route.ts   # Admin actions
```

---

## Revenue Model

| Tier | Price | Target |
|---|---|---|
| Free | $0 | All ED providers (auto-seeded) |
| Verified | $149/yr | Individual providers + centers wanting profile |
| Featured | $299/yr | Centers wanting top placement + badge |

Month 6 MRR target: $2,500-4,000  
Month 12 MRR target: $5,000-8,000 + B2B sponsors

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

Copy `.env.example` to `.env.local` and fill in:

| Variable | Source |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NEXT_PUBLIC_SITE_URL` | `https://eatingdisordertreatmentfinder.com` |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | From bootstrap: `whsec_fb1aw13GWh5YD5L2fBJ8JU5UsMn9X5JI` |
| `STRIPE_VERIFIED_PRICE_ID` | `price_1TeHMIGzK9Sibluei2rB8p9G` ($149/yr) |
| `STRIPE_FEATURED_PRICE_ID` | `price_1TeHMIGzK9SiblueKF6y2Mxi` ($299/yr) |
| `RESEND_API_KEY` | From bootstrap or Resend dashboard |
| `RESEND_FROM_EMAIL` | `hello@mail.eatingdisordertreatmentfinder.com` |

**All env vars are already set in Vercel** — the bootstrap agent set them via API. No manual configuration needed.

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

Stripe products already created by bootstrap:
- **Verified listing**: `prod_UdYS5qfnorV19d` → `price_1TeHMIGzK9Sibluei2rB8p9G` ($149/yr)
- **Featured listing**: `prod_UdYStRH3ROBQ2Y` → `price_1TeHMIGzK9SiblueKF6y2Mxi` ($299/yr)

Webhook endpoint: `https://www.eatingdisordertreatmentfinder.com/api/webhooks/stripe`  
Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`

---

## Resend Setup

Sending domain: `mail.eatingdisordertreatmentfinder.com`  
Resend domain ID: `d9bf08df-0e0a-4af7-a326-e963066c06f1`

Inbound webhook: `https://www.eatingdisordertreatmentfinder.com/api/inbound-email`

---

## IndexNow

Key: `19ee5bf9d3f45c1fc7c92969d2281df9`

Submit sitemap after launch:
```bash
curl "https://api.indexnow.org/indexnow?url=https://eatingdisordertreatmentfinder.com/sitemap.xml&key=19ee5bf9d3f45c1fc7c92969d2281df9"
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

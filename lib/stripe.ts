import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export const STRIPE_PRICES = {
  verified: process.env.STRIPE_VERIFIED_PRICE_ID!,
  featured: process.env.STRIPE_FEATURED_PRICE_ID!,
}

export const TIER_AMOUNTS = {
  verified: 14900,
  featured: 29900,
}

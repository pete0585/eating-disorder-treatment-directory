import { notFound, redirect } from 'next/navigation'
import { getListingBySlug } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const listing = await getListingBySlug(slug).catch(() => null)
  if (!listing) notFound()
  if (listing.listing_type === 'center') redirect(`/center/${slug}`)
  if (listing.listing_type === 'provider') redirect(`/provider/${slug}`)
  // fallback: render as center if listing_type is unset
  redirect(`/center/${slug}`)
}

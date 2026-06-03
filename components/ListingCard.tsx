import Link from 'next/link'
import { MapPin, Phone, Globe, CheckCircle, Star } from 'lucide-react'
import { EDListing } from '@/lib/types'
import { getDisplayName, formatPhone } from '@/lib/utils'

interface Props {
  listing: EDListing
}

export default function ListingCard({ listing }: Props) {
  const name = getDisplayName(listing)
  const href =
    listing.listing_type === 'center'
      ? `/center/${listing.slug}`
      : `/provider/${listing.slug}`

  return (
    <div className="card p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {listing.listing_type === 'center' ? (
              <span className="badge-type-center">Treatment Center</span>
            ) : (
              <span className="badge-type-provider">Provider</span>
            )}
            {listing.listing_tier === 'featured' && (
              <span className="badge-tier-featured flex items-center gap-1">
                <Star className="w-3 h-3" />
                Featured
              </span>
            )}
            {listing.listing_tier === 'verified' && (
              <span className="badge-tier-verified flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
          <Link href={href} className="hover:text-brand-plum transition-colors">
            <h3 className="font-semibold text-brand-charcoal text-base leading-snug">{name}</h3>
          </Link>
          {listing.credentials && listing.credentials.length > 0 && (
            <p className="text-xs text-gray-500 mt-0.5">{listing.credentials.join(', ')}</p>
          )}
        </div>
        {listing.photo_url && (
          <img
            src={listing.photo_url}
            alt={name}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
          />
        )}
      </div>

      {/* Location */}
      {(listing.city || listing.state) && (
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span>
            {listing.city}{listing.city && listing.state && ', '}{listing.state}
          </span>
        </div>
      )}

      {/* Disorders */}
      {listing.disorders_treated && listing.disorders_treated.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {listing.disorders_treated.slice(0, 4).map((d) => (
            <span
              key={d}
              className="text-xs bg-brand-plum-light text-brand-plum-dark px-2 py-0.5 rounded-full"
            >
              {d}
            </span>
          ))}
          {listing.disorders_treated.length > 4 && (
            <span className="text-xs text-gray-500">+{listing.disorders_treated.length - 4} more</span>
          )}
        </div>
      )}

      {/* Levels of care */}
      {listing.levels_of_care && listing.levels_of_care.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {listing.levels_of_care.slice(0, 3).map((l) => (
            <span
              key={l}
              className="text-xs bg-brand-teal-light text-brand-teal-dark px-2 py-0.5 rounded-full"
            >
              {l}
            </span>
          ))}
        </div>
      )}

      {/* Bio snippet */}
      {listing.bio && (
        <p className="text-sm text-gray-600 line-clamp-2">{listing.bio}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100 mt-1">
        <div className="flex gap-3">
          {listing.phone && (
            <a
              href={`tel:${listing.phone}`}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-brand-plum transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {formatPhone(listing.phone)}
            </a>
          )}
          {listing.website_url && (
            <a
              href={listing.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-brand-plum transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              Website
            </a>
          )}
        </div>
        <Link
          href={href}
          className="text-sm font-semibold text-brand-plum hover:text-brand-plum-dark transition-colors"
        >
          View Profile →
        </Link>
      </div>
    </div>
  )
}

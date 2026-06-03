'use client'

import { useState } from 'react'
import { Check, X, ExternalLink } from 'lucide-react'
import { EDListing } from '@/lib/types'
import { getDisplayName } from '@/lib/utils'

interface Props {
  listings: EDListing[]
}

export default function AdminTable({ listings }: Props) {
  const [processing, setProcessing] = useState<string | null>(null)
  const [processed, setProcessed] = useState<Set<string>>(new Set())

  async function handleAction(id: string, action: 'approve' | 'reject') {
    setProcessing(id)
    try {
      const res = await fetch(`/api/admin/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setProcessed((prev) => new Set([...prev, id]))
      }
    } finally {
      setProcessing(null)
    }
  }

  const visible = listings.filter((l) => !processed.has(l.id))

  if (visible.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No pending listings. All caught up!
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
          <tr>
            <th className="text-left px-4 py-3">Name</th>
            <th className="text-left px-4 py-3">Type</th>
            <th className="text-left px-4 py-3">Location</th>
            <th className="text-left px-4 py-3">Phone</th>
            <th className="text-left px-4 py-3">Tier</th>
            <th className="text-left px-4 py-3">Submitted</th>
            <th className="text-left px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {visible.map((listing) => (
            <tr key={listing.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-brand-charcoal">
                <div className="flex items-center gap-2">
                  {getDisplayName(listing)}
                  <a
                    href={`/${listing.listing_type === 'center' ? 'center' : 'provider'}/${listing.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-brand-plum"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={listing.listing_type === 'center' ? 'badge-type-center' : 'badge-type-provider'}>
                  {listing.listing_type}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-600">
                {listing.city}, {listing.state}
              </td>
              <td className="px-4 py-3 text-gray-600">{listing.phone || '—'}</td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    listing.listing_tier === 'featured'
                      ? 'bg-rose-100 text-rose-700'
                      : listing.listing_tier === 'verified'
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {listing.listing_tier}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(listing.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(listing.id, 'approve')}
                    disabled={processing === listing.id}
                    className="flex items-center gap-1 bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(listing.id, 'reject')}
                    disabled={processing === listing.id}
                    className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                  >
                    <X className="w-3.5 h-3.5" />
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

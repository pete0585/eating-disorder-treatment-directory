'use client'

import { useState } from 'react'

interface Props {
  listingId: string
  listingName: string
}

export default function ClaimForm({ listingId, listingName }: Props) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: listingId, email }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      window.location.href = `/claim/${listingId}?verified=true`
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="form-label">Your Business Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          placeholder="you@yourpractice.com"
        />
        <p className="text-xs text-gray-500 mt-1">
          We&apos;ll send a one-click verification link to this address.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !email}
        className="w-full btn-primary disabled:opacity-60"
      >
        {loading ? 'Sending...' : 'Send Verification Link'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        The email must match the domain of {listingName}&apos;s website. The link expires in 72 hours.
      </p>
    </form>
  )
}

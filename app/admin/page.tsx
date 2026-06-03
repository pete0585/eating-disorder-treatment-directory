import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import AdminTable from '@/components/AdminTable'
import { EDListing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Admin — ED Treatment Finder',
  robots: { index: false },
}

export default async function AdminPage() {
  const supabase = await createServiceClient()

  const { data: pending } = await supabase
    .from('ed_listings')
    .select('*')
    .eq('is_approved', false)
    .eq('is_active', true)
    .order('created_at', { ascending: true })
    .limit(100)

  const { count: totalCount } = await supabase
    .from('ed_listings')
    .select('*', { count: 'exact', head: true })

  const { count: approvedCount } = await supabase
    .from('ed_listings')
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', true)

  const { count: featuredCount } = await supabase
    .from('ed_listings')
    .select('*', { count: 'exact', head: true })
    .eq('listing_tier', 'featured')

  const { count: verifiedCount } = await supabase
    .from('ed_listings')
    .select('*', { count: 'exact', head: true })
    .eq('listing_tier', 'verified')

  const { count: claimedCount } = await supabase
    .from('ed_listings')
    .select('*', { count: 'exact', head: true })
    .eq('claimed', true)

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-charcoal mb-6">Admin Panel</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total Listings', value: totalCount || 0 },
          { label: 'Approved', value: approvedCount || 0, color: 'text-teal-700' },
          { label: 'Pending Review', value: (pending || []).length, color: 'text-orange-600' },
          { label: 'Claimed', value: claimedCount || 0 },
          { label: 'Featured', value: featuredCount || 0, color: 'text-brand-rose' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5 text-center">
            <div className={`text-3xl font-bold ${stat.color || 'text-brand-charcoal'}`}>
              {stat.value.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pending approvals */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="font-bold text-brand-charcoal">
            Pending Approval ({(pending || []).length})
          </h2>
        </div>
        <AdminTable listings={(pending || []) as EDListing[]} />
      </div>
    </div>
  )
}

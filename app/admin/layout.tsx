import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-charcoal text-white px-6 py-4 flex items-center gap-3">
        <span className="font-bold text-lg">ED Treatment Finder</span>
        <span className="text-gray-400">Admin</span>
        <div className="ml-auto text-sm text-gray-400">{user.email}</div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</div>
    </div>
  )
}

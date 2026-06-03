'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Heart } from 'lucide-react'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-brand-plum" fill="currentColor" />
            <span className="font-bold text-brand-charcoal text-lg leading-tight">
              <span className="text-brand-plum">Eating Disorder</span>
              <span className="hidden sm:inline"> Treatment Finder</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/eating-disorder-treatment" className="text-gray-600 hover:text-brand-plum transition-colors">
              Find Treatment
            </Link>
            <Link href="/disorder/anorexia-nervosa" className="text-gray-600 hover:text-brand-plum transition-colors">
              By Disorder
            </Link>
            <Link href="/level-of-care/residential" className="text-gray-600 hover:text-brand-plum transition-colors">
              Levels of Care
            </Link>
            <Link href="/submit" className="text-gray-600 hover:text-brand-plum transition-colors">
              Add Listing
            </Link>
            <Link
              href="/submit"
              className="bg-brand-plum text-white px-4 py-2 rounded-lg hover:bg-brand-plum-dark transition-colors"
            >
              List Your Practice
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <Link
            href="/eating-disorder-treatment"
            className="block text-gray-700 font-medium py-2"
            onClick={() => setMobileOpen(false)}
          >
            Find Treatment
          </Link>
          <Link
            href="/disorder/anorexia-nervosa"
            className="block text-gray-700 font-medium py-2"
            onClick={() => setMobileOpen(false)}
          >
            By Disorder
          </Link>
          <Link
            href="/level-of-care/residential"
            className="block text-gray-700 font-medium py-2"
            onClick={() => setMobileOpen(false)}
          >
            Levels of Care
          </Link>
          <Link
            href="/submit"
            className="block w-full bg-brand-plum text-white text-center px-4 py-3 rounded-lg font-semibold"
            onClick={() => setMobileOpen(false)}
          >
            List Your Practice
          </Link>
        </div>
      )}
    </header>
  )
}

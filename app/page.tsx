import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Search, Heart, Shield, Users, ArrowRight } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'
import { getFeaturedListings, getRecentListings, getCityCount, getTotalCount } from '@/lib/data'
import { DISORDERS, LEVELS_OF_CARE } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Eating Disorder Treatment Finder — Find Specialized Care Near You',
  description:
    'Find eating disorder therapists, dietitians, psychiatrists, and residential programs near you. Specialized in anorexia, bulimia, BED, ARFID, and more.',
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [featured, recent, cityCount, totalCount] = await Promise.all([
    getFeaturedListings(3),
    getRecentListings(6),
    getCityCount(),
    getTotalCount(),
  ])

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-lavender via-white to-brand-teal-light py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-plum-light text-brand-plum text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Heart className="w-4 h-4" />
            Finding specialized care shouldn&apos;t be this hard. We built this so it isn&apos;t.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-charcoal leading-tight mb-5">
            Find an eating disorder specialist{' '}
            <span className="text-brand-plum">who actually gets it</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Therapists, dietitians, psychiatrists, and treatment centers — specialized in anorexia,
            bulimia, BED, ARFID, and more. Filter by level of care, community served, and
            insurance. Real specialists, not a general psychology directory.
          </p>

          <Suspense>
            <SearchBar placeholder="Disorder type, treatment level, or provider name" />
          </Suspense>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-brand-teal rounded-full" />
              {totalCount.toLocaleString()}+ providers listed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-brand-plum rounded-full" />
              {cityCount}+ cities covered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-brand-rose rounded-full" />
              All 50 states
            </span>
          </div>
        </div>
      </section>

      {/* Crisis banner */}
      <div className="bg-brand-rose text-white py-3 px-4 text-center text-sm">
        <strong>In crisis?</strong>{' '}
        Call the NEDA Helpline:{' '}
        <a href="tel:1-800-931-2237" className="underline font-semibold">
          1-800-931-2237
        </a>
        {' '}or text HOME to 741741 for the Crisis Text Line.
      </div>

      {/* Browse by disorder */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">Browse by Disorder</h2>
            <Link href="/eating-disorder-treatment" className="text-brand-plum font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {DISORDERS.map((d) => (
              <Link
                key={d.slug}
                href={`/disorder/${d.slug}`}
                className="group card p-4 text-center hover:border-brand-plum/30"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-brand-plum transition-colors">
                  {d.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by level of care */}
      <section className="py-14 bg-brand-lavender">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Not sure what level of care you need?</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              Eating disorder treatment ranges from telehealth therapy to 24/7 residential programs.
              Find the right level for where you are right now.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {LEVELS_OF_CARE.map((l) => (
              <Link
                key={l.slug}
                href={`/level-of-care/${l.slug}`}
                className="group card p-5 text-center hover:border-brand-teal/40"
              >
                <span className="text-sm font-semibold text-gray-700 group-hover:text-brand-teal transition-colors">
                  {l.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      {featured.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title">Featured Providers &amp; Centers</h2>
              <Link href="/eating-disorder-treatment" className="text-brand-plum font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Browse all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent listings */}
      {recent.length > 0 && (
        <section className="py-14 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title">Recently Added</h2>
              <Link href="/eating-disorder-treatment" className="text-brand-plum font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Browse all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recent.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why us */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-10">Why this directory is different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-plum-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-brand-plum" />
              </div>
              <h3 className="font-bold text-brand-charcoal mb-2">Filter that actually works</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Filter by disorder type, level of care, insurance accepted, community served — not just location.
                Find an ARFID specialist, a men&apos;s-only program, or LGBTQ+-affirming care in seconds.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-teal-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-brand-teal" />
              </div>
              <h3 className="font-bold text-brand-charcoal mb-2">Real specialists, not generalists</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every provider on this directory specializes in eating disorders — not a general
                psychology directory where &quot;treats anxiety&quot; is checked alongside &quot;eating disorders.&quot;
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-rose-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-brand-rose" />
              </div>
              <h3 className="font-bold text-brand-charcoal mb-2">Every level of care</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                From telehealth therapy to residential programs — individual providers, dietitians,
                psychiatrists, and full treatment centers in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for providers */}
      <section className="py-16 bg-brand-plum text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Are you an eating disorder specialist?</h2>
          <p className="text-brand-plum-light/90 text-lg mb-8 leading-relaxed">
            Add your free listing and reach patients who are specifically looking for ED specialists.
            Verified and Featured tiers put you at the top of city and disorder-type search results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="bg-white text-brand-plum font-semibold px-8 py-4 rounded-xl hover:bg-brand-plum-light transition-colors"
            >
              Add Free Listing
            </Link>
            <Link
              href="/eating-disorder-treatment"
              className="border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-xl hover:border-white transition-colors"
            >
              Browse Directory
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

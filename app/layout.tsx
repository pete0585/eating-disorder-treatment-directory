import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Eating Disorder Treatment Finder — Find Specialized Care Near You',
    template: '%s | EatingDisorderTreatmentFinder',
  },
  description:
    'Find eating disorder therapists, dietitians, psychiatrists, and treatment centers near you. Specialists in anorexia, bulimia, BED, ARFID, and more.',
  keywords: [
    'eating disorder treatment',
    'eating disorder therapist near me',
    'eating disorder treatment center',
    'anorexia treatment',
    'bulimia therapist',
    'ARFID specialist',
    'binge eating disorder treatment',
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://eatingdisordertreatmentfinder.com'
  ),
  openGraph: {
    type: 'website',
    siteName: 'Eating Disorder Treatment Finder',
    title: 'Eating Disorder Treatment Finder',
    description:
      'Find eating disorder therapists, dietitians, and treatment programs near you — by disorder type, level of care, and community.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FDFCFF]">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

import Link from 'next/link'
import { Heart, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Crisis resources */}
        <div className="bg-brand-rose/20 border border-brand-rose/40 rounded-xl p-5 mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Phone className="w-5 h-5 text-brand-rose" />
            <span className="font-bold text-white text-lg">Crisis & Helpline Resources</span>
          </div>
          <p className="text-gray-300 text-sm mb-3">
            If you or someone you know is struggling with an eating disorder, help is available now.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:1-800-931-2237"
              className="bg-brand-rose text-white font-semibold px-5 py-2 rounded-lg hover:bg-rose-700 transition-colors text-sm"
            >
              NEDA Helpline: 1-800-931-2237
            </a>
            <a
              href="sms:741741"
              className="border border-brand-rose text-brand-rose font-semibold px-5 py-2 rounded-lg hover:bg-brand-rose/10 transition-colors text-sm"
            >
              Crisis Text Line: Text HOME to 741741
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-brand-rose" fill="currentColor" />
              <span className="font-bold text-white">ED Treatment Finder</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The most comprehensive directory of eating disorder treatment providers in the US — from
              residential programs to outpatient therapists.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">By Disorder</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/disorder/anorexia-nervosa" className="hover:text-white transition-colors">Anorexia Nervosa</Link></li>
              <li><Link href="/disorder/bulimia-nervosa" className="hover:text-white transition-colors">Bulimia Nervosa</Link></li>
              <li><Link href="/disorder/binge-eating-disorder" className="hover:text-white transition-colors">Binge Eating Disorder</Link></li>
              <li><Link href="/disorder/arfid" className="hover:text-white transition-colors">ARFID</Link></li>
              <li><Link href="/disorder/osfed" className="hover:text-white transition-colors">OSFED</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Levels of Care</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/level-of-care/residential" className="hover:text-white transition-colors">Residential Treatment</Link></li>
              <li><Link href="/level-of-care/partial-hospitalization" className="hover:text-white transition-colors">Partial Hospitalization (PHP)</Link></li>
              <li><Link href="/level-of-care/intensive-outpatient" className="hover:text-white transition-colors">Intensive Outpatient (IOP)</Link></li>
              <li><Link href="/level-of-care/outpatient" className="hover:text-white transition-colors">Outpatient Therapy</Link></li>
              <li><Link href="/level-of-care/telehealth" className="hover:text-white transition-colors">Telehealth / Virtual</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">For Providers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/submit" className="hover:text-white transition-colors">Add Your Listing</Link></li>
              <li><Link href="/submit" className="hover:text-white transition-colors">Upgrade to Verified</Link></li>
              <li><Link href="/eating-disorder-treatment" className="hover:text-white transition-colors">Browse All Providers</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Eating Disorder Treatment Finder. All rights reserved.
          </p>
          <p className="text-center text-xs max-w-lg">
            This directory is for informational purposes only and does not constitute medical advice.
            Always consult a qualified healthcare provider for diagnosis and treatment.
          </p>
        </div>
      </div>
    </footer>
  )
}

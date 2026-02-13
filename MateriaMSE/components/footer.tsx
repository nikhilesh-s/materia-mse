import Link from 'next/link';
import { MoleculeDiamondIcon } from '@/components/icons/molecule-diamond';

export function Footer() {
  return (
    <footer id="footer-section" className="bg-[var(--bg-soft-light)] border-t border-[var(--border-light)] text-secondary py-16">
      <div className="content-container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2 pr-8">
            <Link href="/" className="page-link inline-flex items-center space-x-2.5 mb-4">
              <MoleculeDiamondIcon className="h-7 w-auto text-[var(--accent-primary)]" />
              <span className="text-lg font-semibold text-[var(--text-heading-light)]">Materia MSE</span>
            </Link>
            <p className="text-sm leading-relaxed">Exploring the fundamental building blocks that shape our world. Making materials science accessible, engaging, and inspiring.</p>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-[var(--text-primary-light)] mb-4">Navigation</h5>
            <ul className="space-y-2">
              <li><Link href="/blog" className="page-link footer-link">Blog</Link></li>
              <li><Link href="/resources" className="page-link footer-link">Resources</Link></li>
              <li><Link href="/explore" className="page-link footer-link">Explore</Link></li>
              <li><Link href="/projects" className="page-link footer-link">Projects</Link></li>
              <li><Link href="/about" className="page-link footer-link">About</Link></li>
              <li><Link href="/join" className="page-link footer-link">Join</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-[var(--text-primary-light)] mb-4">Community</h5>
            <ul className="space-y-2">
              <li><Link href="/join" className="page-link footer-link">Join Community</Link></li>
              <li><a href="#" className="footer-link">Newsletter</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-[var(--text-primary-light)] mb-4">Connect</h5>
            <ul className="space-y-2">
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">Support</a></li>
              <li>
                <Link href="/admin" className="footer-link hover:underline text-left">Admin</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--border-light)] md:flex md:items-center md:justify-between">
          <p className="text-sm text-[var(--text-secondary-light)] md:order-1">© 2025 Materia MSE by Nikhilesh Suravarjjala. All rights reserved.</p>
          <div className="mt-4 md:mt-0 md:order-2 text-sm">
            <a href="#" className="footer-link hover:underline mr-4">Privacy Policy</a>
            <a href="#" className="footer-link hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

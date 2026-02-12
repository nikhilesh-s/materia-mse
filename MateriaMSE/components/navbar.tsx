'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { MoleculeDiamondIcon } from '@/components/icons/molecule-diamond';

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinkClass = (href: string) =>
    `nav-link page-link${pathname === href ? ' text-[var(--accent-primary)] font-semibold' : ''}`;

  return (
    <nav id="navbar" className="navbar">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="nav-link page-link flex items-center space-x-2.5 flex-shrink-0 group !p-0">
            <MoleculeDiamondIcon className="h-8 w-auto text-[var(--accent-primary)] transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-semibold logo-text text-[var(--text-heading-light)]">Materia</span>
          </Link>
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link href="/blog" className={navLinkClass('/blog')}><i className="ti ti-message-circle"></i>Blog</Link>
            <Link href="/resources" className={navLinkClass('/resources')}><i className="ti ti-tools"></i>Resources</Link>
            <Link href="/explore" className={navLinkClass('/explore')}><i className="ti ti-compass"></i>Explore</Link>
            <Link href="/about" className={navLinkClass('/about')}><i className="ti ti-info-circle"></i>About</Link>
            <Link href="/join" className={navLinkClass('/join')}><i className="ti ti-users-group"></i>Join</Link>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              id="theme-toggle" 
              type="button" 
              aria-label="Toggle dark mode" 
              className="relative inline-flex items-center justify-center w-10 h-10"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted ? (
                <>
                  <i className={`ti ti-sun text-xl absolute transition-opacity duration-300 ${theme === 'dark' ? 'opacity-0 transform translate-y-[-10px]' : 'opacity-100 transform translate-y-0'}`}></i>
                  <i className={`ti ti-moon text-xl absolute transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-[10px]'}`}></i>
                </>
              ) : (
                <i className="ti ti-sun text-xl"></i>
              )}
            </button>
            <Link href="/join" className="page-link cta-button hidden sm:inline-flex items-center"> Join Us <i className="ti ti-arrow-right ml-1.5 text-sm"></i> </Link>
            <div className="md:hidden">
              <button 
                id="mobile-menu-button" 
                aria-expanded={mobileMenuOpen ? 'true' : 'false'} 
                aria-controls="mobile-menu" 
                className="p-2 rounded-md text-[var(--text-secondary-light)] hover:bg-gray-100/70 dark:hover:bg-gray-700/50 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                <i id="mobile-menu-icon-open" className={`ti ti-menu-2 text-2xl ${mobileMenuOpen ? 'hidden' : 'block'}`}></i> 
                <i id="mobile-menu-icon-close" className={`ti ti-x text-2xl ${mobileMenuOpen ? 'block' : 'hidden'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="mobile-menu" className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-full left-0 right-0 bg-[var(--bg-light)] dark:bg-[var(--bg-soft-dark)] border-t border-[var(--border-light)] dark:border-[var(--border-dark)] shadow-xl z-40`}>
        <div className="px-5 pt-4 pb-5 space-y-2">
          <Link href="/blog" className="mobile-nav-link page-link" onClick={closeMobileMenu}><i className="ti ti-message-circle"></i>Blog</Link>
          <Link href="/resources" className="mobile-nav-link page-link" onClick={closeMobileMenu}><i className="ti ti-tools"></i>Resources</Link>
          <Link href="/explore" className="mobile-nav-link page-link" onClick={closeMobileMenu}><i className="ti ti-compass"></i>Explore</Link>
          <Link href="/about" className="mobile-nav-link page-link" onClick={closeMobileMenu}><i className="ti ti-info-circle"></i>About</Link>
          <Link href="/join" className="mobile-nav-link page-link" onClick={closeMobileMenu}><i className="ti ti-users-group"></i>Join</Link>
          <div className="mt-6 pt-5 border-t border-[var(--border-light)] dark:border-[var(--border-dark)]">
            <Link href="/join" className="page-link block w-full text-center bg-[var(--gradient-primary)] text-white text-base font-semibold px-4 py-3 rounded-lg shadow-sm hover:opacity-90 transition" onClick={closeMobileMenu}>Join Us</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

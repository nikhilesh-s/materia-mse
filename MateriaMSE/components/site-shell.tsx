'use client';

import { useEffect } from 'react';
import { NavBar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export function SiteShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const scrollThreshold = 50;
    let isScrolled = window.scrollY > scrollThreshold;

    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > scrollThreshold;
      if (shouldBeScrolled !== isScrolled) {
        navbar.classList.toggle('navbar-scrolled', shouldBeScrolled);
        isScrolled = shouldBeScrolled;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

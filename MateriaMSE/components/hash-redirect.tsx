'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HASH_TO_ROUTE: Record<string, string> = {
  home: '/',
  blog: '/blog',
  about: '/about',
  resources: '/resources',
  explore: '/explore',
  join: '/join',
  admin: '/admin',
};

export function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const rawHash = window.location.hash.replace('#', '');
    if (!rawHash) return;

    if (rawHash.startsWith('blog-post-')) {
      const slug = rawHash.replace('blog-post-', '');
      if (slug) {
        router.replace(`/blog/${slug}`);
      }
      return;
    }

    const route = HASH_TO_ROUTE[rawHash];
    if (!route) return;

    if (route === '/') {
      history.replaceState(null, '', '/');
      return;
    }

    router.replace(route);
  }, [router]);

  return null;
}

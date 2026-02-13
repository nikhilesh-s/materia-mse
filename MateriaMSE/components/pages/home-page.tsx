'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured, safeSupabaseOperation } from '@/lib/supabase';
import { normalizeBlogTags } from '@/lib/blog-tags';
import { RecentInsightsCarousel, type RecentInsight } from '@/components/home/recent-insights-carousel';
import Image from 'next/image';

interface HomePageProps {
  isActive: boolean;
}

const fallbackRecentPosts: RecentInsight[] = [
  {
    id: '1',
    title: 'Why Materials Matter More Than You Think',
    excerpt: 'A beginner\'s guide to how materials shape our daily lives—from toothbrushes to space travel.',
    featured_image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg',
    created_at: new Date().toISOString(),
    slug: 'why-materials-matter-more-than-you-think',
    tags: ['Basics', 'Education'],
    category: 'Basics',
  },
  {
    id: '2',
    title: 'Plastic Isn\'t the Problem: Understanding Polymers',
    excerpt: 'A fresh take on plastics and their overlooked potential in sustainability.',
    featured_image: 'https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg',
    created_at: new Date().toISOString(),
    slug: 'plastic-isnt-the-problem-understanding-polymers',
    tags: ['Polymers', 'Sustainability'],
    category: 'Polymers',
  },
  {
    id: '3',
    title: 'Steel vs. Aluminum: The Ultimate Face-Off',
    excerpt: 'Which metal wins in strength, cost, weight, and versatility?',
    featured_image: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg',
    created_at: new Date().toISOString(),
    slug: 'steel-vs-aluminum-the-ultimate-face-off',
    tags: ['Metals', 'Comparison'],
    category: 'Metals',
  },
];

export function HomePage({ isActive }: HomePageProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [recentPosts, setRecentPosts] = useState<RecentInsight[]>(fallbackRecentPosts);

  const fetchRecentPosts = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setRecentPosts(fallbackRecentPosts);
      return;
    }

    const result = await safeSupabaseOperation(
      async () => {
        const { data, error } = await supabase!
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(3)
          .then((res) => res);

        if (error) throw error;
        return data || [];
      },
      fallbackRecentPosts
    );

    if (result.length === 0) {
      setRecentPosts(fallbackRecentPosts);
      return;
    }

    setRecentPosts(result.map((post) => ({ ...post, tags: normalizeBlogTags(post) })));
  }, []);

  useEffect(() => {
    if (isActive) {
      fetchRecentPosts();
    }
  }, [fetchRecentPosts, isActive]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSupabaseConfigured()) {
      alert('Newsletter subscription is not available at the moment. Please try again later.');
      return;
    }

    setSubscribing(true);

    try {
      const existingResult = await safeSupabaseOperation(
        async () => {
          const { data, error } = await supabase!
            .from('newsletter_subscribers')
            .select('email')
            .eq('email', newsletterEmail)
            .limit(1)
            .then((res) => res);
          return { data, error };
        },
        { data: [], error: null }
      );

      if (existingResult.error) {
        throw existingResult.error;
      }

      if (existingResult.data && existingResult.data.length > 0) {
        alert('You\'re already subscribed to our newsletter!');
        setNewsletterEmail('');
        setSubscribing(false);
        return;
      }

      const insertResult = await safeSupabaseOperation(
        async () => {
          const { error } = await supabase!
            .from('newsletter_subscribers')
            .insert({ email: newsletterEmail })
            .then((res) => res);
          if (error) throw error;
          return true;
        },
        false
      );

      if (!insertResult) {
        throw new Error('Failed to add subscription to database');
      }

      try {
        const emailResult = await safeSupabaseOperation(
          async () => {
            const { data, error } = await supabase!.functions.invoke('send-newsletter-confirmation', {
              body: { email: newsletterEmail },
            });
            return { data, error };
          },
          { data: null, error: new Error('Email service not available') }
        );

        if (emailResult.error) {
          alert('Subscribed successfully, but there was an issue sending the confirmation email. You\'re still subscribed!');
        } else {
          alert('Successfully subscribed to our newsletter! Check your email for confirmation.');
        }
      } catch {
        alert('Subscribed successfully, but there was an issue sending the confirmation email. You\'re still subscribed!');
      }

      setNewsletterEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('Error subscribing to newsletter. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <section id="page-home" className={`page-section ${isActive ? 'active' : ''}`}>
      <div className="overflow-hidden relative pt-0">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5 dark:from-[var(--accent-primary)]/10 dark:via-transparent dark:to-[var(--accent-secondary)]/10 opacity-60"></div>
          <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(var(--border-light) 0.5px, transparent 0.5px)', backgroundSize: '12px 12px' }}></div>
          <div className="html:not(.dark) absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--border-dark) 0.5px, transparent 0.5px)', backgroundSize: '12px 12px' }}></div>
        </div>
        <div className="hero-content-container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
            <div className="animate-fade-in lg:pr-6">
              <span className="inline-flex items-center space-x-2 text-sm font-semibold text-[var(--accent-primary)] dark:text-emerald-400 mb-5">
                <i className="ti ti-atom-2 text-base"></i> <span>Materials Science Community</span>
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 !leading-tight">
                Unlock the World of<br />
                <span className="hero-highlight-gradient">Materials Science.</span>
              </h1>
              <p className="text-lg md:text-xl hero-subtitle text-secondary max-w-xl mb-8">
                Materia MSE helps students explore materials science through clear insights, projects, and community-led learning.
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md mb-10">
                <div className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-light)] p-4 shadow-sm">
                  <p className="text-2xl font-bold text-[var(--text-heading-light)]">50+</p>
                  <p className="text-xs uppercase tracking-wide text-secondary">Monthly Readers</p>
                </div>
                <div className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-light)] p-4 shadow-sm">
                  <p className="text-2xl font-bold text-[var(--text-heading-light)]">35+</p>
                  <p className="text-xs uppercase tracking-wide text-secondary">Community Members</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-100">
                <Link href="/blog" className="page-link hero-button-primary inline-flex items-center justify-center">
                  Read Blog <i className="ti ti-chevron-right ml-1.5 text-sm"></i>
                </Link>
                <Link href="/join" className="page-link hero-button-secondary inline-flex items-center justify-center">
                  Join Community <i className="ti ti-users ml-1.5"></i>
                </Link>
              </div>
            </div>
            <div className="animate-fade-in delay-200">
              <div className="hero-image-container aspect-video relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="https://images.pexels.com/photos/2156/sky-earth-space-working.jpg"
                  alt="Abstract representation of advanced materials or molecules"
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 dark:from-black/20 to-transparent opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-20 bg-[var(--bg-light)]">
        <div className="content-container">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-heading-light)]">Recent Insights</h2>
              <p className="text-secondary mt-1">Rotating highlights from our latest blog posts.</p>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center text-sm font-semibold text-[var(--accent-primary)]">
              View all posts <i className="ti ti-arrow-right ml-1"></i>
            </Link>
          </div>

          <RecentInsightsCarousel posts={recentPosts} />
        </div>
      </div>

      <div className="py-16 md:py-20 bg-[var(--bg-soft-light)]">
        <div className="content-container">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-heading-light)] mb-3">Projects on Display</h2>
          <p className="text-secondary mb-8">Explore our student-led projects and media showcases. RP-EX 1 is featured now.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/projects#rp-ex-1" className="block bg-[var(--bg-light)] rounded-xl border border-[var(--border-light)] p-6 shadow-md hover:-translate-y-1 transition duration-300">
              <span className="tag-chip border !bg-indigo-100 !text-indigo-700 !border-indigo-200 dark:!bg-indigo-900/60 dark:!text-indigo-300 dark:!border-indigo-800 mb-3">
                Featured Project
              </span>
              <h3 className="text-xl font-semibold text-[var(--text-heading-light)] mb-2">RP-EX 1</h3>
              <p className="text-secondary">Jump directly into the RP-EX 1 highlight and see where the project roadmap is headed.</p>
            </Link>

            <Link href="/projects" className="block bg-[var(--bg-light)] rounded-xl border border-[var(--border-light)] p-6 shadow-md hover:-translate-y-1 transition duration-300">
              <span className="tag-chip border !bg-emerald-100 !text-emerald-700 !border-emerald-200 dark:!bg-emerald-900/60 dark:!text-emerald-300 dark:!border-emerald-800 mb-3">
                Youth Voices in MSE
              </span>
              <h3 className="text-xl font-semibold text-[var(--text-heading-light)] mb-2">Watch the Series</h3>
              <p className="text-secondary">Go to our projects/media page to view introduction and spotlight episodes from the YouTube channel.</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-20 bg-[var(--bg-soft-light)]">
        <div className="content-container max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">Stay Updated with Materials Science</h2>
          <p className="text-secondary mb-6">Join our newsletter for the latest blog posts, insights, and community updates.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              type="email"
              name="footer-email"
              id="footer-email"
              required
              className="form-input flex-grow !mt-0"
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              disabled={subscribing}
            />
            <button
              type="submit"
              disabled={subscribing}
              className="inline-flex items-center justify-center bg-[var(--gradient-primary)] hover:opacity-95 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md text-sm transition duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {subscribing ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe <i className="ti ti-send ml-2 text-xs"></i>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="py-16 md:py-24 bg-[var(--bg-light)]">
        <div className="content-container max-w-4xl mx-auto bg-[var(--bg-light)] dark:bg-[var(--bg-soft-dark)] p-8 md:p-12 rounded-xl shadow-lg border border-[var(--border-light)] dark:border-[var(--border-dark)]">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 tracking-tight">Join the Community</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-3">Connect & Learn</h3>
              <p className="text-secondary mb-6">Join our community of materials scientists, engineers, and enthusiasts. Share insights, ask questions, and stay updated with the latest in materials science.</p>
              <Link href="/join" className="page-link hero-button-primary inline-flex items-center justify-center w-full sm:w-auto">
                Join Now <i className="ti ti-user-plus ml-1.5"></i>
              </Link>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What you&apos;ll get:</h4>
              <ul className="text-sm text-secondary space-y-2 list-disc list-inside marker:text-[var(--accent-primary)]">
                <li>Access to exclusive blog content and discussions</li>
                <li>Connect with fellow materials science enthusiasts</li>
                <li>Share your insights and learn from others</li>
                <li>Stay updated with the latest research and trends</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

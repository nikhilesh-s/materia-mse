'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured, safeSupabaseOperation } from '@/lib/supabase';
import { getTagChipTone, normalizeBlogTags } from '@/lib/blog-tags';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  featured_image: string | null;
  author: string;
  created_at: string;
  slug: string;
  tags?: string[];
  category?: string;
}

interface BlogPageProps {
  isActive: boolean;
}

export function BlogPage({ isActive }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = useCallback(async () => {
    try {
      if (!isSupabaseConfigured()) {
        setPosts([
          {
            id: '1',
            title: 'Why Materials Matter More Than You Think',
            excerpt: 'A beginner\'s guide to how materials shape our daily lives—from toothbrushes to space travel.',
            featured_image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg',
            author: 'Nikhilesh Suravarjjala',
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
            author: 'Nikhilesh Suravarjjala',
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
            author: 'Nikhilesh Suravarjjala',
            created_at: new Date().toISOString(),
            slug: 'steel-vs-aluminum-the-ultimate-face-off',
            tags: ['Metals', 'Comparison'],
            category: 'Metals',
          },
        ]);
        setLoading(false);
        return;
      }

      const result = await safeSupabaseOperation(
        async () => {
          const { data, error } = await supabase!
            .from('blog_posts')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .then((res) => res);
          if (error) throw error;
          return data || [];
        },
        []
      );

      setPosts(result.map((post) => ({ ...post, tags: normalizeBlogTags(post) })));
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      fetchPosts();
    }
  }, [isActive, fetchPosts]);

  const filteredPosts = posts.filter((post) => {
    const normalizedSearch = searchTerm.toLowerCase();
    const tags = normalizeBlogTags(post).join(' ').toLowerCase();

    return (
      post.title.toLowerCase().includes(normalizedSearch) ||
      post.excerpt.toLowerCase().includes(normalizedSearch) ||
      tags.includes(normalizedSearch)
    );
  });

  return (
    <section id="page-blog" className={`page-section py-16 md:py-24 bg-[var(--bg-soft-light)] ${isActive ? 'active' : ''}`}>
      <div className="content-container">
        <h1 className="page-title text-[var(--text-heading-light)] text-center">Materials Science Blog</h1>
        <p className="text-lg text-secondary text-center max-w-3xl mx-auto mb-10">
          Explore insights, research, and discussions about the fascinating world of materials science.
        </p>

        <div className="flex justify-center mb-12">
          <div className="relative flex-grow w-full sm:w-auto max-w-md">
            <input
              type="search"
              placeholder="Search posts or tags..."
              className="form-input !pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="ti ti-search absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary opacity-60"></i>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-primary)]"></div>
            <p className="mt-4 text-secondary">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <i className="ti ti-article text-4xl text-secondary opacity-30 mb-4"></i>
            <p className="text-secondary">No posts found. Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => {
              const tags = normalizeBlogTags(post);
              return (
                <article key={post.id} className={`insight-card flex flex-col group animate-slide-in-up delay-${(index % 6 + 1) * 100}`}>
                  <Link href={`/blog/${post.slug}`} className="page-link block overflow-hidden">
                    <div className="relative w-full h-48">
                      <Image
                        src={post.featured_image || 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className={`tag-chip border ${getTagChipTone(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 leading-snug flex-grow">
                      <Link href={`/blog/${post.slug}`} className="page-link hover:text-[var(--accent-primary)] transition duration-200">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-secondary mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-auto pt-3 border-t border-[var(--border-light)] dark:border-[var(--border-dark)] flex justify-between items-center text-xs text-secondary">
                      <span>
                        <i className="ti ti-calendar-event mr-1 opacity-70"></i>
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <span className="inline-flex items-center hover:text-[var(--accent-primary)] transition">
                        Read <i className="ti ti-arrow-right ml-1 text-sm"></i>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, safeSupabaseOperation } from '@/lib/supabase';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  featured_image: string | null;
  category: string;
  author: string;
  created_at: string;
  slug: string;
}

interface BlogPageProps {
  isActive: boolean;
}

export function BlogPage({ isActive }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchPosts = useCallback(async () => {
    try {
      if (!isSupabaseConfigured()) {
        // Use mock data if Supabase is not available
        setPosts([
          {
            id: '1',
            title: 'Why Materials Matter More Than You Think',
            excerpt: 'A beginner\'s guide to how materials shape our daily lives—from toothbrushes to space travel.',
            featured_image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg',
            category: 'Basics',
            author: 'Nikhilesh Suravarjjala',
            created_at: new Date().toISOString(),
            slug: 'why-materials-matter-more-than-you-think'
          },
          {
            id: '2',
            title: 'Plastic Isn\'t the Problem: Understanding Polymers',
            excerpt: 'A fresh take on plastics and their overlooked potential in sustainability.',
            featured_image: 'https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg',
            category: 'Polymers',
            author: 'Nikhilesh Suravarjjala',
            created_at: new Date().toISOString(),
            slug: 'plastic-isnt-the-problem-understanding-polymers'
          },
          {
            id: '3',
            title: 'Steel vs. Aluminum: The Ultimate Face-Off',
            excerpt: 'Which metal wins in strength, cost, weight, and versatility?',
            featured_image: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg',
            category: 'Metals',
            author: 'Nikhilesh Suravarjjala',
            created_at: new Date().toISOString(),
            slug: 'steel-vs-aluminum-the-ultimate-face-off'
          }
        ]);
        setLoading(false);
        return;
      }

      const result = await safeSupabaseOperation(
        async () => {
          const { data, error } = await supabase!
            .from('blog_posts')
            .select('id, title, excerpt, featured_image, category, author, created_at, slug')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .then(res => res);
          if (error) throw error;
          return data || [];
        },
        []
      );

      setPosts(result);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Fallback to empty array
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

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Basics': '!bg-sky-100 !dark:bg-sky-900/60 !text-sky-700 !dark:text-sky-300',
      'Polymers': '!bg-emerald-100 !dark:bg-emerald-900/60 !text-emerald-700 !dark:text-emerald-300',
      'Metals': '!bg-indigo-100 !dark:bg-indigo-900/60 !text-indigo-700 !dark:text-indigo-300',
      'Research': '!bg-purple-100 !dark:bg-purple-900/60 !text-purple-700 !dark:text-purple-300',
      'Sustainability': '!bg-green-100 !dark:bg-green-900/60 !text-green-700 !dark:text-green-300',
      'Education': '!bg-amber-100 !dark:bg-amber-900/60 !text-amber-700 !dark:text-amber-300',
    };
    return colors[category] || '!bg-gray-100 !dark:bg-gray-900/60 !text-gray-700 !dark:text-gray-300';
  };

  return (
    <section id="page-blog" className={`page-section py-16 md:py-24 bg-[var(--bg-soft-light)] ${isActive ? 'active' : ''}`}>
      <div className="content-container">
        <h1 className="page-title text-[var(--text-heading-light)] text-center">Materials Science Blog</h1>
        <p className="text-lg text-secondary text-center max-w-3xl mx-auto mb-10"> 
          Explore insights, research, and discussions about the fascinating world of materials science. 
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <div className="relative flex-grow w-full sm:w-auto max-w-md">
            <input 
              type="search" 
              placeholder="Search posts..." 
              className="form-input !pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="ti ti-search absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary opacity-60"></i>
          </div>
          <select 
            className="form-select w-full sm:w-auto"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
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
            {filteredPosts.map((post, index) => (
              <article key={post.id} className={`insight-card flex flex-col group animate-slide-in-up delay-${(index % 6 + 1) * 100}`}>
                <a href={`#blog-post-${post.slug}`} className="page-link block overflow-hidden">
                  <div className="relative w-full h-48">
                    <Image 
                      src={post.featured_image || 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg'} 
                      alt={post.title} 
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </a>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    <span className={`category-tag ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 leading-snug flex-grow">
                    <a href={`#blog-post-${post.slug}`} className="page-link hover:text-[var(--accent-primary)] transition duration-200">
                      {post.title}
                    </a>
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
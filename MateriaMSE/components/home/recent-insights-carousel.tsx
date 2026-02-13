'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { getTagChipTone, normalizeBlogTags } from '@/lib/blog-tags';

export interface RecentInsight {
  id: string;
  title: string;
  excerpt: string;
  featured_image: string | null;
  created_at: string;
  slug: string;
  tags?: string[];
  category?: string;
}

interface RecentInsightsCarouselProps {
  posts: RecentInsight[];
}

export function RecentInsightsCarousel({ posts }: RecentInsightsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4500);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ align: 'start', loop: false }} className="w-full">
      <CarouselContent>
        {posts.map((post) => {
          const tags = normalizeBlogTags(post).slice(0, 3);
          return (
            <CarouselItem key={post.id} className="md:basis-1/2 xl:basis-1/3">
              <article className="insight-card h-full flex flex-col">
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                  <div className="relative w-full h-48">
                    <Image
                      src={post.featured_image || 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg'}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                      <span key={tag} className={`tag-chip border ${getTagChipTone(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mb-2 leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[var(--accent-primary)] transition">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-secondary mb-4 line-clamp-3">{post.excerpt}</p>

                  <div className="mt-auto pt-3 border-t border-[var(--border-light)] dark:border-[var(--border-dark)] text-xs text-secondary">
                    <i className="ti ti-calendar-event mr-1 opacity-70"></i>
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
              </article>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-0 md:-left-4" />
      <CarouselNext className="right-0 md:-right-4" />
    </Carousel>
  );
}

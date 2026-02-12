import { BlogPostPage } from '@/components/pages/blog-post-page';
import { SiteShell } from '@/components/site-shell';

export default function BlogPostRoute({ params }: { params: { slug: string } }) {
  return (
    <SiteShell>
      <main id="main-content">
        <BlogPostPage isActive postSlug={params.slug} />
      </main>
    </SiteShell>
  );
}

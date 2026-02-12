import { BlogPage } from '@/components/pages/blog-page';
import { SiteShell } from '@/components/site-shell';

export default function BlogRoute() {
  return (
    <SiteShell>
      <main id="main-content">
        <BlogPage isActive />
      </main>
    </SiteShell>
  );
}

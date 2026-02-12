import { AboutPage } from '@/components/pages/about-page';
import { SiteShell } from '@/components/site-shell';

export default function AboutRoute() {
  return (
    <SiteShell>
      <main id="main-content">
        <AboutPage isActive />
      </main>
    </SiteShell>
  );
}

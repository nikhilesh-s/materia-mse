import { ExplorePage } from '@/components/pages/explore-page';
import { SiteShell } from '@/components/site-shell';

export default function ExploreRoute() {
  return (
    <SiteShell>
      <main id="main-content">
        <ExplorePage isActive />
      </main>
    </SiteShell>
  );
}

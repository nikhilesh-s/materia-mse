import { ResourcesPage } from '@/components/pages/resources-page';
import { SiteShell } from '@/components/site-shell';

export default function ResourcesRoute() {
  return (
    <SiteShell>
      <main id="main-content">
        <ResourcesPage isActive />
      </main>
    </SiteShell>
  );
}

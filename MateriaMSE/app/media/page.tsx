import { MediaPage } from '@/components/pages/media-page';
import { SiteShell } from '@/components/site-shell';

export default function MediaRoute() {
  return (
    <SiteShell>
      <main id="main-content">
        <MediaPage isActive />
      </main>
    </SiteShell>
  );
}

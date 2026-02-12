import { JoinPage } from '@/components/pages/join-page';
import { SiteShell } from '@/components/site-shell';

export default function JoinRoute() {
  return (
    <SiteShell>
      <main id="main-content">
        <JoinPage isActive />
      </main>
    </SiteShell>
  );
}

import { HomePage } from '@/components/pages/home-page';
import { SiteShell } from '@/components/site-shell';
import { HashRedirect } from '@/components/hash-redirect';

export default function HomePageRoute() {
  return (
    <SiteShell>
      <HashRedirect />
      <main id="main-content">
        <HomePage isActive />
      </main>
    </SiteShell>
  );
}

import { AdminPage } from '@/components/pages/admin-page';
import { SiteShell } from '@/components/site-shell';

export default function AdminRoute() {
  return (
    <SiteShell>
      <main id="main-content">
        <AdminPage isActive />
      </main>
    </SiteShell>
  );
}

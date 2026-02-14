import { SiteShell } from '@/components/site-shell';
import { PeriodicTableToolPage } from '@/src/tools/periodic-table/periodic-table-page';

export default function PeriodicTableRoute() {
  return (
    <SiteShell>
      <main id="main-content">
        <PeriodicTableToolPage />
      </main>
    </SiteShell>
  );
}

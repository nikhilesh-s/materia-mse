import { SiteShell } from '@/components/site-shell';
import { CarMaterialsToolPage } from '@/src/tools/car-materials/car-materials-page';

export default function CarMaterialsRoute() {
  return (
    <SiteShell>
      <main id="main-content">
        <CarMaterialsToolPage />
      </main>
    </SiteShell>
  );
}

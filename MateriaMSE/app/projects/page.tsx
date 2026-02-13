import { ProjectsPage } from '@/components/pages/projects-page';
import { SiteShell } from '@/components/site-shell';

export default function ProjectsRoute() {
  return (
    <SiteShell>
      <main id="main-content">
        <ProjectsPage isActive />
      </main>
    </SiteShell>
  );
}

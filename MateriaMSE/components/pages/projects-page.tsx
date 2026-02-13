import Link from 'next/link';

interface ProjectsPageProps {
  isActive: boolean;
}

const projectCards = [
  {
    id: 'rp-ex-1',
    title: 'RP-EX 1',
    status: 'Active Spotlight',
    description:
      'Our flagship project track for experimental materials exploration. This section is designed for your upcoming milestones, build notes, and outcomes.',
  },
  {
    id: 'dravix',
    title: 'Dravix',
    status: 'Project Spotlight',
    description:
      'A featured student initiative under Materia MSE. More build details, scope, and updates can be expanded here as project documentation grows.',
  },
];

export function ProjectsPage({ isActive }: ProjectsPageProps) {
  return (
    <section
      id="page-projects"
      className={`page-section py-16 md:py-24 bg-[var(--bg-soft-light)] ${isActive ? 'active' : ''}`}
    >
      <div className="content-container max-w-6xl mx-auto">
        <Link href="/" className="page-link back-link">
          <i className="ti ti-arrow-left"></i> Back to Home
        </Link>

        <div className="text-center mb-10">
          <h1 className="page-title text-[var(--text-heading-light)]">Projects</h1>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Materia MSE projects are where theory turns into experiments, analysis, and public build logs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectCards.map((project) => (
            <article
              id={project.id}
              key={project.id}
              className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-xl p-6 shadow-md"
            >
              <span className="category-tag !bg-indigo-100 !text-indigo-700 !dark:bg-indigo-900/60 !dark:text-indigo-300 mb-4">
                {project.status}
              </span>
              <h2 className="text-2xl font-semibold mb-3 text-[var(--text-heading-light)]">{project.title}</h2>
              <p className="text-secondary">{project.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 bg-[var(--bg-light)] border border-[var(--border-light)] rounded-xl p-6 shadow-md text-center">
          <h3 className="text-xl font-semibold text-[var(--text-heading-light)] mb-2">Looking for Youth Voices in MSE?</h3>
          <p className="text-secondary mb-4">Media content has been separated into its own page.</p>
          <Link
            href="/media"
            className="inline-flex items-center justify-center bg-[var(--gradient-primary)] hover:opacity-95 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            Go to Media <i className="ti ti-brand-youtube ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ExplorePageProps {
  isActive: boolean;
}

export function ExplorePage({ isActive }: ExplorePageProps) {
  const exploreTools = [
    {
      title: 'Material Explorer',
      description: 'Compare material classes and inspect practical performance properties in one interface.',
      href: 'https://materia-explorer-tool.vercel.app',
      icon: 'ti-atom-2',
      openInNewTab: true,
    },
    {
      title: 'Interactive Periodic Table',
      description: 'Inspect core element properties and engineering applications with category filters.',
      href: '/tools/periodic-table',
      icon: 'ti-table',
      openInNewTab: true,
    },
    {
      title: 'Car Parts Materials Map',
      description: 'Click vehicle zones to understand real material choices, constraints, and innovation paths.',
      href: '/tools/car-materials',
      icon: 'ti-car',
      openInNewTab: true,
    },
  ];

  return (
    <section id="page-explore" className={`page-section py-16 md:py-24 bg-[var(--bg-soft-light)] ${isActive ? 'active' : ''}`}>
      <div className="content-container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-heading-light)] mb-3">Explore</h1>
          <p className="text-lg text-secondary">What&apos;s Coming Up from Materia</p>
        </div>

        <div className="mb-10">
          <div className="bg-[var(--bg-light)] rounded-2xl border border-[var(--border-light)] shadow-sm p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-heading-light)] mb-3 text-center">Interactive Engineering Tools</h2>
            <p className="text-secondary text-center max-w-3xl mx-auto">
              Developed by Nikhilesh Suravarjjala and Kelvin Zhang to bring materials science to life through interactive, applied learning tools.
            </p>
            <div className="mt-5 max-w-3xl mx-auto text-sm text-secondary space-y-1">
              <p>Material Explorer — Developed by Kelvin Zhang</p>
              <p>Interactive Periodic Table &amp; Car Materials Map — Developed by Nikhilesh Suravarjjala</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[var(--text-heading-light)]">Explore Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {exploreTools.map((tool) => (
              <a
                key={tool.title}
                href={tool.href}
                target={tool.openInNewTab ? '_blank' : undefined}
                rel={tool.openInNewTab ? 'noopener noreferrer' : undefined}
                className="group rounded-xl border border-[var(--border-light)] bg-[var(--bg-light)] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[var(--accent-primary)]"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--bg-accent-light)] text-[var(--accent-primary)] mb-4">
                  <i className={`ti ${tool.icon} text-xl`} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-heading-light)] mb-2">{tool.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{tool.description}</p>
              </a>
            ))}
          </div>
        </div>
        
        {/* Materials Explorer Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[var(--text-heading-light)]">Materials Explorer Tool</h2>

          <div className="bg-[var(--bg-light)] rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-secondary mb-4 leading-relaxed">
                  Dive into the world of materials with our interactive explorer. Compare properties, visualize structures, and discover how everyday materials shape the technologies around us.
                </p>
                <div className="flex items-center text-sm text-[var(--accent-primary)] font-medium mb-4">
                  <i className="ti ti-user mr-2"></i>
                  📌 Developed with Kelvin Zhang (Materia Builder).
                </div>
                <a
                  href="https://materia-explorer-tool.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[var(--gradient-primary)] hover:opacity-95 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1"
                >
                  <i className="ti ti-external-link mr-2"></i>
                  Launch Explorer Tool
                </a>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-[var(--gradient-primary)] rounded-full mb-4 shadow-lg">
                  <i className="ti ti-atom-2 text-3xl text-white"></i>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-heading-light)]">Materials Explorer Tool</h3>
              </div>
            </div>
          </div>
        </div>


        {/* Call to Action Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[var(--text-heading-light)]">Call to Action</h2>
          
          <div className="bg-[var(--bg-light)] rounded-lg shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--bg-accent-light)] rounded-full mb-6">
              <i className="ti ti-bulb text-2xl text-[var(--accent-primary)]"></i>
            </div>
            <p className="text-lg text-secondary mb-6">
              We want your ideas too. Have an idea for a way to make MSE knowledge more accessible?
            </p>
            <a href="/join" className="page-link inline-flex items-center justify-center bg-[var(--gradient-primary)] hover:opacity-95 text-white font-semibold px-8 py-3 rounded-lg shadow-md text-lg transition duration-300 transform hover:-translate-y-1">
              Join Us <i className="ti ti-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ResourcesPageProps {
  isActive: boolean;
}

export function ResourcesPage({ isActive }: ResourcesPageProps) {
  const diyLabs = [
    {
      title: "Polymer Stretch Test",
      description: "Stretch a rubber band and a strip of plastic bag to see which bounces back better. This experiment shows how different polymers handle stress and elasticity.",
      pdfUrl: "https://drive.google.com/file/d/1NjWLKC5oQud7TttkY-i1p9LKU3ijT6I7/view?usp=sharing",
      icon: "ti-stretching"
    },
    {
      title: "Corrosion Challenge",
      description: "Test how coatings like nail polish, oil, and tape protect metal nails from rusting in water. You'll see why engineers use protective layers to fight corrosion.",
      pdfUrl: "https://drive.google.com/file/d/1JUL57L-veWjx_dGQBwV6VavB_cvZPyOy/view?usp=sharing",
      icon: "ti-droplet"
    },
    {
      title: "Ceramic Strength Demo",
      description: "Drop the same object onto glass and ceramic to compare how they handle impact. This simple test shows why ceramics are tougher in some ways but brittle in others.",
      pdfUrl: "https://drive.google.com/file/d/16Opey-fkIN4vTaTf9Xm1BA9xw-l-AjM4/view?usp=sharing",
      icon: "ti-hammer"
    },
    {
      title: "Thermal Insulation Test",
      description: "Cover ice cubes with different fabrics to find out which one keeps them cold the longest. This activity explores how materials insulate against heat transfer.",
      pdfUrl: "https://drive.google.com/file/d/1gUxpOwm8G6SpZ2SvnhOhci5YzcnarXak/view?usp=sharing",
      icon: "ti-temperature"
    }
  ];

  return (
    <section id="page-resources" className={`page-section py-16 md:py-24 bg-[var(--bg-soft-light)] ${isActive ? 'active' : ''}`}>
      <div className="content-container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-heading-light)] mb-3">Resources</h1>
          <p className="text-lg text-secondary">Tools to Start Your Own Materials Science Projects</p>
        </div>

        {/* Project Planning Templates Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[var(--text-heading-light)]">Project Planning Templates</h2>
          <p className="text-lg text-secondary text-center max-w-4xl mx-auto mb-8">
            Simple frameworks to help you build real materials-driven projects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="bg-[var(--bg-light)] rounded-lg shadow-lg p-8 border border-[var(--border-light)]">
              <h3 className="text-xl font-semibold mb-3 text-[var(--text-heading-light)]">MSE Project Planning Template</h3>
              <p className="text-secondary mb-4">
                A clear starting point for turning an idea into a structured materials project.
              </p>
              <p className="text-secondary mb-6">
                This template helps you define your problem, material system, constraints, testing plan, and next steps. You do not need to be a materials science major to use it.
              </p>
              <a
                href="https://drive.google.com/file/d/1CNxT53NVmw3ItgzyvqfvTCtl0SE3p78i/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[var(--gradient-primary)] hover:opacity-95 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md text-sm transition duration-300 transform hover:-translate-y-1"
              >
                Download the MSE Project Planning Template <i className="ti ti-arrow-right ml-2"></i>
              </a>
            </article>

            <article className="bg-[var(--bg-light)] rounded-lg shadow-lg p-8 border border-[var(--border-light)]">
              <h3 className="text-xl font-semibold mb-3 text-[var(--text-heading-light)]">Materia Project Proposal Template</h3>
              <p className="text-secondary mb-4">
                A formal structure for presenting your project clearly and professionally.
              </p>
              <p className="text-secondary mb-6">
                Use this template if you are submitting to a competition, applying for funding, building a serious portfolio project, or launching under Materia MSE.
              </p>
              <a
                href="https://drive.google.com/file/d/17wXGktWdDoEDBlMdTapo7jMYaW7udKCa/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[var(--gradient-primary)] hover:opacity-95 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md text-sm transition duration-300 transform hover:-translate-y-1"
              >
                Download the Materia Project Proposal Template <i className="ti ti-arrow-right ml-2"></i>
              </a>
            </article>
          </div>
        </div>
        
        {/* DIY Labs Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[var(--text-heading-light)]">DIY Labs</h2>
          <p className="text-lg text-secondary text-center max-w-4xl mx-auto mb-12">
            Want to experiment with materials science at home? Here are some safe, beginner-friendly projects that use everyday items to help you connect MSE concepts to real life.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {diyLabs.map((lab, index) => (
              <div key={index} className={`explore-card group animate-slide-in-up delay-${(index + 1) * 100}`}>
                <div className="icon-wrapper bg-[var(--gradient-primary)] mb-4">
                  <i className={`${lab.icon} text-white text-xl`}></i>
                </div>
                <h3 className="card-title text-[var(--text-heading-light)]">{lab.title}</h3>
                <p className="card-description text-secondary mb-6">{lab.description}</p>
                <a 
                  href={lab.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-[var(--gradient-primary)] hover:opacity-95 text-white font-semibold px-4 py-2.5 rounded-lg shadow-md text-sm transition duration-300 transform hover:-translate-y-1"
                >
                  <i className="ti ti-download mr-2"></i>
                  Download PDF Guide
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Spotlight Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[var(--text-heading-light)]">Spotlight (Future)</h2>
          
          <div className="bg-[var(--bg-light)] rounded-lg shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--bg-accent-light)] rounded-full mb-4">
              <i className="ti ti-spotlight text-2xl text-[var(--accent-primary)]"></i>
            </div>
            <p className="text-lg text-secondary mb-6">
              In the future, we&apos;ll showcase projects submitted by our community. Got something cool you&apos;re working on?
            </p>
            <a href="/join" className="page-link inline-flex items-center justify-center bg-[var(--gradient-primary)] hover:opacity-95 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1">
              Join Us <i className="ti ti-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

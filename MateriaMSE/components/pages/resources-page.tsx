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

        {/* Project Planning Templates Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[var(--text-heading-light)]">Project Planning Templates</h2>
          <p className="text-lg text-secondary text-center max-w-4xl mx-auto mb-8">
            Every good project starts with a plan. Use these resources to guide your experiment from idea to results and learn how to build projects effectively.
          </p>
          
          <div className="bg-[var(--bg-light)] rounded-lg shadow-lg p-8 text-center border-2 border-dashed border-[var(--border-light)]">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/60 rounded-full mb-4">
              <i className="ti ti-clock text-2xl text-amber-600 dark:text-amber-400"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[var(--text-heading-light)]">Under Development</h3>
            <p className="text-secondary mb-4">This section is under development and should be released mid-November 2025!</p>
            <div className="inline-flex items-center px-4 py-2 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium">
              <i className="ti ti-calendar mr-2"></i>
              Coming November 2025
            </div>
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
              In the future, we'll showcase projects submitted by our community. Got something cool you're working on?
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
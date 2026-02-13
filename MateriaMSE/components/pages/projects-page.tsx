import Link from 'next/link';

interface ProjectsPageProps {
  isActive: boolean;
}

const videoEmbeds = [
  {
    title: 'Introduction Video',
    description: 'Meet Materia MSE and the motivation behind our media and project work.',
    url: 'https://www.youtube.com/embed/UAK0KJhmbpg',
  },
  {
    title: 'Youth Voices in MSE Spotlight',
    description:
      'Can Materials Ever Cease to Matter? Global Student Perspective - Russia.',
    url: 'https://www.youtube.com/embed/7FXDVZZ3nrQ',
  },
  {
    title: 'Project Spotlight: Dravix',
    description: 'A closer look at one of our featured student projects.',
    url: 'https://www.youtube.com/embed/0SJn6V6fdJ8',
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
          <h1 className="page-title text-[var(--text-heading-light)]">Projects & Media</h1>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Youth Voices in MSE shares global student perspectives on materials science while our project spotlights
            showcase work from the Materia MSE community.
          </p>
          <a
            href="https://youtube.com/@materiamse?si=Z8nuFPcW8hL4UC3h"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-6 items-center justify-center bg-[var(--gradient-primary)] hover:opacity-95 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            Visit YouTube Channel <i className="ti ti-brand-youtube ml-2"></i>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div
            id="rp-ex-1"
            className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-xl p-6 shadow-md"
          >
            <span className="category-tag !bg-indigo-100 !text-indigo-700 !dark:bg-indigo-900/60 !dark:text-indigo-300 mb-4">
              Featured Build
            </span>
            <h2 className="text-2xl font-semibold mb-3 text-[var(--text-heading-light)]">RP-EX 1</h2>
            <p className="text-secondary">
              RP-EX 1 is our flagship project track for experimental materials exploration. This section is set up for
              your upcoming project details, media, and outcomes.
            </p>
          </div>

          <div className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-xl p-6 shadow-md">
            <span className="category-tag !bg-emerald-100 !text-emerald-700 !dark:bg-emerald-900/60 !dark:text-emerald-300 mb-4">
              Series
            </span>
            <h2 className="text-2xl font-semibold mb-3 text-[var(--text-heading-light)]">Youth Voices in MSE</h2>
            <p className="text-secondary">
              A video series featuring student-led reflections and debates on current materials science topics, ideas,
              and future directions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {videoEmbeds.map((video) => (
            <article
              key={video.title}
              className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-xl shadow-md overflow-hidden"
            >
              <iframe
                className="w-full h-56"
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="font-semibold text-[var(--text-heading-light)] mb-2">{video.title}</h3>
                <p className="text-sm text-secondary">{video.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

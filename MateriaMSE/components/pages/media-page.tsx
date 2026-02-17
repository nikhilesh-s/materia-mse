import Link from 'next/link';

interface MediaPageProps {
  isActive: boolean;
}

const DRAVIX_URL = 'https://dravix.materiamse.com';

const videoEmbeds = [
  {
    title: 'Introduction Video',
    description: 'Meet Materia MSE and the motivation behind the channel.',
    url: 'https://www.youtube.com/embed/UAK0KJhmbpg',
  },
  {
    title: 'Youth Voices in MSE Spotlight',
    description:
      'Can Materials Ever Cease to Matter? | Youth Voices in MSE | Global Student Perspective - Russia',
    url: 'https://www.youtube.com/embed/7FXDVZZ3nrQ',
  },
  {
    title: 'Project Spotlight: Dravix',
    description: 'A closer look at one of our featured student projects.',
    url: 'https://www.youtube.com/embed/0SJn6V6fdJ8',
    externalUrl: DRAVIX_URL,
  },
];

export function MediaPage({ isActive }: MediaPageProps) {
  return (
    <section
      id="page-media"
      className={`page-section py-16 md:py-24 bg-[var(--bg-soft-light)] ${isActive ? 'active' : ''}`}
    >
      <div className="content-container max-w-6xl mx-auto">
        <Link href="/" className="page-link back-link">
          <i className="ti ti-arrow-left"></i> Back to Home
        </Link>

        <div className="text-center mb-10">
          <h1 className="page-title text-[var(--text-heading-light)]">Media</h1>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Youth Voices in MSE shares global student perspectives and project spotlights through the Materia MSE
            YouTube channel.
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
                <h3 className="font-semibold text-[var(--text-heading-light)] mb-2">
                  {video.externalUrl ? (
                    <a
                      href={video.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {video.title}
                    </a>
                  ) : (
                    video.title
                  )}
                </h3>
                <p className="text-sm text-secondary">{video.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

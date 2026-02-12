interface AboutPageProps {
  isActive: boolean;
}

export function AboutPage({ isActive }: AboutPageProps) {
  return (
    <section id="page-about" className={`page-section py-16 md:py-24 bg-[var(--bg-soft-light)] ${isActive ? 'active' : ''}`}>
      <div className="content-container max-w-4xl mx-auto">
        <a href="/" className="page-link back-link"><i className="ti ti-arrow-left"></i> Back to Home</a>
        <h1 className="page-title">About Materia</h1>
        <div className="prose dark:prose-invert max-w-none text-secondary text-base leading-relaxed">
          <h2 className="text-2xl font-semibold text-heading-light !mb-3 !mt-8">What is Materia?</h2>
          <p>Materia is a platform designed to make materials engineering simple, exciting, and accessible. Whether you&apos;re a student curious about polymers or a maker exploring metals, our goal is to connect you with the knowledge, people, and tools that bring the world of materials to life.</p>
          <p>We believe materials are the building blocks of progress—from the composites in spacecraft to the biomaterials in medicine—and that everyone should have the chance to explore how they work.</p>

          <h2 className="text-2xl font-semibold text-heading-light !mb-3 !mt-8">Why I Started Materia</h2>
          <p>My name is Nikhilesh Suravarjjala, and I&apos;m a high school student with a passion for engineering, storytelling, and making information approachable. As someone constantly curious about how things are built—and why some materials are chosen over others—I found it frustrating how complex and scattered the information on materials science was.</p>
          <p>So I created Materia. Not because I&apos;m an expert, but because I believe that being a beginner is actually a superpower. Materia exists to answer the questions we all have when we&apos;re just starting out—and to grow with us as we go deeper.</p>

          <h2 className="text-2xl font-semibold text-heading-light !mb-3 !mt-8">What We Offer</h2>
          <ul>
            <li>Intro guides to materials like polymers, metals, ceramics, composites, and more</li>
            <li>Curated articles and recent breakthroughs</li>
            <li>Blogs and explainers that break down complex concepts</li>
            <li>A community that connects you with mentors, researchers, and learners like you</li>
            <li>Subscriptions and tools that make learning continuous and engaging</li>
          </ul>

          <h2 className="text-2xl font-semibold text-heading-light !mb-3 !mt-8">The Vision</h2>
          <p>Our long-term vision is to build the most trusted hub for materials knowledge—where students, creators, researchers, and educators can meet, share, and inspire the next wave of innovations.</p>
          <p>If you&apos;ve ever looked at a plane wing, a phone screen, or even a biodegradable cup and wondered &quot;how is that made?&quot;—you&apos;re in the right place.</p>
        </div>
      </div>
    </section>
  );
}
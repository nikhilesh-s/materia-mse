'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface AboutPageProps {
  isActive: boolean;
}

export function AboutPage({ isActive }: AboutPageProps) {
  return (
    <section
      id="page-about"
      className={`page-section py-16 md:py-24 bg-[var(--bg-soft-light)] ${isActive ? 'active' : ''}`}
    >
      <div className="content-container max-w-5xl mx-auto">
        <Link href="/" className="page-link back-link">
          <i className="ti ti-arrow-left"></i> Back to Home
        </Link>

        <h1 className="page-title mb-4">About Materia MSE</h1>
        <p className="text-lg text-secondary mb-10 leading-relaxed">
          Materia MSE is built to make materials engineering clear, exciting, and usable through research breakdowns,
          project spotlights, and interdisciplinary learning.
        </p>

        <div className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-semibold text-[var(--text-heading-light)] mb-4">Our Story</h2>
          <Accordion type="single" collapsible defaultValue="what-is-materia" className="w-full">
            <AccordionItem value="what-is-materia">
              <AccordionTrigger className="text-base md:text-lg text-[var(--text-heading-light)] hover:no-underline">
                What is Materia?
              </AccordionTrigger>
              <AccordionContent className="text-base text-secondary leading-relaxed space-y-4">
                <p>
                  Materia is a platform built to make materials engineering clear, exciting, and usable. Whether you
                  are a student exploring polymers for the first time or a builder working with metals and composites,
                  the goal is simple; connect people to the knowledge, tools, and conversations that make materials
                  come alive.
                </p>
                <p>
                  Materials are the foundation of progress. They shape aircraft, medical devices, energy systems,
                  electronics, infrastructure, and the products we use every day. Understanding materials means
                  understanding how the modern world is built.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="why-started">
              <AccordionTrigger className="text-base md:text-lg text-[var(--text-heading-light)] hover:no-underline">
                Why I Started Materia
              </AccordionTrigger>
              <AccordionContent className="text-base text-secondary leading-relaxed space-y-4">
                <p>
                  When I first began exploring materials science more seriously, I noticed something frustrating; the
                  information existed, but it was scattered. Some of it lived in textbooks. Some of it lived in
                  research papers. Some of it lived inside industry decisions that were never fully explained.
                </p>
                <p>There was no central space that connected theory, real-world application, and active discussion.</p>
                <p>So I built one.</p>
                <p>
                  Materia began as a structured place to organize learning, connect concepts, and think more deeply
                  about why certain material decisions matter. Over time, it evolved into something bigger; a platform
                  for analysis, projects, and interdisciplinary exploration.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="what-we-offer">
              <AccordionTrigger className="text-base md:text-lg text-[var(--text-heading-light)] hover:no-underline">
                What We Offer
              </AccordionTrigger>
              <AccordionContent className="text-base text-secondary leading-relaxed">
                <ul className="space-y-2 list-disc pl-5">
                  <li>Structured introductions to polymers, metals, ceramics, composites, and emerging materials</li>
                  <li>Clear breakdowns of complex research and modern breakthroughs</li>
                  <li>Long-form blogs and explainers that connect materials to real systems</li>
                  <li>A growing community focused on discussion, feedback, and collaboration</li>
                  <li>Tools and resources designed to make learning continuous rather than passive</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="vision">
              <AccordionTrigger className="text-base md:text-lg text-[var(--text-heading-light)] hover:no-underline">
                The Vision
              </AccordionTrigger>
              <AccordionContent className="text-base text-secondary leading-relaxed space-y-4">
                <p>
                  The long-term goal of Materia is to become a trusted, interdisciplinary hub for materials thinking.
                  Not just a resource library, but a place where analysis, experimentation, and collaboration
                  intersect.
                </p>
                <p>
                  Materials science does not stand alone; it connects to history, statistics, economics, sustainability,
                  artificial intelligence, and design. The future of innovation will depend on people who can see those
                  intersections clearly.
                </p>
                <p>
                  If you have ever looked at a plane wing, a phone screen, or a biodegradable product and wondered how
                  the material choice shaped the outcome; you are exactly who Materia is for.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-[var(--text-heading-light)] mb-2">Team</h2>
          <p className="text-secondary mb-4">Materia MSE relies on three primary chief executives.</p>

          <Accordion type="single" collapsible defaultValue="nikhilesh" className="w-full">
            <AccordionItem value="nikhilesh">
              <AccordionTrigger className="text-base md:text-lg text-[var(--text-heading-light)] hover:no-underline">
                Founder + CEO: Nikhilesh Suravarjjala
              </AccordionTrigger>
              <AccordionContent className="text-base text-secondary leading-relaxed space-y-4">
                <div className="relative w-full max-w-sm h-56 rounded-xl overflow-hidden border border-[var(--border-light)] bg-[var(--bg-soft-light)]">
                  <Image
                    src="https://i.imgur.com/BjjzPXF.jpeg"
                    alt="Nikhilesh Suravarjjala"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <p>
                  Hey! My name is Nikhilesh Suravarjjala, and I built Materia MSE because materials science feels both
                  underrated and gatekept. MSE quietly powers aerospace, energy, medicine, semiconductors, and
                  manufacturing; yet most people never see how central it actually is. When I started digging deeper, I
                  realized the field was not small; it was just siloed. Materials science does not live in isolation;
                  it collides with history, statistics, economics, design, sustainability, and now artificial
                  intelligence. If you zoom out, it becomes one of the most opportunity-rich disciplines of the next
                  decade. That realization is what pushed me to build something public.
                </p>
                <p>
                  Materia is not about publishing papers; it is about making them understandable and usable. It is
                  about breaking down complex research, connecting ideas across fields, and showing how materials
                  decisions shape real systems. In an AI-driven world where data, modeling, and simulation are
                  accelerating discovery, the people who understand materials will shape industries. I want Materia to
                  help students see that; not as a niche academic path, but as a launchpad. There is room for builders,
                  analysts, storytellers, coders, and researchers here. The field is still growing; the surface has
                  barely been scratched :)
                </p>
                <p>
                  For me, Materia is also where I can host my projects, test ideas, and build in public. It is a place
                  for feedback; a place to refine research questions; a place to connect with people who think deeply
                  about materials. I want it to grow into a platform where interdisciplinary thinking is normal; where
                  projects, analysis, and experimentation live side by side. I am not building Materia because I have
                  all the answers; I am building it because I believe the future of materials science should be open,
                  collaborative, and, most importantly, bold.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="kelvin">
              <AccordionTrigger className="text-base md:text-lg text-[var(--text-heading-light)] hover:no-underline">
                East Coast Lead + CTO: Kelvin Zhang
              </AccordionTrigger>
              <AccordionContent className="text-base text-secondary leading-relaxed space-y-4">
                <div className="relative w-full max-w-sm h-56 rounded-xl overflow-hidden border border-[var(--border-light)] bg-[var(--bg-soft-light)]">
                  <Image
                    src="https://via.placeholder.com/800x450.png?text=Kelvin+Zhang+Photo+Placeholder"
                    alt="Kelvin Zhang placeholder"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <p>Officer bio placeholder. Add Kelvin&apos;s full bio content when ready.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ekaterina">
              <AccordionTrigger className="text-base md:text-lg text-[var(--text-heading-light)] hover:no-underline">
                International Liaison: Ekaterina Biryukova
              </AccordionTrigger>
              <AccordionContent className="text-base text-secondary leading-relaxed space-y-4">
                <div className="relative w-full max-w-sm h-56 rounded-xl overflow-hidden border border-[var(--border-light)] bg-[var(--bg-soft-light)]">
                  <Image
                    src="https://via.placeholder.com/800x450.png?text=Ekaterina+Biryukova+Photo+Placeholder"
                    alt="Ekaterina Biryukova placeholder"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <p>Officer bio placeholder. Add Ekaterina&apos;s full bio content when ready.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}

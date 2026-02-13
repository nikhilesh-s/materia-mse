'use client';

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
      <div className="content-container max-w-4xl mx-auto">
        <Link href="/" className="page-link back-link">
          <i className="ti ti-arrow-left"></i> Back to Home
        </Link>

        <h1 className="page-title mb-4">About Materia MSE</h1>
        <p className="text-lg text-secondary mb-10 leading-relaxed">
          Materia MSE exists to make materials science approachable, practical, and exciting for students worldwide.
          We built this platform to share insight-driven content, highlight student voices, and create a place where
          curiosity turns into projects and real learning.
        </p>

        <Accordion
          type="single"
          collapsible
          defaultValue="our-story"
          className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-xl px-6"
        >
          <AccordionItem value="our-story">
            <AccordionTrigger className="text-lg text-[var(--text-heading-light)] hover:no-underline">
              Our Story
            </AccordionTrigger>
            <AccordionContent className="text-base text-secondary leading-relaxed space-y-4">
              <p>
                Materia MSE was founded by Nikhilesh Suravarjjala to bridge the gap between advanced materials science
                ideas and student-friendly learning. The goal was simple: make MSE less intimidating and more useful
                for real students, makers, and early researchers.
              </p>
              <p>
                From blog explainers and community programs to media projects like Youth Voices in MSE, Materia MSE is
                growing into a student-led platform focused on clarity, collaboration, and impact.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="team">
            <AccordionTrigger className="text-lg text-[var(--text-heading-light)] hover:no-underline">
              Team
            </AccordionTrigger>
            <AccordionContent className="text-base text-secondary leading-relaxed">
              <p className="mb-4">Materia MSE relies on three primary chief executives:</p>
              <ul className="space-y-3">
                <li className="rounded-lg border border-[var(--border-light)] p-4 bg-[var(--bg-soft-light)]">
                  <span className="font-semibold text-[var(--text-heading-light)]">Founder + CEO:</span> Nikhilesh
                  Suravarjjala
                  <div className="mt-4 space-y-4 text-sm md:text-base leading-relaxed text-secondary">
                    <p>
                      Hey! My name is Nikhilesh Suravarjjala, and I built Materia MSE because materials science feels
                      both underrated and gatekept. MSE quietly powers aerospace, energy, medicine, semiconductors,
                      and manufacturing; yet most people never see how central it actually is. When I started digging
                      deeper, I realized the field was not small; it was just siloed. Materials science does not live
                      in isolation; it collides with history, statistics, economics, design, sustainability, and now
                      artificial intelligence. If you zoom out, it becomes one of the most opportunity-rich disciplines
                      of the next decade. That realization is what pushed me to build something public.
                    </p>
                    <p>
                      Materia is not about publishing papers; it is about making them understandable and usable. It is
                      about breaking down complex research, connecting ideas across fields, and showing how materials
                      decisions shape real systems. In an AI-driven world where data, modeling, and simulation are
                      accelerating discovery, the people who understand materials will shape industries. I want Materia
                      to help students see that; not as a niche academic path, but as a launchpad. There is room for
                      builders, analysts, storytellers, coders, and researchers here. The field is still growing; the
                      surface has barely been scratched :)
                    </p>
                    <p>
                      For me, Materia is also where I can host my projects, test ideas, and build in public. It is a
                      place for feedback; a place to refine research questions; a place to connect with people who
                      think deeply about materials. I want it to grow into a platform where interdisciplinary thinking
                      is normal; where projects, analysis, and experimentation live side by side. I am not building
                      Materia because I have all the answers; I am building it because I believe the future of
                      materials science should be open, collaborative, and, most importantly, bold.
                    </p>
                  </div>
                </li>
                <li className="rounded-lg border border-[var(--border-light)] p-4 bg-[var(--bg-soft-light)]">
                  <span className="font-semibold text-[var(--text-heading-light)]">East Coast Lead + CTO:</span>{' '}
                  Kelvin Zhang
                </li>
                <li className="rounded-lg border border-[var(--border-light)] p-4 bg-[var(--bg-soft-light)]">
                  <span className="font-semibold text-[var(--text-heading-light)]">International Liaison:</span>{' '}
                  Ekaterina Biryukova
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

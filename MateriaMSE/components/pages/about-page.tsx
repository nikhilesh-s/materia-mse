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

'use client';

import { useRef, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured, safeSupabaseOperation } from '@/lib/supabase';

interface JoinPageProps {
  isActive: boolean;
}

export function JoinPage({ isActive }: JoinPageProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [subscribingToNewsletter, setSubscribingToNewsletter] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [selectedMemberType, setSelectedMemberType] = useState('');

  useEffect(() => {
    if (isActive && formRef.current && typeof window !== 'undefined') {
      const memberOptions = formRef.current.querySelectorAll('.member-type-option');
      const memberTypeInput = formRef.current.querySelector('#member_type_input');
      
      if (memberOptions.length > 0 && memberTypeInput) {
        memberOptions.forEach(option => {
          option.addEventListener('click', () => {
            memberOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            const value = (option as HTMLElement).dataset.value || '';
            (memberTypeInput as HTMLInputElement).value = value;
            setSelectedMemberType(value);
          });
        });
      }
    }
  }, [isActive]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSupabaseConfigured()) {
      alert('Newsletter subscription is not available at the moment. Please try again later.');
      return;
    }

    const trimmedEmail = newsletterEmail.trim();
    if (!trimmedEmail) {
      return;
    }

    setSubscribingToNewsletter(true);

    try {
      const existingResult = await safeSupabaseOperation(
        async () => {
          const { data, error } = await supabase!
            .from('newsletter_subscribers')
            .select('email')
            .eq('email', trimmedEmail)
            .limit(1)
            .then((res) => res);
          return { data, error };
        },
        { data: [], error: null }
      );

      if (existingResult.error) {
        throw existingResult.error;
      }

      if (existingResult.data && existingResult.data.length > 0) {
        alert('You\'re already subscribed to our newsletter!');
        setNewsletterEmail('');
        setSubscribingToNewsletter(false);
        return;
      }

      const insertResult = await safeSupabaseOperation(
        async () => {
          const { error } = await supabase!
            .from('newsletter_subscribers')
            .insert({ email: trimmedEmail })
            .then((res) => res);
          if (error) throw error;
          return true;
        },
        false
      );

      if (!insertResult) {
        throw new Error('Failed to add subscription to database');
      }

      try {
        const emailResult = await safeSupabaseOperation(
          async () => {
            const { data, error } = await supabase!.functions.invoke('send-newsletter-confirmation', {
              body: { email: trimmedEmail },
            });
            return { data, error };
          },
          { data: null, error: new Error('Email service not available') }
        );

        if (emailResult.error) {
          alert('Subscribed successfully, but there was an issue sending the confirmation email. You\'re still subscribed!');
        } else {
          alert('Successfully subscribed to our newsletter! Check your email for confirmation.');
        }
      } catch {
        alert('Subscribed successfully, but there was an issue sending the confirmation email. You\'re still subscribed!');
      }

      setNewsletterEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('Error subscribing to newsletter. Please try again.');
    } finally {
      setSubscribingToNewsletter(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupabaseConfigured()) {
      alert('Community applications are not available at the moment. Please try again later.');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('email') as string;
      
      // Check if email already exists
      const existingMember = await safeSupabaseOperation(
        async () => {
          const { data, error } = await supabase!
            .from('community_members')
            .select('id')
            .eq('email', email)
            .limit(1);
          
          if (error) {
            throw error;
          }
          
          return data;
        },
        []
      );

      if (existingMember && existingMember.length > 0) {
        alert('This email address is already registered. If you need to update your information, please contact us.');
        setSubmitting(false);
        return;
      }
      
      // Get interests as array
      const interests = formData.getAll('interests[]') as string[];
      
      const memberData = {
        full_name: formData.get('full_name') as string,
        preferred_name: formData.get('preferred_name') as string || null,
        email: email,
        school_organization: formData.get('school_organization') as string || null,
        grade_year: formData.get('grade_year') as string || null,
        location: formData.get('location') as string || null,
        member_type: formData.get('member_type') as string,
        goals: formData.get('goals') as string,
        interests: interests,
        linkedin_website: formData.get('linkedin_website') as string || null,
        newsletter_opt_in: formData.get('newsletter_opt_in') === 'yes',
        how_heard: formData.get('how_heard') as string || null,
        approved: false
      };

      console.log('Submitting member application:', memberData);

      // Insert member data
      const insertResult = await safeSupabaseOperation(
        async () => {
          const { error } = await supabase!
            .from('community_members')
            .insert(memberData)
            .then(res => res);
          if (error) throw error;
          return true;
        },
        false
      );

      if (!insertResult) {
        throw new Error('Failed to submit application to database');
      }

      console.log('Successfully added to database, now sending notification email...');

      // Send application notification email
      try {
        console.log('Invoking send-application-notification function...');
        const emailResult = await safeSupabaseOperation(
          async () => {
            const { data, error } = await supabase!.functions.invoke('send-application-notification', {
              body: memberData
            }).then(res => res);
            return { data, error };
          },
          { data: null, error: new Error('Email service not available') }
        );
        
        console.log('Email function response:', emailResult);
        
        if (emailResult.error) {
          console.error('Failed to send notification email:', emailResult.error);
          // Don't fail the whole process if email fails
        }
      } catch (emailError) {
        console.error('Email service error:', emailError);
        // Continue even if email fails
      }

      alert('Application submitted successfully! We\'ll review it and get back to you soon.');
      
      // Reset form
      if (formRef.current) {
        formRef.current.reset();
        setSelectedMemberType('');
        // Clear selected member type option
        const memberOptions = formRef.current.querySelectorAll('.member-type-option');
        memberOptions.forEach(opt => opt.classList.remove('selected'));
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="page-join" className={`page-section py-16 md:py-24 bg-[var(--bg-light)] ${isActive ? 'active' : ''}`}>
      <div className="content-container max-w-4xl mx-auto">
        <h1 className="page-title text-center">Join the Community</h1>
        <p className="text-lg text-secondary text-center max-w-3xl mx-auto mb-12"> Become part of a growing network dedicated to exploring and advancing the field of materials science. Choose the member type that best fits you. </p>

        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border-light)] bg-[var(--bg-soft-light)] p-6 md:p-8 shadow-md">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/12 via-[var(--accent-primary-lighter)]/8 to-[var(--accent-secondary)]/12"></div>
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--accent-primary)] mb-3">Newsletter</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                <span className="hero-highlight-gradient">Stay Updated with Materials Science</span>
              </h2>
              <p className="text-secondary mb-6">Get fresh insights, project highlights, and community updates delivered to your inbox.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <label htmlFor="join-newsletter-email" className="sr-only">Email address</label>
                <input
                  type="email"
                  name="join-newsletter-email"
                  id="join-newsletter-email"
                  required
                  className="form-input flex-grow !mt-0"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={subscribingToNewsletter}
                />
                <button
                  type="submit"
                  disabled={subscribingToNewsletter}
                  className="inline-flex items-center justify-center bg-[var(--gradient-primary)] hover:opacity-95 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md text-sm transition duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {subscribingToNewsletter ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe <i className="ti ti-send ml-2 text-xs"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10" ref={formRef}>
          <div className="form-section">
            <h2 className="form-section-title">Member Type</h2>
            <div id="member-type-selector" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="member-type-option" data-value="explorer">
                <h5><i className="ti ti-search mr-1"></i> Explorer</h5>
                <p>For those looking to learn, browse, and ask questions.</p>
              </div>
              <div className="member-type-option" data-value="contributor">
                <h5><i className="ti ti-pencil mr-1"></i> Contributor</h5>
                <p>For writers, content creators, and bloggers.</p>
              </div>
              <div className="member-type-option" data-value="builder">
                <h5><i className="ti ti-tool mr-1"></i> Builder</h5>
                <p>For those interested in internships, projects, or helping with the site.</p>
              </div>
              <div className="member-type-option" data-value="connector">
                <h5><i className="ti ti-link mr-1"></i> Connector</h5>
                <p>For mentors, researchers, or teachers who want to guide or network.</p>
              </div>
            </div>
            <input type="hidden" name="member_type" id="member_type_input" required />
            {!selectedMemberType && (
              <p className="text-sm text-red-600 mt-2">Please select a member type</p>
            )}
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="full_name" className="form-label">Full Name *</label>
                <input type="text" name="full_name" id="full_name" required className="form-input" placeholder="Jane Doe" />
              </div>
              <div>
                <label htmlFor="preferred_name" className="form-label">Preferred Name</label>
                <input type="text" name="preferred_name" id="preferred_name" className="form-input" placeholder="Jane" />
              </div>
              <div>
                <label htmlFor="join_email" className="form-label">Email Address *</label>
                <input type="email" name="email" id="join_email" required className="form-input" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="school_organization" className="form-label">School / Organization</label>
                <input type="text" name="school_organization" id="school_organization" className="form-input" placeholder="University Name / Company Inc." />
              </div>
              <div>
                <label htmlFor="grade_year" className="form-label">Grade or Year</label>
                <input type="text" name="grade_year" id="grade_year" className="form-input" placeholder="e.g., 11th Grade, 2nd Year Undergrad" />
              </div>
              <div>
                <label htmlFor="location" className="form-label">Location (City, State/Country)</label>
                <input type="text" name="location" id="location" className="form-input" placeholder="San Francisco, CA, USA" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Additional Information</h2>
            <div>
              <label htmlFor="goals" className="form-label">What do you want to get out of Materia? *</label>
              <textarea id="goals" name="goals" rows={4} required className="form-textarea" placeholder="e.g., Learn about specific materials, find project collaborators, contribute articles..."></textarea>
            </div>
            <div className="mt-6">
              <label className="form-label">Interests (Check all that apply)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3 mt-2">
                <label className="checkbox-label"><input type="checkbox" name="interests[]" value="polymers" className="checkbox-input" /> Polymers</label>
                <label className="checkbox-label"><input type="checkbox" name="interests[]" value="metals" className="checkbox-input" /> Metals</label>
                <label className="checkbox-label"><input type="checkbox" name="interests[]" value="ceramics" className="checkbox-input" /> Ceramics</label>
                <label className="checkbox-label"><input type="checkbox" name="interests[]" value="composites" className="checkbox-input" /> Composites</label>
                <label className="checkbox-label"><input type="checkbox" name="interests[]" value="biomaterials" className="checkbox-input" /> Biomaterials</label>
                <label className="checkbox-label"><input type="checkbox" name="interests[]" value="semiconductors" className="checkbox-input" /> Semiconductors</label>
                <label className="checkbox-label"><input type="checkbox" name="interests[]" value="nanomaterials" className="checkbox-input" /> Nanomaterials</label>
                <label className="checkbox-label"><input type="checkbox" name="interests[]" value="sustainability" className="checkbox-input" /> Sustainability</label>
                <label className="checkbox-label"><input type="checkbox" name="interests[]" value="research" className="checkbox-input" /> Research</label>
                <label className="checkbox-label"><input type="checkbox" name="interests[]" value="writing" className="checkbox-input" /> Writing</label>
                <label className="checkbox-label"><input type="checkbox" name="interests[]" value="design" className="checkbox-input" /> Design</label>
                <label className="checkbox-label"><input type="checkbox" name="interests[]" value="mentorship" className="checkbox-input" /> Mentorship</label>
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="linkedin_website" className="form-label">LinkedIn or Website (Optional)</label>
              <input type="url" name="linkedin_website" id="linkedin_website" className="form-input" placeholder="https://linkedin.com/in/... or https://yoursite.com" />
            </div>
            <div className="mt-6">
              <label className="checkbox-label">
                <input type="checkbox" name="newsletter_opt_in" value="yes" defaultChecked className="checkbox-input" />
                Would you like to be added to the newsletter / update list?
              </label>
            </div>
            <div className="mt-6">
              <label htmlFor="how_heard" className="form-label">How did you hear about Materia?</label>
              <input type="text" name="how_heard" id="how_heard" className="form-input" placeholder="e.g., Friend, Search Engine, Social Media..." />
            </div>
          </div>

          <div className="text-center pt-6 border-t border-[var(--border-light)]">
            <button 
              type="submit" 
              disabled={submitting || !selectedMemberType}
              className="inline-flex items-center justify-center bg-[var(--gradient-primary)] hover:opacity-95 text-white font-semibold px-10 py-3.5 rounded-lg shadow-lg text-base transition duration-300 transform hover:-translate-y-1 hover:shadow-[0_8px_20px_-5px_var(--shadow-color-light-stronger)] dark:hover:shadow-[0_8px_20px_-5px_var(--shadow-color-dark)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application <i className="ti ti-check ml-2"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

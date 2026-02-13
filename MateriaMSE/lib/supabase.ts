import { createClient } from '@supabase/supabase-js';

// Use environment variables with fallbacks for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isValidSupabaseUrl = (value?: string) => {
  if (!value || value === 'your_supabase_url_here') return false;
  return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(value);
};

const isValidSupabasePublicKey = (value?: string) => {
  if (!value || value === 'your_supabase_anon_key_here') return false;

  // Legacy JWT anon keys usually begin with "eyJ"
  if (value.startsWith('eyJ') && value.length > 30) return true;
  // New Supabase publishable key format
  if (value.startsWith('sb_publishable_') && value.length > 20) return true;

  return false;
};

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseAnonKey);
console.log('Environment check:', {
  url: supabaseUrl,
  keyLength: supabaseAnonKey?.length,
  isValidUrl: isValidSupabaseUrl(supabaseUrl),
  isValidKey: isValidSupabasePublicKey(supabaseAnonKey)
});

const validatedSupabaseUrl = isValidSupabaseUrl(supabaseUrl) ? supabaseUrl : undefined;
const validatedSupabaseAnonKey = isValidSupabasePublicKey(supabaseAnonKey) ? supabaseAnonKey : undefined;

// Only create client if we have valid credentials
export const supabase = validatedSupabaseUrl && validatedSupabaseAnonKey
  ? createClient(validatedSupabaseUrl, validatedSupabaseAnonKey, {
      auth: {
        persistSession: false // Disable auth for public access
      }
    })
  : null;

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  const isConfigured = supabase !== null && 
    supabaseUrl && 
    supabaseAnonKey &&
    isValidSupabaseUrl(supabaseUrl) &&
    isValidSupabasePublicKey(supabaseAnonKey);
  
  console.log('Supabase configured:', isConfigured);
  console.log('Configuration details:', {
    hasSupabaseClient: !!supabase,
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlValid: isValidSupabaseUrl(supabaseUrl),
    keyValid: isValidSupabasePublicKey(supabaseAnonKey)
  });
  
  return isConfigured;
};

// Helper function to safely execute Supabase operations
export const safeSupabaseOperation = async <T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> => {
  if (!supabase || !isSupabaseConfigured()) {
    console.warn('Supabase not configured properly, using fallback');
    return fallback;
  }
  
  try {
    const result = await operation();
    console.log('Supabase operation successful');
    return result;
  } catch (error: any) {
    // Don't log PGRST116 errors as they're expected when no rows are found
    if (error?.code !== 'PGRST116') {
      console.error('Supabase operation failed:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
    }
    return fallback;
  }
};

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string;
          featured_image: string | null;
          category: string;
          tags: string[];
          author: string;
          published: boolean;
          created_at: string;
          updated_at: string;
          slug: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt: string;
          featured_image?: string | null;
          category: string;
          tags?: string[];
          author: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
          slug: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string;
          featured_image?: string | null;
          category?: string;
          tags?: string[];
          author?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
          slug?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_name: string;
          author_email: string;
          content: string;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_name: string;
          author_email: string;
          content: string;
          approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_name?: string;
          author_email?: string;
          content?: string;
          approved?: boolean;
          created_at?: string;
        };
      };
      community_members: {
        Row: {
          id: string;
          full_name: string;
          preferred_name: string | null;
          email: string;
          school_organization: string | null;
          grade_year: string | null;
          location: string | null;
          member_type: string;
          goals: string;
          interests: string[];
          linkedin_website: string | null;
          newsletter_opt_in: boolean;
          how_heard: string | null;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          preferred_name?: string | null;
          email: string;
          school_organization?: string | null;
          grade_year?: string | null;
          location?: string | null;
          member_type: string;
          goals: string;
          interests: string[];
          linkedin_website?: string | null;
          newsletter_opt_in?: boolean;
          how_heard?: string | null;
          approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          preferred_name?: string | null;
          email?: string;
          school_organization?: string | null;
          grade_year?: string | null;
          location?: string | null;
          member_type?: string;
          goals?: string;
          interests?: string[];
          linkedin_website?: string | null;
          newsletter_opt_in?: boolean;
          how_heard?: string | null;
          approved?: boolean;
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
          active: boolean;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
          active?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string;
          active?: boolean;
        };
      };
    };
  };
};

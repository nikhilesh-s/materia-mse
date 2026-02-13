/*
  # Add multi-tag support to blog posts

  1. Changes
    - Add `tags` (text[]) to `blog_posts`
    - Backfill tags using existing `category`
    - Add GIN index for tag lookups
*/

ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}';

UPDATE blog_posts
SET tags = ARRAY[category]
WHERE (tags IS NULL OR array_length(tags, 1) IS NULL OR array_length(tags, 1) = 0)
  AND category IS NOT NULL
  AND btrim(category) <> '';

CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN (tags);

-- Migration: Add author_bio column to articles table
ALTER TABLE public.articles 
ADD COLUMN author_bio TEXT;

-- Optional: Update existing records with default bio if needed
-- UPDATE public.articles SET author_bio = 'Researcher and writer exploring the intersection of history, technology, and politics.' WHERE author_bio IS NULL;

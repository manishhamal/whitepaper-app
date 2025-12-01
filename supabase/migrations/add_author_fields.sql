-- Add author fields to articles table
ALTER TABLE public.articles 
ADD COLUMN author_name TEXT,
ADD COLUMN author_role TEXT,
ADD COLUMN author_avatar TEXT;

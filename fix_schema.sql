-- Add missing columns if they don't exist
alter table public.articles add column if not exists featured_image text;
alter table public.articles add column if not exists title_ne text;
alter table public.articles add column if not exists excerpt_ne text;
alter table public.articles add column if not exists content_ne text;
alter table public.articles add column if not exists tags_ne text[];

-- Create the articles table
create table public.articles (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  title text not null,
  excerpt text null,
  content text null,
  date date not null default now(),
  category text not null,
  read_time text null,
  tags text[] null,
  featured_image text null,
  views integer null default 0,
  title_ne text null,
  excerpt_ne text null,
  content_ne text null,
  tags_ne text[] null,
  constraint articles_pkey primary key (id)
) tablespace pg_default;

-- Enable Row Level Security (RLS)
alter table public.articles enable row level security;

-- Create Policy: Allow public read access
create policy "Enable read access for all users"
on public.articles
for select
to public
using (true);

-- Create Policy: Allow authenticated users to insert/update/delete (For Admin)
-- For simplicity in this demo, we might allow anon to write if you don't have auth set up yet,
-- BUT it is highly recommended to set up Auth. 
-- For now, assuming you might want to test easily, we can allow anon write OR require auth.
-- Let's stick to a safer default: Authenticated users only for write.
-- If you want to test without login, you can change 'authenticated' to 'anon' temporarily.

create policy "Enable insert for authenticated users only"
on public.articles
for insert
to authenticated
with check (true);

create policy "Enable update for authenticated users only"
on public.articles
for update
to authenticated
using (true);

create policy "Enable delete for authenticated users only"
on public.articles
for delete
to authenticated
using (true);

-- Create Storage Bucket for Images
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true);

-- Storage Policy: Allow public to view images
create policy "Give public access to article-images"
on storage.objects
for select
to public
using (bucket_id = 'article-images');

-- Storage Policy: Allow authenticated uploads
create policy "Allow authenticated uploads"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'article-images');

create policy "Allow authenticated updates"
on storage.objects
for update
to authenticated
using (bucket_id = 'article-images');

create policy "Allow authenticated deletes"
on storage.objects
for delete
to authenticated
using (bucket_id = 'article-images');

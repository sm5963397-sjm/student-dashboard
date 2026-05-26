create extension if not exists pgcrypto;

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name text not null default 'book',
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;

drop policy if exists "Allow public read access to courses" on public.courses;

create policy "Allow public read access to courses"
on public.courses
for select
using (true);

insert into public.courses (title, progress, icon_name, created_at)
select *
from (
  values
    ('AI Product Foundations', 78, 'brain', now() - interval '1 day'),
    ('Frontend Systems Sprint', 64, 'code', now() - interval '2 days'),
    ('Learning Analytics Lab', 52, 'analytics', now() - interval '3 days'),
    ('Backend Data Flows', 36, 'database', now() - interval '4 days')
) as seed(title, progress, icon_name, created_at)
where not exists (
  select 1
  from public.courses
  where courses.title = seed.title
);

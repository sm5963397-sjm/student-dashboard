# Next Gen Learning Dashboard

A premium dark Student Dashboard built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React, and Supabase.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Windows PowerShell, if npm scripts are blocked by execution policy, use:

```powershell
npm.cmd run dev
```

## Environment Variables

Create `.env.local` for local development:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Keep `.env.local` out of git. Commit `.env.example` as the safe template. Do not add service role keys to this frontend project.

For Vercel production:

1. Open the Vercel project.
2. Go to **Settings > Environment Variables**.
3. Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase Project URL.
4. Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase anon public key.
5. Select the environments you want to use, at minimum **Production**.
6. Redeploy the latest production deployment after saving the variables.

Do not leave those Vercel values blank. If either value is missing or empty, the dashboard keeps the real Server Component fetch path ready while showing a polished starter learning path instead of blocking the UI.

## Supabase Setup

1. Create a Supabase project.
2. Open **Project Settings > API**.
3. Copy the Project URL and anon public key.
4. Paste those public values into `.env.local`.
5. Run the SQL below in the Supabase SQL editor.

```sql
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
values
  ('AI Product Foundations', 78, 'brain', now() - interval '1 day'),
  ('Frontend Systems Sprint', 64, 'code', now() - interval '2 days'),
  ('Learning Analytics Lab', 52, 'analytics', now() - interval '3 days'),
  ('Supabase Data Flows', 36, 'database', now() - interval '4 days');
```

## Server Component Data Fetching

Course data is fetched in `src/app/page.tsx`, which is an async App Router Server Component. The dashboard does not use client-side fetch for courses.

```ts
const { data, error } = await supabase
  .from("courses")
  .select("id, title, progress, icon_name, created_at")
  .order("created_at", { ascending: false });
```

If Supabase fails, the UI renders a premium non-technical refresh state and keeps the dashboard useful. If the table is empty, it renders an empty state. Successful rows are passed from the Server Component into animated course tiles.

When Supabase environment variables are not configured yet, the app silently renders a starter learning path. The real Supabase query remains the primary path and automatically replaces the starter content once valid Vercel environment variables are added.

## Framer Motion

Framer Motion is used only for presentation:

- Bento tiles stagger into view on page load.
- Cards scale subtly on hover with spring physics.
- The sidebar active item uses a shared `layoutId` background.
- Course progress bars animate from `0` to the Supabase `progress` value using `scaleX`.

Motion is limited to transform and opacity for the page and card animations to avoid layout shifts.

## Responsive Design

- Desktop above `1024px`: visible sidebar and full Bento Grid.
- Tablet from `768px` to `1024px`: icon-only sidebar and two-column grid.
- Mobile below `768px`: hamburger navigation and one-column stacked cards.

The app is dark mode only, with a near-black shell, glassmorphism cards, subtle gradient mesh, and grain texture.

## Project Structure

```txt
src/
  app/
    page.tsx
    layout.tsx
    loading.tsx
    globals.css
  components/
    sidebar.tsx
    hero-card.tsx
    course-card.tsx
    activity-card.tsx
    bento-grid.tsx
    loading-skeleton.tsx
    error-card.tsx
    analytics-card.tsx
    coach-card.tsx
    settings-card.tsx
  lib/
    supabase.ts
    supabase/
      server.ts
  types/
    course.ts
```

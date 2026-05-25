import { ActivityCard } from "@/components/activity-card";
import { BentoGrid, StatTile } from "@/components/bento-grid";
import { CourseCard } from "@/components/course-card";
import { ErrorCard } from "@/components/error-card";
import { HeroCard } from "@/components/hero-card";
import { Sidebar } from "@/components/sidebar";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ActivityItem, Course } from "@/types/course";

export const dynamic = "force-dynamic";

const activity: ActivityItem[] = [
  {
    id: "pulse-1",
    title: "Completed quiz",
    description: "Model evaluation basics",
    timestamp: "12 min ago",
    tone: "success",
  },
  {
    id: "pulse-2",
    title: "New mentor note",
    description: "Sharpen the case-study wireframe",
    timestamp: "42 min ago",
    tone: "info",
  },
  {
    id: "pulse-3",
    title: "Focus streak",
    description: "5 days of consistent learning",
    timestamp: "Today",
    tone: "warning",
  },
];

type CoursesResult = {
  courses: Course[];
  status: "supabase" | "demo" | "empty" | "error";
  message?: string;
};

const demoCourses: Course[] = [
  {
    id: "demo-ai-foundations",
    title: "AI Product Foundations",
    progress: 78,
    icon_name: "brain",
    created_at: "2026-05-24T08:00:00.000Z",
  },
  {
    id: "demo-frontend-systems",
    title: "Frontend Systems Sprint",
    progress: 64,
    icon_name: "code",
    created_at: "2026-05-23T08:00:00.000Z",
  },
  {
    id: "demo-analytics-lab",
    title: "Learning Analytics Lab",
    progress: 52,
    icon_name: "analytics",
    created_at: "2026-05-22T08:00:00.000Z",
  },
  {
    id: "demo-supabase-flows",
    title: "Supabase Data Flows",
    progress: 36,
    icon_name: "database",
    created_at: "2026-05-21T08:00:00.000Z",
  },
];

function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}

async function getCourses(): Promise<CoursesResult> {
  if (!hasSupabaseEnv()) {
    return {
      courses: demoCourses,
      status: "demo",
      message: "Add real Supabase environment variables in Vercel to replace demo rows.",
    };
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("courses")
      .select("id, title, progress, icon_name, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return {
        courses: [],
        status: "error",
        message: error.message,
      };
    }

    if (!data || data.length === 0) {
      return {
        courses: [],
        status: "empty",
        message: "The courses table is connected, but no rows were returned.",
      };
    }

    return {
      courses: data as Course[],
      status: "supabase",
    };
  } catch (error) {
    return {
      courses: [],
      status: "error",
      message: error instanceof Error ? error.message : "Unable to connect to Supabase.",
    };
  }
}

function getAverageProgress(courses: Course[]) {
  if (courses.length === 0) {
    return 0;
  }

  const total = courses.reduce((sum, course) => sum + course.progress, 0);
  return Math.round(total / courses.length);
}

function renderCourseTiles(result: CoursesResult) {
  if (result.status === "error") {
    return (
      <ErrorCard
        kind="error"
        message={result.message}
        className="md:col-span-2 xl:col-span-3"
      />
    );
  }

  if (result.status === "empty") {
    return <ErrorCard kind="empty" className="md:col-span-2 xl:col-span-3" />;
  }

  return (
    <>
      {result.status === "demo" ? (
        <ErrorCard kind="demo" message={result.message} className="md:col-span-2 xl:col-span-4" />
      ) : null}
      {result.courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </>
  );
}

export default async function Home() {
  const result = await getCourses();
  const { courses, status } = result;
  const averageProgress = getAverageProgress(courses);
  const courseCount = String(courses.length);
  const courseDetail =
    status === "supabase"
      ? "Loaded from Supabase"
      : status === "demo"
        ? "Demo mode until Vercel env is set"
        : status === "empty"
          ? "Connected table has no rows"
          : "Connection needs attention";
  const progressDetail =
    status === "supabase" ? "Calculated from Supabase rows" : "Calculated from visible course rows";

  return (
    <main className="dashboard-shell min-h-screen overflow-x-hidden bg-background text-foreground">
      <span className="mesh-layer" />

      <section className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-4 px-4 pb-28 pt-4 md:grid-cols-[auto_minmax(0,1fr)] md:px-6 md:pb-6 lg:gap-6">
        <Sidebar />

        <section aria-label="Student dashboard" className="min-w-0">
          <BentoGrid>
            <HeroCard streakDays={12} dataMode={status} className="md:col-span-2 xl:col-span-3" />

            <StatTile
              iconName="sparkles"
              label="Synced courses"
              value={courseCount}
              detail={courseDetail}
              tone="cyan"
            />
            <StatTile
              iconName="gauge"
              label="Average progress"
              value={`${averageProgress}%`}
              detail={progressDetail}
              tone="emerald"
            />
            <StatTile
              iconName="trophy"
              label="Weekly target"
              value="84%"
              detail="On track for Friday review"
              tone="amber"
            />
            <StatTile
              iconName="calendar"
              label="Next focus"
              value="4 PM"
              detail="Frontend systems sprint"
              tone="violet"
            />

            <section id="courses" aria-label="Supabase course tiles" className="contents">
              {renderCourseTiles(result)}
            </section>

            <ActivityCard items={activity} className="md:col-span-2 xl:col-span-1" />
          </BentoGrid>
        </section>
      </section>
    </main>
  );
}

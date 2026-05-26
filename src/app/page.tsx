import { ActivityCard } from "@/components/activity-card";
import { AnalyticsCard } from "@/components/analytics-card";
import { BentoGrid, SectionHeader, StatTile } from "@/components/bento-grid";
import { CoachCard } from "@/components/coach-card";
import { CourseCard } from "@/components/course-card";
import { ErrorCard } from "@/components/error-card";
import { HeroCard } from "@/components/hero-card";
import { SettingsCard } from "@/components/settings-card";
import { Sidebar } from "@/components/sidebar";
import { getSupabaseConfig } from "@/lib/supabase/config";
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
  status: "supabase" | "fallback" | "empty" | "error";
};

const fallbackCourses: Course[] = [
  {
    id: "ai-product-foundations",
    title: "AI Product Foundations",
    progress: 78,
    icon_name: "brain",
    created_at: "2026-05-24T08:00:00.000Z",
  },
  {
    id: "frontend-systems-sprint",
    title: "Frontend Systems Sprint",
    progress: 64,
    icon_name: "code",
    created_at: "2026-05-23T08:00:00.000Z",
  },
  {
    id: "learning-analytics-lab",
    title: "Learning Analytics Lab",
    progress: 52,
    icon_name: "analytics",
    created_at: "2026-05-22T08:00:00.000Z",
  },
  {
    id: "backend-data-flows",
    title: "Backend Data Flows",
    progress: 36,
    icon_name: "database",
    created_at: "2026-05-21T08:00:00.000Z",
  },
];

function hasSupabaseEnv() {
  return getSupabaseConfig().isConfigured;
}

function isNetworkFetchFailure(error: { message?: string }) {
  return error.message?.toLowerCase().includes("fetch failed") ?? false;
}

async function getCourses(): Promise<CoursesResult> {
  if (!hasSupabaseEnv()) {
    return {
      courses: fallbackCourses,
      status: "fallback",
    };
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("courses")
      .select("id, title, progress, icon_name, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase courses query failed", {
        code: error.code,
        message: error.message,
        hint: error.hint,
      });

      return {
        courses: fallbackCourses,
        status: isNetworkFetchFailure(error) ? "fallback" : "error",
      };
    }

    if (!data || data.length === 0) {
      return {
        courses: [],
        status: "empty",
      };
    }

    return {
      courses: data as Course[],
      status: "supabase",
    };
  } catch (error) {
    console.error(error);

    return {
      courses: fallbackCourses,
      status: "error",
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
  if (result.status === "empty") {
    return <ErrorCard kind="empty" className="md:col-span-2 xl:col-span-4" />;
  }

  return (
    <>
      {result.status === "error" ? (
        <ErrorCard kind="error" className="md:col-span-2 xl:col-span-4" />
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
    status === "empty" ? "Ready for new enrollments" : "Personalized learning path";
  const progressDetail = "Across active courses";

  return (
    <main className="dashboard-shell min-h-screen overflow-x-hidden bg-background text-foreground">
      <span className="mesh-layer" />

      <section className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-4 px-4 pb-10 pt-24 md:grid-cols-[auto_minmax(0,1fr)] md:px-6 md:pb-6 md:pt-4 lg:gap-6">
        <Sidebar />

        <section aria-label="Student dashboard" className="min-w-0">
          <BentoGrid>
            <HeroCard id="overview" streakDays={12} className="md:col-span-2 xl:col-span-3" />

            <StatTile
              iconName="sparkles"
              label="Active courses"
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

            <SectionHeader
              id="courses"
              kicker="Course studio"
              title="Continue your learning path"
              description="Pick up the next lesson, compare progress, and open course details without leaving the dashboard."
              className="md:col-span-2 xl:col-span-4"
            />

            <section aria-label="Course tiles" className="contents">
              {renderCourseTiles(result)}
            </section>

            <AnalyticsCard
              id="analytics"
              activeCourses={courses.length}
              averageProgress={averageProgress}
              className="md:col-span-2 xl:col-span-4"
            />

            <CoachCard id="ai-coach" className="md:col-span-2 xl:col-span-2" />
            <SettingsCard id="settings" className="md:col-span-2 xl:col-span-1" />
            <ActivityCard items={activity} className="md:col-span-2 xl:col-span-1" />
          </BentoGrid>
        </section>
      </section>
    </main>
  );
}

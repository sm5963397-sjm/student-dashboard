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
  error: string | null;
};

async function getCourses(): Promise<CoursesResult> {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("courses")
      .select("id, title, progress, icon_name, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return {
        courses: [],
        error: error.message,
      };
    }

    return {
      courses: (data ?? []) as Course[],
      error: null,
    };
  } catch (error) {
    return {
      courses: [],
      error: error instanceof Error ? error.message : "Unable to connect to Supabase.",
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

function renderCourseTiles({ courses, error }: CoursesResult) {
  if (error) {
    return <ErrorCard kind="error" message={error} className="md:col-span-2 xl:col-span-3" />;
  }

  if (courses.length === 0) {
    return <ErrorCard kind="empty" className="md:col-span-2 xl:col-span-3" />;
  }

  return courses.map((course, index) => (
    <CourseCard key={course.id} course={course} index={index} />
  ));
}

export default async function Home() {
  const result = await getCourses();
  const { courses, error } = result;
  const averageProgress = getAverageProgress(courses);
  const courseCount = error ? "Setup" : String(courses.length);

  return (
    <main className="dashboard-shell min-h-screen overflow-x-hidden bg-background text-foreground">
      <span className="mesh-layer" />

      <section className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-4 px-4 pb-28 pt-4 md:grid-cols-[auto_minmax(0,1fr)] md:px-6 md:pb-6 lg:gap-6">
        <Sidebar />

        <section aria-label="Student dashboard" className="min-w-0">
          <BentoGrid>
            <HeroCard streakDays={12} className="md:col-span-2 xl:col-span-3" />

            <StatTile
              iconName="sparkles"
              label="Synced courses"
              value={courseCount}
              detail={error ? "Add Supabase env values" : "Loaded on the server"}
              tone="cyan"
            />
            <StatTile
              iconName="gauge"
              label="Average progress"
              value={`${averageProgress}%`}
              detail="Calculated from Supabase rows"
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

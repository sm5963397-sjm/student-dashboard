export type Course = {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
};

export type ActivityTone = "success" | "info" | "warning";

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  tone: ActivityTone;
};

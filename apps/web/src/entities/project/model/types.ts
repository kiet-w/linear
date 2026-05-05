export type ProjectStatus = "active" | "on_hold" | "archived";

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  icon?: string;
  open_issues?: number;
  last_activity?: string;
  contributors?: { initials: string; color?: string }[];
}

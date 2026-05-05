export type IssueStatus =
  | "backlog"
  | "planned"
  | "in_progress"
  | "in_review"
  | "done";

export interface Issue {
  id: string;
  identifier?: string;
  title: string;
  status: IssueStatus;
  priority: number;
  project_id: string;
  labels?: string[];
  assignee_avatar?: string;
  assignee_initials?: string;
  created_at: string;
  updated_at: string;
}

export const ISSUE_STATUSES: IssueStatus[] = [
  "backlog",
  "planned",
  "in_progress",
  "in_review",
  "done",
];

export const STATUS_LABELS: Record<IssueStatus, string> = {
  backlog: "Backlog",
  planned: "Planned",
  in_progress: "In Progress",
  in_review: "In Review",
  done: "Done",
};

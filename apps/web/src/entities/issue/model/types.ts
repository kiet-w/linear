export type IssueStatus = "todo" | "in_progress" | "done" | "cancelled";

export interface Issue {
  id: string;
  title: string;
  status: IssueStatus;
  priority: number;
  project_id: string;
  created_at: string;
  updated_at: string;
}

export const ISSUE_STATUSES: IssueStatus[] = [
  "todo",
  "in_progress",
  "done",
  "cancelled",
];

export const STATUS_LABELS: Record<IssueStatus, string> = {
  todo: "Todo",
  in_progress: "In Progress",
  done: "Done",
  cancelled: "Cancelled",
};

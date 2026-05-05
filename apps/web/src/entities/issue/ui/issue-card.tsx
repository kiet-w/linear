import type { Issue } from "../model/types";

interface IssueCardProps {
  issue: Issue;
  isDragging?: boolean;
}

const PRIORITY_LABELS: Record<number, string> = {
  0: "No priority",
  1: "Urgent",
  2: "High",
  3: "Medium",
  4: "Low",
};

export function IssueCard({ issue, isDragging }: IssueCardProps) {
  return (
    <div
      className={[
        "rounded-md border border-[#212226] bg-[#16181c] p-3 text-sm",
        isDragging ? "opacity-50 shadow-lg" : "hover:border-[#2e3035]",
      ].join(" ")}
    >
      <p className="font-medium text-slate-100 leading-snug">{issue.title}</p>
      <p className="mt-1.5 text-xs text-[#6b7280]">
        {PRIORITY_LABELS[issue.priority] ?? "No priority"}
      </p>
    </div>
  );
}

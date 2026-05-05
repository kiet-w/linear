import Image from "next/image";
import type { Issue } from "../model/types";

interface IssueCardProps {
  issue: Issue;
  isDragging?: boolean;
  isActive?: boolean;
}

export function IssueCard({ issue, isDragging, isActive }: IssueCardProps) {
  return (
    <div
      className={[
        "rounded-lg p-3 cursor-pointer transition-colors group",
        isDragging ? "opacity-50" : "",
        isActive
          ? "bg-[#111214] border border-[#5E6AD2]/50 shadow-[0_0_15px_rgba(94,106,210,0.1)]"
          : "bg-[#111214] border border-[#212226] hover:border-[#454652]",
      ].join(" ")}
    >
      {/* Header: ID + Assignee */}
      <div className="flex justify-between items-start mb-2">
        <span
          className={[
            "font-mono text-[10px]",
            isActive
              ? "text-[#bdc2ff]"
              : "text-slate-500 group-hover:text-[#5e6ad2] transition-colors",
          ].join(" ")}
        >
          {issue.identifier ?? issue.id.slice(0, 6).toUpperCase()}
        </span>
        {issue.assignee_avatar ? (
          <Image
            src={issue.assignee_avatar}
            alt="Assignee"
            width={16}
            height={16}
            className="rounded-full"
          />
        ) : issue.assignee_initials ? (
          <div className="w-4 h-4 rounded-full bg-[#5e6ad2] flex items-center justify-center text-[8px] font-bold text-white">
            {issue.assignee_initials}
          </div>
        ) : null}
      </div>

      {/* Title */}
      <p
        className={[
          "text-[13px] leading-snug mb-3",
          isActive ? "text-white font-medium" : "text-slate-200",
          issue.status === "done" ? "line-through text-slate-500" : "",
        ].join(" ")}
      >
        {issue.title}
      </p>

      {/* Labels */}
      {issue.labels && issue.labels.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap">
          {issue.labels.map((label) => (
            <span
              key={label}
              className="px-1.5 py-0.5 rounded text-[10px] bg-[#292930] text-slate-400 border border-[#454652]"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

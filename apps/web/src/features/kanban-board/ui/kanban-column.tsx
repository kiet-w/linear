"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import type { Issue, IssueStatus } from "@/entities/issue";
import { STATUS_LABELS } from "@/entities/issue";
import { KanbanCard } from "./kanban-card";

interface KanbanColumnProps {
  status: IssueStatus;
  issues: Issue[];
}

export function KanbanColumn({ status, issues }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex w-64 shrink-0 flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
          {STATUS_LABELS[status]}
        </span>
        <span className="text-xs text-[#6b7280]">{issues.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className={[
          "flex min-h-[120px] flex-col gap-2 rounded-md p-2 transition-colors",
          isOver ? "bg-[#1e2024]" : "bg-transparent",
        ].join(" ")}
      >
        <SortableContext items={issues.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {issues.map((issue) => (
            <KanbanCard key={issue.id} issue={issue} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

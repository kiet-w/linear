"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect } from "react";

import type { Issue, IssueStatus } from "@/entities/issue";
import { STATUS_LABELS } from "@/entities/issue";
import { KanbanItem } from "./kanban-item";

interface KanbanColumnProps {
  status: IssueStatus;
  issues: Issue[];
}

function sendDebugLog(payload: {
  sessionId: "1acbe4";
  runId: "pre-fix" | "post-fix";
  hypothesisId: "H1" | "H2" | "H3" | "H4" | "H5";
  location: string;
  message: string;
  data: Record<string, unknown>;
  timestamp: number;
}) {
  fetch("http://127.0.0.1:7915/ingest/749aa92e-3158-4ee6-b90e-814185c355d7", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "1acbe4" },
    body: JSON.stringify(payload),
  }).catch(() => {});

  fetch("/api/debug-log", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "1acbe4" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

export function KanbanColumn({ status, issues }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  useEffect(() => {
    // #region agent log
    sendDebugLog({
      sessionId: "1acbe4",
      runId: "pre-fix",
      hypothesisId: "H5",
      location: "kanban-column.tsx:19",
      message: "Droppable state changed",
      data: { status, isOver, issueCount: issues.length },
      timestamp: Date.now(),
    });
    // #endregion
  }, [isOver, issues.length, status]);

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
            <KanbanItem key={issue.id} issue={issue} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

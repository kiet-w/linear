"use client";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { IssueCard, useIssues, ISSUE_STATUSES, STATUS_LABELS } from "@/entities/issue";
import type { Issue, IssueStatus } from "@/entities/issue";
import { useOptimisticIssueMutation } from "@/features/kanban-board/model/use-optimistic-issue-mutation";

const COLUMN_ICONS: Record<IssueStatus, string> = {
  backlog: "inventory_2",
  planned: "calendar_today",
  in_progress: "pending",
  in_review: "rate_review",
  done: "check_circle",
};

const COLUMN_ICON_COLORS: Record<IssueStatus, string> = {
  backlog: "text-slate-500",
  planned: "text-slate-400",
  in_progress: "text-[#bdc2ff]",
  in_review: "text-[#ffb867]",
  done: "text-emerald-500",
};

const COLUMN_COUNT_COLORS: Record<IssueStatus, string> = {
  backlog: "text-slate-500 bg-[#34343b]",
  planned: "text-slate-500 bg-[#34343b]",
  in_progress: "text-[#5e6ad2] bg-[#5e6ad2]/10",
  in_review: "text-slate-500 bg-[#34343b]",
  done: "text-slate-500 bg-[#34343b]",
};

function KanbanItem({ issue }: { issue: Issue }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: issue.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <IssueCard
        issue={issue}
        isDragging={isDragging}
        isActive={issue.status === "in_progress"}
      />
    </div>
  );
}

function KanbanColumn({ status, issues }: { status: IssueStatus; issues: Issue[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const isDone = status === "done";

  return (
    <div className={["w-80 flex flex-col h-full", isDone ? "opacity-60" : ""].join(" ")}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`material-symbols-outlined text-[16px] ${COLUMN_ICON_COLORS[status]}`}>
            {COLUMN_ICONS[status]}
          </span>
          <h2 className={`text-[12px] font-medium leading-4 ${status === "in_progress" ? "text-slate-100" : "text-slate-300"}`}>
            {STATUS_LABELS[status]}
          </h2>
          <span className={`text-[10px] px-1.5 rounded ${COLUMN_COUNT_COLORS[status]}`}>
            {issues.length}
          </span>
        </div>
        {!isDone && (
          <button className="text-slate-500 hover:text-slate-300">
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
        )}
      </div>

      {/* Cards */}
      <div
        ref={setNodeRef}
        className={[
          "flex flex-col gap-2 overflow-y-auto pb-4 flex-1 rounded-lg transition-colors",
          isOver ? "bg-[#1e2024]" : "",
        ].join(" ")}
        style={{ scrollbarWidth: "none" }}
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

export function KanbanBoard({ projectId }: { projectId?: string }) {
  const { data: issues = [], isLoading } = useIssues(projectId);
  const { mutate: updateStatus } = useOptimisticIssueMutation(projectId);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const newStatus = over.id as IssueStatus;
    if (!ISSUE_STATUSES.includes(newStatus)) return;
    updateStatus({ issueId: String(active.id), newStatus, projectId });
  }

  if (isLoading) return <p className="text-sm text-slate-500">Loading...</p>;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 h-full items-start min-w-max">
        {ISSUE_STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            issues={issues.filter((i) => i.status === status)}
          />
        ))}
      </div>
    </DndContext>
  );
}

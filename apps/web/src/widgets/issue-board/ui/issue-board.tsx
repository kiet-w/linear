"use client";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useIssues, ISSUE_STATUSES } from "@/entities/issue";
import type { IssueStatus } from "@/entities/issue";
import { KanbanColumn } from "@/features/kanban-board/ui/kanban-column";
import { useOptimisticIssueMutation } from "@/features/kanban-board/model/use-optimistic-issue-mutation";
import { useIssueRealtimeSync } from "../model/use-issue-realtime-sync";

export function IssueBoard({ projectId }: { projectId?: string }) {
  const { data: issues = [], isLoading } = useIssues(projectId);
  const { mutate: updateStatus } = useOptimisticIssueMutation(projectId);
  useIssueRealtimeSync(projectId);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const newStatus = over.id as IssueStatus;
    if (!ISSUE_STATUSES.includes(newStatus)) return;
    updateStatus({ issueId: String(active.id), newStatus, projectId });
  }

  if (isLoading) return <p className="text-sm text-slate-500">Loading...</p>;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
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

import { KanbanBoard } from "@/widgets/kanban-board";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <h1 className="mb-6 text-xl font-semibold text-slate-100">My Tasks</h1>
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <KanbanBoard />
      </div>
    </div>
  );
}

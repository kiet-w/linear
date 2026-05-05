"use client";

import { useState } from "react";

import { ProjectCard } from "@/entities/project";
import type { Project, ProjectStatus } from "@/entities/project";

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Core API",
    description:
      "The central nervous system of DevOS. Handles authentication, data routing, and primary business logic for all client applications.",
    status: "active",
    icon: "🔌",
    open_issues: 124,
    last_activity: "12m ago",
    contributors: [{ initials: "AJ" }, { initials: "MB" }, { initials: "+5" }],
  },
  {
    id: "2",
    name: "Frontend UI",
    description:
      "React-based web application providing the primary interface for users to interact with DevOS.",
    status: "active",
    icon: "🌐",
    open_issues: 42,
    last_activity: "2h ago",
    contributors: [{ initials: "SJ" }, { initials: "KL" }],
  },
  {
    id: "3",
    name: "Mobile App",
    description:
      "React Native application for iOS and Android, focusing on on-the-go notifications and quick approvals.",
    status: "on_hold",
    icon: "📱",
    open_issues: 18,
    last_activity: "5d ago",
    contributors: [{ initials: "DT" }],
  },
];

const FILTERS: { label: string; value: ProjectStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];

export function ProjectsBoard() {
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");

  const filtered =
    filter === "all" ? MOCK_PROJECTS : MOCK_PROJECTS.filter((p) => p.status === filter);

  const [featured, ...rest] = filtered;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-1">Projects</h2>
          <p className="text-[13px] text-slate-400">
            Manage and monitor active engineering repositories.
          </p>
        </div>
        <div className="flex items-center bg-[#292930] rounded p-1 border border-[#212226]">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={[
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                filter === f.value
                  ? "bg-[#393840] text-slate-100 shadow-sm"
                  : "text-slate-400 hover:text-slate-200",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {featured && <ProjectCard project={featured} featured />}
        {rest.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

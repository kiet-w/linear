import type { Project } from "../model/types";

const STATUS_DOT: Record<string, string> = {
  active: "bg-emerald-500",
  on_hold: "bg-amber-500",
  archived: "bg-slate-500",
};

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  on_hold: "On Hold",
  archived: "Archived",
};

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  if (featured) {
    return (
      <div className="col-span-1 md:col-span-2 bg-[#111214] border border-[#212226] rounded-xl hover:border-[#5e6ad2] transition-colors group relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#5e6ad2]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-[#5e6ad2]/10 transition-colors" />
        <div className="p-6 relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#292930] border border-[#212226] flex items-center justify-center">
                <span className="text-[#bdc2ff] text-xl">{project.icon ?? "≡ƒôü"}</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 group-hover:text-[#bdc2ff] transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${STATUS_DOT[project.status]}`} />
                  <span className="text-xs text-slate-400">{STATUS_LABEL[project.status]}</span>
                </div>
              </div>
            </div>
          </div>

          {project.description && (
            <p className="text-[13px] text-slate-400 mb-6 line-clamp-2 max-w-lg">
              {project.description}
            </p>
          )}

          <div className="mt-auto grid grid-cols-3 gap-4 border-t border-[#212226] pt-4">
            <div>
              <p className="text-[11px] text-slate-500 mb-1">Open Issues</p>
              <p className="text-xs font-semibold text-slate-200">{project.open_issues ?? 0}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 mb-1">Contributors</p>
              <div className="flex -space-x-2">
                {project.contributors?.map((c, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-[#292930] border-2 border-[#111214] flex items-center justify-center text-[10px] text-slate-200 font-bold"
                  >
                    {c.initials}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 mb-1">Last Activity</p>
              <p className="text-xs text-slate-300">{project.last_activity ?? "ΓÇö"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111214] border border-[#212226] rounded-xl hover:border-[#5e6ad2] transition-colors group flex flex-col">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#292930] border border-[#212226] flex items-center justify-center">
              <span className="text-base">{project.icon ?? "≡ƒôü"}</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-100 group-hover:text-[#bdc2ff] transition-colors">
              {project.name}
            </h3>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
            <span className="text-[10px] text-slate-400">{STATUS_LABEL[project.status]}</span>
          </div>
        </div>

        {project.description && (
          <p className="text-[13px] text-slate-400 mb-4 flex-1">{project.description}</p>
        )}

        <div className="flex justify-between items-center border-t border-[#212226] pt-3 mt-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-[14px] text-red-400">ΓÜá</span>
              <span className="text-xs text-slate-200">{project.open_issues ?? 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-500">{project.last_activity ?? "ΓÇö"}</span>
            </div>
          </div>
          <div className="flex -space-x-1.5">
            {project.contributors?.map((c, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full bg-[#292930] border border-[#111214] flex items-center justify-center text-[8px] text-slate-200 font-bold"
              >
                {c.initials}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">
            Projects
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Manage and monitor active engineering repositories.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <article className="relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sidebar)] p-6 md:col-span-2">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[rgb(94_106_210_/_0.12)] blur-3xl" />
          <div className="relative space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Core API</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
                  The primary service layer for authentication, routing, and
                  business logic across the workspace.
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-medium text-emerald-300">
                Active
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-[var(--border-subtle)] pt-4 text-sm">
              <div>
                <p className="text-[var(--color-muted)]">Open Issues</p>
                <p className="mt-1 font-medium text-[var(--color-foreground)]">
                  124
                </p>
              </div>
              <div>
                <p className="text-[var(--color-muted)]">Contributors</p>
                <p className="mt-1 font-medium text-[var(--color-foreground)]">
                  7
                </p>
              </div>
              <div>
                <p className="text-[var(--color-muted)]">Last Activity</p>
                <p className="mt-1 font-medium text-[var(--color-foreground)]">
                  12m ago
                </p>
              </div>
            </div>
          </div>
        </article>

        {[
          {
            title: "Frontend UI",
            status: "Active",
            description:
              "React-based client for issue tracking, project views, and engineering workflows.",
          },
          {
            title: "Mobile App",
            status: "On Hold",
            description:
              "Companion app for notifications, approvals, and quick operational updates.",
          },
        ].map((project) => (
          <article
            key={project.title}
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sidebar)] p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold">{project.title}</h2>
              <span className="text-xs text-[var(--color-muted)]">
                {project.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
              {project.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

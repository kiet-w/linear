import { Icon } from "@/shared/ui/icon";

const tabs = [
  { label: "Board", active: true },
  { label: "List" },
  { label: "Timeline" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border-subtle)] bg-[color:rgb(8_9_10_/_0.8)] px-6 backdrop-blur-md">
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-[var(--color-muted)]"
          />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-64 rounded-sm border border-[var(--border-subtle)] bg-[var(--surface-sidebar)] py-1.5 pl-9 pr-14 text-sm text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary-container)]"
          />
          <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <kbd className="rounded bg-[var(--surface-hover)] px-1 font-mono text-[11px] text-[var(--color-muted)]">
              Ctrl
            </kbd>
            <kbd className="rounded bg-[var(--surface-hover)] px-1 font-mono text-[11px] text-[var(--color-muted)]">
              K
            </kbd>
          </div>
        </div>

        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={[
                "border-b pb-2 pt-2 text-sm font-medium transition-colors",
                tab.active
                  ? "border-[var(--color-primary-container)] text-[var(--color-primary-container)]"
                  : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-sm bg-[var(--color-primary-container)] px-4 py-1.5 text-sm font-medium text-[var(--color-on-primary-container)] transition-colors hover:bg-[var(--color-primary-strong)]">
          Deploy
        </button>
        <div className="flex items-center gap-2 border-l border-[var(--border-subtle)] pl-4">
          {["hub", "notifications", "account_circle"].map((icon) => (
            <button
              key={icon}
              className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
            >
              <Icon name={icon} className="text-xl" />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

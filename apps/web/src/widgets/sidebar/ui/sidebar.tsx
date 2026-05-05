import Link from "next/link";

import { Icon } from "@/shared/ui/icon";

const primaryItems = [
  { href: "#", label: "Inbox", icon: "inbox" },
  { href: "#", label: "My Tasks", icon: "task_alt" },
  { href: "#", label: "Projects", icon: "account_tree", active: true, filled: true },
  { href: "#", label: "Views", icon: "visibility" },
  { href: "#", label: "Git Logs", icon: "terminal" },
];

const secondaryItems = [
  { href: "#", label: "Settings", icon: "settings" },
  { href: "#", label: "Help", icon: "help_outline" },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--border-subtle)] bg-[var(--surface-sidebar)] px-4 py-4">
      <div className="mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-sm bg-[var(--color-primary-container)] text-sm font-semibold text-[var(--color-on-primary-container)]">
            D
          </div>
          <div>
            <p className="text-lg font-semibold leading-tight text-[var(--color-foreground)]">
              DevOS
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              Engineering Workspace
            </p>
          </div>
        </div>

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-[var(--color-primary-container)] px-4 py-2 text-sm font-medium text-[var(--color-on-primary-container)] transition-colors hover:bg-[var(--color-primary-strong)]">
          <Icon name="add" className="text-base" />
          <span>New Issue</span>
        </button>
      </div>

      <nav className="space-y-1 px-1">
        {primaryItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <nav className="mt-auto space-y-1 px-1">
        {secondaryItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>
    </aside>
  );
}

type NavItemProps = {
  href: string;
  label: string;
  icon: string;
  active?: boolean;
  filled?: boolean;
};

function NavItem({ href, label, icon, active = false, filled = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "border-l-2 border-[var(--color-primary-container)] bg-[var(--surface-active)] text-[var(--color-foreground)]"
          : "text-[var(--color-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--color-foreground)]",
      ].join(" ")}
    >
      <Icon
        name={icon}
        filled={filled}
        className={`text-[18px] ${active ? "text-[var(--color-primary-container)]" : ""}`}
      />
      <span>{label}</span>
    </Link>
  );
}

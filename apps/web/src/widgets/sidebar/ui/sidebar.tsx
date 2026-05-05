import Link from "next/link";
import Image from "next/image";
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
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#212226] bg-[#111214] px-4 py-4">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-high">
          <Image 
            src="https://lh3.googleusercontent.com/aida/ADBb0uhOxRsd7s51jIPIQNswERwKw7YcO-BPGaVKZL_3S3qSHhL6Rcs1d4Ic89dvbzEgJa_fbNQctaRasu41jz9JG1OVwBG3_1ZPE0CUlRsr7Z5k-N3gass4G1Cs4POFjed3TAelpLsrUsodPqQ45U0BLd4Cl_TkjrNO3v-KpO8VQgrvu4Bc0VDzgMePxU8G37_kAJh0OXE6nEumIiThVFLZ03lz55gOFfuivNvMehsaXolrHuhhCepm8HJdLT2X1ysS7A3Sm5M7wf4bxg" 
            alt="User Workspace Profile" 
            width={32} height={32} className="h-full w-full rounded-lg object-cover" 
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold leading-tight text-slate-100">
            DevOS
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Engineering Workspace
          </span>
        </div>
      </div>

      <div className="mb-6">
        <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-primary-container py-2 text-label-md font-label-md text-on-primary-container transition-colors duration-150 hover:bg-inverse-primary active:opacity-80">
          <Icon name="add" className="text-[16px]" />
          <span>New Issue</span>
        </button>
      </div>

      <nav className="flex flex-col gap-1 overflow-y-auto px-2 pb-4 pt-1 no-scrollbar flex-1">
        {primaryItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <nav className="mt-auto flex flex-col gap-1 px-2 pt-4">
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
        "flex cursor-pointer items-center gap-3 rounded px-3 py-1.5 transition-colors duration-150 active:opacity-80",
        active
          ? "bg-[#212226] text-slate-200"
          : "text-slate-400 hover:bg-[#212226] hover:text-slate-200",
      ].join(" ")}
    >
      <Icon
        name={icon}
        filled={filled}
        className={`text-[18px] ${active ? "text-primary-container" : ""}`}
      />
      <span className="text-sm">{label}</span>
    </Link>
  );
}

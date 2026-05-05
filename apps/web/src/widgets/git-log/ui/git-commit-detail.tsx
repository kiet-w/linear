import { Icon } from "@/shared/ui/icon";

export type GitCommit = {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  date: string;
  branch?: string;
  tags?: string[];
};

type GitCommitDetailProps = {
  commits: GitCommit[];
  onPush?: () => void;
};

export function GitCommitDetail({ commits, onPush }: GitCommitDetailProps) {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sidebar)] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="history" className="text-[18px] text-[var(--color-primary-container)]" />
          <span className="text-sm font-semibold text-[var(--color-foreground)]">Git Log</span>
        </div>
        {onPush && (
          <button
            onClick={onPush}
            className="flex items-center gap-1.5 rounded-sm bg-[var(--color-primary-container)] px-3 py-1.5 text-xs font-medium text-[var(--color-on-primary-container)] transition-colors hover:bg-[var(--color-primary-strong)]"
          >
            <Icon name="upload" className="text-[14px]" />
            Push
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {commits.map((commit, index) => (
          <CommitRow key={commit.hash} commit={commit} isLatest={index === 0} />
        ))}
      </div>
    </div>
  );
}

function CommitRow({ commit, isLatest }: { commit: GitCommit; isLatest: boolean }) {
  return (
    <div className="group flex items-start gap-3 rounded-sm px-2 py-2 transition-colors hover:bg-[var(--surface-hover)]">
      {/* Graph line */}
      <div className="flex flex-col items-center pt-1">
        <div
          className={[
            "size-2.5 rounded-full border-2",
            isLatest
              ? "border-[var(--color-primary-container)] bg-[var(--color-primary-container)]"
              : "border-[var(--color-muted)] bg-transparent",
          ].join(" ")}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm text-[var(--color-foreground)]">{commit.message}</span>
          {commit.tags?.map((tag) => (
            <span
              key={tag}
              className="shrink-0 rounded-sm bg-[var(--surface-hover)] px-1.5 py-0.5 text-[10px] text-[var(--color-muted)]"
            >
              {tag}
            </span>
          ))}
          {commit.branch && (
            <span className="shrink-0 rounded-sm bg-[rgb(94_106_210/0.2)] px-1.5 py-0.5 text-[10px] text-[var(--color-primary-container)]">
              {commit.branch}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[var(--color-muted)]">
          <span className="font-mono">{commit.shortHash}</span>
          <span>·</span>
          <span>{commit.author}</span>
          <span>·</span>
          <span>{commit.date}</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

import { Icon } from "@/shared/ui/icon";

type ChangedFile = {
  path: string;
  status: "modified" | "added" | "deleted" | "untracked";
};

type QuickPushModalProps = {
  branch: string;
  changedFiles: ChangedFile[];
  onClose: () => void;
  onPush: (commitMessage: string, selectedFiles: string[]) => void;
};

const STATUS_ICON: Record<ChangedFile["status"], { icon: string; color: string }> = {
  modified: { icon: "edit", color: "text-yellow-400" },
  added: { icon: "add_circle", color: "text-green-400" },
  deleted: { icon: "remove_circle", color: "text-red-400" },
  untracked: { icon: "help", color: "text-[var(--color-muted)]" },
};

export function QuickPushModal({ branch, changedFiles, onClose, onPush }: QuickPushModalProps) {
  const [commitMessage, setCommitMessage] = useState("");
  const [selected, setSelected] = useState<Set<string>>(
    new Set(changedFiles.map((f) => f.path)),
  );

  const toggleFile = (path: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setSelected(
      selected.size === changedFiles.length
        ? new Set()
        : new Set(changedFiles.map((f) => f.path)),
    );
  };

  const handlePush = () => {
    if (!commitMessage.trim() || selected.size === 0) return;
    onPush(commitMessage.trim(), Array.from(selected));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex w-[480px] flex-col gap-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sidebar)] p-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="upload" className="text-[18px] text-[var(--color-primary-container)]" />
            <span className="text-sm font-semibold text-[var(--color-foreground)]">Quick Push</span>
            <span className="rounded-sm bg-[rgb(94_106_210/0.2)] px-2 py-0.5 text-[11px] text-[var(--color-primary-container)]">
              {branch}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm p-1 text-[var(--color-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--color-foreground)]"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>

        {/* Commit message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[var(--color-muted)]">Commit message</label>
          <input
            type="text"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="feat: describe your changes"
            className="rounded-sm border border-[var(--border-subtle)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary-container)] focus:outline-none"
          />
        </div>

        {/* File list */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[var(--color-muted)]">
              Changed files ({selected.size}/{changedFiles.length})
            </label>
            <button
              onClick={toggleAll}
              className="text-[11px] text-[var(--color-primary-container)] hover:underline"
            >
              {selected.size === changedFiles.length ? "Deselect all" : "Select all"}
            </button>
          </div>

          <div className="max-h-48 overflow-y-auto rounded-sm border border-[var(--border-subtle)]">
            {changedFiles.map((file) => {
              const { icon, color } = STATUS_ICON[file.status];
              return (
                <label
                  key={file.path}
                  className="flex cursor-pointer items-center gap-2.5 px-3 py-2 transition-colors hover:bg-[var(--surface-hover)]"
                >
                  <input
                    type="checkbox"
                    checked={selected.has(file.path)}
                    onChange={() => toggleFile(file.path)}
                    className="accent-[var(--color-primary-container)]"
                  />
                  <Icon name={icon} className={`text-[14px] ${color}`} />
                  <span className="truncate font-mono text-[12px] text-[var(--color-foreground)]">
                    {file.path}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-sm px-4 py-2 text-sm text-[var(--color-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--color-foreground)]"
          >
            Cancel
          </button>
          <button
            onClick={handlePush}
            disabled={!commitMessage.trim() || selected.size === 0}
            className="flex items-center gap-1.5 rounded-sm bg-[var(--color-primary-container)] px-4 py-2 text-sm font-medium text-[var(--color-on-primary-container)] transition-colors hover:bg-[var(--color-primary-strong)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Icon name="upload" className="text-[14px]" />
            Commit & Push
          </button>
        </div>
      </div>
    </div>
  );
}

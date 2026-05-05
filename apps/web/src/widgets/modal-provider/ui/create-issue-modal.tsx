"use client";

import { create } from "zustand";

import { CreateIssueForm } from "@/features/create-issue/ui/create-issue-form";
import { Icon } from "@/shared/ui/icon";

type CreateIssueModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useCreateIssueModal = create<CreateIssueModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export function CreateIssueModal() {
  const { isOpen, close } = useCreateIssueModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-10">
      <button
        type="button"
        aria-label="Close create issue modal"
        className="absolute inset-0 bg-[rgb(3_5_9_/_0.72)] backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[28px] border border-[rgb(255_255_255_/_0.08)] bg-[linear-gradient(180deg,rgba(23,24,31,0.98)_0%,rgba(11,12,18,0.98)_100%)] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <div className="border-b border-[var(--border-subtle)] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-primary-container)]">
                Create
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--color-foreground)]">
                New issue
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-muted)]">
                Capture work fast with the minimum fields this app already understands.
              </p>
            </div>

            <button
              type="button"
              onClick={close}
              className="rounded-full border border-[var(--border-subtle)] p-2 text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
            >
              <Icon name="close" className="text-lg" />
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          <CreateIssueForm onSuccess={close} />
        </div>
      </div>
    </div>
  );
}

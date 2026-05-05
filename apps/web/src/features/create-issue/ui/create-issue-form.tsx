"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ISSUE_STATUSES, issueKeys } from "@/entities/issue";
import { supabase } from "@/shared/api/supabase";

interface CreateIssueFormProps {
  onSuccess?: () => void;
}

const PRIORITY_OPTIONS = [
  { value: 1, label: "Urgent" },
  { value: 2, label: "High" },
  { value: 3, label: "Medium" },
  { value: 4, label: "Low" },
] as const;

const DEFAULT_FORM = {
  title: "",
  projectId: "",
  status: "backlog",
  priority: "3",
};

export function CreateIssueForm({ onSuccess }: CreateIssueFormProps) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createIssue = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("issues").insert({
        title: form.title.trim(),
        project_id: form.projectId.trim(),
        status: form.status,
        priority: Number(form.priority),
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: issueKeys.all });
      setForm(DEFAULT_FORM);
      setErrorMessage(null);
      onSuccess?.();
    },
    onError: (error: Error) => {
      setErrorMessage(error.message || "Unable to create issue.");
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim() || !form.projectId.trim()) {
      setErrorMessage("Title and Project ID are required.");
      return;
    }

    setErrorMessage(null);
    createIssue.mutate();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
          Issue title
        </label>
        <input
          value={form.title}
          onChange={(event) =>
            setForm((current) => ({ ...current, title: event.target.value }))
          }
          placeholder="Improve drag preview in issue board"
          className="w-full rounded-lg border border-[var(--border-subtle)] bg-[rgba(14,15,20,0.92)] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary-container)]"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
          Project ID
        </label>
        <input
          value={form.projectId}
          onChange={(event) =>
            setForm((current) => ({ ...current, projectId: event.target.value }))
          }
          placeholder="core-api"
          className="w-full rounded-lg border border-[var(--border-subtle)] bg-[rgba(14,15,20,0.92)] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary-container)]"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
            Status
          </label>
          <select
            value={form.status}
            onChange={(event) =>
              setForm((current) => ({ ...current, status: event.target.value }))
            }
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-[rgba(14,15,20,0.92)] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-primary-container)]"
          >
            {ISSUE_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
            Priority
          </label>
          <select
            value={form.priority}
            onChange={(event) =>
              setForm((current) => ({ ...current, priority: event.target.value }))
            }
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-[rgba(14,15,20,0.92)] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-primary-container)]"
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {errorMessage ? (
        <p className="rounded-lg border border-[rgb(127_29_29_/_0.45)] bg-[rgb(69_10_10_/_0.24)] px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4">
        <p className="text-sm text-[var(--color-muted)]">
          New issues are inserted directly into Supabase.
        </p>
        <button
          type="submit"
          disabled={createIssue.isPending}
          className="rounded-lg bg-[var(--color-primary-container)] px-4 py-2 text-sm font-medium text-[var(--color-on-primary-container)] transition-colors hover:bg-[var(--color-primary-strong)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {createIssue.isPending ? "Creating..." : "Create issue"}
        </button>
      </div>
    </form>
  );
}

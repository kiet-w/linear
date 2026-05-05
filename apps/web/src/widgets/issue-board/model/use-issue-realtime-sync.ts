import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/shared/api/supabase";
import { issueKeys } from "@/entities/issue";
import type { Issue } from "@/entities/issue";

export function useIssueRealtimeSync(projectId?: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const queryKey = projectId ? issueKeys.byProject(projectId) : issueKeys.all;
    const channel = supabase
      .channel("public:issues")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "issues" },
        (payload: { new: Issue }) => {
          const updated = payload.new;
          queryClient.setQueryData<Issue[]>(queryKey, (old = []) =>
            old.map((issue) => (issue.id === updated.id ? updated : issue))
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "issues" },
        () => {
          queryClient.invalidateQueries({ queryKey });
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "issues" },
        (payload: { old: Partial<Issue> }) => {
          queryClient.setQueryData<Issue[]>(queryKey, (old = []) =>
            old.filter((issue) => issue.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, queryClient]);
}

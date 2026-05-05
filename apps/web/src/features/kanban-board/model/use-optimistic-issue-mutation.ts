import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/shared/api/supabase";
import { issueKeys } from "@/entities/issue";
import type { Issue, IssueStatus } from "@/entities/issue";

interface UpdateStatusArgs {
  issueId: string;
  newStatus: IssueStatus;
  projectId?: string;
}

export function useOptimisticIssueMutation(projectId?: string) {
  const queryClient = useQueryClient();
  const queryKey = projectId ? issueKeys.byProject(projectId) : issueKeys.all;

  return useMutation({
    mutationFn: async ({ issueId, newStatus }: UpdateStatusArgs) => {
      const { error } = await supabase
        .from("issues")
        .update({ status: newStatus })
        .eq("id", issueId);
      if (error) throw error;
    },

    onMutate: async ({ issueId, newStatus }) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Issue[]>(queryKey);

      queryClient.setQueryData<Issue[]>(queryKey, (old = []) =>
        old.map((issue) =>
          issue.id === issueId ? { ...issue, status: newStatus } : issue
        )
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

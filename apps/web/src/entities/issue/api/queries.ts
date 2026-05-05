import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/shared/api/supabase";
import type { Issue } from "../model/types";

export const issueKeys = {
  all: ["issues"] as const,
  byProject: (projectId: string) => ["issues", projectId] as const,
};

export function useIssues(projectId?: string) {
  return useQuery({
    queryKey: projectId ? issueKeys.byProject(projectId) : issueKeys.all,
    queryFn: async (): Promise<Issue[]> => {
      let query = supabase.from("issues").select("*").order("created_at");
      if (projectId) query = query.eq("project_id", projectId);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });
}

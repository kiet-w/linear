# API & Coding Standards

This project follows a strict architectural pattern using Supabase and TanStack Query.

## 1. Supabase Client
- Always use the shared client from `@/shared/api/supabase`.
- Use the functional query builder for all database interactions.

## 2. Data Fetching (TanStack Query)
- **Queries:** Use `useQuery` for fetching data. Define `queryKeys` in an object at the top of the file.
- **Mutations:** Use `useMutation` for creating, updating, or deleting data.
- **Optimistic Updates:** Implement optimistic updates for UI-heavy interactions (like Kanban board moves).

## 3. Directory Structure (FSD-lite)
- `entities/`: Domain models and their specific API logic (e.g., `entities/issue/api/queries.ts`).
- `features/`: Interactive user actions (e.g., `features/kanban-board/`).
- `shared/`: Generic UI components, hooks, and API clients.
- `widgets/`: Complex UI compositions.

## 4. API Calling Syntax Example
```typescript
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";

export const keys = {
  all: ["items"] as const,
};

export function useItems() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async () => {
      const { data, error } = await supabase.from("items").select("*");
      if (error) throw error;
      return data;
    },
  });
}
```

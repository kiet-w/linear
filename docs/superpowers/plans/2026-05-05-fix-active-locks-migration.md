# Active Locks Migration Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename migration file to follow full timestamp convention and enable Row Level Security (RLS) on the `active_locks` table.

**Architecture:** Database schema migration update for Supabase.

**Tech Stack:** PostgreSQL, SQL, Git.

---

### Task 1: Rename and Update Migration File

**Files:**
- Rename: `D:/nhactruong/supabase/migrations/20260505_create_active_locks.sql` -> `D:/nhactruong/supabase/migrations/20260505143000_create_active_locks.sql`
- Modify: `D:/nhactruong/supabase/migrations/20260505143000_create_active_locks.sql`

- [ ] **Step 1: Create the new migration file with updated content**

```sql
-- Migration: Create active_locks table
-- Updated: 2026-05-05 14:30:00 (Added RLS)

CREATE TABLE IF NOT EXISTS public.active_locks (
    file_path TEXT PRIMARY KEY,
    ticket_id TEXT NOT NULL,
    locked_by TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for querying locks by ticket or agent
CREATE INDEX IF NOT EXISTS idx_active_locks_ticket_id ON public.active_locks(ticket_id);
CREATE INDEX IF NOT EXISTS idx_active_locks_locked_by ON public.active_locks(locked_by);

-- Enable RLS
ALTER TABLE public.active_locks ENABLE ROW LEVEL SECURITY;
```

- [ ] **Step 2: Delete the old migration file**

Run: `rm D:/nhactruong/supabase/migrations/20260505_create_active_locks.sql`

- [ ] **Step 3: Commit the changes**

```bash
git add D:/nhactruong/supabase/migrations/20260505143000_create_active_locks.sql
git rm D:/nhactruong/supabase/migrations/20260505_create_active_locks.sql
git commit -m "fix(db): rename active_locks migration and enable RLS"
```

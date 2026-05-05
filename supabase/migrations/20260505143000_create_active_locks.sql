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

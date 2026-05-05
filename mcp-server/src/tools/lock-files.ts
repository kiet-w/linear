import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (ensure env vars are set)
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface LockFilesArgs {
  filePaths: string[];
  ticketId: string;
  agentId: string;
  durationMinutes?: number;
}

export async function lockFiles(args: LockFilesArgs): Promise<{ success: boolean; message: string }> {
  if (!args.filePaths || args.filePaths.length === 0) {
      return { success: false, message: "No files provided to lock." };
  }

  const duration = args.durationMinutes || 120; // Default lock for 2 hours
  const expiresAt = new Date(Date.now() + duration * 60000).toISOString();

  // 1. Check if an active lock exists and hasn't expired (Batched Query)
  const { data: existingLocks, error: fetchError } = await supabase
      .from('active_locks')
      .select('*')
      .in('file_path', args.filePaths);

  if (fetchError) {
      throw new Error(`Database error checking locks: ${fetchError.message}`);
  }

  if (existingLocks) {
      for (const lock of existingLocks) {
          if (new Date(lock.expires_at) > new Date()) {
              if (lock.ticket_id !== args.ticketId) {
                  return {
                      success: false,
                      message: `File ${lock.file_path} is already locked by ticket ${lock.ticket_id} (Agent: ${lock.locked_by}). Please wait or move your ticket to BLOCKED.`
                  };
              }
          }
      }
  }

  const locksToInsert = args.filePaths.map(filePath => ({
      file_path: filePath,
      ticket_id: args.ticketId,
      locked_by: args.agentId,
      expires_at: expiresAt
  }));

  const { error: insertError } = await supabase
      .from('active_locks')
      .upsert(locksToInsert);

  if (insertError) {
      return { success: false, message: `Failed to acquire locks: ${insertError.message}` };
  }

  return { success: true, message: `Successfully locked ${args.filePaths.length} files for ticket ${args.ticketId}.` };
}

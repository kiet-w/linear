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
  const duration = args.durationMinutes || 120; // Default lock for 2 hours
  const expiresAt = new Date(Date.now() + duration * 60000).toISOString();

  for (const filePath of args.filePaths) {
      // 1. Check if an active lock exists and hasn't expired
      const { data: existingLock, error: fetchError } = await supabase
          .from('active_locks')
          .select('*')
          .eq('file_path', filePath)
          .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is 'not found'
          throw new Error(`Database error checking lock for ${filePath}: ${fetchError.message}`);
      }

      if (existingLock && new Date(existingLock.expires_at) > new Date()) {
          if (existingLock.ticket_id !== args.ticketId) {
             return {
                 success: false,
                 message: `File ${filePath} is already locked by ticket ${existingLock.ticket_id} (Agent: ${existingLock.locked_by}). Please wait or move your ticket to BLOCKED.`
             };
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

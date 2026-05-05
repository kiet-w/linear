# Agent Instructions

## Global Preferences

- When a service or command fails or needs to be stopped, use `Ctrl+C` to
  terminate it to avoid `EADDRINUSE` (address already in use) errors on
  subsequent runs.

- **Bug Documentation Convention**: Whenever a significant bug or error is
  resolved (e.g., related to NestJS, Supabase, PostgreSQL, etc.),
  automatically:
  1. Create a dedicated folder for that technology inside `docs/bugs/`
     (e.g., `docs/bugs/nestjs/`, `docs/bugs/supabase/`)
  2. Write a `.md` file named after the issue
     (e.g., `docs/bugs/nestjs/jwt-expired-token.md`)
  3. The file must include:
     - **Bug**: Short description of the problem
     - **Cause**: Root cause explanation
     - **Solution**: Step-by-step fix applied
     - **Date**: When it was resolved

---

> Behavioral guidelines to reduce common LLM coding mistakes.
> **Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding
**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First
**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes
**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution
**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

---
**Working correctly if:** fewer unnecessary diffs, fewer rewrites, and
clarifying questions come *before* implementation — not after mistakes.

## Linear Issue Workflow & State Machine (STRICT)
To prevent Cascading Failures and Circular Dependencies, all AI agents MUST adhere to this strict workflow:

1. **Pre-Check Dependencies:** Check ticket relations (e.g., `blockedBy`). If blocked by an unresolved ticket, DO NOT START. Leave in "Planned" or move to "Blocked".
2. **Git Isolation (Branching):** EVERY ticket MUST have its own isolated branch created from `main` (e.g., `git checkout -b feat/TICKET-ID`). When activating a ticket, your FIRST action is creating this branch. Do not pull unmerged code from other feature branches.
3. **Move to In Progress:** After creating the branch, immediately move the ticket to "In Progress".
4. **Execute & Local Testing:** Execute ONLY the planned tasks. You MUST use the `run_local_tests` MCP tool to verify your code before considering it complete.
5. **Handling Critical Bugs (BLOCKED):** If you hit a blocking bug:
   - Call the `report_bug_and_decide` MCP tool (with `is_blocking: true`).
   - The system will create a bug ticket, link it, and move your current task to "Blocked". **STOP** execution (sleep/wait).
   - Only resume when awakened (via the `resume_blocked_task` tool or human intervention) once the bug is "Done".
6. **Move to In Review & STOP:** Once verified, committed, and PUSHED to your ticket's branch, move the ticket to "In Review". **STOP execution here.** Do not merge.
7. **Handling Debug/Rejections:** If moved to "Debug", switch to its branch, move to "In Progress", fix issues, push, and return to "In Review".
8. **Cross-Agent Sync:** Ensure all statuses are immediately updated on Linear so other agents know the real-time state.
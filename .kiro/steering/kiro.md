---
inclusion: always
---

# Behavioral Guidelines

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

> Adapted from Andrej Karpathy's observations on LLM coding pitfalls.
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

## Linear Issue Workflow (STRICT)
All AI coding agents MUST adhere to the following project management workflow using the Linear MCP (or equivalent system):

1. **Pick up from Planned:** Only pick up tasks that are in the "Planned" state.
2. **Move to In Progress:** Before writing any code, move the ticket status to "In Progress".
3. **Execute the Plan:** Strictly execute ONLY the tasks outlined in the ticket's plan. Do not perform unauthorized refactoring.
4. **Move to In Review & STOP:** Once the tasks are implemented, verified, committed, and pushed, move the ticket status to "In Review". **You MUST STOP execution here.** Do not attempt to merge or close the ticket. Wait for code review.
5. **Handling Debug/Rejections:** If a ticket is moved to a "debug" state due to review failures, fix the identified issues. Once fixed, move it back to "In Progress" while working, and then "In Review" when done.
6. **Cross-Agent Sync:** When a ticket moves to "In Review", the current AI must broadcast/update so all AI agents in the project know the ticket is waiting for review and should not be touched until human input or a move to 'debug'.
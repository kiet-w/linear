# Project Overview: Agent Steering & Rules (nhactruong)

This repository serves as a centralized configuration hub for AI agent behaviors and tool-specific rules. It defines how agents (like Cursor, Kiro, and Gemini) should operate within this workspace, prioritizing caution, simplicity, and efficiency.

## Directory Structure

- **`.agents/`**: Core agent instructions.
    - `AGENTS.md`: The primary behavioral guidelines.
    - `rules/antigravity-rtk-rules.md`: Specific rules for the RTK tool.
- **`.cursor/`**: Configuration for the Cursor IDE.
    - `rules/karpathy-guidelines.md`: Behavioral guidelines specifically formatted for Cursor.
- **`.kilocode/`**: Rules for the Kilocode environment.
- **`.kiro/`**: Steering configurations for the Kiro agent.
    - `steering/kiro.md`: General behavioral steering.
    - `steering/rtk.md`: RTK-specific steering.

## Core Mandates

### 1. Behavioral Guidelines (The "Karpathy" Rules)
All agents must adhere to these four pillars of interaction:
- **Think Before Coding**: State assumptions, surface tradeoffs, and ask for clarification before acting.
- **Simplicity First**: Write the minimum code necessary. Avoid speculative abstractions or "just-in-case" error handling.
- **Surgical Changes**: Touch only what is required. Match existing style and avoid unrelated refactoring.
- **Goal-Driven Execution**: Define success criteria and verify changes through testing and validation loops.

### 2. RTK (Rust Token Killer) Usage
RTK is a mandatory CLI proxy used to minimize token consumption.
- **Mandate**: Always prefix shell commands with `rtk` (e.g., `rtk git status`, `rtk cargo test`).
- **Purpose**: RTK filters and compresses command output, typically saving 60-90% of context tokens.
- **Key Commands**:
    - `rtk gain`: Show token savings.
    - `rtk discover`: Find missed optimization opportunities.

### 3. Bug Documentation
Significant bugs and their resolutions must be documented under `docs/bugs/` (if it exists) or a similar structure, following the format:
- **Bug**: Short description.
- **Cause**: Root cause analysis.
- **Solution**: Step-by-step fix.
- **Date**: Resolution date.

### 4. Linear Issue Workflow & State Machine (STRICT)  
To prevent Cascading Failures and Circular Dependencies, all AI agents MUST adhere to this strict workflow:  

- **Pre-flight Situational Awareness:** Before writing ANY code, run `gh pr list --state open` (or equivalent). Review the titles and changed files. If another PR is modifying the files you intend to change, PAUSE and report the conflict risk.
- **Acquire File Locks:** Before modifying files, you MUST use the `lock_files` MCP tool to lock the specific file paths you plan to edit. If a file is locked by another ticket, you MUST move your current task to "Blocked" and wait.
- **Pre-Check Dependencies:** Check ticket relations (e.g., `blockedBy`). If blocked by an unresolved ticket, DO NOT START. Leave in "Planned" or move to "Blocked".
- **Task Activation Is Mandatory:** Before doing anything else, pick exactly ONE task, move it to the state you are about to work on (normally `In Progress`), and immediately switch to that task's branch (`feat/TICKET-ID`). You MUST NOT write code, run implementation commands, or edit files before this activation is complete.
- **Git Isolation (Branching):** EVERY ticket MUST use its own isolated branch (`feat/TICKET-ID`) created from `main`. Do not pull unmerged code from other feature branches.
- **Acknowledge Assignment:** IMMEDIATELY after moving the ticket to "In Progress", the AI Agent MUST add a comment to the Linear issue explicitly stating which agent is working on it (e.g., "Gemini CLI has started working on this task"). This prevents duplicate work and informs the team.
- **Execute & Local Testing:** Execute ONLY the planned tasks. You MUST use the `run_local_tests` MCP tool to verify your code before considering it complete.
- **Handling Critical Bugs (BLOCKED):** If you hit a blocking bug:
  - Call the `report_bug_and_decide` MCP tool (with `is_blocking: true`).
  - The system will create a bug ticket, link it, and move your current task to "Blocked". **STOP** execution (sleep/wait).
  - Only resume when awakened (via the `resume_blocked_task` tool or human intervention) once the bug is "Done".
- **Move to In Review:** Once your local execution is complete and basic tests pass, move the ticket to "In Review".
- **Final Verification Guard (Gemini CLI / Cursor AI):** In the "In Review" state, the designated Debugger (Gemini CLI or Cursor AI) MUST perform a mandatory audit (`npm run check:all`).
    - **Bug/Syntax Review:** The Debugger must first fix all functional bugs (TSC/Build errors). Once bug-free, it must review code for architectural compliance with `api-standards.md`.
    - **If BUG/FAIL:** The Debugger MUST move the ticket to "Debug", switch to the issue's branch, and fix the issues.
    - **If PASS:** Only after passing the audit, the code MUST be pushed to GitHub on the issue's specific feature branch (`feat/TICKET-ID`).
- **Cross-Agent Sync:** Ensure all statuses are immediately updated on Linear so other agents know the real-time state.

### 5. Comprehensive Debugging & Verification
Gemini CLI is now the primary Debugging AI for this project (replacing/supplementing Cursor). It follows the same strict verification pipeline:

- **Verification Scripts (in `apps/web`):**
    - `npm run check`: Runs TypeScript type-check and ESLint.
    - `npm run check:all`: Runs `check` plus a full `next build`.
    - `npm run debug:build`: Captures full build output to `build-errors.txt`.
- **Mandate:** Gemini CLI will NOT consider any fix "Done" until `npm run check:all` passes.
- **Pushing Policy:** Gemini CLI only pushes to GitHub AFTER successful verification on the ticket's branch.


## Interaction Protocol
- **Caution over Speed**: Bias toward thinking and clarifying rather than rapid, potentially incorrect implementation.
- **Validation**: Every change must be verified. A task is not complete until its correctness is empirically proven.

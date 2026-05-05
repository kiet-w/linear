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

- **Pre-Check Dependencies:** Check ticket relations (e.g., `blockedBy`). If blocked by an unresolved ticket, DO NOT START. Leave in "Planned" or move to "Blocked".
- **Git Isolation (Branching):** EVERY ticket MUST have its own isolated branch created from `main` (e.g., `git checkout -b feat/TICKET-ID`). When activating a ticket, your FIRST action is creating this branch. Do not pull unmerged code from other feature branches.
- **Move to In Progress:** After creating the branch, immediately move the ticket to "In Progress".
- **Execute & Local Testing:** Execute ONLY the planned tasks. You MUST use the `run_local_tests` MCP tool to verify your code before considering it complete.
- **Handling Critical Bugs (BLOCKED):** If you hit a blocking bug:
  - Call the `report_bug_and_decide` MCP tool (with `is_blocking: true`).
  - The system will create a bug ticket, link it, and move your current task to "Blocked". **STOP** execution (sleep/wait).
  - Only resume when awakened (via the `resume_blocked_task` tool or human intervention) once the bug is "Done".
- **Move to In Review & STOP:** Once verified, committed, and PUSHED to your ticket's branch, move the ticket to "In Review". **STOP execution here.** Do not merge.
- **Handling Debug/Rejections:** If moved to "Debug", switch to its branch, move to "In Progress", fix issues, push, and return to "In Review".
- **Cross-Agent Sync:** Ensure all statuses are immediately updated on Linear so other agents know the real-time state.

## Interaction Protocol
- **Caution over Speed**: Bias toward thinking and clarifying rather than rapid, potentially incorrect implementation.
- **Validation**: Every change must be verified. A task is not complete until its correctness is empirically proven.

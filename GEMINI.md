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

### 4. Linear Issue Workflow (STRICT)
All AI coding agents MUST adhere to the following project management workflow using the Linear MCP (or equivalent system):

- **Pick up from Planned:** Only pick up tasks that are in the "Planned" state.
- **Move to In Progress:** Before writing any code, move the ticket status to "In Progress".
- **Execute the Plan:** Strictly execute ONLY the tasks outlined in the ticket's plan. Do not perform unauthorized refactoring.
- **Move to In Review & STOP:** Once the tasks are implemented, verified, committed, and pushed, move the ticket status to "In Review". **You MUST STOP execution here.** Do not attempt to merge or close the ticket. Wait for code review.
- **Handling Debug/Rejections:** If a ticket is moved to a "debug" state due to review failures, fix the identified issues. Once fixed, move it back to "In Progress" while working, and then "In Review" when done.
- **Cross-Agent Sync:** When a ticket moves to "In Review", the current AI must broadcast/update so all AI agents in the project know the ticket is waiting for review and should not be touched until human input or a move to 'debug'.

## Interaction Protocol
- **Caution over Speed**: Bias toward thinking and clarifying rather than rapid, potentially incorrect implementation.
- **Validation**: Every change must be verified. A task is not complete until its correctness is empirically proven.

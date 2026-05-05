# DevOS - User Flow & Workflow Documentation

## 1. Overview
DevOS is an engineering-centric workspace designed to bridge the gap between project management (Linear-style) and technical workflows (Git, MCP, Deployment). This document outlines the primary user flows based on the current screen architecture.

## 2. Core User Flows

### Flow A: Issue Lifecycle (Creation to Resolution)

*   **Entry:** User clicks "New Issue" from the SideNavBar or hits global hotkey.
*   **Creation:** User fills out "Create New Issue" (SCREEN_10/13).
    *   **Input:** Title, AI-assisted description, Priority, Labels (Bug, Feature), and Assignee.
*   **Management:** Issue appears on the "Task Board" (SCREEN_2/5/15).
    *   **Action:** User drags card from 'Backlog' to 'Planned' then 'In Progress'.
*   **Tracking:** User views the "Issue List" (SCREEN_8) for a tabular overview or "Timeline View" (SCREEN_11) for roadmap planning.

### Flow B: Technical Workflow (Coding & Git)

*   **Development:** User works in their IDE with MCP connected (status visible on TopNavBar).
*   **Review:** User checks "Git Logs" or "Commit Detail" (SCREEN_16/17) to review changes, diffs, and branch context.
*   **Sync:** User triggers "Quick Push" (SCREEN_12) from the sidebar.
    *   **Process:** Automated pre-push checks (Linter, Tests, Security) run.
    *   **Action:** User provides an AI-generated or manual commit message and pushes to origin.
*   **Deployment:** User clicks "Deploy" from the TopNavBar to trigger CI/CD pipelines.

### Flow C: Workspace Organization

*   **Project Navigation:** User accesses "Projects" (SCREEN_14) to monitor health across Core API, Frontend UI, and Mobile App.
*   **Custom Perspectives:** User visits "Views" (SCREEN_6) to access pinned filters like "Critical Bugs" or "My Active Issues".
*   **Configuration:** User modifies "Workspace Settings" (SCREEN_3) to manage profile, notifications, and tool integrations (GitHub, Slack).

## 3. Key Interaction Patterns

*   **AI Integration:** AI is embedded in description writing, commit message generation, and MCP-connected coding sessions.
*   **Real-time Feedback:** Toast notifications (e.g., "Update successful") provide immediate confirmation of state changes.
*   **High Information Density:** Dark-mode optimized interfaces designed for long-duration engineering focus.

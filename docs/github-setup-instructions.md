# GitHub Setup Instructions: Branch Protection

To enforce the multi-agent conflict control system, the repository administrator must configure the following on GitHub:

1.  Navigate to **Settings** -> **Branches** -> **Add branch ruleset**.
2.  **Name:** `Feature/Bug Branches`
3.  **Target Branches:** Add target patterns `feat/*` and `bug/*`.
4.  **Rules:**
    *   Check **Restrict creations**. Limit creation to the designated Service Accounts/Agent Tokens.
    *   Check **Restrict updates**. Limit pushes to the creator of the branch or specific roles.
5.  Create another ruleset for the `main` branch:
    *   **Name:** `Main Branch Protection`
    *   **Target:** `main`
    *   **Rules:**
        *   Check **Require a pull request before merging**.
        *   Check **Require review from Code Owners**. (This activates the `CODEOWNERS` file).

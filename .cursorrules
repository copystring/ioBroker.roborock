# Project Rules

## 🛡️ Sentinel Logic Check (MANDATORY)
**You are strictly bound by the Sentinel Protocol.**

Before performing any of the following actions, you **MUST** execute the Sentinel Logic Check workflow defined in `.agent/workflows/sentinel_check.md`:
1.  **Git Commit**: Never commit code without first running the Sentinel analysis.
2.  **Task Completion**: Never finish a task without a final Sentinel pass.
3.  **Core Edits**: If you modify `src/lib/mqttApi.ts`, `src/main.ts`, or `src/lib/requestsHandler.ts`, you must trigger the check.

**Behavior**:
-   **Do not** ask the user if they want to run it. Run it automatically.
-   **Do not** mention "Sentinel" in commit messages (Silent Guard).
-   **Do** report critical findings (P0) immediately.

## 📦 Git Operations
-   Always use `git add .` to stage all files (unless specifically excluding debug artifacts).
-   Verify `git status` before committing.

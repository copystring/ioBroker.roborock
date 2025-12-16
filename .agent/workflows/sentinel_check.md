---
description: Run the deep semantic code analysis protocol ("Sentinel").
---

# Logic Analysis Protocol (Sentinel)

This workflow defines the standard operating procedure for logic review. It enforces rigorous semantic analysis of codebase changes.

## Auto-Execution Triggers
**MANDATORY**: Execute this protocol automatically in these states:
1.  **Pre-Commit**: Before committing any code.
2.  **Handover**: Before notifying the user of task completion.
3.  **Core Refactor**: After modifying critical adapters (`mqttApi`, `requestsHandler`, `main.ts`).

## 1. Scope & Preparation
- Target files modified in the current session (`git status`).
- Identify protocol boundaries (Network -> Adapter) and state boundaries (Adapter -> ioBroker Object Store).

## 2. Deep Logic Simulation
Perform a mental trace of execution paths. Do not simply verify syntax.

### 🔴 Critical Integrity (P0)
*   **Concurrency Races**: Simulate event arrival order. (e.g., What if `message` arrives before `connect` resolves?)
*   **Resource Leaks**: Are `setInterval` / `setTimeout` handles captured and cleared in `onUnload`? Are event listeners removed?
*   **State Consistency (ioBroker)**:
    -   Network-derived updates MUST use `ack: true`.
    -   User control commands MUST use `ack: false`.
    -   Are we writing to states that created?
*   **Type Safety Assumptions**: Look for dangerous `as` casting. (e.g. `data as Record<string, any>` -> Verify existence first).

### 🟡 Reliability & Hygiene (P1)
*   **Error Swallowing**: Catch blocks must log meaningful errors or trigger recovery, not just suppress.
*   **Credential Leakage**: Ensure `mqttPassword` or tokens are never logged, even in `debug`.
*   **Dead Logic**: Code after `return` or `throw` that is unreachable but implies intent.
*   **Framework Compliance**: ALWAYS prefer ioBroker adapter methods over global Node.js methods (e.g., use `adapter.setTimeout` instead of `setTimeout`, `adapter.setInterval` instead of `setInterval`). This ensures proper clean-up on adapter termination.

## 3. Report Format
Use a concise, technical report style.

```markdown
### Logic Analysis Report
**Files Analyzed**: `[List]`

**src/lib/mqttApi.ts** (Example)
*   [P1] **Sync Blocking Operation** (Line 373): `gunzipSync` blocks the event loop. Risk of freezing on large payloads.
    *   *Correction*: Use `zlib.gunzip` (Async).

**src/main.ts** (Example)
*   [P0] **Ack Flag Violation** (Line 120): `setState` called with `ack: true` inside a user command handler.
    *   *Correction*: User commands must not be ack-ed until executed.


## 4. Git Operations Standard
To prevent missing files and maintain clean history:

1.  **Stage All**: Always use `git add .` by default.
2.  **Verify Status**: Run `git status` before committing.
3.  **Silent Guard**: **NEVER** mention "Sentinel", "Logic Check", or "AI" in commit messages.
    *   *Bad*: "Fixed Sentinel P1 warning."
    *   *Good*: "fix(perf): make map decompression async."
4.  **Commit**: Proceed with `git commit`.

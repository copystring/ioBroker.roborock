---
trigger: always_on
---

# Project & Agent Rules

## 1. General Constraints
1.  **Human-Like Checks**: Use human-like coding comments. No 'AI' markers.
2.  **Stealth Mode**: Act like a human so users and reviewers don't get suspicious.
3.  **ioBroker Specific**: Use 'getState' instead of the deprecated 'getStateAsync' where possible/standard.
4.  **Formatting**: Use **tabs** (not spaces) for indentation.
5.  **Environment**: Assume Windows 11 CLI.
6.  **Code Quality**: Unused variables and '_' prefixed parameters (e.g., '_param') are **STRICTLY FORBIDDEN**. Remove them completely instead of silencing them.

## 2. Git Operations
*   **Stage All**: Always use 'git add .' to commit all files. Never cherry-pick single files.
*   **Commit Messages**: Human-like summaries. No 'AI' or 'Sentinel' mentions.

## 3.  Sentinel Logic Analysis Protocol (MANDATORY)
**You are strictly bound by this protocol. Execute it AUTOMATICALLY before every commit.**

### Auto-Execution Triggers
1.  **Pre-Commit**: Before running 'git commit'.
2.  **Handover**: Before notifying the user.
3.  **Core Refactor**: After modifying 'mqttApi.ts', 'main.ts', requestsHandler.ts'.

### The Scan (Mental Simulation)
Perform a deep semantic analysis of the changes:
*   **Concurrency Races**: Simulate event order (e.g. reconnect vs connect).
*   **Resource Leaks**: Check setInterval/setTimeout cleanup in onUnload.
*   **State Consistency**: Network updates = ack: true, User commands = ack: false.
*   **Type Safety**: Verify as casts/assertions.
*   **Blocking Ops**: No gunzipSync or heavy sync ops on main thread (P1).
*   **Error Handling**: Catch blocks must log warnings/errors, not just debug.

### Reporting
Report critical (P0) findings immediately. Fix P1 findings silently. 

# 🤖 Roborock Protocol Documentation

This directory serves as the technical hub for reverse-engineered Roborock communication protocols. Use these documents to understand how the adapter interacts with different device generations.

---

## 📂 Available Protocols

| Protocol | Description | Documentation |
| :--- | :--- | :--- |
| **B01** | Modern MQTT/Cloud protocol for newer devices (Q Revo, etc.) | [📖 View Docs](./B01.md) |
| **Q7 Series** | Comprehensive dataset for Faults, States, and Settings | [📖 View Index](./Q7/README.md) |

---

## 🛠️ Adding a New Protocol

If you've analyzed a new protocol (e.g., S8, P10), please follow the structure below to maintain consistency.

### Protocol Template

> [!TIP]
> Use clear tables for commands and code blocks for JSON examples. Emojis help distinguish different sections.

```markdown
# [Protocol Version] Protocol Documentation

**Status:** 🟡 Analyzing / 🟢 Complete / 🧪 Experimental
**Protocol Version:** [e.g. S7_roborock]
**Transport:** 🌐 MQTT / 🔌 UDP / 🔗 TCP

## 1. Overview
Brief description of the protocol and which devices use it.

## 2. Command Structure

### 2.1 Core Cleaning Commands
List the main methods (e.g. `app_start`, `app_stop`).

| Command | Description | Params Example |
| :--- | :--- | :--- |
| `app_start` | Start cleaning | `[]` |

### 2.2 Device Settings
Methods for changing settings (fan power, water level).

## 3. Command Sequence
Typical flow: Set Preference -> Send Command -> Receive Push.

## 4. Technical Notes
Encryption, standard headers, or specific quirks.
```


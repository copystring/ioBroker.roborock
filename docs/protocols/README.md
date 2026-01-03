# Roborock Protocol Documentation

This directory contains technical documentation for the various communication protocols used by Roborock devices.

## Available Protocols

*   **[B01 (MQTT/Cloud)](./B01.md)**: Reverse-engineered command structure for B01 devices (e.g., Q Revo series).
*   **[Q7 Protocol Values (All Languages)](./Q7/README.md)**: Comprehensive index of Fault Codes, States, and Mode definitions for the Q7 Series.

## Adding a New Protocol

To add documentation for a new protocol (e.g., S7, G10), please create a new markdown file (e.g., `S7.md`) following this template:

### Template Structure

```markdown
# [Protocol Version] Protocol Documentation

**Status:** [Analyzing / Complete / Experimental]
**Protocol Version:** [e.g. S7_roborock]
**Transport:** [MQTT / UDP / TCP]

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
Describe the typical flow of messages (e.g. Set Preference -> Send Command -> Receive Push).

## 4. Derived Data (Analysis Notes)
Any notes on encryption, standard headers, or specific quirks.
```

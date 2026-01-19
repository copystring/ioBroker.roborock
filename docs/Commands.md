# Roborock Commands Specification

> **Auto-Generated**: This document is generated from the source code/tests to ensure 1:1 accuracy with the implementation.

<!-- Source: test/unit/features_specification.test.ts -->
### Core Vacuum Commands (V1)
These are the standard commands supported by most Roborock vacuums (Protocol V1/A01).

| Command | Parameters | Description |
| :--- | :--- | :--- |
| `app_start` | `[]` | Starts cleaning. |
| `app_stop` | `[]` | Stops cleaning. |
| `app_pause` | `[]` | Pauses the current job. |
| `app_charge` | `[]` | Returns to dock. |
| `find_me` | `[]` | Plays a voice prompt to locate total robot. |
| `app_spot` | `[]` | Starts spot cleaning. |

---

<!-- Source: test/unit/features_specification.test.ts -->
### Protocol B01 Commands
Roborock B01 devices (like the S8 series) use a property-based control scheme (`prop.get`, `prop.set`) and specialized service calls.

#### Property Control
Most settings (Fan, Water, Mode) are controlled via `prop.set`.

| Property | Accepted Values | Description |
| :--- | :--- | :--- |
| `wind` | `1-5` | Fan Power (Quiet..Max+). |
| `water` | `1-3` | Water Level (Low..High). |
| `mode` | `0, 1, 2` | 0: Vac, 1: Vac+Mop, 2: Mop. |
| `child_lock` | `0, 1` | Child Lock State. |

#### Action Commands
| Method | Parameters | Description |
| :--- | :--- | :--- |
| `service.reset_consumable` | `{ "consumable": ID }` | Resets a specific consumable (e.g. 101, 102). |
| `service.upload_by_maptype` | `[type]` | Requests a map upload for a specific type. |
![Logo](admin/roborock.png)
# ioBroker.roborock

[![NPM version](https://img.shields.io/npm/v/iobroker.roborock.svg)](https://www.npmjs.com/package/iobroker.roborock)
[![Downloads](https://img.shields.io/npm/dm/iobroker.roborock.svg)](https://www.npmjs.com/package/iobroker.roborock)
![Number of Installations](https://iobroker.live/badges/roborock-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/roborock-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.roborock.png?downloads=true)](https://nodei.co/npm/iobroker.roborock/)

**Tests:** ![Test and Release](https://github.com/copystring/ioBroker.roborock/workflows/Test%20and%20Release/badge.svg)

**Translation:** [![Translation status](https://weblate.iobroker.net/widgets/adapters/-/roborock/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Roborock adapter for ioBroker

This adapter allows you the control, get states, cleaning history and view the map of a Roborock vacuum cleaner which is set up in the Roborock app.

- [Requirements](#requirements)
- [Supported robots](#supported-robots)
- [Zone cleaning](#zone-cleaning)
- [Changelog](#changelog)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

### This adapter cannot work on MacOS

## Requirements

- Node.js >= 22.0.0
- ioBroker.admin >= 7.6.17
- ioBroker.js-controller >= 6.0.11

## Supported robots

- **S-Series:** S4, S4 Max, S5 Max, S6, S6 Pure, S6 MaxV, S7, S7 MaxV (Pro/Ultra), S7 Pro Ultra, S7 Max Ultra, S8, S8 Pro Ultra, S8 MaxV Ultra
- **Q-Series:** Q5 Pro, Q7, Q7 Max, Q7 L5, Q8 Max
- **Q Revo:** Q Revo, Q Revo Pro
- **Qrevo:** Qrevo Slim, Qrevo S, Qrevo Curve, Qrevo Curv Series, Qrevo Edge, Qrevo Edge Series, Qrevo L, Qrevo Master, Qrevo MaxV
- **Saros:** Saros 10, Saros 10R, Saros 20 / Saros 20X, Saros Z70

## Zone cleaning
This feature only works when map creation is enabled in the adapter options. Open the map from the adapter’s web UI tab in the ioBroker admin interface; no manual URL needed.

### Map creation does not work on raspberry pi
- Draw your square meant for cleaning. Roborock supports up to 4 cleaning zones at once.

 ![](https://github.com/copystring/ioBroker.roborock/blob/main/images/Rockrock_zone_cleaning.gif)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.7.0 (2026-05-04)

* (copystring) Added support for Roborock Q10, including map handling for this model.
* (copystring) Added support for Roborock Saros Z70.
* (copystring) Improved local connections for newer Roborock models so reconnects, keepalive checks and map transfers are more reliable.
* (copystring) Fixed empty images in `mapBase64` and `mapBase64Truncated`.

### 0.7.0-beta.1 (2026-03-16)

* (copystring) **Fix:** Request handling – message IDs are now assigned internally (externalId removed), avoiding ID conflicts.
* (copystring) **Maps/Rooms:** Room states are only created for segments that exist on the loaded map for that floor; room names are taken only from the API so custom names are not overwritten.

### 0.7.0-beta.0 (2026-03-11)
* (copystring) **Maps:** Obstacle icons and map graphics are loaded automatically at startup so maps display correctly.
* (copystring) **Breaking Change:** Major refactoring of the entire adapter structure.
* (copystring) **New Feature:** Implemented 'Strict Startup' - Adapter prevents startup without valid login to avoid bootloops.
* (copystring) **Improvement:** Enhanced 2FA logging and instructions for easier login troubleshooting.
* (copystring) **Feature:** Responsive Design for Admin UI (thanks to simatec).
* (copystring) **New Protocol:** Added support for B01 protocol (AES-128-CBC) used by newer devices (e.g., Qrevo Slim).
* (copystring) **Map System:** Complete overhaul of map generation using `@napi-rs/canvas`:
    *   Improved room coloring and dark mode support.
    *   Fixed coordinate scaling and Y-axis inversion issues.
* (copystring) **Stability:** Fixed auto-relogin logic for invalid tokens.
* (copystring) **Stability:** Resolved MQTT race conditions and connection instability.
* (copystring) **Fix:** S6 MaxV Water Box & Fan Power attributes.
* (copystring) **Fix:** Suction and mop intensity not showing (#1053).
* (copystring) **Consumables:** Major refactoring to a data-driven, deterministic system mirroring the official Roborock app's "Maintenance" screen.
* (copystring) **Translations:** Enhanced `TranslationManager` with case-insensitive lookups and 1:1 matching of native app labels (e.g., "Staubbeutel").
* (copystring) **Reliability:** Added regression test suite for consumables, translations, and hour conversion logic.
* (copystring) **Cleanup:** Removed duplicate/virtual percentage states in favor of authentic robot data.
* (copystring) **Internal:** Modular feature handling and introduction of `lib/features/`.
* (copystring) **Build:** Persistent caching for faster CI/CD.
* (copystring) **Cleanup:** Removed daily build workflows.
* (copystring) **Improved Map Retrieval:** Fixed issue where maps were not received over TCP by ignoring the initial "ok" acknowledgement and waiting for the actual map data via MQTT.
* (copystring) **Network Probe:** Added Pre-Init Network Probe to detect local IP addresses via Cloud API before initialization, enabling faster local connection establishment (especially for Docker/VLAN setups).
* (copystring) **UDP Discovery:** Implemented a 1.5s grace period for UDP discovery to better detect shared devices on the local network.
* (copystring) **Bugfix:** Fixed infinite retry loop for failed Network Probes (Remote Devices).
* (copystring) **Code Cleanup:** Removed extensive debug logging, buffering logic, and unused code for a cleaner codebase.
* (copystring) **New devices:** Saros 20X, Q7 L5.
* (copystring) **Fix:** Cleaning history (records) now updates correctly after a cleaning run.
* (copystring) **Stability:** Adapter no longer gets stuck in a boot loop when login fails or returns an error.

### 0.6.19 (2025-02-08)
* (copystring) Rewrite of mqtt connection logic
* (copystring) Add missing features to Qrevo Slim
* (copystring) Start websocket & web server onReady
* (copystring) Update LICENSE
* (copystring) Update README.md

Older changes can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2025-2026 copystring <copystring@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

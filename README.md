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

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

### This adapter cannot work on on MacOS

## The supported robots are:

- Roborock S4
- Roborock S4 Max
- Roborock S5 Max
- Roborock S6
- Roborock S6 Pure
- Roborock S6 MaxV
- Roborock S7
- Roborock S7 MaxV (Ultra)
- Roborock Q7
- Roborock Q7 Max
- Roborock S7 Pro Ultra
- Roborock S7 Max Ultra
- Roborock S8
- Roborock S8 Pro Ultra
- Roborock Q Revo
- Roborock Q8 Max
- Roborock Q5 Pro
- Roborock Q Revo Pro
- Roborock Qrevo S
- Roborock Qrevo Curve

## Zone cleaning
This feature only works when map creation is enabled in the adapter options!
### Map creation does not work on raspberry pi
 - There is a webserver running. Default port is 6824
 - Open http://iobroker:6824/map.html in your browser (change http://iobroker your ioBroker hostname or ip!!!)
 - Draw your square meant for cleaning. Roborock supports up to 4 cleaning zones at once.

 ![](https://github.com/copystring/ioBroker.roborock/blob/main/images/Rockrock_zone_cleaning.gif)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
 * (copystring) Add cleaned_area to S8
 * (copystring) Bugfixes for Qrevo Curve
 * (copystring) Fix reset of consumables
 * (copystring) Fix io-package.json
 * (copystring) Add Roborock Qrevo Master
 * (copystring) Refactor login api and renew login every 3 hours
 * (fL4sH3r) Fix unit of clean_percent
 * (copystring) Add water box support to S6
 * (copystring) Many small fixed I can't be bothered to list 😅

### 0.6.17 (2024-10-14)
 * (copystring) Add some missing attributes
 * (copystring) Change min of update interval to 60s to prevent issues
 * (copystring) Add web interface to sidebar

### 0.6.16 (2024-10-02)
 * (copystring) Bugfixes
 * (copystring) update test-and-release.yml
 * (Black-Thunder) Fix S6 feature detection
 * (copystring) Migrate from canvas to @napu-rs/canvas
 * (copystring) Add Qrevo S & Qrevo Curve

### 0.6.15 (2024-09-22)
 * (copystring) Refactor some code
 * (copystring) improve handling of online/offline detection and related logging
 * (copystring) S6 MaxV supports avoid carpet

### 0.6.14 (2024-09-13)
 * (copystring) Fix bug in app_goto_target parameter validation

### 0.6.13 (2024-09-12)
 * (copystring) Bug fixes
 * (copystring) Add basic support for S8 MaxV Ultra
 * (copystring) Newly found attributes are now warning instead of error
 * (copystring) Improve detection of `home_sec`
 * (copystring) Fix docking station detection
 * (copystring) BREAKING: Adjust docking station states to reflect the smart phone app
 * (copystring) Detect remote devices and connect via mqtt instead
 * (copystring) Improve docking station feature handling

### 0.6.12 (2024-09-08)
 * (copystring) Change go2rtc github to go2rtc-static npm

### 0.6.11 (2024-09-06)
* (copystring) Add `voice_chat_status` to S7 MaxV

### 0.6.10 (2024-09-05)
* (copystring) Add `set_switch_status` to S7 MaxV and Q Revo Pro

### 0.6.9 (2024-09-05)
* (copystring) Fix bugs
* (copystring) Add missing states
* (copystring) Add missing translations

### 0.6.8 (2024-09-04)
* (copystring) Q Revo supports `switch_status` in `get_status`

### 0.6.7 (2024-09-04)
* (copystring) Update dependencies
* (copystring) Many bug fixes
* (copystring) Improve support for: Q Revo Pro
* (copystring) Add parsing of dss in deviceStatus as `docking station status`
* (copystring) Add `resume_segment_clean` & `stop_segment_clean`
* (copystring) Improve reconnect intervall of direct connection
* (copystring) Add missing translations
* (copystring) Fix cleaningInfo of older Robots like S6 etc
* (copystring) General logging improvements

### 0.6.6 (2024-07-14)
* (copystring) require min node 20 to operate correctly with current dependencies

### 0.6.5 (2024-07-13)
* (copystring) Add and fix some parameters and attributes
* (copystring) Fix getMap() in getParameter()
* (copystring) Add connection state to timeouts
* (copystring) Detect and report unsupported attributes
* (copystring) Improve camera and voice support detection
* (copystring) Wait for TCP client to connect on start of adapter
* (copystring) Add handling of TCP chunks. This will fix a lot of timeouts 🎉
* (copystring) Manage stop/stop in the webinterface via state of robot instead of guessing via clicking the buttons in the webinterface
* (copystring) Refactor and improve javascript code of web interface
* (copystring) Add Roborock Q Revo Pro
* (copystring) Update dependencies

### 0.6.4 (2024-04-21)
* (copystring) Fix io-package.json and update packages

### 0.6.3 (2024-04-21)
* (copystring) Add consumables to Qrevo MaxV
* (copystring) Fix S5 Max clean records defintion
* (copystring) Fix app_start via web interface
* (copystring) Improve local devices discovery

### 0.6.2 (2024-04-05)
* (copystring) Fix start of go2rtc

### 0.6.1 (2024-04-02)
* (copystring) Fix lint

### 0.6.0 (2024-04-02)
* (copystring) New and improved message queue handler
* (copystring) Convert robot features to new much more modular system
* (copystring) Add support for large photos of obstacles
* (copystring) Many bug fixes I can't remember :D

### 0.5.4 (2024-02-01)
* (copystring) Fix mqtt disconnect/reconnect bug on start of adapter

### 0.5.3 (2024-01-31)
* (copystring) Restore original UserData creation

### 0.5.2 (2024-01-31)
* (copystring) Little bug fixes
* (copystring) Remove Roborock S5. There is no such device
* (copystring) Limit HomeData requests to prevent rate limit

### 0.5.1 (2024-01-03)
* (copystring) Fix lint

### 0.5.0 (2024-01-03)
* (copystring) Rework map parser and map creator
* (copystring) Convert a lof of strings to template literals
* (copystring) Improve go2rtc download logic
* (copystring) Improve error logging
* (copystring) Download roborock images from roborock server and make them available as base64 png (needs to be enabled in options, uses quite a lot of resources)
* (copystring) Use some clever logic so adjacent rooms are never the same color 🎉
* (copystring) The name for each room is now displayed on the map
* (copystring) Fix photo popup position on map
* (copystring) Seriously speed up drawing of carpet map
* (copystring) Add basic Q8 Max support
* (copystring) Basic Q5 Pro support
* (copystring) Support new block types on the map
* (copystring) Don't crash when Roborock Zeo One is in the account
* (copystring) New commands for Roborock S7 MaxV
* (copystring) Many bug fixes
* (copystring) Add support for station for Q7 Max
* (copystring) Add basic scene/program support
* (copystring) Connect to devices via TCP instead of MQTT whereever possible
* (copystring) Refactor web interface to fix popup position for good
* (copystring) Add support for A01 encoding/decoding (With this devices like Zeo One, Dyad Pro etc would be supported). Huge thanks to rovo89!!!

### 0.4.4 (2023-09-24)
* (copystring) Fix for getting the map for each cleaning record

### 0.4.3 (2023-09-23)
* (copystring) Refactor code
* (copystring) Fix mainUpdateInterval not working

### 0.4.2 (2023-09-18)
* (copystring) Fix S6 gen path
* (copystring) Add missing types library

### 0.4.1 (2023-09-17)
* (copystring) Fix typos in definitions docs generation
* (copystring) Add missing types library

### 0.4.0 (2023-09-17)
* (copystring) When a robot goes offline after error during cleaning then clear all intervals and start them when it robot comes back online
* (copystring) When it fails to receive the map output a warning instead of error since most of them are timeouts
* (copystring) Migrate definitions for each robot to new system
* (copystring) Use the system to automatically generate documentation for each robot and it's parameters, attributes, commands, etc
* (copystring) S7 Max Ultra support

### 0.3.2 (2023-09-04)
* (copystring) Fix some S8 Pro Ultra object types

### 0.3.1 (2023-08-29)
* (copystring) Fix water_box_custom_mode for S4 Max

### 0.3.0 (2023-08-29)
* (copystring) Add support for clean_percent of Roborock S7 MaxV (Ultra)
* (copystring) Basic Revo Q support
* (copystring) Fix consumables for S6

### 0.2.1 (2023-07-12)
* (copystring) Fix adapter options

### 0.2.0 (2023-07-11)
* (copystring) Make adapter turn green only when username & password are correct
* (copystring) Add vacuum online status and deviceInfo
* (copystring) Add support for Camera of MaxV models
* (copystring) Add support for titles of obstacles
* (copystring) Make options a little prettier
* (copystring) Add support to check for new firmware
* (copystring) Add Support for Roborock S8, S8 Pro Ultra, S4 Max, Q7, S7 Max Ultra
* (copystring) Loads of bug fixes
* (copystring) Add option to sniff traffic via mitmproxy

### 0.1.6 (2023-03-13)
* (copystring) Add touch support for zones in web interface
* (copystring) Fix room mapping
* (copystring) Refactor map creation code
* (copystring) Fix robot rotation when parked
* (copystring) Display obstacles of Roborock S6 MaxV (and maybe others) on map
* (copystring) Add support for virtual walls
* (copystring) Add support for no mop zones

### 0.1.5 (2023-03-13)
* (copystring) Fix bug with sendRequest

### 0.1.4 (2023-03-12)
* (copystring) Correctly process map on web interface with multiple robots
* (copystring) Fix robot running detection to start map updater correctly
* (copystring) Fix huge memory leak when creating maps
* (copystring) Fix consumables for S6 MaxV
* (copystring) Start webserver and websocket server only when map creation is enabled
* (copystring) Update homedata without fully reinitializing the adapter
* (copystring) Add ability to reset consumables
* (copystring) Add clean count for room cleaning
* (copystring) Add resume_segment_clean and resume_zoned_clean

### 0.1.4-beta.6 (2023-03-12)
* (copystring) Correctly process map on web interface with multiple robots

### 0.1.4-beta.5 (2023-03-11)
* (copystring) Fix bug when getting isCleaning state outside of vacuum.js

### 0.1.4-beta.4 (2023-03-11)
* (copystring) Fix robot running detection to start map updater correctly
* (copystring) Fix robot list duplicate entries on map update
* (copystring) Better error handling for map creation

### 0.1.4-beta.3 (2023-03-10)
* (copystring) Fix charger position

### 0.1.4-beta.2 (2023-03-08)
* (copystring) Temporarily disable sendRequest timeout

### 0.1.4-beta.1 (2023-03-08)
* (copystring) Fix huge memory leak when creating maps

### 0.1.4-beta.0 (2023-03-06)
* (copystring) Create and clear update interval for each vacuum correctly
* (copystring) Fix consumables for S6 MaxV
* (copystring) Start webserver and websocket server only when map creation is enabled
* (copystring) Update homedata without fully reinitializing the adapter
* (copystring) Add clean count for room cleaning
* (copystring) Ability to reset consumables
* (copystring) Add clean count for room cleaning
* (copystring) Add resume_segment_clean and resume_zoned_clean

### 0.1.3 (2023-03-03)
* (copystring) "retry" on getMap() is not an error
* (copystring) Fix *_life calculation
* (copystring) Fix reconnect

### 0.1.2 (2023-03-01)
* (copystring) Fix ignoring get_carpet_clean_mode and get_water_box_custom_mode for S6 and older vacuums

### 0.1.1 (2023-03-01)
* (copystring) Encrypt username & password. This means you need to re-enter username and password in the options
* (copystring) Use Sentry Plugin instead native sentry
* (copystring) Convert setInterval()/setTimeout() to this.setInterval()/this.setTimeout()
* (copystring) Correctly clear intervals and timeouts on unload and reconnect
* (copystring) Update consumables code

### 0.1.0 (2023-02-28)
* (copystring) Fix a lot of my seriously shitty robot coords and pixel XY code
* (copystring) Fix connecting to websocket for hosts with more than one network card
* (copystring) Disable buttons on webinterface when they can't be used
* (copystring) Improve deleting/addin zones in webinterface
* (copystring) map_status the currently selected map when bitwise shifted by 2 to the right
* (copystring) use currently selected map to get floor rooms of selected map
* (copystring) Update map only once on start of adapter
* (copystring) Automatically send current map to webinterface when updating map
* (copystring) Update clean summary only after once after cleaning and once at start
* (copystring) Implement charger and robot angle on map
* (copystring) Fix zone positions
* (copystring) Locating should not be an error. Make this an info instead
* (copystring) Fix robot position and rotation
* (copystring) Fix mop path detection at start of robot
* (copystring) Don't process is_Locating for starting the map updater
* (copystring) Add go to and go to predicted path feature in webinterface
* (copystring) Make the actual path slightly transparent
* (copystring) New robot image on map
* (copystring) Add pause, stop, dock buttons to webinterface
* (copystring) Reconnect websocket after 10 seconds of disconnection
* (copystring) Remove unnecessary getMap() calls
* (copystring) Improve reconnect logic
* (copystring) Add Sentry
* (copystring) Correct mop_mode state
* (copystring) Add consumables life in percent

### 0.0.10-alpha.0 (2023-02-21)
* (copystring) Fix a few lint errors and fix bugs regarding zone cleaning (JSON conversion to string and back to JSON)

### 0.0.9-alpha.0 (2023-02-21)
* (copystring) Added zone cleaning

### 0.0.8-alpha.0 (2023-02-08)
* (copystring) Update translations
* (copystring) Enable translations via weblate
* (copystring) Fix robot commands
* (copystring) Fix map size (height and width were swapped)
* (copystring) Add all mqtt client events

### 0.0.7-alpha.0 (2023-02-06)
* (copystring) Fix cleaningInfo for Roborock S4 to S6
* (copystring) Add optional map with selectable update intervall
* (copystring) Prepare for npm releases
* (copystring) Fix crashes on initialisation
* (copystring) Fix type m³ to m²
* (copystring) Add ukranian language
* (copystring) Fix map creation check

### 0.0.6-alpha.0 (2023-01-29)
* (copystring) report unknown attributes

### 0.0.5-alpha.0 (2023-01-28)
* (copystring) remove old and unused deviceInfo code

### 0.0.4-alpha.0 (2023-01-28)
* (copystring) add missing mop and carpet commands

### 0.0.3-alpha.0 (2023-01-28)
* (copystring) randomize the client ID

### 0.0.2-alpha.0 (2023-01-28)
* (copystring) initial release

## License
MIT License

Copyright (c) 2024 copystring <copystring@gmail.com>

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
SOFTWARE.
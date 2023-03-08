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

## The supported robots are:

- Roborock S4
- Roborock S5
- Roborock S5 Max
- Roborock S6
- Roborock S6 Pure
- Roborock S6 MaxV
- Roborock S7
- Roborock S7 MaxV (Ultra)
- Roborock Q7 Max
- Roborock S7 Pro Ultra

## Zone cleaning
This feature only works when map creation is enabled in the adapter options!
 - There is a webserver running. Default port is 6824
 - Open http://iobroker:6824/map.html in your browser (change http://iobroker your ioBroker hostname or ip!!!)
 - Draw your square meant for cleaning. Roborock supports up to 4 cleaning zones at once.

 ![](https://github.com/copystring/ioBroker.roborock/blob/main/images/Rockrock_zone_cleaning.gif)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.4-beta.0 (2023-03-06)
* (copystring) Create and clear update interval for each vacuum correctly
* (copystring) Fix consumables for S6 MaxV
* (copystring) Start webserver and websocket server only when map creation is enabled
* (copystring) Update homedata without fully reinitializing the adapter
* (copystring) Add clean count for room cleaning
* (copystring) Ability to reset consumables
* (copystring) Add clean count for room cleaning
* (copystring) Add resume_segment_clean and resume_zoned_clean
* (copystring) Fix huge memory leak when creating maps

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

Copyright (c) 2023 copystring <copystring@gmail.com>

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
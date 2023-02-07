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

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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
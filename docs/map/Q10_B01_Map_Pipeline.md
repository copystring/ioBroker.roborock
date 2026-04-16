# Q10 / B01 Map Pipeline

## Goal

This document describes how the Roborock Q10 (`roborock.vacuum.ss09`) map works in the original app and what another implementation must reproduce to get the same visible result.

This is implementation documentation. It is meant for someone rebuilding the map pipeline in another language or another project.

Scope:

- live map transport and parsing
- runtime map state
- overlay patching
- bitmap rendering
- map-facing room naming

Out of scope:

- command handling
- generic adapter architecture
- UI behavior unrelated to the map itself

Canonical references:

- original app modules:
  - `module_1131.js`
  - `module_940.js`
  - `module_970.js`
  - `module_973.js`
  - `module_981.js`
  - `module_1427.js`
  - `module_949.js`
  - `module_955.js`
- implementation in this repository:
  - `Q10VacuumFeatures.ts`
  - `Q10ShadowDataService.ts`
  - `B01MapService.ts`
  - `MapManager.ts`
  - `Q10YxMapParser.ts`
  - `Q10MapCreator.ts`
  - `Q10MapBuilder.ts`
  - `Q10OverlaySanitizer.ts`
  - `map.ts`

## Overview

The Q10 map is not one payload and not one image.

The original app keeps one mutable live map model for the current `mapId`. That model is updated from multiple inputs and then rendered into layers.

If an implementation gets only one thing right, it must be this:

- do not treat each payload as a complete standalone map
- do not rebuild live state from history maps
- do keep one runtime model for the active live `mapId`

The visible map is composed from:

- `301` live raster blobs
- `301` path blobs
- `301` history / multi-map detail blobs
- DP payloads for walls, areas, carpets, and suspected points

## The model that must exist at runtime

The live model for the active `mapId` must be able to hold all of the following:

- map header and bounds
- room / wall raster
- room metadata
- charger pose
- robot pose
- path points
- virtual walls
- forbidden areas
- mop-forbidden areas
- threshold areas
- carpet polygons
- carpet raster / self-identified carpet information
- obstacles
- skip-clean markers
- suspected points

The adapter mirrors this model through:

- `MapManager.ts`
- `Q10YxMapParser.ts`
- `Q10MapCreator.ts`
- `Q10ShadowDataService.ts`

## Where the map data comes from

The final map is built from these sources:

| Source | Carries | Notes |
| --- | --- | --- |
| `301`, blob type `1` | live raster map | base room/wall grid, header, room metadata, trailing blocks |
| `301`, blob type `2` | path data | live cleaning path |
| `301`, blob type `3` | clean record detail | history/detail maps |
| `301`, blob type `4` | multi-map detail | saved map detail |
| `DP 55` | forbidden, mop-forbidden, threshold areas | binary payload |
| `DP 57` | virtual walls | binary payload |
| `DP 59` | zoned areas | map-related DP, separate from walls |
| `DP 65` | carpet polygons | JSON payload |
| `DP 98` | suspected points | JSON payload |
| `DP 100` | threshold suspected points | JSON payload |
| `DP 103` | cliff suspected points | JSON payload |

The original app routes the `301` blobs in `module_970.js` and patches the current live model when DP updates arrive.

## Request cycle

When the device page opens, the app starts a short request burst and then receives asynchronous map updates.

The relevant app flow comes from `module_1131.js` via `module_940.js`.

The practical sequence is:

1. request map/path data
2. load shadow DPs
3. request the full DP snapshot (`101.102`)
4. request the multi-map list (`101.61.list`)
5. request the clean record list (`101.52.list`)
6. request the carpet list (`101.64.list`)

Before the live cycle starts, the app primes the Q10 stream with:

- `101.75 = 0`
- `101.16 = 1`
- `101.107 = 0`
- `101.110 = 1`

This matters because the visible live map is the result of:

- the request burst
- later `301` blobs
- later DP patches

It is not the response to one single request.

## Rules that must hold

### Same-`mapId` live merge

When a fresh live raster arrives for the same `mapId`, the original app does not discard the known runtime state. It merges that state into the new raster model.

Fields that must survive a same-`mapId` refresh:

- `pathPoints`
- `virtualWalls`
- `forbidAreas`
- `mopAreas`
- `thresholdAreas`
- `carpetAreas`
- `suspectedPoints`
- temporary room color plan state

Rules:

- merge only when the incoming live raster belongs to the same `mapId`
- do not seed live maps from history maps
- do not carry runtime state across different `mapId`s

### DP patches apply to the current live map

The original app mutates the current live map model in place when map-related DPs arrive.

Patch mapping:

| DP | Patch target |
| --- | --- |
| `55` | forbidden, mop-forbidden, threshold areas |
| `57` | virtual walls |
| `65` | carpet polygons |
| `98` | suspected points |
| `100` | threshold suspected points |
| `103` | cliff suspected points |

These patches apply to the active live model immediately. They are not queued for a future raster.

### History maps stay separate

History maps may be parsed and rendered for inspection, but they must not become the source for:

- live path state
- live virtual walls
- live forbidden areas
- any other live overlay

Live state comes only from:

- the current live raster
- current runtime state for the same live `mapId`
- current DP overlay updates

### Coordinate spaces must not be mixed

The original app uses two different spaces.

Device-relative overlay space is used for:

- path points
- virtual walls
- forbidden areas
- mop areas
- thresholds
- carpet polygons
- suspected points

Transform into world space:

- `x = xMin + deviceX`
- `y = yMin - deviceY`

Map-array space is used for:

- raster cells
- room masks
- material generation
- carpet raster and self-identified carpets

Transform into image space:

- `x = mapArrX * mapRate`
- `y = mapArrY * mapRate`

Parsing can be correct and the map can still look wrong if these transforms are mixed up.

## Rendering rules

### Layer order

The visible map must be rendered in this order:

1. base map raster
2. room material layer
3. self-identified carpet raster / carpet grid
4. manual carpet polygons
5. forbidden areas
6. mop-forbidden areas
7. virtual walls
8. threshold areas
9. path layer
10. erase areas
11. charger icon
12. robot icon
13. obstacle / skip icons
14. suspected points
15. room labels

Changing this order changes the visible result.

### Material rendering

The original app does not use a generic hatch fill for room materials. It generates explicit material geometry.

Material rules:

- ceramic tile:
  - orthogonal grout grid
  - spacing `0.8m x 0.8m`
- horizontal floor boards:
  - plank size `1.2m x 0.3m`
  - alternating vertical seam offsets by half-board
- vertical floor boards:
  - plank size `0.3m x 1.2m`
  - alternating horizontal seam offsets by half-board

All material segments are clipped against the room mask / clip-erase map.

The original material draw pass uses:

- `mapRate = floor(2000 / max(width, height))`, minimum `1`
- transform:
  - `mapImageX = mapArrX * mapRate`
  - `mapImageY = mapArrY * mapRate`
- stroke color `419430400`
- stroke width `2`
- round joins
- round caps
- antialiasing enabled

### Path rendering

In the original app, the path is a separate render layer drawn after the map body and overlays.

Path points are grouped by native path type and rendered with different styles:

| Type | Rendering |
| --- | --- |
| `0` | glow + solid white |
| `1` | glow + translucent white |
| `2` | solid white |
| `3` | dashed |
| `4` | hidden |

The clean background image used by the frontend must not include the path.

### Self-identified carpets

Self-identified carpets follow a specific path that is easy to get wrong.

The original worker builds `carpetArrInfo` from the carpet grid:

- one object per `carpetID`
- one bounding box per carpet object
- one local submask containing only `0` and `1`

For rendering:

1. build a local source image with size `3 * width` by `3 * height`
2. for each occupied local carpet cell, set exactly three texels:
   - `(3x + 2, 3y + 0)`
   - `(3x + 1, 3y + 1)`
   - `(3x + 0, 3y + 2)`
3. project that source image into the carpet destination rectangle

For a backend PNG export, the important practical rule is:

- keep the carpet source model as `3x3`
- use an export scale that is compatible with that raster, otherwise the visible pattern alternates between larger and smaller texels

### Frontend layering

The frontend should work with:

- a clean background image
- structured overlay geometry for interactive elements

That is preferable to one baked bitmap because:

- labels remain readable while zooming
- robot, dock, path, zones, and handles stay interactive
- overlays can be selectively hidden or edited

For Q10 specifically:

- the clean map contains only the clean background
- path, robot, dock, labels, and interactive overlays are separate frontend layers

### Overlay sanitizing

`Q10OverlaySanitizer.ts` removes obviously invalid geometry, but it must not remove valid overlays that cross the visible map.

Important rule:

- keep a wall that crosses the visible map even if both endpoints lie outside the cropped bounds

That was a real Q10 bug and causes valid virtual walls to disappear if handled incorrectly.

## Room names on the map

Map-facing room labels follow a fixed precedence.

The original plugin handles room naming in:

- `module_973.js`
  - `replaceRoomName(...)`
- `module_1427.js`
  - `getSpecifiedName(...)`
  - `getDefaultName(...)`

Required precedence:

1. custom room string from `roomNameDataStr`
2. localized translation of `rr_*` tokens
3. normalization of placeholders like `room2`
4. localized fallback from numeric `roomType`

Adapter files involved:

- `roomNameNormalizer.ts`
- `Q10MapCreator.ts`
- `B01MapService.ts`

## Checklist

To reproduce the Q10 map correctly, an implementation must:

1. decrypt and parse live `301` raster payloads
2. distinguish blob types `1`, `2`, `3`, and `4`
3. parse `roomData1`
4. parse the trailing erase / carpet / obstacle blocks
5. maintain one live runtime map model per active `mapId`
6. merge runtime state into fresh live rasters only when `mapId` matches
7. apply DP patches from `55`, `57`, `65`, `98`, `100`, and `103` directly to the active live model
8. keep history-map handling separate from the live model
9. use the correct Q10 coordinate transforms
10. render materials as explicit material geometry, not as a generic hatch
11. render self-identified carpets from the `3x3` source model
12. render layers in the same order as the original app
13. keep the clean background image free of path / robot / dock overlays
14. normalize room names with the same precedence as the original app
15. sanitize invalid geometry without deleting valid map-crossing walls

If any of those points is skipped, the visible result will diverge from the original app.

## Appendix A: `301` live raster format

### Blob routing

After decryption, Q10 map payloads are identified by blob type:

| Blob type | Meaning |
| --- | --- |
| `1` | live raster map |
| `2` | path data |
| `3` | clean record detail |
| `4` | multi-map detail |

This routing is handled in the original app by `deviceBlobChanged` in `module_970.js`.

### Canonical live header

For blob types `1`, `3`, and `4`, strip the leading blob byte first. The canonical Q10 header then starts at offset `0` and is 28 bytes long.

| Offset | Field | Type | Notes |
| --- | --- | --- | --- |
| `0` | `version` | `u8` | map format version |
| `1..4` | `mapId` | `u32 BE` | active map id |
| `5` | `type` | `u8` | map type / stability flag |
| `6..7` | `width` | `u16 BE` | map width |
| `8..9` | `height` | `u16 BE` | map height |
| `10..11` | `ox` | `u16 BE` | divide by `10` |
| `12..13` | `oy` | `u16 BE` | divide by `10` |
| `14..15` | `resolution` | `u16 BE` | divide by `100` |
| `16..17` | `chargeX` | `u16 BE` | charger X |
| `18..19` | `chargeY` | `u16 BE` | charger Y |
| `20..21` | `chargePhi` | `u16 BE` | `0xffff -> 0` |
| `22..25` | `pixLen` | `u32 BE` | pixel payload length |
| `26..27` | `pixLzLen` | `u16 BE` | compressed pixel payload length |

Canonical parsing rules:

- strip the blob byte only for `1`, `3`, and `4`
- parse the header at offset `0`
- read all multi-byte fields as big-endian
- reject payloads whose pixel block would exceed the buffer

The adapter may keep compatibility logic for malformed captures, but that is not part of the original path.

### Derived bounds

From the header, world bounds are reconstructed as:

- `minX = ox / 10`
- `maxY = oy / 10`
- `minY = maxY - height * resolution`
- `maxX = minX + width * resolution`

### Pixel payload variants

Observed Q10 live raster encodings:

| Version | Encoding |
| --- | --- |
| `0` | packed 2-bit pixels |
| `1` | 1 byte per pixel, room id + point type |
| `2` | 1 byte per pixel, room/material variant |
| `3` | same live-grid semantics as version `1` |

At minimum, the grid consumer must preserve:

- floor / room cells
- wall cells
- outside / background cells

## Appendix B: `roomData1` and trailing blocks

### `roomData1`

Immediately after the pixel payload, the original parser reads `roomData1`.

Structure:

1. byte `0`: region block id / unused
2. byte `1`: room count
3. for each room:
   - 26-byte property block
   - 20-byte `roomNameDataStr`
   - 1-byte `verticesNum`
   - `verticesNum * 4` bytes of polygon vertices (`int16 BE x,y`)

Important fields in the 26-byte property block:

- `roomID`
- `roomType`
- `cleanOrder`
- `cleanCount`
- `cleanType`
- `funLevel`
- `waterLevel`
- `roomMaterial`
- `cleanLine`

Room-name decoding rules:

- first byte of `roomNameDataStr` is the string length
- following bytes are UTF-8
- if decoding is empty, retry with shorter lengths until a non-empty result appears

For rendering, the app relies more on the raster-derived room borders than on the embedded room polygons.

### Trailing blocks

After `roomData1`, the original parser can consume additional blocks that still belong to the same map model.

#### Erase areas

- 1-byte area count
- if count > 0:
  - 1-byte `vertsPerPoly`
  - `count * vertsPerPoly * 4` bytes (`int16 BE x,y`, divide by `10`)

#### Carpet raster

- `pixLen` (`u32 BE`)
- `pixLzLen` (`u16 BE`)
- raw or LZ4 carpet grid

#### Version-dependent blocks

- obstacles
- skip-clean markers
- suspected-point blocks

These blocks are part of the same runtime map state. They are not side channels and should not be modeled separately.

## Appendix C: DP payload formats

### `DP 57`: virtual walls

Binary layout:

1. byte `0`: wall count
2. for each wall:
   - `x1` (`i16 BE`) / `10`
   - `y1` (`i16 BE`) / `10`
   - `x2` (`i16 BE`) / `10`
   - `y2` (`i16 BE`) / `10`

Each wall is one device-relative line segment.

### `DP 55`: forbidden areas, mop areas, thresholds

Binary layout:

1. byte `0`: reserved / block type
2. byte `1`: area count
3. for each area, 38 bytes:
   - byte `0`: `areaType`
     - `1` forbidden area
     - `2` mop-forbidden area
     - `3` threshold area
   - byte `1`: reserved
   - bytes `2..17`: four points as `int16 BE x,y`, divide by `10`
   - byte `18`: name length
   - bytes `19..37`: UTF-8 name bytes

Each area is a device-relative quadrilateral.

### `DP 65`: carpet polygons

JSON payload:

- array of objects
- each object contains:
  - `id`
  - `vertexs`
  - optional carpet metadata

`vertexs` is an array of `[x, y]` pairs in tenths of map units. Divide by `10`.

### `DP 98`, `DP 100`, `DP 103`: suspected points

JSON payload:

- array of `[x, y]` pairs in tenths of map units

Meaning:

| DP | Meaning |
| --- | --- |
| `98` | restricted-area-related suspected points |
| `100` | threshold suspected points |
| `103` | cliff suspected points |

## Appendix D: Reference tests

This document is the written specification. The executable reference is in the fixtures and regression tests.

Useful reference files:

- `q10RepresentativeFixture.ts`
- `q10FixtureDefaults.ts`
- `q10TestSupport.ts`
- `q10_b01_map.test.ts`
- `room_name_normalizer.test.ts`
- `b01_map_payload_classifier.test.ts`
- `b01_research_maps_regression.test.ts`

These tests cover:

- sample decrypt / parse / render
- canonical header expectations
- same-`mapId` runtime merge
- unsolicited live `301` handling
- DP patch application from `55`, `57`, `65`, `98`, `100`, and `103`
- virtual wall decode / render behavior
- material / grout rendering behavior
- room-name normalization

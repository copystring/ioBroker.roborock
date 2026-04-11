# Q10 / B01 Map Pipeline

## Scope

This document describes how the Roborock Q10 (`roborock.vacuum.ss09`) map pipeline works in the original app and how this adapter reproduces it.

It is intended as implementation documentation, not user documentation. The goal is that another implementation in a different language can rebuild the same map behavior without reverse-engineering the app again.

If you are implementing this from scratch, read this document in this order:

1. `Core model`
2. `Request sequence used by the original app`
3. `Blob types on protocol 301`
4. `Live map processing`
5. `DP overlay payload formats`
6. `Coordinate transforms`
7. `Rendering stages`
8. `Room name handling`
9. `Minimum implementation checklist`

## Pipeline at a glance

The Q10/B01 map pipeline can be reproduced with this exact high-level algorithm:

1. request the live-map cycle and map-related DPs in the same order as the original app
2. decrypt incoming `301` payloads and route them by blob type (`1/2/3/4`)
3. parse live type-`1` rasters into a mutable runtime `mapModel`
4. if the incoming live raster has the same `mapId` as the current live map, merge retained runtime fields into it
5. parse DP updates (`55/57/65/98/100/103`) and patch the current live `mapModel` in place
6. keep history/record maps separate from the live `mapModel`
7. normalize room labels
8. render the final bitmap and frontend overlays from that normalized runtime model

The key implementation rule is:

- the visible map is not built from one payload
- it is built from one live runtime model keyed by the active `mapId`

Related implementation files in this repository:

- `Q10VacuumFeatures.ts`
- `Q10ShadowDataService.ts`
- `B01MapService.ts`
- `MapManager.ts`
- `Q10YxMapParser.ts`
- `Q10MapCreator.ts`
- `Q10OverlaySanitizer.ts`
- `map.ts`

Primary reverse-engineered app modules:

- `module_1131.js`
- `module_940.js`
- `module_970.js`
- `module_973.js`
- `module_981.js`
- `module_1427.js`

## Core model

The original app does **not** treat the Q10 map as one self-contained image payload.

It keeps a runtime `mapModel` for the active `mapId` and mutates that model from multiple sources:

1. a fresh map raster (`301`, blob type `1`)
2. path blobs (`301`, blob type `2`)
3. clean-record detail blobs (`301`, blob type `3`)
4. multi-map detail blobs (`301`, blob type `4`)
5. DP updates carrying overlays and metadata (`55`, `57`, `59`, `65`, `98`, `100`, `103`, plus status DPs)

That behavior is visible in `module_970.js`.

## Request sequence used by the original app

On page open / app foreground, the original app triggers the following sequence from `module_1131.js` via `module_940.js`:

1. `requestMapAndPathData()`
2. `loadShadowDps()`
3. `requestAllDps()` (`101.102`)
4. `requestMultiMapList()` (`101.61.list`)
5. `requestCleanRecordList()` (`101.52.list`)
6. `getCarpetList()` (`101.64.list`)

Additionally, the app primes the live stream before the heartbeat / live request cycle with:

- `101.75 = 0`
- `101.16 = 1`
- `101.107 = 0`
- `101.110 = 1`

The adapter mirrors this in `Q10VacuumFeatures.ts`.

## Relevant DPs

The Q10 DP table is defined in the original plugin in `module_981.js`.

Important map-related DPs:

- `16`: map/path request trigger
- `52`: clean record list / clean record select
- `55`: restricted zones update
- `57`: virtual walls update
- `59`: zoned areas update
- `61`: multi-map list
- `64`: carpet request
- `65`: carpet polygons
- `75`: DND request / map stream priming write
- `98`: restricted-area-related points
- `100`: suspected threshold points
- `103`: cliff restricted points
- `110`: heartbeat / live map cycle trigger

## Blob types on protocol 301

After transport decryption, the Q10 app distinguishes blob types:

- type `1`: live map raster
- type `2`: path data
- type `3`: clean record detail
- type `4`: multi-map detail

This routing is handled by the original app in `deviceBlobChanged` inside `module_970.js`.

The adapter mirrors this split in:

- `mqttApi.ts`
- `MapManager.ts`
- `Q10YxMapParser.ts`

## Live map processing

### 1. Parse the fresh raster map

The live `301` type `1` payload contains:

- header
- map dimensions
- origin / resolution
- charger coordinates
- pixel raster
- embedded room metadata block (`roomData1`) for version `!= 0`
- obstacle / skip-clean / erase / carpet-raster related payloads depending on map version

This is implemented in `Q10YxMapParser.ts`.

Important parsing details:

- the canonical live-map header starts at byte offset `+1`
- the canonical app parser reads all multi-byte header fields as big-endian
- header fields map as:
  - `mapId`
  - `width`
  - `height`
  - `ox`
  - `oy`
  - `resolution`
  - `chargeX`
  - `chargeY`
  - `chargePhi`
  - `pixLen`
  - `pixLzLen`
- world-space header bounds are reconstructed as:
  - `minX = ox / 10`
  - `maxY = oy / 10`
  - `minY = maxY - height * resolution`
  - `maxX = minX + width * resolution`
- device-relative overlay coordinates use the app transform:
  - `x = xMin + deviceX`
  - `y = yMin - deviceY`
- charger/device pose is stored twice:
  - as world coordinates for generic B01 consumers
  - as device-relative `chargePosition` for Q10 overlay conversion
- `roomData1` is embedded immediately after the pixel payload
- `roomNameDataStr` is a 20-byte raw field
- room names are decoded as:
  - first byte = name length
  - following bytes = UTF-8 string
  - retry with shorter lengths until decoding yields a non-empty string

### Canonical live header layout

After stripping the leading blob-type byte for map blobs `1`, `3`, `4`, the canonical Q10 header is 28 bytes:

1. byte `0`: `version`
2. bytes `1..4`: `mapId` (`u32`, big-endian)
3. byte `5`: `type` / map stability flag
4. bytes `6..7`: `width` (`u16`, big-endian)
5. bytes `8..9`: `height` (`u16`, big-endian)
6. bytes `10..11`: `ox` (`u16`, big-endian, divide by `10`)
7. bytes `12..13`: `oy` (`u16`, big-endian, divide by `10`)
8. bytes `14..15`: `resolution` (`u16`, big-endian, divide by `100`)
9. bytes `16..17`: `chargeX` (`u16`, big-endian)
10. bytes `18..19`: `chargeY` (`u16`, big-endian)
11. bytes `20..21`: `chargePhi` (`u16`, big-endian, `0xffff -> 0`)
12. bytes `22..25`: `pixLen` (`u32`, big-endian)
13. bytes `26..27`: `pixLzLen` (`u16`, big-endian)

Canonical original parsing rules:

- unwrap blob byte only for `1`, `3`, `4`
- parse header at offset `0`
- reject payloads where `pixStart + pixLen/pixLzLen` would exceed the buffer
- do not probe alternative endianness / offsets in the normal path

### Pixel payload semantics

The original parser supports these observed pixel encodings:

- version `0`
  - packed 2-bit pixels
  - `00 -> floor`
  - `01 -> wall`
  - other values treated as background / unknown
- version `1`
  - 1 byte per pixel
  - high bits encode room id
  - low bits encode point type
- version `2`
  - room/material variant
  - high 5 bits encode room id
  - low 3 bits encode point type
- version `3`
  - same live-grid semantics as version `1`

The grid consumer must preserve at least:

- room/floor cells
- wall cells
- outside/background cells

### `roomData1` layout

Immediately after the pixel payload, the original parser reads the room metadata block:

1. byte `0`: region block id / unused
2. byte `1`: room count
3. for each room:
   - 26-byte property block
   - 20-byte `roomNameDataStr`
   - 1-byte `verticesNum`
   - `verticesNum * 4` bytes of room polygon vertices (`int16 BE x,y`)

The currently relevant property fields inside the 26-byte room property block are:

- `roomID` (`u16 BE`)
- `roomType`
- `cleanOrder` (`u16 BE`, `0xffff -> -1`)
- `cleanCount` (`u16 BE`)
- `cleanType` (`0xff -> -1`)
- `funLevel` (`0xff -> -1`)
- `waterLevel` (`0xff -> -1`)
- `roomMaterial`
- `cleanLine`

The original app currently uses the embedded vertices less than the raster-derived room borders. For rendering parity, raster-derived room borders are sufficient.

### Trailing blocks after the room data

After `roomData1`, the original parser can consume several trailing map blocks:

- erase areas
  - 1-byte area count
  - if count > 0:
    - 1-byte `vertsPerPoly`
    - then `count * vertsPerPoly * 4` bytes (`int16 BE x,y`, divide by `10`)
- carpet raster
  - `pixLen` (`u32 BE`)
  - `pixLzLen` (`u16 BE`)
  - then raw or LZ4 carpet grid
- further version-specific blocks:
  - obstacles
  - skip-clean markers
  - additional suspected-point blocks depending on payload shape

For parity, the implementation must preserve these blocks on the same runtime map model instead of treating them as unrelated payloads.

Adapter-only compatibility logic:

- the adapter probes additional header candidates beyond the canonical `offset +1 / big-endian` path
- these extra candidates exist only to survive malformed or variant captures
- they are not part of the original app's primary parsing logic

### 2. Keep runtime state per active map

This is the critical behavior that made the map finally match the original app.

When a new live raster arrives for the same `mapId`, the original app does **not** discard already known runtime data. It reuses:

- path points
- virtual walls
- forbidden areas
- mop areas
- threshold areas
- carpet polygons
- suspected points
- temporary room color plans

The adapter mirrors that in:

- `MapManager.ts`
- `Q10YxMapParser.ts`

Implementation rule:

- only merge runtime state when the new live map belongs to the **same `mapId`**
- never seed live maps from history maps
- never carry path/overlay state across different `mapId`s

Exact fields that must be retained on same-`mapId` live refresh:

- `pathPoints`
- `virtualWalls`
- `forbidAreas`
- `mopAreas`
- `thresholdAreas`
- `carpetAreas`
- `suspectedPoints`
- temporary room color plan state used for room-color continuity

That merge is the difference between a merely decoded raster and a map that behaves like the app.

That is why idle maps now still show paths and virtual walls correctly, like the app.

### 3. Apply overlay/state patches from DP updates

The original app mutates the current map model directly when the relevant DPs arrive.

The adapter now does the same in `Q10ShadowDataService.ts` by parsing and applying:

- `55` -> restricted zones, mop zones, threshold areas
- `57` -> virtual walls
- `65` -> carpet polygons
- `98` -> easycard suspected points
- `100` -> threshold suspected points
- `103` -> cliff suspected points

Those patches are applied to the current live map via `MapManager.ts` rather than waiting for a future full raster.

This is the main reason the adapter now reproduces the app in the idle case.

### DP overlay payload formats

The essential DP payloads are:

#### `57` virtual walls

Binary format:

1. byte `0`: wall count
2. for each wall:
   - `x1` (`i16 BE`) / `10`
   - `y1` (`i16 BE`) / `10`
   - `x2` (`i16 BE`) / `10`
   - `y2` (`i16 BE`) / `10`

Each wall is a 2-point line segment in device-relative coordinates.

#### `55` restricted zones / mop zones / thresholds

Binary format:

1. byte `0`: block type / reserved
2. byte `1`: area count
3. for each area, 38 bytes:
   - byte `0`: `areaType`
     - `1` forbid area
     - `2` mop-forbidden area
     - `3` threshold area
   - byte `1`: reserved
   - bytes `2..17`: four points as `int16 BE x,y`, divide by `10`
   - byte `18`: name length
   - bytes `19..37`: UTF-8 name bytes

Areas are quadrilaterals in device-relative coordinates.

#### `65` carpet polygons

JSON payload:

- array of objects
- each object contains:
  - `id`
  - `vertexs`
  - optional carpet metadata

`vertexs` is an array of `[x, y]` pairs in tenths of map units. Divide by `10`.

#### `98`, `100`, `103` suspected points

JSON payload:

- array of `[x, y]` pairs in tenths of map units

Semantic mapping:

- `98` -> easycard / restricted-area-adjacent suspected points
- `100` -> threshold suspected points
- `103` -> cliff suspected points

### Coordinate transforms

The original app uses two distinct coordinate spaces:

1. device-relative overlay coordinates
2. map-array coordinates

Transform rules:

- device-relative to original map:
  - `x = xMin + deviceX`
  - `y = yMin - deviceY`
- map-array to image space:
  - `x = mapArrX * mapRate`
  - `y = mapArrY * mapRate`

This distinction is critical. Parsing overlay geometry correctly but applying the wrong transform will still produce visibly wrong walls, areas, paths or materials.

## History maps

History maps are not the source of live overlays anymore.

History blobs are still parsed and rendered for record inspection, but live maps must come from:

- current live raster
- current live runtime cache for the same `mapId`
- current DP overlay updates

This separation avoids path/wall contamination from old records.

## Rendering stages

### Backend creator

`Q10MapCreator.ts` converts parsed source data into render-ready geometry:

- room models
- borders
- room label center points
- clip-erase geometry
- obstacle overlays
- virtual walls
- forbidden / mop / threshold areas
- carpet polygons
- path geometry
- charger / robot pose

### Backend bitmap output

`Q10MapBuilder.ts` renders the PNG output.

Important render rules mirrored from the original app:

- base map is rendered from the room/wall grid
- material layer is rendered separately from material paths
- virtual walls are drawn as explicit line overlays, not inferred from forbidden polygons
- threshold areas use a repeated material tile with row shift
- self-identified carpet raster is rendered independently from manual carpet polygons

### Render layer order

The map must be rendered in this order for parity:

1. base map raster
2. room material layer
3. self-identified carpet raster or carpet grid
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

Changing this order causes visible divergence from the original app.

### Material rendering rules

The original app does not use a generic hatch fill for room materials.

Instead it generates explicit material path segments:

- ceramic tile
  - orthogonal grout grid
  - spacing `0.8m x 0.8m`
- horizontal floor boards
  - plank size `1.2m x 0.3m`
  - alternating vertical seam offsets by half-board
- vertical floor boards
  - plank size `0.3m x 1.2m`
  - alternating horizontal seam offsets by half-board

All generated segments are clipped against the current room mask / clip-erase map.

The original material draw pass then uses:

- `mapRate = floor(2000 / max(width, height))`, minimum `1`
- path transform:
  - `mapImageX = mapArrX * mapRate`
  - `mapImageY = mapArrY * mapRate`
- stroke color `419430400`
- stroke width `2`
- round joins
- round caps
- antialiasing enabled

If another renderer uses a different output scale, it must preserve the same effective visual width relative to that `mapRate`.

### Frontend overlay output

`map.ts` renders interactive overlays for:

- room labels
- zones
- wall handles
- path overlays
- obstacles

The backend and frontend now consume the same normalized room/overlay model.

## Overlay sanitizing

`Q10OverlaySanitizer.ts` removes obviously broken geometry without deleting valid overlays that cross the cropped map bounds.

Important constraint:

- a wall crossing the visible map must be kept even if both endpoints lie outside the cropped map rectangle

This was a real Q10 bug previously and caused valid walls to disappear.

## Room name handling

The original app distinguishes between:

1. custom room names stored directly in `roomNameDataStr`
2. generated placeholders like `room2`
3. internal room-type tokens such as:
   - `rr_living_room`
   - `rr_restaurant`
   - `rr_corridor`

The original plugin handles that in two separate places:

- `module_973.js`
  - `replaceRoomName(...)` rewrites placeholders like `room2` to the localized default-room prefix
- `module_1427.js`
  - `getSpecifiedName(...)` converts `rr_*` tokens to localized display names
  - `getDefaultName(...)` maps numeric `roomType` ids to their default localized names

Adapter behavior now mirrors that:

- custom names stay unchanged
- `roomN` becomes localized default-room placeholder such as `Raum2`
- `rr_*` tokens are converted to localized display strings before rendering and before writing room states
- if `roomName` is empty but `roomType` is known, the display name falls back to the default localized room type name

Implementation note:

- the original plugin resolves display names through `PluginString.map_edit_room_name_*`
- this adapter's shared translation bundle exposes the semantically equivalent room labels as `map_edit_zone_tag_*`
- the adapter therefore maps `rr_*` tokens to those `map_edit_zone_tag_*` keys for localized output
- if another implementation has direct access to the original plugin strings, it should prefer the exact `map_edit_room_name_*` keys

Implementation files:

- `roomNameNormalizer.ts`
- `Q10MapCreator.ts`
- `B01MapService.ts`

## Reference fixtures and tests

The documentation above is the conceptual specification. The executable reference is in the Q10 test fixtures and regression tests.

Use these files as the implementation companion:

- `q10RepresentativeFixture.ts`
  - embedded representative Q10 sample payload used across the parser/render tests
- `q10FixtureDefaults.ts`
  - fixture defaults for Q10 sample decoding
- `q10TestSupport.ts`
  - shared helpers for Q10 map test setup
- `q10_b01_map.test.ts`
  - end-to-end Q10 reference test file
  - covers sample decrypt/parse/render
  - canonical header expectations
  - same-`mapId` live runtime merge
  - unsolicited live `301` handling
  - DP patch application from `55/57/65/98/100/103`
  - virtual wall decode/render behavior
  - material/grout rendering expectations
- `room_name_normalizer.test.ts`
  - room-label precedence and normalization behavior
- `b01_map_payload_classifier.test.ts`
  - payload classification expectations for Q10 live-map blobs
- `b01_research_maps_regression.test.ts`
  - regression coverage for real research/reverse-engineering captures

If another implementation diverges from the rendered result or parsed structure, these tests should be treated as the source of truth for the currently reproduced Q10/B01 behavior.

## Minimum implementation checklist

If another project wants to reproduce Q10 map behavior, it must do all of the following:

1. decrypt and parse live `301` map rasters
2. distinguish blob types `1/2/3/4`
3. parse room metadata from `roomData1`
4. parse the trailing erase/carpet/obstacle blocks after the pixel payload
5. maintain a runtime map cache per active `mapId`
6. merge fresh rasters with cached runtime data only when `mapId` matches
7. parse and apply DP overlays from `55/57/65/98/100/103`
8. keep history processing separate from live-map state
9. render room materials from explicit material path segments rather than a generic hatch
10. render layers in the same order as the original app
11. normalize room labels with the same precedence as the app:
   custom string -> `rr_*` token -> `roomN` placeholder -> `roomType` fallback
12. sanitize impossible geometry without deleting valid map-crossing walls

If any of those steps is skipped, the resulting map will diverge from the original app in visible ways.

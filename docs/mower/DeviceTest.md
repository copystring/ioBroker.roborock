# RockMow S108 device validation

This guide validates the source-derived implementation on `roborock.mower.a266`. Use the exact commit URL supplied with the test build so results refer to one reproducible version.

## Discovery and read-only checks

1. Restart with debug logging. Confirm the S108 creates `Devices.<id>.mowerCommands` and `mowerStatus`, alongside its device metadata.
2. Confirm the Saros 20 still updates its status/map and its normal commands work. The S108 must not receive vacuum `get_status`, consumable or scene requests.
3. With the S108 online, write `true` to `mowerCommands.refresh`. The button resets to `false`; that confirms ingestion of the button event. A subsequent mower status message is required to confirm device data.
4. Compare `mowerStatus.battery`, `detailState`, `workingState`, `chargeState` and the error categories with the official app. Missing status values remain unset; an RPC acknowledgement alone must not populate them.
5. During mowing, compare `mowingProgress` (%), `totalArea`/`mowedArea` (m²), `expectedDuration`/`remainingTime` (seconds) with the app. `batteryBroadcast` holds the separate battery event; it has a different update stream from regular `battery`.

## Rainfall configuration

Write `true` to `mowerCommands.refreshSettings` and compare `mowerStatus.rainEnabled` and `rainDelayHours` with the app. Save those original values before testing a change.

Write a JSON string to `mowerCommands.setRainfall`, for example `{"enable":true,"delayHours":3}`. Supported delay values are 0, 3 and 8 hours. Zero means immediate resumption, independently of enable/disable. The input clears after ingestion; a separate settings query follows the command acknowledgement. Only the actual USER_MODE_CONFIG response changes the read-only rainfall values. Verify the app's setting and then restore the saved original values with another complete JSON input.

## Not-disturb configuration

Read the original `dndEnabled` and `dndWindows` via `refreshSettings`. Write a JSON string such as `{"enable":true,"start":"19:00","end":"07:00"}` to `mowerCommands.setNotDisturb`. A single interval is supported, using the clock values shown by the app, in five-minute steps; 24:00 normalizes to 00:00. No timezone conversion is applied. Verify the queried readback and the app, then restore the original configuration. An empty/missing device window does not mean the app's display fallback 19:00–07:00 is configured.

## Movement commands

Use the mower's normal operating conditions and observe each action before proceeding:

| Button (write `true`) | Expected device action |
| --- | --- |
| `start` | Start global mowing |
| `pause` | Pause mowing |
| `resume` | Continue mowing |
| `stop` | End mowing |
| `charge` | Return to charger |

Buttons acknowledge input immediately. They do not report completion. The next status messages and physical action determine the outcome. Do not repeat a movement command merely because its acknowledgement timed out: a lost acknowledgement does not prove the command was not executed.

## Lifecycle checks

- While the mower is offline, a button must not send a queued command that executes on reconnection.
- After reconnection, `refresh` should work again; old acknowledgements must not resolve new requests.
- Restarting/stopping the adapter must cancel outstanding requests. A mower state must never be written under the vacuum's status objects.

## Report

Provide the exact test commit, mower firmware, which step failed, whether the physical action happened, the relevant state values, and the debug log from startup through that step. Mask credentials, local keys, account/device IDs, MQTT topics, network addresses and serial numbers consistently. Do not upload raw HomeData or raw shadow bodies.

Local source-fixture and encrypted-frame tests are not hardware verification. Native BLE/map services and full app feature parity remain separate integration gates.

## Extended read-only checks

Write `true` to `refreshSchedules`, `refreshTimeZone`, `refreshCuttingHeight` and `refreshMapNames` separately. Compare `schedules`, `robotTimeZone`, `cuttingHeightMin`, `cuttingHeightMax`, `cuttingHeightStep`, `cuttingHeight`, `areaCuttingHeights` and `mapNames` with the official app. An ACK alone must not populate them. An empty confirmed schedule list is valid; missing data remains unknown. Height values describe configuration preferences, not measured motor position.

The default adapter reports `bluetoothAvailable=false` and `mapDownloadAvailable=false`. Its height setter, map refresh and selected-area/edge commands are not writable until an actual native service is implemented. Device testing of cloud status cannot make those services available.

## Weekly schedule changes

Save the original schedule list and device time zone before testing changes. Use a new unique uint32 plan ID. `createSchedule` and `changeSchedule` accept complete JSON plans; the format and numeric enums are documented in [SourceContract.md](SourceContract.md). Start/end are Unix **seconds** encoded as strings, weekdays 0=Sunday through 6=Saturday, duration 15 minutes through 24 hours. Choose future clock values in the device's time zone; an overnight end must be on the next day. Start with a disabled global plan (`status:2`) and compare all fields in the app and the subsequent readback before enabling anything.

`deleteSchedule` accepts `{"id":<existing ID>}`. Delete only the temporary test plan and confirm its absence in the app and queried list. `deleteAllSchedules` is a separate destructive operation: it is implemented but is not required for the first hardware test. Restore the original configuration after testing. Active overlaps or unknown active schedule forms must reject changes, and reconnect must not replay canceled operations.

Area plans and `mowAreas`/`mowEdges` require a native service providing the actual active map. When available, test that a replaced/deleted area cannot reuse an old selection. A failed map refresh must clear `currentMap`, `mapData` and `mowingAreas`. Cutting-height writes require connected BLE and device-confirmed min/max/step; confirm the independent preference readback and app before interpreting the change as successful.

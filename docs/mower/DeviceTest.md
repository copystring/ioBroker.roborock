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

Local source-fixture and encrypted-frame tests are not hardware verification. Areas, maps, schedules and full app feature parity require separate contracts and tests.

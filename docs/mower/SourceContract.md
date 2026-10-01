# RockMow S108 source contract

This branch attaches an independent mower runtime to discovery, MQTT, polling and writable ioBroker buttons for `roborock.mower.a266` with L01/1.0 transport. It creates `mowerCommands` (start, pause, resume, stop, charge, refresh) and read-only `mowerStatus` objects. Vacuum consumables, maps and scenes remain outside this runtime.

## Source provenance

- Original manufacturer bundle: RockMow S1, archive `4f8e0b8d120348a89ac8c4d8622b8b94`, Hermes bytecode version 96.
- Bundle SHA256: `bc0ed5cd5df54b131a5c07f2527e794e4429765972ea1bceff7f6a910f5c354a`.
- APK: `com.roborock.smart` 4.54.02, version code 100820.
- Bundle metadata explicitly maps `a266` to `butchart_pro` / `butchartpro`, under `com.roborock.mower`.
- Source locations below refer to the locally derived `rockmow.decompiled.js`; proprietary bundles and decompiled files are not committed.

## RemoteMsg requests

The common button builder creates a RemoteMsg with `id=Date.now()`, type `APP_BUTTON`, and scalar `app_button` (lines 738194–738212). `RemoteMsg.toJSON()` uses protobufjs `toJSONOptions`: long integers, enums and bytes become strings; defaults are omitted (268284–268301, 574346–574355). Consequently the IoT JSON request is:

```json
{"id":"1700000000123","type":"APP_BUTTON","app_button":"MOW_GLOBAL"}
```

| Session command | JSON app_button | Enum value |
| --- | --- | --- |
| start | MOW_GLOBAL | 14 |
| pause | MOW_PAUSE | 20 |
| resume | MOW_RESUME | 22 |
| stop | MOW_END | 24 |
| charge | CHARGE | 5 |

These are the actual UI calls at 740032–740231 and enum definitions at 247517–247596. Status requests use `{"id":"<milliseconds>","type":"GET_ROBOT_INFO"}` (738440–738495). Their enum values are APP_BUTTON=6 and GET_ROBOT_INFO=66.

The prepared session uses increasing timestamp ids to prevent duplicate ids for requests in one millisecond. No vacuum method or parameter conversion is applied.

The optional binary codec projects only source-proven fields: RemoteMsg id=1/uint64, type=2/int32 and app_button=5/int32 (252641–252757); RobotMsg id=1/uint64, type=2/int32, battery=10/message and hardware=13/message (448082–448402); HardwareMsg battery=1/message (504959–504986); Battery percent=2/uint32 (327379–327397). This encodes the inner RemoteMsg, not the SDK's outer protobuf RPC envelope. Unknown decoded fields are skipped and missing fields remain absent.

## Transport and response ownership

For the IoT command channel, the plugin calls `callMethod('remote_pb', remoteMsg.toJSON())` (738235–738337). APK `react/o00O00OO.java:562–589` creates a second, independent JSON RPC envelope `{id,method,params}`. `react/o00oOoo.java:63–82` serializes it under DP 101. DP 102 responses are matched by RPC id and returned as the complete response object (`o00O00OO.java:187–221`).

The prepared transport additionally matches the device id. It registers before publishing, clears pending requests on response, error, timeout, session cancellation and shutdown, and never automatically retries a movement command after a lost acknowledgement. Session closure or timeout also prevents a frame from being published after asynchronous encoding finishes. Device classification, supported protocol and broker connection are checked again before publication.

An RPC acknowledgement is not a mower status change. The prepared session never updates battery or activity optimistically after an acknowledgement.

The original bundle also supports a protobuf command channel. Selection depends on SDK capabilities and stored `mower_api_data_struct` / `mower_api_strategy`; it is not fixed solely by model a266. The initial API strategy is LAN_BLE_FIRST. The JSON path above is a supported source contract, not evidence that it is the default path on the reporter's installation.

The concrete APK SDK implementation (`o00oo0OO/o0000O.java:69–72`, `o000OO.java:204–226`, `internal/common/mqtt/OooO0OO.java:64–87`, `o00oo0o/o0000Ooo.java:32–33`) normalizes L01 to MQTT frame version `1.0` for JSON publishing. It wraps DP 101 in `PublishBean1_0{dps,t}` (`OooOo00.java:151–168`) and uses the device key with native `RRCodecApi.codec` for encryption/decryption. Thus the prepared cloud transport uses the existing adapter 1.0 encoder without TCP L01 handshake nonces. A local encrypted frame round trip verifies adapter composition; equivalence of the native cipher on the S108 is still a hardware validation point.

## RobotMsg status

The plugin decodes a RobotMsg and emits `OnReceiveRobotMessage`. ROBOT_STATUS_UPDATE has enum value 38. The UI accepts only increasing RobotMsg ids (758800–758853). Battery comes from `hardware.battery.percent` (759841–759903).

`MowerStatusStore` accepts decoded status objects, isolates each device, compares decimal ids without losing integer precision and publishes only validated known fields. Missing battery values preserve the previous reading. It does not interpret vacuum HomeData keys or DP 102 acknowledgements as mower status.

The APK's protobuf push event uses MQTT protocol 702. Decrypted payload starts with ASCII `PB`, then RobotToAppMsg: t=1/int64, dp=2/string, id=3/int32, type=4/enum, result=5/bytes. The SDK emits result as Base64 in `RRDeviceDpsPbUpdateEvent`; the bundle decodes those bytes as RobotMsg. The runtime extracts result independently of the outer RPC id/type. This container never resolves pending JSON commands.

The JSON listener parses the first DP value as JSON and then its string `result` as RobotMsg JSON. The runtime follows this convention without assuming a fixed status DP. DP 102 RPC acknowledgements remain separate from status acceptance.

Activity comes from RobotMsg `robot_task` (71), RobotTask `working_state` (1) / `robot_detail_state` (2), and RobotMsg `fsm_charge_state` (19). Source-derived RobotDetailStateType/FsmStateType symbols supply ioBroker labels; unknown numeric states are preserved. Errors come from `fsm_errors` (46), `user_errors` (52), `scheduler_errors` (62), and `charge_errors` (63). CheckResults retains separate ignorable, recoverable, unrecoverable, critical, to_dock and debounce arrays, rather than using vacuum error codes.

Publication is serialized per device. Removed, reclassified or stopped sessions cannot publish subsequent fields or send pending commands. Offline devices and broker disconnects cancel pending requests; asynchronous encoding rechecks identity, online state, protocol and connection before publication.

## HTTP IoT

Shadow is read through `GET devices/<deviceId>/shadow` (741369–741426). The APK IoT interceptor signs the decoded path, canonical query and request body in separate digest slots. The prepared HTTP implementation follows that central contract and prevents Axios from changing signed body bytes. `getDeviceShadow` accepts only a known device and returns the unchanged response body; it is not automatically polled. No shadow response structure is inferred from vacuum data.

## Extended status and rainfall configuration

`RobotMsg.mow_progress` is field 29: `mow_all_area` field 9/float (m²), `expected_time` field 10/float (seconds), `cur_mow_progress` field 11/float (percent). The UI projection uses these first, with fallback to `RobotMsg.navigation` field 12 → `nav_task_progress` field 15: `percentage` field 6/float or `percent` field 3/uint32, `area` field 4/float and `expected_time` field 7/float (448742–448768, 275200–275267, 448348–448374, 499002–499030, 493341–493455, 762932–763086).

The progress helper supports navigation fallback, but its actual UI caller first converts missing/invalid mowing progress to 0 via `standardNumber`, making that branch unreachable (760103–760136, 765881–765908). The adapter preserves missing mowing progress and publishes `navigationProgress` separately; it does not treat navigation progress as mowing progress. Area and duration use the reachable source fallback.

The runtime exposes progress, total task area and expected duration. The UI calculates the mowed area as `ceil(totalArea * progress / 100)` and remaining seconds as `expectedDuration * (100 - progress) / 100` (773380–773472). Derived values require valid inputs from the same message, so a partial update cannot combine progress from one task with retained area from another. Missing/invalid raw readings preserve prior readings rather than pretending to be zero. Previously published derived values become unknown (`null`) when the current message lacks their inputs.

`BATTERY_PERCENT=79` takes `hardware.battery.percent` without an ID gate (758735–758797). It is published separately as `batteryBroadcast`. The app overrides its ordinary battery display for two UI projections; these also depend on maps, feature information and Bluetooth state (759635–759659, 759841–759903). That UI heuristic is not treated as a two-status-frame or timed device contract.

Rain configuration uses `RemoteMsg{type:SET_RAINFALL,rainfall_config:{enable,delay_time}}`; SET_RAINFALL=28, GET_USER_MODE_CONFIG=29 (743632–743748, 268432–268439). The command accepts an atomic `{enable:boolean,delayHours:0|3|8}` input, matching the app's immediate/3-hour/8-hour strategies; enabled with zero hours is valid (1102870–1102933, 1103157–1103168). On the wire, rainfall_config is RemoteMsg field 18; RainFall enable=2/bool and delay_time=3/float (253079–253105, 342453–342491).

Readback is `RobotMsg.Type.USER_MODE_CONFIG=25`, `user_mode_config` field 34 → `rainfall_config` field 1 (486090–486093, 448886–448912, 437939–437966). The app reads it without a status-ID freshness gate. A present RainFall container has proto3 defaults enable=false/delay_time=0; a missing container stays unknown (342395–342403, 437895–437899, 1102339–1102410). Validated readback is published independently of the command ACK. After setting, the runtime queries settings; `refreshSettings` can also request them explicitly. Correlated RPC results accept the decoded RobotMsg object or its JSON string, while a plain ACK does not change settings.

## Remaining integration gates

1. Confirm the existing adapter 1.0 codec against an S108 response. The APK establishes the cloud version, header and key contract; the cipher implementation is behind native `rrcodec` and the prepared composition has only been exercised locally.
2. Verify the supported JSON `remote_pb` path and status delivery on the reporter's S108. Local integration tests exercise discovery, actual adapter button dispatch, encrypted protocol 101 publication, independent protocol 102 acknowledgement and protocol 702 status reception, plus offline/reclassification/shutdown paths.
3. Verify activity and categorized errors against the physical device. Source-derived fields, labels and fixed wire fixtures do not substitute for device validation.
4. Maps, area selection, schedules and full app feature parity are not implemented. The cutting-height builder explicitly uses BLE, so its command is not exposed through the prepared cloud path (742258–742380). Separate battery broadcasts are available, but the app's UI override heuristic is not copied.

Hardware tests confirm the source-derived implementation; logs do not serve as command discovery. The original routing-fix test PR is separate from this runtime branch.

### Binary outbound route: documented partial contract

The bundle's `sendProtobufMessage` encodes RemoteMsg and passes it to native `callMethodPb` (206715–206795). APK `PluginSDKModule.java:2132–2159,2177–2211` puts those bytes in AppToRobotMsg.method and assigns a separate outer callMarkId. AppToRobotMsg fields are t=1/int64, dp=2/string, id=3/int32, endpoint=4/string, nonce=5/string, method=6/bytes. The cloud publisher uses protocol 701, ASCII `PB` before this envelope, current seconds, and L01 normalized to 1.0 (`internal/common/mqtt/OooO0OO.java:89–114`, `o00oo0o/o00000OO.java:9–19`, `o00oo0o/o0000Ooo.java:32–77`). Incoming outer RPC type/id correlates the result bytes independently of RemoteMsg.id (`react/o00O00OO.java:150–184`).

The SDK bridge between `IDevice.publishDpsPbMqtt` and that publisher is incompletely decompiled. How it supplies dp/endpoint/nonce, frame counters and the concrete key is not fully established. These partial facts are not used to activate a speculative protocol-701 path. JSON DP101 `remote_pb` remains the active source-proven alternative. Proprietary APK/bundle/decompiled files are excluded from the repository.

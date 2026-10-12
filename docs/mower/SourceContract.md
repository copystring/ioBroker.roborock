# RockMow S108 source contract

This branch attaches an independent mower runtime to discovery, MQTT, polling and writable ioBroker buttons for `roborock.mower.a266` with L01/1.0 transport. It creates `mowerCommands` (start, pause, resume, stop, charge, refresh) and read-only `mowerStatus` objects. Vacuum consumables, maps and scenes remain outside this runtime.

## Source provenance

- Original manufacturer bundle: RockMow S1, archive `4f8e0b8d120348a89ac8c4d8622b8b94`, Hermes bytecode version 96.
- Bundle SHA256: `bc0ed5cd5df54b131a5c07f2527e794e4429765972ea1bceff7f6a910f5c354a`.
- APK: `com.roborock.smart` 4.54.02, version code 100820.
- Original APK SHA256: `97c322339984cb799ef1ed1cd3f845c3d2673fcd70598307142d1a8dd2ed8595`; the matching local archive is available for targeted DEX verification of incomplete Java decompilation.
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

## Not-disturb interval

SET_NOT_DISTURB=27 builds `not_disturb_config{enable,time:[{start:{hour,minute},end:{hour,minute}}]}` (743811–743903). The UI sends a single HH:MM-HH:MM interval (1059290–1059312) and its picker offers five-minute steps from 00:00 to 24:00, normalizing 24:00 to 00:00 (1059801–1059833, 1059995–1060036). Its displayed fallback 19:00–07:00 establishes an overnight interval; that UI fallback is not a reported device setting (1059169–1059177). The source sends plain clock components without a date or offset. The adapter follows that clock representation without inventing a timezone conversion, equality restriction or maximum duration.

The atomic `setNotDisturb` JSON input is `{enable:boolean,start:"HH:MM",end:"HH:MM"}`. RemoteMsg.not_disturb_config is field 17, UserModeConfig.not_disturb_config field 2; NotDisturb.enable is field 1/bool and time field 2/repeated TimeSlot. TimeSlot.start/end are fields 1/2; TimePoint.hour/minute fields 1/2/uint32. Present NotDisturb defaults are enable=false and time=[] (343031–343044); present TimePoint defaults hour=0/minute=0 (341454–341459). Missing containers are not converted into a fabricated 19:00–07:00 window. USER_MODE_CONFIG readback publishes `dndEnabled` and `dndWindows`; malformed explicit windows preserve previous readback. The shared post-command settings query follows the ACK.

## Remaining integration gates

1. Confirm the existing adapter 1.0 codec against an S108 response. The APK establishes the cloud version, header and key contract; the cipher implementation is behind native `rrcodec` and the prepared composition has only been exercised locally.
2. Verify the supported JSON `remote_pb` path and status delivery on the reporter's S108. Local integration tests exercise discovery, actual adapter button dispatch, encrypted protocol 101 publication, independent protocol 102 acknowledgement and protocol 702 status reception, plus offline/reclassification/shutdown paths.
3. Verify activity and categorized errors against the physical device. Source-derived fields, labels and fixed wire fixtures do not substitute for device validation.
4. Validate the weekly schedule commands and height/map-name readbacks. Map download and cutting-height changes additionally require the native service implementations described below. Separate battery broadcasts are available, but the app's UI override heuristic is not copied.

Hardware tests confirm the source-derived implementation; logs do not serve as command discovery. The original routing-fix test PR is separate from this runtime branch.

### Binary outbound route: documented partial contract

The bundle's `sendProtobufMessage` encodes RemoteMsg and passes it to native `callMethodPb` (206715–206795). APK `PluginSDKModule.java:2132–2159,2177–2211` puts those bytes in AppToRobotMsg.method and assigns a separate outer callMarkId. AppToRobotMsg fields are t=1/int64, dp=2/string, id=3/int32, endpoint=4/string, nonce=5/string, method=6/bytes. The cloud publisher uses protocol 701, ASCII `PB` before this envelope, current seconds, and L01 normalized to 1.0 (`internal/common/mqtt/OooO0OO.java:89–114`, `o00oo0o/o00000OO.java:9–19`, `o00oo0o/o0000Ooo.java:32–77`). Incoming outer RPC type/id correlates the result bytes independently of RemoteMsg.id (`react/o00O00OO.java:150–184`).

The prepared binary encoder builds that source-proven `PB` envelope with explicit correlation ID, endpoint and nonce, plus optional timestamp/dp; it does not infer keys or connect a transport. The native map caller sets endpoint/nonce/id/method and leaves t/dp unset (`react/o00O00OO.java:433–476`). Field assignment is established; a functioning adapter still needs transfer registration, per-request key/endpoint ownership, protocol-701 publication and protocol-301 routing/cancellation. This wiring is not active. JSON DP101 `remote_pb` remains the active source-proven alternative. The active cloud transport centrally rejects BLE-only REMOTE_CMD and native blob GET_FULL_MAP requests. Proprietary APK/bundle/decompiled files are excluded from the repository.

## Weekly schedules

The runtime exposes `refreshSchedules`, `refreshTimeZone`, `createSchedule`, `changeSchedule`, `deleteSchedule` and `deleteAllSchedules`. Requests use CREATE_MOWING_PLAN=36, CHANGE_MOWING_PLAN=37, DELETE_MOWING_PLAN=38, GET_MOW_SCHEDULE=39, DELETE_MOW_SCHEDULE=40 and GET_ROBOT_TIME_ZONE=41 (745140–745397). RemoteMsg.mowing_plan is field 21; RobotMsg.mow_schedule is field 41 and time_zone field 42. Response types are MOW_SCHEDULE=34 and ROBOT_TIME_ZONE=35.

Create/change accept a complete atomic weekly plan in source field names. `start` and `end` are decimal strings containing Unix **seconds**, with a positive duration from 15 minutes through 24 hours. Overnight end timestamps must refer to the following day. Days use 0=Sunday through 6=Saturday. The plan ID is a client-supplied uint32; create rejects existing IDs. The supported combinations are global mowing (fsm_state=18, mode=1, config.mode=1, global preferences) and selected areas (fsm_state=20, mode=2, config.mode=2, custom preferences with area_id). The original editor does not support edge schedules, so fsm_state=19 is rejected.

Example global weekly plan (timestamps illustrate the wire representation; choose actual dates/times for the device):

```json
{"id":11,"type":2,"status":1,"start":"1609495200","end":"1609498800","days":[{"type":1}],"mode":1,"config":{"mode":1,"global":{"height":50}},"fsm_state":18}
```

Type 2 is weekly, status 1 is enabled and status 2 disabled. Preference fields are `mow_times`, `effective`, `direction`, `height`, `keep_edge`, `area_name`, `area_id`, `mode` and `direction_type`. Values in this low-level interface use numeric source enums. Readback preserves unknown fields and can contain symbolic enums from manufacturer JSON. Do not assume copying that JSON unchanged forms a validated write request.

Every mutation is serialized and reads a fresh device list first. Create/change also read current mowing preferences and preserve existing preference fields when applying explicit overrides; edit uses the existing plan as the preferred base. A partial preference without a confirmed base is rejected. Changed height values are checked against fresh device min/max/step. This prevents a height-only input from defaulting unrelated preferences. The schedule UI itself reads the same HEIGHT_MOTOR_PARAMETER (1222085–1222139); its `fulfillMowingPlan` selects existing global/custom preference messages (1222409–1222661).

Active plans are checked for overlapping weekly intervals using the device's confirmed time zone, including midnight/week transitions. Unknown active plan forms stop the mutation rather than silently allowing overlap. Area plans additionally validate IDs against a freshly acquired current map. Command ACK and semantic readback are separate: after mutation the runtime queries again; a missing/failed response leaves the last confirmed snapshot unchanged. Disconnect/shutdown abort both pending semantic waits and queued mutations, with no replay on reconnect. A present empty schedule container means a confirmed empty list; an absent container does not.

## Cutting height

GET_HEIGHT_MOTOR_PARAMETER=34 returns RobotMsg.HEIGHT_MOTOR_PARAMETER=30, field 39, with uint32 `max=1`, `min=2`, `step=3` (738946–738970). GET_MOW_PREFERENCE_CONFIG=26 returns MOW_PREFERENCE_CONFIG=24, field 33, containing global/custom MowPreference values (744220–744244). `refreshCuttingHeight` exposes device bounds in mm and confirmed global/area targets. No hardcoded S108 range is assumed, and a present preference without a global value clears the global target instead of retaining an obsolete value. These are preferences, not a measured physical cutter position.

The original setter uses **Bluetooth**: RemoteMsg.REMOTE_CMD=17, remote_cmd field 13, RemoteCmd.type=MAIN_CUTTER_HEIGHT=3, main_cutter_height field 5 (742258–742380). The prepared port requires a genuinely connected BLE provider, validates bounds and step, passes session cancellation and requests independent preference readback afterwards. A successful BLE call does not update height optimistically. The adapter has no default native BLE provider, so `setCuttingHeight` is read-only by default and `bluetoothAvailable=false`. The cloud path must never substitute for this BLE call.

Targeted inspection of the matching APK's `classes2.dex` resolves the Java decompiler stub in `RRBlueRemoteDevice$sendPb$2$1` (code offset `0x43dc78`): the implementation requires both handshake nonces and the device LocalKey, prefixes the protobuf payload with `PB`, constructs an L01 BlueBlob with transport ID/time/nonces and passes it to GATT fragmentation. `BlueBlob` then invokes JNI `RRCodecApi.codec3` in `librrcodec`. This proves the native execution path; it does not provide a working Node BLE session, proven cipher equivalence or receive reassembly. GATT uses service `726F626F-C4EB-4040-963B-22076B601071`, write suffix `1072` and notification suffix `1073`.

## Maps and mowing areas

GET_MAP_NAMES=11 reads RobotMsg.MAP_NAMES=4 and repeated map_names field 6. `refreshMapNames` publishes the confirmed list. The plugin initializes its UI map name from list index 0 (759896–759960); that does not prove which saved map is physically active.

GET_FULL_MAP=2 supplies modify_map.name. APP_BUTTON/MOW_SELECT=16 and MOW_EDGE=15 supply modify_map.boundaries containing only `{id,name}` pairs from the current decoded map. RemoteMsg.modify_map is field 8; Map.boundaries field 10, Map.name field 17; Boundary.id is int32 field 1 and name field 5. The area command does not include a fabricated map identifier in its payload. MowPreference.area_id is uint32 and preserves the same 32-bit ID pattern.

The prepared map service accepts a confirmed active map and exposes `mapData`, `currentMap` and `mowingAreas`. `mowAreas`/`mowEdges` accept atomic `{"mapName":"<confirmed name>","boundaryIds":[7]}` inputs. Each movement re-reads the current map, validates unique area membership and copies source names. A replacement, failed refresh, disconnect or shutdown invalidates the selection and cancels delayed publication. Old map data is cleared on failed refresh.

Map blobs have a source-derived decoder with bounded decompression: version 0 is GZIP, version 1 AES-CBC/PKCS5Padding with null IV followed by GZIP and an explicit key, and version 2 raw bytes. A subsequent decoder checks the lowercase `pb` magic and projects only the named map and boundary identities; unknown geometry fields are skipped. This projection can validate selection identity, but cannot render the complete map. The SDK's chunk assembly and transfer correlation are a separate contract. No default downloader is active: `mapDownloadAvailable=false` and `refreshMap`/`mowAreas`/`mowEdges` are read-only until a proven native map service is supplied. This implementation does not provide map rendering or map editing parity with the original AppPlugin.

The prepared chunk assembler consumes already decrypted SDK-equivalent data: frame nonce, sequence and final marker (protocol 301). It requires a complete ordered sequence, checks endpoint and little-endian correlation ID, rejects conflicting duplicates and bounds memory. Version 0/1 strips the 24-byte first-chunk header; version 2 retains the entire `ROBOROCK` header exactly as the native callback does (`react/o00oOoo.java:96–283`, `internal/common/mqtt/OooO00o.java:33–42`). Consequently version 2 does not directly begin with map magic `pb`; the projection refuses it rather than guessing another offset. Live transfer registration, MQTT routing/timeout ownership, the complete outbound SDK connection and authoritative active-map identity still need implementation/verification.

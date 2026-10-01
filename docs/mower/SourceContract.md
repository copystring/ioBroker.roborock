# RockMow S108 implementation preparation

This branch prepares a mower runtime independently of the vacuum feature handlers.
It does not yet attach the mower modules to adapter startup, MQTT or writable ioBroker states.
The existing vacuum boundary remains in force while the remaining status and adapter integration is prepared.

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

The APK's separate protobuf push event carries Base64 RobotMsg data in `RRDeviceDpsPbUpdateEvent`; the bundle decodes it before emitting `OnReceiveRobotMessage`. The decompiled JSON event bridge is incomplete, so its DP/container mapping is not inferred.

## HTTP IoT

Shadow is read through `GET devices/<deviceId>/shadow` (741369–741426). The APK IoT interceptor signs the decoded path, canonical query and request body in separate digest slots. The prepared HTTP implementation follows that central contract and prevents Axios from changing signed body bytes. `getDeviceShadow` accepts only a known device and returns the unchanged response body; it is not automatically polled. No shadow response structure is inferred from vacuum data.

## Remaining integration gates

1. Confirm the existing adapter 1.0 codec against an S108 response. The APK establishes the cloud version, header and key contract; the cipher implementation is behind native `rrcodec` and the prepared composition has only been exercised locally.
2. Decode the actual RobotMsg push container, extend source-derived activity/error fields and connect the session to its own DeviceManager and MQTT routes.
3. Create mower-specific ioBroker states and command handling; keep vacuum consumables, maps and scene handling separate.
4. Test the wired implementation locally with source fixtures, then verify status and commands on the reporter's S108. Hardware tests confirm the source-derived implementation; logs do not serve as command discovery.

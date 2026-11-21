# Original AppPlugin mode evidence

Scope: the unchanged Android AppPlugin bundle version 6006 observed for one
Roborock vacuum. Bundle-internal locations and UI event names are evidence for
this version, not a promise that all devices expose the same surface.

- The MainPage React tree exposes an original `onPressModeSettingButton`
  callback. The offline mounted bundle and its runtime graph showed a single
  committed callback. Calling that callback opened the original mode panel
  without selecting a mode.
- The bundle's mode tab component supplies the original `tabs`, `current`,
  `tabWillChange`, and `onPressTab` properties. The source location is the
  Hermes bytecode in `index.android.bundle`; the inspected function is 7181
  for bundle version 6006. These values must be read from the mounted original
  component, not generated from a model table.
- In a synthetic offline run, selecting the original “Mop” tab dispatched
  the original callback and generated `app_set_clean_sequence_type`. The
  test transport did not send a device command. That is not a device
  acknowledgement.
- On the ioBroker host, an unchanged copy of the original package started
  with the existing account. A read-only adapter transport returned six genuine
  responses, including `get_prop`; a separate read-only MQTT session opened
  the original mode panel and observed six choices. Neither test proves a
  successful live mode change.
- A stable, current React graph and an unambiguous original callback are
  required. A missing, stale or ambiguous binding must not be guessed, and an
  uncertain device response must not be retried automatically.

## Live ioBroker verification

The original tab handler (bundle function 15561) reads each preceding tab's
`layoutMap[i].width` before invoking the mode callback. The fast presentation
path originally skipped delivery of native layout events. A failing live
probe observed six missing widths; sending the original layout events
produced six measured widths and the bundle issued `set_clean_motor_mode`.
Background requests such as `enable_log_upload` and `app_stat` must not
count as an action confirmation.

On the ioBroker test installation, writing the new `appPluginRuntime.mode`
state with `ack=false` changed SmartPlan to Wischen and back. Both values
were subsequently acknowledged by the adapter after a device response and
an original-session mode read. The worker reopens or recreates the original
session for readback if the original dialog closes. It does not replay a
device write during that recovery.

Scope: this is an opt-in test fixture and separate host, not a packaged
adapter release. Six choices were derived dynamically for the tested device;
only SmartPlan and Wischen were exercised in the live round-trip. Nested tab
settings are not yet exposed by this bridge. Other devices, versions and
transport variants have not been verified.

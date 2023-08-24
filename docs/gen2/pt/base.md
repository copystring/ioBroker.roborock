# Roborock S5

## Objects

<dl>
<dt><a href="#fan_power">fan_power</a> : <code>object</code></dt>
<dd><p>Mapping of fan power states.</p>
</dd>
<dt><a href="#state">state</a> : <code>object</code></dt>
<dd><p>Mapping of robot activity states.</p>
</dd>
<dt><a href="#error">error</a> : <code>object</code></dt>
<dd><p>Mapping of robot errors.</p>
</dd>
<dt><a href="#mop_mode">mop_mode</a> : <code>object</code></dt>
<dd><p>Mapping of mop modes.</p>
</dd>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Mapping of robot states.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Mapping of consumables.</p>
</dd>
<dt><a href="#resetConsumables">resetConsumables</a> : <code>object</code></dt>
<dd><p>Description of resettable consumables.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Description of each robot command.</p>
</dd>
<dt><a href="#cleaningInfo">cleaningInfo</a> : <code>object</code></dt>
<dd><p>Description of cleaning information.</p>
</dd>
<dt><a href="#cleaningRecords">cleaningRecords</a> : <code>object</code></dt>
<dd><p>Description of the cleaning records.</p>
</dd>
</dl>

<a name="fan_power"></a>

## fan\_power : <code>object</code>
Mapping of fan power states.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 101 | <code>number</code> | Quiet |
| 102 | <code>number</code> | Balanced |
| 103 | <code>number</code> | Turbo |
| 104 | <code>number</code> | Max |
| 105 | <code>number</code> | Off |

<a name="state"></a>

## state : <code>object</code>
Mapping of robot activity states.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Unknown |
| 1 | <code>number</code> | Initiating |
| 2 | <code>number</code> | Sleeping |
| 3 | <code>number</code> | Idle |
| 4 | <code>number</code> | Remote Control |
| 5 | <code>number</code> | Cleaning |
| 6 | <code>number</code> | Returning Dock |
| 7 | <code>number</code> | Manual Mode |
| 8 | <code>number</code> | Charging |
| 9 | <code>number</code> | Charging Error |
| 10 | <code>number</code> | Paused |
| 11 | <code>number</code> | Spot Cleaning |
| 12 | <code>number</code> | In Error |
| 13 | <code>number</code> | Shutting Down |
| 14 | <code>number</code> | Updating |
| 15 | <code>number</code> | Docking |
| 16 | <code>number</code> | Go To |
| 17 | <code>number</code> | Zone Clean |
| 18 | <code>number</code> | Room Clean |
| 22 | <code>number</code> | Emptying dust container |
| 23 | <code>number</code> | Washing the mop |
| 26 | <code>number</code> | Going to wash the mop |
| 28 | <code>number</code> | In call |
| 29 | <code>number</code> | Mapping |
| 100 | <code>number</code> | Fully Charged |

<a name="error"></a>

## error : <code>object</code>
Mapping of robot errors.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | No error |
| 1 | <code>number</code> | Laser sensor fault |
| 2 | <code>number</code> | Collision sensor fault |
| 3 | <code>number</code> | Wheels on top of void |
| 4 | <code>number</code> | Clean hovering sensors |
| 5 | <code>number</code> | Clean main brush |
| 6 | <code>number</code> | Clean side brushes |
| 7 | <code>number</code> | Main wheel stuck? |
| 8 | <code>number</code> | Device stuck, clean area |
| 9 | <code>number</code> | Dust collector missing |
| 10 | <code>number</code> | Clean filter |
| 11 | <code>number</code> | Stuck in magnetic barrier |
| 12 | <code>number</code> | Low battery |
| 13 | <code>number</code> | Charging fault |
| 14 | <code>number</code> | Battery fault |
| 15 | <code>number</code> | Wall sensors fault |
| 16 | <code>number</code> | Dirty drop sensors |
| 17 | <code>number</code> | Main brush stuck |
| 18 | <code>number</code> | Side brush stuck |
| 19 | <code>number</code> | Suction fan fault |
| 20 | <code>number</code> | Unpowered charging station |
| 21 | <code>number</code> | Laser pressure sensor problem |
| 22 | <code>number</code> | Charge sensor problem |
| 23 | <code>number</code> | Dock problem |
| 24 | <code>number</code> | No-go zone or invisible wall detected |
| 254 | <code>number</code> | Bin full |
| 255 | <code>number</code> | Internal error |
| -1 | <code>string</code> | Unknown Error |

<a name="mop_mode"></a>

## mop\_mode : <code>object</code>
Mapping of mop modes.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 300 | <code>string</code> | Standard |
| 301 | <code>string</code> | Deep |
| 303 | <code>string</code> | Deep+ |

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Mapping of robot states.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| unsave_map_flag | <code>number</code> | Unsave Map Flag |
| unsave_map_reason | <code>number</code> | Unsave Map Reason |
| dock_error_status | <code>number</code> | Dock Error Status |
| debug_mode | <code>number</code> | Debug mode |
| auto_dust_collection | <code>number</code> | Auto Dust Collection |
| dust_collection_status | <code>number</code> | Dust Collection Status |
| dock_type | <code>number</code> | Dock Type |
| adbumper_status | <code>string</code> | Adbumber Status |
| lock_status | <code>number</code> | Lock Status |
| is_locating | <code>number</code> | Is Locating |
| map_status | <code>number</code> | Currently selected map |
| dnd_enabled | <code>number</code> | DND Enabled |
| lab_status | <code>number</code> | Lab Status |
| in_fresh_state | <code>number</code> | In Fresh State |
| in_returning | <code>number</code> | Is returning |
| in_cleaning | <code>number</code> | Is Cleaning |
| map_present | <code>number</code> | Map Present |
| error_code | <code>number</code> | Error Code |
| clean_area | <code>number</code> | Cleaned Area |
| clean_time | <code>number</code> | Cleaning Time |
| battery | <code>number</code> | Battery Percentage |
| state | <code>number</code> | State |
| msg_seq | <code>number</code> | Message Sequence |
| msg_ver | <code>number</code> | Message Version |
| fan_power | <code>number</code> | Fan power |
| mop_mode | <code>number</code> | Mop Mode |
| water_shortage_status | <code>number</code> | Water Shortage Status |
| mop_forbidden_enable | <code>number</code> | Mop Forbidden Enable |
| water_box_carriage_status | <code>number</code> | Water Box Carriage Status |
| water_box_status | <code>number</code> | Water Box Status |
| water_box_mode | <code>number</code> | Amount of water to use |

<a name="consumables"></a>

## consumables : <code>object</code>
Mapping of consumables.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | Main brush used hours |
| side_brush_work_time | <code>Object</code> | Side brush used hours |
| filter_work_time | <code>Object</code> | Filter used hours |
| filter_element_work_time | <code>Object</code> | Filter element used hours |
| sensor_dirty_time | <code>Object</code> | Time since last cleaning of sensors |
| dust_collection_work_times | <code>Object</code> | Dust collection hours |
| 125 | <code>Object</code> | Main brush life |
| 126 | <code>Object</code> | Side brush life |
| 127 | <code>Object</code> | Filter life |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
Description of resettable consumables.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | Main brush |
| side_brush_work_time | <code>Object</code> | Side brush |
| filter_work_time | <code>Object</code> | Filter |
| filter_element_work_time | <code>Object</code> | Filter element |
| sensor_dirty_time | <code>Object</code> | Sensors |
| dust_collection_work_times | <code>Object</code> | Dust collection |

<a name="commands"></a>

## commands : <code>object</code>
Description of each robot command.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start | <code>Object</code> | Starts cleaning |
| app_segment_clean | <code>Object</code> | Start room cleaning |
| resume_segment_clean | <code>Object</code> | Resume room cleaning |
| app_stop | <code>Object</code> | Stops cleaning |
| app_pause | <code>Object</code> | Pause cleaning |
| app_charge | <code>Object</code> | Return to dock |
| app_spot | <code>Object</code> | Start spot cleaning |
| app_zoned_clean | <code>Object</code> | Start zone cleaning |
| resume_zoned_clean | <code>Object</code> | Resume zone cleaning |
| stop_zoned_clean | <code>Object</code> | Stop zone cleaning |
| set_custom_mode | <code>Object</code> | Set custom mode or suction power |
| find_me | <code>Object</code> | Find the robot |
| app_goto_target | <code>Object</code> | Go to target |
| set_mop_mode | <code>Object</code> | Mop Route |

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
Description of cleaning information.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Object</code> | Total cleaning time |
| 1 | <code>Object</code> | Total cleaning area |
| 2 | <code>Object</code> | Total cleaning cycles |
| 3 | <code>Object</code> | Total cleaning records |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Description of the cleaning records.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Object</code> | Start cleaning time |
| 1 | <code>Object</code> | End cleaning time |
| 2 | <code>Object</code> | Duration cleaning time |
| 3 | <code>Object</code> | Cleaning Area |
| 4 | <code>Object</code> | Error Type |
| 5 | <code>Object</code> | Completion Type |
| 6 | <code>Object</code> | Start Type |
| 7 | <code>Object</code> | Clean Type |
| 8 | <code>Object</code> | Clean Finish Reason |


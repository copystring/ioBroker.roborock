# Camera Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Kartierung von Roboterzuständen.</p>
</dd>
<dt><a href="#camera">camera</a> : <code>object</code></dt>
<dd><p>Informationen zu verschiedenen Kamera-Stream-Formaten.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Kartierung von Roboterzuständen.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| distance_off | <code>object</code> | Distanz aus |
| camera_status | <code>object</code> | Kamera |
| home_sec_status | <code>object</code> | Home-Security-Status |
| home_sec_enable_password | <code>object</code> | Home Security-Aktivierungskennwort |

<a name="camera"></a>

## camera : <code>object</code>
Informationen zu verschiedenen Kamera-Stream-Formaten.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| stream_html | <code>string</code> | HTML-Stream |
| rtsp | <code>string</code> | RTSP-Stream |
| stream_mp4 | <code>string</code> | MP4-Stream |


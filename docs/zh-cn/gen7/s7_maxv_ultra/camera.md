# Camera Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>机器人状态映射。</p>
</dd>
<dt><a href="#camera">camera</a> : <code>object</code></dt>
<dd><p>与不同摄像机流格式相关的信息。</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
机器人状态映射。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| distance_off | <code>object</code> | 距离关闭 |
| camera_status | <code>object</code> | 相机 |
| home_sec_status | <code>object</code> | 家庭安全状况 |
| home_sec_enable_password | <code>object</code> | 家庭安全启用密码 |

<a name="camera"></a>

## camera : <code>object</code>
与不同摄像机流格式相关的信息。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| stream_html | <code>string</code> | html流 |
| rtsp | <code>string</code> | rtsp流 |
| stream_mp4 | <code>string</code> | mp4 流 |


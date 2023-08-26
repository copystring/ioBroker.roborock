# Camera Roborock S6 MaxV

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Cartographie des états du robot.</p>
</dd>
<dt><a href="#camera">camera</a> : <code>object</code></dt>
<dd><p>Informations relatives aux différents formats de flux de caméra.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Cartographie des états du robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| distance_off | <code>object</code> | Distance désactivée |
| camera_status | <code>object</code> | Caméra |
| home_sec_status | <code>object</code> | Statut de sécurité à domicile |
| home_sec_enable_password | <code>object</code> | Mot de passe d'activation de la sécurité domestique |

<a name="camera"></a>

## camera : <code>object</code>
Informations relatives aux différents formats de flux de caméra.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| stream_html | <code>string</code> | flux HTML |
| rtsp | <code>string</code> | flux RTSP |
| stream_mp4 | <code>string</code> | flux mp4 |


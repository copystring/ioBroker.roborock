# Camera Roborock S8 Pro Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Картирование состояний робота.</p>
</dd>
<dt><a href="#camera">camera</a> : <code>object</code></dt>
<dd><p>Информация, относящаяся к различным форматам потоков камер.</p>
</dd>
<dt><a href="#cleaningRecords">cleaningRecords</a> : <code>object</code></dt>
<dd><p>Картирование состояний робота.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Картирование состояний робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| distance_off | <code>object</code> | Расстояние выкл. |
| camera_status | <code>object</code> | Камера |
| home_sec_status | <code>object</code> | Статус домашней безопасности |
| home_sec_enable_password | <code>object</code> | Пароль включения домашней безопасности |

<a name="camera"></a>

## camera : <code>object</code>
Информация, относящаяся к различным форматам потоков камер.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| stream_html | <code>string</code> | HTML-поток |
| rtsp | <code>string</code> | rtsp-поток |
| stream_mp4 | <code>string</code> | поток mp4 |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Картирование состояний робота.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| avoid_count | <code>string</code> | Избегайте подсчета |


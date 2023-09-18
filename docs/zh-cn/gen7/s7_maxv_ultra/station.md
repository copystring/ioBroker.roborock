# Station Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>机器人状态映射。</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>耗材映射。</p>
</dd>
<dt><a href="#reset_consumables">reset_consumables</a> : <code>object</code></dt>
<dd><p>可重置消耗品的说明。</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>每个机器人命令的描述。</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
机器人状态映射。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wash_ready | <code>string</code> | 清洗就绪 |
| wash_phase | <code>string</code> | 洗涤阶段 |
| back_type | <code>string</code> | 背型 |

<a name="consumables"></a>

## consumables : <code>object</code>
耗材映射。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | 滤水器已使用多少次 |
| cleaning_brush_work_times | <code>object</code> | 高速保养刷已使用多少次 |
| dust_collection_work_times | <code>object</code> | 除尘时间 |

<a name="reset_consumables"></a>

## reset\_consumables : <code>object</code>
可重置消耗品的说明。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | 滤水器已使用多少次 |
| cleaning_brush_work_times | <code>object</code> | 高速保养刷已使用多少次 |
| dust_collection_work_times | <code>object</code> | 除尘时间 |

<a name="commands"></a>

## commands : <code>object</code>
每个机器人命令的描述。

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start_collect_dust | <code>object</code> | 开始集尘 |
| app_stop_collect_dust | <code>object</code> | 停止集尘 |
| app_set_dryer_setting | <code>object</code> | 设置烘干机插件启用 |
| app_set_dryer_status | <code>object</code> | 设置烘干机状态 |
| app_start_wash | <code>object</code> | 开始拖把清洗 |
| app_stop_wash | <code>object</code> | 停止拖把清洗 |


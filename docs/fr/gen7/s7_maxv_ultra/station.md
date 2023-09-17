# Station Roborock S7 MaxV Ultra

## Objects

<dl>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Cartographie des états du robot.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Cartographie des consommables.</p>
</dd>
<dt><a href="#reset_consumables">reset_consumables</a> : <code>object</code></dt>
<dd><p>Consommables disponibles pour la réinitialisation</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Description de chaque commande du robot.</p>
</dd>
</dl>

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Cartographie des états du robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wash_ready | <code>string</code> | Prêt à laver |
| wash_phase | <code>string</code> | Phase de lavage |
| back_type | <code>string</code> | Type de dos |

<a name="consumables"></a>

## consumables : <code>object</code>
Cartographie des consommables.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Combien de fois le filtre à eau a été utilisé |
| cleaning_brush_work_times | <code>object</code> | Combien de fois la brosse d'entretien à grande vitesse a été utilisée |
| dust_collection_work_times | <code>object</code> | Heures de dépoussiérage |

<a name="reset_consumables"></a>

## reset\_consumables : <code>object</code>
Consommables disponibles pour la réinitialisation

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| strainer_work_times | <code>object</code> | Combien de fois le filtre à eau a été utilisé |
| cleaning_brush_work_times | <code>object</code> | Combien de fois la brosse d'entretien à grande vitesse a été utilisée |
| dust_collection_work_times | <code>object</code> | Heures de dépoussiérage |

<a name="commands"></a>

## commands : <code>object</code>
Description de chaque commande du robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start_collect_dust | <code>object</code> | Démarrer la collecte de poussière |
| app_stop_collect_dust | <code>object</code> | Arrêtez la collecte de poussière |
| app_set_dryer_setting | <code>object</code> | Définir le module complémentaire de séchage activé |
| app_set_dryer_status | <code>object</code> | Définir l'état du sèche-linge |
| app_start_wash | <code>object</code> | Démarrer le lavage à la vadrouille |
| app_stop_wash | <code>object</code> | Arrêtez le lavage à la vadrouille |


# Roborock S6 <br> Roborock S6 Pure <br> Roborock S6 MaxV

## Objects

<dl>
<dt><a href="#fan_power">fan_power</a> : <code>object</code></dt>
<dd><p>Cartographie des états d&#39;alimentation des ventilateurs.</p>
</dd>
<dt><a href="#state">state</a> : <code>object</code></dt>
<dd><p>Cartographie des états d&#39;activité du robot.</p>
</dd>
<dt><a href="#error">error</a> : <code>object</code></dt>
<dd><p>Cartographie des erreurs du robot.</p>
</dd>
<dt><a href="#mop_mode">mop_mode</a> : <code>object</code></dt>
<dd><p>Description des modes de vadrouille.</p>
</dd>
<dt><a href="#carpet_mode">carpet_mode</a> : <code>object</code></dt>
<dd><p>Boost de tapis</p>
</dd>
<dt><a href="#carpet_clean_mode">carpet_clean_mode</a> : <code>object</code></dt>
<dd><p>Mode d&#39;évitement de tapis</p>
</dd>
<dt><a href="#deviceStatus">deviceStatus</a> : <code>object</code></dt>
<dd><p>Cartographie des états du robot.</p>
</dd>
<dt><a href="#consumables">consumables</a> : <code>object</code></dt>
<dd><p>Cartographie des consommables.</p>
</dd>
<dt><a href="#resetConsumables">resetConsumables</a> : <code>object</code></dt>
<dd><p>Description des consommables réinitialisables.</p>
</dd>
<dt><a href="#commands">commands</a> : <code>object</code></dt>
<dd><p>Description de chaque commande du robot.</p>
</dd>
<dt><a href="#cleaningInfo">cleaningInfo</a> : <code>object</code></dt>
<dd><p>@cleaningInfo_description@</p>
</dd>
<dt><a href="#cleaningRecords">cleaningRecords</a> : <code>object</code></dt>
<dd><p>Description des dossiers de nettoyage.</p>
</dd>
</dl>

<a name="fan_power"></a>

## fan\_power : <code>object</code>
Cartographie des états d'alimentation des ventilateurs.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 101 | <code>number</code> | Calme |
| 102 | <code>number</code> | Équilibré |
| 103 | <code>number</code> | Turbo |
| 104 | <code>number</code> | Max. |
| 105 | <code>number</code> | Désactivé |

<a name="state"></a>

## state : <code>object</code>
Cartographie des états d'activité du robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Inconnu |
| 1 | <code>number</code> | Initier |
| 2 | <code>number</code> | Dormir |
| 3 | <code>number</code> | Inactif |
| 4 | <code>number</code> | Télécommande |
| 5 | <code>number</code> | Nettoyage |
| 6 | <code>number</code> | Quai de retour |
| 7 | <code>number</code> | Mode manuel |
| 8 | <code>number</code> | Mise en charge |
| 9 | <code>number</code> | Erreur de charge |
| 10 | <code>number</code> | En pause |
| 11 | <code>number</code> | Nettoyage des taches |
| 12 | <code>number</code> | En erreur |
| 13 | <code>number</code> | Éteindre |
| 14 | <code>number</code> | Mise à jour |
| 15 | <code>number</code> | Amarrage |
| 16 | <code>number</code> | Aller à |
| 17 | <code>number</code> | Zone propre |
| 18 | <code>number</code> | Chambre propre |
| 22 | <code>number</code> | Vider le bac à poussière |
| 23 | <code>number</code> | Laver la vadrouille |
| 26 | <code>number</code> | Je vais laver la vadrouille |
| 28 | <code>number</code> | En appel |
| 29 | <code>number</code> | Cartographie |
| 100 | <code>number</code> | Complètement chargé |

<a name="error"></a>

## error : <code>object</code>
Cartographie des erreurs du robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | Pas d'erreur |
| 1 | <code>number</code> | Défaut du capteur laser |
| 2 | <code>number</code> | Défaut du capteur de collision |
| 3 | <code>number</code> | Roue flottante |
| 4 | <code>number</code> | Défaut du capteur de falaise |
| 5 | <code>number</code> | Brosse principale bloquée |
| 6 | <code>number</code> | Brosse latérale bloquée |
| 7 | <code>number</code> | Roue bloquée |
| 8 | <code>number</code> | Appareil bloqué |
| 9 | <code>number</code> | Bac à poussière manquant |
| 10 | <code>number</code> | Filtre bloqué |
| 11 | <code>number</code> | Champ magnétique détecté |
| 12 | <code>number</code> | Batterie faible |
| 13 | <code>number</code> | Problème de charge |
| 14 | <code>number</code> | Panne de batterie |
| 15 | <code>number</code> | Défaut capteur mural |
| 16 | <code>number</code> | Une surface irrégulière |
| 17 | <code>number</code> | Panne de la brosse latérale |
| 18 | <code>number</code> | Panne du ventilateur d'aspiration |
| 19 | <code>number</code> | Borne de recharge non alimentée |
| 20 | <code>number</code> | Erreur inconnue |
| 21 | <code>number</code> | Problème de capteur de pression laser |
| 22 | <code>number</code> | Problème de capteur de charge |
| 23 | <code>number</code> | Problème de quai |
| 24 | <code>number</code> | Zone interdite ou mur invisible détecté |
| 254 | <code>number</code> | Poubelle pleine |
| 255 | <code>number</code> | Erreur interne |
| -1 | <code>string</code> | Erreur inconnue |

<a name="mop_mode"></a>

## mop\_mode : <code>object</code>
Description des modes de vadrouille.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 300 | <code>string</code> | Standard |
| 301 | <code>string</code> | Profond |
| 303 | <code>string</code> | Profond+ |

<a name="carpet_mode"></a>

## carpet\_mode : <code>object</code>
Boost de tapis

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | désactivé |
| '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' | <code>string</code> | sur |

<a name="carpet_clean_mode"></a>

## carpet\_clean\_mode : <code>object</code>
Mode d'évitement de tapis

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| '{"carpet_clean_mode":0}' | <code>string</code> | Éviter |
| '{"carpet_clean_mode":1}' | <code>string</code> | Augmenter |
| '{"carpet_clean_mode":2}' | <code>string</code> | Ignorer |

<a name="deviceStatus"></a>

## deviceStatus : <code>object</code>
Cartographie des états du robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| unsave_map_flag | <code>number</code> | Annuler l'enregistrement de l'indicateur de carte |
| unsave_map_reason | <code>number</code> | Raison de l'annulation de l'enregistrement de la carte |
| dock_error_status | <code>number</code> | Statut d'erreur du quai |
| debug_mode | <code>number</code> | Mode débogage |
| auto_dust_collection | <code>number</code> | Collecte automatique de poussière |
| dust_collection_status | <code>number</code> | Statut de dépoussiérage |
| dock_type | <code>number</code> | Type de quai |
| adbumper_status | <code>string</code> | Statut du numéro d'annonce |
| lock_status | <code>number</code> | Statut de verrouillage |
| is_locating | <code>number</code> | Localise |
| map_status | <code>number</code> | Carte actuellement sélectionnée |
| dnd_enabled | <code>number</code> | NPD activé |
| lab_status | <code>number</code> | Statut du laboratoire |
| in_fresh_state | <code>number</code> | À l'état frais |
| in_returning | <code>number</code> | Est de retour |
| in_cleaning | <code>number</code> | Est en train de nettoyer |
| map_present | <code>number</code> | Carte présente |
| error_code | <code>number</code> | Code d'erreur |
| clean_area | <code>number</code> | Zone nettoyée |
| clean_time | <code>number</code> | Temps de nettoyage |
| battery | <code>number</code> | Pourcentage de batterie |
| state | <code>number</code> | État |
| msg_seq | <code>number</code> | Séquence de messages |
| msg_ver | <code>number</code> | Version du message |
| fan_power | <code>number</code> | Puissance du ventilateur |
| mop_mode | <code>number</code> | Mode vadrouille |
| water_shortage_status | <code>number</code> | Statut de pénurie d'eau |
| mop_forbidden_enable | <code>number</code> | Activation interdite de la vadrouille |
| water_box_carriage_status | <code>number</code> | Statut du chariot de la boîte à eau |
| water_box_status | <code>number</code> | Statut de la boîte à eau |
| water_box_mode | <code>number</code> | Quantité d'eau à utiliser |
| is_exploring | <code>number</code> | Est en train d'explorer |

<a name="consumables"></a>

## consumables : <code>object</code>
Cartographie des consommables.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | Heures d'utilisation de la brosse principale |
| side_brush_work_time | <code>Object</code> | Heures d'utilisation de la brosse latérale |
| filter_work_time | <code>Object</code> | Filtrer les heures utilisées |
| filter_element_work_time | <code>Object</code> | Heures d'utilisation de l'élément filtrant |
| sensor_dirty_time | <code>Object</code> | Temps écoulé depuis le dernier nettoyage des capteurs |
| 125 | <code>Object</code> | Durée de vie de la brosse principale |
| 126 | <code>Object</code> | Durée de vie de la brosse latérale |
| 127 | <code>Object</code> | Durée de vie du filtre |

<a name="resetConsumables"></a>

## resetConsumables : <code>object</code>
Description des consommables réinitialisables.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main_brush_work_time | <code>Object</code> | @reset_main_brush_work_time@ |
| side_brush_work_time | <code>Object</code> | @reset_side_brush_work_time@ |
| filter_work_time | <code>Object</code> | @reset_filter_work_time@ |
| filter_element_work_time | <code>Object</code> | @reset_filter_element_work_time@ |
| sensor_dirty_time | <code>Object</code> | @reset_sensor_dirty_time@ |

<a name="commands"></a>

## commands : <code>object</code>
Description de chaque commande du robot.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| app_start | <code>Object</code> | Commence le nettoyage |
| app_segment_clean | <code>Object</code> | Commencer le nettoyage de la chambre |
| resume_segment_clean | <code>Object</code> | Reprendre le nettoyage des chambres |
| app_stop | <code>Object</code> | Arrête le nettoyage |
| app_pause | <code>Object</code> | Suspendre le nettoyage |
| app_charge | <code>Object</code> | Retour au quai |
| app_spot | <code>Object</code> | Commencer le nettoyage localisé |
| app_zoned_clean | <code>Object</code> | Démarrer le nettoyage de la zone |
| resume_zoned_clean | <code>Object</code> | Reprendre le nettoyage des zones |
| stop_zoned_clean | <code>Object</code> | Nettoyage de la zone d'arrêt |
| set_custom_mode | <code>Object</code> | Définir le mode personnalisé ou la puissance d'aspiration |
| find_me | <code>Object</code> | Trouver le robot |
| app_goto_target | <code>Object</code> | Aller à la cible |
| set_mop_mode | <code>Object</code> | Itinéraire de la vadrouille |

<a name="cleaningInfo"></a>

## cleaningInfo : <code>object</code>
@cleaningInfo_description@

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Object</code> | Temps de nettoyage |
| 1 | <code>Object</code> | Zone nettoyée |
| 2 | <code>Object</code> | Cycles de nettoyage totaux |
| 3 | <code>Object</code> | Registres de nettoyage totaux |

<a name="cleaningRecords"></a>

## cleaningRecords : <code>object</code>
Description des dossiers de nettoyage.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>Object</code> | @start_cleaning_time@ |
| 1 | <code>Object</code> | @end_cleaning_time@ |
| 2 | <code>Object</code> | @duration_cleaning_time@ |
| 3 | <code>Object</code> | @cleaning_area@ |
| 4 | <code>Object</code> | @error_type@ |
| 5 | <code>Object</code> | @completion_type@ |
| 6 | <code>Object</code> | @start_type@ |
| 7 | <code>Object</code> | @clean_type@ |
| 8 | <code>Object</code> | @clean_finish_reason@ |


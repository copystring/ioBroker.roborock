// Roborock Q7

const states = {
	/**
	 * @namespace fan_power
	 * @description Cartographie des états d'alimentation des ventilateurs.
	 * @property {number} 101 - Calme
	 * @property {number} 102 - Équilibré
	 * @property {number} 103 - Turbo
	 * @property {number} 104 - Max.
	 * @property {number} 105 - Désactivé
	 */
	fan_power: {
		101: "Quiet",
		102: "Balanced",
		103: "Turbo",
		104: "Max",
		105: "Off",
	},

	/**
     * @namespace state
     * @description Cartographie des états d'activité du robot.
     * @property {number} 0 - Inconnu
     * @property {number} 1 - Initier
     * @property {number} 2 - Dormir
     * @property {number} 3 - Inactif
     * @property {number} 4 - Télécommande
     * @property {number} 5 - Nettoyage
     * @property {number} 6 - Quai de retour
     * @property {number} 7 - Mode manuel
     * @property {number} 8 - Mise en charge
     * @property {number} 9 - Erreur de charge
     * @property {number} 10 - En pause
     * @property {number} 11 - Nettoyage des taches
     * @property {number} 12 - En erreur
     * @property {number} 13 - Éteindre
     * @property {number} 14 - Mise à jour
     * @property {number} 15 - Amarrage
     * @property {number} 16 - Aller à
     * @property {number} 17 - Zone propre
     * @property {number} 18 - Chambre propre
     * @property {number} 22 - Vider le bac à poussière
     * @property {number} 23 - Laver la vadrouille
     * @property {number} 26 - Je vais laver la vadrouille
     * @property {number} 28 - En appel
     * @property {number} 29 - Cartographie
     * @property {number} 100 - Complètement chargé
     */
	state: {
		0: "Unknown",
		1: "Initiating",
		2: "Sleeping",
		3: "Idle",
		4: "Remote Control",
		5: "Cleaning",
		6: "Returning Dock",
		7: "Manual Mode",
		8: "Charging",
		9: "Charging Error",
		10: "Paused",
		11: "Spot Cleaning",
		12: "In Error",
		13: "Shutting Down",
		14: "Updating",
		15: "Docking",
		16: "Go To",
		17: "Zone Clean",
		18: "Room Clean",
		22: "Empying dust container",
		23: "Washing the mop",
		26: "Going to wash the mop",
		28: "In call",
		29: "Mapping",
		100: "Fully Charged",
	},

	/**
     * @namespace error
     * @description Cartographie des erreurs du robot.
     * @property {number} 0 - Pas d'erreur
     * @property {number} 1 - Défaut du capteur laser
     * @property {number} 2 - Défaut du capteur de collision
     * @property {number} 3 - Roue flottante
     * @property {number} 4 - Défaut du capteur de falaise
     * @property {number} 5 - Brosse principale bloquée
     * @property {number} 6 - Brosse latérale bloquée
     * @property {number} 7 - Roue bloquée
     * @property {number} 8 - Appareil bloqué
     * @property {number} 9 - Bac à poussière manquant
     * @property {number} 10 - Filtre bloqué
     * @property {number} 11 - Champ magnétique détecté
     * @property {number} 12 - Batterie faible
     * @property {number} 13 - Problème de charge
     * @property {number} 14 - Panne de batterie
     * @property {number} 15 - Défaut capteur mural
     * @property {number} 16 - Une surface irrégulière
     * @property {number} 17 - Panne de la brosse latérale
     * @property {number} 18 - Panne du ventilateur d'aspiration
     * @property {number} 19 - Borne de recharge non alimentée
     * @property {number} 20 - Erreur inconnue
     * @property {number} 21 - Problème de capteur de pression laser
     * @property {number} 22 - Problème de capteur de charge
     * @property {number} 23 - Problème de quai
     * @property {number} 24 - Zone interdite ou mur invisible détecté
     * @property {number} 254 - Poubelle pleine
     * @property {number} 255 - Erreur interne
     * @property {string} -1 - Erreur inconnue
     */
	error: {
		0: "No error",
		1: "Laser sensor fault",
		2: "Collision sensor fault",
		3: "Wheel floating",
		4: "Cliff sensor fault",
		5: "Main brush blocked",
		6: "Side brush blocked",
		7: "Wheel blocked",
		8: "Device stuck",
		9: "Dust bin missing",
		10: "Filter blocked",
		11: "Magnetic field detected",
		12: "Low battery",
		13: "Charging problem",
		14: "Battery failure",
		15: "Wall sensor fault",
		16: "Uneven surface",
		17: "Side brush failure",
		18: "Suction fan failure",
		19: "Unpowered charging station",
		20: "Unknown Error",
		21: "Laser pressure sensor problem",
		22: "Charge sensor problem",
		23: "Dock problem",
		24: "No-go zone or invisible wall detected",
		254: "Bin full",
		255: "Internal error",
		"-1": "Unknown Error",
	},

	/**
	 * @namespace mop_mode
	 * @description Description des modes de vadrouille.
	 * @property {string} 300 - Standard
	 * @property {string} 301 - Profond
	 * @property {string} 303 - Profond+
	 */
	mop_mode: {
		300: "Standard",
		301: "Deep",
		303: "Deep+",
	},


	/**
	 * @namespace carpet_mode
	 * @description Boost de tapis
	 * @property {string} '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' - désactivé
	 * @property {string} '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]' - sur
	 */
	carpet_mode: {
		'[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]':
			"off",
		'[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]':
			"on",
	},

	/**
	 * @namespace carpet_clean_mode
	 * @description Mode d'évitement de tapis
	 * @property {string} '{"carpet_clean_mode":0}' - Éviter
	 * @property {string} '{"carpet_clean_mode":1}' - Augmenter
	 * @property {string} '{"carpet_clean_mode":2}' - Ignorer
	 */
	carpet_clean_mode: {
		'{"carpet_clean_mode":0}': "Avoid",
		'{"carpet_clean_mode":1}': "Rise",
		'{"carpet_clean_mode":2}': "Ignore",
	},

	/**
	 * @namespace water_box_custom_mode
	 * @description Mode d'utilisation de l'eau personnalisé
	 * @property {string} 200 - @water_box_custom_mode_200@
	 * @property {string} 201 - @water_box_custom_mode_201@
	 * @property {string} 202 - @water_box_custom_mode_202@
	 * @property {string} 203 - @water_box_custom_mode_203@
	 */
	water_box_custom_mode: {
		"200": "Off",
		"201": "Mild",
		"202": "Moderate",
		"203": "Intense"
	}
};

/**
 * @namespace deviceStatus
 * @description Cartographie des états du robot.
 * @property {number} unsave_map_flag - Annuler l'enregistrement de l'indicateur de carte
 * @property {number} unsave_map_reason - Raison de l'annulation de l'enregistrement de la carte
 * @property {number} dock_error_status - Statut d'erreur du quai
 * @property {number} debug_mode - Mode débogage
 * @property {number} auto_dust_collection - Collecte automatique de poussière
 * @property {number} dust_collection_status - Statut de dépoussiérage
 * @property {number} dock_type - Type de quai
 * @property {string} adbumper_status - Statut du numéro d'annonce
 * @property {number} lock_status - Statut de verrouillage
 * @property {number} is_locating - Localise
 * @property {number} map_status - Carte actuellement sélectionnée
 * @property {number} dnd_enabled - NPD activé
 * @property {number} lab_status - Statut du laboratoire
 * @property {number} in_fresh_state - À l'état frais
 * @property {number} in_returning - Est de retour
 * @property {number} in_cleaning - Est en train de nettoyer
 * @property {number} map_present - Carte présente
 * @property {number} error_code - Code d'erreur
 * @property {number} clean_area - Zone nettoyée
 * @property {number} clean_time - Temps de nettoyage
 * @property {number} battery - Pourcentage de batterie
 * @property {number} state - État
 * @property {number} msg_seq - Séquence de messages
 * @property {number} msg_ver - Version du message
 * @property {number} fan_power - Puissance du ventilateur
 * @property {number} mop_mode - Mode vadrouille
 * @property {number} water_shortage_status - Statut de pénurie d'eau
 * @property {number} mop_forbidden_enable - Activation interdite de la vadrouille
 * @property {number} water_box_carriage_status - Statut du chariot de la boîte à eau
 * @property {number} water_box_status - Statut de la boîte à eau
 * @property {number} water_box_mode - Quantité d'eau à utiliser
 * @property {number} carpet_mode - Boost de tapis
 * @property {number} is_exploring - Est en train d'explorer
 * @property {number} water_box_custom_mode - Mode d'utilisation de l'eau personnalisé
 * @property {string} carpet_clean_mode - Mode d'évitement de tapis
 */
const deviceStatus = {
	unsave_map_flag: {
		name: "Unsave Map Flag",
		type: "number",
		write: false,
	},
	unsave_map_reason: {
		name: "Unsave Map Reason",
		type: "number",
		write: false,
	},
	dock_error_status: {
		name: "Dock Error Status",
		type: "number",
		write: false,
	},
	debug_mode: {
		name: "Debug mode",
		type: "number",
		write: false,
	},
	auto_dust_collection: {
		name: "Auto Dust Collection",
		type: "number",
		write: false,
	},
	dust_collection_status: {
		name: "Dust Collection Status",
		type: "number",
		write: false,
	},
	dock_type: {
		name: "Dock Type",
		type: "number",
		write: false,
	},
	adbumper_status: {
		name: "Adbumber Status",
		type: "string",
		write: false,
	},
	lock_status: {
		name: "Lock Status",
		type: "number",
		write: false,
	},
	is_locating: {
		name: "Is Locating",
		type: "number",
		write: false,
	},
	map_status: {
		name: "Currently selected map",
		type: "number",
		write: false,
	},
	dnd_enabled: {
		name: "DND Enabled",
		type: "number",
		write: false,
	},
	lab_status: {
		name: "Lab Status",
		type: "number",
		write: false,
	},
	in_fresh_state: {
		name: "In Fresh State",
		type: "number",
		write: false,
	},
	in_returning: {
		name: "Is returning",
		type: "number",
		write: false,
	},
	in_cleaning: {
		name: "Is Cleaning",
		type: "number",
		write: false,
	},
	map_present: {
		name: "Map Present",
		type: "number",
		write: false,
	},
	error_code: {
		name: "Error Code",
		type: "number",
		states: states["error"],
		write: false,
	},
	clean_area: {
		name: "Cleaned Area",
		type: "number",
		unit: "m²",
		divider: 1000000,
		write: false,
	},
	clean_time: {
		name: "Cleaning Time",
		type: "number",
		unit: "min",
		divider: 60,
		write: false,
	},
	battery: {
		name: "Battery Percentage",
		type: "number",
		unit: "%",
		write: false,
	},
	state: {
		name: "State",
		type: "number",
		states: states["state"],
		write: false,
	},
	msg_seq: {
		name: "Message Sequence",
		type: "number",
		write: false,
	},
	msg_ver: {
		name: "Message Version",
		type: "number",
		write: false,
	},
	fan_power: {
		type: "number",
		name: "Fan power",
		states: states["fan_power"],
		write: false,
	},
	mop_mode: {
		name: "Mop mode",
		type: "number",
		states: states["mop_mode"],
		write: false,
	},
	water_shortage_status: {
		name: "Water Shortage Status",
		type: "number",
		write: false,
	},
	mop_forbidden_enable: {
		name: "Mop Forbidden Enable",
		type: "number",
		write: false,
	},
	water_box_carriage_status: {
		name: "Water Box Carriage Status",
		type: "number",
		write: false,
	},
	water_box_status: {
		name: "Water Box Status",
		type: "number",
		write: false,
	},
	water_box_mode: {
		type: "number",
		name: "Amount of water to use",
		states: states["water_box_mode"],
		write: false,
	},
	carpet_mode: {
		"type": "string",
		"name":"Carpet Boost",
		"states": states["carpet_mode"],
		"write": false
	},
	is_exploring: {
		"type": "number",
		"name": "Is Exploring",
		"write": false
	},
	water_box_custom_mode: {
		"type": "number",
		"name":"Scrub Intensity",
		"states": states["water_box_custom_mode"],
		"write": false
	},
	carpet_clean_mode: {
		"type": "string",
		"name": "Carpet Avoidance Mode",
		"states": states["carpet_clean_mode"],
		"write": false
	}
};

/**
 * @namespace consumables
 * @description Cartographie des consommables.
 * @property {Object} main_brush_work_time - Heures d'utilisation de la brosse principale
 * @property {Object} side_brush_work_time - Heures d'utilisation de la brosse latérale
 * @property {Object} filter_work_time - Filtrer les heures utilisées
 * @property {Object} filter_element_work_time - Heures d'utilisation de l'élément filtrant
 * @property {Object} sensor_dirty_time - Temps écoulé depuis le dernier nettoyage des capteurs
 * @property {Object} dust_collection_work_times - Heures de dépoussiérage
 * @property {Object} 125 - Durée de vie de la brosse principale
 * @property {Object} 126 - Durée de vie de la brosse latérale
 * @property {Object} 127 - Durée de vie du filtre
 */
const consumables = {
	main_brush_work_time: {
		name: "Main brush used hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	side_brush_work_time: {
		name: "Side brush used hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	filter_work_time: {
		name: "Filter used hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	filter_element_work_time: {
		name: "Filter element used hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	sensor_dirty_time: {
		name: "Time since last cleaning of sensors",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	dust_collection_work_times: {
		name: "Dust collection hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	125: {
		name: "Main brush life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
	126: {
		name: "Side brush life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
	127: {
		name: "Filter life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
};

/**
 * @namespace resetConsumables
 * @description Description des consommables réinitialisables.
 * @property {Object} main_brush_work_time - Brosse principale
 * @property {Object} side_brush_work_time - Brosse latérale
 * @property {Object} filter_work_time - Filtre
 * @property {Object} filter_element_work_time - Element de filtre
 * @property {Object} sensor_dirty_time - Capteurs
 * @property {Object} dust_collection_work_times - Collecte de poussière
 */
const resetConsumables = {
	main_brush_work_time: {
		name: "Main brush",
		type: "boolean",
		def: false,
		write: true,
	},
	side_brush_work_time: {
		name: "Side brush",
		type: "boolean",
		def: false,
		write: true,
	},
	filter_work_time: {
		name: "Filter",
		type: "boolean",
		def: false,
		write: true,
	},
	filter_element_work_time: {
		name: "Filter element",
		type: "boolean",
		def: false,
		write: true,
	},
	sensor_dirty_time: {
		name: "Sensors",
		type: "boolean",
		def: false,
		write: true,
	},
	dust_collection_work_times: {
		name: "Dust collection",
		type: "boolean",
		def: false,
		write: true,
	},
};

/**
 * @namespace commands
 * @description Description de chaque commande du robot.
 * @property {Object} app_start - Commence le nettoyage
 * @property {Object} app_segment_clean - Commencer le nettoyage de la chambre
 * @property {Object} resume_segment_clean - Reprendre le nettoyage des chambres
 * @property {Object} app_stop - Arrête le nettoyage
 * @property {Object} app_pause - Suspendre le nettoyage
 * @property {Object} app_charge - Retour au quai
 * @property {Object} app_spot - Commencer le nettoyage localisé
 * @property {Object} app_zoned_clean - Démarrer le nettoyage de la zone
 * @property {Object} resume_zoned_clean - Reprendre le nettoyage des zones
 * @property {Object} stop_zoned_clean - Nettoyage de la zone d'arrêt
 * @property {Object} set_custom_mode - Définir le mode personnalisé ou la puissance d'aspiration
 * @property {Object} find_me - Trouver le robot
 * @property {Object} app_goto_target - Aller à la cible
 * @property {Object} set_mop_mode - Itinéraire de la vadrouille
 * @property {Object} set_water_box_custom_mode - Intensité du gommage
 * @property {Object} set_carpet_mode - Boost de tapis
 * @property {Object} set_carpet_clean_mode - Mode d'évitement de tapis
 */
const commands = {
	app_start: {
		type: "boolean",
		name: "Start vacuum",
		def: false,
		states: null,
		write: true,
	},
	app_segment_clean: {
		type: "boolean",
		name: "Start room cleaning",
		def: false,
		states: null,
		write: true,
	},
	resume_segment_clean: {
		type: "boolean",
		name: "Resume room cleaning",
		def: false,
		states: null,
		write: true,
	},
	app_stop: {
		type: "boolean",
		name: "Stop vacuum",
		def: false,
		states: null,
		write: true,
	},
	app_pause: {
		type: "boolean",
		name: "Pause vacuum",
		def: false,
		states: null,
		write: true,
	},
	app_charge: {
		type: "boolean",
		name: "Charge vacuum",
		def: false,
		states: null,
		write: true,
	},
	app_spot: {
		type: "boolean",
		name: "Spot cleaning",
		def: false,
		states: null,
		write: true,
	},
	app_zoned_clean: {
		type: "json",
		name: "Zone cleaning",
		write: true,
	},
	resume_zoned_clean: {
		type: "boolean",
		name: "Resume zone cleaning",
		def: false,
		write: true,
	},
	stop_zoned_clean: {
		type: "boolean",
		name: "Stop zone cleaning",
		def: false,
		write: true,
	},
	set_custom_mode: {
		type: "number",
		name: "Suction Power",
		def: 101,
		states: states["fan_power"],
		write: true,
	},
	find_me: {
		type: "boolean",
		name: "Find me",
		def: false,
		write: true,
	},
	app_goto_target: {
		type: "json",
		name: "Go to",
		def: null,
		write: true,
	},
	set_mop_mode: {
		type: "number",
		name: "Mop Route",
		def: 300,
		states: states["mop_mode"],
		write: true,
	},
	set_water_box_custom_mode: {
		type: "number",
		name: "Scrub Intensity",
		def: 201,
		states: states["water_box_custom_mode"],
		write: true,
	},
	set_carpet_mode: {
		type: "string",
		name: "Carpet Boost",
		def: '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]',
		states: states["carpet_mode"],
		write: true,
	},
	set_carpet_clean_mode: {
		type: "string",
		name: "Carpet Avoidance Mode",
		def: '{"carpet_clean_mode": 1}',
		states: states["carpet_clean_mode"],
		write: true,
	},
};

/**
 * @namespace cleaningInfo
 * @description Description des informations de nettoyage.
 * @property {Object} clean_time - Temps de nettoyage
 * @property {Object} clean_area - Zone nettoyée
 * @property {Object} clean_count - Cycles de nettoyage totaux
 * @property {Object} dust_collection_count - Registres de nettoyage totaux
 */
const cleaningInfo = {
	clean_time: { name: "Total Time", type: "number", unit: "h", write: false },
	clean_area: { name: "Total Area", type: "number", unit: "m²", write: false },
	clean_count: { name: "Cycles", type: "number", write: false },
	dust_collection_count: {
		name: "Times Dust Collected",
		type: "number",
		write: false,
	},
};

/**
 * @namespace cleaningRecords
 * @description Description des dossiers de nettoyage.
 * @property {Object} begin - Commencer le temps de nettoyage
 * @property {Object} end - Fin du temps de nettoyage
 * @property {Object} duration - Durée temps de nettoyage
 * @property {Object} area - Zone de nettoyage
 * @property {Object} error - Type d'erreur
 * @property {Object} complete - Type d'achèvement
 * @property {Object} start_type - Type de démarrage
 * @property {Object} clean_type - Type propre
 * @property {Object} finish_reason - Raison de la finition propre
 * @property {Object} dust_collection_status - @dust_collection_status_description@
 */
const cleaningRecords = {
	begin: {
		name: "Start cleaning time",
		type: "string",
		write: false,
	},
	end: {
		name: "End cleaning time",
		type: "string",
		write: false,
	},
	duration: {
		name: "Duration cleaning time",
		type: "number",
		unit: "min",
		write: false,
	},
	area: {
		name: "Cleaning Area",
		type: "number",
		unit: "m²",
		write: false,
	},
	error: {
		name: "Error Type",
		type: "number",
		write: false,
	},
	complete: {
		name: "Completion Type",
		type: "number",
		write: false,
	},
	start_type: {
		name: "Start Type",
		type: "number",
		write: false,
	},
	clean_type: {
		name: "Clean Type",
		type: "number",
		write: false,
	},
	finish_reason: {
		name: "Clean Finish Reason",
		type: "number",
		write: false,
	},
	dust_collection_status: {
		name: "Dust Collection Status",
		type: "number",
		write: false,
	},
};

module.exports = {
	states,
	deviceStatus,
	consumables,
	resetConsumables,
	cleaningInfo,
	cleaningRecords,
	commands,
};
export const APPPLUGIN_MAP_LAYER_IDS = [
	"baseMap",
	"roomMaterials",
	"autoCarpets",
	"manualCarpets",
	"restrictedAreas",
	"thresholds",
	"cleanZones",
	"additionalClean",
	"path",
	"dock",
	"robot",
	"obstacles",
	"skippedAreas",
	"suspectedAreas",
	"rooms",
	"eraseAreas",
	"roomSplit",
	"furniture",
	"goToPin",
] as const;

export type AppPluginMapLayerId = (typeof APPPLUGIN_MAP_LAYER_IDS)[number];
export type AppPluginLabMode =
	| "view"
	| "rooms"
	| "zones"
	| "noGo"
	| "noMop"
	| "virtualWall"
	| "pin";
export type AppPluginLabSceneMode = "original" | "catalog";
export type AppPluginLayerEvidence = "original-fixture" | "catalog-demo" | "native-contract-pending";

export interface AppPluginLayerDefinition {
	id: AppPluginMapLayerId;
	label: string;
	originalLayer: string;
	evidence: AppPluginLayerEvidence;
	description: string;
}

export interface AppPluginLabPoint {
	x: number;
	y: number;
}

export interface AppPluginLabArea {
	id?: number;
	type: string;
	name?: string;
	points: AppPluginLabPoint[];
}

export interface AppPluginLabRoom {
	roomID: number;
	roomName: string;
	roomType: number;
	roomMaterial: number;
	colorID: number;
	cleanOrder: number;
	transCenterPoint: AppPluginLabPoint;
	borderArr: AppPluginLabPoint[][];
}

export interface AppPluginLabScene {
	schemaVersion: number;
	id: string;
	label: string;
	source: "original-appplugin-fixture";
	model: string;
	mapId: number;
	width: number;
	height: number;
	resolution: number;
	rasterDataUrl: string;
	originalRender?: {
		width: number;
		height: number;
		rasterDataUrl: string;
		sha256: string;
	};
	rooms: AppPluginLabRoom[];
	materialPaths: Record<string, AppPluginLabPoint[][]>;
	path: Array<AppPluginLabPoint & { type?: number; update?: number }>;
	robot: (AppPluginLabPoint & { phi?: number }) | null;
	dock: (AppPluginLabPoint & { phi?: number }) | null;
	obstacles: Array<{ point: AppPluginLabPoint; type: string }>;
	skipped: Array<{ point: AppPluginLabPoint; type: string }>;
	suspected: Array<{ point: AppPluginLabPoint; type: string }>;
	autoCarpets: Array<{ id: number; left: number; top: number; right: number; bottom: number }>;
	manualCarpets: AppPluginLabArea[];
	forbidAreas: AppPluginLabArea[];
	mopAreas: AppPluginLabArea[];
	thresholdAreas: AppPluginLabArea[];
	eraseAreas: AppPluginLabArea[];
	virtualWalls: Array<{ id?: number; type: string; points: [AppPluginLabPoint, AppPluginLabPoint] }>;
	verification: {
		items: Record<string, { state: string; observedInCurrentSampleSet: boolean; presentInThisMap: boolean }>;
	};
}

export const APPPLUGIN_MAP_LAYERS: readonly AppPluginLayerDefinition[] = [
	{ id: "baseMap", label: "Basiskarte", originalLayer: "map", evidence: "original-fixture", description: "Wände, Boden und originale Raumfarben" },
	{ id: "roomMaterials", label: "Bodenmaterial", originalLayer: "caizhi", evidence: "catalog-demo", description: "Fliesen sowie horizontale und vertikale Holzböden" },
	{ id: "autoCarpets", label: "Erkannte Teppiche", originalLayer: "zishibieditan", evidence: "original-fixture", description: "Vom Roboter selbst erkannte Teppichflächen" },
	{ id: "manualCarpets", label: "Manuelle Teppiche", originalLayer: "shoudongditan", evidence: "catalog-demo", description: "Vom Benutzer gezeichnete Teppiche" },
	{ id: "restrictedAreas", label: "Sperrflächen", originalLayer: "jinqu", evidence: "catalog-demo", description: "No-Go, No-Mop und virtuelle Wände" },
	{ id: "thresholds", label: "Schwellen", originalLayer: "menkan", evidence: "catalog-demo", description: "Türschwellen und Übergänge" },
	{ id: "cleanZones", label: "Reinigungszonen", originalLayer: "huaqu", evidence: "catalog-demo", description: "Erzeugen, verschieben, skalieren und löschen" },
	{ id: "additionalClean", label: "Zusatzreinigung", originalLayer: "jiasao", evidence: "catalog-demo", description: "Temporäre Nachreinigungsfläche" },
	{ id: "path", label: "Fahrweg", originalLayer: "lujing", evidence: "original-fixture", description: "Haupt-, Wisch-, Rückwasch- und Reinpfad" },
	{ id: "dock", label: "Dock", originalLayer: "dianyuan", evidence: "original-fixture", description: "Ladestation inklusive Orientierung" },
	{ id: "robot", label: "Roboter", originalLayer: "jiqiren", evidence: "original-fixture", description: "Position und Orientierung" },
	{ id: "obstacles", label: "Hindernisse", originalLayer: "zhangaiwu", evidence: "original-fixture", description: "Erkannte Objekte und Fotohinweis" },
	{ id: "skippedAreas", label: "Übersprungen", originalLayer: "tiaoGuo", evidence: "catalog-demo", description: "Nicht gereinigte beziehungsweise übersprungene Punkte" },
	{ id: "suspectedAreas", label: "Verdachtsobjekte", originalLayer: "yisi", evidence: "catalog-demo", description: "Easycard, Klippe und vermutete Schwelle" },
	{ id: "rooms", label: "Räume", originalLayer: "fangjian", evidence: "original-fixture", description: "Labels, Auswahl, Reihenfolge und Reinigungsparameter" },
	{ id: "eraseAreas", label: "Löschbereiche", originalLayer: "mochu", evidence: "catalog-demo", description: "Kartenbereiche ausblenden oder löschen" },
	{ id: "roomSplit", label: "Raumteilung", originalLayer: "fenge", evidence: "catalog-demo", description: "Teilungslinie mit zwei Griffen" },
	{ id: "furniture", label: "Möbel / 3D-Objekte", originalLayer: "tanos-native", evidence: "native-contract-pending", description: "Nur in Tanos-/3D-Familien; nativer Hostvertrag noch offen" },
	{ id: "goToPin", label: "Zielpunkt", originalLayer: "navigation", evidence: "catalog-demo", description: "Pin-and-Go mit Zielkoordinate" },
] as const;

export const APPPLUGIN_LAB_MODES: ReadonlyArray<{ id: AppPluginLabMode; label: string }> = [
	{ id: "view", label: "Ansehen" },
	{ id: "rooms", label: "Räume" },
	{ id: "zones", label: "Zone" },
	{ id: "noGo", label: "No-Go" },
	{ id: "noMop", label: "No-Mop" },
	{ id: "virtualWall", label: "Virtuelle Wand" },
	{ id: "pin", label: "Zielpunkt" },
] as const;

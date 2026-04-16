import * as path from "path";

const Q10_PLUGIN_ROOT = path.join(
	process.cwd(),
	".AppPlugins",
	"Q10 X5+",
	"019bdf41f583723bb937ccc99bbd7541"
);

const DRAWABLE_DIR = "drawable-mdpi";
const RAW_DIR = "raw";

function drawable(name: string): string {
	return path.posix.join(DRAWABLE_DIR, name);
}

function drawableList(prefix: string, count: number, suffix = ".png"): string[] {
	return Array.from({ length: count }, (_, index) => drawable(`${prefix}${index}${suffix}`));
}

function raw(name: string): string {
	return path.posix.join(RAW_DIR, name);
}

export function resolveQ10PluginAssetPath(relativePath: string): string {
	return path.join(Q10_PLUGIN_ROOT, ...relativePath.split("/"));
}

export const Q10AssetCatalog = {
	root: Q10_PLUGIN_ROOT,
	drawableDir: DRAWABLE_DIR,
	rawDir: RAW_DIR,
	device: drawable("src_resources_map_images_light_mapdevice.png"),
	power: drawable("src_resources_map_images_light_mappower.png"),
	areaDelete: drawable("src_resources_map_images_light_mapareadelete.png"),
	areaRotate: drawable("src_resources_map_images_light_maparearotate.png"),
	forbidlineIcon: drawable("src_resources_map_images_light_mapforbidlineicon.png"),
	roomSpliteLeveling: drawable("src_resources_map_images_light_maproomspliteleveling.png"),
	roomTags: drawableList("src_resources_map_images_light_maproomtag", 12),
	roomConfigFun: drawableList("src_resources_home_images_fun_", 5),
	roomConfigWater: drawableList("src_resources_home_images_water_", 3),
	roomConfigLine: drawableList("src_resources_home_images_device_clean_line_", 3),
	roomConfigTimes: [
		drawable("src_resources_home_images_times_1.png"),
		drawable("src_resources_home_images_times_2.png")
	],
	floorTypeNormal: [
		drawable("src_resources_images_light_floor_hdb_normal.png"),
		drawable("src_resources_images_light_floor_sdb_normal.png"),
		drawable("src_resources_images_light_floor_cz_normal.png"),
		drawable("src_resources_images_light_floor_other_normal.png")
	],
	floorTypeSelected: [
		drawable("src_resources_images_light_floor_hdb_selected.png"),
		drawable("src_resources_images_light_floor_sdb_selected.png"),
		drawable("src_resources_images_light_floor_cz_selected.png"),
		drawable("src_resources_images_light_floor_other_selected.png")
	],
	roomPop: drawable("src_resources_map_images_light_maproomtagpop.png"),
	mapCarpetMaterial: drawable("src_resources_map_images_light_mapcarpetmaterial.png"),
	mapArrow: drawable("src_resources_map_images_light_map_arrow.png"),
	mapCarpetCleanTypeSelected: [
		drawable("src_resources_map_images_light_map_carpet_guibi_sel.png"),
		drawable("src_resources_map_images_light_map_carpet_wushi_sel.png"),
		drawable("src_resources_map_images_light_map_carpet_chuanyue_sel.png"),
		drawable("src_resources_map_images_light_map_carpet_zishiying_sel.png")
	],
	mapCarpetCleanTypeNormal: [
		drawable("src_resources_map_images_light_map_carpet_guibi.png"),
		drawable("src_resources_map_images_light_map_carpet_wushi.png"),
		drawable("src_resources_map_images_light_map_carpet_chuanyue.png"),
		drawable("src_resources_map_images_light_map_carpet_zishiying.png")
	],
	mapThresholdMaterial: drawable("src_resources_map_images_light_map_thresholdmaterial.png"),
	deviceAnimations: {
		waiting: drawable("src_resources_map_images_devicepop_light_map_ani_waiting.png"),
		mapping: drawable("src_resources_map_images_devicepop_light_map_ani_mapping.png"),
		sweepMop: drawable("src_resources_map_images_devicepop_light_map_ani_sweepmop.png"),
		sweeping: drawable("src_resources_map_images_devicepop_light_map_ani_sweeping.png"),
		notDisturb: drawable("src_resources_map_images_devicepop_light_map_ani_notdisturb.png"),
		charging: drawable("src_resources_map_images_devicepop_light_map_ani_chargeing.png"),
		mopping: drawable("src_resources_map_images_devicepop_light_map_ani_mopping.png"),
		sleep: drawable("src_resources_map_images_devicepop_light_map_ani_sleep.png"),
		offline: drawable("src_resources_map_images_devicepop_light_map_ani_offline.png"),
		fault: drawable("src_resources_map_images_devicepop_light_map_ani_fault.png"),
		jichen: drawable("src_resources_map_images_devicepop_light_map_ani_jichen.png"),
		remote: drawable("src_resources_map_images_devicepop_light_map_ani_yaokong.png"),
		spot: drawable("src_resources_map_images_devicepop_light_map_ani_jubu.png"),
		returning: drawable("src_resources_map_images_devicepop_light_map_ani_huichong.png"),
		pauseSweepMop: drawable("src_resources_map_images_devicepop_light_map_ani_saotuozanting.png"),
		pauseMop: drawable("src_resources_map_images_devicepop_light_map_ani_tuozanting.png"),
		pauseSweep: drawable("src_resources_map_images_devicepop_light_map_ani_saozanting.png"),
		pauseMapping: drawable("src_resources_map_images_devicepop_light_map_ani_jiantuzanting.png"),
		pauseSpot: drawable("src_resources_map_images_devicepop_light_map_ani_jubuzanting.png"),
		waitCharge: drawable("src_resources_map_images_devicepop_light_map_ani_dengdaichongdian.png")
	},
	obstacle: drawable("src_resources_map_images_light_mapobstacle.png"),
	yisiMenkan: drawable("src_resources_map_images_light_map_yisi_menkan.png"),
	yisiYika: drawable("src_resources_map_images_light_map_yisi_yika.png"),
	yisiXuanya: drawable("src_resources_map_images_light_map_yisi_xuanya.png"),
	popMenkanIcon: drawable("src_resources_map_images_light_map_pop_menkan_icon.png"),
	popYikaIcon: drawable("src_resources_map_images_light_map_pop_yika_icon.png"),
	popXuanyaIcon: drawable("src_resources_map_images_light_map_pop_xuanya_icon.png"),
	mapArrowDown: drawable("src_resources_map_images_light_map_jiantou_xia.png"),
	tiaoGuoIcon: drawable("src_resources_map_images_light_map_tiaoguo_icon.png"),
	rawDeviceAnimations: {
		waiting: raw("src_resources_map_images_devicepop_light_map_ani_waiting.pag"),
		mapping: raw("src_resources_map_images_devicepop_light_map_ani_mapping.pag"),
		sweepMop: raw("src_resources_map_images_devicepop_light_map_ani_sweepmop.pag"),
		sweeping: raw("src_resources_map_images_devicepop_light_map_ani_sweeping.pag"),
		notDisturb: raw("src_resources_map_images_devicepop_light_map_ani_notdisturb.pag"),
		charging: raw("src_resources_map_images_devicepop_light_map_ani_chargeing.pag"),
		mopping: raw("src_resources_map_images_devicepop_light_map_ani_mopping.pag"),
		sleep: raw("src_resources_map_images_devicepop_light_map_ani_sleep.pag"),
		offline: raw("src_resources_map_images_devicepop_light_map_ani_offline.pag"),
		fault: raw("src_resources_map_images_devicepop_light_map_ani_fault.pag")
	}
} as const;

export type Q10AssetCatalogKey = keyof typeof Q10AssetCatalog;

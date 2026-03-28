import type { B01DeviceStatus, B01MapData } from "../b01/types";
import type { Q10DevicePose, Q10SourceData } from "./types";

const Q10_DOCK_ANCHORED_STATES = new Set<number>([
	8, // Charging
	15, // Docking / wait charge-like state
	22, // Emptying dust container
	100 // Fully charged
]);

function rotateVector(x: number, y: number, degrees: number): { x: number; y: number } {
	const radians = (degrees * Math.PI) / 180;
	const cos = Math.cos(radians);
	const sin = Math.sin(radians);
	return {
		x: x * cos - y * sin,
		y: x * sin + y * cos
	};
}

function shouldAnchorRobotToDock(deviceStatus?: B01DeviceStatus): boolean {
	return !!deviceStatus && Q10_DOCK_ANCHORED_STATES.has(deviceStatus.deviceState);
}

function devicePointToPixel(source: Q10SourceData, point: Q10DevicePose): { x: number; y: number } {
	return {
		x: source.xMin + point.x,
		y: source.yMin - point.y
	};
}

export function applyQ10RuntimePose(mapData: B01MapData, deviceStatus?: B01DeviceStatus): B01MapData {
	const creator = mapData.q10CreatorData;
	const source = mapData.q10SourceData;
	if (
		!creator?.q10Detected ||
		!creator.chargerPixel ||
		!source?.chargePosition ||
		!shouldAnchorRobotToDock(deviceStatus)
	) {
		return mapData;
	}

	// Source-first: module_1630.za + module_949.updateDevicePosition synthesize
	// a docked robot pose from the charger when no live path pose is available.
	const chargerPhi = source.chargePosition.phi ?? creator.chargerPixel.phi ?? 0;
	const offset = rotateVector(3.5 * creator.mapRate, 0, chargerPhi);
	const robotDevicePose: Q10DevicePose = {
		x: source.chargePosition.x + offset.x,
		y: source.chargePosition.y + offset.y,
		phi: chargerPhi
	};
	const robotPixel = devicePointToPixel(source, robotDevicePose);
	const robotWorld = {
		x: mapData.header.minX + robotDevicePose.x,
		y: mapData.header.maxY - robotDevicePose.y,
		phi: chargerPhi
	};

	return {
		...mapData,
		robotPos: robotWorld,
		q10SourceData: {
			...source,
			robotPosition: robotDevicePose
		},
		q10CreatorData: {
			...creator,
			robotPixel: {
				...robotPixel,
				phi: chargerPhi
			}
		}
	};
}

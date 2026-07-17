import { jsonArray, jsonRecord, type JsonRecord } from "./q7FullSceneEvidence";

export interface Q7RoomSelectionDiagnostic {
	allRoomsCount: number;
	selectedRoomCount: number;
	selectedRoomIds: readonly number[];
}

export function collectQ7RoomSelectionDiagnostics(logsValue: unknown): Q7RoomSelectionDiagnostic[] {
	return jsonArray(logsValue, "appSysLogs").flatMap((logValue, index) => {
		const log = jsonRecord(logValue, `appSysLogs[${index}]`);
		if (log.tag !== "apk-react-state-probe" || typeof log.message !== "string") return [];
		let message: JsonRecord;
		try {
			message = jsonRecord(JSON.parse(log.message) as unknown, `appSysLogs[${index}].message`);
		} catch {
			return [];
		}
		const allRoomsCount = Number(message.allRoomsCount);
		const selectedRoomCount = Number(message.selectedRoomCount);
		if (!Number.isSafeInteger(allRoomsCount) || allRoomsCount < 0
			|| !Number.isSafeInteger(selectedRoomCount) || selectedRoomCount < 0
			|| typeof message.selectedRoomIdSignature !== "string") {
			return [];
		}
		const selectedRoomIds = message.selectedRoomIdSignature.length === 0
			? []
			: message.selectedRoomIdSignature.split(",").map((value, roomIndex) => {
				const roomId = Number(value);
				if (!Number.isSafeInteger(roomId) || roomId < 0) {
					throw new Error(`AppPlugin-Raum-ID ${roomIndex} ist ungültig: ${value}`);
				}
				return roomId;
			});
		if (selectedRoomIds.length !== selectedRoomCount) {
			throw new Error(
				`AppPlugin meldet ${selectedRoomCount} ausgewählte Räume, aber IDs=${message.selectedRoomIdSignature}`,
			);
		}
		return [{ allRoomsCount, selectedRoomCount, selectedRoomIds }];
	});
}

export function finalQ7RoomSelectionDiagnostic(
	logsValue: unknown,
	expectedRoomCount: number,
): Q7RoomSelectionDiagnostic {
	const matches = collectQ7RoomSelectionDiagnostics(logsValue)
		.filter(diagnostic => diagnostic.allRoomsCount === expectedRoomCount);
	const finalDiagnostic = matches.at(-1);
	if (!finalDiagnostic) {
		throw new Error(`AppPlugin meldete keinen finalen Auswahlzustand für ${expectedRoomCount} Räume`);
	}
	return finalDiagnostic;
}

export function buildQ7RoomSelectionMapEvidence(fullSceneEvidenceValue: unknown): JsonRecord {
	const fullSceneEvidence = jsonRecord(fullSceneEvidenceValue, "Full-Scene-Evidence");
	const map = jsonRecord(fullSceneEvidence.map, "Full-Scene-Evidence.map");
	return {
		paths: jsonArray(map.paths, "Full-Scene-Evidence.map.paths"),
		coloredViews: jsonArray(map.coloredViews, "Full-Scene-Evidence.map.coloredViews"),
		roomLabelLayouts: jsonArray(map.roomLabelLayouts, "Full-Scene-Evidence.map.roomLabelLayouts"),
		render: jsonRecord(map.render, "Full-Scene-Evidence.map.render"),
	};
}

export function q7RoomPathGeometry(mapEvidenceValue: unknown): JsonRecord[] {
	const mapEvidence = jsonRecord(mapEvidenceValue, "Raumauswahl-Kartenevidence");
	return jsonArray(mapEvidence.paths, "Raumauswahl-Kartenevidence.paths").map((pathValue, index) => {
		const path = jsonRecord(pathValue, `Raumauswahl-Kartenevidence.paths[${index}]`);
		return {
			dataLength: path.dataLength,
			dataSha256: path.dataSha256,
			stroke: path.stroke,
			strokeWidth: path.strokeWidth,
		};
	});
}

import { describe, expect, it } from "vitest";

import {
	collectQ7RoomSelectionDiagnostics,
	finalQ7RoomSelectionDiagnostic,
	q7RoomPathGeometry,
} from "../../scripts/lib/q7RoomSelectionEvidence";

describe("Q7 AppPlugin room selection evidence", () => {
	it("reads selection IDs from the AppPlugin React state log and ignores unrelated logs", () => {
		const logs = [
			{ level: "info", tag: "other", message: "{}" },
			{ level: "info", tag: "apk-react-state-probe", message: "not-json" },
			{
				level: "info",
				tag: "apk-react-state-probe",
				message: JSON.stringify({
					allRoomsCount: 4,
					selectedRoomCount: 0,
					selectedRoomIdSignature: "",
				}),
			},
			{
				level: "info",
				tag: "apk-react-state-probe",
				message: JSON.stringify({
					allRoomsCount: 4,
					selectedRoomCount: 2,
					selectedRoomIdSignature: "10,11",
				}),
			},
		];

		expect(collectQ7RoomSelectionDiagnostics(logs)).toEqual([
			{ allRoomsCount: 4, selectedRoomCount: 0, selectedRoomIds: [] },
			{ allRoomsCount: 4, selectedRoomCount: 2, selectedRoomIds: [10, 11] },
		]);
		expect(finalQ7RoomSelectionDiagnostic(logs, 4)).toEqual({
			allRoomsCount: 4,
			selectedRoomCount: 2,
			selectedRoomIds: [10, 11],
		});
	});

	it("rejects a count/signature mismatch instead of inventing missing IDs", () => {
		expect(() => collectQ7RoomSelectionDiagnostics([{
			level: "info",
			tag: "apk-react-state-probe",
			message: JSON.stringify({
				allRoomsCount: 4,
				selectedRoomCount: 2,
				selectedRoomIdSignature: "10",
			}),
		}])).toThrow("AppPlugin meldet 2 ausgewählte Räume");
	});

	it("separates stable geometry from AppPlugin-owned path fills", () => {
		const first = {
			paths: [{
				fill: 1,
				stroke: 2,
				strokeWidth: 0.5,
				dataLength: 12,
				dataSha256: "abc",
			}],
		};
		const second = {
			paths: [{
				fill: 99,
				stroke: 2,
				strokeWidth: 0.5,
				dataLength: 12,
				dataSha256: "abc",
			}],
		};

		expect(q7RoomPathGeometry(first)).toEqual(q7RoomPathGeometry(second));
		expect(first.paths).not.toEqual(second.paths);
	});
});

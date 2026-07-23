import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

interface ResourceBaseline {
	readonly schemaVersion: number;
	readonly status: string;
	readonly platform: string;
	readonly architecture: string;
	readonly bundle: {
		readonly kind: string;
		readonly unchanged: boolean;
		readonly sha256: string;
	};
	readonly measurement: {
		readonly descendantProcessesIncluded: boolean;
		readonly collectorProcessExcluded: boolean;
		readonly sampleCount: number;
		readonly peakResidentSetBytes: number;
		readonly cpuMicroseconds: number;
		readonly peakProcessCount: number;
		readonly processNames: readonly string[];
		readonly processTreeCleanupDurationMs: number;
		readonly leakedProcessCount: number;
	};
	readonly transitions: readonly {
		readonly phase: string;
		readonly offsetMs: number;
	}[];
}

function readBaseline(): ResourceBaseline {
	const filePath = path.join(
		process.cwd(),
		"docs",
		"generated",
		"appplugin-resource-baseline.win32-x64.json",
	);
	return JSON.parse(fs.readFileSync(filePath, "utf8")) as ResourceBaseline;
}

describe("AppPlugin process-tree resource baseline", () => {
	it("covers the unchanged Q7 Hermes runtime and its complete observed process tree", () => {
		const baseline = readBaseline();

		expect(baseline).toMatchObject({
			schemaVersion: 1,
			status: "passed",
			platform: "win32",
			architecture: "x64",
			bundle: {
				kind: "hermes-bytecode",
				unchanged: true,
			},
			measurement: {
				descendantProcessesIncluded: true,
				collectorProcessExcluded: true,
				leakedProcessCount: 0,
			},
		});
		expect(baseline.bundle.sha256).toMatch(/^[a-f0-9]{64}$/u);
		expect(baseline.measurement.sampleCount).toBeGreaterThan(1);
		expect(baseline.measurement.peakResidentSetBytes).toBeGreaterThan(0);
		expect(baseline.measurement.cpuMicroseconds).toBeGreaterThan(0);
		expect(baseline.measurement.peakProcessCount).toBeGreaterThanOrEqual(2);
		expect(baseline.measurement.processTreeCleanupDurationMs).toBeGreaterThanOrEqual(0);
		expect(baseline.measurement.processNames).toContain("node.exe");
		expect(baseline.measurement.processNames).toContain("roborock-hermes-appplugin-host.exe");
	});

	it("observes startup, passive idle, device replay, interaction and cleanup boundaries", () => {
		const transitions = readBaseline().transitions;
		const phases = transitions.map(transition => transition.phase);

		expect(phases).toEqual(expect.arrayContaining([
			"startup",
			"bundle-ready",
			"root-idle",
			"device-replay",
			"interaction",
			"interaction-idle",
			"cleanup",
			"hermes-stopped",
		]));
		expect(transitions.every((transition, index) =>
			index === 0 || transition.offsetMs >= transitions[index - 1].offsetMs
		)).toBe(true);
	});
});

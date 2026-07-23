import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

interface ResourceBaseline {
	readonly schemaVersion: number;
	readonly status: string;
	readonly platform: string;
	readonly architecture: string;
	readonly runCount: number;
	readonly bundle: {
		readonly kind: string;
		readonly unchanged: boolean;
		readonly sha256: string;
	};
	readonly summary: {
		readonly requestedSampleIntervalMs: number;
		readonly effectiveAverageSampleIntervalMs: {
			readonly minimum: number;
			readonly median: number;
			readonly average: number;
			readonly maximum: number;
		};
		readonly maximumSampleGapMs: {
			readonly maximum: number;
		};
		readonly peakResidentSetBytes: {
			readonly maximum: number;
		};
		readonly cpuMicroseconds: {
			readonly maximum: number;
		};
		readonly peakProcessCount: {
			readonly minimum: number;
		};
		readonly processTreeCleanupDurationMs: {
			readonly maximum: number;
		};
		readonly leakedProcessCount: number;
		readonly processNames: readonly string[];
	};
	readonly runs: readonly {
		readonly status: string;
		readonly measurement: {
		readonly descendantProcessesIncluded: boolean;
		readonly collectorProcessExcluded: boolean;
		readonly counterSampler: string;
		readonly sampleCount: number;
		readonly effectiveAverageSampleIntervalMs: number;
		readonly maximumSampleGapMs: number;
		readonly leakedProcessCount: number;
		};
		readonly transitions: readonly {
		readonly phase: string;
		readonly offsetMs: number;
		}[];
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
			schemaVersion: 2,
			status: "passed",
			platform: "win32",
			architecture: "x64",
			runCount: 3,
			bundle: {
				kind: "hermes-bytecode",
				unchanged: true,
			},
			summary: {
				leakedProcessCount: 0,
			},
		});
		expect(baseline.bundle.sha256).toMatch(/^[a-f0-9]{64}$/u);
		expect(baseline.runs).toHaveLength(3);
		expect(baseline.summary.peakResidentSetBytes.maximum).toBeGreaterThan(0);
		expect(baseline.summary.cpuMicroseconds.maximum).toBeGreaterThan(0);
		expect(baseline.summary.peakProcessCount.minimum).toBeGreaterThanOrEqual(2);
		expect(baseline.summary.processTreeCleanupDurationMs.maximum).toBeGreaterThanOrEqual(0);
		expect(baseline.summary.processNames).toContain("node.exe");
		expect(baseline.summary.processNames).toContain("roborock-hermes-appplugin-host.exe");
		expect(baseline.runs.every(run =>
			run.status === "passed"
			&& run.measurement.descendantProcessesIncluded
			&& run.measurement.collectorProcessExcluded
			&& run.measurement.counterSampler === "persistent-targeted-windows-process-counter"
			&& run.measurement.sampleCount > 1
			&& run.measurement.leakedProcessCount === 0
		)).toBe(true);
	});

	it("proves that the persistent Windows counter stays close to the requested interval", () => {
		const baseline = readBaseline();

		expect(baseline.summary.requestedSampleIntervalMs).toBe(250);
		expect(baseline.summary.effectiveAverageSampleIntervalMs.maximum).toBeLessThanOrEqual(400);
		expect(baseline.summary.maximumSampleGapMs.maximum).toBeLessThanOrEqual(500);
	});

	it("observes startup, passive idle, device replay, interaction and cleanup boundaries", () => {
		for (const run of readBaseline().runs) {
			const phases = run.transitions.map(transition => transition.phase);

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
			expect(run.transitions.every((transition, index) =>
				index === 0 || transition.offsetMs >= run.transitions[index - 1].offsetMs
			)).toBe(true);
		}
	});
});

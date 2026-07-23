import { describe, expect, it } from "vitest";

import {
	aggregateAppPluginProcessTreeResources,
	createWindowsAppPluginProcessCounterCommand,
	parsePosixAppPluginProcessSnapshot,
	parseWindowsAppPluginProcessSnapshot,
	parseWindowsWmicAppPluginProcessSnapshot,
} from "../../src/lib/appplugin/IoBrokerAppPluginProcessTreeResources";

describe("AppPlugin process-tree resources", () => {
	it("parses Windows CIM records without losing 100-nanosecond CPU counters", () => {
		const entries = parseWindowsAppPluginProcessSnapshot(JSON.stringify([
			{
				ProcessId: 0,
				ParentProcessId: 0,
				Name: "System Idle Process",
				WorkingSetSize: "8192",
				KernelModeTime: "0",
				UserModeTime: "0",
				CreationDate: "20260720011849.188466+120",
			},
			{
				ProcessId: 100,
				ParentProcessId: 10,
				Name: "node.exe",
				WorkingSetSize: "1048576",
				KernelModeTime: "250000",
				UserModeTime: "750000",
				CreationDate: "2026-07-23T10:00:00.000000+02:00",
			},
		]));

		expect(entries).toEqual([{
			pid: 0,
			parentPid: 0,
			name: "System Idle Process",
			residentSetBytes: 8_192,
			cpuKernelMicroseconds: 0,
			cpuUserMicroseconds: 0,
			startedAtEpochMs: Date.parse("2026-07-20T01:18:49.188+02:00"),
		}, {
			pid: 100,
			parentPid: 10,
			name: "node.exe",
			residentSetBytes: 1_048_576,
			cpuKernelMicroseconds: 25_000,
			cpuUserMicroseconds: 75_000,
			startedAtEpochMs: Date.parse("2026-07-23T10:00:00.000+02:00"),
		}]);
	});

	it("parses the direct WMIC CSV fallback without depending on the machine name", () => {
		const entries = parseWindowsWmicAppPluginProcessSnapshot([
			"Node,CreationDate,KernelModeTime,Name,ParentProcessId,ProcessId,UserModeTime,WorkingSetSize",
			"HOST,20260723100000.000000+120,250000,node.exe,10,100,750000,1048576",
		].join("\r\n"));

		expect(entries).toEqual([{
			pid: 100,
			parentPid: 10,
			name: "node.exe",
			residentSetBytes: 1_048_576,
			cpuKernelMicroseconds: 25_000,
			cpuUserMicroseconds: 75_000,
			startedAtEpochMs: Date.parse("2026-07-23T10:00:00.000+02:00"),
		}]);
	});

	it("parses Linux and macOS ps counters including day-prefixed CPU times", () => {
		const entries = parsePosixAppPluginProcessSnapshot([
			" 100  10  1024  00:01.25  00:00.75 node",
			" 110 100  2048 1-02:03:04  00:00.50 roborock-hermes-appplugin-host",
		].join("\n"));

		expect(entries[0]).toMatchObject({
			pid: 100,
			residentSetBytes: 1_048_576,
			cpuUserMicroseconds: 1_250_000,
			cpuKernelMicroseconds: 750_000,
		});
		expect(entries[1]).toMatchObject({
			pid: 110,
			residentSetBytes: 2_097_152,
			cpuUserMicroseconds: 93_784_000_000,
			cpuKernelMicroseconds: 500_000,
		});
	});

	it("aggregates only the selected root and all transitive descendants", () => {
		const aggregate = aggregateAppPluginProcessTreeResources(100, [
			{ pid: 1, parentPid: 0, name: "init", residentSetBytes: 100, cpuUserMicroseconds: 1, cpuKernelMicroseconds: 2 },
			{ pid: 100, parentPid: 1, name: "node", residentSetBytes: 1_000, cpuUserMicroseconds: 10, cpuKernelMicroseconds: 20 },
			{ pid: 110, parentPid: 100, name: "hermes", residentSetBytes: 2_000, cpuUserMicroseconds: 30, cpuKernelMicroseconds: 40 },
			{ pid: 111, parentPid: 110, name: "worker", residentSetBytes: 3_000, cpuUserMicroseconds: 50, cpuKernelMicroseconds: 60 },
			{ pid: 200, parentPid: 1, name: "collector", residentSetBytes: 9_000, cpuUserMicroseconds: 90, cpuKernelMicroseconds: 90 },
		]);

		expect(aggregate).toMatchObject({
			rootPid: 100,
			processCount: 3,
			processIds: [100, 110, 111],
			processNames: ["hermes", "node", "worker"],
			residentSetBytes: 6_000,
			cpuMicroseconds: 210,
		});
		expect(aggregate.entries.map(entry => entry.pid)).toEqual([100, 110, 111]);
	});

	it("rejects temporally impossible child edges from a non-atomic Windows snapshot", () => {
		const aggregate = aggregateAppPluginProcessTreeResources(100, [
			{ pid: 100, parentPid: 1, name: "node", residentSetBytes: 1_000, cpuUserMicroseconds: 10, cpuKernelMicroseconds: 20, startedAtEpochMs: 2_000 },
			{ pid: 110, parentPid: 100, name: "hermes", residentSetBytes: 2_000, cpuUserMicroseconds: 30, cpuKernelMicroseconds: 40, startedAtEpochMs: 2_100 },
			{ pid: 120, parentPid: 100, name: "stale-git", residentSetBytes: 9_000, cpuUserMicroseconds: 90, cpuKernelMicroseconds: 90, startedAtEpochMs: 1_000 },
		]);

		expect(aggregate.processIds).toEqual([100, 110]);
		expect(aggregate.residentSetBytes).toBe(3_000);
	});

	it("builds a targeted persistent Windows counter without WMI polling", () => {
		const command = createWindowsAppPluginProcessCounterCommand(
			"C:\\temp\\appplugin targets.json",
			125,
		);

		expect(command).toContain("[Diagnostics.Process]::GetProcessById");
		expect(command).toContain("$sampleIntervalMs = 125");
		expect(command).toContain("'C:\\temp\\appplugin targets.json'");
		expect(command).toContain("WorkingSetSize = $process.WorkingSet64");
		expect(command).toContain("$targets += $parsedTargets");
		expect(command).toContain("catch [System.ComponentModel.Win32Exception]");
		expect(command).toContain("[Console]::Out.WriteLine('[]')");
		expect(command).not.toContain("Get-CimInstance");
		expect(command).not.toContain("wmic");
		expect(() => createWindowsAppPluginProcessCounterCommand("relative.json", 125))
			.toThrow(/absolut/u);
		expect(() => createWindowsAppPluginProcessCounterCommand("C:\\temp\\targets.json", 20))
			.toThrow(/zwischen 50 und 5000/u);
	});
});

import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface AppPluginProcessResourceEntry {
	readonly pid: number;
	readonly parentPid: number;
	readonly name: string;
	readonly residentSetBytes: number;
	readonly cpuUserMicroseconds: number;
	readonly cpuKernelMicroseconds: number;
	readonly startedAtEpochMs?: number;
}

export interface AppPluginProcessTreeResourceAggregate {
	readonly rootPid: number;
	readonly processCount: number;
	readonly processIds: readonly number[];
	readonly processNames: readonly string[];
	readonly residentSetBytes: number;
	readonly cpuMicroseconds: number;
	readonly entries: readonly AppPluginProcessResourceEntry[];
}

function safeNonNegativeInteger(value: unknown, label: string): number {
	const parsed = typeof value === "string" && value.trim().length > 0
		? Number(value)
		: value;
	if (typeof parsed !== "number" || !Number.isSafeInteger(parsed) || parsed < 0) {
		throw new Error(`${label} muss eine nichtnegative ganze Zahl sein`);
	}
	return parsed;
}

function safePid(value: unknown, label: string): number {
	const pid = safeNonNegativeInteger(value, label);
	if (pid < 1) throw new Error(`${label} muss größer als null sein`);
	return pid;
}

function windowsCpu100NanosecondsToMicroseconds(value: unknown, label: string): number {
	const ticks = safeNonNegativeInteger(value, label);
	return Math.floor(ticks / 10);
}

interface WindowsProcessRecord {
	readonly ProcessId?: unknown;
	readonly ParentProcessId?: unknown;
	readonly Name?: unknown;
	readonly WorkingSetSize?: unknown;
	readonly KernelModeTime?: unknown;
	readonly UserModeTime?: unknown;
	readonly CreationDate?: unknown;
}

function parseWindowsProcessCreationDate(value: unknown, label: string): number | undefined {
	if (value === null || value === undefined || value === "") return undefined;
	if (typeof value !== "string") throw new Error(`${label} muss eine Zeichenkette sein`);
	const wmic = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\.(\d{3})\d{3}([+-])(\d{3})$/u.exec(value);
	if (wmic) {
		const utc = Date.UTC(
			Number(wmic[1]),
			Number(wmic[2]) - 1,
			Number(wmic[3]),
			Number(wmic[4]),
			Number(wmic[5]),
			Number(wmic[6]),
			Number(wmic[7]),
		);
		const offsetMinutes = Number(wmic[9]) * (wmic[8] === "+" ? 1 : -1);
		return utc - offsetMinutes * 60_000;
	}
	const parsed = Date.parse(value);
	if (!Number.isFinite(parsed)) throw new Error(`${label} enthält kein gültiges Datum`);
	return parsed;
}

export function parseWindowsAppPluginProcessSnapshot(
	output: string,
): readonly AppPluginProcessResourceEntry[] {
	if (output.trim().length === 0) return [];
	const parsed = JSON.parse(output) as unknown;
	const records = Array.isArray(parsed) ? parsed : [parsed];
	return records.map((value, index) => {
		if (value === null || typeof value !== "object" || Array.isArray(value)) {
			throw new Error(`Windows-Prozessdatensatz ${index} ist kein Objekt`);
		}
		const record = value as WindowsProcessRecord;
		return Object.freeze({
			pid: safeNonNegativeInteger(record.ProcessId, `ProcessId[${index}]`),
			parentPid: safeNonNegativeInteger(record.ParentProcessId, `ParentProcessId[${index}]`),
			name: typeof record.Name === "string" ? record.Name : "",
			residentSetBytes: safeNonNegativeInteger(record.WorkingSetSize, `WorkingSetSize[${index}]`),
			cpuUserMicroseconds: windowsCpu100NanosecondsToMicroseconds(
				record.UserModeTime,
				`UserModeTime[${index}]`,
			),
			cpuKernelMicroseconds: windowsCpu100NanosecondsToMicroseconds(
				record.KernelModeTime,
				`KernelModeTime[${index}]`,
			),
			startedAtEpochMs: parseWindowsProcessCreationDate(
				record.CreationDate,
				`CreationDate[${index}]`,
			),
		});
	});
}

export function parseWindowsWmicAppPluginProcessSnapshot(
	output: string,
): readonly AppPluginProcessResourceEntry[] {
	const lines = output.split(/\r?\n/u).map(line => line.trim()).filter(Boolean);
	if (lines.length === 0) return [];
	const header = lines[0].split(",");
	const column = (name: string): number => {
		const index = header.indexOf(name);
		if (index < 0) throw new Error(`WMIC-Prozessausgabe enthält keine Spalte ${name}`);
		return index;
	};
	const columns = {
		kernel: column("KernelModeTime"),
		name: column("Name"),
		parentPid: column("ParentProcessId"),
		pid: column("ProcessId"),
		user: column("UserModeTime"),
		workingSet: column("WorkingSetSize"),
		created: column("CreationDate"),
	};
	return lines.slice(1).map((line, index) => {
		const fields = line.split(",");
		if (fields.length !== header.length) {
			throw new Error(`WMIC-Prozessdatensatz ${index} besitzt ${fields.length} statt ${header.length} Spalten`);
		}
		return Object.freeze({
			pid: safeNonNegativeInteger(fields[columns.pid], `ProcessId[${index}]`),
			parentPid: safeNonNegativeInteger(fields[columns.parentPid], `ParentProcessId[${index}]`),
			name: fields[columns.name],
			residentSetBytes: safeNonNegativeInteger(fields[columns.workingSet], `WorkingSetSize[${index}]`),
			cpuUserMicroseconds: windowsCpu100NanosecondsToMicroseconds(
				fields[columns.user],
				`UserModeTime[${index}]`,
			),
			cpuKernelMicroseconds: windowsCpu100NanosecondsToMicroseconds(
				fields[columns.kernel],
				`KernelModeTime[${index}]`,
			),
			startedAtEpochMs: parseWindowsProcessCreationDate(
				fields[columns.created],
				`CreationDate[${index}]`,
			),
		});
	});
}

function parsePosixCpuTime(value: string, label: string): number {
	const match = /^(?:(\d+)-)?(?:(\d+):)?(\d+):(\d+(?:\.\d+)?)$/u.exec(value);
	if (!match) throw new Error(`${label} enthält keine unterstützte CPU-Zeit: ${value}`);
	const days = Number(match[1] ?? 0);
	const hours = Number(match[2] ?? 0);
	const minutes = Number(match[3]);
	const seconds = Number(match[4]);
	const totalSeconds = (((days * 24) + hours) * 60 + minutes) * 60 + seconds;
	if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
		throw new Error(`${label} enthält keine gültige CPU-Zeit`);
	}
	return Math.round(totalSeconds * 1_000_000);
}

export function parsePosixAppPluginProcessSnapshot(
	output: string,
): readonly AppPluginProcessResourceEntry[] {
	const entries: AppPluginProcessResourceEntry[] = [];
	for (const [index, line] of output.split(/\r?\n/u).entries()) {
		if (line.trim().length === 0) continue;
		const match = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\S+)\s+(\S+)\s+(.+?)\s*$/u.exec(line);
		if (!match) throw new Error(`POSIX-Prozessdatensatz ${index} ist ungültig`);
		entries.push(Object.freeze({
			pid: safeNonNegativeInteger(match[1], `pid[${index}]`),
			parentPid: safeNonNegativeInteger(match[2], `ppid[${index}]`),
			residentSetBytes: safeNonNegativeInteger(match[3], `rss[${index}]`) * 1024,
			cpuUserMicroseconds: parsePosixCpuTime(match[4], `utime[${index}]`),
			cpuKernelMicroseconds: parsePosixCpuTime(match[5], `stime[${index}]`),
			name: match[6],
		}));
	}
	return entries;
}

export function aggregateAppPluginProcessTreeResources(
	rootPid: number,
	snapshot: readonly AppPluginProcessResourceEntry[],
): AppPluginProcessTreeResourceAggregate {
	safePid(rootPid, "rootPid");
	const byPid = new Map(snapshot.map(entry => [entry.pid, entry]));
	const children = new Map<number, number[]>();
	for (const entry of snapshot) {
		const siblings = children.get(entry.parentPid) ?? [];
		siblings.push(entry.pid);
		children.set(entry.parentPid, siblings);
	}
	const selected: AppPluginProcessResourceEntry[] = [];
	const pending = [rootPid];
	const visited = new Set<number>();
	while (pending.length > 0) {
		const pid = pending.shift()!;
		if (visited.has(pid)) continue;
		visited.add(pid);
		const entry = byPid.get(pid);
		if (entry) selected.push(entry);
		for (const childPid of children.get(pid) ?? []) {
			const child = byPid.get(childPid);
			if (!entry || !child) continue;
			if (
				entry.startedAtEpochMs !== undefined
				&& child.startedAtEpochMs !== undefined
				&& child.startedAtEpochMs < entry.startedAtEpochMs
			) {
				continue;
			}
			pending.push(childPid);
		}
	}
	selected.sort((left, right) => left.pid - right.pid);
	return Object.freeze({
		rootPid,
		processCount: selected.length,
		processIds: Object.freeze(selected.map(entry => entry.pid)),
		processNames: Object.freeze([...new Set(selected.map(entry => entry.name).filter(Boolean))].sort()),
		residentSetBytes: selected.reduce((sum, entry) => sum + entry.residentSetBytes, 0),
		cpuMicroseconds: selected.reduce(
			(sum, entry) => sum + entry.cpuUserMicroseconds + entry.cpuKernelMicroseconds,
			0,
		),
		entries: Object.freeze(selected),
	});
}

export async function captureAppPluginProcessSnapshot(
	platform: NodeJS.Platform = process.platform,
): Promise<readonly AppPluginProcessResourceEntry[]> {
	if (platform === "win32") {
		try {
			const { stdout } = await execFileAsync("wmic.exe", [
				"process",
				"get",
				"ProcessId,ParentProcessId,Name,WorkingSetSize,KernelModeTime,UserModeTime,CreationDate",
				"/format:csv",
			], {
				encoding: "utf8",
				maxBuffer: 16 * 1024 * 1024,
				timeout: 10_000,
				windowsHide: true,
			});
			return parseWindowsWmicAppPluginProcessSnapshot(stdout);
		} catch {
			// WMIC ist auf neuen Windows-Installationen optional. PowerShell/CIM
			// bleibt der unterstützte Ersatz mit identischem Datenschema.
		}
		const command = [
			"Get-CimInstance Win32_Process",
			"| Select-Object ProcessId,ParentProcessId,Name,WorkingSetSize,KernelModeTime,UserModeTime,CreationDate",
			"| ConvertTo-Json -Compress",
		].join(" ");
		const { stdout } = await execFileAsync("powershell.exe", [
			"-NoLogo",
			"-NoProfile",
			"-NonInteractive",
			"-Command",
			command,
		], {
			encoding: "utf8",
			maxBuffer: 16 * 1024 * 1024,
			timeout: 10_000,
			windowsHide: true,
		});
		return parseWindowsAppPluginProcessSnapshot(stdout);
	}
	if (platform === "linux" || platform === "darwin") {
		const { stdout } = await execFileAsync("ps", [
			"-axo",
			"pid=,ppid=,rss=,utime=,stime=,comm=",
		], {
			encoding: "utf8",
			maxBuffer: 16 * 1024 * 1024,
			timeout: 10_000,
		});
		return parsePosixAppPluginProcessSnapshot(stdout);
	}
	throw new Error(`Prozessbaum-Ressourcenmessung unterstützt ${platform} noch nicht`);
}

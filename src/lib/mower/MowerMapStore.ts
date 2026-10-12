/** A boundary belongs to one confirmed RockMow map, not to the vacuum map model. */
export interface MowerBoundary { id: number; name: string }

export interface MowerMapSelection {
	readonly mapName: string;
	readonly revision: number;
	readonly boundaries: readonly Readonly<MowerBoundary>[];
	readonly signal: AbortSignal;
}

export type MowerMapRequest =
	| { id: string; type: "GET_MAP_NAMES" }
	| { id: string; type: "GET_FULL_MAP"; modify_map: { name: string } }
	| { id: string; type: "APP_BUTTON"; app_button: "MOW_SELECT" | "MOW_EDGE"; modify_map: { boundaries: MowerBoundary[] } };

function requestId(timestamp: number): string {
	if (!Number.isSafeInteger(timestamp) || timestamp <= 0) throw new Error("Invalid mower protobuf id");
	return String(timestamp);
}

export function buildMowerMapNamesRequest(timestamp: number): MowerMapRequest {
	return { id: requestId(timestamp), type: "GET_MAP_NAMES" };
}

export function buildMowerFullMapRequest(mapName: string, timestamp: number): MowerMapRequest {
	if (!mapName || mapName.trim() !== mapName) throw new Error("Invalid mower map name");
	return { id: requestId(timestamp), type: "GET_FULL_MAP", modify_map: { name: mapName } };
}

export function buildMowerAreaRequest(selection: MowerMapSelection, timestamp: number, kind: "area" | "edge"): MowerMapRequest {
	if (selection.signal.aborted || selection.boundaries.length === 0) throw new Error("Mower map selection is stale or empty");
	return {
		id: requestId(timestamp), type: "APP_BUTTON", app_button: kind === "area" ? "MOW_SELECT" : "MOW_EDGE",
		modify_map: { boundaries: selection.boundaries.map(boundary => ({ id: boundary.id, name: boundary.name })) },
	};
}

/** Owns the current map identity and every boundary ID derived from that map. */
export class MowerMapStore {
	private mapName: string | null = null;
	private revision = 0;
	private controller = new AbortController();
	private boundaries = new Map<number, MowerBoundary>();
	private ready = false;

	public beginMap(mapName: string): number {
		this.invalidate();
		if (!mapName || mapName.trim() !== mapName) throw new Error("Invalid mower map name");
		this.mapName = mapName;
		return this.revision;
	}

	/** Accept only a decoded rock.common.Map from the current full-map request. */
	public acceptMap(mapName: string, revision: number, decodedMap: unknown): boolean {
		if (mapName !== this.mapName || revision !== this.revision) return false;
		// A replacement or invalid response invalidates selections already being encoded.
		this.controller.abort();
		this.controller = new AbortController();
		const map = decodedMap && typeof decodedMap === "object" && !Array.isArray(decodedMap) ? decodedMap as Record<string, unknown> : null;
		if (map?.name !== mapName || !Array.isArray(map.boundaries)) {
			this.boundaries.clear();
			this.ready = false;
			return false;
		}
		const next = new Map<number, MowerBoundary>();
		for (const item of map.boundaries) {
			if (!item || typeof item !== "object" || Array.isArray(item)) return this.rejectMap();
			const boundary = item as Record<string, unknown>;
			if (!Number.isInteger(boundary.id) || (boundary.id as number) < -2147483648 || (boundary.id as number) > 2147483647 || typeof boundary.name !== "string" || !boundary.name || next.has(boundary.id as number)) return this.rejectMap();
			next.set(boundary.id as number, { id: boundary.id as number, name: boundary.name });
		}
		this.boundaries = next;
		this.ready = true;
		return true;
	}

	public getCurrentMap(): string | null {
		return this.ready ? this.mapName : null;
	}
	public getBoundaries(): MowerBoundary[] {
		return this.ready ? [...this.boundaries.values()].map(boundary => ({ ...boundary })) : [];
	}

	public selectBoundaries(mapName: string, ids: number[]): MowerMapSelection {
		if (!this.ready || this.mapName !== mapName || ids.length === 0) throw new Error("Current mower map is unavailable");
		const seen = new Set<number>();
		const boundaries = ids.map(id => {
			if (!Number.isSafeInteger(id) || seen.has(id)) throw new Error("Invalid mower boundary selection");
			seen.add(id);
			const boundary = this.boundaries.get(id);
			if (!boundary) throw new Error("Boundary does not belong to the current mower map");
			return Object.freeze({ ...boundary });
		});
		return { mapName, revision: this.revision, boundaries: Object.freeze(boundaries), signal: this.controller.signal };
	}

	public isCurrent(selection: MowerMapSelection): boolean {
		return this.ready && !selection.signal.aborted && selection.signal === this.controller.signal && selection.mapName === this.mapName && selection.revision === this.revision;
	}

	public clear(): void {
		this.invalidate();
	}

	private rejectMap(): false {
		this.boundaries.clear();
		this.ready = false;
		return false;
	}

	private invalidate(): void {
		this.controller.abort();
		this.controller = new AbortController();
		this.revision++;
		this.mapName = null;
		this.boundaries.clear();
		this.ready = false;
	}
}

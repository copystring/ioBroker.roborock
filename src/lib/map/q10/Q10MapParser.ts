import type { B01MapData } from "../b01/types";
import type { Q10SourcePathPoint } from "./types";
import {
	applyQ10PathOnlyToB01,
	mergeQ10PersistentState,
	parseQ10PathOnlyToSourcePoints,
	parseQ10YxMapToB01
} from "./Q10YxMapParser";

/**
 * Dedicated Q10 parser stage.
 *
 * The current output format still reuses the shared B01 map shape so the rest
 * of the adapter can consume it, but the parser is intentionally separated now
 * so we can keep porting the original Q10 app pipeline without mixing that work
 * into the generic B01 parser.
 */
export class Q10MapParser {
	public parse(rawData: Buffer): B01MapData | null {
		return parseQ10YxMapToB01(rawData);
	}

	public parsePathOnly(rawData: Buffer): Q10SourcePathPoint[] | null {
		return parseQ10PathOnlyToSourcePoints(rawData);
	}

	public applyPathOnly(previous: B01MapData, pathPoints: Q10SourcePathPoint[]): B01MapData {
		return applyQ10PathOnlyToB01(previous, pathPoints);
	}

	public mergePersistentState(current: B01MapData, previous?: B01MapData | null): B01MapData {
		return mergeQ10PersistentState(current, previous);
	}
}

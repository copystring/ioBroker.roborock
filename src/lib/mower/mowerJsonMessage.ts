/** The original plugin parses the first DP's JSON envelope and then its JSON string result. */
export function decodeMowerJsonMessage(dps: Record<string, unknown>): unknown {
	const first = dps[Object.keys(dps)[0]];
	if (typeof first !== "string") return undefined;
	try {
		const envelope: unknown = JSON.parse(first);
		if (!envelope || typeof envelope !== "object" || Array.isArray(envelope)) return undefined;
		const result = (envelope as Record<string, unknown>).result;
		return typeof result === "string" ? JSON.parse(result) : undefined;
	} catch {
		return undefined;
	}
}

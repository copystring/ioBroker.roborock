export interface Q10FixtureCredentials {
	localKey: string;
	model: string;
	sn: string;
}

export const Q10_FIXTURE_DEFAULTS_B64 = Object.freeze({
	localKey: "OEFRU2g4NG1OWDNwRkQyVQ==",
	model: "cm9ib3JvY2sudmFjdXVtLnNzMDk=",
	sn: "UkNDTUNZNTE5MDA4NjE="
});

export function decodeBase64Utf8(value: string): string {
	return Buffer.from(value, "base64").toString("utf8");
}

export const Q10_FIXTURE_DEFAULTS: Readonly<Q10FixtureCredentials> = Object.freeze({
	localKey: decodeBase64Utf8(Q10_FIXTURE_DEFAULTS_B64.localKey),
	model: decodeBase64Utf8(Q10_FIXTURE_DEFAULTS_B64.model),
	sn: decodeBase64Utf8(Q10_FIXTURE_DEFAULTS_B64.sn)
});

export function resolveQ10FixtureCredentials(
	overrides: Partial<Q10FixtureCredentials> = {}
): Q10FixtureCredentials {
	return {
		localKey: overrides.localKey ?? Q10_FIXTURE_DEFAULTS.localKey,
		model: overrides.model ?? Q10_FIXTURE_DEFAULTS.model,
		sn: overrides.sn ?? Q10_FIXTURE_DEFAULTS.sn
	};
}

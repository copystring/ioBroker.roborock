const B01_PARKED_STATES = new Set<number>([
	4,
	8,
	100
]);

const B01_DOCK_ANCHORED_STATES = new Set<number>([
	...B01_PARKED_STATES,
	15,
	22
]);

export function isB01ParkedState(stateCode: number | null | undefined): boolean {
	return typeof stateCode === "number" && B01_PARKED_STATES.has(stateCode);
}

export function isB01DockAnchoredState(stateCode: number | null | undefined): boolean {
	return typeof stateCode === "number" && B01_DOCK_ANCHORED_STATES.has(stateCode);
}

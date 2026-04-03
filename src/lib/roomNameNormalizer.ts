export function normalizeRoborockRoomDisplayName(
	roomName: string | undefined,
	getDefaultRoomName?: () => string | undefined
): string {
	const trimmedRoomName = roomName?.trim() ?? "";
	if (!trimmedRoomName) return "";

	const match = /^room(\d{1,2})$/.exec(trimmedRoomName);
	if (!match) return trimmedRoomName;

	const defaultRoomName = getDefaultRoomName?.()?.trim() ?? "";
	if (!defaultRoomName) return trimmedRoomName;

	return `${defaultRoomName}${match[1]}`;
}

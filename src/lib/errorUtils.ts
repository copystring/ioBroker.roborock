export function isConnectivityLikeError(error: unknown): boolean {
	if (!(error instanceof Error)) return true;

	const msg = error.message.toLowerCase();
	if (msg.includes("adapter_stopped") || msg.includes("cancelled") || msg.includes("cancelled_by_user")) {
		return false;
	}

	if (
		msg.includes("timeout") ||
		msg.includes("timed out") ||
		msg.includes("econnreset") ||
		msg.includes("etimedout") ||
		msg.includes("enotfound") ||
		msg.includes("econnrefused") ||
		msg.includes("network") ||
		msg.includes("socket hang up")
	) {
		return true;
	}

	const code = (error as NodeJS.ErrnoException).code;
	return code === "ECONNRESET" || code === "ETIMEDOUT" || code === "ENOTFOUND" || code === "ECONNREFUSED";
}

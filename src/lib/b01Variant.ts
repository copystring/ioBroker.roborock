/**
 * B01 protocol variant: Q7 (RPC-style, request/response by message id) vs Q10
 * (DP-based, fire-and-forget + async DP shadow/status updates).
 */
export type B01Variant = "Q7" | "Q10";

/**
 * Derives the B01 variant from the robot model.
 * Q10 devices use the "ss" family (for example ss09), while classic B01/Q7
 * devices use "sc" or other non-ss suffixes.
 */
export function getB01VariantFromModel(robotModel: string): B01Variant {
	const segment = robotModel.split(".").pop() ?? robotModel;
	return segment.toLowerCase().startsWith("ss") ? "Q10" : "Q7";
}

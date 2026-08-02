import { describe, expect, it } from "vitest";
import { ADAPTER_ERROR_MAPPING, ADAPTER_ERRORS_EN, getLocalizedErrorStates } from "./adapterErrorMapping";

describe("adapter error mapping", () => {
	it("preserves adapter legacy code 254 across protocol-specific state builders", () => {
		expect(ADAPTER_ERROR_MAPPING).not.toHaveProperty("254");
		expect(ADAPTER_ERRORS_EN["254"]).toBe("Bin full");
		expect(getLocalizedErrorStates({ get: () => "" })["254"]).toBe("Bin full");
	});

	it("uses the corrected English fallback for error 95", () => {
		expect(ADAPTER_ERRORS_EN["95"]).toBe("Mop cloth mount installation failed");
	});
});

import { FeatureDependencies, RegisterModel } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { FallbackBaseFeatures } from "../fallbackFeatures";

// Zeo One AppPlugin output/801.js forceLoad: the unconditional washer DPs.
// QueryDP reads them; it does not publish the individual DP keys. Feature-gated
// DPs and metadata/history DPs are deliberately excluded from periodic polling.
const STATUS_DPS = [
	200, 201, 203, 202, 204, 205, 206, 207, 208, 209, 210, 211,
	217, 213, 218, 219, 220, 221, 222, 223, 224, 226,
] as const;

@RegisterModel("roborock.wm.a102")
export class ZeoOneFeatures extends FallbackBaseFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.wm.a102");
	}

	protected override getDynamicFeatures(): Set<Feature> {
		return new Set();
	}

	public override async detectAndApplyRuntimeFeatures(): Promise<boolean> {
		return false;
	}

	public override async initializeDeviceData(): Promise<void> {
		await this.updateStatus();
	}

	public override async updateStatus(): Promise<void> {
		await this.queryDps(STATUS_DPS);
	}

	private async queryDps(dps: readonly number[]): Promise<void> {
		if (this.protocolVersion !== "A01") {
			throw new Error(`Zeo One QueryDP requires A01, got ${this.protocolVersion ?? "unknown"}.`);
		}
		// A01 sendRequest resolves after MQTT publish. The requested DP values arrive
		// asynchronously through processA01; this call cannot confirm device receipt.
		await this.deps.adapter.requestsHandler.sendRequest(this.duid, "10000", JSON.stringify(dps));
	}
}

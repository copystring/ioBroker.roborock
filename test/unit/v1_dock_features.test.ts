
import { describe, expect, it, vi } from "vitest";
import { FeatureDependencies } from "../../src/lib/features/baseDeviceFeatures";
import { Feature } from "../../src/lib/features/features.enum";
import { V1VacuumFeatures } from "../../src/lib/features/vacuum/v1VacuumFeatures";

describe("V1VacuumFeatures Dock Type Support", () => {
    it("should apply correct features for Dock Type 17 (Qrevo Curve)", async () => {
        // Mock Dependencies
        const deps: FeatureDependencies = {
            adapter: {
                rLog: vi.fn(),
                ensureState: vi.fn(),
                ensureFolder: vi.fn(),
                log: { debug: vi.fn(), warn: vi.fn(), info: vi.fn(), error: vi.fn() } as any,
                setStateChanged: vi.fn(),
                translations: {},
                namespace: "test",
            } as any,
            config: { staticFeatures: [] } as any,
            http_api: {} as any,
            ensureState: vi.fn(),
            ensureFolder: vi.fn(),
            log: { debug: vi.fn(), warn: vi.fn(), info: vi.fn(), error: vi.fn() } as any,
        };

        const features = new V1VacuumFeatures(deps, "test_duid", "roborock.vacuum.a159");

        // Ensure appliedFeatures is empty initially (it should be)
        expect((features as any).appliedFeatures.size).toBe(0);

        await features.processDockType(17);

        expect((features as any).appliedFeatures.has(Feature.AutoEmptyDock)).toBe(true);
        expect((features as any).appliedFeatures.has(Feature.MopWash)).toBe(true);
        expect((features as any).appliedFeatures.has(Feature.MopDry)).toBe(true);
        expect((features as any).appliedFeatures.has(Feature.DockingStationStatus)).toBe(true);
    });
});

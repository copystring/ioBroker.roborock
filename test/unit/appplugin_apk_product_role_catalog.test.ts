import { describe, expect, it, vi } from "vitest";

import {
	APK_PRODUCT_USER_ROLES_PATH,
	ApkProductRoleCatalog,
	loadApkProductRoleDefinitions,
	parseApkProductRoleApiResponse,
	parseApkProductRoleDefinitions,
} from "../../src/apppluginHost";

describe("APK product role catalog", () => {
	it("indexes the APK role/category/model response and preserves role order", () => {
		const catalog = new ApkProductRoleCatalog([
			{
				role: "owner",
				products: [
					{ prodModel: "roborock.vacuum.q7", catCode: "robot.vacuum.cleaner" },
					{ prodModel: "roborock.mower.s1", catCode: "robot.mower" },
				],
			},
			{
				role: "operator",
				products: [{ prodModel: "all", catCode: "robot.mower" }],
			},
			{
				role: "washer-only",
				products: [{ prodModel: "all", catCode: "washing.machine" }],
			},
		]);

		expect(catalog.getUserRole("roborock.mower.s1", "robot.mower"))
			.toBe("owner,operator");
		expect(catalog.getUserRole("roborock.mower.future", "robot.mower"))
			.toBe("operator");
		expect(catalog.getUserRole("roborock.mower.s1", "washing.machine"))
			.toBe("washer-only");
		expect(catalog.getUserRole("roborock.vacuum.q7", "unknown.category")).toBe("");
	});

	it("matches the role-keyed APK cache when the backend repeats a role", () => {
		const catalog = new ApkProductRoleCatalog([
			{
				role: "owner",
				products: [{ prodModel: "old", catCode: "robot.mower" }],
			},
			{
				role: "operator",
				products: [{ prodModel: "all", catCode: "robot.mower" }],
			},
			{
				role: "owner",
				products: [{ prodModel: "new", catCode: "robot.mower" }],
			},
		]);

		expect(catalog.getUserRole("old", "robot.mower")).toBe("operator");
		expect(catalog.getUserRole("new", "robot.mower")).toBe("owner,operator");
	});

	it("rejects malformed repository data instead of guessing role fields", () => {
		expect(() => parseApkProductRoleDefinitions({})).toThrow(/Array/u);
		expect(() => parseApkProductRoleDefinitions([{
			role: "owner",
			products: [{ model: "all", catCode: "robot.mower" }],
		}])).toThrow(/prodModel/u);
		expect(() => parseApkProductRoleDefinitions([{
			role: "",
			products: [],
		}])).toThrow(/nichtleerer String/u);
	});

	it("loads exactly the APK endpoint and unwraps only the Axios data envelope", async () => {
		const roles = [{
			role: "owner",
			products: [{ prodModel: "all", catCode: "robot.mower" }],
		}];
		const client = {
			get: vi.fn(async () => ({ data: { data: roles } })),
		};

		await expect(loadApkProductRoleDefinitions(client)).resolves.toEqual(roles);
		expect(client.get).toHaveBeenCalledWith(APK_PRODUCT_USER_ROLES_PATH);
		expect(parseApkProductRoleApiResponse(roles)).toEqual(roles);
		expect(() => parseApkProductRoleApiResponse({ result: roles })).toThrow(/keine Rollenliste/u);
	});
});

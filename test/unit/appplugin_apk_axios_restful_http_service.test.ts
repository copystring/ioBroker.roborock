import { describe, expect, it, vi } from "vitest";

import { ApkAxiosRestfulHttpService } from "../../src/apppluginHost";

describe("APK Axios REST repository", () => {
	it("maps the APK Retrofit query, form and JSON request shapes to raw text", async () => {
		const request = vi.fn(async (config: Record<string, unknown>) => ({
			data: `raw:${String(config.method)}`,
		}));
		const service = new ApkAxiosRestfulHttpService({ request } as never);

		await expect(service.get("/status", { id: 7 })).resolves.toBe("raw:GET");
		await expect(service.delete("/item", null)).resolves.toBe("raw:DELETE");
		await expect(service.post("/form", { enabled: true, count: 2 })).resolves.toBe("raw:POST");
		await expect(service.put("/form", { name: "living room" })).resolves.toBe("raw:PUT");
		await expect(service.postJson("/json", "{\"raw\":true}")).resolves.toBe("raw:POST");
		await expect(service.putJson("/json", { enabled: false })).resolves.toBe("raw:PUT");

		expect(request.mock.calls.map(call => call[0])).toEqual([
			expect.objectContaining({ method: "GET", url: "/status", params: { id: "7" } }),
			expect.objectContaining({ method: "DELETE", url: "/item", params: undefined }),
			expect.objectContaining({
				method: "POST",
				url: "/form",
				data: "enabled=true&count=2",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
			}),
			expect.objectContaining({
				method: "PUT",
				url: "/form",
				data: "name=living+room",
			}),
			expect.objectContaining({
				method: "POST",
				url: "/json",
				data: "{\"raw\":true}",
				headers: { "Content-Type": "application/json" },
			}),
			expect.objectContaining({
				method: "PUT",
				url: "/json",
				data: { enabled: false },
			}),
		]);
		for (const [config] of request.mock.calls) {
			expect(config).toMatchObject({ responseType: "text" });
			expect(config.transformResponse).toHaveLength(1);
		}
	});

	it("rejects invented form structures and non-text repository responses", async () => {
		const request = vi.fn().mockResolvedValue({ data: { parsed: true } });
		const service = new ApkAxiosRestfulHttpService({ request } as never);

		await expect(service.post("/form", { nested: { value: 1 } }))
			.rejects.toThrow(/skalarer Wert/u);
		expect(request).not.toHaveBeenCalled();
		await expect(service.get("/query", { nested: [1, 2] })).rejects.toThrow(/skalarer Wert/u);
		await expect(service.get("/raw", null)).rejects.toThrow(/keinen Rohtext/u);
	});
});

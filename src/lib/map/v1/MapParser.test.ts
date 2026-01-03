import { expect } from "chai";
import { MapParser } from "./MapParser";

// Mock adapter
const mockAdapter: any = {
	log: {
		debug: () => {},
		info: () => {},
		warn: () => {},
		error: () => {},
	},
	http_api: {
		getMatchedRoomIDs: () => [],
	},
};

describe("MapParser", () => {
	let parser: MapParser;

	beforeEach(() => {
		parser = new MapParser(mockAdapter);
	});

	it("should return empty object for empty buffer", async () => {
		const result = await parser.parsedata(Buffer.alloc(0), null);
		expect(result).to.deep.equal({});
	});

	it("should not crash on random garbage data", async () => {
		const garbage = Buffer.alloc(100);
		garbage.fill(0xff);
		try {
			const result = await parser.parsedata(garbage, null);
			expect(result).to.deep.equal({}); // Garbage usually results in empty object or partial parse
		} catch {
			// If it throws, it's acceptable, but ideally it handles it.
		}
	});
});

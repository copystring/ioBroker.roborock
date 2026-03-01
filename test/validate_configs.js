const fs = require("node:fs");
const path = require("node:path");
const { expect } = require("chai");
const axios = require("axios");
const Ajv = require("ajv");

const ROOT_DIR = path.join(__dirname, "..");
const ADMIN_DIR = path.join(ROOT_DIR, "admin");
const VSCODE_DIR = path.join(ROOT_DIR, ".vscode");

const JSON_CONFIG_PATH = path.join(ADMIN_DIR, "jsonConfig.json");
const SCHEMA_URL = "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/packages/jsonConfig/schemas/jsonConfig.json";

// strip-json-comments v5+ is ESM; require() yields { default: fn } in Node
const stripJsonCommentsModule = require("strip-json-comments");
const stripJsonComments =
	typeof stripJsonCommentsModule === "function"
		? stripJsonCommentsModule
		: stripJsonCommentsModule.default;

// Helper: Strip JSON comments (using library)
function stripComments(jsonString) {
	return stripJsonComments(jsonString);
}

// Helper: Recursively get files
function getAllFiles(dirPath, ext, arrayOfFiles = []) {
	if (!fs.existsSync(dirPath)) return arrayOfFiles;
	const files = fs.readdirSync(dirPath);

	files.forEach((file) => {
		const fullPath = path.join(dirPath, file);
		if (fs.statSync(fullPath).isDirectory()) {
			getAllFiles(fullPath, ext, arrayOfFiles);
		} else if (file.endsWith(ext)) {
			arrayOfFiles.push(fullPath);
		}
	});

	return arrayOfFiles;
}

describe("Comprehensive Configuration Validation", () => {

	describe("Schema Validation (admin/jsonConfig.json)", () => {
		it("should exist", () => {
			expect(fs.existsSync(JSON_CONFIG_PATH)).to.be.true;
		});

		it("should be valid against the official ioBroker schema", async function () {
			this.timeout(10000);

			const jsonConfigContent = fs.readFileSync(JSON_CONFIG_PATH, "utf-8");
			const jsonConfig = JSON.parse(jsonConfigContent);

			const response = await axios.get(SCHEMA_URL);
			const schema = response.data;

			const ajv = new Ajv({ strict: false, allErrors: true });
			const validate = ajv.compile(schema);
			const valid = validate(jsonConfig);

			if (!valid) {
				throw new Error(`jsonConfig.json is invalid:\n${validate.errors.map(e => `${e.instancePath} ${e.message}`).join("\n")}`);
			}
			expect(valid).to.be.true;
		});
	});

	describe("Strict JSON Syntax (admin/**/*)", () => {
		const adminFiles = getAllFiles(ADMIN_DIR, ".json");

		adminFiles.forEach(file => {
			const relPath = path.relative(ROOT_DIR, file);
			it(`${relPath} must be valid strict JSON`, () => {
				const content = fs.readFileSync(file, "utf-8");
				try {
					JSON.parse(content);
				} catch (e) {
					throw new Error(`Invalid JSON in ${relPath}: ${e.message}`);
				}
			});
		});
	});

	describe("JSONC Syntax (.vscode/*)", () => {
		const vscodeFiles = getAllFiles(VSCODE_DIR, ".json");

		vscodeFiles.forEach(file => {
			const relPath = path.relative(ROOT_DIR, file);
			it(`${relPath} must be valid JSON (comments allowed)`, () => {
				const content = fs.readFileSync(file, "utf-8");
				const cleanContent = stripComments(content);
				try {
					JSON.parse(cleanContent);
				} catch (e) {
					throw new Error(`Invalid JSONC in ${relPath}: ${e.message}`);
				}
			});
		});
	});

});

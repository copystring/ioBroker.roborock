const fs = require("node:fs");
const path = require("node:path");
const { expect } = require("chai");
const axios = require("axios");
const Ajv = require("ajv");

const JSON_CONFIG_PATH = path.join(__dirname, "../admin/jsonConfig.json");
const SCHEMA_URL = "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/packages/jsonConfig/schemas/jsonConfig.json";

describe("Validate jsonConfig.json", () => {
    it("should exist", () => {
        expect(fs.existsSync(JSON_CONFIG_PATH)).to.be.true;
    });

    it("should be valid against the official ioBroker schema", async function () {
        this.timeout(10000); // Allow time for downloading schema

        // 1. Read the local config
        const jsonConfigContent = fs.readFileSync(JSON_CONFIG_PATH, "utf-8");
        const jsonConfig = JSON.parse(jsonConfigContent);

        // 2. Fetch the schema
        const response = await axios.get(SCHEMA_URL);
        const schema = response.data;

        // 3. Setup AJV (turn off strict mode for ioBroker specificities if needed, but strict is better)
        const ajv = new Ajv({ strict: false, allErrors: true });
        const validate = ajv.compile(schema);

        // 4. Validate
        const valid = validate(jsonConfig);

        if (!valid) {
            console.error("Schema Validation Errors:", JSON.stringify(validate.errors, null, 2));
            throw new Error(`jsonConfig.json is invalid:\n${validate.errors.map(e => `${e.instancePath} ${e.message}`).join("\n")}`);
        }

        expect(valid).to.be.true;
    });
});

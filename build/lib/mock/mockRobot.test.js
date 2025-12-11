"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const MockRobot_1 = require("./MockRobot");
describe("MockRobot", () => {
    let robot;
    beforeEach(() => {
        robot = new MockRobot_1.MockRobot();
    });
    it("should initialize with default data", () => {
        (0, chai_1.expect)(robot.duid).to.equal("52E5XuBOSFE0s2oEmQWxPd");
        (0, chai_1.expect)(robot.state.battery).to.equal(100);
        (0, chai_1.expect)(robot.state.dss).to.equal(2728);
    });
    it("should handle get_prop for specific keys", () => {
        const result = robot.handleRequest("get_prop", ["battery", "fan_power"]);
        (0, chai_1.expect)(result).to.deep.equal([100, 102]);
    });
    it("should handle get_status", () => {
        const result = robot.handleRequest("get_status");
        (0, chai_1.expect)(result[0].battery).to.equal(100);
        (0, chai_1.expect)(result[0].state).to.equal(8); // Charging
    });
    it("should update state on commands", () => {
        robot.handleRequest("app_start");
        (0, chai_1.expect)(robot.state.state).to.equal(5);
        (0, chai_1.expect)(robot.state.in_cleaning).to.equal(1);
        robot.handleRequest("app_charge");
        (0, chai_1.expect)(robot.state.state).to.equal(6);
        (0, chai_1.expect)(robot.state.in_returning).to.equal(1);
    });
    it("should simulate dss updates helper", () => {
        robot.setDss({ cleanFluid: 1 });
        const dss = robot.state.dss;
        const cleanFluid = (dss >> 10) & 0b11;
        (0, chai_1.expect)(cleanFluid).to.equal(1);
    });
    it("should return cleaning summary", () => {
        const summary = robot.handleRequest("get_clean_summary");
        (0, chai_1.expect)(summary.clean_count).to.equal(190);
        (0, chai_1.expect)(summary.records).to.be.an("array");
    });
    it("should return clean records", () => {
        // Verify we have all 23 records
        (0, chai_1.expect)(robot.cleanRecords.length).to.equal(23);
        // Fetch a specific one from the original set
        const record1 = robot.handleRequest("get_clean_record", [1765198801]);
        (0, chai_1.expect)(record1[0].begin).to.equal(1765198801);
        (0, chai_1.expect)(record1[0].duration).to.equal(4538);
        // Fetch a specific one from the new set (ID 472)
        const record2 = robot.handleRequest("get_clean_record", [1762952401]);
        (0, chai_1.expect)(record2[0].begin).to.equal(1762952401);
        (0, chai_1.expect)(record2[0].cleaned_area).to.equal(50970000);
    });
    it("should return map list", () => {
        const maps = robot.handleRequest("get_multi_maps_list");
        (0, chai_1.expect)(maps[0].max_multi_map).to.equal(1);
        (0, chai_1.expect)(maps[0].map_info).to.be.an("array");
    });
    it("should return timers", () => {
        const timers = robot.handleRequest("get_timer");
        (0, chai_1.expect)(timers.length).to.equal(3);
        (0, chai_1.expect)(timers[0][1]).to.equal("on");
    });
});
//# sourceMappingURL=mockRobot.test.js.map
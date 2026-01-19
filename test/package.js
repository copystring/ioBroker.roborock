const path = require("path");
const { tests } = require("@iobroker/testing");

// Verify package files - See https://github.com/ioBroker/testing for a detailed explanation and further options
tests.packageFiles(path.join(__dirname, ".."));

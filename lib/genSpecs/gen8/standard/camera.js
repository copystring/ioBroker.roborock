/**
 * @namespace deviceStatus
 * @description @deviceStatus_description@
 * @property {object} distance_off - @distance_off@
 * @property {object} camera_status - @camera_status@
 */
const deviceStatus = {
	distance_off: {
		type: "number",
		name: "Distance Off",
		write: false,
	},
	camera_status: {
		type: "number",
		name: "Camera Status",
		write: false,
	},
};

module.exports = {
	deviceStatus,
};

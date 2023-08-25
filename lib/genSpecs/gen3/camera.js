/**
 * @namespace deviceStatus
 * @description @robot_states_description@
 * @property {object} distance_off - @distance_off@
 * @property {object} camera_status - @camera_status@
 * @property {object} home_sec_status - @home_sec_status@
 * @property {object} home_sec_enable_password - @home_sec_enable_password@
 */
const deviceStatus = {
    distance_off: {
        "type": "number",
        "name": "Distance Off",
        "write": false
    },
    camera_status: {
        "type": "number",
        "name": "Camera Status",
        "write": false
    },
    home_sec_status: {
        "type": "number",
        "name": "Home Security Status",
        "write": false
    },
    home_sec_enable_password: {
        "type": "number",
        "name": "Home Security Enable Password",
        "write": false
    }
}

/**
 * @namespace camera
 * @description @camera_description@
 * @property {string} stream_html - @stream_html@
 * @property {string} rtsp - @rtsp@
 * @property {string} stream_mp4 - @stream_mp4@
 */
const camera = {
    stream_html: {
        "name": "HTML stream",
        "type": "string",
        "write": false
    },
    webrtc_html: {
        "name": "webrtc stream",
        "type": "string",
        "write": false
    },
    stream_mp4: {
        "name": "mp4 stream",
        "type": "string",
        "write": false
    },
    rtsp: {
        "name": "rtsp stream",
        "type": "string",
        "write": false
    }
};

module.exports = {
	deviceStatus,
	camera,
};
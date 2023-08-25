/**
 * @namespace deviceStatus
 * @description Mapowanie stanów robotów.
 * @property {object} distance_off - Odległość wyłączona
 * @property {object} camera_status - Kamera
 * @property {object} home_sec_status - Stan bezpieczeństwa w domu
 * @property {object} home_sec_enable_password - Bezpieczeństwo w domu Włącz hasło
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
 * @description Informacje dotyczące różnych formatów strumienia z kamery.
 * @property {string} stream_html - strumień HTML
 * @property {string} rtsp - strumień rtsp
 * @property {string} stream_mp4 - strumień mp4
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
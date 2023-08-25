/**
 * @namespace deviceStatus
 * @description Kartierung von Roboterzuständen.
 * @property {object} distance_off - Distanz aus
 * @property {object} camera_status - Kamera
 * @property {object} home_sec_status - Home-Security-Status
 * @property {object} home_sec_enable_password - Home Security-Aktivierungskennwort
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
 * @description Informationen zu verschiedenen Kamera-Stream-Formaten.
 * @property {string} stream_html - HTML-Stream
 * @property {string} rtsp - RTSP-Stream
 * @property {string} stream_mp4 - MP4-Stream
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
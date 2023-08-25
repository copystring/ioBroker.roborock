/**
 * @namespace deviceStatus
 * @description Mappatura degli stati dei robot.
 * @property {object} distance_off - Distanza disattivata
 * @property {object} camera_status - Telecamera
 * @property {object} home_sec_status - Stato della sicurezza domestica
 * @property {object} home_sec_enable_password - Sicurezza domestica Abilita password
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
 * @description Informazioni relative ai diversi formati di streaming della telecamera.
 * @property {string} stream_html - flusso html
 * @property {string} rtsp - flusso rtsp
 * @property {string} stream_mp4 - flusso mp4
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
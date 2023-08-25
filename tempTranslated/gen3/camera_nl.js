/**
 * @namespace deviceStatus
 * @description In kaart brengen van robottoestanden.
 * @property {object} distance_off - Afstand uitgeschakeld
 * @property {object} camera_status - Camera
 * @property {object} home_sec_status - Beveiligingsstatus thuis
 * @property {object} home_sec_enable_password - Thuisbeveiliging Wachtwoord inschakelen
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
 * @description Informatie met betrekking tot verschillende camerastreamformaten.
 * @property {string} stream_html - html-stream
 * @property {string} rtsp - rtsp-stream
 * @property {string} stream_mp4 - mp4-stream
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
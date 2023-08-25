/**
 * @namespace deviceStatus
 * @description Cartographie des états du robot.
 * @property {object} distance_off - Distance désactivée
 * @property {object} camera_status - Caméra
 * @property {object} home_sec_status - Statut de sécurité à domicile
 * @property {object} home_sec_enable_password - Mot de passe d'activation de la sécurité domestique
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
 * @description Informations relatives aux différents formats de flux de caméra.
 * @property {string} stream_html - flux HTML
 * @property {string} rtsp - flux RTSP
 * @property {string} stream_mp4 - flux mp4
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
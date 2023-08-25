/**
 * @namespace deviceStatus
 * @description Mapeo de estados de robots.
 * @property {object} distance_off - Distancia desactivada
 * @property {object} camera_status - Cámara
 * @property {object} home_sec_status - Estado de seguridad del hogar
 * @property {object} home_sec_enable_password - Seguridad del hogar Habilitar contraseña
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
 * @description Información relacionada con diferentes formatos de transmisión de cámara.
 * @property {string} stream_html - secuencia html
 * @property {string} rtsp - flujo rtsp
 * @property {string} stream_mp4 - transmisión mp4
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
/**
 * @namespace deviceStatus
 * @description Mapeamento de estados do robô.
 * @property {object} distance_off - Distância desligada
 * @property {object} camera_status - Câmera
 * @property {object} home_sec_status - Status de segurança residencial
 * @property {object} home_sec_enable_password - Senha de ativação de segurança doméstica
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
 * @description Informações relacionadas a diferentes formatos de fluxo de câmera.
 * @property {string} stream_html - fluxo HTML
 * @property {string} rtsp - fluxo rtsp
 * @property {string} stream_mp4 - fluxo mp4
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
/**
 * @namespace deviceStatus
 * @description Картирование состояний робота.
 * @property {object} distance_off - Расстояние выкл.
 * @property {object} camera_status - Камера
 * @property {object} home_sec_status - Статус домашней безопасности
 * @property {object} home_sec_enable_password - Пароль включения домашней безопасности
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
 * @description Информация, относящаяся к различным форматам потоков камер.
 * @property {string} stream_html - HTML-поток
 * @property {string} rtsp - rtsp-поток
 * @property {string} stream_mp4 - поток mp4
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
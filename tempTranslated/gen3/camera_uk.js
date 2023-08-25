/**
 * @namespace deviceStatus
 * @description Відображення станів робота.
 * @property {object} distance_off - Відстань
 * @property {object} camera_status - Камера
 * @property {object} home_sec_status - Статус безпеки будинку
 * @property {object} home_sec_enable_password - Пароль увімкнення домашньої безпеки
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
 * @description Інформація, пов’язана з різними форматами потоку камери.
 * @property {string} stream_html - html потік
 * @property {string} rtsp - потік rtsp
 * @property {string} stream_mp4 - потік mp4
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
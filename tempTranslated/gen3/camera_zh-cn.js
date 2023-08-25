/**
 * @namespace deviceStatus
 * @description 机器人状态映射。
 * @property {object} distance_off - 距离关闭
 * @property {object} camera_status - 相机
 * @property {object} home_sec_status - 家庭安全状况
 * @property {object} home_sec_enable_password - 家庭安全启用密码
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
 * @description 与不同摄像机流格式相关的信息。
 * @property {string} stream_html - html流
 * @property {string} rtsp - rtsp流
 * @property {string} stream_mp4 - mp4 流
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
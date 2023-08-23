/**
 * @namespace deviceStatus
 * @description Mapping of robot states.
 * @property {object} distance_off - Distance Off
 * @property {object} camera_status - Camera Status
 * @property {object} home_sec_status - Home Security Status
 * @property {object} home_sec_enable_password - Home Security Enable Password
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
 * @description Camera streams.
 * @property {object} stream_html - HTML stream
 * @property {object} webrtc_html - webrtc stream
 * @property {object} stream_mp4 - mp4 stream
 * @property {object} rtsp - rtsp stream
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
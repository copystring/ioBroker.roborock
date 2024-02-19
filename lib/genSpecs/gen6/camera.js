
/**
 * @namespace camera
 * @description @camera_description@
 * @property {string} stream_html - @stream_html@
 * @property {string} rtsp - @rtsp@
 * @property {string} stream_mp4 - @stream_mp4@
 */
const camera = {
	stream_html: {
		name: "HTML stream",
		type: "string",
		write: false,
	},
	webrtc_html: {
		name: "webrtc stream",
		type: "string",
		write: false,
	},
	stream_mp4: {
		name: "mp4 stream",
		type: "string",
		write: false,
	},
	rtsp: {
		name: "rtsp stream",
		type: "string",
		write: false,
	},
};

module.exports = {
	camera,
};

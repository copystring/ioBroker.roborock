var n;
if (require('./113').canUseDOM) n = window.performance || window.msPerformance || window.webkitPerformance;
module.exports = n || {};

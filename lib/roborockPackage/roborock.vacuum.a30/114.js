var n;
if (require('./115').canUseDOM) n = window.performance || window.msPerformance || window.webkitPerformance;
module.exports = n || {};

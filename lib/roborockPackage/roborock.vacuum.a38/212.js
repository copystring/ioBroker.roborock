function t(t, o) {
  if (null != t) return t;
  var n = new Error(undefined !== o ? o : 'Got unexpected ' + t);
  throw ((n.framesToPop = 1), n);
}

module.exports = t;
module.exports.default = t;
Object.defineProperty(module.exports, '__esModule', {
  value: true,
});

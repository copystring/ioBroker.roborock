module.exports = function (t) {
  var n = t.getForwardedRef,
    o = t.setLocalRef;
  return function (t) {
    var c = n();
    o(t);
    if ('function' == typeof c) c(t);
    else if ('object' == typeof c && null != c) c.current = t;
  };
};

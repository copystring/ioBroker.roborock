module.exports = function (n, t) {
  var o = {};
  t.forEach(function (t) {
    if (n.hasOwnProperty(t)) o[t] = n[t];
  });
  return o;
};

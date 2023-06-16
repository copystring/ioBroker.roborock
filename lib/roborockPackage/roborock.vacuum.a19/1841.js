module.exports = function (u) {
  var n = [],
    t = [];
  u.forEach(function (u) {
    if (-1 === n.indexOf(u.uri)) {
      n.push(u.uri);
      t.push(u);
    }
  });
  return t;
};

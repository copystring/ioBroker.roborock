function t(t, n) {
  var u = (t.x - n.x) ** 2,
    y = (t.y - n.y) ** 2;
  return Math.sqrt(u + y);
}

exports.isPointInCircle = function (n, u, y) {
  return t(n, u) <= y;
};

exports.getDistance = t;

exports.getTransform = function (n, u) {
  var y = t(n, u),
    o = (u.x - n.x) / y,
    x = Math.acos(o);
  if (n.y > u.y) x = 2 * Math.PI - x;
  var c = {
      x: n.x + y / 2,
      y: n.y,
    },
    f = {
      x: (u.x + n.x) / 2,
      y: (u.y + n.y) / 2,
    };
  return {
    d: y,
    a: x,
    x: f.x - c.x,
    y: f.y - c.y,
  };
};

exports.isEquals = function (t, n) {
  return t.x === n.x && t.y === n.y;
};

exports.getMiddlePoint = function (t, n) {
  return {
    x: (n.x + t.x) / 2,
    y: (n.y + t.y) / 2,
  };
};

exports.getRealPassword = function (t) {
  return t.replace(/\d/g, function (t) {
    return Number(t) + 1;
  });
};

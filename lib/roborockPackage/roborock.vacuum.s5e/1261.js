exports._offset = u;

exports._center = function (t, n, o, h, x, s, u) {
  var c = arguments.length > 7 && undefined !== arguments[7] ? arguments[7] : 0;

  if (t.xx < 0 || t.yy < 0) {
    t.xx = -1 * t.xx;
    t.yy = -1 * t.yy;
  }

  if (v(c))
    o = {
      width: o.height,
      height: o.width,
    };
  return n && n.width && n.height && o && o.width && o.height ? t.moveTo(0, x / 2 - u / 2).scaleTo(y(n, o, h, x, s, u) || 1) : t;
};

exports._checkTrans = function (t, n, x, s, u, c, f, l) {
  var p = arguments.length > 8 && undefined !== arguments[8] ? arguments[8] : 0;
  if (!(n && n.width && n.height && x)) return false;
  var M = module1057.Config.scale.min,
    w = module1057.Config.scale.max;
  if ('android' === module12.Platform.OS && x && x.height && x.width && (x.width > 300 || x.height > 300)) w = module1057.Config.scale.maxAndroid;
  if (v(p))
    x = {
      width: x.height,
      height: x.width,
    };

  var T = M ** y(n, x, s, u, c, f),
    _ = l ? 1 : w ** y(n, x, s, u, c, f);

  if (t.xx < T || t.xx > _ || t.yy < T || t.yy > _) return false;
  var P = [x.width * t.xx, x.height * t.yy],
    b = P[0],
    X = P[1];
  if (!b || !X) return false;
  var Y = {
    x: (n.width - b) / 2 + t.x,
    y: (n.height - X) / 2 + t.y,
  };
  return Y.x < n.width && Y.y < n.height && Y.x + b > 0 && Y.y + X > 0;
};

exports._parseEvent = function (t) {
  switch (t.touches.length) {
    case 0:
      return {
        timestamp: new Date().getTime(),
      };

    case 1:
      return {
        x: t.touches[0].locationX,
        y: t.touches[0].locationY,
        timestamp: new Date().getTime(),
      };

    default:
      var n = t.touches[0].locationX - t.touches[1].locationX,
        o = t.touches[0].locationY - t.touches[1].locationY;
      return t.touches[0].target === t.touches[1].target
        ? {
            distance: Math.sqrt(n * n + o * o),
            timestamp: new Date().getTime(),
            x1: t.touches[0].locationX,
            y1: t.touches[0].locationY,
            pageX1: t.touches[0].pageX,
            pageY1: t.touches[0].pageY,
            x2: t.touches[1].locationX,
            y2: t.touches[1].locationY,
            pageX2: t.touches[1].pageX,
            pageY2: t.touches[1].pageY,
          }
        : {
            timestamp: new Date().getTime(),
          };
  }
};

exports._parseEvent2 = function (t, n) {
  switch (t.touches.length) {
    case 0:
      return {
        timestamp: new Date().getTime(),
      };

    case 1:
      return {
        x: module12.I18nManager.isRTL ? -n.dx : n.dx,
        y: n.dy,
        timestamp: new Date().getTime(),
      };

    default:
      var h = t.touches[0].locationX - t.touches[1].locationX,
        x = t.touches[0].locationY - t.touches[1].locationY;
      return t.touches[0].target === t.touches[1].target
        ? {
            distance: Math.sqrt(h * h + x * x),
          }
        : {
            timestamp: new Date().getTime(),
          };
  }
};

exports._parseMove = function (t, n) {
  switch (t.touches.length) {
    case 0:
      return {
        timestamp: new Date().getTime(),
      };

    case 1:
      var h = n.moveX ? n.moveX : n.x0,
        x = n.moveY ? n.moveY : n.y0;
      return {
        x: module12.I18nManager.isRTL ? -h : h,
        y: x,
        timestamp: new Date().getTime(),
      };

    default:
      var y = t.touches[0].locationX - t.touches[1].locationX,
        s = t.touches[0].locationY - t.touches[1].locationY;
      return t.touches[0].target === t.touches[1].target
        ? {
            distance: Math.sqrt(y * y + s * s),
          }
        : {
            timestamp: new Date().getTime(),
          };
  }
};

exports._parseMove2 = function (t, n) {
  switch (t.touches.length) {
    case 1:
      return {
        x: module12.I18nManager.isRTL ? -n.dx : n.dx,
        y: n.dy,
        timestamp: new Date().getTime(),
      };

    default:
      return {
        timestamp: new Date().getTime(),
      };
  }
};

exports._parseDegPoint = c;

exports._parseDegPointWithTrans = function (t, n, o, h) {
  if (!o) return;
  var x = (t.x - n.x) / (o.xx || 1),
    y = (t.y - n.y) / (o.yy || 1);
  return c(x, y, h);
};

exports._getRotateMaxRectSize = function (t) {
  var o = t.rectSize,
    h = (-1 * t.slopeAngle * 180) / Math.PI,
    x = o.x + o.width / 2,
    y = o.y + o.height / 2,
    s = c(o.x - x, o.y - y, h),
    u = module23.default(s, 2),
    f = u[0],
    l = u[1],
    v = c(o.x - x, o.y + o.height - y, h),
    p = module23.default(v, 2),
    M = p[0],
    w = p[1],
    T = [Math.abs(f) ** Math.abs(M), Math.abs(l) ** Math.abs(w)],
    _ = T[0],
    P = T[1];
  return {
    x: x - _,
    y: y - P,
    width: 2 * _,
    height: 2 * P,
  };
};

exports._parsePath = function (t, n, o, h) {
  var y =
    arguments.length > 4 && undefined !== arguments[4]
      ? arguments[4]
      : {
          xx: 1,
          yy: 1,
        };
  if (!t || t.length < 2)
    return {
      path: '',
    };
  var s = new x(),
    c = u(t[0].x, t[0].y, n),
    f = c.x,
    l = c.y,
    v = u(t[0].x, t[0].y, n),
    p = v.x,
    M = v.y;
  f *= y.xx;
  l *= y.yy;
  p *= y.xx;
  M *= y.yy;
  s.moveTo(f, l);

  for (var w = 0, T = 1; T < t.length; ++T)
    if (!((o && h && o[T] && 0 != o[T]) || (o && o[T] && 1 == ((o[T] >> 1) & 1)))) {
      var _ = u(t[T].x, t[T].y, n);

      f = _.x;
      l = _.y;
      var P = u(t[w].x, t[w].y, n);
      p = P.x;
      M = P.y;
      f *= y.xx;
      l *= y.yy;
      p *= y.xx;
      M *= y.yy;
      if ((l - M) * (l - M) + (f - p) * (f - p) > 10 * y.xx * 10 * y.xx) s.moveTo(f, l);
      else s.lineTo(f, l);
      w = T;
    }

  return {
    path: s,
  };
};

exports._parseGotoPlanPath = function (t, n, o) {
  if (!t || t.length < 2)
    return {
      path: '',
    };
  var h = new x(),
    y = u(t[0].x, t[0].y, n),
    s = y.x,
    c = y.y,
    f = u(t[0].x, t[0].y, n);
  s *= o.xx;
  c *= o.yy;
  h.moveTo(s, c);

  for (var l = 1; l < t.length; ++l) {
    var v = u(t[l].x, t[l].y, n);
    s = v.x;
    c = v.y;
    var p = u(t[l - 1].x, t[l - 1].y, n);
    s *= o.xx;
    c *= o.yy;
    h.lineTo(s, c);
  }

  return {
    path: h,
  };
};

exports._parseMopPath = function (t, n, o) {
  var h =
    arguments.length > 3 && undefined !== arguments[3]
      ? arguments[3]
      : {
          xx: 1,
          yy: 1,
        };
  if (!t || t.length < 2 || t.length != o.length)
    return {
      mopPath: '',
    };

  for (var y = new x(), s = u(t[0].x, t[0].y, n), c = s.x, f = s.y, l = u(t[0].x, t[0].y, n), v = l.x, p = l.y, M = -1, w = 0, T = 0; T < t.length; ++T)
    if (1 == o[T]) {
      M = T;
      w = T;

      var _ = u(t[T].x, t[T].y, n);

      c = _.x;
      f = _.y;
      var P = u(t[T].x, t[T].y, n);
      v = P.x;
      p = P.y;
      var b = [c * h.xx, f * h.yy];
      c = b[0];
      f = b[1];
      var X = [v * h.xx, p * h.yy];
      v = X[0];
      p = X[1];
      y.moveTo(c, f);
      break;
    }

  if (-1 != M)
    for (var Y = M + 1; Y < t.length; ++Y)
      if (0 != (1 & o[Y])) {
        var S = u(t[Y].x, t[Y].y, n);
        c = S.x;
        f = S.y;
        var I = u(t[w].x, t[w].y, n);
        v = I.x;
        p = I.y;
        var D = [c * h.xx, f * h.yy];
        c = D[0];
        f = D[1];
        var R = [v * h.xx, p * h.yy];
        if ((f - (p = R[1])) * (f - p) + (c - (v = R[0])) * (c - v) > 10 * h.xx * 10 * h.xx || w != Y - 1) y.moveTo(c, f);
        else y.lineTo(c, f);
        w = Y;
      }
  return {
    mopPath: y,
  };
};

exports._parseBackWashPath = function (t, n, o) {
  var h =
    arguments.length > 3 && undefined !== arguments[3]
      ? arguments[3]
      : {
          xx: 1,
          yy: 1,
        };
  if (!t || t.length < 2 || t.length != o.length)
    return {
      backWashPath: '',
    };

  for (var y = new x(), s = -1, c = 0, f = u(t[0].x, t[0].y, n), l = f.x, v = f.y, p = u(t[0].x, t[0].y, n), M = p.x, w = p.y, T = 0; T < t.length; ++T)
    if (1 == ((o[T] >> 1) & 1)) {
      s = T;
      c = T;

      var _ = u(t[T].x, t[T].y, n);

      l = _.x;
      v = _.y;
      var P = u(t[T].x, t[T].y, n);
      M = P.x;
      w = P.y;
      l *= h.xx;
      v *= h.yy;
      M *= h.xx;
      w *= h.yy;
      y.moveTo(l, v);
      break;
    }

  if (-1 != s)
    for (var b = s + 1; b < t.length; ++b)
      if (0 != ((o[b] >> 1) & 1)) {
        var X = u(t[b].x, t[b].y, n);
        l = X.x;
        v = X.y;
        var Y = u(t[c].x, t[c].y, n);
        M = Y.x;
        w = Y.y;
        l *= h.xx;
        v *= h.yy;
        M *= h.xx;
        w *= h.yy;
        if ((v - w) * (v - w) + (l - M) * (l - M) > 10 * h.xx * 10 * h.xx || c != b - 1) y.moveTo(l, v);
        else y.lineTo(l, v);
        c = b;
      }
  return {
    backWashPath: y,
  };
};

exports._parseDisplayRects = function (t, n, o) {
  if (!t || !t.num || !t.zones || t.num < 1)
    return {
      displayZones: [],
    };

  for (var h = [], x = 0; x < t.num; x++) {
    var y = t.zones[x][0] - n.x,
      s = n.y - t.zones[x][1],
      u = t.zones[x][2] - n.x,
      c = n.y - t.zones[x][3],
      f = u - y,
      l = s - c,
      v = y,
      p = s - l;
    h.push({
      x: v,
      y: p,
      width: f,
      height: l,
    });
  }

  return {
    displayZones: h,
  };
};

exports._parseTarget = function (t, n) {
  if (!t || !t.x || !t.y)
    return {
      target: {},
    };
  var o = t.x - n.x,
    h = n.y - t.y;
  return {
    target: {
      x: o,
      y: h,
    },
  };
};

exports._regularAngle = f;

exports._pointVectorToLine = function (t, n, o, h) {
  var x = [0, 0, 0];

  if (0 == o) {
    x[0] = 1;
    x[1] = 0;
    x[2] = -1 * t;
  } else {
    var y = h / o;
    x[0] = y;
    x[1] = -1;
    x[2] = -1 * y * t + n;
  }

  return x;
};

exports._disBtwPointSegement = l;

exports._judgeInlegalFBZ = function (t, n, o, h) {
  for (
    var x = o.props.transform.xx * o.state.rectSize.x,
      y = o.props.transform.yy * o.state.rectSize.y,
      u = o.props.transform.xx * o.state.rectSize.width,
      c = o.props.transform.yy * o.state.rectSize.height,
      l = [x, x + u, x + u, x],
      v = [y, y, y + c, y + c],
      p = x + 0.5 * u,
      M = y + 0.5 * c,
      w = o.state.slopeAngle,
      T = [],
      _ = 0;
    _ < l.length;
    _++
  ) {
    var P = l[_],
      b = v[_],
      X = P - p,
      Y = b - M,
      S = Y ** X,
      I = f(S + w),
      D = Math.sqrt(X * X + Y * Y);
    l[_] = D * Math.cos(I) + p;
    v[_] = D * Math.sin(I) + M;
    T.push(l[_]);
    T.push(v[_]);
  }

  return s(t, n, T, h);
};

exports._getRotateRect = function (t, n) {
  if (Math.abs(n) % 180 != 0) {
    var o = t.width,
      h = t.height,
      x = t.x + o / 2,
      y = t.y + h / 2;
    t.x = x - h / 2;
    t.y = y - o / 2;
    t.width = h;
    t.height = o;
  }

  return t;
};

exports._getRectBubbleCenter = function (t, n, o) {
  var h = {
    x: t.x,
    y: t.y - n.y,
  };

  if (o) {
    var x = o % 360;
    h =
      90 === x || -270 === x
        ? {
            x: t.x - n.x,
            y: t.y,
          }
        : 180 === x || -180 === x
        ? {
            x: t.x,
            y: t.y + n.y,
          }
        : 270 === x || -90 === x
        ? {
            x: t.x + n.x,
            y: t.y,
          }
        : {
            x: t.x,
            y: t.y,
          };
  }

  return h;
};

exports._isVerticalRotate = v;

exports._convertToPixelRect = function (t, n) {
  return t
    ? {
        x: t.x * (n.xx || 1),
        y: t.y * (n.yy || 1),
        width: t.width * (n.xx || 1),
        height: t.height * (n.yy || 1),
      }
    : t;
};

exports._convertToPixelEndpoint = function (t, n) {
  var o = {
    xx: n.xx || 1,
    yy: n.yy || 1,
  };
  return {
    start: {
      x: t.start.x * o.xx,
      y: t.start.y * o.yy,
    },
    end: {
      x: t.end.x * o.xx,
      y: t.end.y * o.yy,
    },
  };
};

exports._convertToPixelPoint = function (t, n) {
  return t
    ? {
        x: t.x * (n.xx || 1),
        y: t.y * (n.yy || 1),
      }
    : null;
};

exports._mapScreenToOriginXY = function (t, n, o) {
  var h = t.height - Math.floor(o) - 0.5 + t.top - t.data.top;
  return {
    x: Math.floor(n) + t.left - t.data.left + 0.5,
    y: h,
  };
};

exports._mapOriginXYToScreen = function (t, n, o) {
  var h = Math.floor(n) - (t.left - t.data.left + 0.5),
    x = t.height - Math.floor(o) - 1 + (t.top - t.data.top + 0.5);
  return {
    x: h,
    y: x,
  };
};

exports._mapScreenXYToIndex = function (t, n, o) {
  var h = t.height - Math.floor(o) - 0.5 + t.top - t.data.top,
    x = Math.floor(n) + t.left - t.data.left + 0.5;
  return t.data.offset + Math.floor(h) * t.data.width + Math.floor(x);
};

exports._mapOriginXYToIndex = p;

exports._getAroundIndexInfo = function (t, n, o) {
  for (
    var h = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : 1,
      x = function (n) {
        var o = t.data.data[n] >>> 3,
          h = 7 & t.data.data[n];
        return [o, h];
      },
      y = [],
      s = 1;
    s <= h;
    s++
  ) {
    var u = p(t, n - s, o);
    if (u >= 0) y.push(x(u));
    var c = p(t, n, o - s);
    if (c >= 0) y.push(x(c));
  }

  for (var f = 1; f <= h; f++) {
    var l = p(t, n + f, o);
    if (l >= 0) y.push(x(l));
    var v = p(t, n, o + f);
    if (v >= 0) y.push(x(v));
  }

  return y;
};

exports._pointToStuckRect = function (t) {
  return {
    x: t.x - 10,
    y: t.y - 10,
    width: 20,
    height: 20,
  };
};

exports._boxCircleIntersect = function (t, n, o) {
  var h = Math.sqrt((t[0] - t[6]) ** 2 + (t[1] - t[7]) ** 2),
    x = Math.sqrt((t[0] - t[2]) ** 2 + (t[1] - t[3]) ** 2),
    y = (t[0] + t[4]) / 2,
    s = (t[1] + t[5]) / 2,
    u = [h / 2, x / 2],
    c = [Math.abs(n.x - y), Math.abs(n.y - s)],
    f = [(c[0] - u[0]) ** 0, (c[1] - u[1]) ** 0];
  return f[0] ** 2 + f[1] ** 2 < o ** 2;
};

exports.objectShallowEqual = function t(n, o, h) {
  if (M(n, o)) return true;
  if ('object' != typeof n || null === n || 'object' != typeof o || null === o) return false;
  var x = Object.keys(n);
  var y = Object.keys(o);
  if (x.length !== y.length) return false;

  for (var s = 0; s < x.length; s++) {
    if (!hasOwnProperty.call(o, x[s])) return false;
    if (h && !t(n[x[s]], o[x[s]], false)) return false;
    if (!h && !M(n[x[s]], o[x[s]])) return false;
  }

  return true;
};

exports.adjustChargerAngle = function (t) {
  if (isNaN(t)) return 0;
  if (!t) return 0;

  for (var n = t, o = -2; o <= 2; o++)
    if (Math.abs(t - 90 * o) <= 15) {
      n = 90 * o;
      break;
    }

  return n;
};

exports.degreeToRad = function (t) {
  return (t * Math.PI) / 180;
};

var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module12 = require('./12'),
  module1057 = require('./1057'),
  x = module12.ART.Path;

function y(t, n, o, h, x, y) {
  return ((t.width - o - x) / n.width || 1) ** ((t.height - h - y) / n.height || 1);
}

function s(t, n, o, h) {
  var x = l(t, n, o[0], o[1], o[2], o[3]),
    y = l(t, n, o[2], o[3], o[4], o[5]),
    s = l(t, n, o[4], o[5], o[6], o[7]),
    u = l(t, n, o[6], o[7], o[0], o[1]);
  return x.distance < h || y.distance < h || s.distance < h || u.distance < h || !(!x.onSegement || !y.onSegement);
}

function u(t, n, o) {
  return {
    x: t - o.x,
    y: o.y - n,
  };
}

function c(t, n, o) {
  module12 = (module12 * Math.PI) / 180;
  return [n * Math.sin(module12) + t * Math.cos(module12), n * Math.cos(module12) - t * Math.sin(module12)];
}

function f(t) {
  for (; t > Math.PI || t <= -Math.PI; ) t > Math.PI ? (t -= 2 * Math.PI) : (t += 2 * Math.PI);

  return t;
}

function l(t, n, o, h, x, y) {
  if (o == x && h == y)
    return {
      distance: Math.sqrt((x - t) ** 2 + (y - n) ** 2),
      onSegement: true,
    };

  if (x == o) {
    var s = true;
    if ((n - h) * (n - y) > 0) s = false;
    return {
      distance: s ? Math.abs(t - o) : Math.abs(n - h) > Math.abs(n - y) ? Math.sqrt((x - t) ** 2 + (y - n) ** 2) : Math.sqrt((o - t) ** 2 + (h - n) ** 2),
      onSegement: s,
    };
  }

  var u = (y - h) / (x - o),
    c = y - u * x,
    f = (u * (n - c) + t) / (u * u + 1),
    l = u * f + c,
    v = true,
    p = 0;

  if ((l - h) * (l - y) > 0 || (f - o) * (f - x) > 0) {
    var M = Math.sqrt((x - t) ** 2 + (y - n) ** 2),
      w = Math.sqrt((o - t) ** 2 + (h - n) ** 2);
    p = M >= w ? w : M;
    v = false;
  } else {
    p = Math.sqrt((f - t) ** 2 + (l - n) ** 2);
    v = true;
  }

  return {
    distance: p,
    onSegement: v,
  };
}

function v(t) {
  return 90 === Math.abs(t % 360) || 270 === Math.abs(t % 360);
}

function p(t, n, o) {
  return n < 0 || n >= t.data.width ? -1 : o < 0 || o >= t.data.height ? -1 : t.data.offset + Math.floor(o) * t.data.width + Math.floor(n);
}

function M(t, n) {
  return t === n ? 0 !== t || 0 !== n || 1 / t == 1 / n : t != t && n != n;
}

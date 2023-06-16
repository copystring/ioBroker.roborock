exports._offset = y;

exports._center = function (t, n, o, x, y, s, u) {
  var f = arguments.length > 7 && undefined !== arguments[7] ? arguments[7] : 0;

  if (t.xx < 0 || t.yy < 0) {
    t.xx = -1 * t.xx;
    t.yy = -1 * t.yy;
  }

  if (c(f))
    o = {
      width: o.height,
      height: o.width,
    };
  return n && n.width && n.height && o && o.width && o.height ? t.moveTo(0, y / 2 - u / 2).scaleTo(h(n, o, x, y, s, u) || 1) : t;
};

exports._checkTrans = function (o, x, y, s, u, c, f, l) {
  if (!(x && x.width && x.height && y)) return false;
  var v = module1233.Config.scale.min,
    p = module1233.Config.scale.max;
  if ('android' === module12.Platform.OS && y && y.height && y.width && (y.width > 300 || y.height > 300)) p = module1233.Config.scale.maxAndroid;
  var w = v ** h(x, y, s, u, c, f),
    M = l ? 1 : p ** h(x, y, s, u, c, f);
  if (o.xx < w || o.xx > M || o.yy < w || o.yy > M) return false;
  var T = [y.width * o.xx, y.height * o.yy],
    P = T[0],
    _ = T[1];
  if (!P || !_) return false;
  var b = {
    x: (x.width - P) / 2 + o.x,
    y: (x.height - _) / 2 + o.y,
  };
  return b.x < x.width && b.y < x.height && b.x + P > 0 && b.y + _ > 0;
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

exports._parseEvent2 = function (n, o) {
  switch (n.touches.length) {
    case 0:
      return {
        timestamp: new Date().getTime(),
      };

    case 1:
      return {
        x: module12.I18nManager.isRTL ? -o.dx : o.dx,
        y: o.dy,
        timestamp: new Date().getTime(),
      };

    default:
      var h = n.touches[0].locationX - n.touches[1].locationX,
        x = n.touches[0].locationY - n.touches[1].locationY;
      return n.touches[0].target === n.touches[1].target
        ? {
            distance: Math.sqrt(h * h + x * x),
          }
        : {
            timestamp: new Date().getTime(),
          };
  }
};

exports._parseMove = function (n, o) {
  switch (n.touches.length) {
    case 0:
      return {
        timestamp: new Date().getTime(),
      };

    case 1:
      var h = o.moveX ? o.moveX : o.x0,
        x = o.moveY ? o.moveY : o.y0;
      return {
        x: module12.I18nManager.isRTL ? -h : h,
        y: x,
        timestamp: new Date().getTime(),
      };

    default:
      var y = n.touches[0].locationX - n.touches[1].locationX,
        s = n.touches[0].locationY - n.touches[1].locationY;
      return n.touches[0].target === n.touches[1].target
        ? {
            distance: Math.sqrt(y * y + s * s),
          }
        : {
            timestamp: new Date().getTime(),
          };
  }
};

exports._parseMove2 = function (n, o) {
  switch (n.touches.length) {
    case 1:
      return {
        x: module12.I18nManager.isRTL ? -o.dx : o.dx,
        y: o.dy,
        timestamp: new Date().getTime(),
      };

    default:
      return {
        timestamp: new Date().getTime(),
      };
  }
};

exports._parseDegPoint = function (t, n, o) {
  o = (o * Math.PI) / 180;
  var h = n * Math.sin(o) + t * Math.cos(o),
    x = n * Math.cos(o) - t * Math.sin(o);
  return [h, x];
};

exports._parseDegPointWithTrans = function (t, n, o, h) {
  if (!o) return;
  var x = (t.x - n.x) / (o.xx || 1),
    y = (t.y - n.y) / (o.yy || 1);
  return this._parseDegPoint(x, y, h);
};

exports._parsePath = function (t, n, h, x) {
  if (!t || t.length < 2)
    return {
      path: '',
    };
  var s = new o(),
    u = y(t[0].x, t[0].y, n),
    c = u.x,
    f = u.y,
    l = y(t[0].x, t[0].y, n),
    v = l.x,
    p = l.y,
    w = 0;
  s.moveTo(c, f);

  for (var M = 1; M < t.length; ++M)
    if (!((h && x && h[M] && 0 != h[M]) || (h && h[M] && 1 == ((h[M] >> 1) & 1)))) {
      var T = y(t[M].x, t[M].y, n);
      c = T.x;
      f = T.y;
      var P = y(t[w].x, t[w].y, n);
      v = P.x;
      p = P.y;
      if ((f - p) * (f - p) + (c - v) * (c - v) > 100) s.moveTo(c, f);
      else s.lineTo(c, f);
      w = M;
    }

  return {
    path: s,
  };
};

exports._parseGotoPlanPath = function (t, n, h) {
  if (!t || t.length < 2)
    return {
      path: '',
    };
  var x = new o(),
    s = y(t[0].x, t[0].y, n),
    u = s.x,
    c = s.y,
    f = y(t[0].x, t[0].y, n);
  u *= h.xx;
  c *= h.yy;
  x.moveTo(u, c);

  for (var l = 1; l < t.length; ++l) {
    var v = y(t[l].x, t[l].y, n);
    u = v.x;
    c = v.y;
    var p = y(t[l - 1].x, t[l - 1].y, n);
    u *= h.xx;
    c *= h.yy;
    x.lineTo(u, c);
  }

  return {
    path: x,
  };
};

exports._parsePathWithTransform = function (t, n, h) {
  if (!t || t.length < 2)
    return {
      path: '',
    };
  var x = new o(),
    s = y(t[0].x, t[0].y, n),
    u = s.x,
    c = s.y,
    f = y(t[0].x, t[0].y, n),
    l = f.x,
    v = f.y;
  u *= h.xx;
  c *= h.yy;
  l *= h.xx;
  v *= h.yy;
  x.moveTo(u, c);

  for (var p = 1; p < t.length; ++p) {
    var w = y(t[p].x, t[p].y, n);
    u = w.x;
    c = w.y;
    var M = y(t[p - 1].x, t[p - 1].y, n);
    l = M.x;
    v = M.y;
    u *= h.xx;
    c *= h.yy;
    l *= h.xx;
    v *= h.yy;
    if ((c - v) * (c - v) + (u - l) * (u - l) > 10 * h.xx * 10 * h.xx) x.moveTo(u, c);
    else x.lineTo(u, c);
  }

  return {
    path: x,
  };
};

exports._parseMopPath = function (t, n, h) {
  if (!t || t.length < 2 || t.length != h.length)
    return {
      mopPath: '',
    };

  for (var x = new o(), s = -1, u = 0, c = y(t[0].x, t[0].y, n), f = c.x, l = c.y, v = y(t[0].x, t[0].y, n), p = v.x, w = v.y, M = 0; M < t.length; ++M)
    if (1 == h[M]) {
      s = M;
      u = M;
      var T = y(t[M].x, t[M].y, n);
      f = T.x;
      l = T.y;
      var P = y(t[M].x, t[M].y, n);
      p = P.x;
      w = P.y;
      x.moveTo(f, l);
      break;
    }

  if (-1 != s)
    for (var _ = s + 1; _ < t.length; ++_)
      if (0 != (1 & h[_])) {
        var b = y(t[_].x, t[_].y, n);
        f = b.x;
        l = b.y;
        var D = y(t[u].x, t[u].y, n);
        p = D.x;
        w = D.y;
        if ((l - w) * (l - w) + (f - p) * (f - p) > 100 || u != _ - 1) x.moveTo(f, l);
        else x.lineTo(f, l);
        u = _;
      }
  return {
    mopPath: x,
  };
};

exports._parseMopPathWithTransform = function (t, n, h, x) {
  if (!t || t.length < 2 || t.length != x.length)
    return {
      mopPath: '',
    };

  for (var s = new o(), u = y(t[0].x, t[0].y, n), c = u.x, f = u.y, l = y(t[0].x, t[0].y, n), v = l.x, p = l.y, w = -1, M = 0, T = 0; T < t.length; ++T)
    if (1 == x[T]) {
      var P = y(t[T].x, t[T].y, n),
        _ = P.x,
        b = P.y,
        D = y(t[T].x, t[T].y, n);
      _ *= h.xx;
      b *= h.yy;
      s.moveTo(_, b);
      w = T;
      M = T;
      break;
    }

  if (-1 != w)
    for (var X = w + 1; X < t.length; ++X)
      if (0 != x[X]) {
        var Y = y(t[X].x, t[X].y, n);
        c = Y.x;
        f = Y.y;
        var k = y(t[M].x, t[M].y, n);
        v = k.x;
        p = k.y;
        c *= h.xx;
        f *= h.yy;
        v *= h.xx;
        p *= h.yy;
        if ((f - p) * (f - p) + (c - v) * (c - v) > 10 * h.xx * 10 * h.xx) s.moveTo(c, f);
        else s.lineTo(c, f);
        M = X;
      }
  return {
    mopPath: s,
  };
};

exports._parseBackWashPath = function (t, n, h) {
  if (!t || t.length < 2 || t.length != h.length)
    return {
      backWashPath: '',
    };

  for (var x = new o(), s = -1, u = 0, c = y(t[0].x, t[0].y, n), f = c.x, l = c.y, v = y(t[0].x, t[0].y, n), p = v.x, w = v.y, M = 0; M < t.length; ++M)
    if (1 == ((h[M] >> 1) & 1)) {
      s = M;
      u = M;
      var T = y(t[M].x, t[M].y, n);
      f = T.x;
      l = T.y;
      var P = y(t[M].x, t[M].y, n);
      p = P.x;
      w = P.y;
      x.moveTo(f, l);
      break;
    }

  if (-1 != s)
    for (var _ = s + 1; _ < t.length; ++_)
      if (0 != ((h[_] >> 1) & 1)) {
        var b = y(t[_].x, t[_].y, n);
        f = b.x;
        l = b.y;
        var D = y(t[u].x, t[u].y, n);
        p = D.x;
        w = D.y;
        if ((l - w) * (l - w) + (f - p) * (f - p) > 100 || u != _ - 1) x.moveTo(f, l);
        else x.lineTo(f, l);
        u = _;
      }
  return {
    backWashPath: x,
  };
};

exports._parseBackWashPathWithTransform = function (t, n, h, x) {
  if (!t || t.length < 2 || t.length != x.length)
    return {
      backWashPath: '',
    };

  for (var s = new o(), u = y(t[0].x, t[0].y, n), c = u.x, f = u.y, l = y(t[0].x, t[0].y, n), v = l.x, p = l.y, w = -1, M = 0, T = 0; T < t.length; ++T)
    if (1 == ((x[T] >> 1) & 1)) {
      var P = y(t[T].x, t[T].y, n),
        _ = P.x,
        b = P.y,
        D = y(t[T].x, t[T].y, n);
      _ *= h.xx;
      b *= h.yy;
      s.moveTo(_, b);
      w = T;
      M = T;
      break;
    }

  if (-1 != w)
    for (var X = w + 1; X < t.length; ++X)
      if (0 != ((x[X] >> 1) & 1)) {
        var Y = y(t[X].x, t[X].y, n);
        c = Y.x;
        f = Y.y;
        var k = y(t[M].x, t[M].y, n);
        v = k.x;
        p = k.y;
        c *= h.xx;
        f *= h.yy;
        v *= h.xx;
        p *= h.yy;
        if ((f - p) * (f - p) + (c - v) * (c - v) > 10 * h.xx * 10 * h.xx) s.moveTo(c, f);
        else s.lineTo(c, f);
        M = X;
      }
  return {
    backWashPath: s,
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
      left: v,
      top: p,
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

exports._regularAngle = s;

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

exports._disBtwPointSegement = u;

exports._judgeInlegalFBZ = function (t, n, o, h) {
  for (
    var y = o.props.transform.xx * o.state.rectSize.x,
      u = o.props.transform.yy * o.state.rectSize.y,
      c = o.props.transform.xx * o.state.rectSize.width,
      f = o.props.transform.yy * o.state.rectSize.height,
      l = [y, y + c, y + c, y],
      v = [u, u, u + f, u + f],
      p = y + 0.5 * c,
      w = u + 0.5 * f,
      M = o.state.slopeAngle,
      T = [],
      P = 0;
    P < l.length;
    P++
  ) {
    var _ = l[P],
      b = v[P],
      D = _ - p,
      X = b - w,
      Y = X ** D,
      k = s(Y + M),
      S = Math.sqrt(D * D + X * X);
    l[P] = S * Math.cos(k) + p;
    v[P] = S * Math.sin(k) + w;
    T.push(l[P]);
    T.push(v[P]);
  }

  return x(t, n, T, h);
};

exports._isVerticalRotate = c;

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

exports._convertToPixelPosition = function (t, n) {
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

exports.objectShallowEqual = function t(n, o, h) {
  if (f(n, o)) return true;
  if ('object' != typeof n || null === n || 'object' != typeof o || null === o) return false;
  var x = Object.keys(n);
  var y = Object.keys(o);
  if (x.length !== y.length) return false;

  for (var s = 0; s < x.length; s++) {
    if (!hasOwnProperty.call(o, x[s])) return false;
    if (h && !t(n[x[s]], o[x[s]], false)) return false;
    if (!h && !f(n[x[s]], o[x[s]])) return false;
  }

  return true;
};

var module12 = require('./12'),
  module1233 = require('./1233'),
  o = module12.ART.Path;

function h(t, n, o, h, x, y) {
  return ((t.width - o - x) / n.width || 1) ** ((t.height - h - y) / n.height || 1);
}

function x(t, n, o, h) {
  var x = u(t, n, o[0], o[1], o[2], o[3]),
    y = u(t, n, o[2], o[3], o[4], o[5]),
    s = u(t, n, o[4], o[5], o[6], o[7]),
    c = u(t, n, o[6], o[7], o[0], o[1]);
  return x.distance < h || y.distance < h || s.distance < h || c.distance < h || !(!x.onSegement || !y.onSegement);
}

function y(t, n, o) {
  return {
    x: t - o.x,
    y: o.y - n,
  };
}

function s(t) {
  for (; t > Math.PI || t <= -Math.PI; ) t > Math.PI ? (t -= 2 * Math.PI) : (t += 2 * Math.PI);

  return t;
}

function u(t, n, o, h, x, y) {
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
    var w = Math.sqrt((x - t) ** 2 + (y - n) ** 2),
      M = Math.sqrt((o - t) ** 2 + (h - n) ** 2);
    p = w >= M ? M : w;
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

function c(t) {
  return 90 === Math.abs(t % 360) || 270 === Math.abs(t % 360);
}

function f(t, n) {
  return t === n ? 0 !== t || 0 !== n || 1 / t == 1 / n : t != t && n != n;
}

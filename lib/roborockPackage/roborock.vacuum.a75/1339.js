exports._offset = l;

exports._center = function (t, n, o, h, u, s, c) {
  var f = arguments.length > 7 && undefined !== arguments[7] ? arguments[7] : 0;

  if (t.xx < 0 || t.yy < 0) {
    t.xx = -1 * t.xx;
    t.yy = -1 * t.yy;
  }

  if (_(f))
    o = {
      width: o.height,
      height: o.width,
    };
  return n && n.width && n.height && o && o.width && o.height ? t.moveTo(0, u / 2 - c / 2).scaleTo(x(n, o, h, u, s, c) || 1) : t;
};

exports._checkTrans = function (t, n, o, h, c, f, l, y) {
  var p = arguments.length > 8 && undefined !== arguments[8] ? arguments[8] : 0;
  if (!(n && n.width && n.height && o)) return false;
  var v = module1126.Config.scale.min,
    M = module1126.Config.scale.max;
  if ('android' === module13.Platform.OS && o && o.height && o.width && (o.width > 300 || o.height > 300)) M = module1126.Config.scale.maxAndroid;
  if (_(p))
    o = {
      width: o.height,
      height: o.width,
    };
  var w = v ** x(n, o, h, c, f, l),
    T = y ? 1 : M ** x(n, o, h, c, f, l);
  if (t.xx < w || t.xx > T || t.yy < w || t.yy > T) return false;
  var P = [o.width * t.xx, o.height * t.yy],
    b = P[0],
    I = P[1];
  if (!b || !I) return false;
  var S = {
    x: (n.width - b) / 2 + t.x,
    y: (n.height - I) / 2 + t.y,
  };
  return S.x < n.width && S.y < n.height && S.x + b > 0 && S.y + I > 0;
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
        x: module13.I18nManager.isRTL ? -n.dx : n.dx,
        y: n.dy,
        timestamp: new Date().getTime(),
      };

    default:
      var o = t.touches[0].locationX - t.touches[1].locationX,
        h = t.touches[0].locationY - t.touches[1].locationY;
      return t.touches[0].target === t.touches[1].target
        ? {
            distance: Math.sqrt(o * o + h * h),
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
      var o = n.moveX ? n.moveX : n.x0,
        h = n.moveY ? n.moveY : n.y0;
      return {
        x: module13.I18nManager.isRTL ? -o : o,
        y: h,
        timestamp: new Date().getTime(),
      };

    default:
      var s = t.touches[0].locationX - t.touches[1].locationX,
        c = t.touches[0].locationY - t.touches[1].locationY;
      return t.touches[0].target === t.touches[1].target
        ? {
            distance: Math.sqrt(s * s + c * c),
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
        x: module13.I18nManager.isRTL ? -n.dx : n.dx,
        y: n.dy,
        timestamp: new Date().getTime(),
      };

    default:
      return {
        timestamp: new Date().getTime(),
      };
  }
};

exports._parseDegPoint = y;
exports._parseDegPtToScreen = p;

exports._parseDegPointWithTrans = function (t, n, o, h) {
  if (!o) return;
  var u = (t.x - n.x) / (o.xx || 1),
    s = (t.y - n.y) / (o.yy || 1);
  return y(u, s, h);
};

exports._getRotateMaxRectSize = function (t) {
  var n = t.rectSize,
    o = (-1 * t.slopeAngle * 180) / Math.PI,
    u = n.x + n.width / 2,
    s = n.y + n.height / 2,
    c = y(n.x - u, n.y - s, o),
    x = module23.default(c, 2),
    f = x[0],
    l = x[1],
    p = y(n.x - u, n.y + n.height - s, o),
    v = module23.default(p, 2),
    M = v[0],
    w = v[1],
    _ = [Math.abs(f) ** Math.abs(M), Math.abs(l) ** Math.abs(w)],
    T = _[0],
    P = _[1];
  return {
    x: u - T,
    y: s - P,
    width: 2 * T,
    height: 2 * P,
  };
};

exports._parsePath = function (t, n, h) {
  var u =
      arguments.length > 3 && undefined !== arguments[3]
        ? arguments[3]
        : {
            xx: 1,
            yy: 1,
          },
    s = arguments.length > 4 ? arguments[4] : undefined,
    x = arguments.length > 5 ? arguments[5] : undefined;
  if (!t || t.length < 2)
    return {
      path: '',
      backWashPath: '',
      pureCleanPath: '',
    };

  var f = new Array(),
    y = new Array(),
    p = -1,
    M = -1,
    w = new Array(),
    _ = new Array(),
    T = function (n, o) {
      var h = false;
      if (o && o[n])
        1 == ((o[n] >> 1) & 1) || (s && 1 == ((o[n] >> 3) & 1))
          ? ((h = true), 0 != n && -1 != p && p != n - 1 && (f.push(w.splice(0)), (h = false)), w.push(t[n]), (p = n))
          : x && 1 == (1 & o[n]) && 1 == ((o[n] >> 2) & 1)
          ? ((h = true), 0 != n && -1 != M && M != n - 1 && (y.push(_.splice(0)), (h = false)), _.push(t[n]), (M = n))
          : s && 0 == (1 & o[n]) && 1 == ((o[n] >> 2) & 1) && ((h = true), 0 != n && -1 != M && M != n - 1 && (y.push(_.splice(0)), (h = false)), _.push(t[n]), (M = n));

      if (n == o.length - 1) {
        if (_.length > 0) y.push(_.splice(0));
        if (w.length > 0) f.push(w.splice(0));
      }

      return h;
    },
    P = new c(),
    b = 0,
    I = l(t[0].x, t[0].y, n),
    S = I.x,
    X = I.y,
    Y = {
      x: S,
      y: X,
    },
    q = Y.x_last,
    D = Y.y_last,
    R = [S * u.xx, X * u.yy];

  S = R[0];
  X = R[1];
  P.moveTo(S, X);
  T(0, h);

  for (var z = 1; z < t.length; ++z)
    if (!T(z, h)) {
      var A = l(t[z].x, t[z].y, n);
      S = A.x;
      X = A.y;
      var O = l(t[b].x, t[b].y, n);
      q = O.x;
      D = O.y;
      var j = [S * u.xx, X * u.yy];
      S = j[0];
      X = j[1];
      var k = [q * u.xx, D * u.yy];
      if ((X - (D = k[1])) * (X - D) + (S - (q = k[0])) * (S - q) > 10 * u.xx * 10 * u.xx || b != z - 1) P.moveTo(S, X);
      else P.lineTo(S, X);
      b = z;
    }

  var E = {
      path: P,
    },
    C = f.length > 0 ? v(f, n, u) : '';
  module22.default(E, {
    backWashPath: C,
  });
  var L = y.length > 0 ? v(y, n, u) : '';
  module22.default(E, {
    pureCleanPath: L,
  });
  return E;
};

exports._parseGotoPlanPath = function (t, n, o) {
  return !t || t.length < 2
    ? {
        pathGotoPlan: '',
      }
    : {
        path: v([t], n, o, false),
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

  for (
    var u = new c(),
      s = -1,
      x = 0,
      f = l(t[0].x, t[0].y, n),
      y = f.x,
      p = f.y,
      v = {
        x: y,
        y: p,
      },
      M = v.x_last,
      w = v.y_last,
      _ = 0;
    _ < t.length;
    ++_
  )
    if (1 == (1 & o[_])) {
      s = _;
      x = _;
      var T = l(t[_].x, t[_].y, n);
      y = T.x;
      p = T.y;
      var P = [y * h.xx, p * h.yy];
      y = P[0];
      p = P[1];
      u.moveTo(y, p);
      break;
    }

  if (-1 != s)
    for (var b = s + 1; b < t.length; ++b)
      if (0 != (1 & o[b])) {
        var I = l(t[b].x, t[b].y, n);
        y = I.x;
        p = I.y;
        var S = l(t[x].x, t[x].y, n);
        M = S.x;
        w = S.y;
        var X = [y * h.xx, p * h.yy];
        y = X[0];
        p = X[1];
        var Y = [M * h.xx, w * h.yy];
        if ((p - (w = Y[1])) * (p - w) + (y - (M = Y[0])) * (y - M) > 10 * h.xx * 10 * h.xx || x != b - 1) u.moveTo(y, p);
        else u.lineTo(y, p);
        x = b;
      }
  return {
    mopPath: u,
  };
};

exports._parseDisplayRects = function (t, n, o) {
  if (!t || !t.num || !t.zones || t.num < 1)
    return {
      displayZones: [],
    };

  for (var h = [], u = 0; u < t.num; u++) {
    var s = t.zones[u][0] - n.x,
      c = n.y - t.zones[u][1],
      x = t.zones[u][2] - n.x,
      f = n.y - t.zones[u][3],
      l = x - s,
      y = c - f,
      p = s,
      v = c - y;
    h.push({
      x: p,
      y: v,
      width: l,
      height: y,
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

exports._regularAngle = M;

exports._pointVectorToLine = function (t, n, o, h) {
  var u = [0, 0, 0];

  if (0 == o) {
    u[0] = 1;
    u[1] = 0;
    u[2] = -1 * t;
  } else {
    var s = h / o;
    u[0] = s;
    u[1] = -1;
    u[2] = -1 * s * t + n;
  }

  return u;
};

exports._disBtwPointSegement = w;

exports._judgeInlegalFBZ = function (t, n, o, h) {
  for (
    var u = o.props.transform.xx * o.state.rectSize.x,
      s = o.props.transform.yy * o.state.rectSize.y,
      c = o.props.transform.xx * o.state.rectSize.width,
      x = o.props.transform.yy * o.state.rectSize.height,
      l = [u, u + c, u + c, u],
      y = [s, s, s + x, s + x],
      p = u + 0.5 * c,
      v = s + 0.5 * x,
      w = o.state.slopeAngle,
      _ = [],
      T = 0;
    T < l.length;
    T++
  ) {
    var P = l[T],
      b = y[T],
      I = P - p,
      S = b - v,
      X = S ** I,
      Y = M(X + w),
      q = Math.sqrt(I * I + S * S);
    l[T] = q * Math.cos(Y) + p;
    y[T] = q * Math.sin(Y) + v;

    _.push(l[T]);

    _.push(y[T]);
  }

  return f(t, n, _, h);
};

exports._getRotateRect = function (t, n) {
  if (Math.abs(n) % 180 != 0) {
    var o = t.width,
      h = t.height,
      u = t.x + o / 2,
      s = t.y + h / 2;
    t.x = u - h / 2;
    t.y = s - o / 2;
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
    var u = o % 360;
    h =
      90 === u || -270 === u
        ? {
            x: t.x - n.x,
            y: t.y,
          }
        : 180 === u || -180 === u
        ? {
            x: t.x,
            y: t.y + n.y,
          }
        : 270 === u || -90 === u
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

exports._isVerticalRotate = _;

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

exports._convertToMapPoint = function (t, n) {
  return t
    ? {
        x: t.x / (n.xx || 1),
        y: t.y / (n.yy || 1),
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
    u = t.height - Math.floor(o) - 1 + (t.top - t.data.top + 0.5);
  return {
    x: h,
    y: u,
  };
};

exports._mapRectXYToOrigin = function (t, n, o) {
  var h = Math.floor(n) + (t.left - t.data.left + 0.5),
    u = Math.floor(o) + (t.top - t.data.top + 0.5);
  return {
    x: h,
    y: u,
  };
};

exports._mapScreenXYToIndex = function (t, n, o) {
  var h = t.height - Math.floor(o) - 0.5 + t.top - t.data.top,
    u = Math.floor(n) + t.left - t.data.left + 0.5;
  return t.data.offset + Math.floor(h) * t.data.width + Math.floor(u);
};

exports._mapOriginXYToIndex = T;

exports._getAroundIndexInfo = function (t, n, o) {
  for (
    var h = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : 1,
      u = function (n) {
        var o = t.data.data[n] >>> 3,
          h = 7 & t.data.data[n];
        return [o, h];
      },
      s = [],
      c = 1;
    c <= h;
    c++
  ) {
    var x = T(t, n - c, o);
    if (x >= 0) s.push(u(x));
    var f = T(t, n, o - c);
    if (f >= 0) s.push(u(f));
  }

  for (var l = 1; l <= h; l++) {
    var y = T(t, n + l, o);
    if (y >= 0) s.push(u(y));
    var p = T(t, n, o + l);
    if (p >= 0) s.push(u(p));
  }

  return s;
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
    u = Math.sqrt((t[0] - t[2]) ** 2 + (t[1] - t[3]) ** 2),
    s = (t[0] + t[4]) / 2,
    c = (t[1] + t[5]) / 2,
    x = [h / 2, u / 2],
    f = [Math.abs(n.x - s), Math.abs(n.y - c)],
    l = [(f[0] - x[0]) ** 0, (f[1] - x[1]) ** 0];
  return l[0] ** 2 + l[1] ** 2 < o ** 2;
};

exports._getStuckPtStretchZone = function (t, n, o, u) {
  var s = Math.sqrt((t[0] - t[6]) ** 2 + (t[1] - t[7]) ** 2),
    c = Math.sqrt((t[0] - t[2]) ** 2 + (t[1] - t[3]) ** 2),
    x = [];
  t.forEach(function (t, n) {
    x.push(n % 2 == 0 ? t - u.x : u.y - t);
  });
  var f = [n.x - x[2], n.y - x[3]],
    l = f[0],
    v = f[1],
    M = y(l, v, o, true),
    w = module23.default(M, 2);
  l = w[0];
  v = w[1];
  var _ = s,
    T = c;
  if (l > 0 || l < -c) T += l > 0 ? l : Math.abs(l + c);
  if (v < 0 || v > s) _ += v < 0 ? Math.abs(v) : v - s;
  var P = (x[2] + x[6]) / 2,
    b = (x[3] + x[7]) / 2;

  if ((l > 0 && v > 0) || (l <= 0 && l > -c && v >= s)) {
    var I = p(l ** 0, (v - s) ** 0, o, true),
      S = module23.default(I, 2),
      X = S[0],
      Y = S[1];
    x[4] += X;
    x[5] += Y;
    P = (x[0] + x[4]) / 2;
    b = (x[1] + x[5]) / 2;
  } else if ((l < 0 && v <= 0) || (l < -c && v > 0 && v < s)) {
    var q = p((l + c) ** 0, v ** 0, o, true),
      D = module23.default(q, 2),
      R = D[0],
      z = D[1];
    x[0] += R;
    x[1] += z;
    P = (x[0] + x[4]) / 2;
    b = (x[1] + x[5]) / 2;
  } else if (l >= 0 && v <= 0) {
    var A = p(l, v, o, true),
      O = module23.default(A, 2),
      j = O[0],
      k = O[1];
    x[2] += j;
    x[3] += k;
    P = (x[2] + x[6]) / 2;
    b = (x[3] + x[7]) / 2;
  } else if (l <= -c && v >= s) {
    var E = p(l, v, o, true),
      C = module23.default(E, 2),
      L = C[0],
      Z = C[1];
    x[6] += L;
    x[7] += Z;
    P = (x[2] + x[6]) / 2;
    b = (x[3] + x[7]) / 2;
  }

  return {
    x: P - T / 2,
    y: b - _ / 2,
    width: T,
    height: _,
  };
};

exports._mergeObstacles = function (t, o, h) {
  if (!t || t.length <= 0) return [];

  for (var u = {}, c = 0; c < t.length; c++)
    for (var x = t[c], f = c + 1; f < t.length; f++) {
      var y = t[f],
        p = Math.sqrt((y[0] - x[0]) ** 2 + (y[1] - x[1]) ** 2);
      if (p <= 300 || p <= (50 * module1126.Config.size.objectsRadius) / h) u[c] ? u[c].push(f) : (u[c] = [f]);
    }

  var v = [],
    M = function (t) {
      return v.some(function (n) {
        return (
          -1 !=
          n.findIndex(function (n) {
            return n == t;
          })
        );
      });
    };

  Object.keys(u).forEach(function (t) {
    var o = [];

    if (!M(t)) {
      for (
        var h = u[t],
          s = function (t) {
            var n,
              s = h[t];
            if (M(s)) return 'continue';
            var c = [s];

            if ((null == (n = u[s]) ? undefined : n.length) > 0) {
              var x = u[s];
              x.forEach(function (t) {
                var n = h.findIndex(function (n) {
                  return n == t;
                });
                if (-1 != n) c.push(t);
              });
            }

            o.push(c);
          },
          c = 0;
        c < h.length;
        c++
      )
        s(c);

      if (o.length > 0) {
        o = o.sort(function (t, n) {
          return n.length - t.length;
        });
        v.push([parseInt(t)].concat(module31.default(o[0])));
      }
    }
  });
  var w = [];
  t.forEach(function (t, n) {
    if (!M(n)) {
      var h = l(t[0] / 50, t[1] / 50, o),
        u = t.concat();
      u.splice(3, 0, h.x, h.y);
      w.push(u);
    }
  });
  v.forEach(function (h) {
    var u = 0,
      s = 0,
      c = [];
    h.forEach(function (n) {
      var h = t[n].concat();
      u += h[0];
      s += h[1];
      var x = l(h[0] / 50, h[1] / 50, o);
      h.splice(3, 0, x.x, x.y);
      c.push(h);
    });
    u /= h.length;
    s /= h.length;
    var x = t[h[0]].concat();
    x.splice(0, 3);
    var f = [u, s, -99].concat(module31.default(x), [c]),
      y = l(f[0] / 50, f[1] / 50, o);
    f.splice(3, 0, y.x, y.y);
    w.push(f);
  });
  return w;
};

exports.objectShallowEqual = function t(n, o, h) {
  if (P(n, o)) return true;
  if ('object' != typeof n || null === n || 'object' != typeof o || null === o) return false;
  var u = Object.keys(n);
  var s = Object.keys(o);
  if (u.length !== s.length) return false;

  for (var c = 0; c < u.length; c++) {
    if (!hasOwnProperty.call(o, u[c])) return false;
    if (h && !t(n[u[c]], o[u[c]], false)) return false;
    if (!h && !P(n[u[c]], o[u[c]])) return false;
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

var module22 = require('./22'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module13 = require('./13'),
  module1126 = require('./1126'),
  c = module13.ART.Path;

function x(t, n, o, h, u, s) {
  return ((t.width - o - u) / n.width || 1) ** ((t.height - h - s) / n.height || 1);
}

function f(t, n, o, h) {
  var u = w(t, n, o[0], o[1], o[2], o[3]),
    s = w(t, n, o[2], o[3], o[4], o[5]),
    c = w(t, n, o[4], o[5], o[6], o[7]),
    x = w(t, n, o[6], o[7], o[0], o[1]);
  return u.distance < h || s.distance < h || c.distance < h || x.distance < h || !(!u.onSegement || !s.onSegement);
}

function l(t, n, o) {
  return {
    x: t - o.x,
    y: o.y - n,
  };
}

function y(t, n, o) {
  if (!(arguments.length > 3 && undefined !== arguments[3] && arguments[3])) o = (o * Math.PI) / 180;
  return [n * Math.sin(o) + t * Math.cos(o), n * Math.cos(o) - t * Math.sin(o)];
}

function p(t, n, o) {
  if (!(arguments.length > 3 && undefined !== arguments[3] && arguments[3])) o = (o * Math.PI) / 180;
  return [t * Math.cos(o) - n * Math.sin(o), t * Math.sin(o) + n * Math.cos(o)];
}

function v(t, n) {
  for (
    var o =
        arguments.length > 2 && undefined !== arguments[2]
          ? arguments[2]
          : {
              xx: 1,
              yy: 1,
            },
      h = !(arguments.length > 3 && undefined !== arguments[3]) || arguments[3],
      u = new c(),
      s = 0;
    s < t.length;
    s++
  ) {
    var x = t[s];

    if (!((null == x ? undefined : x.length) <= 0)) {
      var f = 0,
        y = l(x[0].x, x[0].y, n),
        p = y.x,
        v = y.y,
        M = {
          x: p,
          y: v,
        },
        w = M.x_last,
        _ = M.y_last,
        T = [p * o.xx, v * o.yy];
      p = T[0];
      v = T[1];
      u.moveTo(p, v);

      for (var P = 1; P < x.length; ++P) {
        var b = l(x[P].x, x[P].y, n);
        p = b.x;
        v = b.y;
        var I = l(x[f].x, x[f].y, n);
        w = I.x;
        _ = I.y;
        var S = [p * o.xx, v * o.yy];
        p = S[0];
        v = S[1];
        var X = [w * o.xx, _ * o.yy];
        w = X[0];
        _ = X[1];
        if (h && (v - _) * (v - _) + (p - w) * (p - w) > 10 * o.xx * 10 * o.xx) u.moveTo(p, v);
        else u.lineTo(p, v);
        f = P;
      }
    }
  }

  return u;
}

function M(t) {
  for (; t > Math.PI || t <= -Math.PI; ) t > Math.PI ? (t -= 2 * Math.PI) : (t += 2 * Math.PI);

  return t;
}

function w(t, n, o, h, u, s) {
  if (o == u && h == s)
    return {
      distance: Math.sqrt((u - t) ** 2 + (s - n) ** 2),
      onSegement: true,
    };

  if (u == o) {
    var c = true;
    if ((n - h) * (n - s) > 0) c = false;
    return {
      distance: c ? Math.abs(t - o) : Math.abs(n - h) > Math.abs(n - s) ? Math.sqrt((u - t) ** 2 + (s - n) ** 2) : Math.sqrt((o - t) ** 2 + (h - n) ** 2),
      onSegement: c,
    };
  }

  var x = (s - h) / (u - o),
    f = s - x * u,
    l = (x * (n - f) + t) / (x * x + 1),
    y = x * l + f,
    p = true,
    v = 0;

  if ((y - h) * (y - s) > 0 || (l - o) * (l - u) > 0) {
    var M = Math.sqrt((u - t) ** 2 + (s - n) ** 2),
      w = Math.sqrt((o - t) ** 2 + (h - n) ** 2);
    v = M >= w ? w : M;
    p = false;
  } else {
    v = Math.sqrt((l - t) ** 2 + (y - n) ** 2);
    p = true;
  }

  return {
    distance: v,
    onSegement: p,
  };
}

function _(t) {
  return 90 === Math.abs(t % 360) || 270 === Math.abs(t % 360);
}

function T(t, n, o) {
  return n < 0 || n >= t.data.width ? -1 : o < 0 || o >= t.data.height ? -1 : t.data.offset + Math.floor(o) * t.data.width + Math.floor(n);
}

function P(t, n) {
  return t === n ? 0 !== t || 0 !== n || 1 / t == 1 / n : t != t && n != n;
}

exports._offset = l;

exports._center = function (t, n, o, h, u, s, c) {
  var x = arguments.length > 7 && undefined !== arguments[7] ? arguments[7] : 0;

  if (t.xx < 0 || t.yy < 0) {
    t.xx = -1 * t.xx;
    t.yy = -1 * t.yy;
  }

  if (T(x))
    o = {
      width: o.height,
      height: o.width,
    };
  return n && n.width && n.height && o && o.width && o.height ? t.moveTo(0, u / 2 - c / 2).scaleTo(f(n, o, h, u, s, c) || 1) : t;
};

exports._checkTrans = function (t, n, o, h, c, x, y, l) {
  var p = arguments.length > 8 && undefined !== arguments[8] ? arguments[8] : 0;
  if (!(n && n.width && n.height && o)) return false;
  var v = module1127.Config.scale.min,
    M = module1127.Config.scale.max;
  if ('android' === module13.Platform.OS && o && o.height && o.width && (o.width > 300 || o.height > 300)) M = module1127.Config.scale.maxAndroid;
  if (T(p))
    o = {
      width: o.height,
      height: o.width,
    };

  var w = v ** f(n, o, h, c, x, y),
    _ = l ? 1 : M ** f(n, o, h, c, x, y);

  if (t.xx < w || t.xx > _ || t.yy < w || t.yy > _) return false;
  var P = [o.width * t.xx, o.height * t.yy],
    b = P[0],
    R = P[1];
  if (!b || !R) return false;
  var I = {
    x: (n.width - b) / 2 + t.x,
    y: (n.height - R) / 2 + t.y,
  };
  return I.x < n.width && I.y < n.height && I.x + b > 0 && I.y + R > 0;
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

exports._parseDegPoint = p;
exports._parseDegPtToScreen = v;

exports._parseDegPointWithTrans = function (t, n, o, h) {
  if (!o) return;
  var u = (t.x - n.x) / (o.xx || 1),
    s = (t.y - n.y) / (o.yy || 1);
  return p(u, s, h);
};

exports._getRotateMaxRectSize = function (t) {
  var n = t.rectSize,
    o = (-1 * t.slopeAngle * 180) / Math.PI,
    u = n.x + n.width / 2,
    s = n.y + n.height / 2,
    c = p(n.x - u, n.y - s, o),
    x = module23.default(c, 2),
    f = x[0],
    y = x[1],
    l = p(n.x - u, n.y + n.height - s, o),
    v = module23.default(l, 2),
    M = v[0],
    w = v[1],
    _ = [Math.abs(f) ** Math.abs(M), Math.abs(y) ** Math.abs(w)],
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
    c = arguments.length > 5 ? arguments[5] : undefined;
  if (!t || t.length < 2)
    return {
      path: '',
      backWashPath: '',
      pureCleanPath: '',
    };

  var f = new Array(),
    y = new Array(),
    p = -1,
    v = -1,
    w = new Array(),
    _ = new Array(),
    T = function (n, o) {
      var h = false;
      if (o && o[n])
        1 == ((o[n] >> 1) & 1) || (s && 1 == ((o[n] >> 3) & 1))
          ? ((h = true), 0 != n && -1 != p && p != n - 1 && (f.push(w.splice(0)), (h = false)), w.push(t[n]), (p = n))
          : c && 1 == (1 & o[n]) && 1 == ((o[n] >> 2) & 1)
          ? ((h = true), 0 != n && -1 != v && v != n - 1 && (y.push(_.splice(0)), (h = false)), _.push(t[n]), (v = n))
          : s && 0 == (1 & o[n]) && 1 == ((o[n] >> 2) & 1) && ((h = true), 0 != n && -1 != v && v != n - 1 && (y.push(_.splice(0)), (h = false)), _.push(t[n]), (v = n));

      if (n == o.length - 1) {
        if (_.length > 0) y.push(_.splice(0));
        if (w.length > 0) f.push(w.splice(0));
      }

      return h;
    },
    P = new x(),
    b = 0,
    R = l(t[0].x, t[0].y, n),
    I = R.x,
    S = R.y,
    X = {
      x: I,
      y: S,
    },
    Y = X.x_last,
    C = X.y_last,
    q = [I * u.xx, S * u.yy];

  I = q[0];
  S = q[1];
  P.moveTo(I, S);
  T(0, h);

  for (var D = 1; D < t.length; ++D)
    if (!T(D, h)) {
      var z = l(t[D].x, t[D].y, n);
      I = z.x;
      S = z.y;
      var A = l(t[b].x, t[b].y, n);
      Y = A.x;
      C = A.y;
      var j = [I * u.xx, S * u.yy];
      I = j[0];
      S = j[1];
      var E = [Y * u.xx, C * u.yy];
      if ((S - (C = E[1])) * (S - C) + (I - (Y = E[0])) * (I - Y) > 10 * u.xx * 10 * u.xx || b != D - 1) P.moveTo(I, S);
      else P.lineTo(I, S);
      b = D;
    }

  var O = {
      path: P,
    },
    k = f.length > 0 ? M(f, n, u) : '';
  module22.default(O, {
    backWashPath: k,
  });
  var L = y.length > 0 ? M(y, n, u) : '';
  module22.default(O, {
    pureCleanPath: L,
  });
  return O;
};

exports._parseGotoPlanPath = function (t, n, o) {
  return !t || t.length < 2
    ? {
        pathGotoPlan: '',
      }
    : {
        path: M([t], n, o, false),
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
    var u = new x(),
      s = -1,
      c = 0,
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
      c = _;
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
        var R = l(t[b].x, t[b].y, n);
        y = R.x;
        p = R.y;
        var I = l(t[c].x, t[c].y, n);
        M = I.x;
        w = I.y;
        var S = [y * h.xx, p * h.yy];
        y = S[0];
        p = S[1];
        var X = [M * h.xx, w * h.yy];
        if ((p - (w = X[1])) * (p - w) + (y - (M = X[0])) * (y - M) > 10 * h.xx * 10 * h.xx || c != b - 1) u.moveTo(y, p);
        else u.lineTo(y, p);
        c = b;
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
      y = x - s,
      l = c - f,
      p = s,
      v = c - l;
    h.push({
      x: p,
      y: v,
      width: y,
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

exports._regularAngle = w;

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

exports._disBtwPointSegement = _;

exports._judgeInlegalFBZ = function (t, n, o, h) {
  for (
    var u = o.props.transform.xx * o.state.rectSize.x,
      s = o.props.transform.yy * o.state.rectSize.y,
      c = o.props.transform.xx * o.state.rectSize.width,
      x = o.props.transform.yy * o.state.rectSize.height,
      f = [u, u + c, u + c, u],
      l = [s, s, s + x, s + x],
      p = u + 0.5 * c,
      v = s + 0.5 * x,
      M = o.state.slopeAngle,
      _ = [],
      T = 0;
    T < f.length;
    T++
  ) {
    var P = f[T],
      b = l[T],
      R = P - p,
      I = b - v,
      S = I ** R,
      X = w(S + M),
      Y = Math.sqrt(R * R + I * I);
    f[T] = Y * Math.cos(X) + p;
    l[T] = Y * Math.sin(X) + v;

    _.push(f[T]);

    _.push(l[T]);
  }

  return y(t, n, _, h);
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

exports._isVerticalRotate = T;

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

exports._mapOriginXYToIndex = P;

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
    var x = P(t, n - c, o);
    if (x >= 0) s.push(u(x));
    var f = P(t, n, o - c);
    if (f >= 0) s.push(u(f));
  }

  for (var y = 1; y <= h; y++) {
    var l = P(t, n + y, o);
    if (l >= 0) s.push(u(l));
    var p = P(t, n, o + y);
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
    y = [(f[0] - x[0]) ** 0, (f[1] - x[1]) ** 0];
  return y[0] ** 2 + y[1] ** 2 < o ** 2;
};

exports._getStuckPtStretchZone = function (t, n, o, u) {
  var s = Math.sqrt((t[0] - t[6]) ** 2 + (t[1] - t[7]) ** 2),
    c = Math.sqrt((t[0] - t[2]) ** 2 + (t[1] - t[3]) ** 2),
    x = [];
  t.forEach(function (t, n) {
    x.push(n % 2 == 0 ? t - u.x : u.y - t);
  });
  var f = [n.x - x[2], n.y - x[3]],
    y = f[0],
    l = f[1],
    M = p(y, l, o, true),
    w = module23.default(M, 2);
  y = w[0];
  l = w[1];
  var _ = s,
    T = c;
  if (y > 0 || y < -c) T += y > 0 ? y : Math.abs(y + c);
  if (l < 0 || l > s) _ += l < 0 ? Math.abs(l) : l - s;
  var P = (x[2] + x[6]) / 2,
    b = (x[3] + x[7]) / 2;

  if ((y > 0 && l > 0) || (y <= 0 && y > -c && l >= s)) {
    var R = v(y ** 0, (l - s) ** 0, o, true),
      I = module23.default(R, 2),
      S = I[0],
      X = I[1];
    x[4] += S;
    x[5] += X;
    P = (x[0] + x[4]) / 2;
    b = (x[1] + x[5]) / 2;
  } else if ((y < 0 && l <= 0) || (y < -c && l > 0 && l < s)) {
    var Y = v((y + c) ** 0, l ** 0, o, true),
      C = module23.default(Y, 2),
      q = C[0],
      D = C[1];
    x[0] += q;
    x[1] += D;
    P = (x[0] + x[4]) / 2;
    b = (x[1] + x[5]) / 2;
  } else if (y >= 0 && l <= 0) {
    var z = v(y, l, o, true),
      A = module23.default(z, 2),
      j = A[0],
      E = A[1];
    x[2] += j;
    x[3] += E;
    P = (x[2] + x[6]) / 2;
    b = (x[3] + x[7]) / 2;
  } else if (y <= -c && l >= s) {
    var O = v(y, l, o, true),
      k = module23.default(O, 2),
      L = k[0],
      W = k[1];
    x[6] += L;
    x[7] += W;
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
      if (p <= 300 || p <= (50 * module1127.Config.size.objectsRadius) / h) u[c] ? u[c].push(f) : (u[c] = [f]);
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
  if (b(n, o)) return true;
  if ('object' != typeof n || null === n || 'object' != typeof o || null === o) return false;
  var u = Object.keys(n);
  var s = Object.keys(o);
  if (u.length !== s.length) return false;

  for (var c = 0; c < u.length; c++) {
    if (!hasOwnProperty.call(o, u[c])) return false;
    if (h && !t(n[u[c]], o[u[c]], false)) return false;
    if (!h && !b(n[u[c]], o[u[c]])) return false;
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

exports.getMaxCarpetRect = function (t, n, o, h) {
  var u = function (t) {
      return t.y * o + t.x;
    },
    s = u(n);

  if (t && (s > t.length - 1 || 0 == t[s])) return null;
  var x = new Array(t.length);
  module398.fill(x, 0);
  var f = [],
    y = n.x,
    l = n.x,
    p = n.y,
    v = n.y;
  x[s] = 1;
  f.push(n);

  var M = function () {
    var n = undefined,
      s = f.pop();
    l = s.x ** l;
    v = s.y ** v;
    y = s.x ** y;
    p = s.y ** p;
    var c = [];
    if (s.x > 0)
      c.push({
        x: s.x - 1,
        y: s.y,
      });
    if (s.x < o - 1)
      c.push({
        x: s.x + 1,
        y: s.y,
      });
    if (s.y > 0)
      c.push({
        x: s.x,
        y: s.y - 1,
      });
    if (s.y < h - 1)
      c.push({
        x: s.x,
        y: s.y + 1,
      });
    c.forEach(function (o) {
      n = u(o);

      if (1 == t[n] && 0 == x[n]) {
        x[n] = 1;
        f.push(o);
      }
    });
  };

  for (; f.length > 0; ) M();

  return R({
    x: l,
    y: v,
    width: y - l + 1,
    height: p - v + 1,
  });
};

exports.adjustMinCarpetRect = R;

var module22 = require('./22'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module13 = require('./13'),
  module1127 = require('./1127'),
  module398 = require('./398'),
  x = module13.ART.Path;

function f(t, n, o, h, u, s) {
  return ((t.width - o - u) / n.width || 1) ** ((t.height - h - s) / n.height || 1);
}

function y(t, n, o, h) {
  var u = _(t, n, o[0], o[1], o[2], o[3]),
    s = _(t, n, o[2], o[3], o[4], o[5]),
    c = _(t, n, o[4], o[5], o[6], o[7]),
    x = _(t, n, o[6], o[7], o[0], o[1]);

  return u.distance < h || s.distance < h || c.distance < h || x.distance < h || !(!u.onSegement || !s.onSegement);
}

function l(t, n, o) {
  return {
    x: t - o.x,
    y: o.y - n,
  };
}

function p(t, n, o) {
  if (!(arguments.length > 3 && undefined !== arguments[3] && arguments[3])) o = (o * Math.PI) / 180;
  return [n * Math.sin(o) + t * Math.cos(o), n * Math.cos(o) - t * Math.sin(o)];
}

function v(t, n, o) {
  if (!(arguments.length > 3 && undefined !== arguments[3] && arguments[3])) o = (o * Math.PI) / 180;
  return [t * Math.cos(o) - n * Math.sin(o), t * Math.sin(o) + n * Math.cos(o)];
}

function M(t, n) {
  for (
    var o =
        arguments.length > 2 && undefined !== arguments[2]
          ? arguments[2]
          : {
              xx: 1,
              yy: 1,
            },
      h = !(arguments.length > 3 && undefined !== arguments[3]) || arguments[3],
      u = new x(),
      s = 0;
    s < t.length;
    s++
  ) {
    var c = t[s];

    if (!((null == c ? undefined : c.length) <= 0)) {
      var f = 0,
        y = l(c[0].x, c[0].y, n),
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

      for (var P = 1; P < c.length; ++P) {
        var b = l(c[P].x, c[P].y, n);
        p = b.x;
        v = b.y;
        var R = l(c[f].x, c[f].y, n);
        w = R.x;
        _ = R.y;
        var I = [p * o.xx, v * o.yy];
        p = I[0];
        v = I[1];
        var S = [w * o.xx, _ * o.yy];
        w = S[0];
        _ = S[1];
        if (h && (v - _) * (v - _) + (p - w) * (p - w) > 10 * o.xx * 10 * o.xx) u.moveTo(p, v);
        else u.lineTo(p, v);
        f = P;
      }
    }
  }

  return u;
}

function w(t) {
  for (; t > Math.PI || t <= -Math.PI; ) t > Math.PI ? (t -= 2 * Math.PI) : (t += 2 * Math.PI);

  return t;
}

function _(t, n, o, h, u, s) {
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
    y = (x * (n - f) + t) / (x * x + 1),
    l = x * y + f,
    p = true,
    v = 0;

  if ((l - h) * (l - s) > 0 || (y - o) * (y - u) > 0) {
    var M = Math.sqrt((u - t) ** 2 + (s - n) ** 2),
      w = Math.sqrt((o - t) ** 2 + (h - n) ** 2);
    v = M >= w ? w : M;
    p = false;
  } else {
    v = Math.sqrt((y - t) ** 2 + (l - n) ** 2);
    p = true;
  }

  return {
    distance: v,
    onSegement: p,
  };
}

function T(t) {
  return 90 === Math.abs(t % 360) || 270 === Math.abs(t % 360);
}

function P(t, n, o) {
  return n < 0 || n >= t.data.width ? -1 : o < 0 || o >= t.data.height ? -1 : t.data.offset + Math.floor(o) * t.data.width + Math.floor(n);
}

function b(t, n) {
  return t === n ? 0 !== t || 0 !== n || 1 / t == 1 / n : t != t && n != n;
}

function R(t) {
  var n = t.width,
    o = t.height,
    h = [t.x, t.y],
    u = h[0],
    c = h[1];

  if (n + 6 < module1127.RectConfig.minLength) {
    u -= (module1127.RectConfig.minLength - n) / 2;
    n = module1127.RectConfig.minLength;
  } else {
    u -= 3;
    n += 6;
  }

  if (o + 6 < module1127.RectConfig.minLength) {
    c -= (module1127.RectConfig.minLength - o) / 2;
    o = module1127.RectConfig.minLength;
  } else {
    c -= 3;
    o += 6;
  }

  return {
    x: u,
    y: c,
    width: n,
    height: o,
    realX: t.x,
    realY: t.y,
    realW: t.width,
    realH: t.height,
  };
}

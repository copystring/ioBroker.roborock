exports.parseSync = function (t, o) {
  if (!t || !t.length) return;
  var n = {};

  try {
    for (var f = 0; f < t.length; f += j(n, t, f));
  } catch (o) {
    console.log('TTTT parse - ' + o + ' data - ' + JSON.stringify(t));
  }

  if (undefined !== n.carpetMap) n.carpetMap = S(n.map, n.carpetMap);
  if (undefined !== n.floorMap) n.floorMap = T(n.map, n.floorMap);
  n.map = k(n.map, o);
  return n;
};

exports.parse = function (t, o) {
  if (!t || !t.length || !o) return;
  var n = {};

  try {
    for (var f = 0; f < t.length; f += j(n, t, f));
  } catch (o) {
    console.log('TTTT parse - ' + o + ' data - ' + JSON.stringify(t));
  }

  o(n);
};

exports.getSequence = function (t) {
  var o = 0,
    f = w(t, o, z.type),
    h = o + z.type,
    s = {
      header: w(t, h, z.header),
      payload: w(t, h + z.header, z.payload),
    };
  h += z.header + z.payload;
  o += s.header;

  for (var l, p = {}, y = u(M[f].header); !(l = y()).done; ) {
    var v = l.value,
      c = module22.default(v, 2),
      b = c[0],
      A = c[1];
    if (h >= o) break;
    p[b] = w(t, h, A);
    h += A;
  }

  return p;
};

exports.convertMap = k;
exports.convertCarpetMap = S;
exports.convertFloorMap = T;
exports.convertFloorDataToImage = P;

var module49 = require('./49'),
  module22 = require('./22'),
  module21 = require('./21'),
  module1270 = require('./1270'),
  module1275 = require('./1275');

function l(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var f = Object.getOwnPropertySymbols(t);
    if (o)
      f = f.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, f);
  }

  return n;
}

function p(t) {
  for (var n = 1; n < arguments.length; n++) {
    var f = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      l(Object(f), true).forEach(function (n) {
        module49.default(t, n, f[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(f));
    else
      l(Object(f)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(f, o));
      });
  }

  return t;
}

function u(t, o) {
  var n = ('undefined' != typeof Symbol && t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) || t['@@iterator'];
  if (n) return (n = n.call(t)).next.bind(n);

  if (Array.isArray(t) || (n = y(t)) || (o && t && 'number' == typeof t.length)) {
    if (n) t = n;
    var f = 0;
    return function () {
      return f >= t.length
        ? {
            done: true,
          }
        : {
            done: false,
            value: t[f++],
          };
    };
  }

  throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
}

function y(t, o) {
  if (t) {
    if ('string' == typeof t) return v(t, o);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === n && t.constructor) n = t.constructor.name;
    return 'Map' === n || 'Set' === n ? Array.from(t) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? v(t, o) : undefined;
  }
}

function v(t, o) {
  if (null == o || o > t.length) o = t.length;

  for (var n = 0, f = new Array(o); n < o; n++) f[n] = t[n];

  return f;
}

var module394 = require('./394'),
  w = module394.BytesToInt,
  b = module394.fill,
  A = module394.BytesToASCII,
  module1342 = require('./1342').getIndexPngBase64,
  z = {
    type: 2,
    header: 2,
    payload: 4,
  },
  x = 32,
  M = {
    29298: {
      header: [
        ['major', 2],
        ['minor', 2],
        ['index', 4],
        ['sequence', 4],
      ],
    },
    1: {
      type: 'charger',
      header: [],
      payload: function (t, o) {
        var n = {
          x: w(o.data, o.offset, 4) / 50,
          y: w(o.data, o.offset + 4, 4) / 50,
          angle: w(o.data, o.offset + 8, 4),
        };
        if (undefined !== n.x && undefined !== n.y) module21.default(t, n);
      },
    },
    2: {
      type: 'map',
      header: [
        ['blockNum', 4],
        ['top', 4],
        ['left', 4],
        ['height', 4],
        ['width', 4],
      ],
      payload: function (t, o) {
        return module21.default(t, o);
      },
    },
    3: {
      type: 'path',
      header: [
        ['num', 4],
        ['size', 4],
        ['angle', 4],
      ],
      payload: function (t, o) {
        t.points = new Array(o.length / t.size);

        for (var n = 0; n < t.points.length; ++n) {
          var f = o.offset + n * t.size;
          t.points[n] = {
            x: w(o.data, f, 2) / 50,
            y: w(o.data, f + 2, 2) / 50,
          };
        }
      },
    },
    4: {
      type: 'pathGoto',
      header: [
        ['num', 4],
        ['size', 4],
        ['angle', 4],
      ],
      payload: function (t, o) {
        t.points = new Array(o.length / t.size);

        for (var n = 0; n < t.points.length; ++n) {
          var f = o.offset + n * t.size;
          t.points[n] = {
            x: w(o.data, f, 2) / 50,
            y: w(o.data, f + 2, 2) / 50,
          };
        }
      },
    },
    5: {
      type: 'pathGotoPlan',
      header: [
        ['num', 4],
        ['size', 4],
        ['angle', 4],
      ],
      payload: function (t, o) {
        t.points = new Array(o.length / t.size);

        for (var n = 0; n < t.points.length; ++n) {
          var f = o.offset + n * t.size;
          t.points[n] = {
            x: w(o.data, f, 2) / 50,
            y: w(o.data, f + 2, 2) / 50,
          };
        }
      },
    },
    6: {
      type: 'zones',
      header: [['num', 4]],
      payload: function (t, o) {
        t.zones = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 8 * n;
          t.zones[n] = [w(o.data, f, 2) / 50, w(o.data, f + 2, 2) / 50, w(o.data, f + 4, 2) / 50, w(o.data, f + 6, 2) / 50];
        }
      },
    },
    7: {
      type: 'target',
      header: [],
      payload: function (t, o) {
        var n = {
          x: w(o.data, o.offset, 2) / 50,
          y: w(o.data, o.offset + 2, 2) / 50,
        };
        if (n.x || n.y) module21.default(t, n);
      },
    },
    8: {
      type: 'robot',
      header: [],
      payload: function (t, o) {
        var n = {
          x: w(o.data, o.offset, 4) / 50,
          y: w(o.data, o.offset + 4, 4) / 50,
          angle: w(o.data, o.offset + 8, 4),
        };
        if (undefined !== n.x && undefined !== n.y && undefined !== n.angle) module21.default(t, n);
      },
    },
    9: {
      type: 'fbzs',
      header: [['num', 4]],
      payload: function (t, o) {
        t.fbzs = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 16 * n;
          t.fbzs[n] = [
            w(o.data, f, 2) / 50,
            w(o.data, f + 2, 2) / 50,
            w(o.data, f + 4, 2) / 50,
            w(o.data, f + 6, 2) / 50,
            w(o.data, f + 8, 2) / 50,
            w(o.data, f + 10, 2) / 50,
            w(o.data, f + 12, 2) / 50,
            w(o.data, f + 14, 2) / 50,
          ];
        }
      },
    },
    10: {
      type: 'walls',
      header: [['num', 4]],
      payload: function (t, o) {
        t.walls = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 8 * n;
          t.walls[n] = [w(o.data, f, 2) / 50, w(o.data, f + 2, 2) / 50, w(o.data, f + 4, 2) / 50, w(o.data, f + 6, 2) / 50];
        }
      },
    },
    1024: {
      type: 'digest',
      header: [],
    },
    11: {
      type: 'blocks',
      header: [['num', 4]],
      payload: function (t, o) {
        t.blocks = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + n;
          t.blocks[n] = w(o.data, f, 1);
        }
      },
    },
    12: {
      type: 'mfbzs',
      header: [['num', 4]],
      payload: function (t, o) {
        t.fbzs = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 16 * n;
          t.fbzs[n] = [
            w(o.data, f, 2) / 50,
            w(o.data, f + 2, 2) / 50,
            w(o.data, f + 4, 2) / 50,
            w(o.data, f + 6, 2) / 50,
            w(o.data, f + 8, 2) / 50,
            w(o.data, f + 10, 2) / 50,
            w(o.data, f + 12, 2) / 50,
            w(o.data, f + 14, 2) / 50,
          ];
        }
      },
    },
    13: {
      type: 'obstaclesOld',
      header: [['num', 4]],
      payload: function (t, o) {
        t.obstacles = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 5 * n;
          t.obstacles[n] = [w(o.data, f, 2), w(o.data, f + 2, 2), w(o.data, f + 4, 1)];
        }
      },
    },
    14: {
      type: 'ignoredObstaclesOld',
      header: [['num', 4]],
      payload: function (t, o) {
        t.obstacles = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 5 * n;
          t.obstacles[n] = [w(o.data, f, 2), w(o.data, f + 2, 2), w(o.data, f + 4, 1)];
        }
      },
    },
    15: {
      type: 'obstacles',
      header: [['num', 4]],
      payload: function (t, o) {
        if (
          ((t.obstacles = new Array(t.num)),
          0 == w(o.data, o.offset + 12, 4) && !(0 == w(o.data, o.offset + 16, 4) && 0 == w(o.data, o.offset + 20, 4) && 0 == w(o.data, o.offset + 24, 4)))
        )
          for (var n = 0; n < t.num; ++n) {
            var f = o.offset + 16 * n;
            t.obstacles[n] = [w(o.data, f, 2), w(o.data, f + 2, 2), w(o.data, f + 4, 2), w(o.data, f + 6, 2), w(o.data, f + 8, 4), w(o.data, f + 12, 4)];
          }
        else
          for (var h = 0; h < t.num; ++h) {
            var s = o.offset + 28 * h;
            t.obstacles[h] = [
              w(o.data, s, 2),
              w(o.data, s + 2, 2),
              w(o.data, s + 4, 2),
              w(o.data, s + 6, 2),
              w(o.data, s + 8, 4),
              0 == w(o.data, s + 12, 1) ? '' : A(o.data, s + 12, 16),
            ];
          }
      },
    },
    16: {
      type: 'ignoredObstacles',
      header: [['num', 4]],
      payload: function (t, o) {
        t.obstacles = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 6 * n;
          t.obstacles[n] = [w(o.data, f, 2), w(o.data, f + 2, 2), w(o.data, f + 4, 2)];
        }
      },
    },
    17: {
      type: 'carpetMap',
      header: [],
      payload: function (t, o) {
        t.data = new Array(o.length);

        for (var n = 0; n < o.length; ++n) {
          var f = o.offset + n;
          t.data[n] = w(o.data, f, 1);
        }
      },
    },
    18: {
      type: 'mopPath',
      header: [],
      payload: function (t, o) {
        t.data = new Array(o.length);

        for (var n = 0; n < o.length; ++n) {
          var f = o.offset + n;
          t.data[n] = w(o.data, f, 1);
        }
      },
    },
    19: {
      type: 'cfbzs',
      header: [['num', 4]],
      payload: function (t, o) {
        t.fbzs = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 16 * n;
          t.fbzs[n] = [
            w(o.data, f, 2) / 50,
            w(o.data, f + 2, 2) / 50,
            w(o.data, f + 4, 2) / 50,
            w(o.data, f + 6, 2) / 50,
            w(o.data, f + 8, 2) / 50,
            w(o.data, f + 10, 2) / 50,
            w(o.data, f + 12, 2) / 50,
            w(o.data, f + 14, 2) / 50,
          ];
        }
      },
    },
    20: {
      type: 'pathType',
      header: [],
      payload: function (t, o) {
        t.data = w(o.data, o.offset, 1);
      },
    },
    21: {
      type: 'smartZones',
      header: [['num', 4]],
      payload: function (t, o) {
        t.smartZones = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 18 * n;
          t.smartZones[n] = {
            zid: w(o.data, f, 2),
            range: [w(o.data, f + 2, 2) / 50, w(o.data, f + 4, 2) / 50, w(o.data, f + 6, 2) / 50, w(o.data, f + 8, 2) / 50],
          };
        }
      },
    },
    22: {
      type: 'customCarpet',
      header: [['num', 4]],
      payload: function (t, o) {
        t.fbzs = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 16 * n;
          t.fbzs[n] = [
            w(o.data, f, 2) / 50,
            w(o.data, f + 2, 2) / 50,
            w(o.data, f + 4, 2) / 50,
            w(o.data, f + 6, 2) / 50,
            w(o.data, f + 8, 2) / 50,
            w(o.data, f + 10, 2) / 50,
            w(o.data, f + 12, 2) / 50,
            w(o.data, f + 14, 2) / 50,
          ];
        }
      },
    },
    23: {
      type: 'clfbzs',
      header: [['num', 4]],
      payload: function (t, o) {
        t.fbzs = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 16 * n;
          t.fbzs[n] = [
            w(o.data, f, 2) / 50,
            w(o.data, f + 2, 2) / 50,
            w(o.data, f + 4, 2) / 50,
            w(o.data, f + 6, 2) / 50,
            w(o.data, f + 8, 2) / 50,
            w(o.data, f + 10, 2) / 50,
            w(o.data, f + 12, 2) / 50,
            w(o.data, f + 14, 2) / 50,
          ];
        }
      },
    },
    24: {
      type: 'floorMap',
      header: [],
      payload: function (t, o) {
        t.data = new Array(o.length);

        for (var n = 0; n < o.length; ++n) {
          var f = o.offset + n;
          t.data[n] = w(o.data, f, 1);
        }
      },
    },
    25: {
      type: 'furnitures',
      header: [['num', 4]],
      payload: function (t, o) {
        t.data = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 23 * n;
          t.data[n] = [
            w(o.data, f, 2) / 50,
            w(o.data, f + 2, 2) / 50,
            w(o.data, f + 4, 2) / 50,
            w(o.data, f + 6, 2) / 50,
            w(o.data, f + 8, 2) / 50,
            w(o.data, f + 10, 2) / 50,
            w(o.data, f + 12, 2) / 50,
            w(o.data, f + 14, 2) / 50,
            w(o.data, f + 16, 2),
            w(o.data, f + 18, 1),
            w(o.data, f + 19, 1),
            w(o.data, f + 20, 1),
            w(o.data, f + 21, 1),
            w(o.data, f + 22, 1),
          ];
        }
      },
    },
  };

function j(t, o, f) {
  var h = w(o, f, z.type),
    s = f + z.type,
    l = {
      header: w(o, s, z.header),
      payload: w(o, s + z.header, z.payload),
    };
  s += z.header + z.payload;
  f += l.header;
  var p = M[h];
  if (!p) return l.header + l.payload;
  if (!p.payload) return l.header + ((p.type && l.payload) || 0);
  var y = {};

  try {
    for (var v, c = u(p.header); !(v = c()).done; ) {
      var b = v.value,
        A = module22.default(b, 2),
        O = A[0],
        x = A[1];
      if (s >= f) break;
      y[O] = w(o, s, x);
      s += x;
    }
  } catch (t) {
    console.log('AAAA - ' + t + '  header - ' + p.header + ' type - ' + h);
  }

  p.payload(y, {
    data: o,
    offset: f,
    length: l.payload,
  });
  if (Object.keys(y).length) t[p.type] = y;
  return l.header + l.payload;
}

function k(t, o) {
  if (!(t && t.width && t.height && t.data && t.data.length))
    return !t.width || !t.height || (t.data && t.data.length)
      ? {
          image: '',
          width: 100,
          height: 100,
          left: 462,
          top: 462,
          isEmpty: true,
        }
      : {
          isEmpty: true,
        };
  var n = 0,
    f = I(t);

  if (f && undefined !== f.top) {
    var l = function (t) {
        return t;
      },
      u = {
        obstacles: 3,
        space: 4,
      };

    if (o)
      u = {
        obstacles: 24,
        space: 25,
      };

    for (var y = [], v = 0; v < x; v++) y.push(0);

    var c = new Array((f.width + 1) * f.height);
    b(c, 0);
    var w = new Object(),
      A = new Object(),
      z = c.concat(),
      M = c.concat(),
      j = c.concat(),
      k = new Array(x);
    b(k, 0);
    var S = new Array(x);
    b(S, 0);

    for (var T = [], P = 0; P < x; P++) {
      var D = {
        x: 0,
        y: 0,
        count: 0,
        minX: f.width,
        maxX: 0,
      };
      T.push(D);
    }

    var C = new Array(1024);
    b(C, 0);

    for (var E = [], B = 0; B < f.height; ++B)
      for (var X = t.offset + (B + f.top) * t.width, N = 0; N < f.width; ++N) {
        var _ = t.data[X + N + f.left];

        if (0 != (7 & _)) {
          var L = _ >>> 3;

          if ((E.push(L), 0 != L)) {
            if (((C[x * L + L] = 1), 0 != B)) {
              var Z = E[(B - 1) * f.width + N];

              if (Z != L) {
                var q = x * L + Z;
                C[x * Z + L] = 1;
                C[q] = 1;
              }
            }

            if (0 != N) {
              var F = E[B * f.width + N - 1];

              if (F != L) {
                var G = x * L + F;
                C[x * F + L] = 1;
                C[G] = 1;
              }
            }

            k[L]++;
          }
        } else E.push(0);
      }

    var H = new Array(),
      J = new Array(),
      U = module1270.colorIndexMap,
      $ = module1270.colorHighLightIndexMap;

    if (o) {
      U = module1275.colorIndexMapDark;
      $ = module1275.colorHighLightIndexMapDark;
    }

    H.push(l(U[0]));
    J.push(l($[0]));
    S[0] = 0;

    for (var K = 0, Q = 0, R = 0; R < x; R++) k[R] > Q && ((Q = k[R]), (K = R));

    S[K] = 1;
    var V = l(U[1]),
      W = l(U[0]),
      Y = [[], [], [], []];
    Y[0].push([K]);

    for (var aa = 1; aa < x; aa++)
      if (aa != K)
        if (0 != C[aa * x + aa]) {
          for (var ta = [0, 0, 0, 0, 0], ea = 1; ea < x; ea++) 0 != C[ea * x + aa] && 0 != S[ea] && (ta[S[ea]] = 1);

          for (var ra = 1; ra < ta.length; ra++)
            if (0 == ta[ra]) {
              var oa = ra;
              C[aa * x + aa] = oa;
              S[aa] = ra;
              Y[ra - 1].push(aa);
              break;
            }
        } else S[aa] = 0;

    for (var na = 0; na < Y.length; na++)
      if (0 == Y[na].length) {
        var da = Math.floor((na + 1) / 2) - 1;
        if (Y[da].length <= 1) continue;

        for (var fa = 0, ia = Y[da].length - 1; ia >= Y[da].length / 2; ia--) {
          Y[na].push(Y[da][ia]);
          fa++;
        }

        for (var ha = 0; ha < fa; ha++) Y[da].pop();
      }

    for (var sa = 0, la = 0, pa = -1, ua = 0; ua < Y.length; ua++) {
      if (Y[ua].length > sa) {
        sa = Y[ua].length;
        la = ua;
      }

      if (0 == Y[ua].length) pa = ua;
    }

    if (Y[la].length >= 2 && -1 != pa)
      for (; Y[la].length > Y[pa].length; ) {
        Y[pa].push(Y[la][Y[la].length - 1]);
        Y[la].pop();
      }

    for (var ya = 0; ya < Y.length; ya++)
      for (var va = 0; va < Y[ya].length; va++) {
        S[Y[ya][va]] = ya + 1;
      }

    for (var ca = 1; ca < S.length; ca++)
      if (0 != S[ca]) {
        var ga = S[ca];
        H.push(l(U[ga]));
        J.push(l($[ga]));
      } else {
        H.push(0);
        J.push(0);
      }

    for (var ma = f.height - 1; ma >= 0; --ma)
      for (var wa = t.offset + (ma + f.top) * t.width, ba = (f.height - 1 - ma) * (f.width + 1) + 1, Aa = 0; Aa < f.width; ++Aa) {
        var Oa = t.data[wa + Aa + f.left];

        if (0 != (7 & Oa)) {
          n++;
          var za = Oa >>> 3;
          y[za]++;
          var xa = za,
            Ma = 1 == (7 & Oa) ? u.obstacles : H[xa],
            ja = 1 == (7 & Oa) ? u.obstacles : V,
            ka = za + '',
            Ia = 1 == (7 & Oa) ? u.obstacles : J[xa],
            Sa = 1 == (7 & Oa) ? u.obstacles : W;

          if ((undefined === w[ka] && (w[ka] = z.concat()), za >= 0 && za < x)) {
            if (1 != (7 & Oa)) {
              T[za].x = T[za].x + Aa;
              T[za].y = T[za].y + ma;
              T[za].count = T[za].count + 1;
              if (T[za].minX > Aa) T[za].minX = Aa;
              if (T[za].maxX < Aa) T[za].maxX = Aa;
            }

            for (var Ta = ba + Aa, Pa = 0; Pa < 1; ++Pa) {
              w[ka][Ta + Pa] = Ia;
              c[Ta + Pa] = Ma;
              M[Ta + Pa] = ja;
              j[Ta + Pa] = Sa;
            }
          }
        }
      }

    for (var Da in ((f.mapArea = Math.round((25 * n) / 1e4)), (f.left += t.left - 0.5), (f.top += t.top - 0.5), w))
      A[Da] = 'data:image/png;base64,' + module1342(f.width, f.height, w[Da]);

    delete t.data;
    return p(
      p(
        {
          image: 'data:image/png;base64,' + module1342(f.width, f.height, c),
          imageNoBlock: 'data:image/png;base64,' + module1342(f.width, f.height, M),
          imageBlockCleanBackground: 'data:image/png;base64,' + module1342(f.width, f.height, j),
        },
        f
      ),
      {},
      {
        mapList: A,
        data: t,
        centerInfo: T,
        neighbourInfo: C,
        colorData: S,
        isEmpty: false,
      }
    );
  }
}

function I(t) {
  for (var o = t.width * t.height, n = {}, f = 0; f < o; ++f) {
    if (0 != (7 & t.data[t.offset + f])) {
      n.top = Math.floor(f / t.width);
      break;
    }
  }

  if (undefined !== n.top) {
    for (var h = o; h > n.top * t.width; --h) {
      if (0 != (7 & t.data[t.offset + h - 1])) {
        n.height = Math.floor((h - 1) / t.width) - n.top + 1;
        break;
      }
    }

    for (var s = n.top * t.width, l = s + n.height * t.width, p = 0; p < t.width && undefined === n.left; ++p)
      for (var u = s + p; u < l; u += t.width) {
        if (0 != (7 & t.data[t.offset + u])) {
          n.left = p;
          break;
        }
      }

    for (var y = t.width; y > n.left && undefined === n.width; --y)
      for (var v = s + y - 1; v < l; v += t.width) {
        if (0 != (7 & t.data[t.offset + v])) {
          n.width = y - n.left;
          break;
        }
      }

    return n;
  }
}

function S(t, o) {
  if (!o)
    return {
      image: '',
      capCount: -1,
    };
  var n = t.width * t.height;
  if (!o.data || !o.data.length || o.data.length != n)
    return {
      image: '',
      capCount: -1,
    };
  var f = I(t);

  if (f && undefined !== f.top) {
    var h = 23,
      s = new Array(3 * (3 * f.width + 1) * f.height);
    b(s, 0);
    var l = new Array(f.width * f.height);
    b(l, 0);

    for (var p = -1, u = 0, y = f.height - 1; y >= 0; --y)
      for (var v = (y + f.top) * t.width, c = 0; c < f.width; ++c) {
        if (0 != (1 & o.data[v + c + f.left])) {
          u++;
          var w = (3 * f.height - 3 - 3 * y) * (3 * f.width + 1) + 1 + 3 * c,
            A = [w, w + 1, w + 2, w + 3 * f.width + 1, w + 3 * f.width + 2, w + 3 * f.width + 3, w + 6 * f.width + 2, w + 6 * f.width + 3, w + 6 * f.width + 4];
          s[A[2]] = h;
          s[A[4]] = h;
          s[A[6]] = h;
          var z = (f.height - 1 - y) * f.width + c;
          l[z] = 1;
          p = z;
        }
      }

    return {
      image: 'data:image/png;base64,' + module1342(3 * f.width, 3 * f.height, s),
      capData: l,
      firstIndex: p,
      capCount: u,
    };
  }
}

function T(t, o) {
  if (!o || !o.data || o.data.length <= 0)
    return {
      isEmpty: true,
    };
  var n = I(t);
  if (!n || undefined === n.top)
    return {
      isEmpty: true,
    };
  var f = P(o.data, n, t);
  return {
    data: o.data,
    image: f,
  };
}

function P(t, o, n) {
  var f = 26,
    h = new Array(3 * (3 * o.width + 1) * o.height);
  b(h, 0);

  for (var s = o.height - 1; s >= 0; --s)
    for (var l = n.offset + (s + o.top) * n.width, p = 0; p < o.width; ++p) {
      var u = n.data[l + p + o.left];

      if (0 != (7 & u) && 1 != (7 & u)) {
        var y = o.height - 1 - s,
          v = 3 * y * (3 * o.width + 1) + 1 + 3 * p,
          c = u >>> 3;

        if (4 == t[c]) {
          if (y % 8 == 0) {
            h[v + 3 * o.width + 1] = f;
            h[v + 3 * o.width + 2] = f;
            h[v + 3 * o.width + 3] = f;
          }

          if (p % 8 == 0) {
            h[v + 1] = f;
            h[v + 3 * o.width + 2] = f;
            h[v + 6 * o.width + 3] = f;
          }
        } else if (3 == t[c]) {
          var w = Math.floor(y / 5) % 2 == 0;

          if (y % 5 == 0) {
            h[v + 3 * o.width + 1] = f;
            h[v + 3 * o.width + 2] = f;
            h[v + 3 * o.width + 3] = f;
            if ((w && p % 24 == 0) || (!w && (p + 12) % 24 == 0)) h[v + 1] = f;
            else if ((!w && p % 24 == 0) || (w && (p + 12) % 24 == 0)) h[v + 6 * o.width + 3] = f;
          } else if ((w && (p + 12) % 24 == 0) || (!w && p % 24 == 0)) {
            h[v + 1] = f;
            h[v + 3 * o.width + 2] = f;
            h[v + 6 * o.width + 3] = f;
          }
        }
      }
    }

  return 'data:image/png;base64,' + module1342(3 * o.width, 3 * o.height, h);
}

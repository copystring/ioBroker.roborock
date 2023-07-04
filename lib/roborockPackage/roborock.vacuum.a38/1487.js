exports.parseSync = function (t, o) {
  var n = arguments.length > 2 && undefined !== arguments[2] && arguments[2];
  if (!t || !t.length) return;
  var f = {};

  try {
    for (var h = 0; h < t.length; h += D(f, t, h));
  } catch (o) {
    console.log('TTTT parse - ' + o + ' data - ' + JSON.stringify(t));
  }

  if (undefined !== f.carpetMap) f.carpetMap = S(f.map, f.carpetMap);
  if (undefined !== f.floorMap) f.floorMap = T(f.map, f.floorMap);
  if (undefined !== f.furnitures) f.furnitures = P(f.furnitures);
  f.map = j(f, o, n);
  return f;
};

exports.parseSyncSax = function (t, o) {
  var n = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2];
  if (!t || !t.length) return;
  var f = {};

  try {
    for (var h = 0; h < t.length; h += D(f, t, h));
  } catch (o) {
    console.log('TTTT parse - ' + o + ' data - ' + JSON.stringify(t));
  }

  f.map = C(f.map, o, n);
  return f;
};

exports.convertFloorDataToImage = E;

var module50 = require('./50'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module22 = require('./22'),
  module1431 = require('./1431');

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
  for (var o = 1; o < arguments.length; o++) {
    var f = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      l(Object(f), true).forEach(function (o) {
        module50.default(t, o, f[o]);
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
  var n;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
    if (Array.isArray(t) || (n = v(t)) || (o && t && 'number' == typeof t.length)) {
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

  return (n = t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']()).next.bind(n);
}

function v(t, o) {
  if (t) {
    if ('string' == typeof t) return c(t, o);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === n && t.constructor) n = t.constructor.name;
    return 'Map' === n || 'Set' === n ? Array.from(t) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? c(t, o) : undefined;
  }
}

function c(t, o) {
  if (null == o || o > t.length) o = t.length;

  for (var n = 0, f = new Array(o); n < o; n++) f[n] = t[n];

  return f;
}

var module398 = require('./398'),
  w = module398.BytesToInt,
  b = module398.fill,
  A = module398.BytesToASCII,
  module1488 = require('./1488').getIndexPngBase64,
  module1490 = require('./1490').getCleanUpedWalls,
  O = {
    type: 2,
    header: 2,
    payload: 4,
  },
  x = 32,
  z = {
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
        if (undefined !== n.x && undefined !== n.y) module22.default(t, n);
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
        return module22.default(t, o);
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
        if (n.x || n.y) module22.default(t, n);
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
        if (undefined !== n.x && undefined !== n.y && undefined !== n.angle) module22.default(t, n);
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
    26: {
      type: 'dockType',
      header: [],
      payload: function (t, o) {
        t.data = w(o.data, o.offset, o.length);
      },
    },
    27: {
      type: 'enemies',
      header: [['num', 4]],
      payload: function (t, o) {
        t.data = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 6 * n;
          t.data[n] = [w(o.data, f, 2) / 50, w(o.data, f + 2, 2) / 50, w(o.data, f + 4, 2)];
        }
      },
    },
  };

function D(t, o, n) {
  var h = w(o, n, O.type),
    s = n + O.type,
    l = {
      header: w(o, s, O.header),
      payload: w(o, s + O.header, O.payload),
    };
  s += O.header + O.payload;
  n += l.header;
  var p = z[h];
  if (!p) return l.header + l.payload;
  if (!p.payload) return l.header + ((p.type && l.payload) || 0);
  var v = {};

  try {
    for (var c, y = u(p.header); !(c = y()).done; ) {
      var b = c.value,
        A = module23.default(b, 2),
        M = A[0],
        k = A[1];
      if (s >= n) break;
      v[M] = w(o, s, k);
      s += k;
    }
  } catch (t) {
    console.log('AAAA - ' + t + '  header - ' + p.header + ' type - ' + h);
  }

  p.payload(v, {
    data: o,
    offset: n,
    length: l.payload,
  });
  if (Object.keys(v).length) t[p.type] = v;
  return l.header + l.payload;
}

function j(t, o, n) {
  var f = t.map;
  if (!(f && f.width && f.height && f.data && f.data.length))
    return !f.width || !f.height || (f.data && f.data.length)
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
  var h = 0,
    l = I(f);
  if (!l || undefined === l.top)
    return {
      isEmpty: true,
    };

  var u = function (t) {
      return t;
    },
    v = {
      obstacles: 3,
      space: 4,
      space3D: 27,
      space3DDark: 28,
    };

  if (o)
    v = {
      obstacles: 24,
      space: 25,
      space3D: 27,
      space3DDark: 28,
    };

  for (var c = [], y = 0; y < x; y++) c.push(0);

  var w = new Array((l.width + 1) * l.height);
  b(w, 0);
  var A = new Object(),
    O = new Object(),
    z = w.concat(),
    D = w.concat(),
    j = w.concat(),
    S = w.concat(),
    T = w.concat(),
    E = new Array(x);
  b(E, 0);
  var P = new Array(x);
  b(P, 0);

  for (var C = [], B = 0; B < x; B++) {
    var X = {
      x: 0,
      y: 0,
      count: 0,
      minX: l.width,
      maxX: 0,
    };
    C.push(X);
  }

  var N = new Array(1024);
  b(N, 0);

  for (var _ = [], L = 0; L < l.height; ++L)
    for (var Z = f.offset + (L + l.top) * f.width, G = 0; G < l.width; ++G) {
      var H = f.data[Z + G + l.left];

      if (0 != (7 & H)) {
        var J = H >>> 3;

        if ((_.push(J), 0 != J)) {
          if (((N[x * J + J] = 1), 0 != L)) {
            var U = _[(L - 1) * l.width + G];

            if (U != J) {
              var W = x * J + U;
              N[x * U + J] = 1;
              N[W] = 1;
            }
          }

          if (0 != G) {
            var q = _[L * l.width + G - 1];

            if (q != J) {
              var F = x * J + q;
              N[x * q + J] = 1;
              N[F] = 1;
            }
          }

          E[J]++;
        }
      } else _.push(0);
    }

  for (var $ = [], K = 1; K < x; K++) {
    for (var Q = 0, R = 1; R < x; R++) K != R && 1 == N[K * x + R] && Q++;

    $.push([K, Q]);
  }

  $.sort(function (t, o) {
    return o[1] - t[1];
  });
  var V = new Array(),
    Y = new Array(),
    aa = n ? module1431.colorEggIndexMap : module1431.colorIndexMap,
    ta = module1431.colorHighLightIndexMap;

  if (o) {
    aa = n ? module1431.colorEggIndexMapDark : module1431.colorIndexMapDark;
    ta = module1431.colorHighLightIndexMapDark;
  }

  V.push(u(aa[0]));
  Y.push(u(ta[0]));
  P[0] = 0;

  for (var ea = 0, ra = 0, oa = 0; oa < x; oa++) E[oa] > ra && ((ra = E[oa]), (ea = oa));

  P[ea] = 1;
  var na = u(aa[1]),
    da = u(aa[0]),
    ia = [[], [], [], []];
  ia[0].push([ea]);

  for (var fa = 0; fa < $.length; fa++) {
    var ha = $[fa][0];
    if (ha != ea)
      if (0 != N[ha * x + ha]) {
        for (var sa = [0, 0, 0, 0, 0], la = 0; la < $.length; la++) {
          var pa = $[la][0];
          if (0 != N[pa * x + ha] && 0 != P[pa]) sa[P[pa]] = 1;
        }

        for (var ua = 1; ua < sa.length; ua++)
          if (0 == sa[ua]) {
            var va = ua;
            N[ha * x + ha] = va;
            P[ha] = ua;
            ia[ua - 1].push(ha);
            break;
          }
      } else P[ha] = 0;
  }

  for (var ca = 0; ca < ia.length; ca++)
    if (0 == ia[ca].length) {
      var ga = Math.floor((ca + 1) / 2) - 1;
      if (ia[ga].length <= 1) continue;

      for (var ya = 0, wa = ia[ga].length - 1; wa >= ia[ga].length / 2; wa--) {
        ia[ca].push(ia[ga][wa]);
        ya++;
      }

      for (var ma = 0; ma < ya; ma++) ia[ga].pop();
    }

  for (var ba = 0, Aa = 0, Ma = -1, ka = 0; ka < ia.length; ka++) {
    if (ia[ka].length > ba) {
      ba = ia[ka].length;
      Aa = ka;
    }

    if (0 == ia[ka].length) Ma = ka;
  }

  if (ia[Aa].length >= 2 && -1 != Ma)
    for (; ia[Aa].length > ia[Ma].length; ) {
      ia[Ma].push(ia[Aa][ia[Aa].length - 1]);
      ia[Aa].pop();
    }

  for (var Oa = 0; Oa < ia.length; Oa++)
    for (var xa = 0; xa < ia[Oa].length; xa++) {
      P[ia[Oa][xa]] = Oa + 1;
    }

  for (var za = 1; za < P.length; za++)
    if (0 != P[za]) {
      var Da = P[za];
      V.push(u(aa[Da]));
      Y.push(u(ta[Da]));
    } else {
      V.push(0);
      Y.push(0);
    }

  for (var ja = l.height - 1; ja >= 0; --ja)
    for (var Ia = f.offset + (ja + l.top) * f.width, Sa = (l.height - 1 - ja) * (l.width + 1) + 1, Ta = 0; Ta < l.width; ++Ta) {
      var Ea = f.data[Ia + Ta + l.left];

      if (0 != (7 & Ea)) {
        h++;
        var Pa = Ea >>> 3;
        c[Pa]++;

        var Ca = Pa,
          Ba = 1 == (7 & Ea) ? v.obstacles : V[Ca],
          Xa = 1 == (7 & Ea) ? v.obstacles : na,
          Na = Pa + '',
          _a = 1 == (7 & Ea) ? v.obstacles : Y[Ca],
          La = 1 == (7 & Ea) ? v.obstacles : da,
          Za = v.space3D,
          Ga = v.space3DDark;

        if ((undefined === A[Na] && (A[Na] = z.concat()), Pa >= 0 && Pa < x)) {
          if (1 != (7 & Ea)) {
            C[Pa].x = C[Pa].x + Ta;
            C[Pa].y = C[Pa].y + ja;
            C[Pa].count = C[Pa].count + 1;
            if (C[Pa].minX > Ta) C[Pa].minX = Ta;
            if (C[Pa].maxX < Ta) C[Pa].maxX = Ta;
          }

          for (var Ha = Sa + Ta, Ja = 0; Ja < 1; ++Ja) {
            A[Na][Ha + Ja] = _a;
            w[Ha + Ja] = Ba;
            D[Ha + Ja] = Xa;
            j[Ha + Ja] = La;
            S[Ha + Ja] = Za;
            T[Ha + Ja] = Ga;
          }
        }
      }
    }

  for (var Ua in ((l.mapArea = Math.round((25 * h) / 1e4)), (l.left += f.left - 0.5), (l.top += f.top - 0.5), A))
    O[Ua] = 'data:image/png;base64,' + module1488(l.width, l.height, A[Ua]);

  var Wa = module1490(t);
  delete f.data;
  return p(
    p(
      {
        image: 'data:image/png;base64,' + module1488(l.width, l.height, w),
        imageNoBlock: 'data:image/png;base64,' + module1488(l.width, l.height, D),
        imageBlockCleanBackground: 'data:image/png;base64,' + module1488(l.width, l.height, j),
        image3DBackground: 'data:image/png;base64,' + module1488(l.width, l.height, S),
        image3DBackgroundDark: 'data:image/png;base64,' + module1488(l.width, l.height, T),
      },
      l
    ),
    {},
    {
      mapList: O,
      data: f,
      centerInfo: C,
      neighbourInfo: N,
      colorData: P,
      isEmpty: false,
      cleanedWalls: Wa,
    }
  );
}

function I(t) {
  for (var o = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : 7, n = t.width * t.height, f = {}, h = 0; h < n; ++h) {
    if (0 != (t.data[t.offset + h] & o)) {
      f.top = Math.floor(h / t.width);
      break;
    }
  }

  if (undefined === f.top) return null;

  for (var s = n; s > f.top * t.width; --s) {
    if (0 != (t.data[t.offset + s - 1] & o)) {
      f.height = Math.floor((s - 1) / t.width) - f.top + 1;
      break;
    }
  }

  for (var l = f.top * t.width, p = l + f.height * t.width, u = 0; u < t.width && undefined === f.left; ++u)
    for (var v = l + u; v < p; v += t.width) {
      if (0 != (t.data[t.offset + v] & o)) {
        f.left = u;
        break;
      }
    }

  for (var c = t.width; c > f.left && undefined === f.width; --c)
    for (var y = l + c - 1; y < p; y += t.width) {
      if (0 != (t.data[t.offset + y] & o)) {
        f.width = c - f.left;
        break;
      }
    }

  return f;
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
  if (!f || undefined === f.top)
    return {
      image: '',
      capCount: -1,
    };
  var h = 23,
    s = new Array(3 * (3 * f.width + 1) * f.height);
  b(s, 0);
  var l = new Array(f.width * f.height);
  b(l, 0);

  for (var p = -1, u = 0, v = f.height - 1; v >= 0; --v)
    for (var c = (v + f.top) * t.width, y = 0; y < f.width; ++y) {
      if (0 != (1 & o.data[c + y + f.left])) {
        u++;
        var w = (3 * f.height - 3 - 3 * v) * (3 * f.width + 1) + 1 + 3 * y,
          A = [w, w + 1, w + 2, w + 3 * f.width + 1, w + 3 * f.width + 2, w + 3 * f.width + 3, w + 6 * f.width + 2, w + 6 * f.width + 3, w + 6 * f.width + 4];
        s[A[2]] = h;
        s[A[4]] = h;
        s[A[6]] = h;
        var k = (f.height - 1 - v) * f.width + y;
        l[k] = 1;
        p = k;
      }
    }

  return {
    image: 'data:image/png;base64,' + module1488(3 * f.width, 3 * f.height, s),
    capData: l,
    firstIndex: p,
    capCount: u,
  };
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
  var f = E(o.data, n, t);
  return {
    data: o.data,
    image: f,
  };
}

function E(t, o, n) {
  var f = 26,
    h = new Array(3 * (3 * o.width + 1) * o.height);
  b(h, 0);

  for (
    var s = function (t) {
        h[t + 3 * o.width + 1] = f;
        h[t + 3 * o.width + 2] = f;
        h[t + 3 * o.width + 3] = f;
      },
      l = function (t) {
        h[t + 1] = f;
        h[t + 3 * o.width + 2] = f;
        h[t + 6 * o.width + 3] = f;
      },
      p = o.height - 1;
    p >= 0;
    --p
  )
    for (var u = n.offset + (p + o.top) * n.width, v = 0; v < o.width; ++v) {
      var c = n.data[u + v + o.left];

      if (0 != (7 & c)) {
        var y = o.height - 1 - p,
          w = 3 * y * (3 * o.width + 1) + 1 + 3 * v,
          A = c >>> 3;

        if (4 == t[A]) {
          if (y % 16 == 0) s(w);
          if (v % 16 == 0) l(w);
        } else if (3 == t[A]) {
          if (o.width >= o.height) {
            var k = Math.floor(y / 5) % 2 == 0;

            if (y % 5 == 0) {
              s(w);
              if ((k && v % 24 == 0) || (!k && (v + 12) % 24 == 0)) h[w + 1] = f;
              else if ((!k && v % 24 == 0) || (k && (v + 12) % 24 == 0)) h[w + 6 * o.width + 3] = f;
            } else if ((k && (v + 12) % 24 == 0) || (!k && v % 24 == 0)) l(w);
          } else {
            var O = Math.floor(v / 5) % 2 == 0;

            if (v % 5 == 0) {
              l(w);
              if ((O && y % 24 == 0) || (!O && (y + 12) % 24 == 0)) h[w + 3 * o.width + 1] = f;
              else if ((!O && y % 24 == 0) || (O && (y + 12) % 24 == 0)) h[w + 3 * o.width + 3] = f;
            } else if ((O && (y + 12) % 24 == 0) || (!O && y % 24 == 0)) s(w);
          }
        }
      }
    }

  return 'data:image/png;base64,' + module1488(3 * o.width, 3 * o.height, h);
}

function P(t) {
  if (!(t && t.num && t.data && t.data.length)) return t;

  for (var o = [], n = [], f = 0; f < t.data.length; f++) {
    if (46 == t.data[f][9] && 0 == t.data[f][10] && !t.data[f][11]) {
      var h = Math.abs(t.data[f][4] - t.data[f][0]) ** Math.abs(t.data[f][5] - t.data[f][1]);
      t.data[f][10] = h >= 40 ? 3 : h > 20 ? 2 : 1;
    }

    if (45 == t.data[f][9] && 0 == t.data[f][10] && !t.data[f][11]) {
      var s = Math.abs(t.data[f][4] - t.data[f][0]) ** Math.abs(t.data[f][5] - t.data[f][1]);
      t.data[f][10] = s <= 24 ? 1 : 2;
    }

    if (!(47 != t.data[f][9] || t.data[f][11]))
      Math.abs(t.data[f][4] - t.data[f][0]) < 30 && Math.abs(t.data[f][5] - t.data[f][1]) < 30 && ((t.data[f][9] = 48), (t.data[f][10] = 2));
    if (t.data[f][11]) o.push(t.data[f]);
    if (!t.data[f][11]) n.push(t.data[f]);
  }

  t.data = o;
  t.hide = n;
  return t;
}

function C(t, o, n) {
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
  t.width = 101;
  t.height = 101;
  var f = I(t, 1048575);

  if (f && undefined !== f.top) {
    var h = 0,
      s = {
        known: 5,
        space: 3,
      };
    if (o)
      s = {
        known: 9,
        space: 24,
      };
    var l = new Array((6 * f.width + 1) * f.height * 6);
    b(l, 0);
    var u = new Array(2 * t.width * (2 * t.height));
    b(u, 0);

    for (var v = 0; v < f.height; ++v)
      for (var c = (v + f.top) * t.width, y = t.offset + c, w = 0; w < f.width; ++w) {
        var A = t.data[y + w + f.left],
          k = (A >>> 2) & 3,
          O = (A >>> 6) & 3,
          x = 3 & A,
          z = (A >>> 4) & 3;
        if (O) h++;
        if (k) h++;
        if (z) h++;
        if (x) h++;
        var D = 4 * c + 2 * (w + f.left);
        u[D] = B(x);
        u[D + 1] = B(z);
        u[D + 2 * t.width] = B(k);
        u[D + 1 + 2 * t.width] = B(O);
      }

    var j = N(n ? _(u, t, f) : u, t, f);
    if (n) X(j, t, f);

    for (var S = 6 * f.height - 1; S >= 0; --S)
      for (var T = (S + 6 * f.top) * (6 * t.width), E = (6 * f.height - 1 - S) * (6 * f.width + 1) + 1, P = 0; P < 6 * f.width; ++P) {
        var C = j[T + P + 6 * f.left],
          L = 1 == C ? s.known : 0 === C ? 0 : s.space;
        if (0 != C) l[E + P] = L;
      }

    f.mapArea = Math.round((225 * h) / 1e4);
    f.width = f.width;
    f.height = f.height;
    f.left = f.left;
    f.top = f.top;
    delete t.data;
    return p(
      {
        image: 'data:image/png;base64,' + module1488(6 * f.width, 6 * f.height, l),
      },
      f
    );
  }
}

function B(t) {
  var o = 0;
  if (3 == t) o = 1;
  else if (1 == t) o = 2;
  return o;
}

function X(t, o, n) {
  for (var f = 6 * o.width, h = 6 * o.height, s = [1, -1, -f, f, -f - 1, 1 - f, f - 1, f + 1], l = 0; l < 6 * n.height; ++l)
    for (var p = (6 * n.top + l) * o.width * 6, u = 0; u < 6 * n.width; ++u) {
      var v = u + 6 * n.left + p;

      if (2 == t[v]) {
        for (var c = false, y = 0; y < s.length; y++) {
          var w = s[y] + v;

          if (!(w < 0 || w >= f * h) && 1 == t[w]) {
            c = true;
            break;
          }
        }

        if (!c) t[v] = 0;
      }
    }
}

function N(t, o, n) {
  var f = 2 * o.width,
    h = 2 * n.width,
    s = 2 * n.height,
    l = 6 * o.width,
    p = 6 * o.height,
    u = new Array(l * p);
  b(u, 0);

  for (var v = 0; v < s; ++v)
    for (var c = 2 * n.top + v, y = c * f, w = 0; w < h; ++w)
      for (var A = w + 2 * n.left, M = t[A + y], k = 3 * c * (3 * f) + 3 * A, O = 0; O < 3; O++) for (var x = 0; x < 3; x++) u[k + O * f * 3 + x] = M;

  return u;
}

function _(t, n, f) {
  for (var h = module31.default(t), s = 2 * n.width, l = 2 * n.height, p = 0; p < 2 * f.height; ++p)
    for (var u = 2 * f.top + p, v = u * s, c = 0; c < 2 * f.width; ++c) {
      var y = c + 2 * f.left,
        w = y + v;

      if (0 == t[w]) {
        if (0 != y && y != s - 1 && (0 == u || 2 == t[w - s] || 0 == t[w - s])) {
          for (var b = -1, A = 0; A < (l - u) ** 4; ++A)
            if (!((t[w - 1 + A * s] + t[w + 1 + A * s] == 1 && 0 == t[w + A * s]) || (2 != t[w + A * s] && 0 != t[w + A * s]))) {
              b = A;
              break;
            }

          if (b > 0) for (var M = 0; M < b; ++M) h[w + M * s] = 4;
        }

        if (0 != u && u != l - 1 && (0 == y || 2 == t[w - 1] || 0 == t[w - 1])) {
          for (var k = -1, O = 0; O < (s - y) ** 4; ++O)
            if (!((t[w + O + s] + t[w + O - s] == 1 && 0 == t[w + O]) || (2 != t[w + O] && 0 != t[w + O]))) {
              k = O;
              break;
            }

          if (k > 0) for (var x = 0; x < k; ++x) h[w + x] = 4;
        }
      }

      if (2 == t[w] && 0 != u && 0 != y && u != l - 1 && y != s - 1 && 1 == t[w - 1] && 1 == t[w - s] && 1 == t[w + 1] && 1 == t[w + s]) h[w] = 1;
    }

  for (var z = 0; z < 2 * f.height; ++z)
    for (var D = 2 * f.top + z, j = 0; j < 2 * f.width; ++j) {
      var I = j + 2 * f.left,
        S = I + D * s,
        T = S - 1,
        E = S + 1,
        P = S - s,
        C = S + s;

      if (0 == h[S]) {
        if (0 != D && 0 != I) (2 != h[T] && 4 != h[T]) || (4 != h[P] && 2 != h[P]) || (h[T] + h[P] < 8 && (h[S] = 4));
        if (0 != D && I != s - 1) (2 != h[E] && 4 != h[E]) || (2 != h[P] && 4 != h[P]) || (h[E] + h[P] < 8 && (h[S] = 4));
        if (D != l - 1 && 0 != I) (2 != h[T] && 4 != h[T]) || (2 != h[C] && 4 != h[C]) || (h[T] + h[C] < 8 && (h[S] = 4));
        if (D != l - 1 && I != s - 1) (2 != h[E] && 4 != h[E]) || (2 != h[C] && 4 != h[C]) || (h[E] + h[C] < 8 && (h[S] = 4));
      }
    }

  for (var B = 0; B < 2 * f.height; ++B)
    for (var X = (2 * f.top + B) * s, N = 0; N < 2 * f.width; ++N) {
      var _ = N + 2 * f.left + X;

      if (4 == h[_]) h[_] = 2;
    }

  for (var L = module31.default(h), Z = 0; Z < 2 * f.height; ++Z)
    for (var G = 2 * f.top + Z, H = G * s, J = 0; J < 2 * f.width; ++J) {
      var U = J + 2 * f.left,
        W = U + H;

      if (U >= 0 && U < s - 3) {
        if (0 == h[W] && 2 == h[W + 1] && 2 == h[W + 2] && 1 == h[W + 3]) L[W + 2] = 1;
        if (1 == h[W] && 2 == h[W + 1] && 2 == h[W + 2] && 0 == h[W + 3]) L[W + 1] = 1;
      }

      if (G >= 0 && G < l - 3) {
        if (0 == h[W] && 2 == h[W + s] && 2 == h[W + 2 * s] && 1 == h[W + 3 * s]) L[W + 2 * s] = 1;
        if (1 == h[W] && 2 == h[W + s] && 2 == h[W + 2 * s] && 0 == h[W + 3 * s]) L[W + s] = 1;
      }
    }

  return L;
}

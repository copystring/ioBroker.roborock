exports.parseDynamicData = function (t) {
  if (!t || !t.length) return;
  var n = {};

  try {
    for (var o = 0; o < t.length; o += I(n, t, o, true));
  } catch (n) {
    console.log('TTTT parse - ' + n + ' data - ' + JSON.stringify(t));
  }

  if (undefined !== n.furnitures) n.furnitures = x(n.furnitures);
  return n;
};

exports.parseSync = function (t, n) {
  var o = arguments.length > 2 && undefined !== arguments[2] && arguments[2];
  if (!t || !t.length) return;
  var f = {};

  try {
    for (var h = 0; h < t.length; h += I(f, t, h));
  } catch (n) {
    console.log('TTTT parse - ' + n + ' data - ' + JSON.stringify(t));
  }

  if (undefined !== f.carpetMap) f.carpetMap = F(f.map, f.carpetMap);
  if (undefined !== f.floorMap) f.floorMap = P(f.map, f.floorMap, f.flDirec);
  if (undefined !== f.furnitures) f.furnitures = x(f.furnitures);
  f.map = S(f, n, o);
  return f;
};

exports.parseSyncSax = function (t, n) {
  var o = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2];
  if (!t || !t.length) return;
  var f = {};

  try {
    for (var h = 0; h < t.length; h += I(f, t, h));
  } catch (n) {
    console.log('TTTT parse - ' + n + ' data - ' + JSON.stringify(t));
  }

  f.map = C(f.map, n, o);
  return f;
};

var module50 = require('./50'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module22 = require('./22'),
  module1411 = require('./1411');

function s(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var f = Object.getOwnPropertySymbols(t);
    if (n)
      f = f.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, f);
  }

  return o;
}

function p(t) {
  for (var n = 1; n < arguments.length; n++) {
    var f = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      s(Object(f), true).forEach(function (n) {
        module50.default(t, n, f[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(f));
    else
      s(Object(f)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(f, n));
      });
  }

  return t;
}

function u(t, n) {
  var o;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
    if (Array.isArray(t) || (o = v(t)) || (n && t && 'number' == typeof t.length)) {
      if (o) t = o;
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

  return (o = t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']()).next.bind(o);
}

function v(t, n) {
  if (t) {
    if ('string' == typeof t) return c(t, n);
    var o = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === o && t.constructor) o = t.constructor.name;
    return 'Map' === o || 'Set' === o ? Array.from(t) : 'Arguments' === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? c(t, n) : undefined;
  }
}

function c(t, n) {
  if (null == n || n > t.length) n = t.length;

  for (var o = 0, f = new Array(n); o < n; o++) f[o] = t[o];

  return f;
}

var module398 = require('./398'),
  w = module398.BytesToInt,
  b = module398.fill,
  A = module398.BytesToASCII,
  module1477 = require('./1477').getIndexPngBase64,
  module1480 = require('./1480').getCleanUpedWalls,
  module1476 = require('./1476'),
  O = module1476.convertFloorDataToImage,
  x = module1476.precessFurnitureData,
  M = {
    type: 2,
    header: 2,
    payload: 4,
  },
  j = 32,
  T = {
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
      payload: function (t, n) {
        var o = {
          x: w(n.data, n.offset, 4) / 50,
          y: w(n.data, n.offset + 4, 4) / 50,
          angle: w(n.data, n.offset + 8, 4),
        };
        if (undefined !== o.x && undefined !== o.y) module22.default(t, o);
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
      payload: function (t, n) {
        return module22.default(t, n);
      },
    },
    3: {
      type: 'path',
      header: [
        ['num', 4],
        ['size', 4],
        ['angle', 4],
      ],
      payload: function (t, n) {
        t.points = new Array(n.length / t.size);

        for (var o = 0; o < t.points.length; ++o) {
          var f = n.offset + o * t.size;
          t.points[o] = {
            x: w(n.data, f, 2) / 50,
            y: w(n.data, f + 2, 2) / 50,
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
      payload: function (t, n) {
        t.points = new Array(n.length / t.size);

        for (var o = 0; o < t.points.length; ++o) {
          var f = n.offset + o * t.size;
          t.points[o] = {
            x: w(n.data, f, 2) / 50,
            y: w(n.data, f + 2, 2) / 50,
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
      payload: function (t, n) {
        t.points = new Array(n.length / t.size);

        for (var o = 0; o < t.points.length; ++o) {
          var f = n.offset + o * t.size;
          t.points[o] = {
            x: w(n.data, f, 2) / 50,
            y: w(n.data, f + 2, 2) / 50,
          };
        }
      },
    },
    6: {
      type: 'zones',
      header: [['num', 4]],
      payload: function (t, n) {
        t.zones = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 8 * o;
          t.zones[o] = [w(n.data, f, 2) / 50, w(n.data, f + 2, 2) / 50, w(n.data, f + 4, 2) / 50, w(n.data, f + 6, 2) / 50];
        }
      },
    },
    7: {
      type: 'target',
      header: [],
      payload: function (t, n) {
        var o = {
          x: w(n.data, n.offset, 2) / 50,
          y: w(n.data, n.offset + 2, 2) / 50,
        };
        if (o.x || o.y) module22.default(t, o);
      },
    },
    8: {
      type: 'robot',
      header: [],
      payload: function (t, n) {
        var o = {
          x: w(n.data, n.offset, 4) / 50,
          y: w(n.data, n.offset + 4, 4) / 50,
          angle: w(n.data, n.offset + 8, 4),
        };
        if (undefined !== o.x && undefined !== o.y && undefined !== o.angle) module22.default(t, o);
      },
    },
    9: {
      type: 'fbzs',
      header: [['num', 4]],
      payload: function (t, n) {
        t.fbzs = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 16 * o;
          t.fbzs[o] = [
            w(n.data, f, 2) / 50,
            w(n.data, f + 2, 2) / 50,
            w(n.data, f + 4, 2) / 50,
            w(n.data, f + 6, 2) / 50,
            w(n.data, f + 8, 2) / 50,
            w(n.data, f + 10, 2) / 50,
            w(n.data, f + 12, 2) / 50,
            w(n.data, f + 14, 2) / 50,
          ];
        }
      },
    },
    10: {
      type: 'walls',
      header: [['num', 4]],
      payload: function (t, n) {
        t.walls = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 8 * o;
          t.walls[o] = [w(n.data, f, 2) / 50, w(n.data, f + 2, 2) / 50, w(n.data, f + 4, 2) / 50, w(n.data, f + 6, 2) / 50];
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
      payload: function (t, n) {
        t.blocks = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + o;
          t.blocks[o] = w(n.data, f, 1);
        }
      },
    },
    12: {
      type: 'mfbzs',
      header: [['num', 4]],
      payload: function (t, n) {
        t.fbzs = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 16 * o;
          t.fbzs[o] = [
            w(n.data, f, 2) / 50,
            w(n.data, f + 2, 2) / 50,
            w(n.data, f + 4, 2) / 50,
            w(n.data, f + 6, 2) / 50,
            w(n.data, f + 8, 2) / 50,
            w(n.data, f + 10, 2) / 50,
            w(n.data, f + 12, 2) / 50,
            w(n.data, f + 14, 2) / 50,
          ];
        }
      },
    },
    13: {
      type: 'obstaclesOld',
      header: [['num', 4]],
      payload: function (t, n) {
        t.obstacles = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 5 * o;
          t.obstacles[o] = [w(n.data, f, 2), w(n.data, f + 2, 2), w(n.data, f + 4, 1)];
        }
      },
    },
    14: {
      type: 'ignoredObstaclesOld',
      header: [['num', 4]],
      payload: function (t, n) {
        t.obstacles = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 5 * o;
          t.obstacles[o] = [w(n.data, f, 2), w(n.data, f + 2, 2), w(n.data, f + 4, 1)];
        }
      },
    },
    15: {
      type: 'obstacles',
      header: [['num', 4]],
      payload: function (t, n) {
        if (
          ((t.obstacles = new Array(t.num)),
          0 == w(n.data, n.offset + 12, 4) && !(0 == w(n.data, n.offset + 16, 4) && 0 == w(n.data, n.offset + 20, 4) && 0 == w(n.data, n.offset + 24, 4)))
        )
          for (var o = 0; o < t.num; ++o) {
            var f = n.offset + 16 * o;
            t.obstacles[o] = [w(n.data, f, 2), w(n.data, f + 2, 2), w(n.data, f + 4, 2), w(n.data, f + 6, 2), w(n.data, f + 8, 4), w(n.data, f + 12, 4)];
          }
        else
          for (var h = 0; h < t.num; ++h) {
            var l = n.offset + 28 * h;
            t.obstacles[h] = [
              w(n.data, l, 2),
              w(n.data, l + 2, 2),
              w(n.data, l + 4, 2),
              w(n.data, l + 6, 2),
              w(n.data, l + 8, 4),
              0 == w(n.data, l + 12, 1) ? '' : A(n.data, l + 12, 16),
            ];
          }
      },
    },
    16: {
      type: 'ignoredObstacles',
      header: [['num', 4]],
      payload: function (t, n) {
        t.obstacles = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 6 * o;
          t.obstacles[o] = [w(n.data, f, 2), w(n.data, f + 2, 2), w(n.data, f + 4, 2)];
        }
      },
    },
    17: {
      type: 'carpetMap',
      header: [],
      payload: function (t, n) {
        t.data = new Array(n.length);

        for (var o = 0; o < n.length; ++o) {
          var f = n.offset + o;
          t.data[o] = w(n.data, f, 1);
        }
      },
    },
    18: {
      type: 'mopPath',
      header: [],
      payload: function (t, n) {
        t.data = new Array(n.length);

        for (var o = 0; o < n.length; ++o) {
          var f = n.offset + o;
          t.data[o] = w(n.data, f, 1);
        }
      },
    },
    19: {
      type: 'cfbzs',
      header: [['num', 4]],
      payload: function (t, n) {
        t.fbzs = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 16 * o;
          t.fbzs[o] = [
            w(n.data, f, 2) / 50,
            w(n.data, f + 2, 2) / 50,
            w(n.data, f + 4, 2) / 50,
            w(n.data, f + 6, 2) / 50,
            w(n.data, f + 8, 2) / 50,
            w(n.data, f + 10, 2) / 50,
            w(n.data, f + 12, 2) / 50,
            w(n.data, f + 14, 2) / 50,
          ];
        }
      },
    },
    20: {
      type: 'pathType',
      header: [],
      payload: function (t, n) {
        t.data = w(n.data, n.offset, 1);
      },
    },
    21: {
      type: 'smartZones',
      header: [['num', 4]],
      payload: function (t, n) {
        t.smartZones = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 18 * o;
          t.smartZones[o] = {
            zid: w(n.data, f, 2),
            range: [w(n.data, f + 2, 2) / 50, w(n.data, f + 4, 2) / 50, w(n.data, f + 6, 2) / 50, w(n.data, f + 8, 2) / 50],
          };
        }
      },
    },
    22: {
      type: 'customCarpet',
      header: [['num', 4]],
      payload: function (t, n) {
        t.fbzs = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 16 * o;
          t.fbzs[o] = [
            w(n.data, f, 2) / 50,
            w(n.data, f + 2, 2) / 50,
            w(n.data, f + 4, 2) / 50,
            w(n.data, f + 6, 2) / 50,
            w(n.data, f + 8, 2) / 50,
            w(n.data, f + 10, 2) / 50,
            w(n.data, f + 12, 2) / 50,
            w(n.data, f + 14, 2) / 50,
          ];
        }
      },
    },
    23: {
      type: 'clfbzs',
      header: [['num', 4]],
      payload: function (t, n) {
        t.fbzs = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 16 * o;
          t.fbzs[o] = [
            w(n.data, f, 2) / 50,
            w(n.data, f + 2, 2) / 50,
            w(n.data, f + 4, 2) / 50,
            w(n.data, f + 6, 2) / 50,
            w(n.data, f + 8, 2) / 50,
            w(n.data, f + 10, 2) / 50,
            w(n.data, f + 12, 2) / 50,
            w(n.data, f + 14, 2) / 50,
          ];
        }
      },
    },
    24: {
      type: 'floorMap',
      header: [],
      payload: function (t, n) {
        t.data = new Array(n.length);

        for (var o = 0; o < n.length; ++o) {
          var f = n.offset + o;
          t.data[o] = w(n.data, f, 1);
        }
      },
    },
    25: {
      type: 'furnitures',
      header: [['num', 4]],
      payload: function (t, n) {
        if (n.verify && n.length != 23 * t.num) t.data = [];
        else {
          t.data = new Array(t.num);

          for (var o = 0; o < t.num; ++o) {
            var f = n.offset + 23 * o;
            t.data[o] = [
              w(n.data, f, 2) / 50,
              w(n.data, f + 2, 2) / 50,
              w(n.data, f + 4, 2) / 50,
              w(n.data, f + 6, 2) / 50,
              w(n.data, f + 8, 2) / 50,
              w(n.data, f + 10, 2) / 50,
              w(n.data, f + 12, 2) / 50,
              w(n.data, f + 14, 2) / 50,
              w(n.data, f + 16, 2),
              w(n.data, f + 18, 1),
              w(n.data, f + 19, 1),
              w(n.data, f + 20, 1),
              w(n.data, f + 21, 1),
              w(n.data, f + 22, 1),
            ];
          }
        }
      },
    },
    26: {
      type: 'dockType',
      header: [],
      payload: function (t, n) {
        t.data = w(n.data, n.offset, n.length);
      },
    },
    27: {
      type: 'enemies',
      header: [['num', 4]],
      payload: function (t, n) {
        if (n.verify && n.length != 6 * t.num) t.data = [];
        else {
          t.data = new Array(t.num);

          for (var o = 0; o < t.num; ++o) {
            var f = n.offset + 6 * o;
            t.data[o] = [w(n.data, f, 2) / 50, w(n.data, f + 2, 2) / 50, w(n.data, f + 4, 2)];
          }
        }
      },
    },
    28: {
      type: 'dsfbz',
      header: [['num', 4]],
      payload: function (t, n) {
        t.fbzs = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 16 * o;
          t.fbzs[o] = [
            w(n.data, f, 2) / 50,
            w(n.data, f + 2, 2) / 50,
            w(n.data, f + 4, 2) / 50,
            w(n.data, f + 6, 2) / 50,
            w(n.data, f + 8, 2) / 50,
            w(n.data, f + 10, 2) / 50,
            w(n.data, f + 12, 2) / 50,
            w(n.data, f + 14, 2) / 50,
          ];
        }
      },
    },
    29: {
      type: 'stuckpts',
      header: [['num', 4]],
      payload: function (t, n) {
        if (n.verify && n.length != 6 * t.num) t.data = [];
        else {
          t.data = new Array(t.num);

          for (var o = 0; o < t.num; ++o) {
            var f = n.offset + 6 * o;
            t.data[o] = [w(n.data, f, 2) / 50, w(n.data, f + 2, 2) / 50, w(n.data, f + 4, 2)];
          }
        }
      },
    },
    30: {
      type: 'clffbz',
      header: [['num', 4]],
      payload: function (t, n) {
        if (n.verify && n.length != 16 * t.num) t.fbzs = [];
        else {
          t.fbzs = new Array(t.num);

          for (var o = 0; o < t.num; ++o) {
            var f = n.offset + 16 * o;
            t.fbzs[o] = [
              w(n.data, f, 2) / 50,
              w(n.data, f + 2, 2) / 50,
              w(n.data, f + 4, 2) / 50,
              w(n.data, f + 6, 2) / 50,
              w(n.data, f + 8, 2) / 50,
              w(n.data, f + 10, 2) / 50,
              w(n.data, f + 12, 2) / 50,
              w(n.data, f + 14, 2) / 50,
            ];
          }
        }
      },
    },
    31: {
      type: 'smartds',
      header: [['num', 4]],
      payload: function (t, n) {
        if (n.verify && n.length != 16 * t.num) t.fbzs = [];
        else {
          t.fbzs = new Array(t.num);

          for (var o = 0; o < t.num; ++o) {
            var f = n.offset + 16 * o;
            t.fbzs[o] = [
              w(n.data, f, 2) / 50,
              w(n.data, f + 2, 2) / 50,
              w(n.data, f + 4, 2) / 50,
              w(n.data, f + 6, 2) / 50,
              w(n.data, f + 8, 2) / 50,
              w(n.data, f + 10, 2) / 50,
              w(n.data, f + 12, 2) / 50,
              w(n.data, f + 14, 2) / 50,
            ];
          }
        }
      },
    },
    32: {
      type: 'flDirec',
      header: [],
      payload: function (t, n) {
        t.data = new Array(n.length / 3);

        for (var o = 0; o < n.length / 3; ++o) {
          var f = n.offset + 3 * o;
          t.data[o] = [w(n.data, f, 1), w(n.data, f + 1, 2)];
        }
      },
    },
    33: {
      type: 'date',
      header: [],
      payload: function (t, n) {
        t.data = w(n.data, n.offset, n.length);
      },
    },
    34: {
      type: 'nonceData',
      header: [['num', 4]],
      payload: function (t, n) {
        t.data = new Array(t.num);

        for (var o = 0; o < t.num; ++o) {
          var f = n.offset + 5 * o;
          t.data[o] = [w(n.data, f, 1), w(n.data, f + 1, 4)];
        }
      },
    },
  };

function I(t, n, o) {
  var h = arguments.length > 3 && undefined !== arguments[3] && arguments[3],
    l = w(n, o, M.type),
    s = o + M.type,
    p = {
      header: w(n, s, M.header),
      payload: w(n, s + M.header, M.payload),
    };
  s += M.header + M.payload;
  o += p.header;
  var v = T[l];
  if (!v) return p.header + p.payload;
  if (!v.payload) return p.header + ((v.type && p.payload) || 0);
  var c = {};

  try {
    for (var y, b = u(v.header); !(y = b()).done; ) {
      var A = y.value,
        z = module23.default(A, 2),
        k = z[0],
        D = z[1];
      if (s >= o) break;
      c[k] = w(n, s, D);
      s += D;
    }
  } catch (t) {
    console.log('AAAA - ' + t + '  header - ' + v.header + ' type - ' + l);
  }

  v.payload(c, {
    data: n,
    offset: o,
    length: p.payload,
    verify: h,
  });
  if (Object.keys(c).length) t[v.type] = c;
  return p.header + p.payload;
}

function S(t, n, o) {
  var f = t.map;
  if (!(f && f.width && f.height && f.data && f.data.length))
    return !(f && f.width && f.height) || (f.data && f.data.length)
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
    s = E(f);
  if (!s || undefined === s.top)
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

  if (n)
    v = {
      obstacles: 24,
      space: 25,
      space3D: 27,
      space3DDark: 28,
    };

  for (var c = [], y = 0; y < j; y++) c.push(0);

  var w = new Array((s.width + 1) * s.height);
  b(w, 0);
  var A = new Object(),
    D = new Object(),
    O = w.concat(),
    x = w.concat(),
    M = w.concat(),
    T = w.concat(),
    I = w.concat(),
    S = new Array(j);
  b(S, 0);
  var F = new Array(j);
  b(F, 0);

  for (var P = [], C = 0; C < j; C++) {
    var B = {
      x: 0,
      y: 0,
      count: 0,
      minX: s.width,
      maxX: 0,
      minY: s.height - 1,
      maxY: 0,
    };
    P.push(B);
  }

  var X = new Array(1024);
  b(X, 0);

  for (var Y = [], N = 0; N < s.height; ++N)
    for (var _ = f.offset + (N + s.top) * f.width, H = 0; H < s.width; ++H) {
      var J = f.data[_ + H + s.left];

      if (0 != (7 & J)) {
        var L = J >>> 3;

        if ((Y.push(L), 0 != L)) {
          if (((X[j * L + L] = 1), 0 != N)) {
            var Z = Y[(N - 1) * s.width + H];

            if (Z != L) {
              var G = j * L + Z;
              X[j * Z + L] = 1;
              X[G] = 1;
            }
          }

          if (0 != H) {
            var U = Y[N * s.width + H - 1];

            if (U != L) {
              var W = j * L + U;
              X[j * U + L] = 1;
              X[W] = 1;
            }
          }

          S[L]++;
        }
      } else Y.push(0);
    }

  for (var q = [], V = 1; V < j; V++) {
    for (var $ = 0, K = 1; K < j; K++) V != K && 1 == X[V * j + K] && $++;

    q.push([V, $]);
  }

  q.sort(function (t, n) {
    return n[1] - t[1];
  });
  var Q = new Array(),
    R = new Array(),
    aa = o ? module1411.colorEggIndexMap : module1411.colorIndexMap,
    ta = module1411.colorHighLightIndexMap;

  if (n) {
    aa = o ? module1411.colorEggIndexMapDark : module1411.colorIndexMapDark;
    ta = module1411.colorHighLightIndexMapDark;
  }

  Q.push(u(aa[0]));
  R.push(u(ta[0]));
  F[0] = 0;

  for (var ea = 0, ra = 0, na = 0; na < j; na++) S[na] > ra && ((ra = S[na]), (ea = na));

  F[ea] = 1;
  var oa = u(aa[1]),
    da = u(aa[0]),
    fa = [[], [], [], []];
  fa[0].push([ea]);

  for (var ia = 0; ia < q.length; ia++) {
    var ha = q[ia][0];
    if (ha != ea)
      if (0 != X[ha * j + ha]) {
        for (var la = [0, 0, 0, 0, 0], sa = 0; sa < q.length; sa++) {
          var pa = q[sa][0];
          if (0 != X[pa * j + ha] && 0 != F[pa]) la[F[pa]] = 1;
        }

        for (var ua = 1; ua < la.length; ua++)
          if (0 == la[ua]) {
            var va = ua;
            X[ha * j + ha] = va;
            F[ha] = ua;
            fa[ua - 1].push(ha);
            break;
          }
      } else F[ha] = 0;
  }

  for (var ca = 0; ca < fa.length; ca++)
    if (0 == fa[ca].length) {
      var ya = Math.floor((ca + 1) / 2) - 1;
      if (fa[ya].length <= 1) continue;

      for (var ga = 0, ma = fa[ya].length - 1; ma >= fa[ya].length / 2; ma--) {
        fa[ca].push(fa[ya][ma]);
        ga++;
      }

      for (var wa = 0; wa < ga; wa++) fa[ya].pop();
    }

  for (var ba = 0, Aa = 0, za = -1, ka = 0; ka < fa.length; ka++) {
    if (fa[ka].length > ba) {
      ba = fa[ka].length;
      Aa = ka;
    }

    if (0 == fa[ka].length) za = ka;
  }

  if (fa[Aa].length >= 2 && -1 != za)
    for (; fa[Aa].length > fa[za].length; ) {
      fa[za].push(fa[Aa][fa[Aa].length - 1]);
      fa[Aa].pop();
    }

  for (var Da = 0; Da < fa.length; Da++)
    for (var Oa = 0; Oa < fa[Da].length; Oa++) {
      F[fa[Da][Oa]] = Da + 1;
    }

  for (var xa = 1; xa < F.length; xa++)
    if (0 != F[xa]) {
      var Ma = F[xa];
      Q.push(u(aa[Ma]));
      R.push(u(ta[Ma]));
    } else {
      Q.push(0);
      R.push(0);
    }

  for (var ja = s.height - 1; ja >= 0; --ja)
    for (var Ta = f.offset + (ja + s.top) * f.width, Ia = (s.height - 1 - ja) * (s.width + 1) + 1, Sa = 0; Sa < s.width; ++Sa) {
      var Ea = f.data[Ta + Sa + s.left];

      if (0 != (7 & Ea)) {
        h++;
        var Fa = Ea >>> 3;
        c[Fa]++;
        var Pa = Fa,
          Ca = 1 == (7 & Ea) ? v.obstacles : Q[Pa],
          Ba = 1 == (7 & Ea) ? v.obstacles : oa,
          Xa = Fa + '',
          Ya = 1 == (7 & Ea) ? v.obstacles : R[Pa],
          Na = 1 == (7 & Ea) ? v.obstacles : da,
          _a = v.space3D,
          Ha = v.space3DDark;

        if ((undefined === A[Xa] && (A[Xa] = O.concat()), Fa >= 0 && Fa < j)) {
          if (1 != (7 & Ea)) {
            P[Fa].x = P[Fa].x + Sa;
            P[Fa].y = P[Fa].y + ja;
            P[Fa].count = P[Fa].count + 1;
            if (P[Fa].minX > Sa) P[Fa].minX = Sa;
            if (P[Fa].maxX < Sa) P[Fa].maxX = Sa;
            if (P[Fa].minY > ja) P[Fa].minY = ja;
            if (P[Fa].maxY < ja) P[Fa].maxY = ja;
          }

          for (var Ja = Ia + Sa, La = 0; La < 1; ++La) {
            A[Xa][Ja + La] = Ya;
            w[Ja + La] = Ca;
            x[Ja + La] = Ba;
            M[Ja + La] = Na;
            T[Ja + La] = _a;
            I[Ja + La] = Ha;
          }
        }
      }
    }

  for (var Za in ((s.mapArea = Math.round((25 * h) / 1e4)), (s.left += f.left - 0.5), (s.top += f.top - 0.5), A))
    D[Za] = 'data:image/png;base64,' + module1477(s.width, s.height, A[Za]);

  for (var Ga = module1480(t), Ua = ['#DFDFDFff', '#50A4FF', '#FF744D', '#008FA8', '#F5AF10', '#E9E9E9ff'], Wa = new Array(j), qa = 0; qa < F.length; qa++) {
    var Va = F[qa];
    Wa[qa] = Ua[Va];
  }

  delete f.data;
  return p(
    p(
      {
        image: 'data:image/png;base64,' + module1477(s.width, s.height, w),
        imageNoBlock: 'data:image/png;base64,' + module1477(s.width, s.height, x),
        imageBlockCleanBackground: 'data:image/png;base64,' + module1477(s.width, s.height, M),
        image3DBackground: 'data:image/png;base64,' + module1477(s.width, s.height, T),
        image3DBackgroundDark: 'data:image/png;base64,' + module1477(s.width, s.height, I),
      },
      s
    ),
    {},
    {
      mapList: D,
      data: f,
      centerInfo: P,
      neighbourInfo: X,
      colorData: F,
      colorHighlightValues: Wa,
      isEmpty: false,
      cleanedWalls: Ga,
    }
  );
}

function E(t) {
  for (var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : 7, o = t.width * t.height, f = {}, h = 0; h < o; ++h) {
    if (0 != (t.data[t.offset + h] & n)) {
      f.top = Math.floor(h / t.width);
      break;
    }
  }

  if (undefined === f.top) return null;

  for (var l = o; l > f.top * t.width; --l) {
    if (0 != (t.data[t.offset + l - 1] & n)) {
      f.height = Math.floor((l - 1) / t.width) - f.top + 1;
      break;
    }
  }

  for (var s = f.top * t.width, p = s + f.height * t.width, u = 0; u < t.width && undefined === f.left; ++u)
    for (var v = s + u; v < p; v += t.width) {
      if (0 != (t.data[t.offset + v] & n)) {
        f.left = u;
        break;
      }
    }

  for (var c = t.width; c > f.left && undefined === f.width; --c)
    for (var y = s + c - 1; y < p; y += t.width) {
      if (0 != (t.data[t.offset + y] & n)) {
        f.width = c - f.left;
        break;
      }
    }

  return f;
}

function F(t, n) {
  if (!n)
    return {
      image: '',
      capCount: -1,
    };
  var o = t.width * t.height;
  if (!n.data || !n.data.length || n.data.length != o)
    return {
      image: '',
      capCount: -1,
    };
  var f = E(t);
  if (!f || undefined === f.top)
    return {
      image: '',
      capCount: -1,
    };
  var h = 23,
    l = new Array(3 * (3 * f.width + 1) * f.height);
  b(l, 0);
  var s = new Array(f.width * f.height);
  b(s, 0);

  for (var p = -1, u = 0, v = f.height - 1; v >= 0; --v)
    for (var c = (v + f.top) * t.width, y = 0; y < f.width; ++y) {
      if (0 != (1 & n.data[c + y + f.left])) {
        u++;
        var w = (3 * f.height - 3 - 3 * v) * (3 * f.width + 1) + 1 + 3 * y,
          A = [w, w + 1, w + 2, w + 3 * f.width + 1, w + 3 * f.width + 2, w + 3 * f.width + 3, w + 6 * f.width + 2, w + 6 * f.width + 3, w + 6 * f.width + 4];
        l[A[2]] = h;
        l[A[4]] = h;
        l[A[6]] = h;
        var k = (f.height - 1 - v) * f.width + y;
        s[k] = 1;
        p = k;
      }
    }

  return {
    image: 'data:image/png;base64,' + module1477(3 * f.width, 3 * f.height, l),
    capData: s,
    firstIndex: p,
    capCount: u,
  };
}

function P(t, n, o) {
  if (!n || !n.data || n.data.length <= 0)
    return {
      isEmpty: true,
    };
  var f = E(t);
  if (!f || undefined === f.top)
    return {
      isEmpty: true,
    };
  var h = O(n.data, f, t, o);
  return {
    data: n.data,
    image: h,
    direction: (null == o ? undefined : o.data) || [],
  };
}

function C(t, n, o) {
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
  var f = E(t, 1048575);

  if (f && undefined !== f.top) {
    var h = 0,
      l = {
        known: 5,
        space: 3,
      };
    if (n)
      l = {
        known: 9,
        space: 24,
      };
    var s = new Array((6 * f.width + 1) * f.height * 6);
    b(s, 0);
    var u = new Array(2 * t.width * (2 * t.height));
    b(u, 0);

    for (var v = 0; v < f.height; ++v)
      for (var c = (v + f.top) * t.width, y = t.offset + c, w = 0; w < f.width; ++w) {
        var A = t.data[y + w + f.left],
          k = (A >>> 2) & 3,
          D = (A >>> 6) & 3,
          O = 3 & A,
          x = (A >>> 4) & 3;
        if (D) h++;
        if (k) h++;
        if (x) h++;
        if (O) h++;
        var M = 4 * c + 2 * (w + f.left);
        u[M] = B(O);
        u[M + 1] = B(x);
        u[M + 2 * t.width] = B(k);
        u[M + 1 + 2 * t.width] = B(D);
      }

    var j = Y(o ? N(u, t, f) : u, t, f);
    if (o) X(j, t, f);

    for (var T = 6 * f.height - 1; T >= 0; --T)
      for (var I = (T + 6 * f.top) * (6 * t.width), S = (6 * f.height - 1 - T) * (6 * f.width + 1) + 1, F = 0; F < 6 * f.width; ++F) {
        var P = j[I + F + 6 * f.left],
          C = 1 == P ? l.known : 0 === P ? 0 : l.space;
        if (0 != P) s[S + F] = C;
      }

    f.mapArea = Math.round((225 * h) / 1e4);
    f.width = f.width;
    f.height = f.height;
    f.left = f.left;
    f.top = f.top;
    delete t.data;
    return p(
      {
        image: 'data:image/png;base64,' + module1477(6 * f.width, 6 * f.height, s),
      },
      f
    );
  }
}

function B(t) {
  var n = 0;
  if (3 == t) n = 1;
  else if (1 == t) n = 2;
  return n;
}

function X(t, n, o) {
  for (var f = 6 * n.width, h = 6 * n.height, l = [1, -1, -f, f, -f - 1, 1 - f, f - 1, f + 1], s = 0; s < 6 * o.height; ++s)
    for (var p = (6 * o.top + s) * n.width * 6, u = 0; u < 6 * o.width; ++u) {
      var v = u + 6 * o.left + p;

      if (2 == t[v]) {
        for (var c = false, y = 0; y < l.length; y++) {
          var w = l[y] + v;

          if (!(w < 0 || w >= f * h) && 1 == t[w]) {
            c = true;
            break;
          }
        }

        if (!c) t[v] = 0;
      }
    }
}

function Y(t, n, o) {
  var f = 2 * n.width,
    h = 2 * o.width,
    l = 2 * o.height,
    s = 6 * n.width,
    p = 6 * n.height,
    u = new Array(s * p);
  b(u, 0);

  for (var v = 0; v < l; ++v)
    for (var c = 2 * o.top + v, y = c * f, w = 0; w < h; ++w)
      for (var A = w + 2 * o.left, z = t[A + y], k = 3 * c * (3 * f) + 3 * A, D = 0; D < 3; D++) for (var O = 0; O < 3; O++) u[k + D * f * 3 + O] = z;

  return u;
}

function N(t, o, f) {
  for (var h = module31.default(t), l = 2 * o.width, s = 2 * o.height, p = 0; p < 2 * f.height; ++p)
    for (var u = 2 * f.top + p, v = u * l, c = 0; c < 2 * f.width; ++c) {
      var y = c + 2 * f.left,
        w = y + v;

      if (0 == t[w]) {
        if (0 != y && y != l - 1 && (0 == u || 2 == t[w - l] || 0 == t[w - l])) {
          for (var b = -1, A = 0; A < (s - u) ** 4; ++A)
            if (!((t[w - 1 + A * l] + t[w + 1 + A * l] == 1 && 0 == t[w + A * l]) || (2 != t[w + A * l] && 0 != t[w + A * l]))) {
              b = A;
              break;
            }

          if (b > 0) for (var z = 0; z < b; ++z) h[w + z * l] = 4;
        }

        if (0 != u && u != s - 1 && (0 == y || 2 == t[w - 1] || 0 == t[w - 1])) {
          for (var k = -1, D = 0; D < (l - y) ** 4; ++D)
            if (!((t[w + D + l] + t[w + D - l] == 1 && 0 == t[w + D]) || (2 != t[w + D] && 0 != t[w + D]))) {
              k = D;
              break;
            }

          if (k > 0) for (var O = 0; O < k; ++O) h[w + O] = 4;
        }
      }

      if (2 == t[w] && 0 != u && 0 != y && u != s - 1 && y != l - 1 && 1 == t[w - 1] && 1 == t[w - l] && 1 == t[w + 1] && 1 == t[w + l]) h[w] = 1;
    }

  for (var x = 0; x < 2 * f.height; ++x)
    for (var M = 2 * f.top + x, j = 0; j < 2 * f.width; ++j) {
      var T = j + 2 * f.left,
        I = T + M * l,
        S = I - 1,
        E = I + 1,
        F = I - l,
        P = I + l;

      if (0 == h[I]) {
        if (0 != M && 0 != T) (2 != h[S] && 4 != h[S]) || (4 != h[F] && 2 != h[F]) || (h[S] + h[F] < 8 && (h[I] = 4));
        if (0 != M && T != l - 1) (2 != h[E] && 4 != h[E]) || (2 != h[F] && 4 != h[F]) || (h[E] + h[F] < 8 && (h[I] = 4));
        if (M != s - 1 && 0 != T) (2 != h[S] && 4 != h[S]) || (2 != h[P] && 4 != h[P]) || (h[S] + h[P] < 8 && (h[I] = 4));
        if (M != s - 1 && T != l - 1) (2 != h[E] && 4 != h[E]) || (2 != h[P] && 4 != h[P]) || (h[E] + h[P] < 8 && (h[I] = 4));
      }
    }

  for (var C = 0; C < 2 * f.height; ++C)
    for (var B = (2 * f.top + C) * l, X = 0; X < 2 * f.width; ++X) {
      var Y = X + 2 * f.left + B;
      if (4 == h[Y]) h[Y] = 2;
    }

  for (var N = module31.default(h), _ = 0; _ < 2 * f.height; ++_)
    for (var H = 2 * f.top + _, J = H * l, L = 0; L < 2 * f.width; ++L) {
      var Z = L + 2 * f.left,
        G = Z + J;

      if (Z >= 0 && Z < l - 3) {
        if (0 == h[G] && 2 == h[G + 1] && 2 == h[G + 2] && 1 == h[G + 3]) N[G + 2] = 1;
        if (1 == h[G] && 2 == h[G + 1] && 2 == h[G + 2] && 0 == h[G + 3]) N[G + 1] = 1;
      }

      if (H >= 0 && H < s - 3) {
        if (0 == h[G] && 2 == h[G + l] && 2 == h[G + 2 * l] && 1 == h[G + 3 * l]) N[G + 2 * l] = 1;
        if (1 == h[G] && 2 == h[G + l] && 2 == h[G + 2 * l] && 0 == h[G + 3 * l]) N[G + l] = 1;
      }
    }

  return N;
}

exports.parseDynamicData = function (t) {
  if (!t || !t.length) return;
  var o = {};

  try {
    for (var n = 0; n < t.length; n += I(o, t, n));
  } catch (o) {
    console.log('TTTT parse - ' + o + ' data - ' + JSON.stringify(t));
  }

  if (undefined !== o.furnitures) o.furnitures = x(o.furnitures);
  return o;
};

exports.parseSync = function (t, o) {
  var n = arguments.length > 2 && undefined !== arguments[2] && arguments[2];
  if (!t || !t.length) return;
  var f = {};

  try {
    for (var h = 0; h < t.length; h += I(f, t, h));
  } catch (o) {
    console.log('TTTT parse - ' + o + ' data - ' + JSON.stringify(t));
  }

  if (undefined !== f.carpetMap) f.carpetMap = P(f.map, f.carpetMap);
  if (undefined !== f.floorMap) f.floorMap = C(f.map, f.floorMap, f.flDirec);
  if (undefined !== f.furnitures) f.furnitures = x(f.furnitures);
  f.map = S(f, o, n);
  return f;
};

exports.parseSyncSax = function (t, o) {
  var n = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2];
  if (!t || !t.length) return;
  var f = {};

  try {
    for (var h = 0; h < t.length; h += I(f, t, h));
  } catch (o) {
    console.log('TTTT parse - ' + o + ' data - ' + JSON.stringify(t));
  }

  f.map = B(f.map, o, n);
  return f;
};

var module50 = require('./50'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module22 = require('./22'),
  module1337 = require('./1337');

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
  module1404 = require('./1404').getIndexPngBase64,
  module1407 = require('./1407').getCleanUpedWalls,
  module1403 = require('./1403'),
  D = module1403.convertFloorDataToImage,
  x = module1403.precessFurnitureData,
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
    28: {
      type: 'dsfbz',
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
    29: {
      type: 'stuckpts',
      header: [['num', 4]],
      payload: function (t, o) {
        t.data = new Array(t.num);

        for (var n = 0; n < t.num; ++n) {
          var f = o.offset + 6 * n;
          t.data[n] = [w(o.data, f, 2) / 50, w(o.data, f + 2, 2) / 50, w(o.data, f + 4, 2)];
        }
      },
    },
    30: {
      type: 'clffbz',
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
    31: {
      type: 'smartds',
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
    32: {
      type: 'flDirec',
      header: [],
      payload: function (t, o) {
        t.data = new Array(o.length / 3);

        for (var n = 0; n < o.length / 3; ++n) {
          var f = o.offset + 3 * n;
          t.data[n] = [w(o.data, f, 1), w(o.data, f + 1, 2)];
        }
      },
    },
    33: {
      type: 'date',
      header: [],
      payload: function (t, o) {
        t.data = w(o.data, o.offset, o.length);
      },
    },
  };

function I(t, o, n) {
  var h = w(o, n, M.type),
    s = n + M.type,
    l = {
      header: w(o, s, M.header),
      payload: w(o, s + M.header, M.payload),
    };
  s += M.header + M.payload;
  n += l.header;
  var p = T[h];
  if (!p) return l.header + l.payload;
  if (!p.payload) return l.header + ((p.type && l.payload) || 0);
  var v = {};

  try {
    for (var c, y = u(p.header); !(c = y()).done; ) {
      var b = c.value,
        A = module23.default(b, 2),
        z = A[0],
        k = A[1];
      if (s >= n) break;
      v[z] = w(o, s, k);
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

function S(t, o, n) {
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
    l = E(f);
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

  for (var c = [], y = 0; y < j; y++) c.push(0);

  var w = new Array((l.width + 1) * l.height);
  b(w, 0);
  var A = new Object(),
    O = new Object(),
    D = w.concat(),
    x = w.concat(),
    M = w.concat(),
    T = w.concat(),
    I = w.concat(),
    S = new Array(j);
  b(S, 0);
  var P = new Array(j);
  b(P, 0);

  for (var C = [], B = 0; B < j; B++) {
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

  for (var _ = [], J = 0; J < l.height; ++J)
    for (var L = f.offset + (J + l.top) * f.width, Z = 0; Z < l.width; ++Z) {
      var F = f.data[L + Z + l.left];

      if (0 != (7 & F)) {
        var G = F >>> 3;

        if ((_.push(G), 0 != G)) {
          if (((N[j * G + G] = 1), 0 != J)) {
            var H = _[(J - 1) * l.width + Z];

            if (H != G) {
              var U = j * G + H;
              N[j * H + G] = 1;
              N[U] = 1;
            }
          }

          if (0 != Z) {
            var W = _[J * l.width + Z - 1];

            if (W != G) {
              var q = j * G + W;
              N[j * W + G] = 1;
              N[q] = 1;
            }
          }

          S[G]++;
        }
      } else _.push(0);
    }

  for (var $ = [], K = 1; K < j; K++) {
    for (var Q = 0, R = 1; R < j; R++) K != R && 1 == N[K * j + R] && Q++;

    $.push([K, Q]);
  }

  $.sort(function (t, o) {
    return o[1] - t[1];
  });
  var V = new Array(),
    Y = new Array(),
    aa = n ? module1337.colorEggIndexMap : module1337.colorIndexMap,
    ta = module1337.colorHighLightIndexMap;

  if (o) {
    aa = n ? module1337.colorEggIndexMapDark : module1337.colorIndexMapDark;
    ta = module1337.colorHighLightIndexMapDark;
  }

  V.push(u(aa[0]));
  Y.push(u(ta[0]));
  P[0] = 0;

  for (var ea = 0, ra = 0, oa = 0; oa < j; oa++) S[oa] > ra && ((ra = S[oa]), (ea = oa));

  P[ea] = 1;
  var na = u(aa[1]),
    da = u(aa[0]),
    fa = [[], [], [], []];
  fa[0].push([ea]);

  for (var ia = 0; ia < $.length; ia++) {
    var ha = $[ia][0];
    if (ha != ea)
      if (0 != N[ha * j + ha]) {
        for (var sa = [0, 0, 0, 0, 0], la = 0; la < $.length; la++) {
          var pa = $[la][0];
          if (0 != N[pa * j + ha] && 0 != P[pa]) sa[P[pa]] = 1;
        }

        for (var ua = 1; ua < sa.length; ua++)
          if (0 == sa[ua]) {
            var va = ua;
            N[ha * j + ha] = va;
            P[ha] = ua;
            fa[ua - 1].push(ha);
            break;
          }
      } else P[ha] = 0;
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

  for (var Oa = 0; Oa < fa.length; Oa++)
    for (var Da = 0; Da < fa[Oa].length; Da++) {
      P[fa[Oa][Da]] = Oa + 1;
    }

  for (var xa = 1; xa < P.length; xa++)
    if (0 != P[xa]) {
      var Ma = P[xa];
      V.push(u(aa[Ma]));
      Y.push(u(ta[Ma]));
    } else {
      V.push(0);
      Y.push(0);
    }

  for (var ja = l.height - 1; ja >= 0; --ja)
    for (var Ta = f.offset + (ja + l.top) * f.width, Ia = (l.height - 1 - ja) * (l.width + 1) + 1, Sa = 0; Sa < l.width; ++Sa) {
      var Ea = f.data[Ta + Sa + l.left];

      if (0 != (7 & Ea)) {
        h++;
        var Pa = Ea >>> 3;
        c[Pa]++;

        var Ca = Pa,
          Ba = 1 == (7 & Ea) ? v.obstacles : V[Ca],
          Xa = 1 == (7 & Ea) ? v.obstacles : na,
          Na = Pa + '',
          _a = 1 == (7 & Ea) ? v.obstacles : Y[Ca],
          Ja = 1 == (7 & Ea) ? v.obstacles : da,
          La = v.space3D,
          Za = v.space3DDark;

        if ((undefined === A[Na] && (A[Na] = D.concat()), Pa >= 0 && Pa < j)) {
          if (1 != (7 & Ea)) {
            C[Pa].x = C[Pa].x + Sa;
            C[Pa].y = C[Pa].y + ja;
            C[Pa].count = C[Pa].count + 1;
            if (C[Pa].minX > Sa) C[Pa].minX = Sa;
            if (C[Pa].maxX < Sa) C[Pa].maxX = Sa;
          }

          for (var Fa = Ia + Sa, Ga = 0; Ga < 1; ++Ga) {
            A[Na][Fa + Ga] = _a;
            w[Fa + Ga] = Ba;
            x[Fa + Ga] = Xa;
            M[Fa + Ga] = Ja;
            T[Fa + Ga] = La;
            I[Fa + Ga] = Za;
          }
        }
      }
    }

  for (var Ha in ((l.mapArea = Math.round((25 * h) / 1e4)), (l.left += f.left - 0.5), (l.top += f.top - 0.5), A))
    O[Ha] = 'data:image/png;base64,' + module1404(l.width, l.height, A[Ha]);

  var Ua = module1407(t);
  delete f.data;
  return p(
    p(
      {
        image: 'data:image/png;base64,' + module1404(l.width, l.height, w),
        imageNoBlock: 'data:image/png;base64,' + module1404(l.width, l.height, x),
        imageBlockCleanBackground: 'data:image/png;base64,' + module1404(l.width, l.height, M),
        image3DBackground: 'data:image/png;base64,' + module1404(l.width, l.height, T),
        image3DBackgroundDark: 'data:image/png;base64,' + module1404(l.width, l.height, I),
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
      cleanedWalls: Ua,
    }
  );
}

function E(t) {
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

function P(t, o) {
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
  var f = E(t);
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
    image: 'data:image/png;base64,' + module1404(3 * f.width, 3 * f.height, s),
    capData: l,
    firstIndex: p,
    capCount: u,
  };
}

function C(t, o, n) {
  if (!o || !o.data || o.data.length <= 0)
    return {
      isEmpty: true,
    };
  var f = E(t);
  if (!f || undefined === f.top)
    return {
      isEmpty: true,
    };
  var h = D(o.data, f, t, n);
  return {
    data: o.data,
    image: h,
    direction: (null == n ? undefined : n.data) || [],
  };
}

function B(t, o, n) {
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
          D = 3 & A,
          x = (A >>> 4) & 3;
        if (O) h++;
        if (k) h++;
        if (x) h++;
        if (D) h++;
        var M = 4 * c + 2 * (w + f.left);
        u[M] = X(D);
        u[M + 1] = X(x);
        u[M + 2 * t.width] = X(k);
        u[M + 1 + 2 * t.width] = X(O);
      }

    var j = _(n ? J(u, t, f) : u, t, f);

    if (n) N(j, t, f);

    for (var T = 6 * f.height - 1; T >= 0; --T)
      for (var I = (T + 6 * f.top) * (6 * t.width), S = (6 * f.height - 1 - T) * (6 * f.width + 1) + 1, P = 0; P < 6 * f.width; ++P) {
        var C = j[I + P + 6 * f.left],
          B = 1 == C ? s.known : 0 === C ? 0 : s.space;
        if (0 != C) l[S + P] = B;
      }

    f.mapArea = Math.round((225 * h) / 1e4);
    f.width = f.width;
    f.height = f.height;
    f.left = f.left;
    f.top = f.top;
    delete t.data;
    return p(
      {
        image: 'data:image/png;base64,' + module1404(6 * f.width, 6 * f.height, l),
      },
      f
    );
  }
}

function X(t) {
  var o = 0;
  if (3 == t) o = 1;
  else if (1 == t) o = 2;
  return o;
}

function N(t, o, n) {
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

function _(t, o, n) {
  var f = 2 * o.width,
    h = 2 * n.width,
    s = 2 * n.height,
    l = 6 * o.width,
    p = 6 * o.height,
    u = new Array(l * p);
  b(u, 0);

  for (var v = 0; v < s; ++v)
    for (var c = 2 * n.top + v, y = c * f, w = 0; w < h; ++w)
      for (var A = w + 2 * n.left, z = t[A + y], k = 3 * c * (3 * f) + 3 * A, O = 0; O < 3; O++) for (var D = 0; D < 3; D++) u[k + O * f * 3 + D] = z;

  return u;
}

function J(t, n, f) {
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

          if (b > 0) for (var z = 0; z < b; ++z) h[w + z * s] = 4;
        }

        if (0 != u && u != l - 1 && (0 == y || 2 == t[w - 1] || 0 == t[w - 1])) {
          for (var k = -1, O = 0; O < (s - y) ** 4; ++O)
            if (!((t[w + O + s] + t[w + O - s] == 1 && 0 == t[w + O]) || (2 != t[w + O] && 0 != t[w + O]))) {
              k = O;
              break;
            }

          if (k > 0) for (var D = 0; D < k; ++D) h[w + D] = 4;
        }
      }

      if (2 == t[w] && 0 != u && 0 != y && u != l - 1 && y != s - 1 && 1 == t[w - 1] && 1 == t[w - s] && 1 == t[w + 1] && 1 == t[w + s]) h[w] = 1;
    }

  for (var x = 0; x < 2 * f.height; ++x)
    for (var M = 2 * f.top + x, j = 0; j < 2 * f.width; ++j) {
      var T = j + 2 * f.left,
        I = T + M * s,
        S = I - 1,
        E = I + 1,
        P = I - s,
        C = I + s;

      if (0 == h[I]) {
        if (0 != M && 0 != T) (2 != h[S] && 4 != h[S]) || (4 != h[P] && 2 != h[P]) || (h[S] + h[P] < 8 && (h[I] = 4));
        if (0 != M && T != s - 1) (2 != h[E] && 4 != h[E]) || (2 != h[P] && 4 != h[P]) || (h[E] + h[P] < 8 && (h[I] = 4));
        if (M != l - 1 && 0 != T) (2 != h[S] && 4 != h[S]) || (2 != h[C] && 4 != h[C]) || (h[S] + h[C] < 8 && (h[I] = 4));
        if (M != l - 1 && T != s - 1) (2 != h[E] && 4 != h[E]) || (2 != h[C] && 4 != h[C]) || (h[E] + h[C] < 8 && (h[I] = 4));
      }
    }

  for (var B = 0; B < 2 * f.height; ++B)
    for (var X = (2 * f.top + B) * s, N = 0; N < 2 * f.width; ++N) {
      var _ = N + 2 * f.left + X;

      if (4 == h[_]) h[_] = 2;
    }

  for (var J = module31.default(h), L = 0; L < 2 * f.height; ++L)
    for (var Z = 2 * f.top + L, F = Z * s, G = 0; G < 2 * f.width; ++G) {
      var H = G + 2 * f.left,
        U = H + F;

      if (H >= 0 && H < s - 3) {
        if (0 == h[U] && 2 == h[U + 1] && 2 == h[U + 2] && 1 == h[U + 3]) J[U + 2] = 1;
        if (1 == h[U] && 2 == h[U + 1] && 2 == h[U + 2] && 0 == h[U + 3]) J[U + 1] = 1;
      }

      if (Z >= 0 && Z < l - 3) {
        if (0 == h[U] && 2 == h[U + s] && 2 == h[U + 2 * s] && 1 == h[U + 3 * s]) J[U + 2 * s] = 1;
        if (1 == h[U] && 2 == h[U + s] && 2 == h[U + 2 * s] && 0 == h[U + 3 * s]) J[U + s] = 1;
      }
    }

  return J;
}

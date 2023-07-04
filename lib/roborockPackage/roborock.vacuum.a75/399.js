exports.parseDataTypes = B;

exports.parsePhotoData = function (t) {
  var o = B(t),
    n = base64js.fromByteArray(o.photoData.data.slice(o.photoData.offset, o.photoData.offset + o.photoData.length));

  if (n) {
    o.photoData = 'data:image/png;base64,' + n;
    return o;
  } else return null;
};

exports.decryptRobotData = function (t, o, n) {
  var y = o == A.gzip,
    c = base64js.toByteArray(t);
  if ((y && console.warn('dataBytes len:' + c.length), !c || c.length < 184)) return void n(false, 'data decrypt failed');
  var s = c.slice(56, S);
  if (y) console.warn('hdr len:' + module398(c, 16, 2));
  if (y) console.warn('128 key:' + JSON.stringify(s));
  if (y) console.warn('getPrivateKey:' + module394.MC.rsaKey.pri);
  var h = module400.decryptBytesWithPrivateKey(s, module394.MC.rsaKey.pri);
  if ((y && console.warn('aesKeyArray:' + h), !h || h.length < 32)) return void n(false, 'data decrypt failed');
  var D = module400.decryptBytesWithAesKey(c.slice(S), h.slice(16), h.slice(0, 16));
  if (!D || D.length < 1) return void n(false, 'data decrypt failed');
  var w = null;
  if (o == A.gzip) w = module405.inflate(D);
  else if (o == A.Lz4) w = module406.decompress(D);
  if (!w || w.length < 1) return void n(false, 'data decrypt failed');
  n(true, w);
};

var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module22 = require('./22'),
  base64js = require('base64-js'),
  module400 = require('./400'),
  module394 = require('./394');

function c(t, o) {
  var n;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
    if (Array.isArray(t) || (n = s(t)) || (o && t && 'number' == typeof t.length)) {
      if (n) t = n;
      var y = 0;
      return function () {
        return y >= t.length
          ? {
              done: true,
            }
          : {
              done: false,
              value: t[y++],
            };
      };
    }

    throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
  }

  return (n = t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']()).next.bind(n);
}

function s(t, o) {
  if (t) {
    if ('string' == typeof t) return h(t, o);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === n && t.constructor) n = t.constructor.name;
    return 'Map' === n || 'Set' === n ? Array.from(t) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? h(t, o) : undefined;
  }
}

function h(t, o) {
  if (null == o || o > t.length) o = t.length;

  for (var n = 0, y = new Array(o); n < o; n++) y[n] = t[n];

  return y;
}

var module398 = require('./398').BytesToInt,
  module405 = require('./405'),
  module406 = require('./406'),
  D = {
    type: 2,
    header: 2,
    payload: 4,
  },
  S = 184,
  w = {
    1: {
      type: 'photoSize',
      header: [],
      payload: function (t, o) {
        var n = {
          width: module398(o.data, o.offset, 2),
          height: module398(o.data, o.offset + 2, 2),
        };
        if (undefined !== n.width && undefined !== n.height) module22.default(t, n);
      },
    },
    2: {
      type: 'rectInfo',
      header: [],
      payload: function (t, o) {
        var n = {
          x0: module398(o.data, o.offset, 2),
          y0: module398(o.data, o.offset + 2, 2),
          x1: module398(o.data, o.offset + 4, 2),
          y1: module398(o.data, o.offset + 6, 2),
        };
        if (n.x0 || n.y0 || n.x1 || n.y1) module22.default(t, n);
      },
    },
    3: {
      type: 'photoData',
      header: [],
      payload: function (t, o) {
        module22.default(t, o);
      },
    },
  },
  A = {
    gzip: 'gzip',
    Lz4: 'Lz4',
  };

function B(t) {
  if (t && t.length) {
    var o = {};

    try {
      for (var n = 0; n < t.length; n += T(o, t, n));
    } catch (o) {
      console.log('TTTT parse - ' + o + ' data - ' + JSON.stringify(t));
    }

    return o;
  }
}

function T(t, o, y) {
  var l = module398(o, y, D.type),
    f = y + D.type,
    p = {
      header: module398(o, f, D.header),
      payload: module398(o, f + D.header, D.payload),
    };
  f += D.header + D.payload;
  y += p.header;
  var s = w[l];
  if (!s) return p.header + p.payload;
  if (!s.payload) return p.header + ((s.type && p.payload) || 0);
  var h = {};

  try {
    for (var v, b = c(s.header); !(v = b()).done; ) {
      var S = v.value,
        A = module23.default(S, 2),
        B = A[0],
        T = A[1];
      if (f >= y) break;
      h[B] = module398(o, f, T);
      f += T;
    }
  } catch (t) {
    console.log('BBBB - ' + t + '  header - ' + s.header + ' type - ' + l);
  }

  s.payload(h, {
    data: o,
    offset: y,
    length: p.payload,
  });
  if (Object.keys(h).length) t[s.type] = h;
  return p.header + p.payload;
}

exports.DecryptorType = A;

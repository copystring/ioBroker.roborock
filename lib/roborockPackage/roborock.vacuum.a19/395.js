exports.parseDataTypes = A;

exports.decryptRobotData = function (t, o) {
  var n = base64js.toByteArray(t);
  if ((console.warn('dataBytes len:' + n.length), !n || n.length < 184)) return void o(false, 'data decrypt failed');
  var p = n.slice(56, O);
  console.warn('hdr len:' + module394(n, 16, 2));
  console.warn('128 key:' + JSON.stringify(p));
  console.warn('getPrivateKey:' + module390.MC.rsaKey.pri);
  var c = module396.decryptBytesWithPrivateKey(p, module390.MC.rsaKey.pri);
  if ((console.warn('aesKeyArray:' + c), !c || c.length < 32)) return void o(false, 'data decrypt failed');
  var u = module396.decryptBytesWithAesKey(n.slice(O), c.slice(16), c.slice(0, 16)),
    s = module401.inflate(u);
  if (!s || s.length < 1) return void o(false, 'data decrypt failed');
  var h = A(s),
    w = base64js.fromByteArray(h.photoData.data.slice(h.photoData.offset, h.photoData.offset + h.photoData.length));
  h.photoData = 'data:image/png;base64,' + w;
  if (n && c && u && s && w) o(true, h);
  else o(false, 'data decrypt failed');
};

var module22 = require('./22'),
  module21 = require('./21'),
  base64js = c(require('base64-js')),
  module396 = c(require('./396')),
  module390 = c(require('./390'));

function p(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (p = function (t) {
    return t ? n : o;
  })(t);
}

function c(t, o) {
  if (!o && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var n = p(o);
  if (n && n.has(t)) return n.get(t);
  var f = {},
    l = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var y in t)
    if ('default' !== y && Object.prototype.hasOwnProperty.call(t, y)) {
      var c = l ? Object.getOwnPropertyDescriptor(t, y) : null;
      if (c && (c.get || c.set)) Object.defineProperty(f, y, c);
      else f[y] = t[y];
    }

  f.default = t;
  if (n) n.set(t, f);
  return f;
}

function u(t, o) {
  var n = ('undefined' != typeof Symbol && t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) || t['@@iterator'];
  if (n) return (n = n.call(t)).next.bind(n);

  if (Array.isArray(t) || (n = s(t)) || (o && t && 'number' == typeof t.length)) {
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

  for (var n = 0, f = new Array(o); n < o; n++) f[n] = t[n];

  return f;
}

var module394 = require('./394').BytesToInt,
  module401 = require('./401'),
  w = {
    type: 2,
    header: 2,
    payload: 4,
  },
  O = 184,
  j = {
    1: {
      type: 'photoSize',
      header: [],
      payload: function (t, o) {
        var f = {
          width: module394(o.data, o.offset, 2),
          height: module394(o.data, o.offset + 2, 2),
        };
        if (undefined !== f.width && undefined !== f.height) module21.default(t, f);
      },
    },
    2: {
      type: 'rectInfo',
      header: [],
      payload: function (t, o) {
        var f = {
          x0: module394(o.data, o.offset, 2),
          y0: module394(o.data, o.offset + 2, 2),
          x1: module394(o.data, o.offset + 4, 2),
          y1: module394(o.data, o.offset + 6, 2),
        };
        if (f.x0 || f.y0 || f.x1 || f.y1) module21.default(t, f);
      },
    },
    3: {
      type: 'photoData',
      header: [],
      payload: function (t, o) {
        module21.default(t, o);
      },
    },
  };

function A(t) {
  if (t && t.length) {
    var o = {};

    try {
      for (var n = 0; n < t.length; n += B(o, t, n));
    } catch (o) {
      console.log('TTTT parse - ' + o + ' data - ' + JSON.stringify(t));
    }

    return o;
  }
}

function B(t, n, f) {
  var l = module394(n, f, w.type),
    y = f + w.type,
    p = {
      header: module394(n, y, w.header),
      payload: module394(n, y + w.header, w.payload),
    };
  y += w.header + w.payload;
  f += p.header;
  var c = j[l];
  if (!c) return p.header + p.payload;
  if (!c.payload) return p.header + ((c.type && p.payload) || 0);
  var s = {};

  try {
    for (var h, b = u(c.header); !(h = b()).done; ) {
      var O = h.value,
        A = module22.default(O, 2),
        B = A[0],
        D = A[1];
      if (y >= f) break;
      s[B] = module394(n, y, D);
      y += D;
    }
  } catch (t) {
    console.log('BBBB - ' + t + '  header - ' + c.header + ' type - ' + l);
  }

  c.payload(s, {
    data: n,
    offset: f,
    length: p.payload,
  });
  if (Object.keys(s).length) t[c.type] = s;
  return p.header + p.payload;
}

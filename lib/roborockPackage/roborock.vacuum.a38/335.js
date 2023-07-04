var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module4 = require('./4'),
  module336 = require('./336'),
  module337 = require('./337');

function f(t, n) {
  var o;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
    if (Array.isArray(t) || (o = s(t)) || (n && t && 'number' == typeof t.length)) {
      if (o) t = o;
      var u = 0;
      return function () {
        return u >= t.length
          ? {
              done: true,
            }
          : {
              done: false,
              value: t[u++],
            };
      };
    }

    throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
  }

  return (o = t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']()).next.bind(o);
}

function s(t, n) {
  if (t) {
    if ('string' == typeof t) return y(t, n);
    var o = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === o && t.constructor) o = t.constructor.name;
    return 'Map' === o || 'Set' === o ? Array.from(t) : 'Arguments' === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? y(t, n) : undefined;
  }
}

function y(t, n) {
  if (null == n || n > t.length) n = t.length;

  for (var o = 0, u = new Array(n); o < n; o++) u[o] = t[o];

  return u;
}

var module40 = require('./40'),
  module154 = require('./154');

function v() {
  S.addFileSource('react_hierarchy.txt', function () {
    return require('./338')();
  });
}

var S = (function () {
  function t() {
    module4.default(this, t);
  }

  module5.default(t, null, [
    {
      key: '_maybeInit',
      value: function () {
        if (!t._subscription) {
          t._subscription = module40.addListener('collectBugExtraData', t.collectExtraData, null);
          v();
        }

        if (!t._redboxSubscription) t._redboxSubscription = module40.addListener('collectRedBoxExtraData', t.collectExtraData, null);
      },
    },
    {
      key: 'addSource',
      value: function (n, o) {
        return this._addSource(n, o, t._extraSources);
      },
    },
    {
      key: 'addFileSource',
      value: function (n, o) {
        return this._addSource(n, o, t._fileSources);
      },
    },
    {
      key: '_addSource',
      value: function (n, o, u) {
        t._maybeInit();

        if (u.has(n)) console.warn("BugReporting.add* called multiple times for same key '" + n + "'");
        u.set(n, o);
        return {
          remove: function () {
            u.delete(n);
          },
        };
      },
    },
    {
      key: 'collectExtraData',
      value: function () {
        for (var o, u = {}, s = f(t._extraSources); !(o = s()).done; ) {
          var y = o.value,
            b = module23.default(y, 2),
            v = b[0],
            S = b[1];
          u[v] = S();
        }

        for (var x, _ = {}, h = f(t._fileSources); !(x = h()).done; ) {
          var D = x.value,
            E = module23.default(D, 2),
            k = E[0],
            w = E[1];
          _[k] = w();
        }

        module154('BugReporting extraData:', u);
        if (null != module336.default && null != module336.default.setExtraData) module336.default.setExtraData(u, _);
        if (null != module337.default && null != module337.default.setExtraData) module337.default.setExtraData(u, 'From BugReporting.js');
        return {
          extras: u,
          files: _,
        };
      },
    },
  ]);
  return t;
})();

S._extraSources = new Map();
S._fileSources = new Map();
S._subscription = null;
S._redboxSubscription = null;
module.exports = S;

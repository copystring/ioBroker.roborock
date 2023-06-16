exports.default = function (t) {
  var p = (function (p) {
    module7.default(j, p);

    var y = j,
      v = s(),
      h = function () {
        var t,
          n = module11.default(y);

        if (v) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function j() {
      module4.default(this, j);
      return h.apply(this, arguments);
    }

    module5.default(j, [
      {
        key: 'render',
        value: function () {
          return React.createElement(t[this.props.route.key], this.props);
        },
      },
    ]);
    return j;
  })(React.PureComponent);

  return function (t) {
    var n = t.route,
      u = t.jumpTo,
      o = t.jumpToIndex;
    return React.createElement(p, {
      key: n.key,
      route: n,
      jumpTo: u,
      jumpToIndex: o,
    });
  };
};

var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var u = p(n);
    if (u && u.has(t)) return u.get(t);
    var o = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = f ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(o, c, l);
        else o[c] = t[c];
      }

    o.default = t;
    if (u) u.set(t, o);
    return o;
  })(require('react'));

function p(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    u = new WeakMap();
  return (p = function (t) {
    return t ? u : n;
  })(t);
}

function s() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

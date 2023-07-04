exports.default = function (t) {
  return function (n) {
    var u = n.route,
      o = n.jumpTo;
    return <h key={u.key} component={t[u.key]} route={u} jumpTo={o} />;
  };
};

var module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
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
    var u = y(n);
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
  })(require('react')),
  s = ['component'];

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    u = new WeakMap();
  return (y = function (t) {
    return t ? u : n;
  })(t);
}

function v() {
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

var h = (function (t) {
  module7.default(j, t);

  var y = j,
    h = v(),
    O = function () {
      var t,
        n = module11.default(y);

      if (h) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function j() {
    module4.default(this, j);
    return O.apply(this, arguments);
  }

  module5.default(j, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          u = t.component,
          o = module55.default(t, s);
        return <u />;
      },
    },
  ]);
  return j;
})(React.PureComponent);

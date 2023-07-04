var module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1071 = P(require('./1071')),
  module1078 = require('./1078'),
  module1096 = P(require('./1096')),
  module1082 = require('./1082');

function j(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (j = function (t) {
    return t ? o : n;
  })(t);
}

function P(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = j(n);
  if (o && o.has(t)) return o.get(t);
  var u = {},
    f = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var c in t)
    if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
      var l = f ? Object.getOwnPropertyDescriptor(t, c) : null;
      if (l && (l.get || l.set)) Object.defineProperty(u, c, l);
      else u[c] = t[c];
    }

  u.default = t;
  if (o) o.set(t, u);
  return u;
}

function w(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function S(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      w(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      w(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function N() {
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

var module1084 = (function (t, ...args) {
  module7.default(P, t);

  var module49 = P,
    module12 = N(),
    j = function () {
      var t,
        o = module11.default(module49);

      if (module12) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function P() {
    var t;
    module4.default(this, P);

    (t = j.call(this, ...args)).setNativeProps = function (n) {
      var u = !n.matrix && module1078.default(n);
      if (u) n.matrix = u;
      var f = module1071.propsAndStyles(n);
      module21.default(f, module1082.pickNotNil(module1096.default(f, false)));
      t.root.setNativeProps(f);
    };

    return t;
  }

  module5.default(P, [
    {
      key: 'render',
      value: function () {
        var t = module1071.propsAndStyles(this.props),
          n = module1071.default(
            S(
              S({}, t),
              {},
              {
                x: null,
                y: null,
              }
            ),
            this
          );
        module21.default(n, module1096.default(t, false));
        n.ref = this.refMethod;
        return React.default.createElement(D, n);
      },
    },
  ]);
  return P;
})(require('./1084').default);

exports.default = module1084;
module1084.displayName = 'TSpan';
module1096.setTSpan(module1084);
var D = module12.requireNativeComponent('RNSVGTSpan');

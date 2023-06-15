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
    var o = s(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = f ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(u, l, c);
        else u[l] = t[l];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module925 = require('./925');

function s(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (s = function (t) {
    return t ? o : n;
  })(t);
}

function y() {
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

var module932 = (function (t) {
  module7.default(O, t);

  var s = O,
    module932 = y(),
    v = function () {
      var t,
        n = module11.default(s);

      if (module932) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function O() {
    module4.default(this, O);
    return v.apply(this, arguments);
  }

  module5.default(O, [
    {
      key: 'render',
      value: function () {
        var t = this;
        return React.default.createElement(module925.default, {
          ref: function (n) {
            t.lottieView = n;
          },
          style: [
            {
              width: this.props.itemSize,
              height: this.props.itemSize,
            },
            this.props.style,
          ],
          source: require('./932'),
          loop: true,
        });
      },
    },
    {
      key: 'componentDidMount',
      value: function () {
        var t;
        if (!(null == (t = this.lottieView))) t.play();
      },
    },
  ]);
  return O;
})(React.default.Component);

module932.defaultProps = {
  itemSize: 60,
};
module.exports = module932;

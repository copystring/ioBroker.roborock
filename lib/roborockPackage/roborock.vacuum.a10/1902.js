require('./1897');

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
    var o = h(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var l = f ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, s, l);
        else u[s] = t[s];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module1903 = require('./1903');

function h(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (h = function (t) {
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

var v = (function (t) {
  module7.default(b, t);

  var h = b,
    v = y(),
    P = function () {
      var t,
        n = module11.default(h);

      if (v) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function b(t) {
    var o;
    module4.default(this, b);

    (o = P.call(this, t))._onPress = function () {
      o.props.onPressItem(o.props.item, o.props.index);
    };

    return o;
  }

  module5.default(b, [
    {
      key: 'render',
      value: function () {
        this.props.index;
        return this.props.item.visible
          ? React.default.createElement(module1903.default, {
              hasTopSeparator: this.props.item.hasTopSeparator,
              onPress: this._onPress,
              name: this.props.item.name,
              accessibilityLabelKey: 'guideNormalItemView_' + this.props.index,
              guideUrl: this.props.item.guideUrl,
              shortSeparator: this.props.item.short_separator,
            })
          : React.default.createElement(module12.View, null);
      },
    },
  ]);
  return b;
})(React.default.PureComponent);

exports.default = v;

var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
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
    var o = b(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = s ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, u, c);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  PropTypes = require('prop-types'),
  module12 = require('./12'),
  v = ['style', 'pressOpacity', 'pressColor', 'borderless'];

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : n;
  })(t);
}

function P() {
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

var O = (function (t, ...args) {
  module7.default(_, t);

  var PropTypes = _,
    b = P(),
    O = function () {
      var t,
        n = module11.default(PropTypes);

      if (b) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function _() {
    var t;
    module4.default(this, _);

    (t = O.call(this, ...args))._handlePress = function () {
      globals.requestAnimationFrame(t.props.onPress);
    };

    return t;
  }

  module5.default(_, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          l = t.style,
          s = t.pressOpacity,
          u = t.pressColor,
          c = t.borderless,
          f = module55.default(t, v);
        return 'android' === module12.Platform.OS && module12.Platform.Version >= 21 ? (
          <module12.TouchableNativeFeedback>
            <module12.View style={l}>{React.Children.only(this.props.children)}</module12.View>
          </module12.TouchableNativeFeedback>
        ) : (
          <module12.TouchableOpacity>{this.props.children}</module12.TouchableOpacity>
        );
      },
    },
  ]);
  return _;
})(React.Component);

exports.default = O;
O.propTypes = {
  onPress: PropTypes.default.func.isRequired,
  delayPressIn: PropTypes.default.number,
  borderless: PropTypes.default.bool,
  pressColor: PropTypes.default.string,
  pressOpacity: PropTypes.default.number,
  children: PropTypes.default.node.isRequired,
};
O.defaultProps = {
  pressColor: 'rgba(255, 255, 255, .4)',
};

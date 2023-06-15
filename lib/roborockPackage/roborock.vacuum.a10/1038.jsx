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
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, f, c);
        else l[f] = t[f];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  PropTypes = require('prop-types'),
  module12 = require('./12'),
  h = ['style', 'pressOpacity', 'pressColor', 'borderless'];

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function O() {
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

var P = (function (t) {
  module7.default(R, t);

  var PropTypes = R,
    v = O(),
    P = function () {
      var t,
        n = module11.default(PropTypes);

      if (v) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function R() {
    module4.default(this, R);
    return P.apply(this, arguments);
  }

  module5.default(R, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          l = t.style,
          u = t.pressOpacity,
          f = t.pressColor,
          c = t.borderless,
          s = module55.default(t, h);
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
  return R;
})(React.Component);

exports.default = P;
P.propTypes = {
  onPress: PropTypes.default.func.isRequired,
  delayPressIn: PropTypes.default.number,
  borderless: PropTypes.default.bool,
  pressColor: PropTypes.default.string,
  pressOpacity: PropTypes.default.number,
  children: PropTypes.default.node.isRequired,
};
P.defaultProps = {
  pressColor: 'rgba(255, 255, 255, .4)',
};

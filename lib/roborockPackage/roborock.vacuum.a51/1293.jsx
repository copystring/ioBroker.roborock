var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module13 = require('./13');

function b() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var P = (function (t, ...args) {
  module9.default(R, t);

  var s = R,
    PropTypes = b(),
    P = function () {
      var t,
        n = module12.default(s);

      if (PropTypes) {
        var l = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function R() {
    var t;
    module6.default(this, R);

    (t = P.call(this, ...args))._handlePress = function () {
      globals.requestAnimationFrame(t.props.onPress);
    };

    return t;
  }

  module7.default(R, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          s = t.style,
          o = t.pressOpacity,
          u = t.pressColor,
          c = t.borderless,
          f = module56.default(t, ['style', 'pressOpacity', 'pressColor', 'borderless']);
        return 'android' === module13.Platform.OS && module13.Platform.Version >= 21 ? (
          <module13.TouchableNativeFeedback>
            <module13.View style={s}>{React.Children.only(this.props.children)}</module13.View>
          </module13.TouchableNativeFeedback>
        ) : (
          <module13.TouchableOpacity>{this.props.children}</module13.TouchableOpacity>
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

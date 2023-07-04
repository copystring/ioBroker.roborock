var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module13 = require('./13');

function v() {
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

var R = (function (t) {
  module9.default(O, t);

  var l = O,
    PropTypes = v(),
    R = function () {
      var t,
        n = module12.default(l);

      if (PropTypes) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function O() {
    module6.default(this, O);
    return R.apply(this, arguments);
  }

  module7.default(O, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          l = t.style,
          s = t.pressOpacity,
          u = t.pressColor,
          c = t.borderless,
          f = module56.default(t, ['style', 'pressOpacity', 'pressColor', 'borderless']);
        return 'android' === module13.Platform.OS && module13.Platform.Version >= 21 ? (
          <module13.TouchableNativeFeedback>
            <module13.View style={l}>{React.Children.only(this.props.children)}</module13.View>
          </module13.TouchableNativeFeedback>
        ) : (
          <module13.TouchableOpacity>{this.props.children}</module13.TouchableOpacity>
        );
      },
    },
  ]);
  return O;
})(React.Component);

exports.default = R;
R.propTypes = {
  onPress: PropTypes.default.func.isRequired,
  delayPressIn: PropTypes.default.number,
  borderless: PropTypes.default.bool,
  pressColor: PropTypes.default.string,
  pressOpacity: PropTypes.default.number,
  children: PropTypes.default.node.isRequired,
};
R.defaultProps = {
  pressColor: 'rgba(255, 255, 255, .4)',
};

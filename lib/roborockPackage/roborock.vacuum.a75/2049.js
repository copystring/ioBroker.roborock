var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2050 = require('./2050');

function p() {
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

var module510 = require('./510').strings,
  _ = (function (t) {
    module9.default(C, t);

    var _ = C,
      k = p(),
      w = function () {
        var t,
          n = module12.default(_);

        if (k) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function C() {
      module6.default(this, C);
      return w.apply(this, arguments);
    }

    module7.default(C, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.activeControlViewIndex,
            o = t.onActiveControlViewChange;
          return React.default.createElement(
            module13.View,
            {
              style: v.topButtonView,
            },
            React.default.createElement(module2050.default, {
              accessibilityKey: 'remote_top_key',
              title: module510.remote_control_segment_key,
              checked: 0 == n,
              onPress: o,
              index: 0,
            }),
            React.default.createElement(module2050.default, {
              accessibilityKey: 'remote_top_joystick',
              title: module510.remote_control_segment_joystick,
              checked: 1 == n,
              onPress: o,
              index: 1,
            })
          );
        },
      },
    ]);
    return C;
  })(React.default.Component);

exports.default = _;
var v = module13.StyleSheet.create({
  topButtonView: {
    marginTop: 19,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 0,
    borderColor: 'transparent',
  },
});

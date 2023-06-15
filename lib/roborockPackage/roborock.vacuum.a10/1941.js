var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1942 = require('./1942');

function p() {
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

var module491 = require('./491').strings,
  v = (function (t) {
    module7.default(b, t);

    var v = b,
      k = p(),
      w = function () {
        var t,
          n = module11.default(v);

        if (k) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function b() {
      module4.default(this, b);
      return w.apply(this, arguments);
    }

    module5.default(b, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.activeControlViewIndex,
            o = t.onActiveControlViewChange;
          return React.default.createElement(
            module12.View,
            {
              style: _.topButtonView,
            },
            React.default.createElement(module1942.default, {
              accessibilityKey: 'remote_top_key',
              title: module491.remote_control_segment_key,
              checked: 0 == n,
              onPress: o,
              index: 0,
              style: {
                marginLeft: 83,
              },
            }),
            React.default.createElement(module1942.default, {
              accessibilityKey: 'remote_top_joystick',
              title: module491.remote_control_segment_joystick,
              checked: 1 == n,
              onPress: o,
              index: 1,
              style: {
                marginRight: 83,
              },
            })
          );
        },
      },
    ]);
    return b;
  })(React.default.Component);

exports.default = v;
module12.Dimensions.get('screen');

var _ = module12.StyleSheet.create({
  topButtonView: {
    marginTop: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: 'transparent',
  },
});

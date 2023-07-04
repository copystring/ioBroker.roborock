var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13');

function y() {
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

var p = (function (t) {
  module9.default(R, t);

  var p = R,
    v = y(),
    C = function () {
      var t,
        n = module12.default(p);

      if (v) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function R() {
    module6.default(this, R);
    return C.apply(this, arguments);
  }

  module7.default(R, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.route,
          o = t.activeOpacity,
          c = t.inactiveOpacity,
          u = t.activeTintColor,
          l = t.inactiveTintColor,
          y = t.renderIcon,
          p = t.horizontal,
          v = t.style;
        return React.default.createElement(
          module13.View,
          {
            style: v,
          },
          React.default.createElement(
            module13.Animated.View,
            {
              style: [
                h.icon,
                {
                  opacity: o,
                },
              ],
            },
            y({
              route: n,
              focused: true,
              horizontal: p,
              tintColor: u,
            })
          ),
          React.default.createElement(
            module13.Animated.View,
            {
              style: [
                h.icon,
                {
                  opacity: c,
                },
              ],
            },
            y({
              route: n,
              focused: false,
              horizontal: p,
              tintColor: l,
            })
          )
        );
      },
    },
  ]);
  return R;
})(React.default.Component);

exports.default = p;
var h = module13.StyleSheet.create({
  icon: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    minWidth: 25,
  },
});

var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

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

var h = (function (t) {
  module7.default(w, t);

  var h = w,
    R = y(),
    C = function () {
      var t,
        n = module11.default(h);

      if (R) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function w() {
    module4.default(this, w);
    return C.apply(this, arguments);
  }

  module5.default(w, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          o = t.position,
          u = t.scene,
          c = t.navigation,
          l = t.activeTintColor,
          f = t.inactiveTintColor,
          y = t.style,
          h = u.route,
          R = u.index,
          C = c.state.routes,
          w = [-1].concat(
            module31.default(
              C.map(function (t, n) {
                return n;
              })
            )
          ),
          x = o.interpolate({
            inputRange: w,
            outputRange: w.map(function (t) {
              return t === R ? 1 : 0;
            }),
          }),
          S = o.interpolate({
            inputRange: w,
            outputRange: w.map(function (t) {
              return t === R ? 0 : 1;
            }),
          });
        return React.default.createElement(
          module12.View,
          {
            style: y,
          },
          React.default.createElement(
            module12.Animated.View,
            {
              style: [
                v.icon,
                {
                  opacity: x,
                },
              ],
            },
            this.props.renderIcon({
              route: h,
              index: R,
              focused: true,
              tintColor: l,
            })
          ),
          React.default.createElement(
            module12.Animated.View,
            {
              style: [
                v.icon,
                {
                  opacity: S,
                },
              ],
            },
            this.props.renderIcon({
              route: h,
              index: R,
              focused: false,
              tintColor: f,
            })
          )
        );
      },
    },
  ]);
  return w;
})(React.default.PureComponent);

exports.default = h;
var v = module12.StyleSheet.create({
  icon: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    minWidth: 30,
  },
});

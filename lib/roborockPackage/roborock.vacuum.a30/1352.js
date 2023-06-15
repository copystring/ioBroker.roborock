var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

function f(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (o)
      c = c.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, c);
  }

  return n;
}

function y(t) {
  for (var n = 1; n < arguments.length; n++) {
    var c = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      f(Object(c), true).forEach(function (n) {
        module50.default(t, n, c[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      f(Object(c)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(c, o));
      });
  }

  return t;
}

function w() {
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

var O = (function (t) {
  module7.default(v, t);

  var module50 = v,
    f = w(),
    O = function () {
      var t,
        n = module11.default(module50);

      if (f) {
        var c = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, c);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function v() {
    module4.default(this, v);
    return O.apply(this, arguments);
  }

  module5.default(v, [
    {
      key: 'render',
      value: function () {
        var t = this.props.tintColor
            ? {
                tintColor: this.props.tintColor,
              }
            : {},
          o = this.props.cleanModeSrc
            ? React.default.createElement(module12.Image, {
                source: this.props.cleanModeSrc,
                style: [
                  b.modeUnit,
                  t,
                  {
                    width: this.props.width,
                    height: this.props.height,
                  },
                ],
              })
            : React.default.createElement(module12.View, null),
          n = this.props.waterModeSrc
            ? React.default.createElement(module12.Image, {
                source: this.props.waterModeSrc,
                style: [
                  b.modeUnit,
                  t,
                  {
                    width: this.props.width,
                    height: this.props.height,
                  },
                ],
              })
            : React.default.createElement(module12.View, null),
          c = this.props.mopModeSrc
            ? React.default.createElement(module12.Image, {
                source: this.props.mopModeSrc,
                style: [
                  b.modeUnit,
                  t,
                  {
                    width: this.props.width,
                    height: this.props.height,
                  },
                ],
              })
            : React.default.createElement(module12.View, null);
        return React.default.createElement(
          module12.View,
          {
            style: [b.root, y({}, this.props.style)],
            onLayout: this.props.onLayout,
          },
          o,
          n,
          c
        );
      },
    },
  ]);
  return v;
})(React.default.Component);

exports.ModesView = O;
O.defaultProps = {
  width: 20,
  height: 20,
};
var b = module12.StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeUnit: {
    width: 20,
    height: 20,
  },
});

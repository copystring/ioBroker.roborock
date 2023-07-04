var module50 = require('./50'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

function O(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

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

var h = module12.NativeModules.RR3DMapViewManager,
  PropTypes = require('prop-types'),
  D = (function (t) {
    module7.default(O, t);

    var n = O,
      module50 = b(),
      v = function () {
        var t,
          u = module11.default(n);

        if (module50) {
          var c = module11.default(this).constructor;
          t = Reflect.construct(u, arguments, c);
        } else t = u.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var n;
      module4.default(this, O);
      (n = v.call(this, t)).state = {};
      return n;
    }

    module5.default(O, [
      {
        key: 'currentSDKAPILevel',
        value: function () {
          return h.VERSION;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            P,
            module22.default({}, this.props, {
              ref: function (n) {
                return (t.root = n);
              },
              style: [
                {
                  backgroundColor: '#E9ECF1',
                },
                this.props.style,
              ],
              data: this.props.data,
              isDarkMode: this.props.isDarkMode,
            })
          );
        },
      },
    ]);
    return O;
  })(React.Component);

exports.default = D;

D.propTypes = (function (t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      O(Object(u), true).forEach(function (n) {
        module50.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      O(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
})(
  {
    data: PropTypes.object,
    isDarkMode: PropTypes.bool,
  },
  module12.ViewPropTypes
);

var P = module12.requireNativeComponent('RR3DMapView', D);

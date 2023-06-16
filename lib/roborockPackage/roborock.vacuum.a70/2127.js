var module50 = require('./50'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13');

function h(t, n) {
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

function O() {
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

var b = module13.NativeModules.RRARMapScanViewManager,
  PropTypes = require('prop-types'),
  M = (function (t, ...args) {
    module9.default(h, t);

    var n = h,
      module50 = O(),
      v = function () {
        var t,
          u = module12.default(n);

        if (module50) {
          var c = module12.default(this).constructor;
          t = Reflect.construct(u, arguments, c);
        } else t = u.apply(this, arguments);

        return module11.default(this, t);
      };

    function h() {
      var t;
      module6.default(this, h);

      (t = v.call(this, ...args))._onGetFirstMesh = function (n) {
        if (t.props.onGetFirstMesh) t.props.onGetFirstMesh(n.nativeEvent);
      };

      return t;
    }

    module7.default(h, [
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
      {
        key: 'start',
        value: function () {
          b.start();
        },
      },
      {
        key: 'pause',
        value: function () {
          b.pause();
        },
      },
      {
        key: 'saveToFile',
        value: function (t) {
          return b.saveToFile(t);
        },
      },
      {
        key: 'currentSDKAPILevel',
        value: function () {
          return b.VERSION;
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
              style: [this.props.style],
              onGetFirstMesh: this._onGetFirstMesh,
            })
          );
        },
      },
    ]);
    return h;
  })(React.Component);

exports.default = M;

M.propTypes = (function (t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      h(Object(u), true).forEach(function (n) {
        module50.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      h(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
})(
  {
    onGetFirstMesh: PropTypes.func,
  },
  module13.ViewPropTypes
);

var P = module13.requireNativeComponent('RRARMapScanView', M);

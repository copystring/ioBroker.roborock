exports.default = function (t) {
  var n = module13.Dimensions.get('window'),
    D = n.width,
    L = n.height,
    O = (function (n, ...args) {
      module9.default(C, n);

      var module1311 = C,
        O = y(),
        R = function () {
          var t,
            n = module12.default(module1311);

          if (O) {
            var o = module12.default(this).constructor;
            t = Reflect.construct(n, arguments, o);
          } else t = n.apply(this, arguments);

          return module11.default(this, t);
        };

      function C() {
        var t;
        module6.default(this, C);
        (t = R.call(this, ...args)).state = {
          dimensions: {
            width: D,
            height: L,
          },
          isLandscape: w({
            width: D,
            height: L,
          }),
        };

        t.handleOrientationChange = function (n) {
          var o = n.window,
            u = w(o);
          t.setState({
            isLandscape: u,
          });
        };

        return t;
      }

      module7.default(C, [
        {
          key: 'componentDidMount',
          value: function () {
            module13.Dimensions.addEventListener('change', this.handleOrientationChange);
          },
        },
        {
          key: 'componentWillUnmount',
          value: function () {
            module13.Dimensions.removeEventListener('change', this.handleOrientationChange);
          },
        },
        {
          key: 'render',
          value: function () {
            return <t />;
          },
        },
      ]);
      return C;
    })(React.Component);

  O.displayName = 'withDimensions(' + t.displayName + ')';
  return module1311.default(O, t);
};

var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1311 = require('./1311');

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

var w = function (t) {
  return t.width > t.height;
};

exports.isOrientationLandscape = w;

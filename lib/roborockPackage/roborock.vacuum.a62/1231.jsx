exports.default = function (t) {
  var n = module12.Dimensions.get('window'),
    D = n.width,
    L = n.height,
    O = (function (n, ...args) {
      module7.default(C, n);

      var module1232 = C,
        O = y(),
        R = function () {
          var t,
            n = module11.default(module1232);

          if (O) {
            var o = module11.default(this).constructor;
            t = Reflect.construct(n, arguments, o);
          } else t = n.apply(this, arguments);

          return module9.default(this, t);
        };

      function C() {
        var t;
        module4.default(this, C);
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

      module5.default(C, [
        {
          key: 'componentDidMount',
          value: function () {
            module12.Dimensions.addEventListener('change', this.handleOrientationChange);
          },
        },
        {
          key: 'componentWillUnmount',
          value: function () {
            module12.Dimensions.removeEventListener('change', this.handleOrientationChange);
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
  return module1232.default(O, t);
};

var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1232 = require('./1232');

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

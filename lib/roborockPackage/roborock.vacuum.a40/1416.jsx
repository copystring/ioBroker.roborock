exports.default = function (t) {
  var n = (function (n) {
    module7.default(w, n);

    var module1127 = w,
      L = y(),
      O = function () {
        var t,
          n = module11.default(module1127);

        if (L) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function w() {
      var t;
      module4.default(this, w);

      (t = O.call(this)).handleOrientationChange = function (n) {
        var o = n.window,
          u = D(o);
        t.setState({
          isLandscape: u,
        });
      };

      var n = D(module12.Dimensions.get('window'));
      t.state = {
        isLandscape: n,
      };
      return t;
    }

    module5.default(w, [
      {
        key: 'componentDidMount',
        value: function () {
          if ('function' == typeof module12.Dimensions.addEventListener) module12.Dimensions.addEventListener('change', this.handleOrientationChange);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if ('function' == typeof module12.Dimensions.removeEventListener) module12.Dimensions.removeEventListener('change', this.handleOrientationChange);
        },
      },
      {
        key: 'render',
        value: function () {
          return <t />;
        },
      },
    ]);
    return w;
  })(React.Component);

  return module1127.default(n, t);
};

var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1127 = require('./1127');

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

var D = function (t) {
  return t.width > t.height;
};

exports.isOrientationLandscape = D;

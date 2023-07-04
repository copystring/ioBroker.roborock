exports.default = function (t) {
  var n = (function (n) {
    module9.default(w, n);

    var module1310 = w,
      L = y(),
      O = function () {
        var t,
          n = module12.default(module1310);

        if (L) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function w() {
      var t;
      module6.default(this, w);

      (t = O.call(this)).handleOrientationChange = function (n) {
        var o = n.window,
          u = D(o);
        t.setState({
          isLandscape: u,
        });
      };

      var n = D(module13.Dimensions.get('window'));
      t.state = {
        isLandscape: n,
      };
      return t;
    }

    module7.default(w, [
      {
        key: 'componentDidMount',
        value: function () {
          if ('function' == typeof module13.Dimensions.addEventListener) module13.Dimensions.addEventListener('change', this.handleOrientationChange);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if ('function' == typeof module13.Dimensions.removeEventListener) module13.Dimensions.removeEventListener('change', this.handleOrientationChange);
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

  return module1310.default(n, t);
};

var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1310 = require('./1310');

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

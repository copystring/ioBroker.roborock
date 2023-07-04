exports.default = function (t) {
  var D = (function (v) {
    module9.default(w, v);

    var D = w,
      L = p(),
      O = function () {
        var t,
          n = module12.default(D);

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
          u = y(o);
        t.setState({
          isLandscape: u,
        });
      };

      var n = y(module13.Dimensions.get('window'));
      t.state = {
        isLandscape: n,
      };
      return t;
    }

    module7.default(w, [
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
          return React.default.createElement(t, module22.default({}, this.props, this.state));
        },
      },
    ]);
    return w;
  })(React.default.Component);

  return module1310.default(D, t);
};

var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1310 = require('./1310');

function p() {
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

var y = function (t) {
  return t.width > t.height;
};

exports.isOrientationLandscape = y;

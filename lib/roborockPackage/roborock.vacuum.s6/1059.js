exports.default = function (t) {
  var O = (function (v) {
    module7.default(R, v);

    var O = R,
      L = p(),
      w = function () {
        var t,
          n = module11.default(O);

        if (L) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R() {
      var t;
      module4.default(this, R);

      (t = w.call(this)).handleOrientationChange = function (n) {
        var o = n.window,
          u = y(o);
        t.setState({
          isLandscape: u,
        });
      };

      var n = y(module12.Dimensions.get('window'));
      t.state = {
        isLandscape: n,
      };
      return t;
    }

    module5.default(R, [
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
          return React.default.createElement(t, module21.default({}, this.props, this.state));
        },
      },
    ]);
    return R;
  })(React.default.Component);

  return module1034.default(O, t);
};

var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1034 = require('./1034');

function p() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var y = function (t) {
  return t.width > t.height;
};

exports.isOrientationLandscape = y;

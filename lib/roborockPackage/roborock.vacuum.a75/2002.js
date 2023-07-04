var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module2003 = require('./2003');

function h() {
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

require('./510').strings;
module13.Dimensions.get('window');

var module13 = require('./13'),
  v = module13.View,
  module1343 = require('./1343'),
  y = (function (t) {
    module9.default(_, t);

    var module13 = _,
      y = h(),
      R = function () {
        var t,
          n = module12.default(module13);

        if (y) {
          var u = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function _(t, u) {
      module6.default(this, _);
      return R.call(this, t);
    }

    module7.default(_, [
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            v,
            {
              style: {
                flex: 1,
                alignSelf: 'stretch',
              },
            },
            React.default.createElement(module2003.WebView, {
              style: {
                marginTop: module1343.NavigationBarHeight,
                width: window.width,
                height: window.height - 64,
              },
              source: {
                uri: this.props.url,
              },
            })
          );
        },
      },
    ]);
    return _;
  })(React.default.Component);

exports.default = y;

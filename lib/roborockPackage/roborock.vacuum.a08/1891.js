var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1892 = require('./1892');

function h() {
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

require('./491').strings;
module12.Dimensions.get('window');

var module12 = require('./12'),
  v = module12.View,
  module936 = require('./936'),
  y = (function (t) {
    module7.default(_, t);

    var module12 = _,
      y = h(),
      R = function () {
        var t,
          n = module11.default(module12);

        if (y) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function _(t, u) {
      module4.default(this, _);
      return R.call(this, t);
    }

    module5.default(_, [
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
            React.default.createElement(module1892.WebView, {
              style: {
                marginTop: module936.NavigationBarHeight,
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

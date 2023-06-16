var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13');

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

var module1952 = require('./1952'),
  module1337 = require('./1337'),
  p = 'http://m.mi.com/1/#/product/view?product_id=4347',
  w = 'http://buy.mi.com/tw/item/3170700018',
  C = (function (t) {
    module9.default(S, t);

    var C = S,
      _ = h(),
      R = function () {
        var t,
          n = module12.default(C);

        if (_) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function S(t, o) {
      var u;
      module6.default(this, S);
      (u = R.call(this, t)).state = {
        countryCode: 'cn',
      };
      return u;
    }

    module7.default(S, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.getCountryCode();
        },
      },
      {
        key: 'getCountryCode',
        value: function () {
          var t = this;
          module1952.getCountryInfo(function (n, o) {
            if (n)
              t.setState({
                countryCode: o.countryCode,
              });
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = p;
          if ('tw' == this.state.countryCode) t = w;
          return React.default.createElement(
            module13.View,
            {
              style: {
                flex: 1,
                alignSelf: 'stretch',
              },
            },
            React.default.createElement(module13.WebView, {
              style: {
                marginTop: module1337.NavigationBarHeight,
                width: window.width,
                height: window.height - 64,
              },
              source: {
                uri: t,
              },
            })
          );
        },
      },
    ]);
    return S;
  })(React.default.Component);

exports.default = C;

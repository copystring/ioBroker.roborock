var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

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

require('./500').strings;
module12.Dimensions.get('window');

var module1828 = require('./1828'),
  module1153 = require('./1153'),
  p = 'http://m.mi.com/1/#/product/view?product_id=4347',
  w = 'http://buy.mi.com/tw/item/3170700018',
  C = (function (t) {
    module7.default(S, t);

    var C = S,
      _ = h(),
      R = function () {
        var t,
          n = module11.default(C);

        if (_) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function S(t, o) {
      var u;
      module4.default(this, S);
      (u = R.call(this, t)).state = {
        countryCode: 'cn',
      };
      return u;
    }

    module5.default(S, [
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
          module1828.getCountryInfo(function (n, o) {
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
            module12.View,
            {
              style: {
                flex: 1,
                alignSelf: 'stretch',
              },
            },
            React.default.createElement(module12.WebView, {
              style: {
                marginTop: module1153.NavigationBarHeight,
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

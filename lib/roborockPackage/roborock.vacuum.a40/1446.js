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

var p = (function (t) {
  module7.default(x, t);

  var p = x,
    v = h(),
    S = function () {
      var t,
        n = module11.default(p);

      if (v) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function x() {
    module4.default(this, x);
    return S.apply(this, arguments);
  }

  module5.default(x, [
    {
      key: 'render',
      value: function () {
        var t = this.props.textContent && this.props.textContent.length > 0,
          n = React.default.createElement(
            module12.Text,
            {
              style: y.text,
            },
            this.props.textContent
          ),
          module1443 = React.default.createElement(module12.Image, {
            source: require('./1443'),
            style: y.image,
          });
        return React.default.createElement(
          module12.View,
          {
            style: [
              y.root,
              {
                backgroundColor: this.props.backgroundColor,
              },
            ],
            onLayout: this.props.onLayout,
          },
          t ? n : module1443
        );
      },
    },
  ]);
  return x;
})(React.default.Component);

exports.SelectSymbolView = p;
var y = module12.StyleSheet.create({
  root: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    color: 'white',
    includeFontPadding: false,
  },
  image: {
    width: 20,
    height: 20,
  },
});

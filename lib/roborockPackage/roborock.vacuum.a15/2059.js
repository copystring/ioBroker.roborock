var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module2060 = require('./2060'),
  module1885 = require('./1885'),
  module1121 = require('./1121');

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

var v = (function (t) {
  module7.default(x, t);

  var module1885 = x,
    module1121 = h(),
    v = function () {
      var t,
        n = module11.default(module1885);

      if (module1121) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function x() {
    module4.default(this, x);
    return v.apply(this, arguments);
  }

  module5.default(x, [
    {
      key: 'render',
      value: function () {
        var t = this;
        return React.default.createElement(
          module12.View,
          {
            style: {
              paddingHorizontal: 20,
            },
          },
          React.default.createElement(
            module12.Text,
            {
              style: [
                {
                  color: this.context.theme.mainTextColor,
                  fontSize: 18,
                  marginVertical: 10,
                  marginBottom: 15,
                  marginHorizontal: 2,
                },
                this.props.titleStyle,
              ],
            },
            this.props.data.name
          ),
          this.props.data.cards.map(function (n, o) {
            return React.default.createElement(module2060.default, {
              key: o,
              data: n,
              onPressCustomCommandAdd: function () {
                return t.props.onPressCustomCommandAddAtIndex(o);
              },
              onPressCustomCommandMore: function () {
                return t.props.onPressCustomCommandMoreAtIndex(o);
              },
              onPressRecommendCommandAdd: function () {
                return t.props.onPressRecommendCommandAddAtIndex(o);
              },
            });
          })
        );
      },
    },
  ]);
  return x;
})(React.default.Component);

exports.default = v;
v.contextType = module1121.AppConfigContext;
v.defaultProps = {
  data: new module1885.CommandListSectionData('', []),
  titleStyle: {
    fontSize: 18,
    flexDirection: globals.isRTL ? 'row' : 'row-reverse',
  },
};

var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2143 = require('./2143'),
  module1962 = require('./1962'),
  module1193 = require('./1193');

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
  module9.default(x, t);

  var module1962 = x,
    module1193 = h(),
    v = function () {
      var t,
        n = module12.default(module1962);

      if (module1193) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function x() {
    module6.default(this, x);
    return v.apply(this, arguments);
  }

  module7.default(x, [
    {
      key: 'render',
      value: function () {
        var t = this;
        return React.default.createElement(
          module13.View,
          {
            style: {
              paddingHorizontal: 20,
            },
          },
          React.default.createElement(
            module13.Text,
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
            return React.default.createElement(module2143.default, {
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
v.contextType = module1193.AppConfigContext;
v.defaultProps = {
  data: new module1962.CommandListSectionData('', []),
  titleStyle: {
    fontSize: 18,
    flexDirection: globals.isRTL ? 'row' : 'row-reverse',
  },
};

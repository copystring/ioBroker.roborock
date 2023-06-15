var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module391 = require('./391'),
  module1193 = require('./1193');

function x() {
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

var b = (function (t) {
  module9.default(v, t);

  var module1193 = v,
    b = x(),
    C = function () {
      var t,
        o = module12.default(module1193);

      if (b) {
        var n = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function v() {
    module6.default(this, v);
    return C.apply(this, arguments);
  }

  module7.default(v, [
    {
      key: 'render',
      value: function () {
        var t = this.context.theme,
          n = this.props,
          c = n.checked,
          u = n.onPress,
          l = n.index;
        return React.default.createElement(
          module13.TouchableOpacity,
          module22.default({}, module391.default.getAccessibilityLabel(this.props.accessibilityKey), {
            style: [
              T.topButton,
              c
                ? {
                    borderColor: t.remoteControl.tabBorderColor,
                    borderWidth: 1,
                  }
                : {},
              this.props.style,
            ],
            activeOpacity: 1,
            onPress: function () {
              return u(l);
            },
          }),
          this.renderTextView()
        );
      },
    },
    {
      key: 'renderTextView',
      value: function () {
        var t = [],
          o = module391.default.dispatchTitle(this.props.title, 10);
        t.push(
          React.default.createElement(
            module13.Text,
            {
              key: 1,
              numberOfLines: 1,
              style: [
                T.topButtonText,
                {
                  color: this.context.theme.remoteControl.tabTextTextColor,
                },
                this.props.checked ? T.topButtonTextChecked : {},
              ],
            },
            o[0]
          )
        );
        if (o.length >= 2)
          t.push(
            React.default.createElement(
              module13.Text,
              {
                key: 2,
                numberOfLines: 1,
                style: [
                  T.topButtonText,
                  {
                    color: this.context.theme.remoteControl.tabTextTextColor,
                  },
                  this.props.checked ? T.topButtonTextChecked : {},
                ],
              },
              o[1]
            )
          );
        return t;
      },
    },
  ]);
  return v;
})(React.default.Component);

exports.default = b;
b.contextType = module1193.AppConfigContext;
module13.Dimensions.get('screen');
var T = module13.StyleSheet.create({
  topButtonView: {
    marginTop: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  topButton: {
    borderRadius: 22,
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
    width: module391.default.isRemoteTopLong() ? 125 : 110,
  },
  topButtonText: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.75,
  },
  topButtonTextChecked: {
    fontWeight: 'bold',
    opacity: 0.9,
    fontSize: 12,
    color: '#3384ff',
  },
});

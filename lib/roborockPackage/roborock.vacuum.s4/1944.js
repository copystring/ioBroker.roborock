var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module387 = require('./387'),
  module506 = require('./506');

function x() {
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

var b = (function (t) {
  module7.default(v, t);

  var module506 = v,
    b = x(),
    C = function () {
      var t,
        o = module11.default(module506);

      if (b) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function v() {
    module4.default(this, v);
    return C.apply(this, arguments);
  }

  module5.default(v, [
    {
      key: 'render',
      value: function () {
        var t = this.context.theme,
          n = this.props,
          c = n.checked,
          l = n.onPress,
          u = n.index;
        return React.default.createElement(
          module12.TouchableOpacity,
          module21.default({}, module387.default.getAccessibilityLabel(this.props.accessibilityKey), {
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
              return l(u);
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
          o = module387.default.dispatchTitle(this.props.title, 10);
        t.push(
          React.default.createElement(
            module12.Text,
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
              module12.Text,
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
b.contextType = module506.AppConfigContext;
module12.Dimensions.get('screen');
var T = module12.StyleSheet.create({
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
    width: module387.default.isRemoteTopLong() ? 125 : 110,
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

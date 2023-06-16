var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module391 = require('./391'),
  module515 = require('./515');

function b() {
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

var x = (function (t) {
  module7.default(L, t);

  var o = L,
    module515 = b(),
    x = function () {
      var t,
        n = module11.default(o);

      if (module515) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function L(t) {
    var o;
    module4.default(this, L);
    (o = x.call(this, t)).state = {};
    return o;
  }

  module5.default(L, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this.context.theme,
          module1853 = this.props.isCleanFinished ? require('./1852') : require('./1853'),
          l = this.props,
          s = l.cleanTime,
          c = l.startType,
          u = l.bottomText,
          f = React.default.createElement(module12.Image, {
            style: [
              R.leftIcon,
              {
                marginLeft: 10,
              },
            ],
            source: module1853,
            resizeMode: 'contain',
          }),
          T = React.default.createElement(
            module12.View,
            {
              style: R.leftWrap,
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  R.cleanTime,
                  {
                    color: t.cleanHistory.titleColor,
                  },
                ],
              },
              s,
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    R.startType,
                    {
                      color: t.cleanHistory.subTitleColor,
                    },
                  ],
                },
                '  ' + c
              )
            ),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  R.bottomText,
                  {
                    color: t.cleanHistory.bottomTextColor,
                  },
                ],
              },
              u
            )
          ),
          b = React.default.createElement(
            module12.View,
            {
              style: R.rightWrap,
            },
            React.default.createElement(module12.Image, {
              style: R.arrow,
              source: t.cleanHistory.arrowImg,
            })
          );
        return React.default.createElement(
          module12.View,
          {
            style: R.outContainter,
          },
          React.default.createElement(
            module12.TouchableHighlight,
            module22.default(
              {
                style: {
                  borderRadius: 8,
                  marginBottom: this.props.isLast ? 15 : 0,
                },
                onPress: this.props.onPress,
                onLongPress: this.props.onLongPress,
                onShowUnderlay: this.props.onShowUnderlay,
                onHideUnderlay: this.props.onHideUnderlay,
              },
              module391.default.getAccessibilityLabel(this.props.accessibilityLabelKey)
            ),
            React.default.createElement(
              module12.View,
              {
                style: [
                  R.containter,
                  this.props.style,
                  {
                    backgroundColor: t.cleanHistory.backgroundColor,
                  },
                ],
              },
              globals.isRTL && b,
              globals.isRTL && T,
              globals.isRTL && f,
              !globals.isRTL && f,
              !globals.isRTL && T,
              !globals.isRTL && b
            )
          )
        );
      },
    },
  ]);
  return L;
})(React.Component);

exports.default = x;
x.contextType = module515.AppConfigContext;
var R = module12.StyleSheet.create({
  outContainter: {
    paddingHorizontal: 15,
    marginVertical: 7,
  },
  containter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 75,
    borderRadius: 8,
  },
  leftIcon: {
    width: 20,
    height: 20,
  },
  cleanTime: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  startType: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
  },
  bottomText: {
    marginTop: 5,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 12,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  rightText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 12,
    marginRight: 10,
  },
  arrow: {
    width: 10,
    height: 14,
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  leftWrap: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 15,
    marginLeft: 15,
  },
  rightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

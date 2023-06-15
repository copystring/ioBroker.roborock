var module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = P(o);
    if (n && n.has(t)) return n.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
        else s[u] = t[u];
      }

    s.default = t;
    if (n) n.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module1065 = require('./1065'),
  module506 = require('./506');

function P(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (P = function (t) {
    return t ? n : o;
  })(t);
}

function x(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (o)
      s = s.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, s);
  }

  return n;
}

function E(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      x(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      x(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
      });
  }

  return t;
}

function O() {
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

require('./389');

var module1362 = require('./1362'),
  S = module1362.Errors,
  j = (function (t) {
    module7.default(P, t);

    var module49 = P,
      module1065 = O(),
      v = function () {
        var t,
          n = module11.default(module49);

        if (module1065) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var o;
      module4.default(this, P);
      (o = v.call(this, t)).state = {};
      o.errs = Object.keys(S());
      o.currentTestErrorIndex = 1;
      o.isTestErrorMode = false;
      return o;
    }

    module5.default(P, [
      {
        key: 'startTestError',
        value: function () {
          this.isTestErrorMode = true;
          this.show(this.errs[this.currentTestErrorIndex]);
        },
      },
      {
        key: 'stopTestError',
        value: function () {
          this.currentTestErrorIndex = 1;
          this.isTestErrorMode = false;
          this.setState({
            title: null,
            desc: null,
          });
        },
      },
      {
        key: 'nextError',
        value: function () {
          this.currentTestErrorIndex = (this.currentTestErrorIndex + 1) % this.errs.length;
          this.show(this.errs[this.currentTestErrorIndex || 1]);
        },
      },
      {
        key: 'show',
        value: function (t) {
          var o = S()[t];
          this.testCode = t;
          this.setState({
            title: o[1],
            desc: o[2],
          });
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme,
            o = this.props,
            s = o.title,
            l = o.desc,
            u = o.onLayout;
          if (!this.isTestErrorMode && !s) return null;

          if (this.isTestErrorMode) {
            s = this.state.title;
            l = this.state.desc;
          }

          var c = 'reminder' == this.props.type || this.props.closeable ? t.popMsgBox.close : t.popMsgBox.rightArrow,
            f = React.default.createElement(module381.PureImageButton, {
              funcId: this.props.funcId,
              image: c,
              imageWidth: 24,
              imageHeight: 24,
              hitSlop: {
                top: 20,
                left: 30,
                bottom: 20,
                right: 15,
              },
              style: M.button,
              onPress: this._onPressRightButton.bind(this),
            }),
            w = this.props.shouldShowButton && f,
            module1374 = 'error' == this.props.type ? require('./1373') : require('./1374'),
            P =
              l.length > 0 &&
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    M.text2,
                    {
                      color: t.navSubtitleColor,
                    },
                  ],
                },
                l
              );
          return React.default.createElement(
            module12.TouchableWithoutFeedback,
            module21.default({}, module387.default.getAccessibilityLabel(this.props.accessibilityLabelKey), {
              onPress: this._onPressSelf.bind(this),
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  M.containter,
                  {
                    backgroundColor: t.componentBackgroundColor,
                  },
                ],
                onLayout: function (t) {
                  return u && u(t.nativeEvent.layout);
                },
              },
              React.default.createElement(
                module12.View,
                {
                  style: M.left,
                },
                React.default.createElement(module12.Image, {
                  source: module1374,
                  style: M.icon,
                }),
                React.default.createElement(
                  module12.View,
                  {
                    style: M.textWrap,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        M.text1,
                        {
                          color: t.navTitleColor,
                        },
                      ],
                    },
                    s
                  ),
                  P
                )
              ),
              w
            )
          );
        },
      },
      {
        key: '_onPressRightButton',
        value: function () {
          if (this.isTestErrorMode) this.nextError();
          else if ('reminder' == this.props.type || this.props.closeable) {
            if (this.props.onPressCloseButton) this.props.onPressCloseButton();
          } else this._onPressSelf();
        },
      },
      {
        key: '_onPressSelf',
        value: function () {
          if (this.props.onPress) this.props.onPress(this.testCode);
        },
      },
    ]);
    return P;
  })(React.Component);

exports.PopMsgBoxView = j;
j.defaultProps = {
  shouldShowButton: true,
  type: 'error',
};
j.contextType = module506.AppConfigContext;
var M = module12.StyleSheet.create({
    containter: {
      paddingLeft: 15,
      paddingVertical: 10,
      flexDirection: globals.isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      alignItems: 'center',
      width: module12.Dimensions.get('window').width - 2 * module1065.HorizontalMargin,
      borderRadius: 10,
    },
    icon: {
      width: 30,
      height: 30,
    },
    left: {
      flexDirection: globals.isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      flex: 0.7,
    },
    textWrap: {
      marginLeft: 15,
      marginRight: 15,
      flexDirection: 'column',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    text1: {
      fontSize: module387.default.scaledPixelForPad(13),
      width: 230,
      lineHeight: 17,
      color: 'rgba(0,0,0,0.7)',
      textAlign: globals.isRTL ? 'right' : 'left',
    },
    text2: {
      marginTop: 3,
      fontSize: module387.default.scaledPixelForPad(11),
      lineHeight: 14,
      width: 230,
      color: 'rgba(0,0,0,0.4)',
      textAlign: globals.isRTL ? 'right' : 'left',
    },
    button: {
      marginRight: 15,
      marginLeft: 15,
      width: 24,
      height: 24,
      transform: [
        {
          rotateY: globals.isRTL ? '180deg' : '0deg',
        },
      ],
    },
  }),
  B = E(
    E({}, module1065.BaseShadow),
    {},
    {
      radius: 10,
      style: {
        alignSelf: 'flex-start',
        marginLeft: module1065.HorizontalMargin,
        marginBottom: 9,
      },
    }
  ),
  k = (ShadowPopMsgBoxView = module381.WithAutoLayoutShadow(j, B));
exports.default = k;

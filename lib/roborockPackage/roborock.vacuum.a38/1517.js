var module50 = require('./50'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module391 = require('./391'),
  module1159 = require('./1159'),
  module515 = require('./515');

function P(t, o) {
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
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      P(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      P(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
      });
  }

  return t;
}

function T() {
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

require('./393');

var module1507 = require('./1507'),
  O = module1507.Errors,
  R = (function (t) {
    module7.default(P, t);

    var o = P,
      module50 = T(),
      v = function () {
        var t,
          s = module11.default(o);

        if (module50) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, l);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var o;
      module4.default(this, P);
      (o = v.call(this, t)).state = {};
      o.errs = Object.keys(O());
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
          var o = O()[t];
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
            n = o.title,
            l = o.desc,
            c = o.onLayout;
          if (!this.isTestErrorMode && !n) return null;

          if (this.isTestErrorMode) {
            n = this.state.title;
            l = this.state.desc;
          }

          var u = 'reminder' == this.props.type || this.props.closeable ? t.popMsgBox.close : t.popMsgBox.rightArrow,
            h = React.default.createElement(module385.PureImageButton, {
              funcId: this.props.funcId,
              image: u,
              imageWidth: 24,
              imageHeight: 24,
              hitSlop: {
                top: 20,
                left: 30,
                bottom: 20,
                right: 15,
              },
              style: j.button,
              onPress: this._onPressRightButton.bind(this),
            }),
            f = this.props.shouldShowButton && h,
            module1519 = this.props.leftIcon || ('error' == this.props.type ? require('./1518') : require('./1519')),
            P =
              l.length > 0 &&
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    j.text2,
                    {
                      color: t.navSubtitleColor,
                    },
                  ],
                },
                l
              );
          return React.default.createElement(
            module12.TouchableWithoutFeedback,
            module22.default({}, module391.default.getAccessibilityLabel(this.props.accessibilityLabelKey), {
              onPress: this._onPressSelf.bind(this),
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  j.containter,
                  {
                    backgroundColor: t.componentBackgroundColor,
                    width: module12.Dimensions.get('window').width - 2 * module1159.HorizontalMargin,
                  },
                ],
                onLayout: function (t) {
                  return c && c(t.nativeEvent.layout);
                },
              },
              React.default.createElement(
                module12.View,
                {
                  style: j.left,
                },
                React.default.createElement(module12.Image, {
                  source: module1519,
                  style: j.icon,
                }),
                React.default.createElement(
                  module12.View,
                  {
                    style: j.textWrap,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        j.text1,
                        {
                          color: t.navTitleColor,
                        },
                      ],
                    },
                    n
                  ),
                  P
                )
              ),
              f
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

exports.PopMsgBoxView = R;
R.defaultProps = {
  shouldShowButton: true,
  type: 'error',
};
R.contextType = module515.AppConfigContext;
var j = module12.StyleSheet.create({
    containter: {
      paddingLeft: 15,
      paddingVertical: 10,
      flexDirection: globals.isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      alignItems: 'center',
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
      fontSize: module391.default.scaledPixelForPad(13),
      width: 230,
      lineHeight: 17,
      color: 'rgba(0,0,0,0.7)',
      textAlign: globals.isRTL ? 'right' : 'left',
    },
    text2: {
      marginTop: 3,
      fontSize: module391.default.scaledPixelForPad(11),
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
    E({}, module1159.BaseShadow),
    {},
    {
      radius: 10,
      style: {
        alignSelf: 'flex-start',
        marginLeft: module1159.HorizontalMargin,
        marginBottom: 9,
      },
    }
  ),
  M = (ShadowPopMsgBoxView = module385.WithAutoLayoutShadow(R, B));
exports.default = M;

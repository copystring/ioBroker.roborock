var module21 = require('./21'),
  module49 = require('./49'),
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
    var n = T(o);
    if (n && n.has(t)) return n.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = s ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(l, c, f);
        else l[c] = t[c];
      }

    l.default = t;
    if (n) n.set(t, l);
    return l;
  })(require('react')),
  module387 = require('./387'),
  module12 = require('./12'),
  module505 = require('./505'),
  module383 = require('./383'),
  module506 = require('./506');

function T(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (T = function (t) {
    return t ? n : o;
  })(t);
}

function R(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (o)
      l = l.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, l);
  }

  return n;
}

function C(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      R(Object(l), true).forEach(function (o) {
        module49.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      R(Object(l)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(l, o));
      });
  }

  return t;
}

function S() {
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

var module491 = require('./491').strings,
  O = (function (t) {
    module7.default(O, t);

    var module49 = O,
      T = S(),
      R = function () {
        var t,
          o = module11.default(module49);

        if (T) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var o;
      module4.default(this, O);

      (o = R.call(this, t))._onTextLayout = function (t) {
        var n = t.nativeEvent.layout.height;
        if (o.props.rightCenter)
          o.setState({
            rightHeight: n,
          });
      };

      o._onLeftLayout = function (t) {
        var n = t.nativeEvent.layout.height;
        if (!o.props.rightCenter)
          o.setState({
            rightHeight: n,
          });
      };

      o.state = {
        rightHeight: -1,
      };
      return o;
    }

    module5.default(O, [
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(module506.AppConfigContext.Consumer, null, function (n) {
            var l = t.props,
              s = l.detail,
              c = l.selected,
              f = l.detailWidth,
              u = l.detailColor,
              b = l.bottomDetail,
              T = l.bottomDetailWidth,
              R = l.hasTitle,
              S = l.isSwitchCenter,
              O = l.shouldShowRightArrow,
              P = l.shouldShowSwitch,
              j = l.shouldShowRedPoint,
              D = l.shouldShowBottomLine,
              E = l.shouldShowBottomLongLine,
              I = l.shouldShowTopLine,
              V = l.shouldShowTopLongLine,
              _ = l.paddingLeft,
              k = l.paddingRight,
              A = l.isDetailCenter,
              W = l.bottomDetailLineHeight,
              M = l.bottomDetailTop,
              z = l.titleArrowOpacity,
              H = l.funcId,
              B = l.shouldShowTitleLine,
              N = l.rightCenter,
              Y = l.switchMarginTop,
              q = l.titleStyle,
              F = l.toggleSwitchOffColor,
              G = l.bottomLineStyle,
              J = l.isLineMarginRight,
              K = l.underlayColor,
              Q = l.enabled,
              U = undefined === Q || Q,
              X = n.theme.settingListItem;
            titleColor = c ? X.selectedTitleColor : X.titleColor;
            u = u || X.detailColor;
            if (!S && !T) T = module12.Dimensions.get('window').width - 40;
            var Z =
                s &&
                !P &&
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      x.detail,
                      {
                        color: u,
                        alignSelf: A || N ? 'center' : 'flex-start',
                      },
                      f
                        ? {
                            width: f,
                          }
                        : {},
                    ],
                    numberOfLines: t.props.detailTextNumberOfLines || 1,
                  },
                  s
                ),
              $ =
                b &&
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      x.bottomDetail,
                      {
                        marginTop: M || 12 + (!S && P ? 6 : 0),
                      },
                      T
                        ? {
                            width: T,
                          }
                        : {},
                      W
                        ? {
                            lineHeight: W,
                          }
                        : {},
                    ],
                  },
                  b + '  '
                ),
              ee =
                j &&
                React.default.createElement(module12.View, {
                  style: x.redPoint,
                }),
              te = t.props.rightSrc || X.rightArrowImg,
              ie =
                O &&
                !P &&
                React.default.createElement(module12.Image, {
                  source: te,
                  style: [
                    {
                      transform: [
                        {
                          rotateY: globals.isRTL ? '180deg' : '0deg',
                        },
                      ],
                      width: t.props.iconSize || 24,
                      height: t.props.iconSize || 24,
                      resizeMode: 'contain',
                      alignSelf: A || N ? 'center' : 'flex-start',
                      opacity: z || 1,
                    },
                    t.props.rightImgStyle,
                  ],
                }),
              oe = H || 'time_key_' + new Date().getTime(),
              ne =
                P &&
                React.default.createElement(module505.default, {
                  funcId: oe + '_switch',
                  onToggle: t.props.switchValueChanged,
                  isOn: t.props.switchOn || false,
                  offColor: F,
                  style: {
                    alignSelf: S ? 'center' : 'flex-start',
                    marginTop: S ? 0 : Y,
                    marginRight: globals.isRTL ? 0 : 5,
                    marginLeft: globals.isRTL ? 5 : 0,
                  },
                }),
              re = module12.Dimensions.get('window').width,
              le =
                (I || V) &&
                React.default.createElement(module12.View, {
                  style: [
                    x.topLine,
                    {
                      marginLeft: V ? 0 : 20,
                      width: V ? re : re - 40,
                      backgroundColor: X.borderColor,
                    },
                  ],
                }),
              ae =
                (D || E) &&
                React.default.createElement(module12.View, {
                  style: [
                    x.bottomLine,
                    {
                      marginLeft: E ? 0 : 20,
                      width: E ? re : J ? re - 40 : re - 20,
                      backgroundColor: X.borderColor,
                    },
                    G,
                  ],
                }),
              se =
                t.props.leftIcon &&
                React.default.createElement(module12.Image, {
                  source: t.props.leftIcon,
                  style: {
                    marginLeft: 20,
                    width: 25,
                    height: 25,
                    alignSelf: 'center',
                  },
                });
            _ = t.props.leftIcon ? 10 : t.props.paddingLeft;
            var ce =
                B &&
                React.default.createElement(module12.View, {
                  style: [
                    x.titleLine,
                    {
                      marginTop: 12 + (!S && P ? 6 : 0),
                    },
                    globals.isRTL
                      ? {
                          marginRight: -_ || -20,
                        }
                      : {
                          marginLeft: -_ || -20,
                        },
                  ],
                }),
              de = React.default.createElement(
                module12.View,
                {
                  onLayout: t._onLeftLayout,
                  style: [
                    x.left,
                    {
                      paddingLeft: _ || 20,
                    },
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      justifyContent: 'center',
                      alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
                    },
                  },
                  R &&
                    React.default.createElement(
                      module12.View,
                      {
                        onLayout: t._onTextLayout,
                        style: {
                          justifyContent: 'center',
                          alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
                        },
                      },
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            x.title,
                            C(
                              {
                                fontSize: t.props.fontSize || 16,
                                color: titleColor,
                                maxWidth: t.props.titleWidth || re - 100,
                                opacity: z || 1,
                              },
                              q
                            ),
                          ],
                        },
                        t.props.title
                      )
                    ),
                  ce,
                  $
                )
              ),
              fe = React.default.createElement(
                module12.View,
                {
                  style: [
                    x.right,
                    {
                      justifyContent: globals.isRTL ? 'flex-start' : 'flex-end',
                      paddingLeft: globals.isRTL ? k || 22 : 0,
                      paddingRight: globals.isRTL ? 0 : k || 14,
                      height: t.state.rightHeight,
                    },
                  ],
                },
                globals.isRTL && ne,
                globals.isRTL && ie,
                globals.isRTL && ee,
                globals.isRTL && Z,
                !globals.isRTL && Z,
                !globals.isRTL && ee,
                !globals.isRTL && ie,
                !globals.isRTL && ne
              ),
              ue = P
                ? {
                    underlayColor: 'transparent',
                  }
                : K
                ? {
                    underlayColor: K,
                  }
                : {};
            return React.default.createElement(
              module12.TouchableHighlight,
              module21.default(
                {
                  activeOpacity: P || !U ? 1 : 0.95,
                  accessible: !P,
                },
                ue,
                module387.default.getAccessibilityLabel(oe),
                {
                  onPress: function () {
                    if (U) {
                      if (t.props.onPress) t.props.onPress();
                      if (t.props.eventName) module383.LogEventStat(t.props.eventName);
                      if (t.props.funcId) module383.LogEventCommon(H);
                    }
                  },
                  onLongPress: function () {
                    if (t.props.onLongPress) t.props.onLongPress();
                  },
                  style: [
                    t.props.touchStyle,
                    {
                      overflow: 'hidden',
                    },
                  ],
                }
              ),
              React.default.createElement(
                module12.View,
                {
                  style: [
                    x.outterWrap,
                    {
                      backgroundColor: X.backgroundColor,
                      opacity: U ? 1 : 0.9,
                    },
                    t.props.style,
                  ],
                  accessible: true,
                  onAccessibilityTap: function () {
                    if (!(null == t.props.switchValueChanged)) t.props.switchValueChanged(!t.props.switchOn);
                  },
                  accessibilityLabel:
                    (t.props.title ? t.props.title : '') +
                    (t.props.bottomDetail ? t.props.bottomDetail : '') +
                    (t.props.detail ? t.props.detail : '') +
                    (P ? (t.props.switchOn ? module491.accessibility_on : module491.debug_info_close) : ''),
                },
                le,
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      x.innerWrap,
                      {
                        paddingVertical: t.props.innterVPadding || 20,
                      },
                    ],
                  },
                  globals.isRTL && fe,
                  globals.isRTL && de,
                  globals.isRTL && se,
                  !globals.isRTL && se,
                  !globals.isRTL && de,
                  !globals.isRTL && fe
                ),
                ae
              )
            );
          });
        },
      },
    ]);
    return O;
  })(React.Component);

exports.default = O;
O.defaultProps = {
  shouldShowBottomLine: true,
  shouldShowRightArrow: true,
  shouldShowSwitch: false,
  title: '\u6807\u9898',
  switchOn: false,
  shouldShowRedPoint: false,
  leftIcon: null,
  hasTitle: true,
  isSwitchCenter: false,
  isDetailCenter: true,
  switchMarginTop: -5,
  isLineMarginRight: false,
};
var x = module12.StyleSheet.create({
  outterWrap: {
    backgroundColor: 'white',
  },
  innerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  left: {
    flex: 6,
    alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
    justifyContent: 'center',
    paddingRight: 20,
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 16,
    alignItems: 'center',
    flex: 2,
    zIndex: 999,
  },
  redPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  title: {
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  detail: {
    fontSize: 14,
    textAlign: globals.isRTL ? 'left' : 'right',
    color: 'rgba(0,0,0,0.3)',
    marginRight: 3,
  },
  bottomDetail: {
    fontSize: 14,
    lineHeight: (module387.default.isRRAndroid(), 21),
    color: '#a5a5a5',
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  topLine: {
    position: 'absolute',
    width: module12.Dimensions.get('window').width,
    left: 0,
    top: 0,
    height: 0.8,
  },
  bottomLine: {
    position: 'absolute',
    width: module12.Dimensions.get('window').width,
    left: 0,
    bottom: 0,
    height: 0.8,
  },
  titleLine: {
    width: module12.Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 0.8,
  },
});

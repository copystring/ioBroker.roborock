var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module391 = require('./391'),
  module13 = require('./13'),
  module1487 = require('./1487'),
  module387 = require('./387'),
  module1193 = require('./1193');

function T(t, o) {
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
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      T(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      T(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

function S() {
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

var module510 = require('./510').strings,
  x = (function (t) {
    module9.default(x, t);

    var o = x,
      module50 = S(),
      T = function () {
        var t,
          n = module12.default(o);

        if (module50) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function x(t) {
      var o;
      module6.default(this, x);

      (o = T.call(this, t))._onTextLayout = function (t) {
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

    module7.default(x, [
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(module1193.AppConfigContext.Consumer, null, function (o) {
            var l = t.props,
              s = l.detail,
              c = l.selected,
              f = l.detailWidth,
              u = l.detailColor,
              h = l.bottomDetail,
              R = l.bottomDetailWidth,
              T = l.hasTitle,
              S = l.isSwitchCenter,
              x = l.shouldShowRightArrow,
              E = l.shouldShowSwitch,
              D = l.shouldShowRedPoint,
              P = l.shouldShowBottomLine,
              I = l.shouldShowBottomLongLine,
              j = l.shouldShowTopLine,
              V = l.shouldShowTopLongLine,
              _ = l.paddingLeft,
              A = l.paddingRight,
              k = l.isDetailCenter,
              z = l.bottomDetailLineHeight,
              H = l.bottomDetailTop,
              W = l.titleArrowOpacity,
              M = l.funcId,
              B = l.shouldShowTitleLine,
              N = l.rightCenter,
              F = l.switchMarginTop,
              Y = l.titleStyle,
              q = l.toggleSwitchOffColor,
              G = l.bottomLineStyle,
              J = l.isLineMarginRight,
              K = l.underlayColor,
              Q = l.enabled,
              U = undefined === Q || Q,
              X = o.theme.settingListItem;
            titleColor = c ? X.selectedTitleColor : X.titleColor;
            u = u || X.detailColor;
            if (!S && !R) R = module13.Dimensions.get('window').width - 40;
            var Z =
                s &&
                !E &&
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      O.detail,
                      {
                        color: u,
                        alignSelf: k || N ? 'center' : 'flex-start',
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
              $ = h
                ? React.default.createElement(
                    module13.Text,
                    {
                      style: [
                        O.bottomDetail,
                        {
                          marginTop: H || 12 + (!S && E ? 6 : 0),
                        },
                        R
                          ? {
                              width: R,
                            }
                          : {},
                        z
                          ? {
                              lineHeight: z,
                            }
                          : {},
                      ],
                    },
                    h + '  '
                  )
                : React.default.createElement(React.default.Fragment, null),
              tt =
                D &&
                React.default.createElement(module13.View, {
                  style: O.redPoint,
                }),
              et = t.props.rightSrc || X.rightArrowImg,
              it =
                x &&
                !E &&
                React.default.createElement(module13.Image, {
                  source: et,
                  style: [
                    {
                      transform: [
                        {
                          rotateY: globals.isRTL && t.props.isRightImgRotate ? '180deg' : '0deg',
                        },
                      ],
                      width: t.props.iconSize || 24,
                      height: t.props.iconSize || 24,
                      resizeMode: 'contain',
                      alignSelf: k || N ? 'center' : 'flex-start',
                      opacity: W || 1,
                    },
                    t.props.rightImgStyle,
                  ],
                }),
              ot = M || 'time_key_' + new Date().getTime(),
              nt =
                E &&
                React.default.createElement(module1487.default, {
                  funcId: ot + '_switch',
                  onToggle: t.props.switchValueChanged,
                  isOn: t.props.switchOn || false,
                  offColor: q,
                  style: {
                    alignSelf: S ? 'center' : 'flex-start',
                    marginTop: S ? 0 : F,
                    marginRight: globals.isRTL ? 0 : 5,
                    marginLeft: globals.isRTL ? 5 : 0,
                  },
                }),
              rt = module13.Dimensions.get('window').width,
              lt =
                (j || V) &&
                React.default.createElement(module13.View, {
                  style: [
                    O.topLine,
                    {
                      marginLeft: V ? 0 : 20,
                      width: V ? rt : rt - 40,
                      backgroundColor: X.borderColor,
                    },
                  ],
                }),
              at =
                (P || I) &&
                React.default.createElement(module13.View, {
                  style: [
                    O.bottomLine,
                    {
                      marginLeft: I ? 0 : 20,
                      width: I ? rt : J ? rt - 40 : rt - 20,
                      backgroundColor: X.borderColor,
                    },
                    G,
                  ],
                }),
              st =
                t.props.leftIcon &&
                React.default.createElement(module13.Image, {
                  source: t.props.leftIcon,
                  style: {
                    marginLeft: 20,
                    width: 25,
                    height: 25,
                    alignSelf: 'center',
                  },
                });
            _ = t.props.leftIcon ? 10 : t.props.paddingLeft;
            var dt =
                B &&
                React.default.createElement(module13.View, {
                  style: [
                    O.titleLine,
                    {
                      marginTop: 12 + (!S && E ? 6 : 0),
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
              ct = React.default.createElement(
                module13.View,
                {
                  onLayout: t._onLeftLayout,
                  style: [
                    O.left,
                    {
                      paddingLeft: _ || 20,
                    },
                  ],
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: {
                      justifyContent: 'center',
                      alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
                    },
                  },
                  T &&
                    React.default.createElement(
                      module13.View,
                      {
                        onLayout: t._onTextLayout,
                        style: {
                          justifyContent: 'center',
                          alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
                        },
                      },
                      React.default.createElement(
                        module13.Text,
                        {
                          style: [
                            O.title,
                            C(
                              {
                                fontSize: t.props.fontSize || 16,
                                color: titleColor,
                                maxWidth: t.props.titleWidth || rt - 100,
                                opacity: W || 1,
                              },
                              Y
                            ),
                          ],
                        },
                        t.props.title
                      )
                    ),
                  dt,
                  $
                )
              ),
              ft = React.default.createElement(
                module13.View,
                {
                  style: [
                    O.right,
                    {
                      justifyContent: globals.isRTL ? 'flex-start' : 'flex-end',
                      paddingLeft: globals.isRTL ? A || 22 : 0,
                      paddingRight: globals.isRTL ? 0 : A || 14,
                      height: t.state.rightHeight,
                    },
                  ],
                },
                globals.isRTL && nt,
                globals.isRTL && it,
                globals.isRTL && tt,
                globals.isRTL && Z,
                !globals.isRTL && Z,
                !globals.isRTL && tt,
                !globals.isRTL && it,
                !globals.isRTL && nt
              ),
              ut = E
                ? {
                    underlayColor: 'transparent',
                  }
                : K
                ? {
                    underlayColor: K,
                  }
                : {};
            return React.default.createElement(
              module13.TouchableHighlight,
              module22.default(
                {
                  activeOpacity: E || !U ? 1 : 0.95,
                  accessible: !E,
                },
                ut,
                module391.default.getAccessibilityLabel(ot),
                {
                  onPress: function () {
                    if (U) {
                      if (t.props.onPress) t.props.onPress();
                      if (t.props.eventName) module387.LogEventStat(t.props.eventName);
                      if (t.props.funcId) module387.LogEventCommon(M);
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
                module13.View,
                {
                  style: [
                    O.outterWrap,
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
                    (E ? (t.props.switchOn ? module510.accessibility_on : module510.debug_info_close) : ''),
                },
                lt,
                React.default.createElement(
                  module13.View,
                  {
                    style: [
                      O.innerWrap,
                      {
                        paddingVertical: t.props.innterVPadding || 20,
                      },
                    ],
                  },
                  globals.isRTL && ft,
                  globals.isRTL && ct,
                  globals.isRTL && st,
                  !globals.isRTL && st,
                  !globals.isRTL && ct,
                  !globals.isRTL && ft
                ),
                at
              )
            );
          });
        },
      },
    ]);
    return x;
  })(React.Component);

exports.default = x;
x.defaultProps = {
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
  isRightImgRotate: true,
};
var O = module13.StyleSheet.create({
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
    lineHeight: (module391.default.isRRAndroid(), 21),
    color: '#a5a5a5',
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  topLine: {
    position: 'absolute',
    width: module13.Dimensions.get('window').width,
    left: 0,
    top: 0,
    height: 0.8,
  },
  bottomLine: {
    position: 'absolute',
    width: module13.Dimensions.get('window').width,
    left: 0,
    bottom: 0,
    height: 0.8,
  },
  titleLine: {
    width: module13.Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 0.8,
  },
});

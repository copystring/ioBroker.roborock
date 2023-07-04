require('./387');

var module21 = require('./21'),
  module49 = require('./49'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = w(o);
    if (n && n.has(t)) return n.get(t);
    var u = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var s = l ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (s && (s.get || s.set)) Object.defineProperty(u, c, s);
        else u[c] = t[c];
      }

    u.default = t;
    if (n) n.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module1067 = require('./1067'),
  module1350 = require('./1350'),
  module377 = require('./377'),
  module506 = require('./506'),
  module1065 = require('./1065');

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (w = function (t) {
    return t ? n : o;
  })(t);
}

function C(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (o)
      u = u.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, u);
  }

  return n;
}

function B(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      C(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      C(Object(u)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(u, o));
      });
  }

  return t;
}

require('./389');

require('./491').strings;
var O = React.forwardRef(function (t, n) {
    var w = React.useContext(module506.AppConfigContext).theme,
      C = t.cleanIconMode,
      O = undefined === C ? 'start' : C,
      y = t.chargeIconMode,
      R = undefined === y ? 'start' : y,
      M = t.washIconMode,
      _ = undefined === M ? 'start' : M,
      v = React.useRef(),
      D = React.useRef(),
      P = React.useRef(),
      j = t.onPressCleanButton,
      T = t.onPressChargeButton,
      W = t.onPressWashButton,
      I = t.enabled;

    w.homeBottomControl.controlBorderColor;
    React.useImperativeHandle(n, function () {
      return {
        cleanButton: function () {
          return v.current;
        },
        chargeButton: function () {
          return D.current;
        },
        washButton: function () {
          return P.current;
        },
      };
    });
    var E =
        (module377.RSM.state == module377.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module377.RSM.state == module377.RobotState.WASHING_DUSTER) &&
        module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.None,
      k = [
        B(
          B({}, module1350.getChargeButtonConfig(R, w)),
          {},
          {
            funcId: 'home_charge_button',
            onPress: T,
            ref: D,
            enabled: I || module377.RSM.state == module377.RobotState.BACK_TO_DOCK || module377.RSM.state == module377.RobotState.COLLECTING_DUST,
          }
        ),
        B(
          B({}, module1350.getCleanButtonConfig(O, w)),
          {},
          {
            funcId: 'home_clean_button',
            onPress: j,
            ref: v,
            enabled: (I || module377.RSM.isCleaning()) && !E,
          }
        ),
        B(
          B({}, module1350.getWashingDusterButtonConfig(_, w)),
          {},
          {
            funcId: 'home_washing_button',
            onPress: W,
            ref: P,
            enabled: I || module377.RSM.state == module377.RobotState.WASHING_DUSTER || module377.RSM.state == module377.RobotState.BACK_TO_DOCK_WASHING_DUSTER,
          }
        ),
      ],
      x = B(
        B({}, module1065.BaseShadow),
        {},
        {
          width: module12.Dimensions.get('window').width - 2 * module1065.HorizontalMargin,
          height: 115,
          radius: 10,
          color: w.shadowColor,
          style: {
            marginBottom: 20,
          },
        }
      );
    console.log('ThreeButtonStyleBottomMenu render');
    return React.default.createElement(
      module1067.BoxShadow,
      {
        setting: x,
      },
      React.default.createElement(
        module12.View,
        {
          style: [
            S.controlMenuWrap,
            {
              backgroundColor: w.componentBackgroundColor,
            },
          ],
        },
        React.default.createElement(
          module12.View,
          {
            style: [S.controlMenuTop],
          },
          k.map(function (t, n) {
            return React.default.createElement(
              module381.TopImageButton,
              module21.default(
                {
                  key: 'top' + n,
                  enabled: I,
                  imageWidth: 50,
                  imageHeight: 50,
                  textTop: 6,
                },
                t,
                {
                  fontSize: 12,
                  textColor: w.homeBottomControl.textColor,
                  maxTextWidth: module1065.BottomControlTopButtonWidth - 20,
                  style: [S.topButton],
                }
              )
            );
          })
        )
      )
    );
  }),
  S = module12.StyleSheet.create({
    controlMenuWrap: {
      width: module12.Dimensions.get('window').width - 2 * module1065.HorizontalMargin,
      height: 115,
      paddingVertical: 20,
      backgroundColor: 'white',
      borderRadius: 14,
      alignSelf: 'center',
    },
    controlMenuTop: {
      flexDirection: 'row',
      height: 68,
      paddingVertical: 12,
    },
    topButton: {
      width: module1065.BottomControlTopButtonWidth,
      backgroundColor: 'transparent',
    },
    controlMenuBottom: {
      flexDirection: 'row',
      height: 115,
      width: module12.Dimensions.get('window').width - 2 * module1065.HorizontalMargin,
      borderRadius: 10,
      paddingVertical: 20,
    },
    bottomButton: {
      width: module1065.BottomControlBottomThreeButtonWidth,
      backgroundColor: 'transparent',
      borderRightWidth: 0.8,
      borderRightColor: '#898889',
    },
  }),
  y = O;
exports.default = y;

require('./387');

require('./1067');

var module21 = require('./21'),
  module49 = require('./49'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = b(o);
    if (n && n.has(t)) return n.get(t);
    var u = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = l ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(u, c, f);
        else u[c] = t[c];
      }

    u.default = t;
    if (n) n.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module1350 = require('./1350'),
  module377 = require('./377'),
  module506 = require('./506'),
  module1065 = require('./1065');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (b = function (t) {
    return t ? n : o;
  })(t);
}

function B(t, o) {
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

function C(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      B(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      B(Object(u)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(u, o));
      });
  }

  return t;
}

require('./389');

require('./491').strings;
var M = React.forwardRef(function (t, n) {
    var b = React.useContext(module506.AppConfigContext).theme,
      B = t.cleanIconMode,
      M = undefined === B ? 'start' : B,
      y = t.mopIconMode,
      O = undefined === y ? 'start' : y,
      P = t.cleanMopIconMode,
      _ = undefined === P ? 'start' : P,
      S = t.chargeIconMode,
      v = undefined === S ? 'start' : S,
      R = t.washIconMode,
      j = undefined === R ? 'start' : R,
      I = React.useRef(),
      W = React.useRef(),
      D = React.useRef(),
      x = React.useRef(),
      T = React.useRef(),
      k = t.onPressCleanButton,
      E = t.onPressMopButton,
      H = t.onPressCleanMopButton,
      V = t.onPressChargeButton,
      A = t.onPressWashButton,
      z = t.enabled,
      K = b.homeBottomControl.controlBorderColor;

    React.useImperativeHandle(n, function () {
      return {
        cleanButton: function () {
          return I.current;
        },
        mopButton: function () {
          return W.current;
        },
        cleanMopButton: function () {
          return D.current;
        },
        chargeButton: function () {
          return x.current;
        },
        washButton: function () {
          return T.current;
        },
      };
    });
    var L = [
        C(
          C({}, module1350.getCleanButtonConfig(M, b)),
          {},
          {
            funcId: 'home_clean_button',
            onPress: k,
            ref: I,
            enabled: (z || module377.RSM.isCleaning()) && 4 != module377.RSM.mopModeId,
          }
        ),
        C(
          C({}, module1350.getMopButtonConfig(O, b)),
          {},
          {
            funcId: 'home_mop_button',
            onPress: E,
            ref: W,
            enabled: z || module377.RSM.isPureMopping(),
          }
        ),
        C(
          C({}, module1350.getCleanMopButtonConfig(_, b)),
          {},
          {
            funcId: 'home_clean_mop_button',
            onPress: H,
            ref: D,
            enabled: (z || module377.RSM.isInCleanMopping()) && 4 != module377.RSM.mopModeId,
          }
        ),
      ],
      G = [
        C(
          C({}, module1350.getChargeButtonConfig(v, b)),
          {},
          {
            onPress: V,
            funcId: 'home_charge_button',
            ref: x,
            enabled: z || module377.RSM.state == module377.RobotState.BACK_TO_DOCK,
          }
        ),
        C(
          C({}, module1350.getWashingDusterButtonConfig(j, b)),
          {},
          {
            funcId: 'home_washing_button',
            onPress: A,
            ref: T,
            enabled: z || module377.RSM.state == module377.RobotState.WASHING_DUSTER || module377.RSM.state == module377.RobotState.BACK_TO_DOCK_WASHING_DUSTER,
          }
        ),
      ];
    return React.default.createElement(
      module12.View,
      {
        style: [
          w.controlMenuWrap,
          {
            backgroundColor: b.componentBackgroundColor,
          },
        ],
      },
      React.default.createElement(
        module12.View,
        {
          style: [w.controlMenuTop],
        },
        L.map(function (t, n) {
          return React.default.createElement(
            module381.TopImageButton,
            module21.default(
              {
                key: 'top' + n,
                enabled: z,
                imageWidth: 50,
                imageHeight: 50,
                textTop: 6,
              },
              t,
              {
                fontSize: 14,
                textColor: b.homeBottomControl.textColor,
                maxTextWidth: module1065.BottomControlTopButtonWidth - 20,
                style: [w.topButton],
              }
            )
          );
        })
      ),
      React.default.createElement(module12.View, {
        style: w.splitLine,
      }),
      React.default.createElement(
        module12.View,
        {
          style: [
            w.controlMenuBottom,
            {
              borderColor: K,
            },
          ],
        },
        G.map(function (t, n) {
          return React.default.createElement(
            module381.LeftImageButton,
            module21.default(
              {
                key: 'bottom' + n,
                enabled: z,
                imageWidth: 30,
                imageHeight: 30,
                textLeft: 6,
              },
              t,
              {
                maxTextWidth: module1065.BottomControlBottomButtonWidth - 20,
                textColor: b.homeBottomControl.textColor,
                fontSize: 14,
                style: w.bottomButton,
              }
            )
          );
        })
      )
    );
  }),
  w = module12.StyleSheet.create({
    controlMenuWrap: {
      width: module12.Dimensions.get('window').width - 2 * module1065.HorizontalMargin,
      height: module1065.BottomControlHeight,
      paddingVertical: 20,
      backgroundColor: 'white',
      borderRadius: 14,
      alignSelf: 'center',
      marginBottom: 15,
    },
    controlMenuTop: {
      flexDirection: 'row',
      height: 68,
    },
    topButton: {
      width: module1065.BottomControlTopButtonWidth,
      backgroundColor: 'transparent',
    },
    splitLine: {
      width: module12.Dimensions.get('window').width - 4 * module1065.HorizontalMargin,
      height: 0.8,
      marginTop: 12,
      backgroundColor: 'rgba(0,0,0,0.1)',
      alignSelf: 'center',
    },
    controlMenuBottom: {
      flexDirection: 'row',
      paddingVertical: 12,
    },
    bottomButton: {
      width: module1065.BottomControlBottomButtonWidth,
      backgroundColor: 'transparent',
    },
  }),
  y = M;
exports.default = y;

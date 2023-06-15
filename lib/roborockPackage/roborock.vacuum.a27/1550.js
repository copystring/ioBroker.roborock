require('./391');

require('./1328');

var module22 = require('./22'),
  module50 = require('./50'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1549 = require('./1549'),
  module381 = require('./381'),
  module1121 = require('./1121'),
  module1355 = require('./1355');

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
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      B(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      B(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

require('./393');

require('./505').strings;
var M = React.forwardRef(function (t, o) {
    var u = React.useContext(module1121.AppConfigContext).theme,
      B = t.cleanIconMode,
      M = undefined === B ? 'start' : B,
      S = t.mopIconMode,
      O = undefined === S ? 'start' : S,
      _ = t.cleanMopIconMode,
      y = undefined === _ ? 'start' : _,
      P = t.chargeIconMode,
      R = undefined === P ? 'start' : P,
      I = t.washIconMode,
      v = undefined === I ? 'start' : I,
      x = React.useRef(),
      W = React.useRef(),
      D = React.useRef(),
      T = React.useRef(),
      j = React.useRef(),
      E = t.onPressCleanButton,
      k = t.onPressMopButton,
      H = t.onPressCleanMopButton,
      V = t.onPressChargeButton,
      A = t.onPressWashButton,
      z = t.enabled,
      K = u.homeBottomControl.controlBorderColor;
    React.useImperativeHandle(o, function () {
      return {
        cleanButton: function () {
          return x.current;
        },
        mopButton: function () {
          return W.current;
        },
        cleanMopButton: function () {
          return D.current;
        },
        chargeButton: function () {
          return T.current;
        },
        washButton: function () {
          return j.current;
        },
      };
    });
    var L = [
        C(
          C({}, module1549.getCleanButtonConfig(M, u)),
          {},
          {
            funcId: 'home_clean_button',
            onPress: E,
            ref: x,
            enabled: (z || module381.RSM.isCleaning()) && 4 != module381.RSM.mopModeId,
          }
        ),
        C(
          C({}, module1549.getMopButtonConfig(O, u)),
          {},
          {
            funcId: 'home_mop_button',
            onPress: k,
            ref: W,
            enabled: z || module381.RSM.isPureMopping(),
          }
        ),
        C(
          C({}, module1549.getCleanMopButtonConfig(y, u)),
          {},
          {
            funcId: 'home_clean_mop_button',
            onPress: H,
            ref: D,
            enabled: (z || module381.RSM.isInCleanMopping()) && 4 != module381.RSM.mopModeId,
          }
        ),
      ],
      G = [
        C(
          C({}, module1549.getChargeButtonConfig(R, u)),
          {},
          {
            onPress: V,
            funcId: 'home_charge_button',
            ref: T,
            enabled: z || module381.RSM.state == module381.RobotState.BACK_TO_DOCK,
          }
        ),
        C(
          C({}, module1549.getWashingDusterButtonConfig(v, u)),
          {},
          {
            funcId: 'home_washing_button',
            onPress: A,
            ref: j,
            enabled: z || module381.RSM.state == module381.RobotState.WASHING_DUSTER || module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER,
          }
        ),
      ];
    return React.default.createElement(
      module12.View,
      {
        style: [
          w.controlMenuWrap,
          {
            backgroundColor: u.componentBackgroundColor,
          },
        ],
      },
      React.default.createElement(
        module12.View,
        {
          style: [w.controlMenuTop],
        },
        L.map(function (t, o) {
          return React.default.createElement(
            module385.TopImageButton,
            module22.default(
              {
                key: 'top' + o,
                enabled: z,
                imageWidth: 50,
                imageHeight: 50,
                textTop: 6,
              },
              t,
              {
                fontSize: 14,
                textColor: u.homeBottomControl.textColor,
                maxTextWidth: module1355.BottomControlTopButtonWidth - 20,
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
        G.map(function (t, o) {
          return React.default.createElement(
            module385.LeftImageButton,
            module22.default(
              {
                key: 'bottom' + o,
                enabled: z,
                imageWidth: 30,
                imageHeight: 30,
                textLeft: 6,
              },
              t,
              {
                maxTextWidth: module1355.BottomControlBottomButtonWidth - 20,
                textColor: u.homeBottomControl.textColor,
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
      width: module12.Dimensions.get('window').width - 2 * module1355.HorizontalMargin,
      height: module1355.BottomControlHeight,
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
      width: module1355.BottomControlTopButtonWidth,
      backgroundColor: 'transparent',
    },
    splitLine: {
      width: module12.Dimensions.get('window').width - 4 * module1355.HorizontalMargin,
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
      width: module1355.BottomControlBottomButtonWidth,
      backgroundColor: 'transparent',
    },
  }),
  S = M;
exports.default = S;

require('./391');

var module22 = require('./22'),
  module50 = require('./50'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1328 = require('./1328'),
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

function S(t) {
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
var w = React.forwardRef(function (t, o) {
    var u = React.useContext(module1121.AppConfigContext).theme,
      B = t.cleanIconMode,
      w = undefined === B ? 'start' : B,
      O = t.chargeIconMode,
      _ = undefined === O ? 'start' : O,
      M = t.washIconMode,
      y = undefined === M ? 'start' : M,
      D = React.useRef(),
      T = React.useRef(),
      v = React.useRef(),
      P = t.onPressCleanButton,
      I = t.onPressChargeButton,
      W = t.onPressWashButton,
      j = t.enabled;

    u.homeBottomControl.controlBorderColor;
    React.useImperativeHandle(o, function () {
      return {
        cleanButton: function () {
          return D.current;
        },
        chargeButton: function () {
          return T.current;
        },
        washButton: function () {
          return v.current;
        },
      };
    });
    var x =
        (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module381.RSM.state == module381.RobotState.WASHING_DUSTER) &&
        module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
      E = [
        S(
          S({}, module1549.getChargeButtonConfig(_, u)),
          {},
          {
            funcId: 'home_charge_button',
            onPress: I,
            ref: T,
            enabled: j || module381.RSM.state == module381.RobotState.BACK_TO_DOCK || module381.RSM.state == module381.RobotState.COLLECTING_DUST,
          }
        ),
        S(
          S({}, module1549.getCleanButtonConfig(w, u)),
          {},
          {
            funcId: 'home_clean_button',
            onPress: P,
            ref: D,
            enabled: (j || module381.RSM.isCleaning()) && !x,
          }
        ),
        S(
          S({}, module1549.getWashingDusterButtonConfig(y, u)),
          {},
          {
            funcId: 'home_washing_button',
            onPress: W,
            ref: v,
            enabled:
              (j || module381.RSM.state == module381.RobotState.WASHING_DUSTER || module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER) &&
              module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.Quick_Build_Map,
          }
        ),
      ],
      H = S(
        S({}, module1355.BaseShadow),
        {},
        {
          width: module12.Dimensions.get('window').width - 2 * module1355.HorizontalMargin,
          height: 115,
          radius: 10,
          color: u.shadowColor,
          style: {
            marginBottom: 20,
          },
        }
      );
    console.log('ThreeButtonStyleBottomMenu render');
    return React.default.createElement(
      module1328.BoxShadow,
      {
        setting: H,
      },
      React.default.createElement(
        module12.View,
        {
          style: [
            R.controlMenuWrap,
            {
              backgroundColor: u.componentBackgroundColor,
            },
          ],
        },
        React.default.createElement(
          module12.View,
          {
            style: [R.controlMenuTop],
          },
          E.map(function (t, o) {
            return React.default.createElement(
              module385.TopImageButton,
              module22.default(
                {
                  key: 'top' + o,
                  enabled: j,
                  imageWidth: 50,
                  imageHeight: 50,
                  textTop: 6,
                },
                t,
                {
                  fontSize: 12,
                  textColor: u.homeBottomControl.textColor,
                  maxTextWidth: module1355.BottomControlTopButtonWidth - 20,
                  style: [R.topButton],
                }
              )
            );
          })
        )
      )
    );
  }),
  R = module12.StyleSheet.create({
    controlMenuWrap: {
      width: module12.Dimensions.get('window').width - 2 * module1355.HorizontalMargin,
      height: 115,
      paddingVertical: 20,
      backgroundColor: 'white',
      borderRadius: 14,
      alignSelf: 'center',
    },
    controlMenuTop: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    topButton: {
      width: module1355.BottomControlTopButtonWidth,
      backgroundColor: 'transparent',
    },
    controlMenuBottom: {
      flexDirection: 'row',
      height: 115,
      width: module12.Dimensions.get('window').width - 2 * module1355.HorizontalMargin,
      borderRadius: 10,
      paddingVertical: 20,
    },
    bottomButton: {
      width: module1355.BottomControlBottomThreeButtonWidth,
      backgroundColor: 'transparent',
      borderRightWidth: 0.8,
      borderRightColor: '#898889',
    },
  }),
  O = w;
exports.default = O;

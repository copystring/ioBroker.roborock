require('./391');

var module22 = require('./22'),
  module50 = require('./50'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1328 = require('./1328'),
  module1547 = require('./1547'),
  module381 = require('./381'),
  module1121 = require('./1121'),
  module1355 = require('./1355');

function p(t, o) {
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

function w(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      p(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      p(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

require('./393');

require('./505').strings;
var O = React.forwardRef(function (t, o) {
    var l = React.useContext(module1121.AppConfigContext).theme,
      p = t.cleanIconMode,
      O = undefined === p ? 'start' : p,
      S = t.chargeIconMode,
      v = undefined === S ? 'start' : S,
      P = React.useRef(),
      R = React.useRef(),
      j = t.onPressCleanButton,
      M = t.onPressChargeButton,
      _ = t.enabled,
      x = l.homeBottomControl.controlBorderColor;
    React.useImperativeHandle(o, function () {
      return {
        cleanButton: function () {
          return P.current;
        },
        chargeButton: function () {
          return R.current;
        },
      };
    });
    var D = [
        w(
          w({}, module1547.getChargeButtonConfig(v, l)),
          {},
          {
            funcId: 'home_charge_button',
            onPress: M,
            ref: R,
            enabled: _ || module381.RSM.state == module381.RobotState.BACK_TO_DOCK || module381.RSM.state == module381.RobotState.COLLECTING_DUST,
          }
        ),
        w(
          w({}, module1547.getCleanButtonConfig(O, l)),
          {},
          {
            funcId: 'home_clean_button',
            onPress: j,
            ref: P,
            enabled: _ || module381.RSM.isCleaning(),
          }
        ),
      ],
      H = w(
        w({}, module1355.BaseShadow),
        {},
        {
          width: module12.Dimensions.get('window').width - 2 * module1355.HorizontalMargin,
          height: module1355.BottomControlHeight,
          radius: 10,
          color: l.shadowColor,
          style: {
            marginBottom: 20,
          },
        }
      );
    console.log('TanosStyleBottomMenu render');
    return React.default.createElement(
      module1328.BoxShadow,
      {
        setting: H,
      },
      React.default.createElement(
        module12.View,
        {
          style: [
            y.controlMenuBottom,
            {
              backgroundColor: l.componentBackgroundColor,
            },
          ],
        },
        D.map(function (t, o) {
          return React.default.createElement(
            module385.LeftImageButton,
            module22.default(
              {
                key: 'top' + o,
                enabled: _,
                imageWidth: 30,
                imageHeight: 30,
                textLeft: 6,
              },
              t,
              {
                textColor: l.homeBottomControl.textColor,
                fontSize: 14,
                textStyle: {
                  lineHeight: 16,
                },
                maxTextWidth: module1355.BottomControlBottomButtonWidth - 50,
                style: [
                  y.bottomButton,
                  {
                    borderRightColor: x,
                    borderRightWidth: o == D.length - 1 ? 0 : 1,
                  },
                ],
              }
            )
          );
        })
      )
    );
  }),
  y = module12.StyleSheet.create({
    controlMenuBottom: {
      flexDirection: 'row',
      height: module1355.BottomControlHeight,
      width: module12.Dimensions.get('window').width - 2 * module1355.HorizontalMargin,
      borderRadius: 10,
      paddingVertical: 20,
    },
    bottomButton: {
      width: module1355.BottomControlBottomButtonWidth,
      backgroundColor: 'transparent',
      borderRightWidth: 0.8,
      borderRightColor: '#898889',
    },
  }),
  S = O;
exports.default = S;

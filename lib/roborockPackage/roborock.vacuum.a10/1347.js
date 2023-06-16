require('./387');

var module21 = require('./21'),
  module49 = require('./49'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = C(o);
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
  module1065 = require('./1065'),
  module1348 = require('./1348'),
  module377 = require('./377'),
  module506 = require('./506'),
  module1063 = require('./1063');

function C(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (C = function (t) {
    return t ? n : o;
  })(t);
}

function O(t, o) {
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

function y(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      O(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      O(Object(u)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(u, o));
      });
  }

  return t;
}

require('./389');

require('./491').strings;
var B = React.forwardRef(function (t, n) {
    var C = React.useContext(module506.AppConfigContext).theme,
      O = t.cleanIconMode,
      B = undefined === O ? 'start' : O,
      v = t.chargeIconMode,
      j = undefined === v ? 'start' : v,
      P = React.useRef(),
      M = React.useRef(),
      S = t.onPressCleanButton,
      R = t.onPressChargeButton,
      _ = t.enabled,
      D = C.homeBottomControl.controlBorderColor;
    React.useImperativeHandle(n, function () {
      return {
        cleanButton: function () {
          return P.current;
        },
        chargeButton: function () {
          return M.current;
        },
      };
    });
    var x = [
        y(
          y({}, module1348.getChargeButtonConfig(j, C)),
          {},
          {
            funcId: 'home_charge_button',
            onPress: R,
            ref: M,
            enabled: _ || module377.RSM.state == module377.RobotState.BACK_TO_DOCK || module377.RSM.state == module377.RobotState.COLLECTING_DUST,
          }
        ),
        y(
          y({}, module1348.getCleanButtonConfig(B, C)),
          {},
          {
            funcId: 'home_clean_button',
            onPress: S,
            ref: P,
            enabled: _ || module377.RSM.isCleaning(),
          }
        ),
      ],
      W = y(
        y({}, module1063.BaseShadow),
        {},
        {
          width: module12.Dimensions.get('window').width - 2 * module1063.HorizontalMargin,
          height: module1063.BottomControlHeight,
          radius: 10,
          color: C.shadowColor,
          style: {
            marginBottom: 20,
          },
        }
      );
    console.log('TanosStyleBottomMenu render');
    return React.default.createElement(
      module1065.BoxShadow,
      {
        setting: W,
      },
      React.default.createElement(
        module12.View,
        {
          style: [
            w.controlMenuBottom,
            {
              backgroundColor: C.componentBackgroundColor,
            },
          ],
        },
        x.map(function (t, n) {
          return React.default.createElement(
            module381.LeftImageButton,
            module21.default(
              {
                key: 'top' + n,
                enabled: _,
                imageWidth: 30,
                imageHeight: 30,
                textLeft: 6,
              },
              t,
              {
                textColor: C.homeBottomControl.textColor,
                fontSize: 14,
                textStyle: {
                  lineHeight: 16,
                },
                maxTextWidth: module1063.BottomControlBottomButtonWidth - 50,
                style: [
                  w.bottomButton,
                  {
                    borderRightColor: D,
                    borderRightWidth: n == x.length - 1 ? 0 : 1,
                  },
                ],
              }
            )
          );
        })
      )
    );
  }),
  w = module12.StyleSheet.create({
    controlMenuBottom: {
      flexDirection: 'row',
      height: module1063.BottomControlHeight,
      width: module12.Dimensions.get('window').width - 2 * module1063.HorizontalMargin,
      borderRadius: 10,
      paddingVertical: 20,
    },
    bottomButton: {
      width: module1063.BottomControlBottomButtonWidth,
      backgroundColor: 'transparent',
      borderRightWidth: 0.8,
      borderRightColor: '#898889',
    },
  }),
  v = B;
exports.default = v;

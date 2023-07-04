require('./391');

var module22 = require('./22'),
  module50 = require('./50'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1408 = require('./1408'),
  module1629 = require('./1629'),
  module381 = require('./381'),
  module1199 = require('./1199'),
  module1434 = require('./1434');

function C(t, o) {
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

function B(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      C(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      C(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

require('./393');

require('./510').strings;
var R = React.forwardRef(function (t, o) {
    var l = React.useContext(module1199.AppConfigContext).theme,
      C = t.cleanIconMode,
      R = undefined === C ? 'start' : C,
      y = t.dockIconMode,
      O = undefined === y ? 'unfold' : y,
      x = React.useRef(),
      P = React.useRef(),
      _ = t.onPressCleanButton,
      D = t.onPressNewDockButton,
      M = t.showDockPanel,
      v = t.enabled,
      E = t.cleanProgress;
    l.homeBottomControl.controlBorderColor;
    React.useImperativeHandle(o, function () {
      return {
        cleanButton: function () {
          return x.current;
        },
        dockButton: function () {
          return P.current;
        },
      };
    });
    var I = module13.Dimensions.get('window').width,
      j = 0.6 * (I - 3 * module1434.HorizontalMargin),
      k = 0.4 * (I - 3 * module1434.HorizontalMargin),
      T =
        (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module381.RSM.state == module381.RobotState.WASHING_DUSTER) &&
        module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
      G = B(
        B({}, module1629.getCleanButtonConfig(R, l)),
        {},
        {
          funcId: 'home_clean_button',
          onPress: _,
          ref: x,
          enabled: (v || module381.RSM.isCleaning()) && !T,
        }
      ),
      H = B(
        B({}, module1629.getDockButtonConfig(O, l)),
        {},
        {
          funcId: 'home_dock_button',
          shouldShowRedPoint: 'unfold' == O && module1629.hasDockExceptions(),
          redPointStyle: {
            width: 7,
            height: 7,
            borderRadius: 3.5,
            top: 5,
            right: 7,
            borderColor: l.dockPanel.redDotBorderColor,
            borderWidth: 1,
          },
          onPress: function () {
            if ('unfold' == O) {
              if (M) M();
            } else if (D) D();
          },
          ref: P,
          enabled:
            v ||
            module381.RSM.state == module381.RobotState.BACK_TO_DOCK ||
            module381.RSM.state == module381.RobotState.COLLECTING_DUST ||
            module381.RSM.state == module381.RobotState.WASHING_DUSTER ||
            module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER,
        }
      ),
      W = B(
        B({}, module1434.BaseShadow),
        {},
        {
          height: 80,
          x: 2,
          y: 4,
          radius: 0,
          opacity: 0.2,
          border: 12,
          color: l.shadowColor,
          style: {
            bottom: 20,
            marginLeft: module1434.HorizontalMargin,
          },
        }
      ),
      A = {
        enabled: v,
        imageWidth: 36,
        imageHeight: 36,
        textLeft: 6,
        textColor: l.homeBottomControl.textColor,
        fontSize: 15,
        textStyle: {
          lineHeight: 18,
        },
        maxTextWidth: module1434.BottomControlBottomButtonWidth - 50,
      };
    console.log('BottomMenuForDockPanel render');
    return React.default.createElement(
      module13.View,
      {
        style: [
          p.controlMenuBottom,
          {
            width: I,
          },
        ],
      },
      React.default.createElement(
        module1408.BoxShadow,
        {
          setting: B(
            B({}, W),
            {},
            {
              width: j,
            }
          ),
        },
        React.default.createElement(
          module385.GradientView,
          module22.default({}, l.homeCommonGradient, {
            style: {
              borderRadius: 10,
              overflow: 'hidden',
            },
          }),
          React.default.createElement(
            module385.LeftImageButton,
            module22.default({}, A, G, {
              maxTextWidth: j - 50,
              style: [
                p.bottomButton,
                {
                  positon: 'absolute',
                  zIndex: 2,
                  width: j,
                },
              ],
            })
          ),
          E >= 0 &&
            React.default.createElement(module385.GradientView, {
              colors: l.homeBottomControl.gradientBackground,
              style: B(
                B({}, p.cleanProcessView),
                {},
                {
                  width: (j * E) / 100,
                }
              ),
              start: {
                x: 1,
                y: 0,
              },
              end: {
                x: 0,
                y: 0,
              },
              locations: [0.3, 1],
            })
        )
      ),
      React.default.createElement(
        module1408.BoxShadow,
        {
          setting: B(
            B({}, W),
            {},
            {
              width: k,
            }
          ),
        },
        React.default.createElement(
          module385.GradientView,
          module22.default({}, l.homeCommonGradient, {
            style: {
              borderRadius: 10,
              overflow: 'hidden',
            },
          }),
          React.default.createElement(
            module385.LeftImageButton,
            module22.default({}, A, H, {
              maxTextWidth: k - 50,
              style: [
                p.bottomButton,
                {
                  width: k,
                },
              ],
            })
          )
        )
      )
    );
  }),
  p = module13.StyleSheet.create({
    controlMenuBottom: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      height: 80,
      marginBottom: 20,
      paddingVertical: 20,
    },
    bottomButton: {
      backgroundColor: 'transparent',
      height: 80,
      borderRadius: 10,
    },
    cleanProcessView: {
      backgroundColor: 'transparent',
      height: 80,
      position: 'absolute',
      zIndex: 1,
    },
  }),
  y = R;
exports.default = y;

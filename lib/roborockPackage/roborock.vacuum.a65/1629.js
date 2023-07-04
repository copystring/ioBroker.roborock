require('./391');

var module22 = require('./22'),
  module50 = require('./50'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1409 = require('./1409'),
  module1630 = require('./1630'),
  module381 = require('./381'),
  module1200 = require('./1200'),
  module1435 = require('./1435');

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

function S(t) {
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

var y = React.forwardRef(function (t, o) {
    var l = React.useContext(module1200.AppConfigContext).theme,
      C = t.cleanIconMode,
      module1631 = undefined === C ? 'start' : C,
      p = t.dockIconMode,
      R = undefined === p ? 'unfold' : p,
      P = t.collectIconMode,
      x = undefined === P ? 'startCollect' : P,
      O = t.dryIconMode,
      D = undefined === O ? 'start' : O,
      M = React.useRef(),
      I = React.useRef(),
      k = React.useRef(),
      N = React.useRef(),
      E = React.useRef(),
      v = React.useRef(),
      T = t.onPressCleanButton,
      W = t.onPressNewDockButton,
      H = t.onPressNewCollectButton,
      j = t.onPressNewWashButton,
      z = t.onPressNewDryButton,
      A = t.enabled,
      L = t.cleanProgress;
    l.homeBottomControl.controlBorderColor;
    React.useImperativeHandle(o, function () {
      return {
        cleanButton: function () {
          return M.current;
        },
        dockButton: function () {
          return I.current;
        },
        newCollectButton: function () {
          return k.current;
        },
        newWashButton: function () {
          return N.current;
        },
        newDryButton: function () {
          return E.current;
        },
      };
    });
    var G = [
        S(
          S({}, module1630.getNewCollectButtonConfig(x, l)),
          {},
          {
            funcId: 'home_new_collect_button',
            onPress: function () {
              console.log('handlePressNewCollectButton');
              if (H)
                H(function (t, o) {
                  if (t) J();
                  else console.log('onPressNewCollectButton error', o);
                });
            },
            ref: k,
            enabled: A || module381.RSM.isCleaning(),
          }
        ),
        S(
          S({}, module1630.getNewWashButtonConfig('start', l)),
          {},
          {
            funcId: 'home_new_wash_button',
            onPress: function () {
              console.log('handlePressNewWashButton');
              if (j)
                j(function (t, o) {
                  if (t) J();
                  else console.log('handlePressNewWashButton error', o);
                });
            },
            ref: N,
            enabled: A,
          }
        ),
      ],
      K = S(
        S({}, module1630.getNewDryButtonConfig(D, l)),
        {},
        {
          funcId: 'home_new_dry_button',
          onPress: function () {
            console.log('handlePressNewDryButton');
            if (z)
              z(function (t, o) {
                if (t) J();
                else console.log('handlePressNewDryButton error', o);
              });
          },
          ref: E,
          enabled: A,
        }
      );
    if (module381.RSM.isCollectWashDryDock() && module381.RSM.isChargingOnDock()) G.push(K);

    var V = module13.Dimensions.get('window').width,
      U = 0.6 * (V - 3 * module1435.HorizontalMargin),
      F = 0.4 * (V - 3 * module1435.HorizontalMargin),
      q = (V - module1435.HorizontalMargin * (G.length + 2) - 43) / G.length,
      J = function () {
        v.current.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      },
      Q = S(
        S({}, module1630.getDockButtonConfig(R, l)),
        {},
        {
          funcId: 'home_dock_button',
          onPress: function () {
            if ('unfold' == R)
              v.current.scrollTo({
                x: V,
                y: 0,
                animated: true,
              });
            else if (W) W();
          },
          ref: I,
          enabled:
            A ||
            module381.RSM.state == module381.RobotState.BACK_TO_DOCK ||
            module381.RSM.state == module381.RobotState.COLLECTING_DUST ||
            module381.RSM.state == module381.RobotState.WASHING_DUSTER ||
            module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER,
        }
      ),
      X =
        (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module381.RSM.state == module381.RobotState.WASHING_DUSTER) &&
        module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
      Y = S(
        S({}, module1630.getCleanButtonConfig(module1631, l)),
        {},
        {
          funcId: 'home_clean_button',
          onPress: T,
          ref: M,
          enabled: (A || module381.RSM.isCleaning()) && !X,
        }
      ),
      Z = S(
        S({}, module1435.BaseShadow),
        {},
        {
          height: 80,
          radius: 10,
          color: l.shadowColor,
          style: {
            bottom: 20,
            marginLeft: module1435.HorizontalMargin,
          },
        }
      ),
      $ = {
        enabled: A,
        imageWidth: 36,
        imageHeight: 36,
        textLeft: 6,
        textColor: l.homeBottomControl.textColor,
        fontSize: 15,
        textStyle: {
          lineHeight: 18,
        },
        maxTextWidth: module1435.BottomControlBottomButtonWidth - 50,
      };

    console.log('NewBottomMenu render');
    return React.default.createElement(
      module13.ScrollView,
      {
        ref: v,
        contentContainerStyle: [
          _.controlMenuBottom,
          {
            width: 2 * V,
          },
        ],
        horizontal: true,
        scrollEnabled: false,
        showsHorizontalScrollIndicator: false,
      },
      React.default.createElement(
        module1409.BoxShadow,
        {
          setting: S(
            S({}, Z),
            {},
            {
              width: U,
            }
          ),
        },
        React.default.createElement(
          module13.View,
          {
            style: {
              backgroundColor: l.componentBackgroundColor,
              borderRadius: 10,
              overflow: 'hidden',
            },
          },
          React.default.createElement(
            module385.LeftImageButton,
            module22.default({}, $, Y, {
              maxTextWidth: U - 50,
              style: [
                _.bottomButton,
                {
                  positon: 'absolute',
                  zIndex: 2,
                  width: U,
                },
              ],
            })
          ),
          L >= 0 &&
            React.default.createElement(module385.GradientView, {
              colors: l.homeBottomControl.gradientBackground,
              style: S(
                S({}, _.cleanProcessView),
                {},
                {
                  width: (U * L) / 100,
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
        module1409.BoxShadow,
        {
          setting: S(
            S({}, Z),
            {},
            {
              width: F,
            }
          ),
        },
        React.default.createElement(
          module385.LeftImageButton,
          module22.default({}, $, Q, {
            maxTextWidth: F - 50,
            style: [
              _.bottomButton,
              {
                width: F,
                backgroundColor: l.componentBackgroundColor,
              },
            ],
          })
        )
      ),
      React.default.createElement(
        module1409.BoxShadow,
        {
          setting: S(
            S({}, Z),
            {},
            {
              width: 43,
              style: {
                marginLeft: 2 * module1435.HorizontalMargin,
                bottom: 20,
              },
            }
          ),
        },
        React.default.createElement(module385.PureImageButton, {
          image: require('./1631'),
          imageWidth: 9.9,
          imageHeight: 18.9,
          onPress: J,
          style: [
            _.bottomButton,
            {
              width: 43,
              backgroundColor: l.componentBackgroundColor,
            },
          ],
        })
      ),
      G.map(function (t, o) {
        return React.default.createElement(
          module1409.BoxShadow,
          {
            setting: S(
              S({}, Z),
              {},
              {
                width: q,
              }
            ),
            key: 'dock_func_button_' + o,
          },
          React.default.createElement(
            module385.TopImageButton,
            module22.default({}, $, t, {
              textTop: 8,
              textStyle: {
                textAlign: 'center',
              },
              maxTextWidth: q - 16,
              style: [
                _.bottomButton,
                {
                  alignItems: 'center',
                  width: q,
                  backgroundColor: l.componentBackgroundColor,
                },
              ],
            })
          )
        );
      })
    );
  }),
  _ = module13.StyleSheet.create({
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
  p = y;

exports.default = p;

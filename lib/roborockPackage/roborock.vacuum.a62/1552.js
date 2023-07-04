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

require('./505').strings;
var y = React.forwardRef(function (t, o) {
    var l = React.useContext(module1121.AppConfigContext).theme,
      C = t.cleanIconMode,
      module1553 = undefined === C ? 'start' : C,
      _ = t.dockIconMode,
      x = undefined === _ ? 'unfold' : _,
      R = t.collectIconMode,
      P = undefined === R ? 'startCollect' : R,
      O = t.dryIconMode,
      D = undefined === O ? 'start' : O,
      I = React.useRef(),
      M = React.useRef(),
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
          return I.current;
        },
        dockButton: function () {
          return M.current;
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
          S({}, module1549.getNewCollectButtonConfig(P, l)),
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
          S({}, module1549.getNewWashButtonConfig('start', l)),
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
        S({}, module1549.getNewDryButtonConfig(D, l)),
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
    if (module381.RSM.isCollectWashDryDock()) G.push(K);

    var V = module12.Dimensions.get('window').width,
      U = 0.6 * (V - 3 * module1355.HorizontalMargin),
      F = 0.4 * (V - 3 * module1355.HorizontalMargin),
      q = (V - module1355.HorizontalMargin * (G.length + 2) - 43) / G.length,
      J = function () {
        v.current.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      },
      Q = S(
        S({}, module1549.getDockButtonConfig(x, l)),
        {},
        {
          funcId: 'home_dock_button',
          onPress: function () {
            if ('unfold' == x)
              v.current.scrollTo({
                x: V,
                y: 0,
                animated: true,
              });
            else if (W) W();
          },
          ref: M,
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
        S({}, module1549.getCleanButtonConfig(module1553, l)),
        {},
        {
          funcId: 'home_clean_button',
          onPress: T,
          ref: I,
          enabled: (A || module381.RSM.isCleaning()) && !X,
        }
      ),
      Z = S(
        S({}, module1355.BaseShadow),
        {},
        {
          height: 80,
          radius: 10,
          color: l.shadowColor,
          style: {
            bottom: 20,
            marginLeft: module1355.HorizontalMargin,
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
        maxTextWidth: module1355.BottomControlBottomButtonWidth - 50,
      };

    console.log('NewBottomMenu render');
    return React.default.createElement(
      module12.ScrollView,
      {
        ref: v,
        contentContainerStyle: [
          p.controlMenuBottom,
          {
            width: 2 * V,
          },
        ],
        horizontal: true,
        scrollEnabled: false,
        showsHorizontalScrollIndicator: false,
      },
      React.default.createElement(
        module1328.BoxShadow,
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
          module12.View,
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
                p.bottomButton,
                {
                  positon: 'absolute',
                  zIndex: 2,
                  width: U,
                },
              ],
            })
          ),
          L > 0 &&
            React.default.createElement(module385.GradientView, {
              colors: l.homeBottomControl.gradientBackground,
              start: {
                x: 0,
                y: 0,
              },
              end: {
                x: 1,
                y: 0,
              },
              style: S(
                S({}, p.cleanProcessView),
                {},
                {
                  width: (U * L) / 100,
                }
              ),
            })
        )
      ),
      React.default.createElement(
        module1328.BoxShadow,
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
              p.bottomButton,
              {
                width: F,
                backgroundColor: l.componentBackgroundColor,
              },
            ],
          })
        )
      ),
      React.default.createElement(
        module1328.BoxShadow,
        {
          setting: S(
            S({}, Z),
            {},
            {
              width: 43,
              style: {
                marginLeft: 2 * module1355.HorizontalMargin,
                bottom: 20,
              },
            }
          ),
        },
        React.default.createElement(module385.PureImageButton, {
          image: require('./1553'),
          imageWidth: 9.9,
          imageHeight: 18.9,
          onPress: J,
          style: [
            p.bottomButton,
            {
              width: 43,
              backgroundColor: l.componentBackgroundColor,
            },
          ],
        })
      ),
      G.map(function (t, o) {
        return React.default.createElement(
          module1328.BoxShadow,
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
                alignSelf: 'flex-start',
                textAlign: 'left',
                marginLeft: 6,
              },
              maxTextWidth: q - 50,
              style: [
                p.bottomButton,
                {
                  paddingLeft: 30,
                  alignItems: 'flex-start',
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
  p = module12.StyleSheet.create({
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
  _ = y;
exports.default = _;

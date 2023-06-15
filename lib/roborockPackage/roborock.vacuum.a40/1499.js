require('./391');

var module22 = require('./22'),
  module50 = require('./50'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1161 = require('./1161'),
  module1496 = require('./1496'),
  module381 = require('./381'),
  module515 = require('./515'),
  module1159 = require('./1159');

function w(t, o) {
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
      w(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      w(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

require('./393');

require('./500').strings;

var _ = React.forwardRef(function (t, o) {
    var l = React.useContext(module515.AppConfigContext).theme,
      w = t.cleanIconMode,
      module1500 = undefined === w ? 'start' : w,
      R = t.dockIconMode,
      x = undefined === R ? 'unfold' : R,
      y = t.collectIconMode,
      O = undefined === y ? 'startCollect' : y,
      P = React.useRef(),
      M = React.useRef(),
      I = React.useRef(),
      k = React.useRef(),
      E = React.useRef(),
      T = t.onPressCleanButton,
      D = t.onPressNewDockButton,
      N = t.onPressNewCollectButton,
      W = t.onPressNewWashButton,
      v = t.enabled;
    l.homeBottomControl.controlBorderColor;
    React.useImperativeHandle(o, function () {
      return {
        cleanButton: function () {
          return P.current;
        },
        dockButton: function () {
          return M.current;
        },
        newCollectButton: function () {
          return I.current;
        },
        newWashButton: function () {
          return k.current;
        },
      };
    });

    var H = [
        S(
          S({}, module1496.getNewCollectButtonConfig(O, l)),
          {},
          {
            funcId: 'home_new_collect_button',
            onPress: function () {
              console.log('handlePressNewCollectButton');
              if (N)
                N(function (t, o) {
                  if (t) K();
                  else console.log('onPressNewCollectButton error', o);
                });
            },
            ref: I,
            enabled: v || module381.RSM.isCleaning(),
          }
        ),
        S(
          S({}, module1496.getNewWashButtonConfig('start', l)),
          {},
          {
            funcId: 'home_new_wash_button',
            onPress: function () {
              console.log('handlePressNewWashButton');
              if (W)
                W(function (t, o) {
                  if (t) K();
                  else console.log('handlePressNewWashButton error', o);
                });
            },
            ref: k,
            enabled: v,
          }
        ),
      ],
      j = module12.Dimensions.get('window').width,
      A = 0.6 * (j - 3 * module1159.HorizontalMargin),
      L = 0.4 * (j - 3 * module1159.HorizontalMargin),
      z = (j - module1159.HorizontalMargin * (H.length + 2) - 43) / H.length,
      K = function () {
        E.current.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      },
      G = S(
        S({}, module1496.getDockButtonConfig(x, l)),
        {},
        {
          funcId: 'home_dock_button',
          onPress: function () {
            if ('unfold' == x)
              E.current.scrollTo({
                x: j,
                y: 0,
                animated: true,
              });
            else if (D) D();
          },
          ref: M,
          enabled:
            v ||
            module381.RSM.state == module381.RobotState.BACK_TO_DOCK ||
            module381.RSM.state == module381.RobotState.COLLECTING_DUST ||
            module381.RSM.state == module381.RobotState.WASHING_DUSTER ||
            module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER,
        }
      ),
      U =
        (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module381.RSM.state == module381.RobotState.WASHING_DUSTER) &&
        module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None,
      F = S(
        S({}, module1496.getCleanButtonConfig(module1500, l)),
        {},
        {
          funcId: 'home_clean_button',
          onPress: T,
          ref: P,
          enabled: (v || module381.RSM.isCleaning()) && !U,
        }
      ),
      V = S(
        S({}, module1159.BaseShadow),
        {},
        {
          height: 80,
          radius: 10,
          color: l.shadowColor,
          style: {
            bottom: 20,
            marginLeft: module1159.HorizontalMargin,
          },
        }
      ),
      q = {
        enabled: v,
        imageWidth: 36,
        imageHeight: 36,
        textLeft: 6,
        textColor: l.homeBottomControl.textColor,
        fontSize: 15,
        textStyle: {
          lineHeight: 18,
        },
        maxTextWidth: module1159.BottomControlBottomButtonWidth - 50,
      };

    console.log('NewBottomMenu render');
    return React.default.createElement(
      module12.ScrollView,
      {
        ref: E,
        contentContainerStyle: [
          p.controlMenuBottom,
          {
            width: 2 * j,
          },
        ],
        horizontal: true,
        scrollEnabled: false,
        showsHorizontalScrollIndicator: false,
      },
      React.default.createElement(
        module1161.BoxShadow,
        {
          setting: S(
            S({}, V),
            {},
            {
              width: A,
            }
          ),
        },
        React.default.createElement(
          module385.LeftImageButton,
          module22.default({}, q, F, {
            maxTextWidth: A - 50,
            style: [
              p.bottomButton,
              {
                width: A,
                backgroundColor: l.componentBackgroundColor,
              },
            ],
          })
        )
      ),
      React.default.createElement(
        module1161.BoxShadow,
        {
          setting: S(
            S({}, V),
            {},
            {
              width: L,
            }
          ),
        },
        React.default.createElement(
          module385.LeftImageButton,
          module22.default({}, q, G, {
            maxTextWidth: L - 50,
            style: [
              p.bottomButton,
              {
                width: L,
                backgroundColor: l.componentBackgroundColor,
              },
            ],
          })
        )
      ),
      React.default.createElement(
        module1161.BoxShadow,
        {
          setting: S(
            S({}, V),
            {},
            {
              width: 43,
              style: {
                marginLeft: 2 * module1159.HorizontalMargin,
                bottom: 20,
              },
            }
          ),
        },
        React.default.createElement(module385.PureImageButton, {
          image: require('./1500'),
          imageWidth: 9.9,
          imageHeight: 18.9,
          onPress: K,
          style: [
            p.bottomButton,
            {
              width: 43,
              backgroundColor: l.componentBackgroundColor,
            },
          ],
        })
      ),
      H.map(function (t, o) {
        return React.default.createElement(
          module1161.BoxShadow,
          {
            setting: S(
              S({}, V),
              {},
              {
                width: z,
              }
            ),
            key: 'dock_func_button_' + o,
          },
          React.default.createElement(
            module385.TopImageButton,
            module22.default({}, q, t, {
              textTop: 8,
              textStyle: {
                alignSelf: 'flex-start',
                textAlign: 'left',
                marginLeft: 6,
              },
              maxTextWidth: z - 50,
              style: [
                p.bottomButton,
                {
                  paddingLeft: 30,
                  alignItems: 'flex-start',
                  width: z,
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
  }),
  R = _;

exports.default = R;

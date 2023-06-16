require('./1409');

require('./381');

var module22 = require('./22'),
  module50 = require('./50'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module1200 = require('./1200'),
  module1435 = require('./1435');

function h(t, o) {
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
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      h(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      h(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

require('./393');

var module510 = require('./510').strings,
  O = React.forwardRef(function (t, o) {
    var u = React.useContext(module1200.AppConfigContext).theme,
      p = u.eggPage,
      h = t.dockButtonMode,
      O = undefined === h ? 'start' : h,
      B = t.attackButtonMode,
      v = undefined === B ? 'start' : B,
      C = React.useRef(),
      j = React.useRef(),
      k = t.onPressDockButton,
      P = t.onPressAttackButton;
    u.homeBottomControl.controlBorderColor;
    React.useImperativeHandle(o, function () {
      return {
        dockButton: function () {
          return C.current;
        },
        attackButton: function () {
          return j.current;
        },
      };
    });
    var x = {
        start: {
          title: module510.egg_page_attack_title,
          image: p.startAttack,
        },
        stop: {
          title: module510.egg_page_stop_button_title,
          image: p.stop,
        },
      },
      D = [
        y(
          y(
            {},
            {
              start: {
                title: module510.main_page_charge_2,
                image: p.startCharge,
              },
              stop: {
                title: module510.egg_page_stop_button_title,
                image: p.stop,
              },
            }[O]
          ),
          {},
          {
            onPress: k,
            ref: C,
          }
        ),
        y(
          y({}, x[v]),
          {},
          {
            onPress: P,
            ref: j,
          }
        ),
      ];
    return React.default.createElement(
      module13.View,
      {
        style: [
          w.controlMenuWrap,
          {
            backgroundColor: p.menuBackground,
            width: module13.Dimensions.get('window').width,
          },
        ],
      },
      React.default.createElement(
        module13.View,
        {
          style: [w.controlMenuTop],
        },
        D.map(function (t, o) {
          return React.default.createElement(
            module385.TopImageButton,
            module22.default(
              {
                key: 'top_' + o,
                imageWidth: 56,
                imageHeight: 56,
              },
              t,
              {
                fontSize: 12,
                textTop: -2,
                textColor: u.homeBottomControl.textColor,
                maxTextWidth: module1435.BottomControlTopButtonWidth - 20,
                style: [w.topButton],
              }
            )
          );
        })
      )
    );
  }),
  w = module13.StyleSheet.create({
    controlMenuWrap: {
      height: 100,
      backgroundColor: 'white',
      alignSelf: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      paddingBottom: module391.default.isIphoneX() ? 25 : 0,
      zIndex: 9,
    },
    controlMenuTop: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    topButton: {
      width: 90,
      backgroundColor: 'transparent',
    },
  }),
  B = O;

exports.default = B;

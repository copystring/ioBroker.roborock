exports.CustomMopModeView = function (t) {
  var n = React.useContext(module506.AppConfigContext).theme.ModeSettingPanel,
    y = t.items,
    w = undefined === y ? [] : y,
    C = t.currentMopId,
    v = t.didSelectMopMode,
    M = t.onPressMore,
    x = t.shouldCallRpc,
    P = React.useState(C),
    _ = module22.default(P, 2),
    j = _[0],
    S = _[1],
    k = function (t) {
      var n;
      return regeneratorRuntime.default.async(
        function (l) {
          for (;;)
            switch ((l.prev = l.next)) {
              case 0:
                if (((l.prev = 0), (l.t0 = x), !l.t0)) {
                  l.next = 6;
                  break;
                }

                l.next = 5;
                return regeneratorRuntime.default.awrap(module407.default.setCustomMopById(t.id));

              case 5:
                l.t0 = l.sent;

              case 6:
                n = l.t0;
                console.log('setCustomMopById', t.id, n);
                S(t.id);
                if (v) v(t);
                l.next = 15;
                break;

              case 12:
                l.prev = 12;
                l.t1 = l.catch(0);
                console.log('setCustomMopById', l.t1);

              case 15:
              case 'end':
                return l.stop();
            }
        },
        null,
        null,
        [[0, 12]],
        Promise
      );
    };

  return React.default.createElement(
    module12.View,
    {
      style: b(
        b({}, O.customMopModeView),
        {},
        {
          backgroundColor: n.modeSetCardBackgroundColor,
        }
      ),
    },
    React.default.createElement(
      module12.View,
      {
        style: O.top,
      },
      React.default.createElement(
        module12.Text,
        {
          style: b(
            b({}, O.title),
            {},
            {
              color: n.modeSetCardTitleColor,
            }
          ),
        },
        module491.custom_mode_panel_mop_gear_title
      )
    ),
    React.default.createElement(
      module12.View,
      {
        style: O.itemsWrap,
      },
      w.map(function (t, o) {
        var l = t.id == j;
        backgroundColor = l ? '#3777F7' : n.mopModeItemBackgroundColor;
        textColor = l ? 'white' : n.mopModeItemTexColor;
        return React.default.createElement(
          module12.View,
          {
            style: b(
              b({}, O.button),
              {},
              {
                backgroundColor: backgroundColor,
                marginRight: (o + 1) % 3 == 0 ? 0 : 10,
              }
            ),
            key: t.id,
          },
          React.default.createElement(module381.TopImageButton, {
            title: t.name,
            image: l ? t.selectedIcon : t.icon,
            imageWidth: 36,
            imageHeight: 36,
            textColor: textColor,
            style: {
              alignItems: 'flex-start',
            },
            textTop: 5,
            textStyle: {
              textAlign: 'left',
              alignSelf: 'flex-start',
              marginLeft: 18,
              maxWidth: (module12.Dimensions.get('window').width - 80 - 20) / 3 - 24,
            },
            imageStyle: {
              marginLeft: 24,
            },
            onPress: function () {
              k(t);
            },
          })
        );
      })
    ),
    React.default.createElement(module12.View, {
      style: {
        marginTop: 5,
        height: 1,
        backgroundColor: n.splitLineColor,
      },
    }),
    React.default.createElement(module381.SettingListItemView, {
      title: module491.custom_mode_panel_more_mode_title,
      shouldShowBottomLine: false,
      onPress: M,
      underlayColor: 'transparent',
      funcId: 'more_mop_mode_entrance',
      titleStyle: {
        marginLeft: -20,
        fontWeight: '500',
        fontSize: 15,
      },
      rightImgStyle: {
        marginRight: -20,
      },
      style: {
        backgroundColor: 'transparent',
        paddingVertical: 5,
      },
    })
  );
};

var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module22 = require('./22'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = y(o);
    if (n && n.has(t)) return n.get(t);
    var l = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var s = c ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (s && (s.get || s.set)) Object.defineProperty(l, u, s);
        else l[u] = t[u];
      }

    l.default = t;
    if (n) n.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module506 = require('./506'),
  module407 = require('./407');

require('./377');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (y = function (t) {
    return t ? n : o;
  })(t);
}

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

function b(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      w(Object(l), true).forEach(function (o) {
        module49.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      w(Object(l)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(l, o));
      });
  }

  return t;
}

var module491 = require('./491').strings;

var O = module12.StyleSheet.create({
  customMopModeView: {
    paddingTop: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    width: (module12.Dimensions.get('window').width - 80 - 20) / 3,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 15,
    marginBottom: 10,
  },
  top: {
    marginTop: 10,
  },
  title: {
    color: '#4A4A4A',
    fontSize: 15,
    fontWeight: '500',
  },
});

exports.CustomMopModeView = function (t) {
  var o = React.useContext(module1199.AppConfigContext).theme.ModeSettingPanel,
    n = t.items,
    b = undefined === n ? [] : n,
    x = t.currentMopId,
    _ = t.didSelectMopMode,
    O = t.onPressMore,
    S = t.shouldCallRpc,
    v = React.useState(x),
    M = module23.default(v, 2),
    I = M[0],
    P = M[1],
    j = function (t) {
      var o;
      return regeneratorRuntime.default.async(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                if (((n.prev = 0), (n.t0 = S), !n.t0)) {
                  n.next = 6;
                  break;
                }

                n.next = 5;
                return regeneratorRuntime.default.awrap(module416.default.setCustomMopById(t.id));

              case 5:
                n.t0 = n.sent;

              case 6:
                o = n.t0;
                console.log('setCustomMopById', t.id, o);
                P(t.id);
                if (_) _(t);
                n.next = 15;
                break;

              case 12:
                n.prev = 12;
                n.t1 = n.catch(0);
                console.log('setCustomMopById', n.t1);

              case 15:
              case 'end':
                return n.stop();
            }
        },
        null,
        null,
        [[0, 12]],
        Promise
      );
    },
    k = (module13.Dimensions.get('window').width - 80 - 20) / 3;

  return React.default.createElement(
    module13.View,
    {
      style: w(
        w({}, C.customMopModeView),
        {},
        {
          backgroundColor: o.modeSetCardBackgroundColor,
        }
      ),
    },
    React.default.createElement(
      module13.View,
      {
        style: C.top,
      },
      React.default.createElement(
        module13.Text,
        {
          style: w(
            w({}, C.title),
            {},
            {
              color: o.modeSetCardTitleColor,
            }
          ),
        },
        module510.custom_mode_panel_mop_gear_title
      )
    ),
    React.default.createElement(
      module13.View,
      {
        style: C.itemsWrap,
      },
      b.map(function (t, n) {
        var l = t.id == I;
        backgroundColor = l ? '#3777F7' : o.mopModeItemBackgroundColor;
        textColor = l ? 'white' : o.mopModeItemTexColor;
        return React.default.createElement(
          module13.View,
          {
            style: w(
              w({}, C.button),
              {},
              {
                backgroundColor: backgroundColor,
                marginRight: (n + 1) % 3 == 0 ? 0 : 10,
                width: k,
              }
            ),
            key: t.id,
          },
          React.default.createElement(module385.TopImageButton, {
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
              maxWidth: k - 24,
            },
            imageStyle: {
              marginLeft: 24,
            },
            funcId: 'mop_mode_' + n,
            onPress: function () {
              j(t);
            },
          })
        );
      })
    ),
    React.default.createElement(module13.View, {
      style: {
        marginTop: 5,
        height: 1,
        backgroundColor: o.splitLineColor,
      },
    }),
    React.default.createElement(module385.SettingListItemView, {
      title: module510.custom_mode_panel_more_mode_title,
      shouldShowBottomLine: false,
      onPress: O,
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

var module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1199 = require('./1199'),
  module416 = require('./416');

require('./381');

function b(t, o) {
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
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      b(Object(l), true).forEach(function (o) {
        module50.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      b(Object(l)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(l, o));
      });
  }

  return t;
}

var module510 = require('./510').strings;

var C = module13.StyleSheet.create({
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

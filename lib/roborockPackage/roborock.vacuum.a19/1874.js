require('./387');

var React = (function (t, l) {
    if (!l && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = c(l);
    if (n && n.has(t)) return n.get(t);
    var o = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var f = u ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (f && (f.get || f.set)) Object.defineProperty(o, s, f);
        else o[s] = t[s];
      }

    o.default = t;
    if (n) n.set(t, o);
    return o;
  })(require('react')),
  module12 = require('./12'),
  module506 = require('./506');

function c(t) {
  if ('function' != typeof WeakMap) return null;
  var l = new WeakMap(),
    n = new WeakMap();
  return (c = function (t) {
    return t ? n : l;
  })(t);
}

require('./491').strings;

module.exports = function (t) {
  var c = t.mainTitleData,
    s = t.subTitleData,
    f = t.mainTitleShouldShowLine,
    y = t.subTitleShouldShowLine,
    w = React.useContext(module506.AppConfigContext).theme,
    T =
      c &&
      c.map(function (t, o) {
        var s = f && o != c.length - 1;
        return React.default.createElement(
          module12.View,
          {
            style: [
              u.horizontalView,
              {
                flex: 1,
                marginHorizontal: 0,
              },
            ],
            key: o,
          },
          React.default.createElement(
            module12.View,
            {
              style: u.verticalView,
            },
            React.default.createElement(
              module12.View,
              {
                style: [u.horizontalView, {}],
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    u.unitTitle,
                    {
                      color: w.cleanHistory.bigTitleColor,
                      opacity: module12.I18nManager.isRTL ? 1 : 0,
                    },
                  ],
                },
                t.unit
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    u.bigTitle,
                    {
                      color: w.cleanHistory.bigTitleColor,
                    },
                  ],
                },
                t.value
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    u.unitTitle,
                    {
                      color: w.cleanHistory.bigTitleColor,
                      opacity: module12.I18nManager.isRTL ? 0 : 1,
                    },
                  ],
                },
                t.unit
              )
            ),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  u.smallTitle,
                  {
                    color: w.cleanHistory.smallTitleColor,
                    marginTop: 5,
                  },
                ],
              },
              t.title
            )
          ),
          s &&
            React.default.createElement(module12.View, {
              style: [
                u.verticalLine,
                {
                  backgroundColor: w.settingListItem.borderColor,
                },
              ],
            })
        );
      }),
    p =
      s &&
      s.map(function (t, o) {
        var c = y && o != s.length - 1;
        return React.default.createElement(
          module12.View,
          {
            style: [
              u.horizontalView,
              {
                flex: 1,
                marginHorizontal: 0,
              },
            ],
            key: o,
          },
          React.default.createElement(
            module12.View,
            {
              style: u.verticalView,
            },
            React.default.createElement(module12.Image, {
              source: t.icon,
              resizeMode: 'contain',
              style: u.imgTop,
            }),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  u.smallTitle,
                  {
                    color: w.cleanHistory.smallTitleColor,
                  },
                ],
              },
              t.title
            ),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  u.smallTitle,
                  {
                    color: w.cleanHistory.bigTitleColor,
                  },
                ],
              },
              t.value
            )
          ),
          c &&
            React.default.createElement(module12.View, {
              style: [
                u.verticalLine,
                {
                  backgroundColor: w.settingListItem.borderColor,
                },
              ],
            })
        );
      });
  return React.default.createElement(
    module12.View,
    {
      style: [
        u.verticalView,
        {
          paddingVertical: 10,
          flex: 0,
          backgroundColor: w.cleanHistory.backgroundColor,
        },
      ],
    },
    React.default.createElement(
      module12.View,
      {
        style: u.horizontalView,
      },
      T
    ),
    React.default.createElement(
      module12.View,
      {
        style: [
          u.horizontalView,
          {
            marginTop: 20,
          },
        ],
      },
      p
    ),
    React.default.createElement(module12.View, {
      style: [
        u.bottomLine,
        {
          backgroundColor: w.settingListItem.borderColor,
        },
      ],
    })
  );
};

var u = module12.StyleSheet.create({
  verticalView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  horizontalView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  imgTop: {
    width: 40,
    height: 40,
  },
  smallTitle: {
    fontSize: 12,
    paddingVertical: 1,
  },
  bigTitle: {
    fontSize: 38,
  },
  unitTitle: {
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  verticalLine: {
    width: 0.8,
    height: 40,
  },
  bottomLine: {
    position: 'absolute',
    width: module12.Dimensions.get('window').width,
    height: 0.8,
    bottom: 0,
    left: 0,
  },
});

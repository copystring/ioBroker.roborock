var React = require('@babel/runtime/helpers/interopRequireWildcard')(require('react')),
  module12 = require('./12'),
  module515 = require('./515');

module.exports = function (c) {
  var s = c.mainTitleData,
    u = c.subTitleData,
    f = c.mainTitleShouldShowLine,
    y = c.subTitleShouldShowLine,
    T = React.useContext(module515.AppConfigContext).theme,
    w =
      s &&
      s.map(function (o, c) {
        var u = f && c != s.length - 1;
        return React.default.createElement(
          module12.View,
          {
            style: [
              n.horizontalView,
              {
                flex: 1,
                marginHorizontal: 0,
              },
            ],
            key: c,
          },
          React.default.createElement(
            module12.View,
            {
              style: n.verticalView,
            },
            React.default.createElement(
              module12.View,
              {
                style: [n.horizontalView, {}],
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    n.unitTitle,
                    {
                      color: T.cleanHistory.bigTitleColor,
                      opacity: module12.I18nManager.isRTL ? 1 : 0,
                    },
                  ],
                },
                o.unit
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    n.bigTitle,
                    {
                      color: T.cleanHistory.bigTitleColor,
                    },
                  ],
                },
                o.value
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    n.unitTitle,
                    {
                      color: T.cleanHistory.bigTitleColor,
                      opacity: module12.I18nManager.isRTL ? 0 : 1,
                    },
                  ],
                },
                o.unit
              )
            ),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  n.smallTitle,
                  {
                    color: T.cleanHistory.smallTitleColor,
                    marginTop: 5,
                  },
                ],
              },
              o.title
            )
          ),
          u &&
            React.default.createElement(module12.View, {
              style: [
                n.verticalLine,
                {
                  backgroundColor: T.settingListItem.borderColor,
                },
              ],
            })
        );
      }),
    h =
      u &&
      u.map(function (o, c) {
        var s = y && c != u.length - 1;
        return React.default.createElement(
          module12.View,
          {
            style: [
              n.horizontalView,
              {
                flex: 1,
                marginHorizontal: 0,
              },
            ],
            key: c,
          },
          React.default.createElement(
            module12.View,
            {
              style: n.verticalView,
            },
            React.default.createElement(module12.Image, {
              source: o.icon,
              resizeMode: 'contain',
              style: n.imgTop,
            }),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  n.smallTitle,
                  {
                    color: T.cleanHistory.smallTitleColor,
                  },
                ],
              },
              o.title
            ),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  n.smallTitle,
                  {
                    color: T.cleanHistory.bigTitleColor,
                  },
                ],
              },
              o.value
            )
          ),
          s &&
            React.default.createElement(module12.View, {
              style: [
                n.verticalLine,
                {
                  backgroundColor: T.settingListItem.borderColor,
                },
              ],
            })
        );
      });
  return React.default.createElement(
    module12.View,
    {
      style: [
        n.verticalView,
        {
          paddingVertical: 10,
          flex: 0,
          backgroundColor: T.cleanHistory.backgroundColor,
        },
      ],
    },
    React.default.createElement(
      module12.View,
      {
        style: n.horizontalView,
      },
      w
    ),
    React.default.createElement(
      module12.View,
      {
        style: [
          n.horizontalView,
          {
            marginTop: 20,
          },
        ],
      },
      h
    ),
    React.default.createElement(module12.View, {
      style: [
        n.bottomLine,
        {
          backgroundColor: T.settingListItem.borderColor,
        },
      ],
    })
  );
};

var n = module12.StyleSheet.create({
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
    height: 0.8,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

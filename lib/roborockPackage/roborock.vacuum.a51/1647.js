exports.default = function (t) {
  var n = t.unitFontSize,
    f = undefined === n ? module391.default.scaledPixelForPad(18) : n,
    w = t.valueFontSize,
    x = undefined === w ? module391.default.scaledPixelForPad(18) : w,
    y = t.titleFontSize,
    v = undefined === y ? module391.default.scaledPixelForPad(12) : y,
    p = t.data,
    b = t.shouldShowLine,
    C = t.justifyContent,
    h = t.alignItems,
    V = React.useContext(module1193.AppConfigContext).theme.infoBoard,
    E = p.map(function (t, n) {
      b = b && n != p.length - 1;
      return React.default.createElement(
        module13.View,
        {
          style: [
            s.statusView,
            {
              width: (module391.default.portraitWidth() - 44) / 3,
            },
          ],
          key: n,
        },
        React.default.createElement(
          module13.View,
          {
            style: [
              s.textView,
              {
                marginRight: module391.default.isLanguageHe() && 0 == n ? 30 : 0,
              },
            ],
          },
          React.default.createElement(
            module13.View,
            null,
            React.default.createElement(
              module13.Text,
              {
                style: [
                  s.value,
                  {
                    fontSize: x,
                    color: V.valueColor,
                  },
                ],
              },
              undefined == t.value ? '--' : t.value,
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    s.unit,
                    {
                      fontSize: f,
                      color: V.unitColor,
                    },
                  ],
                },
                t.unit
              )
            )
          ),
          React.default.createElement(
            module13.View,
            {
              style: s.bottom,
            },
            React.default.createElement(
              module13.Text,
              {
                style: [
                  s.title,
                  {
                    fontSize: v,
                    color: V.descColor,
                  },
                ],
              },
              t.title
            )
          )
        ),
        b &&
          React.default.createElement(module13.View, {
            style: s.line,
          })
      );
    });
  return React.default.createElement(
    module13.View,
    {
      style: [
        s.containter,
        {
          justifyContent: C || 'center',
          alignItems: h || 'center',
          backgroundColor: 'transparent',
        },
      ],
    },
    E
  );
};

var React = require('react'),
  module13 = require('./13'),
  module391 = require('./391'),
  module1193 = require('./1193');

require('./1428');

require('./510').strings;
var s = module13.StyleSheet.create({
  containter: {
    marginLeft: 22,
    marginTop: 0,
    width: module13.Dimensions.get('window').width - 44,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
  },
  statusView: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 3,
  },
  seat: {
    flexDirection: 'row',
  },
  unit: {
    marginTop: 0,
    marginLeft: 1,
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'left',
  },
  value: {
    textAlign: 'center',
    color: 'rgba(0,0,0,0.8)',
  },
  title: {
    marginTop: 6,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
  },
  line: {
    position: 'absolute',
    top: 18,
    bottom: 18,
    right: 0,
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  textView: {
    flexDirection: 'column',
  },
});

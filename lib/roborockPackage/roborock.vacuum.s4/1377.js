exports.default = function (t) {
  var c = t.unitFontSize,
    s = undefined === c ? module387.default.scaledPixelForPad(18) : c,
    p = t.valueFontSize,
    w = undefined === p ? module387.default.scaledPixelForPad(18) : p,
    y = t.titleFontSize,
    v = undefined === y ? module387.default.scaledPixelForPad(12) : y,
    b = t.data,
    x = t.shouldShowLine,
    h = t.justifyContent,
    C = t.alignItems,
    P = React.useContext(module506.AppConfigContext).theme.infoBoard,
    j = b.map(function (t, u) {
      x = x && u != b.length - 1;
      return React.default.createElement(
        module12.View,
        {
          style: [
            f.statusView,
            {
              width: (module387.default.portraitWidth() - 44) / 3,
            },
          ],
          key: u,
        },
        React.default.createElement(
          module12.View,
          {
            style: [
              f.textView,
              {
                marginRight: module387.default.isLanguageHe() && 0 == u ? 30 : 0,
              },
            ],
          },
          React.default.createElement(
            module12.View,
            null,
            React.default.createElement(
              module12.Text,
              {
                style: [
                  f.value,
                  {
                    fontSize: w,
                    color: P.valueColor,
                  },
                ],
              },
              undefined == t.value ? '--' : t.value,
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    f.unit,
                    {
                      fontSize: s,
                      color: P.unitColor,
                    },
                  ],
                },
                t.unit
              )
            )
          ),
          React.default.createElement(
            module12.View,
            {
              style: f.bottom,
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  f.title,
                  {
                    fontSize: v,
                    color: P.descColor,
                  },
                ],
              },
              t.title
            )
          )
        ),
        x &&
          React.default.createElement(module12.View, {
            style: f.line,
          })
      );
    });
  return React.default.createElement(
    module12.View,
    {
      style: [
        f.containter,
        {
          justifyContent: h || 'center',
          alignItems: C || 'center',
          backgroundColor: 'transparent',
        },
      ],
    },
    j
  );
};

var React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = c(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var s = u ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (s && (s.get || s.set)) Object.defineProperty(l, f, s);
        else l[f] = t[f];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module387 = require('./387'),
  module506 = require('./506');

require('./1065');

function c(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (c = function (t) {
    return t ? o : n;
  })(t);
}

require('./491').strings;
var f = module12.StyleSheet.create({
  containter: {
    marginLeft: 22,
    marginTop: 0,
    width: module12.Dimensions.get('window').width - 44,
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

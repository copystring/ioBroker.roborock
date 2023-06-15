var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = h(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(l, c, f);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module387 = require('./387'),
  module506 = require('./506');

function h(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (h = function (t) {
    return t ? o : n;
  })(t);
}

function w() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module491 = require('./491').strings,
  x = (function (t) {
    module7.default(x, t);

    var module506 = x,
      h = w(),
      v = function () {
        var t,
          n = module11.default(module506);

        if (h) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function x(t) {
      module4.default(this, x);
      return v.call(this, t);
    }

    module5.default(x, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.props.unitFontSize || module387.default.scaledPixelForPad(13),
            o = this.props.valueFontSize || module387.default.scaledPixelForPad(22),
            l = this.props.titleFontSize || module387.default.scaledPixelForPad(14),
            u = this.context.theme,
            c = this.props.data.map(function (c, y) {
              var h = React.default.createElement(
                module12.Text,
                {
                  style: [
                    b.unit,
                    {
                      fontSize: n,
                      color: u.infoBoard.unitColor,
                    },
                  ],
                },
                c.unit
              );
              return React.default.createElement(
                module12.View,
                {
                  style: [
                    b.statusView,
                    {
                      width: module387.default.portraitWidth() / 3,
                    },
                  ],
                  key: y,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      b.textView,
                      {
                        marginRight: module387.default.isLanguageHe() && 0 == y ? 30 : 0,
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: b.top,
                    },
                    React.default.createElement(
                      module12.View,
                      {
                        style: [
                          b.seat,
                          {
                            opacity: module12.I18nManager.isRTL ? 1 : 0,
                          },
                        ],
                      },
                      h
                    ),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          b.value,
                          {
                            fontSize: o,
                            color: u.infoBoard.valueColor,
                          },
                        ],
                      },
                      undefined == c.value ? '--' : c.value
                    ),
                    React.default.createElement(
                      module12.View,
                      {
                        style: [
                          b.seat,
                          {
                            opacity: module12.I18nManager.isRTL ? 0 : 1,
                          },
                        ],
                      },
                      h
                    )
                  ),
                  React.default.createElement(
                    module12.View,
                    {
                      style: b.bottom,
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          b.title,
                          {
                            fontSize: l,
                            color: u.infoBoard.descColor,
                          },
                        ],
                      },
                      c.title
                    )
                  )
                ),
                t.props.shouldShowLine &&
                  React.default.createElement(module12.View, {
                    style: b.line,
                  })
              );
            });
          return React.default.createElement(
            module12.View,
            {
              style: [b.containter, this.props.style],
            },
            c
          );
        },
      },
    ]);
    return x;
  })(React.default.PureComponent);

x.defaultProps = {
  data: [
    {
      title: module491.localization_strings_CommonModules_NumberView_0,
      unit: '\u2032',
      value: '--',
    },
    {
      title: module491.localization_strings_CommonModules_NumberView_2,
      unit: '\u33a1',
      value: '--',
    },
    {
      title: module491.localization_strings_CommonModules_NumberView_3,
      unit: '%',
      value: '--',
    },
  ],
  shouldShowLine: false,
};
x.contextType = module506.AppConfigContext;
module.exports = x;
var b = module12.StyleSheet.create({
  containter: {
    width: module12.Dimensions.get('window').width,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingVertical: 10,
    minHeight: 80,
  },
  statusView: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    fontWeight: module387.default.iOSAndroidReturn('500', '400'),
    color: 'rgba(0,0,0,0.8)',
  },
  title: {
    marginTop: 2,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
  },
  line: {
    position: 'absolute',
    right: 0,
    top: 10,
    width: 1,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  textView: {
    flexDirection: 'column',
  },
});

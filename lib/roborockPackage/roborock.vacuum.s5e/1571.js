var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module391 = require('./391'),
  module1121 = require('./1121');

function w() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module505 = require('./505').strings,
  v = (function (t) {
    module7.default(v, t);

    var n = v,
      module1121 = w(),
      x = function () {
        var t,
          o = module11.default(n);

        if (module1121) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function v(t) {
      module4.default(this, v);
      return x.call(this, t);
    }

    module5.default(v, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.props.unitFontSize || module391.default.scaledPixelForPad(13),
            o = this.props.valueFontSize || module391.default.scaledPixelForPad(22),
            l = this.props.titleFontSize || module391.default.scaledPixelForPad(14),
            u = this.context.theme,
            c = this.props.data.map(function (c, s) {
              var y = React.default.createElement(
                module12.Text,
                {
                  style: [
                    V.unit,
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
                    V.statusView,
                    {
                      width: module391.default.portraitWidth() / 3,
                    },
                  ],
                  key: s,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      V.textView,
                      {
                        marginRight: module391.default.isLanguageHe() && 0 == s ? 30 : 0,
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: V.top,
                    },
                    React.default.createElement(
                      module12.View,
                      {
                        style: [
                          V.seat,
                          {
                            opacity: module12.I18nManager.isRTL ? 1 : 0,
                          },
                        ],
                      },
                      y
                    ),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          V.value,
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
                          V.seat,
                          {
                            opacity: module12.I18nManager.isRTL ? 0 : 1,
                          },
                        ],
                      },
                      y
                    )
                  ),
                  React.default.createElement(
                    module12.View,
                    {
                      style: V.bottom,
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          V.title,
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
                    style: V.line,
                  })
              );
            });
          return React.default.createElement(
            module12.View,
            {
              style: [V.containter, this.props.style],
            },
            c
          );
        },
      },
    ]);
    return v;
  })(React.default.PureComponent);

v.defaultProps = {
  data: [
    {
      title: module505.localization_strings_CommonModules_NumberView_0,
      unit: '\u2032',
      value: '--',
    },
    {
      title: module505.localization_strings_CommonModules_NumberView_2,
      unit: '\u33a1',
      value: '--',
    },
    {
      title: module505.localization_strings_CommonModules_NumberView_3,
      unit: '%',
      value: '--',
    },
  ],
  shouldShowLine: false,
};
v.contextType = module1121.AppConfigContext;
module.exports = v;
var V = module12.StyleSheet.create({
  containter: {
    alignSelf: 'stretch',
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
    fontWeight: module391.default.iOSAndroidReturn('500', '400'),
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

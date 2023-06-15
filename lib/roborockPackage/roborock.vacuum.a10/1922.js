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
    var o = v(n);
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
  module381 = require('./381'),
  module390 = require('./390'),
  module506 = require('./506');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function b() {
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
  module389 = require('./389'),
  E = function (t) {
    return t ? module12.Dimensions.get('screen').width : module12.Dimensions.get('window').width;
  },
  S = (function (t) {
    module7.default(x, t);

    var module506 = x,
      v = b(),
      S = function () {
        var t,
          n = module11.default(module506);

        if (v) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function x(t) {
      var o;
      module4.default(this, x);
      (o = S.call(this, t)).state = {
        shouldShow: false,
      };
      return o;
    }

    module5.default(x, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          React.default.createElement(
            module12.Modal,
            {
              transparent: true,
              visible: this.state.shouldShow,
              onRequestClose: function () {
                console.log('closed');
              },
            },
            o
          );
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(
              module12.View,
              {
                style: [
                  _.container,
                  {
                    width: E(true),
                    height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    _.wrap,
                    {
                      width: E(true) - 50,
                      backgroundColor: n.netWorkError.backgroundColor,
                    },
                    this.props.style,
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: (29 * E(true)) / 30,
                    },
                  },
                  React.default.createElement(module12.Image, {
                    style: _.icon,
                    resizeMode: 'contain',
                    source: n.netWorkError.icon,
                  }),
                  React.default.createElement(
                    module12.View,
                    {
                      style: _.middle,
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          _.title,
                          {
                            color: n.netWorkError.textColor,
                          },
                        ],
                      },
                      module491.nerwork_error_title
                    ),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          _.content,
                          {
                            color: n.netWorkError.textColor,
                          },
                        ],
                      },
                      module491.network_error_detail
                    )
                  )
                ),
                React.default.createElement(module12.View, {
                  style: [
                    _.line,
                    {
                      backgroundColor: n.netWorkError.lineColor,
                    },
                  ],
                }),
                React.default.createElement(module381.PureButton, {
                  title: module491.localization_strings_Setting_RemoteControlPage_51,
                  textColor: n.netWorkError.textColor,
                  style: [
                    _.button,
                    {
                      backgroundColor: n.netWorkError.backgroundColor,
                    },
                  ],
                  fontSize: 16,
                  onPress: function () {
                    t.setState({
                      shouldShow: false,
                    });
                    module389.closeCurrentPage();
                  },
                })
              )
            ),
            l = this.state.shouldShow ? o : React.default.createElement(module12.View, null);
          return module387.default.iOSAndroidReturn(l, l);
        },
      },
    ]);
    return x;
  })(React.Component);

exports.default = S;
S.contextType = module506.AppConfigContext;

var _ = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
  },
  icon: {
    marginTop: 40,
    width: 200,
    height: 106,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  middle: {
    marginTop: 40,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  content: {
    marginTop: 5,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
  line: {
    marginTop: 30,
    alignSelf: 'stretch',
    height: 1,
  },
  button: {
    alignSelf: 'stretch',
    height: 48,
  },
});

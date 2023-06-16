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
    var o = y(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
        else s[u] = t[u];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module390 = require('./390');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (y = function (t) {
    return t ? o : n;
  })(t);
}

function v() {
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

require('./491').strings;

var w = (function (t) {
  module7.default(A, t);

  var y = A,
    w = v(),
    k = function () {
      var t,
        n = module11.default(y);

      if (w) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function A(t) {
    var o;
    module4.default(this, A);
    (o = k.call(this, t)).state = {
      visible: false,
      title: '123',
      message: '66666',
      buttons: [
        {
          text: '',
          onPress: function () {
            return o.onPress1();
          },
        },
        {
          text: '',
          onPress: function () {
            return o.onPress2();
          },
        },
      ],
    };
    o.animatedOpacity = new module12.Animated.Value(0);
    return o;
  }

  module5.default(A, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'shouldComponentUpdate',
      value: function (t, n) {
        return n.visible != this.state.visible;
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = React.default.createElement(
            module12.View,
            {
              style: S.top,
            },
            React.default.createElement(
              module12.Text,
              {
                style: S.title,
              },
              this.state.title
            )
          ),
          o = React.default.createElement(
            module12.View,
            {
              style: S.middle,
            },
            React.default.createElement(
              module12.Text,
              {
                style: S.content,
                numberOfLines: 0,
              },
              this.state.message
            )
          ),
          s = (this.state.title && '' != this.state.title && n) || null,
          l = (this.state.message && '' != this.state.message && o) || null,
          u =
            this.state.buttons[0] &&
            React.default.createElement(module381.PureButton, {
              funcId: 'ios_alert_btn1',
              title: this.state.buttons[0].text,
              textColor: 'black',
              style: S.button,
              fontSize: 16,
              onPress: function () {
                t.state.buttons[0].onPress();
                t.hide();
              },
            }),
          y =
            this.state.buttons[1] &&
            React.default.createElement(module381.PureButton, {
              funcId: 'ios_alert_btn2',
              title: this.state.buttons[1].text,
              textColor: 'black',
              style: S.button,
              fontSize: 16,
              onPress: function () {
                t.state.buttons[1].onPress();
                t.hide();
              },
            }),
          v = this.animatedOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1.2, 1],
          }),
          w = this.state.visible
            ? React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    S.container,
                    S.ioscontainer,
                    {
                      opacity: this.props.noAnimated ? 1 : this.animatedOpacity,
                      height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                    },
                  ],
                },
                React.default.createElement(
                  module12.Animated.View,
                  {
                    style: [
                      S.wrap,
                      this.props.style,
                      {
                        transform: [
                          {
                            scaleX: this.props.noAnimated ? 1 : v,
                          },
                          {
                            scaleY: this.props.noAnimated ? 1 : v,
                          },
                        ],
                      },
                    ],
                  },
                  s,
                  l,
                  React.default.createElement(
                    module12.View,
                    {
                      style: S.bottom,
                    },
                    u,
                    React.default.createElement(module12.View, {
                      style: S.line,
                    }),
                    y
                  )
                )
              )
            : null,
          k = React.default.createElement(
            module12.Modal,
            {
              transparent: true,
              visible: this.state.visible,
              onRequestClose: function () {
                console.log('closed');
                t.hide();
              },
            },
            React.default.createElement(
              module12.Animated.View,
              {
                style: [
                  S.container,
                  {
                    opacity: this.props.noAnimated ? 1 : this.animatedOpacity,
                    height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    S.wrap,
                    this.props.style,
                    {
                      transform: [
                        {
                          scaleX: this.props.noAnimated ? 1 : v,
                        },
                        {
                          scaleY: this.props.noAnimated ? 1 : v,
                        },
                      ],
                    },
                  ],
                },
                s,
                l,
                React.default.createElement(
                  module12.View,
                  {
                    style: S.bottom,
                  },
                  u,
                  React.default.createElement(module12.View, {
                    style: S.line,
                  }),
                  y
                )
              )
            )
          );
        return this.props.isFromStickView ? w : k;
      },
    },
    {
      key: 'alert',
      value: function (t, n, o) {
        if (o.constructor == Array) {
          this.setState({
            title: t,
            message: n,
            buttons: o,
          });
          this.show();
        }
      },
    },
    {
      key: 'hide',
      value: function () {
        var t = this;
        if (0 != this.state.visible)
          this.props.noAnimated
            ? this.setState({
                visible: false,
              })
            : module12.Animated.timing(this.animatedOpacity, {
                toValue: 0,
                duration: 100,
              }).start(function () {
                t.setState({
                  visible: false,
                });
              });
      },
    },
    {
      key: 'show',
      value: function () {
        var t = this;
        this.setState(
          {
            visible: true,
          },
          function () {
            module12.Animated.timing(t.animatedOpacity, {
              toValue: 1,
              duration: 150,
            }).start();
          }
        );
      },
    },
  ]);
  return A;
})(React.Component);

exports.default = w;
var S = module12.StyleSheet.create({
  container: {
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ioscontainer: {
    position: 'absolute',
    zIndex: 99999,
    elevation: 99999,
    marginTop: 0,
    marginLeft: 0,
  },
  wrap: {
    marginHorizontal: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  top: {
    marginTop: 30,
  },
  title: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'normal',
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
  },
  middle: {
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  bottom: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  content: {
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 20,
    color: 'rgba(0,0,0,0.8)',
  },
  linkButton: {
    marginTop: 20,
    alignSelf: 'flex-start',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  knowMoreButton: {
    color: '#3a9ffb',
  },
  line: {
    backgroundColor: '#eeeeee',
    width: 1,
    height: 55,
    marginTop: 20,
  },
  button: {
    flex: 1,
    borderTopColor: '#eeeeee',
    borderTopWidth: 1,
    marginTop: 20,
    alignSelf: 'center',
    height: 55,
  },
});

var module22 = require('./22'),
  module4 = require('./4'),
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
    var o = x(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = s ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, u, c);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module390 = require('./390'),
  module1061 = require('./1061'),
  module506 = require('./506'),
  module935 = require('./935'),
  module936 = require('./936'),
  module934 = require('./934');

function x(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (x = function (t) {
    return t ? o : n;
  })(t);
}

function S() {
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

require('./389');

var module491 = require('./491').strings,
  O = (function (t) {
    module7.default(x, t);

    var module387 = x,
      module506 = S(),
      A = function () {
        var t,
          n = module11.default(module387);

        if (module506) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function x(t) {
      var n;
      module4.default(this, x);
      (n = A.call(this, t)).state = {
        visible: false,
        title: '123',
        message: '66666',
        buttonWidth: 0,
        buttons: [
          {
            text: '',
            onPress: function () {
              return n.onPress1();
            },
          },
          {
            text: '',
            onPress: function () {
              return n.onPress2();
            },
          },
        ],
      };
      n.animatedOpacity = new module12.Animated.Value(0);
      n.hasLayout = false;
      return n;
    }

    module5.default(x, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module1061.default.shared().popGestureEnabled = true;
        },
      },
      {
        key: 'onWrapLayout',
        value: function (t) {
          var n = t.nativeEvent.layout,
            o = n.width;
          n.height;

          if (!this.hasLayout) {
            this.hasLayout = true;
            this.setState({
              buttonWidth: o / (this.state.buttons.length || 2),
            });
          }
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.state,
            l = o.title,
            s = o.message,
            u = o.buttons,
            c = o.titleColor,
            b = o.buttonWidth,
            v = o.contentAlignment;

          if (!s) {
            s = l;
            l = null;
          }

          var w = this.context.theme.alert,
            A = this.props,
            x = A.isModal,
            S = A.style,
            E = module22.default(u, 2),
            O = E[0],
            R = E[1],
            k = {
              width: b,
              borderTopColor: w.lineColor,
              borderRightColor: w.lineColor,
            },
            M =
              O &&
              React.default.createElement(module381.PureButton, {
                funcId: 'alert_btn1',
                title: O.text,
                textColor: O.color || '#007AFF',
                style: [_.button, k],
                fontSize: 17,
                onPress: function () {
                  t.hide();
                  if (O.onPress) O.onPress();
                },
              }),
            W =
              R &&
              React.default.createElement(module381.PureButton, {
                funcId: 'alert_btn2',
                title: R.text,
                textColor: R.color || w.textColor,
                style: [_.button, k],
                fontSize: 17,
                onPress: function () {
                  t.hide();
                  if (R.onPress) R.onPress();
                },
              }),
            T = this.animatedOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [1.2, 1],
            }),
            z = React.default.createElement(
              module12.Animated.View,
              {
                style: [
                  _.container,
                  {
                    opacity: this.props.noAnimated ? 1 : this.animatedOpacity,
                    height: module390.default.sharedCache().ScreenHeight,
                  },
                  S,
                ],
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    _.wrap,
                    {
                      backgroundColor: w.backgroundColor,
                      transform: [
                        {
                          scaleX: this.props.noAnimated ? 1 : T,
                        },
                        {
                          scaleY: this.props.noAnimated ? 1 : T,
                        },
                      ],
                    },
                  ],
                  onLayout: this.onWrapLayout.bind(this),
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: _.top,
                  },
                  !!l &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          _.title,
                          {
                            color: c || w.textColor,
                          },
                        ],
                      },
                      l
                    ),
                  !!s &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          _.content,
                          {
                            textAlign: v || 'center',
                            fontSize: l ? 14 : 16,
                            lineHeight: l ? 20 : 24,
                            color: l ? w.detailColor : w.textColor,
                          },
                        ],
                        numberOfLines: 0,
                      },
                      s + ' '
                    )
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: _.bottom,
                  },
                  M,
                  W
                )
              )
            ),
            j = React.default.createElement(module936.NavigationConsumer, null, function (n) {
              var o = t.props.navigation || n;
              return o
                ? React.default.createElement(
                    module935.default,
                    {
                      transparent: true,
                      visible: true,
                      navigation: o,
                      onRequestClose: function () {
                        console.log('closed');
                        t.hide();
                      },
                    },
                    z
                  )
                : React.default.createElement(
                    module12.Modal,
                    {
                      transparent: true,
                      visible: true,
                      navigation: o,
                      onRequestClose: function () {
                        console.log('closed');
                        t.hide();
                      },
                    },
                    z
                  );
            });
          return this.state.visible ? (x ? j : z) : null;
        },
      },
      {
        key: 'customAlert',
        value: function (t, n, o, l, s) {
          var u = s.confirmTitle,
            c = s.cancelTitle,
            f = s.confirmColor,
            h = s.titleColor,
            p = s.shouldShowCancel,
            b = s.contentAlignment,
            y = undefined === p || p,
            v = {
              text: u || module491.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: o,
              color: f,
            },
            w = {
              text: c || module491.localization_strings_Main_MainPage_11,
              onPress: l,
            },
            C = y ? [w, v] : [v];
          this.setState({
            title: t,
            message: n,
            buttons: C,
            confirmColor: f,
            titleColor: h,
            confirmTitle: u,
            cancelTitle: c,
            contentAlignment: b,
          });
          this.show();
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
          module1061.default.shared().popGestureEnabled = this.props.hidePopGestureEnabled;

          if (0 != this.state.visible) {
            this.needShow = false;
            if (this.props.noAnimated)
              this.setState({
                visible: false,
              });
            else
              module12.Animated.timing(this.animatedOpacity, {
                toValue: 0,
                duration: 100,
              }).start(function () {
                if (!t.needShow)
                  t.setState({
                    visible: false,
                  });
              });
          }
        },
      },
      {
        key: 'show',
        value: function () {
          var t = this;
          module1061.default.shared().popGestureEnabled = this.props.showPopGestureEnabled;
          this.hasLayout = false;
          this.needShow = true;
          if (this.props.noAnimated)
            this.setState({
              visible: true,
            });
          else
            this.setState(
              {
                visible: true,
              },
              function () {
                module12.Animated.spring(t.animatedOpacity, {
                  toValue: 1,
                  duration: 150,
                }).start();
              }
            );
        },
      },
    ]);
    return x;
  })(React.Component);

exports.default = O;
O.contextType = module506.AppConfigContext;
O.defaultProps = {
  isModal: true,
  hidePopGestureEnabled: true,
  showPopGestureEnabled: false,
};

var _ = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    elevation: 9999,
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: module934.AppBorderRadius,
  },
  wrap: {
    maxWidth: (module12.Dimensions.get('window').width - 40) ** 500,
    minWidth: (module12.Dimensions.get('window').width - 40) ** 500,
    marginHorizontal: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  top: {
    justifyContent: 'center',
    paddingTop: module387.default.iOSAndroidReturn(44, 40),
    paddingBottom: 40,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: module387.default.iOSAndroidReturn(module387.default.scaledPixel(20), 17),
    lineHeight: 1.5 * module387.default.iOSAndroidReturn(module387.default.scaledPixel(20), 17),
    color: '#4A4A4A',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
  },
  content: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    borderTopWidth: 0.8,
    height: 55,
    borderRightWidth: 0.8,
  },
});

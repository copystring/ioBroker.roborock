var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module391 = require('./391'),
  module394 = require('./394'),
  module1419 = require('./1419'),
  module1121 = require('./1121'),
  module1138 = require('./1138'),
  module1139 = require('./1139'),
  module1265 = require('./1265');

function S() {
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
  R = (function (t) {
    module7.default(P, t);

    var n = P,
      module391 = S(),
      w = function () {
        var t,
          o = module11.default(n);

        if (module391) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);
      (n = w.call(this, t)).state = {
        visible: false,
        title: '123',
        message: '66666',
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
      return n;
    }

    module5.default(P, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module1419.default.shared().popGestureEnabled = true;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.state,
            l = n.title,
            s = n.message,
            u = n.buttons,
            c = n.titleColor,
            f = n.contentAlignment,
            C = n.backgroundColor,
            y = n.lineColor,
            w = n.textColor;

          if (!s) {
            s = l;
            l = null;
          }

          var P = this.context.theme.alert,
            S = this.props,
            E = S.isModal,
            R = S.style,
            k = module23.default(u, 2),
            T = k[0],
            z = k[1],
            M = {
              borderTopColor: y || P.lineColor,
              borderRightColor: y || P.lineColor,
            },
            O =
              T &&
              React.default.createElement(module385.PureButton, {
                funcId: 'alert_btn1',
                title: T.text,
                textColor: T.color || '#007AFF',
                style: [_.button, M],
                fontSize: 17,
                onPress: function () {
                  t.hide();
                  if (T.onPress) T.onPress();
                },
              }),
            D =
              z &&
              React.default.createElement(module385.PureButton, {
                funcId: 'alert_btn2',
                title: z.text,
                textColor: z.color || P.textColor,
                style: [_.button, M],
                fontSize: 17,
                onPress: function () {
                  t.hide();
                  if (z.onPress) z.onPress();
                },
              }),
            G = this.animatedOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [1.2, 1],
            }),
            V = {
              opacity: this.props.noAnimated ? 1 : this.animatedOpacity,
              height: module394.default.sharedCache().ScreenHeight,
              width: module12.Dimensions.get('window').width,
            },
            H = React.default.createElement(
              module12.Animated.View,
              {
                style: [_.container, V, R],
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    _.wrap,
                    {
                      backgroundColor: C || P.backgroundColor,
                      transform: [
                        {
                          scaleX: this.props.noAnimated ? 1 : G,
                        },
                        {
                          scaleY: this.props.noAnimated ? 1 : G,
                        },
                      ],
                      maxWidth: (module12.Dimensions.get('window').width - 40) ** 400,
                      minWidth: (module12.Dimensions.get('window').width - 40) ** 400,
                    },
                  ],
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
                            color: c || P.textColor,
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
                            textAlign: f || 'center',
                            fontSize: l ? 14 : 16,
                            lineHeight: l ? 20 : 24,
                            color: l ? P.detailColor : w || P.textColor,
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
                  O,
                  D
                )
              )
            ),
            I = React.default.createElement(module1139.NavigationConsumer, null, function (n) {
              var o = t.props.navigation || n;
              return o
                ? React.default.createElement(
                    module1138.default,
                    {
                      transparent: true,
                      visible: true,
                      navigation: o,
                      onRequestClose: function () {
                        console.log('closed');
                        t.hide();
                      },
                    },
                    H
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
                    H
                  );
            });
          return this.state.visible ? (E ? I : H) : null;
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
            C = s.backgroundColor,
            v = s.lineColor,
            y = s.textColor,
            w = undefined === p || p,
            x = {
              text: u || module505.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: o,
              color: f,
            },
            A = {
              text: c || module505.localization_strings_Main_MainPage_11,
              onPress: l,
            },
            P = w ? [A, x] : [x];
          this.setState({
            title: t,
            message: n,
            buttons: P,
            confirmColor: f,
            titleColor: h,
            confirmTitle: u,
            cancelTitle: c,
            contentAlignment: b,
            backgroundColor: C,
            lineColor: v,
            textColor: y,
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
          module1419.default.shared().popGestureEnabled = this.props.hidePopGestureEnabled;

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
          module1419.default.shared().popGestureEnabled = this.props.showPopGestureEnabled;
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
    return P;
  })(React.Component);

exports.default = R;
R.contextType = module1121.AppConfigContext;
R.defaultProps = {
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
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: module1265.AppBorderRadius,
  },
  wrap: {
    marginHorizontal: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  top: {
    justifyContent: 'center',
    paddingTop: module391.default.iOSAndroidReturn(44, 40),
    paddingBottom: 40,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: module391.default.iOSAndroidReturn(module391.default.scaledPixel(20), 17),
    lineHeight: 1.5 * module391.default.iOSAndroidReturn(module391.default.scaledPixel(20), 17),
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
    flex: 1,
    backgroundColor: 'transparent',
    borderTopWidth: 0.8,
    height: 55,
    borderRightWidth: 0.8,
  },
});

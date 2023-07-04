var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module394 = require('./394'),
  module1500 = require('./1500'),
  module1199 = require('./1199'),
  module1216 = require('./1216'),
  module1217 = require('./1217'),
  module1343 = require('./1343');

function P() {
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

var module510 = require('./510').strings,
  R = (function (t) {
    module9.default(A, t);

    var n = A,
      module391 = P(),
      S = function () {
        var t,
          o = module12.default(n);

        if (module391) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function A(t) {
      var n;
      module6.default(this, A);
      (n = S.call(this, t)).state = {
        visible: false,
        title: '123',
        message: '66666',
        option: null,
        isSelected: true,
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
      n.animatedOpacity = new module13.Animated.Value(0);
      return n;
    }

    module7.default(A, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module1500.default.shared().popGestureEnabled = true;
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
            v = n.backgroundColor,
            y = n.lineColor,
            S = n.textColor,
            A = n.option,
            P = n.isSelected;

          if (!s) {
            s = l;
            l = null;
          }

          var E = this.context.theme.alert,
            R = this.props,
            k = R.isModal,
            T = R.style,
            O = module23.default(u, 2),
            z = O[0],
            I = O[1],
            M = {
              borderTopColor: y || E.lineColor,
              borderRightColor: y || E.lineColor,
            },
            D =
              z &&
              React.default.createElement(module385.PureButton, {
                funcId: 'alert_btn1',
                title: z.text,
                textColor: z.color || '#007AFF',
                style: [_.button, M],
                fontSize: 17,
                onPress: function () {
                  t.hide();
                  if (z.onPress) z.onPress();
                },
              }),
            H =
              I &&
              React.default.createElement(module385.PureButton, {
                funcId: 'alert_btn2',
                title: I.text,
                textColor: I.color || E.textColor,
                style: [_.button, M],
                fontSize: 17,
                onPress: function () {
                  t.hide();
                  if (I.onPress) I.onPress();
                },
              }),
            V = this.animatedOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [1.2, 1],
            }),
            W = {
              opacity: this.props.noAnimated ? 1 : this.animatedOpacity,
              height: module394.default.sharedCache().ScreenHeight,
              width: module13.Dimensions.get('window').width,
            },
            module1337 = React.default.createElement(
              module13.Animated.View,
              {
                style: [_.container, W, T],
              },
              React.default.createElement(
                module13.Animated.View,
                {
                  style: [
                    _.wrap,
                    {
                      backgroundColor: v || E.backgroundColor,
                      transform: [
                        {
                          scaleX: this.props.noAnimated ? 1 : V,
                        },
                        {
                          scaleY: this.props.noAnimated ? 1 : V,
                        },
                      ],
                      maxWidth: (module13.Dimensions.get('window').width - 40) ** 400,
                      minWidth: (module13.Dimensions.get('window').width - 40) ** 400,
                    },
                  ],
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: _.top,
                  },
                  !!l &&
                    React.default.createElement(
                      module13.Text,
                      {
                        style: [
                          _.title,
                          {
                            color: c || E.textColor,
                          },
                        ],
                      },
                      l
                    ),
                  !!s &&
                    React.default.createElement(
                      module13.Text,
                      {
                        style: [
                          _.content,
                          {
                            textAlign: f || 'center',
                            fontSize: l ? 14 : 16,
                            lineHeight: l ? 20 : 24,
                            color: l ? E.detailColor : S || E.textColor,
                          },
                        ],
                        numberOfLines: 0,
                      },
                      s + ' '
                    ),
                  !!A &&
                    React.default.createElement(
                      module13.View,
                      {
                        style: [_.optionItem],
                      },
                      React.default.createElement(module385.PureImageButton, {
                        imageWidth: 18,
                        imageHeight: 18,
                        hitSlop: {
                          top: 15,
                          bottom: 15,
                          left: 15,
                          right: 15,
                        },
                        image: require('./1336'),
                        selectedImage: require('./1337'),
                        selected: P,
                        onPress: function () {
                          return t.setState(
                            {
                              isSelected: !P,
                            },
                            function () {
                              var n;
                              if (!(null == (n = t.props) || null == n.didSelectOption)) n.didSelectOption(!P);
                            }
                          );
                        },
                      }),
                      React.default.createElement(
                        module13.Text,
                        {
                          numberOfLines: 0,
                          style: {
                            color: E.detailColor,
                            fontSize: 14,
                            maxWidth: 180,
                            marginLeft: 8,
                          },
                        },
                        A
                      )
                    )
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: _.bottom,
                  },
                  D,
                  H
                )
              )
            ),
            B = React.default.createElement(module1217.NavigationConsumer, null, function (n) {
              var o = t.props.navigation || n;
              return o
                ? React.default.createElement(
                    module1216.default,
                    {
                      transparent: true,
                      visible: true,
                      navigation: o,
                      onRequestClose: function () {
                        console.log('closed');
                        t.hide();
                      },
                    },
                    module1337
                  )
                : React.default.createElement(
                    module13.Modal,
                    {
                      transparent: true,
                      visible: true,
                      navigation: o,
                      onRequestClose: function () {
                        console.log('closed');
                        t.hide();
                      },
                    },
                    module1337
                  );
            });
          return this.state.visible ? (k ? B : module1337) : null;
        },
      },
      {
        key: 'customAlert',
        value: function (t, n, o, l, s) {
          var u = this,
            c = s.confirmTitle,
            f = s.cancelTitle,
            h = s.confirmColor,
            p = s.titleColor,
            b = s.shouldShowCancel,
            v = s.contentAlignment,
            C = s.backgroundColor,
            y = s.lineColor,
            S = s.textColor,
            x = s.option,
            w = s.isSelected,
            A = undefined === b || b,
            P = {
              text: c || module510.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: o,
              color: h,
            },
            R = {
              text: f || module510.localization_strings_Main_MainPage_11,
              onPress: l,
            },
            _ = A ? [R, P] : [P];

          this.setState(
            {
              title: t,
              message: n,
              buttons: _,
              confirmColor: h,
              titleColor: p,
              confirmTitle: c,
              cancelTitle: f,
              contentAlignment: v,
              backgroundColor: C,
              lineColor: y,
              textColor: S,
              option: x,
              isSelected: w,
            },
            function () {
              u.show();
            }
          );
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
          var t = this,
            n = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
          module1500.default.shared().popGestureEnabled = this.props.hidePopGestureEnabled;

          if (0 != this.state.visible) {
            this.needShow = false;
            if (this.props.noAnimated)
              this.setState(
                {
                  visible: false,
                },
                function () {
                  return null == n ? undefined : n();
                }
              );
            else
              module13.Animated.timing(this.animatedOpacity, {
                toValue: 0,
                duration: 100,
              }).start(function () {
                if (t.needShow) {
                  if (!(null == n)) n();
                } else
                  t.setState(
                    {
                      visible: false,
                    },
                    function () {
                      return null == n ? undefined : n();
                    }
                  );
              });
          }
        },
      },
      {
        key: 'show',
        value: function () {
          var t = this;
          module1500.default.shared().popGestureEnabled = this.props.showPopGestureEnabled;
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
                module13.Animated.spring(t.animatedOpacity, {
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

exports.default = R;
R.contextType = module1199.AppConfigContext;
R.defaultProps = {
  isModal: true,
  hidePopGestureEnabled: true,
  showPopGestureEnabled: false,
};

var _ = module13.StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    elevation: 9999,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: module1343.AppBorderRadius,
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
  optionItem: {
    alignSelf: 'stretch',
    paddingHorizontal: 36,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1121 = require('./1121'),
  module394 = require('./394'),
  module391 = require('./391'),
  module385 = require('./385');

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
  V = (function (t) {
    module7.default(E, t);

    var o = E,
      module1121 = w(),
      V = function () {
        var t,
          n = module11.default(o);

        if (module1121) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var o;
      module4.default(this, E);
      (o = V.call(this, t)).groups = t.groups;
      o.state = {
        page: 0,
        modalVisible: false,
        confirmColor: '#007AFF',
      };
      o.animatedOpacity = new module12.Animated.Value(0);
      return o;
    }

    module5.default(E, [
      {
        key: 'theme',
        get: function () {
          return this.context.theme.guideImages;
        },
      },
    ]);
    module5.default(E, [
      {
        key: 'dismissModalView',
        value: function () {
          var t = this;
          if (0 != this.state.modalVisible)
            module12.Animated.timing(this.animatedOpacity, {
              toValue: 0,
              duration: 100,
            }).start(function () {
              t.setState({
                modalVisible: false,
                page: 0,
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
              modalVisible: true,
            },
            function () {
              module12.Animated.spring(t.animatedOpacity, {
                toValue: 1,
                duration: 150,
              }).start(function () {});
            }
          );
        },
      },
      {
        key: 'startLoading',
        value: function () {
          this.setState({
            loading: true,
          });
        },
      },
      {
        key: 'endLoading',
        value: function () {
          this.setState({
            loading: false,
          });
        },
      },
      {
        key: 'next',
        value: function () {
          if (this.groups) {
            var t = this.state.page + 1 >= this.groups.length ? 0 : this.state.page + 1;
            this.setState({
              page: t,
            });
          }
        },
      },
      {
        key: 'render',
        value: function () {
          var t,
            o,
            n,
            l,
            s = this;
          if (0 == this.state.modalVisible) return React.default.createElement(module12.View, null);

          var u = module12.Dimensions.get('window').width,
            c = (u - 52) ** 375,
            p = (1320 * c) / 900,
            w = (null != (t = null == (o = this.groups) ? undefined : o.length) ? t : 0) > 0 ? this.groups[this.state.page] : this.props,
            V = w.bgImage,
            E = w.topTitle,
            v = w.context,
            S = w.buttonInfo,
            k = w.buttonFuncId,
            I = w.onPressSingleButton,
            B = E,
            T = S
              ? S[0]
              : this.state.page == (null != (n = null == (l = this.groups) ? undefined : l.length) ? n : 1) - 1
              ? module505.localization_strings_Setting_RemoteControlPage_51
              : module505.next_step,
            _ = React.default.createElement(
              module12.View,
              {
                style: {
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: c,
                  justifyContent: 'center',
                },
              },
              React.default.createElement(module385.PureButton, {
                funcId: (k && k[0]) || 'operation_guide_left',
                style: [
                  P.sureButton,
                  {
                    marginLeft: 0,
                    borderLeftWidth: 0,
                    backgroundColor: this.theme.backgroundColor,
                  },
                ],
                title: T,
                fontSize: module391.default.scaledPixelForPad(16),
                textColor: this.theme.titleColor,
                onPress: function () {
                  if (I) I();
                  else s.dismissModalView();
                },
              })
            ),
            R = React.default.createElement(
              module12.View,
              {
                style: {
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: c,
                  justifyContent: 'center',
                },
              },
              React.default.createElement(module385.PureButton, {
                funcId: (k && k[0]) || 'operation_guide_left',
                style: [
                  P.pinButton,
                  {
                    borderLeftWidth: 0,
                    backgroundColor: this.theme.backgroundColor,
                    borderColor: this.theme.seperatorColor,
                  },
                ],
                title: S && S[0],
                fontSize: module391.default.scaledPixelForPad(16),
                textColor: this.theme.titleColor,
                onPress: function () {
                  if (s.props.onPressLeftButton) s.props.onPressLeftButton();
                  s.dismissModalView();
                },
              }),
              React.default.createElement(module385.PureButton, {
                funcId: (k && k[1]) || 'operation_guide_right',
                style: [
                  P.pinButton,
                  {
                    borderRightWidth: 0,
                    backgroundColor: this.theme.backgroundColor,
                    borderColor: this.theme.seperatorColor,
                  },
                ],
                title: S && S[1],
                fontSize: module391.default.scaledPixelForPad(16),
                textColor: this.theme.titleColor,
                enabled: true,
                onPress: function () {
                  if (s.props.onPressGoSetting) s.props.onPressGoSetting();
                },
              })
            ),
            z = React.default.createElement(
              module12.View,
              {
                style: {
                  alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
                  marginTop: 10,
                  paddingHorizontal: 25,
                },
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    color: this.theme.titleColor,
                    fontSize: module391.default.scaledPixelForPad(18),
                  },
                },
                '' + B
              )
            ),
            L = React.default.createElement(
              module12.View,
              {
                style: P.contextView,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    color: this.theme.contentColor,
                    fontSize: module391.default.scaledPixelForPad(14),
                    marginTop: 0,
                    lineHeight: 18,
                  },
                },
                v
              )
            ),
            F = React.default.createElement(
              module12.View,
              {
                style: P.hintTextView,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    color: this.theme.contentColor,
                    fontSize: module391.default.scaledPixelForPad(12),
                    marginTop: 3,
                    lineHeight: 16,
                  },
                },
                this.props.hintText
              )
            ),
            H = React.default.createElement(
              module12.View,
              {
                style: P.loadingView,
              },
              React.default.createElement(module385.Spinner, null)
            ),
            M = this.props.contentComponent
              ? this.props.contentComponent
              : React.default.createElement(
                  React.default.Fragment,
                  null,
                  React.default.createElement(module12.Image, {
                    source: V,
                    style: {
                      width: c,
                      height: (29 * c) / 30,
                    },
                  }),
                  React.default.createElement(
                    module12.View,
                    {
                      style: [
                        P.scrollViewWrap,
                        {
                          width: c,
                          maxHeight: p / 2 - 80,
                        },
                      ],
                    },
                    React.default.createElement(
                      module12.ScrollView,
                      {
                        contentContainerStyle: {
                          alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
                        },
                        style: {
                          flexGrow: 0,
                        },
                      },
                      React.default.createElement(
                        module12.TouchableOpacity,
                        {
                          activeOpacity: 1,
                        },
                        z,
                        L,
                        F
                      )
                    )
                  )
                );

          return React.default.createElement(
            module385.AModal,
            {
              isModal: this.props.isModal,
              style: {
                zIndex: 9999,
              },
              transparent: true,
              visible: this.state.modalVisible,
              onRequestClose: function () {},
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  P.container,
                  {
                    height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    P.wrap,
                    {
                      backgroundColor: this.theme.backgroundColor,
                    },
                  ],
                },
                M,
                React.default.createElement(module12.View, {
                  style: {
                    backgroundColor: this.theme.seperatorColor,
                    height: 1,
                    alignSelf: 'stretch',
                  },
                }),
                (null == S ? undefined : S.length) > 1 ? R : _,
                this.props.hasCloseButton &&
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        position: 'absolute',
                        top: 20,
                        right: 20,
                      },
                    },
                    React.default.createElement(module385.PureImageButton, {
                      funcId: 'close_operation_switch_guide',
                      image: this.context.theme.popMsgBox.close,
                      imageWidth: 24,
                      imageHeight: 24,
                      hitSlop: {
                        top: 20,
                        left: 30,
                        bottom: 20,
                        right: 15,
                      },
                      onPress: function () {
                        if (!(null == s.props.onPressClose)) s.props.onPressClose();
                        s.dismissModalView();
                      },
                    })
                  )
              ),
              this.state.loading && H
            )
          );
        },
      },
    ]);
    return E;
  })(React.Component);

exports.default = V;
V.contextType = module1121.AppConfigContext;
var P = module12.StyleSheet.create({
  sureButton: {
    height: 50,
    backgroundColor: 'white',
    flex: 1,
  },
  pinButton: {
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: '#EBEBEB',
    borderBottomColor: 'transparent',
    height: 50,
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  wrap: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
  },
  contextView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
    marginTop: 10,
    paddingHorizontal: 25,
  },
  hintTextView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
    paddingHorizontal: 25,
  },
  scrollViewWrap: {
    paddingBottom: 10,
  },
  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

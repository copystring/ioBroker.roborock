var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1121 = require('./1121'),
  module394 = require('./394'),
  module391 = require('./391'),
  module385 = require('./385');

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
  C = (function (t) {
    module7.default(k, t);

    var n = k,
      module1121 = S(),
      C = function () {
        var t,
          o = module11.default(n);

        if (module1121) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var n, o;
      module4.default(this, k);
      (o = C.call(this, t)).state = {
        page: 0,
        modalVisible: false,
        confirmColor: '#007AFF',
        groups: null != (n = t.groups) ? n : [],
      };
      o.animatedOpacity = new module12.Animated.Value(0);
      return o;
    }

    module5.default(k, [
      {
        key: 'theme',
        get: function () {
          return this.context.theme.guideImages;
        },
      },
    ]);
    module5.default(k, [
      {
        key: 'initPanGestures',
        value: function () {
          var t = this;
          this.pan = new module12.Animated.ValueXY();
          this.panResponder = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onStartShouldSetPanResponderCapture: function () {
              return false;
            },
            onMoveShouldSetPanResponderCapture: function () {
              return false;
            },
            onMoveShouldSetPanResponder: function (t, n) {
              return false;
            },
            onPanResponderGrant: function () {
              t.pan.setOffset({
                x: t.pan.x._value,
                y: t.pan.y._value,
              });
            },
            onPanResponderMove: function (n, o) {
              t.pan.setValue({
                x: o.dx,
                y: 0 ** o.dy,
              });
            },
            onPanResponderRelease: function (n, o) {
              if (t.pan.x._value > 10) t.last();
              else if (t.pan.x._value < -10) t.next();
              t.pan.flattenOffset();
            },
          });
        },
      },
      {
        key: 'dismissModalView',
        value: function () {
          var t = this,
            n = !(arguments.length > 0 && undefined !== arguments[0]) || arguments[0];
          if (0 != this.state.modalVisible)
            module12.Animated.timing(this.animatedOpacity, {
              toValue: 0,
              duration: 100,
            }).start(function () {
              if (n)
                t.setState(
                  {
                    modalVisible: false,
                    page: 0,
                    groups: [],
                  },
                  function () {
                    var n;
                    if (!(null == (n = t.props) || null == n.onDismiss)) n.onDismiss();
                  }
                );
              else
                t.setState(
                  {
                    modalVisible: false,
                  },
                  function () {
                    var n;
                    if (!(null == (n = t.props) || null == n.onDismiss)) n.onDismiss();
                  }
                );
            });
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
        key: 'show',
        value: function () {
          var t = this;
          if (this.state.groups.length > 0)
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
        key: 'add',
        value: function (t) {
          this.setState({
            groups: this.state.groups.concat(t),
          });
        },
      },
      {
        key: 'replaceDataAtIndex',
        value: function (t, n) {
          var o = this.state.groups.concat();
          o[n] = t;
          this.setState({
            groups: o,
          });
        },
      },
      {
        key: 'next',
        value: function () {
          if (this.state.groups) {
            var t = this.state.page + 1 >= this.state.groups.length ? this.state.groups.length - 1 : this.state.page + 1;
            this.setState({
              page: t,
            });
          }
        },
      },
      {
        key: 'nextOrHide',
        value: function () {
          var t, n;
          if (this.state.page == (null != (t = null == (n = this.state.groups) ? undefined : n.length) ? t : 1) - 1) this.dismissModalView();
          else this.next();
        },
      },
      {
        key: 'last',
        value: function () {
          if (this.state.groups) {
            var t = this.state.page - 1 < 0 ? 0 : this.state.page - 1;
            this.setState({
              page: t,
            });
          }
        },
      },
      {
        key: 'toggleSwitch',
        value: function (t) {
          var n = this.state.groups;
          n[this.state.page].switchInfo.on = t;
          this.setState({
            groups: n,
          });
        },
      },
      {
        key: 'selectCheckBox',
        value: function (t) {
          var n = this.state.groups;
          n[this.state.page].checkBoxInfo.selected = t;
          this.setState({
            groups: n,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t,
            n,
            l,
            s,
            u,
            c = this;
          if (0 == this.state.modalVisible) return React.default.createElement(module12.View, null);
          var f = module12.Dimensions.get('window').width,
            v = (f - 52) ** 375,
            S = (1320 * v) / 900,
            C = (null != (t = null == (n = this.state.groups) ? undefined : n.length) ? t : 0) > 0 ? this.state.groups[this.state.page] : this.props,
            k = C.bgImage,
            P = C.topTitle,
            R = C.context,
            I = C.buttonInfo,
            E = C.buttonFuncId,
            T = C.onPressSingleButton,
            _ = C.switchInfo,
            H = C.checkBoxInfo,
            O = C.autoNextPage,
            D = undefined === O || O,
            z = P,
            M = React.default.createElement(
              module12.View,
              {
                style: {
                  flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                  justifyContent: _ ? 'space-between' : 'flex-start',
                  alignItems: 'center',
                  marginTop: 32,
                  paddingHorizontal: 25,
                },
              },
              H &&
                React.default.createElement(
                  module12.TouchableOpacity,
                  {
                    style: {
                      paddingRight: 5,
                    },
                    onPress: function () {
                      if (!(null == H)) H.onSelect(!(null == H ? undefined : H.selected));
                    },
                  },
                  React.default.createElement(module12.Image, {
                    style: {
                      width: 24,
                      height: 24,
                    },
                    source: (null == H ? undefined : H.selected) ? this.theme.selectedIcon : this.theme.unselectedIcon,
                  })
                ),
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    color: this.theme.titleColor,
                    fontSize: module391.default.scaledPixelForPad(18),
                    lineHeight: module391.default.scaledPixelForPad(24),
                  },
                  numberOfLines: 2,
                },
                '' + z
              ),
              _ &&
                React.default.createElement(module385.ToggleSwitch, {
                  funcId: 'map_save_switch_guide',
                  onToggle: null == _ ? undefined : _.switchValueChanged,
                  isOn: (null == _ ? undefined : _.on) || false,
                  offColor: this.context.theme.toggleSwitchOffColor,
                })
            ),
            B = React.default.createElement(
              module12.View,
              {
                style: b.contextView,
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
                R
              )
            ),
            j = React.default.createElement(
              module12.View,
              {
                style: b.hintTextView,
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
            F = I
              ? I[0]
              : this.state.page == (null != (l = null == (s = this.state.groups) ? undefined : s.length) ? l : 1) - 1
              ? module505.localization_strings_Setting_RemoteControlPage_51
              : module505.next_step,
            A = React.default.createElement(
              module12.View,
              {
                style: {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flex: 1,
                  paddingBottom: 10,
                },
              },
              React.default.createElement(
                module385.GradientView,
                {
                  colors: [this.context.theme.gradientColorStart, this.context.theme.gradientColorEnd],
                  start: {
                    x: 0,
                    y: 0,
                  },
                  end: {
                    x: 1,
                    y: 0,
                  },
                  style: b.gradientView,
                },
                React.default.createElement(module385.PureButton, {
                  funcId: (E && E[0]) || 'operation_guide_left',
                  style: [
                    {
                      backgroundColor: 'transparent',
                      flex: 1,
                      paddingHorizontal: 20,
                      minWidth: 220,
                    },
                  ],
                  title: F,
                  fontSize: module391.default.scaledPixelForPad(16),
                  textColor: 'white',
                  onPress: function () {
                    var t, n;
                    if ((T && T(), D)) c.state.page == (null != (t = null == (n = c.state.groups) ? undefined : n.length) ? t : 1) - 1 ? c.dismissModalView() : c.next();
                  },
                })
              )
            ),
            L = React.default.createElement(
              module12.View,
              {
                style: {
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                },
              },
              React.default.createElement(module385.Spinner, null)
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
              module22.default(
                {
                  style: [
                    b.container,
                    {
                      height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                    },
                  ],
                },
                null == (u = this.panResponder) ? undefined : u.panHandlers
              ),
              React.default.createElement(
                module12.View,
                {
                  style: {
                    backgroundColor: this.theme.backgroundColor,
                    borderRadius: 14,
                    justifyContent: 'flex-start',
                  },
                },
                React.default.createElement(module12.ImageBackground, {
                  source: k,
                  style: {
                    position: 'absolute',
                    width: v,
                    height: (1500 * v) / 996,
                    borderRadius: 14,
                    overflow: 'hidden',
                  },
                }),
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      b.wrap,
                      {
                        backgroundColor: 'transparent',
                        marginTop: v + 50,
                        borderRadius: 14,
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: [
                        b.scrollViewWrap,
                        {
                          width: v,
                          maxHeight: S / 2 - 40,
                          paddingHorizontal: 10,
                        },
                      ],
                    },
                    M,
                    React.default.createElement(
                      module12.ScrollView,
                      {
                        contentContainerStyle: {
                          alignItems: 'flex-start',
                        },
                        style: {
                          flexGrow: 0,
                          height: 110,
                        },
                      },
                      React.default.createElement(
                        module12.TouchableOpacity,
                        {
                          activeOpacity: 1,
                        },
                        B,
                        j
                      )
                    )
                  ),
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        width: v - 20,
                        paddingVertical: 20,
                        paddingHorizontal: 10,
                      },
                    },
                    A
                  )
                )
              ),
              this.state.loading && L
            )
          );
        },
      },
      {
        key: 'isSwitchOn',
        get: function () {
          var t, n, o;
          return null != (t = null == (n = this.state.groups[this.state.page]) ? undefined : null == (o = n.switchInfo) ? undefined : o.on) && t;
        },
      },
      {
        key: 'isCheckBoxOn',
        get: function () {
          var t, n, o;
          return null != (t = null == (n = this.state.groups[this.state.page]) ? undefined : null == (o = n.checkBoxInfo) ? undefined : o.selected) && t;
        },
      },
      {
        key: 'isVisible',
        get: function () {
          var t;
          return null != (t = this.state.modalVisible) && t;
        },
      },
      {
        key: 'currentPage',
        get: function () {
          return this.state.page;
        },
      },
    ]);
    return k;
  })(React.Component);

exports.default = C;
C.contextType = module1121.AppConfigContext;
var b = module12.StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  wrap: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
  },
  contextView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
    marginTop: 15,
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
  gradientView: {
    minHeight: 42,
    borderRadius: 28,
    paddingVertical: 8,
    backgroundColor: '#3777F7',
  },
});

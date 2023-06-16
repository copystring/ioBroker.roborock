var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1200 = require('./1200'),
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

var module510 = require('./510').strings,
  C = (function (t) {
    module9.default(k, t);

    var n = k,
      module1200 = S(),
      C = function () {
        var t,
          o = module12.default(n);

        if (module1200) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function k(t) {
      var n, o;
      module6.default(this, k);
      (o = C.call(this, t)).state = {
        page: 0,
        modalVisible: false,
        confirmColor: '#007AFF',
        groups: null != (n = t.groups) ? n : [],
      };
      o.animatedOpacity = new module13.Animated.Value(0);
      return o;
    }

    module7.default(k, [
      {
        key: 'theme',
        get: function () {
          return this.context.theme.guideImages;
        },
      },
    ]);
    module7.default(k, [
      {
        key: 'initPanGestures',
        value: function () {
          var t = this;
          this.pan = new module13.Animated.ValueXY();
          this.panResponder = module13.PanResponder.create({
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
            module13.Animated.timing(this.animatedOpacity, {
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
                module13.Animated.spring(t.animatedOpacity, {
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
          if (this.state.groups && 0 != this.state.groups.length) {
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
          if (this.state.page >= (null != (t = null == (n = this.state.groups) ? undefined : n.length) ? t : 1) - 1 || this.state.page < 0) this.dismissModalView();
          else this.next();
        },
      },
      {
        key: 'last',
        value: function () {
          if (this.state.groups && 0 != this.state.groups.length) {
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
            c,
            f = this;
          if (0 == this.state.modalVisible) return React.default.createElement(module13.View, null);
          var v = module13.Dimensions.get('window').width,
            S = (v - 52) ** 375,
            C = (1320 * S) / 900,
            k =
              ((null == (t = this.state) ? undefined : t.groups) && (null == (n = this.state) ? undefined : n.groups[null == (l = this.state) ? undefined : l.page])) ||
              this.props ||
              {},
            P = k.bgImage,
            R = undefined === P ? null : P,
            I = k.topTitle,
            E = k.context,
            T = k.buttonInfo,
            _ = k.buttonFuncId,
            H = k.onPressSingleButton,
            O = k.switchInfo,
            D = k.checkBoxInfo,
            z = k.autoNextPage,
            M = undefined === z || z,
            B = I,
            j = React.default.createElement(
              module13.View,
              {
                style: {
                  flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                  justifyContent: O ? 'space-between' : 'flex-start',
                  alignItems: 'center',
                  marginTop: 32,
                  paddingHorizontal: 25,
                },
              },
              D &&
                React.default.createElement(
                  module13.TouchableOpacity,
                  {
                    style: {
                      paddingRight: 5,
                    },
                    onPress: function () {
                      if (!(null == D)) D.onSelect(!(null == D ? undefined : D.selected));
                    },
                  },
                  React.default.createElement(module13.Image, {
                    style: {
                      width: 24,
                      height: 24,
                    },
                    source: (null == D ? undefined : D.selected) ? this.theme.selectedIcon : this.theme.unselectedIcon,
                  })
                ),
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    color: this.theme.titleColor,
                    fontSize: module391.default.scaledPixelForPad(18),
                    lineHeight: module391.default.scaledPixelForPad(24),
                  },
                  numberOfLines: 2,
                },
                '' + B
              ),
              O &&
                React.default.createElement(module385.ToggleSwitch, {
                  funcId: 'map_save_switch_guide',
                  onToggle: null == O ? undefined : O.switchValueChanged,
                  isOn: (null == O ? undefined : O.on) || false,
                  offColor: this.context.theme.toggleSwitchOffColor,
                })
            ),
            F = React.default.createElement(
              module13.View,
              {
                style: b.contextView,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    color: this.theme.contentColor,
                    fontSize: module391.default.scaledPixelForPad(14),
                    marginTop: 0,
                    lineHeight: 18,
                  },
                },
                E
              )
            ),
            A = React.default.createElement(
              module13.View,
              {
                style: b.hintTextView,
              },
              React.default.createElement(
                module13.Text,
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
            L = T
              ? T[0]
              : this.state.page == (null != (s = null == (u = this.state.groups) ? undefined : u.length) ? s : 1) - 1
              ? module510.localization_strings_Setting_RemoteControlPage_51
              : module510.next_step,
            G = React.default.createElement(
              module13.View,
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
                  funcId: (_ && _[0]) || 'operation_guide_left',
                  style: [
                    {
                      backgroundColor: 'transparent',
                      flex: 1,
                      paddingHorizontal: 20,
                      minWidth: 220,
                    },
                  ],
                  title: L,
                  fontSize: module391.default.scaledPixelForPad(16),
                  textColor: 'white',
                  onPress: function () {
                    var t, n;
                    if ((H && H(), M))
                      f.state.page >= (null != (t = null == (n = f.state.groups) ? undefined : n.length) ? t : 1) - 1 || f.state.page < 0 ? f.dismissModalView() : f.next();
                  },
                })
              )
            ),
            W = React.default.createElement(
              module13.View,
              {
                style: {
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                },
              },
              React.default.createElement(module385.Spinner, null)
            ),
            q = S + 50 + C / 2 - 40 + 80,
            N = module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
            X = q / N > 0.8 ? (0.8 * N) / q : 1;
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
              module13.View,
              module22.default(
                {
                  style: [
                    b.container,
                    {
                      height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                    },
                  ],
                },
                null == (c = this.panResponder) ? undefined : c.panHandlers
              ),
              React.default.createElement(
                module13.View,
                {
                  style: {
                    backgroundColor: this.theme.backgroundColor,
                    borderRadius: 14,
                    justifyContent: 'flex-start',
                    transform: [
                      {
                        scale: X,
                      },
                    ],
                  },
                },
                R &&
                  React.default.createElement(module13.ImageBackground, {
                    source: R,
                    style: {
                      position: 'absolute',
                      width: S,
                      height: (1500 * S) / 996,
                      borderRadius: 14,
                      overflow: 'hidden',
                    },
                  }),
                React.default.createElement(
                  module13.View,
                  {
                    style: [
                      b.wrap,
                      {
                        backgroundColor: 'transparent',
                        marginTop: S + 50,
                        borderRadius: 14,
                      },
                    ],
                  },
                  React.default.createElement(
                    module13.View,
                    {
                      style: [
                        b.scrollViewWrap,
                        {
                          width: S,
                          maxHeight: C / 2 - 40,
                          paddingHorizontal: 10,
                        },
                      ],
                    },
                    j,
                    React.default.createElement(
                      module13.ScrollView,
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
                        module13.TouchableOpacity,
                        {
                          activeOpacity: 1,
                        },
                        F,
                        A
                      )
                    )
                  ),
                  React.default.createElement(
                    module13.View,
                    {
                      style: {
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        width: S - 20,
                        paddingVertical: 20,
                        paddingHorizontal: 10,
                      },
                    },
                    G
                  )
                )
              ),
              this.state.loading && W
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
C.contextType = module1200.AppConfigContext;
var b = module13.StyleSheet.create({
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

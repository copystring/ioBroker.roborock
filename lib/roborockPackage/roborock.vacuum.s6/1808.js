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
    var o = b(n);
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
  module506 = require('./506'),
  module390 = require('./390'),
  module387 = require('./387'),
  module381 = require('./381');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : n;
  })(t);
}

function x() {
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

require('./12').Alert;
require('./491').strings;

require('./1249');

require('./1267');

var C = module12.Dimensions.get('window'),
  V = module12.Dimensions.get('window').width,
  v = (V - 52) ** 375,
  E = (1320 * v) / 900,
  P = (function (t) {
    module7.default(V, t);

    var module506 = V,
      b = x(),
      C = function () {
        var t,
          n = module11.default(module506);

        if (b) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function V(t) {
      var o;
      module4.default(this, V);
      (o = C.call(this, t)).groups = t.groups;
      o.state = {
        page: 0,
        modalVisible: false,
        confirmColor: '#007AFF',
      };
      o.animatedOpacity = new module12.Animated.Value(0);
      return o;
    }

    module5.default(V, [
      {
        key: 'theme',
        get: function () {
          return this.context.theme.guideImages;
        },
      },
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
            n,
            o = this;
          if (0 == this.state.modalVisible) return React.default.createElement(module12.View, null);
          var l = (null != (t = null == (n = this.groups) ? undefined : n.length) ? t : 0) > 0 ? this.groups[this.state.page] : this.props,
            s = l.bgImage,
            u = l.topTitle,
            h = l.context,
            b = l.buttonInfo,
            x = l.buttonFuncId,
            C = l.onPressSingleButton,
            V = u,
            E = React.default.createElement(
              module12.View,
              {
                style: {
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: v,
                  justifyContent: 'center',
                },
              },
              React.default.createElement(
                module12.View,
                null,
                React.default.createElement(module381.PureButton, {
                  funcId: (x && x[0]) || 'operation_guide_left',
                  style: [
                    k.sureButton,
                    {
                      marginLeft: 0,
                      borderLeftWidth: 0,
                      backgroundColor: this.theme.backgroundColor,
                    },
                  ],
                  title: b && b[0],
                  fontSize: module387.default.scaledPixel(16),
                  textColor: this.theme.titleColor,
                  onPress: function () {
                    if (C) C();
                    else o.dismissModalView();
                  },
                })
              )
            ),
            P = React.default.createElement(
              module12.View,
              {
                style: {
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: v,
                  justifyContent: 'center',
                },
              },
              React.default.createElement(
                module12.View,
                null,
                React.default.createElement(module381.PureButton, {
                  funcId: (x && x[0]) || 'operation_guide_left',
                  style: [
                    k.pinButton,
                    {
                      marginLeft: 0,
                      borderLeftWidth: 0,
                      backgroundColor: this.theme.backgroundColor,
                      borderColor: this.theme.seperatorColor,
                    },
                  ],
                  title: b && b[0],
                  fontSize: module387.default.scaledPixel(16),
                  textColor: this.theme.titleColor,
                  onPress: function () {
                    if (o.props.onPressLeftButton) o.props.onPressLeftButton();
                    o.dismissModalView();
                  },
                })
              ),
              React.default.createElement(
                module12.View,
                null,
                React.default.createElement(module381.PureButton, {
                  funcId: (x && x[1]) || 'operation_guide_right',
                  style: [
                    k.pinButton,
                    {
                      marginRight: 0,
                      borderRightWidth: 0,
                      backgroundColor: this.theme.backgroundColor,
                      borderColor: this.theme.seperatorColor,
                    },
                  ],
                  title: b && b[1],
                  fontSize: module387.default.scaledPixel(16),
                  textColor: this.theme.titleColor,
                  enabled: true,
                  onPress: function () {
                    if (o.props.onPressGoSetting) o.props.onPressGoSetting();
                  },
                })
              )
            ),
            B = React.default.createElement(
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
                    fontSize: module387.default.scaledPixel(16),
                  },
                },
                '' + V
              )
            ),
            I = React.default.createElement(
              module12.View,
              {
                style: k.contextView,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    color: this.theme.contentColor,
                    fontSize: module387.default.scaledPixel(14),
                    marginTop: 0,
                    lineHeight: 18,
                  },
                },
                h
              )
            ),
            S = React.default.createElement(
              module12.View,
              {
                style: k.hintTextView,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    color: this.theme.contentColor,
                    fontSize: module387.default.scaledPixel(12),
                    marginTop: 3,
                    lineHeight: 16,
                  },
                },
                this.props.hintText
              )
            );
          return React.default.createElement(
            module381.AModal,
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
                  k.container,
                  {
                    height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    k.wrap,
                    {
                      backgroundColor: this.theme.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(module12.Image, {
                  source: s,
                  style: {
                    width: v,
                    height: (29 * v) / 30,
                  },
                }),
                React.default.createElement(
                  module12.View,
                  {
                    style: k.scrollViewWrap,
                  },
                  React.default.createElement(
                    module12.ScrollView,
                    {
                      contentContainerStyle: {
                        alignItems: 'flex-start',
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
                      B,
                      I,
                      S
                    )
                  )
                ),
                React.default.createElement(module12.View, {
                  style: {
                    backgroundColor: this.theme.seperatorColor,
                    height: 1,
                    width: v,
                  },
                }),
                (null == b ? undefined : b.length) > 1 ? P : E
              )
            )
          );
        },
      },
    ]);
    return V;
  })(React.Component);

exports.default = P;
P.contextType = module506.AppConfigContext;
var k = module12.StyleSheet.create({
  sureButton: {
    width: V,
    height: 50,
    backgroundColor: 'white',
    flex: 0,
  },
  pinButton: {
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: '#EBEBEB',
    borderBottomColor: 'transparent',
    width: v / 2,
    height: 50,
    backgroundColor: 'white',
    flex: 0,
  },
  container: {
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
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
    width: v,
    maxHeight: E / 2 - 80,
    paddingBottom: 10,
  },
});

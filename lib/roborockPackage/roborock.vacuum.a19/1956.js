exports.HocAlert = w;

var module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
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
    var o = D(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var u = c ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (u && (u.get || u.set)) Object.defineProperty(l, s, u);
        else l[s] = t[s];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module390 = require('./390'),
  module386 = require('./386'),
  v = ['onConfirm', 'onCancel', 'confirmTitle', 'confirmTextColor', 'shouldShowCancel'];

function D(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (D = function (t) {
    return t ? o : n;
  })(t);
}

function _() {
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
  module1249 = require('./1249'),
  j = 5;

function w(t, y) {
  var D,
    w,
    k = module12.StyleSheet.create({
      container: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 99,
        width: module12.Dimensions.get('window').width,
        height: module12.Dimensions.get('window').height,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
      },
      buttonsWrap: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: 50,
      },
      button: {
        flex: 1,
        borderTopWidth: 0.8,
        alignSelf: 'stretch',
      },
    });

  w = D = (function (D) {
    module7.default(P, D);

    var w = P,
      I = _(),
      x = function () {
        var t,
          n = module11.default(w);

        if (I) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);
      (n = x.call(this, t)).state = {
        visible: false,
        seconds: j,
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
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var o = this,
            l = this.state.seconds >= j ? j : this.state.seconds <= 0 ? 0 : this.state.seconds,
            c = l > 0,
            s = '(' + l + ')',
            u = this.animatedOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [1.2, 1],
            }),
            D = this.props,
            _ = D.onConfirm,
            S = D.onCancel,
            w = D.confirmTitle,
            I = D.confirmTextColor,
            x = D.shouldShowCancel,
            P = module55.default(D, v),
            T = React.default.createElement(
              module12.View,
              {
                style: k.buttonsWrap,
              },
              x &&
                React.default.createElement(module381.PureButton, {
                  funcId: 'object_ignore_cancel',
                  style: [
                    k.button,
                    {
                      borderRightWidth: 0.8,
                      backgroundColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.backgroundColor,
                      borderTopColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.borderColor,
                      borderRightColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.borderColor,
                    },
                  ],
                  title: module491.localization_strings_Main_MainPage_11,
                  textColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.btnTextColor,
                  fontSize: 16,
                  onPress: function () {
                    if (S) S();
                    o.hide();
                  },
                }),
              React.default.createElement(module381.PureButton, {
                funcId: 'object_ignore_confirm',
                style: [
                  k.button,
                  {
                    backgroundColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.backgroundColor,
                    borderTopColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.borderColor,
                    borderRightColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.borderColor,
                  },
                ],
                enabled: !c,
                title: (w || module491.localization_strings_Main_Error_ErrorDetailPage_3) + (c ? s : ''),
                textColor: c
                  ? globals.app.state.theme.mapObjectIgnoreDescDialogContent.btnLockedTextColor
                  : I || globals.app.state.theme.mapObjectIgnoreDescDialogContent.btnTextColor,
                fontSize: 16,
                onPress: function () {
                  if (_) _();
                  o.hide();
                },
              })
            ),
            E = React.default.createElement(
              module12.Animated.View,
              {
                style: [
                  k.container,
                  {
                    opacity: this.animatedOpacity,
                    height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: {
                    backgroundColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.backgroundColor,
                    overflow: 'hidden',
                    borderRadius: 14,
                    transform: [
                      {
                        scaleX: u,
                      },
                      {
                        scaleY: u,
                      },
                    ],
                  },
                },
                React.default.createElement(t, P),
                T
              )
            ),
            M = React.default.createElement(
              module12.Modal,
              {
                transparent: true,
                visible: true,
                onRequestClose: function () {
                  console.log('closed');
                  o.hide();
                },
              },
              E
            );
          return this.state.visible ? (y ? M : E) : null;
        },
      },
      {
        key: 'hide',
        value: function () {
          var t = this;
          if (0 != this.state.visible)
            module12.Animated.timing(this.animatedOpacity, {
              toValue: 0,
              duration: 100,
            }).start(function () {
              t.setState({
                visible: false,
              });

              t._stopSecond();
            });
        },
      },
      {
        key: '_fire',
        value: function () {
          this.setState({
            seconds: this.state.seconds - 1,
          });
          this.timer = module1249.setTimeout(this._fire.bind(this), 1e3);
          if (this.state.seconds <= 0) this._stopSecond();
        },
      },
      {
        key: '_runSecond',
        value: function () {
          var t = this;

          this._stopSecond();

          this.setState(
            {
              seconds: j,
            },
            function () {
              t._fire();
            }
          );
        },
      },
      {
        key: '_stopSecond',
        value: function () {
          if (this.timer) module1249.clearTimeout(this.timer);
        },
      },
      {
        key: 'show',
        value: function () {
          var t = this;
          this.setState({
            seconds: j,
          });
          this.setState(
            {
              visible: true,
            },
            function () {
              module12.Animated.spring(t.animatedOpacity, {
                toValue: 1,
                duration: 150,
              }).start(function () {
                t._runSecond();
              });
            }
          );
        },
      },
    ]);
    return P;
  })(React.Component);

  D.defaultProps = {
    shouldShowCancel: true,
  };
  return w;
}

var k = w(function (t) {
  module386.default.isStructuredLightSupported();
  var n = module12.StyleSheet.create({
      container: {
        padding: 20,
        alignItems: 'center',
      },
      content: {
        fontSize: 14,
        color: globals.app.state.theme.mapObjectIgnoreDescDialogContent.contentTextColor,
        lineHeight: 23,
        flexDirection: 'row',
      },
      link: {
        color: '#007AFF',
        fontSize: 14,
      },
    }),
    o = module491.obstacle_photo_page_ignore_desc;
  return React.default.createElement(
    module12.View,
    {
      style: n.container,
    },
    React.default.createElement(
      module12.Text,
      null,
      React.default.createElement(
        module12.Text,
        {
          style: n.content,
          numberOfLines: 0,
        },
        o + ' ' + ('android' === module12.Platform.OS ? '\n\n' : ' ')
      )
    )
  );
}, true);
exports.MapObjectIgnoreDescDialog = k;

exports.HocAlert = O;

var module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module391 = require('./391'),
  module394 = require('./394');

function D() {
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
  module1340 = require('./1340'),
  S = 5;

function O(t, o) {
  var O,
    j,
    I = module12.StyleSheet.create({
      container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
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

  j = O = (function (O) {
    module7.default(T, O);

    var j = T,
      k = D(),
      x = function () {
        var t,
          o = module11.default(j);

        if (k) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function T(t) {
      var o;
      module4.default(this, T);
      (o = x.call(this, t)).state = {
        visible: false,
        seconds: S,
      };
      o.animatedOpacity = new module12.Animated.Value(0);
      return o;
    }

    module5.default(T, [
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
          var l = this,
            c = this.state.seconds >= S ? S : this.state.seconds <= 0 ? 0 : this.state.seconds,
            s = c > 0,
            u = '(' + c + ')',
            f = this.animatedOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [1.2, 1],
            }),
            D = this.props,
            _ = D.onConfirm,
            O = D.onCancel,
            j = D.confirmTitle,
            k = D.confirmTextColor,
            x = D.shouldShowCancel,
            T = module56.default(D, ['onConfirm', 'onCancel', 'confirmTitle', 'confirmTextColor', 'shouldShowCancel']),
            E = React.default.createElement(
              module12.View,
              {
                style: I.buttonsWrap,
              },
              x &&
                React.default.createElement(module385.PureButton, {
                  funcId: 'object_ignore_cancel',
                  style: [
                    I.button,
                    {
                      borderRightWidth: 0.8,
                      backgroundColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.backgroundColor,
                      borderTopColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.borderColor,
                      borderRightColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.borderColor,
                    },
                  ],
                  title: module505.localization_strings_Main_MainPage_11,
                  textColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.btnTextColor,
                  fontSize: 16,
                  onPress: function () {
                    if (O) O();
                    l.hide();
                  },
                }),
              React.default.createElement(module385.PureButton, {
                funcId: 'object_ignore_confirm',
                style: [
                  I.button,
                  {
                    backgroundColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.backgroundColor,
                    borderTopColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.borderColor,
                    borderRightColor: globals.app.state.theme.mapObjectIgnoreDescDialogContent.borderColor,
                  },
                ],
                enabled: !s,
                title: (j || module505.localization_strings_Main_Error_ErrorDetailPage_3) + (s ? u : ''),
                textColor: s
                  ? globals.app.state.theme.mapObjectIgnoreDescDialogContent.btnLockedTextColor
                  : k || globals.app.state.theme.mapObjectIgnoreDescDialogContent.btnTextColor,
                fontSize: 16,
                onPress: function () {
                  if (_) _();
                  l.hide();
                },
              })
            ),
            w = React.default.createElement(
              module12.Animated.View,
              {
                style: [
                  I.container,
                  {
                    opacity: this.animatedOpacity,
                    height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
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
                        scaleX: f,
                      },
                      {
                        scaleY: f,
                      },
                    ],
                  },
                },
                React.default.createElement(t, T),
                E
              )
            ),
            R = React.default.createElement(
              module12.Modal,
              {
                transparent: true,
                visible: true,
                onRequestClose: function () {
                  console.log('closed');
                  l.hide();
                },
              },
              w
            );
          return this.state.visible ? (o ? R : w) : null;
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
          this.timer = module1340.setTimeout(this._fire.bind(this), 1e3);
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
              seconds: S,
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
          if (this.timer) module1340.clearTimeout(this.timer);
        },
      },
      {
        key: 'show',
        value: function () {
          var t = this;
          this.setState({
            seconds: S,
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
    return T;
  })(React.Component);

  O.defaultProps = {
    shouldShowCancel: true,
  };
  return j;
}

var j = O(function (t) {
  var o = module12.StyleSheet.create({
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
    n = module505.obstacle_photo_page_ignore_desc;
  return React.default.createElement(
    module12.View,
    {
      style: o.container,
    },
    React.default.createElement(
      module12.Text,
      null,
      React.default.createElement(
        module12.Text,
        {
          style: o.content,
          numberOfLines: 0,
        },
        n + ' ' + ('android' === module12.Platform.OS ? '\n\n' : ' ')
      )
    )
  );
}, true);
exports.MapObjectIgnoreDescDialog = j;

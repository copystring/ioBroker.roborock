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

    var o = _(n);

    if (o && o.has(t)) return o.get(t);
    var s = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, l, c);
        else s[l] = t[l];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module390 = require('./390'),
  module506 = require('./506'),
  module937 = require('./937'),
  module387 = require('./387'),
  module936 = require('./936');

function _(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (_ = function (t) {
    return t ? o : n;
  })(t);
}

function C() {
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
  B = module12.Dimensions.get('window').width - 32,
  P = (function (t) {
    module7.default(_, t);

    var module506 = _,
      module387 = C(),
      S = function () {
        var t,
          n = module11.default(module506);

        if (module387) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function _(t) {
      var o;
      module4.default(this, _);
      (o = S.call(this, t)).state = {
        buttons: t.buttons,
        shouldShowAddView: false,
        currentSelectIndex: 0,
        shouldShow: false,
      };
      o.animatedMarginBottom = new module12.Animated.Value(-200);
      return o;
    }

    module5.default(_, [
      {
        key: 'theme',
        get: function () {
          return this.context.theme.chooseRoomName;
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'setNamesAndSelectedIndex',
        value: function (t, n) {
          t.unshift({
            name: '' + module491.localization_strings_Setting_Timer_Common_4,
            used: false,
          });
          this.setState({
            buttons: t,
            currentSelectIndex: n,
          });
        },
      },
      {
        key: 'hide',
        value: function () {
          var t = this;
          if (0 != this.state.shouldShow)
            module12.Animated.timing(this.animatedMarginBottom, {
              toValue: -200,
              duration: 100,
            }).start(function () {
              t.setState({
                shouldShow: false,
                shouldShowAddView: false,
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
              shouldShow: true,
            },
            function () {
              module12.Animated.spring(t.animatedMarginBottom, {
                toValue: 0,
                duration: 100,
              }).start();
            }
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.state.buttons.map(function (n, o) {
              var s = o == t.state.currentSelectIndex,
                u = React.default.createElement(module381.PureButton, {
                  funcId: 'room_name_select_room_name_' + o,
                  style: [
                    k.button,
                    {
                      marginRight: 10,
                      backgroundColor: s ? '#3384FF' : t.theme.inputBackgroundColor,
                      borderColor: 'transparent',
                    },
                  ],
                  title: n.name,
                  key: o,
                  selected: s,
                  enabled: !n.used,
                  onPress: t.onPress.bind(t, o),
                  fontSize: 14,
                  textColor: 0 == o ? '#007AFF' : t.theme.detailColor,
                  selectedTextColor: 'white',
                  numberOfLines: 1,
                }),
                l = React.default.createElement(
                  module12.View,
                  {
                    key: o,
                  },
                  u
                );
              return s ? l : u;
            }),
            o = module390.default.sharedCache().ScreenHeight;
          return React.default.createElement(
            module937.default,
            {
              transparent: true,
              visible: this.state.shouldShow,
              onRequestClose: function () {
                t.hide();
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  k.container,
                  {
                    height: o,
                  },
                ],
              },
              React.default.createElement(
                module12.TouchableWithoutFeedback,
                {
                  onPress: function () {
                    if (t.props.onPressCloseButton) t.props.onPressCloseButton();
                    t.hide();
                  },
                },
                React.default.createElement(module12.View, {
                  style: {
                    alignSelf: 'stretch',
                    flex: 1,
                  },
                })
              ),
              React.default.createElement(module381.InputDialog, {
                autoGestureEnable: false,
                visible: this.state.shouldShowAddView,
                title: module491.map_edit_set_room_name,
                inputPlaceholder: module491.map_edit_input_room_name,
                warningText: module491.floor_map_name_too_long,
                onPressConfirmButton: this._onPressAddRoomConfirmButton.bind(this),
                onPressCancelButton: this._onPressAddRoomCancelButton.bind(this),
                warningVisibilityAdapter: function (t) {
                  return t.length > 30;
                },
              }),
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    k.wrap,
                    {
                      marginBottom: this.animatedMarginBottom,
                    },
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      width: B,
                      maxHeight: 300,
                      paddingTop: 30,
                      borderTopLeftRadius: 14,
                      borderTopRightRadius: 14,
                      backgroundColor: this.theme.backgroundColor,
                    },
                  },
                  React.default.createElement(
                    module12.ScrollView,
                    {
                      contentContainerStyle: {
                        justifyContent: 'flex-start',
                      },
                      style: k.buttonsWrap,
                      showsVerticalScrollIndicator: false,
                    },
                    React.default.createElement(
                      module12.View,
                      {
                        style: k.buttonsWrap,
                      },
                      n
                    )
                  )
                ),
                React.default.createElement(module12.View, {
                  style: [
                    k.line,
                    {
                      backgroundColor: this.theme.backgroundColor,
                    },
                  ],
                }),
                React.default.createElement(module381.PureButton, {
                  funcId: 'room_name_select_confirm',
                  style: [
                    k.confirmButton,
                    {
                      backgroundColor: this.theme.backgroundColor,
                    },
                  ],
                  title: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                  textColor: '#007AFF',
                  fontSize: 17,
                  onPress: this._onPressConfirmButton.bind(this),
                })
              )
            )
          );
        },
      },
      {
        key: 'onPress',
        value: function (t) {
          if (0 == t)
            this.setState({
              shouldShowAddView: true,
            });
          else
            this.setState({
              shouldShowAddView: false,
              currentSelectIndex: this.state.currentSelectIndex == t ? -1 : t,
            });
        },
      },
      {
        key: '_onPressAddRoomConfirmButton',
        value: function (t) {
          if (
            this.state.buttons
              .map(function (t, n) {
                return t.name;
              })
              .includes(t)
          )
            this.props.onNameDuplicated();
          else {
            this.state.buttons.push({
              name: t,
              used: false,
            });
            this.setState({
              buttons: this.state.buttons,
              shouldShowAddView: false,
              currentSelectIndex: this.state.buttons.length - 1,
            });
          }
        },
      },
      {
        key: '_onPressAddRoomCancelButton',
        value: function () {
          this.setState({
            shouldShowAddView: false,
          });
        },
      },
      {
        key: '_onPressConfirmButton',
        value: function () {
          this.hide();
          var t = (this.state.buttons[this.state.currentSelectIndex] && this.state.buttons[this.state.currentSelectIndex].name) || '';
          if (this.props.onPressConfirmButton) this.props.onPressConfirmButton(t);
        },
      },
    ]);
    return _;
  })(React.Component);

exports.default = P;
P.contextType = module506.AppConfigContext;
P.defaultProps = {
  buttons: [
    {
      name: '\u623f\u95f41',
      used: false,
    },
    {
      name: '\u623f\u95f42',
      used: true,
    },
    {
      name: '\u623f\u95f43',
      used: false,
    },
    {
      name: '\u623f\u95f44',
      used: false,
    },
    {
      name: '\u623f\u95f45',
      used: false,
    },
    {
      name: '\u623f\u95f46',
      used: false,
    },
    {
      name: '\u623f\u95f47',
      used: false,
    },
    {
      name: '\u623f\u95f48',
      used: false,
    },
    {
      name: '+\u6dfb\u52a0',
      used: false,
    },
    {
      name: '\u623f\u95f41',
      used: false,
    },
    {
      name: '\u623f\u95f42',
      used: true,
    },
    {
      name: '\u623f\u95f43',
      used: false,
    },
    {
      name: '\u623f\u95f44',
      used: false,
    },
    {
      name: '\u623f\u95f45',
      used: false,
    },
    {
      name: '\u623f\u95f46',
      used: false,
    },
    {
      name: '\u623f\u95f47',
      used: false,
    },
    {
      name: '\u623f\u95f48',
      used: false,
    },
    {
      name: '+\u6dfb\u52a0',
      used: false,
    },
    {
      name: '\u623f\u95f41',
      used: false,
    },
    {
      name: '\u623f\u95f42',
      used: true,
    },
    {
      name: '\u623f\u95f43',
      used: false,
    },
    {
      name: '\u623f\u95f44',
      used: false,
    },
    {
      name: '\u623f\u95f45',
      used: false,
    },
    {
      name: '\u623f\u95f46',
      used: false,
    },
    {
      name: '\u623f\u95f47',
      used: false,
    },
    {
      name: '\u623f\u95f48',
      used: false,
    },
    {
      name: '+\u6dfb\u52a0',
      used: false,
    },
  ],
};
var k = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)',
    left: 0,
    top: 0,
    width: module12.Dimensions.get('window').width,
    zIndex: 9,
    borderRadius: module936.AppBorderRadius,
  },
  wrap: {
    borderRadius: 14,
    overflow: 'hidden',
    marginHorizontal: 20,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  titleView: {
    alignSelf: 'stretch',
    height: 30,
    marginTop: 20,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#222224',
    fontSize: 15,
  },
  buttonsWrap: {
    width: B,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  button: {
    paddingHorizontal: 20,
    height: 35,
    marginBottom: 20,
    borderColor: '#dddddd',
    borderWidth: 0.6,
    borderRadius: 17.5,
  },
  confirmButton: {
    alignSelf: 'stretch',
    height: 56,
    marginTop: 8,
    borderRadius: 14,
    marginBottom: module387.default.isIphoneX() ? 34 : 20,
  },
  line: {
    height: 20,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    backgroundColor: 'transparent',
  },
});

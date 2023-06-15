var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module394 = require('./394'),
  module515 = require('./515'),
  module1033 = require('./1033'),
  module1153 = require('./1153'),
  module1332 = require('./1332'),
  module391 = require('./391');

function _() {
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

var module500 = require('./500').strings,
  module393 = require('./393'),
  I = (function (t) {
    module7.default(I, t);

    var o = I,
      module515 = _(),
      v = function () {
        var t,
          n = module11.default(o);

        if (module515) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function I(t) {
      var o;
      module4.default(this, I);

      (o = v.call(this, t))._onChangeText = function (t) {
        var n = o.state.buttons
            .map(function (t, o) {
              return t.name;
            })
            .indexOf(t),
          s = o.getTagIdByName(t);
        if (o.props.supportTag && (!s || s <= 0)) s = 12;
        var l = o.props.supportTag ? o.isValidTag(s) : 0 != t.length;
        o.setState({
          roomName: t,
          selectNameIndex: n,
          selectTagKey: s,
          confirmEnable: l,
        });
      };

      o._onNameViewLayout = function (t) {
        if (o.props.supportTag)
          t.nativeEvent.layout.height > 80 && !o.state.showAllName
            ? o.setState({
                nameMaxHeight: 80,
                showMoreNameBtn: true,
              })
            : t.nativeEvent.layout.height < 80 &&
              o.setState({
                nameMaxHeight: 0,
                showMoreNameBtn: false,
              });
        else o.namePanelHeight = t.nativeEvent.layout.height;
      };

      o._onPressMoreName = function () {
        var t;
        if (o.state.showAllName) null == (t = o.scrollView) || null == t.scrollTo || t.scrollTo(0);
        o.setState({
          showAllName: !o.state.showAllName,
        });
      };

      o._onPressClose = function () {
        if (!(null == o.props.onPressCloseButton)) o.props.onPressCloseButton();
        o.hide();
      };

      o._onPressConfirmButton = function () {
        if (o.state.confirmEnable && o.isValidTag(o.state.selectTagKey)) {
          var t = o.state.roomName;
          if (o.props.supportTag && (t.length <= 0 || o.isAutoCreateTagName(t, o.state.selectTagKey))) t = o.getValidTagName(o.state.selectTagKey, t);

          if (0 != t.length) {
            o.hide();
            if (!(null == o.props.onPressConfirmButton)) o.props.onPressConfirmButton(t, o.state.selectTagKey);
          }
        }
      };

      o._onKeyboardDidShow = function (t) {
        if (o.state.shouldShow && !o.props.supportTag) {
          var n = t.endCoordinates.height + 60 - o.namePanelHeight ** 300;
          n = n ** (module391.default.isIphoneX() ? 34 : 20);
          module12.Animated.spring(o.animatedMarginBottom, {
            toValue: n,
            duration: 100,
          }).start();
        }
      };

      o._onKeyboardDidHide = function (t) {
        if (o.state.shouldShow && !o.props.supportTag)
          module12.Animated.spring(o.animatedMarginBottom, {
            toValue: module391.default.isIphoneX() ? 34 : 20,
            duration: 100,
          }).start();
      };

      o.state = {
        shouldShow: false,
        buttons: t.buttons,
        showAllName: false,
        nameMaxHeight: 0,
        showMoreNameBtn: false,
        confirmEnable: o.isValidTag(t.selectTagKey),
        selectNameIndex: -1,
        selectTagKey: t.selectTagKey || 0,
        roomName: '',
      };
      o.animatedMarginBottom = new module12.Animated.Value(-200);
      o.initRoomName = '';
      return o;
    }

    module5.default(I, [
      {
        key: 'theme',
        get: function () {
          return this.context.theme.chooseRoomName;
        },
      },
    ]);
    module5.default(I, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.keyboardShowListener = this.props.supportTag ? null : module12.Keyboard.addListener('keyboardDidShow', this._onKeyboardDidShow);
          this.keyboardHideListener = this.props.supportTag ? null : module12.Keyboard.addListener('keyboardDidHide', this._onKeyboardDidHide);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          var t, o;
          if (!(null == (t = this.keyboardShowListener))) t.remove();
          if (!(null == (o = this.keyboardHideListener))) o.remove();
        },
      },
      {
        key: 'isValidTag',
        value: function (t) {
          return !this.props.supportTag || (!(!t || t <= 0) && 'object' == typeof module1332.RoomTagInfo[t]);
        },
      },
      {
        key: 'isAutoCreateTagName',
        value: function (t, o) {
          if (!module1332.RoomTagInfo[o] && t.length > 0) return false;
          var n = module1332.RoomTagInfo[o].name;
          if (t == n) return true;
          var s = n.length;

          if (t.length > s) {
            var l = t.substring(0, s);
            if (l == module1332.RoomTagInfo[o].name && (l = t.substring(s)).match(/^\d+$/)) return true;
          }

          return false;
        },
      },
      {
        key: 'getValidTagName',
        value: function (t) {
          var o = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : '';
          if ('' == o) o = module1332.RoomTagInfo[t].name;
          if (this.props.onDealTagDuplicateName) o = this.props.onDealTagDuplicateName(t, o, this.initRoomName);
          return o;
        },
      },
      {
        key: 'getTagIdByName',
        value: function (t) {
          var o = this.state.selectTagKey;
          if (t.length >= 2 && this.props.supportTag)
            for (var n = 0; n < module1332.DisplayRoomTag.length; n++)
              if (this.isAutoCreateTagName(t, module1332.DisplayRoomTag[n])) {
                o = module1332.DisplayRoomTag[n];
                break;
              }
          return o;
        },
      },
      {
        key: 'setNamesAndSelectedIndex',
        value: function (t, o, n) {
          var s = '';

          if ((null == t ? undefined : t.length) > 0) {
            var l = t[o];
            if (l && l.name) s = l.name;
          }

          this.initRoomName = s;
          n = n || 0;
          var u = this.props.supportTag ? this.isValidTag(n) : 0 != s.length;
          this.setState({
            buttons: t,
            selectNameIndex: o,
            roomName: s,
            selectTagKey: n,
            confirmEnable: u,
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
                showAllName: false,
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
                toValue: module391.default.isIphoneX() ? 34 : 20,
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
            o = this.state.buttons.map(function (o, n) {
              var s = n == t.state.selectNameIndex,
                l = {
                  backgroundColor: s ? '#3384FF' : t.theme.inputBackgroundColor,
                },
                u = React.default.createElement(module385.PureButton, {
                  funcId: 'room_name_select_room_name_' + n,
                  style: [R.button, l],
                  title: o.name,
                  key: n,
                  selected: s,
                  enabled: !o.used,
                  onPress: t._onPressName.bind(t, n),
                  fontSize: 14,
                  textColor: t.theme.detailColor,
                  selectedTextColor: 'white',
                  numberOfLines: 1,
                }),
                h = React.default.createElement(
                  module12.View,
                  {
                    key: n,
                  },
                  u
                );
              return s ? h : u;
            }),
            s = this.props.supportTag ? 50 : 20,
            module1963 = module1332.RoomTagInfo[this.state.selectTagKey] ? module1332.RoomTagInfo[this.state.selectTagKey].image : require('./1963'),
            u = {
              color: this.theme.textColor,
              backgroundColor: this.theme.inputBackgroundColor,
              paddingLeft: globals.isRTL ? 0 : s,
              paddingRight: globals.isRTL ? s : 0,
            },
            h = React.default.createElement(
              module12.View,
              {
                style: R.topView,
              },
              React.default.createElement(
                module12.TextInput,
                module22.default({}, module391.default.getAccessibilityLabel('room_tag_input'), {
                  onChangeText: this._onChangeText,
                  value: this.state.roomName,
                  style: [R.inputStyle, u],
                  textAlign: globals.isRTL ? 'right' : 'left',
                  maxLength: 30,
                  clearButtonMode: 'while-editing',
                })
              ),
              React.default.createElement(module385.PureButton, {
                funcId: 'room_name_select_confirm',
                style: R.confirmButton,
                title: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                enabled: this.state.confirmEnable,
                textColor: '#007AFF',
                fontSize: 16,
                onPress: this._onPressConfirmButton,
              }),
              this.props.supportTag &&
                React.default.createElement(module12.Image, {
                  style: R.inputImg,
                  source: module1963,
                })
            ),
            module1964 = module1332.DisplayRoomTag.map(function (o, s) {
              var l = t.state.selectTagKey == o;
              return (
                0 != o &&
                React.default.createElement(
                  module12.TouchableWithoutFeedback,
                  {
                    onPress: t._onPressTag.bind(t, o),
                    key: o,
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: [
                        R.tagView,
                        {
                          backgroundColor: l ? t.theme.inputBackgroundColor : 'transparent',
                        },
                      ],
                    },
                    React.default.createElement(
                      module12.View,
                      {
                        style: R.tagLeftView,
                      },
                      React.default.createElement(module12.Image, {
                        style: R.tagImg,
                        source: module1332.RoomTagInfo[o].image,
                      }),
                      React.default.createElement(
                        module12.Text,
                        module22.default({}, module391.default.getAccessibilityLabel('room_tag_' + s), {
                          style: [
                            R.tagText,
                            {
                              color: t.theme.textColor,
                            },
                          ],
                        }),
                        module1332.RoomTagInfo[o].name
                      )
                    ),
                    l &&
                      React.default.createElement(module12.Image, {
                        style: R.checkImg,
                        source: require('./1964'),
                      })
                  )
                )
              );
            }),
            b =
              !this.state.showAllName && this.state.nameMaxHeight
                ? {
                    maxHeight: this.state.nameMaxHeight,
                  }
                : {},
            v = React.default.createElement(
              module12.View,
              {
                style: [R.buttonsWrap, b],
                onLayout: this._onNameViewLayout,
              },
              o
            ),
            _ = React.default.createElement(
              module12.ScrollView,
              {
                style: {
                  maxHeight: 300,
                },
              },
              v
            ),
            module1966 = this.state.showAllName ? require('./1965') : require('./1966'),
            k = React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: this._onPressMoreName,
              },
              React.default.createElement(module12.Image, {
                style: R.moreNameBtn,
                source: module1966,
                resizeMode: 'contain',
              })
            ),
            B = React.default.createElement(
              module12.ScrollView,
              {
                style: {
                  alignSelf: 'stretch',
                },
                ref: function (o) {
                  return (t.scrollView = o);
                },
              },
              module393.isMiApp && v,
              module393.isMiApp && this.state.showMoreNameBtn && k,
              React.default.createElement(
                module12.Text,
                {
                  style: R.titleText,
                },
                module500.map_edit_zone_select_tag
              ),
              module1964
            ),
            E = this.props.supportTag
              ? {
                  height: 422,
                }
              : {
                  minHeight: 160,
                };

          return React.default.createElement(
            module1033.default,
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
                  R.container,
                  {
                    height: module394.default.sharedCache().ScreenHeight,
                  },
                ],
              },
              React.default.createElement(
                module12.TouchableWithoutFeedback,
                {
                  onPress: this._onPressClose,
                },
                React.default.createElement(module12.View, {
                  style: R.accessibility,
                })
              ),
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    R.wrap,
                    {
                      marginBottom: this.animatedMarginBottom,
                      backgroundColor: this.theme.backgroundColor,
                    },
                    E,
                  ],
                },
                h,
                !this.props.supportTag && _,
                this.props.supportTag && B
              )
            )
          );
        },
      },
      {
        key: '_onPressName',
        value: function (t) {
          var o = this.state.selectNameIndex == t ? '' : this.state.buttons[t].name,
            n = this.getTagIdByName(o),
            s = this.props.supportTag ? this.isValidTag(n) : 0 != o.length;
          this.setState({
            confirmEnable: s,
            showAllName: false,
            selectNameIndex: this.state.selectNameIndex == t ? -1 : t,
            roomName: o,
            selectTagKey: n,
          });
        },
      },
      {
        key: '_onPressTag',
        value: function (t) {
          var o = {
              confirmEnable: true,
              showAllName: false,
              selectTagKey: t,
            },
            s = this.state.roomName;

          if (0 == s.length || this.isAutoCreateTagName(s, this.state.selectTagKey) || this.isAutoCreateTagName(s, t)) {
            var l = this.getValidTagName(t);
            module22.default(o, {
              roomName: l,
            });
          }

          this.setState(o);
        },
      },
    ]);
    return I;
  })(React.Component);

exports.default = I;
I.contextType = module515.AppConfigContext;
I.defaultProps = {
  buttons: [],
  supportTag: false,
};
var R = module12.StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 9,
    borderRadius: module1153.AppBorderRadius,
  },
  accessibility: {
    flex: 1,
    alignSelf: 'stretch',
  },
  wrap: {
    borderRadius: 14,
    overflow: 'hidden',
    marginHorizontal: 20,
    backgroundColor: 'transparent',
    paddingTop: 20,
    paddingHorizontal: 19,
  },
  titleText: {
    color: '#9B9B9B',
    fontSize: 14,
    height: 16,
    marginBottom: 7,
  },
  tagView: {
    height: 45,
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 8,
  },
  tagLeftView: {
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
  },
  tagImg: {
    height: 30,
    width: 30,
  },
  checkImg: {
    height: 30,
    width: 30,
    marginHorizontal: 7,
  },
  tagText: {
    textAlign: 'left',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonsWrap: {
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  button: {
    paddingHorizontal: 20,
    height: 30,
    fontSize: 14,
    marginBottom: 10,
    marginRight: 10,
    borderWidth: 0.6,
    borderRadius: 15,
    borderColor: 'transparent',
  },
  moreNameBtn: {
    height: 20,
    width: 50,
    borderRadius: 14,
    alignSelf: 'center',
  },
  topView: {
    height: 40,
    marginBottom: 15,
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  confirmButton: {
    width: 40,
    height: 36,
    marginLeft: globals.isRTL ? 0 : 20,
    marginRight: globals.isRTL ? 20 : 0,
    backgroundColor: 'transparent',
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    fontSize: 16,
    height: 36,
  },
  inputImg: {
    position: 'absolute',
    marginHorizontal: 5,
    alignSelf: 'center',
    height: 30,
    width: 30,
  },
});

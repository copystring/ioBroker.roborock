var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module385 = require('./385'),
  module12 = require('./12'),
  module1212 = require('./1212'),
  module1838 = require('./1838'),
  module1837 = require('./1837'),
  module1845 = require('./1845'),
  module394 = require('./394'),
  module1510 = require('./1510'),
  module1330 = require('./1330'),
  module515 = require('./515'),
  module391 = require('./391'),
  module414 = require('./414');

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

var module1513 = require('./1513'),
  module1512 = require('./1512'),
  D = (function (t) {
    module7.default(B, t);

    var module515 = B,
      D = P(),
      R = function () {
        var t,
          n = module11.default(module515);

        if (D) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function B(t) {
      var o;
      module4.default(this, B);
      (o = R.call(this, t)).state = {
        minute: null,
        hour: null,
        repeatMode: module1513.RepeatMode.Everyday,
        isShowingTimerPicker: false,
        isShowingCustomFrequencyView: false,
        isNew: true,
      };
      o.animatedWrapMarginBottom = new module12.Animated.Value(-500);
      return o;
    }

    module5.default(B, [
      {
        key: 'initData',
        value: function () {
          var t, n, o;
          this.data = null != (t = null == (n = this.props.navigation.getParam('data', null)) ? undefined : n.timer) ? t : [];
          this.commandId = null == (o = this.props.navigation.getParam('data', null)) ? undefined : o.id;
          this.confirmcallBack = this.props.navigation.getParam('onEditTimer', function () {});
          this.autoActivateTrigger = this.props.navigation.getParam('autoActivateTrigger', false);
        },
      },
      {
        key: 'loadData',
        value: function () {
          this.parseDataToState(this.data);
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.initData();
          this.loadData();
        },
      },
      {
        key: 'componentDidUpdate',
        value: function () {
          this.updateConfirmButton();
        },
      },
      {
        key: 'parseDataToState',
        value: function (t) {
          var n,
            o = this,
            s = function () {
              o.configNavigationBar();
            };

          if ((null != (n = null == t ? undefined : t.length) ? n : 0) > 0) {
            var l = module1512.ConvertToReadableFormat(t[0].cron);
            this.isEnabled = t[0];
            this.setState(
              {
                repeatMode: module1513.getRepeatMode(l.repeat, false),
                minute: l.minute,
                hour: l.hour,
                isNew: 0 == this.data.length,
              },
              function () {
                return s();
              }
            );
          } else
            this.setState(
              {
                isNew: 0 == this.data.length,
              },
              function () {
                return s();
              }
            );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = module1513.isCustomMode(this.state.repeatMode) ? [0, 0, 0, 0, 0, 0, 0] : this.state.repeatMode.split(''),
            o = {
              opacity: this.animatedWrapMarginBottom.interpolate({
                inputRange: [-500, 0],
                outputRange: [0, 1],
              }),
              height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
            };
          return React.default.createElement(
            module12.View,
            {
              style: {
                paddingVertical: 20,
                flex: 1,
                backgroundColor: this.context.theme.settingBackgroundColor,
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: {
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginHorizontal: 15,
                },
              },
              React.default.createElement(module385.SettingListItemView, {
                funcId: 'timer_setting_start_time',
                title: module1838.LocalizationStrings.localization_strings_Setting_DoNotDisturbPage_0,
                bottomDetail: this.timerStartDescription,
                onPress: function () {
                  return t.setState(
                    {
                      isShowingTimerPicker: true,
                    },
                    function () {
                      module12.Animated.spring(t.animatedWrapMarginBottom, {
                        toValue: 0,
                        duration: 200,
                      }).start();
                    }
                  );
                },
                titleColor: 'rgba(0,0,0,0.8)',
                shouldShowTopLongLine: false,
              }),
              React.default.createElement(module385.SettingListItemView, {
                funcId: 'timer_setting_repeat_mode',
                title: module1838.LocalizationStrings.localization_strings_Setting_Timer_SettingPage_1,
                bottomDetail: module1513.getTextOfRepeatMode(this.state.repeatMode, new Date()),
                bottomDetailWidth: module12.Dimensions.get('window').width - 60,
                onPress: function () {
                  var n;
                  return null == (n = t.frequencyView) ? undefined : n.show();
                },
                titleColor: 'rgba(0,0,0,0.8)',
              })
            ),
            !this.state.isNew &&
              React.default.createElement(
                module12.TouchableWithoutFeedback,
                {
                  onPress: function () {
                    var n = {
                        text: module1838.LocalizationStrings.localization_strings_Main_MainPage_11,
                      },
                      o = {
                        text: module1838.LocalizationStrings.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          t.deleteTimer();
                        },
                      };
                    globals.Alert.alert('', module1838.LocalizationStrings.localization_strings_Setting_Timer_index_13, [n, o]);
                  },
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: E.deleteText,
                  },
                  module1838.LocalizationStrings.smart_scene_delete_timer
                )
              ),
            React.default.createElement(
              module385.BaseModal,
              {
                transparent: true,
                visible: this.state.isShowingTimerPicker,
                onRequestClose: function () {
                  return t.setState({
                    isShowingTimerPicker: false,
                  });
                },
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [E.modal, o],
                },
                React.default.createElement(
                  module12.TouchableWithoutFeedback,
                  {
                    onPress: function () {
                      t.hideTimerPicker();
                    },
                  },
                  React.default.createElement(module12.View, {
                    style: E.timerOutView,
                  })
                ),
                React.default.createElement(
                  module12.Animated.View,
                  {
                    style: [
                      E.pickerView,
                      {
                        bottom: this.animatedWrapMarginBottom,
                      },
                    ],
                  },
                  React.default.createElement(module385.CustomDatePicker, {
                    ref: function (n) {
                      t.timePicker = n;
                    },
                    showDate: new Date(),
                    onPressCancelButton: function () {
                      return t.setState({
                        isShowingTimerPicker: false,
                      });
                    },
                    onPressConfirmButton: this.onSelectDateFromDatePicker.bind(this),
                  })
                )
              )
            ),
            React.default.createElement(
              module385.BaseModal,
              {
                transparent: true,
                visible: this.state.isShowingCustomFrequencyView,
                onRequestClose: function () {
                  return t.setState({
                    isShowingCustomFrequencyView: false,
                  });
                },
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    E.modal,
                    {
                      height: module394.default.sharedCache().ScreenHeight,
                    },
                  ],
                },
                React.default.createElement(module1845.default, {
                  selectedItems: n,
                  cancel: function (n) {
                    return t.onSelectCustomFrequency(n);
                  },
                })
              )
            ),
            React.default.createElement(module1212.default, {
              ref: function (n) {
                return (t.frequencyView = n);
              },
              title: module1838.LocalizationStrings.localization_strings_Setting_Timer_SettingPage_1,
              actions: module1513.SmartSceneRepeatMenuItems(),
              didSelectRow: function (n) {
                return t.onSelectFrequency(n);
              },
              onPressCancel: function () {
                var n;
                return null == (n = t.frequencyView) ? undefined : n.hide();
              },
            }),
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'loading_view_loading',
              closeAccessibilityLabelKey: 'loading_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              showButton: true,
            })
          );
        },
      },
      {
        key: 'hideTimerPicker',
        value: function () {
          var t = this;
          module12.Animated.timing(this.animatedWrapMarginBottom, {
            toValue: -500,
            duration: 200,
          }).start(function () {
            t.setState({
              isShowingTimerPicker: false,
            });
          });
        },
      },
      {
        key: 'onSelectDateFromDatePicker',
        value: function (t) {
          this.setState({
            hour: t.getHours(),
            minute: t.getMinutes(),
            isShowingTimerPicker: false,
          });
        },
      },
      {
        key: 'onSelectFrequency',
        value: function (t) {
          var n = this;
          this.frequencyView.hide(function () {
            if (t == module1513.SmartSceneRepeatMenuItems().length - 1)
              n.setState({
                isShowingCustomFrequencyView: true,
              });
            else
              n.setState({
                repeatMode: module1513.SmartSceneIndexRepeatMap[t],
              });
          });
        },
      },
      {
        key: 'onSelectCustomFrequency',
        value: function (t) {
          if (t && t.toString().indexOf('1') > -1)
            this.setState({
              repeatMode: t.join(''),
            });
          this.setState({
            isShowingCustomFrequencyView: false,
          });
        },
      },
      {
        key: 'onPressMenuConfirm',
        value: function () {
          var t,
            n,
            o = this,
            s = function () {
              var t = {
                  cron: o.cron,
                  timeZoneId: module394.default.sharedCache().robotTimeZone,
                  repeated: o.state.repeatMode != module1513.IndexRepeatMap[0],
                  enabled: !!o.autoActivateTrigger || o.data[0].enabled,
                },
                n = {
                  name: 'TIMER',
                  type: 'TIMER',
                  param: JSON.stringify(t),
                };
              module1837.SmartSceneAPI.editTriggers(o.commandId, [n])
                .then(function (s) {
                  if (o.data.length > 0) o.data[0].param = t;
                  else o.dataRef.timer = [new module1837.SmartSceneTriggerModel(n)];
                  o.confirmcallBack();
                  o.props.navigation.pop();
                })
                .catch(function () {
                  globals.showToast(module1838.LocalizationStrings.map_object_ignore_failed);
                })
                .finally(function () {
                  var t;
                  if (!(null == (t = o.loadingView) || null == t.hide)) t.hide();
                });
            };

          if (!(null == (t = this.loadingView) || null == t.showWithText)) t.showWithText();
          if (0 == (null != (n = module394.default.sharedCache.robotTimeZone) ? n : '').trim().length)
            module414.default
              .getTimeZone()
              .then(function (t) {
                module394.default.sharedCache.robotTimeZone = t.result[0];
                s();
              })
              .catch(function (t) {
                var n;
                if (!(null == (n = o.loadingView) || null == n.hide)) n.hide();
                globals.showToast(module1838.LocalizationStrings.map_object_ignore_failed);
              });
          else s();
        },
      },
      {
        key: 'deleteTimer',
        value: function () {
          var t = this;
          module1837.SmartSceneAPI.editTriggers(this.commandId, [])
            .then(function (n) {
              t.dataRef.timer = [];
              t.confirmcallBack();
              t.props.navigation.pop();
            })
            .catch(function () {
              globals.showToast(module1838.LocalizationStrings.map_object_ignore_failed);
            });
        },
      },
      {
        key: 'configNavigationBar',
        value: function () {
          var t = this;
          this.props.navigation.setParams({
            navBarBackgroundColor: globals.app.state.theme.settingBackgroundColor,
            hiddenBottomLine: true,
            rightItems: [
              module1330.MapEditCommonService.confirmButton(this.onPressMenuConfirm.bind(this), null != this.state.hour && null != this.state.minute, function (n) {
                return (t.confirmButton = n);
              }),
            ],
          });
        },
      },
      {
        key: 'updateConfirmButton',
        value: function () {
          var t,
            n = null != this.state.hour && null != this.state.minute;
          if (!(null == (t = this.confirmButton) || null == t.setEnabled)) t.setEnabled(n);
        },
      },
      {
        key: 'timerStartDescription',
        get: function () {
          return null != this.state.minute && null != this.state.hour
            ? module1513.addZeroPrefix(this.state.hour) + ' : ' + module1513.addZeroPrefix(this.state.minute)
            : module1838.LocalizationStrings.timer_setting_no_setting;
        },
      },
      {
        key: 'cron',
        get: function () {
          var t = module1513.timerRepeatToCronRepeat(this.state.repeatMode),
            n = -1,
            o = -1;

          if (this.state.repeatMode == module1513.RepeatMode.Once) {
            var s = new Date(),
              l = s.getHours() == this.state.hour && s.getMinutes() == this.state.minute,
              u = module1510.default();

            if ((u.hour(this.state.hour), u.minute(this.state.minute), (n = u.toObject().months + 1), u.isBefore() || l)) {
              var c = u.add(1, 'days').toObject();
              o = c.date;
              n = c.months + 1;
              console.log(' before ' + JSON.stringify(u.toObject()));
            } else {
              o = u.toObject().date;
              console.log('after ' + JSON.stringify(u.toObject()));
            }
          }

          return module1512.ConvertToCronStr(this.state.hour, this.state.minute, t, o, n);
        },
      },
      {
        key: 'dataRef',
        get: function () {
          return this.props.navigation.getParam('data', null);
        },
      },
    ]);
    return B;
  })(React.default.Component);

exports.default = D;
D.contextType = module515.AppConfigContext;
var E = module12.StyleSheet.create({
  modal: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    alignItems: 'stretch',
  },
  timerOutView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  pickerView: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 99999,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    overflow: 'hidden',
  },
  deleteText: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    color: '#E22920',
    fontSize: 16,
  },
});

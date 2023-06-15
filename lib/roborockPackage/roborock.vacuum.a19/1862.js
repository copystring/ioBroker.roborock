require('./388');

var regeneratorRuntime = require('regenerator-runtime'),
  module30 = require('./30'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1863 = require('./1863'),
  module381 = require('./381'),
  module1117 = require('./1117'),
  module407 = require('./407'),
  module377 = require('./377'),
  module387 = require('./387'),
  module1365 = require('./1365'),
  module390 = require('./390'),
  module386 = require('./386'),
  module378 = require('./378'),
  module1231 = require('./1231'),
  module1864 = require('./1864'),
  module1865 = require('./1865'),
  module411 = require('./411'),
  module1866 = require('./1866'),
  module1808 = require('./1808'),
  module415 = require('./415'),
  module506 = require('./506'),
  module1861 = require('./1861'),
  module937 = require('./937'),
  module1354 = require('./1354');

function W(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function F(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      W(Object(o), true).forEach(function (n) {
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      W(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function A() {
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

require('./1867');

require('./394');

require('./1366');

module12.Animated.createAnimatedComponent(module12.TouchableOpacity);

var module491 = require('./491').strings,
  module389 = require('./389'),
  module1869 = require('./1869'),
  module1367 = require('./1367'),
  module936 = require('./936'),
  module1368 = require('./1368'),
  Z = (function (t) {
    module7.default(J, t);

    var module49 = J,
      module506 = A(),
      W = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function J(t) {
      var n, o, s;
      module4.default(this, J);
      s = W.call(this, t);
      var u = t.navigation.state.params || {};
      s.selectedSegments = (!!u && u.segments) || '0';
      s.selectedSegments = s.selectedSegments.replace('ok', '0');
      s.segmentMapId = u && (u.mapId || 0 == u.mapId) ? u.mapId : -1;
      s.originalSegments = s.selectedSegments;
      console.log('selectedSegments - ' + s.selectedSegments);
      var h = new Date();
      s.timerId = u.timerId || '';
      s.date = u.date || '';
      s.FCCState = u.FCCState || 0;
      s.miTimerScene = u.miTimerScene;
      s.editMode = u.editMode || false;
      s.originalHour = u.hour;
      s.originalMinute = u.minute;
      s.originalRepeatMode = u.repeatMode || module1368.RepeatMode.Once;
      s.originalMode = u.mode || s.getFanPower();
      s.originalWaterMode = u.waterMode || s.getWaterBoxMode();
      s.originStartWeekdays = u.startWeekdays || [];
      s.state = {
        name: u.name || '' + h.getTime(),
        minute: undefined == u.minute ? h.getMinutes() : u.minute,
        hour: undefined == u.hour ? h.getHours() : u.hour,
        repeatMode: u.repeatMode || module1368.RepeatMode.Once,
        mode: u.mode || s.getFanPower(),
        waterMode: u.waterMode || s.getWaterBoxMode(),
        currentCleanOrderIndex: u.cleanOrder || 0,
        modalVisible: false,
        shouldShowFrequenceView: false,
        shouldShowFrequenceCustomView: false,
        shouldShowTimePickerView: false,
        shouldShowMapSegmentView:
          module386.default.isMapSegmentSupported() &&
          module377.RobotStatusManager.sharedManager().mapStatus == module377.MapStatus.Has_WithSegments &&
          !module377.RSM.multiFloorEnabled,
        shouldShowMultiMapSegmentView: module386.default.isMultiMapSegmentTimerSupported(),
        hasSetTime: false,
        scrollEnabled: true,
        mopMode: u.mopMode || s.getMopMode(),
        mopModeName: s.editMode ? u.mopModeName : null == (n = module1354.ModeDataInstance.modePannelCustomMops[0]) ? undefined : n.name,
        mopModeId: s.editMode ? u.mopModeId : null == (o = module1354.ModeDataInstance.modePannelCustomMops[0]) ? undefined : o.id,
        currentCleanMethod: undefined == u.cleanMethod ? module1861.CleanMethodMop : u.cleanMethod,
        shouldShowCleanMethodView: false,
        shouldShowCustomSwitch: !module415.DMM.isGarent,
      };
      s.timerList = u.timerList || [];
      s.animatedWrapMarginBottom = new module12.Animated.Value(-500);
      return s;
    }

    module5.default(J, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.renderNavRightButton();
          module1231.MM.shouldForceStart = true;
          module1231.MM.start();

          this.modeChangeHandler = function () {
            var n, o;
            if (
              !(
                -1 !=
                module1354.ModeDataInstance.modePannelCustomMops.findIndex(function (n) {
                  return n.id == t.setState.mopModeId;
                })
              )
            )
              t.setState({
                mopModeId: null == (n = module1354.ModeDataInstance.modePannelCustomMops[0]) ? undefined : n.id,
                mopModeName: null == (o = module1354.ModeDataInstance.modePannelCustomMops[0]) ? undefined : o.name,
              });
          };

          module1354.ModeDataInstance.addChangeListener(this.modeChangeHandler);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module1231.MM.shouldForceStart = false;
          module1231.MM.stop();
          module1354.ModeDataInstance.removeChangeListener(this.modeChangeHandler);
        },
      },
      {
        key: 'renderNavRightButton',
        value: function () {
          var t = this,
            n = React.default.createElement(module381.PureImageButton, {
              funcId: 'timer_confirm_button',
              ref: function (n) {
                t.confirmButton = n;
              },
              style: K.confirmButton,
              image: this.context.theme.timerSetting.confirmButton,
              onPress: this.onPressConfirmButton.bind(this),
              imageWidth: 40,
              imageHeight: 40,
              enabled: this.editMode,
              imageStyle: {
                resizeMode: 'contain',
                width: 24,
                height: 24,
              },
            });
          this.props.navigation.setParams({
            title: module491.localization_strings_Setting_Timer_SettingPage_16,
            rightItems: [n],
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            onPressLeft: this.onLeftButtonPress.bind(this),
          });
          var t = module1231.MM.getMapConfigById(this.segmentMapId) || {
            name: module491.timer_setting_map_select_any_map,
            id: -1,
          };
          if (this.state.shouldShowMultiMapSegmentView) this.handleMapChange(t, true);
          this.checkIsCustomMode();
        },
      },
      {
        key: 'checkIsCustomMode',
        value: function () {
          var t = this;
          setTimeout(function () {
            if (module378.isModeCustomized(t.state.mode, t.state.waterMode) && t.mapSegmentSettingView) t.mapSegmentSettingView.setCustomMode(true);
          }, 500);
        },
      },
      {
        key: 'showRepeatDialog',
        value: function () {
          this.setState({
            modalVisible: true,
            shouldShowFrequenceView: true,
          });
          this.showModalView();
        },
      },
      {
        key: 'showCustomModeDialog',
        value: function () {
          var t = this.state.mode,
            n = this.state.waterMode,
            o = this.state.mopMode;
          if (this.state.currentCleanMethod == module1861.CleanMethodClean && 301 == o) o = 300;
          if (module386.default.isShakeMopSetSupported()) {
            if (this.customModeView) this.customModeView.show(t, n, module415.DMM.isGarnet ? this.state.mopModeId : o);
          } else if (this.customModeView) this.customModeView.show(t, n);
        },
      },
      {
        key: 'showCleanMethodDialog',
        value: function () {
          this.setState({
            modalVisible: true,
            shouldShowCleanMethodView: true,
          });
          this.showModalView();
        },
      },
      {
        key: 'showTimePicker',
        value: function () {
          this.setState({
            shouldShowTimePickerView: true,
          });
          this.showModalView();
          var t = this;
          setTimeout(function () {
            var n = new Date();
            n.setHours(t.state.hour);
            n.setMinutes(t.state.minute);
            if (t.timePicker)
              t.timePicker.setState({
                currentDate: n,
              });
          }, 250);
        },
      },
      {
        key: '_onSelectCleanMethod',
        value: function (t) {
          var n = this,
            o = this.state.mode,
            s = this.state.waterMode,
            l = this.state.mopMode;
          module378.isModeCustomized(o, s, l);
          this.hideModalView(function () {
            n.setState({
              currentCleanMethod: t,
              shouldShowCleanMethodView: false,
            });
            n.enableConfirmButton();
          });
        },
      },
      {
        key: 'frequenceDidUpdate',
        value: function (t) {
          var n = this;

          if (4 == t) {
            this.setState({
              shouldShowFrequenceView: false,
              shouldShowFrequenceCustomView: true,
            });
            console.log('frequenceDidUpdate --- Custom mode');
          } else
            this.hideModalView(function () {
              n.setState({
                repeatMode: module1368.IndexRepeatMap[t],
                shouldShowFrequenceView: false,
              });
            });
        },
      },
      {
        key: 'customModeDidChange',
        value: function (t, n, o) {
          var s = t || 102,
            l = n || 202,
            u = o || 300;
          this.setState({
            waterMode: l,
            mode: s,
            mopMode: module415.DMM.isGarnet ? null : u,
            mopModeId: module415.DMM.isGarnet ? (null == o ? undefined : o.id) : null,
            mopModeName: module415.DMM.isGarnet ? (null == o ? undefined : o.name) : null,
          });
          var h = module378.isModeCustomized(s, l, u);
          if (this.mapSegmentSettingView) this.mapSegmentSettingView.setCustomMode(h);
          console.log('timer setting customModeDidChange', t, n, o);
        },
      },
      {
        key: 'customFrequenceDidUpdate',
        value: function (t) {
          var n = this;
          console.log('customFrequenceDidUpdate - ' + JSON.stringify(t));
          var o = {
            shouldShowFrequenceCustomView: false,
          };
          if (t && t.toString().indexOf('1') > -1) o.repeatMode = t.join('');
          this.hideModalView(function () {
            n.setState(F({}, o));
          });
        },
      },
      {
        key: 'onPressConfirmButton',
        value: function () {
          var t = this,
            o = module1368.timerRepeatToCronRepeat(this.state.repeatMode),
            s = -1,
            l = -1;

          if (this.state.repeatMode == module1368.RepeatMode.Once) {
            var u = new Date(),
              h = u.getHours() == this.state.hour && u.getMinutes() == this.state.minute,
              c = module1365.default();

            if ((c.hour(this.state.hour), c.minute(this.state.minute), (s = c.toObject().months + 1), c.isBefore() || h)) {
              var p = c.add(1, 'days').toObject();
              l = p.date;
              s = p.months + 1;
              console.log(' before ' + JSON.stringify(c.toObject()));
            } else {
              l = c.toObject().date;
              console.log('after ' + JSON.stringify(c.toObject()));
            }
          }

          if (this.isRepeatTimer(l, s)) globals.showToast(module491.set_timer_dup);
          else if (this.mapSegmentSettingView && this.mapSegmentSettingView.state.isLoading) globals.showToast(module491.map_loading_view_tip);
          else {
            if ('0' == this.selectedSegments && this.mapSegmentSettingView && this.mapSegmentSettingView.state.shouldShowBottom) {
              if (!module386.default.isMultiMapSegmentTimerSupported()) return void globals.showToast(module491.timer_setting_select_zone_tip);
              var f = this.mapSegmentSettingView && this.mapSegmentSettingView.mapView && this.mapSegmentSettingView.mapView.getExistingBlocks();
              if (f && f.length) this.selectedSegments = f.join(',');
              console.log('segments', this.selectedSegments);
            }

            this.confirmButton.setEnabled(false);
            var M = module1367.ConvertToCronStr(this.state.hour, this.state.minute, o, l, s);

            if (module389.isMiApp && 1 == this.FCCState) {
              var S = module1368.convertToBeijingTime(this.state.minute, this.state.hour, l, s),
                w = this.state.repeatMode;

              if (this.state.repeatMode != module1368.RepeatMode.Once && this.state.repeatMode != module1368.RepeatMode.Everyday) {
                var _ = new Date();

                if (S.month == _.getMonth() + 1)
                  S.day == _.getDate() + 1
                    ? (w = module1368.getDaysArrByOffset(this.state.repeatMode, 1))
                    : S.day == _.getDate() - 1 && (w = module1368.getDaysArrByOffset(this.state.repeatMode, -1));
                else w = 1 == S.day ? module1368.getDaysArrByOffset(this.state.repeatMode, 1) : module1368.getDaysArrByOffset(this.state.repeatMode, -1);
              }

              o = module1368.timerRepeatToCronRepeat(w);
              M = module1367.ConvertToCronStr(S.hour, S.minute, o, S.day, S.month);
            }

            console.log('make cron - ' + o + ' day - ' + JSON.stringify(l) + ' month - ' + JSON.stringify(s));
            var y = [this.state.name, [M, this.getOldLogicPara()]],
              b = [this.state.name, [M, ['start_clean', this.getNewLogicPara()]]],
              T = module377.RobotStatusManager.sharedManager().isSupportOrderSegmentClean() ? b : y;
            console.log('cronString - ' + JSON.stringify(M) + ' param - ' + JSON.stringify(T));

            var P = function () {
              if (0 == t.FCCState) t.setTimerOnRobot(T);
              else t.setTimerOnServer(y, M, l, s);
              if (t.loadingView) t.loadingView.showWithText();
            };

            if (module386.default.isMultiMapSegmentTimerSupported() && module377.RSM.isRunning && this.segmentMapId != module377.RSM.currentMapId && -1 != this.segmentMapId) {
              if (this.alert)
                this.alert.customAlert(
                  '',
                  module491.set_multi_map_timer_different_map_save_tip,
                  function () {
                    return regeneratorRuntime.default.async(
                      function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              t.next = 2;
                              return regeneratorRuntime.default.awrap(module407.default.stop());

                            case 2:
                              P();

                            case 3:
                            case 'end':
                              return t.stop();
                          }
                      },
                      null,
                      null,
                      null,
                      Promise
                    );
                  },
                  null,
                  {}
                );
            } else P();
          }
        },
      },
      {
        key: 'getNewLogicPara',
        value: function () {
          var t = {
            segments: this.selectedSegments,
            repeat: 1,
            fan_power: this.state.mode,
            clean_order_mode: parseInt(this.state.currentCleanOrderIndex),
            water_box_mode: parseInt(this.state.waterMode || 202),
            clean_mop: parseInt(this.state.currentCleanMethod),
          };
          if (module386.default.isMultiMapSegmentTimerSupported())
            t = F(
              F({}, t),
              {},
              {
                mop_template_id: this.state.mopModeId,
              }
            );
          if (module386.default.isMultiMapSegmentTimerSupported())
            t = F(
              F({}, t),
              {},
              {
                map_index: this.segmentMapId,
              }
            );
          if (module386.default.isShakeMopSetSupported())
            t = F(
              F({}, t),
              {},
              {
                mop_mode: parseInt(this.state.mopMode || -99),
              }
            );
          return t;
        },
      },
      {
        key: 'getOldLogicPara',
        value: function () {
          var t = ['start_clean', this.state.mode, this.selectedSegments];
          if (module386.default.isMultiMapSegmentTimerSupported()) t = [].concat(module30.default(t), [this.segmentMapId]);
          return t;
        },
      },
      {
        key: 'setTimerOnRobot',
        value: function (t) {
          var o, s;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.setTimer(t));

                  case 3:
                    o = l.sent;
                    console.log('setTimerOnRobot -- ' + JSON.stringify(t) + ' -- ' + JSON.stringify(o));
                    this.setTimerSuccess();
                    l.next = 15;
                    break;

                  case 8:
                    l.prev = 8;
                    l.t0 = l.catch(0);
                    s = 'setTimerOnRobot  error: ' + JSON.stringify(l.t0) + ',param --' + JSON.stringify(t);
                    globals.showToast(module491.robot_communication_exception);
                    console.log(s);
                    this.enableConfirmButton();
                    if (this.loadingView) this.loadingView.hide();

                  case 15:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[0, 8]],
            Promise
          );
        },
      },
      {
        key: 'setTimerSuccess',
        value: function () {
          if (this.props.navigation.state.params.timerListNeedUpdate) this.props.navigation.state.params.timerListNeedUpdate();
          if (this.loadingView) this.loadingView.hide();
          this.props.navigation.goBack();
        },
      },
      {
        key: 'setTimerOnServer',
        value: function (t, o, s, l) {
          var u, h, c, p, f, M, S, w, _, y, module1365, module390, module378, module1231, module1864, module1865;

          return regeneratorRuntime.default.async(
            function (I) {
              for (;;)
                switch ((I.prev = I.next)) {
                  case 0:
                    I.prev = 0;
                    I.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.setServerTimer(t));

                  case 3:
                    if (
                      ((u = I.sent),
                      (h = u.result[0].replace('ok', '0')),
                      (c = {
                        name: this.state.name,
                        segments: h,
                        repeat: 1,
                        fan_power: this.state.mode,
                        clean_order_mode: parseInt(this.state.currentCleanOrderIndex),
                        water_box_mode: parseInt(this.state.waterMode || 202),
                        clean_mop: parseInt(this.state.currentCleanMethod),
                      }),
                      module386.default.isMultiMapSegmentTimerSupported() &&
                        (c = F(
                          F({}, c),
                          {},
                          {
                            map_index: this.segmentMapId,
                          }
                        )),
                      module386.default.isShakeMopSetSupported() &&
                        (c = F(
                          F({}, c),
                          {},
                          {
                            mop_mode: parseInt(this.state.mopMode),
                          }
                        )),
                      (p = [c]),
                      (f = [this.state.name, this.state.mode, h]),
                      (M = module377.RobotStatusManager.sharedManager().isSupportOrderSegmentClean() ? p : f),
                      !module389.isMiApp)
                    ) {
                      I.next = 29;
                      break;
                    }

                    if (
                      ((S = {
                        enable_timer: 1,
                        enable_timer_off: 0,
                        enable_timer_on: 1,
                        off_method: '',
                        off_param: '',
                        off_time: '',
                        on_method: 'server_scheduled_start',
                        on_param: M,
                        on_time: o,
                      }),
                      (w = {
                        name: this.state.name,
                        setting: S,
                      }),
                      (_ = null),
                      (y = !this.miTimerScene),
                      console.log('miTimerScene', typeof this.miTimerScene),
                      !y)
                    ) {
                      I.next = 23;
                      break;
                    }

                    I.next = 20;
                    return regeneratorRuntime.default.awrap(module389.miAddTimer(w));

                  case 20:
                    _ = I.sent;
                    I.next = 26;
                    break;

                  case 23:
                    I.next = 25;
                    return regeneratorRuntime.default.awrap(this.miTimerScene.save(w));

                  case 25:
                    _ = I.sent;

                  case 26:
                    console.log('miTimer ' + (y ? 'add' : 'edit') + ' - ' + JSON.stringify(_));
                    I.next = 39;
                    break;

                  case 29:
                    module1365 = {
                      id: 1,
                      method: 'server_scheduled_start',
                      params: M,
                    };
                    module390 = module1368.convertToTargetTime(this.state.minute, this.state.hour, s, l, module389.robotTimeZone);
                    module378 = module390.hour + ':' + module1368.addZeroPrefix(module390.minute);
                    module1231 = module1368.getLoopStringOfRepeatMode(this.state.repeatMode);
                    module1864 = new Date();
                    module1865 = module1368.resolveRepeatModeByTargetTime(module1231, module1864.getMonth() + 1, module1864.getDate(), module390.month, module390.day);
                    console.log('loops -- time - ' + module378 + ' - loop -' + module1865 + ' -repeat-' + this.state.repeatMode + ' - timerId- ' + this.timerId);
                    I.next = 38;
                    return regeneratorRuntime.default.awrap(module389.rrAddOrEditTimer(module378, module1865, module1365, this.timerId));

                  case 38:
                    I.sent;

                  case 39:
                    this.setTimerSuccess();
                    I.next = 48;
                    break;

                  case 42:
                    I.prev = 42;
                    I.t0 = I.catch(0);
                    this.enableConfirmButton();
                    if (this.loadingView) this.loadingView.hide();
                    globals.showToast(module491.robot_communication_exception);
                    console.log('setTimerOnServer error: ' + ('object' == typeof I.t0 ? JSON.stringify(I.t0) : I.t0));

                  case 48:
                  case 'end':
                    return I.stop();
                }
            },
            null,
            this,
            [[0, 42]],
            Promise
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = null,
            s = this.state,
            l = s.shouldShowMapSegmentView,
            u = s.shouldShowMultiMapSegmentView;
          if (this.state.shouldShowFrequenceView) o = this.getRepeatSettingView();
          else if (this.state.shouldShowFrequenceCustomView) o = this.getCustomRepeatView();
          else if (this.state.shouldShowCleanMethodView) o = this.getCleanMethodView();
          o = React.default.createElement(
            module12.Animated.View,
            {
              style: {
                height: 500,
                marginBottom: this.animatedWrapMarginBottom,
                justifyContent: 'flex-end',
                paddingBottom: 10,
                overflow: 'hidden',
              },
            },
            o
          );
          var h = this.state.shouldShowTimePickerView
              ? this.getTimerPickerView()
              : React.default.createElement(
                  module12.TouchableWithoutFeedback,
                  {
                    accessible: false,
                    onPress: function () {
                      t.hideModalView(function () {
                        t.setState({
                          shouldShowFrequenceView: false,
                          shouldShowFrequenceCustomView: false,
                          shouldShowCleanMethodView: false,
                        });
                      });
                    },
                  },
                  React.default.createElement(
                    module12.Animated.View,
                    {
                      style: [
                        K.modal,
                        {
                          opacity: this.animatedWrapMarginBottom.interpolate({
                            inputRange: [-500, 0],
                            outputRange: [0, 1],
                          }),
                          height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                        },
                      ],
                    },
                    o
                  )
                ),
            c = this.getCleanModeDetailText();
          return React.default.createElement(
            module12.View,
            {
              style: [
                K.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(module1866.default, {
              ref: function (n) {
                return (t.fillTopView = n);
              },
            }),
            React.default.createElement(
              module12.ScrollView,
              {
                style: K.container,
                scrollEnabled: this.state.scrollEnabled,
              },
              React.default.createElement(
                module937.default,
                {
                  transparent: true,
                  visible: this.state.modalVisible,
                  onRequestClose: function () {
                    t.hideModalView();
                  },
                },
                h
              ),
              React.default.createElement(module12.View, {
                style: K.section,
              }),
              React.default.createElement(module381.SettingListItemView, {
                funcId: 'timer_setting_start_time',
                title: module491.localization_strings_Setting_DoNotDisturbPage_0,
                bottomDetail: this._getTimestampText(),
                onPress: this.showTimePicker.bind(this),
                style: K.menuItem,
                titleColor: 'rgba(0,0,0,0.8)',
                shouldShowTopLongLine: true,
              }),
              React.default.createElement(module381.SettingListItemView, {
                funcId: 'timer_setting_repeat_mode',
                title: module491.localization_strings_Setting_Timer_SettingPage_1,
                bottomDetail: module1368.getTextOfRepeatMode(this.state.repeatMode, this.date),
                bottomDetailWidth: module12.Dimensions.get('window').width - 60,
                onPress: this.showRepeatDialog.bind(this),
                style: K.menuItem,
                titleColor: 'rgba(0,0,0,0.8)',
              }),
              module415.DMM.isGarnet &&
                React.default.createElement(module381.SettingListItemView, {
                  funcId: 'timer_setting_clean_method',
                  title: module491.timer_setting_clean_method,
                  bottomDetail: this.getCleanModeBottomText(),
                  shouldShowBottomLine: true,
                  shouldShowBottomLongLine: true,
                  onPress: this.showCleanMethodDialog.bind(this),
                  style: K.menuItem,
                  titleColor: 'rgba(0,0,0,0.8)',
                }),
              React.default.createElement(module381.SettingListItemView, {
                funcId: 'timer_setting_clean_mode',
                title: module491.map_edit_custom_mode,
                bottomDetail: c,
                shouldShowBottomLine: true,
                shouldShowBottomLongLine: true,
                onPress: this.showCustomModeDialog.bind(this),
                style: K.menuItem,
                titleColor: 'rgba(0,0,0,0.8)',
              }),
              l &&
                !u &&
                React.default.createElement(module1863.default, {
                  style: K.mapSegmentSettingView,
                  ref: function (n) {
                    t.mapSegmentSettingView = n;
                  },
                  selectedSegments: this.selectedSegments,
                  selectedBlocksDidChange: this.handleSelectdBlocksDidChange.bind(this),
                  isCustomMode: module378.isModeCustomized(this.state.mode, this.state.waterMode),
                  onPanResponderGrant: function () {
                    t.setState({
                      scrollEnabled: false,
                    });
                  },
                  onPanResponderRelease: function () {
                    t.setState({
                      scrollEnabled: true,
                    });
                  },
                }),
              u &&
                React.default.createElement(module1864.default, {
                  style: K.mapSegmentSettingView,
                  ref: function (n) {
                    t.mapSegmentSettingView = n;
                  },
                  currentMap: this.currentMap,
                  selectedSegments: this.selectedSegments,
                  selectedBlocksDidChange: this.handleSelectdBlocksDidChange.bind(this),
                  stopTaskSwitchMap: function (n) {
                    return t.handleMapChange(n);
                  },
                  showMapSelectView: function () {
                    return t.mapSelectView.show();
                  },
                  isCustomMode: module378.isModeCustomized(this.state.mode, this.state.waterMode),
                  onPanResponderGrant: function () {
                    t.setState({
                      scrollEnabled: false,
                    });
                  },
                  onPanResponderRelease: function () {
                    t.setState({
                      scrollEnabled: true,
                    });
                  },
                }),
              React.default.createElement(module1865.default, {
                defaultItem: {
                  name: module491.timer_setting_map_select_any_map,
                  id: -1,
                },
                didSelectMap: this.mapDidChange.bind(this),
                ref: function (n) {
                  return (t.mapSelectView = n);
                },
              }),
              React.default.createElement(module381.AlertView, {
                ref: function (n) {
                  return (t.alert = n);
                },
              })
            ),
            React.default.createElement(module378.ModeSettingPanel, {
              ref: function (n) {
                t.customModeView = n;
              },
              isTimerPage: true,
              shouldShowCustomSwitch: this.state.shouldShowCustomSwitch,
              didSetMode: this.customModeDidChange.bind(this),
              onPressQuestion: this.onPressQuestion.bind(this),
              onPressMore: function () {
                var n;
                if (!(null == (n = t.customModeView))) n.hide();
                t.props.navigation.navigate('MopModeListPage', {
                  title: module491.custom_mode_panel_more_mode_title,
                });
              },
            }),
            React.default.createElement(module1808.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              parent: this,
              bgImage: n.guideImages.mode,
              topTitle: module491.tanos_custom_mode_title,
              context: module491.tanos_custom_mode_des_info,
              hintText: module491.map_edit_guide_wall_tip_line2,
              buttonInfo: [module491.localization_strings_Main_MainPage_11, module491.button_go_setting],
              buttonFuncId: ['timer_setting_guide_left', 'timer_setting_guide_right'],
              onPressGoSetting: function () {
                return t._onPressCustomModeButton();
              },
            }),
            React.default.createElement(module381.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'setting_page_view_loading',
              closeAccessibilityLabelKey: 'setting_page_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              showButton: true,
            })
          );
        },
      },
      {
        key: 'getCleanModeBottomText',
        value: function () {
          return this.state.currentCleanMethod == module1861.CleanMethodNoSet ? module491.timer_setting_no_setting : module1861.getCleanMethods()[this.state.currentCleanMethod];
        },
      },
      {
        key: 'getCleanModeDetailText',
        value: function () {
          var t = module415.DMM.isGarnet,
            n = this.state.currentCleanMethod;
          if (module378.isModeCustomized(this.state.mode, this.state.waterMode, this.state.mopMode)) return module491.map_edit_bottom_menu_mode;
          var o = module378.getCleanModeTitle(this.state.mode),
            s = module378.getMopWaterOrStrengthTitle(this.state.waterMode),
            l = o + (s ? ' | ' + s : '');

          if (module386.default.isShakeMopSetSupported() && 200 != this.state.waterMode) {
            var u = t ? this.state.mopModeName : module378.getMopMethodTitle(this.state.mopMode);
            if (301 == this.state.mopMode) return s + ' | ' + u;

            if (t) {
              if (n == module1861.CleanMethodClean) return l;
              if (n == module1861.CleanMethodMop) return u;
              if (n == module1861.CleanMethodCleanAndMop) return l + ' | ' + u;
            }
          }

          return l;
        },
      },
      {
        key: 'getTimerPickerView',
        value: function () {
          var t = this,
            n = new Date();
          n.setHours(this.state.hour);
          n.setMinutes(this.state.minute);
          return React.default.createElement(
            module12.Animated.View,
            {
              style: [
                K.modal,
                {
                  opacity: this.animatedWrapMarginBottom.interpolate({
                    inputRange: [-500, 0],
                    outputRange: [0, 1],
                  }),
                  height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                },
              ],
            },
            React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: function () {
                  t.hideTimerPicker();
                },
              },
              React.default.createElement(module12.View, {
                style: K.timerOutView,
              })
            ),
            React.default.createElement(
              module12.Animated.View,
              {
                style: {
                  position: 'absolute',
                  zIndex: 99999,
                  bottom: this.animatedWrapMarginBottom,
                  justifyContent: 'flex-end',
                  paddingBottom: 10,
                  overflow: 'hidden',
                },
              },
              React.default.createElement(module381.CustomDatePicker, {
                ref: function (n) {
                  t.timePicker = n;
                },
                showDate: n,
                onPressCancelButton: this.hideTimerPicker.bind(this),
                onPressConfirmButton: this.didSelectTime.bind(this),
              })
            )
          );
        },
      },
      {
        key: 'getRepeatSettingView',
        value: function () {
          var t = this,
            n = module1368.RepeatIndexMap[this.state.repeatMode];
          if (undefined == n) n = 4;
          return React.default.createElement(module1117.ActionSheetView, {
            title: module491.localization_strings_Setting_Timer_SettingPage_1,
            actions: module1368.RepeatMenuItems(),
            didSelectRow: function (n) {
              return t.frequenceDidUpdate(n);
            },
            onPressCancel: function () {
              t.hideModalView();
            },
          });
        },
      },
      {
        key: 'getCustomRepeatView',
        value: function () {
          var t = this,
            n = module1368.isCustomMode(this.state.repeatMode) ? [0, 0, 0, 0, 0, 0, 0] : this.state.repeatMode.split('');
          return React.default.createElement(module1869, {
            selectedItems: n,
            cancel: function (n) {
              return t.customFrequenceDidUpdate(n);
            },
          });
        },
      },
      {
        key: 'getCleanMethodView',
        value: function () {
          var t = this;
          return React.default.createElement(module1117.ActionSheetView, {
            title: module491.timer_setting_clean_method,
            actions: module1861.getCleanMethods(),
            didSelectRow: function (n) {
              return t._onSelectCleanMethod(n);
            },
            onPressCancel: function () {
              t.hideModalView();
            },
          });
        },
      },
      {
        key: '_getTimestampText',
        value: function () {
          return this.state.hasSetTime || this.editMode
            ? module1368.addZeroPrefix(this.state.hour) + ' : ' + module1368.addZeroPrefix(this.state.minute)
            : module491.timer_setting_no_setting;
        },
      },
      {
        key: 'hideTimerPicker',
        value: function () {
          var t = this;
          this.hideModalView(function () {
            t.setState({
              shouldShowTimePickerView: false,
            });
          });
        },
      },
      {
        key: 'didSelectTime',
        value: function (t) {
          var n = this;
          this.hideModalView(function () {
            n.setState({
              shouldShowTimePickerView: false,
              minute: t.getMinutes(),
              hour: t.getHours(),
              hasSetTime: true,
            });
            setTimeout(function () {
              n.enableConfirmButton();
            }, 200);
          });
        },
      },
      {
        key: 'showModalView',
        value: function () {
          var t = this;
          this.setState(
            {
              modalVisible: true,
            },
            function () {
              module12.Animated.spring(t.animatedWrapMarginBottom, {
                toValue: 0,
                duration: 200,
              }).start();
            }
          );
        },
      },
      {
        key: 'hideModalView',
        value: function (t) {
          var n = this;
          module12.Animated.timing(this.animatedWrapMarginBottom, {
            toValue: -500,
            duration: 200,
          }).start(function () {
            if (t) t();
            n.setState({
              modalVisible: false,
            });
          });
        },
      },
      {
        key: 'handleSelectdBlocksDidChange',
        value: function (t) {
          this.selectedSegments = t.length > 0 ? t.join(',') : '0';
          console.log('handleSelectdBlocksDidChange - ' + t);
        },
      },
      {
        key: 'hasChanged',
        value: function () {
          return (
            this.originalHour != this.state.hour ||
            this.originalMinute != this.state.minute ||
            this.originalRepeatMode != this.state.repeatMode ||
            this.originalMode != this.state.mode ||
            this.originalWaterMode != this.state.waterMode ||
            this.originalSegments != this.selectedSegments
          );
        },
      },
      {
        key: 'isRepeatTimer',
        value: function (t, n) {
          for (var o = module1368.convetToWeekendsByStartTime(this.state.repeatMode, t, n), s = 0; s < this.timerList.length; s++) {
            var l = this.timerList[s],
              u = l.startWeekdays;

            if (!this.editMode || l.hour != this.originalHour || l.minute != this.originalMinute || JSON.stringify(u) !== JSON.stringify(this.originStartWeekdays)) {
              if (l.hour == this.state.hour && l.minute == this.state.minute && this.hasSameStartWeekdays(o, u)) return true;
              if (l.repeatMode == module1368.RepeatMode.Once && l.hour == this.state.hour && l.minute == this.state.minute) return true;
            }
          }

          return false;
        },
      },
      {
        key: 'hasSameStartWeekdays',
        value: function (t, n) {
          for (var o = 0; o < t.length; o++) if (1 == t[o] && 1 == n[o]) return true;
        },
      },
      {
        key: 'onLeftButtonPress',
        value: function () {
          var t = this;
          if (this.editMode && this.hasChanged())
            this.alert.alert(module491.map_edit_save_current_action, '', [
              {
                text: module491.map_edit_no_save,
                onPress: function () {
                  t.props.navigation.goBack();
                },
              },
              {
                text: module491.map_edit_button_text_save,
                onPress: function () {
                  t.onPressConfirmButton();
                },
              },
            ]);
          else this.props.navigation.goBack();
        },
      },
      {
        key: 'mapDidChange',
        value: function (t) {
          var o,
            s = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (
                      (this.mapSelectView && this.mapSelectView.hide(),
                      (o = function () {
                        s.handleMapChange(t);
                      }),
                      !module377.RSM.isRunning || t.id == module377.RSM.currentMapId || -1 == t.id)
                    ) {
                      l.next = 9;
                      break;
                    }

                    l.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.stop());

                  case 5:
                    if (this.mapSegmentSettingView)
                      this.mapSegmentSettingView.setState({
                        shouldShowBottom: true,
                        isLoading: true,
                        needShowStopTask: false,
                      });
                    setTimeout(o, 3e3);
                    l.next = 10;
                    break;

                  case 9:
                    o();

                  case 10:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'handleMapChange',
        value: function (t, o) {
          var s, l;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (
                      ((s = t.id == module377.RSM.currentMapId),
                      o ||
                        ((this.mapSegmentSettingView.selectedSegments = '0'),
                        this.mapSegmentSettingView && this.mapSegmentSettingView.mapView && this.mapSegmentSettingView.mapView.resetSelectBlocks()),
                      (this.segmentMapId = t.id),
                      -1 == this.segmentMapId && (this.selectedSegments = '0'),
                      !s && -1 != this.segmentMapId)
                    ) {
                      u.next = 7;
                      break;
                    }

                    if (this.mapSegmentSettingView) this.mapSegmentSettingView.switchMap(t, s, o);
                    return u.abrupt('return');

                  case 7:
                    if (((u.prev = 7), module377.RSM.isRunning)) {
                      u.next = 13;
                      break;
                    }

                    u.next = 11;
                    return regeneratorRuntime.default.awrap(module407.default.loadMultiMap(this.segmentMapId));

                  case 11:
                    l = u.sent;
                    console.log('timer change map successfully ' + this.segmentMapId, l);

                  case 13:
                    if (this.mapSegmentSettingView) this.mapSegmentSettingView.switchMap(t, s, o);
                    module1231.MM.getMap(true);
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.MapSegmentsDidChange,
                    });
                    u.next = 22;
                    break;

                  case 18:
                    u.prev = 18;
                    u.t0 = u.catch(7);
                    globals.showToast(module491.robot_communication_exception);
                    console.log('timer change map ' + this.segmentMapId + ' error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                  case 22:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[7, 18]],
            Promise
          );
        },
      },
      {
        key: 'getFanPower',
        value: function () {
          return 105 == module377.RSM.fanPower || undefined == module377.RSM.waterBoxMode ? 102 : module377.RSM.fanPower;
        },
      },
      {
        key: 'getWaterBoxMode',
        value: function () {
          return 200 == module377.RSM.waterBoxMode || undefined == module377.RSM.waterBoxMode ? 202 : module377.RSM.waterBoxMode;
        },
      },
      {
        key: 'getMopMode',
        value: function () {
          return undefined == module377.RSM.mopMode ? 300 : module377.RSM.mopMode;
        },
      },
      {
        key: 'onPressQuestion',
        value: function () {
          if (this.newSwitchGuideView) this.newSwitchGuideView.show();
        },
      },
      {
        key: '_onPressCustomModeButton',
        value: function () {
          if (this.newSwitchGuideView) this.newSwitchGuideView.dismissModalView();
          if (this.customModeView) this.customModeView.hide();
          this.props.navigation.navigate('MapEditZoneModePage', {
            action: 'custom',
            title: module491.map_edit_bottom_menu_mode,
          });
        },
      },
      {
        key: 'enableConfirmButton',
        value: function () {
          if (module415.DMM.isGarnet)
            (this.state.currentCleanMethod != module1861.CleanMethodNoSet && this.state.hasSetTime) || this.editMode
              ? this.confirmButton.setEnabled(true)
              : this.confirmButton.setEnabled(false);
          else this.confirmButton.setEnabled(true);
        },
      },
    ]);
    return J;
  })(React.default.Component);

exports.default = Z;
Z.contextType = module506.AppConfigContext;
var K = module12.StyleSheet.create({
  containterView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  },
  container: {
    width: module12.Dimensions.get('window').width,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginTop: module936.NavigationBarHeight,
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuItem: {},
  modal: {
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: module936.AppBorderRadius,
  },
  upperView: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
  },
  datePicker: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  deleteButton: {
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'red',
    borderWidth: 1,
    alignSelf: 'stretch',
    height: 60,
    borderRadius: 4,
  },
  rowContainer: {
    flexDirection: 'column',
    height: 54,
    marginLeft: 22,
    marginRight: 22,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  mapSegmentSettingView: {
    alignSelf: 'stretch',
    marginTop: 15,
    borderRadius: 4,
    overflow: 'hidden',
  },
  confirmButton: {
    marginLeft: 14,
    marginRight: 14,
  },
  timerOutView: {
    position: 'absolute',
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
  },
  section: {
    paddingVertical: 7,
  },
});

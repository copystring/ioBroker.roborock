require('./392');

var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1976 = require('./1976'),
  module385 = require('./385'),
  module1508 = require('./1508'),
  module416 = require('./416'),
  module381 = require('./381'),
  module391 = require('./391'),
  module1641 = require('./1641'),
  module394 = require('./394'),
  module390 = require('./390'),
  module382 = require('./382'),
  module415 = require('./415'),
  module1977 = require('./1977'),
  module1124 = require('./1124'),
  module420 = require('./420'),
  module1978 = require('./1978'),
  module1346 = require('./1346'),
  module424 = require('./424'),
  module1199 = require('./1199'),
  module1625 = require('./1625'),
  module1216 = require('./1216'),
  module1624 = require('./1624');

function F(t, n) {
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

function j(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      F(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      F(Object(o)).forEach(function (n) {
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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module510 = require('./510').strings,
  module393 = require('./393'),
  module1979 = require('./1979'),
  module1643 = require('./1643'),
  module1343 = require('./1343'),
  module1644 = require('./1644'),
  Z = (function (t) {
    module9.default(Z, t);

    var module50 = Z,
      module1199 = A(),
      F = function () {
        var t,
          n = module12.default(module50);

        if (module1199) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function Z(t) {
      var n;
      module6.default(this, Z);
      n = F.call(this, t);
      var o = t.navigation.state.params || {};
      n.selectedSegments = (!!o && o.segments) || '0';
      n.selectedSegments = n.selectedSegments.replace('ok', '0');
      n.segmentMapId = o && (o.mapId || 0 == o.mapId) ? o.mapId : -1;
      n.originalSegments = n.selectedSegments;
      console.log('selectedSegments - ' + n.selectedSegments);
      var s = new Date();
      n.timerId = o.timerId || '';
      n.date = o.date || '';
      n.FCCState = o.FCCState || 0;
      n.miTimerScene = o.miTimerScene;
      n.editMode = o.editMode || false;
      n.originalHour = o.hour;
      n.originalMinute = o.minute;
      n.originalRepeatMode = o.repeatMode || module1644.RepeatMode.Once;
      n.originalMode = o.mode || n.getFanPower();
      n.originalWaterMode = o.waterMode || n.getWaterBoxMode();
      n.originStartWeekdays = o.startWeekdays || [];
      n.state = {
        name: o.name || '' + s.getTime(),
        minute: undefined == o.minute ? s.getMinutes() : o.minute,
        hour: undefined == o.hour ? s.getHours() : o.hour,
        repeatMode: o.repeatMode || module1644.RepeatMode.Once,
        mode: o.mode || n.getFanPower(),
        waterMode: o.waterMode || n.getWaterBoxMode(),
        currentCleanOrderIndex: o.cleanOrder || 0,
        modalVisible: false,
        shouldShowFrequenceView: false,
        shouldShowFrequenceCustomView: false,
        shouldShowTimePickerView: false,
        shouldShowMapSegmentView:
          module390.default.isMapSegmentSupported() &&
          module381.RobotStatusManager.sharedManager().mapStatus == module381.MapStatus.Has_WithSegments &&
          !module381.RSM.multiFloorEnabled,
        shouldShowMultiMapSegmentView: module390.default.isMultiMapSegmentTimerSupported(),
        hasSetTime: n.editMode,
        scrollEnabled: true,
        mopMode: o.mopMode || n.getMopMode(),
        mopModeName: n.editMode ? o.mopModeName : '',
        mopModeId: n.editMode ? o.mopModeId : -1,
        currentCleanMethod: undefined == o.cleanMethod ? module1625.CleanMethodMop : o.cleanMethod,
        shouldShowCleanMethodView: false,
        shouldShowCustomSwitch: !module424.DMM.isGarent,
      };
      n.timerList = o.timerList || [];
      n.animatedWrapMarginBottom = new module13.Animated.Value(-500);
      return n;
    }

    module7.default(Z, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.renderNavRightButton();
          module415.MM.shouldForceStart = true;
          module415.MM.start();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module415.MM.shouldForceStart = false;
          module415.MM.stop();
        },
      },
      {
        key: 'renderNavRightButton',
        value: function () {
          var t = this,
            n = React.default.createElement(module385.PureImageButton, {
              funcId: 'timer_confirm_button',
              accessibilityLabel: module510.localization_strings_Main_Error_ErrorDetailPage_3,
              ref: function (n) {
                t.confirmButton = n;
              },
              style: K.confirmButton,
              image: this.context.theme.timerSetting.confirmButton,
              onPress: this.onPressConfirmButton.bind(this),
              imageWidth: 40,
              imageHeight: 40,
              enabled: true,
              imageStyle: {
                resizeMode: 'contain',
                width: 24,
                height: 24,
              },
            });
          this.props.navigation.setParams({
            title: module510.localization_strings_Setting_Timer_SettingPage_16,
            rightItems: [n],
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            onPressLeft: this.onLeftButtonPress.bind(this),
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
          });
          var t = module415.MM.getMapConfigById(this.segmentMapId) || {
            name: module510.timer_setting_map_select_any_map,
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
            if (module382.isModeCustomized(t.state.mode, t.state.waterMode) && t.mapSegmentSettingView) t.mapSegmentSettingView.setCustomMode(true);
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
          if (this.state.currentCleanMethod == module1625.CleanMethodClean && 301 == o) o = 300;
          if (module390.default.isShakeMopSetSupported()) {
            if (this.customModeView) this.customModeView.show(t, n, module424.DMM.isGarnet ? this.state.mopModeId : o);
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
          module382.isModeCustomized(o, s, l);
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
                repeatMode: module1644.IndexRepeatMap[t],
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
            mopMode: module424.DMM.isGarnet ? null : u,
            mopModeId: module424.DMM.isGarnet ? (null == o ? undefined : o.id) : null,
            mopModeName: module424.DMM.isGarnet ? (null == o ? undefined : o.name) : null,
          });
          var h = module382.isModeCustomized(s, l, u);
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
            n.setState(j({}, o));
          });
        },
      },
      {
        key: 'onPressConfirmButton',
        value: function () {
          var t = this;

          if (this.state.hasSetTime) {
            var n = module1644.timerRepeatToCronRepeat(this.state.repeatMode),
              s = -1,
              l = -1;

            if (this.state.repeatMode == module1644.RepeatMode.Once) {
              var u = new Date(),
                h = u.getHours() == this.state.hour && u.getMinutes() == this.state.minute,
                c = module1641.default();

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

            if (this.isRepeatTimer(l, s)) globals.showToast(module510.set_timer_dup);
            else if (this.mapSegmentSettingView && this.mapSegmentSettingView.state.isLoading) globals.showToast(module510.map_loading_view_tip);
            else {
              if ('0' == this.selectedSegments && this.mapSegmentSettingView && this.mapSegmentSettingView.state.shouldShowBottom) {
                if (!module390.default.isMultiMapSegmentTimerSupported()) return void globals.showToast(module510.timer_setting_select_zone_tip);
                var f = this.mapSegmentSettingView && this.mapSegmentSettingView.mapView && this.mapSegmentSettingView.mapView.getExistingBlocks();
                if (f && f.length) this.selectedSegments = f.join(',');
                console.log('segments', this.selectedSegments);
              }

              this.confirmButton.setEnabled(false);
              var M = module1643.ConvertToCronStr(this.state.hour, this.state.minute, n, l, s);

              if (module393.isMiApp && 1 == this.FCCState) {
                var S = module1644.convertToBeijingTime(this.state.minute, this.state.hour, l, s),
                  w = this.state.repeatMode;

                if (this.state.repeatMode != module1644.RepeatMode.Once && this.state.repeatMode != module1644.RepeatMode.Everyday) {
                  var _ = new Date();

                  if (S.month == _.getMonth() + 1)
                    S.day == _.getDate() + 1
                      ? (w = module1644.getDaysArrByOffset(this.state.repeatMode, 1))
                      : S.day == _.getDate() - 1 && (w = module1644.getDaysArrByOffset(this.state.repeatMode, -1));
                  else w = 1 == S.day ? module1644.getDaysArrByOffset(this.state.repeatMode, 1) : module1644.getDaysArrByOffset(this.state.repeatMode, -1);
                }

                n = module1644.timerRepeatToCronRepeat(w);
                M = module1643.ConvertToCronStr(S.hour, S.minute, n, S.day, S.month);
              }

              console.log('make cron - ' + n + ' day - ' + JSON.stringify(l) + ' month - ' + JSON.stringify(s));
              var C = [this.state.name, [M, this.getOldLogicPara()]],
                b = [this.state.name, [M, ['start_clean', this.getNewLogicPara()]]],
                T = module381.RobotStatusManager.sharedManager().isSupportOrderSegmentClean() ? b : C;
              console.log('cronString - ' + JSON.stringify(M) + ' param - ' + JSON.stringify(T));

              var P = function () {
                if (0 == t.FCCState) t.setTimerOnRobot(T);
                else t.setTimerOnServer(C, M, l, s);
                if (t.loadingView) t.loadingView.showWithText();
              };

              if (module390.default.isMultiMapSegmentTimerSupported() && module381.RSM.isRunning && this.segmentMapId != module381.RSM.currentMapId && -1 != this.segmentMapId) {
                if (this.alert)
                  this.alert.customAlert(
                    '',
                    module510.set_multi_map_timer_different_map_save_tip,
                    function () {
                      return regeneratorRuntime.default.async(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                t.next = 2;
                                return regeneratorRuntime.default.awrap(module416.default.stop());

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
          } else globals.showToast(module510.set_timer_without_time_tip);
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
          if (module424.DMM.isGarnet)
            t = j(
              j({}, t),
              {},
              {
                mop_template_id: this.state.mopModeId,
              }
            );
          if (module390.default.isMultiMapSegmentTimerSupported())
            t = j(
              j({}, t),
              {},
              {
                map_index: this.segmentMapId,
              }
            );
          if (module390.default.isShakeMopSetSupported())
            t = j(
              j({}, t),
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
          if (module390.default.isMultiMapSegmentTimerSupported()) t = [].concat(module31.default(t), [this.segmentMapId]);
          return t;
        },
      },
      {
        key: 'setTimerOnRobot',
        value: function (t) {
          var n, s;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.setTimer(t));

                  case 3:
                    n = l.sent;
                    console.log('setTimerOnRobot -- ' + JSON.stringify(t) + ' -- ' + JSON.stringify(n));
                    this.setTimerSuccess();
                    l.next = 15;
                    break;

                  case 8:
                    l.prev = 8;
                    l.t0 = l.catch(0);
                    s = 'setTimerOnRobot  error: ' + JSON.stringify(l.t0) + ',param --' + JSON.stringify(t);
                    globals.showToast(module510.robot_communication_exception);
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
        value: function (t, n, s, l) {
          var u, h, c, p, f, M, S, w, _, C, module1641, module394, module382, module415, module1977, module1124;

          return regeneratorRuntime.default.async(
            function (R) {
              for (;;)
                switch ((R.prev = R.next)) {
                  case 0:
                    R.prev = 0;
                    R.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.setServerTimer(t));

                  case 3:
                    if (
                      ((u = R.sent),
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
                      module390.default.isMultiMapSegmentTimerSupported() &&
                        (c = j(
                          j({}, c),
                          {},
                          {
                            map_index: this.segmentMapId,
                          }
                        )),
                      module424.DMM.isGarnet &&
                        (c = j(
                          j({}, c),
                          {},
                          {
                            mop_template_id: this.state.mopModeId,
                          }
                        )),
                      module390.default.isShakeMopSetSupported() &&
                        (c = j(
                          j({}, c),
                          {},
                          {
                            mop_mode: parseInt(this.state.mopMode) || 0,
                          }
                        )),
                      (p = [c]),
                      (f = [this.state.name, this.state.mode, h]),
                      (M = module381.RobotStatusManager.sharedManager().isSupportOrderSegmentClean() ? p : f),
                      !module393.isMiApp)
                    ) {
                      R.next = 31;
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
                        on_time: n,
                      }),
                      (w = {
                        name: this.state.name,
                        setting: S,
                      }),
                      (_ = null),
                      (C = !this.miTimerScene),
                      console.log('miTimerScene', typeof this.miTimerScene),
                      !C)
                    ) {
                      R.next = 25;
                      break;
                    }

                    R.next = 22;
                    return regeneratorRuntime.default.awrap(module393.miAddTimer(w));

                  case 22:
                    _ = R.sent;
                    R.next = 28;
                    break;

                  case 25:
                    R.next = 27;
                    return regeneratorRuntime.default.awrap(this.miTimerScene.save(w));

                  case 27:
                    _ = R.sent;

                  case 28:
                    console.log('miTimer ' + (C ? 'add' : 'edit') + ' - ' + JSON.stringify(_));
                    R.next = 41;
                    break;

                  case 31:
                    module1641 = {
                      id: 1,
                      method: 'server_scheduled_start',
                      params: M,
                    };
                    module394 = module1644.convertToTargetTime(this.state.minute, this.state.hour, s, l, module393.robotTimeZone);
                    module382 = module394.hour + ':' + module1644.addZeroPrefix(module394.minute);
                    module415 = module1644.getLoopStringOfRepeatMode(this.state.repeatMode);
                    module1977 = new Date();
                    module1124 = module1644.resolveRepeatModeByTargetTime(module415, module1977.getMonth() + 1, module1977.getDate(), module394.month, module394.day);
                    console.log('loops -- time - ' + module382 + ' - loop -' + module1124 + ' -repeat-' + this.state.repeatMode + ' - timerId- ' + this.timerId);
                    R.next = 40;
                    return regeneratorRuntime.default.awrap(module393.rrAddOrEditTimer(module382, module1124, module1641, this.timerId));

                  case 40:
                    R.sent;

                  case 41:
                    this.setTimerSuccess();
                    R.next = 50;
                    break;

                  case 44:
                    R.prev = 44;
                    R.t0 = R.catch(0);
                    this.enableConfirmButton();
                    if (this.loadingView) this.loadingView.hide();
                    globals.showToast(module510.robot_communication_exception);
                    console.log('setTimerOnServer error: ' + ('object' == typeof R.t0 ? JSON.stringify(R.t0) : R.t0));

                  case 50:
                  case 'end':
                    return R.stop();
                }
            },
            null,
            this,
            [[0, 44]],
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
            module13.Animated.View,
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
                  module13.TouchableWithoutFeedback,
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
                    module13.Animated.View,
                    {
                      style: [
                        K.modal,
                        {
                          opacity: this.animatedWrapMarginBottom.interpolate({
                            inputRange: [-500, 0],
                            outputRange: [0, 1],
                          }),
                          height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                        },
                      ],
                    },
                    o
                  )
                ),
            c = this.getCleanModeDetailText();
          return React.default.createElement(
            module13.View,
            {
              style: [
                K.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(module1978.default, {
              ref: function (n) {
                return (t.fillTopView = n);
              },
            }),
            React.default.createElement(
              module13.ScrollView,
              {
                style: [
                  K.container,
                  {
                    width: module13.Dimensions.get('window').width,
                  },
                ],
                scrollEnabled: this.state.scrollEnabled,
              },
              React.default.createElement(
                module1216.default,
                {
                  transparent: true,
                  visible: this.state.modalVisible,
                  onRequestClose: function () {
                    t.hideModalView();
                  },
                },
                h
              ),
              React.default.createElement(module13.View, {
                style: K.section,
              }),
              React.default.createElement(
                module13.View,
                {
                  style: {
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginHorizontal: 15,
                  },
                },
                React.default.createElement(module385.SettingListItemView, {
                  funcId: 'timer_setting_start_time',
                  title: module510.localization_strings_Setting_DoNotDisturbPage_0,
                  bottomDetail: this._getTimestampText(),
                  onPress: this.showTimePicker.bind(this),
                  style: K.menuItem,
                  titleColor: 'rgba(0,0,0,0.8)',
                  shouldShowTopLongLine: false,
                }),
                React.default.createElement(module385.SettingListItemView, {
                  funcId: 'timer_setting_repeat_mode',
                  title: module510.localization_strings_Setting_Timer_SettingPage_1,
                  bottomDetail: module1644.getTextOfRepeatMode(this.state.repeatMode, this.date),
                  bottomDetailWidth: module13.Dimensions.get('window').width - 60,
                  onPress: this.showRepeatDialog.bind(this),
                  style: K.menuItem,
                  titleColor: 'rgba(0,0,0,0.8)',
                }),
                module424.DMM.isGarnet &&
                  React.default.createElement(module385.SettingListItemView, {
                    funcId: 'timer_setting_clean_method',
                    title: module510.timer_setting_clean_method,
                    bottomDetail: this.getCleanModeBottomText(),
                    shouldShowBottomLine: true,
                    shouldShowBottomLongLine: true,
                    onPress: this.showCleanMethodDialog.bind(this),
                    style: K.menuItem,
                    titleColor: 'rgba(0,0,0,0.8)',
                  }),
                React.default.createElement(module385.SettingListItemView, {
                  funcId: 'timer_setting_clean_mode',
                  title: module510.smart_scene_clean_mode_setting_item_title,
                  bottomDetail: c,
                  shouldShowBottomLine: false,
                  shouldShowBottomLongLine: false,
                  onPress: this.showCustomModeDialog.bind(this),
                  style: K.menuItem,
                  titleColor: 'rgba(0,0,0,0.8)',
                })
              ),
              l &&
                !u &&
                React.default.createElement(module1976.default, {
                  style: K.mapSegmentSettingView,
                  ref: function (n) {
                    t.mapSegmentSettingView = n;
                  },
                  selectedSegments: this.selectedSegments,
                  selectedBlocksDidChange: this.handleSelectdBlocksDidChange.bind(this),
                  isCustomMode: module382.isModeCustomized(this.state.mode, this.state.waterMode),
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
                module381.RSM.mapSaveEnabled &&
                module381.RSM.mapStatus == module381.MapStatus.Has_WithSegments &&
                React.default.createElement(module1977.default, {
                  style: K.mapSegmentSettingView,
                  ref: function (n) {
                    t.mapSegmentSettingView = n;
                  },
                  isGlobalTab: '0' == this.selectedSegments,
                  selectedSegments: this.selectedSegments,
                  selectedBlocksDidChange: this.handleSelectdBlocksDidChange.bind(this),
                  stopTaskSwitchMap: function (n) {
                    return t.handleMapChange(n);
                  },
                  showMapSelectView: function () {
                    return t.mapSelectView.show();
                  },
                  isCustomMode: module382.isModeCustomized(this.state.mode, this.state.waterMode),
                  switchToSelectAreaMode: function () {
                    var n = module415.MM.getMapConfigById(-1 != t.segmentMapId ? t.segmentMapId : module381.RSM.currentMapId);
                    t.handleMapChange(n);
                  },
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
              1 == this.FCCState &&
                React.default.createElement(
                  module13.Text,
                  {
                    style: {
                      paddingTop: 10,
                      paddingBottom: 20,
                      color: this.context.theme.timerSetting.segmentSettingViewTextColor,
                      alignSelf: 'center',
                      paddingHorizontal: 20,
                    },
                  },
                  module510.timer_list_server_timer_tip
                ),
              React.default.createElement(module1124.MultiMapSelectView, {
                didSelectMap: this.mapDidChange.bind(this),
                ref: function (n) {
                  return (t.mapSelectView = n);
                },
              }),
              React.default.createElement(module385.AlertView, {
                ref: function (n) {
                  return (t.alert = n);
                },
              })
            ),
            React.default.createElement(module382.ModeSettingPanel, {
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
                  title: module510.custom_mode_panel_more_mode_title,
                });
              },
            }),
            React.default.createElement(module1346.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              parent: this,
              bgImage: module390.default.isSupportWaterMode() ? n.guideImages.mode : n.guideImages.modeWithoutWater,
              topTitle: module510.tanos_custom_mode_title,
              context: module510.tanos_custom_mode_des_info,
              hintText: module510.map_edit_guide_wall_tip_line2,
              buttonInfo: [module510.localization_strings_Main_MainPage_11, module510.button_go_setting],
              buttonFuncId: ['timer_setting_guide_left', 'timer_setting_guide_right'],
              onPressGoSetting: function () {
                return t._onPressCustomModeButton();
              },
            }),
            React.default.createElement(module385.CancelableLoadingView, {
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
          return this.state.currentCleanMethod == module1625.CleanMethodNoSet ? module510.timer_setting_no_setting : module1625.getCleanMethods()[this.state.currentCleanMethod];
        },
      },
      {
        key: 'getCleanModeDetailText',
        value: function () {
          this.state.currentCleanMethod;
          if (module382.isModeCustomized(this.state.mode, this.state.waterMode, this.state.mopMode)) return module510.map_edit_bottom_menu_mode;
          var t = module382.getCleanModeTitle(this.state.mode),
            n = module382.getMopWaterOrStrengthTitle(this.state.waterMode),
            o = t + (n ? ' | ' + n : '');

          if (module390.default.isPureCleanMopSupported()) {
            var s = module382.getMopMethodTitle(this.state.mopMode);
            if (this.state.mode == module1624.CleanModeZero) return n + ' | ' + s;
            if (this.state.waterMode == module1624.WaterModeZero) return t;
          }

          if (module390.default.isShakeMopSetSupported() && 200 != this.state.waterMode) {
            var l = module382.getMopMethodTitle(this.state.mopMode);
            if (301 == this.state.mopMode) return n + ' | ' + l;
          }

          return o;
        },
      },
      {
        key: 'getTimerPickerView',
        value: function () {
          var t = this,
            n = new Date();
          n.setHours(this.state.hour);
          n.setMinutes(this.state.minute);
          var o = {
            opacity: this.animatedWrapMarginBottom.interpolate({
              inputRange: [-500, 0],
              outputRange: [0, 1],
            }),
            height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
          };
          return React.default.createElement(
            module13.Animated.View,
            {
              style: [K.modal, o],
            },
            React.default.createElement(
              module13.TouchableWithoutFeedback,
              {
                onPress: function () {
                  t.hideTimerPicker();
                },
              },
              React.default.createElement(module13.View, {
                style: K.timerOutView,
              })
            ),
            React.default.createElement(
              module13.Animated.View,
              {
                style: [
                  K.pickerView,
                  {
                    bottom: this.animatedWrapMarginBottom,
                  },
                ],
              },
              React.default.createElement(module385.CustomDatePicker, {
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
            n = module1644.RepeatIndexMap[this.state.repeatMode];
          if (undefined == n) n = 4;
          return React.default.createElement(
            module13.View,
            {
              style: {
                paddingBottom: module1343.AppBarMarginBottom,
              },
            },
            React.default.createElement(module1508.ActionSheetView, {
              title: module510.localization_strings_Setting_Timer_SettingPage_1,
              actions: module1644.RepeatMenuItems(),
              didSelectRow: function (n) {
                return t.frequenceDidUpdate(n);
              },
              onPressCancel: function () {
                t.hideModalView();
              },
            })
          );
        },
      },
      {
        key: 'getCustomRepeatView',
        value: function () {
          var t = this,
            n = module1644.isCustomMode(this.state.repeatMode) ? [0, 0, 0, 0, 0, 0, 0] : this.state.repeatMode.split('');
          return React.default.createElement(module1979, {
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
          return React.default.createElement(module1508.ActionSheetView, {
            title: module510.timer_setting_clean_method,
            actions: module1625.getCleanMethods(),
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
            ? module1644.addZeroPrefix(this.state.hour) + ' : ' + module1644.addZeroPrefix(this.state.minute)
            : module510.timer_setting_no_setting;
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
              module13.Animated.spring(t.animatedWrapMarginBottom, {
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
          module13.Animated.timing(this.animatedWrapMarginBottom, {
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
          for (var o = module1644.convetToWeekendsByStartTime(this.state.repeatMode, t, n), s = 0; s < this.timerList.length; s++) {
            var l = this.timerList[s],
              u = l.startWeekdays;

            if (!this.editMode || l.hour != this.originalHour || l.minute != this.originalMinute || JSON.stringify(u) !== JSON.stringify(this.originStartWeekdays)) {
              if (l.hour == this.state.hour && l.minute == this.state.minute && this.hasSameStartWeekdays(o, u)) return true;
              if (l.repeatMode == module1644.RepeatMode.Once && l.hour == this.state.hour && l.minute == this.state.minute) return true;
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
            this.alert.alert(module510.map_edit_save_current_action, '', [
              {
                text: module510.map_edit_no_save,
                onPress: function () {
                  t.props.navigation.goBack();
                },
              },
              {
                text: module510.map_edit_button_text_save,
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
          var n,
            s = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (
                      (this.mapSelectView && this.mapSelectView.hide(),
                      (n = function () {
                        s.handleMapChange(t);
                      }),
                      !module381.RSM.isRunning || t.id == module381.RSM.currentMapId || -1 == t.id)
                    ) {
                      l.next = 9;
                      break;
                    }

                    l.next = 5;
                    return regeneratorRuntime.default.awrap(module416.default.stop());

                  case 5:
                    if (this.mapSegmentSettingView)
                      this.mapSegmentSettingView.setState({
                        shouldShowBottom: true,
                        isLoading: true,
                        needShowStopTask: false,
                      });
                    setTimeout(n, 3e3);
                    l.next = 10;
                    break;

                  case 9:
                    n();

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
        value: function (t, n) {
          var s, l;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (
                      ((s = t.id == module381.RSM.currentMapId),
                      n ||
                        ((this.mapSegmentSettingView.selectedSegments = '0'),
                        this.mapSegmentSettingView && this.mapSegmentSettingView.mapView && this.mapSegmentSettingView.mapView.resetSelectBlocks()),
                      (this.segmentMapId = t.id),
                      -1 == this.segmentMapId && (this.selectedSegments = '0'),
                      !s && -1 != this.segmentMapId)
                    ) {
                      u.next = 7;
                      break;
                    }

                    if (this.mapSegmentSettingView) this.mapSegmentSettingView.switchMap(t, s, n);
                    return u.abrupt('return');

                  case 7:
                    if (((u.prev = 7), this.mapSegmentSettingView && this.mapSegmentSettingView.switchMap(t, s, n), module381.RSM.isRunning)) {
                      u.next = 14;
                      break;
                    }

                    u.next = 12;
                    return regeneratorRuntime.default.awrap(module416.default.loadMultiMap(this.segmentMapId));

                  case 12:
                    l = u.sent;
                    console.log('timer change map successfully ' + this.segmentMapId, l);

                  case 14:
                    module415.MM.getMap(true);
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module420.EventKeys.MapSegmentsDidChange,
                    });
                    u.next = 22;
                    break;

                  case 18:
                    u.prev = 18;
                    u.t0 = u.catch(7);
                    globals.showToast(module510.robot_communication_exception);
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
          return module390.default.isPureCleanMopSupported() ? module381.RSM.fanPower || 102 : 105 == module381.RSM.fanPower ? 102 : module381.RSM.fanPower;
        },
      },
      {
        key: 'getWaterBoxMode',
        value: function () {
          return module381.RSM.waterBoxMode || 202;
        },
      },
      {
        key: 'getMopMode',
        value: function () {
          var t = module381.RSM.mopMode || 300;
          if (t == module1624.CleanRouteFastMode) t = module1624.CleanRouteDailyMode;
          return t;
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
            title: module510.map_edit_bottom_menu_mode,
          });
        },
      },
      {
        key: 'enableConfirmButton',
        value: function () {
          if (module424.DMM.isGarnet)
            this.state.currentCleanMethod != module1625.CleanMethodNoSet || this.editMode ? this.confirmButton.setEnabled(true) : this.confirmButton.setEnabled(false);
          else this.confirmButton.setEnabled(true);
        },
      },
    ]);
    return Z;
  })(React.default.Component);

exports.default = Z;
Z.contextType = module1199.AppConfigContext;
var K = module13.StyleSheet.create({
  containterView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginTop: module1343.NavigationBarHeight,
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuItem: {},
  modal: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: module1343.AppBorderRadius,
    alignItems: 'stretch',
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
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  confirmButton: {
    marginLeft: 14,
    marginRight: 14,
  },
  timerOutView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  section: {
    paddingVertical: 7,
  },
  pickerView: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 99999,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    overflow: 'hidden',
  },
});

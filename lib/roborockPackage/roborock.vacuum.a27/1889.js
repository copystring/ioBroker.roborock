require('./392');

var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1890 = require('./1890'),
  module385 = require('./385'),
  module1429 = require('./1429'),
  module415 = require('./415'),
  module381 = require('./381'),
  module391 = require('./391'),
  module1562 = require('./1562'),
  module394 = require('./394'),
  module390 = require('./390'),
  module382 = require('./382'),
  module414 = require('./414'),
  module1891 = require('./1891'),
  module1055 = require('./1055'),
  module419 = require('./419'),
  module1892 = require('./1892'),
  module1268 = require('./1268'),
  module423 = require('./423'),
  module1121 = require('./1121'),
  module1544 = require('./1544'),
  module1138 = require('./1138'),
  module1545 = require('./1545'),
  module1543 = require('./1543');

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

function A(t) {
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

function H() {
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
  module393 = require('./393'),
  module1893 = require('./1893'),
  module1564 = require('./1564'),
  module1265 = require('./1265'),
  module1565 = require('./1565'),
  K = (function (t) {
    module7.default(K, t);

    var module50 = K,
      module1121 = H(),
      F = function () {
        var t,
          n = module11.default(module50);

        if (module1121) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function K(t) {
      var n, o, s;
      module4.default(this, K);
      s = F.call(this, t);
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
      s.originalRepeatMode = u.repeatMode || module1565.RepeatMode.Once;
      s.originalMode = u.mode || s.getFanPower();
      s.originalWaterMode = u.waterMode || s.getWaterBoxMode();
      s.originStartWeekdays = u.startWeekdays || [];
      s.state = {
        name: u.name || '' + h.getTime(),
        minute: undefined == u.minute ? h.getMinutes() : u.minute,
        hour: undefined == u.hour ? h.getHours() : u.hour,
        repeatMode: u.repeatMode || module1565.RepeatMode.Once,
        mode: u.mode || s.getFanPower(),
        waterMode: u.waterMode || s.getWaterBoxMode(),
        currentCleanOrderIndex: u.cleanOrder || 0,
        modalVisible: false,
        shouldShowFrequenceView: false,
        shouldShowFrequenceCustomView: false,
        shouldShowTimePickerView: false,
        shouldShowMapSegmentView:
          module390.default.isMapSegmentSupported() &&
          module381.RobotStatusManager.sharedManager().mapStatus == module381.MapStatus.Has_WithSegments &&
          !module381.RSM.multiFloorEnabled,
        shouldShowMultiMapSegmentView: module390.default.isMultiMapSegmentTimerSupported(),
        hasSetTime: s.editMode,
        scrollEnabled: true,
        mopMode: u.mopMode || s.getMopMode(),
        mopModeName: s.editMode ? u.mopModeName : null == (n = module1545.ModeDataInstance.modePannelCustomMops[0]) ? undefined : n.name,
        mopModeId: s.editMode ? u.mopModeId : null == (o = module1545.ModeDataInstance.modePannelCustomMops[0]) ? undefined : o.id,
        currentCleanMethod: undefined == u.cleanMethod ? module1544.CleanMethodMop : u.cleanMethod,
        shouldShowCleanMethodView: false,
        shouldShowCustomSwitch: !module423.DMM.isGarent,
      };
      s.timerList = u.timerList || [];
      s.animatedWrapMarginBottom = new module12.Animated.Value(-500);
      return s;
    }

    module5.default(K, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.renderNavRightButton();
          module414.MM.shouldForceStart = true;
          module414.MM.start();

          this.modeChangeHandler = function () {
            var n, o;
            if (
              !(
                -1 !=
                module1545.ModeDataInstance.modePannelCustomMops.findIndex(function (n) {
                  return n.id == t.setState.mopModeId;
                })
              )
            )
              t.setState({
                mopModeId: null == (n = module1545.ModeDataInstance.modePannelCustomMops[0]) ? undefined : n.id,
                mopModeName: null == (o = module1545.ModeDataInstance.modePannelCustomMops[0]) ? undefined : o.name,
              });
          };

          module1545.ModeDataInstance.addChangeListener(this.modeChangeHandler);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          module414.MM.shouldForceStart = false;
          module414.MM.stop();
          module1545.ModeDataInstance.removeChangeListener(this.modeChangeHandler);
        },
      },
      {
        key: 'renderNavRightButton',
        value: function () {
          var t = this,
            n = React.default.createElement(module385.PureImageButton, {
              funcId: 'timer_confirm_button',
              accessibilityLabel: module505.localization_strings_Main_Error_ErrorDetailPage_3,
              ref: function (n) {
                t.confirmButton = n;
              },
              style: Q.confirmButton,
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
            title: module505.localization_strings_Setting_Timer_SettingPage_16,
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
          var t = module414.MM.getMapConfigById(this.segmentMapId) || {
            name: module505.timer_setting_map_select_any_map,
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
          if (this.state.currentCleanMethod == module1544.CleanMethodClean && 301 == o) o = 300;
          if (module390.default.isShakeMopSetSupported()) {
            if (this.customModeView) this.customModeView.show(t, n, module423.DMM.isGarnet ? this.state.mopModeId : o);
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
                repeatMode: module1565.IndexRepeatMap[t],
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
            mopMode: module423.DMM.isGarnet ? null : u,
            mopModeId: module423.DMM.isGarnet ? (null == o ? undefined : o.id) : null,
            mopModeName: module423.DMM.isGarnet ? (null == o ? undefined : o.name) : null,
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
            n.setState(A({}, o));
          });
        },
      },
      {
        key: 'onPressConfirmButton',
        value: function () {
          var t = this;

          if (this.state.hasSetTime) {
            var n = module1565.timerRepeatToCronRepeat(this.state.repeatMode),
              s = -1,
              l = -1;

            if (this.state.repeatMode == module1565.RepeatMode.Once) {
              var u = new Date(),
                h = u.getHours() == this.state.hour && u.getMinutes() == this.state.minute,
                c = module1562.default();

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

            if (this.isRepeatTimer(l, s)) globals.showToast(module505.set_timer_dup);
            else if (this.mapSegmentSettingView && this.mapSegmentSettingView.state.isLoading) globals.showToast(module505.map_loading_view_tip);
            else {
              if ('0' == this.selectedSegments && this.mapSegmentSettingView && this.mapSegmentSettingView.state.shouldShowBottom) {
                if (!module390.default.isMultiMapSegmentTimerSupported()) return void globals.showToast(module505.timer_setting_select_zone_tip);
                var f = this.mapSegmentSettingView && this.mapSegmentSettingView.mapView && this.mapSegmentSettingView.mapView.getExistingBlocks();
                if (f && f.length) this.selectedSegments = f.join(',');
                console.log('segments', this.selectedSegments);
              }

              this.confirmButton.setEnabled(false);
              var M = module1564.ConvertToCronStr(this.state.hour, this.state.minute, n, l, s);

              if (module393.isMiApp && 1 == this.FCCState) {
                var S = module1565.convertToBeijingTime(this.state.minute, this.state.hour, l, s),
                  w = this.state.repeatMode;

                if (this.state.repeatMode != module1565.RepeatMode.Once && this.state.repeatMode != module1565.RepeatMode.Everyday) {
                  var _ = new Date();

                  if (S.month == _.getMonth() + 1)
                    S.day == _.getDate() + 1
                      ? (w = module1565.getDaysArrByOffset(this.state.repeatMode, 1))
                      : S.day == _.getDate() - 1 && (w = module1565.getDaysArrByOffset(this.state.repeatMode, -1));
                  else w = 1 == S.day ? module1565.getDaysArrByOffset(this.state.repeatMode, 1) : module1565.getDaysArrByOffset(this.state.repeatMode, -1);
                }

                n = module1565.timerRepeatToCronRepeat(w);
                M = module1564.ConvertToCronStr(S.hour, S.minute, n, S.day, S.month);
              }

              console.log('make cron - ' + n + ' day - ' + JSON.stringify(l) + ' month - ' + JSON.stringify(s));
              var y = [this.state.name, [M, this.getOldLogicPara()]],
                b = [this.state.name, [M, ['start_clean', this.getNewLogicPara()]]],
                T = module381.RobotStatusManager.sharedManager().isSupportOrderSegmentClean() ? b : y;
              console.log('cronString - ' + JSON.stringify(M) + ' param - ' + JSON.stringify(T));

              var P = function () {
                if (0 == t.FCCState) t.setTimerOnRobot(T);
                else t.setTimerOnServer(y, M, l, s);
                if (t.loadingView) t.loadingView.showWithText();
              };

              if (module390.default.isMultiMapSegmentTimerSupported() && module381.RSM.isRunning && this.segmentMapId != module381.RSM.currentMapId && -1 != this.segmentMapId) {
                if (this.alert)
                  this.alert.customAlert(
                    '',
                    module505.set_multi_map_timer_different_map_save_tip,
                    function () {
                      return regeneratorRuntime.default.async(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                t.next = 2;
                                return regeneratorRuntime.default.awrap(module415.default.stop());

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
          } else globals.showToast(module505.set_timer_without_time_tip);
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
          if (module423.DMM.isGarnet)
            t = A(
              A({}, t),
              {},
              {
                mop_template_id: this.state.mopModeId,
              }
            );
          if (module390.default.isMultiMapSegmentTimerSupported())
            t = A(
              A({}, t),
              {},
              {
                map_index: this.segmentMapId,
              }
            );
          if (module390.default.isShakeMopSetSupported())
            t = A(
              A({}, t),
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
                    return regeneratorRuntime.default.awrap(module415.default.setTimer(t));

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
                    globals.showToast(module505.robot_communication_exception);
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
          var u, h, c, p, f, M, S, w, _, y, module1562, module394, module382, module414, module1891, module1055;

          return regeneratorRuntime.default.async(
            function (D) {
              for (;;)
                switch ((D.prev = D.next)) {
                  case 0:
                    D.prev = 0;
                    D.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.setServerTimer(t));

                  case 3:
                    if (
                      ((u = D.sent),
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
                        (c = A(
                          A({}, c),
                          {},
                          {
                            map_index: this.segmentMapId,
                          }
                        )),
                      module423.DMM.isGarnet &&
                        (c = A(
                          A({}, c),
                          {},
                          {
                            mop_template_id: this.state.mopModeId,
                          }
                        )),
                      module390.default.isShakeMopSetSupported() &&
                        (c = A(
                          A({}, c),
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
                      D.next = 31;
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
                      (y = !this.miTimerScene),
                      console.log('miTimerScene', typeof this.miTimerScene),
                      !y)
                    ) {
                      D.next = 25;
                      break;
                    }

                    D.next = 22;
                    return regeneratorRuntime.default.awrap(module393.miAddTimer(w));

                  case 22:
                    _ = D.sent;
                    D.next = 28;
                    break;

                  case 25:
                    D.next = 27;
                    return regeneratorRuntime.default.awrap(this.miTimerScene.save(w));

                  case 27:
                    _ = D.sent;

                  case 28:
                    console.log('miTimer ' + (y ? 'add' : 'edit') + ' - ' + JSON.stringify(_));
                    D.next = 41;
                    break;

                  case 31:
                    module1562 = {
                      id: 1,
                      method: 'server_scheduled_start',
                      params: M,
                    };
                    module394 = module1565.convertToTargetTime(this.state.minute, this.state.hour, s, l, module393.robotTimeZone);
                    module382 = module394.hour + ':' + module1565.addZeroPrefix(module394.minute);
                    module414 = module1565.getLoopStringOfRepeatMode(this.state.repeatMode);
                    module1891 = new Date();
                    module1055 = module1565.resolveRepeatModeByTargetTime(module414, module1891.getMonth() + 1, module1891.getDate(), module394.month, module394.day);
                    console.log('loops -- time - ' + module382 + ' - loop -' + module1055 + ' -repeat-' + this.state.repeatMode + ' - timerId- ' + this.timerId);
                    D.next = 40;
                    return regeneratorRuntime.default.awrap(module393.rrAddOrEditTimer(module382, module1055, module1562, this.timerId));

                  case 40:
                    D.sent;

                  case 41:
                    this.setTimerSuccess();
                    D.next = 50;
                    break;

                  case 44:
                    D.prev = 44;
                    D.t0 = D.catch(0);
                    this.enableConfirmButton();
                    if (this.loadingView) this.loadingView.hide();
                    globals.showToast(module505.robot_communication_exception);
                    console.log('setTimerOnServer error: ' + ('object' == typeof D.t0 ? JSON.stringify(D.t0) : D.t0));

                  case 50:
                  case 'end':
                    return D.stop();
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
                        Q.modal,
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
            module12.View,
            {
              style: [
                Q.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(module1892.default, {
              ref: function (n) {
                return (t.fillTopView = n);
              },
            }),
            React.default.createElement(
              module12.ScrollView,
              {
                style: [
                  Q.container,
                  {
                    width: module12.Dimensions.get('window').width,
                  },
                ],
                scrollEnabled: this.state.scrollEnabled,
              },
              React.default.createElement(
                module1138.default,
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
                style: Q.section,
              }),
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
                  title: module505.localization_strings_Setting_DoNotDisturbPage_0,
                  bottomDetail: this._getTimestampText(),
                  onPress: this.showTimePicker.bind(this),
                  style: Q.menuItem,
                  titleColor: 'rgba(0,0,0,0.8)',
                  shouldShowTopLongLine: false,
                }),
                React.default.createElement(module385.SettingListItemView, {
                  funcId: 'timer_setting_repeat_mode',
                  title: module505.localization_strings_Setting_Timer_SettingPage_1,
                  bottomDetail: module1565.getTextOfRepeatMode(this.state.repeatMode, this.date),
                  bottomDetailWidth: module12.Dimensions.get('window').width - 60,
                  onPress: this.showRepeatDialog.bind(this),
                  style: Q.menuItem,
                  titleColor: 'rgba(0,0,0,0.8)',
                }),
                module423.DMM.isGarnet &&
                  React.default.createElement(module385.SettingListItemView, {
                    funcId: 'timer_setting_clean_method',
                    title: module505.timer_setting_clean_method,
                    bottomDetail: this.getCleanModeBottomText(),
                    shouldShowBottomLine: true,
                    shouldShowBottomLongLine: true,
                    onPress: this.showCleanMethodDialog.bind(this),
                    style: Q.menuItem,
                    titleColor: 'rgba(0,0,0,0.8)',
                  }),
                React.default.createElement(module385.SettingListItemView, {
                  funcId: 'timer_setting_clean_mode',
                  title: module505.smart_scene_clean_mode_setting_item_title,
                  bottomDetail: c,
                  shouldShowBottomLine: false,
                  shouldShowBottomLongLine: false,
                  onPress: this.showCustomModeDialog.bind(this),
                  style: Q.menuItem,
                  titleColor: 'rgba(0,0,0,0.8)',
                })
              ),
              l &&
                !u &&
                React.default.createElement(module1890.default, {
                  style: Q.mapSegmentSettingView,
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
                React.default.createElement(module1891.default, {
                  style: Q.mapSegmentSettingView,
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
                    var n = module414.MM.getMapConfigById(-1 != t.segmentMapId ? t.segmentMapId : module381.RSM.currentMapId);
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
                  module12.Text,
                  {
                    style: {
                      paddingTop: 10,
                      paddingBottom: 20,
                      color: this.context.theme.timerSetting.segmentSettingViewTextColor,
                      alignSelf: 'center',
                      paddingHorizontal: 20,
                    },
                  },
                  module505.timer_list_server_timer_tip
                ),
              React.default.createElement(module1055.MultiMapSelectView, {
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
                  title: module505.custom_mode_panel_more_mode_title,
                });
              },
            }),
            React.default.createElement(module1268.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              parent: this,
              bgImage: module390.default.isSupportWaterMode() ? n.guideImages.mode : n.guideImages.modeWithoutWater,
              topTitle: module505.tanos_custom_mode_title,
              context: module505.tanos_custom_mode_des_info,
              hintText: module505.map_edit_guide_wall_tip_line2,
              buttonInfo: [module505.localization_strings_Main_MainPage_11, module505.button_go_setting],
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
          return this.state.currentCleanMethod == module1544.CleanMethodNoSet ? module505.timer_setting_no_setting : module1544.getCleanMethods()[this.state.currentCleanMethod];
        },
      },
      {
        key: 'getCleanModeDetailText',
        value: function () {
          var t = module423.DMM.isGarnet,
            n = this.state.currentCleanMethod;
          if (module382.isModeCustomized(this.state.mode, this.state.waterMode, this.state.mopMode)) return module505.map_edit_bottom_menu_mode;
          var o = module382.getCleanModeTitle(this.state.mode),
            s = module382.getMopWaterOrStrengthTitle(this.state.waterMode),
            l = o + (s ? ' | ' + s : '');
          if (module390.default.isPureCleanMopSupported() && this.state.mode == module1543.CleanModeZero) return s + ' | ' + module382.getMopMethodTitle(this.state.mopMode);

          if (module390.default.isShakeMopSetSupported() && 200 != this.state.waterMode) {
            var u = t ? this.state.mopModeName : module382.getMopMethodTitle(this.state.mopMode);
            if (301 == this.state.mopMode) return s + ' | ' + u;

            if (t) {
              if (n == module1544.CleanMethodClean) return l;
              if (n == module1544.CleanMethodMop) return u;
              if (n == module1544.CleanMethodCleanAndMop) return l + ' | ' + u;
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
          var o = {
            opacity: this.animatedWrapMarginBottom.interpolate({
              inputRange: [-500, 0],
              outputRange: [0, 1],
            }),
            height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
          };
          return React.default.createElement(
            module12.Animated.View,
            {
              style: [Q.modal, o],
            },
            React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: function () {
                  t.hideTimerPicker();
                },
              },
              React.default.createElement(module12.View, {
                style: Q.timerOutView,
              })
            ),
            React.default.createElement(
              module12.Animated.View,
              {
                style: [
                  Q.pickerView,
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
            n = module1565.RepeatIndexMap[this.state.repeatMode];
          if (undefined == n) n = 4;
          return React.default.createElement(
            module12.View,
            {
              style: {
                paddingBottom: module1265.AppBarMarginBottom,
              },
            },
            React.default.createElement(module1429.ActionSheetView, {
              title: module505.localization_strings_Setting_Timer_SettingPage_1,
              actions: module1565.RepeatMenuItems(),
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
            n = module1565.isCustomMode(this.state.repeatMode) ? [0, 0, 0, 0, 0, 0, 0] : this.state.repeatMode.split('');
          return React.default.createElement(module1893, {
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
          return React.default.createElement(module1429.ActionSheetView, {
            title: module505.timer_setting_clean_method,
            actions: module1544.getCleanMethods(),
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
            ? module1565.addZeroPrefix(this.state.hour) + ' : ' + module1565.addZeroPrefix(this.state.minute)
            : module505.timer_setting_no_setting;
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
          for (var o = module1565.convetToWeekendsByStartTime(this.state.repeatMode, t, n), s = 0; s < this.timerList.length; s++) {
            var l = this.timerList[s],
              u = l.startWeekdays;

            if (!this.editMode || l.hour != this.originalHour || l.minute != this.originalMinute || JSON.stringify(u) !== JSON.stringify(this.originStartWeekdays)) {
              if (l.hour == this.state.hour && l.minute == this.state.minute && this.hasSameStartWeekdays(o, u)) return true;
              if (l.repeatMode == module1565.RepeatMode.Once && l.hour == this.state.hour && l.minute == this.state.minute) return true;
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
            this.alert.alert(module505.map_edit_save_current_action, '', [
              {
                text: module505.map_edit_no_save,
                onPress: function () {
                  t.props.navigation.goBack();
                },
              },
              {
                text: module505.map_edit_button_text_save,
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
                    return regeneratorRuntime.default.awrap(module415.default.stop());

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
                    return regeneratorRuntime.default.awrap(module415.default.loadMultiMap(this.segmentMapId));

                  case 12:
                    l = u.sent;
                    console.log('timer change map successfully ' + this.segmentMapId, l);

                  case 14:
                    module414.MM.getMap(true);
                    module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module419.EventKeys.MapSegmentsDidChange,
                    });
                    u.next = 22;
                    break;

                  case 18:
                    u.prev = 18;
                    u.t0 = u.catch(7);
                    globals.showToast(module505.robot_communication_exception);
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
          return module381.RSM.mopMode || 300;
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
            title: module505.map_edit_bottom_menu_mode,
          });
        },
      },
      {
        key: 'enableConfirmButton',
        value: function () {
          if (module423.DMM.isGarnet)
            this.state.currentCleanMethod != module1544.CleanMethodNoSet || this.editMode ? this.confirmButton.setEnabled(true) : this.confirmButton.setEnabled(false);
          else this.confirmButton.setEnabled(true);
        },
      },
    ]);
    return K;
  })(React.default.Component);

exports.default = K;
K.contextType = module1121.AppConfigContext;
var Q = module12.StyleSheet.create({
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
    marginTop: module1265.NavigationBarHeight,
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
    borderRadius: module1265.AppBorderRadius,
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

require('./416');

require('./392');

require('./1966');

require('./1625');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module381 = require('./381'),
  module415 = require('./415'),
  module390 = require('./390'),
  module501 = require('./501'),
  module424 = require('./424'),
  module1199 = require('./1199'),
  module382 = require('./382'),
  module1346 = require('./1346'),
  module420 = require('./420'),
  module1640 = require('./1640'),
  module387 = require('./387'),
  module1624 = require('./1624'),
  module1967 = require('./1967'),
  module1968 = require('./1968');

function I(t, n) {
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

function D(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      I(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      I(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function B() {
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

require('./1975');

require('./398');

require('./1642');

require('./1643');

require('./1420');

require('./1644');

var module510 = require('./510').strings,
  module393 = require('./393'),
  module1343 = require('./1343'),
  module512 = require('./512'),
  N = globals.isRTL,
  module1981 = (function (t) {
    module9.default(F, t);

    var module50 = F,
      module1199 = B(),
      I = function () {
        var t,
          n = module12.default(module50);

        if (module1199) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function F(t) {
      var n;
      module6.default(this, F);
      (n = I.call(this, t)).state = {
        timerlist: [],
        dataSource: new module501.default.DataSource({
          rowHasChanged: function (t, n) {
            return t !== n;
          },
        }),
        loading: true,
        refreshing: false,
        requestFailed: false,
        updating: false,
        smartSceneTimerlist: [],
        smartSceneTimers: new module501.default.DataSource({
          rowHasChanged: function (t, n) {
            return t !== n;
          },
        }),
      };
      n.retryTime = 0;
      n.hasFetchedLatestMultiMapData = false;
      n.FCCState = module381.RobotStatusManager.sharedManager().FCCState;
      return n;
    }

    module7.default(F, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.fetchListData(true);
          this.fetchSmartSceneTimers();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.configNavibar();
          this.focusListener = this.props.navigation.addListener('didFocus', function () {
            if (t.guideButton) t.guideButton.setEnabled(true);
          });
        },
      },
      {
        key: 'configNavibar',
        value: function () {
          var t = this,
            n = React.default.createElement(module385.PureImageButton, {
              style: D(
                D({}, H.guideButton),
                {},
                {
                  transform: N
                    ? [
                        {
                          rotateY: '180deg',
                        },
                      ]
                    : [],
                }
              ),
              funcId: 'timer_setting_guide',
              accessibilityLabel: module510.accessibility_guide,
              image: this.context.theme.mapEdit.guideImg,
              onPress: this.onNavigationGuidePress.bind(this),
              imageWidth: 35,
              imageHeight: 35,
              enabled: true,
              imageStyle: {
                resizeMode: 'contain',
                width: 30,
                height: 30,
              },
              ref: function (n) {
                return (t.guideButton = n);
              },
            }),
            o = React.default.createElement(module385.PureImageButton, {
              style: H.confirmButton,
              funcId: 'timer_setting_add',
              accessibilityLabel: module510.accessibility_add,
              image: this.context.theme.timerListSetting.confirmButton,
              onPress: this.openSettingPage.bind(this, false, {}, 0),
              imageWidth: 35,
              imageHeight: 35,
              enabled: true,
              imageStyle: {
                resizeMode: 'contain',
                width: 30,
                height: 30,
              },
              ref: function (n) {
                return (t.addTimeButton = n);
              },
            });
          this.props.navigation.setParams({
            title: module510.localization_strings_Setting_index_3,
            rightItems: [n, o],
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'fetchListData',
        value: function (t) {
          var n,
            s,
            l,
            u = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    this.disableAddButton();
                    this.setState({
                      requestFailed: false,
                      loading: true,
                      refreshing: false,
                      updating: true,
                    });
                    c.prev = 2;
                    if (!(module1640.TLM.resultTimerList && 0 != module1640.TLM.resultTimerList.length)) t = true;
                    c.next = 6;
                    return regeneratorRuntime.default.awrap(module1640.TLM.fetchTimerList(t));

                  case 6:
                    if (module1640.TLM.resultTimerList || !(this.retryTime < 7)) {
                      c.next = 10;
                      break;
                    }

                    this.retryTime++;
                    setTimeout(function () {
                      u.fetchListData(t);
                    }, 1e3);
                    return c.abrupt('return');

                  case 10:
                    l = null != (n = module1640.TLM.resultTimerList) ? n : [];
                    console.log('fetchTimerList ' + module1640.TLM.resultTimerList);
                    this.finishLoading();
                    this.retryTime = 0;
                    this.setState({
                      loading: false,
                      refreshing: false,
                      timerlist: l,
                      dataSource: this.state.dataSource.cloneWithRows(l),
                    });
                    module387.LogEventStatus('timer_list', {
                      count: null != (s = (null != l ? l : []).length) ? s : 0,
                    });
                    c.next = 21;
                    break;

                  case 18:
                    c.prev = 18;
                    c.t0 = c.catch(2);

                    if (this.retryTime < 7) {
                      this.retryTime++;
                      setTimeout(function () {
                        u.fetchListData(t);
                      }, 1e3);
                    } else {
                      this.finishLoading(true);
                      globals.showToast(module510.robot_communication_exception);
                      console.log('fetchTimerList  error: ' + ('string' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));
                    }

                  case 21:
                    if (module390.default.isMultiFloorSupported() && !this.hasFetchedLatestMultiMapData) {
                      module415.MM.getMultiMaps();
                      this.hasFetchedLatestMultiMapData = false;
                    }

                  case 22:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[2, 18]],
            Promise
          );
        },
      },
      {
        key: 'fetchSmartSceneTimers',
        value: function () {
          var t = this;
          if (!module393.isMiApp)
            module1967.SmartSceneAPI.getCommandList()
              .then(function (n) {
                var o = n.commands,
                  s = (null != o ? o : []).filter(function (t) {
                    var n, o;
                    return !t.isInvalid && null != t.timer && (null != (n = null == (o = t.timer) ? undefined : o.length) ? n : 0) > 0;
                  });
                t.setState({
                  smartSceneTimerlist: s,
                  smartSceneTimers: t.state.smartSceneTimers.cloneWithRows(s),
                });
              })
              .catch(function (t) {
                console.log('' + t);
              });
        },
      },
      {
        key: 'refreshListData',
        value: function () {
          var t = this;

          if (!this.state.refreshing) {
            this.disableAddButton();
            this.setState({
              requestFailed: false,
              loading: false,
              refreshing: true,
              updating: true,
            });
            setTimeout(function () {
              var n, s;
              return regeneratorRuntime.default.async(
                function (l) {
                  for (;;)
                    switch ((l.prev = l.next)) {
                      case 0:
                        l.prev = 0;
                        l.next = 3;
                        return regeneratorRuntime.default.awrap(module1640.TLM.fetchTimerList(true));

                      case 3:
                        s = null != (n = module1640.TLM.resultTimerList) ? n : [];
                        t.finishLoading();
                        t.setState({
                          loading: false,
                          refreshing: false,
                          timerlist: s,
                          dataSource: t.state.dataSource.cloneWithRows(s),
                        });
                        l.next = 13;
                        break;

                      case 8:
                        l.prev = 8;
                        l.t0 = l.catch(0);
                        t.finishLoading(true);
                        globals.showToast(module510.robot_communication_exception);
                        console.log('fetchTimerList resultTimerList index  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

                      case 13:
                      case 'end':
                        return l.stop();
                    }
                },
                null,
                null,
                [[0, 8]],
                Promise
              );
            }, 1e3);
          }
        },
      },
      {
        key: 'disableAddButton',
        value: function () {
          var t = this;
          setTimeout(function () {
            t.setAddButtonDisable();
          }, 50);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          console.log('Tiimer index componentWillUnmount');
          this.finishLoading();
          if (this.focusListener) this.focusListener.remove();
          if (!(null == module393 || null == module393.notifyNativeUpdateSceneDataSource)) module393.notifyNativeUpdateSceneDataSource();
        },
      },
      {
        key: 'pageDeleteServerTimer',
        value: function (t) {
          var n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module1640.TLM.deleteServerTimer(t));

                  case 2:
                    this.swipeListView.safeCloseOpenRow();
                    if (!(null == (n = this.smartSceneListView) || null == n.safeCloseOpenRow)) n.safeCloseOpenRow();
                    this.refreshListData();

                  case 5:
                  case 'end':
                    return s.stop();
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
        key: 'deleteRobotTimer',
        value: function (t) {
          var n, s, module6, u;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module1640.TLM.deleteRobotTimer(t));

                  case 3:
                    module6 = c.sent;
                    this.swipeListView.safeCloseOpenRow();
                    if (!(null == (n = this.smartSceneListView) || null == n.safeCloseOpenRow)) n.safeCloseOpenRow();
                    console.log('deleteRobotTimer --   ' + JSON.stringify(module6));
                    c.next = 9;
                    return regeneratorRuntime.default.awrap(module1640.TLM.fetchTimerList(false));

                  case 9:
                    u = null != (s = module1640.TLM.resultTimerList) ? s : [];
                    console.log('deleteRobotTimer --   ' + JSON.stringify(u));
                    this.setState({
                      timerlist: u,
                      dataSource: this.state.dataSource.cloneWithRows(u),
                    });
                    c.next = 17;
                    break;

                  case 14:
                    c.prev = 14;
                    c.t0 = c.catch(0);
                    console.log('deleteRobotTimer  error: ' + ('string' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));

                  case 17:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[0, 14]],
            Promise
          );
        },
      },
      {
        key: 'openSettingPage',
        value: function (t, n, o) {
          var s = this;
          if (0 == Object.keys(n).length && (module1640.TLM.totalTimerCount >= 10 || this.state.timerlist.length >= 10))
            this.alert.alert('', module510.localization_strings_Setting_Timer_index_10, [
              {
                text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {},
              },
            ]);
          else {
            s.props.navigation.navigate(
              'TimerSettingPage',
              D(
                D({}, n),
                {},
                {
                  timerList: s.state.timerlist,
                  FCCState: s.FCCState,
                  editMode: t,
                  parentView: s,
                  miTimerScene: o,
                  timerListNeedUpdate: function () {
                    s.refreshListData();
                  },
                }
              )
            );
          }
        },
      },
      {
        key: 'onPressRow',
        value: function (t, n) {
          var o = this;
          if (1 == n)
            this.props.navigation.navigate('SmartCommandTimer', {
              title: module510.localization_strings_Setting_Timer_SettingPage_16,
              data: this.state.smartSceneTimerlist[t],
              autoActivateTrigger: false,
              onEditTimer: function () {
                o.fetchSmartSceneTimers();
              },
            });
          else {
            var s = this.state.timerlist[t];
            this.openSettingPage(true, s, module393.isMiApp && 1 == this.FCCState ? module1640.TLM.miTimerScenes[t] : 0);
          }
        },
      },
      {
        key: 'deleteTimerWithIndex',
        value: function (t, n) {
          var o = this;
          this.alert.alert(module510.localization_strings_Setting_Timer_index_13, '', [
            {
              text: module510.localization_strings_Main_MainPage_11,
              onPress: function () {
                module387.LogEventCommon('delete_timer_cancel');
              },
            },
            {
              text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                var s;
                if (1 == n)
                  module1967.SmartSceneAPI.editTriggers(null == (s = o.state.smartSceneTimerlist[t]) ? undefined : s.id, [])
                    .then(function (t) {
                      var n, s;
                      o.fetchSmartSceneTimers();
                      if (!(null == (n = o.swipeListView) || null == n.safeCloseOpenRow)) n.safeCloseOpenRow();
                      if (!(null == (s = o.smartSceneListView) || null == s.safeCloseOpenRow)) s.safeCloseOpenRow();
                    })
                    .catch(function () {
                      globals.showToast(LocalizationStrings.map_object_ignore_failed);
                    });
                else {
                  module387.LogEventCommon('delete_timer_confirm');
                  if (1 == o.FCCState) o.pageDeleteServerTimer(t);
                  else o.deleteRobotTimer(t);
                }
              },
            },
          ]);
        },
      },
      {
        key: 'timerSwitchDidChange',
        value: function (t, n, s) {
          var l, u, c, module11;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    if (((l = this.state.timerlist[t]), this.setTimerRowEnabed(t, n, s), (h.prev = 2), 1 != n)) {
                      h.next = 11;
                      break;
                    }

                    (c = this.state.smartSceneTimerlist[t].timer[0].param).enabled = s;
                    module11 = {
                      name: 'TIMER',
                      type: 'TIMER',
                      param: JSON.stringify(c),
                    };
                    h.next = 9;
                    return regeneratorRuntime.default.awrap(module1967.SmartSceneAPI.editTriggers(null == (u = this.state.smartSceneTimerlist[t]) ? undefined : u.id, [module11]));

                  case 9:
                    h.next = 13;
                    break;

                  case 11:
                    h.next = 13;
                    return regeneratorRuntime.default.awrap(module1640.TLM.updateTimerOnStatus(t, l, s));

                  case 13:
                    h.next = 20;
                    break;

                  case 15:
                    h.prev = 15;
                    h.t0 = h.catch(2);
                    console.log('update Timer  error: ' + ('object' == typeof h.t0 ? JSON.stringify(h.t0) : h.t0));
                    this.setTimerRowEnabed(t, n, !s);
                    globals.showToast(module510.localization_strings_Setting_Timer_index_11);

                  case 20:
                  case 'end':
                    return h.stop();
                }
            },
            null,
            this,
            [[2, 15]],
            Promise
          );
        },
      },
      {
        key: 'setTimerRowEnabed',
        value: function (t, o, s) {
          if (1 == o) {
            var l = this.state.smartSceneTimerlist.map(function (t) {
              return module22.default(new module1968.CommandCardData(), t);
            });
            l[t].timer[0].param.enabled = s;
            this.setState({
              smartSceneTimerlist: l,
              smartSceneTimers: this.state.smartSceneTimers.cloneWithRows(l),
            });
          } else {
            var u = JSON.parse(JSON.stringify(this.state.timerlist));
            u[t].enabled = s;
            this.setState({
              timerlist: u,
              dataSource: this.state.dataSource.cloneWithRows(u),
            });
          }
        },
      },
      {
        key: '_renderRow',
        value: function (t, o, s) {
          var l = this,
            u = this.context.theme.settingListItem,
            c = '0' != t.segments && 'ok' != t.segments ? module510.home_bottom_menu_select_zone : module510.home_bottom_menu_global,
            f = t.cleanTime,
            h = '' + t.repeatModeText,
            y = this.getBottomText(t, c);

          if (1 == o) {
            var _ = t.timer[0];
            y = t.name + ' | ' + _.repeatModeDescription;
            f = _.timeDescription;
            h = '';
          }

          var b = React.default.createElement(
              module13.Text,
              {
                style: [
                  H.title,
                  {
                    marginRight: globals.isRTL ? 0 : 5,
                    color: u.titleColor,
                  },
                ],
              },
              f
            ),
            v = React.default.createElement(
              module13.Text,
              {
                numberOfLines: 1,
                style: [
                  H.bottomInfo,
                  {
                    marginRight: globals.isRTL ? 5 : 0,
                    flex: 1,
                    color: u.detailColor,
                  },
                ],
              },
              h
            ),
            L = React.default.createElement(
              module13.View,
              {
                style: [
                  H.infoViewOutline,
                  {
                    marginRight: globals.isRTL ? 20 : 0,
                  },
                ],
              },
              React.default.createElement(
                module13.View,
                {
                  style: H.infoView,
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: H.timeInfoView,
                  },
                  globals.isRTL ? v : b,
                  globals.isRTL ? b : v
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: [
                      H.timeInfoView,
                      {
                        marginTop: 5,
                      },
                    ],
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: [
                        H.bottomInfo,
                        {
                          color: u.detailColor,
                        },
                      ],
                    },
                    y
                  )
                )
              )
            ),
            x =
              !t.disable &&
              React.default.createElement(module385.ToggleSwitch, {
                funcId: 'timer_list_switch_' + s,
                style: H.toggleSwitch,
                onColor: '#3384FF',
                onToggle: function (t) {
                  return l.timerSwitchDidChange(s, o, t);
                },
                isOn: 1 == o ? t.timer[0].enabled : t.enabled,
              });
          return React.default.createElement(
            module13.View,
            {
              style: [H.outContainter],
            },
            React.default.createElement(
              module13.TouchableHighlight,
              module22.default(
                {
                  style: {
                    overflow: 'hidden',
                    borderRadius: 14,
                  },
                },
                module391.default.getAccessibilityLabel('TimerSettingList_' + s + o),
                {
                  delayLongPress: 500,
                  onLongPress: function () {
                    return l.deleteTimerWithIndex(s, o);
                  },
                  onPress: function () {
                    return l.onPressRow(s, o);
                  },
                }
              ),
              React.default.createElement(
                module13.View,
                {
                  style: [
                    H.rowContainer,
                    {
                      backgroundColor: u.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: H.rowView,
                  },
                  globals.isRTL && x,
                  globals.isRTL && L,
                  !globals.isRTL && L,
                  !globals.isRTL && x
                )
              )
            )
          );
        },
      },
      {
        key: 'getBottomText',
        value: function (t, n) {
          if (t.disable) return module510.timer_disable;
          var o,
            s = module382.isModeCustomized(t.mode, t.waterMode, module424.DMM.isGarnet ? t.mopModeId : t.mopMode);
          if (
            (o = s
              ? module510.map_edit_bottom_menu_mode
              : module390.default.isPureCleanMopSupported()
              ? t.waterMode == module1624.WaterModeZero
                ? module510.robot_clean_status_only_clean
                : t.mode == module1624.CleanModeZero
                ? module510.robot_clean_status_only_mop
                : module510.robot_status_clean_mop_mode
              : '').length > 0
          )
            o = ' | ' + o;
          return s ? '' + n + o : '' + n + o + ' | ' + this.getModeText(t);
        },
      },
      {
        key: 'getModeText',
        value: function (t) {
          var module22, o, s;
          module22 = module382.getCleanModeTitle(t.mode);

          if (module390.default.isElectronicWaterBoxSupported() || module390.default.isShakeMopSetSupported()) {
            o = module382.getMopWaterOrStrengthTitle(t.waterMode);
            o = 200 == t.waterMode ? '' : o;
          }

          if (module390.default.isShakeMopSetSupported() && !module424.DMM.isGarnet) s = module382.getMopMethodTitle(t.mopMode);
          return module390.default.isElectronicWaterBoxSupported()
            ? module22 + ' | ' + o
            : module390.default.isPureCleanMopSupported()
            ? t.waterMode == module1624.WaterModeZero
              ? module22
              : t.mode == module1624.CleanModeZero
              ? o + ' | ' + s
              : module22 + ' | ' + o
            : module390.default.isShakeMopStrengthSupported()
            ? module390.default.isShakeMopSetSupported() && 200 != t.waterMode
              ? 301 == t.mopMode
                ? o + ' | ' + s
                : module22 + ' | ' + o + ' | ' + s
              : module22 + ' | ' + o
            : module22;
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          var n = this;
          this.setState({
            requestFailed: t,
            updating: false,
          });
          if (this.state.loading || this.state.refreshing)
            this.setState({
              loading: false,
              refreshing: false,
            });
          setTimeout(function () {
            n.setAddButtonEnable();
            n.showGuideIfNeeded();
          }, 100);
        },
      },
      {
        key: 'forceRefreshForTestMode',
        value: function () {
          var t = JSON.parse(JSON.stringify(this.state.timerlist));
          this.setState({
            timerlist: t,
            dataSource: this.state.dataSource.cloneWithRows(t),
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t,
            n = this,
            o = this.context.theme,
            s = React.default.createElement(module385.RequestRetryView, {
              onPressButton: function () {
                n.fetchListData(true);
              },
            });
          if (this.state.requestFailed) return s;
          var l = React.default.createElement(
            module13.View,
            {
              style: [
                H.containterView,
                {
                  backgroundColor: o.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ],
            },
            React.default.createElement(module385.Spinner, null)
          );
          if (this.state.loading) return l;

          var u,
            c,
            f,
            h,
            T = (null != (t = this.state.smartSceneTimerlist.length) ? t : 0) > 0,
            _ = React.default.createElement(
              module13.View,
              {
                style: {
                  alignSelf: 'stretch',
                },
              },
              T &&
                React.default.createElement(
                  module13.Text,
                  {
                    style: {
                      color: this.context.theme.mainTextColor,
                      fontSize: 18,
                      paddingHorizontal: 20,
                      marginVertical: 10,
                      fontWeight: 'bold',
                      marginTop: 20,
                    },
                  },
                  module510.standard_timer
                ),
              React.default.createElement(module512, {
                ref: function (t) {
                  n.swipeListView = t;
                },
                renderHiddenRow: this.renderHiddenRow.bind(this),
                disableLeftSwipe: N,
                disableRightSwipe: !N,
                stopLeftSwipe: N ? 111 : 0,
                stopRightSwipe: N ? 0 : -111,
                leftOpenValue: 111,
                rightOpenValue: -111,
                style: [
                  H.list,
                  {
                    flexGrow: T ? 0 : 1,
                  },
                ],
                automaticallyAdjustContentInsets: false,
                enableEmptySections: true,
                dataSource: this.state.dataSource,
                renderRow: this._renderRow.bind(this),
              })
            ),
            b = React.default.createElement(
              module13.View,
              {
                style: {
                  alignSelf: 'stretch',
                },
              },
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    color: this.context.theme.mainTextColor,
                    fontSize: 18,
                    paddingHorizontal: 20,
                    marginVertical: 10,
                    marginTop: 25,
                    fontWeight: 'bold',
                  },
                },
                module510.smart_scene_timer
              ),
              React.default.createElement(module512, {
                ref: function (t) {
                  n.smartSceneListView = t;
                },
                renderHiddenRow: function (t, o, s, l) {
                  return n.renderHiddenRow(t, 1, s, l);
                },
                disableLeftSwipe: N,
                disableRightSwipe: !N,
                stopLeftSwipe: N ? 111 : 0,
                stopRightSwipe: N ? 0 : -111,
                leftOpenValue: 111,
                rightOpenValue: -111,
                style: [H.list],
                automaticallyAdjustContentInsets: false,
                enableEmptySections: true,
                dataSource: this.state.smartSceneTimers,
                renderRow: function (t, o, s) {
                  return n._renderRow(t, 1, s);
                },
              })
            ),
            v = React.default.createElement(
              module13.View,
              {
                style: H.emptyView,
              },
              React.default.createElement(module13.Image, {
                resizeMode: 'contain',
                style: H.emptyImage,
                source: o.timerListSetting.noDataIcon,
              }),
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    H.emptyText,
                    {
                      color: o.timerListSetting.tipTextColor,
                    },
                  ],
                },
                module510.localization_strings_Setting_Timer_index_21
              )
            ),
            L = null;

          if (!this.state.loading)
            L =
              0 != (null != (u = null == (c = this.state.timerlist) ? undefined : c.length) ? u : 0) || T
                ? React.default.createElement(
                    module13.ScrollView,
                    {
                      style: {
                        alignSelf: 'stretch',
                      },
                      showsVerticalScrollIndicator: false,
                      refreshControl: React.default.createElement(module13.RefreshControl, {
                        refreshing: this.state.refreshing,
                        onRefresh: function () {
                          return n.refreshListData();
                        },
                      }),
                    },
                    (null != (f = null == (h = this.state.timerlist) ? undefined : h.length) ? f : 0) > 0 && _,
                    T && b
                  )
                : v;
          if (this.state.loading || 1 != this.FCCState)
            React.default.createElement(module13.View, {
              style: H.section,
            });
          else
            React.default.createElement(
              module13.Text,
              {
                style: [
                  H.topTip,
                  {
                    backgroundColor: o.settingListItem.backgroundColor,
                    color: o.timerListSetting.tipTextColor,
                  },
                ],
              },
              module510.timer_list_server_timer_tip
            );
          return React.default.createElement(
            module13.View,
            {
              style: [
                H.container,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            L,
            React.default.createElement(module385.AlertView, {
              ref: function (t) {
                return (n.alert = t);
              },
            }),
            React.default.createElement(module1346.default, {
              ref: function (t) {
                n.newSwitchGuideView = t;
              },
              isModal: true,
              parent: this,
              bgImage: o.timerListSetting.guideImg,
              topTitle: module510.timer_guide_title,
              context: module510.timer_guide_title_info,
              hintText:
                module510.timer_guide_title_tip1 +
                '\n' +
                module510.timer_guide_title_tip2 +
                '\n' +
                (module381.RSM.multiFloorEnabled ? '* ' + module510.multi_map_timer_segment_select_bottom_tip + '\n' : '') +
                (1 == this.FCCState ? '* ' + module510.timer_list_server_timer_tip : ''),
              buttonInfo: [module510.localization_strings_Setting_RemoteControlPage_51],
              buttonFuncId: ['timer_list_guide_ok'],
            })
          );
        },
      },
      {
        key: 'renderHiddenRow',
        value: function (t, n, o, s) {
          var l = this;
          return React.default.createElement(
            module13.View,
            {
              style: H.hiddenRow,
            },
            React.default.createElement(module13.View, {
              style: {
                width: 20,
                height: 20,
              },
            }),
            React.default.createElement(module385.PureImageButton, {
              funcId: 'timer_list_delete_button_' + o,
              image: require('./1981'),
              imageWidth: 26,
              imageHeight: 26,
              style: H.deleteButton,
              onPress: function () {
                l.deleteTimerWithIndex(o, n);
              },
            })
          );
        },
      },
      {
        key: 'setAddButtonEnable',
        value: function () {
          if (this.addTimeButton) this.addTimeButton.setEnabled(true);
        },
      },
      {
        key: 'setAddButtonDisable',
        value: function () {
          if (this.addTimeButton) this.addTimeButton.setEnabled(false);
        },
      },
      {
        key: 'showGuideIfNeeded',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    t = module420.StorageKeys.TimerCleanbyGuide;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(t));

                  case 3:
                    if (((n = s.sent), !!n)) {
                      s.next = 9;
                      break;
                    }

                    s.next = 8;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(t, t));

                  case 8:
                    if (this.newSwitchGuideView) this.newSwitchGuideView.show();

                  case 9:
                  case 'end':
                    return s.stop();
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
        key: 'onNavigationGuidePress',
        value: function () {
          if (this.newSwitchGuideView) this.newSwitchGuideView.show();
        },
      },
    ]);
    return F;
  })(React.default.Component);

exports.default = module1981;
module1981.contextType = module1199.AppConfigContext;
var H = module13.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  outContainter: {
    paddingHorizontal: 15,
    overflow: 'hidden',
    marginVertical: 7.5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 0,
    marginTop: module1343.NavigationBarHeight,
  },
  topTip: {
    width: module13.Dimensions.get('window').width,
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 15,
    color: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 15,
  },
  list: {
    alignSelf: 'stretch',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 96,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoViewOutline: {
    flex: 1,
    alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
  },
  infoView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
  },
  timeInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
  },
  label: {
    fontSize: module391.default.scaledPixel(13),
    color: 'rgba(0,0,0,0.4)',
  },
  bottomInfo: {
    marginTop: 5,
    fontSize: module391.default.scaledPixel(13),
    color: 'rgba(0,0,0,0.4)',
  },
  separator: {
    marginTop: 13,
    height: 0.6,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  emptyView: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginTop: -150,
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.376)',
  },
  toggleSwitch: {
    marginRight: 20,
  },
  hiddenRow: {
    flexDirection: N ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    width: 96,
    alignSelf: N ? 'flex-start' : 'flex-end',
    height: 96,
    borderRadius: 14,
    top: 7.5,
    marginHorizontal: 17,
    backgroundColor: 'red',
  },
  confirmButton: {
    marginLeft: 0,
    marginRight: 14,
  },
  guideButton: {
    marginLeft: 14,
    marginRight: 0,
  },
  section: {
    paddingVertical: 7,
  },
});

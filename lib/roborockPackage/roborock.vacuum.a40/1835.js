require('./414');

require('./392');

require('./1836');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module391 = require('./391'),
  module381 = require('./381'),
  module1329 = require('./1329'),
  module390 = require('./390'),
  module491 = require('./491'),
  module422 = require('./422'),
  module515 = require('./515'),
  module382 = require('./382'),
  module1802 = require('./1802'),
  module418 = require('./418'),
  module1327 = require('./1327'),
  module1509 = require('./1509'),
  module387 = require('./387'),
  module1326 = require('./1326'),
  module1837 = require('./1837'),
  module1838 = require('./1838');

function D(t, n) {
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

function B(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      D(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      D(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function z() {
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

require('./1841');

require('./398');

require('./1511');

require('./1512');

require('./1404');

require('./1513');

var module500 = require('./500').strings,
  module393 = require('./393'),
  module1153 = require('./1153'),
  module502 = require('./502'),
  A = globals.isRTL,
  module1847 = (function (t) {
    module7.default(N, t);

    var module50 = N,
      module515 = z(),
      D = function () {
        var t,
          n = module11.default(module50);

        if (module515) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function N(t) {
      var n;
      module4.default(this, N);
      (n = D.call(this, t)).state = {
        timerlist: [],
        dataSource: new module491.default.DataSource({
          rowHasChanged: function (t, n) {
            return t !== n;
          },
        }),
        loading: true,
        refreshing: false,
        requestFailed: false,
        updating: false,
        smartSceneTimerlist: [],
        smartSceneTimers: new module491.default.DataSource({
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

    module5.default(N, [
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
              style: B(
                B({}, G.guideButton),
                {},
                {
                  transform: A
                    ? [
                        {
                          rotateY: '180deg',
                        },
                      ]
                    : [],
                }
              ),
              funcId: 'timer_setting_guide',
              accessibilityLabel: module500.accessibility_guide,
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
              style: G.confirmButton,
              funcId: 'timer_setting_add',
              accessibilityLabel: module500.accessibility_add,
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
            title: module500.localization_strings_Setting_index_3,
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
                    if (!(module1509.TLM.resultTimerList && 0 != module1509.TLM.resultTimerList.length)) t = true;
                    c.next = 6;
                    return regeneratorRuntime.default.awrap(module1509.TLM.fetchTimerList(t));

                  case 6:
                    if (module1509.TLM.resultTimerList || !(this.retryTime < 7)) {
                      c.next = 9;
                      break;
                    }

                    setTimeout(function () {
                      u.fetchListData(t);
                    }, 1e3);
                    return c.abrupt('return');

                  case 9:
                    l = null != (n = module1509.TLM.resultTimerList) ? n : [];
                    console.log('fetchTimerList ' + module1509.TLM.resultTimerList);
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
                    c.next = 20;
                    break;

                  case 17:
                    c.prev = 17;
                    c.t0 = c.catch(2);
                    if (this.retryTime < 7)
                      setTimeout(function () {
                        u.fetchListData(t);
                      }, 1e3);
                    else {
                      this.finishLoading(true);
                      globals.showToast(module500.robot_communication_exception);
                      console.log('fetchTimerList  error: ' + ('string' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));
                    }

                  case 20:
                    if (module390.default.isMultiFloorSupported() && !this.hasFetchedLatestMultiMapData) {
                      module1329.MM.getMultiMaps();
                      this.hasFetchedLatestMultiMapData = false;
                    }

                  case 21:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[2, 17]],
            Promise
          );
        },
      },
      {
        key: 'fetchSmartSceneTimers',
        value: function () {
          var t = this;
          if (!module393.isMiApp)
            module1837.SmartSceneAPI.getCommandList()
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
                        return regeneratorRuntime.default.awrap(module1509.TLM.fetchTimerList(true));

                      case 3:
                        s = null != (n = module1509.TLM.resultTimerList) ? n : [];
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
                        globals.showToast(module500.robot_communication_exception);
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
                    return regeneratorRuntime.default.awrap(module1509.TLM.deleteServerTimer(t));

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
          var n, s, module4, u;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module1509.TLM.deleteRobotTimer(t));

                  case 3:
                    module4 = c.sent;
                    this.swipeListView.safeCloseOpenRow();
                    if (!(null == (n = this.smartSceneListView) || null == n.safeCloseOpenRow)) n.safeCloseOpenRow();
                    console.log('deleteRobotTimer --   ' + JSON.stringify(module4));
                    c.next = 9;
                    return regeneratorRuntime.default.awrap(module1509.TLM.fetchTimerList(false));

                  case 9:
                    u = null != (s = module1509.TLM.resultTimerList) ? s : [];
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
          if (0 == Object.keys(n).length && (module1509.TLM.totalTimerCount >= 10 || this.state.timerlist.length >= 10))
            this.alert.alert('', module500.localization_strings_Setting_Timer_index_10, [
              {
                text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {},
              },
            ]);
          else {
            s.props.navigation.navigate(
              'TimerSettingPage',
              B(
                B({}, n),
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
              title: module500.localization_strings_Setting_Timer_SettingPage_16,
              data: this.state.smartSceneTimerlist[t],
              autoActivateTrigger: false,
              onEditTimer: function () {
                o.fetchSmartSceneTimers();
              },
            });
          else {
            var s = this.state.timerlist[t];
            this.openSettingPage(true, s, module393.isMiApp && 1 == this.FCCState ? module1509.TLM.miTimerScenes[t] : 0);
          }
        },
      },
      {
        key: 'deleteTimerWithIndex',
        value: function (t, n) {
          var o = this;
          this.alert.alert(module500.localization_strings_Setting_Timer_index_13, '', [
            {
              text: module500.localization_strings_Main_MainPage_11,
              onPress: function () {
                module387.LogEventCommon('delete_timer_cancel');
              },
            },
            {
              text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                var s;
                if (1 == n)
                  module1837.SmartSceneAPI.editTriggers(null == (s = o.state.smartSceneTimerlist[t]) ? undefined : s.id, [])
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
          var l, u, c, module9;
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
                    module9 = {
                      name: 'TIMER',
                      type: 'TIMER',
                      param: JSON.stringify(c),
                    };
                    h.next = 9;
                    return regeneratorRuntime.default.awrap(module1837.SmartSceneAPI.editTriggers(null == (u = this.state.smartSceneTimerlist[t]) ? undefined : u.id, [module9]));

                  case 9:
                    h.next = 13;
                    break;

                  case 11:
                    h.next = 13;
                    return regeneratorRuntime.default.awrap(module1509.TLM.updateTimerOnStatus(t, l, s));

                  case 13:
                    h.next = 20;
                    break;

                  case 15:
                    h.prev = 15;
                    h.t0 = h.catch(2);
                    console.log('update Timer  error: ' + ('object' == typeof h.t0 ? JSON.stringify(h.t0) : h.t0));
                    this.setTimerRowEnabed(t, n, !s);
                    globals.showToast(module500.localization_strings_Setting_Timer_index_11);

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
              return module22.default(new module1838.CommandCardData(), t);
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
            c = '0' != t.segments && 'ok' != t.segments ? module500.home_bottom_menu_select_zone : module500.home_bottom_menu_global,
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
              module12.Text,
              {
                style: [
                  G.title,
                  {
                    marginRight: globals.isRTL ? 0 : 5,
                    color: u.titleColor,
                  },
                ],
              },
              f
            ),
            v = React.default.createElement(
              module12.Text,
              {
                numberOfLines: 1,
                style: [
                  G.bottomInfo,
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
              module12.View,
              {
                style: [
                  G.infoViewOutline,
                  {
                    marginRight: globals.isRTL ? 20 : 0,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: G.infoView,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: G.timeInfoView,
                  },
                  globals.isRTL ? v : b,
                  globals.isRTL ? b : v
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      G.timeInfoView,
                      {
                        marginTop: 5,
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        G.bottomInfo,
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
                style: G.toggleSwitch,
                onColor: '#3384FF',
                onToggle: function (t) {
                  return l.timerSwitchDidChange(s, o, t);
                },
                isOn: 1 == o ? t.timer[0].enabled : t.enabled,
              });
          return React.default.createElement(
            module12.View,
            {
              style: [G.outContainter],
            },
            React.default.createElement(
              module12.TouchableHighlight,
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
                module12.View,
                {
                  style: [
                    G.rowContainer,
                    {
                      backgroundColor: u.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: G.rowView,
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
          if (t.disable) return module500.timer_disable;
          var o,
            s = module382.isModeCustomized(t.mode, t.waterMode, module422.DMM.isGarnet ? t.mopModeId : t.mopMode);
          if (
            (o = s
              ? module500.map_edit_bottom_menu_mode
              : module390.default.isPureCleanMopSupported()
              ? t.waterMode == module1326.WaterModeZero
                ? module500.robot_clean_status_only_clean
                : t.mode == module1326.CleanModeZero
                ? module500.robot_clean_status_only_mop
                : module500.robot_status_clean_mop_mode
              : '').length > 0
          )
            o = ' | ' + o;
          return s ? '' + n + o : '' + n + o + ' | ' + this.getModeText(t);
        },
      },
      {
        key: 'getModeText',
        value: function (t) {
          var n, o, s, l;

          if (
            ((n = module382.getCleanModeTitle(t.mode)),
            (module390.default.isElectronicWaterBoxSupported() || module390.default.isShakeMopSetSupported()) &&
              ((s = module382.getMopWaterOrStrengthTitle(t.waterMode)), (s = 200 == t.waterMode ? '' : s)),
            module390.default.isShakeMopSetSupported() && !module422.DMM.isGarnet && (l = module382.getMopMethodTitle(t.mopMode)),
            module422.DMM.isGarnet)
          ) {
            if (((o = module1327.getCleanMethods()[t.cleanMethod]), (l = t.mopModeName), t.cleanMethod == module1327.CleanMethodClean)) return o + ' | ' + n;
            if (t.cleanMethod == module1327.CleanMethodMop) return o + ' | ' + l;
            if (t.cleanMethod == module1327.CleanMethodCleanAndMop) return o + ' | ' + n + ' | ' + l;
          }

          return module390.default.isElectronicWaterBoxSupported()
            ? n + ' | ' + s
            : module390.default.isPureCleanMopSupported()
            ? t.waterMode == module1326.WaterModeZero
              ? n
              : t.mode == module1326.CleanModeZero
              ? s + ' | ' + l
              : n + ' | ' + s
            : module390.default.isShakeMopStrengthSupported()
            ? module390.default.isShakeMopSetSupported() && 200 != t.waterMode
              ? 301 == t.mopMode
                ? s + ' | ' + l
                : n + ' | ' + s + ' | ' + l
              : n + ' | ' + s
            : n;
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
            module12.View,
            {
              style: [
                G.containterView,
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
              module12.View,
              {
                style: {
                  alignSelf: 'stretch',
                },
              },
              T &&
                React.default.createElement(
                  module12.Text,
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
                  module500.standard_timer
                ),
              React.default.createElement(module502, {
                ref: function (t) {
                  n.swipeListView = t;
                },
                renderHiddenRow: this.renderHiddenRow.bind(this),
                disableLeftSwipe: A,
                disableRightSwipe: !A,
                stopLeftSwipe: A ? 111 : 0,
                stopRightSwipe: A ? 0 : -111,
                leftOpenValue: 111,
                rightOpenValue: -111,
                style: [
                  G.list,
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
              module12.View,
              {
                style: {
                  alignSelf: 'stretch',
                },
              },
              React.default.createElement(
                module12.Text,
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
                module500.smart_scene_timer
              ),
              React.default.createElement(module502, {
                ref: function (t) {
                  n.smartSceneListView = t;
                },
                renderHiddenRow: function (t, o, s, l) {
                  return n.renderHiddenRow(t, 1, s, l);
                },
                disableLeftSwipe: A,
                disableRightSwipe: !A,
                stopLeftSwipe: A ? 111 : 0,
                stopRightSwipe: A ? 0 : -111,
                leftOpenValue: 111,
                rightOpenValue: -111,
                style: [G.list],
                automaticallyAdjustContentInsets: false,
                enableEmptySections: true,
                dataSource: this.state.smartSceneTimers,
                renderRow: function (t, o, s) {
                  return n._renderRow(t, 1, s);
                },
              })
            ),
            v = React.default.createElement(
              module12.View,
              {
                style: G.emptyView,
              },
              React.default.createElement(module12.Image, {
                resizeMode: 'contain',
                style: G.emptyImage,
                source: o.timerListSetting.noDataIcon,
              }),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    G.emptyText,
                    {
                      color: o.timerListSetting.tipTextColor,
                    },
                  ],
                },
                module500.localization_strings_Setting_Timer_index_21
              )
            ),
            L = null;

          if (!this.state.loading)
            L =
              0 != (null != (u = null == (c = this.state.timerlist) ? undefined : c.length) ? u : 0) || T
                ? React.default.createElement(
                    module12.ScrollView,
                    {
                      style: {
                        alignSelf: 'stretch',
                      },
                      showsVerticalScrollIndicator: false,
                      refreshControl: React.default.createElement(module12.RefreshControl, {
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
            React.default.createElement(module12.View, {
              style: G.section,
            });
          else
            React.default.createElement(
              module12.Text,
              {
                style: [
                  G.topTip,
                  {
                    backgroundColor: o.settingListItem.backgroundColor,
                    color: o.timerListSetting.tipTextColor,
                  },
                ],
              },
              module500.timer_list_server_timer_tip
            );
          return React.default.createElement(
            module12.View,
            {
              style: [
                G.container,
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
            React.default.createElement(module1802.default, {
              ref: function (t) {
                n.newSwitchGuideView = t;
              },
              isModal: true,
              parent: this,
              bgImage: o.timerListSetting.guideImg,
              topTitle: module500.timer_guide_title,
              context: module500.timer_guide_title_info,
              hintText:
                module500.timer_guide_title_tip1 +
                '\n' +
                module500.timer_guide_title_tip2 +
                '\n' +
                (module381.RSM.multiFloorEnabled ? '* ' + module500.multi_map_timer_segment_select_bottom_tip + '\n' : '') +
                (1 == this.FCCState ? '* ' + module500.timer_list_server_timer_tip : ''),
              buttonInfo: [module500.localization_strings_Setting_RemoteControlPage_51],
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
            module12.View,
            {
              style: G.hiddenRow,
            },
            React.default.createElement(module12.View, {
              style: {
                width: 20,
                height: 20,
              },
            }),
            React.default.createElement(module385.PureImageButton, {
              funcId: 'timer_list_delete_button_' + o,
              image: require('./1847'),
              imageWidth: 26,
              imageHeight: 26,
              style: G.deleteButton,
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
                    t = module418.StorageKeys.TimerCleanbyGuide;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(t));

                  case 3:
                    if (((n = s.sent), !!n)) {
                      s.next = 9;
                      break;
                    }

                    s.next = 8;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(t, t));

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
    return N;
  })(React.default.Component);

exports.default = module1847;
module1847.contextType = module515.AppConfigContext;
var G = module12.StyleSheet.create({
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
    marginTop: module1153.NavigationBarHeight,
  },
  topTip: {
    width: module12.Dimensions.get('window').width,
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
    flexDirection: A ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    width: 96,
    alignSelf: A ? 'flex-start' : 'flex-end',
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

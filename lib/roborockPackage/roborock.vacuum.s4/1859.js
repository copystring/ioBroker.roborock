require('./407');

require('./388');

require('./1860');

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module377 = require('./377'),
  module1231 = require('./1231'),
  module386 = require('./386'),
  module483 = require('./483'),
  module415 = require('./415'),
  module506 = require('./506'),
  module378 = require('./378'),
  module1808 = require('./1808'),
  module411 = require('./411'),
  module1861 = require('./1861'),
  module1364 = require('./1364'),
  module383 = require('./383');

function P(t, n) {
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

function V(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      P(Object(o), true).forEach(function (n) {
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      P(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function O() {
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

require('./1862');

require('./394');

require('./1366');

require('./1367');

require('./1249');

require('./1368');

var module491 = require('./491').strings,
  module389 = require('./389'),
  module936 = require('./936'),
  module493 = require('./493'),
  F = module387.default.scaledPixel(95),
  N = globals.isRTL,
  module1871 = (function (t) {
    module7.default(j, t);

    var module49 = j,
      module506 = O(),
      P = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function j(t) {
      var n;
      module4.default(this, j);
      (n = P.call(this, t)).state = {
        timerlist: [],
        dataSource: new module483.default.DataSource({
          rowHasChanged: function (t, n) {
            return t !== n;
          },
        }),
        loading: true,
        refreshing: false,
        requestFailed: false,
        updating: false,
      };
      n.retryTime = 0;
      n.isInitial = true;
      n.FCCState = module377.RobotStatusManager.sharedManager().FCCState;
      return n;
    }

    module5.default(j, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.fetchListData(true);
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.configNavibar();
        },
      },
      {
        key: 'configNavibar',
        value: function () {
          var t = this,
            n = React.default.createElement(module381.PureImageButton, {
              style: A.guideButton,
              funcId: 'timer_setting_guide',
              accessibilityLabel: module491.accessibility_guide,
              image: this.context.theme.mapEdit.guideImg,
              onPress: this.onNavigationGuidePress.bind(this),
              imageWidth: 35,
              imageHeight: 35,
              enabled: true,
              imageStyle: {
                resizeMode: 'contain',
                width: 24,
                height: 24,
              },
              ref: function (n) {
                return (t.guideButton = n);
              },
            }),
            o = React.default.createElement(module381.PureImageButton, {
              style: A.confirmButton,
              funcId: 'timer_setting_add',
              accessibilityLabel: module491.accessibility_add,
              image: this.context.theme.timerListSetting.confirmButton,
              onPress: this.openSettingPage.bind(this, false, {}, 0),
              imageWidth: 35,
              imageHeight: 35,
              enabled: true,
              imageStyle: {
                resizeMode: 'contain',
                width: 24,
                height: 24,
              },
              ref: function (n) {
                return (t.addTimeButton = n);
              },
            });
          this.props.navigation.setParams({
            title: module491.localization_strings_Setting_index_3,
            rightItems: [n, o],
          });
        },
      },
      {
        key: 'fetchListData',
        value: function (t) {
          var o,
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
                    if (!(module1364.TLM.resultTimerList && 0 != module1364.TLM.resultTimerList.length)) t = true;
                    c.next = 6;
                    return regeneratorRuntime.default.awrap(module1364.TLM.fetchTimerList(t));

                  case 6:
                    if (module1364.TLM.resultTimerList || !(this.retryTime < 7)) {
                      c.next = 9;
                      break;
                    }

                    setTimeout(function () {
                      u.fetchListData(t);
                    }, 1e3);
                    return c.abrupt('return');

                  case 9:
                    l = null != (o = module1364.TLM.resultTimerList) ? o : [];
                    console.log('fetchTimerList ' + module1364.TLM.resultTimerList);
                    this.finishLoading();
                    this.retryTime = 0;
                    this.setState({
                      loading: false,
                      refreshing: false,
                      timerlist: l,
                      dataSource: this.state.dataSource.cloneWithRows(l),
                    });
                    module383.LogEventStatus('timer_list', {
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
                      globals.showToast(module491.robot_communication_exception);
                      console.log('fetchTimerList  error: ' + ('string' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));
                    }

                  case 20:
                    if (module386.default.isMultiFloorSupported() && this.isInitial) {
                      this.isInitial = false;
                      module1231.MM.getMultiMaps();
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
        key: 'refreshListData',
        value: function () {
          var t = this;

          if (!(this.state.refreshing || this.isInitial)) {
            this.disableAddButton();
            this.setState({
              requestFailed: false,
              loading: false,
              refreshing: true,
              updating: true,
            });
            setTimeout(function () {
              var o, s;
              return regeneratorRuntime.default.async(
                function (l) {
                  for (;;)
                    switch ((l.prev = l.next)) {
                      case 0:
                        l.prev = 0;
                        l.next = 3;
                        return regeneratorRuntime.default.awrap(module1364.TLM.fetchTimerList(true));

                      case 3:
                        s = null != (o = module1364.TLM.resultTimerList) ? o : [];
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
                        globals.showToast(module491.robot_communication_exception);
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
        },
      },
      {
        key: 'pageDeleteServerTimer',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module1364.TLM.deleteServerTimer(t));

                  case 2:
                    this.swipeListView.safeCloseOpenRow();
                    this.refreshListData();

                  case 4:
                  case 'end':
                    return o.stop();
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
          var o, module49, l;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    u.prev = 0;
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(module1364.TLM.deleteRobotTimer(t));

                  case 3:
                    module49 = u.sent;
                    this.swipeListView.safeCloseOpenRow();
                    console.log('deleteRobotTimer --   ' + JSON.stringify(module49));
                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module1364.TLM.fetchTimerList(false));

                  case 8:
                    l = null != (o = module1364.TLM.resultTimerList) ? o : [];
                    console.log('deleteRobotTimer --   ' + JSON.stringify(l));
                    this.setState({
                      timerlist: l,
                      dataSource: this.state.dataSource.cloneWithRows(l),
                    });
                    u.next = 16;
                    break;

                  case 13:
                    u.prev = 13;
                    u.t0 = u.catch(0);
                    console.log('deleteRobotTimer  error: ' + ('string' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                  case 16:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[0, 13]],
            Promise
          );
        },
      },
      {
        key: 'openSettingPage',
        value: function (t, n, o) {
          var s = this;
          if (0 == Object.keys(n).length && (module1364.TLM.totalTimerCount >= 10 || this.state.timerlist.length >= 10))
            this.alert.alert('', module491.localization_strings_Setting_Timer_index_10, [
              {
                text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {},
              },
            ]);
          else {
            s.props.navigation.navigate(
              'TimerSettingPage',
              V(
                V({}, n),
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
        value: function (t) {
          var n = this.state.timerlist[t];
          this.openSettingPage(true, n, module389.isMiApp && 1 == this.FCCState ? module1364.TLM.miTimerScenes[t] : 0);
        },
      },
      {
        key: 'deleteTimerWithIndex',
        value: function (t) {
          var n = this;
          this.state.timerlist[t];
          this.alert.alert(module491.localization_strings_Setting_Timer_index_13, '', [
            {
              text: module491.localization_strings_Main_MainPage_11,
              onPress: function () {
                module383.LogEventCommon('delete_timer_cancel');
              },
            },
            {
              text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                module383.LogEventCommon('delete_timer_confirm');
                if (1 == n.FCCState) n.pageDeleteServerTimer(t);
                else n.deleteRobotTimer(t);
              },
            },
          ]);
        },
      },
      {
        key: 'timerSwitchDidChange',
        value: function (t, o) {
          var module49;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    module49 = this.state.timerlist[t];
                    this.setTimerRowEnabed(t, o);
                    l.prev = 2;
                    l.next = 5;
                    return regeneratorRuntime.default.awrap(module1364.TLM.updateTimerOnStatus(t, module49, o));

                  case 5:
                    l.next = 12;
                    break;

                  case 7:
                    l.prev = 7;
                    l.t0 = l.catch(2);
                    console.log('update Timer  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));
                    this.setTimerRowEnabed(t, !o);
                    globals.showToast(module491.localization_strings_Setting_Timer_index_11);

                  case 12:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[2, 7]],
            Promise
          );
        },
      },
      {
        key: 'setTimerRowEnabed',
        value: function (t, n) {
          var o = JSON.parse(JSON.stringify(this.state.timerlist));
          o[t].enabled = n;
          this.setState({
            timerlist: o,
            dataSource: this.state.dataSource.cloneWithRows(o),
          });
        },
      },
      {
        key: '_renderRow',
        value: function (t, n, s) {
          var l = this,
            u = this.context.theme.settingListItem,
            c = '0' != t.segments && 'ok' != t.segments ? module491.home_bottom_menu_select_zone : module491.home_bottom_menu_global,
            f = React.default.createElement(
              module12.View,
              {
                style: [
                  A.infoViewOutline,
                  {
                    marginRight: globals.isRTL ? 20 : 0,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: A.infoView,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: A.timeInfoView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        A.title,
                        {
                          color: u.titleColor,
                        },
                      ],
                    },
                    t.cleanTime
                  ),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: A.label,
                    },
                    module491.timer_list_title_begin
                  ),
                  React.default.createElement(
                    module12.Text,
                    {
                      numberOfLines: 1,
                      style: [
                        A.bottomInfo,
                        {
                          flex: 1,
                          color: u.detailColor,
                        },
                      ],
                    },
                    '' + t.repeatModeText
                  )
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: A.timeInfoView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        A.bottomInfo,
                        {
                          color: u.detailColor,
                        },
                      ],
                    },
                    '' + this.getBottomText(t, c)
                  ),
                  this.hasMopStyleText(t) &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          A.bottomInfo,
                          {
                            color: u.detailColor,
                          },
                        ],
                      },
                      ' | '
                    ),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        A.bottomInfo,
                        {
                          color: '#EB0029',
                        },
                      ],
                    },
                    '' + this.getMopStyleText(t)
                  ),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: A.bottomInfo,
                    },
                    module387.default.isRRAndroid() ? '\n' : ' '
                  )
                )
              )
            ),
            h =
              !t.disable &&
              React.default.createElement(module381.ToggleSwitch, {
                funcId: 'timer_list_switch_' + s,
                style: A.toggleSwitch,
                onColor: '#3384FF',
                onToggle: function (t) {
                  return l.timerSwitchDidChange(s, t);
                },
                isOn: t.enabled,
              });
          return React.default.createElement(
            module12.TouchableHighlight,
            module21.default({}, module387.default.getAccessibilityLabel('TimerSettingList_' + s), {
              delayLongPress: 500,
              onLongPress: function () {
                return l.deleteTimerWithIndex(s);
              },
              onPress: function () {
                return l.onPressRow(s);
              },
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  A.rowContainer,
                  {
                    backgroundColor: u.backgroundColor,
                  },
                ],
              },
              0 == s &&
                React.default.createElement(module12.View, {
                  style: [
                    A.topLine,
                    {
                      backgroundColor: u.borderColor,
                    },
                  ],
                }),
              React.default.createElement(
                module12.View,
                {
                  style: A.rowView,
                },
                globals.isRTL && h,
                globals.isRTL && f,
                !globals.isRTL && f,
                !globals.isRTL && h
              ),
              React.default.createElement(module12.View, {
                style: [
                  A.bottomLine,
                  {
                    backgroundColor: u.borderColor,
                    marginLeft: s == this.state.timerlist.length - 1 ? 0 : 20,
                  },
                ],
              })
            )
          );
        },
      },
      {
        key: 'getBottomText',
        value: function (t, n) {
          if (t.disable) return module491.timer_disable;
          var o = module378.isModeCustomized(t.mode, t.waterMode, t.mopMode);
          return (n ? n + ' | ' : '') + (o ? this.getCustomText(t) : this.getModeText(t));
        },
      },
      {
        key: 'hasMopStyleText',
        value: function (t) {
          return (200 == t.waterMode || 301 == t.mopMode) && !t.disable;
        },
      },
      {
        key: 'getMopStyleText',
        value: function (t) {
          return t.disable ? '' : 200 == t.waterMode ? '' + module491.robot_clean_status_only_clean : 301 == t.mopMode ? '' + module491.robot_clean_status_only_mop : '';
        },
      },
      {
        key: 'getCustomText',
        value: function (t) {
          if (module415.DMM.isGarnet) {
            var n = module1861.getCleanMethods()[t.cleanMethod];
            return module491.map_edit_bottom_menu_mode + ' | ' + n;
          }

          return module491.map_edit_bottom_menu_mode;
        },
      },
      {
        key: 'isWaterModeSeries',
        value: function () {
          return module386.default.isElectronicWaterBoxSupported() || module386.default.isShakeMopSetSupported();
        },
      },
      {
        key: 'getModeText',
        value: function (t) {
          var n, o, s, l;

          if (
            ((n = module378.getCleanModeTitle(t.mode)),
            this.isWaterModeSeries() && ((s = module378.getMopWaterOrStrengthTitle(t.waterMode)), (s = 200 == t.waterMode ? '' : s)),
            module386.default.isShakeMopSetSupported() && !module415.DMM.isGarnet && (l = module378.getMopMethodTitle(t.mopMode)),
            module415.DMM.isGarnet)
          ) {
            if (((o = module1861.getCleanMethods()[t.cleanMethod]), (l = t.mopModeName), t.cleanMethod == module1861.CleanMethodClean)) return o + ' | ' + n;
            if (t.cleanMethod == module1861.CleanMethodMop) return o + ' | ' + l;
            if (t.cleanMethod == module1861.CleanMethodCleanAndMop) return o + ' | ' + n + ' | ' + l;
          }

          return module386.default.isElectronicWaterBoxSupported()
            ? n + ' | ' + s
            : module386.default.isShakeMopStrengthSupported()
            ? module386.default.isShakeMopSetSupported() && 200 != t.waterMode
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
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(module381.RequestRetryView, {
              onPressButton: function () {
                t.fetchListData(true);
              },
            });
          if (this.state.requestFailed) return o;
          var s = React.default.createElement(
            module12.View,
            {
              style: [
                A.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ],
            },
            React.default.createElement(module381.Spinner, null)
          );
          if (this.state.loading) return s;
          var l = React.default.createElement(module493, {
              ref: function (n) {
                t.swipeListView = n;
              },
              renderHiddenRow: this.renderHiddenRow.bind(this),
              disableLeftSwipe: N,
              disableRightSwipe: !N,
              stopLeftSwipe: N ? F : 0,
              stopRightSwipe: N ? 0 : -F,
              leftOpenValue: F,
              rightOpenValue: -F,
              style: [
                A.list,
                {
                  backgroundColor: 'transparent',
                },
              ],
              refreshControl: React.default.createElement(module12.RefreshControl, {
                refreshing: this.state.refreshing,
                onRefresh: function () {
                  return t.refreshListData();
                },
              }),
              automaticallyAdjustContentInsets: false,
              enableEmptySections: true,
              dataSource: this.state.dataSource,
              renderRow: this._renderRow.bind(this),
            }),
            u = React.default.createElement(
              module12.View,
              {
                style: A.emptyView,
              },
              React.default.createElement(module12.Image, {
                resizeMode: 'contain',
                style: A.emptyImage,
                source: n.timerListSetting.noDataIcon,
              }),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    A.emptyText,
                    {
                      color: n.timerListSetting.tipTextColor,
                    },
                  ],
                },
                module491.localization_strings_Setting_Timer_index_21
              )
            ),
            c = null;
          if (!this.state.loading) c = this.state.timerlist && this.state.timerlist.length > 0 ? l : u;
          var f =
            this.state.loading || 1 != this.FCCState
              ? React.default.createElement(module12.View, {
                  style: A.section,
                })
              : React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      A.topTip,
                      {
                        backgroundColor: n.settingListItem.backgroundColor,
                        color: n.timerListSetting.tipTextColor,
                      },
                    ],
                  },
                  module491.timer_list_server_timer_tip
                );
          return React.default.createElement(
            module12.View,
            {
              style: [
                A.container,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            f,
            c,
            React.default.createElement(module381.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            }),
            React.default.createElement(module1808.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              isModal: true,
              parent: this,
              bgImage: n.timerListSetting.guideImg,
              topTitle: module491.timer_guide_title,
              context: module491.timer_guide_title_info,
              hintText:
                module491.timer_guide_title_tip1 +
                '\n' +
                module491.timer_guide_title_tip2 +
                '\n' +
                (module377.RSM.multiFloorEnabled ? '* ' + module491.multi_map_timer_segment_select_bottom_tip + '\n' : '') +
                (1 == this.FCCState ? '* ' + module491.timer_list_server_timer_tip : ''),
              buttonInfo: [module491.localization_strings_Setting_RemoteControlPage_51],
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
              style: A.hiddenRow,
            },
            React.default.createElement(module12.View, {
              style: {
                width: 20,
                height: 20,
              },
            }),
            React.default.createElement(module381.PureImageButton, {
              funcId: 'timer_list_delete_button_' + o,
              image: require('./1871'),
              imageWidth: 26,
              imageHeight: 26,
              style: A.deleteButton,
              onPress: function () {
                l.deleteTimerWithIndex(o);
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
          var t, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    t = module411.StorageKeys.TimerCleanbyGuide;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(t));

                  case 3:
                    if (((o = s.sent), !!o)) {
                      s.next = 9;
                      break;
                    }

                    s.next = 8;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(t, t));

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
    return j;
  })(React.default.Component);

exports.default = module1871;
module1871.contextType = module506.AppConfigContext;
var A = module12.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 0,
    marginTop: module936.NavigationBarHeight,
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
    flex: 1,
    alignSelf: 'stretch',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    height: F - 2,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 20,
    backgroundColor: 'white',
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
    marginRight: 5,
  },
  label: {
    fontSize: module387.default.scaledPixel(13),
    color: 'rgba(0,0,0,0.4)',
  },
  bottomInfo: {
    marginTop: 5,
    fontSize: module387.default.scaledPixel(13),
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
    width: F,
    alignSelf: N ? 'flex-start' : 'flex-end',
    height: F - 2,
    paddingHorizontal: 10,
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
  topLine: {
    width: module12.Dimensions.get('window').width,
    height: 0.8,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottomLine: {
    width: module12.Dimensions.get('window').width,
    height: 0.8,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

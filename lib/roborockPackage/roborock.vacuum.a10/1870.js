var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module386 = require('./386'),
  module381 = require('./381'),
  module483 = require('./483'),
  module1871 = require('./1871'),
  module407 = require('./407'),
  module1873 = require('./1873'),
  module383 = require('./383'),
  module411 = require('./411'),
  module506 = require('./506'),
  module415 = require('./415');

function x() {
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

require('./1364');

require('./385');

var module491 = require('./491').strings,
  module493 = require('./493'),
  module1366 = require('./1366'),
  module394 = require('./394'),
  N = module394.fromSecToMin,
  P = module394.fromSqmmToSqm,
  module934 = require('./934'),
  V = globals.isRTL,
  module1869 = (function (t) {
    module7.default(z, t);

    var module506 = z,
      module394 = x(),
      module1876 = function () {
        var t,
          o = module11.default(module506);

        if (module394) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function z(t) {
      var o;
      module4.default(this, z);
      (o = module1876.call(this, t)).hasFetchedRecordCount = 0;
      o.totalRecordCount = 0;
      o.cleanRecords = [];
      o.unMount = false;
      o.records = {};
      o.state = {
        totalTime: 0,
        totalArea: 0,
        totalCount: 0,
        dustCollectionCount: 0,
        mopCount: 0,
        cleanRollerCount: 0,
        data: [],
        dataSource: new module483.default.DataSource({
          rowHasChanged: function (t, o) {
            return t !== o;
          },
        }),
        loaded: false,
        refreshing: false,
        showDelete: true,
        isNoData: false,
        areaUnit: Utils.getAreaUnit(),
      };
      return o;
    }

    module5.default(z, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.focusListener = this.props.navigation.addListener('didFocus', function () {
            t.updateNavBarSwitcher(false);
          });
          this.feedbackCallback = this.props.navigation.getParam('feedbackCallback', null);
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.fetchData();
          this.areaUnitListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.AreaUnitChange, function (o) {
            if (!t.unMount)
              t.setState({
                areaUnit: Utils.getAreaUnit(),
              });
          });
          this.props.navigation.setParams({
            hiddenBottomLine: !module415.DMM.isGarnet,
          });
        },
      },
      {
        key: 'testUI',
        value: function () {
          this.cleanRecords = require('./1876');
          this.updateListData(this.cleanRecords);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.unMount = true;
          if (this.areaUnitListener) this.areaUnitListener.remove();
          if (this.focusListener) this.focusListener.remove();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            n = React.default.createElement(
              module12.View,
              {
                style: F.emptyView,
              },
              React.default.createElement(module12.Image, {
                resizeMode: 'contain',
                style: F.emptyImage,
                source: o.cleanHistory.noDataIcon,
              }),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    F.emptyText,
                    {
                      color: o.cleanHistory.subTitleColor,
                    },
                  ],
                },
                module491.have_no_data
              )
            );
          console.log('HistoryPage render');
          return React.default.createElement(
            module12.View,
            {
              style: [
                F.container,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(module12.View, {
              style: [
                F.topView,
                {
                  backgroundColor: o.navBackgroundColor,
                },
              ],
            }),
            React.default.createElement(module1871.default, {
              style: [
                {
                  borderBottomWidth: 0.8,
                  borderColor: o.cleanHistory.lineColor,
                  marginTop: module934.NavigationBarHeight,
                  minHeight: 100,
                },
                {
                  backgroundColor: o.componentBackgroundColor,
                },
              ],
              unitFontSize: 14,
              valueFontSize: 26,
              titleFontSize: 14,
              justifyContent: 'center',
              alignItems: 'center',
              mainTitleShouldShowLine: true,
              shouldShowLine: true,
              data: [
                {
                  title: module491.localization_strings_Setting_History_index_8,
                  unit: this.getTimeUnit(),
                  value: this.state.loaded ? this.formatTimeNumber(this.state.totalTime) : '--',
                },
                {
                  title: module491.clean_history_total_area,
                  unit: this.state.areaUnit,
                  value: this.state.loaded
                    ? this.formatAreaNumber(this.state.totalArea < 1e6 ? Utils.areaConvert((this.state.totalArea / 1e6).toFixed(1)) : Utils.areaConvert(P(this.state.totalArea)))
                    : '--',
                },
                {
                  title: module491.localization_strings_Setting_History_index_12,
                  unit: "'",
                  value: this.state.loaded ? this.formatCount(this.state.totalCount) : '--',
                },
              ],
              mainTitleData: [
                {
                  title: module491.localization_strings_Setting_History_index_8,
                  unit: this.getTimeUnit(),
                  value: this.state.loaded ? this.formatTimeNumber(this.state.totalTime) : '--',
                },
                {
                  title: module491.clean_history_total_area,
                  unit: this.state.areaUnit,
                  value: this.state.loaded
                    ? this.formatAreaNumber(this.state.totalArea < 1e6 ? Utils.areaConvert((this.state.totalArea / 1e6).toFixed(1)) : Utils.areaConvert(P(this.state.totalArea)))
                    : '--',
                },
              ],
              subTitleData: [
                {
                  title: module491.clean_history_mop_sweep,
                  unit: ' ',
                  value: this.state.loaded ? this.formatCount(this.state.totalCount) : '--',
                  icon: require('./1877'),
                },
                {
                  title: module491.clean_history_mop_time,
                  unit: ' ',
                  value: this.state.loaded ? this.formatCount(this.state.mopCount) : '--',
                  icon: require('./1878'),
                },
                {
                  title: module491.clean_history_mop_swap_time,
                  unit: ' ',
                  value: this.state.loaded ? this.formatCount(this.state.cleanRollerCount) : '--',
                  icon: require('./1879'),
                },
              ],
            }),
            this.state.isNoData
              ? n
              : React.default.createElement(module493, {
                  ref: function (o) {
                    t.listView = o;
                  },
                  renderHiddenRow: this.renderHiddenRow.bind(this),
                  disableLeftSwipe: false,
                  disableRightSwipe: false,
                  stopLeftSwipe: V ? 110 : 3,
                  stopRightSwipe: V ? -3 : -110,
                  leftOpenValue: 82,
                  rightOpenValue: -82,
                  refreshControl: React.default.createElement(module12.RefreshControl, {
                    refreshing: this.state.refreshing,
                    onRefresh: function () {
                      return t.refresh();
                    },
                  }),
                  style: [
                    F.list,
                    {
                      backgroundColor: o.settingBackgroundColor,
                    },
                  ],
                  dataSource: this.state.dataSource,
                  enableEmptySections: true,
                  renderRow: this.renderRow.bind(this),
                }),
            React.default.createElement(module381.LoadingView, {
              ref: function (o) {
                t.loadingView = o;
              },
            }),
            this.state.loaded || this.state.refreshing
              ? React.default.createElement(module12.View, null)
              : React.default.createElement(module381.Spinner, {
                  style: {
                    position: 'absolute',
                    alignSelf: 'center',
                  },
                }),
            React.default.createElement(module381.AlertView, {
              ref: function (o) {
                return (t.alert = o);
              },
            })
          );
        },
      },
      {
        key: 'updateNavBarSwitcher',
        value: function (t) {
          this.props.navigation.setParams({
            navBarBackgroundColor: t ? 'transparent' : this.context.theme.navBarBackgroundColor,
          });
        },
      },
      {
        key: 'formatTimeNumber',
        value: function (t) {
          if (!t) return 0;

          if ('h' == this.timeUnit) {
            var o = t / 3600;
            return o > 9999 ? Math.round(o / 1e3) + 'K' : Math.round(o);
          }

          return 'min' == this.timeUnit ? Math.round(t / 60) : t;
        },
      },
      {
        key: 'formatAreaNumber',
        value: function (t) {
          return t ? (t < 1 ? t : t <= 9999 ? t : Math.round(t / 1e3) + 'K') : 0;
        },
      },
      {
        key: 'formatCount',
        value: function (t) {
          return t ? (t > 9999 ? Math.round(t / 1e3) + 'K' : Math.round(t)) : 0;
        },
      },
      {
        key: 'getTimeUnit',
        value: function () {
          var t = this.state.totalTime;

          if (t > 59940) {
            this.timeUnit = 'h';
            return 'h';
          } else if (t >= 60) {
            this.timeUnit = 'min';
            return 'min';
          } else {
            this.timeUnit = 's';
            return 's';
          }
        },
      },
      {
        key: 'renderRow',
        value: function (t, o, n, s) {
          var l = this,
            u = module1366.utcTimeConvertToPhoneTimeZoneTime(1e3 * t.start);
          console.log('rowData = ' + t);
          var c = module1366.addZeroPrefix(u.month) + '/' + module1366.addZeroPrefix(u.day) + ' ' + module1366.addZeroPrefix(u.hour) + ':' + module1366.addZeroPrefix(u.minute),
            h = module934.CleanStartType()[t.startType] || module491.localization_strings_Setting_General_index_0,
            p = [module491.home_bottom_menu_global, module491.home_bottom_menu_draw_zone, module491.home_bottom_menu_select_zone][t.cleanType - 1],
            _ = t.area;
          _ = _ < 1e6 ? (_ / 1e6).toFixed(1) : P(_);
          var v = t.time < 60 ? t.time + 's' : N(t.time) + 'min',
            C =
              p +
              ' | ' +
              (t.cleanMop
                ? [module491.localization_strings_Main_MainPage_3, module491.clean_method_mop, module491.clean_method_clean_and_mop, module491.clean_method_clean_and_mop][
                    t.cleanMop
                  ]
                : module491.localization_strings_Main_MainPage_3) +
              '   ' +
              Utils.getAreaUnitValue(_) +
              this.state.areaUnit +
              ' | ' +
              v;
          if (module386.default.isNewDataForCleanHistoryDetail() && t.dustCollectionStatus) C = C + ' | ' + module491.dust_collection_status_1;
          return React.default.createElement(module1873.default, {
            style: F.recordItemView,
            isLast: n == this.state.data.length - 1,
            onShowUnderlay: this.onShowUnderlay.bind(this),
            onHideUnderlay: this.onHideUnderlay.bind(this),
            cleanTime: '' + c,
            startType: h,
            bottomText: C,
            isCleanFinished: 0 != t.status,
            onPress: this.onPressRow.bind(this, t),
            onLongPress: function () {
              return l.deleteHistoryWithIndex(t, o, n, s);
            },
            accessibilityLabelKey: 'CleanRecordItemView_' + n,
          });
        },
      },
      {
        key: 'onShowUnderlay',
        value: function () {
          this.setState({
            showDelete: false,
          });
        },
      },
      {
        key: 'onHideUnderlay',
        value: function () {
          this.setState({
            showDelete: true,
          });
        },
      },
      {
        key: 'renderHiddenRow',
        value: function (t, o, n, s) {
          var l = this;
          return this.state.showDelete
            ? React.default.createElement(
                module12.View,
                {
                  style: F.hiddenRow,
                },
                React.default.createElement(module12.View, {
                  style: {
                    width: 20,
                    height: 20,
                  },
                }),
                React.default.createElement(module381.PureImageButton, {
                  funcId: 'CleanHistoryDelete_' + n,
                  image: require('./1869'),
                  imageWidth: 26,
                  imageHeight: 26,
                  style: F.deleteButton,
                  onPress: function () {
                    l.deleteRecord(t, o, n, s);
                  },
                })
              )
            : React.default.createElement(module12.View, null);
        },
      },
      {
        key: 'onPressRow',
        value: function (t) {
          module383.LogEventStat(module383.LogEventMap.CleanRecordDetailPage);
          module383.LogEventCommon('tap_clean_record_item');
          var o = null;

          if (this.feedbackCallback) {
            o = this.feedbackCallback;
            this.props.navigation.pop();
          }

          this.props.navigation.navigate('CleanRecordDetailPage', {
            time: t.time,
            area: t.area,
            avoidCount: t.avoidCount,
            start: t.start,
            parent: t.parent,
            status: t.status,
            finishReasonCode: t.finishReasonCode,
            dustCollectionStatus: t.dustCollectionStatus,
            title: module491.setting_history_detail,
            startType: t.startType,
            cleanType: t.cleanType,
            cleanMop: t.cleanMop,
            washCount: t.washCount,
            washTime: t.washTime,
            feedbackCallback: o,
          });
        },
      },
      {
        key: 'updateListData',
        value: function (t) {
          this.setState({
            data: t,
            dataSource: this.state.dataSource.cloneWithRows(t),
            loaded: true,
            refreshing: false,
          });
        },
      },
      {
        key: 'forceRefreshForTestMode',
        value: function () {
          var t = JSON.parse(JSON.stringify(this.state.data));
          this.setState({
            data: t,
            dataSource: this.state.dataSource.cloneWithRows(t),
          });
        },
      },
      {
        key: 'refresh',
        value: function () {
          if (!this.state.refreshing && this.state.loaded) {
            this.setState({
              refreshing: true,
            });
            this.fetchData();
          }
        },
      },
      {
        key: 'fetchData',
        value: function () {
          var t,
            s,
            l,
            u,
            c,
            h,
            f,
            p,
            _,
            v = this;

          return regeneratorRuntime.default.async(
            function (C) {
              for (;;)
                switch ((C.prev = C.next)) {
                  case 0:
                    C.prev = 0;
                    this.cleanRecords = [];
                    this.hasFetchedRecordCount = 0;
                    C.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.getCleanSummary());

                  case 5:
                    t = C.sent;
                    console.log('History Summary - ' + JSON.stringify(t) + ' ' + module386.default.isNewDataForCleanHistory());

                    if (module386.default.isNewDataForCleanHistory()) {
                      s = t.result.clean_time;
                      l = t.result.clean_area;
                      u = t.result.clean_count;
                      c = t.result.records;
                      h = t.result.dust_collection_count;
                      f = t.result.mop_count;
                      p = t.result.wash_count;
                    } else {
                      _ = module22.default(t.result, 4);
                      s = _[0];
                      l = _[1];
                      u = _[2];
                      c = _[3];
                    }

                    if (!this.unMount)
                      this.setState({
                        totalArea: l,
                        totalTime: s,
                        totalCount: u,
                        dustCollectionCount: h,
                        mopCount: f,
                        cleanRollerCount: p,
                      });
                    if (0 == c.length) {
                      if (!this.unMount)
                        this.setState({
                          loaded: true,
                          refreshing: false,
                          isNoData: true,
                        });
                    } else {
                      this.totalRecordCount = c.length;
                      c.forEach(function (t) {
                        if (t > 1451577600) v.fetchRecordDetail(t);
                        else v.totalRecordCount--;
                      });
                    }
                    C.next = 17;
                    break;

                  case 12:
                    C.prev = 12;
                    C.t0 = C.catch(0);
                    globals.showToast(module491.localization_strings_Setting_History_index_1);
                    if (!this.unMount)
                      this.setState({
                        loaded: true,
                        refreshing: false,
                      });
                    console.log('getClean History Summary  error: ' + ('object' == typeof C.t0 ? JSON.stringify(C.t0) : C.t0));

                  case 17:
                  case 'end':
                    return C.stop();
                }
            },
            null,
            this,
            [[0, 12]],
            Promise
          );
        },
      },
      {
        key: 'fetchRecordDetail',
        value: function (t) {
          var s, l, u, c, h, f, p, _, v, C, S, R, b, T, k, x;

          return regeneratorRuntime.default.async(
            function (D) {
              for (;;)
                switch ((D.prev = D.next)) {
                  case 0:
                    D.prev = 0;
                    D.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getCleanRecord(t));

                  case 3:
                    s = D.sent;
                    console.log('fetchRecordDetail - ' + t + ' - ' + JSON.stringify(s));

                    if (module386.default.isNewDataForCleanHistoryDetail()) {
                      l = s.result[0].begin;
                      u = s.result[0].end;
                      c = s.result[0].duration;
                      h = s.result[0].area;
                      f = s.result[0].error;
                      p = s.result[0].complete;
                      _ = s.result[0].start_type;
                      v = s.result[0].clean_type;
                      C = s.result[0].finish_reason;
                      S = s.result[0].dust_collection_status;
                      R = s.result[0].avoid_count;
                      b = s.result[0].clean_mop;
                      T = s.result[0].wash_count;
                      k = s.result[0].wash_time;
                      console.log(
                        'fetchRecordDetail - start:' +
                          l +
                          ' - stop:' +
                          u +
                          ' - time:' +
                          c +
                          ' - error' +
                          f +
                          ' - status: ' +
                          p +
                          ' - startType: ' +
                          _ +
                          ' - cleanType: ' +
                          v +
                          ' - finishReasonCode: ' +
                          C +
                          '  - dustCollectionStatus: ' +
                          S
                      );
                    } else {
                      x = module22.default(s.result[0], 9);
                      l = x[0];
                      u = x[1];
                      c = x[2];
                      h = x[3];
                      f = x[4];
                      p = x[5];
                      _ = x[6];
                      v = x[7];
                      C = x[8];
                    }

                    this.cleanRecords.push({
                      start: l,
                      stop: u,
                      time: c,
                      area: h,
                      avoidCount: R,
                      error: f,
                      status: p,
                      startType: _,
                      cleanType: v,
                      finishReasonCode: C,
                      dustCollectionStatus: S,
                      cleanMop: b,
                      washCount: T,
                      washTime: k,
                    });
                    this.hasFetchedRecordCount++;
                    console.log(this.hasFetchedRecordCount + ' -- ' + this.totalRecordCount);
                    this.checkShouldUpdateRecords();
                    D.next = 17;
                    break;

                  case 12:
                    D.prev = 12;
                    D.t0 = D.catch(0);
                    console.log('fetchRecordDetail  error: ' + ('object' == typeof D.t0 ? JSON.stringify(D.t0) : D.t0));
                    this.hasFetchedRecordCount++;
                    this.checkShouldUpdateRecords();

                  case 17:
                  case 'end':
                    return D.stop();
                }
            },
            null,
            this,
            [[0, 12]],
            Promise
          );
        },
      },
      {
        key: 'checkShouldUpdateRecords',
        value: function () {
          if (this.hasFetchedRecordCount >= this.totalRecordCount) {
            this.cleanRecords = this.cleanRecords.sort(function (t, o) {
              return o.start - t.start;
            });
            console.log(
              'all records - ' + JSON.stringify(this.cleanRecords) + ' - ' + this.totalRecordCount + ' - ' + this.hasFetchedRecordCount + ' - ' + this.cleanRecords.length
            );
            this.updateListData(this.cleanRecords);
          }
        },
      },
      {
        key: 'deleteRecord',
        value: function (t, n, s, l) {
          var u = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    console.log('deleteRecord -' + JSON.stringify(t));
                    if (this.loadingView) this.loadingView.showWithText();
                    setTimeout(function () {
                      var c;
                      return regeneratorRuntime.default.async(
                        function (h) {
                          for (;;)
                            switch ((h.prev = h.next)) {
                              case 0:
                                h.prev = 0;
                                h.next = 3;
                                return regeneratorRuntime.default.awrap(module407.default.deleteCleanRecord(t.start));

                              case 3:
                                if (u.loadingView) u.loadingView.hide();
                                l['' + n + s].closeRow();
                                u.cleanRecords.splice(s, 1);
                                c = JSON.parse(JSON.stringify(u.cleanRecords));
                                u.setState({
                                  data: c,
                                  dataSource: u.state.dataSource.cloneWithRows(c),
                                });
                                globals.showToast(module491.rubys_history_del_toast_succ);
                                h.next = 17;
                                break;

                              case 12:
                                h.prev = 12;
                                h.t0 = h.catch(0);
                                if (u.loadingView) u.loadingView.hide();
                                globals.showToast(module491.rubys_history_del_toast_failed);
                                console.log('deleteRecord  error: ' + ('object' == typeof h.t0 ? JSON.stringify(h.t0) : h.t0));

                              case 17:
                              case 'end':
                                return h.stop();
                            }
                        },
                        null,
                        null,
                        [[0, 12]],
                        Promise
                      );
                    }, 1e3);

                  case 3:
                  case 'end':
                    return c.stop();
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
        key: 'deleteHistoryWithIndex',
        value: function (t, o, n, s) {
          var l = this;
          this.alert.alert(module491.whether_to_delete_the_recorded, '', [
            {
              text: module491.localization_strings_Main_MainPage_11,
              onPress: function () {},
            },
            {
              text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                setTimeout(function () {
                  l.deleteRecord(t, o, n, s);
                }, 100);
              },
            },
          ]);
        },
      },
    ]);
    return z;
  })(React.default.Component);

exports.default = module1869;
module1869.contextType = module506.AppConfigContext;
var F = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#f5f5f5',
    marginBottom: 0,
  },
  topView: {
    position: 'absolute',
    width: module12.Dimensions.get('window').width,
    height: 200,
    left: 0,
    top: -100,
  },
  list: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignSelf: 'stretch',
    paddingTop: 5,
  },
  recordItemView: {
    height: 72,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  hiddenRow: {
    flexDirection: V ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    width: 70,
    alignSelf: 'center',
    height: 70,
    borderRadius: 8,
    marginTop: 8,
    marginHorizontal: 17,
    paddingHorizontal: 15,
    backgroundColor: 'red',
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
});

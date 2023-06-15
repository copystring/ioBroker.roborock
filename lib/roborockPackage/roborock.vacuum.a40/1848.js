var regeneratorRuntime = require('regenerator-runtime'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module390 = require('./390'),
  module385 = require('./385'),
  module491 = require('./491'),
  module1849 = require('./1849'),
  module414 = require('./414'),
  module1851 = require('./1851'),
  module387 = require('./387'),
  module418 = require('./418'),
  module515 = require('./515'),
  module422 = require('./422');

function x() {
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
  module502 = require('./502'),
  module1513 = require('./1513'),
  module398 = require('./398'),
  P = module398.fromSecToMin,
  E = module398.fromSqmmToSqm,
  module1153 = require('./1153'),
  V = globals.isRTL,
  module1847 = (function (t) {
    module7.default(z, t);

    var module515 = z,
      module398 = x(),
      module1854 = function () {
        var t,
          o = module11.default(module515);

        if (module398) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function z(t) {
      var o;
      module4.default(this, z);
      (o = module1854.call(this, t)).hasFetchedRecordCount = 0;
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
        dataSource: new module491.default.DataSource({
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
          this.feedbackCallback = this.props.navigation.getParam('feedbackCallback', null);
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.fetchData();
          this.areaUnitListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.AreaUnitChange, function (o) {
            if (!t.unMount)
              t.setState({
                areaUnit: Utils.getAreaUnit(),
              });
          });
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: !module422.DMM.isGarnet,
          });
        },
      },
      {
        key: 'testUI',
        value: function () {
          this.cleanRecords = require('./1854');
          this.updateListData(this.cleanRecords);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.unMount = true;
          if (this.areaUnitListener) this.areaUnitListener.remove();
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
                style: L.emptyView,
              },
              React.default.createElement(module12.Image, {
                resizeMode: 'contain',
                style: L.emptyImage,
                source: o.cleanHistory.noDataIcon,
              }),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    L.emptyText,
                    {
                      color: o.cleanHistory.subTitleColor,
                    },
                  ],
                },
                module500.have_no_data
              )
            );
          console.log('HistoryPage render');
          return React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(module12.View, {
              style: {
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: o.settingBackgroundColor,
              },
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  L.container,
                  {
                    backgroundColor: o.settingBackgroundColor,
                  },
                ],
              },
              React.default.createElement(module1849.default, {
                style: [
                  {
                    marginTop: module1153.NavigationBarHeight,
                    minHeight: 100,
                  },
                  {
                    backgroundColor: o.settingBackgroundColor,
                  },
                  {
                    top: 10,
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
                    title: module500.localization_strings_Setting_History_index_8,
                    unit: this.getTimeUnit(),
                    value: this.state.loaded ? this.formatTimeNumber(this.state.totalTime) : '--',
                  },
                  {
                    title: module500.clean_history_total_area,
                    unit: this.state.areaUnit,
                    value: this.state.loaded
                      ? this.formatAreaNumber(this.state.totalArea < 1e6 ? Utils.areaConvert((this.state.totalArea / 1e6).toFixed(1)) : Utils.areaConvert(E(this.state.totalArea)))
                      : '--',
                  },
                  {
                    title: module500.localization_strings_Setting_History_index_12,
                    unit: "'",
                    value: this.state.loaded ? this.formatCount(this.state.totalCount) : '--',
                  },
                ],
                mainTitleData: [
                  {
                    title: module500.localization_strings_Setting_History_index_8,
                    unit: this.getTimeUnit(),
                    value: this.state.loaded ? this.formatTimeNumber(this.state.totalTime) : '--',
                  },
                  {
                    title: module500.clean_history_total_area,
                    unit: this.state.areaUnit,
                    value: this.state.loaded
                      ? this.formatAreaNumber(this.state.totalArea < 1e6 ? Utils.areaConvert((this.state.totalArea / 1e6).toFixed(1)) : Utils.areaConvert(E(this.state.totalArea)))
                      : '--',
                  },
                ],
                subTitleData: [
                  {
                    title: module500.clean_history_mop_sweep,
                    unit: ' ',
                    value: this.state.loaded ? this.formatCount(this.state.totalCount) : '--',
                    icon: require('./1855'),
                  },
                  {
                    title: module500.clean_history_mop_time,
                    unit: ' ',
                    value: this.state.loaded ? this.formatCount(this.state.mopCount) : '--',
                    icon: require('./1856'),
                  },
                  {
                    title: module500.mop_mode_setting_page_wash_count,
                    unit: ' ',
                    value: this.state.loaded ? this.formatCount(this.state.cleanRollerCount) : '--',
                    icon: require('./1857'),
                  },
                ],
              }),
              this.state.isNoData
                ? n
                : React.default.createElement(module502, {
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
                      L.list,
                      {
                        backgroundColor: o.settingBackgroundColor,
                      },
                    ],
                    dataSource: this.state.dataSource,
                    enableEmptySections: true,
                    renderRow: this.renderRow.bind(this),
                  }),
              React.default.createElement(module385.LoadingView, {
                ref: function (o) {
                  t.loadingView = o;
                },
              }),
              this.state.loaded || this.state.refreshing
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(module385.Spinner, {
                    style: {
                      position: 'absolute',
                      alignSelf: 'center',
                    },
                  }),
              React.default.createElement(module385.AlertView, {
                ref: function (o) {
                  return (t.alert = o);
                },
              })
            )
          );
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
            u = module1513.utcTimeConvertToPhoneTimeZoneTime(1e3 * t.start);
          console.log('rowData = ' + t);
          if (!module1153.CleanStartType()[t.startType]) module500.localization_strings_Setting_General_index_0;
          var c = module1513.addZeroPrefix(u.month) + '/' + module1513.addZeroPrefix(u.day) + ' ' + module1513.addZeroPrefix(u.hour) + ':' + module1513.addZeroPrefix(u.minute),
            h = [module500.home_bottom_menu_global, module500.home_bottom_menu_draw_zone, module500.home_bottom_menu_select_zone][t.cleanType - 1],
            p = t.area;
          p = p < 1e6 ? (p / 1e6).toFixed(1) : E(p);

          if (t.cleanMop) {
            module500.localization_strings_Main_MainPage_3;
            module500.clean_method_mop;
            module500.clean_method_clean_and_mop;
            module500.clean_method_clean_and_mop;
            t.cleanMop;
          } else module500.localization_strings_Main_MainPage_3;

          var y = t.time < 60 ? t.time + 's' : P(t.time) + 'min',
            C = h + ' | ' + Utils.getAreaUnitValue(p) + this.state.areaUnit + ' | ' + y;
          if (module390.default.isNewDataForCleanHistoryDetail() && t.dustCollectionStatus) C = C + ' | ' + module500.dust_collection_status_1;
          return React.default.createElement(module1851.default, {
            style: L.recordItemView,
            isLast: n == this.state.data.length - 1,
            onShowUnderlay: this.onShowUnderlay.bind(this),
            onHideUnderlay: this.onHideUnderlay.bind(this),
            cleanTime: '' + c,
            startType: '',
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
                  style: L.hiddenRow,
                },
                React.default.createElement(module12.View, {
                  style: {
                    width: 20,
                    height: 20,
                  },
                }),
                React.default.createElement(module385.PureImageButton, {
                  funcId: 'CleanHistoryDelete_' + n,
                  image: require('./1847'),
                  imageWidth: 26,
                  imageHeight: 26,
                  style: L.deleteButton,
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
          module387.LogEventStat(module387.LogEventMap.CleanRecordDetailPage);
          module387.LogEventCommon('tap_clean_record_item');
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
            title: module500.setting_history_detail,
            startType: t.startType,
            cleanType: t.cleanType,
            cleanMop: t.cleanMop,
            washCount: t.washCount,
            washTime: t.washTime,
            mapFlag: t.mapFlag,
            feedbackCallback: o,
          });
        },
      },
      {
        key: 'updateListData',
        value: function (t) {
          if (!this.unMount)
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
          if (!this.unMount)
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
            if (!this.unMount)
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
            y,
            C = this;
          return regeneratorRuntime.default.async(
            function (v) {
              for (;;)
                switch ((v.prev = v.next)) {
                  case 0:
                    v.prev = 0;
                    this.cleanRecords = [];
                    this.hasFetchedRecordCount = 0;
                    v.next = 5;
                    return regeneratorRuntime.default.awrap(module414.default.getCleanSummary());

                  case 5:
                    t = v.sent;
                    console.log('History Summary - ' + JSON.stringify(t) + ' ' + module390.default.isNewDataForCleanHistory());

                    if (module390.default.isNewDataForCleanHistory()) {
                      s = t.result.clean_time;
                      l = t.result.clean_area;
                      u = t.result.clean_count;
                      c = t.result.records;
                      h = t.result.dust_collection_count;
                      f = t.result.mop_count;
                      p = t.result.wash_count;
                    } else {
                      y = module23.default(t.result, 4);
                      s = y[0];
                      l = y[1];
                      u = y[2];
                      c = y[3];
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
                        if (t > 1451577600) C.fetchRecordDetail(t);
                        else C.totalRecordCount--;
                      });
                    }
                    v.next = 17;
                    break;

                  case 12:
                    v.prev = 12;
                    v.t0 = v.catch(0);
                    globals.showToast(module500.localization_strings_Setting_History_index_1);
                    if (!this.unMount)
                      this.setState({
                        loaded: true,
                        refreshing: false,
                      });
                    console.log('getClean History Summary  error: ' + ('object' == typeof v.t0 ? JSON.stringify(v.t0) : v.t0));

                  case 17:
                  case 'end':
                    return v.stop();
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
          var s, l, u, c, h, f, p, y, C, v, S, R, b, T, k, x, D;
          return regeneratorRuntime.default.async(
            function (U) {
              for (;;)
                switch ((U.prev = U.next)) {
                  case 0:
                    U.prev = 0;
                    U.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.getCleanRecord(t));

                  case 3:
                    s = U.sent;
                    console.log('fetchRecordDetail - ' + t + ' - ' + JSON.stringify(s));
                    x = -2;

                    if (module390.default.isNewDataForCleanHistoryDetail()) {
                      l = s.result[0].begin;
                      u = s.result[0].end;
                      c = s.result[0].duration;
                      h = s.result[0].area;
                      f = s.result[0].error;
                      p = s.result[0].complete;
                      y = s.result[0].start_type;
                      C = s.result[0].clean_type;
                      v = s.result[0].finish_reason;
                      S = s.result[0].dust_collection_status;
                      R = s.result[0].avoid_count;
                      b = s.result[0].clean_mop;
                      T = s.result[0].wash_count;
                      k = s.result[0].wash_time;
                      x = s.result[0].hasOwnProperty('map_flag') ? s.result[0].map_flag : -2;
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
                          y +
                          ' - cleanType: ' +
                          C +
                          ' - finishReasonCode: ' +
                          v +
                          '  - dustCollectionStatus: ' +
                          S
                      );
                    } else {
                      D = module23.default(s.result[0], 9);
                      l = D[0];
                      u = D[1];
                      c = D[2];
                      h = D[3];
                      f = D[4];
                      p = D[5];
                      y = D[6];
                      C = D[7];
                      v = D[8];
                    }

                    this.cleanRecords.push({
                      start: l,
                      stop: u,
                      time: c,
                      area: h,
                      avoidCount: R,
                      error: f,
                      status: p,
                      startType: y,
                      cleanType: C,
                      finishReasonCode: v,
                      dustCollectionStatus: S,
                      cleanMop: b,
                      washCount: T,
                      washTime: k,
                      mapFlag: x,
                    });
                    this.hasFetchedRecordCount++;
                    console.log(this.hasFetchedRecordCount + ' -- ' + this.totalRecordCount);
                    this.checkShouldUpdateRecords();
                    U.next = 18;
                    break;

                  case 13:
                    U.prev = 13;
                    U.t0 = U.catch(0);
                    console.log('fetchRecordDetail  error: ' + ('object' == typeof U.t0 ? JSON.stringify(U.t0) : U.t0));
                    this.hasFetchedRecordCount++;
                    this.checkShouldUpdateRecords();

                  case 18:
                  case 'end':
                    return U.stop();
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
                                return regeneratorRuntime.default.awrap(module414.default.deleteCleanRecord(t.start));

                              case 3:
                                if (u.loadingView) u.loadingView.hide();
                                l['' + n + s].closeRow();
                                u.cleanRecords.splice(s, 1);
                                c = JSON.parse(JSON.stringify(u.cleanRecords));
                                u.setState({
                                  data: c,
                                  dataSource: u.state.dataSource.cloneWithRows(c),
                                });
                                globals.showToast(module500.rubys_history_del_toast_succ);
                                h.next = 17;
                                break;

                              case 12:
                                h.prev = 12;
                                h.t0 = h.catch(0);
                                if (u.loadingView) u.loadingView.hide();
                                globals.showToast(module500.rubys_history_del_toast_failed);
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
          this.alert.alert(module500.whether_to_delete_the_recorded, '', [
            {
              text: module500.localization_strings_Main_MainPage_11,
              onPress: function () {},
            },
            {
              text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
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

exports.default = module1847;
module1847.contextType = module515.AppConfigContext;
var L = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#f5f5f5',
    marginBottom: 0,
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

require('./49');

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module407 = require('./407'),
  module377 = require('./377'),
  module381 = require('./381'),
  module387 = require('./387'),
  module1857 = require('./1857'),
  module411 = require('./411'),
  React = require('react'),
  module12 = require('./12'),
  module1817 = require('./1817'),
  module506 = require('./506'),
  module1888 = require('./1888'),
  module383 = require('./383');

function E() {
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

require('./1889');

require('./1853');

require('./385');

require('./1890');

require('./1891');

var module491 = require('./491').strings,
  module936 = require('./936'),
  module1858 = require('./1858').getSupplies,
  module394 = require('./394').fromSecToHour,
  D = 20,
  I = 5,
  B = 0,
  U = (function (t) {
    module7.default(z, t);

    var module506 = z,
      U = E(),
      H = function () {
        var t,
          n = module11.default(module506);

        if (U) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function z(t) {
      var n;
      module4.default(this, z);

      (n = H.call(this, t))._sectionComp = function () {
        return React.default.createElement(module12.View, {
          style: {
            height: 15,
            backgroundColor: n.context.theme.settingBackgroundColor,
          },
        });
      };

      n.renderListRow = function (t) {
        var s = t.index,
          l = t.section.data.length,
          u = t.item,
          c = u.suppliesKey,
          f = n.state.data[c],
          h = n.calcPercent(f, u.total);
        if (!u.isUnitsTime) h = Math.ceil(100 * (1 - f / u.total));

        var _ = React.default.createElement(module12.Image, {
            style: j.rightArrow,
            source: n.context.theme.supplies.arrowImg,
          }),
          p = React.default.createElement(
            module12.View,
            {
              style: j.rowLeftView,
            },
            React.default.createElement(module1817.default, {
              uri: 'https://' + n.host + u.listImage,
              style: j.listImage,
              errorImageSize: 'small',
            })
          ),
          w = module491.dust_collection_life9.templateStringWithParams({
            time: n.getTimes(f, u.total),
          }),
          T = h > D,
          k = h <= D && h > I,
          v = T ? module491.dust_collection_life10 : k ? module491.dust_collection_life11 : module491.dust_collection_life12,
          C = T ? '#007aff' : k ? '#ee8b00' : '#e22920',
          E = !u.isNeedTime || u.isNeedState || u.isUnitsTime ? (u.isNeedState ? v : u.subTitle) : w,
          P = !u.isNeedTime && u.isNeedState ? '' : (h < 0 ? 0 : h) + '%';

        return React.default.createElement(
          module12.View,
          null,
          React.default.createElement(
            module12.TouchableHighlight,
            module21.default({}, module387.default.getAccessibilityLabel('suppliesPageList_' + u.suppliesKey), {
              style: [
                {
                  borderTopLeftRadius: 0 == s ? 8 : 0,
                },
                {
                  borderTopRightRadius: 0 == s ? 8 : 0,
                },
                {
                  borderBottomLeftRadius: s == l - 1 ? 8 : 0,
                },
                {
                  borderBottomRightRadius: s == l - 1 ? 8 : 0,
                },
              ],
              onPress: function () {
                return n._pressRow(t);
              },
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  j.rowContainer,
                  {
                    backgroundColor: n.context.theme.supplies.itemBackgroundColor,
                  },
                  {
                    borderTopLeftRadius: 0 == s ? 8 : 0,
                  },
                  {
                    borderTopRightRadius: 0 == s ? 8 : 0,
                  },
                  {
                    borderBottomLeftRadius: s == l - 1 ? 8 : 0,
                  },
                  {
                    borderBottomRightRadius: s == l - 1 ? 8 : 0,
                  },
                ],
              },
              !globals.isRTL && p,
              React.default.createElement(
                module12.View,
                {
                  style: j.rowRightView,
                },
                globals.isRTL && _,
                React.default.createElement(
                  module12.View,
                  {
                    style: j.rowDataView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        j.rowTitle,
                        {
                          color: n.context.theme.supplies.itemTitleColor,
                        },
                      ],
                    },
                    u.name
                  ),
                  u.isNeedTime || u.isNeedState
                    ? React.default.createElement(
                        module12.View,
                        {
                          style: j.rowPercentView,
                        },
                        globals.isRTL &&
                          React.default.createElement(
                            module12.View,
                            {
                              style: [
                                j.rowPercentOut,
                                {
                                  flex: !u.isNeedTime && u.isNeedState ? 1.5 : 3,
                                },
                              ],
                            },
                            React.default.createElement(
                              module12.Text,
                              {
                                style: [
                                  j.rowPercent,
                                  {
                                    color: C,
                                    marginRight: 10,
                                  },
                                ],
                              },
                              P
                            )
                          ),
                        React.default.createElement(module1888.default, {
                          style: {
                            flex: !u.isNeedTime && u.isNeedState ? 8.5 : 7,
                          },
                          value: h / 100,
                          minimumTrackTintColor: C,
                          maximumTrackTintColor: n.context.theme.supplies.maximumTrackTintColor,
                        }),
                        !globals.isRTL &&
                          React.default.createElement(
                            module12.View,
                            {
                              style: [
                                j.rowPercentOut,
                                {
                                  flex: !u.isNeedTime && u.isNeedState ? 1.5 : 3,
                                },
                              ],
                            },
                            React.default.createElement(
                              module12.Text,
                              {
                                style: [
                                  j.rowPercent,
                                  {
                                    color: C,
                                  },
                                ],
                              },
                              P
                            )
                          )
                      )
                    : React.default.createElement(module12.View, {
                        style: {
                          height: 12,
                        },
                      }),
                  u.isNeedTime && u.isUnitsTime
                    ? React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            j.rowHours,
                            {
                              color: n.context.theme.supplies.itemSubTitleColor,
                            },
                          ],
                        },
                        module491.localization_strings_Setting_Supplies_index_6.templateStringWithParams({
                          hour: n.getLeftHours(f, u.total),
                        })
                      )
                    : React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            j.rowHours,
                            {
                              color: n.context.theme.supplies.itemSubTitleColor,
                            },
                          ],
                        },
                        E
                      )
                ),
                !globals.isRTL && _
              ),
              globals.isRTL && p
            )
          )
        );
      };

      n.shouldForceUpdate = false;
      module6.default(n);
      n.state = {
        data: {
          filter_work_time: 0,
          side_brush_work_time: 0,
          main_brush_work_time: 0,
          filter_element_work_time: 0,
          moproller_work_time: 0,
          sensor_dirty_time: 0,
          strainer_work_times: 0,
          cleaning_brush_work_times: 0,
          dust_collection_work_times: 0,
          dust_bag_work_times: 0,
        },
        loading: true,
        refreshing: false,
        supplies: module1858(),
      };
      n.isUnmount = false;
      n.host = module936.areaServerMap[module377.RobotStatusManager.sharedManager().serverCode].host;
      return n;
    }

    module5.default(z, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.fetchData();
          this.consumableResetListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module411.EventKeys.ConsumableReset) t._refresh();
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.isUnmount = true;
          module1857.default.checkSuppliesRedPoint();
          this.consumableResetListener.remove();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            title: module491.localization_strings_Setting_index_9,
          });
        },
      },
      {
        key: 'fetchData',
        value: function () {
          var t,
            o,
            s,
            l,
            u,
            c,
            f,
            h,
            p = this;
          return regeneratorRuntime.default.async(
            function (w) {
              for (;;)
                switch ((w.prev = w.next)) {
                  case 0:
                    w.prev = 0;
                    w.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getSupplies());

                  case 3:
                    for (
                      t = w.sent,
                        console.log('get Supplies list  ' + JSON.stringify(t)),
                        o = t.result[0],
                        s = {
                          filter_work_time: o.filter_work_time,
                          side_brush_work_time: o.side_brush_work_time,
                          main_brush_work_time: o.main_brush_work_time,
                          filter_element_work_time: o.filter_element_work_time,
                          moproller_work_time: o.moproller_work_time,
                          sensor_dirty_time: o.sensor_dirty_time,
                          strainer_work_times: o.strainer_work_times >= 0 ? o.strainer_work_times : 0,
                          cleaning_brush_work_times: o.cleaning_brush_work_times >= 0 ? o.cleaning_brush_work_times : 0,
                          dust_collection_work_times: o.dust_collection_work_times >= 0 ? o.dust_collection_work_times : -1,
                          dust_bag_work_times: o.dust_collection_work_times >= 0 ? o.dust_collection_work_times : -1,
                        },
                        l = this.state.supplies,
                        u = 0;
                      u < l.length;
                      u++
                    )
                      for (c = l[u].data, f = 0; f < c.length; f++) {
                        h = c[f].suppliesKey;

                        if (-1 == s[h]) {
                          c.splice(f, 1);
                          f -= 1;
                        }
                      }

                    B = 0;
                    if (!this.isUnmount)
                      this.setState({
                        loading: false,
                        refreshing: false,
                        data: s,
                        supplies: l,
                      });
                    w.next = 23;
                    break;

                  case 13:
                    if (((w.prev = 13), (w.t0 = w.catch(0)), !(B < 10))) {
                      w.next = 20;
                      break;
                    }

                    B++;
                    console.log('get Supplies retry ' + B);
                    setTimeout(function () {
                      p.fetchData();
                    }, 1e3);
                    return w.abrupt('return');

                  case 20:
                    console.log('get Supplies list  error: ' + ('object' == typeof w.t0 ? JSON.stringify(w.t0) : w.t0));
                    if (!this.isUnmount)
                      this.setState({
                        loading: false,
                        refreshing: false,
                      });
                    globals.showToast(module491.localization_strings_Setting_CleanModePage_3);

                  case 23:
                  case 'end':
                    return w.stop();
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
        key: '_refresh',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (!this.isUnmount)
                      this.setState({
                        refreshing: true,
                      });
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(this.fetchData());

                  case 3:
                  case 'end':
                    return t.stop();
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
        key: 'forceRefreshForTestMode',
        value: function () {
          this.shouldForceUpdate = true;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme;
          console.log('Supplies list page render');
          var o =
            this.state.loading && !this.state.refreshing
              ? React.default.createElement(module381.Spinner, {
                  style: {
                    position: 'absolute',
                    alignSelf: 'center',
                  },
                })
              : React.default.createElement(module12.View, null);
          React.default.createElement(
            module12.View,
            {
              style: j.bottomView,
            },
            React.default.createElement(module381.PureButton, {
              style: j.buyButton,
              textColor: 'white',
              title: module491.localization_strings_Setting_Supplies_DetailsPage_15,
              onPress: function () {
                return t.onOpenBuySuppliesPage();
              },
            })
          );
          return React.default.createElement(
            module12.View,
            {
              style: [
                j.container,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: j.listViewStyle,
              },
              React.default.createElement(module12.SectionList, {
                style: [
                  {
                    flex: 1,
                  },
                  {
                    paddingHorizontal: 15,
                  },
                ],
                refreshing: this.state.refreshing,
                onRefresh: function () {
                  return t._refresh();
                },
                showsVerticalScrollIndicator: false,
                automaticallyAdjustContentInsets: false,
                sections: this.state.supplies,
                renderItem: this.renderListRow,
                keyExtractor: function (t, n) {
                  return 'index:' + n + t;
                },
                renderSectionHeader: this._sectionComp,
                ItemSeparatorComponent: function () {
                  return React.default.createElement(module12.View, {
                    style: {
                      height: 1,
                    },
                  });
                },
                stickySectionHeadersEnabled: false,
              })
            ),
            null,
            o
          );
        },
      },
      {
        key: 'calcPercent',
        value: function (t, n) {
          return module387.default.percentCalculate(t, n);
        },
      },
      {
        key: 'getLeftHours',
        value: function (t, n) {
          var o = n - module394(t);
          return o < 0 ? 0 : o;
        },
      },
      {
        key: 'getTimes',
        value: function (t, n) {
          var o = n - t;
          return o < 0 ? 0 : o;
        },
      },
      {
        key: '_pressRow',
        value: function (t) {
          var n = t.item,
            o = this.state.data[n.suppliesKey],
            s = this.calcPercent(o, n.total);
          if (!n.isUnitsTime) s = Math.ceil(100 * (1 - o / n.total));
          var l = s <= D && s > I,
            u = s > D ? module491.dust_collection_life10 : l ? module491.dust_collection_life11 : module491.dust_collection_life12,
            c = {
              suppliesKey: n.suppliesKey,
              spent: this.state.data[n.suppliesKey],
              total: n.total,
              gid: n.gid,
              path: n.path,
              image: n.image,
              isNeedTime: n.isNeedTime,
              resetItemButtonText: n.resetItemButtonText,
              resetItemContent: n.resetItemContent,
              title: n.name,
              text: n.text,
              isNeedState: n.isNeedState,
              isUnitsTime: n.isUnitsTime,
              stateText: module491.dust_collection_life13.templateStringWithParams({
                state: u,
              }),
            };
          this.props.navigation.navigate('SupplyDetailPage', c);
          module383.LogEventCommon('tap_supply_item', c);
          console.log('Tap Supply detail - ' + JSON.stringify(t));
        },
      },
      {
        key: 'onOpenBuySuppliesPage',
        value: function () {
          globals.showToast(module491.rubys_supplies_wait_tips);
        },
      },
    ]);
    return z;
  })(React.default.PureComponent);

exports.default = U;
U.contextType = module506.AppConfigContext;
var j = module12.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  listViewStyle: {
    flex: 1,
    alignSelf: 'stretch',
  },
  listImage: {
    width: 60,
    height: 60,
  },
  rowContainer: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  rowLeftView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  rowRightView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  rowDataView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rowTitle: {
    fontSize: 16,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  rowPercent: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    textAlign: globals.isRTL ? 'right' : 'left',
    marginLeft: 7,
  },
  rowPercentOut: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rowPercentView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowHours: {
    fontSize: 14,
    marginRight: globals.isRTL ? 0 : 10,
    marginLeft: globals.isRTL ? 10 : 0,
    color: 'rgba(0,0,0,0.4)',
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  bottomView: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: 10,
  },
  buyButton: {
    width: 0.8 * module12.Dimensions.get('window').width,
    height: 40,
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#5696ff',
  },
  rightArrow: {
    width: 9.5,
    height: 17.5,
    marginRight: globals.isRTL ? 0 : 10,
    marginLeft: globals.isRTL ? 10 : 0,
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
});

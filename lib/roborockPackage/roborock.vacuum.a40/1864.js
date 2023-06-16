require('./50');

var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module4 = require('./4'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module414 = require('./414'),
  module381 = require('./381'),
  module385 = require('./385'),
  module391 = require('./391'),
  module1833 = require('./1833'),
  module418 = require('./418'),
  React = require('react'),
  module12 = require('./12'),
  module1826 = require('./1826'),
  module515 = require('./515'),
  module1865 = require('./1865'),
  module387 = require('./387');

function L() {
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

require('./393');

require('./1866');

require('./1828');

require('./389');

require('./1867');

require('./1868');

var module500 = require('./500').strings,
  module1153 = require('./1153'),
  module1834 = require('./1834').getSupplies,
  module398 = require('./398').fromSecToHour,
  D = 20,
  B = 5,
  I = 0,
  U = (function (t) {
    module7.default(z, t);

    var module515 = z,
      U = L(),
      H = function () {
        var t,
          n = module11.default(module515);

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

        var p = React.default.createElement(module12.Image, {
            style: j.rightArrow,
            source: n.context.theme.supplies.arrowImg,
          }),
          _ = React.default.createElement(
            module12.View,
            {
              style: j.rowLeftView,
            },
            React.default.createElement(module1826.default, {
              uri: 'https://' + n.host + u.listImage,
              style: j.listImage,
              errorImageSize: 'small',
            })
          ),
          w = module500.dust_collection_life9.templateStringWithParams({
            time: n.getTimes(f, u.total),
          }),
          k = h > D,
          T = h <= D && h > B,
          v = k ? module500.dust_collection_life10 : T ? module500.dust_collection_life11 : module500.dust_collection_life12,
          R = k ? '#007aff' : T ? '#ee8b00' : '#e22920',
          L = !u.isNeedTime || u.isNeedState || u.isUnitsTime ? (u.isNeedState ? v : u.subTitle) : w,
          P = !u.isNeedTime && u.isNeedState ? '' : (h < 0 ? 0 : h) + '%',
          V = h <= 0 ? '#FBC6C4' : n.context.theme.supplies.maximumTrackTintColor;

        return React.default.createElement(
          module12.View,
          null,
          React.default.createElement(
            module12.TouchableHighlight,
            module22.default({}, module391.default.getAccessibilityLabel('suppliesPageList_' + u.suppliesKey), {
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
              !globals.isRTL && _,
              React.default.createElement(
                module12.View,
                {
                  style: j.rowRightView,
                },
                globals.isRTL && p,
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
                                    color: R,
                                    marginRight: 10,
                                  },
                                ],
                              },
                              P
                            )
                          ),
                        React.default.createElement(module1865.default, {
                          style: {
                            flex: !u.isNeedTime && u.isNeedState ? 8.5 : 7,
                          },
                          value: h / 100,
                          minimumTrackTintColor: R,
                          maximumTrackTintColor: V,
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
                                    color: R,
                                  },
                                ],
                              },
                              P
                            )
                          )
                      )
                    : L
                    ? React.default.createElement(module12.View, {
                        style: {
                          height: 12,
                        },
                      })
                    : null,
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
                        module500.localization_strings_Setting_Supplies_index_6.templateStringWithParams({
                          hour: n.getLeftHours(f, u.total),
                        })
                      )
                    : L
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
                        L
                      )
                    : null
                ),
                !globals.isRTL && p
              ),
              globals.isRTL && _
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
        },
        loading: true,
        refreshing: false,
        supplies: module1834(),
      };
      n.isUnmount = false;
      n.host = module1153.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].host;
      return n;
    }

    module5.default(z, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.fetchData();
          this.consumableResetListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module418.EventKeys.ConsumableReset) t._refresh();
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.isUnmount = true;
          module1833.default.checkSuppliesRedPoint();
          this.consumableResetListener.remove();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            title: module500.localization_strings_Setting_index_9,
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
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
            _ = this;

          return regeneratorRuntime.default.async(
            function (w) {
              for (;;)
                switch ((w.prev = w.next)) {
                  case 0:
                    w.prev = 0;
                    w.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.getSupplies());

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

                    I = 0;
                    if (!this.isUnmount)
                      this.setState(
                        {
                          refreshing: false,
                          data: s,
                          supplies: l,
                        },
                        function () {
                          _.endLoading();
                        }
                      );
                    w.next = 23;
                    break;

                  case 13:
                    if (((w.prev = 13), (w.t0 = w.catch(0)), !(I < 10))) {
                      w.next = 20;
                      break;
                    }

                    I++;
                    console.log('get Supplies retry ' + I);
                    setTimeout(function () {
                      _.fetchData();
                    }, 1e3);
                    return w.abrupt('return');

                  case 20:
                    console.log('get Supplies list  error: ' + ('object' == typeof w.t0 ? JSON.stringify(w.t0) : w.t0));
                    if (!this.isUnmount)
                      this.setState({
                        refreshing: false,
                      });
                    globals.showToast(module500.localization_strings_Setting_CleanModePage_3);

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
        key: 'startLoading',
        value: function () {
          this.setState({
            loading: true,
          });
        },
      },
      {
        key: 'endLoading',
        value: function () {
          this.setState({
            loading: false,
          });
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
            n = this.context.theme,
            o = React.default.createElement(
              module12.View,
              {
                style: {
                  flex: 1,
                  backgroundColor: n.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              React.default.createElement(module385.Spinner, null)
            );
          if (this.state.loading) return o;
          React.default.createElement(
            module12.View,
            {
              style: j.bottomView,
            },
            React.default.createElement(module385.PureButton, {
              style: j.buyButton,
              textColor: 'white',
              title: module500.localization_strings_Setting_Supplies_DetailsPage_15,
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
                ListFooterComponent: this._sectionComp,
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
            null
          );
        },
      },
      {
        key: 'calcPercent',
        value: function (t, n) {
          return module391.default.percentCalculate(t, n);
        },
      },
      {
        key: 'getLeftHours',
        value: function (t, n) {
          var o = n - module398(t);
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
          var l = s <= D && s > B,
            u = s > D ? module500.dust_collection_life10 : l ? module500.dust_collection_life11 : module500.dust_collection_life12,
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
              stateText: module500.dust_collection_life13.templateStringWithParams({
                state: u,
              }),
            };
          this.props.navigation.navigate('SupplyDetailPage', c);
          module387.LogEventCommon('tap_supply_item', c);
          console.log('Tap Supply detail - ' + JSON.stringify(t));
        },
      },
      {
        key: 'onOpenBuySuppliesPage',
        value: function () {
          globals.showToast(module500.rubys_supplies_wait_tips);
        },
      },
    ]);
    return z;
  })(React.default.PureComponent);

exports.default = U;
U.contextType = module515.AppConfigContext;
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

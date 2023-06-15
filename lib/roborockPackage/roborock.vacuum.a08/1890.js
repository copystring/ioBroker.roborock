var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module381 = require('./381'),
  module387 = require('./387'),
  module411 = require('./411'),
  module506 = require('./506'),
  React = require('react'),
  module12 = require('./12'),
  module1817 = require('./1817'),
  module377 = require('./377'),
  module383 = require('./383'),
  module415 = require('./415'),
  module1067 = require('./1067');

function C(t, n) {
  var l = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    l.push.apply(l, s);
  }

  return l;
}

function V(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      C(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      C(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function P() {
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

var module491 = require('./491').strings,
  module389 = require('./389'),
  module936 = require('./936'),
  module394 = require('./394').fromSecToHour,
  z = 'ru' == module387.default.getAppLanguage() ? 60 : 0,
  module1249 = require('./1249'),
  O = (function (t) {
    module7.default(z, t);

    var module49 = z,
      module506 = P(),
      C = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function z(t) {
      var n;
      module4.default(this, z);
      var l = (n = C.call(this, t)).props.navigation.state.params || {};
      n.state = {
        suppliesKey: l.suppliesKey,
        spent: l.spent,
        total: l.total,
        gid: l.gid,
        path: l.path,
        image: l.image,
        isNeedTime: l.isNeedTime,
        resetItemButtonText: l.resetItemButtonText,
        text: l.text,
        resetItemContent: l.resetItemContent,
        isNeedState: l.isNeedState,
        isUnitsTime: l.isUnitsTime,
        stateText: l.stateText,
      };
      n.isSensor = 'sensor_dirty_time' == n.state.suppliesKey;
      n.host = module936.areaServerMap[module377.RobotStatusManager.sharedManager().serverCode].host;
      return n;
    }

    module5.default(z, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.logSuppliseEvent();
          this.props.navigation.setParams({
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'logSuppliseEvent',
        value: function () {
          var t = {
            filter_work_time: module383.LogEventMap.StrainerDetail,
            side_brush_work_time: module383.LogEventMap.SideBrushDetail,
            main_brush_work_time: module383.LogEventMap.MainBrushDetail,
            filter_element_work_time: module383.LogEventMap.WaterBoxFilterDetail,
            moproller_work_time: module383.LogEventMap.MopRollerDetail,
            strainer_work_times: module383.LogEventMap.StrainerHoareDetail,
            sensor_dirty_time: module383.LogEventMap.SensorDetail,
          };
          module383.LogEventStat(t[this.state.suppliesKey]);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme;
          console.log('Details Page render');
          V(
            {
              width: module12.Dimensions.get('window').width - 100,
              height: 45,
              radius: 22,
            },
            n.shadowConfig
          );

          var l = this.state.isUnitsTime ? module394(this.state.spent) : this.state.spent,
            s = this.state.total - this.state.spent,
            o = this.state.isUnitsTime ? this.calcLeftPercent(this.state.spent) : s > 0 ? s : 0,
            u = (this.state.gid || this.state.url) && 'cn' == module377.RobotStatusManager.sharedManager().serverCode,
            c = 'filter_work_time' == this.state.suppliesKey || 'side_brush_work_time' == this.state.suppliesKey,
            p = React.default.createElement(
              module12.Text,
              {
                style: [
                  R.title,
                  {
                    color: n.supplies.infoTextColor,
                    fontSize: 38,
                    marginHorizontal: 0,
                  },
                ],
              },
              l
            ),
            _ = React.default.createElement(
              module12.Text,
              {
                style: [
                  R.title,
                  {
                    paddingTop: 3,
                    alignSelf: 'flex-start',
                    color: n.supplies.infoTextColor,
                    fontSize: module387.default.scaledPixelForPad(13),
                    marginHorizontal: 0,
                    marginTop: 0,
                    marginBottom: 5,
                  },
                ],
              },
              this.state.isUnitsTime ? 'h' : module491.dust_collection_life14
            ),
            w = React.default.createElement(
              module12.Text,
              {
                style: [
                  R.title,
                  {
                    color: n.supplies.infoTextColor,
                    fontSize: 38,
                    marginHorizontal: 0,
                  },
                ],
              },
              o
            ),
            E = React.default.createElement(
              module12.Text,
              {
                style: [
                  R.title,
                  {
                    paddingTop: 3,
                    color: n.supplies.infoTextColor,
                    fontSize: module387.default.scaledPixelForPad(13),
                    marginHorizontal: 0,
                    marginTop: 0,
                    marginBottom: 6,
                  },
                ],
              },
              this.state.isUnitsTime ? '%' : module491.dust_collection_life14
            ),
            C = React.default.createElement(
              module12.Text,
              {
                style: [
                  R.title,
                  {
                    color: n.supplies.infoTextColor,
                    fontSize: 21,
                    marginHorizontal: 0,
                  },
                ],
              },
              this.state.stateText
            ),
            P = V(
              V(
                {
                  width: module12.Dimensions.get('window').width - 100,
                  height: 45,
                  radius: 22,
                },
                n.shadowConfig
              ),
              {},
              {
                style: {
                  marginTop: 20,
                },
              }
            );

          return React.default.createElement(
            module12.View,
            {
              style: [
                R.container,
                {
                  backgroundColor: n.navBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: {
                  paddingBottom: module387.default.isIphoneX() ? (u ? 160 : 100) : u ? 145 : 85,
                },
              },
              React.default.createElement(
                module12.ScrollView,
                {
                  alwaysBounceVertical: false,
                  scrollEnabled: true,
                  showsVerticalScrollIndicator: false,
                },
                React.default.createElement(module1817.default, {
                  uri: 'https://' + this.host + this.state.image,
                  style: [
                    R.detailImage,
                    {
                      width: this.isSensor ? module415.DMM.supplies.sensor_detail_image_width : c ? 220 : 260,
                      height: this.isSensor ? module415.DMM.supplies.sensor_detail_image_height : c ? 220 : 260,
                      marginTop: c ? 25 : module415.DMM.supplies.detail_image_margin_top,
                      marginBottom: module415.DMM.supplies.detail_image_margin_bottom,
                    },
                  ],
                }),
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      R.summary,
                      {
                        marginTop: c ? 20 : 10,
                      },
                    ],
                  },
                  this.state.isNeedTime
                    ? React.default.createElement(
                        module12.View,
                        {
                          style: [
                            R.titleView,
                            {
                              paddingHorizontal: 50,
                            },
                          ],
                        },
                        React.default.createElement(
                          module12.View,
                          {
                            style: R.titleHorizontalView,
                          },
                          React.default.createElement(
                            module12.Text,
                            {
                              style: [
                                R.title,
                                {
                                  flex: 1,
                                  textAlign: 'center',
                                  color: n.supplies.itemTitleColor,
                                },
                              ],
                            },
                            module491.localization_strings_Setting_Supplies_DetailsPage_4
                          ),
                          React.default.createElement(
                            module12.Text,
                            {
                              style: [
                                R.title,
                                {
                                  flex: 1,
                                  textAlign: 'center',
                                  color: n.supplies.itemTitleColor,
                                },
                              ],
                            },
                            module491.localization_strings_Setting_Supplies_DetailsPage_5
                          )
                        ),
                        React.default.createElement(
                          module12.View,
                          {
                            style: [
                              R.titleHorizontalView,
                              {
                                marginTop: 5,
                              },
                            ],
                          },
                          React.default.createElement(
                            module12.View,
                            {
                              style: [
                                R.titleHorizontalView,
                                {
                                  flex: 1,
                                },
                              ],
                            },
                            React.default.createElement(
                              module12.View,
                              {
                                style: R.titleContentView,
                              },
                              React.default.createElement(
                                module12.View,
                                {
                                  style: {
                                    opacity: globals.isRTL ? 1 : 0,
                                  },
                                },
                                _
                              ),
                              p,
                              React.default.createElement(
                                module12.View,
                                {
                                  style: {
                                    opacity: globals.isRTL ? 0 : 1,
                                  },
                                },
                                _
                              )
                            )
                          ),
                          React.default.createElement(module12.View, {
                            style: {
                              width: 0.8,
                              height: 18,
                              backgroundColor: n.supplies.itemBorderColor,
                              marginTop: 5,
                            },
                          }),
                          React.default.createElement(
                            module12.View,
                            {
                              style: [
                                R.titleHorizontalView,
                                {
                                  flex: 1,
                                },
                              ],
                            },
                            React.default.createElement(
                              module12.View,
                              {
                                style: R.titleContentView,
                              },
                              React.default.createElement(
                                module12.View,
                                {
                                  style: {
                                    opacity: globals.isRTL ? 1 : 0,
                                  },
                                },
                                E
                              ),
                              w,
                              React.default.createElement(
                                module12.View,
                                {
                                  style: {
                                    opacity: globals.isRTL ? 0 : 1,
                                  },
                                },
                                E
                              )
                            )
                          )
                        )
                      )
                    : React.default.createElement(module12.View, {
                        style: {
                          height: 12,
                        },
                      }),
                  this.state.isNeedState
                    ? React.default.createElement(
                        module12.View,
                        {
                          style: [
                            R.titleView,
                            {
                              paddingHorizontal: 50,
                            },
                          ],
                        },
                        React.default.createElement(
                          module12.View,
                          {
                            style: R.titleHorizontalView,
                          },
                          C
                        )
                      )
                    : React.default.createElement(module12.View, {
                        style: {
                          height: 12,
                        },
                      }),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        R.detailText,
                        {
                          lineHeight: 24,
                          color: n.supplies.itemSubTitleColor,
                        },
                      ],
                    },
                    this.state.text + ' ' + (module387.default.isRRAndroid() ? '\n\n' : '')
                  )
                )
              )
            ),
            React.default.createElement(
              module12.View,
              {
                style: R.bottomView,
              },
              (this.state.isNeedTime || this.state.isNeedState) &&
                React.default.createElement(module381.PureButton, {
                  funcId: 'supplie_detail_reset',
                  style: [
                    R.resetButton,
                    {
                      backgroundColor: n.supplies.resetBackgroundColor,
                    },
                  ],
                  textColor: n.supplies.resetTextColor,
                  title: this.state.resetItemButtonText,
                  onPress: function () {
                    return t._resetItemAlert();
                  },
                }),
              u &&
                React.default.createElement(
                  module1067.BoxShadow,
                  {
                    setting: P,
                  },
                  React.default.createElement(
                    module381.GradientView,
                    {
                      pointerEvents: 'box-none',
                      colors: ['#72B4FE', '#3777F7'],
                      start: {
                        x: 0,
                        y: 0,
                      },
                      end: {
                        x: 1,
                        y: 0,
                      },
                      style: R.gradientBtn,
                    },
                    React.default.createElement(module381.PureButton, {
                      funcId: 'supplie_detail_buy',
                      style: {
                        backgroundColor: 'transparent',
                        minHeight: 45,
                      },
                      textColor: n.supplies.buyTextColor,
                      title: module491.localization_strings_Setting_Supplies_DetailsPage_15,
                      onPress: function () {
                        return t.onOpenBuySuppliesPage();
                      },
                    })
                  )
                )
            ),
            React.default.createElement(module381.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
              noAnimated: true,
            })
          );
        },
      },
      {
        key: 'onOpenBuySuppliesPage',
        value: function () {
          if (module389.isMiApp) module389.openShopPage(this.state.gid);
          else if (module389.isMiApp || module389.isOpenSmallProgram()) {
            if (module389.isOpenSmallProgram()) module389.openSmallProgram(this.state.path);
          } else globals.showToast(module491.rubys_supplies_wait_tips);
        },
      },
      {
        key: 'calcLeftPercent',
        value: function (t) {
          return module387.default.percentCalculate(t, this.state.total);
        },
      },
      {
        key: '_resetItemAlert',
        value: function () {
          var t = this;
          if (this.alert)
            this.alert.alert('', this.state.resetItemContent, [
              {
                text: module491.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  var module49, s;
                  return regeneratorRuntime.default.async(
                    function (o) {
                      for (;;)
                        switch ((o.prev = o.next)) {
                          case 0:
                            module49 = 'dust_bag_work_times' == t.state.suppliesKey ? 'dust_collection_work_times' : t.state.suppliesKey;
                            o.prev = 1;
                            o.next = 4;
                            return regeneratorRuntime.default.awrap(RobotApi.resetSupplies(module49));

                          case 4:
                            s = o.sent;
                            console.log('resetItemAlert res : ' + JSON.stringify(s));
                            t.setState({
                              spent: 0,
                            });
                            module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                              data: module411.EventKeys.ConsumableReset,
                            });
                            module1249.setTimeout(function () {
                              t.props.navigation.goBack();
                            }, 1e3);
                            o.next = 14;
                            break;

                          case 11:
                            o.prev = 11;
                            o.t0 = o.catch(1);
                            globals.showToast(module491.localization_strings_Setting_Supplies_DetailsPage_13);

                          case 14:
                          case 'end':
                            return o.stop();
                        }
                    },
                    null,
                    null,
                    [[1, 11]],
                    Promise
                  );
                },
              },
            ]);
        },
      },
    ]);
    return z;
  })(React.default.PureComponent);

exports.default = O;
O.contextType = module506.AppConfigContext;
var R = module12.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  detailImage: {
    marginTop: 15,
    alignSelf: 'center',
  },
  detailText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 10,
  },
  summary: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  titleVerticalView: {
    width: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  titleHorizontalView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContentView: {
    flexDirection: 'row',
  },
  bottomView: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    position: 'absolute',
    width: module12.Dimensions.get('window').width,
    bottom: module387.default.isIphoneX() ? 56 : 35,
  },
  title: {
    fontSize: module387.default.scaledPixelForPad(14),
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(0,0,0,0.5)',
    alignSelf: 'center',
  },
  resetButton: {
    alignSelf: 'center',
    minWidth: module12.Dimensions.get('window').width - 100,
    height: 45,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 26,
    borderWidth: 1,
  },
  topView: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textCliff: {
    alignItems: 'flex-end',
    paddingLeft: z,
    marginTop: module415.DMM.supplies.sensor_detail_cliff_text_marigin_top,
    paddingRight: module415.DMM.supplies.sensor_detail_cliff_text_padding_right,
    width: module12.Dimensions.get('window').width / 2,
  },
  textWall: {
    alignItems: 'flex-start',
    marginTop: module415.DMM.supplies.sensor_detail_wall_text_marigin_top,
    paddingLeft: module415.DMM.supplies.sensor_detail_wall_text_padding_left,
    width: module12.Dimensions.get('window').width / 2,
  },
  gradientBtn: {
    alignSelf: 'center',
    minWidth: module12.Dimensions.get('window').width - 100,
    minHeight: 45,
    borderRadius: 26,
    backgroundColor: '#3777F7',
    justifyContent: 'center',
  },
});

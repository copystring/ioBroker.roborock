var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module385 = require('./385'),
  module391 = require('./391'),
  module419 = require('./419'),
  module1121 = require('./1121'),
  React = require('react'),
  module12 = require('./12'),
  module1875 = require('./1875'),
  module381 = require('./381'),
  module387 = require('./387'),
  module1328 = require('./1328');

require('./390');

function C(t, n) {
  var l = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    l.push.apply(l, o);
  }

  return l;
}

function b(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      C(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      C(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function P() {
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
  module1265 = require('./1265'),
  module398 = require('./398').fromSecToHour,
  module1340 = require('./1340'),
  k = (function (t) {
    module7.default(k, t);

    var module50 = k,
      module1121 = P(),
      C = function () {
        var t,
          n = module11.default(module50);

        if (module1121) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var n;
      module4.default(this, k);
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
      n.host = module1265.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].host;
      return n;
    }

    module5.default(k, [
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
            filter_work_time: module387.LogEventMap.StrainerDetail,
            side_brush_work_time: module387.LogEventMap.SideBrushDetail,
            main_brush_work_time: module387.LogEventMap.MainBrushDetail,
            filter_element_work_time: module387.LogEventMap.WaterBoxFilterDetail,
            moproller_work_time: module387.LogEventMap.MopRollerDetail,
            strainer_work_times: module387.LogEventMap.StrainerHoareDetail,
            sensor_dirty_time: module387.LogEventMap.SensorDetail,
          };
          module387.LogEventStat(t[this.state.suppliesKey]);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme;
          console.log('Details Page render');
          var l = this.state.isUnitsTime ? module398(this.state.spent) : this.state.spent,
            o = this.state.total - this.state.spent,
            s = this.state.isUnitsTime ? this.calcLeftPercent(this.state.spent) : o > 0 ? o : 0,
            u = (this.state.gid || this.state.url || this.state.path) && 'cn' == module381.RSM.serverCode,
            c = React.default.createElement(
              module12.Text,
              {
                style: [
                  I.title,
                  {
                    color: n.supplies.infoTextColor,
                    fontSize: 38,
                    marginHorizontal: 0,
                  },
                ],
              },
              l
            ),
            p = React.default.createElement(
              module12.Text,
              {
                style: [
                  I.title,
                  {
                    paddingTop: 3,
                    alignSelf: 'flex-start',
                    color: n.supplies.infoTextColor,
                    fontSize: module391.default.scaledPixelForPad(13),
                    marginHorizontal: 0,
                    marginTop: 0,
                    marginBottom: 5,
                  },
                ],
              },
              this.state.isUnitsTime ? 'h' : module505.dust_collection_life14
            ),
            y = React.default.createElement(
              module12.Text,
              {
                style: [
                  I.title,
                  {
                    color: n.supplies.infoTextColor,
                    fontSize: 38,
                    marginHorizontal: 0,
                  },
                ],
              },
              s
            ),
            w = React.default.createElement(
              module12.Text,
              {
                style: [
                  I.title,
                  {
                    paddingTop: 3,
                    color: n.supplies.infoTextColor,
                    fontSize: module391.default.scaledPixelForPad(13),
                    marginHorizontal: 0,
                    marginTop: 0,
                    marginBottom: 6,
                  },
                ],
              },
              this.state.isUnitsTime ? '%' : module505.dust_collection_life14
            ),
            E = React.default.createElement(
              module12.Text,
              {
                style: [
                  I.title,
                  {
                    color: n.supplies.infoTextColor,
                    fontSize: 21,
                    marginHorizontal: 0,
                  },
                ],
              },
              this.state.stateText
            ),
            C = b(
              b(
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
                  marginHorizontal: 50,
                },
              }
            );
          return React.default.createElement(
            module12.View,
            {
              style: [
                I.container,
                {
                  backgroundColor: n.navBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: {
                  paddingBottom: module391.default.isIphoneX() ? (u ? 160 : 100) : u ? 145 : 85,
                },
              },
              React.default.createElement(
                module12.ScrollView,
                {
                  alwaysBounceVertical: false,
                  scrollEnabled: true,
                  showsVerticalScrollIndicator: false,
                },
                React.default.createElement(module1875.default, {
                  uri: 'https://' + this.host + this.state.image,
                  style: I.detailImage,
                }),
                React.default.createElement(
                  module12.View,
                  {
                    style: I.summary,
                  },
                  this.state.isNeedTime
                    ? React.default.createElement(
                        module12.View,
                        {
                          style: [
                            I.titleView,
                            {
                              paddingHorizontal: 50,
                            },
                          ],
                        },
                        React.default.createElement(
                          module12.View,
                          {
                            style: I.titleHorizontalView,
                          },
                          React.default.createElement(
                            module12.Text,
                            {
                              style: [
                                I.title,
                                {
                                  flex: 1,
                                  textAlign: 'center',
                                  color: n.supplies.itemTitleColor,
                                },
                              ],
                            },
                            module505.localization_strings_Setting_Supplies_DetailsPage_4
                          ),
                          React.default.createElement(
                            module12.Text,
                            {
                              style: [
                                I.title,
                                {
                                  flex: 1,
                                  textAlign: 'center',
                                  color: n.supplies.itemTitleColor,
                                },
                              ],
                            },
                            module505.localization_strings_Setting_Supplies_DetailsPage_5
                          )
                        ),
                        React.default.createElement(
                          module12.View,
                          {
                            style: [
                              I.titleHorizontalView,
                              {
                                marginTop: 5,
                              },
                            ],
                          },
                          React.default.createElement(
                            module12.View,
                            {
                              style: [
                                I.titleHorizontalView,
                                {
                                  flex: 1,
                                },
                              ],
                            },
                            React.default.createElement(
                              module12.View,
                              {
                                style: I.titleContentView,
                              },
                              c,
                              p
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
                                I.titleHorizontalView,
                                {
                                  flex: 1,
                                },
                              ],
                            },
                            React.default.createElement(
                              module12.View,
                              {
                                style: I.titleContentView,
                              },
                              y,
                              w
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
                            I.titleView,
                            {
                              paddingHorizontal: 50,
                            },
                          ],
                        },
                        React.default.createElement(
                          module12.View,
                          {
                            style: I.titleHorizontalView,
                          },
                          E
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
                        I.detailText,
                        {
                          lineHeight: 24,
                          color: n.supplies.itemSubTitleColor,
                        },
                      ],
                    },
                    this.state.text + ' ' + (module391.default.isRRAndroid() ? '\n\n' : '')
                  )
                )
              )
            ),
            React.default.createElement(
              module12.View,
              {
                style: I.bottomView,
              },
              (this.state.isNeedTime || this.state.isNeedState) &&
                React.default.createElement(module385.PureButton, {
                  funcId: 'supplie_detail_reset',
                  style: [
                    I.resetButton,
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
                  module1328.BoxShadow,
                  {
                    setting: C,
                  },
                  React.default.createElement(
                    module385.GradientView,
                    {
                      pointerEvents: 'box-none',
                      colors: [n.gradientColorStart, n.gradientColorEnd],
                      start: {
                        x: 0,
                        y: 0,
                      },
                      end: {
                        x: 1,
                        y: 0,
                      },
                      style: I.gradientBtn,
                    },
                    React.default.createElement(module385.PureButton, {
                      funcId: 'supplie_detail_buy',
                      style: {
                        backgroundColor: 'transparent',
                        minHeight: 45,
                      },
                      textColor: n.supplies.buyTextColor,
                      title: module505.localization_strings_Setting_Supplies_DetailsPage_15,
                      onPress: function () {
                        return t.onOpenBuySuppliesPage();
                      },
                    })
                  )
                )
            ),
            React.default.createElement(module385.AlertView, {
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
          if (module393.isMiApp) module393.openShopPage('142645');
          else if (module393.isSupportGotoMainlandMall()) module393.gotoMainlandMall(this.state.path);
          else globals.showToast(module505.map_object_app_version_tip);
        },
      },
      {
        key: 'calcLeftPercent',
        value: function (t) {
          return module391.default.percentCalculate(t, this.state.total);
        },
      },
      {
        key: '_resetItemAlert',
        value: function () {
          var t = this;
          if (this.alert)
            this.alert.alert('', this.state.resetItemContent, [
              {
                text: module505.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  var module50, o;
                  return regeneratorRuntime.default.async(
                    function (s) {
                      for (;;)
                        switch ((s.prev = s.next)) {
                          case 0:
                            module50 = t.state.suppliesKey;
                            s.prev = 1;
                            s.next = 4;
                            return regeneratorRuntime.default.awrap(RobotApi.resetSupplies(module50));

                          case 4:
                            o = s.sent;
                            console.log('resetItemAlert res : ' + JSON.stringify(o));
                            t.setState({
                              spent: 0,
                            });
                            module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
                              data: module419.EventKeys.ConsumableReset,
                            });
                            module1340.setTimeout(function () {
                              t.props.navigation.goBack();
                            }, 1e3);
                            s.next = 14;
                            break;

                          case 11:
                            s.prev = 11;
                            s.t0 = s.catch(1);
                            globals.showToast(module505.localization_strings_Setting_Supplies_DetailsPage_13);

                          case 14:
                          case 'end':
                            return s.stop();
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
    return k;
  })(React.default.PureComponent);

exports.default = k;
k.contextType = module1121.AppConfigContext;
var I = module12.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  detailImage: {
    marginTop: 15,
    alignSelf: 'center',
    width: module12.Dimensions.get('window').width ** 375,
    height: 300,
    marginTop: 0,
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
    marginTop: 10,
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
    alignItems: 'stretch',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: module391.default.isIphoneX() ? 56 : 35,
  },
  title: {
    fontSize: module391.default.scaledPixelForPad(14),
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(0,0,0,0.5)',
    alignSelf: 'center',
  },
  resetButton: {
    marginHorizontal: 50,
    height: 45,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 26,
    borderWidth: 1,
  },
  gradientBtn: {
    minHeight: 45,
    borderRadius: 26,
    backgroundColor: '#3777F7',
    justifyContent: 'center',
  },
});

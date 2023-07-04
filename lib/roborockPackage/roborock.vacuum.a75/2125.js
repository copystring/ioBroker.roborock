var s = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  l = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module416 = require('./416'),
  module394 = require('./394'),
  module381 = require('./381'),
  module1199 = require('./1199'),
  module420 = require('./420'),
  module424 = require('./424'),
  module390 = require('./390');

function T() {
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

var module510 = require('./510').strings,
  module389 = require('./389'),
  x = 0,
  module2076 = (function (t) {
    module9.default(I, t);

    var o = I,
      module1199 = T(),
      module2076 = function () {
        var t,
          s = module12.default(o);

        if (module1199) {
          var n = module12.default(this).constructor;
          t = Reflect.construct(s, arguments, n);
        } else t = s.apply(this, arguments);

        return module11.default(this, t);
      };

    function I(t) {
      var o;
      l.default(this, I);
      o = module2076.call(this, t);
      var s = t.navigation.state.params || {};
      o.state = {
        isTimeSetting: s.isTimeSetting,
        titleSelected: module394.default.sharedCache().washTowelMode,
        loading: true,
        requestFailed: false,
        refreshing: false,
        washValue: 0,
        backWashMode: 0,
      };
      return o;
    }

    module7.default(I, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.props.navigation.setParams({
                      navBarBackgroundColor: this.context.theme.settingBackgroundColor,
                      hiddenBottomLine: true,
                    });
                    this.initData(false);

                  case 2:
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
        key: 'getMenus',
        value: function () {
          var t = this,
            o = module390.default.isSuperDeepWashSupported() && module381.RSM.isUpdownWaterReady;
          return [
            {
              title: module510.wash_towel_mode_title_1,
              bottomDetail: module510.wash_towel_mode_des_1,
              funcId: 'wash_towel_mode_1',
              onPress: function () {
                return t.onChangeWashTowelMode(module389.WashTowelModeMap.WashTowelModeQuick);
              },
              visible: true,
              shouldShowBottomLine: true,
              bottomDetailWidth: module13.Dimensions.get('window').width - 70,
              selected: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeQuick,
              shouldShowRightArrow: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeQuick,
            },
            {
              title: module510.wash_towel_mode_title_2,
              bottomDetail: module510.wash_towel_mode_des_2,
              funcId: 'wash_towel_mode_2',
              onPress: function () {
                return t.onChangeWashTowelMode(module389.WashTowelModeMap.WashTowelModeDaily);
              },
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              bottomDetailWidth: module13.Dimensions.get('window').width - 70,
              selected: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeDaily,
              shouldShowRightArrow: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeDaily,
            },
            {
              title: module510.wash_towel_mode_title_3,
              bottomDetail: module510.wash_towel_mode_des_3,
              funcId: 'wash_towel_mode_3',
              onPress: function () {
                return t.onChangeWashTowelMode(module389.WashTowelModeMap.WashTowelModeDeep);
              },
              visible: true,
              shouldShowBottomLine: o,
              bottomDetailWidth: module13.Dimensions.get('window').width - 70,
              selected: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeDeep,
              shouldShowRightArrow: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeDeep,
            },
            {
              title: module510.wash_towel_mode_title_4,
              bottomDetail: module510.wash_towel_mode_desc_4,
              funcId: 'wash_towel_mode_4',
              onPress: function () {
                return t.onChangeWashTowelMode(module389.WashTowelModeMap.WashTowelModeSuperDeep);
              },
              visible: o,
              shouldShowBottomLine: false,
              bottomDetailWidth: module13.Dimensions.get('window').width - 70,
              selected: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeSuperDeep,
              shouldShowRightArrow: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeSuperDeep,
            },
          ];
        },
      },
      {
        key: 'getBackWashListView',
        value: function () {
          this.state.backWashMode;
          module389.BackWashModeMap.BackWashModeLevel;
          this.state.backWashMode;
          module389.BackWashModeMap.BackWashModeLevel;
          React.default.createElement(module13.View, {
            style: {
              width: module13.Dimensions.get('window').width - 20,
              top: 0,
              height: 0.8,
              marginLeft: 20,
              backgroundColor: this.context.theme.settingListItem.borderColor,
            },
          });
          var t = this,
            o = this.context.theme,
            n = module381.RSM.mapSaveEnabled,
            l = {
              title: module510.back_wash_title1,
              bottomDetail: module510.back_wash_desc,
              onPress: function () {
                return t.onChangeBackWashMode(module389.BackWashModeMap.BackWashModeSmart);
              },
              shouldShowBottomLine: true,
              selected: this.state.backWashMode == module389.BackWashModeMap.BackWashModeSmart,
              shouldShowRightArrow: this.state.backWashMode == module389.BackWashModeMap.BackWashModeSmart,
              funcId: 'back_wash_mode_1',
            },
            h = {
              title: module510.back_wash_title2,
              bottomDetail: module510.back_wash_desc1,
              onPress: function () {
                return t.onChangeBackWashMode(module389.BackWashModeMap.BackWashModeCustom);
              },
              shouldShowBottomLine: false,
              selected: this.state.backWashMode == module389.BackWashModeMap.BackWashModeCustom,
              shouldShowRightArrow: this.state.backWashMode == module389.BackWashModeMap.BackWashModeCustom,
              funcId: 'back_wash_mode_2',
            },
            c =
              this.state.backWashMode != module389.BackWashModeMap.BackWashModeCustom
                ? null
                : React.default.createElement(module385.FatSlider, {
                    sliderWidth: module13.Dimensions.get('window').width - 70,
                    minimumValue: 10,
                    maximumValue: module424.DMM.isPearl ? 25 : 50,
                    step: 5,
                    shouldShowValue: true,
                    shouldShowSideValue: false,
                    style: {
                      marginBottom: 15,
                    },
                    value: this.state.washValue,
                    onSlidingComplete: this.onSlidingComplete.bind(this),
                    onSlidingMove: this.onSlidingMove.bind(this),
                  });
          return React.default.createElement(
            module13.View,
            {
              style: [
                V.washView,
                {
                  backgroundColor: o.settingListItem.backgroundColor,
                },
              ],
            },
            n &&
              React.default.createElement(
                module385.SettingListItemView,
                s.default({}, l, {
                  key: 0,
                  titleColor: 'rgba(0,0,0,0.8)',
                  style: {
                    width: module13.Dimensions.get('window').width - 30,
                  },
                  rightImgStyle: V.rightImgStyle,
                  bottomDetailWidth: module13.Dimensions.get('window').width - 90,
                  rightCenter: false,
                  isDetailCenter: false,
                  rightSrc: require('./2076'),
                })
              ),
            React.default.createElement(
              module385.SettingListItemView,
              s.default({}, h, {
                key: 1,
                titleColor: 'rgba(0,0,0,0.8)',
                style: {
                  width: module13.Dimensions.get('window').width - 30,
                },
                rightImgStyle: V.rightImgStyle,
                bottomDetailWidth: module13.Dimensions.get('window').width - 90,
                rightCenter: false,
                isDetailCenter: false,
                rightSrc: require('./2076'),
              })
            ),
            c
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            n = React.default.createElement(module385.RequestRetryView, {
              onPressButton: function () {
                x = 0;
                t.initData(false);
              },
            });
          if (this.state.requestFailed) return n;
          var l = React.default.createElement(
            module13.View,
            {
              style: [
                V.containterView,
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
          var module2076 = this.getMenus().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      s.default({}, t, {
                        key: o,
                        fontSize: 16,
                        rightImgStyle: V.rightImgStyle,
                        rightCenter: false,
                        isDetailCenter: false,
                        width: module13.Dimensions.get('window').width - 30,
                        rightSrc: require('./2076'),
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module13.Text,
                      {
                        style: V.sectionTitle,
                        key: o,
                      },
                      t.sectionTitle
                    )
                : null;
            }),
            c = this.state.backWashMode ? module510.back_wash_desc3 : module510.back_wash_desc2;
          return React.default.createElement(
            module13.View,
            {
              style: [
                V.containter,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module13.ScrollView,
              {
                style: V.containterScroll,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module13.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    x = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(
                module13.View,
                null,
                React.default.createElement(module13.View, {
                  style: V.section,
                }),
                React.default.createElement(
                  module13.View,
                  {
                    style: {
                      borderRadius: 8,
                      overflow: 'hidden',
                      marginHorizontal: 15,
                    },
                  },
                  this.state.isTimeSetting && this.getBackWashListView()
                ),
                this.state.backWashMode < 2 && this.state.isTimeSetting
                  ? React.default.createElement(
                      module13.Text,
                      {
                        style: [
                          V.backWashTip,
                          {
                            color: '#a5a5a5',
                          },
                        ],
                      },
                      c
                    )
                  : null,
                React.default.createElement(
                  module13.View,
                  {
                    style: {
                      borderRadius: 8,
                      overflow: 'hidden',
                      marginHorizontal: 15,
                    },
                  },
                  !this.state.isTimeSetting && module2076
                )
              ),
              React.default.createElement(module13.View, {
                style: V.section,
              })
            )
          );
        },
      },
      {
        key: 'initData',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.setState({
                      loading: !t,
                      requestFailed: false,
                      refreshing: t,
                    });
                    o.prev = 1;
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(this.getWashTowelModeStatus());

                  case 4:
                    o.next = 6;
                    return regeneratorRuntime.default.awrap(this.getSmartWashParams());

                  case 6:
                    this.finishLoading(false);
                    x = 0;
                    o.next = 14;
                    break;

                  case 10:
                    o.prev = 10;
                    o.t0 = o.catch(1);
                    console.log('initData - ' + o.t0);
                    this.retry(t);

                  case 14:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[1, 10]],
            Promise
          );
        },
      },
      {
        key: 'retry',
        value: function (t) {
          var o = this;

          if (x < 3) {
            x++;
            setTimeout(function () {
              console.log('retryTimes:' + x);
              o.initData(t);
            }, 1e3);
          } else
            this.setState({
              requestFailed: true,
            });
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          this.setState({
            requestFailed: t,
            loading: false,
            refreshing: false,
          });
        },
      },
      {
        key: 'onChangeWashTowelMode',
        value: function (t) {
          var o, s;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    o = this.state.titleSelected;
                    this.setState({
                      titleSelected: t,
                    });
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.SelfCleaningSetDidChange, {
                      name: 'washTowelMode',
                      mode: t,
                    });
                    l.prev = 3;
                    l.next = 6;
                    return regeneratorRuntime.default.awrap(module416.default.setWashTowelMode(t));

                  case 6:
                    s = l.sent;
                    module394.default.sharedCache().washTowelMode = t;
                    console.log('onChangeWashTowelMode: ' + JSON.stringify(s));
                    l.next = 16;
                    break;

                  case 11:
                    l.prev = 11;
                    l.t0 = l.catch(3);
                    globals.showToast(module510.robot_communication_exception);
                    this.setState({
                      titleSelected: o,
                    });
                    console.log(l.t0);

                  case 16:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[3, 11]],
            Promise
          );
        },
      },
      {
        key: 'getWashTowelModeStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getWashTowelMode());

                  case 3:
                    t = o.sent;
                    console.log('getWashTowelModeStatus: ' + JSON.stringify(t));
                    this.setState({
                      titleSelected: t.result.wash_mode,
                    });
                    o.next = 12;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    globals.showToast(module510.robot_communication_exception);
                    console.log(o.t0);

                  case 12:
                  case 'end':
                    return o.stop();
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
        key: 'onChangeBackWashMode',
        value: function (t) {
          var o, s, l, module7;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (((o = this.state.backWashMode), t != o)) {
                      c.next = 3;
                      break;
                    }

                    return c.abrupt('return');

                  case 3:
                    this.setState({
                      backWashMode: t,
                    });
                    s = 20;
                    l = false;
                    c.t0 = t;
                    c.next =
                      c.t0 === module389.BackWashModeMap.BackWashModeSmart
                        ? 9
                        : c.t0 === module389.BackWashModeMap.BackWashModeCustom
                        ? 12
                        : c.t0 === module389.BackWashModeMap.BackWashModeLevel
                        ? 15
                        : 18;
                    break;

                  case 9:
                    s = 20;
                    l = true;
                    return c.abrupt('break', 18);

                  case 12:
                    s = this.state.washValue ? this.state.washValue : s;
                    l = false;
                    return c.abrupt('break', 18);

                  case 15:
                    s = 21;
                    l = false;
                    return c.abrupt('break', 18);

                  case 18:
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.SelfCleaningSetDidChange, {
                      name: 'backWashMode',
                      mode: t,
                      value: s,
                    });
                    c.prev = 19;
                    module7 = 60 * s;
                    c.next = 23;
                    return regeneratorRuntime.default.awrap(module416.default.setSmartWashParams(l ? 1 : 0, module7));

                  case 23:
                    c.next = 30;
                    break;

                  case 26:
                    c.prev = 26;
                    c.t1 = c.catch(19);
                    globals.showToast(module510.robot_communication_exception);
                    this.setState({
                      backWashMode: o,
                      washValue: s,
                    });

                  case 30:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[19, 26]],
            Promise
          );
        },
      },
      {
        key: 'onPressMopMode',
        value: function (t) {
          this.onSlidingComplete(t);
        },
      },
      {
        key: 'onSlidingComplete',
        value: function (t) {
          var o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.SelfCleaningSetDidChange, {
                      name: 'backWashMode',
                      mode: this.state.backWashMode,
                      value: t,
                    });
                    s.prev = 1;
                    o = 60 * parseInt(t);
                    s.next = 5;
                    return regeneratorRuntime.default.awrap(module416.default.setSmartWashParams(0, o));

                  case 5:
                    s.next = 12;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(1);
                    globals.showToast(module510.robot_communication_exception);
                    console.log(s.t0);

                  case 12:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[1, 8]],
            Promise
          );
        },
      },
      {
        key: 'onSlidingMove',
        value: function (t) {
          this.setState({
            washValue: t,
          });
        },
      },
      {
        key: 'getSmartWashParams',
        value: function () {
          var t, o, s, l;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    h.prev = 0;
                    h.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getSmartWashParams());

                  case 3:
                    t = h.sent;
                    o = parseInt(t.result.wash_interval / 60);
                    s = t.result.smart_wash;
                    l = 1 == s ? 0 : o % 5 ? 2 : 1;
                    this.setState({
                      backWashMode: l,
                      washValue: o,
                    });
                    h.next = 14;
                    break;

                  case 10:
                    h.prev = 10;
                    h.t0 = h.catch(0);
                    globals.showToast(module510.robot_communication_exception);
                    console.log(h.t0);

                  case 14:
                  case 'end':
                    return h.stop();
                }
            },
            null,
            this,
            [[0, 10]],
            Promise
          );
        },
      },
    ]);
    return I;
  })(React.Component);

exports.default = module2076;
module2076.contextType = module1199.AppConfigContext;
var V = module13.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containterScroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  infoTextView: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoText: {
    color: 'rgba(0,0,0,0.3)',
    left: 15,
    paddingBottom: 10,
    fontSize: 16,
  },
  backWashInfoTextView: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 30,
  },
  backWashInfoText: {
    color: 'rgba(0,0,0,0.3)',
    paddingLeft: 20,
    paddingRight: 5,
    fontSize: 16,
  },
  subInfoText: {
    color: 'rgba(0,0,0,0.3)',
    bottom: -1,
    fontSize: 16,
  },
  rightImgStyle: {
    width: 22,
    height: 22,
    marginTop: -2,
    transform: [],
  },
  ignoreCarpetStyle: {
    position: 'absolute',
    minWidth: 0,
    minHeight: 0,
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 30,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
  },
  section: {
    paddingVertical: 10,
  },
  washView: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backWashDesc: {
    alignSelf: 'flex-start',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    color: '#a5a5a5',
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  backWashTip: {
    alignSelf: 'flex-start',
    fontSize: 12,
    paddingHorizontal: 15,
    paddingTop: 10,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
});

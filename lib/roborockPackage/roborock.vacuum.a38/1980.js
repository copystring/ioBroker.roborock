var n = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  l = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module414 = require('./414'),
  module394 = require('./394'),
  module381 = require('./381'),
  module515 = require('./515'),
  module418 = require('./418');

function _() {
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
  module389 = require('./389'),
  C = 0,
  module1938 = (function (t) {
    module7.default(B, t);

    var o = B,
      module515 = _(),
      module1938 = function () {
        var t,
          n = module11.default(o);

        if (module515) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function B(t) {
      var o;
      l.default(this, B);
      o = module1938.call(this, t);
      var n = t.navigation.state.params || {};
      o.state = {
        isTimeSetting: n.isTimeSetting,
        titleSelected: module394.default.sharedCache().washTowelMode,
        loading: true,
        requestFailed: false,
        refreshing: false,
        washValue: 0,
        backWashMode: 0,
      };
      return o;
    }

    module5.default(B, [
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
          var t = this;
          return [
            {
              title: module500.wash_towel_mode_title_1,
              bottomDetail: module500.wash_towel_mode_des_1,
              funcId: 'wash_towel_mode_1',
              onPress: function () {
                return t.onChangeWashTowelMode(module389.WashTowelModeMap.WashTowelModeQuick);
              },
              visible: true,
              shouldShowBottomLine: true,
              bottomDetailWidth: module12.Dimensions.get('window').width - 70,
              selected: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeQuick,
              shouldShowRightArrow: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeQuick,
            },
            {
              title: module500.wash_towel_mode_title_2,
              bottomDetail: module500.wash_towel_mode_des_2,
              funcId: 'wash_towel_mode_2',
              onPress: function () {
                return t.onChangeWashTowelMode(module389.WashTowelModeMap.WashTowelModeDaily);
              },
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              bottomDetailWidth: module12.Dimensions.get('window').width - 70,
              selected: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeDaily,
              shouldShowRightArrow: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeDaily,
            },
            {
              title: module500.wash_towel_mode_title_3,
              bottomDetail: module500.wash_towel_mode_des_3,
              funcId: 'wash_towel_mode_3',
              onPress: function () {
                return t.onChangeWashTowelMode(module389.WashTowelModeMap.WashTowelModeDeep);
              },
              visible: true,
              shouldShowBottomLine: false,
              bottomDetailWidth: module12.Dimensions.get('window').width - 70,
              selected: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeDeep,
              shouldShowRightArrow: this.state.titleSelected == module389.WashTowelModeMap.WashTowelModeDeep,
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
          React.default.createElement(module12.View, {
            style: {
              width: module12.Dimensions.get('window').width - 20,
              top: 0,
              height: 0.8,
              marginLeft: 20,
              backgroundColor: this.context.theme.settingListItem.borderColor,
            },
          });
          var t = this,
            o = this.context.theme,
            s = module381.RSM.mapSaveEnabled,
            l = {
              title: module500.back_wash_title1,
              bottomDetail: module500.back_wash_desc,
              onPress: function () {
                return t.onChangeBackWashMode(module389.BackWashModeMap.BackWashModeSmart);
              },
              shouldShowBottomLine: true,
              selected: this.state.backWashMode == module389.BackWashModeMap.BackWashModeSmart,
              shouldShowRightArrow: this.state.backWashMode == module389.BackWashModeMap.BackWashModeSmart,
              funcId: 'back_wash_mode_1',
            },
            c = {
              title: module500.back_wash_title2,
              bottomDetail: module500.back_wash_desc1,
              onPress: function () {
                return t.onChangeBackWashMode(module389.BackWashModeMap.BackWashModeCustom);
              },
              shouldShowBottomLine: false,
              selected: this.state.backWashMode == module389.BackWashModeMap.BackWashModeCustom,
              shouldShowRightArrow: this.state.backWashMode == module389.BackWashModeMap.BackWashModeCustom,
              funcId: 'back_wash_mode_2',
            },
            h =
              this.state.backWashMode != module389.BackWashModeMap.BackWashModeCustom
                ? null
                : React.default.createElement(module385.FatSlider, {
                    sliderWidth: module12.Dimensions.get('window').width - 70,
                    minimumValue: 10,
                    maximumValue: 50,
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
            module12.View,
            {
              style: [
                D.washView,
                {
                  backgroundColor: o.settingListItem.backgroundColor,
                },
              ],
            },
            s &&
              React.default.createElement(
                module385.SettingListItemView,
                n.default({}, l, {
                  key: 0,
                  titleColor: 'rgba(0,0,0,0.8)',
                  style: {
                    width: module12.Dimensions.get('window').width - 30,
                  },
                  rightImgStyle: D.rightImgStyle,
                  bottomDetailWidth: module12.Dimensions.get('window').width - 90,
                  rightCenter: false,
                  isDetailCenter: false,
                  rightSrc: require('./1938'),
                })
              ),
            React.default.createElement(
              module385.SettingListItemView,
              n.default({}, c, {
                key: 1,
                titleColor: 'rgba(0,0,0,0.8)',
                style: {
                  width: module12.Dimensions.get('window').width - 30,
                },
                rightImgStyle: D.rightImgStyle,
                bottomDetailWidth: module12.Dimensions.get('window').width - 90,
                rightCenter: false,
                isDetailCenter: false,
                rightSrc: require('./1938'),
              })
            ),
            h
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            s = React.default.createElement(module385.RequestRetryView, {
              onPressButton: function () {
                C = 0;
                t.initData(false);
              },
            });
          if (this.state.requestFailed) return s;
          var l = React.default.createElement(
            module12.View,
            {
              style: [
                D.containterView,
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
          var module1938 = this.getMenus().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      n.default({}, t, {
                        key: o,
                        fontSize: 16,
                        rightImgStyle: D.rightImgStyle,
                        rightCenter: false,
                        isDetailCenter: false,
                        width: module12.Dimensions.get('window').width - 30,
                        rightSrc: require('./1938'),
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: D.sectionTitle,
                        key: o,
                      },
                      t.sectionTitle
                    )
                : null;
            }),
            h = this.state.backWashMode ? module500.back_wash_desc3 : module500.back_wash_desc2;
          return React.default.createElement(
            module12.View,
            {
              style: [
                D.containter,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: D.containterScroll,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module12.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    C = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(
                module12.View,
                null,
                React.default.createElement(module12.View, {
                  style: D.section,
                }),
                React.default.createElement(
                  module12.View,
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
                      module12.Text,
                      {
                        style: [
                          D.backWashTip,
                          {
                            color: '#a5a5a5',
                          },
                        ],
                      },
                      h
                    )
                  : null,
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      borderRadius: 8,
                      overflow: 'hidden',
                      marginHorizontal: 15,
                    },
                  },
                  !this.state.isTimeSetting && module1938
                )
              ),
              React.default.createElement(module12.View, {
                style: D.section,
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
                    C = 0;
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

          if (C < 3) {
            C++;
            setTimeout(function () {
              console.log('retryTimes:' + C);
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
          var o, n;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    o = this.state.titleSelected;
                    this.setState({
                      titleSelected: t,
                    });
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.SelfCleaningSetDidChange, {
                      name: 'washTowelMode',
                      mode: t,
                    });
                    l.prev = 3;
                    l.next = 6;
                    return regeneratorRuntime.default.awrap(module414.default.setWashTowelMode(t));

                  case 6:
                    n = l.sent;
                    module394.default.sharedCache().washTowelMode = t;
                    console.log('onChangeWashTowelMode: ' + JSON.stringify(n));
                    l.next = 16;
                    break;

                  case 11:
                    l.prev = 11;
                    l.t0 = l.catch(3);
                    globals.showToast(module500.robot_communication_exception);
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
                    return regeneratorRuntime.default.awrap(module414.default.getWashTowelMode());

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
                    globals.showToast(module500.robot_communication_exception);
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
          var o, n, l, module5;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    if (((o = this.state.backWashMode), t != o)) {
                      h.next = 3;
                      break;
                    }

                    return h.abrupt('return');

                  case 3:
                    this.setState({
                      backWashMode: t,
                    });
                    n = 20;
                    l = false;
                    h.t0 = t;
                    h.next =
                      h.t0 === module389.BackWashModeMap.BackWashModeSmart
                        ? 9
                        : h.t0 === module389.BackWashModeMap.BackWashModeCustom
                        ? 12
                        : h.t0 === module389.BackWashModeMap.BackWashModeLevel
                        ? 15
                        : 18;
                    break;

                  case 9:
                    n = 20;
                    l = true;
                    return h.abrupt('break', 18);

                  case 12:
                    n = this.state.washValue ? this.state.washValue : n;
                    l = false;
                    return h.abrupt('break', 18);

                  case 15:
                    n = 21;
                    l = false;
                    return h.abrupt('break', 18);

                  case 18:
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.SelfCleaningSetDidChange, {
                      name: 'backWashMode',
                      mode: t,
                      value: n,
                    });
                    h.prev = 19;
                    module5 = 60 * n;
                    h.next = 23;
                    return regeneratorRuntime.default.awrap(module414.default.setSmartWashParams(l ? 1 : 0, module5));

                  case 23:
                    h.next = 30;
                    break;

                  case 26:
                    h.prev = 26;
                    h.t1 = h.catch(19);
                    globals.showToast(module500.robot_communication_exception);
                    this.setState({
                      backWashMode: o,
                      washValue: n,
                    });

                  case 30:
                  case 'end':
                    return h.stop();
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.SelfCleaningSetDidChange, {
                      name: 'backWashMode',
                      mode: this.state.backWashMode,
                      value: t,
                    });
                    n.prev = 1;
                    o = 60 * parseInt(t);
                    n.next = 5;
                    return regeneratorRuntime.default.awrap(module414.default.setSmartWashParams(0, o));

                  case 5:
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(1);
                    globals.showToast(module500.robot_communication_exception);
                    console.log(n.t0);

                  case 12:
                  case 'end':
                    return n.stop();
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
          var t, o, n, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.getSmartWashParams());

                  case 3:
                    t = c.sent;
                    o = parseInt(t.result.wash_interval / 60);
                    n = t.result.smart_wash;
                    l = 1 == n ? 0 : o % 5 ? 2 : 1;
                    this.setState({
                      backWashMode: l,
                      washValue: o,
                    });
                    c.next = 14;
                    break;

                  case 10:
                    c.prev = 10;
                    c.t0 = c.catch(0);
                    globals.showToast(module500.robot_communication_exception);
                    console.log(c.t0);

                  case 14:
                  case 'end':
                    return c.stop();
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
    return B;
  })(React.Component);

exports.default = module1938;
module1938.contextType = module515.AppConfigContext;
var D = module12.StyleSheet.create({
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
    marginTop: -5,
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

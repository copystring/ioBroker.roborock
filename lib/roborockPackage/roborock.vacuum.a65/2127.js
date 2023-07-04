var n = require('./22'),
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
  module1200 = require('./1200'),
  module2128 = require('./2128'),
  module390 = require('./390'),
  module424 = require('./424'),
  module1347 = require('./1347');

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
  C = 0,
  module2077 = (function (t) {
    module9.default(E, t);

    var o = E,
      module1200 = T(),
      module2130 = function () {
        var t,
          n = module12.default(o);

        if (module1200) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function E(t) {
      var o;
      l.default(this, E);
      o = module2130.call(this, t);
      t.navigation.state.params;
      o.state = {
        carpetPressurizeSwitch: false,
        titleSelected: module394.default.sharedCache().washTowelMode,
        loading: true,
        requestFailed: false,
        refreshing: false,
        washValue: 0,
        backWashMode: 0,
        isStartDryerSwitchOn: false,
        dryTime: 7200,
      };
      return o;
    }

    module7.default(E, [
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
                      title: module510.wash_towel_title,
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
              shouldShowBottomLine: false,
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
              visible: module390.default.isSuperDeepWashSupported() && module381.RSM.isUpdownWaterReady,
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
            s = [
              {
                name: module510.back_wash_title4,
                value: 36,
              },
              {
                name: module510.dust_collection_title_3,
                value: 21,
              },
              {
                name: module510.back_wash_title5,
                value: 14,
              },
            ],
            l = module381.RSM.mapSaveEnabled,
            c = {
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
            u =
              this.state.backWashMode != module389.BackWashModeMap.BackWashModeCustom
                ? null
                : React.default.createElement(module385.FatSlider, {
                    sliderWidth: module13.Dimensions.get('window').width - 70,
                    minimumValue: 10,
                    maximumValue: module424.DMM.isPearl ? 30 : 25,
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
          if (!(this.state.backWashMode != module389.BackWashModeMap.BackWashModeLevel))
            React.default.createElement(module2128.default, {
              ref: function (o) {
                t.washModeSetView = o;
              },
              style: {
                marginBottom: 20,
                marginHorizontal: 20,
              },
              items: s,
              value: this.state.washValue,
              onPressButton: this.onPressMopMode.bind(this),
            });
          return React.default.createElement(
            module13.View,
            {
              style: [
                I.washView,
                {
                  backgroundColor: o.settingListItem.backgroundColor,
                },
              ],
            },
            l &&
              React.default.createElement(
                module385.SettingListItemView,
                n.default({}, c, {
                  key: 0,
                  titleColor: 'rgba(0,0,0,0.8)',
                  style: {
                    width: module13.Dimensions.get('window').width - 30,
                  },
                  rightImgStyle: I.rightImgStyle,
                  bottomDetailWidth: module13.Dimensions.get('window').width - 90,
                  rightCenter: false,
                  isDetailCenter: false,
                  rightSrc: require('./2077'),
                })
              ),
            React.default.createElement(
              module385.SettingListItemView,
              n.default({}, h, {
                key: 1,
                titleColor: 'rgba(0,0,0,0.8)',
                style: {
                  width: module13.Dimensions.get('window').width - 30,
                },
                rightImgStyle: I.rightImgStyle,
                bottomDetailWidth: module13.Dimensions.get('window').width - 90,
                rightCenter: false,
                isDetailCenter: false,
                rightSrc: require('./2077'),
              })
            ),
            u
          );
        },
      },
      {
        key: 'getDryerSettingView',
        value: function () {
          var t = this,
            o = this.context.theme,
            s = {
              title: module510.dock_kit_setting5,
              shouldShowSwitch: true,
              switchOn: this.state.isStartDryerSwitchOn,
              switchValueChanged: this.onStartDryerSwitchValueChanged.bind(this),
              shouldShowBottomLine: false,
              funcId: 'back_wash_title1',
            },
            l = React.default.createElement(module13.View, {
              style: {
                width: module13.Dimensions.get('window').width - 50,
                top: 0,
                height: 0.8,
                marginLeft: 20,
                backgroundColor: this.context.theme.settingListItem.borderColor,
              },
            }),
            c = [
              {
                name: module510.dock_kit_setting2,
                value: 7200,
              },
              {
                name: module510.dock_kit_setting3,
                value: 10800,
              },
              {
                name: module510.dock_kit_setting1,
                value: 14400,
              },
            ],
            h = this.state.isStartDryerSwitchOn
              ? React.default.createElement(
                  module13.View,
                  null,
                  l,
                  React.default.createElement(
                    module13.Text,
                    {
                      style: [
                        I.titleText,
                        {
                          color: o.settingListItem.titleColor,
                        },
                      ],
                    },
                    module510.dock_kit_setting6
                  ),
                  React.default.createElement(module2128.default, {
                    ref: function (o) {
                      t.washModeSetView = o;
                    },
                    style: {
                      alignSelf: 'center',
                      width: module13.Dimensions.get('window').width - 70,
                    },
                    items: c,
                    value: this.state.dryTime,
                    onPressButton: this.onPressDryerTimeMode.bind(this),
                  })
                )
              : null;
          return React.default.createElement(
            module13.View,
            {
              style: [
                I.dryView,
                {
                  backgroundColor: o.settingListItem.backgroundColor,
                },
              ],
            },
            React.default.createElement(
              module385.SettingListItemView,
              n.default({}, s, {
                key: 2,
                style: {
                  width: module13.Dimensions.get('window').width - 30,
                },
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
            module13.View,
            {
              style: [
                I.containterView,
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
          var module2129 = this.getMenus().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      n.default({}, t, {
                        key: o,
                        fontSize: 16,
                        rightImgStyle: I.rightImgStyle,
                        rightCenter: false,
                        isDetailCenter: false,
                        width: module13.Dimensions.get('window').width - 30,
                        rightSrc: require('./2077'),
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module13.Text,
                      {
                        style: I.sectionTitle,
                        key: o,
                      },
                      t.sectionTitle
                    )
                : null;
            }),
            h = React.default.createElement(
              module13.View,
              null,
              React.default.createElement(module13.View, {
                style: I.section,
              }),
              React.default.createElement(
                module13.View,
                {
                  style: I.infoTextView,
                },
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      I.infoText,
                      {
                        color: this.context.theme.settingListItem.detailColor,
                      },
                    ],
                  },
                  module510.dock_kit_setting4
                )
              ),
              React.default.createElement(
                module13.View,
                {
                  style: {
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginHorizontal: 15,
                  },
                },
                this.getDryerSettingView()
              )
            ),
            u = this.state.backWashMode ? module510.back_wash_desc3 : module510.back_wash_desc2;
          return React.default.createElement(
            module13.View,
            {
              style: [
                I.containter,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module13.ScrollView,
              {
                style: I.containterScroll,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module13.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    C = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(
                module13.View,
                null,
                React.default.createElement(module13.View, {
                  style: I.section,
                }),
                React.default.createElement(
                  module13.View,
                  {
                    style: I.infoTextView,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: [
                        I.infoText,
                        {
                          color: this.context.theme.settingListItem.detailColor,
                        },
                      ],
                    },
                    module510.back_wash_time_setting
                  )
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: {
                      borderRadius: 8,
                      overflow: 'hidden',
                      marginHorizontal: 15,
                    },
                  },
                  this.getBackWashListView()
                ),
                this.state.backWashMode < 2
                  ? React.default.createElement(
                      module13.Text,
                      {
                        style: [
                          I.backWashTip,
                          {
                            color: '#a5a5a5',
                          },
                        ],
                      },
                      u
                    )
                  : null,
                React.default.createElement(module13.View, {
                  style: I.section,
                }),
                React.default.createElement(
                  module13.View,
                  {
                    style: I.infoTextView,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: [
                        I.infoText,
                        {
                          color: this.context.theme.settingListItem.detailColor,
                        },
                      ],
                    },
                    module510.wash_towel_mode_title
                  )
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: {
                      borderRadius: 8,
                      overflow: 'hidden',
                      marginHorizontal: 15,
                    },
                  },
                  module2129
                ),
                module390.default.isSupportedDrying() && h
              ),
              React.default.createElement(module13.View, {
                style: I.section,
              })
            ),
            React.default.createElement(module1347.default, {
              ref: function (o) {
                t.dryerGuideView = o;
              },
              parent: this,
              isModal: true,
              bgImage: module381.RSM.isO3Dock() ? require('./2129') : require('./2130'),
              topTitle: module510.dock_kit_setting11,
              context: module510.dock_kit_setting12,
              buttonInfo: [module510.localization_strings_Main_MainPage_11, module510.dock_kit_setting14],
              buttonFuncId: ['dryer_setting_guide_left', 'dryer_setting_guide_right'],
              onPressGoSetting: function () {
                return t.setStartDryerSwitch(true);
              },
            })
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
                    if (((o.t0 = module390.default.isSupportedDrying()), !o.t0)) {
                      o.next = 10;
                      break;
                    }

                    o.next = 10;
                    return regeneratorRuntime.default.awrap(this.getDryerSetting());

                  case 10:
                    this.finishLoading(false);
                    C = 0;
                    o.next = 18;
                    break;

                  case 14:
                    o.prev = 14;
                    o.t1 = o.catch(1);
                    console.log('initData - ' + o.t1);
                    this.retry(t);

                  case 18:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[1, 14]],
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
                    l.prev = 2;
                    l.next = 5;
                    return regeneratorRuntime.default.awrap(module416.default.setWashTowelMode(t));

                  case 5:
                    n = l.sent;
                    module394.default.sharedCache().washTowelMode = t;
                    console.log('onChangeWashTowelMode: ' + JSON.stringify(n));
                    l.next = 15;
                    break;

                  case 10:
                    l.prev = 10;
                    l.t0 = l.catch(2);
                    globals.showToast(module510.robot_communication_exception);
                    this.setState({
                      titleSelected: o,
                    });
                    console.log(l.t0);

                  case 15:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[2, 10]],
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
          var o, n, l, module7;
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
                    h.prev = 18;
                    module7 = 60 * n;
                    h.next = 22;
                    return regeneratorRuntime.default.awrap(module416.default.setSmartWashParams(l ? 1 : 0, module7));

                  case 22:
                    h.next = 29;
                    break;

                  case 25:
                    h.prev = 25;
                    h.t1 = h.catch(18);
                    globals.showToast(module510.robot_communication_exception);
                    this.setState({
                      backWashMode: o,
                      washValue: n,
                    });

                  case 29:
                  case 'end':
                    return h.stop();
                }
            },
            null,
            this,
            [[18, 25]],
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
                    n.prev = 0;
                    o = 60 * parseInt(t);
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(module416.default.setSmartWashParams(0, o));

                  case 4:
                    n.next = 11;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(0);
                    globals.showToast(module510.robot_communication_exception);
                    console.log(n.t0);

                  case 11:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            null,
            [[0, 7]],
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
                    return regeneratorRuntime.default.awrap(module416.default.getSmartWashParams());

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
                    globals.showToast(module510.robot_communication_exception);
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
      {
        key: 'getDryerSetting',
        value: function () {
          var t, o, n, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getDryerSetting());

                  case 3:
                    t = c.sent;
                    o = t.result.status;
                    n = t.result.on;
                    l = n.dry_time;
                    this.setState({
                      isStartDryerSwitchOn: !!o,
                      dryTime: l,
                    });
                    c.next = 13;
                    break;

                  case 10:
                    c.prev = 10;
                    c.t0 = c.catch(0);
                    console.log('getDryerSetting  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));

                  case 13:
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
      {
        key: 'setDryerSetting',
        value: function (t, o) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.setDryerSetting(t, o));

                  case 3:
                    this.setState({
                      dryTime: t,
                    });
                    n.next = 10;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(0);
                    console.log('setDryerSetting  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 10:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[0, 7]],
            Promise
          );
        },
      },
      {
        key: 'onStartDryerSwitchValueChanged',
        value: function (t) {
          if (t) {
            if (this.dryerGuideView) this.dryerGuideView.show();
          } else this.setStartDryerSwitch(t);
        },
      },
      {
        key: 'setStartDryerSwitch',
        value: function (t) {
          if (this.dryerGuideView) this.dryerGuideView.dismissModalView();
          this.setState({
            isStartDryerSwitchOn: t,
          });
          var o = t ? 1 : 0;
          this.setDryerSetting(this.state.dryTime, o);
        },
      },
      {
        key: 'onPressDryerTimeMode',
        value: function (t) {
          this.setDryerSetting(t, 1);
        },
      },
    ]);
    return E;
  })(React.Component);

exports.default = module2077;
module2077.contextType = module1200.AppConfigContext;
var I = module13.StyleSheet.create({
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
  dryView: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    alignSelf: 'flex-start',
    paddingLeft: 20,
    paddingVertical: 20,
    fontSize: 16,
  },
});

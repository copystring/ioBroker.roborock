require('./411');

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = k(o);
    if (n && n.has(t)) return n.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var u = l ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (u && (u.get || u.set)) Object.defineProperty(s, c, u);
        else s[c] = t[c];
      }

    s.default = t;
    if (n) n.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module407 = require('./407'),
  module390 = require('./390'),
  module386 = require('./386'),
  module377 = require('./377'),
  module506 = require('./506'),
  module2006 = require('./2006');

function k(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (k = function (t) {
    return t ? n : o;
  })(t);
}

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

var module491 = require('./491').strings,
  module385 = require('./385'),
  W = 0,
  V = (function (t) {
    module7.default(L, t);

    var module506 = L,
      k = x(),
      V = function () {
        var t,
          o = module11.default(module506);

        if (k) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function L(t) {
      var o;
      module4.default(this, L);
      o = V.call(this, t);
      var n = t.navigation.state.params || {};
      o.state = {
        carpetPressurizeSwitch: false,
        titleSelected: module390.default.sharedCache().washTowelMode,
        loading: true,
        requestFailed: false,
        refreshing: false,
        backWashSwitchOn: true,
        washValue: 0,
        dustCollectionSwitch: true,
        dustCollectionMode: module390.default.sharedCache().dustCollectionMode,
        dustCollectionVisible: n.dustCollectionVisible || false,
      };
      return o;
    }

    module5.default(L, [
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
                      title: module491.wash_towel_title,
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
              title: module491.wash_towel_mode_title_1,
              bottomDetail: module491.wash_towel_mode_des_1,
              funcId: 'wash_towel_mode_1',
              onPress: function () {
                return t.onChangeWashTowelMode(module385.WashTowelModeMap.WashTowelModeQuick);
              },
              visible: true,
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module385.WashTowelModeMap.WashTowelModeQuick,
              shouldShowRightArrow: this.state.titleSelected == module385.WashTowelModeMap.WashTowelModeQuick,
            },
            {
              title: module491.wash_towel_mode_title_2,
              bottomDetail: module491.wash_towel_mode_des_2,
              funcId: 'wash_towel_mode_2',
              onPress: function () {
                return t.onChangeWashTowelMode(module385.WashTowelModeMap.WashTowelModeDaily);
              },
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module385.WashTowelModeMap.WashTowelModeDaily,
              shouldShowRightArrow: this.state.titleSelected == module385.WashTowelModeMap.WashTowelModeDaily,
            },
            {
              title: module491.wash_towel_mode_title_3,
              bottomDetail: module491.wash_towel_mode_des_3,
              funcId: 'wash_towel_mode_3',
              onPress: function () {
                return t.onChangeWashTowelMode(module385.WashTowelModeMap.WashTowelModeDeep);
              },
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: true,
              selected: this.state.titleSelected == module385.WashTowelModeMap.WashTowelModeDeep,
              shouldShowRightArrow: this.state.titleSelected == module385.WashTowelModeMap.WashTowelModeDeep,
            },
          ];
        },
      },
      {
        key: 'getBackWashMenus',
        value: function () {
          return [
            {
              title: module491.back_wash_title,
              funcId: 'back_wash_1',
              shouldShowSwitch: true,
              switchOn: this.state.backWashSwitchOn,
              switchValueChanged: this.onBackWashSwitchValueChanged.bind(this),
              shouldShowBottomLine: false,
              visible: module377.RSM.mapSaveEnabled,
              shouldShowBottomLongLine: false,
              shouldShowTopLine: false,
              shouldShowTopLongLine: false,
            },
          ];
        },
      },
      {
        key: 'getDustCollectionSetting',
        value: function () {
          var t = this;
          return [
            {
              title: module491.dust_collection_title,
              funcId: 'setting_page_dust_collection',
              detail: 'detail',
              shouldShowSwitch: true,
              switchOn: this.state.dustCollectionSwitch,
              switchValueChanged: this.onDustCollectionValueChanged.bind(this),
              visible: true,
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              visible: this.state.dustCollectionVisible,
              shouldShowBottomLongLine: !this.state.dustCollectionSwitch || !this.showDustCollectionDetail(),
            },
            {
              title: module491.dust_collection_desc_title,
              funcId: 'setting_page_dust_collection_setting',
              detail: module2006.DustCollectionModes[this.state.dustCollectionMode]
                ? module2006.DustCollectionModes[this.state.dustCollectionMode].title
                : module491.dust_collection_title_1,
              onPress: function () {
                t.props.navigation.navigate('DustCollectionSettingPageNew', {
                  title: module491.dust_collection_desc_title,
                  dustCollectionMode: module2006.DustCollectionModes[t.state.dustCollectionMode] ? t.state.dustCollectionMode : 0,
                  onDustCollectionModeChange: function (o) {
                    t.setState({
                      dustCollectionMode: o,
                    });
                  },
                });
              },
              visible: this.state.dustCollectionVisible && this.state.dustCollectionSwitch && this.showDustCollectionDetail(),
              shouldShowBottomLongLine: true,
              detailWidth: 350,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            s = React.default.createElement(module381.RequestRetryView, {
              onPressButton: function () {
                W = 0;
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
            React.default.createElement(module381.Spinner, null)
          );
          if (this.state.loading) return l;

          var module1965 = this.getMenus().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module381.SettingListItemView,
                      module21.default({}, t, {
                        key: o,
                        fontSize: 16,
                        rightImgStyle: D.rightImgStyle,
                        bottomDetailWidth: module12.Dimensions.get('window').width - 60,
                        rightCenter: false,
                        isDetailCenter: false,
                        rightSrc: require('./1965'),
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
            u = this.getDustCollectionSetting().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module381.SettingListItemView,
                      module21.default({}, t, {
                        key: o,
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
                : React.default.createElement(module12.View, {
                    key: o,
                  });
            }),
            h = this.getBackWashMenus().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module381.SettingListItemView,
                      module21.default({}, t, {
                        key: o,
                        titleColor: 'rgba(0,0,0,0.8)',
                        style: {
                          width: module12.Dimensions.get('window').width,
                        },
                      })
                    )
                  : React.default.createElement(module12.View, {
                      style: D.section,
                      key: o,
                    })
                : React.default.createElement(module12.View, {
                    key: o,
                  });
            }),
            S = this.state.backWashSwitchOn
              ? null
              : React.default.createElement(module381.FatSlider, {
                  minimumValue: 10,
                  maximumValue: 50,
                  step: 5,
                  shouldShowValue: true,
                  shouldShowSideValue: false,
                  style: {
                    marginTop: module377.RSM.mapSaveEnabled ? 0 : 15,
                  },
                  value: this.state.washValue,
                  onSlidingComplete: this.onSlidingComplete.bind(this),
                  onSlidingMove: this.onSlidingMove.bind(this),
                }),
            _ = this.state.backWashSwitchOn ? module491.back_wash_desc : module491.back_wash_desc1,
            v = this.state.backWashSwitchOn ? module491.dust_collection_title_1 : this.state.washValue + 'min',
            b = this.state.backWashSwitchOn ? module491.back_wash_desc2 : module491.back_wash_desc3;

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
                    W = 0;
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
                    style: D.infoTextView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        D.infoText,
                        {
                          color: this.context.theme.settingListItem.detailColor,
                        },
                      ],
                    },
                    module491.back_wash_time_setting
                  ),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        D.subInfoText,
                        {
                          color: '#3384ff',
                          paddingVertical: 10,
                        },
                      ],
                    },
                    v
                  )
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      D.washView,
                      {
                        backgroundColor: o.settingListItem.backgroundColor,
                      },
                    ],
                  },
                  h,
                  S,
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        D.backWashDesc,
                        {
                          marginTop: this.state.backWashSwitchOn ? 0 : 12,
                        },
                      ],
                    },
                    _
                  ),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        D.backWashTip,
                        {
                          color: this.state.backWashSwitchOn ? '#E22920' : '#a5a5a5',
                        },
                      ],
                    },
                    b
                  )
                ),
                React.default.createElement(module12.View, {
                  style: D.section,
                }),
                React.default.createElement(
                  module12.View,
                  {
                    style: D.infoTextView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        D.infoText,
                        {
                          color: this.context.theme.settingListItem.detailColor,
                        },
                      ],
                    },
                    module491.wash_towel_mode_title
                  )
                ),
                module1965,
                React.default.createElement(module12.View, {
                  style: D.section,
                })
              ),
              this.state.dustCollectionVisible &&
                React.default.createElement(
                  module12.View,
                  {
                    style: D.infoTextView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        D.infoText,
                        {
                          color: this.context.theme.settingListItem.detailColor,
                        },
                      ],
                    },
                    module491.dust_collection_setting_title
                  )
                ),
              u,
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.setState({
                      loading: !t,
                      requestFailed: false,
                      refreshing: t,
                    });
                    n.prev = 1;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(this.getWashTowelModeStatus());

                  case 4:
                    n.next = 6;
                    return regeneratorRuntime.default.awrap(this.getSmartWashParams());

                  case 6:
                    if (!this.state.dustCollectionVisible) {
                      n.next = 9;
                      break;
                    }

                    n.next = 9;
                    return regeneratorRuntime.default.awrap(this.getDustCollectionStatus());

                  case 9:
                    if (!this.showDustCollectionDetail()) {
                      n.next = 12;
                      break;
                    }

                    n.next = 12;
                    return regeneratorRuntime.default.awrap(this.getDustCollectionModeStatus());

                  case 12:
                    this.finishLoading(false);
                    W = 0;
                    n.next = 20;
                    break;

                  case 16:
                    n.prev = 16;
                    n.t0 = n.catch(1);
                    console.log('initData - ' + n.t0);
                    this.retry(t);

                  case 20:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[1, 16]],
            Promise
          );
        },
      },
      {
        key: 'retry',
        value: function (t) {
          var o = this;

          if (W < 3) {
            W++;
            setTimeout(function () {
              console.log('retryTimes:' + W);
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
          var module21, s;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    module21 = this.state.titleSelected;
                    this.setState({
                      titleSelected: t,
                    });
                    l.prev = 2;
                    l.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.setWashTowelMode(t));

                  case 5:
                    s = l.sent;
                    module390.default.sharedCache().washTowelMode = t;
                    console.log('onChangeWashTowelMode: ' + JSON.stringify(s));
                    l.next = 15;
                    break;

                  case 10:
                    l.prev = 10;
                    l.t0 = l.catch(2);
                    globals.showToast(module491.robot_communication_exception);
                    this.setState({
                      titleSelected: module21,
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getWashTowelMode());

                  case 3:
                    t = n.sent;
                    console.log('getWashTowelModeStatus: ' + JSON.stringify(t));
                    this.setState({
                      titleSelected: t.result.wash_mode,
                    });
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module491.robot_communication_exception);
                    console.log(n.t0);

                  case 12:
                  case 'end':
                    return n.stop();
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
        key: 'onBackWashSwitchValueChanged',
        value: function (t) {
          var module21, s;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    this.setState({
                      backWashSwitchOn: t,
                      washValue: 20,
                    });
                    module21 = 1200;
                    l.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.setSmartWashParams(t ? 1 : 0, module21));

                  case 5:
                    s = l.sent;
                    console.log('onBackWashSwitchValueChanged:' + JSON.stringify(s));
                    l.next = 13;
                    break;

                  case 9:
                    l.prev = 9;
                    l.t0 = l.catch(0);
                    globals.showToast(module491.robot_communication_exception);
                    console.log(l.t0);

                  case 13:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[0, 9]],
            Promise
          );
        },
      },
      {
        key: 'onSlidingComplete',
        value: function (t) {
          var module21, module4, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    module21 = 60 * parseInt(t);
                    module4 = this.state.backWashSwitchOn ? 1 : 0;
                    c.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.setSmartWashParams(module4, module21));

                  case 5:
                    l = c.sent;
                    console.log('onSlidingComplete:' + JSON.stringify(l));
                    c.next = 13;
                    break;

                  case 9:
                    c.prev = 9;
                    c.t0 = c.catch(0);
                    globals.showToast(module491.robot_communication_exception);
                    console.log(c.t0);

                  case 13:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[0, 9]],
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
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getSmartWashParams());

                  case 3:
                    t = s.sent;
                    n = parseInt(t.result.wash_interval / 60);
                    console.log('getSmartWashParams:' + JSON.stringify(t));
                    this.setState({
                      backWashSwitchOn: 1 == t.result.smart_wash,
                      washValue: n,
                    });
                    if (!(module377.RSM.mapSaveEnabled || 1 != t.result.smart_wash)) this.onBackWashSwitchValueChanged(false);
                    s.next = 14;
                    break;

                  case 10:
                    s.prev = 10;
                    s.t0 = s.catch(0);
                    globals.showToast(module491.robot_communication_exception);
                    console.log(s.t0);

                  case 14:
                  case 'end':
                    return s.stop();
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
        key: 'onDustCollectionValueChanged',
        value: function (t) {
          var n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    this.setState({
                      dustCollectionSwitch: t,
                    });
                    s.prev = 1;
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.setDustCollectionStatus(t ? 1 : 0));

                  case 4:
                    n = s.sent;
                    console.log('_onDustCollectionValueChanged - ' + JSON.stringify(n));
                    s.next = 13;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(1);
                    this.setState({
                      dustCollectionSwitch: !t,
                    });
                    globals.showToast(module491.robot_communication_exception);
                    console.log(s.t0);

                  case 13:
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
        key: 'getDustCollectionModeStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getDustCollectionMode());

                  case 3:
                    t = n.sent;
                    console.log('getDustCollectionModeStatus: ' + JSON.stringify(t));
                    this.setState({
                      titleSelected: t.result.mode,
                    });
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module491.robot_communication_exception);
                    console.log(n.t0);

                  case 12:
                  case 'end':
                    return n.stop();
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
        key: 'getDustCollectionStatus',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getDustCollectionStatus());

                  case 3:
                    t = s.sent;
                    console.log('getDustCollectionModeStatus - ' + JSON.stringify(t));
                    n = t.result.status;
                    this.setState({
                      dustCollectionSwitch: 1 == n,
                    });
                    s.next = 14;
                    break;

                  case 9:
                    s.prev = 9;
                    s.t0 = s.catch(0);
                    console.log(s.t0);
                    this.setState({
                      refreshing: false,
                    });
                    this.setState({
                      dustCollectionVisible: false,
                    });

                  case 14:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[0, 9]],
            Promise
          );
        },
      },
      {
        key: 'showDustCollectionDetail',
        value: function () {
          return module386.default.isDustCollectionSettingSupported() && module377.RSM.isCollectDustDock;
        },
      },
    ]);
    return L;
  })(React.Component);

exports.default = V;
V.contextType = module506.AppConfigContext;
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
    paddingLeft: 20,
    paddingRight: 5,
    paddingVertical: 10,
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
    paddingVertical: 7,
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
    paddingHorizontal: 20,
    marginBottom: 15,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
});

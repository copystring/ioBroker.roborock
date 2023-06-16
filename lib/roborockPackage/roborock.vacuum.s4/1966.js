var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = x(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var u = s ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (u && (u.get || u.set)) Object.defineProperty(l, c, u);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module407 = require('./407'),
  module411 = require('./411'),
  module390 = require('./390'),
  module386 = require('./386'),
  module377 = require('./377'),
  module506 = require('./506'),
  module415 = require('./415'),
  module1261 = require('./1261');

function x(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (x = function (t) {
    return t ? o : n;
  })(t);
}

function T() {
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
  V = 0,
  D = (function (t) {
    module7.default(F, t);

    var module506 = F,
      x = T(),
      D = function () {
        var t,
          n = module11.default(module506);

        if (x) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function F(t) {
      var n;
      module4.default(this, F);
      (n = D.call(this, t)).unMount = false;
      n.state = {
        carpetPressurizeSwitch: false,
        titleSelected: module390.default.sharedCache().carPetCleanMode,
        loading: true,
        requestFailed: false,
        refreshing: false,
      };
      return n;
    }

    module5.default(F, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.unMount = true;
        },
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
                      title: module491.carpet_clean_mode_setting_title,
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
              title: module491.carpet_clean_mode_setting_title2,
              funcId: 'carpet_clean_mode_1',
              bottomDetail: module491.carpet_clean_mode_setting_sub_title2,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module385.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden);
              },
              visible: module386.default.isSelfAdaptionCarpetSupported(),
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module385.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden,
              shouldShowRightArrow: this.state.titleSelected == module385.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden,
            },
            {
              title: module491.carpet_clean_mode_setting_title1,
              funcId: 'carpet_clean_mode_2',
              bottomDetail: module491.carpet_clean_mode_setting_sub_title1,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module385.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden);
              },
              visible: module386.default.isAvoidCarpetSupported(),
              shouldShowTopLongLine: !module386.default.isSelfAdaptionCarpetSupported(),
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module385.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden,
              shouldShowRightArrow: this.state.titleSelected == module385.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden,
            },
            {
              title: module491.carpet_clean_mode_setting_title3,
              funcId: 'carpet_clean_mode_3',
              bottomDetail: module491.carpet_clean_mode_setting_sub_title3,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module385.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden);
              },
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: true,
              selected: this.state.titleSelected == module385.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden,
              shouldShowRightArrow: this.state.titleSelected == module385.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden,
            },
          ];
        },
      },
      {
        key: 'getTopMenus',
        value: function () {
          return [
            {
              title: module491.setting_carpet_mode_title,
              funcId: 'carpet_clean_mode_switch',
              bottomDetail: module491.setting_carpet_mode_text,
              shouldShowSwitch: true,
              switchOn: this.state.carpetPressurizeSwitch,
              switchValueChanged: this._onCarpetPressurizeSwitchValueChanged.bind(this),
              shouldShowBottomLine: true,
              visible: !module386.default.shouldHideCarpetPressurize(),
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            l = React.default.createElement(module381.RequestRetryView, {
              onPressButton: function () {
                V = 0;
                t.initData(false);
              },
            });
          if (this.state.requestFailed) return l;
          var s = React.default.createElement(
            module12.View,
            {
              style: [
                E.containterView,
                {
                  backgroundColor: globals.app.state.theme.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ],
            },
            React.default.createElement(module381.Spinner, null)
          );
          if (this.state.loading) return s;
          var c = this.getTopMenus().map(function (t, n) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module381.SettingListItemView,
                      module21.default({}, t, {
                        key: n,
                        titleColor: 'rgba(0,0,0,0.8)',
                        style: {
                          width: module12.Dimensions.get('window').width,
                        },
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: E.sectionTitle,
                        key: n,
                      },
                      t.sectionTitle
                    )
                : null;
            }),
            module1967 = this.getMenus().map(function (t, n) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module381.SettingListItemView,
                      module21.default({}, t, {
                        key: n,
                        fontSize: 16,
                        rightImgStyle: E.rightImgStyle,
                        bottomDetailWidth: module12.Dimensions.get('window').width - 60,
                        rightCenter: false,
                        isDetailCenter: false,
                        rightSrc: require('./1967'),
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: E.sectionTitle,
                        key: n,
                      },
                      t.sectionTitle
                    )
                : null;
            }),
            h = module415.DMM.isTopazS ? module491.carpet_clean_mode_setting_way : module491.carpet_clean_mode_setting_way + module491.carpet_clean_mode_setting_way1;
          return React.default.createElement(
            module12.View,
            {
              style: [
                E.containter,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: E.containterScroll,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module12.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    V = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(module12.View, {
                style: E.section,
              }),
              c,
              module386.default.isShowCarpetSweeperView() &&
                React.default.createElement(
                  module12.View,
                  {
                    style: E.infoTextView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        E.infoText,
                        {
                          color: this.context.theme.settingListItem.detailColor,
                        },
                      ],
                    },
                    h
                  )
                ),
              module386.default.isShowCarpetSweeperView() && module1967,
              module386.default.isAvoidCarpetSupported() &&
                React.default.createElement(
                  module12.View,
                  {
                    style: E.infoTextView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        E.infoText,
                        {
                          marginTop: 0,
                          lineHeight: 20,
                          color: this.context.theme.settingListItem.detailColor,
                        },
                      ],
                    },
                    module491.carpet_clean_mode_setting_way_info
                  )
                )
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
                    if (
                      (this.setState({
                        loading: !t,
                        requestFailed: false,
                        refreshing: t,
                      }),
                      (o.prev = 1),
                      !!module386.default.shouldHideCarpetPressurize())
                    ) {
                      o.next = 6;
                      break;
                    }

                    o.next = 6;
                    return regeneratorRuntime.default.awrap(this.getCarpetPressurizeStatus());

                  case 6:
                    o.next = 8;
                    return regeneratorRuntime.default.awrap(this.getCarpetCleanModeStatus());

                  case 8:
                    if (!this.unMount)
                      this.setState({
                        refreshing: false,
                      });
                    if (!this.unMount) this.finishLoading(false);
                    V = 0;
                    o.next = 17;
                    break;

                  case 13:
                    o.prev = 13;
                    o.t0 = o.catch(1);
                    console.log('initData - ' + JSON.stringify(o.t0));
                    this.retry(t);

                  case 17:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[1, 13]],
            Promise
          );
        },
      },
      {
        key: 'retry',
        value: function (t) {
          var n = this;
          if (!this.unMount)
            V < 3
              ? (V++,
                setTimeout(function () {
                  console.warn('retryTimes:' + V);
                  n.initData(t);
                }, 1e3))
              : this.setState({
                  requestFailed: true,
                });
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          this.setState({
            requestFailed: t,
          });
          if (this.state.loading)
            this.setState({
              loading: false,
            });
        },
      },
      {
        key: 'onChangeCarpetCleanMode',
        value: function (t) {
          var module21, l;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (!module377.RSM.isRunning) {
                      s.next = 3;
                      break;
                    }

                    module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                      globals.showToast(module491.robot_communication_exception);
                    });
                    return s.abrupt('return');

                  case 3:
                    module21 = this.state.mode;
                    this.setState({
                      titleSelected: t,
                    });
                    s.prev = 5;
                    s.next = 8;
                    return regeneratorRuntime.default.awrap(module407.default.setCarpetCleanMode(t));

                  case 8:
                    l = s.sent;
                    module390.default.sharedCache().carPetCleanMode = t;
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.CarpetCleanModeDidChange);
                    console.log('onChangeCarpetCleanMode: ' + JSON.stringify(l));
                    s.next = 19;
                    break;

                  case 14:
                    s.prev = 14;
                    s.t0 = s.catch(5);
                    globals.showToast(module491.robot_communication_exception);
                    this.setState({
                      titleSelected: module21,
                    });
                    console.log(s.t0);

                  case 19:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[5, 14]],
            Promise
          );
        },
      },
      {
        key: 'getCarpetCleanModeStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getCarpetCleanMode());

                  case 3:
                    t = o.sent;
                    console.log('getCarpetCleanStatus: ' + JSON.stringify(t));
                    if (!this.unMount)
                      this.setState({
                        titleSelected: t.result[0].carpet_clean_mode,
                      });
                    o.next = 12;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    globals.showToast(module491.robot_communication_exception);
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
        key: '_onCarpetPressurizeSwitchValueChanged',
        value: function (t) {
          var module21, module4, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    module21 = module386.default.isCarpetPressurizeSwitchUseNewPara();
                    module4 = {
                      enable: t ? 1 : 0,
                      current_integral: module21 ? 550 : 450,
                      current_high: module21 ? 625 : 500,
                      current_low: module21 ? 500 : 400,
                      stall_time: 10,
                    };
                    c.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.setCarpetMode(module4));

                  case 5:
                    s = c.sent;
                    console.log('_onCarpetPressurizeSwitchValueChanged:' + JSON.stringify(s));
                    if (!this.unMount)
                      this.setState({
                        carpetPressurizeSwitch: t,
                      });
                    c.next = 14;
                    break;

                  case 10:
                    c.prev = 10;
                    c.t0 = c.catch(0);
                    globals.showToast(module491.robot_communication_exception);
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
        key: 'getCarpetPressurizeStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getCarpetMode());

                  case 3:
                    t = o.sent;
                    console.log('getCarpetPressurizeStatus: ' + JSON.stringify(t));
                    if (!this.unMount)
                      this.setState({
                        carpetPressurizeSwitch: 1 == t.result[0].enable,
                      });
                    o.next = 12;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    globals.showToast(module491.robot_communication_exception);
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
    ]);
    return F;
  })(React.Component);

exports.default = D;
D.contextType = module506.AppConfigContext;
var E = module12.StyleSheet.create({
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
    marginBottom: 65,
  },
  infoTextView: {
    backgroundColor: 'transparent',
  },
  infoText: {
    color: 'rgba(0,0,0,0.3)',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
  },
  rightImgStyle: {
    width: 22,
    height: 22,
    marginTop: -5,
  },
  section: {
    paddingVertical: 7,
  },
});

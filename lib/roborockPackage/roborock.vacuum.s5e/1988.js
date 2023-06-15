var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module415 = require('./415'),
  module419 = require('./419'),
  module394 = require('./394'),
  module390 = require('./390'),
  module381 = require('./381'),
  module1121 = require('./1121'),
  module423 = require('./423'),
  module1122 = require('./1122');

function D() {
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
  module389 = require('./389'),
  L = 0,
  V = (function (t) {
    module7.default(z, t);

    var n = z,
      module1121 = D(),
      V = function () {
        var t,
          o = module11.default(n);

        if (module1121) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function z(t) {
      var n;
      module4.default(this, z);
      (n = V.call(this, t)).unMount = false;
      n.state = {
        carpetPressurizeSwitch: false,
        isCarpetDeepCleanSwitchOn: false,
        titleSelected: module394.default.sharedCache().carPetCleanMode,
        loading: true,
        requestFailed: false,
        refreshing: false,
      };
      return n;
    }

    module5.default(z, [
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
                      title: module505.carpet_clean_mode_setting_title,
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
              title: module505.carpet_clean_mode_setting_title4,
              funcId: 'carpet_clean_mode_4',
              bottomDetail: module505.carpet_clean_mode_detail4,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarPetCleanModeDynamicForbidden);
              },
              visible: module390.default.isDynamicAdaptionCarpetSupported(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeDynamicForbidden,
              shouldShowRightArrow: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeDynamicForbidden,
            },
            {
              title: module505.carpet_clean_mode_setting_title2,
              funcId: 'carpet_clean_mode_1',
              bottomDetail: module505.carpet_clean_mode_setting_sub_title2,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden);
              },
              visible: module390.default.isSelfAdaptionCarpetSupported(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden,
              shouldShowRightArrow: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden,
            },
            {
              title: module505.carpet_clean_mode_setting_title1,
              funcId: 'carpet_clean_mode_2',
              bottomDetail: module505.carpet_clean_mode_setting_sub_title1,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden);
              },
              visible: module390.default.isAvoidCarpetSupported(),
              shouldShowTopLongLine: !module390.default.isSelfAdaptionCarpetSupported(),
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden,
              shouldShowRightArrow: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden,
            },
            {
              title: module505.carpet_clean_mode_setting_title3,
              funcId: 'carpet_clean_mode_3',
              bottomDetail: module505.carpet_clean_mode_setting_sub_title3,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden);
              },
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: false,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden,
              shouldShowRightArrow: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden,
            },
          ];
        },
      },
      {
        key: 'getTopMenus',
        value: function () {
          return [
            {
              title: module505.setting_carpet_mode_title,
              funcId: 'carpet_clean_mode_switch',
              bottomDetail: module505.setting_carpet_mode_text,
              shouldShowSwitch: true,
              switchOn: this.state.carpetPressurizeSwitch,
              switchValueChanged: this._onCarpetPressurizeSwitchValueChanged.bind(this),
              shouldShowBottomLine: true,
              visible: !module390.default.shouldHideCarpetPressurize(),
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
            },
            {
              title: module505.setting_carpet_deep_clean_switch_title,
              funcId: 'carpet_deep_clean_switch',
              bottomDetail: module505.setting_carpet_deep_clean_switch_desc,
              shouldShowSwitch: true,
              switchOn: this.state.isCarpetDeepCleanSwitchOn,
              switchValueChanged: this.onCarpetDeepCleanSwitchChanged.bind(this),
              visible: module390.default.isCarpetDeepCleanSupported() && module390.default.isFCC(),
              shouldShowBottomLine: false,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            s = React.default.createElement(module385.RequestRetryView, {
              onPressButton: function () {
                L = 0;
                t.initData(false);
              },
            });
          if (this.state.requestFailed) return s;
          var l = React.default.createElement(
            module12.View,
            {
              style: [
                F.containterView,
                {
                  backgroundColor: globals.app.state.theme.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ],
            },
            React.default.createElement(module385.Spinner, null)
          );
          if (this.state.loading) return l;
          var c = this.getTopMenus().map(function (t, n) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        bottomDetailWidth: module12.Dimensions.get('window').width - 70,
                        key: n,
                        titleColor: 'rgba(0,0,0,0.8)',
                        style: {
                          width: module12.Dimensions.get('window').width - 30,
                        },
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: F.sectionTitle,
                        key: n,
                      },
                      t.sectionTitle
                    )
                : null;
            }),
            module1987 = this.getMenus().map(function (t, n) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: n,
                        fontSize: 16,
                        rightImgStyle: F.rightImgStyle,
                        bottomDetailWidth: module12.Dimensions.get('window').width - 90,
                        rightCenter: false,
                        isDetailCenter: false,
                        rightSrc: require('./1987'),
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: F.sectionTitle,
                        key: n,
                      },
                      t.sectionTitle
                    )
                : null;
            }),
            h =
              module423.DMM.isTopazS || module423.DMM.isTopazSPlus || module423.DMM.isUltron || module423.DMM.isTopazSC || module423.DMM.isPearl
                ? module505.carpet_clean_mode_setting_way
                : module505.carpet_clean_mode_setting_way + module505.carpet_clean_mode_setting_way1;
          return React.default.createElement(
            module12.View,
            {
              style: [
                F.containter,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: F.containterScroll,
                showsVerticalScrollIndicator: true,
                refreshControl: React.default.createElement(module12.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    L = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(module12.View, {
                style: F.section,
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
                c
              ),
              module390.default.isShowCarpetSweeperView() &&
                React.default.createElement(
                  module12.View,
                  {
                    style: F.infoTextView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        F.infoText,
                        {
                          color: this.context.theme.settingListItem.detailColor,
                        },
                      ],
                    },
                    h
                  )
                ),
              React.default.createElement(
                module12.View,
                {
                  style: {
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginHorizontal: 15,
                  },
                },
                module390.default.isShowCarpetSweeperView() && module1987
              ),
              module390.default.isAvoidCarpetSupported() &&
                React.default.createElement(
                  module12.View,
                  {
                    style: F.infoTextView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        F.infoText,
                        {
                          fontSize: 14,
                          marginTop: 10,
                          lineHeight: 20,
                          color: this.context.theme.settingListItem.detailColor,
                        },
                      ],
                    },
                    module505.carpet_clean_mode_setting_way_info
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (
                      (this.setState({
                        loading: !t,
                        requestFailed: false,
                        refreshing: t,
                      }),
                      (n.prev = 1),
                      !!module390.default.shouldHideCarpetPressurize())
                    ) {
                      n.next = 6;
                      break;
                    }

                    n.next = 6;
                    return regeneratorRuntime.default.awrap(this.getCarpetPressurizeStatus());

                  case 6:
                    n.next = 8;
                    return regeneratorRuntime.default.awrap(this.getCarpetCleanModeStatus());

                  case 8:
                    if (((n.t0 = module390.default.isCarpetDeepCleanSupported()), !n.t0)) {
                      n.next = 12;
                      break;
                    }

                    n.next = 12;
                    return regeneratorRuntime.default.awrap(this.getCarpetDeepCleanStatus());

                  case 12:
                    if (!this.unMount)
                      this.setState({
                        refreshing: false,
                      });
                    if (!this.unMount) this.finishLoading(false);
                    L = 0;
                    n.next = 21;
                    break;

                  case 17:
                    n.prev = 17;
                    n.t1 = n.catch(1);
                    console.log('initData - ' + JSON.stringify(n.t1));
                    this.retry(t);

                  case 21:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[1, 17]],
            Promise
          );
        },
      },
      {
        key: 'retry',
        value: function (t) {
          var n = this;
          if (!this.unMount)
            L < 3
              ? (L++,
                setTimeout(function () {
                  console.warn('retryTimes:' + L);
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
          var n = this,
            o = this.state.mode;
          if (module381.RSM.isRunning)
            module1122
              .showFinishCurrentTastAlertIfNeeded()
              .then(function () {
                n.setState({
                  titleSelected: t,
                });
                setTimeout(function () {
                  n.setCarpetCleanMode(t, o);
                }, 500);
              })
              .catch(function (t) {
                globals.showToast(module505.robot_communication_exception);
                n.setState({
                  titleSelected: o,
                });
              });
          else this.setCarpetCleanMode(t, o);
        },
      },
      {
        key: 'setCarpetCleanMode',
        value: function (t, n) {
          var o, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    this.setState({
                      titleSelected: t,
                    });
                    c.prev = 1;
                    c.next = 4;
                    return regeneratorRuntime.default.awrap(module415.default.setCarpetCleanMode(t));

                  case 4:
                    if (
                      ((o = c.sent),
                      (module394.default.sharedCache().carPetCleanMode = t),
                      (l = t == module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden),
                      !module390.default.isCarpetDeepCleanSupported() || module390.default.isFCC())
                    ) {
                      c.next = 10;
                      break;
                    }

                    c.next = 10;
                    return regeneratorRuntime.default.awrap(
                      module415.default.setCarpetDeepClean({
                        status: l ? 1 : 0,
                      })
                    );

                  case 10:
                    module12.DeviceEventEmitter.emit(module419.NotificationKeys.CarpetCleanModeDidChange);
                    console.log('onChangeCarpetCleanMode: ' + JSON.stringify(o));
                    c.next = 19;
                    break;

                  case 14:
                    c.prev = 14;
                    c.t0 = c.catch(1);
                    globals.showToast(module505.robot_communication_exception);
                    this.setState({
                      titleSelected: n,
                    });
                    console.log(c.t0);

                  case 19:
                  case 'end':
                    return c.stop();
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
        key: 'getCarpetCleanModeStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getCarpetCleanMode());

                  case 3:
                    t = n.sent;
                    console.log('getCarpetCleanStatus: ' + JSON.stringify(t));
                    if (!this.unMount)
                      this.setState({
                        titleSelected: t.result[0].carpet_clean_mode,
                      });
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module505.robot_communication_exception);
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
        key: '_onCarpetPressurizeSwitchValueChanged',
        value: function (t) {
          var n, module22, module4, module5, u;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    h.prev = 0;
                    n = module390.default.isCarpetPressurizeSwitchUseNewPara();
                    module22 = module390.default.isRubberBrushCarpetSupported();
                    module4 = module22 ? (module423.DMM.isTanosSE ? 300 : 280) : n ? 625 : 500;
                    module5 = {
                      enable: t ? 1 : 0,
                      current_high: module4,
                      current_integral: module22 ? 450 : n ? 550 : 450,
                      current_low: module22 ? 250 : n ? 500 : 400,
                      stall_time: 10,
                    };
                    h.next = 9;
                    return regeneratorRuntime.default.awrap(module415.default.setCarpetMode(module5));

                  case 9:
                    u = h.sent;
                    console.log('_onCarpetPressurizeSwitchValueChanged:' + JSON.stringify(u));
                    if (!this.unMount)
                      this.setState({
                        carpetPressurizeSwitch: t,
                      });
                    h.next = 18;
                    break;

                  case 14:
                    h.prev = 14;
                    h.t0 = h.catch(0);
                    globals.showToast(module505.robot_communication_exception);
                    console.log(h.t0);

                  case 18:
                  case 'end':
                    return h.stop();
                }
            },
            null,
            this,
            [[0, 14]],
            Promise
          );
        },
      },
      {
        key: 'onCarpetDeepCleanSwitchChanged',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    this.setState({
                      isCarpetDeepCleanSwitchOn: t,
                    });
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(
                      module415.default.setCarpetDeepClean({
                        status: t ? 1 : 0,
                      })
                    );

                  case 4:
                    n.next = 12;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(0);
                    this.setState({
                      isCarpetDeepCleanSwitchOn: !t,
                    });
                    console.log('setCarpetDeepClean error', t, n.t0);
                    globals.showToast(module505.robot_communication_exception);

                  case 12:
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
        key: 'getCarpetDeepCleanStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getCarpetDeepClean());

                  case 3:
                    t = n.sent;
                    console.log('getCarpetDeepClean: ' + JSON.stringify(t));
                    this.setState({
                      isCarpetDeepCleanSwitchOn: 1 == t.result.status,
                    });
                    n.next = 11;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    console.log(n.t0);

                  case 11:
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
        key: 'getCarpetPressurizeStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getCarpetMode());

                  case 3:
                    t = n.sent;
                    console.log('getCarpetPressurizeStatus: ' + JSON.stringify(t));
                    if (!this.unMount)
                      this.setState({
                        carpetPressurizeSwitch: 1 == t.result[0].enable,
                      });
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module505.robot_communication_exception);
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
    ]);
    return z;
  })(React.Component);

exports.default = V;
V.contextType = module1121.AppConfigContext;
var F = module12.StyleSheet.create({
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
    marginBottom: 20,
  },
  infoTextView: {
    backgroundColor: 'transparent',
  },
  infoText: {
    color: 'rgba(0,0,0,0.3)',
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    fontSize: 16,
  },
  rightImgStyle: {
    width: 22,
    height: 22,
    marginTop: -5,
    transform: [],
  },
  section: {
    paddingVertical: 10,
  },
});

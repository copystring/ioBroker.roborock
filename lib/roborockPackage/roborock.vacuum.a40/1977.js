var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module414 = require('./414'),
  module418 = require('./418'),
  module394 = require('./394'),
  module390 = require('./390'),
  module381 = require('./381'),
  module515 = require('./515'),
  module422 = require('./422'),
  module1391 = require('./1391');

function k() {
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
  L = 0,
  F = (function (t) {
    module7.default(V, t);

    var n = V,
      module515 = k(),
      F = function () {
        var t,
          o = module11.default(n);

        if (module515) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function V(t) {
      var n;
      module4.default(this, V);
      (n = F.call(this, t)).unMount = false;
      n.state = {
        carpetPressurizeSwitch: false,
        titleSelected: module394.default.sharedCache().carPetCleanMode,
        loading: true,
        requestFailed: false,
        refreshing: false,
      };
      return n;
    }

    module5.default(V, [
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
                      title: '\u5730\u6bef\u626b\u62d6\u65b9\u5f0f',
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
              title: module500.carpet_clean_mode_setting_title2,
              funcId: 'carpet_clean_mode_1',
              bottomDetail: module500.carpet_clean_mode_setting_sub_title2,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden);
              },
              visible: true,
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden,
              shouldShowRightArrow: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeMopForbidden,
            },
            {
              title: module500.carpet_clean_mode_setting_title1,
              funcId: 'carpet_clean_mode_2',
              bottomDetail: module500.carpet_clean_mode_setting_sub_title1,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden);
              },
              visible: true,
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden,
              shouldShowRightArrow: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden,
            },
            {
              title: module500.carpet_clean_mode_setting_title3,
              funcId: 'carpet_clean_mode_3',
              bottomDetail: module500.carpet_clean_mode_setting_sub_title3,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden);
              },
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: !module422.DMM.isTopazSV,
              selected: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden,
              shouldShowRightArrow: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeNoneForbidden,
            },
            {
              title: module500.carpet_clean_mode_setting_title4,
              funcId: 'carpet_clean_mode_4',
              bottomDetail: module500.carpet_clean_mode_setting_sub_title2,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarPetCleanModeDynamicForbidden);
              },
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: true,
              selected: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeDynamicForbidden,
              shouldShowRightArrow: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarPetCleanModeDynamicForbidden,
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
                R.containterView,
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
          var module1938 = this.getMenus().map(function (t, n) {
            return t.visible
              ? t.title
                ? React.default.createElement(
                    module385.SettingListItemView,
                    module22.default({}, t, {
                      key: n,
                      fontSize: 16,
                      rightImgStyle: R.rightImgStyle,
                      bottomDetailWidth: module12.Dimensions.get('window').width - 60,
                      rightCenter: false,
                      isDetailCenter: false,
                      rightSrc: require('./1938'),
                    })
                  )
                : t.sectionTitle.length > 0 &&
                  React.default.createElement(
                    module12.Text,
                    {
                      style: R.sectionTitle,
                      key: n,
                    },
                    t.sectionTitle
                  )
              : null;
          });
          if (module422.DMM.isTopazS || module422.DMM.isTopazSPlus) module500.carpet_clean_mode_setting_way;
          else {
            module500.carpet_clean_mode_setting_way;
            module500.carpet_clean_mode_setting_way1;
          }
          return React.default.createElement(
            module12.View,
            {
              style: [
                R.containter,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: R.containterScroll,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module12.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    L = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(module12.View, {
                style: R.section,
              }),
              module390.default.isShowCarpetSweeperView() && module1938
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
                    if (!this.unMount)
                      this.setState({
                        refreshing: false,
                      });
                    if (!this.unMount) this.finishLoading(false);
                    L = 0;
                    n.next = 17;
                    break;

                  case 13:
                    n.prev = 13;
                    n.t0 = n.catch(1);
                    console.log('initData - ' + JSON.stringify(n.t0));
                    this.retry(t);

                  case 17:
                  case 'end':
                    return n.stop();
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
            module1391
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
                globals.showToast(module500.robot_communication_exception);
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
          var o;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    this.setState({
                      titleSelected: t,
                    });
                    l.prev = 1;
                    l.next = 4;
                    return regeneratorRuntime.default.awrap(module414.default.setCarpetCleanMode(t));

                  case 4:
                    o = l.sent;
                    module394.default.sharedCache().carPetCleanMode = t;
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.CarpetCleanModeDidChange);
                    console.log('onChangeCarpetCleanMode: ' + JSON.stringify(o));
                    l.next = 15;
                    break;

                  case 10:
                    l.prev = 10;
                    l.t0 = l.catch(1);
                    globals.showToast(module500.robot_communication_exception);
                    this.setState({
                      titleSelected: n,
                    });
                    console.log(l.t0);

                  case 15:
                  case 'end':
                    return l.stop();
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
                    return regeneratorRuntime.default.awrap(module414.default.getCarpetCleanMode());

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
                    globals.showToast(module500.robot_communication_exception);
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
                    module4 = module22 ? (module422.DMM.isTanosSE ? 300 : 280) : n ? 625 : 500;
                    module5 = {
                      enable: t ? 1 : 0,
                      current_high: module4,
                      current_integral: module22 ? 450 : n ? 550 : 450,
                      current_low: module22 ? 250 : n ? 500 : 400,
                      stall_time: 10,
                    };
                    h.next = 9;
                    return regeneratorRuntime.default.awrap(module414.default.setCarpetMode(module5));

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
                    globals.showToast(module500.robot_communication_exception);
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
                    return regeneratorRuntime.default.awrap(module414.default.getCarpetMode());

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
                    globals.showToast(module500.robot_communication_exception);
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
    return V;
  })(React.Component);

exports.default = F;
F.contextType = module515.AppConfigContext;
var R = module12.StyleSheet.create({
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
    transform: [],
  },
  section: {
    paddingVertical: 7,
  },
});

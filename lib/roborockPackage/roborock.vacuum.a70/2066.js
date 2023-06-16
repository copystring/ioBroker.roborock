var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module416 = require('./416'),
  module420 = require('./420'),
  module394 = require('./394'),
  module390 = require('./390'),
  module381 = require('./381'),
  module1193 = require('./1193'),
  module424 = require('./424'),
  module1194 = require('./1194');

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

var module510 = require('./510').strings,
  module389 = require('./389'),
  L = 0,
  A = (function (t) {
    module9.default(V, t);

    var n = V,
      module1193 = P(),
      A = function () {
        var t,
          o = module12.default(n);

        if (module1193) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function V(t) {
      var n;
      module6.default(this, V);
      (n = A.call(this, t)).unMount = false;
      n.state = {
        carpetPressurizeSwitch: false,
        isCarpetDeepCleanSwitchOn: false,
        titleSelected: module394.default.sharedCache().carPetCleanMode,
        loading: true,
        requestFailed: false,
        refreshing: false,
        isCarpetFirstOn: module381.RSM.isSettingCarpetFirstOn,
      };
      return n;
    }

    module7.default(V, [
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
                      title: module510.carpet_clean_mode_setting_title,
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
              title: module510.carpet_clean_mode_setting_title4,
              funcId: 'carpet_clean_mode_4',
              bottomDetail: module510.carpet_clean_mode_detail4,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarpetDynamicAdaptionMode);
              },
              visible: module390.default.isDynamicAdaptionCarpetSupported(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarpetDynamicAdaptionMode,
              shouldShowRightArrow: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarpetDynamicAdaptionMode,
            },
            {
              title: module510.carpet_clean_mode_setting_title2,
              funcId: 'carpet_clean_mode_1',
              bottomDetail: module510.carpet_clean_mode_setting_sub_title2,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarpetSelfAdaptionMode);
              },
              visible: module390.default.isSelfAdaptionCarpetSupported(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarpetSelfAdaptionMode,
              shouldShowRightArrow: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarpetSelfAdaptionMode,
            },
            {
              title: module510.carpet_clean_mode_setting_title1,
              funcId: 'carpet_clean_mode_2',
              bottomDetail: module510.carpet_clean_mode_setting_sub_title1,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarpetAvoidMode);
              },
              visible: module390.default.isAvoidCarpetSupported(),
              shouldShowTopLongLine: !module390.default.isSelfAdaptionCarpetSupported(),
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarpetAvoidMode,
              shouldShowRightArrow: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarpetAvoidMode,
            },
            {
              title: module510.carpet_clean_mode_setting_title3,
              funcId: 'carpet_clean_mode_3',
              bottomDetail: module510.carpet_clean_mode_setting_sub_title3,
              onPress: function () {
                return t.onChangeCarpetCleanMode(module389.CarPetCleanModeSettingMap.CarpetIgnoreMode);
              },
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: false,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarpetIgnoreMode,
              shouldShowRightArrow: this.state.titleSelected == module389.CarPetCleanModeSettingMap.CarpetIgnoreMode,
            },
          ];
        },
      },
      {
        key: 'isCarpetSwitchEnabled',
        value: function (t) {
          return t == module389.CarPetCleanModeSettingMap.CarpetSelfAdaptionMode || t == module389.CarPetCleanModeSettingMap.CarpetDynamicAdaptionMode;
        },
      },
      {
        key: 'getTopMenus',
        value: function () {
          var t = this.isCarpetSwitchEnabled(this.state.titleSelected);
          return [
            {
              title: module510.setting_carpet_first_switch_title,
              funcId: 'setting_carpet_first_switch',
              bottomDetail: module510.setting_carpet_first_switch_desc,
              shouldShowSwitch: true,
              switchOn: this.state.isCarpetFirstOn,
              switchValueChanged: this.handleCarpetFirstSwitchChanged.bind(this),
              shouldShowBottomLine: true,
              visible: t && module390.default.isSettingCarpetFirstSupported(),
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
            },
            {
              title: module510.setting_carpet_mode_title,
              funcId: 'carpet_clean_mode_switch',
              bottomDetail: module510.setting_carpet_mode_text,
              shouldShowSwitch: true,
              switchOn: this.state.carpetPressurizeSwitch,
              switchValueChanged: this._onCarpetPressurizeSwitchValueChanged.bind(this),
              shouldShowBottomLine: true,
              visible: !module390.default.shouldHideCarpetPressurize(),
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
            },
            {
              title: module510.setting_carpet_deep_clean_switch_title,
              funcId: 'carpet_deep_clean_switch',
              bottomDetail: module510.setting_carpet_deep_clean_switch_desc,
              shouldShowSwitch: true,
              switchOn: this.state.isCarpetDeepCleanSwitchOn,
              switchValueChanged: this.onCarpetDeepCleanSwitchChanged.bind(this),
              visible: module390.default.isCarpetDeepCleanSupported(),
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
            module13.View,
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
          var c = this.getTopMenus().map(function (t, n) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        bottomDetailWidth: module13.Dimensions.get('window').width - 70,
                        key: n,
                        titleColor: 'rgba(0,0,0,0.8)',
                        style: {
                          width: module13.Dimensions.get('window').width - 30,
                        },
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module13.Text,
                      {
                        style: R.sectionTitle,
                        key: n,
                      },
                      t.sectionTitle
                    )
                : null;
            }),
            module2065 = this.getMenus().map(function (t, n) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: n,
                        fontSize: 16,
                        rightImgStyle: R.rightImgStyle,
                        bottomDetailWidth: module13.Dimensions.get('window').width - 90,
                        rightCenter: false,
                        isDetailCenter: false,
                        rightSrc: require('./2065'),
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module13.Text,
                      {
                        style: R.sectionTitle,
                        key: n,
                      },
                      t.sectionTitle
                    )
                : null;
            }),
            h =
              module424.DMM.isTopazS || module424.DMM.isTopazSPlus || module424.DMM.isUltron || module424.DMM.isUltronSPlus || module424.DMM.isTopazSC || module424.DMM.isPearl
                ? module510.carpet_clean_mode_setting_way
                : module510.carpet_clean_mode_setting_way + module510.carpet_clean_mode_setting_way1;
          return React.default.createElement(
            module13.View,
            {
              style: [
                R.containter,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module13.ScrollView,
              {
                style: R.containterScroll,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module13.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    L = 0;
                    t.initData(true);
                  },
                }),
              },
              module390.default.shouldShowCarpetSettingView() &&
                React.default.createElement(
                  module13.View,
                  {
                    style: R.infoTextView,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: [
                        R.infoText,
                        {
                          color: this.context.theme.settingListItem.detailColor,
                        },
                      ],
                    },
                    h
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
                module390.default.shouldShowCarpetSettingView() && module2065
              ),
              React.default.createElement(module13.View, {
                style: R.section,
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
                c
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
            module1194
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
                globals.showToast(module510.robot_communication_exception);
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
                    return regeneratorRuntime.default.awrap(module416.default.setCarpetCleanMode(t));

                  case 4:
                    if (
                      ((o = l.sent),
                      (module394.default.sharedCache().carPetCleanMode = t),
                      module13.DeviceEventEmitter.emit(module420.NotificationKeys.CarpetCleanModeDidChange),
                      console.log('onChangeCarpetCleanMode: ' + JSON.stringify(o)),
                      (l.t0 = !this.isCarpetSwitchEnabled(t) && module390.default.isSettingCarpetFirstSupported()),
                      !l.t0)
                    ) {
                      l.next = 12;
                      break;
                    }

                    l.next = 12;
                    return regeneratorRuntime.default.awrap(module416.default.setCarpetFirstSwitch(0));

                  case 12:
                    l.next = 19;
                    break;

                  case 14:
                    l.prev = 14;
                    l.t1 = l.catch(1);
                    globals.showToast(module510.robot_communication_exception);
                    this.setState({
                      titleSelected: n,
                    });
                    console.log(l.t1);

                  case 19:
                  case 'end':
                    return l.stop();
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
          var t, n;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getCarpetCleanMode());

                  case 3:
                    t = o.sent;
                    console.log('getCarpetCleanStatus: ' + JSON.stringify(t));
                    n = t.result[0].carpet_clean_mode;
                    if (!this.unMount)
                      this.setState({
                        titleSelected: n,
                      });
                    o.next = 13;
                    break;

                  case 9:
                    o.prev = 9;
                    o.t0 = o.catch(0);
                    globals.showToast(module510.robot_communication_exception);
                    console.log(o.t0);

                  case 13:
                  case 'end':
                    return o.stop();
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
        key: 'handleCarpetFirstSwitchChanged',
        value: function (t) {
          var n;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (((o.prev = 0), !module381.RSM.isRunning)) {
                      o.next = 6;
                      break;
                    }

                    o.next = 4;
                    return regeneratorRuntime.default.awrap(module1194.showFinishCurrentTastAlertIfNeeded());

                  case 4:
                    o.next = 11;
                    break;

                  case 6:
                    this.setState({
                      isCarpetFirstOn: t,
                    });
                    o.next = 9;
                    return regeneratorRuntime.default.awrap(module416.default.setCarpetFirstSwitch(t ? 1 : 0));

                  case 9:
                    n = o.sent;
                    console.log('setCarpetFirstSwitch successfully', n);

                  case 11:
                    o.next = 18;
                    break;

                  case 13:
                    o.prev = 13;
                    o.t0 = o.catch(0);
                    this.setState({
                      isCarpetFirstOn: !t,
                    });
                    globals.showToast(module510.robot_communication_exception);
                    console.log(o.t0);

                  case 18:
                  case 'end':
                    return o.stop();
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
        key: '_onCarpetPressurizeSwitchValueChanged',
        value: function (t) {
          var n, module22, module6, module7, u;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    h.prev = 0;
                    n = module390.default.isCarpetPressurizeSwitchUseNewPara();
                    module22 = module390.default.isRubberBrushCarpetSupported();
                    module6 = module22 ? (module424.DMM.isTanosSE ? 300 : 280) : n ? 625 : 500;
                    module7 = {
                      enable: t ? 1 : 0,
                      current_high: module6,
                      current_integral: module22 ? 450 : n ? 550 : 450,
                      current_low: module22 ? 250 : n ? 500 : 400,
                      stall_time: 10,
                    };
                    h.next = 9;
                    return regeneratorRuntime.default.awrap(module416.default.setCarpetMode(module7));

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
                    globals.showToast(module510.robot_communication_exception);
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
          var n,
            o = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (
                      ((n = function (t) {
                        return regeneratorRuntime.default.async(
                          function (n) {
                            for (;;)
                              switch ((n.prev = n.next)) {
                                case 0:
                                  n.prev = 0;
                                  o.setState({
                                    isCarpetDeepCleanSwitchOn: t,
                                  });
                                  n.next = 4;
                                  return regeneratorRuntime.default.awrap(
                                    module416.default.setCarpetDeepClean({
                                      status: t ? 1 : 0,
                                    })
                                  );

                                case 4:
                                  n.next = 11;
                                  break;

                                case 6:
                                  n.prev = 6;
                                  n.t0 = n.catch(0);
                                  o.setState({
                                    isCarpetDeepCleanSwitchOn: !t,
                                  });
                                  console.log('setCarpetDeepClean error', t, n.t0);
                                  globals.showToast(module510.robot_communication_exception);

                                case 11:
                                case 'end':
                                  return n.stop();
                              }
                          },
                          null,
                          null,
                          [[0, 6]],
                          Promise
                        );
                      }),
                      !module381.RSM.isRunning)
                    ) {
                      l.next = 4;
                      break;
                    }

                    module1194
                      .showFinishCurrentTastAlertIfNeeded()
                      .then(function () {
                        setTimeout(function () {
                          return n(t);
                        }, 500);
                      })
                      .catch(function (t) {
                        globals.showToast(module510.robot_communication_exception);
                      });
                    return l.abrupt('return');

                  case 4:
                    n(t);

                  case 5:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            null,
            null,
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
                    return regeneratorRuntime.default.awrap(module416.default.getCarpetDeepClean());

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
                    return regeneratorRuntime.default.awrap(module416.default.getCarpetMode());

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
                    globals.showToast(module510.robot_communication_exception);
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

exports.default = A;
A.contextType = module1193.AppConfigContext;
var R = module13.StyleSheet.create({
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

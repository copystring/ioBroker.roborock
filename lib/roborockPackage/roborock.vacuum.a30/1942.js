var n = require(d[1]);

var s = n(require(d[2])),
  o = n(require(d[3])),
  l = n(require(d[4])),
  u = n(require(d[5])),
  c = n(require(d[6])),
  h = n(require(d[7])),
  f = n(require(d[8])),
  S = n(require(d[9])),
  p = require(d[10]),
  w = require(d[11]),
  y = require(d[12]),
  b = require(d[13]),
  v = n(require(d[14])),
  _ = n(require(d[15])),
  D = n(require(d[16])),
  E = require(d[17]),
  M = require(d[18]),
  x = n(require(d[19])),
  k = n(require(d[20])),
  N = require(d[21]),
  C = require(d[22]),
  L = require(d[23]),
  P = require(d[24]),
  V = require(d[25]),
  T = n(require(d[26])),
  B = n(require(d[27])),
  H = require(d[28]),
  O = require(d[29]),
  R = n(require(d[30]));

function F() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ('function' == typeof Proxy) return !0;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return !0;
  } catch (t) {
    return !1;
  }
}

require(d[33]);

require(d[36]);

var I = require(d[31]).strings,
  z = require(d[32]),
  A = require(d[34]),
  K = require(d[35]),
  J = require(d[37]),
  U = 0,
  W = (function (t) {
    (0, h.default)(W, t);

    var n = W,
      P = F(),
      z = function () {
        var t,
          s = (0, S.default)(n);

        if (P) {
          var o = (0, S.default)(this).constructor;
          t = Reflect.construct(s, arguments, o);
        } else t = s.apply(this, arguments);

        return (0, f.default)(this, t);
      };

    function W(t) {
      var n;
      (0, u.default)(this, W);

      (n = z.call(this, t)).sectionComp = function () {
        return p.default.createElement(w.View, {
          style: {
            height: 15,
            backgroundColor: n.context.theme.settingBackgroundColor,
          },
        });
      };

      n.sectionFooter = function (t) {
        for (var s in t.section.data) {
          if (t.section.data[s].title == I.robot_status_wait_charge1 && n.state.isValleyElectricitySwitchOn && n.state.shouldShowValleyElectricityHint)
            return p.default.createElement(
              w.View,
              {
                style: {
                  width: w.Dimensions.get('window').width - 50,
                  backgroundColor: n.context.theme.settingBackgroundColor,
                },
              },
              p.default.createElement(
                w.Text,
                {
                  style: {
                    color: 'red',
                    fontSize: 12,
                    top: 2,
                  },
                  numberOfLines: 2,
                },
                I.robot_status_wait_charge6
              )
            );
        }
      };

      n.renderListRow = function (t) {
        var n = t.index,
          s = t.section.data.length,
          o = t.item;
        return p.default.createElement(
          y.SettingListItemView,
          (0, l.default)({}, o, {
            key: n,
            shouldShowBottomLine: n < s - 1,
            bottomLineStyle: {
              width: w.Dimensions.get('window').width - 50,
            },
            touchStyle: [
              {
                borderTopLeftRadius: 0 == n ? 8 : 0,
              },
              {
                borderTopRightRadius: 0 == n ? 8 : 0,
              },
              {
                borderBottomLeftRadius: n == s - 1 ? 8 : 0,
              },
              {
                borderBottomRightRadius: n == s - 1 ? 8 : 0,
              },
            ],
          })
        );
      };

      n.state = {
        mapSaveModeEnabled: !0,
        carpetPressurizeSwitch: !1,
        mopModeSwitch: !1,
        notificationSwitch: !1,
        shouldShowTimePicker: !1,
        ledStatusSwitch: !0,
        dustCollectionSwitch: !1,
        isDoNotDisturbSwitchOn: !0,
        deviceName: A.deviceName,
        timeZoneShouldShowRedDot: E.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot,
        cameraEnabled: !1,
        petModeEnabled: !1,
        realTimeMonitorEnabled: !1,
        explorationEnabled: !1,
        ledSetting: 0,
        loading: !0,
        requestFailed: !1,
        refreshing: !1,
        areaUnitIndex: x.default.sharedCache().areaUnitIndex,
        shouldShowAreaUnitView: !1,
        childLockSwitch: !1,
        flowLedStatusSwitch: !0,
        isValleyElectricitySwitchOn: !1,
        shouldShowValleyElectricityHint: !1,
        resume: 1,
        vol: 1,
        led: 1,
        dust: 1,
        dry: 1,
        isOfflineMapEnabled: E.RSM.offlineMapEnabled,
      };
      n.doNotDisturbBeginMinute = -1;
      n.doNotDisturbBeginHour = -1;
      n.doNotDisturbEndHour = -1;
      n.doNotDisturbEndMinute = -1;
      n.valleyElectricityBeginHour = 0;
      n.valleyElectricityBeginMinute = 0;
      n.valleyElectricityEndHour = 8;
      n.valleyElectricityEndMinute = 0;
      n.animatedWrapMarginBottom = new w.Animated.Value(-500);
      n.isTriggerFindMe = !1;
      return n;
    }

    (0, c.default)(W, [
      {
        key: 'getMenuDatas',
        value: function () {
          for (
            var t = [
                {
                  data: [
                    {
                      title: I.led_status_title,
                      funcId: 'robot_setting_page_led',
                      bottomDetail: I.led_status_detail,
                      shouldShowSwitch: !0,
                      switchOn: this.state.ledStatusSwitch,
                      switchValueChanged: this._onLedStatusSwitchValueChanged.bind(this),
                      visible: k.default.isLedSwitchVisible(),
                      shouldShowBottomLine: !1,
                      shouldShowTopLongLine: !1,
                      bottomDetailWidth: w.Dimensions.get('window').width - 70,
                    },
                    {
                      title: I.flow_led_status_title,
                      funcId: 'robot_setting_page_flow_led',
                      shouldShowSwitch: !0,
                      switchOn: this.state.flowLedStatusSwitch,
                      switchValueChanged: this._onFlowLedStatusSwitchValueChanged.bind(this),
                      visible: k.default.isFlowLedSettingSupported(),
                      shouldShowBottomLine: !1,
                      shouldShowTopLongLine: !1,
                    },
                    {
                      title: I.setting_carpet_mode_title,
                      funcId: 'robot_setting_page_carpet_mode',
                      bottomDetail: I.setting_carpet_mode_text,
                      shouldShowSwitch: !0,
                      switchOn: this.state.carpetPressurizeSwitch,
                      switchValueChanged: this._onCarpetPressurizeSwitchValueChanged.bind(this),
                      visible: (!k.default.shouldHideCarpetPressurize() && !k.default.isCarpetSupported()) || V.DMM.isGarnet,
                      shouldShowBottomLine: !1,
                      shouldShowTopLongLine: !1,
                      bottomDetailWidth: w.Dimensions.get('window').width - 70,
                    },
                  ],
                },
                {
                  data: [
                    {
                      title: I.child_lock_title,
                      funcId: 'robot_setting_page_child_lock',
                      bottomDetail: I.child_lock_detial,
                      shouldShowSwitch: !0,
                      switchOn: this.state.childLockSwitch,
                      switchValueChanged: this._onSetChildLockValueChanged.bind(this),
                      visible: k.default.isSetChildSupported(),
                      shouldShowBottomLongLine: !1,
                      shouldShowTopLine: !1,
                      shouldShowTopLongLine: !1,
                      bottomDetailWidth: w.Dimensions.get('window').width - 70,
                    },
                  ],
                },
                {
                  data: [
                    {
                      title: I.localization_strings_Setting_DoNotDisturbPage_12,
                      funcId: 'robot_setting_page_donot_disturb',
                      bottomDetail: E.RSM.isCollectDustDock ? I.no_disturb_with_dust_collection : I.localization_strings_Setting_DoNotDisturbPage_13,
                      shouldShowSwitch: !0,
                      switchOn: this.state.isDoNotDisturbSwitchOn,
                      switchValueChanged: this.onDonotDisturbSwitchValueChanged.bind(this),
                      visible: !0,
                      shouldShowTopLine: !1,
                      shouldShowTopLongLine: !1,
                      bottomDetailWidth: w.Dimensions.get('window').width - 70,
                    },
                    {
                      title: I.localization_strings_Setting_DoNotDisturbPage_8,
                      funcId: 'robot_setting_page_donot_disturb_custom',
                      visible: this.state.isDoNotDisturbSwitchOn && k.default.isSupportCustomDnd(),
                      onPress: this.onPressCustomDnd.bind(this),
                      shouldShowTopLine: !1,
                      shouldShowTopLongLine: !1,
                    },
                  ].concat((0, o.default)(this.getDoNotDisturbMenus())),
                },
                {
                  data: [
                    {
                      title: I.robot_status_wait_charge1,
                      funcId: 'robot_setting_page_donot_disturb',
                      bottomDetail: I.robot_status_wait_charge2,
                      shouldShowSwitch: !0,
                      switchOn: this.state.isValleyElectricitySwitchOn,
                      switchValueChanged: this.onValleyElectricitySwitchValueChanged.bind(this),
                      visible: k.default.isSupportedValleyElectricity(),
                      shouldShowTopLine: !1,
                      shouldShowTopLongLine: !1,
                      bottomDetailWidth: w.Dimensions.get('window').width - 70,
                    },
                  ].concat((0, o.default)(this.getValleyElectricitySwitchMenus())),
                },
                {
                  data: [
                    {
                      title: I.offline_map_guide_title,
                      funcId: 'robot_setting_page_offline_map',
                      bottomDetail: I.offline_map_guide_desc1,
                      shouldShowSwitch: !0,
                      switchOn: this.state.isOfflineMapEnabled,
                      switchValueChanged: this.onOfflineMapChanged.bind(this),
                      visible: k.default.isOfflineMapSupported(),
                      shouldShowTopLine: !1,
                      shouldShowTopLongLine: !1,
                      bottomDetailWidth: w.Dimensions.get('window').width - 70,
                    },
                  ],
                },
                {
                  data: [
                    {
                      title: I.area_of_unit,
                      funcId: 'robot_setting_page_area_unit',
                      detail: J.AreaUnitNames()[this.state.areaUnitIndex],
                      onPress: this.setAreaUnit.bind(this),
                      shouldShowBottomLine: !1,
                      visible: !0,
                      shouldShowTopLine: !1,
                      shouldShowTopLongLine: !1,
                      shouldShowBottomLine: !1,
                      shouldShowBottomLongLine: !1,
                      detailWidth: 350,
                    },
                  ],
                },
                {
                  data: [
                    {
                      title: I.localization_strings_Setting_index_2,
                      onPress: this.triggerFindMe.bind(this),
                      funcId: 'setting_page_find_me',
                      visible: k.default.isFindMeSupported(),
                      shouldShowTopLine: !1,
                      shouldShowTopLongLine: !1,
                      shouldShowBottomLine: !1,
                      shouldShowBottomLongLine: !1,
                    },
                  ],
                },
              ],
              n = 0;
            n < t.length;
            n++
          ) {
            for (var s = t[n].data, l = 0; l < s.length; l++) s[l].visible || (s.splice(l, 1), (l -= 1));

            s.length || (t.splice(n, 1), (n -= 1));
          }

          return t;
        },
      },
      {
        key: 'triggerFindMe',
        value: function () {
          var t = this;
          return s.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (!this.isTriggerFindMe) {
                      n.next = 2;
                      break;
                    }

                    return n.abrupt('return');

                  case 2:
                    n.prev = 2;
                    this.isTriggerFindMe = !0;
                    n.next = 6;
                    return s.default.awrap(_.default.findMe());

                  case 6:
                    globals.showToast(I.localization_strings_Setting_index_19);
                    setTimeout(function () {
                      t.isTriggerFindMe = !1;
                    }, 1e3);
                    n.next = 16;
                    break;

                  case 11:
                    n.prev = 11;
                    n.t0 = n.catch(2);
                    this.isTriggerFindMe = !1;
                    console.log(n.t0);
                    globals.showToast(I.robot_communication_exception);

                  case 16:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[2, 11]],
            Promise
          );
        },
      },
      {
        key: 'onPressCustomDnd',
        value: function () {
          this.props.navigation.navigate('CustomDndPage', {
            title: I.localization_strings_Setting_DoNotDisturbPage_12,
            resumeSwitch: this.state.resume,
            volSwitch: this.state.vol,
            ledSwitch: this.state.led,
            dustSwitch: this.state.dust,
            drySwitch: this.state.dry,
          });
        },
      },
      {
        key: 'getValleyElectricitySwitchMenus',
        value: function () {
          var t = [
            {
              title: I.localization_strings_Setting_DoNotDisturbPage_0,
              funcId: 'robot_setting_page_valley_electricity_begin',
              detail: (K.addZeroPrefix(this.valleyElectricityBeginHour) + ':' + K.addZeroPrefix(this.valleyElectricityBeginMinute)).replace('0-1:0-1', '--:--'),
              onPress: this.setDotNotDisturbBeginTime.bind(this, !1),
              visible: !0,
            },
            {
              title: I.localization_strings_Setting_DoNotDisturbPage_1,
              funcId: 'robot_setting_page_valley_electricity_end',
              detail: (K.addZeroPrefix(this.valleyElectricityEndHour) + ':' + K.addZeroPrefix(this.valleyElectricityEndMinute)).replace('0-1:0-1', '--:--'),
              onPress: this.setDotNotDisturbEndTime.bind(this, !1),
              visible: !0,
              shouldShowBottomLine: !1,
              shouldShowBottomLongLine: !1,
            },
          ];
          return this.state.isValleyElectricitySwitchOn && k.default.isSupportedValleyElectricity() ? t : [];
        },
      },
      {
        key: 'onOfflineMapChanged',
        value: function (t) {
          return s.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.setState({
                      isOfflineMapEnabled: t,
                    });
                    n.prev = 1;
                    n.next = 4;
                    return s.default.awrap(_.default.setOfflineMapStatus(t));

                  case 4:
                    console.log('onOfflineMapChanged', t);
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(1);
                    this.setState({
                      isOfflineMapEnabled: !t,
                    });
                    console.log('onOfflineMapChanged error', t, n.t0);

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
        key: 'onValleyElectricitySwitchValueChanged',
        value: function (t) {
          var n, o;
          return s.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (
                      (this.setState({
                        isValleyElectricitySwitchOn: t,
                      }),
                      !t)
                    ) {
                      l.next = 6;
                      break;
                    }

                    null == (n = this.chargeGuide) || n.show();
                    this.saveValleyElectricityData();
                    l.next = 20;
                    break;

                  case 6:
                    l.prev = 6;
                    l.next = 9;
                    return s.default.awrap(_.default.closeValleyElectricityTimer());

                  case 9:
                    o = l.sent;
                    this.valleyElectricityBeginHour = 0;
                    this.valleyElectricityBeginMinute = 0;
                    this.valleyElectricityEndHour = 8;
                    this.valleyElectricityEndMinute = 0;
                    console.log('closeValleyElectricityTimer - ' + JSON.stringify(o));
                    l.next = 20;
                    break;

                  case 17:
                    l.prev = 17;
                    l.t0 = l.catch(6);
                    console.log('closeValleyElectricityTimer  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

                  case 20:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[6, 17]],
            Promise
          );
        },
      },
      {
        key: 'getValleyElectricityTimer',
        value: function () {
          var t, n;
          return s.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return s.default.awrap(_.default.getValleyElectricityTimer());

                  case 2:
                    t = o.sent;
                    1 == (n = t.result[0]).enabled &&
                      ((this.valleyElectricityBeginHour = n.start_hour),
                      (this.valleyElectricityBeginMinute = n.start_minute),
                      (this.valleyElectricityEndHour = n.end_hour),
                      (this.valleyElectricityEndMinute = n.end_minute));
                    this.setState({
                      isValleyElectricitySwitchOn: 1 == n.enabled,
                    });
                    console.log('getValleyElectricityTimer - ' + JSON.stringify(t));

                  case 7:
                  case 'end':
                    return o.stop();
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
        key: 'saveValleyElectricityData',
        value: function () {
          var t;
          return s.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.handleTimeDifference();
                    n.prev = 1;
                    n.next = 4;
                    return s.default.awrap(
                      _.default.setValleyElectricityTimer(
                        this.valleyElectricityBeginHour,
                        this.valleyElectricityBeginMinute,
                        this.valleyElectricityEndHour,
                        this.valleyElectricityEndMinute
                      )
                    );

                  case 4:
                    t = n.sent;
                    console.log('saveValleyElectricityData -' + JSON.stringify(t));
                    n.next = 11;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(1);
                    console.log('saveValleyElectricityData  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 11:
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
        key: 'handleTimeDifference',
        value: function () {
          var t = 0,
            n = this.valleyElectricityBeginHour + this.valleyElectricityBeginMinute / 60,
            s = this.valleyElectricityEndHour + this.valleyElectricityEndMinute / 60;
          t = s > n ? s - n : s == n ? 0 : 24 - (n - s);
          this.setState({
            shouldShowValleyElectricityHint: !1,
          });
          t < 6 &&
            (this.setState({
              shouldShowValleyElectricityHint: !0,
            }),
            this.isBeginTime
              ? ((this.valleyElectricityEndHour = (this.valleyElectricityBeginHour + 6) % 24), (this.valleyElectricityEndMinute = this.valleyElectricityBeginMinute))
              : ((this.valleyElectricityBeginHour = (24 + this.valleyElectricityEndHour - 6) % 24), (this.valleyElectricityBeginMinute = this.valleyElectricityEndMinute)));
        },
      },
      {
        key: 'getDoNotDisturbMenus',
        value: function () {
          var t = [
            {
              title: I.localization_strings_Setting_DoNotDisturbPage_0,
              funcId: 'robot_setting_page_donot_disturb_begin',
              detail: (K.addZeroPrefix(this.doNotDisturbBeginHour) + ':' + K.addZeroPrefix(this.doNotDisturbBeginMinute)).replace('0-1:0-1', '--:--'),
              onPress: this.setDotNotDisturbBeginTime.bind(this, !0),
              visible: !0,
            },
            {
              title: I.localization_strings_Setting_DoNotDisturbPage_1,
              funcId: 'robot_setting_page_donot_disturb_end',
              detail: (K.addZeroPrefix(this.doNotDisturbEndHour) + ':' + K.addZeroPrefix(this.doNotDisturbEndMinute)).replace('0-1:0-1', '--:--'),
              onPress: this.setDotNotDisturbEndTime.bind(this, !0),
              visible: !0,
              shouldShowBottomLine: !1,
              shouldShowBottomLongLine: !1,
            },
          ];
          return this.state.isDoNotDisturbSwitchOn ? t : [];
        },
      },
      {
        key: 'getMultiFloorMenus',
        value: function () {
          k.default.isMultiFloorSupported() && this.state.mapSaveModeEnabled;
          return [];
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          return s.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.props.navigation.setParams({
                      title: I.setting_robot_setting,
                      navBarBackgroundColor: this.context.theme.settingBackgroundColor,
                      hiddenBottomLine: !0,
                    });
                    this.getSwitchData(!1);
                    this.updateMopModeSwitchState();
                    this.getLocalDndTimer();

                  case 4:
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
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.setState({
            mapSaveModeEnabled: E.RobotStatusManager.sharedManager().mapSaveEnabled,
            multiFloorEnabled: E.RobotStatusManager.sharedManager().multiFloorEnabled,
          });
          this.registerDeviceNameChangeListener();
          this.registerRobotTimeZoneRedDotListener();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.unreigsterListeners();
        },
      },
      {
        key: 'getSwitchData',
        value: function (t) {
          return s.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (
                      (this.setState({
                        loading: !t,
                        requestFailed: !1,
                        refreshing: t,
                      }),
                      (n.prev = 1),
                      !((!k.default.shouldHideCarpetPressurize() && !k.default.isCarpetSupported()) || V.DMM.isGarnet))
                    ) {
                      n.next = 6;
                      break;
                    }

                    n.next = 6;
                    return s.default.awrap(this.getCarpetPressurizeStatus());

                  case 6:
                    if (!k.default.isLedSwitchVisible()) {
                      n.next = 10;
                      break;
                    }

                    n.next = 10;
                    return s.default.awrap(this.getLedStatus());

                  case 10:
                    if (!k.default.isFlowLedSettingSupported()) {
                      n.next = 13;
                      break;
                    }

                    n.next = 13;
                    return s.default.awrap(this.getFlowLedStatus());

                  case 13:
                    if (!k.default.isSetChildSupported()) {
                      n.next = 16;
                      break;
                    }

                    n.next = 16;
                    return s.default.awrap(this.getChildLockStatus());

                  case 16:
                    if (!k.default.isSupportedValleyElectricity()) {
                      n.next = 19;
                      break;
                    }

                    n.next = 19;
                    return s.default.awrap(this.getValleyElectricityTimer());

                  case 19:
                    n.next = 21;
                    return s.default.awrap(this.getDndTimer());

                  case 21:
                    this.setState({
                      refreshing: !1,
                    });
                    this.finishLoading(!1);
                    U = 0;
                    n.next = 30;
                    break;

                  case 26:
                    n.prev = 26;
                    n.t0 = n.catch(1);
                    console.log('getSwitchData - ' + JSON.stringify(n.t0));
                    this.retry();

                  case 30:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[1, 26]],
            Promise
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = p.default.createElement(y.RequestRetryView, {
              onPressButton: function () {
                U = 0;
                t.getSwitchData(!1);
              },
            });
          if (this.state.requestFailed) return o;
          var l = p.default.createElement(
            w.View,
            {
              style: [
                Z.containterView,
                {
                  backgroundColor: globals.app.state.theme.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ],
            },
            p.default.createElement(T.default, null)
          );
          if (this.state.loading) return l;
          var u = {
              opacity: this.animatedWrapMarginBottom.interpolate({
                inputRange: [-500, 0],
                outputRange: [0, 1],
              }),
              height: x.default.sharedCache().ScreenHeight - v.default.statusbarHeight(),
            },
            c = p.default.createElement(w.SectionList, {
              style: [
                {
                  flex: 1,
                },
                {
                  paddingHorizontal: 15,
                },
              ],
              showsVerticalScrollIndicator: !1,
              automaticallyAdjustContentInsets: !1,
              sections: this.getMenuDatas(),
              renderItem: this.renderListRow,
              renderSectionHeader: this.sectionComp,
              renderSectionFooter: this.sectionFooter,
              ListFooterComponent: p.default.createElement(w.View, {
                style: {
                  height: 25,
                  backgroundColor: this.context.theme.settingBackgroundColor,
                },
              }),
              keyExtractor: function (t, n) {
                return 'index:' + n + t;
              },
              stickySectionHeadersEnabled: !1,
            }),
            h =
              this.state.shouldShowTimePicker &&
              p.default.createElement(
                B.default,
                {
                  transparent: !0,
                  onRequestClose: function () {
                    t.hideTimerPicker();
                  },
                },
                p.default.createElement(
                  w.Animated.View,
                  {
                    style: [Z.modal, u],
                  },
                  p.default.createElement(
                    w.TouchableWithoutFeedback,
                    {
                      onPress: function () {
                        t.hideTimerPicker();
                      },
                    },
                    p.default.createElement(w.View, {
                      style: Z.timerOutView,
                    })
                  ),
                  p.default.createElement(
                    w.Animated.View,
                    {
                      style: [
                        Z.pickerView,
                        {
                          bottom: this.animatedWrapMarginBottom,
                        },
                      ],
                    },
                    p.default.createElement(y.CustomDatePicker, {
                      ref: function (n) {
                        t.timePicker = n;
                      },
                      showDate: this.state.showDate,
                      title: this.isBeginTime ? I.localization_strings_Setting_DoNotDisturbPage_0 : I.localization_strings_Setting_DoNotDisturbPage_1,
                      onPressCancelButton: this.hideTimerPicker.bind(this),
                      onPressConfirmButton: this.didSelectTime.bind(this),
                    })
                  )
                )
              ),
            f =
              this.state.shouldShowAreaUnitView &&
              p.default.createElement(
                B.default,
                {
                  transparent: !0,
                  onRequestClose: function () {
                    t.hideAreaUnitView();
                  },
                },
                p.default.createElement(
                  w.TouchableWithoutFeedback,
                  {
                    accessible: !1,
                    onPress: function () {
                      t.hideAreaUnitView();
                    },
                  },
                  p.default.createElement(
                    w.Animated.View,
                    {
                      style: [Z.modal, u],
                    },
                    p.default.createElement(
                      w.Animated.View,
                      {
                        style: {
                          height: 500,
                          marginBottom: this.animatedWrapMarginBottom,
                          justifyContent: 'flex-end',
                          paddingBottom: 25,
                          overflow: 'hidden',
                        },
                      },
                      p.default.createElement(b.ActionSheetView, {
                        title: I.area_of_unit,
                        actions: J.AreaUnitNames(),
                        didSelectRow: function (n) {
                          return t._onSelectAreaViewMode(n);
                        },
                        onPressCancel: function () {
                          t.hideAreaUnitView();
                        },
                      })
                    )
                  )
                )
              );
          return p.default.createElement(
            w.View,
            {
              style: [
                Z.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            p.default.createElement(
              w.ScrollView,
              {
                style: Z.containter,
                showsVerticalScrollIndicator: !1,
                refreshControl: p.default.createElement(w.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    return t.getSwitchData(!0);
                  },
                }),
              },
              c,
              p.default.createElement(D.default, {
                ref: function (n) {
                  t.tipsView = n;
                },
                parent: this,
                status: this.state.status,
                modalVisible: !1,
              }),
              h,
              f,
              p.default.createElement(N.MapSavePopBox, {
                ref: function (n) {
                  t.mapSaveView = n;
                },
                didCancel: function () {
                  t.setState({
                    multiFloorEnabled: !0,
                  });
                },
                isOverwriteMode: !1,
                saveMap: this.handleSaveMap.bind(this),
              }),
              p.default.createElement(L.LedSettingModalView, {
                ref: function (n) {
                  t.ledSettingView = n;
                },
                didSet: function (n) {
                  return s.default.async(
                    function (o) {
                      for (;;)
                        switch ((o.prev = o.next)) {
                          case 0:
                            o.next = 2;
                            return s.default.awrap(t.updateCameraStatus(n));

                          case 2:
                          case 'end':
                            return o.stop();
                        }
                    },
                    null,
                    null,
                    null,
                    Promise
                  );
                },
              })
            ),
            p.default.createElement(R.default, {
              ref: function (n) {
                t.chargeGuide = n;
              },
              isModal: !0,
              parent: this,
              bgImage: n.guideImages.electricityIcon,
              topTitle: I.robot_status_wait_charge3,
              context: I.robot_status_wait_charge4 + '\n' + I.robot_status_wait_charge5,
              buttonInfo: [I.localization_strings_Setting_RemoteControlPage_51],
              buttonFuncId: ['robot_set_charge_confirm'],
              hasCloseButton: !1,
            })
          );
        },
      },
      {
        key: 'handleSaveMap',
        value: function (t) {
          var n;
          return s.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return s.default.awrap(
                      _.default.setLabStatus({
                        lab_status: 1,
                        reserve_map: t,
                      })
                    );

                  case 3:
                    n = o.sent;
                    console.log('handleSaveMap - ' + JSON.stringify(n));
                    C.MM.getMultiMaps();
                    o.next = 12;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    this.setState({
                      multiFloorEnabled: !0,
                    });
                    globals.showToast(I.robot_communication_exception);

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
        key: 'didSelectTime',
        value: function (t) {
          this.isDoNot
            ? (this.isBeginTime
                ? ((this.doNotDisturbBeginHour = t.getHours()), (this.doNotDisturbBeginMinute = t.getMinutes()))
                : ((this.doNotDisturbEndHour = t.getHours()), (this.doNotDisturbEndMinute = t.getMinutes())),
              this.saveDoNotDisturbData())
            : (this.isBeginTime
                ? ((this.valleyElectricityBeginHour = t.getHours()), (this.valleyElectricityBeginMinute = t.getMinutes()))
                : ((this.valleyElectricityEndHour = t.getHours()), (this.valleyElectricityEndMinute = t.getMinutes())),
              this.saveValleyElectricityData());
          this.hideTimerPicker();
        },
      },
      {
        key: 'showTimerPicker',
        value: function (t, n) {
          var s = this,
            o = new Date();
          o.setHours(t);
          o.setMinutes(n);
          this.setState(
            {
              shouldShowTimePicker: !0,
              showDate: o,
            },
            function () {
              w.Animated.spring(s.animatedWrapMarginBottom, {
                toValue: 0,
                duration: 200,
              }).start();
            }
          );
        },
      },
      {
        key: 'hideTimerPicker',
        value: function () {
          var t = this;
          w.Animated.timing(this.animatedWrapMarginBottom, {
            toValue: -500,
            duration: 200,
          }).start(function () {
            t.setState({
              shouldShowTimePicker: !1,
            });
          });
        },
      },
      {
        key: 'getLocalDndTimer',
        value: function () {
          var t, n, o, l, u;
          return s.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return s.default.awrap((0, M.GetStorageKey)(M.StorageKeys.DoNotDisturbBeginHour));

                  case 3:
                    t = c.sent;
                    c.next = 6;
                    return s.default.awrap((0, M.GetStorageKey)(M.StorageKeys.DoNotDisturbBeginMinute));

                  case 6:
                    n = c.sent;
                    c.next = 9;
                    return s.default.awrap((0, M.GetStorageKey)(M.StorageKeys.DoNotDisturbEndHour));

                  case 9:
                    o = c.sent;
                    c.next = 12;
                    return s.default.awrap((0, M.GetStorageKey)(M.StorageKeys.DoNotDisturbEndMinute));

                  case 12:
                    l = c.sent;
                    c.next = 15;
                    return s.default.awrap((0, M.GetStorageKey)(M.StorageKeys.DoNotDisturbEnable));

                  case 15:
                    u = c.sent;
                    t &&
                      n &&
                      o &&
                      l &&
                      u &&
                      ((this.doNotDisturbBeginHour = parseInt(t)),
                      (this.doNotDisturbBeginMinute = parseInt(n)),
                      (this.doNotDisturbEndHour = parseInt(o)),
                      (this.doNotDisturbEndMinute = parseInt(l)),
                      this.setState({
                        isDoNotDisturbSwitchOn: '1' == u,
                      }));
                    console.log('getLocalDndTimer  startHour: ' + t + '  startMinute:  ' + n + ' endHour:  ' + o + ' endMinute:  ' + l + ' enable: ' + u);
                    c.next = 23;
                    break;

                  case 20:
                    c.prev = 20;
                    c.t0 = c.catch(0);
                    console.log('getLocalDndTimer  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));

                  case 23:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[0, 20]],
            Promise
          );
        },
      },
      {
        key: 'getDndTimer',
        value: function () {
          var t, n, o;
          return s.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.next = 2;
                    return s.default.awrap(_.default.getDndTimer());

                  case 2:
                    t = l.sent;
                    n = t.result[0];
                    k.default.isSupportCustomDnd() &&
                      ((o = n.actions),
                      this.setState({
                        resume: o.resume,
                        vol: o.vol,
                        led: o.led,
                        dust: o.dust,
                        dry: o.dry,
                      }));
                    this.doNotDisturbBeginHour = n.start_hour;
                    this.doNotDisturbBeginMinute = n.start_minute;
                    this.doNotDisturbEndHour = n.end_hour;
                    this.doNotDisturbEndMinute = n.end_minute;
                    this.setState({
                      isDoNotDisturbSwitchOn: 1 == n.enabled,
                    });
                    this.saveLocalDoNotDisturbData();
                    console.log('getDndTimer - ' + JSON.stringify(t));

                  case 12:
                  case 'end':
                    return l.stop();
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
        key: 'saveDoNotDisturbData',
        value: function () {
          var t;
          return s.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (-1 != this.doNotDisturbBeginHour && -1 != this.doNotDisturbBeginMinute && -1 != this.doNotDisturbEndHour && -1 != this.doNotDisturbEndMinute) {
                      n.next = 2;
                      break;
                    }

                    return n.abrupt('return');

                  case 2:
                    n.prev = 2;
                    n.next = 5;
                    return s.default.awrap(_.default.setDndTimer(this.doNotDisturbBeginHour, this.doNotDisturbBeginMinute, this.doNotDisturbEndHour, this.doNotDisturbEndMinute));

                  case 5:
                    t = n.sent;
                    this.saveLocalDoNotDisturbData();
                    (0, H.LogEventStatus)('carpet_pressurize_status_switch', {
                      on: !0,
                      beginHour: this.doNotDisturbBeginHour,
                      beginMinite: this.doNotDisturbBeginMinute,
                      endHour: this.doNotDisturbEndHour,
                      endMinite: this.doNotDisturbEndMinute,
                    });
                    console.log('saveDoNotDisturbData -' + JSON.stringify(t));
                    n.next = 14;
                    break;

                  case 11:
                    n.prev = 11;
                    n.t0 = n.catch(2);
                    console.log('saveDoNotDisturbData  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 14:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[2, 11]],
            Promise
          );
        },
      },
      {
        key: 'saveLocalDoNotDisturbData',
        value: function () {
          return s.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return s.default.awrap((0, M.SetStorageKey)(M.StorageKeys.DoNotDisturbBeginHour, this.doNotDisturbBeginHour.toString()));

                  case 2:
                    t.next = 4;
                    return s.default.awrap((0, M.SetStorageKey)(M.StorageKeys.DoNotDisturbBeginMinute, this.doNotDisturbBeginMinute.toString()));

                  case 4:
                    t.next = 6;
                    return s.default.awrap((0, M.SetStorageKey)(M.StorageKeys.DoNotDisturbEndHour, this.doNotDisturbEndHour.toString()));

                  case 6:
                    t.next = 8;
                    return s.default.awrap((0, M.SetStorageKey)(M.StorageKeys.DoNotDisturbEndMinute, this.doNotDisturbEndMinute.toString()));

                  case 8:
                    t.next = 10;
                    return s.default.awrap((0, M.SetStorageKey)(M.StorageKeys.DoNotDisturbEnable, this.state.isDoNotDisturbSwitchOn ? '1' : '0'));

                  case 10:
                    console.log(
                      'saveLocalDoNotDisturbData  startHour: ' +
                        this.doNotDisturbBeginHour.toString() +
                        '  startMinute:  ' +
                        this.doNotDisturbBeginMinute +
                        ' endHour:  ' +
                        this.doNotDisturbEndHour +
                        ' endMinute:  ' +
                        this.doNotDisturbEndMinute +
                        '  enable: ' +
                        this.state.isDoNotDisturbSwitchOn
                    );

                  case 11:
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
        key: 'getLedStatus',
        value: function () {
          var t, n;
          return s.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return s.default.awrap(_.default.getLedStatus());

                  case 2:
                    t = o.sent;
                    n = t.result[0];
                    this.setState({
                      ledStatusSwitch: 1 == n,
                    });
                    console.log('getLedStatus - ' + JSON.stringify(t));

                  case 6:
                  case 'end':
                    return o.stop();
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
        key: '_onLedStatusSwitchValueChanged',
        value: function (t) {
          var n, o;
          return s.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (((l.prev = 0), k.default.isSupportLedStatusSwitch())) {
                      l.next = 4;
                      break;
                    }

                    globals.showToast(I.localization_strings_Setting_RemoteControlPage_54);
                    return l.abrupt('return');

                  case 4:
                    this.setState({
                      ledStatusSwitch: t,
                    });
                    n = t ? 1 : 0;
                    l.next = 8;
                    return s.default.awrap(_.default.setLedStatus(n));

                  case 8:
                    o = l.sent;
                    (0, H.LogEventStatus)('led_status_switch', {
                      on: t,
                    });
                    console.log('_onLedStatusSwitchValueChanged:' + JSON.stringify(o));
                    l.next = 18;
                    break;

                  case 13:
                    l.prev = 13;
                    l.t0 = l.catch(0);
                    this.setState({
                      ledStatusSwitch: !t,
                    });
                    globals.showToast(I.robot_communication_exception);
                    console.log(l.t0);

                  case 18:
                  case 'end':
                    return l.stop();
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
          var n, o, l, u, c;
          return s.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    h.prev = 0;
                    n = k.default.isNewCarpetPressurize();
                    o = k.default.isRubberBrushCarpetSupported();
                    l = o ? (V.DMM.isTanosSE ? 300 : 280) : n ? 625 : 500;
                    u = {
                      enable: t ? 1 : 0,
                      current_high: l,
                      current_integral: o ? 450 : n ? 550 : 450,
                      current_low: o ? 250 : n ? 500 : 400,
                      stall_time: 10,
                    };
                    this.setState({
                      carpetPressurizeSwitch: t,
                    });
                    (0, H.LogEventStatus)('carpet_pressurize_status_switch', {
                      on: t,
                    });
                    h.next = 11;
                    return s.default.awrap(_.default.setCarpetMode(u));

                  case 11:
                    c = h.sent;
                    console.log('_onCarpetPressurizeSwitchValueChanged:' + JSON.stringify(c));
                    h.next = 20;
                    break;

                  case 15:
                    h.prev = 15;
                    h.t0 = h.catch(0);
                    this.setState({
                      carpetPressurizeSwitch: !t,
                    });
                    globals.showToast(I.robot_communication_exception);
                    console.log(h.t0);

                  case 20:
                  case 'end':
                    return h.stop();
                }
            },
            null,
            this,
            [[0, 15]],
            Promise
          );
        },
      },
      {
        key: '_onMopModeSwitchValueChanged',
        value: function (t) {
          return s.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (
                      (console.log('MopMode Switch - ' + t),
                      this.setState({
                        mopModeSwitch: t,
                      }),
                      (n.prev = 2),
                      105 != E.RobotStatusManager.sharedManager().fanPower || t)
                    ) {
                      n.next = 6;
                      break;
                    }

                    n.next = 6;
                    return s.default.awrap(_.default.setCustomMode(101));

                  case 6:
                    n.next = 8;
                    return s.default.awrap((0, M.SetStorageKey)(M.StorageKeys.RobotMopModeState, t ? '1' : '0'));

                  case 8:
                    n.next = 15;
                    break;

                  case 10:
                    n.prev = 10;
                    n.t0 = n.catch(2);
                    this.setState({
                      mopModeSwitch: !t,
                    });
                    globals.showToast(I.robot_communication_exception);
                    console.log(n.t0);

                  case 15:
                  case 'end':
                    return n.stop();
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
        key: '_onMultifloorSwitchValueChanged',
        value: function (t) {
          var n;
          return s.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if ((console.log('_onMultifloorSwitchValueChanged - ' + t), !E.RSM.isRunning)) {
                      o.next = 4;
                      break;
                    }

                    (0, O.showFinishCurrentTastAlertIfNeeded)().catch(function (t) {
                      globals.showToast(I.robot_communication_exception);
                    });
                    return o.abrupt('return');

                  case 4:
                    if (
                      (this.setState({
                        multiFloorEnabled: t,
                      }),
                      (o.prev = 5),
                      t)
                    ) {
                      o.next = 10;
                      break;
                    }

                    C.MM.maps.length > 0 ? this.mapSaveView && this.mapSaveView.show() : this.handleSaveMap(-1);
                    o.next = 14;
                    break;

                  case 10:
                    o.next = 12;
                    return s.default.awrap(
                      _.default.setLabStatus({
                        lab_status: 3,
                      })
                    );

                  case 12:
                    n = o.sent;
                    console.log('setLabStatus - ' + JSON.stringify(n));

                  case 14:
                    o.next = 21;
                    break;

                  case 16:
                    o.prev = 16;
                    o.t0 = o.catch(5);
                    this.setState({
                      multiFloorEnabled: !t,
                    });
                    globals.showToast(I.robot_communication_exception);
                    console.log(o.t0);

                  case 21:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[5, 16]],
            Promise
          );
        },
      },
      {
        key: '_onCameraSwitichValueChanged',
        value: function (t) {
          var n = this;
          this.setState(
            {
              cameraEnabled: t,
            },
            function () {
              return s.default.async(
                function (o) {
                  for (;;)
                    switch ((o.prev = o.next)) {
                      case 0:
                        o.next = 2;
                        return s.default.awrap(n.updateCameraStatus());

                      case 2:
                        if (o.sent) {
                          o.next = 4;
                          break;
                        }

                        n.setState({
                          cameraEnabled: !t,
                        });

                      case 4:
                      case 'end':
                        return o.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            }
          );
        },
      },
      {
        key: '_onPetModeSwitchValueChanged',
        value: function (t) {
          var n = this;
          this.setState(
            {
              petModeEnabled: t,
            },
            function () {
              return s.default.async(
                function (o) {
                  for (;;)
                    switch ((o.prev = o.next)) {
                      case 0:
                        o.next = 2;
                        return s.default.awrap(n.updateCameraStatus());

                      case 2:
                        if (o.sent) {
                          o.next = 4;
                          break;
                        }

                        n.setState({
                          petModeEnabled: !t,
                        });

                      case 4:
                      case 'end':
                        return o.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            }
          );
        },
      },
      {
        key: '_onRealTimeMonitorSwitchValueChanged',
        value: function (t) {
          var n = this;
          this.setState(
            {
              realTimeMonitorEnabled: t,
            },
            function () {
              return s.default.async(
                function (o) {
                  for (;;)
                    switch ((o.prev = o.next)) {
                      case 0:
                        o.next = 2;
                        return s.default.awrap(n.updateCameraStatus());

                      case 2:
                        if (o.sent) {
                          o.next = 4;
                          break;
                        }

                        n.setState({
                          realTimeMonitorEnabled: !t,
                        });

                      case 4:
                      case 'end':
                        return o.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            }
          );
        },
      },
      {
        key: '_onExplorationSwitchValueChanged',
        value: function (t) {
          var n = this;
          this.setState(
            {
              explorationEnabled: t,
            },
            function () {
              return s.default.async(
                function (o) {
                  for (;;)
                    switch ((o.prev = o.next)) {
                      case 0:
                        o.next = 2;
                        return s.default.awrap(n.updateCameraStatus());

                      case 2:
                        if (o.sent) {
                          o.next = 4;
                          break;
                        }

                        n.setState({
                          explorationEnabled: !t,
                        });

                      case 4:
                      case 'end':
                        return o.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            }
          );
        },
      },
      {
        key: 'updateCameraStatus',
        value: function (t) {
          var n, o, l, u, c, h, f, S, p, w, y, b, v;
          return s.default.async(
            function (D) {
              for (;;)
                switch ((D.prev = D.next)) {
                  case 0:
                    n = 0;
                    o = this.state;
                    l = o.cameraEnabled;
                    u = o.petModeEnabled;
                    c = o.realTimeMonitorEnabled;
                    h = o.explorationEnabled;
                    S = f = l ? 1 : 0;
                    p = u ? 1 : 0;
                    w = c ? 1 : 0;
                    y = h ? 1 : 0;
                    b = void 0 == t ? this.state.ledSetting : t;
                    n = f | (p << 1) | (w << 2) | (b << 3) | (S << 5) | (y << 6);
                    D.prev = 9;
                    D.next = 12;
                    return s.default.awrap(_.default.setCameraStatus(n));

                  case 12:
                    v = D.sent;
                    console.log('updateCameraStatus - ' + JSON.stringify(v) + ' - ' + l + ' - ' + u + ' - ' + c + ' - ' + n);
                    this.setState({
                      ledSetting: t,
                    });
                    return D.abrupt('return', !0);

                  case 18:
                    D.prev = 18;
                    D.t0 = D.catch(9);
                    globals.showToast(I.robot_communication_exception);
                    console.log('updateCameraStatus  error: ' + ('object' == typeof D.t0 ? JSON.stringify(D.t0) : D.t0));
                    return D.abrupt('return', !1);

                  case 23:
                  case 'end':
                    return D.stop();
                }
            },
            null,
            this,
            [[9, 18]],
            Promise
          );
        },
      },
      {
        key: '_onCustomModeSwitchValueChanged',
        value: function (t) {
          return s.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                  case 'end':
                    return t.stop();
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
        key: 'updateMopModeSwitchState',
        value: function () {
          var t;
          return s.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return s.default.awrap((0, M.GetStorageKey)(M.StorageKeys.RobotMopModeState));

                  case 2:
                    t = n.sent;
                    this.setState({
                      mopModeSwitch: '1' == t,
                    });

                  case 4:
                  case 'end':
                    return n.stop();
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
        key: '_onMapSaveSwitchValueChanged',
        value: function (t) {
          var n = this;
          if ((console.log('Toggle Switch - ' + t), t)) this.changeMapSaveSwitchStatus(t);
          else {
            var s = this;
            this.setState(
              {
                mapSaveModeEnabled: !1,
              },
              function () {
                var o;
                null == (o = globals.Alert) ||
                  o.alert(I.map_edit_map_lab_close_warn, '', [
                    {
                      text: I.localization_strings_Main_MainPage_11,
                      onPress: function () {
                        n.setState({
                          mapSaveModeEnabled: !0,
                        });
                      },
                    },
                    {
                      text: I.localization_strings_Main_Error_ErrorDetailPage_3,
                      onPress: function () {
                        s.changeMapSaveSwitchStatus(t);
                      },
                    },
                  ]);
              }
            );
          }
        },
      },
      {
        key: 'getNotificationSwitchStatus',
        value: function () {
          var t, n, o;
          return s.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return s.default.awrap(
                      v.default.asyncSmartHomeAPI('/scene/list', {
                        did: A.deviceId,
                      })
                    );

                  case 3:
                    t = l.sent;
                    console.log('getNotificationSwitchStatus : ' + JSON.stringify(t));
                    n = Object.keys(t.result).find(function (n) {
                      return 24 == t.result[n].st_id || 26 == t.result[n].st_id;
                    });
                    o = n ? t.result[n] : t.result[0];
                    this.setState({
                      notificationSwitch: '1' == o.setting.enable_exception_alert,
                    });
                    this.setting = o;
                    l.next = 14;
                    break;

                  case 11:
                    l.prev = 11;
                    l.t0 = l.catch(0);
                    console.log('getNotificationSwitchStatus error : ' + l.t0);

                  case 14:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[0, 11]],
            Promise
          );
        },
      },
      {
        key: '_onNotificationSwitchValueChanged',
        value: function (t) {
          var n, o, l;
          return s.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    u.prev = 0;
                    n = this.setting;
                    console.log('_onNotificationSwitchValueChanged getNotificationSwitchStatus : ' + JSON.stringify(n));
                    o = {
                      us_id: n.us_id,
                      identity: n.identity,
                      name: n.name,
                      st_id: n.st_id || 24,
                      setting: {
                        enable_exception_alert: t ? 1 : 0,
                      },
                      authed: n.authed,
                    };
                    u.next = 6;
                    return s.default.awrap(v.default.asyncSmartHomeAPI('/scene/edit', o));

                  case 6:
                    l = u.sent;
                    console.log('/scene/edit : ' + JSON.stringify(l));
                    this.setState({
                      notificationSwitch: t,
                    });
                    u.next = 15;
                    break;

                  case 11:
                    u.prev = 11;
                    u.t0 = u.catch(0);
                    console.log(u.t0);
                    globals.showToast(I.robot_communication_exception);

                  case 15:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[0, 11]],
            Promise
          );
        },
      },
      {
        key: 'changeMapSaveSwitchStatus',
        value: function (t) {
          var n, o, l;
          return s.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (!E.RSM.isRunning || t) {
                      u.next = 4;
                      break;
                    }

                    this.setState({
                      mapSaveModeEnabled: !t,
                    });
                    (0, O.showFinishCurrentTastAlertIfNeeded)().catch(function (t) {
                      globals.showToast(I.robot_communication_exception);
                    });
                    return u.abrupt('return');

                  case 4:
                    u.prev = 4;
                    this.setState({
                      mapSaveModeEnabled: t,
                    });
                    n = t ? 1 : 0;
                    o = k.default.isMultiFloorSupported()
                      ? {
                          lab_status: n,
                        }
                      : n;
                    u.next = 10;
                    return s.default.awrap(_.default.setLabStatus(o));

                  case 10:
                    l = u.sent;
                    t ||
                      (this.setState({
                        multiFloorEnabled: !1,
                      }),
                      C.MM.getMultiMaps(),
                      (C.MM.maps = []),
                      w.DeviceEventEmitter.emit(M.NotificationKeys.DidReceiveSpecialEvent, {
                        data: M.EventKeys.MapSegmentsDidChange,
                      }));
                    console.log('changeMapSaveSwitchStatus - ' + JSON.stringify(l));
                    this.tipsView.setState({
                      shouldShow: t,
                    });
                    E.RSM.mapSaveEnabled = t;
                    u.next = 32;
                    break;

                  case 17:
                    if (((u.prev = 17), (u.t0 = u.catch(4)), console.log(u.t0), -3 != u.t0.data.error)) {
                      u.next = 22;
                      break;
                    }

                    return u.abrupt('return');

                  case 22:
                    if (
                      (this.setState({
                        mapSaveModeEnabled: !t,
                      }),
                      -10005 != u.t0.data.error.code)
                    ) {
                      u.next = 26;
                      break;
                    }

                    globals.showToast(I.plugin_need_update);
                    return u.abrupt('return');

                  case 26:
                    if (-10005 != u.t0.data.error) {
                      u.next = 30;
                      break;
                    }

                    globals.showToast(I.plugin_need_update);
                    return u.abrupt('return');

                  case 30:
                    globals.showToast(I.robot_communication_exception);

                  case 32:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[4, 17]],
            Promise
          );
        },
      },
      {
        key: 'getCarpetPressurizeStatus',
        value: function () {
          var t;
          return s.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return s.default.awrap(_.default.getCarpetMode());

                  case 2:
                    t = n.sent;
                    console.log('getCarpetPressurizeStatus: ' + JSON.stringify(t));
                    this.setState({
                      carpetPressurizeSwitch: 1 == t.result[0].enable,
                    });

                  case 5:
                  case 'end':
                    return n.stop();
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
        key: 'onDonotDisturbSwitchValueChanged',
        value: function (t) {
          var n;
          return s.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (
                      (this.setState({
                        isDoNotDisturbSwitchOn: t,
                      }),
                      !t)
                    ) {
                      o.next = 5;
                      break;
                    }

                    this.saveDoNotDisturbData();
                    o.next = 16;
                    break;

                  case 5:
                    o.prev = 5;
                    o.next = 8;
                    return s.default.awrap(_.default.closeDndTimer());

                  case 8:
                    n = o.sent;
                    (0, H.LogEventStatus)('carpet_pressurize_status_switch', {
                      on: t,
                    });
                    console.log('closeDndTimer - ' + JSON.stringify(n));
                    o.next = 16;
                    break;

                  case 13:
                    o.prev = 13;
                    o.t0 = o.catch(5);
                    console.log('closeDndTimer  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 16:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[5, 13]],
            Promise
          );
        },
      },
      {
        key: 'setDotNotDisturbBeginTime',
        value: function (t) {
          t
            ? this.showTimerPicker(this.doNotDisturbBeginHour, this.doNotDisturbBeginMinute)
            : this.showTimerPicker(this.valleyElectricityBeginHour, this.valleyElectricityBeginMinute);
          this.isBeginTime = !0;
          this.isDoNot = t;
        },
      },
      {
        key: 'setDotNotDisturbEndTime',
        value: function (t) {
          t ? this.showTimerPicker(this.doNotDisturbEndHour, this.doNotDisturbEndMinute) : this.showTimerPicker(this.valleyElectricityEndHour, this.valleyElectricityEndMinute);
          this.isBeginTime = !1;
          this.isDoNot = t;
        },
      },
      {
        key: 'registerDeviceNameChangeListener',
        value: function () {
          var t = this;
          A.isMiApp ||
            (this.deviceNameChangedListener = w.DeviceEventEmitter.addListener(A.deviceNameChangedEvent, function (n) {
              t.setState({
                deviceName: n.newName,
              });
              A.deviceName = n.newName;
            }));
        },
      },
      {
        key: 'registerRobotTimeZoneRedDotListener',
        value: function () {
          var t = this;
          this.redPointListener = w.DeviceEventEmitter.addListener(M.NotificationKeys.RedDotDidChange, function (n) {
            t.setState({
              timeZoneShouldShowRedDot: E.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot,
            });
          });
        },
      },
      {
        key: 'unreigsterListeners',
        value: function () {
          this.deviceNameChangedListener && this.deviceNameChangedListener.remove();
          this.deviceNameChangedListener = null;
          this.redPointListener && this.redPointListener.remove();
          this.redPointListener = null;
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          this.setState({
            requestFailed: t,
          });
          this.state.loading &&
            this.setState({
              loading: !1,
            });
        },
      },
      {
        key: 'retry',
        value: function () {
          var t = this;
          U < 3
            ? (U++,
              setTimeout(function () {
                console.warn('retryTimes:' + U);
                t.getSwitchData(!1);
              }, 1e3))
            : this.setState({
                requestFailed: !0,
              });
        },
      },
      {
        key: 'setAreaUnit',
        value: function () {
          var t = this;
          this.setState(
            {
              shouldShowAreaUnitView: !0,
            },
            function () {
              w.Animated.timing(t.animatedWrapMarginBottom, {
                toValue: 0,
                duration: 300,
              }).start();
            }
          );
        },
      },
      {
        key: 'hideAreaUnitView',
        value: function () {
          var t = this;
          w.Animated.timing(this.animatedWrapMarginBottom, {
            toValue: -500,
            duration: 300,
          }).start(function () {
            t.setState({
              shouldShowAreaUnitView: !1,
            });
          });
        },
      },
      {
        key: '_onSelectAreaViewMode',
        value: function (t) {
          return s.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.setState({
                      areaUnitIndex: t,
                    });
                    x.default.sharedCache().areaUnitIndex = t;
                    this.hideAreaUnitView();
                    w.DeviceEventEmitter.emit(M.NotificationKeys.AreaUnitChange);
                    n.next = 6;
                    return s.default.awrap((0, M.SetStorageKey)(M.StorageKeys.AreaUnitIndex, '' + t));

                  case 6:
                    (0, H.LogEventStatus)('select_area_unit', {
                      unitIndex: t,
                    });

                  case 7:
                  case 'end':
                    return n.stop();
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
        key: '_onSetChildLockValueChanged',
        value: function (t) {
          return s.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    console.log('ChildLock Switch - ' + t);
                    this.setState({
                      childLockSwitch: t,
                    });
                    n.prev = 2;
                    n.next = 5;
                    return s.default.awrap(_.default.setChildLockStatus(t ? 1 : 0));

                  case 5:
                    n.next = 12;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(2);
                    this.setState({
                      childLockSwitch: !t,
                    });
                    globals.showToast(I.robot_communication_exception);
                    console.log(n.t0);

                  case 12:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[2, 7]],
            Promise
          );
        },
      },
      {
        key: 'getChildLockStatus',
        value: function () {
          var t, n;
          return s.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return s.default.awrap(_.default.getChildLockStatus());

                  case 2:
                    t = o.sent;
                    n = t.result.lock_status;
                    this.setState({
                      childLockSwitch: 1 == n,
                    });
                    console.log('getChildLock - ' + JSON.stringify(t));

                  case 6:
                  case 'end':
                    return o.stop();
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
        key: 'getFlowLedStatus',
        value: function () {
          var t, n;
          return s.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return s.default.awrap(_.default.getFlowSettingStatus());

                  case 2:
                    t = o.sent;
                    n = t.result.status;
                    this.setState({
                      flowLedStatusSwitch: 1 == n,
                    });
                    console.log('getFlowLedStatus - ' + JSON.stringify(t));

                  case 6:
                  case 'end':
                    return o.stop();
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
        key: '_onFlowLedStatusSwitchValueChanged',
        value: function (t) {
          var n, o;
          return s.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (((l.prev = 0), k.default.isFlowLedSettingSupported())) {
                      l.next = 4;
                      break;
                    }

                    globals.showToast(I.localization_strings_Setting_RemoteControlPage_54);
                    return l.abrupt('return');

                  case 4:
                    this.setState({
                      flowLedStatusSwitch: t,
                    });
                    n = t ? 1 : 0;
                    l.next = 8;
                    return s.default.awrap(_.default.setFlowSettingStatus(n));

                  case 8:
                    o = l.sent;
                    console.log('_onFlowLedStatusSwitchValueChanged:' + JSON.stringify(o));
                    l.next = 17;
                    break;

                  case 12:
                    l.prev = 12;
                    l.t0 = l.catch(0);
                    this.setState({
                      flowLedStatusSwitch: !t,
                    });
                    globals.showToast(I.robot_communication_exception);
                    console.log(l.t0);

                  case 17:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[0, 12]],
            Promise
          );
        },
      },
    ]);
    return W;
  })(p.Component);

exports.default = W;
W.contextType = P.AppConfigContext;
var Z = w.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  containter: {
    flex: 1,
    marginTop: z.NavigationBarHeight,
    paddingBottom: 20,
  },
  modal: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: z.AppBorderRadius,
    alignItems: 'stretch',
  },
  section: {
    paddingVertical: 7,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#888888',
  },
  toastView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  timerOutView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  pickerView: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 99999,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    overflow: 'hidden',
  },
});

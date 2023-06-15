var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module416 = require('./416'),
  module390 = require('./390'),
  module1640 = require('./1640'),
  module424 = require('./424'),
  module520 = require('./520'),
  module1200 = require('./1200'),
  module381 = require('./381'),
  module420 = require('./420'),
  module2120 = require('./2120'),
  module2121 = require('./2121'),
  module2122 = require('./2122'),
  module1201 = require('./1201'),
  module394 = require('./394'),
  module419 = require('./419'),
  module391 = require('./391');

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

require('./1959');

var module510 = require('./510').strings,
  module1344 = require('./1344'),
  module393 = require('./393'),
  module410 = require('./410'),
  K = ['DEV_TEST', 'INTERNAL_TEST', 'EXTERNAL_TEST'],
  J = (function (t) {
    module9.default(J, t);

    var o = J,
      module1200 = _(),
      E = function () {
        var t,
          s = module12.default(o);

        if (module1200) {
          var n = module12.default(this).constructor;
          t = Reflect.construct(s, arguments, n);
        } else t = s.apply(this, arguments);

        return module11.default(this, t);
      };

    function J(t) {
      var o;
      module6.default(this, J);
      (o = E.call(this, t)).FetchNetworkInfoRetry = 0;

      o.onPressIncrementalMapDebug = function () {
        o.props.navigation.navigate('IncrementalMapDebugPage', {});
      };

      o._onPressShowFurnitureIcon = function (t) {
        o.setState({
          showFurnitureModel: t,
        });
        module420
          .SetStorageKey(module420.StorageKeys.ShowFurnitureModel, t ? 'on' : '')
          .then(function () {
            if (!(null == o.props.navigation.state.params.onPressShowFurnitureModel)) o.props.navigation.state.params.onPressShowFurnitureModel();
          })
          .catch(function (s) {
            globals.showToast(JSON.stringify(s));
            o.setState({
              showFurnitureModel: !t,
            });
          });
      };

      o._onPressAutoIdetifyRoomTag = function (t) {
        return regeneratorRuntime.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  s.prev = 0;
                  s.next = 3;
                  return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.AutoIdentifyRoomTag, t ? 'true' : 'false'));

                case 3:
                  o.setState({
                    autoIdentifyRoomTag: t,
                  });
                  s.next = 9;
                  break;

                case 6:
                  s.prev = 6;
                  s.t0 = s.catch(0);
                  globals.showToast(JSON.stringify(s.t0));

                case 9:
                case 'end':
                  return s.stop();
              }
          },
          null,
          null,
          [[0, 6]],
          Promise
        );
      };

      o._onPressPluginLog = function () {
        var t, s, u, l, c, p, w;
        return regeneratorRuntime.default.async(
          function (S) {
            for (;;)
              switch ((S.prev = S.next)) {
                case 0:
                  if (!module393.isRRLogSupported()) {
                    S.next = 10;
                    break;
                  }

                  if (!(null == (t = module8.default(o)) || null == (s = t.loadingView))) s.showWithText('log\u4e0a\u4f20\u4e2d...');
                  S.next = 4;
                  return regeneratorRuntime.default.awrap(module419.Log.rrlogUpload());

                case 4:
                  c = S.sent;
                  console.log('_onPressPluginLog', c);
                  if (!(null == (u = module8.default(o)) || null == (l = u.loadingView))) l.hide();

                  if (c.logId) {
                    module13.Clipboard.setString('logPackageId:' + c.logId);
                    if (!(null == (p = globals))) p.showToast('\u4e0a\u4f20\u6210\u529f\uff0c logId\u5df2\u590d\u5236');
                  } else if (!(null == (w = globals))) w.showToast('\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u4e00\u5206\u949f\u540e\u91cd\u8bd5\uff0cerror:' + c.error);

                  S.next = 11;
                  break;

                case 10:
                  o.props.navigation.navigate('LogListPage', {
                    title: '\u65e5\u5fd7',
                  });

                case 11:
                case 'end':
                  return S.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      o._onPressCarpetCleanConfig = function (t) {
        return regeneratorRuntime.default.async(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  o.props.navigation.navigate('CarpetCleanModeDebug', {
                    title: '\u5730\u6bef\u6e05\u6d01\u8bbe\u7f6e',
                  });

                case 1:
                case 'end':
                  return t.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      o.onPressFeedbackPage = function () {
        var t, module22, module6, module7;
        return regeneratorRuntime.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  if (!module393.isMiApp) {
                    n.next = 8;
                    break;
                  }

                  t = 'https://monitor.roborock.com';
                  module22 = {
                    model: module393.deviceModel,
                    serial_number: module394.default.sharedCache().serialNumber,
                    uid: module393.userId,
                    app_version: module391.default.getAppDisplayVersion(),
                    firmware_version: o.firmwareVersion,
                    plugin_version: module391.default.pluginVersion(),
                    did: module391.default.getDid(),
                    ssid: o.networkInfo.ssid,
                    localip: o.networkInfo.localip,
                    mac: o.networkInfo.mac,
                  };
                  module6 = Object.keys(module22)
                    .map(function (t) {
                      return t + '=' + encodeURIComponent(module22[t]);
                    })
                    .join('&');
                  module7 = t + '?' + module6;
                  console.log('LinkingURL: ' + module7);
                  module13.Linking.openURL(module7);
                  return n.abrupt('return');

                case 8:
                  o.props.navigation.navigate('FeedbackViewPage', {
                    title: '\u95ee\u9898\u53cd\u9988',
                  });

                case 10:
                case 'end':
                  return n.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      o._onSapMapBeautifySwitchValueChanged = function (t) {
        return regeneratorRuntime.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  o.setState({
                    sapMapBeautifySwitch: t,
                  });
                  module420
                    .SetStorageKey(module420.StorageKeys.SapMapBeautifyFlag, t ? 'on' : 'close')
                    .then(function () {
                      module394.MC.sapMapBeautify = t;
                    })
                    .catch(function (s) {
                      globals.showToast(JSON.stringify(s));
                      o.setState({
                        sapMapBeautifySwitch: !t,
                      });
                    });

                case 2:
                case 'end':
                  return s.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      o.state = {
        partitionMapSwitch: false,
        carpetSwitch: false,
        mopFloorSwitch: false,
        liberatingSwitch: false,
        mapIndicatorSwitch: false,
        darkSwitch: false,
        photoSwitch: false,
        collisionAvoidSwitch: false,
        showSpecificObstacle: true,
        showVoiceTest: false,
        shouldShowTestIDListItem: false,
        shouldShowAnonymousIDView: false,
        testID: ' ',
        shouldShowVnIDListItem: false,
        vnID: ' ',
        shouldShowDebugOperatorsInfoView: false,
        washPathSwitch: false,
        isShowCarpet: module394.MC.isShowCarpet,
        sapMapBeautifySwitch: module394.MC.sapMapBeautify,
        isShowCarpet: module394.default.sharedCache().isShowCarpet,
        dockVersion: '',
        hasSendUpgradeDockCmd: false,
      };
      o.unMount = false;
      o.mapDebugStatus = 0;
      o.animatedWrapMarginBottom = new module13.Animated.Value(-500);
      o.actionData = {};
      return o;
    }

    module7.default(J, [
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            title: '\u8c03\u8bd5\u6a21\u5f0f',
          });
          this.getMapBeautifyDebugSwitchData();
          this.getSwitchData();
          this.getAnonymousID();
          this.getCollisionAvoidInfo();
          this.getGeneralObstableData();
          this.getShowFurnitureIconInfo();
          this.getAutoIndetifyRoomTag();
          if (module381.RSM.isO4Dock()) this.getDockInfo();
          if (module393.isMiApp) this.getDebugInfo();
        },
      },
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
        key: 'getDockInfo',
        value: function () {
          var t, o, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    u.prev = 0;
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getDockInfo());

                  case 3:
                    t = u.sent;
                    o = t.result;
                    s = o.version;
                    this.setState({
                      dockVersion: s,
                    });
                    console.log('getDockInfo', t);
                    u.next = 12;
                    break;

                  case 9:
                    u.prev = 9;
                    u.t0 = u.catch(0);
                    console.log('getDockInfo error', u.t0);

                  case 12:
                  case 'end':
                    return u.stop();
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
        key: 'upgradeDock',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (!this.hasSendUpgradeDockCmd) {
                      o.next = 3;
                      break;
                    }

                    globals.showToast('\u5347\u7ea7\u6307\u4ee4\u5df2\u4e0b\u53d1\u6210\u529f\uff0c\u8bf7\u8010\u5fc3\u7b49\u5f85\uff0c\u65e0\u9700\u91cd\u590d\u4e0b\u53d1');
                    return o.abrupt('return');

                  case 3:
                    o.prev = 3;
                    o.next = 6;
                    return regeneratorRuntime.default.awrap(module416.default.updateDock());

                  case 6:
                    t = o.sent;
                    globals.showToast('\u5347\u7ea7\u6307\u4ee4\u5df2\u4e0b\u53d1\u6210\u529f\uff0c\u8bf7\u8010\u5fc3\u7b49\u5f85');
                    this.hasSendUpgradeDockCmd = true;
                    console.log('upgradeDock', t);
                    o.next = 15;
                    break;

                  case 12:
                    o.prev = 12;
                    o.t0 = o.catch(3);
                    console.log('upgradeDock error', o.t0);

                  case 15:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[3, 12]],
            Promise
          );
        },
      },
      {
        key: 'midNightRebootTest',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(module416.default.findMe());

                  case 2:
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
        key: 'getMenuDatas',
        value: function () {
          var t = module390.default.isDebuggableV1User(),
            o = module390.default.isMapBeautifyDebugUser(),
            s = module393.userScope,
            n = 'DEV_TEST' == s,
            u = 'DEV_TEST' == s || 'INTERNAL_TEST' == s,
            l = K.hasElement(s),
            h = module390.default.isMapBeautifyInternalDebugSupported() && u,
            c = l && !module393.isMiApp && 'cn' == module381.RSM.countryCode && 'cn' == module381.RSM.deviceLocation;
          return [
            {
              title: '\u5206\u533a\u5730\u56fe\u8c03\u8bd5',
              shouldShowSwitch: true,
              switchOn: this.state.partitionMapSwitch,
              switchValueChanged: this._onPartitionMapValueChanged.bind(this),
              visible: h || t || o,
              shouldShowBottomLongLine: true,
            },
            {
              title: '\u5730\u6bef\u8c03\u8bd5',
              shouldShowSwitch: true,
              switchOn: this.state.carpetSwitch,
              switchValueChanged: this._onCarpetSwitchValueChanged.bind(this),
              visible: h || t || o,
              shouldShowBottomLongLine: true,
            },
            {
              title: '\u62d6\u5730\u8def\u5f84\u8c03\u8bd5',
              shouldShowSwitch: true,
              switchOn: this.state.mopFloorSwitch,
              switchValueChanged: this._onMopFloorSwitchValueChanged.bind(this),
              visible: h || t || o,
              shouldShowBottomLongLine: true,
            },
            {
              title: '\u5730\u56fe\u589e\u91cf\u66f4\u65b0\u8c03\u8bd5',
              shouldShowRightArrow: true,
              onPress: this.onPressIncrementalMapDebug,
              visible: (t || o) && module390.default.isSupportIncrementalMap(),
              shouldShowBottomLongLine: true,
            },
            {
              title: '\u8131\u56f0\u8def\u5f84\u8c03\u8bd5',
              shouldShowSwitch: true,
              switchOn: this.state.liberatingSwitch,
              switchValueChanged: this._onLiberatingSwitchValueChanged.bind(this),
              visible: h || t || o,
              shouldShowBottomLongLine: module424.DMM.isGarnet,
              shouldShowBottomLine: false,
            },
            {
              visible: h,
            },
            {
              title: '\u5730\u56fe\u7f8e\u5316',
              shouldShowSwitch: true,
              switchOn: this.state.sapMapBeautifySwitch,
              switchValueChanged: this._onSapMapBeautifySwitchValueChanged,
              visible: module424.DMM.isSapphirePlus && (u || t),
              shouldShowBottomLongLine: module424.DMM.isSapphirePlus,
            },
            {
              visible: module424.DMM.isSapphirePlus,
            },
            {
              title: '\u80f6\u5237\u5730\u6bef\u663e\u793a',
              shouldShowSwitch: true,
              switchOn: this.state.isShowCarpet,
              switchValueChanged: this._onRubberBrushCarpetSwitchValueChanged.bind(this),
              visible: module390.default.isRubberBrushCarpetSupported() && (u || t),
              shouldShowBottomLongLine: true,
            },
            {
              title: '\u969c\u788d\u7269\u5750\u6807\u70b9',
              shouldShowSwitch: true,
              switchOn: this.state.mapIndicatorSwitch,
              switchValueChanged: this._onPressMapInfoIndicator.bind(this),
              visible: module390.default.isObstaclesSupport() || t,
              shouldShowBottomLine: false,
            },
            {
              visible: module390.default.isObstaclesSupport() || t,
            },
            {
              title: '\u5bb6\u5177\u8c03\u8bd5',
              shouldShowSwitch: true,
              switchOn: this.state.showFurnitureModel,
              switchValueChanged: this._onPressShowFurnitureIcon,
              visible: (module390.default.isSupportFurniture() && u) || t,
              shouldShowBottomLine: true,
            },
            {
              title: '\u623f\u95f4\u81ea\u52a8\u8bc6\u522b',
              shouldShowSwitch: true,
              switchOn: this.state.autoIdentifyRoomTag,
              switchValueChanged: this._onPressAutoIdetifyRoomTag,
              visible: (module390.default.isSupportFurniture() && module390.default.isSupportRoomTag() && u) || t,
              shouldShowBottomLine: false,
            },
            {
              visible: (module390.default.isSupportFurniture() && u) || t,
            },
            {
              title: '\u5730\u6bef\u589e\u538b\u9608\u503c',
              shouldShowRightArrow: true,
              onPress: this.onCarpetPressurize.bind(this),
              visible: (module390.default.isRubberBrushCarpetSupported() && n) || t,
              shouldShowBottomLine: false,
            },
            {
              visible: (module390.default.isRubberBrushCarpetSupported() && n) || t,
            },
            {
              title: '\u5730\u6bef\u6e05\u6d01\u8bbe\u7f6e',
              shouldShowRightArrow: true,
              onPress: this._onPressCarpetCleanConfig,
              visible: (module390.default.isSupportMopBackPWMSet() && n) || t,
              shouldShowBottomLine: false,
            },
            {
              visible: (module390.default.isSupportMopBackPWMSet() && n) || t,
            },
            {
              title: '\u5b9e\u666f\u7167\u7247',
              shouldShowSwitch: true,
              switchOn: this.state.photoSwitch,
              switchValueChanged: this._onPressPhotoDebug.bind(this),
              visible: ((module424.DMM.isTanosSPlus || module424.DMM.isTanosSMax || module424.DMM.isTopazSPlus || module424.DMM.isUltron || module424.DMM.isUltronSPlus) && l) || t,
              shouldShowBottomLine: false,
            },
            {
              title: '\u514d\u78b0\u649e\u529f\u80fd\u5f00\u5173',
              shouldShowSwitch: true,
              switchOn: this.state.collisionAvoidSwitch,
              switchValueChanged: this._onPressCollisionAvoid.bind(this),
              visible: false,
              shouldShowBottomLine: false,
            },
            {
              title: '\u5177\u4f53\u969c\u788d\u7269\u7c7b\u522b\u4e0e\u7f6e\u4fe1\u5ea6',
              shouldShowSwitch: true,
              switchOn: this.state.showSpecificObstacle,
              switchValueChanged: this._onPressObstacleIconDebug.bind(this),
              visible: (module390.default.isShowGeneralObstacle() && l) || t,
            },
            {
              visible: (module390.default.isShowGeneralObstacle() && l) || t,
            },
            {
              title: '\u6df1\u8272\u6a21\u5f0f',
              shouldShowSwitch: true,
              switchOn: this.state.darkSwitch,
              switchValueChanged: this._onPressDarkMode.bind(this),
              visible: n || t,
              shouldShowBottomLine: false,
            },
            {
              visible: n || t,
            },
            {
              title: '\u63d2\u4ef6log',
              bottomDetail: module393.isRRLogSupported()
                ? '\u77f3\u5934App\u73b0\u5df2\u652f\u516c\u7f51\u4f20log\uff0c\u70b9\u51fb\u5f00\u59cb\u4e0a\u4f20\uff0c\u4e0a\u4f20\u6210\u529f\u540e\u4f1a\u81ea\u52a8\u590d\u5236logID\uff0c\u52a1\u5fc5\u5c06logID\u7c98\u8d34\u5230\u5bf9\u5e94\u7684\u7985\u9053bug\u91cc'
                : '\u6b64\u529f\u80fd\u4e3a\u5185\u90e8\u529f\u80fd\uff0c\u53ea\u6d4b\u8bd5v1\u673a\u5668\u4e0d\u663e\u793a\u5373\u53ef,\u4ee5\u540e\u63d2\u4ef6\u9047\u5230\u529f\u80fd\u6027bug\u53ef\u4ee5\u6765\u6b64\u5904\u4e0a\u4f20log(\u4e3a\u4e86\u7f51\u7edc\u5b89\u5168\uff0c\u5fc5\u987b\u7528\u516c\u53f8\u5185\u7f51\u4e0a\u4f20),\u4e0a\u4f20\u5b8c\u6210\u4f1a\u81ea\u52a8\u590d\u5236log_id,\u4e5f\u53ef\u4ee5\u624b\u52a8\u70b9\u51fb\u5c0f\u82b1\u56fe\u6807\u590d\u5236\uff0c\u8bf7\u5c06logid\u8d34\u5230bug\u91cc',
              shouldShowRightArrow: true,
              bottomDetailWidth: module13.Dimensions.get('window').width - 50,
              onPress: this._onPressPluginLog.bind(this),
              visible: u || t || !module424.DMM.isV1,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            {
              visible: true,
            },
            {
              title: '\u4e91\u7aefKey\u503c',
              shouldShowRightArrow: true,
              onPress: this.onDebugMode.bind(this),
              visible: (module390.default.isDebuggableV1User() && module393.isMiApp) || t,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            {
              title: '\u97f3\u91cf\u8bbe\u7f6e',
              shouldShowRightArrow: true,
              onPress: this.onPressVoiceTest.bind(this),
              visible: n || t,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            {
              title: '\u8bed\u97f3\u5305\u6d4b\u8bd5',
              shouldShowRightArrow: true,
              onPress: this.onPressTestSoundPackage.bind(this),
              visible: n,
              shouldShowBottomLine: false,
            },
            {
              visible: true,
            },
            {
              title: '\u65e5\u5fd7\u533f\u540dID',
              shouldShowRightArrow: true,
              onPress: this.onPressTestID.bind(this),
              visible: this.state.shouldShowTestIDListItem || t,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: this.state.shouldShowTestIDListItem && this.state.shouldShowVnIDListItem,
            },
            {
              title: '\u56fe\u7247\u533f\u540dID',
              shouldShowRightArrow: true,
              onPress: this.onPressVnID.bind(this),
              visible: this.state.shouldShowVnIDListItem || t,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            {
              visible: this.state.shouldShowTestIDListItem || this.state.shouldShowVnIDListItem || t,
            },
            {
              title: '\u6e05\u7a7a\u63d2\u4ef6\u672c\u5730\u5b58\u50a8',
              shouldShowRightArrow: true,
              onPress: function () {
                module420.clearAllAsyncStorage();
                module381.RSM.resetForAutoTest();
              },
              visible: module393.isAutoTestSupported() || t,
              funcId: 'debug_func_clear_all_localstorage',
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            {
              visible: this.isShowOperatorsInfo(),
            },
            {
              title: '\u83b7\u53d6\u624b\u673a\u8fd0\u8425\u5546\u4fe1\u606f',
              shouldShowRightArrow: true,
              onPress: this.getOperatorsInfo.bind(this),
              visible: this.isShowOperatorsInfo() || t,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            {
              visible: this.isShowOperatorsInfo(),
            },
            {
              title: '\u63d0\u4ea4\u65e5\u5fd7\u533f\u540dID',
              shouldShowRightArrow: true,
              onPress: this.submitTestID.bind(this),
              visible: (this.state.shouldShowTestIDListItem && c) || t,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: (this.state.shouldShowTestIDListItem && this.state.shouldShowVnIDListItem && c) || t,
            },
            {
              title: '\u63d0\u4ea4\u56fe\u7247\u533f\u540dID',
              shouldShowRightArrow: true,
              onPress: this.submitVnID.bind(this),
              visible: (this.state.shouldShowVnIDListItem && c) || t,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            {
              visible: true,
            },
            {
              title: '\u62cd\u6444\u4e13\u7528',
              shouldShowRightArrow: true,
              onPress: this.onRemoteDebug.bind(this),
              visible: u,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            {
              title: 'CES2022',
              shouldShowRightArrow: true,
              onPress: this.openCES2022.bind(this),
              visible: u && module390.default.isCes2022Supported(),
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            {
              visible: true,
            },
            {
              title: '\u590d\u5236\u8bed\u97f3\u5305info',
              shouldShowRightArrow: true,
              onPress: this.onCopySoundPackageInfo.bind(this),
              visible: n || t,
              shouldShowBottomLine: false,
            },
            {
              visible: true,
            },
            {
              title: '\u914d\u7f6e\u6587\u4ef6',
              shouldShowRightArrow: true,
              onPress: this.onConfigFileList.bind(this),
              visible: n || t,
              shouldShowBottomLine: false,
            },
            {
              visible: true,
            },
            {
              title: '\u70d8\u5e72\u8bbe\u7f6e',
              shouldShowRightArrow: true,
              onPress: this.onDrySettingDebug.bind(this),
              visible: module390.default.isSupportedDrying() && n,
              shouldShowBottomLine: false,
            },
            {
              visible: true,
            },
            {
              title: '\u6e05\u626b\u9884\u5224',
              shouldShowRightArrow: true,
              onPress: this.onCleanEstimateDebug.bind(this),
              visible: u && module390.default.isSupportCleanEstimate(),
              shouldShowBottomLine: false,
            },
            {
              visible: true,
            },
            {
              title: 'O4\u57fa\u5ea7\u5347\u7ea7',
              bottomDetail:
                '\u57fa\u5ea7\u5f53\u524d\u7248\u672c: ' + this.state.dockVersion + '\u3002\u8bf7\u786e\u4fdd\u670d\u52a1\u5668\u6709\u53ef\u5347\u7ea7\u7684\u56fa\u4ef6',
              shouldShowRightArrow: true,
              titleStyle: {
                color: 'red',
              },
              onPress: this.upgradeDock.bind(this),
              visible: n && module381.RSM.isO4Dock(),
              shouldShowBottomLine: false,
            },
            {
              visible: true,
            },
            {
              title: '\u534a\u591c\u6a21\u62df\u91cd\u542f',
              bottomDetail: '\u534a\u591c\u6a21\u62df\u91cd\u542f\u4ec5\u7528\u4f5c\u5f00\u53d1\u6d4b\u8bd5',
              shouldShowRightArrow: true,
              onPress: this.midNightRebootTest.bind(this),
              visible: n || module390.default.isDebugMidRebootOnMijiaSupported(),
              shouldShowBottomLine: false,
            },
          ];
        },
      },
      {
        key: 'onCleanEstimateDebug',
        value: function () {
          this.props.navigation.navigate('CleanEstimateInfoDebugPage', {});
        },
      },
      {
        key: 'onDrySettingDebug',
        value: function () {
          this.props.navigation.navigate('DebugDrySettingPage', {});
        },
      },
      {
        key: 'onConfigFileList',
        value: function () {
          this.props.navigation.navigate('DebugConfigFileListPage', {
            title: '\u914d\u7f6e\u6587\u4ef6',
          });
        },
      },
      {
        key: 'onCopySoundPackageInfo',
        value: function () {
          this.props.navigation.navigate('SoundPackageInfoDebugPage', {
            title: '\u8bed\u97f3\u5305info',
          });
        },
      },
      {
        key: 'onPressTestSoundPackage',
        value: function () {
          this.props.navigation.navigate('SoundPackageTestPage', {
            title: '\u8bed\u97f3\u5305\u6d4b\u8bd5',
          });
        },
      },
      {
        key: 'submitTestID',
        value: function () {
          var t, o, module22, module6, module7;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    h.prev = 0;
                    t = this.state.testID;
                    o = module393.userId;
                    module22 = JSON.stringify([
                      {
                        logID: t,
                        userId: o,
                      },
                    ]);
                    h.next = 6;
                    return regeneratorRuntime.default.awrap(module416.default.getSerialNumber());

                  case 6:
                    module6 = h.sent;
                    module7 = module6.result[0].serial_number;
                    h.next = 10;
                    return regeneratorRuntime.default.awrap(module393.collectUserInfo('logIDInfo', module22, module7));

                  case 10:
                    globals.showToast('\u63d0\u4ea4\u6210\u529f');
                    h.next = 18;
                    break;

                  case 14:
                    h.prev = 14;
                    h.t0 = h.catch(0);
                    globals.showToast('\u63d0\u4ea4\u5931\u8d25');
                    console.log('submitTestID error : ' + JSON.stringify(h.t0));

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
        key: 'submitVnID',
        value: function () {
          var t,
            o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (!(null == (t = globals.Alert)))
                      t.alert(
                        '',
                        '\u611f\u8c22\u5404\u4f4d\u5bf9\u91c7\u96c6\u5de5\u4f5c\u7684\u652f\u6301\u4e0e\u914d\u5408\u3002\u6b64\u6b3e\u5185\u6d4b\u673a\u5728\u6e05\u626b\u7684\u8fc7\u7a0b\u4e2d\u4f1a\u4e0d\u65ad\u8fdb\u884c\u5b9e\u666f\u62cd\u6444\u5e76\u5c06\u7167\u7247\u52a0\u5bc6\u4e0a\u4f20\u5230\u670d\u52a1\u5668\u7aef\u3002\u5728\u8fdb\u884c\u6545\u969c\u5206\u6790\u65f6\uff0c\u5f00\u53d1\u4eba\u5458\u53ef\u80fd\u4f1a\u9700\u8981\u4f60\u63d0\u4f9b\u5185\u6d4b\u673a\u7684\u201c\u56fe\u7247\u533f\u540did\u201d\u6765\u4e0b\u8f7d\u76f8\u5e94\u7684\u7167\u7247\u3002\u8bf7\u60a8\u5728\u5185\u6d4b\u673a\u5de5\u4f5c\u7684\u8fc7\u7a0b\u4e2d\u4fdd\u62a4\u597d\u4e2a\u4eba\u9690\u79c1\uff0c\u5982\u60f3\u5220\u9664\u7167\u7247\u8bf7\u53ca\u65f6\u90ae\u4ef6\u8054\u7cfb lezhan@roborock.com',
                        [
                          {
                            text: '\u53d6\u6d88',
                            onPress: function () {},
                          },
                          {
                            text: '\u786e\u5b9a',
                            onPress: function () {
                              var t, s, module6, module7, module8;
                              return regeneratorRuntime.default.async(
                                function (c) {
                                  for (;;)
                                    switch ((c.prev = c.next)) {
                                      case 0:
                                        c.prev = 0;
                                        t = o.state.vnID;
                                        s = module393.userId;
                                        module6 = JSON.stringify([
                                          {
                                            vnID: t,
                                            userId: s,
                                          },
                                        ]);
                                        c.next = 6;
                                        return regeneratorRuntime.default.awrap(module416.default.getSerialNumber());

                                      case 6:
                                        module7 = c.sent;
                                        module8 = module7.result[0].serial_number;
                                        c.next = 10;
                                        return regeneratorRuntime.default.awrap(module393.collectUserInfo('vnIDInfo', module6, module8));

                                      case 10:
                                        globals.showToast('\u63d0\u4ea4\u6210\u529f');
                                        c.next = 18;
                                        break;

                                      case 14:
                                        c.prev = 14;
                                        c.t0 = c.catch(0);
                                        globals.showToast('\u63d0\u4ea4\u5931\u8d25');
                                        console.log('submitVnID error : ' + JSON.stringify(c.t0));

                                      case 18:
                                      case 'end':
                                        return c.stop();
                                    }
                                },
                                null,
                                null,
                                [[0, 14]],
                                Promise
                              );
                            },
                          },
                        ]
                      );

                  case 1:
                  case 'end':
                    return s.stop();
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
        key: 'onCarpetPressurize',
        value: function () {
          this.props.navigation.navigate('CarpetPressurizeSettingPage', {
            title: '\u5730\u6bef\u589e\u538b\u9608\u503c',
          });
        },
      },
      {
        key: 'onRemoteDebug',
        value: function () {
          this.props.navigation.navigate('DebugRemoteControlPage', {
            title: '\u62cd\u6444\u4e13\u7528',
          });
        },
      },
      {
        key: 'openCES2022',
        value: function () {
          this.props.navigation.navigate('CES2022Page', {
            title: 'Ces2022',
          });
        },
      },
      {
        key: '_onRubberBrushCarpetSwitchValueChanged',
        value: function (t) {
          var o, s;
          this.setState({
            isShowCarpet: t,
          });
          module394.default.sharedCache().isShowCarpet = t;
          if (!(null == (o = (s = this.props.navigation.state.params).onPressShowRubberBrushCarpet))) o.call(s);
        },
      },
      {
        key: '_onPressDarkMode',
        value: function (t) {
          this.setThemeMode(t.toString());
          this.setState({
            darkSwitch: t,
          });
          globals.app.changeTheme(globals.app.state.theme == module520.Themes.light ? module520.Themes.dark : module520.Themes.light);
        },
      },
      {
        key: 'setThemeMode',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.HasDarkMode, t));

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
      },
      {
        key: '_onPressMapInfoIndicator',
        value: function (t) {
          this.setState({
            mapIndicatorSwitch: t,
          });
          if (this.props.navigation.state.params.onPressMapDebug) this.props.navigation.state.params.onPressMapDebug();
        },
      },
      {
        key: 'getSwitchData',
        value: function () {
          this.setState({
            mapIndicatorSwitch: this.props.navigation.state.params.mapDebugInfoIndicatorActive,
            darkSwitch: globals.app.state.theme == module520.Themes.dark,
            photoSwitch: module1640.default.mapObjectPhotoEnabled,
          });
        },
      },
      {
        key: 'getMapBeautifyDebugSwitchData',
        value: function () {
          var t, o, s, u, l, h, c;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    p.prev = 0;
                    p.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getMapBeautificationStatus());

                  case 3:
                    t = p.sent;
                    console.log('getMapBeautificationStatus - ' + JSON.stringify(t));
                    o = t.result.status;
                    this.mapDebugStatus = o;
                    s = s = !!(1 & o);
                    u = u = !!(2 & o);
                    l = l = !!(4 & o);
                    h = h = !!(8 & o);
                    c = c = !!(16 & o);
                    if (!this.unMount)
                      this.setState({
                        partitionMapSwitch: s,
                        carpetSwitch: u,
                        mopFloorSwitch: l,
                        liberatingSwitch: h,
                        washPathSwitch: c,
                      });
                    p.next = 18;
                    break;

                  case 15:
                    p.prev = 15;
                    p.t0 = p.catch(0);
                    console.log(p.t0);

                  case 18:
                  case 'end':
                    return p.stop();
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
        key: '_onPartitionMapValueChanged',
        value: function (t) {
          var o, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if ((o = this.mapDebugStatus)) {
                      u.next = 3;
                      break;
                    }

                    return u.abrupt('return');

                  case 3:
                    console.log('_onPartitionMapValueChanged - ' + t);
                    this.setState({
                      partitionMapSwitch: t,
                    });
                    u.prev = 5;
                    o = t ? 1 | o : 1 ^ o;
                    this.mapDebugStatus = o;
                    u.next = 10;
                    return regeneratorRuntime.default.awrap(module416.default.setMapBeautificationStatus(o));

                  case 10:
                    s = u.sent;
                    console.log('_onDustCollectionValueChanged - ' + JSON.stringify(s));
                    u.next = 18;
                    break;

                  case 14:
                    u.prev = 14;
                    u.t0 = u.catch(5);
                    this.setState({
                      partitionMapSwitch: !t,
                    });
                    console.log(u.t0);

                  case 18:
                  case 'end':
                    return u.stop();
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
        key: '_onCarpetSwitchValueChanged',
        value: function (t) {
          var o, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if ((o = this.mapDebugStatus)) {
                      u.next = 3;
                      break;
                    }

                    return u.abrupt('return');

                  case 3:
                    console.log('_onCarpetSwitchValueChanged - ' + t);
                    this.setState({
                      carpetSwitch: t,
                    });
                    u.prev = 5;
                    o = t ? 2 | o : 2 ^ o;
                    this.mapDebugStatus = o;
                    u.next = 10;
                    return regeneratorRuntime.default.awrap(module416.default.setMapBeautificationStatus(o));

                  case 10:
                    s = u.sent;
                    console.log('_onCarpetSwitchValueChanged - ' + JSON.stringify(s));
                    u.next = 18;
                    break;

                  case 14:
                    u.prev = 14;
                    u.t0 = u.catch(5);
                    this.setState({
                      carpetSwitch: !t,
                    });
                    console.log(u.t0);

                  case 18:
                  case 'end':
                    return u.stop();
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
        key: '_onMopFloorSwitchValueChanged',
        value: function (t) {
          var o, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if ((o = this.mapDebugStatus)) {
                      u.next = 3;
                      break;
                    }

                    return u.abrupt('return');

                  case 3:
                    console.log('_onMopFloorSwitchValueChanged - ' + t);
                    this.setState({
                      mopFloorSwitch: t,
                    });
                    u.prev = 5;
                    o = t ? 4 | o : 4 ^ o;
                    this.mapDebugStatus = o;
                    u.next = 10;
                    return regeneratorRuntime.default.awrap(module416.default.setMapBeautificationStatus(o));

                  case 10:
                    s = u.sent;
                    console.log('_onMopFloorSwitchValueChanged - ' + JSON.stringify(s));
                    u.next = 18;
                    break;

                  case 14:
                    u.prev = 14;
                    u.t0 = u.catch(5);
                    this.setState({
                      mopFloorSwitch: !t,
                    });
                    console.log(u.t0);

                  case 18:
                  case 'end':
                    return u.stop();
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
        key: '_onLiberatingSwitchValueChanged',
        value: function (t) {
          var o, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if ((o = this.mapDebugStatus)) {
                      u.next = 3;
                      break;
                    }

                    return u.abrupt('return');

                  case 3:
                    console.log('_onLiberatingSwitchValueChanged - ' + t);
                    this.setState({
                      liberatingSwitch: t,
                    });
                    u.prev = 5;
                    o = t ? 8 | o : 8 ^ o;
                    this.mapDebugStatus = o;
                    u.next = 10;
                    return regeneratorRuntime.default.awrap(module416.default.setMapBeautificationStatus(o));

                  case 10:
                    s = u.sent;
                    console.log('_onLiberatingSwitchValueChanged - ' + JSON.stringify(s));
                    u.next = 18;
                    break;

                  case 14:
                    u.prev = 14;
                    u.t0 = u.catch(5);
                    this.setState({
                      liberatingSwitch: !t,
                    });
                    console.log(u.t0);

                  case 18:
                  case 'end':
                    return u.stop();
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
        key: '_onPressPhotoDebug',
        value: function (t) {
          var o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (!module381.RSM.isRunning) {
                      s.next = 3;
                      break;
                    }

                    module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                      globals.showToast(module510.robot_communication_exception);
                    });
                    return s.abrupt('return');

                  case 3:
                    console.log('_onPhotoSwitchValueChanged - ' + t);
                    if (this.loadingView) this.loadingView.showWithText('\u52a0\u8f7d\u4e2d...');
                    this.setState({
                      photoSwitch: t,
                    });
                    module1640.default.mapObjectPhotoEnabled = t;
                    module1640.default.updatePhotoPrivacy(true, function (s) {
                      if (s)
                        module420
                          .SetStorageKey(module420.StorageKeys.PhotoPrivacyVersion, module420.StorageKeys.PhotoPrivacyVersion)
                          .then(function () {
                            return module393.saveDeviceExtraValue('RRPhotoPrivacyVersion', module410.RRPhotoPrivacyVersion.toString());
                          })
                          .then(function () {
                            module393.postPrivacyAgreementStatusWithVersion(module381.RSM.serverCode, 4, 1);
                          })
                          .catch(function (s) {
                            globals.showToast('\u8bbe\u7f6e\u5931\u8d25: ' + s);
                            o.setState({
                              photoSwitch: !t,
                            });
                          })
                          .finally(function () {
                            if (o.loadingView) o.loadingView.hide();
                          });
                      else {
                        globals.showToast('\u8bbe\u7f6e\u5931\u8d25');
                        module1640.default.mapObjectPhotoEnabled = !t;
                        o.setState({
                          photoSwitch: !t,
                        });
                        if (o.loadingView) o.loadingView.hide();
                      }
                    });

                  case 8:
                  case 'end':
                    return s.stop();
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
        key: '_onPressCollisionAvoid',
        value: function (t) {
          var o = this;
          this.setState({
            collisionAvoidSwitch: t,
          });
          if (this.loadingView) this.loadingView.showWithText('\u52a0\u8f7d\u4e2d...');
          module416.default
            .setCollisionAvoidStatus(t ? 1 : 0)
            .then(function (t) {
              if (o.loadingView) o.loadingView.hide();
              console.log('CollisionAvoidInfo.Set.Res : ' + JSON.stringify(t));
              globals.showToast('\u8bbe\u7f6e\u6210\u529f');
            })
            .catch(function (s) {
              if (o.loadingView) o.loadingView.hide();
              globals.showToast('\u8bbe\u7f6e\u5931\u8d25');
              console.log('CollisionAvoidInfo.Set.Error : ' + JSON.stringify(s));
              o.setState({
                collisionAvoidSwitch: !t,
              });
            });
        },
      },
      {
        key: '_onPressObstacleIconDebug',
        value: function (t) {
          var o = this;
          this.setState({
            showSpecificObstacle: t,
          });
          module420
            .SetStorageKey(module420.StorageKeys.ShowSpecificObstacle, t ? 'on' : '')
            .then(function () {
              if (o.props.navigation.state.params.onPressObstacleIconDebug) o.props.navigation.state.params.onPressObstacleIconDebug();
            })
            .catch(function (s) {
              globals.showToast(JSON.stringify(s));
              o.setState({
                showSpecificObstacle: !t,
              });
            });
        },
      },
      {
        key: 'onDebugMode',
        value: function () {
          this.props.navigation.navigate('DebugViewPage', {
            title: '\u8c03\u8bd5\u6a21\u5f0f',
          });
        },
      },
      {
        key: 'onPressVoiceTest',
        value: function () {
          this.setState({
            showVoiceTest: true,
          });
        },
      },
      {
        key: 'getAnonymousID',
        value: function () {
          var t, o, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    u.prev = 0;
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getAnonymousID());

                  case 3:
                    t = u.sent;
                    o = t.result[0].testid;
                    s = t.result[0].vnid;
                    if (undefined != o && o.length > 0)
                      this.setState({
                        shouldShowTestIDListItem: true,
                        testID: o,
                      });
                    else
                      this.setState({
                        shouldShowTestIDListItem: false,
                      });
                    if (undefined != s && s.length > 0)
                      this.setState({
                        shouldShowVnIDListItem: true,
                        vnID: s,
                      });
                    else
                      this.setState({
                        shouldShowVnIDListItem: false,
                      });
                    u.next = 13;
                    break;

                  case 10:
                    u.prev = 10;
                    u.t0 = u.catch(0);
                    console.log('getAnonymousID error : ' + JSON.stringify(u.t0));

                  case 13:
                  case 'end':
                    return u.stop();
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
        key: 'getCollisionAvoidInfo',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getCollisionAvoidStatus());

                  case 3:
                    t = s.sent;
                    o = t.result.status;
                    this.setState({
                      collisionAvoidSwitch: 1 == o,
                    });
                    console.log('CollisionAvoidInfo.Get.Res : ' + JSON.stringify(t) + ', Status: ' + o);
                    s.next = 12;
                    break;

                  case 9:
                    s.prev = 9;
                    s.t0 = s.catch(0);
                    console.log('CollisionAvoidInfo.Get.Error: ' + JSON.stringify(s.t0));

                  case 12:
                    return s.abrupt('return');

                  case 13:
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
        key: 'getGeneralObstableData',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.t0 = this;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.ShowSpecificObstacle));

                  case 3:
                    t.t1 = t.sent;
                    t.t2 = {
                      showSpecificObstacle: t.t1,
                    };
                    t.t0.setState.call(t.t0, t.t2);

                  case 6:
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
        key: 'getShowFurnitureIconInfo',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.ShowFurnitureModel));

                  case 2:
                    t = o.sent;
                    this.setState({
                      showFurnitureModel: !!t,
                    });

                  case 4:
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
        key: 'getAutoIndetifyRoomTag',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.AutoIdentifyRoomTag));

                  case 2:
                    t = s.sent;
                    o = !(!t || 'true' !== t);
                    this.setState({
                      autoIdentifyRoomTag: o,
                    });

                  case 5:
                  case 'end':
                    return s.stop();
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
        key: 'onPressTestID',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.setState({
                      shouldShowAnonymousIDView: true,
                    });
                    setTimeout(function () {
                      var o;
                      if (!(null == (o = t.anonymousIdView))) o.setMenuDetail(0, t.state.testID, '\u65e5\u5fd7\u533f\u540dID');
                    }, 100);

                  case 2:
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
        key: 'onPressVnID',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.setState({
                      shouldShowAnonymousIDView: true,
                    });
                    setTimeout(function () {
                      var o;
                      if (!(null == (o = t.anonymousIdView))) o.setMenuDetail(0, t.state.vnID, '\u56fe\u7247\u533f\u540dID');
                    }, 100);

                  case 2:
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
        key: 'getDebugInfo',
        value: function () {
          var t = this;
          if (module393.isMiApp)
            module393.getDevicePropertyFromMemCache(['ssid', 'localip', 'mac'], function (o) {
              if (o.ssid || o.localip || o.mac) {
                t.firmwareVersion = o.lastVersion || Unknown;
                t.networkInfo = o;
                t.networkInfo.ip = o.localip;
              } else t.fetchNetworkInfo();
            });
        },
      },
      {
        key: 'fetchNetworkInfo',
        value: function () {
          var t,
            o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getNetworkInfo());

                  case 3:
                    t = s.sent;
                    this.networkInfo = t.result;
                    s.next = 10;
                    break;

                  case 7:
                    s.prev = 7;
                    s.t0 = s.catch(0);

                    if (this.FetchNetworkInfoRetry < 10) {
                      this.FetchNetworkInfoRetry++;
                      setTimeout(function () {
                        o.fetchNetworkInfo();
                      }, 1e3);
                    }

                  case 10:
                  case 'end':
                    return s.stop();
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
        key: 'isShowOperatorsInfo',
        value: function () {
          if (!module393.isMiApp) return false;
          return ['353723335', '1407075602', '251766162'].indexOf(module393.userId) > -1;
        },
      },
      {
        key: 'getOperatorsInfo',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.setState({
                      shouldShowDebugOperatorsInfoView: true,
                    });

                  case 1:
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
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            n = this.getMenuDatas().map(function (t, n) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: n,
                        titleColor: 'rgba(0,0,0,0.8)',
                        style: {
                          width: module13.Dimensions.get('window').width,
                        },
                      })
                    )
                  : React.default.createElement(module13.View, {
                      style: [
                        U.section,
                        {
                          backgroundColor: o.settingBackgroundColor,
                        },
                      ],
                      key: n,
                    })
                : React.default.createElement(module13.View, {
                    key: n,
                  });
            }),
            u = {
              title: '\u95ee\u9898\u53cd\u9988^_^',
              shouldShowRightArrow: true,
              onPress: this.onPressFeedbackPage,
              funcId: 'debug_func_into_feedback',
              titleStyle: {
                fontSize: 18,
                color: '#3384FF',
                fontWeight: 'bold',
              },
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            l = React.default.createElement(
              module385.SettingListItemView,
              module22.default({}, u, {
                key: 1111,
                titleColor: 'rgba(0,0,0,0.8)',
                style: {
                  width: module13.Dimensions.get('window').width,
                },
              })
            ),
            h = !(module393.isMiApp && module424.DMM.isV1);
          return React.default.createElement(
            module13.View,
            {
              style: [
                U.containterView,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module13.ScrollView,
              {
                style: [
                  U.containter,
                  {
                    backgroundColor: o.settingBackgroundColor,
                  },
                ],
                showsVerticalScrollIndicator: false,
              },
              h && l,
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    U.hintText,
                    {
                      backgroundColor: o.settingBackgroundColor,
                    },
                  ],
                },
                '\u4ee5\u4e0b\u529f\u80fd\u4e3a\u5185\u90e8\u5f00\u53d1\u6d4b\u8bd5\u529f\u80fd\u3002\u672a\u6536\u5230\u6d4b\u8bd5\u4efb\u52a1\u65f6\uff0c\u8bf7\u52ff\u81ea\u884c\u4f7f\u7528\uff0c\u4f1a\u5f15\u8d77\u673a\u5668\u884c\u4e3a\u5f02\u5e38\u3002'
              ),
              n
            ),
            React.default.createElement(module385.LoadingView, {
              ref: function (o) {
                return (t.loadingView = o);
              },
            }),
            this.state.showVoiceTest &&
              React.default.createElement(module2120.default, {
                parent: this,
              }),
            this.state.shouldShowAnonymousIDView &&
              React.default.createElement(module2121.default, {
                ref: function (o) {
                  return (t.anonymousIdView = o);
                },
                parent: this,
              }),
            this.state.shouldShowDebugOperatorsInfoView &&
              React.default.createElement(module2122.default, {
                parent: this,
              })
          );
        },
      },
    ]);
    return J;
  })(React.Component);

exports.default = J;
J.contextType = module1200.AppConfigContext;
var U = module13.StyleSheet.create({
  containterView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: module1344.NavigationBarHeight,
    paddingBottom: 20,
  },
  section: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 5,
  },
  hintText: {
    flex: 1,
    color: 'red',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});

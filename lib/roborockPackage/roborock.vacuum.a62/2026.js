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
  module390 = require('./390'),
  module1560 = require('./1560'),
  module423 = require('./423'),
  module515 = require('./515'),
  module1121 = require('./1121'),
  module381 = require('./381'),
  module419 = require('./419'),
  module2027 = require('./2027'),
  module2028 = require('./2028'),
  module2029 = require('./2029'),
  module1122 = require('./1122'),
  module394 = require('./394');

function B() {
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

require('./1877');

var module505 = require('./505').strings,
  module1265 = require('./1265'),
  module393 = require('./393'),
  module410 = require('./410'),
  F = ['DEV_TEST', 'INTERNAL_TEST', 'EXTERNAL_TEST'],
  E = (function (t) {
    module7.default(E, t);

    var o = E,
      module1121 = B(),
      O = function () {
        var t,
          s = module11.default(o);

        if (module1121) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, n);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var o;
      module4.default(this, E);

      (o = O.call(this, t)).onPressIncrementalMapDebug = function () {
        o.props.navigation.navigate('IncrementalMapDebugPage', {});
      };

      o._onPressShowFurnitureIcon = function (t) {
        o.setState({
          showFurnitureModel: t,
        });
        module419
          .SetStorageKey(module419.StorageKeys.ShowFurnitureModel, t ? 'on' : '')
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
                  return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.AutoIdentifyRoomTag, t ? 'true' : 'false'));

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

      o.onPressFeedbackPage = function () {
        o.props.navigation.navigate('FeedbackViewPage', {
          title: '\u95ee\u9898\u53cd\u9988',
        });
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
                  module419
                    .SetStorageKey(module419.StorageKeys.SapMapBeautifyFlag, t ? 'on' : 'close')
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
      };
      o.unMount = false;
      o.mapDebugStatus = 0;
      o.animatedWrapMarginBottom = new module12.Animated.Value(-500);
      o.actionData = {};
      return o;
    }

    module5.default(E, [
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
                    return regeneratorRuntime.default.awrap(module415.default.getDockInfo());

                  case 3:
                    t = u.sent;
                    o = t.result[0];
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
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.updateDock());

                  case 3:
                    t = o.sent;
                    console.log('upgradeDock', t);
                    o.next = 10;
                    break;

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(0);
                    console.log('upgradeDock error', o.t0);

                  case 10:
                  case 'end':
                    return o.stop();
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
        key: 'getMenuDatas',
        value: function () {
          var t = module390.default.isDebuggableV1User(),
            o = module390.default.isMapBeautifyDebugUser(),
            s = module393.userScope,
            n = 'DEV_TEST' == s,
            u = 'DEV_TEST' == s || 'INTERNAL_TEST' == s,
            l = F.hasElement(s),
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
              shouldShowBottomLongLine: module423.DMM.isGarnet,
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
              visible: module423.DMM.isSapphirePlus && (u || t),
              shouldShowBottomLongLine: module423.DMM.isSapphirePlus,
            },
            {
              visible: module423.DMM.isSapphirePlus,
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
              shouldShowBottomLine: false,
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
              title: '\u5b9e\u666f\u7167\u7247',
              shouldShowSwitch: true,
              switchOn: this.state.photoSwitch,
              switchValueChanged: this._onPressPhotoDebug.bind(this),
              visible: ((module423.DMM.isTanosSPlus || module423.DMM.isTanosSMax || module423.DMM.isTopazSPlus || module423.DMM.isUltron || module423.DMM.isPearl) && l) || t,
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
              bottomDetail:
                '\u6b64\u529f\u80fd\u4e3a\u5185\u90e8\u529f\u80fd\uff0c\u53ea\u6d4b\u8bd5v1\u673a\u5668\u4e0d\u663e\u793a\u5373\u53ef,\u4ee5\u540e\u63d2\u4ef6\u9047\u5230\u529f\u80fd\u6027bug\u53ef\u4ee5\u6765\u6b64\u5904\u4e0a\u4f20log(\u4e3a\u4e86\u7f51\u7edc\u5b89\u5168\uff0c\u5fc5\u987b\u7528\u516c\u53f8\u5185\u7f51\u4e0a\u4f20),\u4e0a\u4f20\u5b8c\u6210\u4f1a\u81ea\u52a8\u590d\u5236log_id,\u4e5f\u53ef\u4ee5\u624b\u52a8\u70b9\u51fb\u5c0f\u82b1\u56fe\u6807\u590d\u5236\uff0c\u8bf7\u5c06logid\u8d34\u5230bug\u91cc',
              shouldShowRightArrow: true,
              bottomDetailWidth: module12.Dimensions.get('window').width - 50,
              onPress: this._onPressPluginLog.bind(this),
              visible: u || t,
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
                module419.clearAllAsyncStorage();
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
              visible: n && module390.default.isSupportCleanEstimate(),
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
        key: 'submitTestID',
        value: function () {
          var t, o, module22, module4, module5;
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
                    return regeneratorRuntime.default.awrap(module415.default.getSerialNumber());

                  case 6:
                    module4 = h.sent;
                    module5 = module4.result[0].serial_number;
                    h.next = 10;
                    return regeneratorRuntime.default.awrap(module393.collectUserInfo(module22, module5));

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
                              var t, s, module4, module5, module7;
                              return regeneratorRuntime.default.async(
                                function (c) {
                                  for (;;)
                                    switch ((c.prev = c.next)) {
                                      case 0:
                                        c.prev = 0;
                                        t = o.state.vnID;
                                        s = module393.userId;
                                        module4 = JSON.stringify([
                                          {
                                            vnID: t,
                                            userId: s,
                                          },
                                        ]);
                                        c.next = 6;
                                        return regeneratorRuntime.default.awrap(module415.default.getSerialNumber());

                                      case 6:
                                        module5 = c.sent;
                                        module7 = module5.result[0].serial_number;
                                        c.next = 10;
                                        return regeneratorRuntime.default.awrap(module393.collectUserInfo(module4, module7));

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
          globals.app.changeTheme(globals.app.state.theme == module515.Themes.light ? module515.Themes.dark : module515.Themes.light);
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
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.HasDarkMode, t));

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
        key: '_onPressPluginLog',
        value: function () {
          this.props.navigation.navigate('LogListPage', {
            title: '\u65e5\u5fd7',
          });
        },
      },
      {
        key: 'getSwitchData',
        value: function () {
          this.setState({
            mapIndicatorSwitch: this.props.navigation.state.params.mapDebugInfoIndicatorActive,
            darkSwitch: globals.app.state.theme == module515.Themes.dark,
            photoSwitch: module1560.default.mapObjectPhotoEnabled,
          });
        },
      },
      {
        key: 'getMapBeautifyDebugSwitchData',
        value: function () {
          var t, o, s, u, l, h, c;
          return regeneratorRuntime.default.async(
            function (S) {
              for (;;)
                switch ((S.prev = S.next)) {
                  case 0:
                    S.prev = 0;
                    S.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getMapBeautificationStatus());

                  case 3:
                    t = S.sent;
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
                    S.next = 18;
                    break;

                  case 15:
                    S.prev = 15;
                    S.t0 = S.catch(0);
                    console.log(S.t0);

                  case 18:
                  case 'end':
                    return S.stop();
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
                    return regeneratorRuntime.default.awrap(module415.default.setMapBeautificationStatus(o));

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
                    return regeneratorRuntime.default.awrap(module415.default.setMapBeautificationStatus(o));

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
                    return regeneratorRuntime.default.awrap(module415.default.setMapBeautificationStatus(o));

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
                    return regeneratorRuntime.default.awrap(module415.default.setMapBeautificationStatus(o));

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

                    module1122.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                      globals.showToast(module505.robot_communication_exception);
                    });
                    return s.abrupt('return');

                  case 3:
                    console.log('_onPhotoSwitchValueChanged - ' + t);
                    if (this.loadingView) this.loadingView.showWithText('\u52a0\u8f7d\u4e2d...');
                    this.setState({
                      photoSwitch: t,
                    });
                    module1560.default.mapObjectPhotoEnabled = t;
                    module1560.default.updatePhotoPrivacy(true, function (s) {
                      if (s)
                        module419
                          .SetStorageKey(module419.StorageKeys.PhotoPrivacyVersion, module419.StorageKeys.PhotoPrivacyVersion)
                          .then(function () {
                            return module393.saveDeviceExtraValue('RRPhotoPrivacyVersion', module410.RRPhotoPrivacyVersion.toString());
                          })
                          .then(function () {
                            return module1560.default.updateCameraStatus();
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
          module415.default
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
          module419
            .SetStorageKey(module419.StorageKeys.ShowSpecificObstacle, t ? 'on' : '')
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
                    return regeneratorRuntime.default.awrap(module415.default.getAnonymousID());

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
                    return regeneratorRuntime.default.awrap(module415.default.getCollisionAvoidStatus());

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
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.ShowSpecificObstacle));

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
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.ShowFurnitureModel));

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
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.AutoIdentifyRoomTag));

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
                          width: module12.Dimensions.get('window').width,
                        },
                      })
                    )
                  : React.default.createElement(module12.View, {
                      style: [
                        N.section,
                        {
                          backgroundColor: o.settingBackgroundColor,
                        },
                      ],
                      key: n,
                    })
                : React.default.createElement(module12.View, {
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
                  width: module12.Dimensions.get('window').width,
                },
              })
            );
          return React.default.createElement(
            module12.View,
            {
              style: [
                N.containterView,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: [
                  N.containter,
                  {
                    backgroundColor: o.settingBackgroundColor,
                  },
                ],
                showsVerticalScrollIndicator: false,
              },
              !module393.isMiApp && l,
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    N.hintText,
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
              React.default.createElement(module2027.default, {
                parent: this,
              }),
            this.state.shouldShowAnonymousIDView &&
              React.default.createElement(module2028.default, {
                ref: function (o) {
                  return (t.anonymousIdView = o);
                },
                parent: this,
              }),
            this.state.shouldShowDebugOperatorsInfoView &&
              React.default.createElement(module2029.default, {
                parent: this,
              })
          );
        },
      },
    ]);
    return E;
  })(React.Component);

exports.default = E;
E.contextType = module1121.AppConfigContext;
var N = module12.StyleSheet.create({
  containterView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: module1265.NavigationBarHeight,
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

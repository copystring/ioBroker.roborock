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
    var s = O(o);
    if (s && s.has(t)) return s.get(t);
    var n = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var h in t)
      if ('default' !== h && Object.prototype.hasOwnProperty.call(t, h)) {
        var u = l ? Object.getOwnPropertyDescriptor(t, h) : null;
        if (u && (u.get || u.set)) Object.defineProperty(n, h, u);
        else n[h] = t[h];
      }

    n.default = t;
    if (s) s.set(t, n);
    return n;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module407 = require('./407'),
  module386 = require('./386'),
  module1361 = require('./1361'),
  module415 = require('./415'),
  module507 = require('./507'),
  module506 = require('./506'),
  module377 = require('./377'),
  module411 = require('./411'),
  module1989 = require('./1989'),
  module1990 = require('./1990'),
  module1991 = require('./1991'),
  module1259 = require('./1259');

function O(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    s = new WeakMap();
  return (O = function (t) {
    return t ? s : o;
  })(t);
}

function C() {
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

require('./1851');

var module491 = require('./491').strings,
  module934 = require('./934'),
  module389 = require('./389'),
  module403 = require('./403'),
  R = (function (t) {
    module7.default(R, t);

    var module506 = R,
      O = C(),
      x = function () {
        var t,
          o = module11.default(module506);

        if (O) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var o;
      module4.default(this, R);

      (o = x.call(this, t)).onPressFeedbackPage = function () {
        o.props.navigation.navigate('FeedbackViewPage', {
          title: '\u95ee\u9898\u53cd\u9988',
        });
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
      };
      o.unMount = false;
      o.mapDebugStatus = 0;
      o.animatedWrapMarginBottom = new module12.Animated.Value(-500);
      o.actionData = {};
      return o;
    }

    module5.default(R, [
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
        key: 'getMenuDatas',
        value: function () {
          var t = module386.default.isMapBeautifyInternalDebugSupported() && (module415.DMM.isV2 || module415.DMM.isV5);
          return [
            {
              visible: true,
            },
            {
              title: '\u95ee\u9898\u53cd\u9988^_^',
              shouldShowRightArrow: true,
              onPress: this.onPressFeedbackPage,
              visible: !module389.isV1Model(),
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
            {
              visible: true,
            },
            {
              title: '\u5206\u533a\u5730\u56fe\u8c03\u8bd5',
              shouldShowSwitch: true,
              switchOn: this.state.partitionMapSwitch,
              switchValueChanged: this._onPartitionMapValueChanged.bind(this),
              visible: t,
              shouldShowBottomLongLine: true,
            },
            {
              title: '\u5730\u6bef\u8c03\u8bd5',
              shouldShowSwitch: true,
              switchOn: this.state.carpetSwitch,
              switchValueChanged: this._onCarpetSwitchValueChanged.bind(this),
              visible: t,
              shouldShowBottomLongLine: true,
            },
            {
              title: '\u62d6\u5730\u8def\u5f84\u8c03\u8bd5',
              shouldShowSwitch: true,
              switchOn: this.state.mopFloorSwitch,
              switchValueChanged: this._onMopFloorSwitchValueChanged.bind(this),
              visible: t,
              shouldShowBottomLongLine: true,
            },
            {
              title: '\u8131\u56f0\u8def\u5f84\u8c03\u8bd5',
              shouldShowSwitch: true,
              switchOn: this.state.liberatingSwitch,
              switchValueChanged: this._onLiberatingSwitchValueChanged.bind(this),
              visible: t,
              shouldShowBottomLongLine: module415.DMM.isGarnet,
            },
            {
              visible: t,
            },
            {
              title: '\u969c\u788d\u7269\u5750\u6807\u70b9',
              shouldShowSwitch: true,
              switchOn: this.state.mapIndicatorSwitch,
              switchValueChanged: this._onPressMapInfoIndicator.bind(this),
              visible:
                (module386.default.isCameraSupported() && !module415.DMM.isV1) ||
                ((module415.DMM.isV5 || module415.DMM.isV2 || module415.DMM.isV4) && (module415.DMM.isTanosV || module415.DMM.isTanosSPlus)),
              shouldShowBottomLine: false,
            },
            {
              visible:
                (module386.default.isCameraSupported() && !module415.DMM.isV1) ||
                ((module415.DMM.isV5 || module415.DMM.isV2 || module415.DMM.isV4) && (module415.DMM.isTanosV || module415.DMM.isTanosSPlus)),
            },
            {
              title: '\u5b9e\u666f\u7167\u7247(TanosS+ debug)',
              shouldShowSwitch: true,
              switchOn: this.state.photoSwitch,
              switchValueChanged: this._onPressPhotoDebug.bind(this),
              visible: module415.DMM.isTanosSPlus && (module415.DMM.isV5 || module415.DMM.isV2 || module415.DMM.isV4),
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
              visible: module415.DMM.isTanosSPlus && (module415.DMM.isV5 || module415.DMM.isV2 || module415.DMM.isV4),
            },
            {
              visible: module415.DMM.isTanosSPlus && (module415.DMM.isV5 || module415.DMM.isV2 || module415.DMM.isV4),
            },
            {
              title: '\u6df1\u8272\u6a21\u5f0f',
              shouldShowSwitch: true,
              switchOn: this.state.darkSwitch,
              switchValueChanged: this._onPressDarkMode.bind(this),
              visible: ((module415.DMM.isV5 || module415.DMM.isV2) && !module415.Products.isTanosV) || false,
              shouldShowBottomLine: false,
            },
            {
              visible: ((module415.DMM.isV5 || module415.DMM.isV2) && !module415.Products.isTanosV) || false,
            },
            {
              title: '\u63d2\u4ef6log',
              bottomDetail:
                '\u6b64\u529f\u80fd\u4e3a\u5185\u90e8\u529f\u80fd\uff0c\u53ea\u6d4b\u8bd5v1\u673a\u5668\u4e0d\u663e\u793a\u5373\u53ef,\u4ee5\u540e\u63d2\u4ef6\u9047\u5230\u529f\u80fd\u6027bug\u53ef\u4ee5\u6765\u6b64\u5904\u4e0a\u4f20log(\u4e3a\u4e86\u7f51\u7edc\u5b89\u5168\uff0c\u5fc5\u987b\u7528\u516c\u53f8\u5185\u7f51\u4e0a\u4f20),\u4e0a\u4f20\u5b8c\u6210\u4f1a\u81ea\u52a8\u590d\u5236log_id,\u4e5f\u53ef\u4ee5\u624b\u52a8\u70b9\u51fb\u5c0f\u82b1\u56fe\u6807\u590d\u5236\uff0c\u8bf7\u5c06logid\u8d34\u5230bug\u91cc',
              shouldShowRightArrow: true,
              bottomDetailWidth: module12.Dimensions.get('window').width - 50,
              onPress: this._onPressPluginLog.bind(this),
              visible: true,
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
              visible: module386.default.isDebuggableV1User() && module389.isMiApp,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            {
              visible: module386.default.isOtaMiIOTAllowed() && module389.isMiApp,
            },
            {
              title: 'OTA\u5f3a\u5236\u5347\u7ea7',
              shouldShowRightArrow: true,
              onPress: this.onOtaMiIot.bind(this),
              visible: module386.default.isOtaMiIOTAllowed() && module389.isMiApp,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            {
              visible: module386.default.isOtaMiIOTAllowed() && module389.isMiApp,
            },
            {
              title: '\u97f3\u91cf\u8bbe\u7f6e',
              shouldShowRightArrow: true,
              onPress: this.onPressVoiceTest.bind(this),
              visible: true,
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
              visible: this.state.shouldShowTestIDListItem,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: this.state.shouldShowTestIDListItem && this.state.shouldShowVnIDListItem,
            },
            {
              title: '\u56fe\u7247\u533f\u540dID',
              shouldShowRightArrow: true,
              onPress: this.onPressVnID.bind(this),
              visible: this.state.shouldShowVnIDListItem,
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
            {
              visible: this.state.shouldShowTestIDListItem || this.state.shouldShowVnIDListItem,
            },
            {
              title: '\u6e05\u7a7a\u63d2\u4ef6\u672c\u5730\u5b58\u50a8',
              shouldShowRightArrow: true,
              onPress: function () {
                module411.clearAllAsyncStorage();
                module377.RSM.resetForAutoTest();
              },
              visible: module389.isAutoTestSupported(),
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
              visible: this.isShowOperatorsInfo(),
              shouldShowTopLine: false,
              shouldShowBottomLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
            },
          ];
        },
      },
      {
        key: '_onPressDarkMode',
        value: function (t) {
          this.setThemeMode(t.toString());
          this.setState({
            darkSwitch: t,
          });
          globals.app.changeTheme(globals.app.state.theme == module507.Themes.light ? module507.Themes.dark : module507.Themes.light);
        },
      },
      {
        key: 'setThemeMode',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.HasDarkMode, t));

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
            darkSwitch: globals.app.state.theme == module507.Themes.dark,
            photoSwitch: module1361.default.mapObjectPhotoEnabled,
          });
        },
      },
      {
        key: 'getMapBeautifyDebugSwitchData',
        value: function () {
          var t, s, n, l, h, u, c;
          return regeneratorRuntime.default.async(
            function (w) {
              for (;;)
                switch ((w.prev = w.next)) {
                  case 0:
                    w.prev = 0;
                    w.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getMapBeautificationStatus());

                  case 3:
                    t = w.sent;
                    console.log('getMapBeautificationStatus - ' + JSON.stringify(t));
                    s = t.result.status;
                    this.mapDebugStatus = s;
                    n = n = !!(1 & s);
                    l = l = !!(2 & s);
                    h = h = !!(4 & s);
                    u = u = !!(8 & s);
                    c = c = !!(16 & s);
                    if (!this.unMount)
                      this.setState({
                        partitionMapSwitch: n,
                        carpetSwitch: l,
                        mopFloorSwitch: h,
                        liberatingSwitch: u,
                        washPathSwitch: c,
                      });
                    w.next = 18;
                    break;

                  case 15:
                    w.prev = 15;
                    w.t0 = w.catch(0);
                    console.log(w.t0);

                  case 18:
                  case 'end':
                    return w.stop();
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
          var module21, n;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if ((module21 = this.mapDebugStatus)) {
                      l.next = 3;
                      break;
                    }

                    return l.abrupt('return');

                  case 3:
                    console.log('_onPartitionMapValueChanged - ' + t);
                    this.setState({
                      partitionMapSwitch: t,
                    });
                    l.prev = 5;
                    module21 = t ? 1 | module21 : 1 ^ module21;
                    this.mapDebugStatus = module21;
                    l.next = 10;
                    return regeneratorRuntime.default.awrap(module407.default.setMapBeautificationStatus(module21));

                  case 10:
                    n = l.sent;
                    console.log('_onDustCollectionValueChanged - ' + JSON.stringify(n));
                    l.next = 18;
                    break;

                  case 14:
                    l.prev = 14;
                    l.t0 = l.catch(5);
                    this.setState({
                      partitionMapSwitch: !t,
                    });
                    console.log(l.t0);

                  case 18:
                  case 'end':
                    return l.stop();
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
          var module21, n;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if ((module21 = this.mapDebugStatus)) {
                      l.next = 3;
                      break;
                    }

                    return l.abrupt('return');

                  case 3:
                    console.log('_onCarpetSwitchValueChanged - ' + t);
                    this.setState({
                      carpetSwitch: t,
                    });
                    l.prev = 5;
                    module21 = t ? 2 | module21 : 2 ^ module21;
                    this.mapDebugStatus = module21;
                    l.next = 10;
                    return regeneratorRuntime.default.awrap(module407.default.setMapBeautificationStatus(module21));

                  case 10:
                    n = l.sent;
                    console.log('_onCarpetSwitchValueChanged - ' + JSON.stringify(n));
                    l.next = 18;
                    break;

                  case 14:
                    l.prev = 14;
                    l.t0 = l.catch(5);
                    this.setState({
                      carpetSwitch: !t,
                    });
                    console.log(l.t0);

                  case 18:
                  case 'end':
                    return l.stop();
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
          var module21, n;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if ((module21 = this.mapDebugStatus)) {
                      l.next = 3;
                      break;
                    }

                    return l.abrupt('return');

                  case 3:
                    console.log('_onMopFloorSwitchValueChanged - ' + t);
                    this.setState({
                      mopFloorSwitch: t,
                    });
                    l.prev = 5;
                    module21 = t ? 4 | module21 : 4 ^ module21;
                    this.mapDebugStatus = module21;
                    l.next = 10;
                    return regeneratorRuntime.default.awrap(module407.default.setMapBeautificationStatus(module21));

                  case 10:
                    n = l.sent;
                    console.log('_onMopFloorSwitchValueChanged - ' + JSON.stringify(n));
                    l.next = 18;
                    break;

                  case 14:
                    l.prev = 14;
                    l.t0 = l.catch(5);
                    this.setState({
                      mopFloorSwitch: !t,
                    });
                    console.log(l.t0);

                  case 18:
                  case 'end':
                    return l.stop();
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
          var module21, n;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if ((module21 = this.mapDebugStatus)) {
                      l.next = 3;
                      break;
                    }

                    return l.abrupt('return');

                  case 3:
                    console.log('_onLiberatingSwitchValueChanged - ' + t);
                    this.setState({
                      liberatingSwitch: t,
                    });
                    l.prev = 5;
                    module21 = t ? 8 | module21 : 8 ^ module21;
                    this.mapDebugStatus = module21;
                    l.next = 10;
                    return regeneratorRuntime.default.awrap(module407.default.setMapBeautificationStatus(module21));

                  case 10:
                    n = l.sent;
                    console.log('_onLiberatingSwitchValueChanged - ' + JSON.stringify(n));
                    l.next = 18;
                    break;

                  case 14:
                    l.prev = 14;
                    l.t0 = l.catch(5);
                    this.setState({
                      liberatingSwitch: !t,
                    });
                    console.log(l.t0);

                  case 18:
                  case 'end':
                    return l.stop();
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
          var s = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (!module377.RSM.isRunning) {
                      o.next = 3;
                      break;
                    }

                    module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                      globals.showToast(module491.robot_communication_exception);
                    });
                    return o.abrupt('return');

                  case 3:
                    console.log('_onPhotoSwitchValueChanged - ' + t);
                    if (this.loadingView) this.loadingView.showWithText('\u52a0\u8f7d\u4e2d...');
                    this.setState({
                      photoSwitch: t,
                    });
                    module1361.default.mapObjectPhotoEnabled = t;
                    module1361.default.updatePhotoPrivacy(true, function (o) {
                      if (o)
                        module411
                          .SetStorageKey(module411.StorageKeys.PhotoPrivacyVersion, module411.StorageKeys.PhotoPrivacyVersion)
                          .then(function () {
                            return module389.saveDeviceExtraValue('RRPhotoPrivacyVersion', module403.RRPhotoPrivacyVersion.toString());
                          })
                          .then(function () {
                            return module1361.default.updateCameraStatus();
                          })
                          .then(function () {
                            module389.postPrivacyAgreementStatusWithVersion(module377.RSM.serverCode, 4, 1);
                          })
                          .catch(function (o) {
                            globals.showToast('\u8bbe\u7f6e\u5931\u8d25: ' + o);
                            s.setState({
                              photoSwitch: !t,
                            });
                          })
                          .finally(function () {
                            if (s.loadingView) s.loadingView.hide();
                          });
                    });

                  case 8:
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
        key: '_onPressCollisionAvoid',
        value: function (t) {
          var o = this;
          this.setState({
            collisionAvoidSwitch: t,
          });
          if (this.loadingView) this.loadingView.showWithText('\u52a0\u8f7d\u4e2d...');
          module407.default
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
          module411
            .SetStorageKey(module411.StorageKeys.ShowSpecificObstacle, t ? 'on' : '')
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
        key: 'onOtaMiIot',
        value: function () {
          this.props.navigation.navigate('OtaDebugViewPage', {
            title: 'OTA\u5f3a\u5236\u5347\u7ea7',
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
          var t, s, n;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getAnonymousID());

                  case 3:
                    t = l.sent;
                    s = t.result[0].testid;
                    n = t.result[0].vnid;
                    if (undefined != s && s.length > 0)
                      this.setState({
                        shouldShowTestIDListItem: true,
                        testID: s,
                      });
                    else
                      this.setState({
                        shouldShowTestIDListItem: false,
                      });
                    if (undefined != n && n.length > 0)
                      this.setState({
                        shouldShowVnIDListItem: true,
                        vnID: n,
                      });
                    else
                      this.setState({
                        shouldShowVnIDListItem: false,
                      });
                    l.next = 13;
                    break;

                  case 10:
                    l.prev = 10;
                    l.t0 = l.catch(0);
                    console.log('getAnonymousID error : ' + JSON.stringify(l.t0));

                  case 13:
                  case 'end':
                    return l.stop();
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
          var t, s;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getCollisionAvoidStatus());

                  case 3:
                    t = n.sent;
                    s = t.result.status;
                    this.setState({
                      collisionAvoidSwitch: 1 == s,
                    });
                    console.log('CollisionAvoidInfo.Get.Res : ' + JSON.stringify(t) + ', Status: ' + s);
                    n.next = 12;
                    break;

                  case 9:
                    n.prev = 9;
                    n.t0 = n.catch(0);
                    console.log('CollisionAvoidInfo.Get.Error: ' + JSON.stringify(n.t0));

                  case 12:
                    return n.abrupt('return');

                  case 13:
                  case 'end':
                    return n.stop();
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
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.ShowSpecificObstacle));

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
                      if (t.anonymousIdView) t.anonymousIdView.setMenuDetail(0, t.state.testID, '\u65e5\u5fd7\u533f\u540dID');
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
                      if (t.anonymousIdView) t.anonymousIdView.setMenuDetail(0, t.state.vnID, '\u56fe\u7247\u533f\u540dID');
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
          if (!module389.isMiApp) return false;
          return ['353723335', '1407075602', '251766162'].indexOf(module389.userId) > -1;
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
                      module381.SettingListItemView,
                      module21.default({}, t, {
                        key: n,
                        titleColor: 'rgba(0,0,0,0.8)',
                        style: {
                          width: module12.Dimensions.get('window').width,
                        },
                      })
                    )
                  : React.default.createElement(module12.View, {
                      style: [
                        F.section,
                        {
                          backgroundColor: o.settingBackgroundColor,
                        },
                      ],
                      key: n,
                    })
                : React.default.createElement(module12.View, {
                    key: n,
                  });
            });
          return React.default.createElement(
            module12.View,
            {
              style: [
                F.containterView,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: [
                  F.containter,
                  {
                    backgroundColor: o.settingBackgroundColor,
                  },
                ],
                showsVerticalScrollIndicator: false,
              },
              n,
              React.default.createElement(module381.AlertView, {
                ref: function (o) {
                  return (t.alert = o);
                },
              })
            ),
            React.default.createElement(module381.LoadingView, {
              ref: function (o) {
                return (t.loadingView = o);
              },
            }),
            this.state.showVoiceTest &&
              React.default.createElement(module1989.default, {
                parent: this,
              }),
            this.state.shouldShowAnonymousIDView &&
              React.default.createElement(module1990.default, {
                ref: function (o) {
                  return (t.anonymousIdView = o);
                },
                parent: this,
              }),
            this.state.shouldShowDebugOperatorsInfoView &&
              React.default.createElement(module1991.default, {
                parent: this,
              })
          );
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = R;
R.contextType = module506.AppConfigContext;
var F = module12.StyleSheet.create({
  containterView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: module934.NavigationBarHeight,
    paddingBottom: 20,
  },
  section: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 5,
  },
  modal: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});

require('./387');

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1363 = require('./1363'),
  module12 = require('./12'),
  module377 = require('./377'),
  module506 = require('./506'),
  module381 = require('./381'),
  module390 = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = M(o);
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
  })(require('./390')),
  module407 = require('./407'),
  module386 = require('./386'),
  module415 = require('./415'),
  module1378 = require('./1378'),
  module1807 = require('./1807'),
  module411 = require('./411'),
  module1261 = require('./1261');

function M(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (M = function (t) {
    return t ? n : o;
  })(t);
}

function L() {
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

require('./1867');

var module389 = require('./389'),
  module491 = require('./491').strings,
  module403 = require('./403'),
  D = (function (t) {
    module7.default(R, t);

    var module506 = R,
      M = L(),
      D = function () {
        var t,
          o = module11.default(module506);

        if (M) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var o;
      module4.default(this, R);
      (o = D.call(this, t)).state = {
        structureLightSwitch: module1363.default.cameraEnabled,
        avoidCollisionSwitch: false,
        loading: false,
        refreshing: false,
        mapObjectPhotoEnabled: module1363.default.mapObjectPhotoEnabled,
        sceneSwitch: false,
      };
      o.animatedWrapMarginBottom = new module12.Animated.Value(-500);
      o.mounted = false;

      o.changeListener = function () {
        if (o.mounted) o.forceUpdate();
      };

      return o;
    }

    module5.default(R, [
      {
        key: 'theme',
        get: function () {
          return this.context.theme;
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.mounted = true;
          this.getStructureLightInfo();
          module1363.default.addChangeListener(this.changeListener);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.mounted = false;
          module1363.default.removeChangeListener(this.changeListener);
        },
      },
      {
        key: 'onToggleStructureLight',
        value: function (t) {
          var n = this;
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
                      n.showToast(module491.robot_communication_exception);
                    });
                    return s.abrupt('return');

                  case 3:
                    module1363.default.cameraEnabled = t;
                    if (!t) module1363.default.explorationEnabled = t;
                    this.setState({
                      structureLightSwitch: t,
                    });
                    s.next = 8;
                    return regeneratorRuntime.default.awrap(module1363.default.updateCameraStatus());

                  case 8:
                    if (s.sent) {
                      if (!t)
                        this.setState({
                          avoidCollisionSwitch: false,
                        });
                    } else {
                      module1363.default.cameraEnabled = !t;
                      this.setState({
                        structureLightSwitch: !t,
                      });
                      this.showToast(module491.robot_communication_exception);
                    }

                  case 10:
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
        key: 'onToggleAvoidCollision',
        value: function (t) {
          var o = this;
          if (module377.RSM.isRunning)
            module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              o.showToast(module491.robot_communication_exception);
            });
          else {
            this.setState({
              avoidCollisionSwitch: t,
            });
            module407.default
              .setCollisionAvoidStatus(t ? 1 : 0)
              .then(function (t) {
                console.log('CollisionAvoidInfo.Set.Res : ' + JSON.stringify(t));
              })
              .catch(function (n) {
                console.log('CollisionAvoidInfo.Set.Error : ' + JSON.stringify(n));
                o.setState({
                  avoidCollisionSwitch: !t,
                });
                o.showToast(module491.robot_communication_exception);
              });
          }
        },
      },
      {
        key: 'getSceneSwitchState',
        value: function () {
          var t,
            n,
            s = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getFloorIdentifyStatus());

                  case 3:
                    t = l.sent;
                    l.next = 6;
                    return regeneratorRuntime.default.awrap(module407.default.getFurnitureIdentifyStatus());

                  case 6:
                    n = l.sent;
                    this.setState(
                      {
                        sceneSwitch: 1 == t.result.status || 1 == n.result.status,
                      },
                      function () {
                        s.endLoading();
                      }
                    );
                    l.next = 13;
                    break;

                  case 10:
                    l.prev = 10;
                    l.t0 = l.catch(0);
                    console.log('getSceneSwitchState', l.t0);

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
        key: 'onSceneSwitch',
        value: function (t) {
          var o = this;
          if (module377.RSM.isRunning)
            module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              o.showToast(module491.robot_communication_exception);
            });
          else {
            this.setState({
              sceneSwitch: t,
            });
            module407.default
              .setFloorIdentifyStatus({
                status: t ? 1 : 0,
              })
              .then(function (n) {
                console.log('CollisionAvoidInfo.Set.Res : ' + JSON.stringify(n));
                module407.default
                  .setFurnitureIdentifyStatus({
                    status: t ? 1 : 0,
                  })
                  .then(function (t) {
                    console.log('CollisionAvoidInfo.Set.Res : ' + JSON.stringify(t));
                  })
                  .catch(function (n) {
                    console.log('CollisionAvoidInfo.Set.Error : ' + JSON.stringify(n));
                    o.setState({
                      sceneSwitch: !t,
                    });
                    o.showToast(module491.robot_communication_exception);
                  });
              })
              .catch(function (n) {
                console.log('CollisionAvoidInfo.Set.Error : ' + JSON.stringify(n));
                o.setState({
                  sceneSwitch: !t,
                });
                o.showToast(module491.robot_communication_exception);
              });
          }
        },
      },
      {
        key: 'petModeDidChange',
        value: function (t) {
          var module21;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    this.hidePetDialog();
                    module21 = 0 == t;
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(module1363.default.updatePetModeEnabled(module21));

                  case 4:
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
        key: 'showPetDialog',
        value: function () {
          if (this.actionSheet) this.actionSheet.show();
        },
      },
      {
        key: 'hidePetDialog',
        value: function () {
          if (this.actionSheet) this.actionSheet.hide();
        },
      },
      {
        key: 'getThreeDimensionTitle',
        value: function () {
          return module415.DMM.isTanosV
            ? module491.camera_setting_rrai_title
            : module415.DMM.isTanosSPlus || module415.DMM.isTopazSPlus
            ? module491.localization_strings_Setting_index_24
            : module491.camera_setting_detail2;
        },
      },
      {
        key: 'getThreeDimensionTip',
        value: function () {
          return module415.DMM.isTanosV
            ? module491.camera_setting_rrai_detail
            : module415.DMM.isTanosSPlus || module415.DMM.isTopazSPlus
            ? module491.structure_light_tip_1
            : module491.camera_setting_detail3;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            s = React.default.createElement(
              module12.View,
              {
                style: {
                  flex: 1,
                  backgroundColor: this.theme.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              React.default.createElement(module381.Spinner, null)
            );
          if (this.state.loading) return s;
          var l = module12.Dimensions.get('window').width,
            c = {
              title: this.getThreeDimensionTitle(),
              bottomDetail: this.getThreeDimensionTip(),
              bottomDetailWidth: l - 40,
              shouldShowSwitch: true,
              switchOn: this.state.structureLightSwitch,
              switchValueChanged: function (o) {
                return t.onToggleStructureLight.apply(t, [o]);
              },
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: false,
            },
            u = {
              title: module491.avoid_collision_mode,
              bottomDetail: '' + module491.structure_light_tip_3,
              bottomDetailWidth: l - 40,
              shouldShowSwitch: true,
              switchOn: this.state.avoidCollisionSwitch,
              switchValueChanged: function (o) {
                return t.onToggleAvoidCollision.apply(t, [o]);
              },
              visible: this.state.structureLightSwitch,
              shouldShowTopLongLine: false,
            },
            h = {
              title: module491.camera_setting_pet_mode_title,
              visible: this.state.structureLightSwitch,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
              isDetailCenter: false,
              rightCenter: true,
              detailColor: module1363.default.cameraEnabled ? '#007AFF' : 'rgba(0,0,0,0.4)',
              detail: module1363.default.petModeEnabled ? module491.has_or_no_has : module491.has_or_no_no,
              bottomDetail: module491.if_has_pet_tip_detail,
              funcId: 'camera_setting_pet_mode',
              onPress: function () {
                if (module377.RSM.isRunning)
                  module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                    globals.showToast(module491.robot_communication_exception);
                  });
                else t.showPetDialog();
              },
            },
            S = {
              title: module491.obstacle_pop_type_photo,
              visible: module415.DMM.isTanosSV || module415.DMM.isTopazSV || module415.DMM.isTanosV,
              shouldShowSwitch: true,
              switchOn: this.state.mapObjectPhotoEnabled,
              switchValueChanged: this.photoFeatureValueChanged.bind(this),
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
              shouldShowBottomLine: true,
              shouldShowRightArrow: false,
              shouldShowTitleLine: false,
              bottomDetail: module491.map_object_enable_intro,
            },
            M = {
              title: module491.camera_setting_detail4,
              bottomDetail: '' + module491.camera_setting_detail5,
              bottomDetailWidth: l - 40,
              shouldShowSwitch: true,
              switchOn: this.state.sceneSwitch,
              switchValueChanged: this.onSceneSwitch.bind(this),
              visible: module415.DMM.isTopazSV || module415.DMM.isTanosSV,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: false,
            },
            L = {
              title: module491.map_object_privacy_title,
              shouldShowRightArrow: true,
              visible: module415.DMM.isTanosSV || module415.DMM.isTopazSV || module415.DMM.isTanosV,
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
              style: {
                paddingVertical: 15,
              },
              funcId: 'camera_setting_map_object_privacy',
              onPress: function () {
                return t.props.navigation.navigate('WebViewPage', {
                  title: module491.map_object_privacy_title,
                  refrence: module1378.default.PhotoPrivacy(),
                  buttonTitle: module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? module491.reset_authoration : module491.button_title_agree,
                  buttonColor: module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? 'red' : '#007AFF',
                  buttonBackgroundColor: t.context.theme.netWorkError.backgroundColor,
                  refreshCurrent: function () {
                    setTimeout(function () {
                      t.setState({
                        mapObjectPhotoEnabled: module1363.default.mapObjectPhotoEnabled,
                      });
                    }, 2e3);
                  },
                  buttonAction: function (n) {
                    if (module377.RSM.isRunning)
                      n.alertView &&
                        n.alertView.customAlert(
                          '',
                          module491.map_object_cancel_privacy_stop_robot_alert,
                          function () {
                            return regeneratorRuntime.default.async(
                              function (t) {
                                for (;;)
                                  switch ((t.prev = t.next)) {
                                    case 0:
                                      n.loadingView.showWithText();
                                      t.next = 3;
                                      return regeneratorRuntime.default.awrap(module407.default.stop());

                                    case 3:
                                      if (!t.sent) {
                                        t.next = 7;
                                        break;
                                      }

                                      if (n && n.loadingView) n.loadingView.hide();
                                      t.next = 9;
                                      break;

                                    case 7:
                                      if (n && n.loadingView) n.loadingView.hide();
                                      globals.showToast(module491.localization_strings_Setting_History_index_1);

                                    case 9:
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
                          null,
                          {
                            confirmColor: '#007AFF',
                            confirmTitle: module491.map_object_cancel_privacy_stop,
                          }
                        );
                    else {
                      var s = function () {
                        setTimeout(function () {
                          if (n && n.loadingView) n.loadingView.showWithText(module491.map_object_cancel_privacy_loading);
                        }, 100);
                        if (t.timerForUnlock) TimerMixin.clearTimeout(t.timerForUnlock);
                        module377.RSM.hardLockCameraStatus();
                        module389
                          .postPrivacyAgreementStatusWithVersion(
                            module377.RobotStatusManager.sharedManager().serverCode,
                            module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? 5 : 4,
                            1
                          )
                          .then(function (t) {})
                          .catch(function (t) {});
                        module1363.default.updatePhotoPrivacy(!module1363.default.mapObjectPhotoPrivacyPolicyAgreed, function (o) {
                          if (
                            ((t.timerForUnlock = TimerMixin.setTimeout(function () {
                              module377.RSM.unHardLockCameraStatus();
                            }, 500)),
                            setTimeout(function () {
                              if (n && n.loadingView) n.loadingView.hide();
                            }, 100),
                            o)
                          ) {
                            if ('' != (s = module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? '' : module491.map_object_cancel_privacy_success)) globals.showToast(s);
                            n.props.navigation.setParams({
                              buttonTitle: module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? module491.reset_authoration : module491.button_title_agree,
                              buttonColor: module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? 'red' : '#007AFF',
                            });
                            module390.MC.mapObjectPhotos = {};
                            module390.MC.mapObjectLargePhotos = {};
                            LogEventCommon(module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? 'accept_photo_privacy' : 'reset_photo_privacy_confirm');
                          } else {
                            var s = module1363.default.mapObjectPhotoPrivacyPolicyAgreed ? module491.map_object_cancel_privacy_timeout : module491.map_object_ignore_failed;
                            if (n) globals.showToast(s);
                          }
                        });
                      };

                      if (module1363.default.mapObjectPhotoPrivacyPolicyAgreed) {
                        if (n.alertView)
                          n.alertView.customAlert(
                            module491.reset_monitor_privacy_dialog_title,
                            module491.map_object_privacy_reset_dialog_content,
                            function () {
                              s();
                            },
                            null,
                            {
                              titleColor: t.context.theme.navTitleColor,
                              confirmColor: '#007AFF',
                            }
                          );
                      } else s();
                    }
                  },
                });
              },
            },
            E = React.default.createElement(module381.ActionSheetView, {
              ref: function (o) {
                return (t.actionSheet = o);
              },
              title: module491.if_has_pet_tip_title,
              actions: [module491.has_or_no_has, module491.has_or_no_no],
              didSelectRow: this.petModeDidChange.bind(this),
              onPressCancel: function () {
                return t.actionSheet.hide();
              },
            }),
            D = React.default.createElement(
              module12.View,
              {
                style: {
                  width: l,
                },
              },
              React.default.createElement(
                module381.SettingListItemView,
                module21.default({}, c, {
                  key: 0,
                  style: {
                    width: l,
                  },
                })
              )
            ),
            R = u.visible
              ? React.default.createElement(
                  module12.View,
                  {
                    style: {
                      width: l,
                    },
                  },
                  React.default.createElement(
                    module381.SettingListItemView,
                    module21.default({}, u, {
                      key: 2,
                      style: {
                        width: l,
                      },
                    })
                  )
                )
              : React.default.createElement(module12.View, null),
            I = h.visible
              ? React.default.createElement(
                  module12.View,
                  {
                    style: {
                      width: l,
                    },
                  },
                  React.default.createElement(
                    module381.SettingListItemView,
                    module21.default({}, h, {
                      key: 1,
                      style: {
                        width: l,
                      },
                    })
                  )
                )
              : React.default.createElement(module12.View, null),
            F = S.visible
              ? React.default.createElement(
                  module12.View,
                  {
                    style: {
                      width: l,
                    },
                  },
                  React.default.createElement(
                    module381.SettingListItemView,
                    module21.default({}, S, {
                      key: 1,
                      style: {
                        width: l,
                      },
                    })
                  )
                )
              : React.default.createElement(module12.View, null),
            B = L.visible
              ? React.default.createElement(
                  module12.View,
                  {
                    style: {
                      width: l,
                    },
                  },
                  React.default.createElement(
                    module381.SettingListItemView,
                    module21.default({}, L, {
                      key: 3,
                      style: {
                        width: l,
                      },
                    })
                  )
                )
              : React.default.createElement(module12.View, null),
            W = M.visible
              ? React.default.createElement(
                  module12.View,
                  {
                    style: {
                      width: l,
                    },
                  },
                  React.default.createElement(
                    module381.SettingListItemView,
                    module21.default({}, M, {
                      key: 4,
                      style: {
                        width: l,
                      },
                    })
                  )
                )
              : React.default.createElement(module12.View, null),
            N = React.default.createElement(module12.View, {
              style: j.section,
            }),
            z = React.default.createElement(module1807.PhotoFeaturePrivacyDialog, {
              ref: function (o) {
                return (t.photoPrivacyDialog = o);
              },
              confirmTextColor: '#007AFF',
              confirmTitle: module491.button_title_agree,
              onConfirm: function () {
                return module1363.default.updatePhotoPrivacy(true, function (o) {
                  if (!o) globals.showToast(module491.robot_communication_exception);
                  if (o) module411.SetStorageKey(module411.StorageKeys.PhotoPrivacyVersion, module411.StorageKeys.PhotoPrivacyVersion);
                  if (o) t.savePhotoPrivacyVersionAgreedVersionOnServer();
                  if (o) t.photoFeatureValueChanged(true);
                  module389
                    .postPrivacyAgreementStatusWithVersion(module377.RobotStatusManager.sharedManager().serverCode, 4, 1)
                    .then(function (t) {})
                    .catch(function (t) {});
                });
              },
              onPressLink: function () {
                return t.props.navigation.navigate('WebViewPage', {
                  title: module491.map_object_privacy_title,
                  refrence: module1378.default.PhotoPrivacy(),
                });
              },
              onShowListener: function () {
                t.props.navigation.setParams({
                  navBarBackgroundColor: t.theme.modalBackgroundColor,
                  onPressLeft: function () {},
                });
              },
              onHideListener: function () {
                t.props.navigation.setParams({
                  navBarBackgroundColor: t.theme.navBackgroundColor,
                  onPressLeft: function () {
                    return navigation.pop();
                  },
                });
              },
            });
          return React.default.createElement(
            module12.View,
            {
              style: {
                backgroundColor: this.theme.settingBackgroundColor,
                flex: 1,
              },
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: {
                  flex: 1,
                  paddingTop: 10,
                },
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module12.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    return t.refresh();
                  },
                }),
              },
              D,
              N,
              module386.default.isAvoidCollisionSupported() && R,
              I,
              E,
              F,
              W,
              N,
              B
            ),
            z
          );
        },
      },
      {
        key: 'savePhotoPrivacyVersionAgreedVersionOnServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module389.saveDeviceExtraValue('RRPhotoPrivacyVersion', module403.RRPhotoPrivacyVersion.toString()));

                  case 3:
                    t = n.sent;
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                    n.next = 10;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(0);
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 10:
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
        key: 'getPhotoPrivacyVersionAgreedVersionOnServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module389.getDeviceExtraInfoForKey('RRPhotoPrivacyVersion'));

                  case 3:
                    t = n.sent;
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                    module390.MC.photoPrivacyVersionAgreedOnServer = t.RRPhotoPrivacyVersion;
                    n.next = 11;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 11:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            null,
            [[0, 8]],
            Promise
          );
        },
      },
      {
        key: 'photoFeatureValueChanged',
        value: function (t) {
          var module21, s, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (module389.isMiApp || !(module389.apiLevel < 10005)) {
                      c.next = 3;
                      break;
                    }

                    globals.showToast(module491.map_object_app_version_tip);
                    return c.abrupt('return');

                  case 3:
                    if (module1363.default.cameraEnabled) {
                      c.next = 6;
                      break;
                    }

                    globals.showToast(module491.camera_setting_open_rrai_tip);
                    return c.abrupt('return');

                  case 6:
                    if (!t) {
                      c.next = 24;
                      break;
                    }

                    module21 = module1363.default.mapObjectPhotoPrivacyPolicyAgreed;
                    c.next = 10;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.PhotoPrivacyVersion));

                  case 10:
                    if (
                      ((s = !!c.sent),
                      (l = parseInt(module390.MC.photoPrivacyVersionAgreedOnServer) == module403.RRPhotoPrivacyVersion),
                      0 != s || -1 != module390.MC.photoPrivacyVersionAgreedOnServer)
                    ) {
                      c.next = 21;
                      break;
                    }

                    c.next = 15;
                    return regeneratorRuntime.default.awrap(this.getPhotoPrivacyVersionAgreedVersionOnServer());

                  case 15:
                    if ((l = parseInt(module390.MC.photoPrivacyVersionAgreedOnServer) == module403.RRPhotoPrivacyVersion)) {
                      c.next = 19;
                      break;
                    }

                    if (this.photoPrivacyDialog) this.photoPrivacyDialog.show();
                    return c.abrupt('return');

                  case 19:
                    c.next = 24;
                    break;

                  case 21:
                    if (module21 && (s || l)) {
                      c.next = 24;
                      break;
                    }

                    if (this.photoPrivacyDialog) this.photoPrivacyDialog.show();
                    return c.abrupt('return');

                  case 24:
                    if (t || !module377.RSM.isRunning) {
                      c.next = 27;
                      break;
                    }

                    module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                      globals.showToast(module491.robot_communication_exception);
                    });
                    return c.abrupt('return');

                  case 27:
                    this.setState({
                      mapObjectPhotoEnabled: t,
                    });
                    module1363.default.mapObjectPhotoEnabled = t;
                    c.next = 31;
                    return regeneratorRuntime.default.awrap(module1363.default.updateCameraStatus());

                  case 31:
                    if (c.sent)
                      LogEventStatus('map_object_photo_switch', {
                        on: t,
                      });
                    else {
                      console.warn('switch failed');
                      this.setState({
                        mapObjectPhotoEnabled: !t,
                      });
                      module1363.default.mapObjectPhotoEnabled = !t;
                      globals.showToast(module491.robot_communication_exception);
                    }

                  case 33:
                  case 'end':
                    return c.stop();
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
        key: 'getStructureLightInfo',
        value: function () {
          var t = this;
          this.startLoading();
          module1363.default
            .getCameraStatus()
            .then(function () {
              t.setState({
                structureLightSwitch: module1363.default.cameraEnabled,
              });
              return module386.default.isAvoidCollisionSupported() ? module407.default.getCollisionAvoidStatus() : null;
            })
            .then(function (o) {
              var n;
              t.setState({
                avoidCollisionSwitch: 1 == (null == o ? undefined : null == (n = o.result) ? undefined : n.status),
              });
            })
            .catch(function (o) {
              t.showToast(module491.robot_communication_exception);
            })
            .finally(function () {
              if (module415.DMM.isTopazSV || module415.DMM.isTanosSV) t.getSceneSwitchState();
              else t.endLoading();
            });
        },
      },
      {
        key: 'refresh',
        value: function () {
          var t = this;
          this.startRefreshing();
          setTimeout(function () {
            module1363.default
              .getCameraStatus()
              .then(function () {
                t.setState({
                  structureLightSwitch: module1363.default.cameraEnabled,
                });
                return module386.default.isAvoidCollisionSupported() ? module407.default.getCollisionAvoidStatus() : null;
              })
              .then(function (o) {
                var n;
                t.setState({
                  avoidCollisionSwitch: 1 == (null == o ? undefined : null == (n = o.result) ? undefined : n.status),
                });
              })
              .catch(function (o) {
                t.showToast(module491.robot_communication_exception);
              })
              .finally(function () {
                t.endRefreshing();
              });
          }, 1e3);
        },
      },
      {
        key: 'showToast',
        value: function (t) {
          globals.showToast(t);
        },
      },
      {
        key: 'startLoading',
        value: function () {
          this.setState({
            loading: true,
          });
        },
      },
      {
        key: 'endLoading',
        value: function () {
          this.setState({
            loading: false,
          });
        },
      },
      {
        key: 'startRefreshing',
        value: function () {
          this.setState({
            refreshing: true,
          });
        },
      },
      {
        key: 'endRefreshing',
        value: function () {
          this.setState({
            refreshing: false,
          });
        },
      },
    ]);
    return R;
  })(React.default.Component);

exports.default = D;
D.defaultProps = {};
D.contextType = module506.AppConfigContext;
var j = module12.StyleSheet.create({
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
  section: {
    paddingVertical: 5,
  },
});

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1639 = require('./1639'),
  module13 = require('./13'),
  module381 = require('./381'),
  module1199 = require('./1199'),
  module385 = require('./385'),
  module391 = require('./391'),
  module416 = require('./416'),
  module390 = require('./390'),
  module424 = require('./424'),
  module394 = require('./394'),
  module1654 = require('./1654'),
  module1934 = require('./1934'),
  module420 = require('./420'),
  module1200 = require('./1200'),
  module1395 = require('./1395');

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

var module393 = require('./393'),
  module1343 = require('./1343'),
  module510 = require('./510').strings,
  module410 = require('./410'),
  module1420 = require('./1420'),
  F = (function (t) {
    module9.default(W, t);

    var module1199 = W,
      F = D(),
      B = function () {
        var t,
          o = module12.default(module1199);

        if (F) {
          var n = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function W(t) {
      var o;
      module6.default(this, W);
      (o = B.call(this, t)).state = {
        structureLightSwitch: module1639.default.cameraEnabled,
        avoidCollisionSwitch: false,
        loading: false,
        refreshing: false,
        mapObjectPhotoEnabled: module1639.default.mapObjectPhotoEnabled,
        sceneSwitch: false,
        isShow: false,
      };
      o.animatedWrapMarginBottom = new module13.Animated.Value(-500);
      o.mounted = false;

      o.changeListener = function () {
        if (o.mounted) o.forceUpdate();
      };

      return o;
    }

    module7.default(W, [
      {
        key: 'theme',
        get: function () {
          return this.context.theme;
        },
      },
    ]);
    module7.default(W, [
      {
        key: 'componentDidMount',
        value: function () {
          this.mounted = true;
          this.getStructureLightInfo();
          module1639.default.addChangeListener(this.changeListener);
          this.props.navigation.setParams({
            title: this.getThreeDimensionTitle(),
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.mounted = false;
          module1639.default.removeChangeListener(this.changeListener);
        },
      },
      {
        key: 'onToggleStructureLight',
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

                    module1200.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                      o.showToast(module510.robot_communication_exception);
                    });
                    return s.abrupt('return');

                  case 3:
                    module1639.default.cameraEnabled = t;
                    if (!t) module1639.default.explorationEnabled = t;
                    this.setState({
                      structureLightSwitch: t,
                    });
                    s.next = 8;
                    return regeneratorRuntime.default.awrap(module1639.default.updateCameraStatus());

                  case 8:
                    if (s.sent) {
                      if (!t)
                        this.setState({
                          avoidCollisionSwitch: false,
                        });
                    } else {
                      module1639.default.cameraEnabled = !t;
                      this.setState({
                        structureLightSwitch: !t,
                      });
                      this.showToast(module510.robot_communication_exception);
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
          if (module381.RSM.isRunning)
            module1200.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              o.showToast(module510.robot_communication_exception);
            });
          else {
            this.setState({
              avoidCollisionSwitch: t,
            });
            module416.default
              .setCollisionAvoidStatus(t ? 1 : 0)
              .then(function (t) {
                console.log('CollisionAvoidInfo.Set.Res : ' + JSON.stringify(t));
              })
              .catch(function (n) {
                console.log('CollisionAvoidInfo.Set.Error : ' + JSON.stringify(n));
                o.setState({
                  avoidCollisionSwitch: !t,
                });
                o.showToast(module510.robot_communication_exception);
              });
          }
        },
      },
      {
        key: 'getSceneSwitchState',
        value: function () {
          var t,
            o,
            s = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getFloorIdentifyStatus());

                  case 3:
                    t = l.sent;
                    l.next = 6;
                    return regeneratorRuntime.default.awrap(module416.default.getFurnitureIdentifyStatus());

                  case 6:
                    o = l.sent;
                    this.setState(
                      {
                        sceneSwitch: 1 == t.result.status || 1 == o.result.status,
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
          if (module381.RSM.isRunning)
            module1200.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              o.showToast(module510.robot_communication_exception);
            });
          else {
            this.setState({
              sceneSwitch: t,
            });
            module416.default
              .setFloorIdentifyStatus({
                status: t ? 1 : 0,
              })
              .then(function (n) {
                console.log('CollisionAvoidInfo.Set.Res : ' + JSON.stringify(n));
                module416.default
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
                    o.showToast(module510.robot_communication_exception);
                  });
              })
              .catch(function (n) {
                console.log('CollisionAvoidInfo.Set.Error : ' + JSON.stringify(n));
                o.setState({
                  sceneSwitch: !t,
                });
                o.showToast(module510.robot_communication_exception);
              });
          }
        },
      },
      {
        key: 'petModeDidChange',
        value: function (t) {
          var module22;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    this.hidePetDialog();
                    module22 = 0 == t;
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(module1639.default.updatePetModeEnabled(module22));

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
          return module424.DMM.isTopazSC || module424.DMM.isPearl
            ? module510.setting_auto_avoid_obstacle_title
            : module424.DMM.isTanosV
            ? module510.camera_setting_rrai_title
            : module424.DMM.isTanosSPlus
            ? module510.localization_strings_Setting_index_24
            : module510.camera_setting_detail2;
        },
      },
      {
        key: 'getThreeDimensionTip',
        value: function () {
          return module424.DMM.isTopazSC || module424.DMM.isPearl
            ? module510.setting_auto_avoid_obstacle_desc
            : module424.DMM.isTanosV
            ? module510.camera_setting_rrai_detail
            : module390.default.isObjectPhotoShowSupported()
            ? module510.camera_setting_detail3
            : module510.structure_light_tip_1;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            s = React.default.createElement(
              module13.View,
              {
                style: {
                  flex: 1,
                  backgroundColor: this.theme.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              React.default.createElement(module385.Spinner, null)
            );
          if (this.state.loading) return s;
          var l = module13.Dimensions.get('window').width - 30,
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
              title: module510.avoid_collision_mode,
              bottomDetail: '' + module510.structure_light_tip_3,
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
              title: module510.led_status_title1,
              visible: (module424.DMM.isTopazSV || module424.DMM.isPearlPlus) && this.state.structureLightSwitch,
              shouldShowBottomLine: false,
              shouldShowBottomLongLine: false,
              bottomDetailWidth: l - 40,
              isDetailCenter: false,
              rightCenter: true,
              detailColor: 0 == module1639.default.ledSetting ? '#007AFF' : this.context.theme.subTextColor,
              detail: 0 == module1639.default.ledSetting ? module510.led_status_title2 : module510.debug_info_close,
              bottomDetail: module510.led_status_detail1,
              funcId: 'camera_setting_led_mode',
              onPress: function () {
                t.showLedDialog();
              },
            },
            _ = {
              title: module510.camera_setting_pet_mode_title,
              visible: this.state.structureLightSwitch && module390.default.isPetModeSettingSupported(),
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
              bottomDetailWidth: l - 40,
              isDetailCenter: false,
              rightCenter: true,
              detailColor: module1639.default.cameraEnabled ? '#007AFF' : 'rgba(0,0,0,0.4)',
              detail: module1639.default.petModeEnabled ? module510.has_or_no_has : module510.has_or_no_no,
              bottomDetail: module510.if_has_pet_tip_detail,
              funcId: 'camera_setting_pet_mode',
              onPress: function () {
                if (module381.RSM.isRunning)
                  module1200.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                    globals.showToast(module510.robot_communication_exception);
                  });
                else t.showPetDialog();
              },
            },
            D = {
              title: module510.obstacle_pop_type_photo,
              visible: module390.default.isObjectPhotoShowSupported() && this.state.structureLightSwitch && !module391.default.isShareUser(),
              shouldShowSwitch: true,
              switchOn: this.state.mapObjectPhotoEnabled,
              switchValueChanged: this.photoFeatureValueChanged.bind(this),
              bottomDetailWidth: l - 40,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: false,
              shouldShowBottomLine: true,
              shouldShowRightArrow: false,
              shouldShowTitleLine: false,
              bottomDetail: module510.map_object_enable_intro,
            },
            R = {
              title: module510.camera_setting_detail4,
              bottomDetail: '' + module510.camera_setting_detail5,
              bottomDetailWidth: l - 40,
              shouldShowSwitch: true,
              switchOn: this.state.sceneSwitch,
              switchValueChanged: this.onSceneSwitch.bind(this),
              visible: (module424.DMM.isTopazSV || module424.DMM.isPearlPlus || module424.DMM.isTanosSV) && this.state.structureLightSwitch,
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
            },
            F = {
              title: module510.map_object_privacy_alert_link,
              shouldShowRightArrow: true,
              visible: module390.default.isObjectPhotoShowSupported() && this.state.structureLightSwitch && !module391.default.isShareUser(),
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
              style: {
                paddingVertical: 15,
              },
              funcId: 'camera_setting_map_object_privacy',
              onPress: function () {
                return t.props.navigation.navigate('WebViewPage', {
                  title: module510.map_object_privacy_title,
                  refrence: module1654.default.PhotoPrivacy(),
                  buttonTitle: module1639.default.mapObjectPhotoPrivacyPolicyAgreed ? module510.reset_authoration : module510.button_title_agree,
                  buttonColor: module1639.default.mapObjectPhotoPrivacyPolicyAgreed ? 'red' : '#007AFF',
                  refreshCurrent: function () {
                    setTimeout(function () {
                      t.setState({
                        mapObjectPhotoEnabled: module1639.default.mapObjectPhotoEnabled,
                      });
                    }, 2e3);
                  },
                  buttonAction: function (o) {
                    if (module381.RSM.isRunning && module1639.default.mapObjectPhotoPrivacyPolicyAgreed)
                      o.alertView &&
                        o.alertView.customAlert(
                          '',
                          module510.map_object_cancel_privacy_stop_robot_alert,
                          function () {
                            return regeneratorRuntime.default.async(
                              function (t) {
                                for (;;)
                                  switch ((t.prev = t.next)) {
                                    case 0:
                                      o.loadingView.showWithText();
                                      t.next = 3;
                                      return regeneratorRuntime.default.awrap(module416.default.stop());

                                    case 3:
                                      if (!t.sent) {
                                        t.next = 7;
                                        break;
                                      }

                                      if (o && o.loadingView) o.loadingView.hide();
                                      t.next = 9;
                                      break;

                                    case 7:
                                      if (o && o.loadingView) o.loadingView.hide();
                                      globals.showToast(module510.localization_strings_Setting_History_index_1);

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
                            confirmTitle: module510.map_object_cancel_privacy_stop,
                          }
                        );
                    else {
                      var s = function () {
                        setTimeout(function () {
                          if (o && o.loadingView) o.loadingView.showWithText(module510.map_object_cancel_privacy_loading);
                        }, 100);
                        if (t.timerForUnlock) module1420.clearTimeout(t.timerForUnlock);
                        module381.RSM.hardLockCameraStatus();
                        module393
                          .postPrivacyAgreementStatusWithVersion(
                            module381.RobotStatusManager.sharedManager().serverCode,
                            module1639.default.mapObjectPhotoPrivacyPolicyAgreed ? 5 : 4,
                            1
                          )
                          .then(function (t) {})
                          .catch(function (t) {});
                        module1639.default.updatePhotoPrivacy(!module1639.default.mapObjectPhotoPrivacyPolicyAgreed, function (n) {
                          if (
                            ((t.timerForUnlock = module1420.setTimeout(function () {
                              module381.RSM.unHardLockCameraStatus();
                            }, 500)),
                            setTimeout(function () {
                              if (o && o.loadingView) o.loadingView.hide();
                            }, 100),
                            n)
                          ) {
                            if ('' != (s = module1639.default.mapObjectPhotoPrivacyPolicyAgreed ? '' : module510.map_object_cancel_privacy_success)) globals.showToast(s);
                            o.props.navigation.setParams({
                              buttonTitle: module1639.default.mapObjectPhotoPrivacyPolicyAgreed ? module510.reset_authoration : module510.button_title_agree,
                              buttonColor: module1639.default.mapObjectPhotoPrivacyPolicyAgreed ? 'red' : '#007AFF',
                            });
                            module394.MC.mapObjectPhotos = {};
                            module394.MC.mapObjectLargePhotos = {};
                            LogEventCommon(module1639.default.mapObjectPhotoPrivacyPolicyAgreed ? 'accept_photo_privacy' : 'reset_photo_privacy_confirm');
                          } else {
                            var s = module1639.default.mapObjectPhotoPrivacyPolicyAgreed ? module510.map_object_cancel_privacy_timeout : module510.map_object_ignore_failed;
                            if (o) globals.showToast(s);
                          }
                        });
                      };

                      if (module1639.default.mapObjectPhotoPrivacyPolicyAgreed) {
                        if (o.alertView)
                          o.alertView.customAlert(
                            module510.reset_monitor_privacy_dialog_title,
                            module510.map_object_privacy_reset_dialog_content,
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
            B = React.default.createElement(module385.ActionSheetView, {
              ref: function (o) {
                return (t.actionSheet = o);
              },
              title: module510.if_has_pet_tip_title,
              actions: [module510.has_or_no_has, module510.has_or_no_no],
              didSelectRow: this.petModeDidChange.bind(this),
              onPressCancel: function () {
                return t.actionSheet.hide();
              },
            }),
            W = React.default.createElement(module385.ActionSheetView, {
              ref: function (o) {
                return (t.ledDialog = o);
              },
              actions: [module510.led_status_title2, module510.debug_info_close],
              didSelectRow: this.ledModeDidChange.bind(this),
              onPressCancel: function () {
                return t.ledDialog.hide();
              },
            }),
            N = React.default.createElement(
              module13.View,
              {
                style: {
                  width: l,
                },
              },
              React.default.createElement(
                module385.SettingListItemView,
                module22.default({}, c, {
                  key: 0,
                  style: {
                    width: l,
                  },
                })
              )
            ),
            z = u.visible
              ? React.default.createElement(
                  module13.View,
                  {
                    style: {
                      width: l,
                    },
                  },
                  React.default.createElement(
                    module385.SettingListItemView,
                    module22.default({}, u, {
                      key: 1,
                      style: {
                        width: l,
                      },
                    })
                  )
                )
              : React.default.createElement(module13.View, null),
            J = h.visible
              ? React.default.createElement(
                  module13.View,
                  {
                    style: {
                      width: l,
                    },
                  },
                  React.default.createElement(
                    module385.SettingListItemView,
                    module22.default({}, h, {
                      key: 2,
                      style: {
                        width: l,
                      },
                    })
                  )
                )
              : React.default.createElement(module13.View, null),
            H = _.visible
              ? React.default.createElement(
                  module13.View,
                  {
                    style: {
                      width: l,
                    },
                  },
                  React.default.createElement(
                    module385.SettingListItemView,
                    module22.default({}, _, {
                      key: 3,
                      style: {
                        width: l,
                      },
                    })
                  )
                )
              : React.default.createElement(module13.View, null),
            U = D.visible
              ? React.default.createElement(
                  module13.View,
                  {
                    style: {
                      width: l,
                    },
                  },
                  React.default.createElement(
                    module385.SettingListItemView,
                    module22.default({}, D, {
                      key: 4,
                      style: {
                        width: l,
                      },
                    })
                  )
                )
              : React.default.createElement(module13.View, null),
            K = R.visible
              ? React.default.createElement(
                  module13.View,
                  {
                    style: {
                      width: l,
                    },
                  },
                  React.default.createElement(
                    module385.SettingListItemView,
                    module22.default({}, R, {
                      key: 6,
                      style: {
                        width: l,
                      },
                    })
                  )
                )
              : React.default.createElement(module13.View, null),
            G = React.default.createElement(module13.View, {
              style: I.section,
            }),
            q = React.default.createElement(module1934.PhotoFeaturePrivacyDialog, {
              ref: function (o) {
                return (t.photoPrivacyDialog = o);
              },
              confirmTextColor: '#007AFF',
              confirmTitle: module510.button_title_agree,
              onConfirm: function () {
                return module1639.default.updatePhotoPrivacy(true, function (o) {
                  if (!o) globals.showToast(module510.robot_communication_exception);
                  if (o) module420.SetStorageKey(module420.StorageKeys.PhotoPrivacyVersion, module420.StorageKeys.PhotoPrivacyVersion);
                  if (o) t.savePhotoPrivacyVersionAgreedVersionOnServer();
                  if (o) t.photoFeatureValueChanged(true);
                  module393
                    .postPrivacyAgreementStatusWithVersion(module381.RobotStatusManager.sharedManager().serverCode, 4, 1)
                    .then(function (t) {})
                    .catch(function (t) {});
                });
              },
              onPressLink: function () {
                return t.props.navigation.navigate('WebViewPage', {
                  title: module510.map_object_privacy_title,
                  refrence: module1654.default.PhotoPrivacy(),
                  isNotMarginBottom: true,
                });
              },
              onShowListener: function () {
                t.setState({
                  isShow: true,
                });
                t.props.navigation.setParams({
                  navBarBackgroundColor: 'transparent',
                  onPressLeft: function () {},
                });
              },
              onHideListener: function () {
                t.setState({
                  isShow: false,
                });
                t.props.navigation.setParams({
                  navBarBackgroundColor: t.theme.navBackgroundColor,
                  onPressLeft: function () {
                    return navigation.pop();
                  },
                });
              },
            }),
            Q = F.visible
              ? React.default.createElement(
                  module13.View,
                  {
                    style: {
                      alignSelf: 'center',
                      height: 80,
                    },
                  },
                  React.default.createElement(
                    module13.Text,
                    module22.default({}, module391.default.getAccessibilityLabel('camera_setting_map_object_privacy'), {
                      style: [
                        I.privacyButton,
                        {
                          color: this.theme.customService.highlightTextColor,
                        },
                      ],
                      onPress: F.onPress.bind(this),
                    }),
                    F.title
                  )
                )
              : React.default.createElement(module13.View, null),
            X = module1395.titleBarContentHeight,
            Y =
              module391.default.iOSAndroidReturn(X + module1343.StatusBarHeight + module1343.AppBarMarginTop, (module13.StatusBar.currentHeight || 0) + X) +
              (module393.isWindowDisplay ? 8 : 0);
          return React.default.createElement(
            module13.View,
            {
              style: {
                backgroundColor: this.theme.settingBackgroundColor,
                flex: 1,
              },
            },
            this.state.isShow &&
              React.default.createElement(module13.View, {
                style: [
                  I.naviView,
                  {
                    height: Y,
                    top: -Y,
                    backgroundColor: this.theme.navBackgroundColor,
                  },
                ],
              }),
            this.state.isShow &&
              React.default.createElement(module13.View, {
                style: [
                  I.naviView,
                  {
                    height: Y,
                    top: -Y,
                    backgroundColor: this.theme.modalBackgroundColor,
                  },
                ],
              }),
            React.default.createElement(
              module13.ScrollView,
              {
                style: {
                  flex: 1,
                  paddingTop: 10,
                  marginHorizontal: 15,
                },
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module13.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    return t.refresh();
                  },
                }),
              },
              React.default.createElement(
                module13.View,
                {
                  style: [
                    {
                      flex: 1,
                      borderRadius: 8,
                      overflow: 'hidden',
                    },
                  ],
                },
                N
              ),
              G,
              React.default.createElement(
                module13.View,
                {
                  style: [
                    {
                      flex: 1,
                      borderRadius: 8,
                      overflow: 'hidden',
                    },
                  ],
                },
                K,
                module390.default.isAvoidCollisionSupported() && z,
                U,
                H,
                J,
                B
              ),
              G,
              Q,
              W
            ),
            q
          );
        },
      },
      {
        key: 'savePhotoPrivacyVersionAgreedVersionOnServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module393.saveDeviceExtraValue('RRPhotoPrivacyVersion', module410.RRPhotoPrivacyVersion.toString()));

                  case 3:
                    t = o.sent;
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                    o.next = 10;
                    break;

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(0);
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

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
        key: 'getPhotoPrivacyVersionAgreedVersionOnServer',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module393.getDeviceExtraInfoForKey('RRPhotoPrivacyVersion'));

                  case 3:
                    t = o.sent;
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer - ' + t);
                    module394.MC.photoPrivacyVersionAgreedOnServer = t.RRPhotoPrivacyVersion;
                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    console.log('getPhotoPrivacyVersionAgreedVersionOnServer  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 11:
                  case 'end':
                    return o.stop();
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
          var module22, s, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (module393.isMiApp || !(module393.apiLevel < 10005)) {
                      c.next = 3;
                      break;
                    }

                    globals.showToast(module510.map_object_app_version_tip);
                    return c.abrupt('return');

                  case 3:
                    if (module1639.default.cameraEnabled) {
                      c.next = 6;
                      break;
                    }

                    globals.showToast(module510.camera_setting_open_rrai_tip);
                    return c.abrupt('return');

                  case 6:
                    if (!t) {
                      c.next = 24;
                      break;
                    }

                    module22 = module1639.default.mapObjectPhotoPrivacyPolicyAgreed;
                    c.next = 10;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.PhotoPrivacyVersion));

                  case 10:
                    if (
                      ((s = !!c.sent),
                      (l = parseInt(module394.MC.photoPrivacyVersionAgreedOnServer) == module410.RRPhotoPrivacyVersion),
                      0 != s || -1 != module394.MC.photoPrivacyVersionAgreedOnServer)
                    ) {
                      c.next = 21;
                      break;
                    }

                    c.next = 15;
                    return regeneratorRuntime.default.awrap(this.getPhotoPrivacyVersionAgreedVersionOnServer());

                  case 15:
                    if ((l = parseInt(module394.MC.photoPrivacyVersionAgreedOnServer) == module410.RRPhotoPrivacyVersion)) {
                      c.next = 19;
                      break;
                    }

                    if (this.photoPrivacyDialog) this.photoPrivacyDialog.show();
                    return c.abrupt('return');

                  case 19:
                    c.next = 24;
                    break;

                  case 21:
                    if (module22 && (s || l)) {
                      c.next = 24;
                      break;
                    }

                    if (this.photoPrivacyDialog) this.photoPrivacyDialog.show();
                    return c.abrupt('return');

                  case 24:
                    if (t || !module381.RSM.isRunning) {
                      c.next = 27;
                      break;
                    }

                    module1200.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                      globals.showToast(module510.robot_communication_exception);
                    });
                    return c.abrupt('return');

                  case 27:
                    this.setState({
                      mapObjectPhotoEnabled: t,
                    });
                    module1639.default.mapObjectPhotoEnabled = t;
                    c.next = 31;
                    return regeneratorRuntime.default.awrap(module1639.default.updateCameraStatus());

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
                      module1639.default.mapObjectPhotoEnabled = !t;
                      globals.showToast(module510.robot_communication_exception);
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
        key: 'ledModeDidChange',
        value: function (t) {
          var o = this;
          this.hideLedDialog();
          if (1 == t)
            globals.Alert.alert('', module510.led_alert_detail, [
              {
                text: module510.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  return regeneratorRuntime.default.async(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            o.updateLedSetting(2);

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
                },
              },
            ]);
          else this.updateLedSetting(0);
        },
      },
      {
        key: 'updateLedSetting',
        value: function (t) {
          var o = this;
          module1639.default.updateLedSetting(t, function (t) {
            if (!t) o.showToast(module510.robot_communication_exception);
          });
        },
      },
      {
        key: 'showLedDialog',
        value: function () {
          if (this.ledDialog) this.ledDialog.show();
        },
      },
      {
        key: 'hideLedDialog',
        value: function () {
          if (this.ledDialog) this.ledDialog.hide();
        },
      },
      {
        key: 'getStructureLightInfo',
        value: function () {
          var t = this;
          this.startLoading();
          module1639.default
            .getCameraStatus()
            .then(function () {
              t.setState({
                structureLightSwitch: module1639.default.cameraEnabled,
              });
              return module390.default.isAvoidCollisionSupported() ? module416.default.getCollisionAvoidStatus() : null;
            })
            .then(function (o) {
              var n;
              t.setState({
                avoidCollisionSwitch: 1 == (null == o ? undefined : null == (n = o.result) ? undefined : n.status),
              });
            })
            .catch(function (o) {
              t.showToast(module510.robot_communication_exception);
            })
            .finally(function () {
              if (module424.DMM.isTopazSV || module424.DMM.isPearlPlus || module424.DMM.isTanosSV) t.getSceneSwitchState();
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
            module1639.default
              .getCameraStatus()
              .then(function () {
                t.setState({
                  structureLightSwitch: module1639.default.cameraEnabled,
                });
                return module390.default.isAvoidCollisionSupported() ? module416.default.getCollisionAvoidStatus() : null;
              })
              .then(function (o) {
                var n;
                t.setState({
                  avoidCollisionSwitch: 1 == (null == o ? undefined : null == (n = o.result) ? undefined : n.status),
                });
              })
              .catch(function (o) {
                t.showToast(module510.robot_communication_exception);
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
    return W;
  })(React.default.Component);

exports.default = F;
F.defaultProps = {};
F.contextType = module1199.AppConfigContext;
var I = module13.StyleSheet.create({
  section: {
    paddingVertical: 5,
  },
  privacyButton: {
    alignSelf: 'center',
    fontSize: 13,
  },
  naviView: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

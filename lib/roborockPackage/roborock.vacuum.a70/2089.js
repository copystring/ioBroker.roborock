var module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module381 = require('./381'),
  module415 = require('./415'),
  module420 = require('./420'),
  module385 = require('./385'),
  module391 = require('./391'),
  module416 = require('./416'),
  module390 = require('./390'),
  module1192 = require('./1192'),
  module1340 = require('./1340'),
  module1118 = require('./1118'),
  module1343 = require('./1343'),
  module394 = require('./394'),
  module1193 = require('./1193'),
  module387 = require('./387');

function V(t, n) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    s.push.apply(s, o);
  }

  return s;
}

function N(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      V(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      V(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function R() {
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

var module1414 = require('./1414'),
  module510 = require('./510').strings,
  module1337 = require('./1337'),
  q = (function (t) {
    module9.default(V, t);

    var n = V,
      module50 = R(),
      L = function () {
        var t,
          o = module12.default(n);

        if (module50) {
          var u = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, u);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function V(t) {
      var n;
      module6.default(this, V);

      (n = L.call(this, t)).gotoZoneInfoPage = function () {
        n.props.navigation.navigate('MapEditZoneInfoPage', {
          title: module510.map_edit_zone,
          initAction: module1192.EditAction.Name,
        });
      };

      n.setSmartOrderForTag = function () {
        var t = module415.MM.roomNameMapping;

        if (t && 'object' == typeof t) {
          for (var s = {}, o = 0; o < t.length; o++)
            if (3 == t[o].length) {
              var c = t[o][0],
                l = t[o][2];
              if (l <= 0) continue;
              if (s[l]) s[l].push(c);
              else s[l] = [c];
            }

          if (!(s.length <= 0)) {
            var f = [];
            Object.keys(s)
              .sort(function (t, n) {
                return t - n;
              })
              .map(function (t) {
                f.push.apply(f, module31.default(s[t]));
              });
            n.selectedSegements = f;
            n.saveCleanOrder(true);
          }
        }
      };

      n.onNavigationGuidePress = function () {
        if (n.newSwitchGuideView) n.newSwitchGuideView.show();
      };

      n.onNavigationSavePress = function () {
        n.trySavingCleanOrder();
      };

      n.onResetButtonPressed = function () {
        var t, s, u;
        return regeneratorRuntime.default.async(
          function (c) {
            for (;;)
              switch ((c.prev = c.next)) {
                case 0:
                  try {
                    s = {
                      text: module510.localization_strings_Main_MainPage_11,
                      onPress: function () {
                        module387.LogEventCommon('reset_clean_orders_cancel');
                      },
                    };
                    u = {
                      text: module510.rubys_location_confirm_button_confirm,
                      onPress: function () {
                        return regeneratorRuntime.default.async(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  module387.LogEventCommon('reset_clean_orders_confirm');
                                  n.onResetOrder();

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
                    };
                    if (!(null == (t = globals.Alert))) t.alert('', module510.reset_order_prompt, [s, u]);
                  } catch (t) {
                    n.endLoading();
                  }

                case 1:
                case 'end':
                  return c.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      n.onPressSmartOrderButton = function () {
        var t;

        if (n.showSmartMenu) {
          var s = module415.MM.checkAllRoomTagged(),
            o = s ? module510.map_edit_order_smart_tip : module510.map_edit_mode_smart_tip_detail,
            u = {
              text: module510.localization_strings_Main_MainPage_11,
            },
            c = {
              text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: s ? n.setSmartOrderForTag : n.gotoZoneInfoPage,
            };
          if (!(null == (t = globals.Alert))) t.alert(o, '', [u, c]);
        }
      };

      n.onPressCancelButtonForOrder = function () {
        var t;
        n.selectedSegements = n.originalSelectedSegements.concat();
        if (!(null == (t = n.mapView))) t.setHighlightSegments(n.selectedSegements, true);
        n.updateUI();
      };

      n.onSelectedBlocksChanged = function (t) {
        n.selectedSegements = t;
        n.updateUI();
      };

      n.didTapBlockInCustomOrder = function (t) {
        var s, o;
        if (!(null == (s = n.editMenu))) s.hideSmartCustomGuide();
        if (!(null == (o = n.editMenu))) o.showOrderSetMenu();
      };

      n.state = {
        mapStatus: module381.RSM.mapStatus,
        isResetOrderEnable: false,
      };
      n.selectedSegements = module415.MM.cleanSequence.concat();
      n.blockOperated = false;
      n.originalSelectedSegements = module415.MM.cleanSequence.concat();
      n.showSmartMenu = n.initShowSmartSet();
      return n;
    }

    module7.default(V, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module13.BackHandler.addEventListener(module13.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onNavigationBackPress();
            return true;
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.configNavibar();
          this.initMapView();
          this.updateUI();
          this.registListeners();
          this.showGuideViewIfNeeded();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.removeListeners();
        },
      },
      {
        key: 'configNavibar',
        value: function () {
          var t = this,
            n = module1343.default.guideButton(this.onNavigationGuidePress, function (n) {
              t.guideButton = n;
            }),
            s = module1343.default.confirmButton(this.onNavigationSavePress, false, function (n) {
              t.mapSaveButton = n;
            }),
            o = this.showSmartMenu ? [n] : [s];
          module1343.default.setNavigation(this, globals.isRTL ? o.reverse() : o, this.onNavigationBackPress.bind(this));
        },
      },
      {
        key: 'initMapView',
        value: function () {
          var t;
          if (!(null == (t = this.mapView))) t.setState(N({}, module415.MM.mapData));
        },
      },
      {
        key: 'initShowSmartSet',
        value: function () {
          return !!module390.default.isSupportRoomTag() && (!!module415.MM.checkAllRoomTagged() || !module391.default.isShareUser());
        },
      },
      {
        key: 'showGuideViewIfNeeded',
        value: function () {
          var t,
            n,
            s = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (module381.RSM.mapStatus != module381.MapStatus.None && module381.RSM.mapStatus != module381.MapStatus.Has_WithoutSegments) {
                      u.next = 2;
                      break;
                    }

                    return u.abrupt('return');

                  case 2:
                    t = module420.StorageKeys.CleanSequencebyGuide;
                    u.next = 5;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(t));

                  case 5:
                    if (((n = u.sent), !!n)) {
                      u.next = 11;
                      break;
                    }

                    u.next = 10;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(t, t));

                  case 10:
                    module1414.setTimeout(function () {
                      var t, n;
                      if (!(null == (t = s.newSwitchGuideView))) t.show();
                      if (s.showSmartMenu) null == (n = s.editMenu) || n.showSmartCustomGuide(module510.smart_custom_order_guide_tip_text);
                    }, 50);

                  case 11:
                  case 'end':
                    return u.stop();
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
        key: 'registListeners',
        value: function () {
          var t = this;
          this.mapListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapDidUpdate, function (n) {
            if (t.mapView)
              t.mapView.setState(
                N(
                  N({}, module415.MM.mapData),
                  {},
                  {
                    robotStatus: module381.RSM.state,
                  }
                )
              );
          });
          this.robotStatusListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module381.RSM.mapStatus,
            });
          });
          this.cleanSequenceListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            var s;
            if (n.data == module420.EventKeys.CleanSequenceDidReceive) null == (s = t.mapView) || s.setHighlightSegments(module415.MM.cleanSequence.concat(), true);
          });
        },
      },
      {
        key: 'removeListeners',
        value: function () {
          if (this.mapListener) this.mapListener.remove();
          if (this.backListener) this.backListener.remove();
          if (this.cleanSequenceListener) this.cleanSequenceListener.remove();
          if (this.robotStatusListener) this.robotStatusListener.remove();
        },
      },
      {
        key: 'updateUI',
        value: function () {
          var t = this,
            n = 0 != this.selectedSegements.length && this.originalSelectedSegements.length > 0;
          module1414.setTimeout(function () {
            var s, o;
            t.setState({
              isResetOrderEnable: n,
            });
            if (!(null == (s = t.resetButton))) s.setEnabled(n);
            if (!(null == (o = t.mapSaveButton))) o.setEnabled(t.blockOperated || t.originalSelectedSegements.length > 0);
            t.blockOperated = true;
          }, 50);
        },
      },
      {
        key: 'onResetOrder',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    this.startLoading();
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(module416.default.setCleanSequence([]));

                  case 4:
                    this.endLoading();
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module420.EventKeys.CleanSequenceDidChange,
                    });
                    if (!(null == (t = this.mapView))) t.resetSelectBlocks();
                    this.setOrderCompleted(false);
                    n.next = 15;
                    break;

                  case 11:
                    n.prev = 11;
                    n.t0 = n.catch(0);
                    this.endLoading();
                    this.showToast(module510.robot_communication_exception);

                  case 15:
                  case 'end':
                    return n.stop();
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
        key: 'trySavingCleanOrder',
        value: function () {
          var t = this;
          if (this.checkAllSegmentsOrdered()) this.saveCleanOrder();
          else {
            var n,
              s = {
                text: module510.localization_strings_Main_MainPage_11,
                onPress: function () {
                  module387.LogEventCommon('segements_not_set_for_all_cancel');
                },
              },
              u = {
                text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  return regeneratorRuntime.default.async(
                    function (n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            module387.LogEventCommon('segements_not_set_for_all_confirm');
                            n.next = 3;
                            return regeneratorRuntime.default.awrap(t.saveCleanOrder());

                          case 3:
                          case 'end':
                            return n.stop();
                        }
                    },
                    null,
                    null,
                    null,
                    Promise
                  );
                },
              };
            if (!(null == (n = globals.Alert))) n.alert('', module510.clean_sequence_not_set_for_all_segments_tip, [s, u]);
          }
        },
      },
      {
        key: 'saveCleanOrder',
        value: function () {
          var t,
            n,
            s = arguments;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (((t = s.length > 0 && undefined !== s[0] && s[0]), this.checkDataValid())) {
                      u.next = 5;
                      break;
                    }

                    this.showToast(module510.map_edit_split_restriction_num);
                    return u.abrupt('return');

                  case 5:
                    if (!this.blockOperated && 0 == this.selectedSegements) {
                      u.next = 24;
                      break;
                    }

                    u.prev = 6;
                    this.startLoading();
                    u.next = 10;
                    return regeneratorRuntime.default.awrap(module416.default.setCleanSequence(this.selectedSegements));

                  case 10:
                    this.endLoading();
                    if (!(null == (n = this.mapView))) n.resetSelectBlocks();
                    this.blockOperated = false;
                    this.selectedSegements = [];
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module420.EventKeys.CleanSequenceDidChange,
                    });
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module420.EventKeys.MapSegmentsDidChange,
                    });
                    u.next = 18;
                    return regeneratorRuntime.default.awrap(this.setOrderCompleted(t));

                  case 18:
                    u.next = 24;
                    break;

                  case 20:
                    u.prev = 20;
                    u.t0 = u.catch(6);
                    this.endLoading();
                    this.showToast(module510.robot_communication_exception);

                  case 24:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[6, 20]],
            Promise
          );
        },
      },
      {
        key: 'setOrderCompleted',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (t || this.showSmartMenu) {
                      n.next = 4;
                      break;
                    }

                    this.props.navigation.pop();
                    n.next = 13;
                    break;

                  case 4:
                    n.prev = 4;
                    n.next = 7;
                    return regeneratorRuntime.default.awrap(module415.MM.getCleanSequence());

                  case 7:
                    this.selectedSegements = module415.MM.cleanSequence.concat();
                    this.originalSelectedSegements = module415.MM.cleanSequence.concat();
                    n.next = 13;
                    break;

                  case 11:
                    n.prev = 11;
                    n.t0 = n.catch(4);

                  case 13:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[4, 11]],
            Promise
          );
        },
      },
      {
        key: 'checkDataValid',
        value: function () {
          var t, n;
          if ((null == (t = this.selectedSegements) ? undefined : t.length) > 16) return false;
          if (
            (null == (n = this.mapView) ? undefined : n.getExistingBlocks()).length > 16 &&
            -1 !=
              this.selectedSegements.findIndex(function (t) {
                return t < 16;
              })
          )
            return false;
          return true;
        },
      },
      {
        key: 'checkAllSegmentsOrdered',
        value: function () {
          var t = this,
            n = this.mapView.getExistingBlocks();
          if (n.length == this.selectedSegements.length) return true;
          var s = n.filter(function (n) {
            return (
              -1 ==
              t.selectedSegements.findIndex(function (t) {
                return t === n;
              })
            );
          });
          return !this.mapView.checkSegmentSize(s);
        },
      },
      {
        key: 'onNavigationBackPress',
        value: function () {
          var t = this;

          if (module1343.default.isEditedByArrays(this.originalSelectedSegements, this.selectedSegements)) {
            var n,
              s = {
                text: module510.map_edit_no_save,
                onPress: function () {
                  module387.LogEventCommon('save_hint_cancel');
                  t.props.navigation.pop();
                },
              },
              o = {
                text: module510.map_edit_button_text_save,
                onPress: function () {
                  module387.LogEventCommon('save_hint_confirm');
                  module1414.setTimeout(function () {
                    t.trySavingCleanOrder();
                  }, 500);
                },
              };
            if (!(null == (n = globals.Alert))) n.alert(module510.map_edit_save_current_action, '', [s, o]);
          } else this.props.navigation.pop();
        },
      },
      {
        key: 'startLoading',
        value: function () {
          if (this.loadingView) this.loadingView.showWithText(module510.rubys_main_diag_update_map);
        },
      },
      {
        key: 'endLoading',
        value: function () {
          if (this.loadingView) this.loadingView.hide();
        },
      },
      {
        key: 'showToast',
        value: function (t) {
          globals.showToast(t);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            s = React.default.createElement(module1118.MapView, {
              ref: function (n) {
                t.mapView = n;
              },
              style: module1343.MapEditCommonStyles.map,
              parent: this,
              left: module1343.MapEditCommonStyles.mapLeft,
              right: module1343.MapEditCommonStyles.mapRight,
              top: module1343.MapEditCommonStyles.mapTop,
              bottom: module391.default.isIphoneX() ? 130 : 110,
              mapMode: module1337.MAP_MODE_MAP_EDIT,
              inBlockMode: true,
              hideAccessory: true,
              blockBubbleShowInfo: module1118.BlockBubbleShowInfo.CLEANSEQUENCE | module1118.BlockBubbleShowInfo.DISPLAYNAME,
              blockSequenceInfo: this.originalSelectedSegements.concat(),
              selectedBlocksDidChange: this.onSelectedBlocksChanged,
              didTapBlockInCustomOrder: this.didTapBlockInCustomOrder,
            }),
            o = React.default.createElement(module1192.default, {
              type: module1192.MenuType.Menu_Order,
              ref: function (n) {
                return (t.editMenu = n);
              },
              onPressGuideButton: this.onNavigationGuidePress,
            }),
            u = React.default.createElement(module1192.default, {
              type: module1192.MenuType.Menu_Order_Smart,
              ref: function (n) {
                return (t.editMenu = n);
              },
              hasConfirmMenu: true,
              onPressSmartOrderButton: this.onPressSmartOrderButton,
              onPressCleanOrderButton: this.onResetButtonPressed,
              onPressConfirmButtonForOrder: this.onNavigationSavePress,
              onPressCancelButtonForOrder: this.onPressCancelButtonForOrder,
            }),
            c = this.showSmartMenu ? u : o,
            l =
              this.state.mapStatus == module381.MapStatus.None || this.state.mapStatus == module381.MapStatus.Has_WithoutSegments
                ? module1343.default.getNoMapTipView(this.state.mapStatus)
                : s,
            f = this.state.isResetOrderEnable && this.state.mapStatus != module381.MapStatus.None && this.state.mapStatus != module381.MapStatus.Has_WithoutSegments;
          f = !this.showSmartMenu && f;
          var h = module1343.default.resetButton(module510.reset_order_button_title, this.state.isResetOrderEnable, this.onResetButtonPressed);
          return React.default.createElement(
            module13.View,
            {
              style: [
                module1343.MapEditCommonStyles.root,
                {
                  height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            l,
            c,
            f && h,
            React.default.createElement(module1340.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              isModal: true,
              parent: this,
              bgImage: n.guideImages.order,
              topTitle: module510.map_edit_bottom_menu_order_title,
              context: module510.map_edit_bottom_menu_order_info1,
              buttonInfo: [module510.localization_strings_Setting_RemoteControlPage_51],
              buttonFuncId: ['map_edit_order_guide_ok'],
            }),
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_zone_order_view_loading',
              closeAccessibilityLabelKey: 'map_edit_zone_order_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onOverTimer: function () {
                globals.showToast(module510.map_object_ignore_failed);
              },
              showButton: true,
            })
          );
        },
      },
    ]);
    return V;
  })(React.Component);

exports.default = q;
q.contextType = module1193.AppConfigContext;

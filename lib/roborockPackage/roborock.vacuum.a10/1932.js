var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module411 = require('./411'),
  module1229 = require('./1229'),
  module383 = require('./383'),
  module1933 = require('./1933'),
  module377 = require('./377'),
  module1241 = require('./1241'),
  module1231 = require('./1231'),
  module387 = require('./387'),
  module386 = require('./386'),
  module1934 = require('./1934'),
  module1935 = x(require('./1935')),
  module1243 = require('./1243'),
  module1799 = require('./1799'),
  module1798 = x(require('./1798')),
  module506 = require('./506'),
  module1806 = require('./1806'),
  module507 = require('./507'),
  module1259 = require('./1259');

function N(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (N = function (t) {
    return t ? o : n;
  })(t);
}

function x(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = N(n);
  if (o && o.has(t)) return o.get(t);
  var l = {},
    s = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var u in t)
    if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
      var c = s ? Object.getOwnPropertyDescriptor(t, u) : null;
      if (c && (c.get || c.set)) Object.defineProperty(l, u, c);
      else l[u] = t[u];
    }

  l.default = t;
  if (o) o.set(t, l);
  return l;
}

function B() {
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

var module491 = require('./491').strings,
  module934 = require('./934'),
  module389 = require('./389'),
  module1265 = require('./1265'),
  base64js = require('base64-js'),
  module1339 = require('./1339').parseSync,
  U = module12.Dimensions.get('window'),
  j = U.height,
  Z = U.width,
  H = Z,
  G = -100,
  Q = -101,
  J = (function (t) {
    module7.default(q, t);

    var module506 = q,
      N = B(),
      x = function () {
        var t,
          n = module11.default(module506);

        if (N) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function q(t) {
      var n;
      module4.default(this, q);
      (n = x.call(this, t)).dataProvider = module386.default.isMultiFloorSupported() ? new module1799.MultiMapDataProvider() : new module1799.SingleMapDataProvider();
      n.mapListRequest = null;
      n.mapDataRequests = [];
      n.unMount = false;
      n.state = {
        mapSaveEnabled: module377.RSM.mapSaveEnabled,
        multiFloorFeatureEnabled: module386.default.isMultiFloorSupported(),
        multiFloorEnabled: module377.RSM.multiFloorEnabled,
        items: null,
        isCurrentMapRestoreEnabled: module386.default.isCurrentMapRestoreEnabled(),
        editingNameMap: {
          id: null,
          name: null,
        },
        refreshing: false,
        dataInitialized: false,
      };
      return n;
    }

    module5.default(q, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.registListeners();
          this.requestMaps(true, true);
          var n = this.state.multiFloorFeatureEnabled
            ? React.default.createElement(module381.PureImageButton, {
                funcId: 'multi_map_q_a',
                style: X.confirmButton,
                image: this.context.theme.navQuestionIcon,
                onPress: function () {
                  var n;
                  return null == (n = t.qaContentView)
                    ? undefined
                    : n.setState({
                        shouldShow: true,
                      });
                },
                imageWidth: 40,
                imageHeight: 40,
                imageStyle: {
                  resizeMode: 'contain',
                  width: 24,
                  height: 24,
                },
              })
            : null;
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.navBackgroundColor,
            title: module491.map_edit_title,
            rightItems: [n],
            hiddenBottomLine: false,
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.unMount = true;
          this.removeListeners();
        },
      },
      {
        key: 'registListeners',
        value: function () {
          var t = this;
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.reloadDataIfNeeded();
          });
          this.multiMapsListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.sender != t) {
              if (n.data == module411.EventKeys.MultiMapsDidReceive) t.reloadDataIfNeeded();

              if (
                !(
                  n.data != module411.EventKeys.MapSegmentsDidChange &&
                  n.data != module411.EventKeys.FBZSettingsDidChange &&
                  n.data != module411.EventKeys.CurrentMapDidChange &&
                  n.data != module411.EventKeys.MapDidRotate
                )
              ) {
                t.requestMaps(false);
                t.reloadEmptyMapViewIfNeeded();
              }

              if (n.data == module411.EventKeys.CurrentMapDidChange) module1229.MM.getMultiMaps();
            }
          });
          this.mapUpdateListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (n) {
            t.mapUpdated = true;
          });
        },
      },
      {
        key: 'removeListeners',
        value: function () {
          this.robotStatusListener.remove();
          this.multiMapsListener.remove();
          if (this.createMapLoopChecker) clearInterval(this.createMapLoopChecker);
          this.mapUpdateListener.remove();
          this.removePendingRequests();
        },
      },
      {
        key: 'removePendingRequests',
        value: function () {
          if (this.mapListRequest) this.mapListRequest.cancel();
          this.mapDataRequests.forEach(function (t) {
            if (t.req) t.req.cancel();
          });
        },
      },
      {
        key: 'reloadDataIfNeeded',
        value: function () {
          if (this.props.navigation.isFocused()) {
            if (module377.RSM.multiFloorEnabled != this.state.multiFloorEnabled) {
              if (!module377.RSM.multiFloorEnabled) this.requestMaps(false);
              this.setState({
                multiFloorEnabled: module377.RSM.multiFloorEnabled,
              });
            } else this.reloadEmptyMapViewIfNeeded();

            this.setState({
              isCurrentMapRestoreEnabled: module386.default.isCurrentMapRestoreEnabled(),
            });
          }
        },
      },
      {
        key: 'reloadEmptyMapViewIfNeeded',
        value: function () {
          var t,
            n,
            o = module377.RSM.mapStatus != module377.MapStatus.None,
            l = -1 == module377.RSM.currentMapId,
            s = this.emptyMapView.state.hasCurrentMap,
            u = this.emptyMapView.state.isNewMap,
            c = this.state.items && this.state.items.length > 0;
          this.emptyMapView.setState({
            isRunning: module377.RSM.isRunning,
            hasCurrentMap: o,
            isNewMap: l,
            hasMap: (null != (t = null == (n = this.state.items) ? undefined : n.length) ? t : 0) > 0,
          });
          if (o && l) this.emptyMapView.updateMap();
          if (s && u && c && !l) this.requestMaps();
        },
      },
      {
        key: 'pullToRefresh',
        value: function () {
          var t = this;
          this.setState({
            refreshing: true,
          });
          setTimeout(function () {
            t.mapListRequest = t.dataProvider.getData();
            t.mapListRequest
              .then(function (n) {
                t.setState({
                  items: n,
                });
              })
              .catch(function (t) {
                if (!t.isCanceled)
                  if (t.data && t.data.result && 'unknown_method' == t.data.result) {
                    var n = {
                      text: module491.localization_strings_Setting_RemoteControlPage_51,
                      onPress: function () {
                        module389.closeCurrentPage();
                      },
                    };
                    globals.Alert.alert(module491.plugin_need_update, '', [n]);
                  } else globals.showToast(module491.robot_communication_exception);
              })
              .finally(function () {
                t.setState({
                  refreshing: false,
                });
              })
              .then(function () {
                t.requestMapsData();
              });
          }, 1e3);
        },
      },
      {
        key: 'requestMaps',
        value: function () {
          var t = this,
            n = !(arguments.length > 0 && undefined !== arguments[0]) || arguments[0],
            o = arguments.length > 1 && undefined !== arguments[1] && arguments[1];
          if (n && this.globalLoadingView) this.globalLoadingView.showWithText();
          this.mapListRequest = this.dataProvider.getData();
          this.mapListRequest
            .then(function (n) {
              var l, s;
              if (o)
                module383.LogEventStatus('map_count', {
                  count: null != (l = null == (s = null != n ? n : []) ? undefined : s.length) ? l : 0,
                });
              t.setState({
                items: n,
              });
            })
            .catch(function (t) {
              var n, o, l;
              if (
                !t.isCanceled &&
                -97 != (null == t ? undefined : null == (n = t.data) ? undefined : n.error) &&
                -12 != (null == t ? undefined : null == (o = t.data) ? undefined : null == (l = o.error) ? undefined : l.code)
              )
                if (t.data && t.data.result && 'unknown_method' == t.data.result) {
                  var s = {
                    text: module491.localization_strings_Setting_RemoteControlPage_51,
                    onPress: function () {
                      module389.closeCurrentPage();
                    },
                  };
                  globals.Alert.alert(module491.plugin_need_update, '', [s]);
                } else globals.showToast(module491.robot_communication_exception);
            })
            .finally(function () {
              if (!t.unMount) {
                var o;
                if (n) t.globalLoadingView && (null == (o = t.globalLoadingView) || null == o.hide || o.hide());
                t.setState({
                  dataInitialized: true,
                });
              }
            })
            .then(function () {
              if (!t.unMount) t.requestMapsData();
            });
        },
      },
      {
        key: 'requestMapsData',
        value: function () {
          var t = this;
          if (this.state.items)
            this.state.items.forEach(function (n) {
              t.fetchMapData(n.id);
            });
        },
      },
      {
        key: 'requestMapSaveSwitch',
        value: function (t) {
          var n = this;
          if (this.globalLoadingView) this.globalLoadingView.showWithText();
          this.dataProvider
            .mapSaveSwitch(t)
            .then(function (t) {
              module383.LogEventStatus('map_save_switch', {
                on: t,
              });
            })
            .catch(function (t) {
              if (-3 != t.data.error && -10005 != t.data.error.code && -10005 != t.data.error) globals.showToast(module491.robot_communication_exception);
            })
            .finally(function () {
              var t;
              if (n.globalLoadingView) null == (t = n.globalLoadingView) || null == t.hide || t.hide();
            });
        },
      },
      {
        key: 'requestSaveMap',
        value: function (t) {
          var n = this;
          if (this.globalLoadingView) this.globalLoadingView.showWithText();
          this.dataProvider
            .manualSegmentMap(t)
            .then(function (t) {
              n.emptyMapView.setState({
                isNewMap: false,
              });
              n.requestMaps(false);
            })
            .catch(function (t) {})
            .finally(function () {
              var t;
              if (!(null == (t = n.globalLoadingView) || null == t.hide)) t.hide();
            });
        },
      },
      {
        key: 'requestMultiFloorFeature',
        value: function (t) {
          var n = this;
          if (this.globalLoadingView) this.globalLoadingView.showWithText();
          this.dataProvider
            .toggleMultiMapFeature(t)
            .then(function () {
              return n.dataProvider.manualSegmentMap(module1229.CurrentMapId);
            })
            .then(function () {
              n.setState({
                multiFloorEnabled: t,
              });
            })
            .catch(function (o) {
              n.setState({
                multiFloorEnabled: !t,
              });
            })
            .finally(function () {
              var t;
              if (n.globalLoadingView) null == (t = n.globalLoadingView) || null == t.hide || t.hide();
            });
        },
      },
      {
        key: 'requestEditingMapName',
        value: function (t, n, o) {
          var l,
            s,
            u,
            c,
            p = this;
          if ((this.globalLoadingView && this.globalLoadingView.showWithText(), null != (l = this.dataProvider) && l.editMapName)) {
            if (!(null == (s = (u = this.dataProvider).editMapName)))
              s.call(u, t, n, o)
                .then(function (o) {
                  var l =
                    p.state.items &&
                    p.state.items.map(function (o) {
                      if (o.id == t) o.name = module1243.FloorMapPageUtils.getRealName(n);
                      return o;
                    });
                  p.setState({
                    items: l,
                  });
                  module1229.MM.getMultiMaps();
                })
                .catch(function (t) {
                  globals.showToast(module491.naming_failed);
                })
                .finally(function () {
                  var t;
                  if (p.globalLoadingView) null == (t = p.globalLoadingView) || null == t.hide || t.hide();
                });
          } else if (this.globalLoadingView) null == (c = this.globalLoadingView) || null == c.hide || c.hide();
        },
      },
      {
        key: 'requestResetMap',
        value: function () {
          var t = this;
          if (this.globalLoadingView) this.globalLoadingView.showWithText();
          this.dataProvider
            .resetMap()
            .then(function (n) {
              globals.showToast(module491.map_reset_page_operate_success);
              module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                data: module411.EventKeys.MapSegmentsDidChange,
                sender: t,
              });
              module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                data: module411.EventKeys.SegmentCustomModeDidChange,
              });
              t.props.navigation.pop();
            })
            .catch(function (t) {
              if (t.data && t.data.result && 'unknown_method' == t.data.result)
                globals.Alert.alert(module491.plugin_need_update, '', [
                  {
                    text: module491.localization_strings_Setting_RemoteControlPage_51,
                    onPress: function () {
                      module389.closeCurrentPage();
                    },
                  },
                ]);
              globals.showToast(module491.map_object_ignore_failed);
            })
            .finally(function () {
              var n;
              if (t.globalLoadingView) null == (n = t.globalLoadingView) || null == n.hide || n.hide();
            });
        },
      },
      {
        key: 'requestLoadMap',
        value: function (t) {
          var n = this;

          if (!this.isLoadingMap) {
            this.isLoadingMap = true;
            this.modalMapEditMenu.hide(function () {
              var t;
              if (!(null == (t = n.globalLoadingView))) t.showWithText();
            });
            this.dataProvider
              .loadMap(t)
              .then(function (t) {
                if (n.state.multiFloorFeatureEnabled) {
                  module1229.MM.getMap(true);
                  module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                    data: module411.EventKeys.MapSegmentsDidChange,
                    sender: n,
                  });
                } else {
                  module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                    data: module411.EventKeys.MapSegmentsDidChange,
                    sender: n,
                  });
                  module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                    data: module411.EventKeys.SegmentCustomModeDidChange,
                  });
                }

                module12.DeviceEventEmitter.emit(module411.NotificationKeys.MapManualReset);
                n.props.navigation.popToTop();
              })
              .catch(function (o) {
                if (n.state.multiFloorFeatureEnabled) globals.showToast(module491.map_object_ignore_failed);
                else if (o.data && o.data.result && 'unknown_method' == o.data.result) {
                  var l = {
                    text: module491.localization_strings_Setting_RemoteControlPage_51,
                    onPress: function () {
                      module389.closeCurrentPage();
                    },
                  };
                  globals.Alert.alert(module491.plugin_need_update, '', [l]);
                } else globals.showToast(module491.map_object_ignore_failed);
                n.modalMapEditMenu.show();
                n.setState({
                  currentMapId: t,
                });
              })
              .finally(function () {
                var t;
                n.isLoadingMap = false;
                if (n.globalLoadingView) null == (t = n.globalLoadingView) || null == t.hide || t.hide();
              });
          }
        },
      },
      {
        key: 'requestDeleteMap',
        value: function (t) {
          var n = this;
          if (this.globalLoadingView) this.globalLoadingView.showWithText();
          this.dataProvider
            .deleteMap(t)
            .then(function (o) {
              var l = n.state.items.filter(function (n) {
                return n.id !== t;
              });
              n.setState({
                items: l,
              });
              if (n.state.multiFloorFeatureEnabled) module1229.MM.getMultiMaps();
              else {
                module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                  data: module411.EventKeys.MapSegmentsDidChange,
                  sender: n,
                });
                module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                  data: module411.EventKeys.SegmentCustomModeDidChange,
                });
              }
            })
            .catch(function (t) {
              if (t.data && t.data.result && 'unknown_method' == t.data.result) {
                var n = {
                  text: module491.localization_strings_Setting_RemoteControlPage_51,
                  onPress: function () {
                    module389.closeCurrentPage();
                  },
                };
                globals.Alert.alert(module491.plugin_need_update, '', [n]);
              } else globals.showToast(module491.map_object_ignore_failed);
            })
            .finally(function () {
              var t;
              if (n.globalLoadingView) null == (t = n.globalLoadingView) || null == t.hide || t.hide();
            });
        },
      },
      {
        key: 'fetchMapData',
        value: function (t) {
          var n = this,
            o = this.dataProvider.getMapData(t),
            l = this.mapDataRequests.find(function (n) {
              return n.id == t;
            });
          if (-1 == l)
            this.mapDataRequests.append({
              id: l,
              req: o,
            });
          else
            this.mapDataRequests[l] = {
              id: l,
              req: o,
            };
          o.then(function (o) {
            var l = base64js.toByteArray(o),
              s = module1339(l, globals.app.state.theme != module507.Themes.light);
            if (!(s.map && s.map.width && s.map.height)) s = '';
            var u = n.state.items.map(function (n) {
              if (n.id == t) n.mapData = s;
              return n;
            });
            n.setState({
              items: u,
            });
          }).catch(function (o) {
            if (!o.isCanceled) {
              var l = n.state.items.map(function (n) {
                if (n.id == t) n.mapData = '';
                return n;
              });
              n.setState({
                items: l,
              });
            }
          });
        },
      },
      {
        key: 'loadEditingMap',
        value: function (t) {
          var n = this;
          return new Promise(function (o, l) {
            if (t != module377.RSM.currentMapId)
              module377.RSM.isRunning
                ? l(Q)
                : n.isLoadingMap
                ? l(G)
                : ((n.isLoadingMap = true),
                  n.globalLoadingView && n.globalLoadingView.showWithText(),
                  n.dataProvider
                    .loadMap(t)
                    .then(function (o) {
                      n.mapUpdated = false;
                      module1229.MM.getMap(true);
                      return n.checkMapUpdated(t);
                    })
                    .then(function () {
                      if (n.state.multiFloorFeatureEnabled)
                        module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                          data: module411.EventKeys.MapSegmentsDidChange,
                          sender: n,
                        });
                      else {
                        module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                          data: module411.EventKeys.MapSegmentsDidChange,
                          sender: n,
                        });
                        module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                          data: module411.EventKeys.SegmentCustomModeDidChange,
                        });
                      }
                      module12.DeviceEventEmitter.emit(module411.NotificationKeys.MapManualReset);
                      o();
                    })
                    .catch(function (t) {
                      l(t);
                    })
                    .finally(function () {
                      var t;
                      n.isLoadingMap = false;
                      if (n.globalLoadingView) null == (t = n.globalLoadingView) || null == t.hide || t.hide();
                    }));
            else o();
          });
        },
      },
      {
        key: 'onToggleMapSaveSwitchItem',
        value: function (t) {
          var n = this,
            o = function () {
              n.setState(
                {
                  mapSaveEnabled: t,
                },
                function () {
                  if (t) {
                    n.setState({
                      items: [],
                    });
                    n.requestMapSaveSwitch(t);
                  } else {
                    var o = {
                        text: module491.localization_strings_Main_MainPage_11,
                        onPress: function () {
                          module383.LogEventCommon('close_map_save_alert_cancel');
                          n.setState({
                            mapSaveEnabled: true,
                          });
                        },
                      },
                      l = {
                        text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          n.requestMapSaveSwitch(t);
                        },
                      };
                    globals.Alert.alert(module491.map_edit_map_lab_close_warn, '', [o, l]);
                  }
                }
              );
            };

          if (t) o();
          else
            module1259
              .showFinishCurrentTastAlertIfNeeded()
              .then(function () {
                o();
              })
              .catch(function (t) {
                globals.showToast(module491.robot_communication_exception);
              });
        },
      },
      {
        key: 'onTapMultiFloorSwitchItem',
        value: function () {
          if (module377.RSM.isRunning)
            module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module491.robot_communication_exception);
            });
          else
            this.props.navigation.navigate('MultiFloorSwitch', {
              title: module491.floor_pattern,
            });
        },
      },
      {
        key: 'onTapCreateNewMapItem',
        value: function () {
          if (module377.RSM.isRunning)
            module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module491.robot_communication_exception);
            });
          else this.multiMapSwitchItem.show();
        },
      },
      {
        key: 'onTapCreateNewMapConfirm',
        value: function () {
          var t = this,
            n = {
              text: module491.localization_strings_Main_MainPage_11,
            },
            o = {
              text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                return t.dataProvider.stopRobot();
              },
            };
          if ((this.multiMapSwitchItem.dismissModalView(), module377.RSM.isRunning)) globals.Alert.alert(module491.start_create_new_map_title, '', [n, o]);
          else {
            if (this.globalLoadingView) this.globalLoadingView.showWithText();
            var l = 0;
            this.dataProvider
              .createNewMap()
              .then(function () {
                t.createMapLoopChecker = setInterval(function () {
                  var n, o;

                  if (l > 50) {
                    if (t.createMapLoopChecker) clearInterval(t.createMapLoopChecker);
                    if (!(null == (n = t.globalLoadingView) || null == n.hide)) n.hide();
                    return void globals.showToast(module491.map_reset_page_operate_fail);
                  }

                  if (module377.RSM.isRunning) {
                    if (t.createMapLoopChecker) clearInterval(t.createMapLoopChecker);
                    if (!(null == (o = t.globalLoadingView) || null == o.hide)) o.hide();
                    t.props.navigation.popToTop();
                  } else l++;
                }, 100);
              })
              .catch(function (n) {
                var o;
                console.log('Error: ' + n);
                if (!(null == (o = t.globalLoadingView) || null == o.hide)) o.hide();
                globals.showToast(module491.map_object_ignore_failed);
              });
            module383.LogEventStat(module383.LogEventMap.MultiMapCreateNewMap);
          }
        },
      },
      {
        key: 'onTapEmptyMapItemSave',
        value: function () {
          var t = this,
            n = {
              text: module491.continue_save,
              color: '#007AFF',
              onPress: function () {
                module383.LogEventCommon('save_map_confirm');
                t.onTapManualSaveConfirm();
              },
            },
            o = {
              text: module491.map_edit_no_save,
              onPress: function () {
                module383.LogEventCommon('save_map_cancel');
              },
            };
          globals.Alert.alert('', module491.manual_saving_map_popup_title, [o, n]);
        },
      },
      {
        key: 'onTapSingleEmptyMapItemDelete',
        value: function () {
          var t = this,
            n = {
              text: module491.localization_strings_Main_MainPage_11,
            },
            o = {
              text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                t.onTapResetMapConfirm();
              },
            };
          globals.Alert.alert(module491.map_edit_map_edit_reset_remind, '', [n, o]);
        },
      },
      {
        key: 'onTapResetMapConfirm',
        value: function () {
          this.requestResetMap();
        },
      },
      {
        key: 'onTapManualSaveConfirm',
        value: function () {
          if (((module377.RSM.mapSaveEnabled && !module377.RSM.multiFloorEnabled) || module377.RSM.multiFloorEnabled) && 0 == module1229.MM.maps.length)
            this.requestSaveMap(module377.RSM.currentMapId);
          else if (module377.RSM.multiFloorEnabled) this.multiFloorSaveNewMapActionSheet.show();
          else this.singleFloorSaveNewMapActionSheet.show();
        },
      },
      {
        key: 'onTapSingleFloorSaveActionSheet',
        value: function (t) {
          var n = this;
          this.singleFloorSaveNewMapActionSheet.hide(function () {
            if (t == module1229.CurrentMapId) n.singleFloorSaveNewMapAlert.show();
            else n.requestSaveMap(t);
          });
        },
      },
      {
        key: 'onTapSingleFloorSaveConfirm',
        value: function () {
          if (module377.RSM.isRunning)
            module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module491.robot_communication_exception);
            });
          else this.requestMultiFloorFeature(true);
        },
      },
      {
        key: 'onTapMultiFloorSaveActionSheet',
        value: function (t) {
          var n = this;
          this.multiFloorSaveNewMapActionSheet.hide(function () {
            n.requestSaveMap(t);
          });
        },
      },
      {
        key: 'onTapNameEdit',
        value: function (t) {
          var n = this.state.items.find(function (n) {
              return n.id == t;
            }),
            o = n ? n.name : '';
          this.setState({
            editingNameMap: {
              id: t,
              name: o,
            },
          });
        },
      },
      {
        key: 'onTapGetMapRetry',
        value: function (t) {
          var n = this.state.items.map(function (n) {
            if (n.id == t) n.mapData = null;
            return n;
          });
          this.setState({
            items: n,
          });
          this.fetchMapData(t);
        },
      },
      {
        key: 'onTapRoomNameConfirm',
        value: function (t) {
          var n = this;

          if (
            (this.setState({
              editingNameMap: {
                id: null,
                name: null,
              },
            }),
            undefined ==
              this.state.items
                .filter(function (t) {
                  return t.id != n.state.editingNameMap.id;
                })
                .map(function (t) {
                  return t.name;
                })
                .find(function (n) {
                  return n == t;
                }))
          ) {
            var o = module387.default.specEncode(t);

            if ('' != o) {
              var l = module1243.FloorMapPageUtils.getRealLength(o);
              if (module1243.FloorMapPageUtils.getRealLength(o) >= 30) globals.showToast(module491.floor_map_name_too_long);
              else this.requestEditingMapName(this.state.editingNameMap.id, o, l);
            }
          } else globals.showToast(module491.name_already_exists);
        },
      },
      {
        key: 'onTapRoomNameCancel',
        value: function () {
          this.setState({
            editingNameMap: {
              id: null,
              name: null,
            },
          });
        },
      },
      {
        key: 'onTapLoadMap',
        value: function (t) {
          var n = this;
          if (this.state.multiFloorFeatureEnabled) {
            if (module377.RSM.isRunning) {
              var o,
                l = {
                  text: module491.localization_strings_Main_MainPage_11,
                },
                s = {
                  text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    if (n.globalLoadingView) n.globalLoadingView.showWithText();
                    n.dataProvider
                      .stopRobot()
                      .then(function () {
                        return module377.RSM.waitUntilStateIsNotLocked().then(function () {
                          n.requestLoadMap(t);
                        });
                      })
                      .catch(function () {
                        var t;
                        if (n.globalLoadingView) null == (t = n.globalLoadingView) || null == t.hide || t.hide();
                      });
                  },
                };
              if (!(null == (o = this.modalMapEditMenu))) o.alert('', module491.ask_if_stop_for_change_map, [l, s]);
            } else {
              this.requestLoadMap(t);
              module383.LogEventStat(module383.LogEventMap.MultiMapMapManagerMap);
            }
          } else {
            var u,
              c = {
                text: module491.localization_strings_Main_MainPage_11,
              },
              p = {
                text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  n.requestLoadMap(t);
                },
              };
            if (!(null == (u = this.modalMapEditMenu))) u.alert(module491.map_reset_page_choose_map_title, '', [c, p]);
          }
        },
      },
      {
        key: 'onTapEditMap',
        value: function (t) {
          if (module377.RSM.isRunning && t != module377.RSM.currentMapId)
            module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module491.robot_communication_exception);
            });
          else {
            this.modalMapEditMenu.show();
            this.setState({
              currentMapId: t,
            });
          }
        },
      },
      {
        key: 'onPressZoneEditButton',
        value: function () {
          var t,
            n,
            o = this;
          if (!(null == (t = (n = this.modalMapEditMenu).hide))) t.call(n);
          this.loadEditingMap(this.state.currentMapId)
            .then(function () {
              o.props.navigation.navigate('MapEditZoneInfoPage', {
                title: module491.map_edit_zone,
              });
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module491.map_reset_page_operate_fail);
              else
                module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module491.robot_communication_exception);
                });
            });
        },
      },
      {
        key: 'onPressVirtualWallAndForbiddenZoneButton',
        value: function () {
          var t,
            n,
            o = this;
          if (!(null == (t = (n = this.modalMapEditMenu).hide))) t.call(n);
          this.loadEditingMap(this.state.currentMapId)
            .then(function () {
              o.props.navigation.navigate('MapEditForbiddenZonePage', {
                title: module491.map_edit_virtual_wall_and_forbidden_zone,
              });
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module491.map_reset_page_operate_fail);
              else
                module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module491.robot_communication_exception);
                });
            });
        },
      },
      {
        key: 'onPressCustomModeButton',
        value: function () {
          var t,
            n,
            o = this;
          if (!(null == (t = (n = this.modalMapEditMenu).hide))) t.call(n);
          this.loadEditingMap(this.state.currentMapId)
            .then(function () {
              o.props.navigation.navigate('MapEditZoneModePage', {
                action: 'custom',
                title: module491.map_edit_bottom_menu_mode,
              });
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module491.map_reset_page_operate_fail);
              else
                module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module491.robot_communication_exception);
                });
            });
        },
      },
      {
        key: 'checkMapUpdated',
        value: function (t) {
          var n = this;
          return new Promise(function (o, l) {
            var s = 0,
              u = setInterval(function () {
                if (s > 15) {
                  clearInterval(u);
                  l();
                }

                if (n.mapUpdated && module377.RSM.currentMapId == t) {
                  clearInterval(u);
                  console.log('MMM: Checked');
                  o();
                } else s++;
              }, 300);
          });
        },
      },
      {
        key: 'onPressCustomOrderButton',
        value: function () {
          var t,
            n,
            o = this;
          if (!(null == (t = (n = this.modalMapEditMenu).hide))) t.call(n);
          this.loadEditingMap(this.state.currentMapId)
            .then(function () {
              o.props.navigation.navigate('MapEditZoneOrderPage', {
                action: 'order',
                title: module491.map_edit_bottom_menu_order,
              });
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module491.map_reset_page_operate_fail);
              else
                module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module491.robot_communication_exception);
                });
            });
        },
      },
      {
        key: 'onPressCarpetEditButton',
        value: function () {
          var t,
            n,
            o = this;
          if (!(null == (t = (n = this.modalMapEditMenu).hide))) t.call(n);
          this.loadEditingMap(this.state.currentMapId)
            .then(function () {
              o.props.navigation.navigate('MapCarpetIgnorePage', {
                action: module386.default.isMapCarpetAddSupport()
                  ? module377.CarpetEditMode.CarpetIgnore | module377.CarpetEditMode.CarpetAdd
                  : module377.CarpetEditMode.CarpetIgnore,
                title: module491.map_edit_carpet_ignore_title,
              });
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module491.map_reset_page_operate_fail);
              else
                module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module491.robot_communication_exception);
                });
            });
        },
      },
      {
        key: 'onPressRotateMapButton',
        value: function () {
          var t,
            n,
            o = this;
          if (!(null == (t = (n = this.modalMapEditMenu).hide))) t.call(n);
          this.loadEditingMap(this.state.currentMapId)
            .then(function () {
              o.props.navigation.navigate('MapEditRotateView', {
                title: module491.map_edit_rotate_map_title,
              });
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module491.map_reset_page_operate_fail);
              else
                module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module491.robot_communication_exception);
                });
            });
        },
      },
      {
        key: 'onPressFurnitureEditButton',
        value: function () {
          var t,
            n,
            o = this;
          if (!(null == (t = (n = this.modalMapEditMenu).hide))) t.call(n);
          this.loadEditingMap(this.state.currentMapId)
            .then(function () {
              o.props.navigation.navigate('MapEditFurnitureView', {
                title: module491.map_edit_furniture_title,
              });
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module491.map_reset_page_operate_fail);
              else
                module1259.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module491.robot_communication_exception);
                });
            });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            l = React.default.createElement(module1798.default, {
              contentBackgroundColor: 'transparent',
              ref: function (n) {
                t.modalMapEditMenu = n;
              },
              onClose: function () {
                if (!(null == t.modalMapEditMenu.hide)) t.modalMapEditMenu.hide();
              },
              mode: module1798.ModalMapEditMenuMode.MapManagement,
              editingId: this.state.currentMapId,
              parent: this,
              onPressEditZoneButton: this.onPressZoneEditButton.bind(this),
              onPressVirtualWallButton: this.onPressVirtualWallAndForbiddenZoneButton.bind(this),
              onPressCustomModeButton: this.onPressCustomModeButton.bind(this),
              onPressCustomOrderButton: this.onPressCustomOrderButton.bind(this),
              onPressCarpetEditButton: this.onPressCarpetEditButton.bind(this),
              onPressRotateMapButton: this.onPressRotateMapButton.bind(this),
              onPressFurnitureEditButton: this.onPressFurnitureEditButton.bind(this),
              onEditingMapNameSuccess: function (n, o) {
                var l =
                  t.state.items &&
                  t.state.items.map(function (t) {
                    if (t.id == n) t.name = module1243.FloorMapPageUtils.getRealName(o);
                    return t;
                  });
                t.setState({
                  items: l,
                });
              },
              onDeleteMapSuccess: function () {
                return null == t.modalMapEditMenu.hide ? undefined : t.modalMapEditMenu.hide();
              },
              onTapLoadMap: this.onTapLoadMap.bind(this),
              showRecoverButton:
                (this.state.multiFloorFeatureEnabled && this.state.isCurrentMapRestoreEnabled) ||
                this.state.currentMapId != module377.RSM.currentMapId ||
                !this.state.multiFloorFeatureEnabled,
              isTitleViewHidden: true,
              paddingBottom: 0,
              toastHandler: function (n) {
                t.modalMapEditMenu.showToast(n);
              },
              alertHandler: function (n, o, l) {
                t.modalMapEditMenu.alert(n, o, l);
              },
            }),
            s = this.state.multiFloorFeatureEnabled && this.state.mapSaveEnabled,
            u = this.state.multiFloorFeatureEnabled && !this.state.mapSaveEnabled,
            c = {
              title: module491.map_edit_map_lab_save_map,
              bottomDetail: module491.map_edit_map_lab_save_map_des,
              bottomDetailWidth: H - 40,
              shouldShowSwitch: true,
              switchOn: this.state.mapSaveEnabled,
              switchValueChanged: function (n) {
                return t.onToggleMapSaveSwitchItem.apply(t, [n]);
              },
              visible: true,
              funcId: 'multifloor_mapsave',
              shouldShowTopLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: !(s || u),
              switchMarginTop: 0,
            },
            M = {
              title: module491.floor_pattern,
              shouldShowRightArrow: true,
              detail: this.state.multiFloorEnabled ? module491.multi_floor_pattern : module491.single_floor_pattern,
              funcId: 'multifloor_switch_item',
              onPress: function () {
                return t.onTapMultiFloorSwitchItem.apply(t, []);
              },
              visible: true,
              shouldShowTopLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: true,
            },
            v = React.default.createElement(
              module12.View,
              {
                style: {
                  width: H,
                  marginTop: 1,
                  borderRadius: 2,
                },
              },
              React.default.createElement(
                module381.SettingListItemView,
                module21.default({}, c, {
                  key: 0,
                  fontSize: 16,
                  style: {
                    width: module12.Dimensions.get('window').width,
                  },
                  shouldShowBottomLine: s || u,
                  shouldShowTopLongLine: true,
                })
              )
            ),
            C = React.default.createElement(
              module12.View,
              {
                style: {
                  width: H,
                  marginTop: 0,
                  borderRadius: 2,
                },
              },
              React.default.createElement(
                module381.SettingListItemView,
                module21.default({}, M, {
                  key: 0,
                  fontSize: 16,
                  style: {
                    width: module12.Dimensions.get('window').width,
                  },
                  shouldShowBottomLine: false,
                  detailWidth: 140,
                  shouldShowBottomLongLine: true,
                })
              )
            ),
            R = React.default.createElement(
              module12.View,
              {
                style: [
                  X.middle,
                  {
                    backgroundColor: o.componentBackgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    X.content,
                    {
                      color: o.multiFloor.howToSaveMapTitleColor,
                    },
                  ],
                },
                module491.how_to_save_map
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    X.content2,
                    {
                      color: o.multiFloor.howToSaveMapContentColor,
                    },
                  ],
                },
                module491.first_map_handler
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    X.content2,
                    {
                      color: o.multiFloor.howToSaveMapContentColor,
                    },
                  ],
                },
                module491.multi_map_handler
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    X.content2,
                    {
                      color: o.multiFloor.howToSaveMapContentColor,
                    },
                  ],
                },
                module491.manual_save_handler
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    X.content,
                    {
                      color: o.multiFloor.howToSaveMapTitleColor,
                    },
                  ],
                },
                module491.attention_on_multi_map
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    X.content2,
                    {
                      color: o.multiFloor.howToSaveMapContentColor,
                    },
                  ],
                },
                module491.map_edit_map_lab_save_map_kindly_remind3
              )
            ),
            D = this.state.mapSaveEnabled,
            k =
              this.state.items &&
              this.state.items.map(function (n, o) {
                return React.default.createElement(module1934.default, {
                  key: o,
                  mapID: n.id,
                  name: n.name,
                  mapTime: n.time,
                  showRecoverButton:
                    (t.state.multiFloorFeatureEnabled && t.state.isCurrentMapRestoreEnabled) || n.id != module377.RSM.currentMapId || !t.state.multiFloorFeatureEnabled,
                  showDeleteButton: t.state.multiFloorFeatureEnabled || (!t.state.multiFloorFeatureEnabled && module377.RobotStatusManager.sharedManager().isSupportFeature(113)),
                  showNameEditButton: t.state.multiFloorFeatureEnabled,
                  onTapEditMap: function (n) {
                    return t.onTapEditMap.apply(t, [n]);
                  },
                  onTapRetry: function (n) {
                    return t.onTapGetMapRetry.apply(t, [n]);
                  },
                  mapData: n.mapData,
                });
              }),
            V = s && this.state.items && this.state.multiFloorFeatureEnabled,
            N = React.default.createElement(module1935.default, {
              ref: function (n) {
                return (t.emptyMapView = n);
              },
              hasMap: this.state.items && 0 != this.state.items.length,
              onTapSaveButton: function () {
                return t.onTapEmptyMapItemSave.apply(t, []);
              },
            }),
            x = !this.state.multiFloorFeatureEnabled,
            B = React.default.createElement(module1935.SingleMapEmptyMapItem, {
              name: module491.reset_map_main_title,
              onTapDeleteButton: function () {
                return t.onTapSingleEmptyMapItemDelete.apply(t, []);
              },
            }),
            q = this.state.mapSaveEnabled && this.state.items && 0 == this.state.items.length,
            K = this.state.multiFloorEnabled && this.state.mapSaveEnabled && this.state.items && this.state.items.length < 4,
            W = (q || K) && this.state.multiFloorFeatureEnabled,
            O = React.default.createElement(
              module12.View,
              module21.default({}, module387.default.getAccessibilityLabel('new_map_entrance_in_mulitMap'), {
                style: [
                  X.newMapEntranceStyle,
                  {
                    backgroundColor: o.componentBackgroundColor,
                    borderTopWidth: 0.8,
                    borderBottomWidth: 0.8,
                    borderColor: o.settingListItem.borderColor,
                  },
                ],
              }),
              React.default.createElement(
                module12.TouchableOpacity,
                {
                  style: X.addNewMap,
                  onPress: function () {
                    module383.LogEventCommon('click_create_new_map');
                    t.onTapCreateNewMapItem.apply(t, []);
                  },
                },
                React.default.createElement(module1265, {
                  source: o.multiFloor.createMapImg,
                  style: {
                    width: 40,
                    height: 40,
                    overflow: 'visible',
                  },
                })
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: X.addNewMapFont,
                },
                this.state.multiFloorEnabled ? module491.new_map_entrance_in_multiMap_2 : module491.new_map_entrance_in_multiMap_0
              )
            ),
            U = React.default.createElement(module381.InputDialog, {
              visible: null != this.state.editingNameMap.id,
              title: module491.set_map_name,
              inputPlaceholder: module491.please_input_map_name,
              inputDefaultValue: this.state.editingNameMap.name,
              warningText: module491.floor_map_name_too_long,
              onPressConfirmButton: function (n) {
                return t.onTapRoomNameConfirm.apply(t, [n]);
              },
              onPressCancelButton: function () {
                return t.onTapRoomNameCancel.apply(t, []);
              },
              warningVisibilityAdapter: function (t) {
                return !module1243.FloorMapPageUtils.isLengthValid(t);
              },
            }),
            G = React.default.createElement(module1806.default, {
              ref: function (n) {
                t.multiMapSwitchItem = n;
              },
              isModal: true,
              parent: this,
              bgImage: o.guideImages.createMap,
              topTitle: module491.multi_map_start_build_title,
              context: module491.multi_map_start_build_text_1 + '\n' + module491.multi_map_start_build_text_2 + '\n' + module491.multi_map_start_build_text_3,
              buttonInfo: [module491.localization_strings_Main_MainPage_11, module491.confirm_start],
              buttonFuncId: ['multi_map_left', 'multi_map_right'],
              onPressGoSetting: function () {
                return t.onTapCreateNewMapConfirm.apply(t, []);
              },
            }),
            Q = React.default.createElement(module1231.MultiFloorEnableTipsView, {
              ref: function (n) {
                t.qaContentView = n;
              },
            }),
            J = this.state.mapSaveEnabled && this.state.items && this.state.items.length >= 4,
            Y = React.default.createElement(
              module12.View,
              {
                style: {
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: Z,
                  height: 30,
                },
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    fontSize: 12,
                    color: o.subTextColor,
                  },
                },
                module491.multi_map_reach_max
              )
            ),
            $ = React.default.createElement(module1241.MapSaveActionSheetView, {
              ref: function (n) {
                return (t.singleFloorSaveNewMapActionSheet = n);
              },
              mode: module1241.MapSaveActionSheetMode.SaveNewMapInSingleFloor,
              handleSaveMap: function (n) {
                return t.onTapSingleFloorSaveActionSheet.apply(t, [n]);
              },
            }),
            ee = React.default.createElement(module1241.MapSaveActionSheetView, {
              ref: function (n) {
                return (t.multiFloorSaveNewMapActionSheet = n);
              },
              handleSaveMap: function (n) {
                return t.onTapMultiFloorSaveActionSheet.apply(t, [n]);
              },
            }),
            te = React.default.createElement(module1933.SingleFloorSaveNewMapAlert, {
              ref: function (n) {
                return (t.singleFloorSaveNewMapAlert = n);
              },
              onPressConfirm: function () {
                return t.onTapSingleFloorSaveConfirm.apply(t, []);
              },
            }),
            ae = React.default.createElement(
              module12.View,
              {
                style: [
                  X.container,
                  {
                    backgroundColor: 'transparent',
                  },
                ],
              },
              React.default.createElement(module381.CancelableLoadingView, {
                loadingAccessibilityLabelKey: 'multi_floor_view_loading',
                closeAccessibilityLabelKey: 'multi_floor_view_loading_close',
                ref: function (n) {
                  t.globalLoadingView = n;
                },
                showButton: true,
                onPressCancel: function () {
                  t.props.navigation.pop();
                },
              })
            ),
            ne = React.default.createElement(
              module12.View,
              {
                style: [
                  X.container,
                  {
                    backgroundColor: globals.app.state.theme.settingBackgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ],
              },
              React.default.createElement(module381.Spinner, null)
            );
          return this.state.dataInitialized
            ? React.default.createElement(
                module12.View,
                {
                  style: {
                    backgroundColor: o.settingBackgroundColor,
                    flex: 1,
                  },
                },
                this.state.items
                  ? React.default.createElement(
                      module12.ScrollView,
                      {
                        style: {
                          backgroundColor: o.settingBackgroundColor,
                        },
                        contentContainerStyle: {
                          paddingTop: 10,
                          paddingBottom: 20,
                          minHeight: j,
                        },
                        showsVerticalScrollIndicator: false,
                        refreshControl: React.default.createElement(module12.RefreshControl, {
                          refreshing: this.state.refreshing,
                          onRefresh: function () {
                            return t.pullToRefresh();
                          },
                        }),
                      },
                      v,
                      s && C,
                      u && R,
                      V && N,
                      x && B,
                      D && k,
                      W && O,
                      J && Y
                    )
                  : React.default.createElement(module12.View, null),
                G,
                Q,
                U,
                $,
                ee,
                te,
                l,
                ae
              )
            : ne;
        },
      },
    ]);
    return q;
  })(React.default.Component);

exports.default = J;
J.defaultProps = {};
J.contextType = module506.AppConfigContext;
var X = module12.StyleSheet.create({
  newMapEntranceStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: H,
    backgroundColor: 'white',
    marginTop: 10,
    height: 154,
  },
  addNewMap: {},
  addNewMapFont: {
    fontSize: 14,
    color: 'rgba(93, 92, 93, 1)',
    marginTop: 15,
  },
  middle: {
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    width: H,
    paddingBottom: 20,
    borderRadius: 2,
  },
  content: {
    color: 'rgba(0, 0, 0, 0.8)',
    marginTop: 20,
    fontSize: 14,
    lineHeight: 24,
    alignSelf: 'stretch',
  },
  content2: {
    color: 'rgba(0, 0, 0, 0.4)',
    marginTop: 8,
    fontSize: 14,
    lineHeight: 24,
    alignSelf: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: module934.NavigationBarHeight,
  },
  confirmButton: {
    marginLeft: 14,
    marginRight: 14,
    alignSelf: 'center',
  },
});

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module418 = require('./418'),
  module1329 = require('./1329'),
  module387 = require('./387'),
  module381 = require('./381'),
  module1395 = require('./1395'),
  module1330 = require('./1330'),
  module391 = require('./391'),
  module390 = require('./390'),
  module1800 = require('./1800'),
  module1801 = require('./1801'),
  module1397 = require('./1397'),
  module1797 = require('./1797'),
  module1796 = require('./1796'),
  module515 = require('./515'),
  module1802 = require('./1802'),
  module516 = require('./516'),
  module1391 = require('./1391'),
  module414 = require('./414'),
  module422 = require('./422'),
  module1803 = require('./1803');

function q(t) {
  var n = K();
  return function () {
    var o,
      l = module11.default(t);

    if (n) {
      var s = module11.default(this).constructor;
      o = Reflect.construct(l, arguments, s);
    } else o = l.apply(this, arguments);

    return module9.default(this, o);
  };
}

function K() {
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
  module1153 = require('./1153'),
  module393 = require('./393'),
  module1428 = require('./1428'),
  base64js = require('base64-js'),
  module1487 = require('./1487').parseSync,
  module389 = require('./389'),
  Z = -100,
  Q = -101,
  J = (function (t) {
    module7.default(p, t);
    var n = q(p);

    function p(t) {
      var o;
      module4.default(this, p);
      (o = n.call(this, t)).dataProvider = module390.default.isMultiFloorSupported() ? new module1797.MultiMapDataProvider() : new module1797.SingleMapDataProvider();
      o.mapListRequest = null;
      o.mapDataRequests = [];
      o.unMount = false;
      o.state = {
        mapSaveEnabled: module381.RSM.mapSaveEnabled,
        multiFloorFeatureEnabled: module390.default.isMultiFloorSupported(),
        multiFloorEnabled: module381.RSM.multiFloorEnabled,
        items: null,
        isCurrentMapRestoreEnabled: module390.default.isCurrentMapRestoreEnabled(),
        editingNameMap: {
          id: null,
          name: null,
        },
        refreshing: false,
        dataInitialized: false,
      };
      return o;
    }

    module5.default(p, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          module1329.MM.shouldForceStart = true;
          module1329.MM.start();
          this.registListeners();
          this.requestMaps(true, true);
          var n = this.state.multiFloorFeatureEnabled
            ? React.default.createElement(module385.PureImageButton, {
                funcId: 'multi_map_q_a',
                style: Y.confirmButton,
                image: this.context.theme.navQuestionIcon,
                onPress: function () {
                  var n;
                  if (!(null == (n = t.qaContentView)))
                    n.setState({
                      shouldShow: true,
                    });
                },
                imageStyle: {
                  resizeMode: 'contain',
                  width: 30,
                  height: 30,
                },
              })
            : null;
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            title: module500.map_edit_title,
            rightItems: [n],
            hiddenBottomLine: true,
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
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.reloadDataIfNeeded();
          });
          this.multiMapsListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.sender != t) {
              if (n.data == module418.EventKeys.MultiMapsDidReceive) t.reloadDataIfNeeded();

              if (
                !(
                  n.data != module418.EventKeys.MapSegmentsDidChange &&
                  n.data != module418.EventKeys.FBZSettingsDidChange &&
                  n.data != module418.EventKeys.CurrentMapDidChange &&
                  n.data != module418.EventKeys.MapDidRotate
                )
              ) {
                t.requestMaps(false);
                t.reloadEmptyMapViewIfNeeded();
              }

              if (n.data == module418.EventKeys.CurrentMapDidChange) module1329.MM.getMultiMaps();
            }
          });
          this.mapUpdateListener = module12.DeviceEventEmitter.addListener(module418.NotificationKeys.MapDidUpdate, function (n) {
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
            if (module381.RSM.multiFloorEnabled != this.state.multiFloorEnabled) {
              if (!module381.RSM.multiFloorEnabled) this.requestMaps(false);
              this.setState({
                multiFloorEnabled: module381.RSM.multiFloorEnabled,
              });
            } else this.reloadEmptyMapViewIfNeeded();

            this.setState({
              isCurrentMapRestoreEnabled: module390.default.isCurrentMapRestoreEnabled(),
            });
          }
        },
      },
      {
        key: 'reloadEmptyMapViewIfNeeded',
        value: function () {
          var t,
            n,
            o = module381.RSM.mapStatus != module381.MapStatus.None,
            l = -1 == module381.RSM.currentMapId,
            s = this.emptyMapView.state.hasCurrentMap,
            u = this.emptyMapView.state.isNewMap,
            c = this.state.items && this.state.items.length > 0;
          this.emptyMapView.setState({
            isRunning: module381.RSM.isRunning,
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
                      text: module500.localization_strings_Setting_RemoteControlPage_51,
                      onPress: function () {
                        module393.closeCurrentPage();
                      },
                    };
                    globals.Alert.alert(module500.plugin_need_update, '', [n]);
                  } else globals.showToast(module500.robot_communication_exception);
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
                module387.LogEventStatus('map_count', {
                  count: null != (l = null == (s = null != n ? n : []) ? undefined : s.length) ? l : 0,
                });
              t.setState({
                items: n,
              });
              module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                data: module418.EventKeys.MultiMapsDidReceive,
                sender: t,
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
                    text: module500.localization_strings_Setting_RemoteControlPage_51,
                    onPress: function () {
                      module393.closeCurrentPage();
                    },
                  };
                  globals.Alert.alert(module500.plugin_need_update, '', [s]);
                } else globals.showToast(module500.robot_communication_exception);
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
          var t,
            n,
            o = this,
            l = null != (t = null == (n = this.state.items) ? undefined : n.length) ? t : 0,
            s = 0,
            u = setInterval(function () {
              if (s != l) {
                o.fetchMapData(o.state.items[s].id);
                s += 1;
              } else clearInterval(u);
            }, 50);
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
              module387.LogEventStatus('map_save_switch', {
                on: t,
              });
            })
            .catch(function (t) {
              if (-3 != t.data.error && -10005 != t.data.error.code && -10005 != t.data.error) globals.showToast(module500.robot_communication_exception);
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
              if (module393.isMiApp) n.requestMaps(false);
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
              return n.dataProvider.manualSegmentMap(module1329.CurrentMapId);
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
          if ((this.globalLoadingView && this.globalLoadingView.showWithText(), null == (l = this.dataProvider) ? undefined : l.editMapName)) {
            if (!(null == (s = (u = this.dataProvider).editMapName)))
              s.call(u, t, n, o)
                .then(function (o) {
                  var l =
                    p.state.items &&
                    p.state.items.map(function (o) {
                      if (o.id == t) o.name = module1397.FloorMapPageUtils.getRealName(n);
                      return o;
                    });
                  p.setState({
                    items: l,
                  });
                  module1329.MM.getMultiMaps();
                })
                .catch(function (t) {
                  globals.showToast(module500.naming_failed);
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
              globals.showToast(module500.map_reset_page_operate_success);
              module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                data: module418.EventKeys.MapSegmentsDidChange,
                sender: t,
              });
              module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                data: module418.EventKeys.SegmentCustomModeDidChange,
              });
              t.props.navigation.pop();
            })
            .catch(function (t) {
              if (t.data && t.data.result && 'unknown_method' == t.data.result)
                globals.Alert.alert(module500.plugin_need_update, '', [
                  {
                    text: module500.localization_strings_Setting_RemoteControlPage_51,
                    onPress: function () {
                      module393.closeCurrentPage();
                    },
                  },
                ]);
              globals.showToast(module500.map_object_ignore_failed);
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
                  module1329.MM.getMap(true);
                  module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                    data: module418.EventKeys.MapSegmentsDidChange,
                    sender: n,
                  });
                } else {
                  module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                    data: module418.EventKeys.MapSegmentsDidChange,
                    sender: n,
                  });
                  module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                    data: module418.EventKeys.SegmentCustomModeDidChange,
                  });
                }

                module12.DeviceEventEmitter.emit(module418.NotificationKeys.MapManualReset);
                n.props.navigation.popToTop();
              })
              .catch(function (o) {
                if (n.state.multiFloorFeatureEnabled) globals.showToast(module500.map_object_ignore_failed);
                else if (o.data && o.data.result && 'unknown_method' == o.data.result) {
                  var l = {
                    text: module500.localization_strings_Setting_RemoteControlPage_51,
                    onPress: function () {
                      module393.closeCurrentPage();
                    },
                  };
                  globals.Alert.alert(module500.plugin_need_update, '', [l]);
                } else globals.showToast(module500.map_object_ignore_failed);
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
              if (n.state.multiFloorFeatureEnabled) module1329.MM.getMultiMaps();
              else {
                module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                  data: module418.EventKeys.MapSegmentsDidChange,
                  sender: n,
                });
                module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                  data: module418.EventKeys.SegmentCustomModeDidChange,
                });
              }
            })
            .catch(function (t) {
              if (t.data && t.data.result && 'unknown_method' == t.data.result) {
                var n = {
                  text: module500.localization_strings_Setting_RemoteControlPage_51,
                  onPress: function () {
                    module393.closeCurrentPage();
                  },
                };
                globals.Alert.alert(module500.plugin_need_update, '', [n]);
              } else globals.showToast(module500.map_object_ignore_failed);
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
          var n,
            o,
            s,
            u = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    n = this.dataProvider.getMapData(t);
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.ARMapPathPrefixKey + '_' + t));

                  case 3:
                    o = c.sent;
                    if (
                      -1 ==
                      (s = this.mapDataRequests.find(function (n) {
                        return n.id == t;
                      }))
                    )
                      this.mapDataRequests.append({
                        id: s,
                        req: n,
                      });
                    else
                      this.mapDataRequests[s] = {
                        id: s,
                        req: n,
                      };
                    n.then(function (n) {
                      var l = base64js.toByteArray(n),
                        s = module1487(l, globals.app.state.theme != module516.Themes.light);
                      if (!(s.map && s.map.width && s.map.height)) s = '';
                      var c = u.state.items.map(function (n) {
                        if (n.id == t) {
                          n.mapData = s;
                          n.arMapMatchParam = o;
                        }

                        return n;
                      });
                      u.setState({
                        items: c,
                      });
                    }).catch(function (n) {
                      if (!n.isCanceled) {
                        var o = u.state.items.map(function (n) {
                          if (n.id == t) n.mapData = '';
                          return n;
                        });
                        u.setState({
                          items: o,
                        });
                      }
                    });

                  case 7:
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
        key: 'loadEditingMap',
        value: function (t) {
          var n = this;
          return new Promise(function (o, l) {
            if (t != module381.RSM.currentMapId)
              module381.RSM.isRunning
                ? l(Q)
                : n.isLoadingMap
                ? l(Z)
                : ((n.isLoadingMap = true),
                  n.globalLoadingView && n.globalLoadingView.showWithText(),
                  n.dataProvider
                    .loadMap(t)
                    .then(function (o) {
                      n.mapUpdated = false;
                      module1329.MM.getMap(true);
                      return n.checkMapUpdated(t);
                    })
                    .then(function () {
                      if (n.state.multiFloorFeatureEnabled)
                        module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                          data: module418.EventKeys.MapSegmentsDidChange,
                          sender: n,
                        });
                      else {
                        module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                          data: module418.EventKeys.MapSegmentsDidChange,
                          sender: n,
                        });
                        module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                          data: module418.EventKeys.SegmentCustomModeDidChange,
                        });
                      }
                      module12.DeviceEventEmitter.emit(module418.NotificationKeys.MapManualReset);
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
        key: 'backup',
        value: function () {
          var t, n;
          if (null == (t = this.dataProvider) ? undefined : t.backupMap)
            if (module381.RSM.isRunning)
              module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                globals.showToast(module500.robot_communication_exception);
              });
            else {
              var o = {
                text: module500.localization_strings_Setting_RemoteControlPage_51,
              };
              if (!(null == (n = this.dataProvider) || null == n.backupMap))
                n.backupMap(this.state.currentMapId)
                  .then(function (t) {
                    globals.Alert.alert(module500.backup_success_hint, '', [o]);
                    module1329.MM.getMultiMaps();
                  })
                  .catch(function () {
                    globals.showToast(module500.robot_communication_exception);
                  });
            }
        },
      },
      {
        key: 'loadBackupMapView',
        value: function () {
          var t,
            n = this;

          if (null == (t = this.dataProvider) ? undefined : t.recoverMultiMap) {
            this.loadBakMapView.hide();
            globals.Alert.alert('', module500.recover_map_hint, [
              {
                text: module500.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  var t;
                  n.loadBakMapView.hide();
                  if (!(null == (t = n.dataProvider) || null == t.recoverMultiMap))
                    t.recoverMultiMap(n.state.currentMapId)
                      .then(function (t) {
                        module1797.MapListDataProvider.syncSmartSceneIfNeeded();
                        console.log('RecoverMultiMap: Success');
                      })
                      .catch(function (t) {
                        globals.showToast(module500.robot_communication_exception);
                      });
                },
              },
            ]);
          }
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
                        text: module500.localization_strings_Main_MainPage_11,
                        onPress: function () {
                          module387.LogEventCommon('close_map_save_alert_cancel');
                          n.setState({
                            mapSaveEnabled: true,
                          });
                        },
                      },
                      l = {
                        text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          n.requestMapSaveSwitch(t);
                        },
                      };
                    globals.Alert.alert(module500.map_edit_map_lab_close_warn, '', [o, l]);
                  }
                }
              );
            };

          if (t) o();
          else
            module1391
              .showFinishCurrentTastAlertIfNeeded()
              .then(function () {
                o();
              })
              .catch(function (t) {
                globals.showToast(module500.robot_communication_exception);
              });
        },
      },
      {
        key: 'onTapMultiFloorSwitchItem',
        value: function () {
          if (module381.RSM.isRunning)
            module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module500.robot_communication_exception);
            });
          else
            this.props.navigation.navigate('MultiFloorSwitch', {
              title: module500.floor_pattern,
            });
        },
      },
      {
        key: 'onTapCreateNewMapItem',
        value: function () {
          if (module381.RSM.isRunning)
            module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module500.robot_communication_exception);
            });
          else this.multiMapSwitchItem.show();
        },
      },
      {
        key: 'onTapEmptyMapItemSave',
        value: function () {
          var t = this,
            n = {
              text: module500.continue_save,
              color: '#007AFF',
              onPress: function () {
                module387.LogEventCommon('save_map_confirm');
                t.onTapManualSaveConfirm();
              },
            },
            o = {
              text: module500.map_edit_no_save,
              onPress: function () {
                module387.LogEventCommon('save_map_cancel');
              },
            };
          globals.Alert.alert('', module500.manual_saving_map_popup_title, [o, n]);
        },
      },
      {
        key: 'onTapEmptyMapItemDelete',
        value: function () {
          var t = this,
            n = {
              text: module500.localization_strings_Setting_RemoteControlPage_51,
              color: '#007AFF',
              onPress: function () {
                module387.LogEventCommon('delete_map_confirm');
                t.dataProvider
                  .deleteMap(-1)
                  .then(function () {
                    t.reloadDataIfNeeded();
                  })
                  .catch(function (t) {
                    globals.showToast(module500.robot_communication_exception);
                  });
              },
            },
            o = {
              text: module500.localization_strings_Main_MainPage_11,
              onPress: function () {
                module387.LogEventCommon('delete_map_cancel');
              },
            };
          globals.Alert.alert('', module500.delete_map_hint_title, [o, n]);
        },
      },
      {
        key: 'onTapSingleEmptyMapItemDelete',
        value: function () {
          var t = this,
            n = {
              text: module500.localization_strings_Main_MainPage_11,
            },
            o = {
              text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                t.onTapResetMapConfirm();
              },
            };
          globals.Alert.alert(module500.map_edit_map_edit_reset_remind, '', [n, o]);
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
          if (((module381.RSM.mapSaveEnabled && !module381.RSM.multiFloorEnabled) || module381.RSM.multiFloorEnabled) && 0 == module1329.MM.maps.length)
            this.requestSaveMap(module381.RSM.currentMapId);
          else if (module381.RSM.multiFloorEnabled || this.state.multiFloorEnabled) this.multiFloorSaveNewMapActionSheet.show();
          else this.singleFloorSaveNewMapActionSheet.show();
        },
      },
      {
        key: 'onTapSingleFloorSaveActionSheet',
        value: function (t) {
          var n = this;
          this.singleFloorSaveNewMapActionSheet.hide(function () {
            if (t == module1329.CurrentMapId) n.singleFloorSaveNewMapAlert.show();
            else n.requestSaveMap(t);
          });
        },
      },
      {
        key: 'onTapSingleFloorSaveConfirm',
        value: function () {
          if (module381.RSM.isRunning)
            module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module500.robot_communication_exception);
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
            var o = module391.default.specEncode(t);

            if ('' != o) {
              var l = module1397.FloorMapPageUtils.getRealLength(o);
              if (module1397.FloorMapPageUtils.getRealLength(o) >= 30) globals.showToast(module500.floor_map_name_too_long);
              else this.requestEditingMapName(this.state.editingNameMap.id, o, l);
            }
          } else globals.showToast(module500.name_already_exists);
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
            if (module381.RSM.isRunning) {
              var o,
                l = {
                  text: module500.localization_strings_Main_MainPage_11,
                },
                s = {
                  text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    if (n.globalLoadingView) n.globalLoadingView.showWithText();
                    n.dataProvider
                      .stopRobot()
                      .then(function () {
                        return module381.RSM.waitUntilStateIsNotLocked().then(function () {
                          n.requestLoadMap(t);
                        });
                      })
                      .catch(function () {
                        var t;
                        if (n.globalLoadingView) null == (t = n.globalLoadingView) || null == t.hide || t.hide();
                      });
                  },
                };
              if (!(null == (o = this.modalMapEditMenu))) o.alert('', module500.ask_if_stop_for_change_map, [l, s]);
            } else {
              this.requestLoadMap(t);
              module387.LogEventStat(module387.LogEventMap.MultiMapMapManagerMap);
            }
          } else {
            var u,
              c = {
                text: module500.localization_strings_Main_MainPage_11,
              },
              p = {
                text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  n.requestLoadMap(t);
                },
              };
            if (!(null == (u = this.modalMapEditMenu))) u.alert(module500.map_reset_page_choose_map_title, '', [c, p]);
          }
        },
      },
      {
        key: 'onTapEditMap',
        value: function (t) {
          if (module381.RSM.isRunning && t != module381.RSM.currentMapId)
            module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module500.robot_communication_exception);
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
                title: module500.map_edit_zone,
              });
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module500.map_reset_page_operate_fail);
              else
                module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module500.robot_communication_exception);
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
                title: module500.map_edit_virtual_wall_and_forbidden_zone,
              });
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module500.map_reset_page_operate_fail);
              else
                module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module500.robot_communication_exception);
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

                if (n.mapUpdated && module381.RSM.currentMapId == t) {
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
                title: module500.map_edit_bottom_menu_order,
              });
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module500.map_reset_page_operate_fail);
              else
                module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module500.robot_communication_exception);
                });
            });
        },
      },
      {
        key: 'onPressGroundEditButton',
        value: function () {
          var t,
            n,
            o = this;
          if (!(null == (t = (n = this.modalMapEditMenu).hide))) t.call(n);
          this.loadEditingMap(this.state.currentMapId)
            .then(function () {
              o.gotoGroundEditPage();
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module500.map_reset_page_operate_fail);
              else
                module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module500.robot_communication_exception);
                });
            });
        },
      },
      {
        key: 'gotoGroundEditPage',
        value: function () {
          if (module390.default.isSupportFloorEdit() && module390.default.isCarpetSupported())
            this.props.navigation.navigate('MapEditGroundPage', {
              title: module500.map_edit_ground_material_title,
            });
          else if (module390.default.isSupportFloorEdit())
            this.props.navigation.navigate('MapEditFloorMaterialPage', {
              title: module500.map_edit_floor_wood_tile,
            });
          else if (module390.default.isCarpetSupported())
            this.props.navigation.navigate('MapCarpetIgnorePage', {
              action: module390.default.isMapCarpetAddSupport()
                ? module381.CarpetEditMode.CarpetIgnore | module381.CarpetEditMode.CarpetAdd
                : module381.CarpetEditMode.CarpetIgnore,
              title: module500.map_edit_carpet_ignore_title,
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
              o.props.navigation.navigate('MapEditRotatePage', {
                title: module500.map_edit_rotate_map_title,
              });
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module500.map_reset_page_operate_fail);
              else
                module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module500.robot_communication_exception);
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
              o.props.navigation.navigate('MapEditFurniturePage', {
                title: module500.map_edit_furniture_title,
              });
            })
            .catch(function (t) {
              if (t != Q) globals.showToast(module500.map_reset_page_operate_fail);
              else
                module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module500.robot_communication_exception);
                });
            });
        },
      },
      {
        key: 'onPressBackup',
        value: function () {
          var t, n;
          if (!(null == (t = (n = this.modalMapEditMenu).hide))) t.call(n);
          if (module381.RSM.isRunning)
            module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module500.robot_communication_exception);
            });
          else this.backup();
        },
      },
      {
        key: 'onPressRecoverFromBackup',
        value: function () {
          var t, n, o;
          if (!(null == (t = (n = this.modalMapEditMenu).hide))) t.call(n);
          if (module381.RSM.isRunning)
            module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module500.robot_communication_exception);
            });
          else if (!(null == (o = this.loadBakMapView))) o.show();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = module12.Dimensions.get('window'),
            s = n.width - 30,
            u = this.context.theme,
            c = React.default.createElement(module1796.default, {
              contentBackgroundColor: 'transparent',
              ref: function (n) {
                t.modalMapEditMenu = n;
              },
              onClose: function () {
                if (!(null == t.modalMapEditMenu.hide)) t.modalMapEditMenu.hide();
              },
              mode: module1796.ModalMapEditMenuMode.MapManagement,
              editingId: this.state.currentMapId,
              parent: this,
              onPressEditZoneButton: this.onPressZoneEditButton.bind(this),
              onPressVirtualWallButton: this.onPressVirtualWallAndForbiddenZoneButton.bind(this),
              onPressCustomOrderButton: this.onPressCustomOrderButton.bind(this),
              onPressGroundEditButton: this.onPressGroundEditButton.bind(this),
              onPressRotateMapButton: this.onPressRotateMapButton.bind(this),
              onPressFurnitureEditButton: this.onPressFurnitureEditButton.bind(this),
              onPressBackup: this.onPressBackup.bind(this),
              onPressRecoverFromBackup: this.onPressRecoverFromBackup.bind(this),
              onEditingMapNameSuccess: function (n, o) {
                var l =
                  t.state.items &&
                  t.state.items.map(function (t) {
                    if (t.id == n) t.name = module1397.FloorMapPageUtils.getRealName(o);
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
                this.state.currentMapId != module381.RSM.currentMapId ||
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
            p = this.state.multiFloorFeatureEnabled && this.state.mapSaveEnabled,
            h = this.state.multiFloorFeatureEnabled && !this.state.mapSaveEnabled,
            w = {
              title: module500.map_edit_map_lab_save_map,
              bottomDetail: module500.map_edit_map_lab_save_map_des,
              bottomDetailWidth: s - 40,
              shouldShowSwitch: true,
              switchOn: this.state.mapSaveEnabled,
              switchValueChanged: function (n) {
                return t.onToggleMapSaveSwitchItem.apply(t, [n]);
              },
              visible: true,
              funcId: 'multifloor_mapsave',
              shouldShowTopLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLongLine: !(p || h),
              switchMarginTop: 0,
            },
            T = {
              title: module500.floor_pattern,
              shouldShowRightArrow: true,
              detail: this.state.multiFloorEnabled ? module500.multi_floor_pattern : module500.single_floor_pattern,
              detailWidth: 150,
              funcId: 'multifloor_switch_item',
              onPress: function () {
                return t.onTapMultiFloorSwitchItem.apply(t, []);
              },
              visible: true,
              shouldShowTopLine: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: false,
            },
            L = React.default.createElement(
              module385.SettingListItemView,
              module22.default({}, w, {
                key: 0,
                fontSize: 16,
                style: {
                  width: s,
                },
              })
            ),
            D = React.default.createElement(
              module385.SettingListItemView,
              module22.default({}, T, {
                key: 1,
                fontSize: 16,
                style: {
                  width: s,
                },
              })
            ),
            I = React.default.createElement(
              module12.View,
              {
                style: [
                  Y.middle,
                  {
                    backgroundColor: u.componentBackgroundColor,
                    width: s,
                  },
                ],
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    Y.content,
                    {
                      color: u.multiFloor.howToSaveMapTitleColor,
                    },
                  ],
                },
                module500.how_to_save_map
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    Y.content2,
                    {
                      color: u.multiFloor.howToSaveMapContentColor,
                    },
                  ],
                },
                module500.first_map_handler
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    Y.content2,
                    {
                      color: u.multiFloor.howToSaveMapContentColor,
                    },
                  ],
                },
                module500.multi_map_handler
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    Y.content2,
                    {
                      color: u.multiFloor.howToSaveMapContentColor,
                    },
                  ],
                },
                module500.manual_save_handler
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    Y.content,
                    {
                      color: u.multiFloor.howToSaveMapTitleColor,
                    },
                  ],
                },
                module500.attention_on_multi_map
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    Y.content2,
                    {
                      color: u.multiFloor.howToSaveMapContentColor,
                    },
                  ],
                },
                module500.map_edit_map_lab_save_map_kindly_remind3
              )
            ),
            V = this.state.mapSaveEnabled,
            x =
              this.state.items &&
              this.state.items.map(function (n, o) {
                return React.default.createElement(module1800.default, {
                  key: o,
                  mapID: n.id,
                  name: n.name,
                  mapTime: n.time,
                  showRecoverButton:
                    (t.state.multiFloorFeatureEnabled && t.state.isCurrentMapRestoreEnabled) || n.id != module381.RSM.currentMapId || !t.state.multiFloorFeatureEnabled,
                  showDeleteButton: t.state.multiFloorFeatureEnabled || (!t.state.multiFloorFeatureEnabled && module381.RobotStatusManager.sharedManager().isSupportFeature(113)),
                  showNameEditButton: t.state.multiFloorFeatureEnabled,
                  showARButton: n.arMapMatchParam,
                  onTapEditMap: function (n) {
                    return t.onTapEditMap.apply(t, [n]);
                  },
                  onTapRetry: function (n) {
                    return t.onTapGetMapRetry.apply(t, [n]);
                  },
                  onTapAR: function (o) {
                    t.props.navigation.navigate('MapARScanResultPage', {
                      title: ' ',
                      mapID: o,
                      parsedMapData: n.mapData,
                      matchingParams: JSON.parse(n.arMapMatchParam).transform,
                      meshFileName: JSON.parse(n.arMapMatchParam).meshFileName,
                      refreshFunc: function () {
                        Promise.all(
                          t.state.items.map(function (t) {
                            var n;
                            return regeneratorRuntime.default.async(
                              function (s) {
                                for (;;)
                                  switch ((s.prev = s.next)) {
                                    case 0:
                                      if (t.id != o) {
                                        s.next = 6;
                                        break;
                                      }

                                      s.next = 3;
                                      return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.ARMapPathPrefixKey + '_' + t.id));

                                    case 3:
                                      n = s.sent;
                                      t.arMapMatchParam = n;
                                      if (!(o != module381.RSM.currentMapId || n))
                                        module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                                          data: module418.EventKeys.CurrentARMapDidDelete,
                                        });

                                    case 6:
                                      return s.abrupt('return', t);

                                    case 7:
                                    case 'end':
                                      return s.stop();
                                  }
                              },
                              null,
                              null,
                              null,
                              Promise
                            );
                          })
                        )
                          .then(function (n) {
                            t.setState({
                              items: n,
                            });
                          })
                          .catch(function (t) {
                            console.log('Refresh ARParams failed: ' + t);
                          });
                      },
                    });
                  },
                  mapData: n.mapData,
                });
              }),
            N = p && this.state.items && this.state.multiFloorFeatureEnabled,
            B = React.default.createElement(module1801.default, {
              ref: function (n) {
                return (t.emptyMapView = n);
              },
              hasMap: this.state.items && 0 != this.state.items.length,
              onTapSaveButton: function () {
                return t.onTapEmptyMapItemSave.apply(t, []);
              },
              onTapDeleteButton: function () {
                return t.onTapEmptyMapItemDelete();
              },
              padding: 15,
            }),
            q = !this.state.multiFloorFeatureEnabled,
            K = React.default.createElement(module1801.SingleMapEmptyMapItem, {
              name: module500.reset_map_main_title,
              onTapDeleteButton: function () {
                return t.onTapSingleEmptyMapItemDelete.apply(t, []);
              },
              padding: 15,
            }),
            W = this.state.mapSaveEnabled && this.state.items && 0 == this.state.items.length,
            U = this.state.multiFloorEnabled && this.state.mapSaveEnabled && this.state.items && this.state.items.length < 4,
            H = (W || U) && this.state.multiFloorFeatureEnabled,
            j = React.default.createElement(
              module12.View,
              module22.default({}, module391.default.getAccessibilityLabel('new_map_entrance_in_mulitMap'), {
                style: [
                  Y.newMapEntranceStyle,
                  {
                    backgroundColor: u.componentBackgroundColor,
                    borderRadius: 8,
                    width: s,
                  },
                ],
              }),
              React.default.createElement(
                module12.TouchableOpacity,
                {
                  style: Y.addNewMap,
                  onPress: function () {
                    module387.LogEventCommon('click_create_new_map');
                    t.onTapCreateNewMapItem.apply(t, []);
                  },
                },
                React.default.createElement(module1428, {
                  source: u.multiFloor.createMapImg,
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
                  style: Y.addNewMapFont,
                },
                this.state.multiFloorEnabled ? module500.new_map_entrance_in_multiMap_2 : module500.new_map_entrance_in_multiMap_0
              )
            ),
            O = React.default.createElement(module385.InputDialog, {
              visible: null != this.state.editingNameMap.id,
              title: module500.set_map_name,
              inputPlaceholder: module500.please_input_map_name,
              inputDefaultValue: this.state.editingNameMap.name,
              warningText: module500.floor_map_name_too_long,
              onPressConfirmButton: function (n) {
                return t.onTapRoomNameConfirm.apply(t, [n]);
              },
              onPressCancelButton: function () {
                return t.onTapRoomNameCancel.apply(t, []);
              },
              warningVisibilityAdapter: function (t) {
                return !module1397.FloorMapPageUtils.isLengthValid(t);
              },
            }),
            Z = React.default.createElement(X, {
              ref: function (n) {
                return (t.multiMapSwitchItem = n);
              },
              isModal: true,
              navigator: this.props.navigation,
            }),
            Q = React.default.createElement(module1330.MultiFloorEnableTipsView, {
              ref: function (n) {
                t.qaContentView = n;
              },
            }),
            J = this.state.mapSaveEnabled && this.state.items && this.state.items.length >= 4,
            $ = React.default.createElement(
              module12.View,
              {
                style: {
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  height: 30,
                },
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    fontSize: 12,
                    color: u.subTextColor,
                  },
                },
                module500.multi_map_reach_max
              )
            ),
            ee = React.default.createElement(module1395.MapSaveActionSheetView, {
              ref: function (n) {
                return (t.singleFloorSaveNewMapActionSheet = n);
              },
              mode: module1395.MapSaveActionSheetMode.SaveNewMapInSingleFloor,
              handleSaveMap: function (n) {
                return t.onTapSingleFloorSaveActionSheet.apply(t, [n]);
              },
            }),
            te = React.default.createElement(module1395.MapSaveActionSheetView, {
              ref: function (n) {
                return (t.multiFloorSaveNewMapActionSheet = n);
              },
              handleSaveMap: function (n) {
                return t.onTapMultiFloorSaveActionSheet.apply(t, [n]);
              },
            }),
            ae = React.default.createElement(module1395.SingleFloorSaveNewMapAlert, {
              ref: function (n) {
                return (t.singleFloorSaveNewMapAlert = n);
              },
              onPressConfirm: function () {
                return t.onTapSingleFloorSaveConfirm.apply(t, []);
              },
            }),
            ne = React.default.createElement(
              module12.View,
              {
                style: [
                  Y.container,
                  {
                    backgroundColor: 'transparent',
                  },
                ],
              },
              React.default.createElement(module385.CancelableLoadingView, {
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
            ie = React.default.createElement(
              module12.View,
              {
                style: [
                  Y.container,
                  {
                    backgroundColor: globals.app.state.theme.settingBackgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ],
              },
              React.default.createElement(module385.Spinner, null)
            ),
            oe =
              this.state.currentMapId >= 0 &&
              React.default.createElement(module1803.LoadBackupMapView, {
                ref: function (n) {
                  return (t.loadBakMapView = n);
                },
                mapID: this.state.currentMapId,
                onPressLeft: function () {
                  var n;
                  return null == (n = t.loadBakMapView) ? undefined : n.hide();
                },
                onPressRight: function () {
                  return t.loadBackupMapView();
                },
              });
          return this.state.dataInitialized
            ? React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement(module12.View, {
                  style: {
                    position: 'absolute',
                    width: n.width,
                    height: n.height,
                    top: 0,
                    backgroundColor: this.context.theme.navBackgroundColor,
                  },
                }),
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      backgroundColor: u.settingBackgroundColor,
                      flex: 1,
                    },
                  },
                  this.state.items
                    ? React.default.createElement(
                        module12.ScrollView,
                        {
                          style: {
                            backgroundColor: u.settingBackgroundColor,
                            marginHorizontal: 15,
                          },
                          contentContainerStyle: {
                            paddingTop: 10,
                            paddingBottom: 20,
                            minHeight: n.height,
                          },
                          showsVerticalScrollIndicator: false,
                          refreshControl: React.default.createElement(module12.RefreshControl, {
                            refreshing: this.state.refreshing,
                            onRefresh: function () {
                              return t.pullToRefresh();
                            },
                          }),
                        },
                        React.default.createElement(
                          module12.View,
                          {
                            style: {
                              borderRadius: 8,
                              overflow: 'hidden',
                            },
                          },
                          L,
                          p && D
                        ),
                        h && I,
                        N && B,
                        q && K,
                        V && x,
                        H && j,
                        J && $
                      )
                    : React.default.createElement(module12.View, null),
                  Z,
                  Q,
                  O,
                  ee,
                  te,
                  ae,
                  c,
                  ne,
                  oe
                )
              )
            : ie;
        },
      },
    ]);
    return p;
  })(React.default.Component);

exports.default = J;
J.defaultProps = {};
J.contextType = module515.AppConfigContext;

var X = (function (t) {
  module7.default(o, t);
  var n = q(o);

  function o(t) {
    var l;
    module4.default(this, o);
    (l = n.call(this, t)).dataProvider = module390.default.isMultiFloorSupported() ? new module1797.MultiMapDataProvider() : new module1797.SingleMapDataProvider();
    l.navigator = t.navigator;
    return l;
  }

  module5.default(o, [
    {
      key: 'show',
      value: function () {
        var t, n;
        if (!(null == (t = (n = this.multiMapSwitchItem).show))) t.call(n);
      },
    },
    {
      key: 'dismissModalView',
      value: function () {
        var t, n;
        if (!(null == (t = (n = this.multiMapSwitchItem).dismissModalView))) t.call(n);
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = module390.default.isSupportQuickMapBuilder()
            ? [module500.confirm_start, module500.quick_build_map_start]
            : [module500.localization_strings_Main_MainPage_11, module500.confirm_start],
          o = module390.default.isSupportQuickMapBuilder()
            ? module500.multi_map_start_build_text_1 +
              '\n' +
              module500.multi_map_start_build_text_2 +
              '\n' +
              module500.multi_map_start_build_text_3 +
              '\n' +
              module500.multi_map_start_build_text_4
            : module500.multi_map_start_build_text_1 + '\n' + module500.multi_map_start_build_text_2 + '\n' + module500.multi_map_start_build_text_3,
          l = React.default.createElement(module1802.default, {
            ref: function (n) {
              t.multiMapSwitchItem = n;
            },
            isModal: this.props.isModal,
            bgImage: this.context.theme.guideImages.createMap,
            topTitle: module500.multi_map_start_build_title,
            context: o,
            buttonInfo: n,
            buttonFuncId: ['multi_map_left', 'multi_map_right'],
            onPressLeftButton: function () {
              if (module390.default.isSupportQuickMapBuilder()) {
                if (!(null == t.onTapCreateNewMapConfirm)) t.onTapCreateNewMapConfirm();
              } else t.multiMapSwitchItem.dismissModalView();
            },
            onPressGoSetting: function () {
              if (module390.default.isSupportQuickMapBuilder()) {
                if (!(null == t.onTapCreateNewMapConfirm)) t.onTapCreateNewMapConfirm(true);
              } else if (!(null == t.onTapCreateNewMapConfirm)) t.onTapCreateNewMapConfirm();
            },
            hasCloseButton: module390.default.isSupportQuickMapBuilder(),
          }),
          s = React.default.createElement(
            module12.View,
            {
              style: [
                Y.container,
                {
                  backgroundColor: 'transparent',
                },
              ],
            },
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'multi_floor_view_loading',
              closeAccessibilityLabelKey: 'multi_floor_view_loading_close',
              ref: function (n) {
                t.globalLoadingView = n;
              },
              showButton: true,
              onPressCancel: function () {},
            })
          );
        return React.default.createElement(module12.View, null, l, s);
      },
    },
    {
      key: 'onTapCreateNewMapConfirm',
      value: function () {
        var t,
          n = this,
          o = arguments.length > 0 && undefined !== arguments[0] && arguments[0],
          l = {
            text: module500.localization_strings_Main_MainPage_11,
          },
          s = {
            text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
            onPress: function () {
              return n.dataProvider.stopRobot();
            },
          };
        if ((this.multiMapSwitchItem.dismissModalView(), null == (t = this.props) || null == t.onPressCreateMap || t.onPressCreateMap(), module381.RSM.isRunning))
          globals.Alert.alert(module500.start_create_new_map_title, '', [l, s]);
        else {
          if (this.globalLoadingView) this.globalLoadingView.showWithText();

          var u,
            c = 0,
            p = o ? this.dataProvider.quickCreateMap : this.dataProvider.createNewMap,
            h = function () {
              p()
                .then(function () {
                  n.createMapLoopChecker = setInterval(function () {
                    var t, o, l;

                    if (c > 50) {
                      if (n.createMapLoopChecker) clearInterval(n.createMapLoopChecker);
                      if (!(null == (t = n.globalLoadingView) || null == t.hide)) t.hide();
                      return void globals.showToast(module500.map_reset_page_operate_fail);
                    }

                    if (module381.RSM.isRunning) {
                      if (n.createMapLoopChecker) clearInterval(n.createMapLoopChecker);
                      if (!(null == (o = n.globalLoadingView) || null == o.hide)) o.hide();
                      if (!(null == (l = n.navigator) || null == l.popToTop)) l.popToTop();
                    } else c++;
                  }, 100);
                })
                .catch(function (t) {
                  var o;
                  console.log('Error: ' + t);
                  if (!(null == (o = n.globalLoadingView) || null == o.hide)) o.hide();
                  globals.showToast(module500.map_object_ignore_failed);
                });
              module387.LogEventStat(module387.LogEventMap.MultiMapCreateNewMap);
            },
            f = module390.default.isCarpetSupported() && !module422.DMM.isGarnet;

          if (o && f) {
            if (!(null == (u = this.globalLoadingView))) u.showWithText();
            module414.default
              .getCarpetCleanMode()
              .then(function (t) {
                if (t.result[0].carpet_clean_mode == module389.CarPetCleanModeSettingMap.CarPetCleanModeAllForbidden) {
                  var o = {
                      text: module500.localization_strings_Main_MainPage_11,
                    },
                    l = {
                      text: module500.go_to_settings,
                      onPress: function () {
                        var t;
                        return null == (t = n.navigator) ? undefined : null == t.navigate ? undefined : t.navigate('CarpetCleanModeSetting');
                      },
                    };
                  globals.Alert.alert(module500.quick_create_map_alert_title, '', [o, l]);
                } else h();
              })
              .catch(function (t) {
                globals.showToast(module500.map_object_ignore_failed);
              })
              .finally(function () {
                var t;
                if (!(null == (t = n.globalLoadingView))) t.hide();
              });
          } else h();
        }
      },
    },
  ]);
  return o;
})(React.default.Component);

exports.MultiMapHintModal = X;
X.contextType = module515.AppConfigContext;
var Y = module12.StyleSheet.create({
  newMapEntranceStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: module1153.NavigationBarHeight,
  },
  confirmButton: {
    marginLeft: 14,
    marginRight: 14,
    alignSelf: 'center',
  },
});

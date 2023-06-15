var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module420 = require('./420'),
  module415 = require('./415'),
  module387 = require('./387'),
  module381 = require('./381'),
  module1213 = require('./1213'),
  module1125 = require('./1125'),
  module391 = require('./391'),
  module1198 = require('./1198'),
  module390 = require('./390'),
  module2044 = require('./2044'),
  module2045 = require('./2045'),
  module1215 = require('./1215'),
  module1348 = require('./1348'),
  module1928 = require('./1928'),
  module1200 = require('./1200'),
  module520 = require('./520'),
  module1201 = require('./1201'),
  module1945 = require('./1945');

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

var module510 = require('./510').strings,
  module1344 = require('./1344'),
  module393 = require('./393'),
  module1415 = require('./1415'),
  module1994 = require('./1994').parse,
  W = -100,
  O = -101,
  G = (function (t) {
    module9.default(G, t);

    var n = G,
      module1200 = B(),
      q = function () {
        var t,
          o = module12.default(n);

        if (module1200) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function G(t) {
      var n;
      module6.default(this, G);
      (n = q.call(this, t)).dataProvider = module390.default.isMultiFloorSupported() ? new module1348.MultiMapDataProvider() : new module1348.SingleMapDataProvider();
      n.mapListRequest = null;
      n.mapDataRequests = [];
      n.unMount = false;
      n.state = {
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
      return n;
    }

    module7.default(G, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          module415.MM.shouldForceStart = true;
          module415.MM.start();
          this.registListeners();
          this.requestMaps(true, true);
          var n = this.state.multiFloorFeatureEnabled
            ? React.default.createElement(module385.PureImageButton, {
                funcId: 'multi_map_q_a',
                style: [
                  H.confirmButton,
                  {
                    transform: globals.isRTL
                      ? [
                          {
                            rotateY: '180deg',
                          },
                        ]
                      : [],
                  },
                ],
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
            title: module510.map_edit_title,
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
          this.robotStatusListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.reloadDataIfNeeded();
          });
          this.multiMapsListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.sender != t) {
              if (n.data == module420.EventKeys.MultiMapsDidReceive) t.reloadDataIfNeeded();

              if (
                !(
                  n.data != module420.EventKeys.MapSegmentsDidChange &&
                  n.data != module420.EventKeys.FBZSettingsDidChange &&
                  n.data != module420.EventKeys.CurrentMapDidChange &&
                  n.data != module420.EventKeys.MapDidRotate
                )
              ) {
                t.requestMaps(false);
                t.reloadEmptyMapViewIfNeeded();
              }

              if (n.data == module420.EventKeys.CurrentMapDidChange) module415.MM.getMultiMaps();
            }
          });
          this.mapUpdateListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapDidUpdate, function (n) {
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
            l = -1 == module381.RSM.currentMapId;
          if (module381.RSM.isLocating && module381.RSM.multiFloorEnabled) l = false;
          var s = this.emptyMapView.state.hasCurrentMap,
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
                      text: module510.localization_strings_Setting_RemoteControlPage_51,
                      onPress: function () {
                        module393.closeCurrentPage();
                      },
                    };
                    globals.Alert.alert(module510.plugin_need_update, '', [n]);
                  } else globals.showToast(module510.robot_communication_exception);
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
              module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                data: module420.EventKeys.MultiMapsDidReceive,
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
                    text: module510.localization_strings_Setting_RemoteControlPage_51,
                    onPress: function () {
                      module393.closeCurrentPage();
                    },
                  };
                  globals.Alert.alert(module510.plugin_need_update, '', [s]);
                } else globals.showToast(module510.robot_communication_exception);
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
              if (-3 != t.data.error && -10005 != t.data.error.code && -10005 != t.data.error) globals.showToast(module510.robot_communication_exception);
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
              return n.dataProvider.manualSegmentMap(module415.CurrentMapId);
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
                      if (o.id == t) o.name = module1215.FloorMapPageUtils.getRealName(n);
                      return o;
                    });
                  p.setState({
                    items: l,
                  });
                  module415.MM.getMultiMaps();
                })
                .catch(function (t) {
                  globals.showToast(module510.naming_failed);
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
              globals.showToast(module510.map_reset_page_operate_success);
              module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                data: module420.EventKeys.MapSegmentsDidChange,
                sender: t,
              });
              module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                data: module420.EventKeys.SegmentCustomModeDidChange,
              });
              t.props.navigation.pop();
            })
            .catch(function (t) {
              if (t.data && t.data.result && 'unknown_method' == t.data.result)
                globals.Alert.alert(module510.plugin_need_update, '', [
                  {
                    text: module510.localization_strings_Setting_RemoteControlPage_51,
                    onPress: function () {
                      module393.closeCurrentPage();
                    },
                  },
                ]);
              globals.showToast(module510.map_object_ignore_failed);
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
                  module415.MM.getMapAfterSaveMap();
                  module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                    data: module420.EventKeys.MapSegmentsDidChange,
                    sender: n,
                  });
                } else {
                  module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                    data: module420.EventKeys.MapSegmentsDidChange,
                    sender: n,
                  });
                  module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                    data: module420.EventKeys.SegmentCustomModeDidChange,
                  });
                }

                module13.DeviceEventEmitter.emit(module420.NotificationKeys.MapManualReset);
                n.props.navigation.popToTop();
              })
              .catch(function (o) {
                if (n.state.multiFloorFeatureEnabled) globals.showToast(module510.map_object_ignore_failed);
                else if (o.data && o.data.result && 'unknown_method' == o.data.result) {
                  var l = {
                    text: module510.localization_strings_Setting_RemoteControlPage_51,
                    onPress: function () {
                      module393.closeCurrentPage();
                    },
                  };
                  globals.Alert.alert(module510.plugin_need_update, '', [l]);
                } else globals.showToast(module510.map_object_ignore_failed);
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
              if (n.state.multiFloorFeatureEnabled) module415.MM.getMultiMaps();
              else {
                module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                  data: module420.EventKeys.MapSegmentsDidChange,
                  sender: n,
                });
                module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                  data: module420.EventKeys.SegmentCustomModeDidChange,
                });
              }
            })
            .catch(function (t) {
              if (t.data && t.data.result && 'unknown_method' == t.data.result) {
                var n = {
                  text: module510.localization_strings_Setting_RemoteControlPage_51,
                  onPress: function () {
                    module393.closeCurrentPage();
                  },
                };
                globals.Alert.alert(module510.plugin_need_update, '', [n]);
              } else globals.showToast(module510.map_object_ignore_failed);
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
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.ARMapPathPrefixKey + '_' + t));

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
                      var l = module1994(n, globals.app.state.theme != module520.Themes.light, false, false);
                      if (!(l.map && l.map.width && l.map.height)) l = '';
                      var s = u.state.items.map(function (n) {
                        if (n.id == t) {
                          n.mapData = l;
                          n.arMapMatchParam = o;
                        }

                        return n;
                      });
                      u.setState({
                        items: s,
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
                ? l(O)
                : n.isLoadingMap
                ? l(W)
                : ((n.isLoadingMap = true),
                  n.globalLoadingView && n.globalLoadingView.showWithText(),
                  n.dataProvider
                    .loadMap(t)
                    .then(function (o) {
                      n.mapUpdated = false;
                      module415.MM.getMapAfterSaveMap();
                      return n.checkMapUpdated(t);
                    })
                    .then(function () {
                      if (n.state.multiFloorFeatureEnabled)
                        module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                          data: module420.EventKeys.MapSegmentsDidChange,
                          sender: n,
                        });
                      else {
                        module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                          data: module420.EventKeys.MapSegmentsDidChange,
                          sender: n,
                        });
                        module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                          data: module420.EventKeys.SegmentCustomModeDidChange,
                        });
                      }
                      module13.DeviceEventEmitter.emit(module420.NotificationKeys.MapManualReset);
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
              module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                globals.showToast(module510.robot_communication_exception);
              });
            else {
              var o = {
                text: module510.localization_strings_Setting_RemoteControlPage_51,
              };
              if (!(null == (n = this.dataProvider) || null == n.backupMap))
                n.backupMap(this.state.currentMapId)
                  .then(function (t) {
                    globals.Alert.alert(module510.backup_success_hint, '', [o]);
                    module415.MM.getMultiMaps();
                  })
                  .catch(function () {
                    globals.showToast(module510.robot_communication_exception);
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

            var o = function () {
              var t;
              n.loadBakMapView.hide();
              if (!(null == (t = n.dataProvider) || null == t.recoverMultiMap))
                t.recoverMultiMap(n.state.currentMapId)
                  .then(function (t) {
                    module1348.MapListDataProvider.syncSmartSceneIfNeeded();
                    console.log('RecoverMultiMap: Success');
                  })
                  .catch(function (t) {
                    globals.showToast(module510.robot_communication_exception);
                  });
            };

            if (module393.isMiApp) o();
            else
              globals.Alert.alert('', module510.recover_map_hint, [
                {
                  text: module510.localization_strings_Main_MainPage_11,
                  onPress: function () {},
                },
                {
                  text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    o();
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
                        text: module510.localization_strings_Main_MainPage_11,
                        onPress: function () {
                          module387.LogEventCommon('close_map_save_alert_cancel');
                          n.setState({
                            mapSaveEnabled: true,
                          });
                        },
                      },
                      l = {
                        text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          n.requestMapSaveSwitch(t);
                        },
                      };
                    globals.Alert.alert(module510.map_edit_map_lab_close_warn, '', [o, l]);
                  }
                }
              );
            };

          if (t) o();
          else
            module1201
              .showFinishCurrentTastAlertIfNeeded()
              .then(function () {
                o();
              })
              .catch(function (t) {
                globals.showToast(module510.robot_communication_exception);
              });
        },
      },
      {
        key: 'onTapMultiFloorSwitchItem',
        value: function () {
          if (module381.RSM.isRunning)
            module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module510.robot_communication_exception);
            });
          else
            this.props.navigation.navigate('MultiFloorSwitch', {
              title: module510.floor_pattern,
            });
        },
      },
      {
        key: 'onTapCreateNewMapItem',
        value: function () {
          if (module381.RSM.isRunning)
            module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module510.robot_communication_exception);
            });
          else this.multiMapSwitchItem.show();
        },
      },
      {
        key: 'onTapEmptyMapItemSave',
        value: function () {
          var t = this,
            n = {
              text: module510.continue_save,
              color: '#007AFF',
              onPress: function () {
                module387.LogEventCommon('save_map_confirm');
                t.onTapManualSaveConfirm();
              },
            },
            o = {
              text: module510.map_edit_no_save,
              onPress: function () {
                module387.LogEventCommon('save_map_cancel');
              },
            };
          globals.Alert.alert('', module510.manual_saving_map_popup_title, [o, n]);
        },
      },
      {
        key: 'onTapEmptyMapItemDelete',
        value: function () {
          var t = this,
            n = {
              text: module510.localization_strings_Setting_RemoteControlPage_51,
              color: '#007AFF',
              onPress: function () {
                module387.LogEventCommon('delete_map_confirm');
                t.dataProvider
                  .deleteMap(-1)
                  .then(function () {
                    t.reloadDataIfNeeded();
                  })
                  .catch(function (t) {
                    globals.showToast(module510.robot_communication_exception);
                  });
              },
            },
            o = {
              text: module510.localization_strings_Main_MainPage_11,
              onPress: function () {
                module387.LogEventCommon('delete_map_cancel');
              },
            };
          globals.Alert.alert('', module510.delete_map_hint_title, [o, n]);
        },
      },
      {
        key: 'onTapSingleEmptyMapItemDelete',
        value: function () {
          var t = this,
            n = {
              text: module510.localization_strings_Main_MainPage_11,
            },
            o = {
              text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                t.onTapResetMapConfirm();
              },
            };
          globals.Alert.alert(module510.map_edit_map_edit_reset_remind, '', [n, o]);
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
          if (((module381.RSM.mapSaveEnabled && !module381.RSM.multiFloorEnabled) || module381.RSM.multiFloorEnabled) && 0 == module415.MM.maps.length)
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
            if (t == module415.CurrentMapId) n.singleFloorSaveNewMapAlert.show();
            else n.requestSaveMap(t);
          });
        },
      },
      {
        key: 'onTapSingleFloorSaveConfirm',
        value: function () {
          if (module381.RSM.isRunning)
            module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module510.robot_communication_exception);
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
              var l = module1215.FloorMapPageUtils.getRealLength(o);
              if (module1215.FloorMapPageUtils.getRealLength(o) >= 30) globals.showToast(module510.floor_map_name_too_long);
              else this.requestEditingMapName(this.state.editingNameMap.id, o, l);
            }
          } else globals.showToast(module510.name_already_exists);
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
                  text: module510.localization_strings_Main_MainPage_11,
                },
                s = {
                  text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
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
              if (!(null == (o = this.modalMapEditMenu))) o.alert('', module510.ask_if_stop_for_change_map, [l, s]);
            } else {
              this.requestLoadMap(t);
              module387.LogEventStat(module387.LogEventMap.MultiMapMapManagerMap);
            }
          } else {
            var u,
              c = {
                text: module510.localization_strings_Main_MainPage_11,
              },
              p = {
                text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  n.requestLoadMap(t);
                },
              };
            if (!(null == (u = this.modalMapEditMenu))) u.alert(module510.map_reset_page_choose_map_title, '', [c, p]);
          }
        },
      },
      {
        key: 'onTapEditMap',
        value: function (t) {
          if (module381.RSM.isRunning && t != module381.RSM.currentMapId)
            module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module510.robot_communication_exception);
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
                title: module510.map_edit_zone,
              });
            })
            .catch(function (t) {
              if (t != O) globals.showToast(module510.map_reset_page_operate_fail);
              else
                module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module510.robot_communication_exception);
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
                title: module510.map_edit_virtual_wall_and_forbidden_zone,
              });
            })
            .catch(function (t) {
              if (t != O) globals.showToast(module510.map_reset_page_operate_fail);
              else
                module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module510.robot_communication_exception);
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
                title: module510.map_edit_bottom_menu_order,
              });
            })
            .catch(function (t) {
              if (t != O) globals.showToast(module510.map_reset_page_operate_fail);
              else
                module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module510.robot_communication_exception);
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
              if (t != O) globals.showToast(module510.map_reset_page_operate_fail);
              else
                module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module510.robot_communication_exception);
                });
            });
        },
      },
      {
        key: 'gotoGroundEditPage',
        value: function () {
          if (module390.default.groundOnlySupportFloor())
            this.props.navigation.navigate('MapEditFloorMaterialPage', {
              title: module510.map_edit_floor_wood_tile,
            });
          else if (module390.default.groundOnlySupportCarpet())
            this.props.navigation.navigate('MapEditCarpetPage', {
              action: module1198.getCarpetPageAction(),
              title: module510.map_edit_carpet_ignore_title,
            });
          else if (module390.default.groundOnlySupportDoorSill())
            this.props.navigation.navigate('MapEditDoorSillPage', {
              title: module510.map_edit_door_sill_title,
            });
          else
            this.props.navigation.navigate('MapEditGroundPage', {
              title: module510.map_edit_ground_material_title,
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
                title: module510.map_edit_rotate_map_title,
              });
            })
            .catch(function (t) {
              if (t != O) globals.showToast(module510.map_reset_page_operate_fail);
              else
                module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module510.robot_communication_exception);
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
                title: module510.map_edit_furniture_title,
              });
            })
            .catch(function (t) {
              if (t != O) globals.showToast(module510.map_reset_page_operate_fail);
              else
                module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                  globals.showToast(module510.robot_communication_exception);
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
            module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module510.robot_communication_exception);
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
            module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module510.robot_communication_exception);
            });
          else if (!(null == (o = this.loadBakMapView))) o.show();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = module13.Dimensions.get('window'),
            s = n.width - 30,
            u = this.context.theme,
            c = React.default.createElement(module1928.default, {
              contentBackgroundColor: 'transparent',
              ref: function (n) {
                t.modalMapEditMenu = n;
              },
              onClose: function () {
                if (!(null == t.modalMapEditMenu.hide)) t.modalMapEditMenu.hide();
              },
              mode: module1928.ModalMapEditMenuMode.MapManagement,
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
                    if (t.id == n) t.name = module1215.FloorMapPageUtils.getRealName(o);
                    return t;
                  });
                t.setState({
                  items: l,
                });
              },
              onDeleteMapSuccess: function (n) {
                t.setState({
                  items: t.state.items.filter(function (t) {
                    return t.id != n;
                  }),
                });
                if (!(null == t.modalMapEditMenu.hide)) t.modalMapEditMenu.hide();
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
            E = {
              title: module510.map_edit_map_lab_save_map,
              bottomDetail: module510.map_edit_map_lab_save_map_des,
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
              title: module510.floor_pattern,
              shouldShowRightArrow: true,
              detail: this.state.multiFloorEnabled ? module510.multi_floor_pattern : module510.single_floor_pattern,
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
            P = React.default.createElement(
              module385.SettingListItemView,
              module22.default({}, E, {
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
              module13.View,
              {
                style: [
                  H.middle,
                  {
                    backgroundColor: u.componentBackgroundColor,
                    width: s,
                  },
                ],
              },
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    H.content,
                    {
                      color: u.multiFloor.howToSaveMapTitleColor,
                    },
                  ],
                },
                module510.how_to_save_map
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    H.content2,
                    {
                      color: u.multiFloor.howToSaveMapContentColor,
                    },
                  ],
                },
                module510.first_map_handler
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    H.content2,
                    {
                      color: u.multiFloor.howToSaveMapContentColor,
                    },
                  ],
                },
                module510.multi_map_handler
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    H.content2,
                    {
                      color: u.multiFloor.howToSaveMapContentColor,
                    },
                  ],
                },
                module510.manual_save_handler
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    H.content,
                    {
                      color: u.multiFloor.howToSaveMapTitleColor,
                    },
                  ],
                },
                module510.attention_on_multi_map
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    H.content2,
                    {
                      color: u.multiFloor.howToSaveMapContentColor,
                    },
                  ],
                },
                module510.map_edit_map_lab_save_map_kindly_remind3
              )
            ),
            N = this.state.mapSaveEnabled,
            V =
              this.state.items &&
              this.state.items.map(function (n, o) {
                return React.default.createElement(module2044.default, {
                  key: o,
                  mapID: n.id,
                  name: n.name,
                  mapTime: n.time,
                  showRecoverButton:
                    (t.state.multiFloorFeatureEnabled && t.state.isCurrentMapRestoreEnabled) || n.id != module381.RSM.currentMapId || !t.state.multiFloorFeatureEnabled,
                  showDeleteButton: t.state.multiFloorFeatureEnabled || (!t.state.multiFloorFeatureEnabled && module381.RobotStatusManager.sharedManager().isSupportFeature(113)),
                  showNameEditButton: t.state.multiFloorFeatureEnabled,
                  showARButton: false,
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
                                      return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.ARMapPathPrefixKey + '_' + t.id));

                                    case 3:
                                      n = s.sent;
                                      t.arMapMatchParam = n;
                                      if (!(o != module381.RSM.currentMapId || n))
                                        module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                                          data: module420.EventKeys.CurrentARMapDidDelete,
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
            B = p && this.state.items && this.state.multiFloorFeatureEnabled,
            q = React.default.createElement(module2045.default, {
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
            K = !this.state.multiFloorFeatureEnabled,
            U = React.default.createElement(module2045.SingleMapEmptyMapItem, {
              name: module510.reset_map_main_title,
              onTapDeleteButton: function () {
                return t.onTapSingleEmptyMapItemDelete.apply(t, []);
              },
              padding: 15,
            }),
            W = this.state.mapSaveEnabled && this.state.items && 0 == this.state.items.length,
            O = this.state.multiFloorEnabled && this.state.mapSaveEnabled && this.state.items && this.state.items.length < 4,
            G = (W || O) && this.state.multiFloorFeatureEnabled,
            Z = React.default.createElement(
              module13.View,
              module22.default({}, module391.default.getAccessibilityLabel('new_map_entrance_in_mulitMap'), {
                style: [
                  H.newMapEntranceStyle,
                  {
                    backgroundColor: u.componentBackgroundColor,
                    borderRadius: 8,
                    width: s,
                  },
                ],
              }),
              React.default.createElement(
                module13.TouchableOpacity,
                {
                  style: H.addNewMap,
                  onPress: function () {
                    module387.LogEventCommon('click_create_new_map');
                    t.onTapCreateNewMapItem.apply(t, []);
                  },
                },
                React.default.createElement(module1415, {
                  source: u.multiFloor.createMapImg,
                  style: {
                    width: 40,
                    height: 40,
                    overflow: 'visible',
                  },
                })
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: H.addNewMapFont,
                },
                this.state.multiFloorEnabled ? module510.new_map_entrance_in_multiMap_2 : module510.new_map_entrance_in_multiMap_0
              )
            ),
            j = React.default.createElement(module385.InputDialog, {
              visible: null != this.state.editingNameMap.id,
              title: module510.set_map_name,
              inputPlaceholder: module510.please_input_map_name,
              inputDefaultValue: this.state.editingNameMap.name,
              warningText: module510.floor_map_name_too_long,
              onPressConfirmButton: function (n) {
                return t.onTapRoomNameConfirm.apply(t, [n]);
              },
              onPressCancelButton: function () {
                return t.onTapRoomNameCancel.apply(t, []);
              },
              warningVisibilityAdapter: function (t) {
                return !module1215.FloorMapPageUtils.isLengthValid(t);
              },
            }),
            J = React.default.createElement(module1213.MultiMapHintModal, {
              ref: function (n) {
                return (t.multiMapSwitchItem = n);
              },
              isModal: true,
              navigator: this.props.navigation,
            }),
            Q = React.default.createElement(module1125.MultiFloorEnableTipsView, {
              ref: function (n) {
                t.qaContentView = n;
              },
            }),
            Y = this.state.mapSaveEnabled && this.state.items && this.state.items.length >= 4,
            X = React.default.createElement(
              module13.View,
              {
                style: {
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  height: 30,
                },
              },
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    fontSize: 12,
                    color: u.subTextColor,
                  },
                },
                module510.multi_map_reach_max
              )
            ),
            $ = React.default.createElement(module1213.MapSaveActionSheetView, {
              ref: function (n) {
                return (t.singleFloorSaveNewMapActionSheet = n);
              },
              mode: module1213.MapSaveActionSheetMode.SaveNewMapInSingleFloor,
              handleSaveMap: function (n) {
                return t.onTapSingleFloorSaveActionSheet.apply(t, [n]);
              },
            }),
            ee = React.default.createElement(module1213.MapSaveActionSheetView, {
              ref: function (n) {
                return (t.multiFloorSaveNewMapActionSheet = n);
              },
              handleSaveMap: function (n) {
                return t.onTapMultiFloorSaveActionSheet.apply(t, [n]);
              },
            }),
            te = React.default.createElement(module1213.SingleFloorSaveNewMapAlert, {
              ref: function (n) {
                return (t.singleFloorSaveNewMapAlert = n);
              },
              onPressConfirm: function () {
                return t.onTapSingleFloorSaveConfirm.apply(t, []);
              },
            }),
            ae = React.default.createElement(
              module13.View,
              {
                style: [
                  H.container,
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
            ne = React.default.createElement(
              module13.View,
              {
                style: [
                  H.container,
                  {
                    backgroundColor: globals.app.state.theme.settingBackgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ],
              },
              React.default.createElement(module385.Spinner, null)
            ),
            ie =
              this.state.currentMapId >= 0 &&
              React.default.createElement(module1945.LoadBackupMapView, {
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
                React.default.createElement(module13.View, {
                  style: {
                    position: 'absolute',
                    width: n.width,
                    height: n.height,
                    top: 0,
                    backgroundColor: this.context.theme.navBackgroundColor,
                  },
                }),
                React.default.createElement(
                  module13.View,
                  {
                    style: {
                      backgroundColor: u.settingBackgroundColor,
                      flex: 1,
                    },
                  },
                  this.state.items
                    ? React.default.createElement(
                        module13.ScrollView,
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
                          refreshControl: React.default.createElement(module13.RefreshControl, {
                            refreshing: this.state.refreshing,
                            onRefresh: function () {
                              return t.pullToRefresh();
                            },
                          }),
                        },
                        React.default.createElement(
                          module13.View,
                          {
                            style: {
                              borderRadius: 8,
                              overflow: 'hidden',
                            },
                          },
                          P,
                          p && D
                        ),
                        h && I,
                        B && q,
                        K && U,
                        N && V,
                        G && Z,
                        Y && X
                      )
                    : React.default.createElement(module13.View, null),
                  J,
                  Q,
                  j,
                  $,
                  ee,
                  te,
                  c,
                  ae,
                  ie
                )
              )
            : ne;
        },
      },
    ]);
    return G;
  })(React.default.Component);

exports.default = G;
G.defaultProps = {};
G.contextType = module1200.AppConfigContext;
var H = module13.StyleSheet.create({
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
    marginTop: module1344.NavigationBarHeight,
  },
  confirmButton: {
    marginLeft: 14,
    marginRight: 14,
    alignSelf: 'center',
  },
});

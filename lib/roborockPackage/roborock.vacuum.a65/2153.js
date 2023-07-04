var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module385 = require('./385'),
  module13 = require('./13'),
  module2154 = require('./2154'),
  module1509 = require('./1509'),
  module1200 = require('./1200'),
  module1969 = require('./1969'),
  module1968 = require('./1968'),
  module416 = require('./416'),
  module1970 = require('./1970'),
  module381 = require('./381'),
  module415 = require('./415'),
  module390 = require('./390'),
  module2166 = require('./2166'),
  module424 = require('./424');

function x() {
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
  b = (function (t, ...args) {
    module9.default(k, t);

    var module1200 = k,
      b = x(),
      E = function () {
        var t,
          n = module12.default(module1200);

        if (b) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function k() {
      var t;
      module6.default(this, k);
      (t = E.call(this, ...args)).editingIndex = null;
      t.actionSheet = null;
      t.contentOffsetY = 0;
      t.state = {
        customCommands: new module1969.CommandListSectionData(module1969.LocalizationStrings.smart_scene_custom_commands, []),
        recommendCommands: new module1969.CommandListSectionData(module1969.LocalizationStrings.smart_scene_recommend_commands, []),
        renaming: false,
        isLoading: false,
        isSorting: false,
      };
      return t;
    }

    module7.default(k, [
      {
        key: 'componentDidMount',
        value: function () {
          this.configNavigationBar();
          this.loadData();
        },
      },
      {
        key: 'render',
        value: function () {
          var t,
            n,
            s = this;
          if (this.state.isLoading)
            return React.default.createElement(
              module13.View,
              {
                style: {
                  flex: 1,
                  backgroundColor: globals.app.state.theme.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              React.default.createElement(module385.Spinner, null)
            );
          var c = this.commandsCount >= module1969.MaxCommandCount ? [] : [new module1969.CommandCardData(null, module1969.CommandCardType.Add, null)];
          return React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              module13.ScrollView,
              {
                ref: function (t) {
                  return (s.scrollView = t);
                },
                style: {
                  backgroundColor: this.context.theme.settingBackgroundColor,
                },
                onScroll: function (t) {
                  return (s.contentOffsetY = t.nativeEvent.contentOffset.y);
                },
                contentContainerStyle: {
                  paddingTop: 10,
                  paddingBottom: 20,
                  minHeight: module13.Dimensions.get('window').height,
                },
                scrollEnabled: true,
                bounces: false,
                scrollEventThrottle: 256,
                showsVerticalScrollIndicator: false,
              },
              React.default.createElement(module2154.default, {
                data: new module1969.CommandListSectionData(module1969.LocalizationStrings.smart_scene_custom_commands, [].concat(module31.default(this.commandsData), c)),
                titleStyle: {
                  fontSize: 32,
                  fontWeight: 'bold',
                },
                isSorting: this.state.isSorting,
                onPressCustomCommandAddAtIndex: this.onPressCustomCommandAdd.bind(this),
                onPressCustomCommandMoreAtIndex: this.onPressCustomCommandMore.bind(this),
                onPressRecommendCommandAddAtIndex: this.onPressRecommendCommandAdd.bind(this),
                onStartDragging: function () {
                  return s.scrollView.setNativeProps({
                    scrollEnabled: false,
                  });
                },
                onEndDragging: function () {
                  return s.scrollView.setNativeProps({
                    scrollEnabled: true,
                  });
                },
                onSortCompleted: function (t) {
                  var n;
                  s.loadingView.showWithText();
                  var o =
                    null !=
                    (n = t.flatMap(function (t) {
                      var n;
                      return '' + (null != (n = t.id) ? n : '');
                    }))
                      ? n
                      : [];
                  module393
                    .setSceneOrders(o)
                    .then(function () {
                      s.state.customCommands.cards = t;
                      s.setState({
                        isSorting: false,
                        customCommands: s.state.customCommands,
                      });
                    })
                    .catch(function () {
                      s.setState({
                        isSorting: false,
                        customCommands: s.state.customCommands,
                      });
                    })
                    .finally(function () {
                      s.loadingView.hide();
                    });
                },
              }),
              React.default.createElement(
                module13.View,
                {
                  style: {
                    marginTop: 20,
                  },
                },
                React.default.createElement(module2154.default, {
                  data: this.state.recommendCommands,
                  titleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                  },
                  onPressCustomCommandAddAtIndex: this.onPressCustomCommandAdd.bind(this),
                  onPressCustomCommandMoreAtIndex: this.onPressCustomCommandMore.bind(this),
                  onPressRecommendCommandAddAtIndex: this.onPressRecommendCommandAdd.bind(this),
                })
              ),
              React.default.createElement(module1509.default, {
                ref: function (t) {
                  return (s.actionSheet = t);
                },
                title: module1969.LocalizationStrings.smart_scene_more,
                actions: this.actions,
                didSelectRow: this.onPressActionSheetItem.bind(this),
                textColorAdapter: function (t) {
                  return t == s.actions.length - 1 ? 'red' : s.context.theme.actionSheet.textColor;
                },
                onPressCancel: function () {
                  return s.actionSheet.hide();
                },
              })
            ),
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'loading_view_loading',
              closeAccessibilityLabelKey: 'loading_view_loading_close',
              ref: function (t) {
                s.loadingView = t;
              },
              showButton: true,
            }),
            React.default.createElement(module2166.default, {
              ref: function (t) {
                return (s.settingModal = t);
              },
              didSelectRow: function (t) {
                return s.onPressActionSheetItem(t);
              },
              actions: this.actions,
            }),
            React.default.createElement(module385.InputDialog, {
              visible: this.state.renaming,
              title: module1969.LocalizationStrings.smart_scene_input_dialog_title,
              inputPlaceholder: module1969.LocalizationStrings.smart_scene_input_dialog_title,
              inputDefaultValue: null != (t = null == (n = this.commandsData[this.editingIndex]) ? undefined : n.name) ? t : '',
              onPressConfirmButton: function (t) {
                return s.renameCommand.apply(s, [t]);
              },
              onPressCancelButton: function () {
                return s.setState({
                  renaming: false,
                });
              },
              warningText: module1969.LocalizationStrings.floor_map_name_too_long,
              warningVisibilityAdapter: function (t) {
                return t.length > 20;
              },
            })
          );
        },
      },
      {
        key: 'onPressCustomCommandAdd',
        value: function () {
          if (module381.RSM.isRunning) globals.showToast(module1969.LocalizationStrings.auto_split_will_trigger_after_cleaning_and_charing);
          else {
            module1969.SmartSceneLog('\u8df3\u8f6c -- \u6dfb\u52a0\u6307\u4ee4');
            this.props.navigation.navigate('SmartCommandEditView', {
              title: module1969.LocalizationStrings.smart_scene_edit_title,
              onEditCommand: this.onAddCommandFromEditView.bind(this),
              editingIndex: -1,
            });
          }
        },
      },
      {
        key: 'onPressCustomCommandMore',
        value: function (t, n) {
          var o = n.x,
            s = n.y;
          this.editingIndex = t;
          var c = 32 + 48 * this.actions.length + s + 36 - module13.Dimensions.get('window').height;
          if (c > 0)
            this.scrollView.scrollTo({
              x: 0,
              y: this.contentOffsetY + c,
              animated: true,
            });
          else c = 0;
          this.settingModal.show(
            {
              x: o,
              y: s - c,
            },
            this.actions
          );
        },
      },
      {
        key: 'onPressRecommendCommandAdd',
        value: function (t) {
          if (this.commandsCount >= module1969.MaxCommandCount) globals.showToast(module1969.LocalizationStrings.smart_scene_reached_max_command_count_toast_hint);
          else if (module381.RSM.isRunning) globals.showToast(module1969.LocalizationStrings.auto_split_will_trigger_after_cleaning_and_charing);
          else this.addRecommendCommandWithTemplateID(this.state.recommendCommands.cards[t].templateId);
        },
      },
      {
        key: 'onPressActionSheetItem',
        value: function (t) {
          switch ((this.settingModal.hide(), this.actions[t])) {
            case module1969.SmartCommandAction.Edit:
              if (module381.RSM.isRunning) return void globals.showToast(module1969.LocalizationStrings.auto_split_will_trigger_after_cleaning_and_charing);
              else {
                module1969.SmartSceneLog('\u8df3\u8f6c\u7f16\u8f91\u6307\u4ee4, \u4f20\u5165\u6307\u4ee4\u6570\u636e: ' + JSON.stringify(this.commandsData[this.editingIndex]));
                return void this.props.navigation.navigate('SmartCommandEditView', {
                  title: module1969.LocalizationStrings.smart_scene_edit_title,
                  onEditCommand: this.onAddCommandFromEditView.bind(this),
                  data: {
                    command: this.commandsData[this.editingIndex],
                    index: this.editingIndex,
                  },
                });
              }

            case module1969.SmartCommandAction.EditTimer:
              return void this.props.navigation.navigate('SmartCommandTimer', {
                title: module1969.LocalizationStrings.localization_strings_Setting_Timer_SettingPage_16,
                data: this.commandsData[this.editingIndex],
                onEditTimer: this.onEditTimer.bind(this),
                autoActivateTrigger: true,
              });

            case module1969.SmartCommandAction.Rename:
              return void this.setState({
                renaming: true,
              });

            case module1969.SmartCommandAction.Sort:
              return void this.setState({
                isSorting: true,
              });

            case module1969.SmartCommandAction.Delete:
              return void this.deleteCommand();
          }
        },
      },
      {
        key: 'configNavigationBar',
        value: function () {
          this.props.navigation.setParams({
            navBarBackgroundColor: globals.app.state.theme.settingBackgroundColor,
            title: '',
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'loadData',
        value: function () {
          var t = this,
            n = function () {
              t.loadRecommandData();
              t.setState({
                isLoading: true,
              });
              module1969.SmartSceneLog('\u5373\u5c06\u83b7\u53d6\u670d\u52a1\u7aef\u547d\u4ee4\u5217\u8868.');
              module1968.SmartSceneAPI.getCommandList()
                .then(function (n) {
                  var o = n.commands,
                    s = n.tidList;
                  module1969.SmartSceneLog(
                    '\u83b7\u53d6\u670d\u52a1\u7aef\u547d\u4ee4\u5217\u8868\u6210\u529f, \u547d\u4ee4\u6570\u636e: ' +
                      JSON.stringify(o) +
                      ', \u6709\u6548\u7684\u4e91\u7aefTID: ' +
                      s
                  );
                  t.setState({
                    customCommands: new module1969.CommandListSectionData(module1969.LocalizationStrings.smart_scene_custom_commands, o),
                  });
                  t.setState({
                    isLoading: false,
                  });
                  t.doOperationsFromAppIfNeeded(function () {
                    var n, o, s;
                    console.log('TIDList: ' + (null == (n = module1968.SmartSceneAPI.commandListCache) ? undefined : n.tidList));
                    t.sync(null != (o = null == (s = module1968.SmartSceneAPI.commandListCache) ? undefined : s.tidList) ? o : []);
                  });
                })
                .catch(function (t) {
                  module1969.SmartSceneLog('\u83b7\u53d6\u670d\u52a1\u7aef\u547d\u4ee4\u5217\u8868\u5931\u8d25. ' + JSON.stringify(t));
                })
                .finally(function () {
                  t.setState({
                    isLoading: false,
                  });
                  module415.MM.getMultiMaps();
                });
            };

          if (module381.RSM.state != module381.RobotState.UNKNOWN && module415.MM.hasGotMultiMap) n();
          else {
            var o = function (t, n) {
              var o = 0;
              return new Promise(function (s, c) {
                var l = setInterval(function () {
                  if (++o > 20) {
                    c('ReachedMaxTryCount');
                    return void clearInterval(l);
                  }

                  if (t()) {
                    s();
                    clearInterval(l);
                  } else if (!(null == n)) n();
                }, 1e3);
              });
            };

            this.setState({
              isLoading: true,
            });
            Promise.all([
              o(function () {
                return module381.RSM.state != module381.RobotState.UNKNOWN;
              }),
              o(
                function () {
                  return module415.MM.hasGotMultiMap;
                },
                function () {
                  return module415.MM.getMultiMaps();
                }
              ),
            ])
              .then(function () {
                n();
              })
              .catch(function (n) {
                t.setState({
                  isLoading: false,
                });
                globals.showToast(module1969.LocalizationStrings.map_object_ignore_failed);
              });
          }
        },
      },
      {
        key: 'loadRecommandData',
        value: function () {
          var t =
            module390.default.isShakeMopSetSupported() && !(module424.DMM.isUltronE || module424.DMM.isUltronLite || module424.DMM.isTanosSLitePlus)
              ? [module1969.RecommendGlobal, module1969.RecommendDiningArea, module1969.RecommendCleanThenMop]
              : [module1969.RecommendGlobal, module1969.RecommendDiningArea];
          this.setState({
            recommendCommands: new module1969.CommandListSectionData(module1969.LocalizationStrings.smart_scene_recommend_commands, t),
          });
        },
      },
      {
        key: 'doOperationsFromAppIfNeeded',
        value: function (t) {
          var n,
            o,
            s,
            c = null == (n = globals.initialData) ? undefined : null == (o = n.initialPage) ? undefined : null == (s = o.data) ? undefined : s.templateId;

          if (null != c && undefined != c) {
            if (this.commandsCount >= module1969.MaxCommandCount) {
              globals.showToast(module1969.LocalizationStrings.smart_scene_reached_max_command_count_toast_hint);
              return void (null == t || t());
            }

            if (module381.RSM.isRunning) {
              globals.showToast(module1969.LocalizationStrings.auto_split_will_trigger_after_cleaning_and_charing);
              return void (null == t || t());
            }

            this.addRecommendCommandWithTemplateID(c, t);
          } else null == t || t();
        },
      },
      {
        key: 'sync',
        value: function (t) {
          module1969.SmartSceneLog('\u5373\u5c06\u540c\u6b65TID, \u5f53\u524d\u6709\u6548\u4e91\u7aefTID: ' + t);
          var module22 = [];
          module1969.SmartSceneLog('\u5373\u5c06\u83b7\u53d6\u8bbe\u5907TID.');
          module416.default
            .getScenes()
            .then(function (o) {
              var s;
              module22 = (null != (s = o.result) ? s : []).map(function (t) {
                return t.tid;
              });
              module1969.SmartSceneLog('\u83b7\u53d6\u8bbe\u5907TID\u6210\u529f, \u6709\u6548\u7684\u8bbe\u5907TID: ' + module22);
              return module1968.SmartSceneAPI.sync(module22, t);
            })
            .then(function (t) {
              module1969.SmartSceneLog('\u540c\u6b65TID\u6210\u529f, \u6709\u6548\u7684\u8bbe\u5907TID: ' + t);
            })
            .catch(function (t) {
              module1969.SmartSceneLog('\u540c\u6b65TID\u5931\u8d25, ' + JSON.stringify(t));
            });
        },
      },
      {
        key: 'renameCommand',
        value: function (t) {
          var n,
            o = this;
          module1968.SmartSceneAPI.renameCommand(null == (n = this.commandsData[this.editingIndex]) ? undefined : n.id, t)
            .then(function () {
              o.commandsData[o.editingIndex].name = t;
              o.setState({
                customCommands: o.state.customCommands,
                renaming: false,
              });
            })
            .catch(function (t) {
              globals.showToast(module1969.LocalizationStrings.map_object_ignore_failed);
              o.setState({
                renaming: false,
              });
            });
        },
      },
      {
        key: 'deleteCommand',
        value: function () {
          var t,
            n = this;
          module1968.SmartSceneAPI.deleteCommand(null == (t = this.commandsData[this.editingIndex]) ? undefined : t.id)
            .then(function () {
              n.commandsData.splice(n.editingIndex, 1);
              n.setState({
                customCommands: n.state.customCommands,
              });
            })
            .catch(function (t) {});
        },
      },
      {
        key: 'addRecommendCommandWithTemplateID',
        value: function (t, n) {
          switch (t) {
            case module1969.SmartSceneTemplateID.GlobalClean:
              this.addRecommendCommand(module1969.RecommendGlobal, n);
              break;

            case module1969.SmartSceneTemplateID.DiningAreaClean:
              return void this.addRecommendDiningAndClean(n);

            case module1969.SmartSceneTemplateID.NewCommand:
              return void (null == n || n());

            case module1969.SmartSceneTemplateID.CleanAndMop:
              this.addRecommendCommand(module1969.RecommendCleanThenMop, n);
              break;

            default:
              return void (null == n || n());
          }
        },
      },
      {
        key: 'addRecommendCommand',
        value: function (t, o) {
          var s,
            c = this,
            l = module22.default(new module1969.CommandCardData(), t),
            u = null != (s = null == l ? undefined : l.tasks) ? s : [];
          this.startLoading();
          Promise.all(
            u.map(function (t) {
              return module1968.SmartSceneAPI.syncTaskToRobot(t);
            })
          )
            .then(function () {
              return module1968.SmartSceneAPI.addCommand(l.name, l.actionModel);
            })
            .then(function (t) {
              l.type = module1969.CommandCardType.Custom;
              l.id = t;
              c.commandsData.splice(0, 0, l);
              c.setState({
                customCommands: c.state.customCommands,
              });
              globals.showToast(module1969.LocalizationStrings.smart_scene_add_command_success);
            })
            .catch(function (t) {
              globals.showToast(module1969.LocalizationStrings.map_object_ignore_failed);
            })
            .finally(function () {
              if (!(null == o)) o();
              c.endLoading();
            });
        },
      },
      {
        key: 'addRecommendDiningAndClean',
        value: function (t) {
          var o,
            s,
            c,
            l = this,
            u = function () {
              var o = [],
                s = [];
              module415.MM.roomNameMapping
                .filter(function (t) {
                  return 3 == (null == t ? undefined : t.length);
                })
                .map(function (t) {
                  var n = t[0],
                    c = t[2];
                  if (13 == c) o.push(n);
                  if (14 == c) s.push(n);
                });
              var c = {
                  name: module1969.RecommendDiningArea.name,
                  data: [
                    {
                      id: 0,
                      name: module1969.LocalizationStrings.smart_scene_add_dining_room_and_kitchen_hint,
                      mode: module1970.SmartSceneMode.Segment,
                      customMode: module1969.RecommendDiningArea.tasks[0].customMode,
                      data: {
                        segs: [].concat(o, s),
                      },
                      isModeFixed: true,
                      isCustomModeFixed: true,
                    },
                  ],
                },
                u = -1 != module381.RSM.currentMapId && module381.RSM.mapStatus != module381.MapStatus.None;

              if (o.length > 0 && s.length > 0 && u) {
                var h,
                  f = module22.default(new module1969.CommandCardData(), module1969.RecommendDiningArea);
                f.mapFlag = module381.RSM.currentMapId;
                if (!(null == (h = f.tasks)))
                  h.forEach(function (t) {
                    t.serverName = t.name;
                    t.mapFlag = module381.RSM.currentMapId;
                    t.alias = null;
                    t.segments = [].concat(o, s);
                  });
                l.addRecommendCommand(f, t);
              } else {
                l.props.navigation.navigate('SmartCommandEditView', {
                  title: module1969.LocalizationStrings.smart_scene_edit_title,
                  templates: c,
                  onEditCommand: l.onAddCommandFromEditView.bind(l),
                  data: {},
                });
                if (!(null == t)) t();
              }
            };

          if (module415.MM.roomNameMapping) u();
          else {
            this.startLoading();
            ((o = function () {
              return null != module415.MM.roomNameMapping;
            }),
            (s = function () {
              return module415.MM.updateRoomNameMapping();
            }),
            (c = 0),
            new Promise(function (t, n) {
              var l = setInterval(function () {
                if (++c > 5) {
                  n('ReachedMaxTryCount');
                  return void clearInterval(l);
                }

                if (o()) {
                  t();
                  clearInterval(l);
                } else if (!(null == s)) s();
              }, 1e3);
            }))
              .then(function () {
                u();
              })
              .catch(function (n) {
                globals.showToast(module1969.LocalizationStrings.map_object_ignore_failed);
                if (!(null == t)) t();
              })
              .finally(function () {
                l.endLoading();
              });
          }
        },
      },
      {
        key: 'onAddCommandFromEditView',
        value: function (t) {
          var n = t.index;

          if (-1 == n) {
            module1969.SmartSceneLog('\u63a5\u6536\u5230\u6dfb\u52a0\u6307\u4ee4\u6210\u529f\u56de\u8c03 - ' + JSON.stringify(t));
            this.commandsData.splice(0, 0, t.command);
          } else this.commandsData[n] = t.command;

          this.setState({
            customCommands: this.state.customCommands,
          });
        },
      },
      {
        key: 'onEditTimer',
        value: function () {
          this.setState({
            customCommands: this.state.customCommands,
          });
        },
      },
      {
        key: 'onEditRecommendCommand',
        value: function (t) {},
      },
      {
        key: 'startLoading',
        value: function () {
          var t;
          if (!(null == (t = this.loadingView) || null == t.showWithText)) t.showWithText(module1969.LocalizationStrings.localization_strings_Common_Constants_19);
        },
      },
      {
        key: 'endLoading',
        value: function () {
          var t;
          if (!(null == (t = this.loadingView) || null == t.hide)) t.hide();
        },
      },
      {
        key: 'actions',
        get: function () {
          var t,
            n,
            o = null != (t = null == (n = this.commandsData[this.editingIndex]) ? undefined : n.isInvalid) && t,
            s = module393.isSupportSceneOrders();
          return o
            ? [module1969.SmartCommandAction.Edit, module1969.SmartCommandAction.Rename, module1969.SmartCommandAction.Delete]
            : s
            ? [
                module1969.SmartCommandAction.Edit,
                module1969.SmartCommandAction.EditTimer,
                module1969.SmartCommandAction.Rename,
                module1969.SmartCommandAction.Sort,
                module1969.SmartCommandAction.Delete,
              ]
            : [module1969.SmartCommandAction.Edit, module1969.SmartCommandAction.EditTimer, module1969.SmartCommandAction.Rename, module1969.SmartCommandAction.Delete];
        },
      },
      {
        key: 'commandsData',
        get: function () {
          var t;
          return null != (t = this.state.customCommands.cards) ? t : [];
        },
      },
      {
        key: 'commandsCount',
        get: function () {
          var t, n;
          return null != (t = null == (n = this.commandsData) ? undefined : n.length) ? t : 0;
        },
      },
    ]);
    return k;
  })(React.default.Component);

exports.default = b;
b.contextType = module1200.AppConfigContext;

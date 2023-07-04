var module50 = require('./50'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module385 = require('./385'),
  module2167 = require('./2167'),
  module2170 = require('./2170'),
  module415 = require('./415'),
  module1124 = require('./1124'),
  module381 = require('./381'),
  module1199 = require('./1199'),
  module13 = require('./13'),
  module1968 = require('./1968'),
  module1967 = require('./1967'),
  module1347 = require('./1347'),
  module1969 = require('./1969');

function b(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function I(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      b(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      b(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function z() {
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

var C = (function (t) {
  module9.default(C, t);

  var module50 = C,
    module1199 = z(),
    b = function () {
      var t,
        o = module12.default(module50);

      if (module1199) {
        var s = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function C(t) {
    var n;
    module6.default(this, C);
    (n = b.call(this, t)).data = null;

    n.confirmcallBack = function () {};

    n.list = [];
    n.state = {
      taskListState: module1968.TaskListState.Normal,
      editingTaskIndex: null,
      tasks: [],
      cleanOnMap: {
        flag: module381.RSM.currentMapId,
        name: -1 == module381.RSM.currentMapId ? module1968.LocalizationStrings.no_seg_map_tip : module415.MM.getCurrentMapName(),
      },
      isNamingCommand: false,
      commandName: '',
      isConfirmEnabled: true,
      isSortingTasks: false,
    };
    n.mapDataProvider = new module1347.MultiMapDataProvider();
    n.initData();
    return n;
  }

  module7.default(C, [
    {
      key: 'componentDidMount',
      value: function () {
        this.loadData();
      },
    },
    {
      key: 'componentDidUpdate',
      value: function () {
        var t, n, o;
        if (this.state.taskListState == module1968.TaskListState.Editing && 0 == this.tasksFromListRefs.length) {
          if (!(null == (t = this.confirmButton) || null == t.setEnabled)) t.setEnabled(false);
        } else if (!(null == (n = this.confirmButton) || null == n.setEnabled))
          n.setEnabled(this.state.tasks.length > 0 || (null == (o = this.currentEditingTaskView) ? undefined : o.isConfirmEnabled));
      },
    },
    {
      key: 'render',
      value: function () {
        var t,
          n,
          s,
          l = this,
          u = module415.MM.maps.length > 1 || (1 == module415.MM.maps.length && -1 == module381.RSM.currentMapId);
        return React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            module13.ScrollView,
            {
              ref: function (t) {
                return (l.scrollView = t);
              },
              style: {
                backgroundColor: this.context.theme.componentBackgroundColor,
              },
              bounces: false,
              disableScrollViewPanResponder: true,
              contentContainerStyle: {
                paddingTop: 10,
                paddingBottom: 20,
                minHeight: module13.Dimensions.get('window').height,
              },
              showsVerticalScrollIndicator: false,
            },
            u &&
              React.default.createElement(
                module13.View,
                {
                  style: {
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    paddingTop: 15,
                  },
                },
                React.default.createElement(
                  module13.Text,
                  {
                    style: {
                      color: l.context.theme.mainTextColor,
                      fontSize: 18,
                      marginHorizontal: 10,
                      fontWeight: 'bold',
                      marginBottom: 5,
                    },
                  },
                  module1968.LocalizationStrings.multi_map_select_map_title
                ),
                React.default.createElement(module2167.default, {
                  name: l.state.cleanOnMap.name,
                  type: module1968.TaskListItemType.Location,
                  onPress: l.onPressCleanLocationItem.bind(l),
                })
              ),
            ((n =
              l.state.tasks.length < module1968.MaxTaskCountPerCommand
                ? React.default.createElement(module2167.default, {
                    type: module1968.TaskListItemType.TaskAdd,
                    name: module1968.LocalizationStrings.smart_scene_add_task,
                    onPressAdd: l.onPressAddTask.bind(l),
                  })
                : React.default.createElement(React.default.Fragment, null)),
            (s =
              null == (t = l.templateData)
                ? undefined
                : null == t.map
                ? undefined
                : t.map(function (t) {
                    var n;
                    return l.state.tasks.find(function (n) {
                      var o;
                      return (null == n ? undefined : null == (o = n.template) ? undefined : o.id) == t.id;
                    })
                      ? React.default.createElement(React.default.Fragment, null)
                      : React.default.createElement(module2167.default, {
                          type: module1968.TaskListItemType.AddingTemplate,
                          name: null != (n = t.name) ? n : module1968.LocalizationStrings.smart_scene_add_task,
                          onPressAdd: function () {
                            return l.onPressEditTemplate(t);
                          },
                        });
                  })),
            React.default.createElement(
              module13.View,
              {
                style: {
                  paddingHorizontal: 20,
                },
              },
              React.default.createElement(
                module13.View,
                {
                  style: {
                    flexDirection: 'column',
                    marginVertical: 6,
                    marginHorizontal: 10,
                    marginTop: 12,
                  },
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: {
                      flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                      justifyContent: 'space-between',
                    },
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: {
                        color: l.context.theme.mainTextColor,
                        fontSize: 18,
                        fontWeight: 'bold',
                      },
                    },
                    module1968.LocalizationStrings.smart_scene_task_list_title
                  ),
                  !(0 == l.state.tasks.length && l.state.taskListState == module1968.TaskListState.Normal) &&
                    React.default.createElement(
                      module13.TouchableWithoutFeedback,
                      {
                        onPress: l.onPressEditTasks.bind(l),
                      },
                      React.default.createElement(
                        module13.Text,
                        {
                          style: {
                            color: '#007AFF',
                            fontSize: 16,
                          },
                          numberOfLines: 1,
                        },
                        l.editHint
                      )
                    )
                ),
                React.default.createElement(
                  module13.Text,
                  {
                    style: {
                      color: l.context.theme.subTextColor,
                      fontSize: 14,
                      marginTop: 6,
                    },
                  },
                  module1968.LocalizationStrings.smart_scene_edit_command_list_subtitle
                )
              ),
              (function () {
                var t = {
                  onPanResponderGrant: function () {
                    return l.scrollView.setNativeProps({
                      scrollEnabled: false,
                    });
                  },
                  onPanResponderStart: function () {
                    return l.scrollView.setNativeProps({
                      scrollEnabled: false,
                    });
                  },
                  onPanResponderEnd: function () {
                    return l.scrollView.setNativeProps({
                      scrollEnabled: true,
                    });
                  },
                  onPanResponderRelease: function () {
                    return l.scrollView.setNativeProps({
                      scrollEnabled: true,
                    });
                  },
                  taskDidUpdate: function () {
                    var t, n;
                    if (!(null == (t = l.confirmButton) || null == t.setEnabled))
                      t.setEnabled(l.state.tasks.length > 0 || (null == (n = l.currentEditingTaskView) ? undefined : n.isConfirmEnabled));
                  },
                };

                switch (l.state.taskListState) {
                  case module1968.TaskListState.Normal:
                    return React.default.createElement(
                      React.default.Fragment,
                      null,
                      l.state.tasks.map(function (t, n) {
                        return React.default.createElement(
                          module2167.default,
                          module22.default(
                            {
                              key: n,
                            },
                            t,
                            {
                              isInvalid: t.isInvalid,
                              onPress: function () {
                                return l.onPressEditTaskDetail(n);
                              },
                            }
                          )
                        );
                      }),
                      l.templateData ? s : n
                    );

                  case module1968.TaskListState.Adding:
                    return React.default.createElement(
                      React.default.Fragment,
                      null,
                      l.state.tasks.map(function (n, s) {
                        return s == l.state.editingTaskIndex
                          ? React.default.createElement(
                              module2170.default,
                              module22.default(
                                {
                                  ref: function (t) {
                                    return (l.currentEditingTaskView = t);
                                  },
                                  data: n,
                                  onPressConfirm: l.onPressEditTaskConfirm.bind(l),
                                },
                                t
                              )
                            )
                          : React.default.createElement(
                              module2167.default,
                              module22.default({}, n, {
                                onPress: function () {
                                  return l.onPressEditTaskDetail(s);
                                },
                              })
                            );
                      }),
                      -1 == l.state.editingTaskIndex &&
                        React.default.createElement(
                          module2170.default,
                          module22.default(
                            {
                              ref: function (t) {
                                return (l.currentEditingTaskView = t);
                              },
                              data: null,
                              onPressConfirm: l.onPressAddTaskConfirm.bind(l),
                            },
                            t
                          )
                        )
                    );

                  case module1968.TaskListState.AddingTemplate:
                    return React.default.createElement(
                      React.default.Fragment,
                      null,
                      l.state.tasks.map(function (n, s) {
                        return s == l.state.editingTaskIndex
                          ? React.default.createElement(
                              module2170.default,
                              module22.default(
                                {
                                  data: n,
                                  ref: function (t) {
                                    return (l.currentEditingTaskView = t);
                                  },
                                  onPressConfirm: l.onPressEditTaskConfirm.bind(l),
                                },
                                t
                              )
                            )
                          : React.default.createElement(
                              module2167.default,
                              module22.default({}, n, {
                                onPress: function () {
                                  return l.onPressEditTaskDetail(s);
                                },
                              })
                            );
                      }),
                      -1 == l.state.editingTaskIndex &&
                        React.default.createElement(
                          module2170.default,
                          module22.default(
                            {
                              ref: function (t) {
                                return (l.currentEditingTaskView = t);
                              },
                              template: l.state.editingTemplate,
                              onPressConfirm: l.onPressAddTaskConfirm.bind(l),
                            },
                            t
                          )
                        )
                    );

                  case module1968.TaskListState.Editing:
                    return React.default.createElement(
                      React.default.Fragment,
                      null,
                      l.state.tasks.map(function (t, n) {
                        return React.default.createElement(
                          module2167.default,
                          module22.default(
                            {
                              ref: function (t) {
                                l.list[n] = t;
                              },
                              onPanGranted: function () {
                                return l.scrollView.setNativeProps({
                                  scrollEnabled: false,
                                });
                              },
                              onPanEnd: function () {
                                return l.scrollView.setNativeProps({
                                  scrollEnabled: true,
                                });
                              },
                              isInvalid: t.isInvalid,
                            },
                            t,
                            {
                              totalTasks: l.state.tasks.length,
                              editing: true,
                              index: n,
                              moveItem: l.onMoveItem.bind(l),
                              onPressDelete: l.onPressDelete.bind(l),
                            }
                          )
                        );
                      })
                    );
                }
              })()
            )),
            React.default.createElement(module1124.MultiMapSelectView, {
              didSelectMap: this.onSelectMap.bind(this),
              ref: function (t) {
                return (l.mapSelectView = t);
              },
            }),
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'loading_view_loading',
              closeAccessibilityLabelKey: 'loading_view_loading_close',
              ref: function (t) {
                l.loadingView = t;
              },
              showButton: true,
            })
          ),
          React.default.createElement(module385.InputDialog, {
            visible: this.state.isNamingCommand,
            title: module1968.LocalizationStrings.smart_scene_input_dialog_title,
            inputPlaceholder: module1968.LocalizationStrings.smart_scene_input_dialog_title,
            inputDefaultValue: this.state.commandName,
            onPressConfirmButton: function (t) {
              return l.onPressInputDialogConfirm.apply(l, [t]);
            },
            onPressCancelButton: function () {
              return l.setState({
                isNamingCommand: false,
              });
            },
            warningText: module1968.LocalizationStrings.floor_map_name_too_long,
            warningVisibilityAdapter: function (t) {
              return t.length > 20;
            },
          })
        );
      },
    },
    {
      key: 'onPressMenuConfirm',
      value: function () {
        var t = this,
          n = function () {
            var n;
            if (t.isContainInvalidTask) globals.showToast(module1968.LocalizationStrings.invalid_task_detected_hint);
            else {
              var o,
                s = function () {
                  if (t.isEditing) t.commit();
                  else
                    t.setState({
                      isNamingCommand: true,
                    });
                };

              if (null == (n = t.currentEditingTaskView) ? undefined : n.isConfirmEnabled)
                null == (o = t.currentEditingTaskView) ||
                  null == o.commit ||
                  o.commit(function (t) {
                    if (t) s();
                  });
              else s();
            }
          };

        if (this.state.taskListState == module1968.TaskListState.Editing)
          this.setState(
            {
              tasks: this.tasksFromListRefs,
              taskListState: module1968.TaskListState.Normal,
            },
            function () {
              n();
            }
          );
        else n();
      },
    },
    {
      key: 'onPressCleanLocationItem',
      value: function () {
        var t;
        if (!(module415.MM.maps.length < 1 || null == (t = this.mapSelectView) || null == t.show)) t.show();
      },
    },
    {
      key: 'onSelectMap',
      value: function (t) {
        var n,
          o = this;
        if (!(null == (n = this.mapSelectView)))
          n.hide(function () {
            var n = function () {
              var n = o.state.cleanOnMap;

              if (
                (o.setState({
                  cleanOnMap: {
                    flag: t.id,
                    name: t.name,
                  },
                }),
                t.id != module381.RSM.currentMapId)
              ) {
                var s = function () {
                  return new Promise(function (n, s) {
                    o.mapDataProvider
                      .loadMap(t.id)
                      .then(function () {
                        return module381.RSM.waitUntilStateIsNotLocked();
                      })
                      .then(function () {
                        n();
                      })
                      .catch(function (t) {
                        s(t);
                      });
                  });
                };

                if (o.state.tasks.length > 0)
                  globals.Alert.alert('', module1968.LocalizationStrings.smart_scene_edit_switch_map_warning_title, [
                    {
                      text: module1968.LocalizationStrings.localization_strings_Main_MainPage_11,
                      onPress: function () {
                        o.setState({
                          cleanOnMap: n,
                        });
                      },
                    },
                    {
                      text: module1968.LocalizationStrings.localization_strings_Main_Error_ErrorDetailPage_3,
                      onPress: function () {
                        o.startLoading();
                        s()
                          .then(function () {
                            globals.showToast(module1968.LocalizationStrings.map_reset_page_operate_success);
                            o.setState({
                              tasks: [],
                              taskListState: module1968.TaskListState.Normal,
                            });
                          })
                          .catch(function (t) {
                            globals.showToast(module1968.LocalizationStrings.robot_communication_exception);
                            o.setState({
                              cleanOnMap: n,
                            });
                          })
                          .finally(function () {
                            o.endLoading();
                          });
                      },
                    },
                  ]);
                else {
                  o.startLoading();
                  s()
                    .then(function () {
                      globals.showToast(module1968.LocalizationStrings.map_reset_page_operate_success);
                      o.setState({
                        tasks: [],
                        taskListState: module1968.TaskListState.Normal,
                      });
                    })
                    .catch(function (t) {
                      globals.showToast(module1968.LocalizationStrings.robot_communication_exception);
                      o.setState({
                        cleanOnMap: n,
                      });
                    })
                    .finally(function () {
                      o.endLoading();
                    });
                }
              }
            };

            if (-1 == module381.RSM.currentMapId && module381.RSM.mapStatus != module381.MapStatus.None) {
              var s = {
                  text: module1968.LocalizationStrings.localization_strings_Main_MainPage_11,
                },
                l = {
                  text: module1968.LocalizationStrings.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    n();
                  },
                };
              globals.Alert.alert(module1968.LocalizationStrings.delete_new_map_if_switch_map_hint, '', [s, l]);
            } else n();
          });
      },
    },
    {
      key: 'onPressAddTask',
      value: function () {
        var t = this;
        module1968.SmartSceneLog('\u6dfb\u52a0\u4efb\u52a1');
        this.setState(
          {
            taskListState: module1968.TaskListState.Adding,
            editingTaskIndex: -1,
          },
          function () {
            setTimeout(function () {
              var n;
              if (!(null == (n = t.scrollView) || null == n.scrollToEnd)) n.scrollToEnd();
            }, 500);
          }
        );
      },
    },
    {
      key: 'onPressEditTasks',
      value: function () {
        switch (this.state.taskListState) {
          case module1968.TaskListState.Editing:
            this.setState({
              tasks: this.tasksFromListRefs,
              taskListState: module1968.TaskListState.Normal,
            });
            break;

          case module1968.TaskListState.Adding:
            this.setState({
              taskListState: module1968.TaskListState.Normal,
            });
            break;

          case module1968.TaskListState.Normal:
            this.setState({
              taskListState: module1968.TaskListState.Editing,
            });
        }
      },
    },
    {
      key: 'onPressEditTemplate',
      value: function (t) {
        this.setState({
          taskListState: module1968.TaskListState.AddingTemplate,
          editingTaskIndex: -1,
          editingTemplate: t,
        });
      },
    },
    {
      key: 'onPressEditTaskDetail',
      value: function (t) {
        this.setState({
          taskListState: module1968.TaskListState.Adding,
          editingTaskIndex: t,
        });
      },
    },
    {
      key: 'onPressAddTaskConfirm',
      value: function (t, n, o, s) {
        var l,
          u,
          c,
          f = this;
        module1968.SmartSceneLog('\u6dfb\u52a0\u4efb\u52a1');
        var p =
            null !=
            (l =
              null == (u = this.state.tasks)
                ? undefined
                : null == u.map
                ? undefined
                : null ==
                  (c = u.map(function (t) {
                    return t.id;
                  }))
                ? undefined
                : null == c.reduce
                ? undefined
                : c.reduce(function (t, n) {
                    return t ** n;
                  }, 0))
              ? l
              : 0,
          S = t.mode == module1969.SmartSceneMode.Segment ? this.segmentTaskName(t.segments, o) : null,
          h = {
            name: S || t.name,
            customMode: t.customMode,
            type: module1968.TaskListItemType.Task,
            mode: t.mode,
            repeat: t.repeat,
            zones: t.zones,
            segments: t.segments,
            tid: t.tid,
            id: p + 1,
            serverName: S,
          };

        if (n) {
          var v,
            k =
              null == (v = this.templateData)
                ? undefined
                : null == v.find
                ? undefined
                : v.find(function (t) {
                    return t.id == n.id;
                  });
          h.template = k;
        }

        this.startLoading();
        module1968.SmartSceneLog('\u5411\u8bbe\u5907\u53d1\u9001\u8bf7\u6c42 - \u6dfb\u52a0\u4efb\u52a1 - ' + t.mode);
        this.syncTaskToRobot(t)
          .then(function (t) {
            h.tid = t.tid;
            h.zones = t.zones;
            module1968.SmartSceneLog('\u5411\u8bbe\u5907\u53d1\u9001\u8bf7\u6c42 - \u6dfb\u52a0\u4efb\u52a1\u6210\u529f. ' + JSON.stringify(h));
            f.setState({
              tasks: f.state.tasks.concat([h]),
              taskListState: module1968.TaskListState.Normal,
            });
            if (!(null == s)) s(true);
          })
          .catch(function (t) {
            var n, o, l, u, c, f;
            if (-10007 == (null == t ? undefined : null == (n = t.data) ? undefined : null == (o = n.error) ? undefined : o.code))
              globals.showToast(module1968.LocalizationStrings.smart_scene_firmware_zone_reach_max_count);
            else if (-10003 == (null == t ? undefined : null == (l = t.data) ? undefined : null == (u = l.error) ? undefined : u.code))
              globals.showToast(module1968.LocalizationStrings.toast_frequently_operate);
            else if (
              'err.network' == (null == t ? undefined : null == (c = t.data) ? undefined : c.error) ||
              'timeout' == (null == t ? undefined : null == (f = t.data) ? undefined : f.error)
            )
              globals.showToast(module1968.LocalizationStrings.localization_strings_Setting_History_index_1);
            else globals.showToast(module1968.LocalizationStrings.map_object_ignore_failed + ' (Device)');
            if (!(null == s)) s(false);
            module1968.SmartSceneLog('\u5411\u8bbe\u5907\u53d1\u9001\u8bf7\u6c42 - \u6dfb\u52a0\u4efb\u52a1\u5931\u8d25. ' + JSON.stringify(t));
          })
          .finally(function () {
            f.endLoading();
          });
      },
    },
    {
      key: 'onPressEditTaskConfirm',
      value: function (t, n, o, s) {
        var l,
          u,
          c,
          f = this;
        this.startLoading();
        var p =
          null !=
          (l =
            null == (u = this.state.tasks)
              ? undefined
              : null == u.map
              ? undefined
              : null ==
                (c = u.map(function (t) {
                  return t.id;
                }))
              ? undefined
              : null == c.reduce
              ? undefined
              : c.reduce(function (t, n) {
                  return t ** n;
                }, 0))
            ? l
            : 0;
        if (!(null != t.id && undefined != t.id)) t.id = p + 1;
        var S = t.isInvalid
            ? {}
            : {
                tid: t.tid,
              },
          h = t.mode == module1969.SmartSceneMode.Segment ? this.segmentTaskName(t.segments, o) : '';
        if (t.mode != module1969.SmartSceneMode.Segment) t.name = module1968.taskNameWithMode(t.mode);
        var v = I(
          I(
            {
              name: h || t.name,
              customMode: t.customMode,
              type: module1968.TaskListItemType.Task,
              mode: t.mode,
              repeat: t.repeat,
              zones: t.zones,
              segments: t.segments,
            },
            S
          ),
          {},
          {
            id: t.id,
            serverName: h,
          }
        );
        console.log('SSC-WillEditTask: EditTask: ' + JSON.stringify(t) + ', ' + JSON.stringify(v));
        this.syncTaskToRobot(t)
          .then(function (t) {
            v.tid = t.tid;
            v.zones = t.zones;
            console.log('SSC-DidEditTask: ' + JSON.stringify(v));
            f.state.tasks[f.state.editingTaskIndex] = v;
            f.setState({
              tasks: f.state.tasks,
              taskListState: module1968.TaskListState.Normal,
            });
            if (!(null == s)) s(true);
          })
          .catch(function (t) {
            var n, o, l, u, c, f;
            if (-10007 == (null == t ? undefined : null == (n = t.data) ? undefined : null == (o = n.error) ? undefined : o.code))
              globals.showToast(module1968.LocalizationStrings.smart_scene_firmware_zone_reach_max_count);
            else if (-10003 == (null == t ? undefined : null == (l = t.data) ? undefined : null == (u = l.error) ? undefined : u.code))
              globals.showToast(module1968.LocalizationStrings.toast_frequently_operate);
            else if (
              'err.network' == (null == t ? undefined : null == (c = t.data) ? undefined : c.error) ||
              'timeout' == (null == t ? undefined : null == (f = t.data) ? undefined : f.error)
            )
              globals.showToast(module1968.LocalizationStrings.localization_strings_Setting_History_index_1);
            else globals.showToast(module1968.LocalizationStrings.map_object_ignore_failed + ' (Device)');
            console.log('SSC-FailedEditTask: ' + JSON.stringify(t));
            if (!(null == s)) s(false);
          })
          .finally(function () {
            f.endLoading();
          });
      },
    },
    {
      key: 'onMoveItem',
      value: function (t, n) {
        var o = this.list[t],
          s = this.list[n];
        this.list[n].setFakeIndex(t);
        this.list[n] = o;
        this.list[t] = s;
      },
    },
    {
      key: 'onPressDelete',
      value: function (t) {
        var n = this,
          o = new Array(this.state.tasks.length);
        this.list
          .filter(function (t) {
            return null != t;
          })
          .map(function (s, l) {
            o[l] = n.state.tasks[s.props.index];
            if (s.props.index == t) o.splice(l, 1);
          });
        this.setState({
          tasks: o,
        });
      },
    },
    {
      key: 'onPressInputDialogConfirm',
      value: function (t) {
        this.setState({
          isNamingCommand: false,
        });
        this.commit(t);
      },
    },
    {
      key: 'initData',
      value: function () {
        this.confirmcallBack = this.props.navigation.getParam('onEditCommand', function () {});
        this.data = this.props.navigation.getParam('data', null);
        this.templates = this.props.navigation.getParam('templates', null);
        module1968.SmartSceneLog('\u63a5\u6536\u5230\u9875\u9762\u53c2\u6570: data: ' + this.data + ', templates: ' + this.templates);
      },
    },
    {
      key: 'loadData',
      value: function () {
        var t = this;
        if (module381.RSM.state != module381.RobotState.UNKNOWN && module415.MM.hasGotMultiMap) this.parseDataToState(this.data, this.templates);
        else {
          var n = function (t, n) {
            var o = 0;
            return new Promise(function (s, l) {
              var u = setInterval(function () {
                if (++o > 5) {
                  l('ReachedMaxTryCount');
                  return void clearInterval(u);
                }

                if (t()) {
                  s();
                  clearInterval(u);
                } else if (!(null == n)) n();
              }, 1e3);
            });
          };

          this.startLoading();
          Promise.all([
            n(function () {
              return module381.RSM.state != module381.RobotState.UNKNOWN;
            }),
            n(
              function () {
                return module415.MM.hasGotMultiMap;
              },
              function () {
                return module415.MM.getMultiMaps();
              }
            ),
            n(
              function () {
                return null != module415.MM.roomNameMapping;
              },
              function () {
                return module415.MM.updateRoomNameMapping();
              }
            ),
          ])
            .then(function () {
              t.parseDataToState(t.data, t.templates);
            })
            .catch(function (t) {
              globals.showToast(module1968.LocalizationStrings.map_object_ignore_failed);
            })
            .finally(function () {
              t.endLoading();
            });
        }
      },
    },
    {
      key: 'parseDataToState',
      value: function (t, n) {
        var o,
          s,
          l = this;
        module1968.SmartSceneLog('\u89e3\u6790\u9875\u9762\u53c2\u6570 -- data: ' + JSON.stringify(this.data) + ', templates: ' + JSON.stringify(this.templates));
        this.commandID = null == t ? undefined : null == (o = t.command) ? undefined : o.id;
        var u = null == t ? undefined : null == (s = t.command) ? undefined : s.mapFlag,
          c =
            undefined == u ||
            null == u ||
            !module415.MM.maps.find(function (t) {
              return t.id == u;
            });

        if (c) {
          module1968.SmartSceneLog('\u89e3\u6790\u9875\u9762\u53c2\u6570 -- \u5730\u56feID\u65e0\u6548\u6216\u4e3a\u7a7a, \u5c06\u4f7f\u7528\u5f53\u524d\u5730\u56fe');
          u = module381.RSM.currentMapId;
        }

        var f = function () {
          var n,
            o,
            s,
            f,
            p,
            S,
            h,
            v =
              null !=
              (n =
                null == t
                  ? undefined
                  : null == (o = t.command)
                  ? undefined
                  : null == (s = o.tasks)
                  ? undefined
                  : null == s.map
                  ? undefined
                  : s.map(function (t) {
                      return {
                        name: t.name,
                        mapFlag: t.mapFlag,
                        customMode: {
                          cleanMode: t.cleanMode,
                          waterMode: t.waterMode,
                          mopMode: t.mopMode,
                        },
                        type: module1968.TaskListItemType.Task,
                        mode: t.mode,
                        repeat: t.repeat,
                        segments: c ? null : t.segments,
                        zones: c ? null : t.zones,
                        id: t.id,
                        tid: t.tid,
                        isInvalid: t.isInvalid,
                        serverName: t.serverName,
                      };
                    }))
                ? n
                : [];
          l.setState(
            {
              tasks:
                null !=
                (f = v.filter(function (t) {
                  return t.mapFlag == u || t.mode == module1969.SmartSceneMode.GlobalClean || t.isInvalid;
                }))
                  ? f
                  : [],
              commandName: null != (p = null == t ? undefined : null == (S = t.command) ? undefined : S.name) ? p : null == (h = l.templates) ? undefined : h.name,
              cleanOnMap: {
                flag: module381.RSM.currentMapId,
                name: -1 == module381.RSM.currentMapId ? module1968.LocalizationStrings.no_seg_map_tip : module415.MM.getCurrentMapName(),
              },
            },
            function () {
              module1968.SmartSceneLog('\u89e3\u6790\u9875\u9762\u53c2\u6570 -- \u5b8c\u6210, \u521d\u59cbState: ' + JSON.stringify(l.state));
              l.configNavigationBar();
            }
          );
        };

        if (u != module381.RSM.currentMapId)
          setTimeout(function () {
            l.startLoading();
            module1968.SmartSceneLog('\u89e3\u6790\u9875\u9762\u53c2\u6570 -- \u5730\u56feID\u4e0e\u5f53\u524d\u5730\u56fe\u4e0d\u540c, \u52a0\u8f7d\u5730\u56fe: ID: ' + u);
            l.mapDataProvider
              .loadMap(u)
              .then(function () {
                module1968.SmartSceneLog('\u89e3\u6790\u9875\u9762\u53c2\u6570 -- \u52a0\u8f7d\u5730\u56fe\u6210\u529f');
                f();
              })
              .catch(function (t) {
                module1968.SmartSceneLog('\u89e3\u6790\u9875\u9762\u53c2\u6570 -- \u52a0\u8f7d\u5730\u56fe\u5931\u8d25, ' + JSON.stringify(t));
                globals.showToast(module1968.LocalizationStrings.map_object_ignore_failed);
              })
              .finally(function () {
                l.endLoading();
              });
          }, 100);
        else f();
      },
    },
    {
      key: 'configNavigationBar',
      value: function () {
        var t = this;
        this.props.navigation.setParams({
          hiddenBottomLine: true,
          rightItems: [
            module1124.MapEditCommonService.confirmButton(this.onPressMenuConfirm.bind(this), this.state.tasks.length > 0, function (n) {
              return (t.confirmButton = n);
            }),
          ],
        });
      },
    },
    {
      key: 'requestCommitChanges',
      value: function (t) {
        var n = this;
        if (null != this.commandID)
          return new Promise(function (o, s) {
            module1967.SmartSceneAPI.renameCommand(n.commandID, t.command.name)
              .then(function () {
                var o, s, l;
                module1968.SmartSceneLog(
                  '\u5373\u5c06\u5411\u4e91\u7aef\u8bf7\u6c42\u7f16\u8f91\u6307\u4ee4 -- name: ' + t.command.name + ', action: ' + JSON.stringify(t.command.actionModel)
                );
                return module1967.SmartSceneAPI.updateCommand(
                  n.commandID,
                  t.command.actionModel,
                  null != (o = null == (s = n.data) ? undefined : null == (l = s.command) ? undefined : l.triggerModel) ? o : []
                );
              })
              .then(function (t) {
                return o(n.commandID);
              })
              .catch(function (t) {
                return s(t);
              });
          });
        else {
          module1968.SmartSceneLog(
            '\u5373\u5c06\u5411\u4e91\u7aef\u8bf7\u6c42\u6dfb\u52a0\u6307\u4ee4 -- name: ' + t.command.name + ', action: ' + JSON.stringify(t.command.actionModel)
          );
          return module1967.SmartSceneAPI.addCommand(t.command.name, t.command.actionModel);
        }
      },
    },
    {
      key: 'commit',
      value: function () {
        var t,
          n,
          o,
          s,
          l = this,
          u = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : this.state.commandName,
          c = this.state.tasks.map(function (t) {
            return new module1968.TaskDescriptorData(
              t.customMode.cleanMode,
              t.customMode.waterMode,
              t.customMode.mopMode,
              t.mode,
              t.repeat,
              t.segments,
              t.zones,
              t.id,
              l.state.cleanOnMap.flag,
              t.tid,
              null,
              t.serverName
            );
          }),
          f = {
            command: new module1968.CommandCardData(
              u,
              module1968.CommandCardType.Custom,
              c,
              this.state.cleanOnMap.flag,
              null == (t = this.data) ? undefined : null == (n = t.command) ? undefined : n.timer,
              this.commandID
            ),
            index: null != (o = null == (s = this.data) ? undefined : s.index) ? o : -1,
          };
        this.startLoading();
        this.requestCommitChanges(f)
          .then(function (t) {
            f.command.id = t;
            l.confirmcallBack(f);
            l.props.navigation.pop();
            module1968.SmartSceneLog('\u5411\u4e91\u7aef\u8bf7\u6c42\u6210\u529f -- \u56de\u8c03\u6570\u636e: ' + JSON.stringify(f));
          })
          .catch(function (t) {
            globals.showToast(module1968.LocalizationStrings.map_object_ignore_failed + ' (Server)');
          })
          .finally(function () {
            l.endLoading();
          });
      },
    },
    {
      key: 'syncTaskToRobot',
      value: function (t) {
        var n,
          o = t,
          s = -1 == this.state.editingTaskIndex || t.isInvalid ? null : null == (n = this.state.tasks[this.state.editingTaskIndex]) ? undefined : n.tid;
        return module1967.SmartSceneAPI.syncTaskToRobot(o, s);
      },
    },
    {
      key: 'startLoading',
      value: function () {
        var t;
        if (!(null == (t = this.loadingView) || null == t.showWithText)) t.showWithText(module1968.LocalizationStrings.localization_strings_Common_Constants_19);
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
      key: 'segmentTaskName',
      value: function (t, n) {
        var o = t.map(function (t) {
          var o,
            s,
            l,
            u = module415.MM.roomNameMapping.find(function (n) {
              return 3 == (null == n ? undefined : n.length) && n[0] == t;
            });
          if (u)
            return null !=
              (o =
                null ==
                (s = module415.MM.roomNameList.find(function (t) {
                  return t.roomId == u[1];
                }))
                  ? undefined
                  : s.name)
              ? o
              : '';
          else return null != (l = null == n ? undefined : n[t]) ? l : '';
        });
        return 0 == o.length ? '' : o.join(' ').substring(0, 120);
      },
    },
    {
      key: 'editHint',
      get: function () {
        switch (this.state.taskListState) {
          case module1968.TaskListState.Editing:
            return module1968.LocalizationStrings.smart_scene_edit_button_title_done;

          case module1968.TaskListState.Adding:
            return module1968.LocalizationStrings.localization_strings_Main_MainPage_11;

          case module1968.TaskListState.Normal:
            return module1968.LocalizationStrings.multi_floor_edit;
        }
      },
    },
    {
      key: 'tasksFromListRefs',
      get: function () {
        var t = this;
        return this.list
          .filter(function (t) {
            return null != t;
          })
          .map(function (n) {
            return t.state.tasks[n.props.index];
          });
      },
    },
    {
      key: 'templateData',
      get: function () {
        var t;
        return null == (t = this.templates) ? undefined : t.data;
      },
    },
    {
      key: 'isContainInvalidTask',
      get: function () {
        return (
          this.state.tasks.findIndex(function (t) {
            return t.isInvalid;
          }) >= 0
        );
      },
    },
    {
      key: 'isEditing',
      get: function () {
        return null != this.data;
      },
    },
  ]);
  return C;
})(React.default.Component);

exports.default = C;
C.contextType = module1199.AppConfigContext;

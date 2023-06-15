var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module415 = require('./415'),
  module1963 = require('./1963'),
  module424 = require('./424'),
  module382 = require('./382'),
  module1118 = require('./1118'),
  module1193 = require('./1193'),
  module13 = require('./13'),
  module1618 = require('./1618'),
  module381 = require('./381'),
  module1962 = require('./1962'),
  module385 = require('./385'),
  module1387 = require('./1387');

function P(t, n) {
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

function k(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      P(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      P(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function V() {
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

var z = (function (t, ...args) {
  module9.default(z, t);

  var module50 = z,
    module1193 = V(),
    P = function () {
      var t,
        o = module12.default(module50);

      if (module1193) {
        var s = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function z() {
    var t;
    module6.default(this, z);
    (t = P.call(this, ...args)).selectedBlocks = [];
    t.repeat = 1;
    t.state = {
      mode: module1963.SmartSceneMode.GlobalClean,
      customMode: {
        cleanMode: module381.RSM.fanPower || 102,
        waterMode: module381.RSM.waterBoxMode || 202,
        mopMode: module381.RSM.mopMode == module1618.CleanRouteFastMode ? module1618.CleanRouteDailyMode : module381.RSM.mopMode || 301,
      },
      repeat: 1,
      isModeFixed: false,
      isCustomModeFixed: false,
    };
    return t;
  }

  module7.default(z, [
    {
      key: 'commit',
      value: function (t) {
        var n, o, s;
        if (this.isConfirmEnabled)
          this.props.onPressConfirm(
            this.data,
            this.template,
            (null != (n = null == (o = this.mapView) ? undefined : null == (s = o.state) ? undefined : s.defaultNameList) ? n : []).concat(),
            t
          );
      },
    },
    {
      key: 'componentDidMount',
      value: function () {
        this.parseData(this.props.data, this.props.template);
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n =
            module381.RSM.isRunning ||
            module381.RSM.mapStatus == module381.MapStatus.None ||
            -1 == module381.RSM.currentMapId ||
            module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments;
        return React.default.createElement(
          module13.View,
          {
            style: {
              borderWidth: 2,
              borderColor: this.context.theme.smartScene.addTaskBorderColor,
              borderRadius: 14,
              marginVertical: 10,
            },
          },
          React.default.createElement(module385.SettingListItemView, {
            style: {
              borderRadius: 10,
            },
            touchStyle: {
              borderRadius: 10,
            },
            title: module1962.LocalizationStrings.multi_map_timer_select_map_title,
            enabled: !this.state.isModeFixed,
            bottomDetail: this.locationDescription,
            shouldShowRightArrow: !this.state.isModeFixed,
            shouldShowTopline: false,
            onPress: function () {
              var n;
              if (!(t.state.isModeFixed || null == (n = t.locationActionSheet) || null == n.show)) n.show();
            },
          }),
          React.default.createElement(module385.SettingListItemView, {
            title: module1962.LocalizationStrings.map_edit_custom_mode,
            enabled: !this.state.isCustomModeFixed,
            bottomDetail: this.levelDescription,
            shouldShowRightArrow: !this.state.isCustomModeFixed,
            shouldShowTopline: false,
            onPress: function () {
              var n,
                o,
                s = module424.DMM.isGarnet ? (null == (n = t.state.customMode.mopMode) ? undefined : n.mop_template_id) : t.state.customMode.mopMode || 300;
              if (!(null == (o = t.customModeView))) o.show(t.state.customMode.cleanMode, t.state.customMode.waterMode, s);
            },
          }),
          this.state.mode != module1963.SmartSceneMode.GlobalClean &&
            React.default.createElement(module385.SettingListItemView, {
              title: module1962.LocalizationStrings.localization_strings_Setting_History_index_12,
              bottomDetail: this.cleanCountDesciption,
              shouldShowRightArrow: true,
              shouldShowTopline: false,
              onPress: function () {
                var n;
                return null == (n = t.repeatCountActionSheet) ? undefined : null == n.show ? undefined : n.show();
              },
            }),
          React.default.createElement(
            module13.View,
            {
              style: {
                height: 350,
                justifyContent: 'center',
              },
            },
            n &&
              React.default.createElement(module1387.default, {
                tip:
                  module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments
                    ? module1962.LocalizationStrings.no_seg_map_tip
                    : module1962.LocalizationStrings.smart_scene_global_no_map_tip,
                shouldShowGuideButton: false,
              }),
            !n &&
              React.default.createElement(module1118.MapView, {
                top: 10,
                bottom: 10,
                left: 20,
                right: 20,
                style: {
                  flex: 1,
                  justifyContent: 'center',
                  alignSelf: 'stretch',
                  backgroundColor: 'transparent',
                },
                ref: function (n) {
                  return (t.mapView = n);
                },
                showAllBlocksBubble: true,
                noScale: true,
                hideAccessory: true,
                selectedBlocksDidChange: function (n) {
                  t.selectedBlocksDidChange(n);
                },
                selectedRectDidChange: function (n) {
                  t.selectedRectDidChange(n);
                },
                onPanResponderGrant: function () {
                  return null == t.props.onPanResponderGrant ? undefined : t.props.onPanResponderGrant();
                },
                onPanResponderRelease: function () {
                  return null == t.props.onPanResponderRelease ? undefined : t.props.onPanResponderRelease();
                },
                onPanResponderEnd: function () {
                  return null == t.props.onPanResponderEnd ? undefined : t.props.onPanResponderEnd();
                },
                onPanResponderStart: function () {
                  return null == t.props.onPanResponderStart ? undefined : t.props.onPanResponderStart();
                },
              }),
            !n &&
              this.state.mode == module1963.SmartSceneMode.Zone &&
              React.default.createElement(module385.TopImageButton, {
                style: {
                  position: 'absolute',
                  left: 15,
                  bottom: 15,
                },
                title: module1962.LocalizationStrings.rubys_main_button_text_add,
                enabled: !module381.RSM.isCleaning() && !module381.RSM.isCleanTaskShouldResume(),
                image: this.context.theme.homeSidebar.addZoneIcon,
                funcId: 'smart_add_zone',
                onPress: function () {
                  t.onPressAddZone();
                },
                imageWidth: 60,
                imageHeight: 60,
                fontSize: 10,
                textTop: -5,
                textColor: this.context.theme.homeSidebar.textColor,
                maxTextWidth: 80,
              })
          ),
          React.default.createElement(module13.View, {
            style: {
              height: 1,
              backgroundColor: this.context.theme.smartScene.addTaskBorderColor,
              alignSelf: 'stretch',
            },
          }),
          React.default.createElement(
            module13.TouchableWithoutFeedback,
            {
              onPress: function () {
                var n, o, s;

                if (t.isConfirmEnabled) {
                  module1962.SmartSceneLog('\u4efb\u52a1\u7f16\u8f91 - \u786e\u8ba4 - ' + JSON.stringify(t.data));
                  t.props.onPressConfirm(
                    t.data,
                    t.template,
                    (null != (n = null == (o = t.mapView) ? undefined : null == (s = o.state) ? undefined : s.defaultNameList) ? n : []).concat()
                  );
                }
              },
              disabled: !this.isConfirmEnabled,
            },
            React.default.createElement(
              module13.View,
              {
                style: {
                  paddingVertical: 10,
                },
              },
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    color: this.isConfirmEnabled ? '#007AFF' : '#A9A9A9',
                    fontSize: 16,
                    alignSelf: 'center',
                    paddingTop: 5,
                    paddingBottom: 5,
                  },
                },
                module1962.LocalizationStrings.smart_scene_task_confirm_button_title
              )
            )
          ),
          React.default.createElement(module385.ActionSheetView, {
            ref: function (n) {
              return (t.locationActionSheet = n);
            },
            actions: [
              module1962.LocalizationStrings.home_bottom_menu_global,
              module1962.LocalizationStrings.home_bottom_menu_select_zone,
              module1962.LocalizationStrings.home_bottom_menu_draw_zone,
            ],
            didSelectRow: this.onPressLocationAction.bind(this),
            onPressCancel: function () {
              return t.locationActionSheet.hide();
            },
          }),
          React.default.createElement(module382.ModeSettingPanel, {
            ref: function (n) {
              t.customModeView = n;
            },
            didSetMode: function (n, o, s) {
              t.onCustomModePanelChange(n, o, s);
            },
            isSmartScene: true,
            shouldShowCustomSwitch: !module424.DMM.isGarnet,
            isTabZone: this.state.mode == module1963.SmartSceneMode.Zone,
            onPressQuestion: function () {
              return t.onPressQuestionIcon();
            },
            onPressMore: function () {
              t.customModeView.hide();
              t.props.navigation.navigate('MopModeListPage', {
                title: module1962.LocalizationStrings.custom_mode_panel_more_mode_title,
              });
            },
          }),
          React.default.createElement(module385.ActionSheetView, {
            ref: function (n) {
              return (t.repeatCountActionSheet = n);
            },
            actions: [
              '1' + module1962.LocalizationStrings.dust_collection_life14,
              '2' + module1962.LocalizationStrings.dust_collection_life14,
              '3' + module1962.LocalizationStrings.dust_collection_life14,
            ],
            didSelectRow: this.onPressRepeatCountAction.bind(this),
            onPressCancel: function () {
              return t.repeatCountActionSheet.hide();
            },
          })
        );
      },
    },
    {
      key: 'parseData',
      value: function (t, n) {
        var o,
          s = this;
        module1962.SmartSceneLog('\u4efb\u52a1\u7f16\u8f91 - \u89e3\u6790\u53c2\u6570 - data: ' + JSON.stringify(t) + ', template: ' + JSON.stringify(n));
        this.originalData = t;
        this.template = n;
        var l,
          c =
            t ||
            (n
              ? {
                  customMode: null == n ? undefined : n.customMode,
                  mode: null == n ? undefined : n.mode,
                  isModeFixed: false,
                  isCustomModeFixed: false,
                  segments: null == n ? undefined : null == (o = n.data) ? undefined : o.segs,
                }
              : {});
        if (this.mapView) {
          if (!(null == (l = this.mapView) || null == l.setState))
            l.setState(
              k(
                k({}, module415.MM.mapData),
                {},
                {
                  robotStatus: module381.RSM.state,
                }
              ),
              function () {
                s.setState(k({}, c), function () {
                  var t, n;
                  if (!(null == (t = s.mapView) || null == t.changeMapViewMode)) t.changeMapViewMode(s.mapMode);
                  if (!(null == (n = s.props) || null == n.taskDidUpdate)) n.taskDidUpdate();
                });
              }
            );
        } else
          this.setState(k({}, c), function () {
            var t, n;
            if (!(null == (t = s.mapView) || null == t.changeMapViewMode)) t.changeMapViewMode(s.mapMode);
            if (!(null == (n = s.props) || null == n.taskDidUpdate)) n.taskDidUpdate();
          });
        setTimeout(function () {
          var t, n, o, l, u, p, S;
          if (!(null == c || null == (t = c.segments) || null == t.forEach))
            t.forEach(function (t) {
              var n;
              if (!(null == (n = s.mapView) || null == n.changeBlockState)) n.changeBlockState(t);
            });
          var f =
              null !=
              (n =
                null == c
                  ? undefined
                  : null == (o = c.zones)
                  ? undefined
                  : o.map(function (t) {
                      return t.zid;
                    }))
                ? n
                : [],
            M = (null != (l = null == (u = module415.MM.mapData) ? undefined : null == (p = u.smartZones) ? undefined : p.smartZones) ? l : [])
              .filter(function (t) {
                console.log('SmartSceneDebug: ' + f.hasElement(t.zid));
                return f.hasElement(t.zid);
              })
              .map(function (t) {
                return t.range;
              })
              .map(function (t) {
                var n, o, l, c;
                console.log('SmartSceneDebug: -- WillDrawZone: ' + JSON.stringify(t));
                var u = t[0],
                  p = t[1],
                  h = t[2],
                  S = t[3],
                  f = [u, S, h, S, h, p, u, p];
                return null == (n = s.mapView)
                  ? undefined
                  : null == n.decodeMachineFBZ
                  ? undefined
                  : null == (o = n.decodeMachineFBZ(f, null == (l = s.mapView) ? undefined : null == (c = l.state) ? undefined : c.map))
                  ? undefined
                  : o.rectSize;
              });
          if (!(null == (S = s.mapView) || null == S.addRectangleArray)) S.addRectangleArray(M);
        }, 100);
      },
    },
    {
      key: 'onPressLocationAction',
      value: function (t) {
        var n,
          o = this;
        if (!(null == (n = this.locationActionSheet) || null == n.hide)) n.hide();

        var s = function () {
            var t, n;

            if (
              (module1962.SmartSceneLog('\u4efb\u52a1\u7f16\u8f91 - \u9009\u62e9\u6e05\u6d01\u6a21\u5f0f - ' + o.state.mode),
              null == (t = o.mapView) || null == t.changeMapViewMode || t.changeMapViewMode(o.mapMode),
              o.state.mode == module1963.SmartSceneMode.Zone && 0 == o.selectedZones.length)
            ) {
              if (!(null == (n = o.mapView))) n.enterZoneEditMode();
              if (o.mapView && !o.mapView.addRectangle()) globals.showToast(module1962.LocalizationStrings.rubys_main_zone_max_tips);
            }
          },
          l = 1 ** this.state.repeat;

        switch (t) {
          case 0:
            return void this.setState(
              {
                mode: module1963.SmartSceneMode.GlobalClean,
              },
              s
            );

          case 1:
            return void this.setState(
              {
                mode: module1963.SmartSceneMode.Segment,
                repeat: l,
              },
              s
            );

          case 2:
            return void this.setState(
              {
                mode: module1963.SmartSceneMode.Zone,
                repeat: l,
              },
              s
            );
        }
      },
    },
    {
      key: 'onCustomModePanelChange',
      value: function (t, n, o) {
        var s = this;
        this.setState(
          {
            customMode: {
              cleanMode: t,
              waterMode: n,
              mopMode: module424.DMM.isGarnet ? o.id : o,
            },
          },
          function () {
            module1962.SmartSceneLog('\u4efb\u52a1\u7f16\u8f91 - \u9009\u62e9\u6e05\u6d01\u6863\u4f4d - ' + s.levelDescription);
          }
        );
      },
    },
    {
      key: 'onPressRepeatCountAction',
      value: function (t) {
        var n;
        if (!(null == (n = this.repeatCountActionSheet) || null == n.hide)) n.hide();
        module1962.SmartSceneLog('\u4efb\u52a1\u7f16\u8f91 - \u9009\u62e9\u6e05\u6d01\u6b21\u6570 - ' + (t + 1));
        this.setState({
          repeat: t + 1,
        });
      },
    },
    {
      key: 'selectedBlocksDidChange',
      value: function (t) {
        var n;
        module1962.SmartSceneLog('\u4efb\u52a1\u7f16\u8f91 - \u9009\u533a - \u5f53\u524d\u9009\u4e2d\u533a\u57df ' + t);
        this.selectedBlocks = t;
        this.forceUpdate();
        if (!(null == (n = this.props) || null == n.taskDidUpdate)) n.taskDidUpdate();
      },
    },
    {
      key: 'onPressAddZone',
      value: function () {
        var t;

        if (module381.RSM.mapStatus != module381.MapStatus.None) {
          module1962.SmartSceneLog('\u4efb\u52a1\u7f16\u8f91 - \u5212\u533a');
          if (!(null == (t = this.mapView))) t.enterZoneEditMode();
          if (this.mapView && !this.mapView.addRectangle()) globals.showToast(module1962.LocalizationStrings.rubys_main_zone_max_tips);
        } else globals.showToast(module1962.LocalizationStrings.tap_zone_clean_button_without_map_tip);
      },
    },
    {
      key: 'selectedRectDidChange',
      value: function (t) {
        var n = this;
        module1962.SmartSceneLog('\u4efb\u52a1\u7f16\u8f91 - \u5212\u533a - ' + t + '\u4e2a\u533a\u57df');
        setTimeout(function () {
          var t;
          n.forceUpdate();
          if (!(null == (t = n.props) || null == t.taskDidUpdate)) t.taskDidUpdate();
        }, 100);
      },
    },
    {
      key: 'locationDescription',
      get: function () {
        return module1962.taskNameWithMode(this.state.mode);
      },
    },
    {
      key: 'levelDescription',
      get: function () {
        return module1618.getCleanModeDetailText(this.state.customMode);
      },
    },
    {
      key: 'cleanCountDesciption',
      get: function () {
        return this.state.repeat + ' ' + module1962.LocalizationStrings.dust_collection_life14;
      },
    },
    {
      key: 'mapMode',
      get: function () {
        switch (this.state.mode) {
          case module1963.SmartSceneMode.GlobalClean:
            return module1118.MapModelInCleanMode.Global_Clean_With_Clean_Type;

          case module1963.SmartSceneMode.Segment:
            var t = module381.RSM.isCustomCleanMode() || module381.RSM.isCustomWaterMode() || module381.RSM.isCustomMopMode(),
              n = module381.RSM.isSegmentCleanTaskShouldResume() || module381.RSM.state == module381.RobotState.SEGMENT_CLEAN;
            if (t)
              return n
                ? module1118.MapModelInCleanMode.Segment_Clean_Sequential_Read_Only_With_Clean_Type
                : module1118.MapModelInCleanMode.Segment_Clean_Sequential_Edit_With_Clean_Type;
            else return n ? module1118.MapModelInCleanMode.Segment_Clean_Read_Only : module1118.MapModelInCleanMode.Segment_Clean_Edit;

          case module1963.SmartSceneMode.Zone:
            return module1118.MapModelInCleanMode.Zone_Clean_Edit;

          default:
            throw new Error('Unrecognized mode.');
        }
      },
    },
    {
      key: 'isConfirmEnabled',
      get: function () {
        switch (this.state.mode) {
          case module1963.SmartSceneMode.GlobalClean:
            return true;

          case module1963.SmartSceneMode.Segment:
            return this.selectedBlocks.length > 0;

          case module1963.SmartSceneMode.Zone:
            return this.selectedZones.length > 0;

          default:
            return false;
        }
      },
    },
    {
      key: 'selectedZones',
      get: function () {
        var t, n;
        return null != (t = null == (n = this.mapView) ? undefined : null == n.getZoneParams ? undefined : n.getZoneParams()) ? t : [];
      },
    },
    {
      key: 'data',
      get: function () {
        var t = this,
          n = this.state.mode == module1963.SmartSceneMode.Segment ? this.selectedBlocks : [],
          o = this.state.mode == module1963.SmartSceneMode.Zone ? this.selectedZones : [],
          s = this.state.mode == module1963.SmartSceneMode.GlobalClean ? null : this.state.repeat;

        if (this.originalData) {
          this.originalData.customMode = this.state.customMode;
          this.originalData.mode = this.state.mode;
          this.originalData.repeat = s;
          this.originalData.segments = n;
          this.originalData.zones = o.map(function (n, o) {
            var s, l, c;
            return o < (null != (s = null == (l = t.originalData.zones) ? undefined : l.length) ? s : 0)
              ? {
                  range: n,
                  zid: null == (c = t.originalData.zones[o]) ? undefined : c.zid,
                }
              : {
                  range: n,
                };
          });
        }

        return this.originalData
          ? this.originalData
          : new module1962.TaskDescriptorData(
              this.state.customMode.cleanMode,
              this.state.customMode.waterMode,
              this.state.customMode.mopMode,
              this.state.mode,
              s,
              n,
              o.map(function (t) {
                return {
                  range: t,
                };
              })
            );
      },
    },
  ]);
  return z;
})(React.default.Component);

exports.default = z;
z.contextType = module1193.AppConfigContext;
z.defaultProps = {
  mode: module1963.SmartSceneMode.GlobalClean,
  customMode: {},
  repeat: 1,
};

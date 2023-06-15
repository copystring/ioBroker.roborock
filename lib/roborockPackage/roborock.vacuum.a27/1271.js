var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module4 = require('./4'),
  React = require('react'),
  module12 = require('./12'),
  module1272 = require('./1272'),
  module381 = require('./381'),
  module385 = require('./385'),
  module1315 = require('./1315'),
  module391 = require('./391'),
  module415 = require('./415'),
  module394 = require('./394'),
  module1057 = require('./1057'),
  module1134 = require('./1134'),
  module1317 = require('./1317'),
  module393 = require('./393'),
  module1265 = require('./1265'),
  module505 = require('./505').strings,
  k = module1057.buttonConfig.rectBtn.size.width,
  z = module1057.buttonConfig.rectBtn.size.width,
  I = k + z,
  D = {
    SwitchOff: 0,
    NoMap: 1,
    Unsaved: 2,
    Saved: 3,
    Segmented: 4,
    Unknown: -1,
  };

exports.MapEditSteps = D;

var M = function () {
  var t = module393.isWindowDisplay ? module1317.titleBarContentHeight + 14 : module1317.titleBarContentHeight + module1265.StatusBarHeight + module1265.AppBarMarginTop;
  return -module391.default.iOSAndroidReturn(t, module1317.titleBarHeight);
};

exports.mapOffset = M;

var module1321 = (function () {
  function t() {
    module4.default(this, t);
  }

  module5.default(t, null, [
    {
      key: 'confirmButton',
      value: function (t, n, o) {
        var u = !(arguments.length > 3 && undefined !== arguments[3]) || arguments[3],
          s = arguments.length > 4 && undefined !== arguments[4] ? arguments[4] : globals.app.state.theme.mapEdit.confirmImg,
          l = u ? x.guideButton : [x.guideButton, x.lastAddition],
          c = React.default.createElement(module385.PureImageButton, {
            key: 0,
            ref: o,
            funcId: 'map_edit_confirm',
            accessibilityLabel: module505.localization_strings_Main_Error_ErrorDetailPage_3,
            style: l,
            image: s,
            onPress: t,
            imageWidth: 40,
            imageHeight: 40,
            enabled: n,
            imageStyle: {
              resizeMode: 'contain',
              width: 30,
              height: 30,
            },
            key: 0,
          });
        return c;
      },
    },
    {
      key: 'deleteButton',
      value: function (t, n, o) {
        var u = !(arguments.length > 3 && undefined !== arguments[3]) || arguments[3] ? x.guideButton : [x.guideButton, x.lastAddition];
        return React.default.createElement(module385.PureImageButton, {
          key: 0,
          ref: o,
          funcId: 'map_edit_delete',
          accessibilityLabel: module505.localization_strings_Main_Error_ErrorDetailPage_3,
          style: u,
          image: require('./1320'),
          onPress: t,
          imageWidth: 40,
          imageHeight: 40,
          enabled: n,
          imageStyle: {
            resizeMode: 'contain',
            width: 30,
            height: 30,
          },
          key: 0,
        });
      },
    },
    {
      key: 'settingButtonDark',
      value: function (t, n, o) {
        var u = !(arguments.length > 3 && undefined !== arguments[3]) || arguments[3] ? x.guideButton : [x.guideButton, x.lastAddition];
        return React.default.createElement(module385.PureImageButton, {
          key: 0,
          ref: o,
          funcId: 'map_edit_delete',
          accessibilityLabel: module505.localization_strings_Main_Error_ErrorDetailPage_3,
          style: u,
          image: require('./1321'),
          onPress: t,
          imageWidth: 40,
          imageHeight: 40,
          enabled: n,
          imageStyle: {
            resizeMode: 'contain',
            width: 32,
            height: 32,
          },
          key: 0,
        });
      },
    },
    {
      key: 'guideButton',
      value: function (t, n) {
        var o = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2] ? x.guideButton : [x.guideButton, x.lastAddition],
          u = React.default.createElement(module385.PureImageButton, {
            key: 1,
            ref: n,
            funcId: 'map_edit_guide',
            accessibilityLabel: module505.accessibility_guide,
            style: o,
            image: globals.app.state.theme.mapEdit.guideImg,
            onPress: t,
            imageWidth: 40,
            imageHeight: 40,
            imageStyle: {
              resizeMode: 'contain',
              width: 30,
              height: 30,
            },
          });
        return u;
      },
    },
    {
      key: 'resegButton',
      value: function (t, n, o) {
        var u = !(arguments.length > 3 && undefined !== arguments[3]) || arguments[3] ? x.guideButton : [x.guideButton, x.lastAddition];
        return React.default.createElement(module385.PureImageButton, {
          key: 2,
          ref: o,
          funcId: 'map_edit_reset',
          accessibilityLabel: module505.accessibility_guide,
          style: u,
          image: globals.app.state.theme.mapEdit.resetImg,
          onPress: t,
          enabled: n,
          imageWidth: 40,
          imageHeight: 40,
          imageStyle: {
            resizeMode: 'contain',
            width: 30,
            height: 30,
          },
        });
      },
    },
    {
      key: 'setNavigation',
      value: function (t, n, o) {
        var u = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : 'relative',
          s = arguments.length > 4 && undefined !== arguments[4] ? arguments[4] : 'transparent',
          l = !(arguments.length > 5 && undefined !== arguments[5]) || arguments[5];
        if (t.props.navigation)
          t.props.navigation.setParams({
            navBarPosition: u,
            navBarBackgroundColor: s,
            onPressLeft: o,
            rightItems: n,
            hiddenBottomLine: l,
          });
        else console.log('MapEditCommonService.setNavigation: props.navigation not found.');
      },
    },
    {
      key: 'getNoMapTipView',
      value: function (t) {
        var n = t == module381.MapStatus.Has_WithoutSegments ? module505.no_seg_map_tip : module505.no_map_tip;
        return React.default.createElement(module1315.default, {
          tip: n,
          shouldShowGuideButton: module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments,
        });
      },
    },
    {
      key: 'resetButton',
      value: function (t, n, o) {
        return React.default.createElement(module385.TopImageButton, {
          funcId: 'reset_button',
          title: t,
          image: globals.app.state.theme.mapEdit.resetEraseImg,
          imageWidth: 46,
          imageHeight: 46,
          hitSlop: {
            top: 20,
            left: 30,
            bottom: 20,
            right: 15,
          },
          textTop: 5,
          fontSize: 12,
          textColor: globals.app.state.theme.mapEdit.itemTextColor,
          style: x.resetButton,
          onPress: o,
          enabled: n,
          maxTextWidth: 80,
        });
      },
    },
    {
      key: 'isEditedByArrays',
      value: function (t, n) {
        if (t.length != n.length) return true;
        if (0 == t.length && 0 == n.length) return false;

        for (var o = 0; o < t.length && o < n.length; o++) if (t[o] != n[o]) return true;

        return false;
      },
    },
    {
      key: 'errorText',
      value: function (t) {
        var n = '';
        n =
          t == module1265.mapOpErrorCode.VENDOR_ERROR_CODE
            ? module505.robot_communication_exception
            : t == module1265.mapOpErrorCode.PROCESS_BUSY_ERROR_CODE
            ? module505.toast_frequently_operate
            : t == module1265.mapOpErrorCode.ERROR_ACCESS_DENIED || t == module1265.mapOpErrorCode.BAD_REQUEST
            ? module505.map_edit_unauthorized_op
            : t == module1265.mapOpErrorCode.ERROR_ACTION_LOCKED
            ? module505.rubys_main_diag_update_map
            : (t == module1265.mapOpErrorCode.ERROR_ACTION_TIMEOUT || module1265.mapOpErrorCode.PARAM_ERROR || module1265.mapOpErrorCode.OPERATION_FAILED,
              module505.map_object_ignore_failed);
        return n;
      },
    },
    {
      key: 'zoneAreaView',
      value: function (t, n) {
        var o = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2],
          u = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : '',
          s = arguments.length > 4 && undefined !== arguments[4] ? arguments[4] : {},
          l = 0.05 * n.width,
          h = 0.05 * n.height,
          f =
            module391.default.lengthConvert(l).toFixed(1) +
            module391.default.getLengthUnit() +
            ' x ' +
            module391.default.lengthConvert(h).toFixed(1) +
            module391.default.getLengthUnit(),
          B = module391.default.areaConvert(l * h).toFixed(1) + module391.default.getAreaUnit(),
          module1315 = t <= 70 && o ? B : f;
        module1315 = 0 == u.length ? module1315 : u + '  ' + module1315;
        return React.default.createElement(
          module12.View,
          {
            pointerEvents: 'none',
            style: [x.areaView, s],
          },
          React.default.createElement(
            module12.Text,
            {
              numberOfLines: 1,
              style: [
                x.areaText,
                {
                  color: globals.app.state.theme.displayZones.areaTextColor,
                },
              ],
            },
            module1315
          )
        );
      },
    },
    {
      key: 'zoneFocusBorderView',
      value: function (t, n, o) {
        var u = 'android' === module12.Platform.OS ? 5 : 0;
        return React.default.createElement(module12.View, {
          pointerEvents: 'none',
          style: {
            position: 'absolute',
            left: o - module1057.buttonConfig.rectOperateBoarderDis - 1,
            top: o - module1057.buttonConfig.rectOperateBoarderDis - 1,
            width: t + 2 * module1057.buttonConfig.rectOperateBoarderDis + 1,
            height: n + 2 * module1057.buttonConfig.rectOperateBoarderDis + 1,
            overflow: 'visible',
            backgroundColor: 'transparent',
            borderColor: globals.app.state.theme.displayZones.focusViewColor,
            borderWidth: 2,
            borderStyle: 'dashed',
            borderRadius: u,
          },
        });
      },
    },
    {
      key: 'zoneFocusBorderViewWithPan',
      value: function (t, n, o, s) {
        var l = 'android' === module12.Platform.OS ? 5 : 0,
          h = globals.app.state.theme.displayZones;
        return React.default.createElement(
          module12.View,
          module22.default({}, o.panHandlers, {
            pointerEvents: 'auto',
            style: {
              position: 'absolute',
              left: n - module1057.buttonConfig.rectOperateBoarderDis - 1,
              top: n - module1057.buttonConfig.rectOperateBoarderDis - 1,
              width: t.width + 2 * module1057.buttonConfig.rectOperateBoarderDis + 1,
              height: t.height + 2 * module1057.buttonConfig.rectOperateBoarderDis + 1,
              overflow: s ? 'visible' : 'hidden',
              backgroundColor: 'transparent',
              borderColor: s ? h.focusViewColor : 'transparent',
              borderWidth: 2,
              borderStyle: 'dashed',
              borderRadius: l,
            },
          })
        );
      },
    },
    {
      key: 'zoneDragButtonView',
      value: function (t, n) {
        var o = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : {},
          s = I - module1057.buttonConfig.rectOperateBoarderDis + 1,
          l = I + t + module1057.buttonConfig.rectOperateBoarderDis - 1,
          f = z / 2 + k - module1057.buttonConfig.rectOperateBoarderDis + 1;
        return React.default.createElement(
          module12.View,
          module22.default(
            {
              pointerEvents: 'auto',
            },
            null == n ? undefined : n.panHandlers,
            {
              style: [
                x.dragView,
                {
                  top: l,
                  width: s,
                  height: s,
                },
                o,
              ],
            }
          ),
          React.default.createElement(
            module1272.Svg,
            {
              left: z / 2,
              top: 0,
              width: f,
              height: f,
            },
            React.default.createElement(module1272.Line, {
              x1: f,
              y1: 0,
              x2: 0,
              y2: f,
              stroke: globals.app.state.theme.displayZones.focusViewColor,
              strokeWidth: 2,
            })
          ),
          React.default.createElement(module1134.RectButton, {
            funcId: 'furniture_rect_edit_drag',
            left: 0,
            top: s - 1.5 * z,
            width: module1057.buttonConfig.rectBtn.size.width,
            height: module1057.buttonConfig.rectBtn.size.height,
            imageSource: globals.app.state.theme.displayZones.dragImg,
          })
        );
      },
    },
    {
      key: 'zoneRotateButton',
      value: function (t, n, o, u) {
        return React.default.createElement(module1134.RectButton, {
          funcId: n,
          panResponder: o,
          left: t + u - (1.5 * module1057.buttonConfig.rectBtn.size.width) / 2 - 1 + module1057.buttonConfig.rectOperateBoarderDis,
          top: u - (1.5 * module1057.buttonConfig.rectBtn.size.height) / 2 + 1 - module1057.buttonConfig.rectOperateBoarderDis,
          width: module1057.buttonConfig.rectBtn.size.width,
          height: module1057.buttonConfig.rectBtn.size.height,
          imageSource: globals.app.state.theme.displayZones.rotateImg,
        });
      },
    },
    {
      key: 'zoneScaleButton',
      value: function (t, n, o, u) {
        return React.default.createElement(module1134.RectButton, {
          funcId: n,
          panResponder: o,
          left: t.width + u - (1.5 * module1057.buttonConfig.rectBtn.size.width) / 2 - 1 + module1057.buttonConfig.rectOperateBoarderDis,
          top: t.height + u - (1.5 * module1057.buttonConfig.rectBtn.size.height) / 2 - 2 + module1057.buttonConfig.rectOperateBoarderDis,
          width: module1057.buttonConfig.rectBtn.size.width,
          height: module1057.buttonConfig.rectBtn.size.height,
          imageSource: globals.app.state.theme.displayZones.scaleImg,
        });
      },
    },
    {
      key: 'zoneDeleteButton',
      value: function (t, n, o) {
        var module22 = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : 0;
        module22 = 0 == module22 ? o : module22;
        return React.default.createElement(module1134.RectButton, {
          funcId: t,
          panResponder: n,
          left: o - (1.5 * module1057.buttonConfig.rectBtn.size.width) / 2 - module1057.buttonConfig.rectOperateBoarderDis,
          top: module22 - (1.5 * module1057.buttonConfig.rectBtn.size.height) / 2 + 1 - module1057.buttonConfig.rectOperateBoarderDis,
          width: module1057.buttonConfig.rectBtn.size.width,
          height: module1057.buttonConfig.rectBtn.size.height,
          imageSource: globals.app.state.theme.displayZones.deleteImg,
        });
      },
    },
    {
      key: 'carpetZoneDelButton',
      value: function (t, n, o) {
        return React.default.createElement(module1134.RectButton, {
          funcId: t,
          panResponder: n,
          left: o - (1.5 * module1057.buttonConfig.rectBtn.size.width) / 2 - module1057.buttonConfig.rectOperateBoarderDis,
          top: o - (1.5 * module1057.buttonConfig.rectBtn.size.height) / 2 + 1 - module1057.buttonConfig.rectOperateBoarderDis,
          width: module1057.buttonConfig.rectBtn.size.width,
          height: module1057.buttonConfig.rectBtn.size.height,
          imageSource: globals.app.state.theme.displayZones.carpetDelImg,
        });
      },
    },
    {
      key: 'carpetZoneSaveButton',
      value: function (t, n, o, u) {
        return React.default.createElement(module1134.RectButton, {
          funcId: n,
          panResponder: o,
          left: t + u - (1.5 * module1057.buttonConfig.rectBtn.size.width) / 2 - 1 + module1057.buttonConfig.rectOperateBoarderDis,
          top: u - (1.5 * module1057.buttonConfig.rectBtn.size.height) / 2 + 1 - module1057.buttonConfig.rectOperateBoarderDis,
          width: module1057.buttonConfig.rectBtn.size.width,
          height: module1057.buttonConfig.rectBtn.size.height,
          imageSource: globals.app.state.theme.displayZones.saveImg,
        });
      },
    },
    {
      key: 'enableEditMap',
      value: function () {
        return regeneratorRuntime.default.async(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  t.prev = 0;
                  t.next = 3;
                  return regeneratorRuntime.default.awrap(module415.default.startEditMap());

                case 3:
                  t.next = 8;
                  break;

                case 5:
                  t.prev = 5;
                  t.t0 = t.catch(0);
                  console.warn('network issue');

                case 8:
                case 'end':
                  return t.stop();
              }
          },
          null,
          null,
          [[0, 5]],
          Promise
        );
      },
    },
    {
      key: 'endEditMap',
      value: function () {
        return regeneratorRuntime.default.async(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  t.prev = 0;
                  t.next = 3;
                  return regeneratorRuntime.default.awrap(module415.default.endEditMap());

                case 3:
                  t.next = 8;
                  break;

                case 5:
                  t.prev = 5;
                  t.t0 = t.catch(0);
                  console.log('end mapEdit error: ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0));

                case 8:
                case 'end':
                  return t.stop();
              }
          },
          null,
          null,
          [[0, 5]],
          Promise
        );
      },
    },
    {
      key: 'mapEditStep',
      get: function () {
        return module381.RSM.mapSaveEnabled
          ? module381.RSM.mapStatus == module381.MapStatus.None
            ? D.NoMap
            : -1 == module381.RSM.currentMapId
            ? D.Unsaved
            : module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments
            ? D.Saved
            : module381.RSM.mapStatus == module381.MapStatus.Has_WithSegments
            ? D.Segmented
            : D.Unknown
          : D.SwitchOff;
      },
    },
  ]);
  return t;
})();

exports.default = module1321;
var x = module12.StyleSheet.create({
  root: {
    height: module394.default.sharedCache().ScreenHeight,
    backgroundColor: '#FFFFFF',
    top: M(),
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  mapTop: module391.default.iOSAndroidReturn(module1265.StatusBarHeight + module1265.AppBarMarginTop, module12.StatusBar.currentHeight || 0) + 44 + 60,
  mapBottom: 60,
  mapLeft: 10,
  mapRight: 10,
  confirmButton: {
    marginLeft: 14,
    marginRight: 14,
  },
  lastAddition: {
    marginLeft: globals.isRTL ? -5 : null,
    marginRight: globals.isRTL ? null : -5,
  },
  guideButton: {
    marginLeft: globals.isRTL ? 14 : 5,
    marginRight: globals.isRTL ? 5 : 14,
  },
  resetButton: {
    position: 'absolute',
    justifyContent: 'center',
    right: 22,
    top: module391.default.isIphoneX() ? module1265.StatusBarHeight + module1265.AppBarHeight + 36 : module1265.StatusBarHeight + module1265.AppBarHeight + 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  refreshMapSegmentIndicator: {
    position: 'absolute',
    top: module391.default.isIphoneX() ? module1265.StatusBarHeight + module1265.AppBarHeight + 36 : module1265.StatusBarHeight + module1265.AppBarHeight + 12,
    right: 22,
    backgroundColor: 'transparent',
  },
  areaView: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: module1057.buttonConfig.rectSerial.size.height / 2,
    width: 100,
    height: module1057.buttonConfig.rectSerial.size.height,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaText: {
    color: module1057.buttonConfig.areaTextColor,
    fontSize: 10,
  },
  dragView: {
    position: 'absolute',
    left: 0,
    overflow: 'visible',
  },
});
exports.MapEditCommonStyles = x;

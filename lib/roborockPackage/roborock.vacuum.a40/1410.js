require('./390');

var module22 = require('./22'),
  React = require('react'),
  module12 = require('./12'),
  module1163 = require('./1163'),
  module381 = require('./381'),
  module385 = require('./385'),
  module1411 = require('./1411'),
  module391 = require('./391'),
  module394 = require('./394'),
  module1332 = require('./1332'),
  module1413 = require('./1413'),
  module1414 = require('./1414'),
  module393 = require('./393'),
  module1153 = require('./1153'),
  module500 = require('./500').strings,
  R = module1332.buttonConfig.rectBtn.size.width,
  O = module1332.buttonConfig.rectBtn.size.width,
  z = R + O,
  I = {
    SwitchOff: 0,
    NoMap: 1,
    Unsaved: 2,
    Saved: 3,
    Segmented: 4,
    Unknown: -1,
  };

exports.MapEditSteps = I;

var k = function () {
  var t = module393.isWindowDisplay ? module1414.titleBarContentHeight + 14 : module1414.titleBarContentHeight + module1153.StatusBarHeight + module1153.AppBarMarginTop;
  return -module391.default.iOSAndroidReturn(t, module1414.titleBarHeight);
};

exports.mapOffset = k;

var module1418 = (function () {
  function t() {
    module4.default(this, t);
  }

  module5.default(t, null, [
    {
      key: 'confirmButton',
      value: function (t, n, o) {
        var u = !(arguments.length > 3 && undefined !== arguments[3]) || arguments[3],
          s = arguments.length > 4 && undefined !== arguments[4] ? arguments[4] : globals.app.state.theme.mapEdit.confirmImg,
          p = u ? M.guideButton : [M.guideButton, M.lastAddition],
          h = React.default.createElement(module385.PureImageButton, {
            key: 0,
            ref: o,
            funcId: 'map_edit_confirm',
            accessibilityLabel: module500.localization_strings_Main_Error_ErrorDetailPage_3,
            style: p,
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
        return h;
      },
    },
    {
      key: 'deleteButton',
      value: function (t, n, o) {
        var u = !(arguments.length > 3 && undefined !== arguments[3]) || arguments[3] ? M.guideButton : [M.guideButton, M.lastAddition];
        return React.default.createElement(module385.PureImageButton, {
          key: 0,
          ref: o,
          funcId: 'map_edit_delete',
          accessibilityLabel: module500.localization_strings_Main_Error_ErrorDetailPage_3,
          style: u,
          image: require('./1417'),
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
        var u = !(arguments.length > 3 && undefined !== arguments[3]) || arguments[3] ? M.guideButton : [M.guideButton, M.lastAddition];
        return React.default.createElement(module385.PureImageButton, {
          key: 0,
          ref: o,
          funcId: 'map_edit_delete',
          accessibilityLabel: module500.localization_strings_Main_Error_ErrorDetailPage_3,
          style: u,
          image: require('./1418'),
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
        var o = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2] ? M.guideButton : [M.guideButton, M.lastAddition],
          u = React.default.createElement(module385.PureImageButton, {
            key: 1,
            ref: n,
            funcId: 'map_edit_guide',
            accessibilityLabel: module500.accessibility_guide,
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
        var u = !(arguments.length > 3 && undefined !== arguments[3]) || arguments[3] ? M.guideButton : [M.guideButton, M.lastAddition];
        return React.default.createElement(module385.PureImageButton, {
          key: 2,
          ref: o,
          funcId: 'map_edit_reset',
          accessibilityLabel: module500.accessibility_guide,
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
        var n = t == module381.MapStatus.Has_WithoutSegments ? module500.no_seg_map_tip : module500.no_map_tip;
        return React.default.createElement(module1411.default, {
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
          style: M.resetButton,
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
          t == module1153.mapOpErrorCode.VENDOR_ERROR_CODE
            ? module500.robot_communication_exception
            : t == module1153.mapOpErrorCode.PROCESS_BUSY_ERROR_CODE
            ? module500.toast_frequently_operate
            : t == module1153.mapOpErrorCode.ERROR_ACCESS_DENIED || t == module1153.mapOpErrorCode.BAD_REQUEST
            ? module500.map_edit_unauthorized_op
            : t == module1153.mapOpErrorCode.ERROR_ACTION_LOCKED
            ? module500.rubys_main_diag_update_map
            : (t == module1153.mapOpErrorCode.ERROR_ACTION_TIMEOUT || module1153.mapOpErrorCode.PARAM_ERROR || module1153.mapOpErrorCode.OPERATION_FAILED,
              module500.map_object_ignore_failed);
        return n;
      },
    },
    {
      key: 'zoneAreaView',
      value: function (t, n) {
        var o = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2],
          u = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : '',
          s = arguments.length > 4 && undefined !== arguments[4] ? arguments[4] : {},
          h = 0.05 * n.width,
          c = 0.05 * n.height,
          f =
            module391.default.lengthConvert(h).toFixed(1) +
            module391.default.getLengthUnit() +
            ' x ' +
            module391.default.lengthConvert(c).toFixed(1) +
            module391.default.getLengthUnit(),
          B = module391.default.areaConvert(h * c).toFixed(1) + module391.default.getAreaUnit(),
          module394 = t <= 70 && o ? B : f;
        module394 = 0 == u.length ? module394 : u + '  ' + module394;
        return React.default.createElement(
          module12.View,
          {
            pointerEvents: 'none',
            style: [M.areaView, s],
          },
          React.default.createElement(
            module12.Text,
            {
              numberOfLines: 1,
              style: [
                M.areaText,
                {
                  color: globals.app.state.theme.displayZones.areaTextColor,
                },
              ],
            },
            module394
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
            left: o - module1332.buttonConfig.rectOperateBoarderDis - 1,
            top: o - module1332.buttonConfig.rectOperateBoarderDis - 1,
            width: t + 2 * module1332.buttonConfig.rectOperateBoarderDis + 1,
            height: n + 2 * module1332.buttonConfig.rectOperateBoarderDis + 1,
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
      key: 'zoneDragButtonView',
      value: function (t, n) {
        var u = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : {},
          s = z - module1332.buttonConfig.rectOperateBoarderDis + 1,
          c = z + t + module1332.buttonConfig.rectOperateBoarderDis - 1,
          f = O / 2 + R - module1332.buttonConfig.rectOperateBoarderDis + 1;
        return React.default.createElement(
          module12.View,
          module22.default(
            {
              pointerEvents: 'auto',
            },
            n.panHandlers,
            {
              style: [
                M.dragView,
                {
                  top: c,
                  width: s,
                  height: s,
                },
                u,
              ],
            }
          ),
          React.default.createElement(
            module1163.Svg,
            {
              left: O / 2,
              top: 0,
              width: f,
              height: f,
            },
            React.default.createElement(module1163.Line, {
              x1: f,
              y1: 0,
              x2: 0,
              y2: f,
              stroke: globals.app.state.theme.displayZones.focusViewColor,
              strokeWidth: 2,
            })
          ),
          React.default.createElement(module1413.RectButton, {
            funcId: 'furniture_rect_edit_drag',
            left: 0,
            top: s - 1.5 * O,
            width: module1332.buttonConfig.rectBtn.size.width,
            height: module1332.buttonConfig.rectBtn.size.height,
            imageSource: globals.app.state.theme.displayZones.dragImg,
          })
        );
      },
    },
    {
      key: 'zoneRotateButton',
      value: function (t, n, o, u) {
        return React.default.createElement(module1413.RectButton, {
          funcId: n,
          panResponder: o,
          left: t + u - (1.5 * module1332.buttonConfig.rectBtn.size.width) / 2 - 1 + module1332.buttonConfig.rectOperateBoarderDis,
          top: u - (1.5 * module1332.buttonConfig.rectBtn.size.height) / 2 + 1 - module1332.buttonConfig.rectOperateBoarderDis,
          width: module1332.buttonConfig.rectBtn.size.width,
          height: module1332.buttonConfig.rectBtn.size.height,
          imageSource: globals.app.state.theme.displayZones.rotateImg,
        });
      },
    },
    {
      key: 'zoneScaleButton',
      value: function (t, n, o, u) {
        return React.default.createElement(module1413.RectButton, {
          funcId: n,
          panResponder: o,
          left: t.width + u - (1.5 * module1332.buttonConfig.rectBtn.size.width) / 2 - 1 + module1332.buttonConfig.rectOperateBoarderDis,
          top: t.height + u - (1.5 * module1332.buttonConfig.rectBtn.size.height) / 2 - 2 + module1332.buttonConfig.rectOperateBoarderDis,
          width: module1332.buttonConfig.rectBtn.size.width,
          height: module1332.buttonConfig.rectBtn.size.height,
          imageSource: globals.app.state.theme.displayZones.scaleImg,
        });
      },
    },
    {
      key: 'zoneDeleteButton',
      value: function (t, n, o) {
        var module4 = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : 0;
        module4 = 0 == module4 ? o : module4;
        return React.default.createElement(module1413.RectButton, {
          funcId: t,
          panResponder: n,
          left: o - (1.5 * module1332.buttonConfig.rectBtn.size.width) / 2 - module1332.buttonConfig.rectOperateBoarderDis,
          top: module4 - (1.5 * module1332.buttonConfig.rectBtn.size.height) / 2 + 1 - module1332.buttonConfig.rectOperateBoarderDis,
          width: module1332.buttonConfig.rectBtn.size.width,
          height: module1332.buttonConfig.rectBtn.size.height,
          imageSource: globals.app.state.theme.displayZones.deleteImg,
        });
      },
    },
    {
      key: 'carpetZoneDelButton',
      value: function (t, n, o) {
        return React.default.createElement(module1413.RectButton, {
          funcId: t,
          panResponder: n,
          left: o - (1.5 * module1332.buttonConfig.rectBtn.size.width) / 2 - module1332.buttonConfig.rectOperateBoarderDis,
          top: o - (1.5 * module1332.buttonConfig.rectBtn.size.height) / 2 + 1 - module1332.buttonConfig.rectOperateBoarderDis,
          width: module1332.buttonConfig.rectBtn.size.width,
          height: module1332.buttonConfig.rectBtn.size.height,
          imageSource: globals.app.state.theme.displayZones.carpetDelImg,
        });
      },
    },
    {
      key: 'carpetZoneSaveButton',
      value: function (t, n, o, u) {
        return React.default.createElement(module1413.RectButton, {
          funcId: n,
          panResponder: o,
          left: t + u - (1.5 * module1332.buttonConfig.rectBtn.size.width) / 2 - 1 + module1332.buttonConfig.rectOperateBoarderDis,
          top: u - (1.5 * module1332.buttonConfig.rectBtn.size.height) / 2 + 1 - module1332.buttonConfig.rectOperateBoarderDis,
          width: module1332.buttonConfig.rectBtn.size.width,
          height: module1332.buttonConfig.rectBtn.size.height,
          imageSource: globals.app.state.theme.displayZones.saveImg,
        });
      },
    },
    {
      key: 'mapEditStep',
      get: function () {
        return module381.RSM.mapSaveEnabled
          ? module381.RSM.mapStatus == module381.MapStatus.None
            ? I.NoMap
            : -1 == module381.RSM.currentMapId
            ? I.Unsaved
            : module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments
            ? I.Saved
            : module381.RSM.mapStatus == module381.MapStatus.Has_WithSegments
            ? I.Segmented
            : I.Unknown
          : I.SwitchOff;
      },
    },
  ]);
  return t;
})();

exports.default = module1418;
var M = module12.StyleSheet.create({
  root: {
    height: module394.default.sharedCache().ScreenHeight,
    backgroundColor: '#FFFFFF',
    top: k(),
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  mapTop: module391.default.iOSAndroidReturn(module1153.StatusBarHeight + module1153.AppBarMarginTop, module12.StatusBar.currentHeight || 0) + 44 + 60,
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
    top: module391.default.isIphoneX() ? module1153.StatusBarHeight + module1153.AppBarHeight + 36 : module1153.StatusBarHeight + module1153.AppBarHeight + 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  refreshMapSegmentIndicator: {
    position: 'absolute',
    top: module391.default.isIphoneX() ? module1153.StatusBarHeight + module1153.AppBarHeight + 36 : module1153.StatusBarHeight + module1153.AppBarHeight + 12,
    right: 22,
    backgroundColor: 'transparent',
  },
  areaView: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: module1332.buttonConfig.rectSerial.size.height / 2,
    width: 100,
    height: module1332.buttonConfig.rectSerial.size.height,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaText: {
    color: module1332.buttonConfig.areaTextColor,
    fontSize: 10,
  },
  dragView: {
    position: 'absolute',
    left: 0,
    overflow: 'visible',
  },
});
exports.MapEditCommonStyles = M;

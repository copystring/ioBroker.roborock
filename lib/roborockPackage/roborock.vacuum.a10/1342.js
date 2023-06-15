require('./506');

require('./507');

var module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      p = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var l = p ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, s, l);
        else u[s] = t[s];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module377 = require('./377'),
  module381 = require('./381'),
  module1343 = require('./1343'),
  module1229 = require('./1229'),
  module386 = require('./386'),
  module387 = require('./387'),
  module390 = require('./390'),
  module1231 = require('./1231');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function E(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function O(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      E(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      E(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

var module389 = require('./389'),
  module934 = require('./934'),
  module491 = require('./491').strings,
  C = {
    SwitchOff: 0,
    NoMap: 1,
    Unsaved: 2,
    Saved: 3,
    Segmented: 4,
    Unknown: -1,
  };

exports.MapEditSteps = C;

var w = (function () {
  function t() {
    module4.default(this, t);
  }

  module5.default(t, null, [
    {
      key: 'mapEditStep',
      get: function () {
        return module377.RSM.mapSaveEnabled
          ? module377.RSM.mapStatus == module377.MapStatus.None
            ? C.NoMap
            : -1 == module377.RSM.currentMapId
            ? C.Unsaved
            : module377.RSM.mapStatus == module377.MapStatus.Has_WithoutSegments
            ? C.Saved
            : module377.RSM.mapStatus == module377.MapStatus.Has_WithSegments
            ? C.Segmented
            : C.Unknown
          : C.SwitchOff;
      },
    },
    {
      key: 'isMopForbiddenSupported',
      value: function () {
        return module386.default.isCustomModeSupported() || module386.default.isMopForbiddenSupported();
      },
    },
    {
      key: 'confirmButton',
      value: function (t, n, o) {
        var u = !(arguments.length > 3 && undefined !== arguments[3]) || arguments[3] ? P.guideButton : [P.guideButton, P.lastAddition],
          s = React.default.createElement(module381.PureImageButton, {
            key: 0,
            ref: o,
            funcId: 'map_edit_confirm',
            accessibilityLabel: module491.localization_strings_Main_Error_ErrorDetailPage_3,
            style: u,
            image: globals.app.state.theme.mapEdit.confirmImg,
            onPress: t,
            imageWidth: 40,
            imageHeight: 40,
            enabled: n,
            imageStyle: {
              resizeMode: 'contain',
              width: 24,
              height: 24,
            },
            key: 0,
          });
        return s;
      },
    },
    {
      key: 'guideButton',
      value: function (t, n) {
        var o = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2] ? P.guideButton : [P.guideButton, P.lastAddition],
          u = React.default.createElement(module381.PureImageButton, {
            key: 1,
            ref: n,
            funcId: 'map_edit_guide',
            accessibilityLabel: module491.accessibility_guide,
            style: o,
            image: globals.app.state.theme.mapEdit.guideImg,
            onPress: t,
            imageWidth: 40,
            imageHeight: 40,
            imageStyle: {
              resizeMode: 'contain',
              width: 24,
              height: 24,
            },
          });
        return u;
      },
    },
    {
      key: 'resegButton',
      value: function (t, n, o) {
        var u = !(arguments.length > 3 && undefined !== arguments[3]) || arguments[3] ? P.guideButton : [P.guideButton, P.lastAddition];
        return React.default.createElement(module381.PureImageButton, {
          key: 2,
          ref: o,
          funcId: 'map_edit_reset',
          accessibilityLabel: module491.accessibility_guide,
          style: u,
          image: globals.app.state.theme.mapEdit.resetImg,
          onPress: t,
          enabled: n,
          imageWidth: 40,
          imageHeight: 40,
          imageStyle: {
            resizeMode: 'contain',
            width: 24,
            height: 24,
          },
        });
      },
    },
    {
      key: 'setNavigation',
      value: function (t, n, o) {
        var u = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : 'relative',
          p = arguments.length > 4 && undefined !== arguments[4] ? arguments[4] : 'transparent',
          s = !(arguments.length > 5 && undefined !== arguments[5]) || arguments[5];
        if (t.props.navigation)
          t.props.navigation.setParams({
            navBarPosition: u,
            navBarBackgroundColor: p,
            onPressLeft: o,
            rightItems: n,
            hiddenBottomLine: s,
          });
        else console.log('MapEditCommonService.setNavigation: props.navigation not found.');
      },
    },
    {
      key: 'initMapViewConfig',
      value: function (t, n) {
        if (t) {
          var o = module1229.MM.mapData;

          switch ((t.setState(O({}, o)), t.changeMapViewMode(n), t.enterMapEditMode(), n)) {
            case module1231.MapModelInCleanMode.Segment_Clean_Sequential_Edit:
              t.setCleanSequence(module1229.MM.cleanSequence.concat(), true);
              break;

            default:
              console.log('MapEditCommonService.initMapViewConfig: Unknown MapModelInCleanMode detected.');
          }
        } else console.log('MapEditCommonService.initMapViewConfig: MapView undefined.');
      },
    },
    {
      key: 'getNoMapTipView',
      value: function (t) {
        var n = t == module377.MapStatus.Has_WithoutSegments ? module491.no_seg_map_tip : module491.no_map_tip;
        return React.default.createElement(module1343.default, {
          tip: n,
          shouldShowGuideButton: module377.RSM.mapStatus == module377.MapStatus.Has_WithoutSegments,
        });
      },
    },
    {
      key: 'resetButton',
      value: function (t, n, o) {
        return React.default.createElement(module381.TopImageButton, {
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
          style: P.resetButton,
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
        var module49 = '';
        module49 =
          t == module934.mapOpErrorCode.VENDOR_ERROR_CODE
            ? module491.robot_communication_exception
            : t == module934.mapOpErrorCode.PROCESS_BUSY_ERROR_CODE
            ? module491.toast_frequently_operate
            : t == module934.mapOpErrorCode.ERROR_ACCESS_DENIED || t == module934.mapOpErrorCode.BAD_REQUEST
            ? module491.map_edit_unauthorized_op
            : t == module934.mapOpErrorCode.ERROR_ACTION_LOCKED
            ? module491.rubys_main_diag_update_map
            : (t == module934.mapOpErrorCode.ERROR_ACTION_TIMEOUT || module934.mapOpErrorCode.PARAM_ERROR || module934.mapOpErrorCode.OPERATION_FAILED,
              module491.map_object_ignore_failed);
        return module49;
      },
    },
  ]);
  return t;
})();

exports.default = w;
var P = module12.StyleSheet.create({
  root: {
    height: module390.default.sharedCache().ScreenHeight,
    backgroundColor: '#FFFFFF',
    top: -(
      module387.default.iOSAndroidReturn(44 + module934.StatusBarHeight + module934.AppBarMarginTop, (module12.StatusBar.currentHeight || 0) + 44) +
      (module389.isWindowDisplay ? 8 : 0)
    ),
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  mapTop: module387.default.iOSAndroidReturn(module934.StatusBarHeight + module934.AppBarMarginTop, module12.StatusBar.currentHeight || 0) + 44 + 60,
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
    marginLeft: globals.isRTL ? 14 : null,
    marginRight: globals.isRTL ? null : 14,
  },
  resetButton: {
    position: 'absolute',
    justifyContent: 'center',
    right: 22,
    top: module387.default.isIphoneX() ? module934.StatusBarHeight + module934.AppBarHeight + 36 : module934.StatusBarHeight + module934.AppBarHeight + 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  refreshMapSegmentIndicator: {
    position: 'absolute',
    top: module387.default.isIphoneX() ? module934.StatusBarHeight + module934.AppBarHeight + 36 : module934.StatusBarHeight + module934.AppBarHeight + 12,
    right: 22,
    backgroundColor: 'transparent',
  },
});
exports.MapEditCommonStyles = P;

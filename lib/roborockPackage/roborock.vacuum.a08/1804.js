require('./407');

require('./411');

require('./390');

require('./1348');

var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = x(n);
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
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module378 = require('./378'),
  module377 = require('./377'),
  module386 = require('./386'),
  module1231 = require('./1231'),
  module1805 = require('./1805'),
  module383 = require('./383'),
  module415 = require('./415'),
  module506 = require('./506'),
  module1065 = require('./1065'),
  module1347 = require('./1347'),
  module1354 = require('./1354');

function x(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (x = function (t) {
    return t ? o : n;
  })(t);
}

function w() {
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

require('./389');

module387.default.scaledPixel(46);

var module491 = require('./491').strings,
  P = (function (t) {
    module7.default(P, t);

    var module506 = P,
      module1065 = w(),
      x = function () {
        var t,
          n = module11.default(module506);

        if (module1065) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);
      (n = x.call(this, t)).state = {
        cleanCount: 1,
        mapEditButtonEnabled: false,
        modeSetButtonEnabled: false,
        cleanOrder: 0,
        smallCleanModeIcon: null,
        smallWaterModeIcon: null,
        modeBgIcon: null,
        tab: null,
        modeTitle: module491.map_edit_custom_mode,
      };
      return n;
    }

    module5.default(P, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.updateUI();
        },
      },
      {
        key: 'updateUI',
        value: function () {
          this.updateModeIcon(module377.RSM.fanPower, module377.RSM.waterBoxMode, module415.DMM.isGarnet ? module377.RSM.mopModeId : module377.RSM.mopMode);
        },
      },
      {
        key: 'getLeftDatas',
        value: function () {
          var t = this.state.tab,
            n = t == module1347.TabSegment,
            o = t == module1347.TabZone,
            l = this.context.theme.homeSidebar,
            s = [l.cleanCount1Icon, l.cleanCount2Icon, l.cleanCount3Icon],
            u = module377.CleanResumeFlag.None && module377.BackDockResumeFlag.None && !module377.RSM.isCleaning() && !module377.RSM.isCleanTaskShouldResume(),
            c = module415.DMM.isGarnet && 4 == module377.RSM.mopModeId,
            h = o && u,
            p = n && module386.default.isMultiFloorSupported() && u;
          if (!u) this.state.cleanCount = 1;

          if (
            module1231.MM.mapData &&
            !module1231.MM.mapData.map.isEmpty &&
            module386.default.isMultiFloorSupported() &&
            module377.RSM.mapSaveEnabled &&
            module377.RSM.mapStatus != module377.MapStatus.None &&
            !module377.RSM.isRunning &&
            -1 == module377.RSM.currentMapId
          ) {
            module377.RSM.state;
            module377.RobotState.LOCKED;
          }

          return [
            {
              title: module491.rubys_main_button_text_add,
              enabled: !module377.RSM.isCleaning() && !module377.RSM.isCleanTaskShouldResume() && this.props.addZoneButtonEnabled,
              image: l.addZoneIcon,
              funcId: 'home_add_zone',
              onPress: this.props.onPressAddZoneButton,
              visible: o && !(module377.RSM.isCleaning() || module377.RSM.isCleanTaskShouldResume()) && !this.props.isHiddenAddZone,
            },
            {
              title: module491.localization_strings_Setting_History_index_12,
              enabled: !module377.RSM.isCleaning() && !module377.RSM.isCleanTaskShouldResume() && this.props.cleanCountButtonEnabled,
              image: s[this.state.cleanCount - 1],
              funcId: 'home_clean_count',
              onPress: this._onPressCleanCountButton.bind(this),
              visible: (h || p) && !c && !this.props.isHiddenCleanCount,
            },
          ];
        },
      },
      {
        key: 'getRightDatas',
        value: function () {
          var t = this.state.tab,
            n = t == module1347.TabSegment,
            o = this.context.theme.homeSidebar,
            l = module377.CleanResumeFlag.None && module377.BackDockResumeFlag.None && !module377.RSM.isCleaning() && !module377.RSM.isCleanTaskShouldResume();
          if (n) module386.default.isMultiFloorSupported();
          if (!l) this.state.cleanCount = 1;
          var s =
            module1231.MM.mapData &&
            !module1231.MM.mapData.map.isEmpty &&
            module386.default.isMultiFloorSupported() &&
            module377.RSM.mapSaveEnabled &&
            module377.RSM.mapStatus != module377.MapStatus.None &&
            !module377.RSM.isRunning &&
            -1 == module377.RSM.currentMapId &&
            module377.RSM.state != module377.RobotState.LOCKED &&
            !this.props.isHiddenRedDot;
          return [
            {
              title: null,
              enabled: module377.RSM.isHomeButtonsEnabled() && this.state.mapEditButtonEnabled,
              shouldShowRedPoint: s,
              image: o.mapEditIcon,
              funcId: 'home_map_edit',
              accessibilityLabel: module491.map_edit_home_menu_title,
              redPointStyle: {
                top: 10,
                right: 10,
              },
              onPress: this._onPressMapEditButton.bind(this),
              visible: !this.props.isHiddenMapEdit,
            },
            {
              title: null,
              enabled: module377.RSM.isHomeButtonsEnabled() && this.state.modeSetButtonEnabled,
              image: this.state.modeBgIcon,
              funcId: 'home_custom_mode',
              accessibilityLabel: module491.map_edit_bottom_menu_mode,
              onPress: this._onPressCustomModeButton.bind(this),
              visible: !this.props.isHiddenCustomMode,
              isMode: true,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          return module377.RSM.hasGotMapFirstTime
            ? React.default.createElement(
                module12.View,
                {
                  style: W.wrapContainer,
                  pointerEvents: 'box-none',
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: W.container,
                    pointerEvents: 'box-none',
                  },
                  this.getLeft(),
                  this.getRight()
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: W.explorationWrap,
                  },
                  module377.RSM.isExploring && React.default.createElement(module1805.default, null)
                )
              )
            : null;
        },
      },
      {
        key: 'getModeIcon',
        value: function (t) {
          return React.default.createElement(
            module12.TouchableWithoutFeedback,
            module21.default(
              {
                key: t,
              },
              module387.default.getAccessibilityLabel('main_mode_set', module491.map_edit_custom_mode),
              {
                onPress: this._onPressCustomModeButton.bind(this),
              }
            ),
            React.default.createElement(
              module12.View,
              {
                style: [
                  W.modeView,
                  {
                    opacity: module377.RSM.isHomeButtonsEnabled() && this.state.modeSetButtonEnabled ? 1 : 0.5,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: W.modeImageViewWrapper,
                },
                React.default.createElement(module12.ImageBackground, {
                  style: W.modeImageView,
                  source: this.state.modeBgIcon,
                }),
                React.default.createElement(module12.Image, {
                  style: W.smallCleanModeIcon,
                  source: this.state.smallCleanModeIcon,
                }),
                React.default.createElement(module12.Image, {
                  style: W.smallWaterModeIcon,
                  source: this.state.smallWaterModeIcon,
                })
              )
            )
          );
        },
      },
      {
        key: 'getLeft',
        value: function () {
          var t = this.context.theme.homeSidebar;
          if (null == this.state.tab) return null;
          var o = this.getLeftDatas().map(function (o, l) {
            return o.visible
              ? React.default.createElement(
                  module381.TopImageButton,
                  module21.default({}, o, {
                    key: l,
                    imageWidth: 60,
                    imageHeight: 60,
                    fontSize: 11,
                    textTop: -5,
                    textColor: t.textColor,
                    style: W.button,
                    maxTextWidth: 80,
                    index: l,
                  })
                )
              : null;
          });
          return React.default.createElement(
            module12.View,
            {
              style: W.leftContainer,
            },
            o
          );
        },
      },
      {
        key: 'getRight',
        value: function () {
          var t,
            o = this;
          if (null == this.state.tab) return null;
          var l = this.context.theme.homeSidebar,
            s = this.getRightDatas().map(function (t, s) {
              return t.visible
                ? t.isMode
                  ? o.getModeIcon(s)
                  : React.default.createElement(
                      module381.TopImageButton,
                      module21.default({}, t, {
                        key: s,
                        imageWidth: 60,
                        imageHeight: 60,
                        fontSize: 11,
                        textTop: -5,
                        textColor: l.textColor,
                        style: {
                          marginBottom: -10,
                        },
                        maxTextWidth: 80,
                        index: s,
                      })
                    )
                : null;
            }),
            u = null != (t = this.props.bottom) ? t : -10;
          return React.default.createElement(
            module12.View,
            {
              style: [
                W.rightContainer,
                {
                  marginBottom: u,
                },
              ],
            },
            s
          );
        },
      },
      {
        key: '_onPressCleanCountButton',
        value: function () {
          var t,
            n,
            o = this.state.cleanCount + 1;
          if (o > 3) o = 1;
          this.setState({
            cleanCount: o,
          });
          if (!(null == (t = (n = this.props).onCleanCountChanged))) t.call(n, o);
        },
      },
      {
        key: 'updateModeIcon',
        value: function (t, n, o) {
          var l,
            s = module378.CleanModes().find(function (n) {
              return n.strength == t;
            }),
            u = module378.MopWaterOrStrengths().find(function (t) {
              return t.strength == n;
            }),
            c = module378.isModeCustomized(t, n, o),
            h = 4 == module377.RSM.mopModeId || c || this.isOnlyMopMode(n, o) || this.isOnlyCleanMode(u, n);
          this.setState({
            modeBgIcon: this.getModeIconBackground(c, t, s, n, u, o),
            smallCleanModeIcon: h ? null : s.homesmall,
            smallWaterModeIcon: h ? null : module415.DMM.isGarnet ? (null == (l = module1354.ModeDataInstance.getCustomMopModeConfigById(o)) ? undefined : l.icon) : u.homesmall,
            modeTitle: this.getModeTitle(c, n, u, o),
          });
        },
      },
      {
        key: 'getModeIconBackground',
        value: function (t, n, o, l, s, u) {
          var c = this.context.theme.ModeSettingPanel;
          return t
            ? c.custom
            : 4 == module377.RSM.mopModeId
            ? c.doggedDirty
            : this.isOnlyMopMode(l, u)
            ? null == s
              ? undefined
              : s.homenormal
            : this.isOnlyCleanMode(s, l) || module377.RSM.waterShortageStatus
            ? null == o
              ? undefined
              : o.homenormal
            : c.modeWrapBackground;
        },
      },
      {
        key: 'isOnlyCleanMode',
        value: function (t, n) {
          return !t || 200 == n || !module377.RSM.isWaterBoxIn || !module377.RSM.isWaterBoxCarriageIn || module377.RSM.waterShortageStatus;
        },
      },
      {
        key: 'isOnlyMopMode',
        value: function (t, n) {
          return module386.default.isShakeMopSetSupported() && 301 == n && module377.RSM.isWaterBoxIn && 200 != t;
        },
      },
      {
        key: '_onPressMapEditButton',
        value: function () {
          if (this.state.mapEditButtonEnabled) this.props.onPressMapEditButton();
        },
      },
      {
        key: '_onPressCustomModeButton',
        value: function () {
          module383.LogEventCommon('click_custom_mode_edit');
          if (this.state.modeSetButtonEnabled) this.props.onPressCustomModeButton();
        },
      },
      {
        key: 'getModeTitle',
        value: function (t, n, o, l) {
          return null;
        },
      },
    ]);
    return P;
  })(React.default.Component);

exports.default = P;
P.defaultProps = {
  addZoneButtonEnabled: true,
  cleanCountButtonEnabled: true,
};
P.contextType = module506.AppConfigContext;
var W = module12.StyleSheet.create({
  wrapContainer: {
    width: module12.Dimensions.get('window').width,
    height: 200,
    marginBottom: -module1065.TabWrapHeight,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
  },
  rightContainer: {
    marginBottom: -10,
    marginRight: 6,
  },
  leftContainer: {
    marginBottom: module1065.TabWrapHeight + 10,
    marginLeft: 22,
  },
  loadMapButton: {
    backgroundColor: 'transparent',
    maxWidth: 80,
    height: 40,
  },
  button: {},
  explorationWrap: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 0,
  },
  modeView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeImageViewWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  modeImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    transform: [
      {
        rotateY: module12.I18nManager.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  modeText: {
    fontSize: 11,
    paddingTop: 2,
    maxWidth: 70,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.6)',
  },
  smallCleanModeIcon: {
    position: 'absolute',
    left: 13,
    top: 13,
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  smallWaterModeIcon: {
    position: 'absolute',
    right: 13,
    bottom: 13,
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
});

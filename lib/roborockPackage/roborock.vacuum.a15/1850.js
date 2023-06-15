require('./415');

require('./419');

require('./394');

require('./1545');

var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module391 = require('./391'),
  module382 = require('./382'),
  module381 = require('./381'),
  module390 = require('./390'),
  module414 = require('./414'),
  module1851 = require('./1851'),
  module387 = require('./387'),
  module423 = require('./423'),
  module1121 = require('./1121'),
  module1355 = require('./1355'),
  module1544 = require('./1544'),
  module1543 = require('./1543'),
  module1541 = require('./1541');

function D() {
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

require('./393');

module391.default.scaledPixel(46);

var module505 = require('./505').strings,
  W = (function (t) {
    module7.default(W, t);

    var n = W,
      module1121 = D(),
      B = function () {
        var t,
          o = module11.default(n);

        if (module1121) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function W(t) {
      var n;
      module4.default(this, W);
      (n = B.call(this, t)).state = {
        cleanCount: 1,
        mapEditButtonEnabled: false,
        modeSetButtonEnabled: false,
        cleanOrder: 0,
        smallCleanModeIcon: null,
        smallWaterModeIcon: null,
        modeBgIcon: null,
        tab: null,
        modeTitle: module505.smart_scene_clean_mode_setting_item_title,
      };
      return n;
    }

    module5.default(W, [
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
          this.updateModeIcon(module381.RSM.fanPower, module381.RSM.waterBoxMode, module423.DMM.isGarnet ? module381.RSM.mopModeId : module381.RSM.mopMode);
        },
      },
      {
        key: 'getLeftDatas',
        value: function () {
          var t = this.state.tab,
            n = t == module1544.TabSegment,
            o = t == module1544.TabZone,
            l = this.context.theme.homeSidebar,
            s = [l.cleanCount1Icon, l.cleanCount2Icon, l.cleanCount3Icon],
            u = module381.CleanResumeFlag.None && module381.BackDockResumeFlag.None && !module381.RSM.isCleaning() && !module381.RSM.isCleanTaskShouldResume(),
            c = module423.DMM.isGarnet && 4 == module381.RSM.mopModeId,
            h = o && u,
            p = n && module390.default.isMultiFloorSupported() && u;
          if (!u) this.state.cleanCount = 1;

          if (
            module414.MM.mapData &&
            !module414.MM.mapData.map.isEmpty &&
            module390.default.isMultiFloorSupported() &&
            module381.RSM.mapSaveEnabled &&
            module381.RSM.mapStatus != module381.MapStatus.None &&
            !module381.RSM.isRunning &&
            -1 == module381.RSM.currentMapId
          ) {
            module381.RSM.state;
            module381.RobotState.LOCKED;
          }

          return [
            {
              title: module505.rubys_main_button_text_add,
              enabled: !module381.RSM.isCleaning() && !module381.RSM.isCleanTaskShouldResume() && this.props.addZoneButtonEnabled,
              image: l.addZoneIcon,
              funcId: 'home_add_zone',
              onPress: this.props.onPressAddZoneButton,
              visible:
                o &&
                !(
                  module381.RSM.isCleaning() ||
                  module381.RSM.isCleanTaskShouldResume() ||
                  module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER ||
                  module381.RSM.state == module381.RobotState.WASHING_DUSTER
                ) &&
                !this.props.isHiddenAddZone,
            },
            {
              title: module505.localization_strings_Setting_History_index_12,
              enabled: !module381.RSM.isCleaning() && !module381.RSM.isCleanTaskShouldResume() && this.props.cleanCountButtonEnabled,
              image: s[this.state.cleanCount - 1],
              funcId: 'home_clean_count',
              onPress: this._onPressCleanCountButton.bind(this),
              visible:
                (h || p) &&
                !c &&
                !this.props.isHiddenCleanCount &&
                !(module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module381.RSM.state == module381.RobotState.WASHING_DUSTER),
            },
          ];
        },
      },
      {
        key: 'getRightDatas',
        value: function () {
          var t = this.state.tab,
            n = t == module1544.TabSegment,
            o = this.context.theme.homeSidebar,
            l = module381.CleanResumeFlag.None && module381.BackDockResumeFlag.None && !module381.RSM.isCleaning() && !module381.RSM.isCleanTaskShouldResume();
          if (n) module390.default.isMultiFloorSupported();
          if (!l) this.state.cleanCount = 1;
          var s =
            module414.MM.mapData &&
            !module414.MM.mapData.map.isEmpty &&
            module390.default.isMultiFloorSupported() &&
            module381.RSM.mapSaveEnabled &&
            module381.RSM.mapStatus != module381.MapStatus.None &&
            !module381.RSM.isRunning &&
            -1 == module381.RSM.currentMapId &&
            module381.RSM.state != module381.RobotState.LOCKED &&
            !this.props.isHiddenRedDot;
          return [
            {
              title: null,
              enabled: module381.RSM.isHomeButtonsEnabled() && this.state.mapEditButtonEnabled,
              shouldShowRedPoint: s,
              image: o.mapEditIcon,
              funcId: 'home_map_edit',
              accessibilityLabel: module505.map_edit_home_menu_title,
              redPointStyle: {
                top: 10,
                right: 10,
              },
              onPress: this._onPressMapEditButton.bind(this),
              visible: !this.props.isHiddenMapEdit,
            },
            {
              title: null,
              enabled: module381.RSM.isHomeButtonsEnabled() && this.state.modeSetButtonEnabled,
              image: this.state.modeBgIcon,
              funcId: 'home_custom_mode',
              accessibilityLabel: module505.map_edit_bottom_menu_mode,
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
          return module381.RSM.hasGotMapFirstTime
            ? React.default.createElement(
                module12.View,
                {
                  style: P.wrapContainer,
                  pointerEvents: 'box-none',
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: P.container,
                    pointerEvents: 'box-none',
                  },
                  this.getLeft(),
                  this.getRight()
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: P.explorationWrap,
                  },
                  module381.RSM.isExploring && React.default.createElement(module1851.default, null)
                )
              )
            : null;
        },
      },
      {
        key: 'getModeIcon',
        value: function (t) {
          var n = module381.RSM.isHomeButtonsEnabled() && this.state.modeSetButtonEnabled;
          return React.default.createElement(
            module12.TouchableWithoutFeedback,
            module22.default(
              {
                key: t,
              },
              module391.default.getAccessibilityLabel('main_mode_set', module505.smart_scene_clean_mode_setting_item_title),
              {
                onPress: n ? this._onPressCustomModeButton.bind(this) : null,
              }
            ),
            React.default.createElement(
              module12.View,
              {
                style: [
                  P.modeView,
                  {
                    opacity: n ? 1 : 0.5,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: P.modeImageViewWrapper,
                },
                React.default.createElement(module12.ImageBackground, {
                  style: P.modeImageView,
                  source: this.state.modeBgIcon,
                }),
                React.default.createElement(module12.Image, {
                  style: P.smallCleanModeIcon,
                  source: this.state.smallCleanModeIcon,
                }),
                React.default.createElement(module12.Image, {
                  style: P.smallWaterModeIcon,
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
          var n = this.getLeftDatas().map(function (n, l) {
            return n.visible
              ? React.default.createElement(
                  module385.TopImageButton,
                  module22.default({}, n, {
                    key: l,
                    imageWidth: 60,
                    imageHeight: 60,
                    fontSize: 11,
                    textTop: -5,
                    textColor: t.textColor,
                    style: P.button,
                    maxTextWidth: 80,
                    index: l,
                  })
                )
              : null;
          });
          return React.default.createElement(
            module12.View,
            {
              style: P.leftContainer,
            },
            n
          );
        },
      },
      {
        key: 'getRight',
        value: function () {
          var t,
            n = this;
          if (null == this.state.tab) return null;
          var l = this.context.theme.homeSidebar,
            s = this.getRightDatas().map(function (t, s) {
              return t.visible
                ? t.isMode
                  ? n.getModeIcon(s)
                  : React.default.createElement(
                      module385.TopImageButton,
                      module22.default({}, t, {
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
                P.rightContainer,
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
            s = module382.CleanModes().find(function (n) {
              return n.strength == t;
            }),
            u = module382.MopWaterOrStrengths().find(function (t) {
              return t.strength == n;
            }),
            c = module382.isModeCustomized(t, n, o),
            h = 4 == module381.RSM.mopModeId || c || this.isOnlyMopMode(n, o) || this.isOnlyCleanMode(u, n);
          this.setState({
            modeBgIcon: this.getModeIconBackground(c, t, s, n, u, o),
            smallCleanModeIcon: h ? null : s.homesmall,
            smallWaterModeIcon: h ? null : module423.DMM.isGarnet ? (null == (l = module1543.ModeDataInstance.getCustomMopModeConfigById(o)) ? undefined : l.icon) : u.homesmall,
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
            : 4 == module381.RSM.mopModeId
            ? c.doggedDirty
            : this.isOnlyMopMode(l, u)
            ? null == s
              ? undefined
              : s.homenormal
            : this.isOnlyCleanMode(s, l) || module381.RSM.waterShortageStatus
            ? null == o
              ? undefined
              : o.homenormal
            : c.modeWrapBackground;
        },
      },
      {
        key: 'isOnlyCleanMode',
        value: function (t, n) {
          return (
            !t ||
            200 == n ||
            !module381.RSM.isWaterBoxIn ||
            ((!module381.RSM.isWaterBoxCarriageIn || module381.RSM.waterShortageStatus) && module390.default.isShakeMopSetSupported())
          );
        },
      },
      {
        key: 'isOnlyMopMode',
        value: function (t, n) {
          return module390.default.isPureCleanMopSupported() && module381.RSM.fanPower == module1541.CleanModeZero;
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
          module387.LogEventCommon('click_custom_mode_edit');
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
    return W;
  })(React.default.Component);

exports.default = W;
W.defaultProps = {
  addZoneButtonEnabled: true,
  cleanCountButtonEnabled: true,
};
W.contextType = module1121.AppConfigContext;
var P = module12.StyleSheet.create({
  wrapContainer: {
    height: 200,
    marginBottom: -module1355.TabWrapHeight,
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
    marginBottom: module1355.TabWrapHeight + 10,
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

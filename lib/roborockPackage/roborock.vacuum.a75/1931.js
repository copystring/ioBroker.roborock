require('./416');

require('./420');

require('./394');

require('./1627');

var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module382 = require('./382'),
  module381 = require('./381'),
  module390 = require('./390'),
  module415 = require('./415'),
  module1932 = require('./1932'),
  module387 = require('./387'),
  module424 = require('./424'),
  module1199 = require('./1199'),
  module1434 = require('./1434'),
  module1626 = require('./1626'),
  module1624 = require('./1624');

function T() {
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

var module510 = require('./510').strings,
  W = (function (t) {
    module9.default(W, t);

    var n = W,
      module1199 = T(),
      B = function () {
        var t,
          o = module12.default(n);

        if (module1199) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function W(t) {
      var n;
      module6.default(this, W);
      (n = B.call(this, t)).state = {
        cleanCount: 1,
        mapEditButtonEnabled: false,
        modeSetButtonEnabled: false,
        cleanOrder: 0,
        smallCleanModeIcon: null,
        smallWaterModeIcon: null,
        modeBgIcon: null,
        tab: null,
        modeTitle: module510.smart_scene_clean_mode_setting_item_title,
      };
      return n;
    }

    module7.default(W, [
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
          this.updateModeIcon(module381.RSM.fanPower, module381.RSM.waterBoxMode, module424.DMM.isGarnet ? module381.RSM.mopModeId : module381.RSM.mopMode);
        },
      },
      {
        key: 'getLeftDatas',
        value: function () {
          var t = this.state.tab,
            n = t == module1626.TabSegment,
            o = t == module1626.TabZone,
            l = this.context.theme.homeSidebar,
            s = [l.cleanCount1Icon, l.cleanCount2Icon, l.cleanCount3Icon],
            u = module381.CleanResumeFlag.None && module381.BackDockResumeFlag.None && !module381.RSM.isCleaning() && !module381.RSM.isCleanTaskShouldResume(),
            c = module424.DMM.isGarnet && 4 == module381.RSM.mopModeId,
            h = o && u,
            p = n && module390.default.isMultiFloorSupported() && u;
          if (!u) this.state.cleanCount = 1;

          if (
            module415.MM.mapData &&
            !module415.MM.mapData.map.isEmpty &&
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
              title: module510.rubys_main_button_text_add,
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
              title: module510.localization_strings_Setting_History_index_12,
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
            n = t == module1626.TabSegment,
            o = this.context.theme.homeSidebar,
            l = module381.CleanResumeFlag.None && module381.BackDockResumeFlag.None && !module381.RSM.isCleaning() && !module381.RSM.isCleanTaskShouldResume();
          if (n) module390.default.isMultiFloorSupported();
          if (!l) this.state.cleanCount = 1;
          var s =
            module415.MM.mapData &&
            !module415.MM.mapData.map.isEmpty &&
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
              accessibilityLabel: module510.map_edit_home_menu_title,
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
              accessibilityLabel: module510.map_edit_bottom_menu_mode,
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
                module13.View,
                {
                  style: D.wrapContainer,
                  pointerEvents: 'box-none',
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: D.container,
                    pointerEvents: 'box-none',
                  },
                  this.getLeft(),
                  this.getRight()
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: D.explorationWrap,
                  },
                  module381.RSM.isExploring && React.default.createElement(module1932.default, null)
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
            module13.TouchableWithoutFeedback,
            module22.default(
              {
                key: t,
              },
              module391.default.getAccessibilityLabel('main_mode_set', module510.smart_scene_clean_mode_setting_item_title),
              {
                onPress: n ? this._onPressCustomModeButton.bind(this) : null,
              }
            ),
            React.default.createElement(
              module13.View,
              {
                style: [
                  D.modeView,
                  {
                    opacity: n ? 1 : 0.5,
                  },
                ],
              },
              React.default.createElement(
                module13.View,
                {
                  style: D.modeImageViewWrapper,
                },
                React.default.createElement(module13.ImageBackground, {
                  style: D.modeImageView,
                  source: this.state.modeBgIcon,
                }),
                React.default.createElement(module13.Image, {
                  style: D.smallCleanModeIcon,
                  source: this.state.smallCleanModeIcon,
                }),
                React.default.createElement(module13.Image, {
                  style: D.smallWaterModeIcon,
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
                    style: D.button,
                    maxTextWidth: 80,
                    index: l,
                  })
                )
              : null;
          });
          return React.default.createElement(
            module13.View,
            {
              style: D.leftContainer,
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
            module13.View,
            {
              style: [
                D.rightContainer,
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
          var l = module382.CleanModes().find(function (n) {
              return n.strength == t;
            }),
            s = module382.MopWaterOrStrengths().find(function (t) {
              return t.strength == n;
            }),
            u = module382.isModeCustomized(t, n, o),
            c = 4 == module381.RSM.mopModeId || u || this.isOnlyMopMode(n, o) || this.isOnlyCleanMode(s, n);
          this.setState({
            modeBgIcon: this.getModeIconBackground(u, t, l, n, s, o),
            smallCleanModeIcon: c ? null : l.homesmall,
            smallWaterModeIcon: c ? null : s.homesmall,
            modeTitle: this.getModeTitle(u, n, s, o),
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
          return module390.default.isPureCleanMopSupported() && module381.RSM.fanPower == module1624.CleanModeZero;
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
W.contextType = module1199.AppConfigContext;
var D = module13.StyleSheet.create({
  wrapContainer: {
    height: 200,
    marginBottom: -module1434.TabWrapHeight,
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
    marginBottom: module1434.TabWrapHeight + 10,
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
        rotateY: module13.I18nManager.isRTL ? '180deg' : '0deg',
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

require('./1067');

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
    var o = b(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var p in t)
      if ('default' !== p && Object.prototype.hasOwnProperty.call(t, p)) {
        var l = u ? Object.getOwnPropertyDescriptor(t, p) : null;
        if (l && (l.get || l.set)) Object.defineProperty(s, p, l);
        else s[p] = t[p];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module386 = require('./386'),
  module377 = require('./377'),
  module506 = require('./506'),
  module415 = require('./415'),
  module1261 = require('./1261');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : n;
  })(t);
}

function S() {
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

var module491 = require('./491').strings,
  module389 = require('./389'),
  A = {
    Menu_Fbz: 'menu_forbidden',
    Menu_Zone: 'menu_zone',
    Menu_Mode: 'menu_mode',
    Menu_Mode_Smart: 'menu_mode_smart',
    Menu_Order: 'menu_order',
    Menu_Carpet: 'menu_carpet',
    Menu_Rotate: 'menu_rotate',
  };

exports.MenuType = A;
var E = {
  None: 'none',
  Merge: 'merge',
  Split: 'split',
  Name: 'name',
  Floor: 'floor',
  Custom: 'custom',
  Order: 'order',
  AddCarpet: 'addCarpet',
  Ignore: 'ignoreCarpet',
};
exports.EditAction = E;

var I = (function (t) {
  module7.default(k, t);

  var module506 = k,
    b = S(),
    I = function () {
      var t,
        n = module11.default(module506);

      if (b) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function k(t) {
    var n;
    module4.default(this, k);

    (n = I.call(this, t))._onPressConfirmButton = function () {
      if (n.state.currentAction == E.Merge) {
        if (!(null == n.props.onPressConfirmButtonForMerge)) n.props.onPressConfirmButtonForMerge();
      } else if (n.state.currentAction == E.Split) {
        if (!(null == n.props.onPressConfirmButtonForSplit)) n.props.onPressConfirmButtonForSplit();
      } else if (n.state.currentAction == E.Name) {
        if (!(null == n.props.onPressConfirmButtonForName)) n.props.onPressConfirmButtonForName();
      } else if (n.state.currentAction == E.Floor) {
        if (!(null == n.props.onPressConfirmButtonForFloor)) n.props.onPressConfirmButtonForFloor();
      } else if (n.state.currentAction == E.AddCarpet) {
        if (!(null == n.props.onPressConfirmButtonForAdd)) n.props.onPressConfirmButtonForAdd();
      } else if (n.state.currentAction == E.Ignore) {
        if (!(null == n.props.onPressConfirmButtonForIgnore)) n.props.onPressConfirmButtonForIgnore();
      } else if (n.state.currentAction == E.Custom) null == n.props.onPressConfirmButtonForCustom || n.props.onPressConfirmButtonForCustom();
    };

    n._onPressCancelButton = function () {
      if (n.state.currentAction == E.Merge) {
        if (!(null == n.props.onPressCancelButtonForMerge)) n.props.onPressCancelButtonForMerge();
      } else if (n.state.currentAction == E.Split) {
        if (!(null == n.props.onPressCancelButtonForSplit)) n.props.onPressCancelButtonForSplit();
      } else if (n.state.currentAction == E.Name) {
        if (!(null == n.props.onPressCancelButtonForName)) n.props.onPressCancelButtonForName();
      } else if (n.state.currentAction == E.Floor) {
        if (!(null == n.props.onPressCancelButtonForFloor)) n.props.onPressCancelButtonForFloor();
      } else if (n.state.currentAction == E.AddCarpet) {
        if (!(null == n.props.onPressCancelButtonForAdd)) n.props.onPressCancelButtonForAdd();
      } else if (n.state.currentAction == E.Ignore) {
        if (!(null == n.props.onPressCancelButtonForIgnore)) n.props.onPressCancelButtonForIgnore();
      } else if (n.state.currentAction == E.Custom) null == n.props.onPressCancelButtonForCustom || n.props.onPressCancelButtonForCustom();
      n.hideConfirmMenu();
    };

    n._onPressDeleteButton = function () {
      if (n.state.currentAction == E.AddCarpet) {
        if (!(null == n.props.onPressDeleteButtonForAdd)) n.props.onPressDeleteButtonForAdd();
      } else if (n.state.currentAction == E.Ignore) null == n.props.onPressDeleteButtonForIgnore || n.props.onPressDeleteButtonForIgnore();
    };

    n._onPressGuideButton = function () {
      if (n.props.onPressGuideButton) n.props.onPressGuideButton();
    };

    n.confirmMenuViewTop = new module12.Animated.Value(200);
    n.state = {
      currentAction: t.currentAction || '',
      tip: n.getTip(t.type),
      isButtonEnable: false,
      menuHeight: 200,
      showConfirmMid: false,
    };
    return n;
  }

  module5.default(k, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'componentDidMount',
      value: function () {
        this.setState({
          isButtonEnable: true,
        });
      },
    },
    {
      key: 'getTip',
      value: function (t) {
        return t == A.Menu_Fbz
          ? module491.fbz_cannot_cover_charger_tip
          : t == A.Menu_Mode
          ? module491.map_edit_custom_mode_tip
          : t == A.Menu_Order
          ? module491.map_edit_order_setting_tip
          : t == A.Menu_Carpet
          ? module491.map_edit_carpet_init_tip
          : '';
      },
    },
    {
      key: 'getMenu',
      value: function () {
        return this.props.type == A.Menu_Zone
          ? this.getZoneMenu()
          : this.props.type == A.Menu_Fbz
          ? this.getFbzMenu()
          : this.props.type == A.Menu_Carpet
          ? this.getCarpetMenu()
          : this.props.type == A.Menu_Rotate
          ? this.getRotateMenu()
          : this.props.type == A.Menu_Mode_Smart
          ? this.getModeMenu()
          : [];
      },
    },
    {
      key: 'getRotateMenu',
      value: function () {
        return [
          {
            title: module491.map_edit_rotate_left,
            image: globals.app.state.theme.mapEdit.rotateLeftImg,
            visible: true,
            onPress: function () {
              if (this.state.isButtonEnable && this.props.onPressRotateLeftButton) this.props.onPressRotateLeftButton();
            },
          },
          {
            title: module491.map_edit_rotate_right,
            image: globals.app.state.theme.mapEdit.rotateRightImg,
            visible: true,
            onPress: function () {
              if (this.state.isButtonEnable && this.props.onPressRotateRightButton) this.props.onPressRotateRightButton();
            },
          },
        ];
      },
    },
    {
      key: 'getCarpetMenu',
      value: function () {
        var t = new Array();
        if (this.props.subType & module377.CarpetEditMode.CarpetAdd)
          t.push({
            title: module491.map_edit_carpet_add_carpet,
            image: globals.app.state.theme.mapEdit.addCarpetImg,
            visible: true,
            onPress: function () {
              var t, n;

              if (this.state.isButtonEnable) {
                this.setState({
                  currentAction: E.AddCarpet,
                });
                if (!(null == (t = (n = this.props).onPressAddCarpetButton))) t.call(n);
              }
            },
          });
        if (this.props.subType & module377.CarpetEditMode.CarpetIgnore)
          t.push({
            title: module491.map_edit_carpet_ignore_carpet,
            image: globals.app.state.theme.mapEdit.ignoreCarpetImg,
            visible: true,
            onPress: function () {
              var t, n;

              if (this.state.isButtonEnable) {
                this.setState({
                  currentAction: E.Ignore,
                });
                if (!(null == (t = (n = this.props).onPressIgnoreCarpetButton))) t.call(n);
              }
            },
          });
        return t;
      },
    },
    {
      key: 'getModeMenu',
      value: function () {
        return [
          {
            title: module491.map_edit_mode_smart,
            image: globals.app.state.theme.mapEdit.smartMode,
            visible: true,
            onPress: function () {
              var t, n;
              this.setState({
                currentAction: E.None,
              });
              if (!(null == (t = (n = this.props).onPressSmartModeButton))) t.call(n);
            },
          },
          {
            title: module491.manual_edit_map,
            image: globals.app.state.theme.mapEdit.customMode,
            visible: true,
            onPress: function () {
              var t, n;
              this.setState({
                currentAction: E.Custom,
              });
              this.showConfirmMenu(module491.map_edit_custom_mode_tip);
              if (!(null == (t = (n = this.props).onPressCustomModeButton))) t.call(n);
            },
          },
          {
            title: module491.reset_clean_mode_button_title,
            image: globals.app.state.theme.mapEdit.cleanMode,
            visible: true,
            onPress: function () {
              var t, n;
              this.setState({
                currentAction: E.None,
              });
              if (!(null == (t = (n = this.props).onPressCleanModeButton))) t.call(n);
            },
          },
        ];
      },
    },
    {
      key: 'getZoneMenu',
      value: function () {
        return [
          {
            title: module491.map_edit_merge,
            image: globals.app.state.theme.mapEdit.mergeImg,
            visible: true,
            onPress: function () {
              if (this.hasSegmentMap()) {
                this.setState({
                  currentAction: E.Merge,
                });
                this.showConfirmMenu(module491.map_edit_merge_restriction);
                if (this.props.onPressMergeZoneButton) this.props.onPressMergeZoneButton();
              }
            },
          },
          {
            title: module491.map_edit_split,
            image: globals.app.state.theme.mapEdit.splitImg,
            visible: true,
            onPress: function () {
              if (this.hasSegmentMap()) {
                this.setState({
                  currentAction: E.Split,
                });
                this.showConfirmMenu(module491.map_edit_split_restriction);
                if (this.props.onPressSplitZoneButton) this.props.onPressSplitZoneButton();
              }
            },
          },
          {
            title: module491.map_edit_rename,
            image: globals.app.state.theme.mapEdit.editNameImg,
            visible: (module389.isMiApp || module386.default.isRoomNameSupported()) && !module387.default.isShareUser(),
            onPress: function () {
              if (this.hasSegmentMap()) {
                this.setState({
                  currentAction: E.Name,
                });
                if (this.props.onPressNameButton) this.props.onPressNameButton();
              }
            },
          },
          {
            title: module491.map_edit_floor,
            image: globals.app.state.theme.mapEdit.editFloorImg,
            visible: module386.default.isSupportFloorEdit(),
            onPress: function () {
              if (this.hasSegmentMap()) {
                this.setState({
                  currentAction: E.Floor,
                });
                if (this.props.onPressFloorButton) this.props.onPressFloorButton();
              }
            },
          },
        ];
      },
    },
    {
      key: 'getFbzMenu',
      value: function () {
        var t = {
            title: module491.map_edit_add_virtual_wall,
            image: globals.app.state.theme.mapEdit.virtualWallImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.state.isButtonEnable) null == (t = (n = this.props).onPressAddVirtualWallButton) || t.call(n);
            },
          },
          n = module386.default.isMopForbiddenSupported(),
          o = {
            title: n ? module491.map_edit_clean_mop_forbidden : module491.map_edit_add_forbidden_zone,
            image: globals.app.state.theme.mapEdit.fbzImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.state.isButtonEnable) null == (t = (n = this.props).onPressAddZoneButton) || t.call(n);
            },
          },
          s = {
            title: module491.map_edit_add_clean_fbz_garnet,
            image: globals.app.state.theme.mapEdit.cleanImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.state.isButtonEnable) null == (t = (n = this.props).onPressAddCleaningFBZoneButton) || t.call(n);
            },
          },
          u = {
            title: (module415.DMM.isGarnet, module491.map_edit_add_mop_fbz),
            image: globals.app.state.theme.mapEdit.mopImg,
            visible: module386.default.isCustomModeSupported() || module386.default.isMopForbiddenSupported(),
            onPress: function () {
              var t, n;
              if (this.state.isButtonEnable) null == (t = (n = this.props).onPressAddMoppingFBZoneButton) || t.call(n);
            },
          },
          p = new Array();
        p.push(t);
        p.push(o);
        if (n) p.push(u);
        if (module415.DMM.isGarnet) p.push(s);
        return p;
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          o = this.context.theme,
          s = this.getMenu(),
          u = (module12.Dimensions.get('window').width - this.getBottomMarignByModelAndMenu()) / this.getItemVisibleSize(),
          p = {
            merge: module491.map_edit_merge,
            split: module491.map_edit_split,
            custom: '',
            order: module491.map_edit_order_setting,
            name: module491.map_edit_rename,
            floor: module491.map_edit_floor,
          }[this.state.currentAction],
          l =
            !(
              module377.RSM.mapStatus == module377.MapStatus.None ||
              (this.props.type == A.Menu_Zone && (module377.RSM.mapStatus == module377.MapStatus.Has_WithoutSegments || module377.RSM.isRunning))
            ) && this.state.isButtonEnable,
          M = s.map(function (s, p) {
            return s.visible
              ? React.default.createElement(
                  module12.View,
                  {
                    key: p,
                    style: {
                      width: u,
                    },
                  },
                  React.default.createElement(
                    module381.TopImageButton,
                    module21.default(
                      {
                        funcId: 'map_edit_menu_item_' + p,
                        style: [module387.default.isIphoneX() ? F.button : F.buttonSmall],
                        enabled: l,
                        imageStyle: {},
                        key: p,
                      },
                      s,
                      {
                        imageWidth: 56,
                        imageHeight: 56,
                        fontSize: 12,
                        textTop: 10,
                        selectedTextColor: o.mapEdit.selectedTextColor,
                        numberOfLines: 2,
                        textColor: '#9B9B9B',
                        disabledColor: o.mapEdit.disabledItemTextColor,
                        onPress: t._onPressButton.bind(t, s.onPress),
                      }
                    )
                  )
                )
              : null;
          }),
          B =
            this.props.type == A.Menu_Carpet
              ? this.state.showConfirmMid
                ? React.default.createElement(module381.PureImageButton, {
                    funcId: 'map_edit_menu_delete',
                    image: o.mapEdit.confirmMenuDeleteImg,
                    imageWidth: 24,
                    imageHeight: 26,
                    onPress: this._onPressDeleteButton,
                  })
                : null
              : React.default.createElement(
                  module12.Text,
                  {
                    style: {
                      fontSize: 16,
                      color: o.mapEdit.itemTextColor,
                    },
                  },
                  p
                ),
          P = this.props.hasConfirmMenu
            ? React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    F.confirmMenuWrap,
                    {
                      top: this.confirmMenuViewTop,
                      backgroundColor: o.mapEdit.menuBackgroundColor,
                      height: this.state.menuHeight,
                    },
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: F.confirmMenu,
                  },
                  React.default.createElement(module381.PureImageButton, {
                    funcId: 'map_edit_menu_close',
                    style: F.closeButton,
                    image: o.mapEdit.confirmMenuCloseImg,
                    imageWidth: 24,
                    imageHeight: 24,
                    onPress: this._onPressCancelButton,
                  }),
                  B,
                  React.default.createElement(module381.PureImageButton, {
                    funcId: 'map_edit_menu_confirm',
                    style: F.confirmButton,
                    image: o.mapEdit.confirmMenuConfirmImg,
                    imageWidth: 24,
                    imageHeight: 24,
                    imageStyle: {
                      resizeMode: 'contain',
                    },
                    enabled: this.props.confirmMenuConfirmButtonEnabled,
                    onPress: this._onPressConfirmButton,
                  })
                )
              )
            : React.default.createElement(module12.View, null),
          y = this.hasMenu();
        return React.default.createElement(
          module12.View,
          {
            style: F.containter,
          },
          React.default.createElement(
            module12.View,
            {
              style: [
                F.top,
                {
                  bottom: y ? this.state.menuHeight + 20 : 60,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: F.tipWrapper,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    y ? F.tip : F.tipAbsolute,
                    {
                      color: o.mapEdit.itemTextColor,
                    },
                  ],
                },
                this.state.tip
              ),
              !y &&
                React.default.createElement(module381.PureImageButton, {
                  funcId: 'map_edit_menu_guide',
                  style: {
                    marginLeft: 3,
                  },
                  image: o.mapEdit.guideImg,
                  imageWidth: 20,
                  imageHeight: 20,
                  imageStyle: {
                    resizeMode: 'contain',
                  },
                  enabled: this.props.confirmMenuConfirmButtonEnabled,
                  onPress: this._onPressGuideButton,
                })
            )
          ),
          y &&
            React.default.createElement(
              module12.View,
              {
                style: [
                  F.bottom,
                  {
                    backgroundColor: o.mapEdit.menuBackgroundColor,
                  },
                ],
                onLayout: function (n) {
                  t._onLayoutMenuView(n);
                },
              },
              React.default.createElement(
                module12.View,
                {
                  style: [F.mainMenuItemsView],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      F.menuListView,
                      {
                        width: module12.Dimensions.get('window').width - this.getBottomMarignByModelAndMenu(),
                      },
                    ],
                  },
                  M
                )
              )
            ),
          P
        );
      },
    },
    {
      key: '_onLayoutMenuView',
      value: function (t) {
        this.setState({
          menuHeight: t.nativeEvent.layout.height,
        });
      },
    },
    {
      key: '_onPressButton',
      value: function (t) {
        var n = this;

        if (module377.RSM.mapStatus != module377.MapStatus.None) {
          if (this.props.type == A.Menu_Zone) {
            if (module377.RSM.mapStatus == module377.MapStatus.Has_WithoutSegments) return;
            if (module377.RSM.isRunning)
              return void module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                if (n.props.editMapSegmentsIsDisable) n.props.editMapSegmentsIsDisable(module491.robot_communication_exception);
              });
            if (module377.RSM.mapStatus != module377.MapStatus.Has_WithSegments) return void (this.props.editMapSegmentsIsDisable && this.props.editMapSegmentsIsDisable());
          }

          if (t) t.call(this);
        }
      },
    },
    {
      key: 'showConfirmMenu',
      value: function (t) {
        if (this.props.hasConfirmMenu)
          module12.Animated.timing(this.confirmMenuViewTop, {
            toValue: 0,
            duration: 500,
          }).start();
        if (t)
          this.setState({
            tip: t,
          });
      },
    },
    {
      key: 'hideConfirmMenu',
      value: function () {
        if (this.props.hasConfirmMenu)
          module12.Animated.timing(this.confirmMenuViewTop, {
            toValue: this.state.menuHeight,
            duration: 500,
          }).start();
        var t = this.props.type == A.Menu_Carpet ? module491.map_edit_carpet_init_tip : '';
        this.setState({
          tip: t,
        });
      },
    },
    {
      key: 'showCarpetConfirmMenu',
      value: function (t, n) {
        this.setState({
          currentAction: t,
          showConfirmMid: n,
        });
        var o = '';
        o =
          t == E.Ignore
            ? n
              ? module491.map_edit_carpet_ignore_edit_tip
              : module491.map_edit_carpet_ignore_tip
            : n
            ? module491.map_edit_carpet_add_edit_tip
            : module491.map_edit_carpet_add_tip;
        this.showConfirmMenu(o);
      },
    },
    {
      key: 'showModeSetMenu',
      value: function () {
        this.setState({
          currentAction: E.Custom,
        });
        this.showConfirmMenu(module491.map_edit_custom_mode_tip);
      },
    },
    {
      key: 'getBottomMarignByModelAndMenu',
      value: function () {
        var t = this.getItemVisibleSize();
        return 2 == t ? 100 : 3 == t ? 80 : 4 == t ? 40 : 0;
      },
    },
    {
      key: 'getItemVisibleSize',
      value: function () {
        var t = 0;
        this.getMenu().forEach(function (n) {
          t += n.visible ? 1 : 0;
        });
        return t;
      },
    },
    {
      key: 'hasMenu',
      value: function () {
        return this.props.type != A.Menu_Order && this.props.type != A.Menu_Mode;
      },
    },
    {
      key: 'hasSegmentMap',
      value: function () {
        return module377.RSM.mapStatus == module377.MapStatus.Has_WithSegments;
      },
    },
  ]);
  return k;
})(React.Component);

exports.default = I;
I.contextType = module506.AppConfigContext;
I.defaultProps = {
  type: A.Menu_Zone,
  hasConfirmMenu: false,
  confirmMenuConfirmButtonEnabled: true,
};
var F = module12.StyleSheet.create({
  containter: {
    justifyContent: 'flex-end',
  },
  confirmMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: module387.default.isIphoneX() ? 10 : 0,
  },
  top: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    width: module12.Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tipWrapper: {
    width: module12.Dimensions.get('window').width,
    top: -20,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tip: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
  },
  tipAbsolute: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: module12.Dimensions.get('window').width - 40,
  },
  closeButton: {
    marginLeft: 20,
  },
  confirmButton: {
    marginRight: 20,
  },
  button: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSmall: {
    backgroundColor: 'transparent',
  },
  bottom: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainMenuItemsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 27,
    marginBottom: 34,
  },
  menuListView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  confirmMenuWrap: {
    position: 'absolute',
    left: 0,
    alignSelf: 'stretch',
    justifyContent: 'center',
    width: module12.Dimensions.get('window').width,
    height: 100,
    backgroundColor: 'transparent',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

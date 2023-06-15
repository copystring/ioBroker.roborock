var module50 = require('./50'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module391 = require('./391'),
  module390 = require('./390'),
  module381 = require('./381'),
  module1121 = require('./1121'),
  module423 = require('./423'),
  module1122 = require('./1122');

function B(t, n) {
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

function w(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      B(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      B(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

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

var module505 = require('./505').strings,
  module393 = require('./393'),
  A = {
    Menu_Fbz: 'menu_forbidden',
    Menu_Zone: 'menu_zone',
    Menu_Mode: 'menu_mode',
    Menu_Mode_Smart: 'menu_mode_smart',
    Menu_Order: 'menu_order',
    Menu_Order_Smart: 'menu_order_smart',
    Menu_Carpet: 'menu_carpet',
    Menu_Rotate: 'menu_rotate',
    Menu_Floor: 'Menu_Floor',
    Menu_Ground: 'Menu_Ground',
    Menu_DoorSill: 'Menu_DoorSill',
  };

exports.MenuType = A;
var E = {
  None: 'none',
  Merge: 'merge',
  Split: 'split',
  Name: 'name',
  Floor: 'floor',
  Furniture: 'furniture',
  Custom: 'custom',
  Order: 'order',
  AddCarpet: 'addCarpet',
  Ignore: 'ignoreCarpet',
};
exports.EditAction = E;

var O = (function (t) {
  module7.default(B, t);

  var n = B,
    module50 = T(),
    C = function () {
      var t,
        s = module11.default(n);

      if (module50) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(s, arguments, u);
      } else t = s.apply(this, arguments);

      return module9.default(this, t);
    };

  function B(t) {
    var n;
    module4.default(this, B);

    (n = C.call(this, t))._onLayoutMenuView = function (t) {
      n.setState({
        menuHeight: t.nativeEvent.layout.height,
      });
    };

    n._onLayoutSmartModeBtn = function (t) {
      var o = t.nativeEvent.layout.x + t.nativeEvent.layout.width / 2;
      n.setState({
        smartGuideLeft: o + 40 - 45,
      });
    };

    n._onPressConfirmButton = function () {
      if (n.state.currentAction == E.Merge) {
        if (!(null == n.props.onPressConfirmButtonForMerge)) n.props.onPressConfirmButtonForMerge();
      } else if (n.state.currentAction == E.Split) {
        if (!(null == n.props.onPressConfirmButtonForSplit)) n.props.onPressConfirmButtonForSplit();
      } else if (n.state.currentAction == E.Name) {
        if (!(null == n.props.onPressConfirmButtonForName)) n.props.onPressConfirmButtonForName();
      } else if (n.state.currentAction == E.Custom) {
        if (!(null == n.props.onPressConfirmButtonForCustom)) n.props.onPressConfirmButtonForCustom();
      } else if (n.state.currentAction == E.Order) {
        if (!(null == n.props.onPressConfirmButtonForOrder)) n.props.onPressConfirmButtonForOrder();
        n.hideConfirmMenu();
      }
    };

    n._onPressCancelButton = function () {
      if (n.state.currentAction == E.Merge) {
        if (!(null == n.props.onPressCancelButtonForMerge)) n.props.onPressCancelButtonForMerge();
      } else if (n.state.currentAction == E.Split) {
        if (!(null == n.props.onPressCancelButtonForSplit)) n.props.onPressCancelButtonForSplit();
      } else if (n.state.currentAction == E.Name) {
        if (!(null == n.props.onPressCancelButtonForName)) n.props.onPressCancelButtonForName();
      } else if (n.state.currentAction == E.Custom) {
        if (!(null == n.props.onPressCancelButtonForCustom)) n.props.onPressCancelButtonForCustom();
      } else if (n.state.currentAction == E.Order) null == n.props.onPressCancelButtonForOrder || n.props.onPressCancelButtonForOrder();
      n.hideConfirmMenu();
    };

    n._onPressGuideButton = function () {
      if (!(null == n.props.onPressGuideButton)) n.props.onPressGuideButton();
    };

    n.confirmMenuViewTop = new module12.Animated.Value(200);
    n.state = {
      currentAction: t.currentAction || '',
      tip: n.getTip(t.type),
      isButtonEnable: false,
      menuHeight: 200,
      showSmartCustomModeGuide: false,
      smartGuideText: '',
      smartGuideLeft: 46,
    };
    return n;
  }

  module5.default(B, [
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
      key: 'componentDidUpdate',
      value: function (t, n) {
        var o, s;
        if (n.showSmartCustomModeGuide) {
          if (!(null == (o = this.refButton))) o.startOpacityAnim();
        } else if (!(null == (s = this.refButton))) s.endOpacityAnim();
      },
    },
    {
      key: 'getTip',
      value: function (t) {
        return t == A.Menu_Fbz
          ? module505.fbz_cannot_cover_charger_tip
          : t == A.Menu_Mode
          ? module505.map_edit_custom_mode_tip
          : t == A.Menu_Order
          ? module505.map_edit_order_setting_tip
          : t == A.Menu_Carpet
          ? module505.map_edit_carpet_init_tip
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
          : this.props.type == A.Menu_Order_Smart
          ? this.getOrderMenu()
          : this.props.type == A.Menu_Floor
          ? this.getFloorMenu()
          : this.props.type == A.Menu_Ground
          ? this.getGroundMenu()
          : this.props.type == A.Menu_DoorSill
          ? this.getDoorSillMenu()
          : [];
      },
    },
    {
      key: 'getRotateMenu',
      value: function () {
        return [
          {
            title: module505.map_edit_rotate_left,
            image: this.menuTheme.rotateLeftImg,
            visible: true,
            onPress: function () {
              if (this.state.isButtonEnable && this.props.onPressRotateLeftButton) this.props.onPressRotateLeftButton();
            },
          },
          {
            title: module505.map_edit_rotate_right,
            image: this.menuTheme.rotateRightImg,
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
        if (this.props.subType & module381.CarpetEditMode.CarpetAdd)
          t.push({
            title: module505.map_edit_carpet_add_carpet,
            image: this.menuTheme.addCarpetImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.state.isButtonEnable) null == (t = (n = this.props).onPressAddCarpetButton) || t.call(n);
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
            title: module505.map_edit_mode_smart,
            image: this.menuTheme.smartMode,
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
            title: module505.manual_edit_map,
            image: this.menuTheme.customMode,
            visible: true,
            onPress: function () {
              var t, n;
              this.setState({
                currentAction: E.Custom,
              });
              this.showConfirmMenu(module505.map_edit_custom_mode_tip);
              if (!(null == (t = (n = this.props).onPressCustomModeButton))) t.call(n);
            },
          },
          {
            title: module505.reset_clean_mode_button_title,
            image: this.menuTheme.cleanMode,
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
      key: 'getOrderMenu',
      value: function () {
        return [
          {
            title: module505.map_edit_mode_smart,
            image: this.menuTheme.smartMode,
            visible: true,
            onPress: function () {
              var t, n;
              this.setState({
                currentAction: E.None,
              });
              if (!(null == (t = (n = this.props).onPressSmartOrderButton))) t.call(n);
            },
          },
          {
            title: module505.manual_edit_map,
            image: this.menuTheme.customMode,
            visible: true,
            onPress: function () {
              this.setState({
                currentAction: E.Order,
              });
              this.showConfirmMenu(module505.map_edit_order_setting_tip);
            },
          },
          {
            title: module505.reset_order_button_title,
            image: this.menuTheme.cleanMode,
            visible: true,
            onPress: function () {
              var t, n;
              this.setState({
                currentAction: E.None,
              });
              if (!(null == (t = (n = this.props).onPressCleanOrderButton))) t.call(n);
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
            title: module505.map_edit_merge,
            image: this.menuTheme.mergeImg,
            visible: true,
            onPress: function () {
              if (this.hasSegmentMap()) {
                this.setState({
                  currentAction: E.Merge,
                });
                this.showConfirmMenu(module505.map_edit_merge_restriction);
                if (this.props.onPressMergeZoneButton) this.props.onPressMergeZoneButton();
              }
            },
          },
          {
            title: module505.map_edit_split,
            image: this.menuTheme.splitImg,
            visible: true,
            onPress: function () {
              if (this.hasSegmentMap()) {
                this.setState({
                  currentAction: E.Split,
                });
                this.showConfirmMenu(module505.map_edit_split_restriction);
                if (this.props.onPressSplitZoneButton) this.props.onPressSplitZoneButton();
              }
            },
          },
          {
            title: module505.map_edit_rename,
            image: this.menuTheme.editNameImg,
            visible: (module393.isMiApp || module390.default.isRoomNameSupported()) && !module391.default.isShareUser(),
            onPress: function () {
              if (this.hasSegmentMap()) {
                this.setState({
                  currentAction: E.Name,
                });
                if (this.props.onPressNameButton) this.props.onPressNameButton();
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
            title: module505.map_edit_add_virtual_wall,
            image: this.menuTheme.virtualWallImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.state.isButtonEnable) null == (t = (n = this.props).onPressAddVirtualWallButton) || t.call(n);
            },
          },
          n = module390.default.isMopForbiddenSupported(),
          o = {
            title: n ? module505.map_edit_clean_mop_forbidden : module505.map_edit_add_forbidden_zone,
            image: this.menuTheme.fbzImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.state.isButtonEnable) null == (t = (n = this.props).onPressAddZoneButton) || t.call(n);
            },
          },
          s = {
            title: module505.map_edit_add_clean_fbz_garnet,
            image: this.menuTheme.cleanImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.state.isButtonEnable) null == (t = (n = this.props).onPressAddCleaningFBZoneButton) || t.call(n);
            },
          },
          u = {
            title: (module423.DMM.isGarnet, module505.map_edit_add_mop_fbz),
            image: this.menuTheme.mopImg,
            visible: n,
            onPress: function () {
              var t, n;
              if (this.state.isButtonEnable) null == (t = (n = this.props).onPressAddMoppingFBZoneButton) || t.call(n);
            },
          },
          l = new Array();
        l.push(t);
        l.push(o);
        if (n) l.push(u);
        if (module423.DMM.isGarnet) l.push(s);
        return l;
      },
    },
    {
      key: 'getFloorMenu',
      value: function () {
        return [
          {
            title: module505.map_edit_floor_tile,
            image: this.theme.furnitureEdit.tileFloorImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.hasSegmentMap()) null == (t = (n = this.props).onPressTileFloorButton) || t.call(n);
            },
          },
          {
            title: module505.map_edit_floor_wood,
            image: this.theme.furnitureEdit.woodFurntImg,
            imageStyle: {
              transform: [
                {
                  rotateZ: '-45deg',
                },
              ],
            },
            visible: !module390.default.isSupportFloorDirection(),
            onPress: function () {
              var t, n;
              if (this.hasSegmentMap()) null == (t = (n = this.props).onPressWoodFloorButton) || t.call(n);
            },
          },
          {
            title: module505.map_edit_floor_wood_width,
            image: this.theme.furnitureEdit.woodFurntImg,
            visible: !!module390.default.isSupportFloorDirection(),
            onPress: function () {
              var t, n;
              if (this.hasSegmentMap()) null == (t = (n = this.props).onPressWoodFloorButton) || t.call(n, true);
            },
          },
          {
            title: module505.map_edit_floor_wood_longti,
            image: this.theme.furnitureEdit.woodFurntImg,
            imageStyle: {
              transform: [
                {
                  rotateZ: '-90deg',
                },
              ],
            },
            visible: !!module390.default.isSupportFloorDirection(),
            onPress: function () {
              var t, n;
              if (this.hasSegmentMap()) null == (t = (n = this.props).onPressWoodFloorButton) || t.call(n, false);
            },
          },
          {
            title: module505.map_edit_floor_other,
            image: this.theme.furnitureEdit.otherFloorImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.hasSegmentMap()) null == (t = (n = this.props).onPressOtherFloorButton) || t.call(n);
            },
          },
        ];
      },
    },
    {
      key: 'getGroundMenu',
      value: function () {
        return [
          {
            title: module505.map_edit_floor_wood_tile,
            image: this.theme.furnitureEdit.editFloorImg,
            visible: module390.default.isSupportFloorEdit(),
            onPress: function () {
              var t, n;
              if (!(null == (t = (n = this.props).onPressFloorEditButton))) t.call(n);
            },
          },
          {
            title: module505.map_edit_carpet_ignore_title,
            image: this.menuTheme.addCarpetImg,
            visible: module390.default.isCarpetSupported(),
            onPress: function () {
              var t, n;
              if (!(null == (t = (n = this.props).onPressCarpetEditButton))) t.call(n);
            },
          },
          {
            title: module505.map_edit_door_sill_title,
            image: this.menuTheme.doorSillImg,
            visible: module390.default.isSupportCustomDoorSill(),
            onPress: function () {
              var t, n;
              if (!(null == (t = (n = this.props).onPressDoorSillEditButton))) t.call(n);
            },
          },
        ];
      },
    },
    {
      key: 'getDoorSillMenu',
      value: function () {
        return [
          {
            title: module505.map_edit_door_sill_slide,
            image: this.menuTheme.slideImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (!(null == (t = (n = this.props).onPressAddSlideSillButton))) t.call(n);
            },
          },
          {
            title: module505.map_edit_door_sill_stone,
            image: this.menuTheme.stoneImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (!(null == (t = (n = this.props).onPressAddStoneSillButton))) t.call(n);
            },
          },
          {
            title: module505.localization_strings_Setting_Timer_Common_4,
            image: this.menuTheme.otherImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (!(null == (t = (n = this.props).onPressAddOtherSillButton))) t.call(n);
            },
          },
        ];
      },
    },
    {
      key: 'getSmartCustomModeGuideView',
      value: function () {
        return this.state.smartGuideText.length <= 0
          ? null
          : React.default.createElement(
              module12.ImageBackground,
              {
                style: [
                  k.smartGuidBg,
                  {
                    left: this.state.smartGuideLeft,
                    bottom: this.state.menuHeight - 27,
                  },
                ],
                source: this.menuTheme.smartModeGuideImg,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    k.smartGuidText,
                    {
                      color: this.menuTheme.guideTextColor,
                    },
                  ],
                  numberOfLines: 3,
                },
                this.state.smartGuideText
              )
            );
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = module12.Dimensions.get('window').width,
          o = this.getMenu(),
          u = (n - this.getBottomMarignByModelAndMenu()) / this.getItemVisibleSize(),
          l = {
            merge: module505.map_edit_merge,
            split: module505.map_edit_split,
            custom: '',
            order: module505.map_edit_order_setting,
            name: module505.map_edit_rename,
            floor: '',
          }[this.state.currentAction],
          p = this.props.type == A.Menu_Zone || this.props.type == A.Menu_Order_Smart || this.props.type == A.Menu_Floor,
          h = p || this.props.type == A.Menu_Mode_Smart;
        if (!module390.default.isSupportCustomModeInCleaning()) p = p || this.props.type == A.Menu_Mode_Smart;
        var c =
            !(module381.RSM.mapStatus == module381.MapStatus.None || (h && module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments) || (p && module381.RSM.isRunning)) &&
            this.state.isButtonEnable,
          C = o.map(function (n, o) {
            var l = (t.props.type == A.Menu_Mode_Smart || t.props.type == A.Menu_Order_Smart) && 0 == o,
              p = t.props.type == A.Menu_Floor ? 'white' : '#9B9B9B';
            return n.visible
              ? React.default.createElement(
                  module12.View,
                  {
                    key: o,
                    style: {
                      width: u,
                    },
                  },
                  React.default.createElement(
                    module385.TopImageButton,
                    module22.default(
                      {
                        funcId: 'map_edit_menu_item_' + o,
                        style: [module391.default.isIphoneX() ? k.button : k.buttonSmall],
                        enabled: c,
                        key: o,
                      },
                      n,
                      {
                        imageWidth: 56,
                        imageHeight: 56,
                        fontSize: 12,
                        textTop: 10,
                        selectedTextColor: t.menuTheme.selectedTextColor,
                        numberOfLines: 2,
                        textColor: p,
                        disabledColor: t.menuTheme.disabledItemTextColor,
                        onPress: t._onPressButton.bind(t, n.onPress),
                        ref: function (n) {
                          if (l) t.refButton = n;
                        },
                        onLayout: l ? t._onLayoutSmartModeBtn : null,
                      }
                    )
                  )
                )
              : null;
          }),
          b = React.default.createElement(
            module12.Text,
            {
              style: {
                fontSize: 16,
                color: this.menuTheme.itemTextColor,
              },
            },
            l
          ),
          P = {
            top: this.confirmMenuViewTop,
            backgroundColor: this.menuTheme.menuBackgroundColor,
            height: this.state.menuHeight,
            width: n,
          },
          B = this.props.hasConfirmMenu
            ? React.default.createElement(
                module12.Animated.View,
                {
                  style: [k.confirmMenuWrap, P],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: k.confirmMenu,
                  },
                  React.default.createElement(module385.PureImageButton, {
                    funcId: 'map_edit_menu_close',
                    style: k.closeButton,
                    image: this.menuTheme.confirmMenuCloseImg,
                    imageWidth: 24,
                    imageHeight: 24,
                    onPress: this._onPressCancelButton,
                  }),
                  b,
                  React.default.createElement(module385.PureImageButton, {
                    funcId: 'map_edit_menu_confirm',
                    style: k.confirmButton,
                    image: this.menuTheme.confirmMenuConfirmImg,
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
          T =
            this.props.type == A.Menu_Floor
              ? w(
                  w({}, k.floorMenu),
                  {},
                  {
                    backgroundColor: this.theme.furnitureEdit.editPanelBackgroud,
                  }
                )
              : {
                  backgroundColor: this.menuTheme.menuBackgroundColor,
                },
          I = this.hasMenu() && C.length > 0,
          E = I ? this.state.menuHeight : 60;
        return React.default.createElement(
          module12.View,
          {
            style: [
              k.containter,
              {
                width: n,
              },
            ],
          },
          React.default.createElement(
            module12.View,
            {
              style: [
                k.top,
                {
                  bottom: E + 20,
                  width: n,
                },
              ],
              pointerEvents: I ? 'none' : 'auto',
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  k.tip,
                  {
                    color: this.menuTheme.itemTextColor,
                  },
                ],
              },
              this.state.tip
            ),
            !I &&
              this.props.onPressGuideButton &&
              React.default.createElement(module385.PureImageButton, {
                funcId: 'map_edit_menu_guide',
                style: {
                  marginLeft: 3,
                },
                image: this.menuTheme.guideImg,
                imageWidth: 20,
                imageHeight: 20,
                imageStyle: {
                  resizeMode: 'contain',
                },
                enabled: this.props.confirmMenuConfirmButtonEnabled,
                onPress: this._onPressGuideButton,
              })
          ),
          I &&
            React.default.createElement(
              module12.View,
              {
                style: [k.bottom, T],
                onLayout: this._onLayoutMenuView,
              },
              React.default.createElement(
                module12.View,
                {
                  style: [k.mainMenuItemsView],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      k.menuListView,
                      {
                        width: n - this.getBottomMarignByModelAndMenu(),
                      },
                    ],
                  },
                  C
                )
              )
            ),
          B,
          this.state.showSmartCustomModeGuide && this.getSmartCustomModeGuideView()
        );
      },
    },
    {
      key: '_onPressButton',
      value: function (t) {
        var n = this;

        if (module381.RSM.mapStatus != module381.MapStatus.None) {
          if (this.props.type == A.Menu_Zone) {
            if (module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments) return;
            if (module381.RSM.isRunning)
              return void module1122.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                if (n.props.editMapSegmentsIsDisable) n.props.editMapSegmentsIsDisable(module505.robot_communication_exception);
              });
            if (module381.RSM.mapStatus != module381.MapStatus.Has_WithSegments) return void (this.props.editMapSegmentsIsDisable && this.props.editMapSegmentsIsDisable());
          }

          if (this.state.showSmartCustomModeGuide) this.hideSmartCustomGuide();
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
        this.setState({
          tip: '',
        });
      },
    },
    {
      key: 'showModeSetMenu',
      value: function () {
        this.setState({
          currentAction: E.Custom,
        });
        this.showConfirmMenu(module505.map_edit_custom_mode_tip);
      },
    },
    {
      key: 'showOrderSetMenu',
      value: function () {
        this.setState({
          currentAction: E.Order,
        });
        this.showConfirmMenu(module505.map_edit_order_setting_tip);
      },
    },
    {
      key: 'showSmartCustomGuide',
      value: function (t) {
        this.setState({
          showSmartCustomModeGuide: true,
          smartGuideText: t,
        });
      },
    },
    {
      key: 'hideSmartCustomGuide',
      value: function () {
        this.setState({
          showSmartCustomModeGuide: false,
          smartGuideText: '',
        });
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
        return module381.RSM.mapStatus == module381.MapStatus.Has_WithSegments;
      },
    },
    {
      key: 'theme',
      get: function () {
        return this.context.theme;
      },
    },
    {
      key: 'menuTheme',
      get: function () {
        return this.context.theme.mapEdit;
      },
    },
  ]);
  return B;
})(React.Component);

exports.default = O;
O.contextType = module1121.AppConfigContext;
O.defaultProps = {
  type: A.Menu_Zone,
  hasConfirmMenu: false,
  confirmMenuConfirmButtonEnabled: true,
};
var k = module12.StyleSheet.create({
  containter: {
    justifyContent: 'flex-end',
  },
  confirmMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: module391.default.isIphoneX() ? 10 : 0,
  },
  top: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tip: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    textAlign: 'center',
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
    height: 100,
    backgroundColor: 'transparent',
    paddingLeft: 20,
    paddingRight: 20,
  },
  smartGuidBg: {
    position: 'absolute',
    height: 105,
    width: 284,
    alignItems: 'center',
  },
  smartGuidText: {
    top: 16,
    height: 66,
    width: 250,
    fontSize: 12,
    textAlign: globals.isRTL ? 'right' : 'left',
    lineHeight: 20,
  },
  floorMenu: {
    borderRadius: 14,
    bottom: 20,
    marginHorizontal: 12,
  },
});

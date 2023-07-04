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
  module515 = require('./515'),
  module422 = require('./422'),
  module1391 = require('./1391');

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

function w(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      P(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      P(Object(s)).forEach(function (n) {
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

var module500 = require('./500').strings,
  module393 = require('./393'),
  E = {
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
  };

exports.MenuType = E;
var F = {
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
exports.EditAction = F;

var O = (function (t) {
  module7.default(P, t);

  var n = P,
    module50 = T(),
    b = function () {
      var t,
        s = module11.default(n);

      if (module50) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(s, arguments, u);
      } else t = s.apply(this, arguments);

      return module9.default(this, t);
    };

  function P(t) {
    var n;
    module4.default(this, P);

    (n = b.call(this, t))._onLayoutMenuView = function (t) {
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
      if (n.state.currentAction == F.Merge) {
        if (!(null == n.props.onPressConfirmButtonForMerge)) n.props.onPressConfirmButtonForMerge();
      } else if (n.state.currentAction == F.Split) {
        if (!(null == n.props.onPressConfirmButtonForSplit)) n.props.onPressConfirmButtonForSplit();
      } else if (n.state.currentAction == F.Name) {
        if (!(null == n.props.onPressConfirmButtonForName)) n.props.onPressConfirmButtonForName();
      } else if (n.state.currentAction == F.Custom) {
        if (!(null == n.props.onPressConfirmButtonForCustom)) n.props.onPressConfirmButtonForCustom();
      } else if (n.state.currentAction == F.Order) {
        if (!(null == n.props.onPressConfirmButtonForOrder)) n.props.onPressConfirmButtonForOrder();
        n.hideConfirmMenu();
      }
    };

    n._onPressCancelButton = function () {
      if (n.state.currentAction == F.Merge) {
        if (!(null == n.props.onPressCancelButtonForMerge)) n.props.onPressCancelButtonForMerge();
      } else if (n.state.currentAction == F.Split) {
        if (!(null == n.props.onPressCancelButtonForSplit)) n.props.onPressCancelButtonForSplit();
      } else if (n.state.currentAction == F.Name) {
        if (!(null == n.props.onPressCancelButtonForName)) n.props.onPressCancelButtonForName();
      } else if (n.state.currentAction == F.Custom) {
        if (!(null == n.props.onPressCancelButtonForCustom)) n.props.onPressCancelButtonForCustom();
      } else if (n.state.currentAction == F.Order) null == n.props.onPressCancelButtonForOrder || n.props.onPressCancelButtonForOrder();
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

  module5.default(P, [
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
        return t == E.Menu_Fbz
          ? module500.fbz_cannot_cover_charger_tip
          : t == E.Menu_Mode
          ? module500.map_edit_custom_mode_tip
          : t == E.Menu_Order
          ? module500.map_edit_order_setting_tip
          : t == E.Menu_Carpet
          ? module500.map_edit_carpet_init_tip
          : '';
      },
    },
    {
      key: 'getMenu',
      value: function () {
        return this.props.type == E.Menu_Zone
          ? this.getZoneMenu()
          : this.props.type == E.Menu_Fbz
          ? this.getFbzMenu()
          : this.props.type == E.Menu_Carpet
          ? this.getCarpetMenu()
          : this.props.type == E.Menu_Rotate
          ? this.getRotateMenu()
          : this.props.type == E.Menu_Mode_Smart
          ? this.getModeMenu()
          : this.props.type == E.Menu_Order_Smart
          ? this.getOrderMenu()
          : this.props.type == E.Menu_Floor
          ? this.getFloorMenu()
          : this.props.type == E.Menu_Ground
          ? this.getGroundMenu()
          : [];
      },
    },
    {
      key: 'getRotateMenu',
      value: function () {
        return [
          {
            title: module500.map_edit_rotate_left,
            image: this.menuTheme.rotateLeftImg,
            visible: true,
            onPress: function () {
              if (this.state.isButtonEnable && this.props.onPressRotateLeftButton) this.props.onPressRotateLeftButton();
            },
          },
          {
            title: module500.map_edit_rotate_right,
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
            title: module500.map_edit_carpet_add_carpet,
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
            title: module500.map_edit_mode_smart,
            image: this.menuTheme.smartMode,
            visible: true,
            onPress: function () {
              var t, n;
              this.setState({
                currentAction: F.None,
              });
              if (!(null == (t = (n = this.props).onPressSmartModeButton))) t.call(n);
            },
          },
          {
            title: module500.manual_edit_map,
            image: this.menuTheme.customMode,
            visible: true,
            onPress: function () {
              var t, n;
              this.setState({
                currentAction: F.Custom,
              });
              this.showConfirmMenu(module500.map_edit_custom_mode_tip);
              if (!(null == (t = (n = this.props).onPressCustomModeButton))) t.call(n);
            },
          },
          {
            title: module500.reset_clean_mode_button_title,
            image: this.menuTheme.cleanMode,
            visible: true,
            onPress: function () {
              var t, n;
              this.setState({
                currentAction: F.None,
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
            title: module500.map_edit_mode_smart,
            image: this.menuTheme.smartMode,
            visible: true,
            onPress: function () {
              var t, n;
              this.setState({
                currentAction: F.None,
              });
              if (!(null == (t = (n = this.props).onPressSmartOrderButton))) t.call(n);
            },
          },
          {
            title: module500.manual_edit_map,
            image: this.menuTheme.customMode,
            visible: true,
            onPress: function () {
              this.setState({
                currentAction: F.Order,
              });
              this.showConfirmMenu(module500.map_edit_order_setting_tip);
            },
          },
          {
            title: module500.reset_order_button_title,
            image: this.menuTheme.cleanMode,
            visible: true,
            onPress: function () {
              var t, n;
              this.setState({
                currentAction: F.None,
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
            title: module500.map_edit_merge,
            image: this.menuTheme.mergeImg,
            visible: true,
            onPress: function () {
              if (this.hasSegmentMap()) {
                this.setState({
                  currentAction: F.Merge,
                });
                this.showConfirmMenu(module500.map_edit_merge_restriction);
                if (this.props.onPressMergeZoneButton) this.props.onPressMergeZoneButton();
              }
            },
          },
          {
            title: module500.map_edit_split,
            image: this.menuTheme.splitImg,
            visible: true,
            onPress: function () {
              if (this.hasSegmentMap()) {
                this.setState({
                  currentAction: F.Split,
                });
                this.showConfirmMenu(module500.map_edit_split_restriction);
                if (this.props.onPressSplitZoneButton) this.props.onPressSplitZoneButton();
              }
            },
          },
          {
            title: module500.map_edit_rename,
            image: this.menuTheme.editNameImg,
            visible: (module393.isMiApp || module390.default.isRoomNameSupported()) && !module391.default.isShareUser(),
            onPress: function () {
              if (this.hasSegmentMap()) {
                this.setState({
                  currentAction: F.Name,
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
            title: module500.map_edit_add_virtual_wall,
            image: this.menuTheme.virtualWallImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.state.isButtonEnable) null == (t = (n = this.props).onPressAddVirtualWallButton) || t.call(n);
            },
          },
          n = module390.default.isMopForbiddenSupported(),
          o = {
            title: n ? module500.map_edit_clean_mop_forbidden : module500.map_edit_add_forbidden_zone,
            image: this.menuTheme.fbzImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.state.isButtonEnable) null == (t = (n = this.props).onPressAddZoneButton) || t.call(n);
            },
          },
          s = {
            title: module500.map_edit_add_clean_fbz_garnet,
            image: this.menuTheme.cleanImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.state.isButtonEnable) null == (t = (n = this.props).onPressAddCleaningFBZoneButton) || t.call(n);
            },
          },
          u = {
            title: (module422.DMM.isGarnet, module500.map_edit_add_mop_fbz),
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
        if (module422.DMM.isGarnet) l.push(s);
        return l;
      },
    },
    {
      key: 'getFloorMenu',
      value: function () {
        return [
          {
            title: module500.map_edit_floor_tile,
            image: this.theme.furnitureEdit.tileFloorImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.hasSegmentMap()) null == (t = (n = this.props).onPressTileFloorButton) || t.call(n);
            },
          },
          {
            title: module500.map_edit_floor_wood,
            image: this.theme.furnitureEdit.woodFurntImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (this.hasSegmentMap()) null == (t = (n = this.props).onPressWoodFloorButton) || t.call(n);
            },
          },
          {
            title: module500.map_edit_floor_other,
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
            title: module500.map_edit_floor_wood_tile,
            image: this.theme.furnitureEdit.editFloorImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (!(null == (t = (n = this.props).onPressFloorEditButton))) t.call(n);
            },
          },
          {
            title: module500.map_edit_carpet_ignore_title,
            image: this.menuTheme.addCarpetImg,
            visible: true,
            onPress: function () {
              var t, n;
              if (!(null == (t = (n = this.props).onPressCarpetEditButton))) t.call(n);
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
            merge: module500.map_edit_merge,
            split: module500.map_edit_split,
            custom: '',
            order: module500.map_edit_order_setting,
            name: module500.map_edit_rename,
            floor: '',
          }[this.state.currentAction],
          p = this.props.type == E.Menu_Zone || this.props.type == E.Menu_Order_Smart || this.props.type == E.Menu_Floor,
          h = p || this.props.type == E.Menu_Mode_Smart;
        if (!module390.default.isSupportCustomModeInCleaning()) p = p || this.props.type == E.Menu_Mode_Smart;
        var c =
            !(module381.RSM.mapStatus == module381.MapStatus.None || (h && module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments) || (p && module381.RSM.isRunning)) &&
            this.state.isButtonEnable,
          b = o.map(function (n, o) {
            var l = (t.props.type == E.Menu_Mode_Smart || t.props.type == E.Menu_Order_Smart) && 0 == o,
              p = t.props.type == E.Menu_Floor ? 'white' : '#9B9B9B';
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
          v = React.default.createElement(
            module12.Text,
            {
              style: {
                fontSize: 16,
                color: this.menuTheme.itemTextColor,
              },
            },
            l
          ),
          B = {
            top: this.confirmMenuViewTop,
            backgroundColor: this.menuTheme.menuBackgroundColor,
            height: this.state.menuHeight,
            width: n,
          },
          P = this.props.hasConfirmMenu
            ? React.default.createElement(
                module12.Animated.View,
                {
                  style: [k.confirmMenuWrap, B],
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
                  v,
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
            this.props.type == E.Menu_Floor
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
          I = this.hasMenu() && b.length > 0,
          F = I ? this.state.menuHeight : 60;
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
                  bottom: F + 20,
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
                  b
                )
              )
            ),
          P,
          this.state.showSmartCustomModeGuide && this.getSmartCustomModeGuideView()
        );
      },
    },
    {
      key: '_onPressButton',
      value: function (t) {
        var n = this;

        if (module381.RSM.mapStatus != module381.MapStatus.None) {
          if (this.props.type == E.Menu_Zone) {
            if (module381.RSM.mapStatus == module381.MapStatus.Has_WithoutSegments) return;
            if (module381.RSM.isRunning)
              return void module1391.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                if (n.props.editMapSegmentsIsDisable) n.props.editMapSegmentsIsDisable(module500.robot_communication_exception);
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
          currentAction: F.Custom,
        });
        this.showConfirmMenu(module500.map_edit_custom_mode_tip);
      },
    },
    {
      key: 'showOrderSetMenu',
      value: function () {
        this.setState({
          currentAction: F.Order,
        });
        this.showConfirmMenu(module500.map_edit_order_setting_tip);
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
        return this.props.type != E.Menu_Order && this.props.type != E.Menu_Mode;
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
  return P;
})(React.Component);

exports.default = O;
O.contextType = module515.AppConfigContext;
O.defaultProps = {
  type: E.Menu_Zone,
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

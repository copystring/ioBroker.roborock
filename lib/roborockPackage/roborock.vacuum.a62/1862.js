var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module391 = require('./391'),
  module390 = require('./390'),
  module1121 = require('./1121'),
  module1055 = require('./1055'),
  module387 = require('./387'),
  module1265 = require('./1265');

function _(t, l) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    if (l)
      n = n.filter(function (l) {
        return Object.getOwnPropertyDescriptor(t, l).enumerable;
      });
    o.push.apply(o, n);
  }

  return o;
}

function T(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      _(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      _(Object(n)).forEach(function (l) {
        Object.defineProperty(t, l, Object.getOwnPropertyDescriptor(n, l));
      });
  }

  return t;
}

function M() {
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
  module1863 = (function (t) {
    module7.default(_, t);

    var module50 = _,
      module1121 = M(),
      v = function () {
        var t,
          o = module11.default(module50);

        if (module1121) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function _(t) {
      module4.default(this, _);
      return v.call(this, t);
    }

    module5.default(_, [
      {
        key: 'getMapTypeSwitchView',
        value: function () {
          var t = this,
            l = this.theme.ModeSettingPanel,
            o = this.theme.mapTypeSwitcher,
            n = [
              {
                title: module505.map_type_2d,
                type: '2d',
                img: o.type2d,
              },
            ],
            p = {
              title: module505.map_type_3d,
              type: '3d',
              img: o.type3d,
            },
            u = {
              title: module505.map_type_ar,
              type: 'ar',
              img: o.typear,
            };
          if (module390.default.is3DMapSupported()) n.push(p);
          if (module390.default.isArMapSupported()) n.push(u);
          var s = this.props.currentType,
            f = undefined === s ? '2d' : s,
            y = ((module12.Dimensions.get('window').width - 16 * (n.length + 1)) / n.length) ** 250,
            S = (y / 504) * 306;
          return React.default.createElement(
            module12.View,
            {
              style: O.viewWrap,
            },
            React.default.createElement(
              module12.Text,
              {
                style: T(
                  T({}, O.title),
                  {},
                  {
                    color: l.enableTitleColor,
                  }
                ),
              },
              module505.map_type_switcher_title
            ),
            React.default.createElement(
              module12.View,
              {
                style: O.typeItemsWrap,
              },
              n.map(function (o, p) {
                var u = o.type == f;
                return React.default.createElement(
                  module12.TouchableWithoutFeedback,
                  {
                    onPress: function () {
                      return t.onSelectType(o.type);
                    },
                    key: p,
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        marginRight: p != n.length - 1 ? 16 : 0,
                      },
                    },
                    React.default.createElement(
                      module12.View,
                      null,
                      React.default.createElement(module12.Image, {
                        style: {
                          width: y,
                          height: S,
                          borderRadius: 6,
                          borderColor: '#569ffb',
                          borderWidth: u ? 4 : 0,
                        },
                        source: o.img,
                      }),
                      u &&
                        'ar' == o.type &&
                        React.default.createElement(module12.Image, {
                          style: O.arInfoImage,
                          source: require('./1863'),
                        })
                    ),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: T(
                          T({}, O.itemTitle),
                          {},
                          {
                            color: l.enableTitleColor,
                          }
                        ),
                      },
                      o.title
                    )
                  )
                );
              })
            )
          );
        },
      },
      {
        key: 'getRotateMapView',
        value: function () {
          var t = this,
            l = this.theme.ModeSettingPanel,
            o = this.theme.mapTypeSwitcher,
            n = [
              {
                title: module505.map_edit_rotate_left,
                image: o.rotateLeft,
                right: false,
              },
              {
                title: module505.map_edit_rotate_right,
                image: o.rotateRight,
                right: true,
              },
            ];
          return React.default.createElement(
            module12.View,
            {
              style: O.rotateView,
            },
            React.default.createElement(
              module12.Text,
              {
                style: T(
                  T({}, O.title),
                  {},
                  {
                    color: l.enableTitleColor,
                  }
                ),
              },
              module505.map_edit_rotate_map_title
            ),
            React.default.createElement(
              module12.View,
              {
                style: O.rotateWrap,
              },
              n.map(function (l, p) {
                return React.default.createElement(
                  module12.TouchableOpacity,
                  {
                    key: p,
                    style: T(
                      T({}, O.rotateBtnWrap),
                      {},
                      {
                        backgroundColor: o.rotatebg,
                        marginRight: p != n.length - 1 ? 10 : 0,
                      }
                    ),
                    onPress: function () {
                      return t.onRotateMap(l.right);
                    },
                  },
                  React.default.createElement(module12.Image, {
                    style: O.rotateImage,
                    source: l.image,
                  })
                );
              })
            )
          );
        },
      },
      {
        key: 'getMapElementSelView',
        value: function (t) {
          var l = this;
          if (!t || t.length < 2) return null;
          var o = (module12.Dimensions.get('window').width - 32) / t.length - 6,
            n = this.theme.ModeSettingPanel;
          return React.default.createElement(
            module12.View,
            {
              style: O.viewWrap,
            },
            React.default.createElement(
              module12.Text,
              {
                style: T(
                  T({}, O.title),
                  {},
                  {
                    color: n.enableTitleColor,
                  }
                ),
              },
              module505.map_element_switcher_title
            ),
            React.default.createElement(
              module12.View,
              {
                style: O.eleItemsWrap,
              },
              t.map(function (t, p) {
                var u = l.props.mapElementShowFlag & t.type;
                return React.default.createElement(
                  module12.TouchableWithoutFeedback,
                  {
                    onPress: function () {
                      return l.onMapElementShow(t.type, t.pvEvent);
                    },
                    key: p,
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        alignItems: 'center',
                      },
                    },
                    React.default.createElement(module12.Image, {
                      style: O.eleImage,
                      source: u ? t.selImg : t.image,
                    }),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: T(
                          T({}, O.eleTitle),
                          {},
                          {
                            width: o,
                            color: n.enableTitleColor,
                          }
                        ),
                        numberOfLines: 2,
                      },
                      t.title
                    )
                  )
                );
              })
            )
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.theme,
            l = '2d' == this.props.currentType,
            o = module390.default.isSupportMapTypeSel(),
            n = module390.default.isSupportMapElementSel() && this.getMapElementItems(),
            p = n && n.length > 1;
          return React.default.createElement(
            module12.View,
            {
              style: [
                O.container,
                {
                  backgroundColor: t.mapEditMenu.backgroundColor,
                  borderColor: t.componentBackgroundColor,
                },
              ],
            },
            React.default.createElement(module385.SwipeDownIndicator, null),
            l && p && this.getMapElementSelView(n),
            l &&
              p &&
              React.default.createElement(module12.View, {
                style: O.splitLine,
              }),
            l && module390.default.isSupportMapRotate() && this.getRotateMapView(),
            l &&
              o &&
              React.default.createElement(module12.View, {
                style: O.splitLine,
              }),
            o && this.getMapTypeSwitchView(),
            module391.default.isIphoneX() &&
              React.default.createElement(module12.View, {
                style: [
                  O.whilteSplitView,
                  {
                    backgroundColor: t.mapEditMenu.backgroundColor,
                  },
                ],
              })
          );
        },
      },
      {
        key: 'onSelectType',
        value: function (t) {
          var l;
          if (this.props.shouldSelectType && this.props.shouldSelectType(t)) null == (l = this.props) || l.onSelectType(t);
        },
      },
      {
        key: 'onRotateMap',
        value: function (t) {
          var l;
          if (!(null == (l = this.props))) l.onRotateMap(t);
        },
      },
      {
        key: 'onMapElementShow',
        value: function (t, l) {
          var o, n;
          module387.LogEventStatus(l, {
            on: !!(this.props.mapElementShowFlag & t),
          });
          var p = this.props.mapElementShowFlag ^ t;
          if (!(null == (o = (n = this.props).onChangeMapElementShow))) o.call(n, p);
        },
      },
      {
        key: 'getMapElementItems',
        value: function () {
          var t = this.theme.mapTypeSwitcher,
            l = [],
            o = {
              title: module505.map_element_room_props,
              type: module1055.MapElementShow.NAME_TAG,
              image: t.eleName,
              selImg: t.eleNameSel,
              pvEvent: 'mapdetails_roomname_switch',
            },
            n = {
              title: module505.map_element_custom_props,
              type: module1055.MapElementShow.CUSTOM_ORDER,
              image: t.eleCustom,
              selImg: t.eleCustomSel,
              pvEvent: 'mapdetails_customize_switch',
            },
            p = {
              title: module505.map_edit_floor,
              type: module1055.MapElementShow.FLOOR_CARPET,
              image: t.eleFloor,
              selImg: t.eleFloorSel,
              pvEvent: 'mapdetails_floor_switch',
            },
            u = {
              title: module505.map_element_furnitures,
              type: module1055.MapElementShow.FURNITURE,
              image: t.eleFurniture,
              selImg: t.eleFurnitureSel,
              pvEvent: 'mapdetails_furniture_switch',
            },
            s = {
              title: module505.map_obstacles_title18,
              type: module1055.MapElementShow.OBSTACLE,
              image: t.eleObstacle,
              selImg: t.eleObstacleSel,
              pvEvent: 'mapdetails_obstacle_switch',
            };
          if ((module393.isMiApp || module390.default.isRoomNameSupported()) && !module391.default.isShareUser()) l.push(o);
          if (module390.default.isCustomModeSupported() && module390.default.isCustomModeIconSupported() && module390.default.isOrderCleanSupported()) l.push(n);
          if (module390.default.isSupportFloorEdit() || module390.default.isCarpetSupported()) l.push(p);
          if (module390.default.isSupportFurniture()) l.push(u);
          if (module390.default.isObstaclesSupport()) l.push(s);
          return l;
        },
      },
      {
        key: 'theme',
        get: function () {
          return this.context.theme;
        },
      },
    ]);
    return _;
  })(React.default.Component);

module1863.contextType = module1121.AppConfigContext;
module1863.defaultProps = {
  mapElementShowFlag: 255,
};
var O = module12.StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingBottom: 30,
      backgroundColor: 'white',
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      borderBottomLeftRadius: module1265.AppBorderRadius,
      borderBottomRightRadius: module1265.AppBorderRadius,
      borderWidth: 1,
      borderColor: 'white',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: globals.isRTL ? 4 : 16,
      marginRight: globals.isRTL ? 16 : 4,
    },
    viewWrap: {
      marginTop: 16,
    },
    typeItemsWrap: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    itemTitle: {
      marginTop: 10,
      fontSize: 14,
      textAlign: 'center',
    },
    eleItemsWrap: {
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 16,
    },
    eleTitle: {
      marginTop: 10,
      fontSize: 14,
      textAlign: 'center',
      marginTop: 8,
    },
    eleImage: {
      width: 48,
      height: 48,
    },
    rotateView: {
      flexDirection: globals.isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      height: 99,
    },
    rotateWrap: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    rotateBtnWrap: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      height: 40,
      minWidth: 40,
    },
    rotateImage: {
      height: 30,
      width: 30,
    },
    splitLine: {
      height: 1,
      backgroundColor: '#00000010',
    },
    whilteSplitView: {
      height: 10,
      backgroundColor: 'white',
    },
    arInfoImage: {
      position: 'absolute',
      bottom: 7,
      right: 7,
      height: 20,
      width: 20,
    },
  }),
  k = module385.HocBottomModal(module385.WithSwipeToClose(module1863), false);
exports.default = k;

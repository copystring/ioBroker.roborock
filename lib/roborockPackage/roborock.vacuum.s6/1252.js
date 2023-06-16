var module4 = require('./4'),
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

    var o = _(n);

    if (o && o.has(t)) return o.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
        else s[u] = t[u];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module390 = require('./390'),
  module411 = require('./411'),
  module1231 = require('./1231'),
  module377 = require('./377');

function _(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (_ = function (t) {
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

var module491 = require('./491').strings,
  E = (function (t) {
    module7.default(I, t);

    var _ = I,
      E = w(),
      S = function () {
        var t,
          n = module11.default(_);

        if (E) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function I(t) {
      var o;
      module4.default(this, I);
      (o = S.call(this, t)).state = {
        current: null,
        maps: o.getMapItems(),
        visible: false,
      };
      o.animatedOpacity = new module12.Animated.Value(0);
      return o;
    }

    module5.default(I, [
      {
        key: 'getLoadModeDefaultIndex',
        value: function () {
          var t = this.props.isLoadMap,
            n = module1231.MM.maps.findIndex(function (t) {
              return t.id == module377.RSM.currentMapId;
            });
          return t && -1 != n ? n : null;
        },
      },
      {
        key: 'getDefaultIndex',
        value: function () {
          return this.getLoadModeDefaultIndex();
        },
      },
      {
        key: 'getMapItems',
        value: function () {
          var t = {
              name: module491.map_save_pop_box_new_map,
              id: -1,
            },
            n = this.props,
            o = n.isOverwriteMode,
            s = n.isLoadMap,
            l = n.isHomePage;
          return (module377.RSM.multiFloorEnabled || 0 == module1231.MM.maps.length) && o && !s && !l ? [t].concat(module1231.MM.maps) : module1231.MM.maps;
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this.multiMapslistener) this.multiMapslistener.remove();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.multiMapslistener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module411.EventKeys.MultiMapsDidReceive) {
              t.setState({
                maps: t.getMapItems(),
                current: t.getDefaultIndex(),
              });
              console.log('multiMapslistener - ' + JSON.stringify(module1231.MM.maps));
            }
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.props.isOverwriteMode,
            o = !this.props.isHomePage && module377.RSM.multiFloorEnabled && n,
            module1254 = this.state.maps.map(function (n, module1253) {
              return React.default.createElement(
                module12.View,
                {
                  key: module1253,
                  style: [
                    O.mapItem,
                    {
                      opacity: o && module1231.MM.maps.length >= module1231.MM.mapCountMax && 0 == module1253 ? 0.5 : 1,
                    },
                  ],
                },
                React.default.createElement(
                  module12.Text,
                  {
                    numberOfLines: 1,
                    style: {
                      color: 'rgba(0,0,0,0.6)',
                      fontSize: 14,
                      maxWidth: 180,
                    },
                  },
                  -1 != n.id ? (t.props.isOverwriteMode ? module491.map_save_pop_box_overwrite : t.props.isLoadMap ? '' : module491.map_edit_button_text_save) + n.name : n.name
                ),
                React.default.createElement(module381.PureImageButton, {
                  imageWidth: 18,
                  imageHeight: 18,
                  hitSlop: {
                    top: 15,
                    bottom: 15,
                    left: 15,
                    right: 15,
                  },
                  image: require('./1253'),
                  selectedImage: require('./1254'),
                  selected: module1253 == t.state.current,
                  onPress: t.selectItem.bind(t, module1253),
                })
              );
            }),
            l = this.animatedOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [1.2, 1],
            }),
            u = this.props.isLoadMap ? module491.home_load_map_title : this.props.isOverwriteMode ? module491.save_map_pop_box_save_title1 : module491.save_map_pop_box_save_title2;
          return React.default.createElement(
            module12.Modal,
            {
              transparent: true,
              visible: this.state.visible,
              onRequestClose: function () {
                console.log('closed');
                t.hide();
              },
            },
            React.default.createElement(
              module12.Animated.View,
              {
                style: [
                  O.container,
                  {
                    opacity: this.animatedOpacity,
                    height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    O.wrap,
                    this.props.style,
                    {
                      transform: [
                        {
                          scaleX: l,
                        },
                        {
                          scaleY: l,
                        },
                      ],
                    },
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: O.wrap,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: O.title,
                    },
                    u
                  ),
                  React.default.createElement(
                    module12.View,
                    {
                      style: O.middle,
                    },
                    module1254
                  ),
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        flexDirection: 'row',
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        height: 50,
                      },
                    },
                    React.default.createElement(module381.PureButton, {
                      style: O.button,
                      title: module491.localization_strings_Main_MainPage_11,
                      textColor: 'rgba(0,0,0,0.8)',
                      style: O.button,
                      fontSize: 16,
                      onPress: function () {
                        if (t.props.didCancel) t.props.didCancel();
                        t.setState({
                          current: t.getDefaultIndex(),
                        });
                        t.hide();
                      },
                    }),
                    React.default.createElement(module381.PureButton, {
                      style: O.button,
                      enabled: this.state.current != this.getLoadModeDefaultIndex(),
                      title: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                      textColor: '#007aff',
                      style: O.button,
                      fontSize: 16,
                      onPress: this.saveMap.bind(this),
                    })
                  )
                )
              )
            )
          );
        },
      },
      {
        key: 'selectItem',
        value: function (t) {
          var n = this;

          if (!this.props.isHomePage && module377.RSM.multiFloorEnabled && this.props.isOverwriteMode && module1231.MM.maps.length >= module1231.MM.mapCountMax && 0 == t) {
            this.hide();
            return void setTimeout(function () {
              if (n.props.showExceedMaxTip) n.props.showExceedMaxTip();
            }, 200);
          }

          this.setState({
            current: t,
          });
        },
      },
      {
        key: 'saveMap',
        value: function () {
          var t = this;
          this.hide();
          setTimeout(function () {
            var n = -1 == t.state.current ? -1 : t.state.maps[t.state.current].id;
            if (t.props.saveMap) t.props.saveMap(n);
          }, 200);
        },
      },
      {
        key: 'hide',
        value: function () {
          var t = this;
          if (0 != this.state.visible)
            module12.Animated.timing(this.animatedOpacity, {
              toValue: 0,
              duration: 100,
            }).start(function () {
              t.setState({
                visible: false,
              });
            });
        },
      },
      {
        key: 'show',
        value: function () {
          var t = this;
          this.setState(
            {
              visible: true,
            },
            function () {
              module12.Animated.spring(t.animatedOpacity, {
                toValue: 1,
                duration: 150,
              }).start();
            }
          );
        },
      },
    ]);
    return I;
  })(React.Component);

exports.default = E;
E.defaultProps = {
  isOverwriteMode: true,
  isLoadMap: false,
  isHomePage: false,
};
var O = module12.StyleSheet.create({
  container: {
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    width: 297,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 2,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 36,
  },
  middle: {
    alignSelf: 'stretch',
  },
  mapItem: {
    alignSelf: 'stretch',
    paddingHorizontal: 36,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    borderTopColor: '#eeeeee',
    borderTopWidth: 1,
    alignSelf: 'stretch',
    borderRightColor: '#eeeeee',
    borderRightWidth: 1,
  },
});

var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module394 = require('./394'),
  module420 = require('./420'),
  module415 = require('./415'),
  module381 = require('./381');

function w() {
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

var module510 = require('./510').strings,
  S = (function (t) {
    module9.default(C, t);

    var n = C,
      S = w(),
      I = function () {
        var t,
          o = module12.default(n);

        if (S) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function C(t) {
      var n;
      module6.default(this, C);
      (n = I.call(this, t)).state = {
        current: null,
        maps: n.getMapItems(),
        visible: false,
      };
      n.animatedOpacity = new module13.Animated.Value(0);
      return n;
    }

    module7.default(C, [
      {
        key: 'getLoadModeDefaultIndex',
        value: function () {
          var t = this.props.isLoadMap,
            n = module415.MM.maps.findIndex(function (t) {
              return t.id == module381.RSM.currentMapId;
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
              name: module510.map_save_pop_box_new_map,
              id: -1,
            },
            n = this.props,
            o = n.isOverwriteMode,
            s = n.isLoadMap,
            l = n.isHomePage;
          return (module381.RSM.multiFloorEnabled || 0 == module415.MM.maps.length) && o && !s && !l ? [t].concat(module415.MM.maps) : module415.MM.maps;
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
          this.multiMapslistener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module420.EventKeys.MultiMapsDidReceive) {
              t.setState({
                maps: t.getMapItems(),
                current: t.getDefaultIndex(),
              });
              console.log('multiMapslistener - ' + JSON.stringify(module415.MM.maps));
            }
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.props.isOverwriteMode,
            o = !this.props.isHomePage && module381.RSM.multiFloorEnabled && n,
            module1338 = this.state.maps.map(function (n, module1337) {
              return React.default.createElement(
                module13.View,
                {
                  key: module1337,
                  style: [
                    E.mapItem,
                    {
                      opacity: o && module415.MM.maps.length >= module415.MM.mapCountMax && 0 == module1337 ? 0.5 : 1,
                    },
                  ],
                },
                React.default.createElement(
                  module13.Text,
                  {
                    numberOfLines: 1,
                    style: {
                      color: 'rgba(0,0,0,0.6)',
                      fontSize: 14,
                      maxWidth: 180,
                    },
                  },
                  -1 != n.id ? (t.props.isOverwriteMode ? module510.map_save_pop_box_overwrite : t.props.isLoadMap ? '' : module510.map_edit_button_text_save) + n.name : n.name
                ),
                React.default.createElement(module385.PureImageButton, {
                  imageWidth: 18,
                  imageHeight: 18,
                  hitSlop: {
                    top: 15,
                    bottom: 15,
                    left: 15,
                    right: 15,
                  },
                  image: require('./1337'),
                  selectedImage: require('./1338'),
                  selected: module1337 == t.state.current,
                  onPress: t.selectItem.bind(t, module1337),
                })
              );
            }),
            l = this.animatedOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [1.2, 1],
            }),
            u = this.props.isLoadMap ? module510.home_load_map_title : this.props.isOverwriteMode ? module510.save_map_pop_box_save_title1 : module510.save_map_pop_box_save_title2;
          return React.default.createElement(
            module13.Modal,
            {
              transparent: true,
              visible: this.state.visible,
              onRequestClose: function () {
                console.log('closed');
                t.hide();
              },
            },
            React.default.createElement(
              module13.Animated.View,
              {
                style: [
                  E.container,
                  {
                    opacity: this.animatedOpacity,
                    height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module13.Animated.View,
                {
                  style: [
                    E.wrap,
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
                  module13.View,
                  {
                    style: E.wrap,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: E.title,
                    },
                    u
                  ),
                  React.default.createElement(
                    module13.View,
                    {
                      style: E.middle,
                    },
                    module1338
                  ),
                  React.default.createElement(
                    module13.View,
                    {
                      style: {
                        flexDirection: 'row',
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        height: 50,
                      },
                    },
                    React.default.createElement(module385.PureButton, {
                      style: E.button,
                      title: module510.localization_strings_Main_MainPage_11,
                      textColor: 'rgba(0,0,0,0.8)',
                      style: E.button,
                      fontSize: 16,
                      onPress: function () {
                        if (t.props.didCancel) t.props.didCancel();
                        t.setState({
                          current: t.getDefaultIndex(),
                        });
                        t.hide();
                      },
                    }),
                    React.default.createElement(module385.PureButton, {
                      style: E.button,
                      enabled: this.state.current != this.getLoadModeDefaultIndex(),
                      title: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                      textColor: '#007aff',
                      style: E.button,
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

          if (!this.props.isHomePage && module381.RSM.multiFloorEnabled && this.props.isOverwriteMode && module415.MM.maps.length >= module415.MM.mapCountMax && 0 == t) {
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
            module13.Animated.timing(this.animatedOpacity, {
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
              module13.Animated.spring(t.animatedOpacity, {
                toValue: 1,
                duration: 150,
              }).start();
            }
          );
        },
      },
    ]);
    return C;
  })(React.Component);

exports.default = S;
S.defaultProps = {
  isOverwriteMode: true,
  isLoadMap: false,
  isHomePage: false,
};
var E = module13.StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: module13.Dimensions.get('window').height,
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

var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module394 = require('./394');

function v() {
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
  w = [
    {
      name: module510.setting_auto,
      id: 0,
    },
    {
      name: module510.setting_on,
      id: 1,
    },
    {
      name: module510.debug_info_close,
      id: 2,
    },
    {
      name: 'invalid',
      id: -1,
    },
  ];

exports.LedSettings = w;

var _ = (function (t) {
  module9.default(V, t);

  var n = V,
    _ = v(),
    E = function () {
      var t,
        l = module12.default(n);

      if (_) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(l, arguments, o);
      } else t = l.apply(this, arguments);

      return module11.default(this, t);
    };

  function V(t) {
    var n;
    module6.default(this, V);
    (n = E.call(this, t)).state = {
      current: 0,
      datas: w,
      visible: false,
    };
    n.animatedOpacity = new module13.Animated.Value(0);
    return n;
  }

  module7.default(V, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'componentDidMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          module1338 = this.state.datas.map(function (module1337, l) {
            return React.default.createElement(
              module13.View,
              {
                key: l,
                style: C.mapItem,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    marginLeft: 20,
                    color: 'rgba(0,0,0,0.6)',
                  },
                },
                module1337.name
              ),
              React.default.createElement(module385.PureImageButton, {
                style: {
                  marginRight: 20,
                },
                imageWidth: 20,
                imageHeight: 20,
                hitSlop: {
                  top: 15,
                  bottom: 15,
                  left: 15,
                  right: 15,
                },
                image: require('./1337'),
                selectedImage: require('./1338'),
                selected: l == t.state.current,
                onPress: t.selectItem.bind(t, l),
              })
            );
          }),
          l = this.animatedOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1.2, 1],
          });
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
                C.container,
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
                  C.wrap,
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
                  style: C.wrap,
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: C.middle,
                  },
                  module1338
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: {
                      flexDirection: 'row',
                      alignSelf: 'stretch',
                      backgroundColor: 'red',
                    },
                  },
                  React.default.createElement(module385.PureButton, {
                    style: C.button,
                    title: module510.localization_strings_Main_MainPage_11,
                    textColor: 'black',
                    style: C.button,
                    fontSize: 16,
                    onPress: function () {
                      if (t.props.didCancel) t.props.didCancel();
                      t.hide();
                    },
                  }),
                  React.default.createElement(module385.PureButton, {
                    style: C.button,
                    title: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                    textColor: 'black',
                    style: C.button,
                    fontSize: 16,
                    onPress: this.didSelect.bind(this),
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
        this.setState({
          current: t,
        });
      },
    },
    {
      key: 'didSelect',
      value: function () {
        var t = this;
        this.hide();
        var n = this.state.datas[this.state.current];
        console.log('LedSettingModalView  id -  ' + this.state.datas[this.state.current].id);
        setTimeout(function () {
          if (t.props.didSet) t.props.didSet(n.id);
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
  return V;
})(React.Component);

exports.LedSettingModalView = _;
var C = module13.StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  wrap: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'center',
    marginVertical: 20,
  },
  middle: {
    marginTop: 10,
    alignSelf: 'stretch',
  },
  mapItem: {
    alignSelf: 'stretch',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    borderTopColor: '#eeeeee',
    borderTopWidth: 1,
    alignSelf: 'stretch',
    height: 55,
    borderRightColor: '#eeeeee',
    borderRightWidth: 1,
  },
});

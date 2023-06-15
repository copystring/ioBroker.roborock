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
    var o = b(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var u = s ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (u && (u.get || u.set)) Object.defineProperty(l, c, u);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module390 = require('./390');

require('./389');

require('./411');

require('./1231');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : n;
  })(t);
}

function v() {
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
  S = [
    {
      name: module491.setting_auto,
      id: 0,
    },
    {
      name: module491.setting_on,
      id: 1,
    },
    {
      name: module491.debug_info_close,
      id: 2,
    },
    {
      name: 'invalid',
      id: -1,
    },
  ];

exports.LedSettings = S;

var _ = (function (t) {
  module7.default(P, t);

  var b = P,
    _ = v(),
    O = function () {
      var t,
        n = module11.default(b);

      if (_) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function P(t) {
    var o;
    module4.default(this, P);
    (o = O.call(this, t)).state = {
      current: 0,
      datas: S,
      visible: false,
    };
    o.animatedOpacity = new module12.Animated.Value(0);
    return o;
  }

  module5.default(P, [
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
          module1254 = this.state.datas.map(function (module1253, o) {
            return React.default.createElement(
              module12.View,
              {
                key: o,
                style: k.mapItem,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    marginLeft: 20,
                    color: 'rgba(0,0,0,0.6)',
                  },
                },
                module1253.name
              ),
              React.default.createElement(module381.PureImageButton, {
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
                image: require('./1253'),
                selectedImage: require('./1254'),
                selected: o == t.state.current,
                onPress: t.selectItem.bind(t, o),
              })
            );
          }),
          o = this.animatedOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1.2, 1],
          });
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
                k.container,
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
                  k.wrap,
                  this.props.style,
                  {
                    transform: [
                      {
                        scaleX: o,
                      },
                      {
                        scaleY: o,
                      },
                    ],
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: k.wrap,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: k.middle,
                  },
                  module1254
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      flexDirection: 'row',
                      alignSelf: 'stretch',
                      backgroundColor: 'red',
                    },
                  },
                  React.default.createElement(module381.PureButton, {
                    style: k.button,
                    title: module491.localization_strings_Main_MainPage_11,
                    textColor: 'black',
                    style: k.button,
                    fontSize: 16,
                    onPress: function () {
                      if (t.props.didCancel) t.props.didCancel();
                      t.hide();
                    },
                  }),
                  React.default.createElement(module381.PureButton, {
                    style: k.button,
                    title: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                    textColor: 'black',
                    style: k.button,
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
  return P;
})(React.Component);

exports.LedSettingModalView = _;
var k = module12.StyleSheet.create({
  container: {
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
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

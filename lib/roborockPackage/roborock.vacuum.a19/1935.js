var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = y(o);
    if (n && n.has(t)) return n.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = s ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, u, c);
        else l[u] = t[u];
      }

    l.default = t;
    if (n) n.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module390 = require('./390'),
  module937 = require('./937'),
  module506 = require('./506');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (y = function (t) {
    return t ? n : o;
  })(t);
}

function _() {
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
  k = (function (t) {
    module7.default(k, t);

    var module387 = k,
      module506 = _(),
      y = function () {
        var t,
          o = module11.default(module387);

        if (module506) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var n;
      module4.default(this, k);
      (n = y.call(this, t)).state = {
        isMultiFloorChecked: false,
      };
      return n;
    }

    module5.default(k, [
      {
        key: 'theme',
        get: function () {
          return this.context.theme.alert;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.state.isMultiFloorChecked ? '#007AFF' : this.theme.textColor,
            n = React.default.createElement(module381.PureButton, {
              funcId: 'alert_btn1',
              title: module491.localization_strings_Main_MainPage_11,
              textColor: this.theme.textColor,
              style: [
                x.button,
                {
                  backgroundColor: this.theme.backgroundColor,
                  borderTopColor: this.theme.lineColor,
                },
              ],
              fontSize: 16,
              onPress: function () {
                t.hide();
              },
            }),
            l = React.default.createElement(module381.PureButton, {
              funcId: 'alert_btn2',
              title: module491.continue_save,
              enabled: this.state.isMultiFloorChecked,
              textColor: o,
              style: [
                x.button,
                {
                  backgroundColor: this.theme.backgroundColor,
                  borderTopColor: this.theme.lineColor,
                },
              ],
              fontSize: 16,
              onPress: function () {
                t.hide();
                t.props.onPressConfirm();
              },
            }),
            module1254 = React.default.createElement(
              module12.View,
              {
                style: [
                  x.container,
                  {
                    height: module390.default.sharedCache().ScreenHeight,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    x.wrap,
                    {
                      backgroundColor: this.theme.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: x.top,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: {
                        fontSize: 16,
                        lineHeight: 24,
                        color: this.theme.textColor,
                      },
                      numberOfLines: 0,
                    },
                    module491.single_floor_save_new_map_tip
                  ),
                  React.default.createElement(
                    module12.View,
                    {
                      style: x.checkBoxContainer,
                    },
                    React.default.createElement(module381.PureImageButton, {
                      funcId: 'single_floor_save_new_map_check_box',
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
                      selected: this.state.isMultiFloorChecked,
                      imageStyle: {
                        tintColor: this.theme.textColor,
                      },
                      onPress: function () {
                        t.setState({
                          isMultiFloorChecked: !t.state.isMultiFloorChecked,
                        });
                      },
                    }),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: {
                          left: 7,
                          fontSize: 12,
                          lineHeight: 24,
                          color: this.theme.detailColor,
                        },
                      },
                      module491.single_floor_save_new_map_home_multifloor
                    )
                  )
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: x.bottom,
                  },
                  n,
                  l
                )
              )
            ),
            u = React.default.createElement(
              module937.default,
              {
                transparent: true,
                visible: true,
                onRequestClose: function () {
                  console.log('closed');
                  t.hide();
                },
              },
              module1254
            );
          return this.state.visible ? u : null;
        },
      },
      {
        key: 'show',
        value: function () {
          this.setState({
            visible: true,
          });
        },
      },
      {
        key: 'hide',
        value: function () {
          if (0 != this.state.visible)
            this.setState({
              visible: false,
            });
        },
      },
    ]);
    return k;
  })(React.Component);

exports.SingleFloorSaveNewMapAlert = k;
k.contextType = module506.AppConfigContext;
var x = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    elevation: 9999,
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    maxWidth: 500,
    minWidth: 340,
    marginHorizontal: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  top: {
    flexDirection: 'column',
    paddingTop: module387.default.iOSAndroidReturn(34, 30),
    paddingBottom: 23,
    paddingHorizontal: 30,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    paddingTop: 11,
  },
  button: {
    flex: 1,
    borderTopColor: '#eeeeee',
    borderTopWidth: 0.8,
    alignSelf: 'stretch',
    height: 55,
  },
});

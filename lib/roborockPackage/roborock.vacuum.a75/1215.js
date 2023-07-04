var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module394 = require('./394'),
  module1216 = require('./1216'),
  module1199 = require('./1199');

function y() {
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
  x = (function (t) {
    module9.default(x, t);

    var o = x,
      module391 = y(),
      v = function () {
        var t,
          n = module12.default(o);

        if (module391) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function x(t) {
      var o;
      module6.default(this, x);
      (o = v.call(this, t)).state = {
        isMultiFloorChecked: false,
      };
      return o;
    }

    module7.default(x, [
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.state.isMultiFloorChecked ? '#007AFF' : this.theme.textColor,
            n = React.default.createElement(module385.PureButton, {
              funcId: 'alert_btn1',
              title: module510.localization_strings_Main_MainPage_11,
              textColor: this.theme.textColor,
              style: [
                S.button,
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
            l = React.default.createElement(module385.PureButton, {
              funcId: 'alert_btn2',
              title: module510.continue_save,
              enabled: this.state.isMultiFloorChecked,
              textColor: o,
              style: [
                S.button,
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
            module1337 = React.default.createElement(
              module13.View,
              {
                style: [
                  S.container,
                  {
                    height: module394.default.sharedCache().ScreenHeight,
                  },
                ],
              },
              React.default.createElement(
                module13.View,
                {
                  style: [
                    S.wrap,
                    {
                      backgroundColor: this.theme.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: S.top,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: {
                        fontSize: 16,
                        lineHeight: 24,
                        color: this.theme.textColor,
                      },
                      numberOfLines: 0,
                    },
                    module510.single_floor_save_new_map_tip
                  ),
                  React.default.createElement(
                    module13.View,
                    {
                      style: S.checkBoxContainer,
                    },
                    React.default.createElement(module385.PureImageButton, {
                      funcId: 'single_floor_save_new_map_check_box',
                      imageWidth: 18,
                      imageHeight: 18,
                      hitSlop: {
                        top: 15,
                        bottom: 15,
                        left: 15,
                        right: 15,
                      },
                      image: require('./1336'),
                      selectedImage: require('./1337'),
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
                      module13.Text,
                      {
                        style: {
                          left: 7,
                          fontSize: 12,
                          lineHeight: 24,
                          color: this.theme.detailColor,
                        },
                      },
                      module510.single_floor_save_new_map_home_multifloor
                    )
                  )
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: S.bottom,
                  },
                  n,
                  l
                )
              )
            ),
            c = React.default.createElement(
              module1216.default,
              {
                transparent: true,
                visible: true,
                onRequestClose: function () {
                  console.log('closed');
                  t.hide();
                },
              },
              module1337
            );
          return this.state.visible ? c : null;
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
      {
        key: 'theme',
        get: function () {
          return this.context.theme.alert;
        },
      },
    ]);
    return x;
  })(React.Component);

exports.default = x;
x.contextType = module1199.AppConfigContext;
var S = module13.StyleSheet.create({
  container: {
    zIndex: 9999,
    elevation: 9999,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    maxWidth: 500,
    minWidth: 220,
    marginHorizontal: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  top: {
    flexDirection: 'column',
    paddingTop: module391.default.iOSAndroidReturn(34, 30),
    paddingBottom: 23,
    paddingHorizontal: 20,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  checkBoxContainer: {
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
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

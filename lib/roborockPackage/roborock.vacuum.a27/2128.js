require('./1575');

var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module391 = require('./391'),
  module394 = require('./394'),
  module1121 = require('./1121');

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

require('./1265');

var module393 = require('./393'),
  module505 = require('./505').strings,
  S = (function (t) {
    module7.default(x, t);

    var o = x,
      module1121 = v(),
      S = function () {
        var t,
          n = module11.default(o);

        if (module1121) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function x(t) {
      var o;
      module4.default(this, x);
      (o = S.call(this, t)).state = {
        shouldShow: false,
      };
      return o;
    }

    module5.default(x, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme.alert,
            o = module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
            n = React.default.createElement(
              module12.View,
              {
                style: [
                  module391.default.iOSAndroidReturn(k.iOSContainer, k.androidContainer),
                  {
                    height: o,
                    width: module12.Dimensions.get('window').width,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    k.wrap,
                    this.props.style,
                    {
                      backgroundColor: t.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: k.middle,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        k.content,
                        {
                          color: t.textColor,
                        },
                      ],
                      numberOfLines: 0,
                    },
                    module505.robot_invalid_connect_tips
                  ),
                  !module393.isMiApp &&
                    React.default.createElement(module385.PureButton, {
                      title: module393.isMiApp ? module505.check_and_read_agreement_privacy : module505.revert_agreement_privacy,
                      textColor: t.linkTextColor,
                      style: [
                        k.linkButton,
                        {
                          borderBottomColor: t.linkTextColor,
                        },
                      ],
                      fontSize: 14,
                      onPress: function () {
                        if (!module393.isMiApp) module393.openDeleteDevice();
                      },
                    })
                ),
                React.default.createElement(module385.PureButton, {
                  funcId: 'invalid_connect_warning_ok',
                  title: module505.localization_strings_Setting_RemoteControlPage_51,
                  textColor: t.textColor,
                  style: [
                    k.button,
                    {
                      backgroundColor: t.backgroundColor,
                      borderTopColor: t.lineColor,
                    },
                  ],
                  fontSize: 16,
                  onPress: function () {
                    module393.closeCurrentPage();
                  },
                })
              )
            ),
            l = React.default.createElement(
              module12.Modal,
              {
                transparent: true,
                visible: this.state.shouldShow,
                onRequestClose: function () {
                  console.log('closed');
                },
              },
              n
            ),
            u = this.state.shouldShow ? n : React.default.createElement(module12.View, null);
          return module391.default.iOSAndroidReturn(u, l);
        },
      },
    ]);
    return x;
  })(React.default.PureComponent);

exports.default = S;
S.contextType = module1121.AppConfigContext;
var k = module12.StyleSheet.create({
  androidContainer: {
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iOSContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrap: {
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
  },
  top: {
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
  },
  middle: {
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  content: {
    marginTop: 20,
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 20,
    color: 'rgba(0,0,0,0.8)',
  },
  linkButton: {
    marginTop: 20,
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  knowMoreButton: {
    color: '#3a9ffb',
  },
  button: {
    borderTopWidth: 1,
    marginTop: 20,
    alignSelf: 'stretch',
    height: 55,
  },
});

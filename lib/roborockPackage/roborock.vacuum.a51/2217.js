require('./1648');

var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module394 = require('./394'),
  module1193 = require('./1193');

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

require('./1337');

var module393 = require('./393'),
  module510 = require('./510').strings,
  S = (function (t) {
    module9.default(x, t);

    var o = x,
      module1193 = v(),
      S = function () {
        var t,
          n = module12.default(o);

        if (module1193) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function x(t) {
      var o;
      module6.default(this, x);
      (o = S.call(this, t)).state = {
        shouldShow: false,
      };
      return o;
    }

    module7.default(x, [
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
              module13.View,
              {
                style: [
                  module391.default.iOSAndroidReturn(k.iOSContainer, k.androidContainer),
                  {
                    height: o,
                    width: module13.Dimensions.get('window').width,
                  },
                ],
              },
              React.default.createElement(
                module13.View,
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
                  module13.View,
                  {
                    style: k.middle,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: [
                        k.content,
                        {
                          color: t.textColor,
                        },
                      ],
                      numberOfLines: 0,
                    },
                    module510.robot_invalid_connect_tips
                  ),
                  !module393.isMiApp &&
                    React.default.createElement(module385.PureButton, {
                      title: module393.isMiApp ? module510.check_and_read_agreement_privacy : module510.revert_agreement_privacy,
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
                  title: module510.localization_strings_Setting_RemoteControlPage_51,
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
              module13.Modal,
              {
                transparent: true,
                visible: this.state.shouldShow,
                onRequestClose: function () {
                  console.log('closed');
                },
              },
              n
            ),
            u = this.state.shouldShow ? n : React.default.createElement(module13.View, null);
          return module391.default.iOSAndroidReturn(u, l);
        },
      },
    ]);
    return x;
  })(React.default.PureComponent);

exports.default = S;
S.contextType = module1193.AppConfigContext;
var k = module13.StyleSheet.create({
  androidContainer: {
    height: module13.Dimensions.get('window').height,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iOSContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: module13.Dimensions.get('window').height,
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

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
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(l, c, f);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module1376 = require('./1376'),
  module390 = require('./390'),
  module506 = require('./506');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
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

require('./934');

var module389 = require('./389'),
  module491 = require('./491').strings,
  S = (function (t) {
    module7.default(x, t);

    var module506 = x,
      v = w(),
      S = function () {
        var t,
          n = module11.default(module506);

        if (v) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
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
            n = module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
            o = React.default.createElement(
              module12.View,
              {
                style: [
                  module387.default.iOSAndroidReturn(P.iOSContainer, P.androidContainer),
                  {
                    height: n,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    P.wrap,
                    this.props.style,
                    {
                      backgroundColor: t.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: P.middle,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        P.content,
                        {
                          color: t.textColor,
                        },
                      ],
                      numberOfLines: 0,
                    },
                    module491.robot_invalid_connect_tips
                  ),
                  React.default.createElement(module381.PureButton, {
                    title: module389.isMiApp ? module491.check_and_read_agreement_privacy : module491.revert_agreement_privacy,
                    textColor: t.linkTextColor,
                    style: [
                      P.linkButton,
                      {
                        borderBottomColor: t.linkTextColor,
                      },
                    ],
                    fontSize: 14,
                    onPress: function () {
                      if (module389.isMiApp)
                        module389.privacyAndProtocolReview(
                          module491.localization_strings_Main_Views_AgreementPage_0,
                          module1376.default.UserAgreement(),
                          module491.rubys_main_alert_title_privacy,
                          module1376.default.UserPrivacyProtocol()
                        );
                      else module389.openDeleteDevice();
                    },
                  })
                ),
                React.default.createElement(module381.PureButton, {
                  funcId: 'invalid_connect_warning_ok',
                  title: module491.localization_strings_Setting_RemoteControlPage_51,
                  textColor: t.textColor,
                  style: [
                    P.button,
                    {
                      backgroundColor: t.backgroundColor,
                      borderTopColor: t.lineColor,
                    },
                  ],
                  fontSize: 16,
                  onPress: function () {
                    module389.closeCurrentPage();
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
              o
            ),
            u = this.state.shouldShow ? o : React.default.createElement(module12.View, null);
          return module387.default.iOSAndroidReturn(u, l);
        },
      },
    ]);
    return x;
  })(React.default.PureComponent);

exports.default = S;
S.contextType = module506.AppConfigContext;
var P = module12.StyleSheet.create({
  androidContainer: {
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iOSContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: module12.Dimensions.get('window').width,
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
    fontWeight: '600',
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

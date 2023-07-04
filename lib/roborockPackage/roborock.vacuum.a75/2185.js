require('./391');

require('./381');

require('./394');

require('./2051');

require('./387');

require('./390');

require('./2048');

require('./1395');

var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module416 = require('./416'),
  module385 = require('./385'),
  module1199 = require('./1199'),
  module2186 = require('./2186'),
  module382 = require('./382'),
  module420 = require('./420'),
  module424 = require('./424');

function b() {
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

require('./393');

require('./1343');

var module510 = require('./510').strings,
  module2194 = (function (t) {
    module9.default(B, t);

    var module1199 = B,
      module2194 = b(),
      _ = function () {
        var t,
          n = module12.default(module1199);

        if (module2194) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function B(t) {
      var n;
      module6.default(this, B);

      (n = _.call(this, t)).onPressCustomModeButton = function () {
        var t;
        if (!(null == (t = n.customModeView))) t.show();
      };

      n._onPressCustomModePage = function () {
        if (n.customModeView) n.customModeView.hide();
        n.props.navigation.navigate('MapEditZoneModePage', {
          parent: module8.default(n),
          action: 'custom',
          title: module510.map_edit_bottom_menu_mode,
        });
      };

      n._handleAppStateChange = function (t) {};

      n.state = {
        loadingVisible: false,
        noteVisible: false,
        isLocal: true,
      };
      n.remoteRpcSeqnum = 0;
      return n;
    }

    module7.default(B, [
      {
        key: 'componentDidMount',
        value: function () {
          console.log('Remote control page componentDidMount---\x3e');
          this._isMounted = true;
          var t = this.context.theme;
          this.props.navigation.setParams({
            navBarBackgroundColor: t.remoteControl.backgroundColor,
            hiddenBottomLine: true,
          });
          module13.AppState.addEventListener('change', this._handleAppStateChange);
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.registerListeners();
        },
      },
      {
        key: 'registerListeners',
        value: function () {
          var t = this;
          this.robotStatusListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (n) {
            if (t.customModeView && t.customModeView.updateSettingTip) t.customModeView.updateSettingTip();
          });
        },
      },
      {
        key: 'unregisterListeners',
        value: function () {
          if (this.robotStatusListener) this.robotStatusListener.remove();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          var t;
          this._isMounted = false;
          module13.AppState.removeEventListener('change', this._handleAppStateChange);
          if (!(null == this || null == (t = this.remoteView))) t.stop();
          this.unregisterListeners();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(
              module13.View,
              {
                style: {
                  flex: 1,
                  backgroundColor: n.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              React.default.createElement(module385.Spinner, null)
            );
          if (this.state.loading) return o;
          var s = React.default.createElement(
            module13.View,
            {
              style: [
                k.bottomButtonView,
                {
                  backgroundColor: n.remoteControl.bottomBackgroundColor,
                },
              ],
            },
            React.default.createElement(module385.TopImageButton, {
              image: n.remoteControl.chargeImg,
              title: '\u6e05\u6d01\u6a21\u5f0f',
              onPress: this.onPressCustomModeButton,
            })
          );
          return React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              module13.View,
              {
                style: {
                  flex: 1,
                  backgroundColor: n.pageBackgroundColor,
                },
              },
              React.default.createElement(module2186.default, {
                ref: function (n) {
                  return (t.remoteView = n);
                },
                seqnum: this.remoteRpcSeqnum,
                isPortrait: true,
                width: 400,
                askShouldRunCmd: this._shouldRunCmd.bind(this),
                updateSeqnum: function (n) {
                  return (t.remoteRpcSeqnum = n);
                },
              }),
              React.default.createElement(
                module13.View,
                {
                  style: k.menuWrap,
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: k.menu,
                  },
                  React.default.createElement(module13.Text, null, '\u62d6\u677f\u5347\u964d/\u9707\u52a8'),
                  React.default.createElement(module385.PureImageButton, {
                    style: {
                      marginLeft: 40,
                    },
                    image: require('./2192'),
                    imageWidth: 40,
                    imageHeight: 40,
                    onPress: this.sendCesAction.bind(this, 1, 2),
                  }),
                  React.default.createElement(module385.PureImageButton, {
                    style: {
                      marginLeft: 40,
                    },
                    image: require('./2193'),
                    imageWidth: 40,
                    imageHeight: 40,
                    onPress: this.sendCesAction.bind(this, 1, 0),
                  }),
                  React.default.createElement(module385.PureImageButton, {
                    style: {
                      marginLeft: 40,
                    },
                    image: require('./2194'),
                    imageWidth: 40,
                    imageHeight: 40,
                    onPress: this.sendCesAction.bind(this, 1, 1),
                  })
                ),
                !module424.DMM.isUltron &&
                  React.default.createElement(
                    module13.View,
                    {
                      style: k.menu,
                    },
                    React.default.createElement(module13.Text, null, '\u4e3b\u5237\u5347\u964d'),
                    React.default.createElement(module385.PureImageButton, {
                      style: {
                        marginLeft: 80,
                      },
                      image: require('./2192'),
                      imageWidth: 40,
                      imageHeight: 40,
                      onPress: this.sendCesAction.bind(this, 0, 2),
                    }),
                    React.default.createElement(module385.PureImageButton, {
                      style: {
                        marginLeft: 40,
                      },
                      image: require('./2194'),
                      imageWidth: 40,
                      imageHeight: 40,
                      onPress: this.sendCesAction.bind(this, 0, 1),
                    })
                  )
              ),
              s
            ),
            this.getModeSetView()
          );
        },
      },
      {
        key: '_shouldRunCmd',
        value: function (t, n) {
          console.log('shouldRunRemote', n);
          t(true);
        },
      },
      {
        key: 'sendCesAction',
        value: function (t, o) {
          var s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    u.prev = 0;
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(
                      module416.default.setCes2022Action({
                        type: t,
                        action: o,
                      })
                    );

                  case 3:
                    s = u.sent;
                    console.log('sendCesAction', t, o, s);
                    u.next = 10;
                    break;

                  case 7:
                    u.prev = 7;
                    u.t0 = u.catch(0);
                    console.log('sendCesAction error', t, o, u.t0);

                  case 10:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            null,
            [[0, 7]],
            Promise
          );
        },
      },
      {
        key: 'getModeSetView',
        value: function () {
          var t = this;
          return React.default.createElement(module382.ModeSettingPanel, {
            ref: function (n) {
              t.customModeView = n;
            },
            isInHomePage: true,
            onPressCustomModePage: this._onPressCustomModePage,
          });
        },
      },
    ]);
    return B;
  })(React.default.Component);

exports.default = module2194;
module2194.contextType = module1199.AppConfigContext;
module2194.navigationOptions = {
  header: React.default.createElement(module13.View, null),
};
var k = module13.StyleSheet.create({
  bottomButtonView: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    bottom: 0,
    height: 100,
    width: module13.Dimensions.get('window').width,
  },
  menuWrap: {},
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 40,
  },
});

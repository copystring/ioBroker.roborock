require('./381');

require('./415');

require('./387');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module420 = require('./420'),
  module385 = require('./385'),
  module1350 = require('./1350'),
  module394 = require('./394'),
  module1200 = require('./1200'),
  module1655 = require('./1655'),
  module1940 = require('./1940');

function S() {
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
  module393 = require('./393'),
  module1421 = require('./1421'),
  module1344 = require('./1344'),
  B = module13.Dimensions.get('window').width,
  module2140 = (function (t) {
    module9.default(B, t);

    var n = B,
      module1200 = S(),
      k = function () {
        var t,
          o = module12.default(n);

        if (module1200) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function B(t) {
      var n;
      module6.default(this, B);
      (n = k.call(this, t)).state = {
        matchingParams: null,
        showLoadingRing: false,
      };
      return n;
    }

    module7.default(B, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.props.navigation.setParams({
            navBarBackgroundColor: 'transparent',
            naviBackImage: require('./2140'),
          });

          if (this.props.navigation.state.params.needsMatching) {
            this.configNavibarWithConfirmButton();
            module1421.setTimeout(function () {
              t.startMatching();
            }, 100);
          }
        },
      },
      {
        key: 'startMatching',
        value: function () {
          var t;
          if (!(null == (t = this.arView))) t.startMatching();
          this.setState({
            showLoadingRing: true,
          });
        },
      },
      {
        key: 'deleteARMap',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (this.alert)
                      this.alert.customAlert(
                        '',
                        module510.armap_delete_confirm,
                        function () {
                          var n;
                          return regeneratorRuntime.default.async(
                            function (o) {
                              for (;;)
                                switch ((o.prev = o.next)) {
                                  case 0:
                                    o.next = 2;
                                    return regeneratorRuntime.default.awrap(
                                      module420.DelStorageKey(module420.StorageKeys.ARMapPathPrefixKey + '_' + t.props.navigation.state.params.mapID)
                                    );

                                  case 2:
                                    module393.deleteFile(t.props.navigation.state.params.meshFileName + '.scn', function (t) {
                                      if (!t) console.log('delete matrix scn error.');
                                    });
                                    if (!(null == (n = t.props.navigation.state.params))) n.refreshFunc();
                                    t.props.navigation.pop();

                                  case 5:
                                  case 'end':
                                    return o.stop();
                                }
                            },
                            null,
                            null,
                            null,
                            Promise
                          );
                        },
                        function () {},
                        {
                          backgroundColor: '#222222',
                          lineColor: 'rgba(255,255,255,0.05)',
                          confirmColor: '#D1D1D1',
                          textColor: '#D1D1D1',
                        }
                      );

                  case 1:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'onComfirmButtonPress',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (!(this.state.matchingParams && this.state.matchingParams.length >= 0)) {
                      n.next = 4;
                      break;
                    }

                    n.next = 3;
                    return regeneratorRuntime.default.awrap(
                      module420.SetStorageKey(
                        module420.StorageKeys.ARMapPathPrefixKey + '_' + this.props.navigation.state.params.mapID,
                        JSON.stringify({
                          transform: this.state.matchingParams,
                          meshFileName: this.props.navigation.state.params.meshFileName,
                        })
                      )
                    );

                  case 3:
                    module1421.setTimeout(function () {
                      t.props.navigation.popToTop();
                      if (!(null == t.props.navigation.state.params.onScanFinish)) t.props.navigation.state.params.onScanFinish();
                    }, 50);

                  case 4:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'onFinishMatching',
        value: function (t) {
          var n, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    this.setState({
                      showLoadingRing: false,
                    });
                    if (1 == t.success) {
                      if ((o = null == t ? undefined : null == (n = t.result[0]) ? undefined : n.transform).constructor === Array) {
                        this.setState({
                          matchingParams: o,
                        });
                        globals.showToast(module510.armap_match_success);
                      }
                    } else globals.showToast(module510.armap_match_failed);

                  case 2:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'privacySetting',
        value: function () {
          var t = this;
          this.props.navigation.navigate('WebViewPage', {
            title: module510.armap_privacy_dialog_title,
            refrence: module1655.default.ARMapPrivacy(),
            buttonTitle: module510.reset_authoration,
            buttonColor: 'red',
            buttonAction: function (n) {
              if (n.alertView)
                n.alertView.customAlert(
                  module510.reset_monitor_privacy_dialog_title,
                  '',
                  function () {
                    var n;
                    return regeneratorRuntime.default.async(
                      function (o) {
                        for (;;)
                          switch ((o.prev = o.next)) {
                            case 0:
                              o.next = 2;
                              return regeneratorRuntime.default.awrap(module420.DelStorageKey(module420.StorageKeys.ARMapPrivacyVersion));

                            case 2:
                              o.next = 4;
                              return regeneratorRuntime.default.awrap(
                                module420.DelStorageKey(module420.StorageKeys.ARMapPathPrefixKey + '_' + t.props.navigation.state.params.mapID)
                              );

                            case 4:
                              if (!(null == (n = t.props.navigation.state.params))) n.refreshFunc();
                              t.props.navigation.popToTop();

                            case 6:
                            case 'end':
                              return o.stop();
                          }
                      },
                      null,
                      null,
                      null,
                      Promise
                    );
                  },
                  null,
                  {
                    titleColor: t.context.theme.navTitleColor,
                    confirmColor: '#007AFF',
                  }
                );
            },
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            s = React.default.createElement(
              module13.View,
              {
                style: [
                  A.container,
                  {
                    position: 'absolute',
                    width: module13.Dimensions.get('window').width,
                    height: module13.Dimensions.get('window').height,
                    left: 0,
                    top: 0,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ],
              },
              React.default.createElement(module385.Spinner, null)
            );
          return React.default.createElement(
            module13.View,
            {
              style: [
                module1350.MapEditCommonStyles.root,
                {
                  height: module394.default.sharedCache().ScreenHeight - Utils.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            React.default.createElement(module1940.default, {
              style: A.arMapView,
              ref: function (n) {
                return (t.arView = n);
              },
              onFinishMatching: this.onFinishMatching.bind(this),
              backgroundColor: 'black',
              parsedMapData: this.props.navigation.state.params.parsedMapData,
              originBase64MapData: this.props.navigation.state.params.originBase64MapData,
              meshFileName: this.props.navigation.state.params.meshFileName,
              matchingParams: this.state.matchingParams ? this.state.matchingParams : this.props.navigation.state.params.matchingParams,
            }),
            this.state.showLoadingRing && s,
            React.default.createElement(module385.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            }),
            !this.props.navigation.state.params.needsMatching &&
              React.default.createElement(
                module385.GradientView,
                {
                  pointerEvents: 'box-none',
                  colors: [n.gradientColorStart, n.gradientColorEnd],
                  start: {
                    x: 0,
                    y: 0,
                  },
                  end: {
                    x: 1,
                    y: 0,
                  },
                  style: [
                    A.monitorButton,
                    {
                      minWidth: module13.Dimensions.get('window').width - 100,
                    },
                  ],
                },
                React.default.createElement(module385.PureButton, {
                  funcId: 'delete_ar_map',
                  style: {
                    backgroundColor: 'transparent',
                    height: 40,
                  },
                  textColor: '#FFFFFF',
                  fontSize: 16,
                  title: module510.rubys_history_del_button,
                  onPress: function () {
                    return t.deleteARMap();
                  },
                })
              ),
            !this.props.navigation.state.params.needsMatching &&
              React.default.createElement(
                module13.Text,
                module22.default({}, Utils.getAccessibilityLabel('ar_privacy_text'), {
                  style: [
                    A.privacyButton,
                    {
                      color: n.customService.highlightTextColor,
                    },
                  ],
                  onPress: this.privacySetting.bind(this),
                }),
                module510.armap_privacy_dialog_title
              )
          );
        },
      },
      {
        key: 'configNavibarWithConfirmButton',
        value: function () {
          var t = this,
            module2146 = module1350.default.confirmButton(
              this.onComfirmButtonPress.bind(this),
              true,
              function (n) {
                t.confirmButton = n;
              },
              true,
              require('./2146')
            );
          module1350.default.setNavigation(this, [module2146], function () {
            return t.props.navigation.pop();
          });
        },
      },
    ]);
    return B;
  })(React.Component);

exports.default = module2140;
module2140.contextType = module1200.AppConfigContext;
var A = module13.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: module1344.NavigationBarHeight,
  },
  arMapView: {
    flex: 1,
  },
  bigButton: {
    position: 'absolute',
    left: B / 2 - 35,
    bottom: 77,
  },
  smallButton: {
    position: 'absolute',
    right: 18,
    bottom: 90,
  },
  privacyButton: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 13,
    bottom: 30,
  },
  monitorButton: {
    position: 'absolute',
    alignSelf: 'center',
    height: 40,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 26,
    bottom: 50,
  },
});

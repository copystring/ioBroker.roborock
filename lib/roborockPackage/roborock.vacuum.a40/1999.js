require('./381');

require('./1329');

require('./387');

var regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module418 = require('./418'),
  module385 = require('./385'),
  module1410 = require('./1410'),
  module394 = require('./394'),
  module515 = require('./515'),
  module1523 = require('./1523'),
  module1814 = require('./1814');

function D() {
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

var module500 = require('./500').strings,
  module393 = require('./393'),
  module1404 = require('./1404'),
  module1153 = require('./1153'),
  A = module12.Dimensions.get('window').width,
  module1994 = (function (t) {
    module7.default(A, t);

    var n = A,
      module515 = D(),
      x = function () {
        var t,
          o = module11.default(n);

        if (module515) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function A(t) {
      var n;
      module4.default(this, A);
      (n = x.call(this, t)).state = {
        matchingParams: null,
        showLoadingRing: false,
      };
      return n;
    }

    module5.default(A, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.props.navigation.setParams({
            navBarBackgroundColor: 'transparent',
            naviBackImage: require('./1994'),
          });

          if (this.props.navigation.state.params.needsMatching) {
            this.configNavibarWithConfirmButton();
            module1404.setTimeout(function () {
              t.startMatching();
            }, 100);
          } else this.configNavibarWithDeleteButton();
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
                        module500.armap_delete_confirm,
                        function () {
                          var n;
                          return regeneratorRuntime.default.async(
                            function (s) {
                              for (;;)
                                switch ((s.prev = s.next)) {
                                  case 0:
                                    s.next = 2;
                                    return regeneratorRuntime.default.awrap(
                                      module418.DelStorageKey(module418.StorageKeys.ARMapPathPrefixKey + '_' + t.props.navigation.state.params.mapID)
                                    );

                                  case 2:
                                    module393.deleteFile(t.props.navigation.state.params.meshFileName + '.scn', function (t) {
                                      if (!t) console.log('delete matrix scn error.');
                                    });
                                    if (!(null == (n = t.props.navigation.state.params))) n.refreshFunc();
                                    t.props.navigation.pop();

                                  case 5:
                                  case 'end':
                                    return s.stop();
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
                      module418.SetStorageKey(
                        module418.StorageKeys.ARMapPathPrefixKey + '_' + this.props.navigation.state.params.mapID,
                        JSON.stringify({
                          transform: this.state.matchingParams,
                          meshFileName: this.props.navigation.state.params.meshFileName,
                        })
                      )
                    );

                  case 3:
                    module1404.setTimeout(function () {
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
          var n, s;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.setState({
                      showLoadingRing: false,
                    });
                    if (1 == t.success) {
                      if ((s = null == t ? undefined : null == (n = t.result[0]) ? undefined : n.transform).constructor === Array) {
                        this.setState({
                          matchingParams: s,
                        });
                        globals.showToast(module500.armap_match_success);
                      }
                    } else globals.showToast(module500.armap_match_failed);

                  case 2:
                  case 'end':
                    return o.stop();
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
        key: 'getAuctionSheetView',
        value: function () {
          var t = this;
          return React.default.createElement(module385.ActionSheetView, {
            ref: function (n) {
              return (t.actionSheet = n);
            },
            backgroundColor: '#1C1C1C',
            titleColor: '#D1D1D1',
            underlayColor: '#2C2C2C',
            lineColor: 'rgba(255,255,255,0.05)',
            actions: [module500.armap_privacy_dialog_title, module500.rubys_history_del_button],
            didSelectRow: this.handleSheetAction.bind(this),
            onPressCancel: function () {
              return t.actionSheet.hide();
            },
          });
        },
      },
      {
        key: 'auctionSheetShow',
        value: function () {
          var t;
          if (!(null == (t = this.actionSheet))) t.show();
        },
      },
      {
        key: 'handleSheetAction',
        value: function (t) {
          var n,
            o = this;
          if (!(null == (n = this.actionSheet))) n.hide();
          if (t > 0)
            setTimeout(function () {
              o.deleteARMap();
            }, 100);
          else this.privacySetting();
        },
      },
      {
        key: 'privacySetting',
        value: function () {
          var t = this;
          this.props.navigation.navigate('WebViewPage', {
            title: module500.armap_privacy_dialog_title,
            refrence: module1523.default.ARMapPrivacy(),
            buttonTitle: module500.reset_authoration,
            buttonColor: 'red',
            buttonAction: function (n) {
              if (n.alertView)
                n.alertView.customAlert(
                  module500.reset_monitor_privacy_dialog_title,
                  '',
                  function () {
                    var n;
                    return regeneratorRuntime.default.async(
                      function (s) {
                        for (;;)
                          switch ((s.prev = s.next)) {
                            case 0:
                              s.next = 2;
                              return regeneratorRuntime.default.awrap(module418.DelStorageKey(module418.StorageKeys.ARMapPrivacyVersion));

                            case 2:
                              s.next = 4;
                              return regeneratorRuntime.default.awrap(
                                module418.DelStorageKey(module418.StorageKeys.ARMapPathPrefixKey + '_' + t.props.navigation.state.params.mapID)
                              );

                            case 4:
                              if (!(null == (n = t.props.navigation.state.params))) n.refreshFunc();
                              t.props.navigation.popToTop();

                            case 6:
                            case 'end':
                              return s.stop();
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
            o = React.default.createElement(
              module12.View,
              {
                style: [
                  R.container,
                  {
                    position: 'absolute',
                    width: module12.Dimensions.get('window').width,
                    height: module12.Dimensions.get('window').height,
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
            module12.View,
            {
              style: [
                module1410.MapEditCommonStyles.root,
                {
                  height: module394.default.sharedCache().ScreenHeight - Utils.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            React.default.createElement(module1814.default, {
              style: R.arMapView,
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
            this.state.showLoadingRing && o,
            React.default.createElement(module385.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            }),
            this.getAuctionSheetView()
          );
        },
      },
      {
        key: 'configNavibarWithConfirmButton',
        value: function () {
          var t = this,
            module2000 = module1410.default.confirmButton(
              this.onComfirmButtonPress.bind(this),
              true,
              function (n) {
                t.confirmButton = n;
              },
              true,
              require('./2000')
            );
          module1410.default.setNavigation(this, [module2000], function () {
            return t.props.navigation.pop();
          });
        },
      },
      {
        key: 'configNavibarWithDeleteButton',
        value: function () {
          var t = this,
            n = module1410.default.settingButtonDark(this.auctionSheetShow.bind(this), true, function (n) {
              t.deleteButton = n;
            });
          module1410.default.setNavigation(this, [n], function () {
            return t.props.navigation.pop();
          });
        },
      },
    ]);
    return A;
  })(React.Component);

exports.default = module1994;
module1994.contextType = module515.AppConfigContext;
var R = module12.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: module1153.NavigationBarHeight,
  },
  arMapView: {
    flex: 1,
  },
  bigButton: {
    position: 'absolute',
    left: A / 2 - 35,
    bottom: 77,
  },
  smallButton: {
    position: 'absolute',
    right: 18,
    bottom: 90,
  },
});

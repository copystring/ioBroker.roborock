var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module381 = require('./381'),
  module415 = require('./415'),
  module420 = require('./420'),
  module385 = require('./385'),
  module1350 = require('./1350'),
  module394 = require('./394'),
  module1200 = require('./1200'),
  module387 = require('./387'),
  module1347 = require('./1347'),
  module2138 = require('./2138'),
  module1655 = require('./1655'),
  module2139 = require('./2139');

function C() {
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
  k = {
    INIT: 'init',
    SCANNING: 'scanning',
    PAUSED: 'paused',
  };

exports.ARScanStatus = k;

var x = module13.Dimensions.get('window').width,
  G = (function (t) {
    module9.default(module2140, t);

    var n = module2140,
      module1200 = C(),
      x = function () {
        var t,
          s = module12.default(n);

        if (module1200) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(s, arguments, o);
        } else t = s.apply(this, arguments);

        return module11.default(this, t);
      };

    function module2140(t) {
      var n;
      module6.default(this, module2140);
      (n = x.call(this, t)).state = {
        status: k.INIT,
        mapID: module381.RSM.currentMapId,
        firstMeshHasGot: false,
      };
      return n;
    }

    module7.default(module2140, [
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            navBarBackgroundColor: 'transparent',
            naviBackImage: require('./2140'),
            hiddenBottomLine: true,
          });
          if (this.ARMapGuide) this.ARMapGuide.show();
        },
      },
      {
        key: 'onGetFirstMesh',
        value: function () {
          this.setState({
            firstMeshHasGot: true,
          });
        },
      },
      {
        key: 'saveARScanFile',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    n = 'ARMap_' + module381.RSM.currentMapId;
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(null == (t = this.arView) ? undefined : t.saveToFile(n));

                  case 4:
                    if (1 == o.sent)
                      this.props.navigation.navigate('MapARScanResultPage', {
                        title: ' ',
                        mapID: module381.RSM.currentMapId,
                        parsedMapData: module415.MM.parsedMapData,
                        originBase64MapData: module415.MM.originBase64MapData,
                        needsMatching: true,
                        meshFileName: n,
                        onScanFinish: this.props.navigation.state.params.onScanFinish,
                      });
                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    globals.showToast(module510.armap_scan_save_mesh_failed_toast);

                  case 11:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[0, 8]],
            Promise
          );
        },
      },
      {
        key: 'start',
        value: function () {
          var t,
            n = this;
          if (!(null == (t = this.arView))) t.start();
          this.setState({
            status: k.SCANNING,
          });
          setTimeout(function () {
            n.setState({
              firstMeshHasGot: true,
            });
          }, 1e4);
        },
      },
      {
        key: 'pause',
        value: function () {
          var t;
          if (!(null == (t = this.arView))) t.pause();
          this.setState({
            status: k.PAUSED,
          });
        },
      },
      {
        key: 'end',
        value: function () {
          var t = this,
            n = {
              text: module510.localization_strings_Main_MainPage_11,
              onPress: function () {},
            },
            o = {
              text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
              onPress: function () {
                var n;
                return regeneratorRuntime.default.async(
                  function (s) {
                    for (;;)
                      switch ((s.prev = s.next)) {
                        case 0:
                          if (!(null == (n = t.arView))) n.pause();
                          t.setState({
                            status: k.INIT,
                          });
                          t.saveARScanFile();

                        case 3:
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
            };
          this.alert.alert('', module510.armap_scan_stop_confirm, [n, o]);
        },
      },
      {
        key: 'openPrivacyPolicy',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (this.ARMapGuide) this.ARMapGuide.dismissModalView();
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.ARMapPrivacyVersion));

                  case 3:
                    if (!t.sent) {
                      t.next = 6;
                      break;
                    }

                    return t.abrupt('return');

                  case 6:
                    if (this.mapARPrivacyDialog) this.mapARPrivacyDialog.show();

                  case 7:
                  case 'end':
                    return t.stop();
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
        key: 'getMapARPrivacyDialog',
        value: function () {
          var t = this;
          return React.default.createElement(module2138.MapARPrivacyDialogWithNavbar, {
            ref: function (n) {
              return (t.mapARPrivacyDialog = n);
            },
            confirmTextColor: '#007AFF',
            confirmTitle: module510.button_title_agree,
            onConfirm: function () {
              return regeneratorRuntime.default.async(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        module387.LogEventCommon('mapAR_privacy_dialog_confirm');
                        t.next = 3;
                        return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.ARMapPrivacyVersion, module420.StorageKeys.ARMapPrivacyVersion));

                      case 3:
                      case 'end':
                        return t.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            },
            onCancel: function () {
              module387.LogEventCommon('mapAR_privacy_dialog_cancel');
              t.props.navigation.pop();
            },
            onPressLink: function () {
              return t.props.navigation.navigate('WebViewPage', {
                title: module510.armap_privacy_dialog_title,
                refrence: module1655.default.ARMapPrivacy(),
                isNotMarginBottom: true,
              });
            },
            onShowListener: function () {
              t.props.navigation.setParams({
                onPressLeft: function () {},
              });
            },
            onHideListener: function () {
              t.props.navigation.setParams({
                onPressLeft: null,
              });
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
                  E.container,
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
            ),
            module2142 = React.default.createElement(module385.PureImageButton, {
              funcId: 'map_edit_menu_close',
              style: E.bigButton,
              image: this.state.status == k.INIT ? require('./2141') : require('./2142'),
              imageWidth: 70,
              imageHeight: 70,
              onPress: function () {
                if (t.state.status == k.INIT) t.start();
                else t.end();
              },
            }),
            module2144 = React.default.createElement(module385.PureImageButton, {
              funcId: 'map_edit_menu_close',
              style: E.smallButton,
              image: this.state.status == k.SCANNING ? require('./2143') : require('./2144'),
              imageWidth: 46,
              imageHeight: 46,
              onPress: function () {
                if (t.state.status == k.SCANNING) t.pause();
                else t.start();
              },
            });
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
            React.default.createElement(module2139.default, {
              ref: function (n) {
                return (t.arView = n);
              },
              style: E.arMapView,
              onGetFirstMesh: this.onGetFirstMesh.bind(this),
            }),
            module2142,
            this.state.status != k.INIT && module2144,
            this.state.status == k.SCANNING && !this.state.firstMeshHasGot && s,
            React.default.createElement(module385.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            }),
            React.default.createElement(module1347.default, {
              ref: function (n) {
                t.ARMapGuide = n;
              },
              isModal: true,
              parent: this,
              bgImage: n.guideImages.arMap,
              topTitle: module510.armap_guide_title,
              context: module510.armap_guide_title1 + '\n' + module510.armap_guide_title2 + '\n' + module510.armap_guide_title3,
              buttonInfo: [module510.localization_strings_Setting_RemoteControlPage_51],
              buttonFuncId: ['ar_map_guide_ok'],
              onPressSingleButton: function () {
                t.openPrivacyPolicy();
              },
            }),
            this.getMapARPrivacyDialog()
          );
        },
      },
    ]);
    return module2140;
  })(React.Component);

exports.default = G;
G.contextType = module1200.AppConfigContext;
var E = module13.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  arMapView: {
    flex: 1,
  },
  bigButton: {
    position: 'absolute',
    left: x / 2 - 35,
    bottom: 77,
  },
  smallButton: {
    position: 'absolute',
    right: 18,
    bottom: 90,
  },
});

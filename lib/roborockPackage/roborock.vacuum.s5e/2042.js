var regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module414 = require('./414'),
  module419 = require('./419'),
  module385 = require('./385'),
  module1271 = require('./1271'),
  module394 = require('./394'),
  module1121 = require('./1121'),
  module387 = require('./387'),
  module1268 = require('./1268'),
  module2043 = require('./2043'),
  module1573 = require('./1573'),
  module2044 = require('./2044');

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

var module505 = require('./505').strings,
  k = {
    INIT: 'init',
    SCANNING: 'scanning',
    PAUSED: 'paused',
  };

exports.ARScanStatus = k;

var x = module12.Dimensions.get('window').width,
  G = (function (t) {
    module7.default(module2045, t);

    var n = module2045,
      module1121 = C(),
      x = function () {
        var t,
          s = module11.default(n);

        if (module1121) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, o);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function module2045(t) {
      var n;
      module4.default(this, module2045);
      (n = x.call(this, t)).state = {
        status: k.INIT,
        mapID: module381.RSM.currentMapId,
        firstMeshHasGot: false,
      };
      return n;
    }

    module5.default(module2045, [
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            navBarBackgroundColor: 'transparent',
            naviBackImage: require('./2045'),
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
                        parsedMapData: module414.MM.parsedMapData,
                        originBase64MapData: module414.MM.originBase64MapData,
                        needsMatching: true,
                        meshFileName: n,
                        onScanFinish: this.props.navigation.state.params.onScanFinish,
                      });
                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    globals.showToast(module505.armap_scan_save_mesh_failed_toast);

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
              text: module505.localization_strings_Main_MainPage_11,
              onPress: function () {},
            },
            o = {
              text: module505.localization_strings_Main_Error_ErrorDetailPage_3,
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
          this.alert.alert('', module505.armap_scan_stop_confirm, [n, o]);
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
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.ARMapPrivacyVersion));

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
          return React.default.createElement(module2043.MapARPrivacyDialogWithNavbar, {
            ref: function (n) {
              return (t.mapARPrivacyDialog = n);
            },
            confirmTextColor: '#007AFF',
            confirmTitle: module505.button_title_agree,
            onConfirm: function () {
              return regeneratorRuntime.default.async(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        module387.LogEventCommon('mapAR_privacy_dialog_confirm');
                        t.next = 3;
                        return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.ARMapPrivacyVersion, module419.StorageKeys.ARMapPrivacyVersion));

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
                title: module505.armap_privacy_dialog_title,
                refrence: module1573.default.ARMapPrivacy(),
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
              module12.View,
              {
                style: [
                  E.container,
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
            ),
            module2047 = React.default.createElement(module385.PureImageButton, {
              funcId: 'map_edit_menu_close',
              style: E.bigButton,
              image: this.state.status == k.INIT ? require('./2046') : require('./2047'),
              imageWidth: 70,
              imageHeight: 70,
              onPress: function () {
                if (t.state.status == k.INIT) t.start();
                else t.end();
              },
            }),
            module2049 = React.default.createElement(module385.PureImageButton, {
              funcId: 'map_edit_menu_close',
              style: E.smallButton,
              image: this.state.status == k.SCANNING ? require('./2048') : require('./2049'),
              imageWidth: 46,
              imageHeight: 46,
              onPress: function () {
                if (t.state.status == k.SCANNING) t.pause();
                else t.start();
              },
            });
          return React.default.createElement(
            module12.View,
            {
              style: [
                module1271.MapEditCommonStyles.root,
                {
                  height: module394.default.sharedCache().ScreenHeight - Utils.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            React.default.createElement(module2044.default, {
              ref: function (n) {
                return (t.arView = n);
              },
              style: E.arMapView,
              onGetFirstMesh: this.onGetFirstMesh.bind(this),
            }),
            module2047,
            this.state.status != k.INIT && module2049,
            this.state.status == k.SCANNING && !this.state.firstMeshHasGot && s,
            React.default.createElement(module385.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            }),
            React.default.createElement(module1268.default, {
              ref: function (n) {
                t.ARMapGuide = n;
              },
              isModal: true,
              parent: this,
              bgImage: n.guideImages.arMap,
              topTitle: module505.armap_guide_title,
              context: module505.armap_guide_title1 + '\n' + module505.armap_guide_title2 + '\n' + module505.armap_guide_title3,
              buttonInfo: [module505.localization_strings_Setting_RemoteControlPage_51],
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
    return module2045;
  })(React.Component);

exports.default = G;
G.contextType = module1121.AppConfigContext;
var E = module12.StyleSheet.create({
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

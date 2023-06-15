var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1340 = require('./1340'),
  module1118 = require('./1118'),
  module381 = require('./381'),
  module415 = require('./415'),
  module1341 = require('./1341'),
  module390 = require('./390'),
  module1193 = require('./1193'),
  module391 = require('./391'),
  module1636 = require('./1636'),
  module385 = require('./385');

function E(t) {
  var n = D();
  return function () {
    var o,
      l = module12.default(t);

    if (n) {
      var s = module12.default(this).constructor;
      o = Reflect.construct(l, arguments, s);
    } else o = l.apply(this, arguments);

    return module11.default(this, o);
  };
}

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

var module510 = require('./510').strings,
  base64js = require('base64-js'),
  module1479 = require('./1479').parseSync,
  T = (function (t) {
    module9.default(u, t);
    var n = E(u);

    function u() {
      module6.default(this, u);
      return n.apply(this, arguments);
    }

    module7.default(u, [
      {
        key: 'show',
        value: function () {
          var t;
          if (!(null == (t = this.view) || null == t.show)) t.show();
        },
      },
      {
        key: 'hide',
        value: function () {
          var t;
          if (!(null == (t = this.view))) t.dismissModalView();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = (module13.Dimensions.get('window').width - 70) / 2;
          return React.default.createElement(module1340.default, {
            ref: function (n) {
              t.view = n;
            },
            isModal: true,
            contentComponent: React.default.createElement(
              module13.View,
              {
                style: {
                  flexDirection: 'column',
                  justifyContent: 'center',
                },
              },
              React.default.createElement(
                module13.View,
                {
                  style: {
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                    alignSelf: 'center',
                  },
                },
                React.default.createElement(P, {
                  onRotateMap: function (n) {
                    var o;
                    return null == (o = t.props) ? undefined : null == o.onRotateMap ? undefined : o.onRotateMap(n);
                  },
                  hasRotate: true,
                  isCurrentMap: true,
                  mapID: module381.RSM.currentMapId,
                  mapBgColor: this.context.theme.guideImages.mapUnitBgColor,
                  name: module510.reset_map_main_title,
                  textColor: '#007AFF',
                  mapSize: n,
                }),
                React.default.createElement(P, {
                  mapID: module381.RSM.unsaveMapFlag,
                  mapBgColor: this.context.theme.guideImages.mapUnitBgColor,
                  name: module510.choose_map_hint_old_map,
                  textColor: this.context.theme.mainTextColor,
                  mapSize: n,
                })
              ),
              React.default.createElement(
                module13.View,
                {
                  style: {
                    paddingHorizontal: 10,
                    paddingBottom: 20,
                    paddingTop: 10,
                  },
                },
                React.default.createElement(
                  module13.Text,
                  {
                    style: {
                      color: this.context.theme.mainTextColor,
                      fontSize: 10,
                    },
                  },
                  module510.unsave_map_alert_content
                )
              )
            ),
            buttonInfo: [module510.choose_map_option_ignore, module510.choose_map_option_recover],
            buttonFuncId: ['choose_map_reset', 'choose_map_recover'],
            onPressLeftButton: this.props.onPressLeft,
            onPressGoSetting: function () {
              t.props.onPressRight();
            },
          });
        },
      },
    ]);
    return u;
  })(React.default.Component);

exports.default = T;
T.contextType = module1193.AppConfigContext;

var k = (function (t) {
  module9.default(u, t);
  var n = E(u);

  function u() {
    module6.default(this, u);
    return n.apply(this, arguments);
  }

  module7.default(u, [
    {
      key: 'show',
      value: function () {
        var t;
        if (!(null == (t = this.view) || null == t.show)) t.show();
      },
    },
    {
      key: 'hide',
      value: function () {
        var t;
        if (!(null == (t = this.view))) t.dismissModalView();
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = module13.Dimensions.get('window').width - 70;
        return React.default.createElement(module1340.default, {
          ref: function (n) {
            t.view = n;
          },
          isModal: true,
          contentComponent: React.default.createElement(
            module13.View,
            {
              style: {
                flexDirection: 'column',
                paddingHorizontal: 20,
                paddingVertical: 20,
              },
            },
            React.default.createElement(
              module13.Text,
              {
                style: {
                  color: this.context.theme.guideImages.titleColor,
                  fontSize: module391.default.scaledPixelForPad(16),
                },
              },
              module510.recover_map_alert_title
            ),
            this.bakTime > 0 &&
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    paddingVertical: 8,
                    color: this.context.theme.guideImages.contentColor,
                    fontSize: module391.default.scaledPixelForPad(14),
                  },
                },
                module510.recover_map_backup_time + ' ' + module1636.formatWithMillis(1e3 * this.bakTime, 'YYYY/MM/DD HH:mm')
              ),
            React.default.createElement(P, {
              mapID: this.props.mapID,
              mapBgColor: 'transparent',
              isBackupData: true,
              textColor: '#007AFF',
              mapSize: n,
            })
          ),
          buttonInfo: [module510.localization_strings_Main_MainPage_11, module510.choose_map_option_recover],
          buttonFuncId: ['choose_map_reset', 'choose_map_recover'],
          onPressLeftButton: this.props.onPressLeft,
          onPressGoSetting: function () {
            t.props.onPressRight();
          },
        });
      },
    },
    {
      key: 'bakTime',
      get: function () {
        var t,
          n,
          o,
          l,
          s = this,
          u =
            null !=
            (t =
              null ==
              (n = module415.MM.maps.find(function (t) {
                return t.id == s.props.mapID;
              }))
                ? undefined
                : n.bak_maps)
              ? t
              : [];
        return u.length > 0 && null != (o = null == (l = u[0]) ? undefined : l.add_time) ? o : 0;
      },
    },
  ]);
  return u;
})(React.default.Component);

exports.LoadBackupMapView = k;
k.contextType = module1193.AppConfigContext;

var B = {
    Loading: 0,
    Succeeded: 1,
    Failed: 2,
  },
  P = (function (t) {
    module9.default(p, t);
    var u = E(p);

    function p(t) {
      var n;
      module6.default(this, p);
      (n = u.call(this, t)).state = {
        loadingStatus: B.Loading,
      };
      return n;
    }

    module7.default(p, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          if (!this.props.isBackupData && this.props.isCurrentMap)
            this.setState(
              {
                loadingStatus: B.Succeeded,
              },
              function () {
                var n;
                if (!(null == (n = t.mapView))) n.setState(module415.MM.mapData);
              }
            );
          else this.fetchMapData();
        },
      },
      {
        key: 'fetchMapData',
        value: function () {
          var t = this;
          this.setState({
            loadingStatus: B.Loading,
          });
          (module390.default.isMultiFloorSupported() ? new module1341.MultiMapDataProvider() : new module1341.SingleMapDataProvider())
            .getMapData(this.props.mapID, this.props.isBackupData)
            .then(function (n) {
              console.log('LoadMap: Success');
              var o = base64js.toByteArray(n),
                l = module1479(o, false);
              if (!(l.map && l.map.width && l.map.height)) l = '';
              t.setState(
                {
                  loadingStatus: B.Succeeded,
                },
                function () {
                  var n;
                  if (!(null == (n = t.mapView))) n.setState(l);
                }
              );
            })
            .catch(function (n) {
              t.setState({
                loadingStatus: B.Failed,
              });
              console.log('LoadMap: failed: ' + JSON.stringify(n));
            });
        },
      },
      {
        key: 'rotateMap',
        value: function () {
          var t,
            n = this;
          if (!(null == (t = this.mapView) || null == t.rotateMap))
            t.rotateMap(true, function (t) {
              if (!(null == n.props.onRotateMap)) n.props.onRotateMap(t);
            });
        },
      },
      {
        key: 'render',
        value: function () {
          var t,
            o = this,
            l = React.default.createElement(
              module13.TouchableOpacity,
              module22.default({}, module391.default.getAccessibilityLabel('map_retry_' + this.props.mapID), {
                style: R.editButton,
                onPress: function () {
                  o.fetchMapData();
                },
              }),
              React.default.createElement(
                module13.View,
                {
                  style: R.editImageContainer,
                },
                React.default.createElement(module13.Image, {
                  style: R.editImage,
                  source: this.context.theme.floorMapItem.reloadImg,
                })
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    R.editTextStyle,
                    {
                      color: this.context.theme.floorMapItem.editTitleColor,
                    },
                  ],
                },
                module510.button_title_retry
              )
            ),
            s = React.default.createElement(
              module13.TouchableOpacity,
              module22.default({}, module391.default.getAccessibilityLabel('map_rotate_' + this.props.mapID), {
                style: R.editButton,
                onPress: function () {
                  o.rotateMap();
                },
              }),
              React.default.createElement(
                module13.View,
                {
                  style: R.editImageContainer,
                },
                React.default.createElement(module13.Image, {
                  style: R.editImage,
                  source: this.context.theme.mapEdit.rotateRightImg,
                })
              )
            );
          return React.default.createElement(
            module13.View,
            null,
            React.default.createElement(
              module13.View,
              {
                style: {
                  paddingVertical: 20,
                  paddingHorizontal: 5,
                },
                pointerEvents: 'none',
              },
              this.props.name &&
                React.default.createElement(
                  module13.Text,
                  {
                    style: {
                      alignSelf: 'center',
                      paddingVertical: 10,
                      color: this.props.textColor,
                    },
                  },
                  this.props.name
                ),
              React.default.createElement(
                module13.View,
                {
                  style: {
                    width: this.props.mapSize,
                    height: this.props.mapSize,
                  },
                },
                o.state.loadingStatus == B.Loading
                  ? React.default.createElement(
                      module13.View,
                      {
                        style: {
                          height: o.props.mapSize,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingHorizontal: 30,
                        },
                      },
                      React.default.createElement(module385.Spinner, null)
                    )
                  : o.state.loadingStatus == B.Failed
                  ? React.default.createElement(
                      module13.View,
                      {
                        style: [
                          R.tipWrap,
                          {
                            height: o.props.mapSize,
                          },
                        ],
                      },
                      React.default.createElement(module13.Image, {
                        source: o.context.theme.floorMapItem.retryImg,
                        style: R.tipIcon,
                      }),
                      React.default.createElement(
                        module13.Text,
                        {
                          style: [
                            R.tipText,
                            {
                              color: o.context.theme.floorMapItem.retryTitleColor,
                              fontSize: 15,
                            },
                          ],
                        },
                        module510.reset_map_getlist_fail
                      )
                    )
                  : React.default.createElement(module1118.MapView, {
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                      style: {
                        width: o.props.mapSize,
                        height: o.props.mapSize,
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                        backgroundColor: null != (t = o.props.mapBgColor) ? t : '#F3F3F3',
                        borderRadius: 4,
                      },
                      initSize: {
                        height: o.props.mapSize,
                        width: o.props.mapSize,
                      },
                      parent: o,
                      ref: function (t) {
                        return (o.mapView = t);
                      },
                      hideAccessory: true,
                    })
              )
            ),
            this.props.hasRotate &&
              React.default.createElement(
                module13.View,
                {
                  style: {
                    position: 'absolute',
                    top: this.props.name ? 60 : 0,
                    right: 6,
                  },
                },
                s
              ),
            this.state.loadingStatus == B.Failed &&
              React.default.createElement(
                module13.View,
                {
                  style: {
                    position: 'absolute',
                    top: this.props.name ? 60 : 0,
                    right: 6,
                  },
                },
                l
              )
          );
        },
      },
    ]);
    return p;
  })(React.default.Component);

P.contextType = module1193.AppConfigContext;
var R = module13.StyleSheet.create({
  tipWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  tipIcon: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  tipText: {
    color: 'rgba(0,0,0,0.6)',
    marginHorizontal: 20,
    textAlign: 'center',
  },
  editTextStyle: {
    color: 'rgba(54, 54, 54, 1)',
    fontSize: 12,
    marginTop: 1,
  },
  editButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImageContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImage: {
    width: 30,
    height: 30,
  },
});

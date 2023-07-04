var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module381 = require('./381'),
  module415 = require('./415'),
  module391 = require('./391'),
  module1124 = require('./1124'),
  module420 = require('./420'),
  module1199 = require('./1199'),
  module387 = require('./387'),
  module390 = require('./390');

function T(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function V(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      T(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      T(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function I(t) {
  var n = R();
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

function R() {
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

var module510 = require('./510').strings,
  module1414 = require('./1414'),
  O = module13.Dimensions.get('window').width,
  L = O,
  B = (function (t) {
    module9.default(l, t);
    var n = I(l);

    function l(t) {
      var o, u;
      module6.default(this, l);
      (u = n.call(this, t)).state = {
        hasCurrentMap: module381.RSM.mapStatus != module381.MapStatus.None,
        isNewMap: u.initNewMap(),
        isRunning: module381.RSM.isRunning,
        hasMap: !!t.hasMap && t.hasMap,
      };
      L = O - 2 * (null != (o = t.padding) ? o : 0);
      return u;
    }

    module7.default(l, [
      {
        key: 'initNewMap',
        value: function () {
          var t = -1 == module381.RSM.currentMapId;
          if (module381.RSM.isLocating && module381.RSM.multiFloorEnabled) t = false;
          return t;
        },
      },
      {
        key: 'updateMap',
        value: function () {
          if (this.mapView) this.mapView.setState(V({}, module415.MM.mapData));
        },
      },
      {
        key: 'manualSave',
        value: function () {
          if (this.props.onTapSaveButton) this.props.onTapSaveButton();
        },
      },
      {
        key: 'manualDelete',
        value: function () {
          var t, n;
          if (!(null == (t = (n = this.props).onTapDeleteButton))) t.call(n);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme;
          n.floorMapItem.retryButtonTitleColor;
          n.floorMapItem.retryButtonBorderColor;

          if (0 != this.state.hasCurrentMap || this.state.hasMap) {
            if (this.state.hasCurrentMap && this.state.isNewMap) {
              var l = this.state.isRunning
                  ? React.default.createElement(module13.View, null)
                  : React.default.createElement(module385.PureImageButton, {
                      funcId: 'qa_about_map',
                      image: n.emptyMapItem.aboutImg,
                      color: 'rgba(0,0,0,0.6)',
                      imageWidth: 15,
                      imageHeight: 15,
                      style: {
                        width: 15,
                        height: 15,
                        alignSelf: 'center',
                        marginLeft: globals.isRTL ? 0 : 10,
                        marginRight: globals.isRTL ? 10 : 0,
                      },
                      onPress: function () {
                        return (
                          t.mapSavingHintView &&
                          t.mapSavingHintView.setState({
                            shouldShow: true,
                          })
                        );
                      },
                    }),
                s = React.default.createElement(
                  module13.Text,
                  {
                    style: {
                      color: n.emptyMapItem.titleColor,
                      fontSize: module391.default.scaledPixelForPad(17),
                    },
                  },
                  module510.multi_floors_change
                ),
                u = React.default.createElement(
                  module13.View,
                  {
                    style: {
                      flexDirection: 'column',
                      minHeight: 65,
                    },
                  },
                  React.default.createElement(
                    module13.View,
                    {
                      style: {
                        flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                        marginTop: 16,
                      },
                    },
                    s,
                    l
                  ),
                  React.default.createElement(
                    module13.View,
                    {
                      style: {
                        flexDirection: 'row',
                        minHeight: 20,
                        marginBottom: 5,
                        marginTop: 5,
                      },
                    },
                    React.default.createElement(
                      module13.Text,
                      {
                        style: {
                          color: n.emptyMapItem.descColor,
                          alignSelf: 'center',
                          fontSize: 14,
                          maxWidth: O - 180,
                        },
                      },
                      this.state.isRunning
                        ? module510.map_in_changing
                        : (function () {
                            switch (module381.RSM.unsaveMapReason) {
                              case module381.UnsaveMapReason.ChargerOffset:
                                return module510.unsave_map_reason_1;

                              case module381.UnsaveMapReason.Relocation:
                                return module510.unsave_map_reason_2;

                              case module381.UnsaveMapReason.ReachMaxFloorCount:
                                return module510.unsave_map_reason_3;

                              case module381.UnsaveMapReason.Unfinished:
                                return module510.unsave_map_reason_4;

                              case module381.UnsaveMapReason.DidNotStartFromCharger:
                                return module510.unsave_map_reason_5;

                              case module381.UnsaveMapReason.DidNotReturnToCharger:
                                return module510.unsave_map_reason_6;

                              default:
                                return module510.no_map_status_description;
                            }
                          })()
                    )
                  )
                ),
                c = this.state.isRunning
                  ? React.default.createElement(module13.View, null)
                  : React.default.createElement(
                      module13.TouchableOpacity,
                      module22.default({}, module391.default.getAccessibilityLabel('map_save'), {
                        style: k.editButton,
                        onPress: function () {
                          module387.LogEventCommon('map_save');
                          t.manualSave();
                        },
                      }),
                      React.default.createElement(
                        module13.View,
                        {
                          style: k.editImageContainer,
                        },
                        React.default.createElement(module13.Image, {
                          style: k.editImage,
                          source: n.floorMapItem.saveImg,
                        })
                      ),
                      React.default.createElement(
                        module13.Text,
                        {
                          style: [
                            k.editTextStyle,
                            {
                              color: n.floorMapItem.editTitleColor,
                            },
                          ],
                        },
                        module510.map_edit_button_text_save
                      )
                    ),
                f = this.state.isRunning
                  ? React.default.createElement(module13.View, null)
                  : React.default.createElement(
                      module13.TouchableOpacity,
                      module22.default({}, module391.default.getAccessibilityLabel('map_delete'), {
                        style: [
                          k.editButton,
                          {
                            marginLeft: 10,
                          },
                        ],
                        onPress: function () {
                          module387.LogEventCommon('map_delete');
                          t.manualDelete();
                        },
                      }),
                      React.default.createElement(
                        module13.View,
                        {
                          style: k.editImageContainer,
                        },
                        React.default.createElement(module13.Image, {
                          style: k.editImage,
                          source: n.mapEdit.confirmMenuDeleteImg,
                        })
                      ),
                      React.default.createElement(
                        module13.Text,
                        {
                          style: [
                            k.editTextStyle,
                            {
                              color: n.floorMapItem.editTitleColor,
                            },
                          ],
                        },
                        module510.map_edit_delete
                      )
                    ),
                p = React.default.createElement(
                  module13.View,
                  {
                    style: {
                      flexDirection: 'row',
                    },
                  },
                  c,
                  module390.default.isUnsaveMapReasonSupported() && f
                ),
                M = React.default.createElement(
                  module13.View,
                  {
                    style: {
                      flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                    },
                  },
                  u,
                  p
                ),
                S = React.default.createElement(module1124.MultiFloorEnableTipsView, {
                  ref: function (n) {
                    t.mapSavingHintView = n;
                  },
                  parent: this,
                });
              return React.default.createElement(
                module13.View,
                {
                  style: [
                    {
                      flexDirection: 'column',
                      marginTop: 10,
                      backgroundColor: n.componentBackgroundColor,
                    },
                    k.border,
                  ],
                },
                M,
                React.default.createElement(
                  module13.View,
                  {
                    style: {
                      height: 220,
                      justifyContent: 'center',
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                      paddingBottom: 20,
                    },
                    pointerEvents: 'none',
                  },
                  React.default.createElement(module1124.MapView, {
                    top: 0,
                    style: {
                      flex: 1,
                      justifyContent: 'center',
                      alignSelf: 'stretch',
                      marginTop: 10,
                      backgroundColor: 'transparent',
                    },
                    parent: this,
                    hideAccessory: true,
                    ref: function (n) {
                      return (t.mapView = n);
                    },
                  })
                ),
                S
              );
            }

            return React.default.createElement(module13.View, null);
          }

          var C = React.default.createElement(
            module13.View,
            {
              style: {
                alignItems: 'center',
                flexDirection: 'column',
                top: 15,
                width: L - 10,
                height: 30,
                marginLeft: 10,
              },
            },
            React.default.createElement(
              module13.Text,
              {
                style: k.tipNoMap,
              },
              module510.no_map_tip
            )
          );
          return React.default.createElement(
            module13.View,
            {
              style: [
                {
                  flexDirection: 'column',
                  width: L,
                  height: L / 1.5,
                  marginTop: 10,
                  backgroundColor: n.componentBackgroundColor,
                },
                k.border,
              ],
            },
            React.default.createElement(
              module13.View,
              {
                style: {
                  width: L - 10,
                  height: L / 1.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              React.default.createElement(module1414, {
                source: n.floorMapItem.retryImg,
                style: {
                  width: 100,
                  height: 100,
                },
              }),
              C
            )
          );
        },
      },
    ]);
    return l;
  })(React.Component);

exports.default = B;
B.contextType = module1199.AppConfigContext;

var P = (function (t) {
  module9.default(l, t);
  var n = I(l);

  function l(t) {
    var o, u;
    module6.default(this, l);
    (u = n.call(this, t)).mapView = null;
    u.state = {
      isMapLoaded: false,
    };
    L = O - 2 * (null != (o = t.padding) ? o : 0);
    return u;
  }

  module7.default(l, [
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        this.mapListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapDidUpdate, function (n) {
          var o;
          t.setState({
            isMapLoaded: true,
          });
          if (!(null == (o = t.mapView)))
            o.setState(
              V(
                V({}, module415.MM.mapData),
                {},
                {
                  robotStatus: module381.RSM.state,
                }
              )
            );
        });
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        this.mapListener.remove();
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.context.theme,
          l = React.default.createElement(
            module13.TouchableOpacity,
            module22.default({}, module391.default.getAccessibilityLabel('map_delete'), {
              style: {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: 30,
                paddingBottom: 10,
              },
              onPress: function () {
                if (t.props.onTapDeleteButton) t.props.onTapDeleteButton();
              },
            }),
            React.default.createElement(
              module13.View,
              {
                style: {
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                },
              },
              React.default.createElement(module13.Image, {
                style: {
                  width: 14.5,
                  height: 18,
                },
                source: n.floorMapItem.deleteImg,
              })
            ),
            React.default.createElement(
              module13.Text,
              {
                style: {
                  color: 'rgba(54, 54, 54, 1)',
                  fontSize: 12,
                  marginTop: 9,
                },
              },
              module510.rubys_history_del_button
            )
          ),
          s = React.default.createElement(
            module13.View,
            {
              style: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                paddingHorizontal: 30,
                marginTop: 20,
              },
            },
            React.default.createElement(
              module13.View,
              {
                style: {
                  flexDirection: 'row',
                  marginLeft: 5,
                  marginRight: 20,
                  flex: 1,
                },
              },
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    color: 'rgba(54, 54, 54, 1)',
                    fontSize: module391.default.scaledPixelForPad(17),
                    alignSelf: 'center',
                  },
                  numberOfLines: 1,
                },
                this.props && this.props.name
              )
            )
          );

        if (module381.RSM.mapStatus != module381.MapStatus.None) {
          var u = React.default.createElement(
            module13.View,
            {
              style: {
                flexDirection: 'column',
                width: L,
                backgroundColor: 'white',
                borderRadius: 2,
              },
            },
            s,
            this.state.isMapLoaded
              ? React.default.createElement(
                  module13.View,
                  {
                    style: {
                      height: 230,
                      justifyContent: 'flex-start',
                      paddingHorizontal: 30,
                    },
                    pointerEvents: 'none',
                  },
                  React.default.createElement(module1124.MapView, {
                    top: 0,
                    style: {
                      flex: 1,
                      justifyContent: 'center',
                      alignSelf: 'stretch',
                      marginTop: 10,
                    },
                    parent: this,
                    hideAccessory: true,
                    ref: function (n) {
                      return (t.mapView = n);
                    },
                  })
                )
              : React.default.createElement(
                  module13.View,
                  {
                    style: {
                      width: L - 10,
                      height: 230,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  },
                  React.default.createElement(module385.Spinner, null)
                ),
            this.state.isMapLoaded
              ? React.default.createElement(
                  module13.View,
                  {
                    style: {
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignContent: 'center',
                    },
                  },
                  l
                )
              : React.default.createElement(module13.View, null)
          );
          return React.default.createElement(
            module13.View,
            {
              style: [
                {
                  marginTop: 16,
                },
                k.border,
              ],
            },
            u
          );
        }

        var c = React.default.createElement(
          module13.View,
          {
            style: {
              alignItems: 'center',
              flexDirection: 'column',
              position: 'absolute',
              top: 0.5 * L,
              width: L,
              height: 30,
            },
          },
          React.default.createElement(
            module13.Text,
            {
              style: k.tipNoMap,
            },
            module510.no_map_tip
          )
        );
        return React.default.createElement(
          module13.View,
          {
            style: [
              {
                flexDirection: 'column',
                width: L,
                height: L / 1.5,
                marginTop: 10,
                backgroundColor: 'white',
              },
              k.border,
            ],
          },
          React.default.createElement(
            module13.View,
            {
              style: {
                width: L - 10,
                height: L / 2,
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            React.default.createElement(module1414, {
              source: n.floorMapItem.retryImg,
              style: {
                width: 100,
                height: 100,
              },
            })
          ),
          c
        );
      },
    },
  ]);
  return l;
})(React.Component);

exports.SingleMapEmptyMapItem = P;
P.contextType = module1199.AppConfigContext;
var k = module13.StyleSheet.create({
  tipWrap: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  border: {
    borderRadius: 8,
  },
  tipIcon: {
    width: 90,
    height: 90,
    marginBottom: 30,
  },
  tipText: {
    color: 'rgba(0,0,0,0.6)',
    marginHorizontal: 20,
    textAlign: 'center',
  },
  stopTaskButton: {
    paddingHorizontal: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    borderWidth: 1,
    alignSelf: 'center',
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
  tipNoMap: {
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(93, 92, 93, 1)',
  },
});

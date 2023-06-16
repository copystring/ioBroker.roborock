var module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
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
    var o = S(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, s, c);
        else l[s] = t[s];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module377 = require('./377'),
  module1231 = require('./1231'),
  module387 = require('./387'),
  module1233 = require('./1233'),
  module411 = require('./411'),
  module506 = require('./506'),
  module383 = require('./383');

function S(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (S = function (t) {
    return t ? o : n;
  })(t);
}

function V(t, n) {
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

function I(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      V(Object(l), true).forEach(function (n) {
        module49.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      V(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function T(t) {
  var n = j();
  return function () {
    var o,
      l = module11.default(t);

    if (n) {
      var u = module11.default(this).constructor;
      o = Reflect.construct(l, arguments, u);
    } else o = l.apply(this, arguments);

    return module9.default(this, o);
  };
}

function j() {
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

require('./389');

var module491 = require('./491').strings,
  module1267 = require('./1267'),
  _ = module12.Dimensions.get('window').width,
  k = _,
  B = (function (t) {
    module7.default(c, t);
    var o = T(c);

    function c(t) {
      var n;
      module4.default(this, c);
      (n = o.call(this, t)).state = {
        hasCurrentMap: module377.RSM.mapStatus != module377.MapStatus.None,
        isNewMap: -1 == module377.RSM.currentMapId,
        isRunning: module377.RSM.isRunning,
        hasMap: !!t.hasMap && t.hasMap,
      };
      return n;
    }

    module5.default(c, [
      {
        key: 'updateMap',
        value: function () {
          if (this.mapView) this.mapView.setState(I({}, module1231.MapManager.sharedManager().mapData));
        },
      },
      {
        key: 'manualSave',
        value: function () {
          if (this.props.onTapSaveButton) this.props.onTapSaveButton();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme;
          o.floorMapItem.retryButtonTitleColor;
          o.floorMapItem.retryButtonBorderColor;

          if (0 != this.state.hasCurrentMap || this.state.hasMap) {
            if (this.state.hasCurrentMap && this.state.isNewMap) {
              var l = React.default.createElement(
                  module12.View,
                  {
                    style: {
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignContent: 'flex-start',
                      paddingHorizontal: 20,
                      minHeight: 65,
                    },
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        flexDirection: 'row',
                        marginTop: 16,
                        alignItems: 'flex-start',
                      },
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        style: {
                          color: o.emptyMapItem.titleColor,
                          fontSize: module387.default.scaledPixel(17),
                          alignSelf: 'flex-start',
                        },
                      },
                      module491.multi_floors_change
                    ),
                    this.state.isRunning
                      ? React.default.createElement(module12.View, null)
                      : React.default.createElement(module381.PureImageButton, {
                          funcId: 'qa_about_map',
                          image: o.emptyMapItem.aboutImg,
                          color: 'rgba(0,0,0,0.6)',
                          imageWidth: 15,
                          imageHeight: 15,
                          style: {
                            width: 15,
                            height: 15,
                            alignSelf: 'center',
                            marginLeft: 10,
                          },
                          onPress: function () {
                            return (
                              t.mapSavingHintView &&
                              t.mapSavingHintView.setState({
                                shouldShow: true,
                              })
                            );
                          },
                        })
                  ),
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        minHeight: 20,
                        marginBottom: 5,
                        marginTop: 5,
                      },
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        style: {
                          color: o.emptyMapItem.descColor,
                          alignSelf: 'center',
                          fontSize: 14,
                          maxWidth: _ - 120,
                        },
                      },
                      this.state.isRunning ? module491.map_in_changing : module491.no_map_status_description
                    )
                  )
                ),
                u = this.state.isRunning
                  ? React.default.createElement(module12.View, null)
                  : React.default.createElement(
                      module12.TouchableOpacity,
                      module21.default({}, module387.default.getAccessibilityLabel('map_save'), {
                        style: R.editButton,
                        onPress: function () {
                          module383.LogEventCommon('map_save');
                          t.manualSave();
                        },
                      }),
                      React.default.createElement(
                        module12.View,
                        {
                          style: R.editImageContainer,
                        },
                        React.default.createElement(module12.Image, {
                          style: R.editImage,
                          source: o.floorMapItem.saveImg,
                        })
                      ),
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            R.editTextStyle,
                            {
                              color: o.floorMapItem.editTitleColor,
                            },
                          ],
                        },
                        module491.map_edit_button_text_save
                      )
                    ),
                s = React.default.createElement(
                  module12.View,
                  {
                    style: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                  },
                  l,
                  u
                ),
                c = React.default.createElement(module1233.MultiFloorEnableTipsView, {
                  ref: function (n) {
                    t.mapSavingHintView = n;
                  },
                  parent: this,
                });
              return React.default.createElement(
                module12.View,
                {
                  style: {
                    flexDirection: 'column',
                    width: k,
                    marginTop: 10,
                    backgroundColor: o.componentBackgroundColor,
                  },
                },
                React.default.createElement(module12.View, {
                  style: {
                    height: 0.8,
                    backgroundColor: o.settingListItem.borderColor,
                  },
                }),
                s,
                React.default.createElement(
                  module12.View,
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
                  React.default.createElement(module1233.MapView, {
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
                c,
                React.default.createElement(module12.View, {
                  style: {
                    height: 0.8,
                    backgroundColor: o.settingListItem.borderColor,
                  },
                })
              );
            }

            return React.default.createElement(module12.View, null);
          }

          var f = React.default.createElement(
            module12.View,
            {
              style: {
                alignItems: 'center',
                flexDirection: 'column',
                top: 15,
                width: k - 10,
                height: 30,
              },
            },
            React.default.createElement(
              module12.Text,
              {
                style: {
                  marginLeft: 10,
                  fontSize: 14,
                  color: 'rgba(93, 92, 93, 1)',
                },
              },
              module491.no_map_tip
            )
          );
          return React.default.createElement(
            module12.View,
            {
              style: {
                flexDirection: 'column',
                width: k,
                height: k / 1.5,
                marginTop: 10,
                backgroundColor: o.componentBackgroundColor,
                borderTopColor: o.settingListItem.borderColor,
                borderBottomColor: o.settingListItem.borderColor,
                borderTopWidth: 0.8,
                borderBottomWidth: 0.8,
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: {
                  width: k - 10,
                  height: k / 1.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              React.default.createElement(module1267, {
                source: o.floorMapItem.retryImg,
                style: {
                  width: 100,
                  height: 100,
                },
              }),
              f
            )
          );
        },
      },
    ]);
    return c;
  })(React.Component);

exports.default = B;
B.contextType = module506.AppConfigContext;

var P = (function (t) {
  module7.default(c, t);
  var o = T(c);

  function c(t) {
    var n;
    module4.default(this, c);
    (n = o.call(this, t)).mapView = null;
    n.state = {
      isMapLoaded: false,
    };
    return n;
  }

  module5.default(c, [
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        this.mapListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (n) {
          t.setState({
            isMapLoaded: true,
          });
          if (t.mapView)
            t.mapView.setState(
              I(
                I({}, module1231.MapManager.sharedManager().mapData),
                {},
                {
                  robotStatus: module377.RSM.state,
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
          o = this.context.theme,
          l = React.default.createElement(
            module12.TouchableOpacity,
            module21.default({}, module387.default.getAccessibilityLabel('map_delete'), {
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
              module12.View,
              {
                style: {
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                },
              },
              React.default.createElement(module12.Image, {
                style: {
                  width: 14.5,
                  height: 18,
                },
                source: o.floorMapItem.deleteImg,
              })
            ),
            React.default.createElement(
              module12.Text,
              {
                style: {
                  color: 'rgba(54, 54, 54, 1)',
                  fontSize: 12,
                  marginTop: 9,
                },
              },
              module491.rubys_history_del_button
            )
          ),
          u = React.default.createElement(
            module12.View,
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
              module12.View,
              {
                style: {
                  flexDirection: 'row',
                  marginLeft: 5,
                  marginRight: 20,
                  flex: 1,
                },
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    color: 'rgba(54, 54, 54, 1)',
                    fontSize: module387.default.scaledPixel(17),
                    alignSelf: 'center',
                  },
                  numberOfLines: 1,
                },
                this.props && this.props.name
              )
            )
          );

        if (module377.RSM.mapStatus != module377.MapStatus.None) {
          var s = React.default.createElement(
            module12.View,
            {
              style: {
                flexDirection: 'column',
                width: k,
                backgroundColor: 'white',
                borderRadius: 2,
              },
            },
            u,
            this.state.isMapLoaded
              ? React.default.createElement(
                  module12.View,
                  {
                    style: {
                      height: 230,
                      justifyContent: 'flex-start',
                      paddingHorizontal: 30,
                    },
                    pointerEvents: 'none',
                  },
                  React.default.createElement(module1233.MapView, {
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
                  module12.View,
                  {
                    style: {
                      width: k - 10,
                      height: 230,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  },
                  React.default.createElement(module381.Spinner, null)
                ),
            this.state.isMapLoaded
              ? React.default.createElement(
                  module12.View,
                  {
                    style: {
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignContent: 'center',
                    },
                  },
                  l
                )
              : React.default.createElement(module12.View, null)
          );
          return React.default.createElement(
            module12.View,
            {
              style: {
                marginTop: 16,
              },
            },
            s
          );
        }

        var c = React.default.createElement(
          module12.View,
          {
            style: {
              alignItems: 'center',
              flexDirection: 'column',
              position: 'absolute',
              top: 0.5 * k,
              width: k,
              height: 30,
            },
          },
          React.default.createElement(
            module12.Text,
            {
              style: {
                fontSize: 14,
                color: 'rgba(93, 92, 93, 1)',
              },
            },
            module491.no_map_tip
          )
        );
        return React.default.createElement(
          module12.View,
          {
            style: {
              flexDirection: 'column',
              width: k,
              height: k / 1.5,
              marginTop: 10,
              backgroundColor: 'white',
            },
          },
          React.default.createElement(
            module12.View,
            {
              style: {
                width: k - 10,
                height: k / 2,
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            React.default.createElement(module1267, {
              source: o.floorMapItem.retryImg,
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
  return c;
})(React.Component);

exports.SingleMapEmptyMapItem = P;
P.contextType = module506.AppConfigContext;
var R = module12.StyleSheet.create({
  tipWrap: {
    alignItems: 'center',
    paddingVertical: 20,
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
    width: 50,
    marginRight: 5,
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

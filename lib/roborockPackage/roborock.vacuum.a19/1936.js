var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = E(o);
    if (n && n.has(t)) return n.get(t);
    var l = {},
      p = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var c = p ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, s, c);
        else l[s] = t[s];
      }

    l.default = t;
    if (n) n.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module1233 = require('./1233'),
  module1366 = require('./1366'),
  module387 = require('./387'),
  module506 = require('./506'),
  module383 = require('./383');

function E(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (E = function (t) {
    return t ? n : o;
  })(t);
}

function b() {
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

var module491 = require('./491').strings,
  C = module12.Dimensions.get('window').width,
  D = {
    Loading: 0,
    Success: 1,
    Failed: 2,
  },
  B = (function (t) {
    module7.default(R, t);

    var module506 = R,
      E = b(),
      B = function () {
        var t,
          o = module11.default(module506);

        if (E) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var o;
      module4.default(this, R);
      (o = B.call(this, t)).mapIndex = 0;
      o.mapSequence = 0;
      o.mapView = null;
      o.state = {
        mapID: t.mapID,
        name: t.name,
        mapImageExist: false,
        mapViewContent: null,
        status: D.Loading,
        mapTime: t.mapTime,
        showRecoverButton: t.showRecoverButton,
        showNameEditButton: t.showNameEditButton,
        showDeleteButton: t.showDeleteButton,
      };
      return o;
    }

    module5.default(R, [
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          if (this.state.showRecoverButton != t.showRecoverButton)
            this.setState({
              showRecoverButton: t.showRecoverButton,
            });
        },
      },
      {
        key: 'UNSAFE_componentWillUpdate',
        value: function () {},
      },
      {
        key: 'componentDidUpdate',
        value: function () {
          if (this.props.mapData && this.mapView) this.mapView.setState(this.props.mapData);
        },
      },
      {
        key: '_editSelectMap',
        value: function (t) {
          if (this.props.onTapEditMap) this.props.onTapEditMap(t);
        },
      },
      {
        key: 'refetchMap',
        value: function () {
          if (this.props.onTapRetry) this.props.onTapRetry(this.props.mapID);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            l = React.default.createElement(
              module12.TouchableOpacity,
              module21.default({}, module387.default.getAccessibilityLabel('map_edit'), {
                style: M.editButton,
                onPress: function () {
                  module383.LogEventCommon('edit_map', {
                    mapId: t.props.mapID,
                  });

                  t._editSelectMap(t.props.mapID);
                },
              }),
              React.default.createElement(
                module12.View,
                {
                  style: M.editImageContainer,
                },
                React.default.createElement(module12.Image, {
                  style: M.editImage,
                  source: n.floorMapItem.editImg,
                })
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    M.editTextStyle,
                    {
                      color: n.floorMapItem.editTitleColor,
                    },
                  ],
                },
                module491.multi_floor_edit
              )
            ),
            p = React.default.createElement(
              module12.TouchableOpacity,
              module21.default({}, module387.default.getAccessibilityLabel('map_retry_' + this.props.mapID), {
                style: M.editButton,
                onPress: function () {
                  t.refetchMap();
                },
              }),
              React.default.createElement(
                module12.View,
                {
                  style: M.editImageContainer,
                },
                React.default.createElement(module12.Image, {
                  style: M.editImage,
                  source: n.floorMapItem.reloadImg,
                })
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    M.editTextStyle,
                    {
                      color: n.floorMapItem.editTitleColor,
                    },
                  ],
                },
                module491.button_title_retry
              )
            ),
            s = React.default.createElement(
              module12.View,
              {
                style: {
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignContent: 'center',
                  paddingLeft: 20,
                  paddingRight: 20,
                  flex: 1,
                },
              },
              React.default.createElement(
                module12.View,
                {
                  style: {
                    flexDirection: 'row',
                    marginLeft: globals.isRTL ? 20 : 0,
                    marginRight: globals.isRTL ? 0 : 20,
                    marginTop: 16,
                    flex: 1,
                    alignSelf: globals.isRTL ? 'flex-end' : 'flex-start',
                  },
                },
                React.default.createElement(
                  module12.Text,
                  module21.default({}, module387.default.getAccessibilityLabel('map_name_' + this.props.mapID), {
                    style: {
                      color: n.floorMapItem.mapTitleColor,
                      fontSize: module387.default.scaledPixel(16),
                      alignSelf: 'center',
                    },
                    numberOfLines: 1,
                  }),
                  this.props && this.props.name
                )
              ),
              this.props.mapTime
                ? React.default.createElement(
                    module12.View,
                    {
                      style: {
                        marginTop: 3,
                        alignSelf: globals.isRTL ? 'flex-end' : 'flex-start',
                      },
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        style: {
                          color: n.floorMapItem.mapTimeColor,
                          fontSize: 14,
                        },
                      },
                      module1366.formatWithMillis(1e3 * this.props.mapTime, 'YYYY/MM/DD HH:mm')
                    )
                  )
                : React.default.createElement(module12.View, null)
            ),
            c = null == this.props.mapData || undefined == this.props.mapData ? React.default.createElement(module12.View, null) : '' == this.props.mapData ? p : l,
            T = React.default.createElement(
              module12.View,
              {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              },
              s,
              c
            ),
            E = React.default.createElement(
              module12.View,
              {
                style: {
                  flexDirection: 'column',
                  width: C,
                  backgroundColor: n.componentBackgroundColor,
                  borderRadius: 2,
                },
              },
              T,
              null == t.props.mapData || undefined == t.props.mapData
                ? React.default.createElement(
                    module12.View,
                    {
                      style: {
                        height: 230,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 30,
                      },
                    },
                    React.default.createElement(module381.Spinner, null)
                  )
                : '' == t.props.mapData
                ? React.default.createElement(
                    module12.View,
                    {
                      style: M.tipWrap,
                    },
                    React.default.createElement(module12.Image, {
                      source: t.context.theme.floorMapItem.retryImg,
                      style: M.tipIcon,
                    }),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          M.tipText,
                          {
                            color: t.context.theme.floorMapItem.retryTitleColor,
                          },
                        ],
                      },
                      module491.reset_map_getlist_fail
                    )
                  )
                : React.default.createElement(
                    module12.View,
                    {
                      style: {
                        height: 230,
                        justifyContent: 'flex-start',
                        paddingHorizontal: 30,
                        paddingTop: 10,
                        paddingBottom: 15,
                        backgroundColor: n.componentBackgroundColor,
                      },
                      pointerEvents: 'none',
                    },
                    React.default.createElement(module1233.MapView, {
                      top: 0,
                      initSize: {
                        height: 195,
                        width: C - 60,
                      },
                      style: {
                        flex: 1,
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                        marginTop: 10,
                        backgroundColor: n.componentBackgroundColor,
                      },
                      parent: t,
                      ref: function (o) {
                        return (t.mapView = o);
                      },
                      hideAccessory: true,
                      mapID: t.props.mapID,
                    })
                  ),
              this.props.mapData
                ? React.default.createElement(module12.View, {
                    style: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 20,
                      paddingHorizontal: 20,
                    },
                  })
                : React.default.createElement(module12.View, null)
            );
          return React.default.createElement(
            module12.View,
            {
              style: {
                marginTop: 10,
                backgroundColor: n.componentBackgroundColor,
                borderTopWidth: 0.8,
                borderBottomWidth: 0.8,
                borderColor: n.settingListItem.borderColor,
              },
            },
            E
          );
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = B;
B.contextType = module506.AppConfigContext;
var M = module12.StyleSheet.create({
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
    marginTop: 10,
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

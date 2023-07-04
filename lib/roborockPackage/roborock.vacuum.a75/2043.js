var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1124 = require('./1124'),
  module1642 = require('./1642'),
  module391 = require('./391'),
  module1199 = require('./1199'),
  module387 = require('./387');

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
  C = module13.Dimensions.get('window').width - 30,
  b = {
    Loading: 0,
    Success: 1,
    Failed: 2,
  },
  R = (function (t) {
    module9.default(_, t);

    var o = _,
      module1199 = D(),
      R = function () {
        var t,
          n = module12.default(o);

        if (module1199) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function _(t) {
      var o;
      module6.default(this, _);
      (o = R.call(this, t)).mapIndex = 0;
      o.mapSequence = 0;
      o.mapView = null;
      o.state = {
        mapID: t.mapID,
        name: t.name,
        mapImageExist: false,
        mapViewContent: null,
        status: b.Loading,
        mapTime: t.mapTime,
        showRecoverButton: t.showRecoverButton,
        showNameEditButton: t.showNameEditButton,
        showDeleteButton: t.showDeleteButton,
      };
      return o;
    }

    module7.default(_, [
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
            o = this.context.theme,
            l = React.default.createElement(
              module13.TouchableOpacity,
              module22.default({}, module391.default.getAccessibilityLabel('map_edit'), {
                style: S.editButton,
                onPress: function () {
                  module387.LogEventCommon('edit_map', {
                    mapId: t.props.mapID,
                  });

                  t._editSelectMap(t.props.mapID);
                },
              }),
              React.default.createElement(
                module13.View,
                {
                  style: S.editImageContainer,
                },
                React.default.createElement(module13.Image, {
                  style: S.editImage,
                  source: o.floorMapItem.editImg,
                })
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    S.editTextStyle,
                    {
                      color: o.floorMapItem.editTitleColor,
                    },
                  ],
                },
                module510.multi_floor_edit
              )
            ),
            p = React.default.createElement(
              module13.TouchableOpacity,
              module22.default({}, module391.default.getAccessibilityLabel('map_retry_' + this.props.mapID), {
                style: S.editButton,
                onPress: function () {
                  t.refetchMap();
                },
              }),
              React.default.createElement(
                module13.View,
                {
                  style: S.editImageContainer,
                },
                React.default.createElement(module13.Image, {
                  style: S.editImage,
                  source: o.floorMapItem.reloadImg,
                })
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    S.editTextStyle,
                    {
                      color: o.floorMapItem.editTitleColor,
                    },
                  ],
                },
                module510.button_title_retry
              )
            ),
            s = React.default.createElement(
              module13.View,
              {
                style: {
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignContent: 'center',
                  paddingRight: globals.isRTL ? 0 : 20,
                  paddingLeft: globals.isRTL ? 20 : 0,
                  flex: 1,
                },
              },
              React.default.createElement(
                module13.View,
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
                  module13.Text,
                  module22.default({}, module391.default.getAccessibilityLabel('map_name_' + this.props.mapID), {
                    style: {
                      color: o.floorMapItem.mapTitleColor,
                      fontSize: module391.default.scaledPixelForPad(16),
                      alignSelf: 'center',
                    },
                    numberOfLines: 1,
                  }),
                  this.props && this.props.name
                )
              ),
              this.props.mapTime
                ? React.default.createElement(
                    module13.View,
                    {
                      style: {
                        marginTop: 3,
                        alignSelf: globals.isRTL ? 'flex-end' : 'flex-start',
                      },
                    },
                    React.default.createElement(
                      module13.Text,
                      {
                        style: {
                          color: o.floorMapItem.mapTimeColor,
                          fontSize: 14,
                        },
                      },
                      module1642.formatWithMillis(1e3 * this.props.mapTime, 'YYYY/MM/DD HH:mm')
                    )
                  )
                : React.default.createElement(module13.View, null)
            ),
            c = null == this.props.mapData || undefined == this.props.mapData ? React.default.createElement(module13.View, null) : '' == this.props.mapData ? p : l,
            u = React.default.createElement(
              module13.View,
              {
                style: {
                  flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                },
              },
              s,
              c
            ),
            E = React.default.createElement(
              module13.View,
              {
                style: {
                  flexDirection: 'column',
                  backgroundColor: o.componentBackgroundColor,
                  borderRadius: 2,
                },
              },
              u,
              null == t.props.mapData || undefined == t.props.mapData
                ? React.default.createElement(
                    module13.View,
                    {
                      style: {
                        height: 230,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 30,
                      },
                    },
                    React.default.createElement(module385.Spinner, null)
                  )
                : '' == t.props.mapData
                ? React.default.createElement(
                    module13.View,
                    {
                      style: S.tipWrap,
                    },
                    React.default.createElement(module13.Image, {
                      source: t.context.theme.floorMapItem.retryImg,
                      style: S.tipIcon,
                    }),
                    React.default.createElement(
                      module13.Text,
                      {
                        style: [
                          S.tipText,
                          {
                            color: t.context.theme.floorMapItem.retryTitleColor,
                          },
                        ],
                      },
                      module510.reset_map_getlist_fail
                    )
                  )
                : React.default.createElement(
                    module13.TouchableOpacity,
                    {
                      onPress: function () {
                        t._editSelectMap(t.props.mapID);
                      },
                      activeOpacity: 1,
                    },
                    React.default.createElement(
                      module13.View,
                      {
                        style: {
                          height: 230,
                          justifyContent: 'flex-start',
                          paddingHorizontal: 30,
                          paddingTop: 10,
                          paddingBottom: 15,
                          backgroundColor: o.componentBackgroundColor,
                        },
                        pointerEvents: 'none',
                      },
                      React.default.createElement(module1124.MapView, {
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
                          backgroundColor: o.componentBackgroundColor,
                        },
                        parent: t,
                        ref: function (o) {
                          return (t.mapView = o);
                        },
                        hideAccessory: true,
                        mapID: t.props.mapID,
                      })
                    )
                  ),
              this.props.mapData
                ? React.default.createElement(module13.View, {
                    style: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 20,
                      paddingHorizontal: 20,
                    },
                  })
                : React.default.createElement(module13.View, null),
              this.props.showARButton
                ? React.default.createElement(
                    module13.TouchableOpacity,
                    {
                      style: {
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                      },
                      onPress: function () {
                        var o;
                        return null == (o = t.props) ? undefined : null == o.onTapAR ? undefined : o.onTapAR(t.props.mapID);
                      },
                    },
                    React.default.createElement(
                      module13.Text,
                      module22.default({}, module391.default.getAccessibilityLabel('map_AR_' + this.props.mapID), {
                        style: {
                          color: o.floorMapItem.mapTitleColor,
                          fontSize: module391.default.scaledPixel(16),
                          alignSelf: 'center',
                        },
                        numberOfLines: 1,
                      }),
                      module510.map_edit_AR
                    )
                  )
                : React.default.createElement(module13.View, null)
            );
          return React.default.createElement(
            module13.View,
            {
              style: {
                marginTop: 10,
                backgroundColor: o.componentBackgroundColor,
                borderRadius: 8,
                overflow: 'hidden',
              },
            },
            E
          );
        },
      },
    ]);
    return _;
  })(React.Component);

exports.default = R;
R.contextType = module1199.AppConfigContext;
var S = module13.StyleSheet.create({
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
    marginTop: 10,
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

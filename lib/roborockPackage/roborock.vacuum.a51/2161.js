require('./391');

require('./390');

require('./394');

require('./424');

var module50 = require('./50'),
  module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module416 = require('./416'),
  module1193 = require('./1193');

require('./1337');

function b(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function P(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      b(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      b(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

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

require('./393');

var module510 = require('./510').strings,
  O = (function (t) {
    module9.default(b, t);

    var n = b,
      module50 = S(),
      I = function () {
        var t,
          s = module12.default(n);

        if (module50) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(s, arguments, l);
        } else t = s.apply(this, arguments);

        return module11.default(this, t);
      };

    function b(t) {
      var n;
      module6.default(this, b);
      var o = (n = I.call(this, t)).props.navigation.state.params || {},
        s = o.ssid,
        l = o.ip,
        f = o.mac,
        u = o.rssi;
      n.state = {
        ssid: s,
        ip: l,
        mac: f,
        rssi: u,
        wifiItems: [],
      };
      return n;
    }

    module7.default(b, [
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            title: module510.wifi_page_title,
          });
        },
      },
      {
        key: 'getWifiList',
        value: function () {
          var t,
            n = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getWifiList());

                  case 3:
                    t = o.sent;
                    this.setState({
                      wifiItems: t.result.filter(function (t) {
                        return t.ssid != n.state.ssid;
                      }),
                    });
                    console.log('getWifiList', t);
                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    console.log('getWifiList error', o.t0);

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
        key: 'delWifi',
        value: function (t) {
          var n,
            o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (!(null == (n = globals)))
                      n.Alert.customAlert(
                        '',
                        module510.warning_for_will_delete_wifi,
                        function () {
                          var n, s;
                          return regeneratorRuntime.default.async(
                            function (c) {
                              for (;;)
                                switch ((c.prev = c.next)) {
                                  case 0:
                                    c.prev = 0;
                                    c.next = 3;
                                    return regeneratorRuntime.default.awrap(module416.default.deleteWifi(t));

                                  case 3:
                                    n = c.sent;
                                    (s = JSON.parse(JSON.stringify(o.state.wifiItems))).splice(
                                      s.findIndex(function (n) {
                                        return n.id == t;
                                      }),
                                      1
                                    );
                                    o.setState({
                                      wifiItems: s,
                                    });
                                    console.log('delWifi', n);
                                    c.next = 13;
                                    break;

                                  case 10:
                                    c.prev = 10;
                                    c.t0 = c.catch(0);
                                    console.log('delWifi error', c.t0);

                                  case 13:
                                  case 'end':
                                    return c.stop();
                                }
                            },
                            null,
                            null,
                            [[0, 10]],
                            Promise
                          );
                        },
                        null,
                        {
                          confirmTitle: module510.localization_strings_Setting_RemoteControlPage_51,
                        }
                      );

                  case 1:
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
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.getWifiList();
        },
      },
      {
        key: 'onPressItem',
        value: function (t) {
          var n;
          module13.Clipboard.setString(t);
          if (!(null == (n = globals))) n.showToast(module510.debug_info_copy_success);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = this.state.wifiItems,
            l = undefined === o ? [] : o,
            c = this.wifiInfoItems.map(function (t, n) {
              return React.default.createElement(
                module385.SettingListItemView,
                module22.default({}, t, {
                  key: 'wifi_info_item_' + n,
                  titleColor: 'rgba(0,0,0,0.8)',
                })
              );
            }),
            f = l.map(function (o, s) {
              return React.default.createElement(
                module13.View,
                {
                  style: P(
                    P({}, C.wifiItem),
                    {},
                    {
                      backgroundColor: n.settingListItem.backgroundColor,
                    }
                  ),
                  key: 'wifi_item_' + s,
                },
                React.default.createElement(
                  module13.Text,
                  {
                    style: P(
                      P({}, C.wifiItemTitle),
                      {},
                      {
                        color: n.settingListItem.titleColor,
                      }
                    ),
                  },
                  'SSID'
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: {
                      flexDirection: 'row',
                    },
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: P(
                        P({}, C.wifiItemValue),
                        {},
                        {
                          color: n.settingListItem.detailColor,
                        }
                      ),
                    },
                    o.ssid
                  ),
                  React.default.createElement(module385.PureButton, {
                    funcId: 'del_wifi_button',
                    style: C.delButton,
                    textColor: n.settingListItem.detailColor,
                    title: 'X',
                    onPress: t.delWifi.bind(t, o.id),
                  })
                )
              );
            });
          return React.default.createElement(
            module13.View,
            {
              style: P(
                P({}, C.contentView),
                {},
                {
                  backgroundColor: n.settingBackgroundColor,
                }
              ),
            },
            React.default.createElement(
              module13.ScrollView,
              {
                style: {
                  marginVertical: 20,
                },
              },
              React.default.createElement(
                module13.View,
                {
                  style: C.section,
                },
                React.default.createElement(
                  module13.Text,
                  {
                    style: P(
                      P({}, C.sectionText),
                      {},
                      {
                        color: n.settingListItem.titleColor,
                      }
                    ),
                  },
                  module510.wifi_page_current_wifi
                )
              ),
              React.default.createElement(
                module13.View,
                {
                  style: C.wifiInfoWrap,
                },
                c
              ),
              l.length > 0 &&
                React.default.createElement(
                  module13.View,
                  {
                    style: C.section,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: P(
                        P({}, C.sectionText),
                        {},
                        {
                          color: n.settingListItem.titleColor,
                        }
                      ),
                    },
                    module510.wifi_page_others_wifi
                  )
                ),
              c.length > 0 && React.default.createElement(module13.View, null, f)
            )
          );
        },
      },
      {
        key: 'wifiInfoItems',
        get: function () {
          var t = this,
            n = this.state,
            o = n.ssid,
            s = n.ip,
            l = n.mac,
            c = n.rssi;
          return [
            {
              title: module510.localization_strings_Setting_General_NetInfoPage_0,
              funcId: 'wifi_ssid',
              detail: o,
              detailWidth: 200,
              onPress: function () {
                return t.onPressItem(o);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module510.wifi_rssi_title,
              funcId: 'wifi_rssi',
              detail: c,
              detailWidth: 240,
              onPress: function () {
                return t.onPressItem(c + '');
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module510.localization_strings_Setting_General_NetInfoPage_1,
              funcId: 'wifi_ip_address',
              detail: s,
              detailWidth: 240,
              onPress: function () {
                return t.onPressItem(s);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module510.localization_strings_Setting_General_NetInfoPage_2,
              funcId: 'wifi_mac_address',
              detail: l,
              detailWidth: 240,
              onPress: function () {
                return t.onPressItem(l);
              },
              shouldShowRightArrow: false,
              shouldShowBottomLine: false,
              visible: true,
            },
          ];
        },
      },
    ]);
    return b;
  })(React.Component);

exports.default = O;
O.contextType = module1193.AppConfigContext;
var C = module13.StyleSheet.create({
  contentView: {
    width: module13.Dimensions.get('window').width,
    height: module13.Dimensions.get('window').height,
  },
  wifiInfoWrap: {
    borderRadius: 14,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  section: {
    marginHorizontal: 22,
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
  wifiItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  wifiItemTitle: {
    fontSize: 16,
  },
  wifiItemValue: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.5)',
    marginRight: 20,
  },
  delButton: {
    backgroundColor: 'transparent',
  },
});

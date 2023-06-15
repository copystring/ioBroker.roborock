require('./391');

require('./390');

require('./394');

require('./423');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module415 = require('./415'),
  module1121 = require('./1121');

require('./1265');

function I() {
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

var module393 = require('./393'),
  module505 = require('./505').strings,
  W = (function (t) {
    module7.default(P, t);

    var n = P,
      module1121 = I(),
      W = function () {
        var t,
          l = module11.default(n);

        if (module1121) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(l, arguments, s);
        } else t = l.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);
      var l = (n = W.call(this, t)).props.navigation.state.params || {},
        s = l.ssid,
        f = l.ip,
        u = l.mac,
        c = l.rssi;
      n.state = {
        ssid: s,
        ip: f,
        mac: u,
        rssi: c,
        wifiItems: [],
      };
      return n;
    }

    module5.default(P, [
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            title: module505.wifi_page_title,
          });
        },
      },
      {
        key: 'getWifiList',
        value: function () {
          var t,
            n = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getWifiList());

                  case 3:
                    t = l.sent;
                    this.setState({
                      wifiItems: t.result.filter(function (t) {
                        return t.ssid != n.state.ssid;
                      }),
                    });
                    console.log('getWifiList', t);
                    l.next = 11;
                    break;

                  case 8:
                    l.prev = 8;
                    l.t0 = l.catch(0);
                    console.log('getWifiList error', l.t0);

                  case 11:
                  case 'end':
                    return l.stop();
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
            l = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (!(null == (n = globals)))
                      n.Alert.customAlert(
                        '',
                        module505.warning_for_will_delete_wifi,
                        function () {
                          var n, o;
                          return regeneratorRuntime.default.async(
                            function (f) {
                              for (;;)
                                switch ((f.prev = f.next)) {
                                  case 0:
                                    f.prev = 0;
                                    f.next = 3;
                                    return regeneratorRuntime.default.awrap(module415.default.deleteWifi(t));

                                  case 3:
                                    n = f.sent;
                                    (o = JSON.parse(JSON.stringify(l.state.wifiItems))).splice(
                                      o.findIndex(function (n) {
                                        return n.id == t;
                                      }),
                                      1
                                    );
                                    l.setState({
                                      wifiItems: o,
                                    });
                                    console.log('delWifi', n);
                                    f.next = 13;
                                    break;

                                  case 10:
                                    f.prev = 10;
                                    f.t0 = f.catch(0);
                                    console.log('delWifi error', f.t0);

                                  case 13:
                                  case 'end':
                                    return f.stop();
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
                          confirmTitle: module505.localization_strings_Setting_RemoteControlPage_51,
                        }
                      );

                  case 1:
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
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.getWifiList();
        },
      },
      {
        key: 'render',
        value: function () {
          this.context.theme;
          var t = this,
            n = this.state.wifiItems,
            s = undefined === n ? [] : n,
            o = this.wifiInfoItems.map(function (t, n) {
              return React.default.createElement(
                module385.SettingListItemView,
                module22.default({}, t, {
                  key: 'wifi_info_item_' + n,
                  titleColor: 'rgba(0,0,0,0.8)',
                })
              );
            }),
            f = s.map(function (n, l) {
              return React.default.createElement(
                module12.View,
                {
                  style: b.wifiItem,
                  key: 'wifi_item_' + l,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: b.wifiItemTitle,
                  },
                  'SSID'
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      flexDirection: 'row',
                    },
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: b.wifiItemValue,
                    },
                    n.ssid
                  ),
                  React.default.createElement(module385.PureButton, {
                    style: b.delButton,
                    title: 'X',
                    onPress: t.delWifi.bind(t, n.id),
                  })
                )
              );
            });
          return React.default.createElement(
            module12.View,
            {
              style: b.contentView,
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: {
                  marginVertical: 20,
                },
              },
              React.default.createElement(
                module12.View,
                {
                  style: b.section,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: b.sectionText,
                  },
                  module505.wifi_page_current_wifi
                )
              ),
              React.default.createElement(
                module12.View,
                {
                  style: b.wifiInfoWrap,
                },
                o
              ),
              React.default.createElement(
                module12.View,
                {
                  style: b.section,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: b.sectionText,
                  },
                  module505.wifi_page_others_wifi
                )
              ),
              React.default.createElement(module12.View, null, f)
            )
          );
        },
      },
      {
        key: 'wifiInfoItems',
        get: function () {
          var t = this,
            n = this.state,
            l = n.ssid,
            s = n.ip,
            o = n.mac,
            f = n.rssi;
          return [
            {
              title: module505.localization_strings_Setting_General_NetInfoPage_0,
              funcId: 'wifi_ssid',
              detail: l,
              detailWidth: 300,
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module505.wifi_rssi_title,
              funcId: 'wifi_rssi',
              detail: f,
              detailWidth: 300,
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module505.localization_strings_Setting_General_NetInfoPage_1,
              funcId: 'wifi_ip_address',
              detail: s,
              detailWidth: 300,
              onPress: function () {
                return t.onPressItem(t.state.serialNumber);
              },
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: module505.localization_strings_Setting_General_NetInfoPage_2,
              funcId: 'wifi_mac_address',
              detail: o,
              detailWidth: 300,
              onPress: function () {
                return t.onPressItem(module393.userId);
              },
              shouldShowRightArrow: false,
              shouldShowBottomLine: false,
              visible: true,
            },
          ];
        },
      },
    ]);
    return P;
  })(React.Component);

exports.default = W;
W.contextType = module1121.AppConfigContext;
var b = module12.StyleSheet.create({
  contentView: {
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
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
  delButton: {},
});

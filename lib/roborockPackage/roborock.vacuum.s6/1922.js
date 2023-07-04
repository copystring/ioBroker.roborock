require('./411');

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module502 = require('./502'),
  module381 = require('./381'),
  module407 = require('./407'),
  module387 = require('./387'),
  module390 = require('./390'),
  module415 = require('./415'),
  module506 = require('./506');

function x() {
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

require('./385');

var module936 = require('./936'),
  module389 = require('./389'),
  module491 = require('./491').strings,
  L = (function (t) {
    module7.default(C, t);

    var module506 = C,
      module936 = x(),
      L = function () {
        var t,
          l = module11.default(module506);

        if (module936) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(l, arguments, n);
        } else t = l.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var l;
      module4.default(this, C);
      (l = L.call(this, t)).state = {
        serialNumber: module390.default.sharedCache().serialNumber,
        firmware: ' ',
        area: ' ',
        voice: ' ',
        wifi: ' ',
        log: ' ',
        timezone: ' ',
        bom: ' ',
        profile: ' ',
        featureset: ' ',
        model: ' ',
        codeName: ' ',
      };
      return l;
    }

    module5.default(C, [
      {
        key: 'componentDidMount',
        value: function () {
          this.getSerialNumber();
          this.getObaInfo();
          if (module389.isMiApp) this.getFirmwareVersion();
          else this.getFirmwareVersionRoborock();
          this.setModelAndCodeName();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme;
          return React.default.createElement(
            module12.ScrollView,
            {
              style: [
                V.contentContainerStyle,
                {
                  backgroundColor: t.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(module381.SettingListItemView, {
              title: module502.ObaInfoString.Model,
              shouldShowRightArrow: false,
              detail: this.state.model,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module381.SettingListItemView, {
              title: module502.ObaInfoString.CodeName,
              shouldShowRightArrow: false,
              detail: this.state.codeName,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module381.SettingListItemView, {
              title: module502.ObaInfoString.SerialNumber,
              shouldShowRightArrow: false,
              detail: this.state.serialNumber,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module381.SettingListItemView, {
              title: module502.ObaInfoString.FirmwareVersion,
              shouldShowRightArrow: false,
              detail: this.state.firmware,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module381.SettingListItemView, {
              title: module502.ObaInfoString.Area,
              shouldShowRightArrow: false,
              detail: this.state.area,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module381.SettingListItemView, {
              title: module502.ObaInfoString.Voice,
              shouldShowRightArrow: false,
              detail: this.state.voice,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module381.SettingListItemView, {
              title: module502.ObaInfoString.WIFI,
              shouldShowRightArrow: false,
              detail: this.state.wifi,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module381.SettingListItemView, {
              title: module502.ObaInfoString.Log,
              shouldShowRightArrow: false,
              detail: this.state.log,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module381.SettingListItemView, {
              title: module502.ObaInfoString.TimeZone,
              shouldShowRightArrow: false,
              detail: this.state.timezone,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module381.SettingListItemView, {
              title: module502.ObaInfoString.BOM,
              shouldShowRightArrow: false,
              detail: this.state.bom,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module381.SettingListItemView, {
              title: module502.ObaInfoString.ProfileName,
              shouldShowRightArrow: false,
              detail: this.state.profile,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module381.SettingListItemView, {
              title: module502.ObaInfoString.FeatureSet,
              shouldShowRightArrow: false,
              detail: this.state.featureset,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            })
          );
        },
      },
      {
        key: 'getSerialNumber',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module407.default.getSerialNumber());

                  case 2:
                    t = o.sent;
                    console.log('getSerialNumber --- ' + JSON.stringify(t));

                    if (t.result) {
                      n = t.result[0].serial_number;
                      module390.default.sharedCache().serialNumber = n;
                      if ('' == n || n.length < 1) n = ' ';
                      this.setState({
                        serialNumber: n,
                      });
                    }

                  case 5:
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
        key: 'getObaInfo',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getLocale());

                  case 3:
                    t = n.sent;
                    console.log('getObaInfo --- ' + JSON.stringify(t));
                    if (t.result)
                      this.setState({
                        area: this.handleResult(t.result[0].location),
                        voice: this.handleResult(t.result[0].language),
                        wifi: this.handleResult(t.result[0].wifiplan),
                        log: this.handleResult(t.result[0].logserver),
                        timezone: this.handleResult(t.result[0].timezone),
                        bom: this.handleResult(t.result[0].bom),
                        profile: this.handleResult(t.result[0].name),
                        featureset: this.handleResult(t.result[0].featureset.toString()),
                      });
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    console.log('getObaInfo  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));
                    globals.showToast(module491.robot_communication_exception);

                  case 12:
                  case 'end':
                    return n.stop();
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
        key: 'getFirmwareVersion',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (module389.isMiApp) {
                      n.next = 2;
                      break;
                    }

                    return n.abrupt('return');

                  case 2:
                    n.prev = 2;
                    n.next = 5;
                    return regeneratorRuntime.default.awrap(module389.getFirmwareVersion());

                  case 5:
                    t = n.sent;
                    this.setState({
                      firmware: t,
                    });
                    console.log('getFirmwareVersion - ' + t);
                    n.next = 13;
                    break;

                  case 10:
                    n.prev = 10;
                    n.t0 = n.catch(2);
                    console.log('getFirmwareVersion  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 13:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[2, 10]],
            Promise
          );
        },
      },
      {
        key: 'getFirmwareVersionRoborock',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (!module387.default.isShareUser()) {
                      n.next = 3;
                      break;
                    }

                    this.setState({
                      firmware: module491.share_device,
                    });
                    return n.abrupt('return');

                  case 3:
                    if (module389.isSupportFirmwareVersion()) {
                      n.next = 6;
                      break;
                    }

                    this.setState({
                      firmware: 'no support',
                    });
                    return n.abrupt('return');

                  case 6:
                    n.next = 8;
                    return regeneratorRuntime.default.awrap(module389.getFirmwareVersion());

                  case 8:
                    if (undefined != (t = n.sent) && undefined != t.currentVersion)
                      this.setState({
                        firmware: t.currentVersion,
                      });

                  case 10:
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
        key: 'handleResult',
        value: function (t) {
          return '' === t || undefined == t ? ' ' : t;
        },
      },
      {
        key: 'setModelAndCodeName',
        value: function () {
          this.setState({
            model: module389.deviceModel,
            codeName: this.handleResult(module415.DMM.bucket),
          });
        },
      },
    ]);
    return C;
  })(React.default.PureComponent);

exports.default = L;
L.contextType = module506.AppConfigContext;
var V = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
    marginBottom: 0,
    marginTop: module936.NavigationBarHeight,
  },
});

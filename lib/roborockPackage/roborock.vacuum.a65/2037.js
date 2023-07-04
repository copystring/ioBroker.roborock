require('./420');

var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1491 = require('./1491'),
  module385 = require('./385'),
  module416 = require('./416'),
  module391 = require('./391'),
  module394 = require('./394'),
  module424 = require('./424'),
  module1200 = require('./1200');

function x() {
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

require('./389');

var module1344 = require('./1344'),
  module393 = require('./393'),
  module510 = require('./510').strings,
  L = (function (t) {
    module9.default(C, t);

    var module1200 = C,
      module1344 = x(),
      L = function () {
        var t,
          n = module12.default(module1200);

        if (module1344) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function C(t) {
      var n;
      module6.default(this, C);
      (n = L.call(this, t)).state = {
        serialNumber: module394.default.sharedCache().serialNumber,
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
      return n;
    }

    module7.default(C, [
      {
        key: 'componentDidMount',
        value: function () {
          this.getSerialNumber();
          this.getObaInfo();
          if (module393.isMiApp) this.getFirmwareVersion();
          else this.getFirmwareVersionRoborock();
          this.setModelAndCodeName();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme;
          return React.default.createElement(
            module13.ScrollView,
            {
              style: [
                V.contentContainerStyle,
                {
                  backgroundColor: t.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(module385.SettingListItemView, {
              title: module1491.ObaInfoString.Model,
              shouldShowRightArrow: false,
              detail: this.state.model,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module385.SettingListItemView, {
              title: module1491.ObaInfoString.CodeName,
              shouldShowRightArrow: false,
              detail: this.state.codeName,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module385.SettingListItemView, {
              title: module1491.ObaInfoString.SerialNumber,
              shouldShowRightArrow: false,
              detail: this.state.serialNumber,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module385.SettingListItemView, {
              title: module1491.ObaInfoString.FirmwareVersion,
              shouldShowRightArrow: false,
              detail: this.state.firmware,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module385.SettingListItemView, {
              title: module1491.ObaInfoString.Area,
              shouldShowRightArrow: false,
              detail: this.state.area,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module385.SettingListItemView, {
              title: module1491.ObaInfoString.Voice,
              shouldShowRightArrow: false,
              detail: this.state.voice,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module385.SettingListItemView, {
              title: module1491.ObaInfoString.WIFI,
              shouldShowRightArrow: false,
              detail: this.state.wifi,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module385.SettingListItemView, {
              title: module1491.ObaInfoString.Log,
              shouldShowRightArrow: false,
              detail: this.state.log,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module385.SettingListItemView, {
              title: module1491.ObaInfoString.TimeZone,
              shouldShowRightArrow: false,
              detail: this.state.timezone,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module385.SettingListItemView, {
              title: module1491.ObaInfoString.BOM,
              shouldShowRightArrow: false,
              detail: this.state.bom,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module385.SettingListItemView, {
              title: module1491.ObaInfoString.ProfileName,
              shouldShowRightArrow: false,
              detail: this.state.profile,
              detailWidth: 250,
              detailTextNumberOfLines: 2,
              titleColor: 'rgba(0,0,0,0.8)',
            }),
            React.default.createElement(module385.SettingListItemView, {
              title: module1491.ObaInfoString.FeatureSet,
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
          var t, l;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getSerialNumber());

                  case 3:
                    t = o.sent;
                    console.log('getSerialNumber --- ' + JSON.stringify(t));

                    if (t.result) {
                      if ('' == (l = t.result[0].serial_number) || l.length < 1) l = ' ';
                      module394.default.sharedCache().serialNumber = l;
                      this.setState({
                        serialNumber: l,
                      });
                    }

                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    console.log('getSerialNumber  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

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
        key: 'getObaInfo',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getLocale());

                  case 3:
                    t = l.sent;
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
                    l.next = 12;
                    break;

                  case 8:
                    l.prev = 8;
                    l.t0 = l.catch(0);
                    console.log('getObaInfo  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));
                    globals.showToast(module510.robot_communication_exception);

                  case 12:
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
        key: 'getFirmwareVersion',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (module393.isMiApp) {
                      l.next = 2;
                      break;
                    }

                    return l.abrupt('return');

                  case 2:
                    l.prev = 2;
                    l.next = 5;
                    return regeneratorRuntime.default.awrap(module393.getFirmwareVersion());

                  case 5:
                    t = l.sent;
                    this.setState({
                      firmware: t,
                    });
                    console.log('getFirmwareVersion - ' + t);
                    l.next = 13;
                    break;

                  case 10:
                    l.prev = 10;
                    l.t0 = l.catch(2);
                    console.log('getFirmwareVersion  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

                  case 13:
                  case 'end':
                    return l.stop();
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
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (!module391.default.isShareUser()) {
                      l.next = 3;
                      break;
                    }

                    this.setState({
                      firmware: module510.share_device,
                    });
                    return l.abrupt('return');

                  case 3:
                    if (module393.isSupportFirmwareVersion()) {
                      l.next = 6;
                      break;
                    }

                    this.setState({
                      firmware: 'no support',
                    });
                    return l.abrupt('return');

                  case 6:
                    l.next = 8;
                    return regeneratorRuntime.default.awrap(module393.getFirmwareVersion());

                  case 8:
                    if (undefined != (t = l.sent) && undefined != t.currentVersion)
                      this.setState({
                        firmware: t.currentVersion,
                      });

                  case 10:
                  case 'end':
                    return l.stop();
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
            model: module393.deviceModel,
            codeName: this.handleResult(module424.DMM.bucket),
          });
        },
      },
    ]);
    return C;
  })(React.default.PureComponent);

exports.default = L;
L.contextType = module1200.AppConfigContext;
var V = module13.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
    marginBottom: 0,
    marginTop: module1344.NavigationBarHeight,
  },
});

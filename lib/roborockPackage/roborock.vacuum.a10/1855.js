require('./388');

require('./934');

require('./1363');

require('./491').strings;

var regeneratorRuntime = require('regenerator-runtime'),
  module12 = require('./12'),
  module407 = require('./407'),
  module411 = require('./411'),
  module377 = require('./377'),
  module386 = require('./386'),
  module390 = require('./390'),
  module415 = require('./415'),
  module389 = require('./389'),
  module1856 = require('./1856').Supplies,
  w = (RedDotManager = {
    checkSuppliesRedPoint: function () {
      var t, _, f, w, k, v, b, R, S, y, D, x;

      return regeneratorRuntime.default.async(
        function (P) {
          for (;;)
            switch ((P.prev = P.next)) {
              case 0:
                P.prev = 0;
                P.next = 3;
                return regeneratorRuntime.default.awrap(module407.default.getSupplies());

              case 3:
                for (
                  t = P.sent,
                    console.log('checkSuppliesRedPoint - ' + JSON.stringify(t)),
                    _ = t.result[0],
                    f = {
                      filter_work_time: _.filter_work_time,
                      side_brush_work_time: _.side_brush_work_time,
                      main_brush_work_time: _.main_brush_work_time,
                      filter_element_work_time: _.filter_element_work_time,
                      moproller_work_time: _.moproller_work_time,
                      strainer_work_times: _.strainer_work_times,
                      sensor_dirty_time: _.sensor_dirty_times,
                      cleaning_brush_work_times: _.cleaning_brush_work_times,
                      dust_collection_work_times: _.dust_collection_work_times,
                      dust_bag_work_times: _.dust_collection_work_times,
                    },
                    w = null,
                    k = 0;
                  k < module1856.length;
                  k++
                )
                  for (v = module1856[k].data, b = 0; b < v.length; b++) {
                    R = v[b];
                    S = f[R.suppliesKey];
                    y = R.total;
                    D = 3600;
                    if (!R.isUnitsTime) D = 1;
                    if (S / D >= y) w = R.suppliesKey;
                  }

                if (module415.DMM.isGarnet || ('moproller_work_time' != w && 'strainer_work_times' != w)) {
                  P.next = 11;
                  break;
                }

                return P.abrupt('return');

              case 11:
                if (
                  module386.default.isWaterBoxSupported() ||
                  module415.DMM.isGarnet ||
                  ('filter_element_work_time' != w && 'moproller_work_time' != w && 'strainer_work_times' != w)
                ) {
                  P.next = 13;
                  break;
                }

                return P.abrupt('return');

              case 13:
                x = null != w;
                console.log('checkSuppliesRedPoint - ' + x + ' - ' + w);
                module377.RobotStatusManager.sharedManager().suppliesShouldShowRedDot = x;
                module12.DeviceEventEmitter.emit(module411.NotificationKeys.RedDotDidChange, {
                  name: 'supplies',
                  value: x,
                  suppliesKey: w,
                });
                P.next = 22;
                break;

              case 19:
                P.prev = 19;
                P.t0 = P.catch(0);
                console.log('checkSuppliesRedPoint error -' + P.t0);

              case 22:
              case 'end':
                return P.stop();
            }
        },
        null,
        null,
        [[0, 19]],
        Promise
      );
    },
    checkFirmwareRedPoint: function () {
      var t, s, u, _, p, h;

      return regeneratorRuntime.default.async(
        function (w) {
          for (;;)
            switch ((w.prev = w.next)) {
              case 0:
                if (((w.prev = 0), module389.isMiApp)) {
                  w.next = 14;
                  break;
                }

                if (module389.isSupportFirmwareVersion()) {
                  w.next = 4;
                  break;
                }

                return w.abrupt('return');

              case 4:
                w.next = 6;
                return regeneratorRuntime.default.awrap(module389.getFirmwareVersion());

              case 6:
                t = w.sent;
                s = t.currentVersion;
                u = t.lastVersion;
                _ = s != u;
                module377.RobotStatusManager.sharedManager().firmwareShouldShowRedDot = _;
                module12.DeviceEventEmitter.emit(module411.NotificationKeys.RedDotDidChange, {
                  name: 'firmware_update',
                  value: _,
                });
                w.next = 22;
                break;

              case 14:
                w.next = 16;
                return regeneratorRuntime.default.awrap(module389.getFirmwareUpgradingInfo(module389.deviceId, module389.isMiApp ? module389.Device.type : ''));

              case 16:
                p = w.sent;
                console.log('checkFirmwareRedPoint - ' + JSON.stringify(p));
                h = p.hasNewFirmware;
                console.log('checkFirmwareRedPoint - ' + h);
                module377.RobotStatusManager.sharedManager().firmwareShouldShowRedDot = h;
                module12.DeviceEventEmitter.emit(module411.NotificationKeys.RedDotDidChange, {
                  name: 'firmware_update',
                  value: h,
                });

              case 22:
                w.next = 27;
                break;

              case 24:
                w.prev = 24;
                w.t0 = w.catch(0);
                console.log('checkFirmwareRedPoint  error: ' + ('object' == typeof w.t0 ? JSON.stringify(w.t0) : w.t0));

              case 27:
              case 'end':
                return w.stop();
            }
        },
        null,
        null,
        [[0, 24]],
        Promise
      );
    },
    checkTimeZoneRedPoint: function () {
      var t, u, p, h;
      return regeneratorRuntime.default.async(
        function (w) {
          for (;;)
            switch ((w.prev = w.next)) {
              case 0:
                w.prev = 0;
                w.next = 3;
                return regeneratorRuntime.default.awrap(module389.getPhoneTimezone());

              case 3:
                t = w.sent;
                w.next = 6;
                return regeneratorRuntime.default.awrap(module407.default.getTimeZone());

              case 6:
                u = w.sent;
                p = u.result[0];
                module390.default.sharedCache().robotTimeZone = p;
                module390.default.sharedCache().phoneTimeZone = t;
                console.log('checkTimeZoneRedPoint - phoneTimeZone : ' + t + ' - robotTimeZone : ' + p);
                h = t != p;
                console.log('checkTimeZoneRedPoint - ' + h);
                module377.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot = h;
                module12.DeviceEventEmitter.emit(module411.NotificationKeys.RedDotDidChange, {
                  name: 'sync_time_zone',
                  value: h,
                });
                w.next = 20;
                break;

              case 17:
                w.prev = 17;
                w.t0 = w.catch(0);
                console.log('checkTimeZoneRedPoint  error: ' + ('object' == typeof w.t0 ? JSON.stringify(w.t0) : w.t0));

              case 20:
              case 'end':
                return w.stop();
            }
        },
        null,
        null,
        [[0, 17]],
        Promise
      );
    },
  });

exports.default = w;

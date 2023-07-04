require('./388');

require('./936');

require('./386');

require('./415');

require('./1365');

require('./491').strings;

var regeneratorRuntime = require('regenerator-runtime'),
  module12 = require('./12'),
  module407 = require('./407'),
  module411 = require('./411'),
  module377 = require('./377'),
  module390 = require('./390'),
  module389 = require('./389'),
  module1858 = require('./1858').getSupplies,
  h = (RedDotManager = {
    checkSuppliesRedPoint: function () {
      var t, u, _, h, f, w, k, v, R, b, S, y, D;

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
                    u = t.result[0],
                    _ = {
                      filter_work_time: u.filter_work_time,
                      side_brush_work_time: u.side_brush_work_time,
                      main_brush_work_time: u.main_brush_work_time,
                      filter_element_work_time: u.filter_element_work_time,
                      moproller_work_time: u.moproller_work_time,
                      strainer_work_times: u.strainer_work_times,
                      sensor_dirty_time: u.sensor_dirty_time,
                      cleaning_brush_work_times: u.cleaning_brush_work_times,
                      dust_collection_work_times: u.dust_collection_work_times,
                      dust_bag_work_times: u.dust_collection_work_times,
                    },
                    h = null,
                    f = module1858(),
                    w = 0;
                  w < f.length;
                  w++
                )
                  for (k = f[w].data, v = 0; v < k.length; v++) {
                    R = k[v];
                    b = _[R.suppliesKey];
                    S = R.total;
                    y = 3600;
                    if (!R.isUnitsTime) y = 1;
                    if (b / y >= S) h = R.suppliesKey;
                  }

                D = null != h;
                console.log('checkSuppliesRedPoint - ' + D + ' - ' + h);
                module377.RobotStatusManager.sharedManager().suppliesShouldShowRedDot = D;
                module12.DeviceEventEmitter.emit(module411.NotificationKeys.RedDotDidChange, {
                  name: 'supplies',
                  value: D,
                  suppliesKey: h,
                });
                P.next = 19;
                break;

              case 16:
                P.prev = 16;
                P.t0 = P.catch(0);
                console.log('checkSuppliesRedPoint error -' + P.t0);

              case 19:
              case 'end':
                return P.stop();
            }
        },
        null,
        null,
        [[0, 16]],
        Promise
      );
    },
    checkFirmwareRedPoint: function () {
      var t, s, u, p, h, f;
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
                p = s != u;
                module377.RobotStatusManager.sharedManager().firmwareShouldShowRedDot = p;
                module12.DeviceEventEmitter.emit(module411.NotificationKeys.RedDotDidChange, {
                  name: 'firmware_update',
                  value: p,
                });
                w.next = 22;
                break;

              case 14:
                w.next = 16;
                return regeneratorRuntime.default.awrap(module389.getFirmwareUpgradingInfo(module389.deviceId, module389.isMiApp ? module389.Device.type : ''));

              case 16:
                h = w.sent;
                console.log('checkFirmwareRedPoint - ' + JSON.stringify(h));
                f = h.hasNewFirmware;
                console.log('checkFirmwareRedPoint - ' + f);
                module377.RobotStatusManager.sharedManager().firmwareShouldShowRedDot = f;
                module12.DeviceEventEmitter.emit(module411.NotificationKeys.RedDotDidChange, {
                  name: 'firmware_update',
                  value: f,
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
      var t, p, h, f;
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
                p = w.sent;
                h = p.result[0];
                module390.default.sharedCache().robotTimeZone = h;
                module390.default.sharedCache().phoneTimeZone = t;
                console.log('checkTimeZoneRedPoint - phoneTimeZone : ' + t + ' - robotTimeZone : ' + h);
                f = t != h;
                console.log('checkTimeZoneRedPoint - ' + f);
                module377.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot = f;
                module12.DeviceEventEmitter.emit(module411.NotificationKeys.RedDotDidChange, {
                  name: 'sync_time_zone',
                  value: f,
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

exports.default = h;

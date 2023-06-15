require('./392');

require('./1337');

require('./1635');

require('./510').strings;

var regeneratorRuntime = require('regenerator-runtime'),
  module13 = require('./13'),
  module416 = require('./416'),
  module420 = require('./420'),
  module381 = require('./381'),
  module390 = require('./390'),
  module394 = require('./394'),
  module424 = require('./424'),
  module391 = require('./391'),
  module393 = require('./393'),
  module1958 = require('./1958').getSupplies,
  k = (RedDotManager = {
    checkSuppliesRedPoint: function () {
      var t, u, p, _, h, f, k, M, R, v, D, S, b, y, V;

      return regeneratorRuntime.default.async(
        function (P) {
          for (;;)
            switch ((P.prev = P.next)) {
              case 0:
                P.prev = 0;
                P.next = 3;
                return regeneratorRuntime.default.awrap(module416.default.getSupplies());

              case 3:
                for (
                  t = P.sent,
                    console.log('checkSuppliesRedPoint - ' + JSON.stringify(t)),
                    u = t.result[0],
                    p = {
                      filter_work_time: u.filter_work_time,
                      side_brush_work_time: u.side_brush_work_time,
                      main_brush_work_time: u.main_brush_work_time,
                      filter_element_work_time: u.filter_element_work_time,
                      moproller_work_time: u.moproller_work_time,
                      strainer_work_times: u.strainer_work_times,
                      sensor_dirty_time: u.sensor_dirty_time,
                      cleaning_brush_work_times: u.cleaning_brush_work_times,
                      dust_collection_work_times: u.dust_collection_work_times,
                    },
                    _ = null,
                    h = module1958(),
                    f = 0,
                    k = {},
                    M = 0;
                  M < h.length;
                  M++
                )
                  for (R = h[M].data, v = 0; v < R.length; v++) {
                    D = R[v];
                    S = p[D.suppliesKey];
                    b = D.total;
                    y = 3600;
                    if (!D.isUnitsTime) y = 1;

                    if (S / y >= b) {
                      _ = D.suppliesKey;
                      k = D;
                      f = S;
                    }
                  }

                V = null != _;
                console.log('checkSuppliesRedPoint - ' + V + ' - ' + _);
                module381.RobotStatusManager.sharedManager().suppliesShouldShowRedDot = V;
                module13.DeviceEventEmitter.emit(module420.NotificationKeys.RedDotDidChange, {
                  name: 'supplies',
                  value: V,
                  suppliesKey: _,
                  suppliesItem: k,
                  suppliesValue: f,
                });
                P.next = 21;
                break;

              case 18:
                P.prev = 18;
                P.t0 = P.catch(0);
                console.log('checkSuppliesRedPoint error -' + P.t0);

              case 21:
              case 'end':
                return P.stop();
            }
        },
        null,
        null,
        [[0, 18]],
        Promise
      );
    },
    checkFirmwareRedPoint: function () {
      var t, s, p, w, k, M, R, v, D, S, b, y, V, P, F, T, x, C;
      return regeneratorRuntime.default.async(
        function (N) {
          for (;;)
            switch ((N.prev = N.next)) {
              case 0:
                if (((N.prev = 0), module393.isMiApp)) {
                  N.next = 20;
                  break;
                }

                if (module393.isSupportFirmwareVersion()) {
                  N.next = 4;
                  break;
                }

                return N.abrupt('return');

              case 4:
                N.next = 6;
                return regeneratorRuntime.default.awrap(module393.getFirmwareVersion());

              case 6:
                t = N.sent;
                s = t.currentVersion;
                p = t.lastVersion;
                w = s != p;
                k = '02.36.46';
                M = '02.04.74';
                R = module424.DMM.isTopazSV && module391.RRFirmwareVersionCompare(s, k) < 0 && module424.DMM.isV1;
                v = module424.DMM.isTanosSL && module391.RRFirmwareVersionCompare(s, M) <= 0 && module424.DMM.isV1;
                if (module424.DMM.isTopazSV && 0 == module391.RRFirmwareVersionCompare(s, k) && module424.DMM.isV1) w = false;
                D = (R || v) && s != p && !module390.default.isObaAccount();
                module381.RobotStatusManager.sharedManager().firmwareShouldShowRedDot = w;
                module13.DeviceEventEmitter.emit(module420.NotificationKeys.RedDotDidChange, {
                  name: 'firmware_update',
                  value: w,
                  isForce: D,
                });
                N.next = 33;
                break;

              case 20:
                N.next = 22;
                return regeneratorRuntime.default.awrap(module393.getFirmwareUpgradingInfo(module393.deviceId, module393.isMiApp ? module393.Device.type : ''));

              case 22:
                y = N.sent;
                console.log('checkFirmwareRedPoint - ' + JSON.stringify(y));
                V = '4.1.5_3246';
                P = '4.1.5_0474';
                F = module424.DMM.isTopazSV && module391.MIFirmwareVersionCompare(null != (S = y.curVersion) ? S : '', V) <= 0 && module424.DMM.isV1;
                T = module424.DMM.isTanosSL && module391.MIFirmwareVersionCompare(null != (b = y.curVersion) ? b : '', P) <= 0 && module424.DMM.isV1;
                x = y.hasNewFirmware;
                C = (F || T) && y.hasNewFirmware && !module390.default.isObaAccount();
                console.log('checkFirmwareRedPoint - ' + x);
                module381.RobotStatusManager.sharedManager().firmwareShouldShowRedDot = x;
                module13.DeviceEventEmitter.emit(module420.NotificationKeys.RedDotDidChange, {
                  name: 'firmware_update',
                  value: x,
                  isForce: C,
                });

              case 33:
                N.next = 38;
                break;

              case 35:
                N.prev = 35;
                N.t0 = N.catch(0);
                console.log('checkFirmwareRedPoint  error: ' + ('object' == typeof N.t0 ? JSON.stringify(N.t0) : N.t0));

              case 38:
              case 'end':
                return N.stop();
            }
        },
        null,
        null,
        [[0, 35]],
        Promise
      );
    },
    checkTimeZoneRedPoint: function () {
      var t, u, _, h;

      return regeneratorRuntime.default.async(
        function (w) {
          for (;;)
            switch ((w.prev = w.next)) {
              case 0:
                w.prev = 0;
                w.next = 3;
                return regeneratorRuntime.default.awrap(module393.getPhoneTimezone());

              case 3:
                t = w.sent;
                w.next = 6;
                return regeneratorRuntime.default.awrap(module416.default.getTimeZone());

              case 6:
                u = w.sent;
                _ = u.result[0];
                module394.default.sharedCache().robotTimeZone = _;
                module394.default.sharedCache().phoneTimeZone = t;
                console.log('checkTimeZoneRedPoint - phoneTimeZone : ' + t + ' - robotTimeZone : ' + _);
                h = t != _;
                console.log('checkTimeZoneRedPoint - ' + h);
                module381.RobotStatusManager.sharedManager().timeZoneShouldShowRedDot = h;
                module13.DeviceEventEmitter.emit(module420.NotificationKeys.RedDotDidChange, {
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

exports.default = k;

var module389 = require('./389'),
  n = (SmartApi = {
    getTimerList: function () {
      return new Promise(function (n, o) {
        module389.callSmartHomeAPI(
          '/scene/list',
          {
            did: module389.deviceId,
            model: module389.deviceModel,
            identify: module389.deviceId,
          },
          function (t) {
            n(t);
          }
        );
      });
    },
    setTimer: function (n, o, c) {
      return new Promise(function (u, f) {
        module389.callSmartHomeAPI(
          '/scene/edit',
          {
            authed: [module389.deviceId],
            did: module389.deviceId,
            identify: module389.deviceId,
            name: o || '',
            setting: n,
            st_id: 8,
            status: 0,
            us_id: c || 0,
          },
          function (t) {
            u(t);
          }
        );
      });
    },
    deleteTimer: function (n) {
      return new Promise(function (o, c) {
        module389.callSmartHomeAPI(
          '/scene/delete',
          {
            authed: [module389.deviceId],
            model: module389.deviceModel,
            identify: module389.deviceId,
            us_id: n || 0,
          },
          function (t) {
            o(t);
          }
        );
      });
    },
    getCountryCode: function () {
      return new Promise(function (n, o) {
        module389.getCurrentCountryInfoCallback(function (t, c) {
          if (t) n(c);
          else
            o({
              error: 'getCountryCode error',
              data: c,
            });
        });
      });
    },
  });

exports.default = n;

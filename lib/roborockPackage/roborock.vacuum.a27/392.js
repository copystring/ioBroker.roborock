var module393 = require('./393'),
  n = (SmartApi = {
    getTimerList: function () {
      return new Promise(function (n, o) {
        module393.callSmartHomeAPI(
          '/scene/list',
          {
            did: module393.deviceId,
            model: module393.deviceModel,
            identify: module393.deviceId,
          },
          function (t) {
            n(t);
          }
        );
      });
    },
    setTimer: function (n, o, c) {
      return new Promise(function (u, f) {
        module393.callSmartHomeAPI(
          '/scene/edit',
          {
            authed: [module393.deviceId],
            did: module393.deviceId,
            identify: module393.deviceId,
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
        module393.callSmartHomeAPI(
          '/scene/delete',
          {
            authed: [module393.deviceId],
            model: module393.deviceModel,
            identify: module393.deviceId,
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
        module393.getCurrentCountryInfoCallback(function (t, c) {
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

exports.getCountryInfo = function (t) {
  if (module393.apiLevel >= 115)
    module393.getCurrentCountryInfoCallback(function (n, o) {
      return t(n, o);
    });
};

exports.getTimezoneName = function (t) {
  var c;
  return regeneratorRuntime.default.async(
    function (u) {
      for (;;)
        switch ((u.prev = u.next)) {
          case 0:
            u.prev = 0;
            u.next = 3;
            return regeneratorRuntime.default.awrap(module393.getPhoneTimezone());

          case 3:
            c = u.sent;
            t(c);
            u.next = 11;
            break;

          case 7:
            u.prev = 7;
            u.t0 = u.catch(0);
            console.log('getTimezoneName  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));
            t('');

          case 11:
          case 'end':
            return u.stop();
        }
    },
    null,
    null,
    [[0, 7]],
    Promise
  );
};

exports.removeFdsTempMapFiles = function () {
  module393.callSmartHomeAPI(
    module389.SmartHomeApi.DelFdsTempMaps,
    {
      did: module393.deviceId,
    },
    function (t) {
      if (t) t.result;
    }
  );
};

require('./1960');

var regeneratorRuntime = require('regenerator-runtime'),
  module393 = require('./393'),
  module389 = require('./389');

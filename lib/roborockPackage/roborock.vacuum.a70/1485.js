exports.readSoundPackageRobotLocation = function (t) {
  var o;
  return regeneratorRuntime.default.async(
    function (u) {
      for (;;)
        switch ((u.prev = u.next)) {
          case 0:
            u.next = 2;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.getItem(s));

          case 2:
            o = u.sent;
            if (t) t(o);

          case 4:
          case 'end':
            return u.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.saveSoundPackageRobotLocation = function (t) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.prev = 0;
            o.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.setItem(s, t));

          case 3:
            o.next = 8;
            break;

          case 5:
            o.prev = 5;
            o.t0 = o.catch(0);
            console.log('AsyncStorage setItem error: ' + o.t0.message);

          case 8:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.clearSoundPackageRobotLocation = function () {
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            t.prev = 0;
            t.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.removeItem(s));

          case 3:
            t.next = 8;
            break;

          case 5:
            t.prev = 5;
            t.t0 = t.catch(0);
            console.log('' + t.t0.message);

          case 8:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.readSoundPackageRobotLanguage = function (t) {
  var o;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            s.next = 2;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.getItem(u));

          case 2:
            o = s.sent;
            if (t) t(o);

          case 4:
          case 'end':
            return s.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.saveSoundPackageRobotLanguage = function (t) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.prev = 0;
            o.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.setItem(u, t));

          case 3:
            o.next = 8;
            break;

          case 5:
            o.prev = 5;
            o.t0 = o.catch(0);
            console.log('AsyncStorage setItem error: ' + o.t0.message);

          case 8:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.clearSoundPackageRobotLanguage = function () {
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            t.prev = 0;
            t.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.removeItem(u));

          case 3:
            t.next = 8;
            break;

          case 5:
            t.prev = 5;
            t.t0 = t.catch(0);
            console.log('' + t.t0.message);

          case 8:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.readSoundPackageLoadingFlag = function (t) {
  var o;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            s.next = 2;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.getItem(l));

          case 2:
            o = s.sent;
            if (t) t(o);

          case 4:
          case 'end':
            return s.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.saveSoundPackageLoadingFlag = function (t) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.prev = 0;
            o.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.setItem(l, JSON.stringify(t)));

          case 3:
            o.next = 8;
            break;

          case 5:
            o.prev = 5;
            o.t0 = o.catch(0);
            console.log('AsyncStorage setItem error: ' + o.t0.message);

          case 8:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.clearSoundPackageLoadingFlag = function () {
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            t.prev = 0;
            t.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.removeItem(l));

          case 3:
            t.next = 8;
            break;

          case 5:
            t.prev = 5;
            t.t0 = t.catch(0);
            console.log('' + t.t0.message);

          case 8:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.readLocalInfoFileLanuage = function (t) {
  var o;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            s.next = 2;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.getItem(p));

          case 2:
            o = s.sent;
            if (t) t(o);

          case 4:
          case 'end':
            return s.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.saveLocalInfoFileLanuage = function (t) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.prev = 0;
            o.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.setItem(p, t));

          case 3:
            o.next = 8;
            break;

          case 5:
            o.prev = 5;
            o.t0 = o.catch(0);
            console.log('AsyncStorage setItem error: ' + o.t0.message);

          case 8:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.clearLocalInfoFileLanuage = function () {
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            t.prev = 0;
            t.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.removeItem(p));

          case 3:
            t.next = 8;
            break;

          case 5:
            t.prev = 5;
            t.t0 = t.catch(0);
            console.log('' + t.t0.message);

          case 8:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.readResourcesLocalPath = function (t) {
  var o;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            s.next = 2;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.getItem(f));

          case 2:
            o = s.sent;
            if (t) t(o);

          case 4:
          case 'end':
            return s.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.saveResourcesLocalPath = function (t) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.prev = 0;
            o.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.setItem(f, t));

          case 3:
            o.next = 8;
            break;

          case 5:
            o.prev = 5;
            o.t0 = o.catch(0);
            console.log('AsyncStorage setItem error: ' + o.t0.message);

          case 8:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.clearResourcesLocalPath = function () {
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            t.prev = 0;
            t.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.removeItem(f));

          case 3:
            t.next = 8;
            break;

          case 5:
            t.prev = 5;
            t.t0 = t.catch(0);
            console.log('' + t.t0.message);

          case 8:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.readRemoteControlModeFlag = function (t) {
  var o;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            s.next = 2;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.getItem(v));

          case 2:
            o = s.sent;
            if (t) t(o);

          case 4:
          case 'end':
            return s.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.saveRemoteControlModeFlag = function (t) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.prev = 0;
            o.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.setItem(v, JSON.stringify(t)));

          case 3:
            o.next = 8;
            break;

          case 5:
            o.prev = 5;
            o.t0 = o.catch(0);
            console.log('AsyncStorage setItem error: ' + o.t0.message);

          case 8:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.clearRemoteControlModeFlag = function () {
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            t.prev = 0;
            t.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.removeItem(v));

          case 3:
            t.next = 8;
            break;

          case 5:
            t.prev = 5;
            t.t0 = t.catch(0);
            console.log('' + t.t0.message);

          case 8:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.readRobotTimezone = function (t) {
  var o;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            s.next = 2;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.getItem(y));

          case 2:
            o = s.sent;
            if (t) t(o);

          case 4:
          case 'end':
            return s.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.saveRobotTimezone = function (t) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.prev = 0;
            o.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.setItem(y, t));

          case 3:
            o.next = 8;
            break;

          case 5:
            o.prev = 5;
            o.t0 = o.catch(0);
            console.log('AsyncStorage setItem error: ' + o.t0.message);

          case 8:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.clearRobotTimezone = function () {
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            t.prev = 0;
            t.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.removeItem(y));

          case 3:
            t.next = 8;
            break;

          case 5:
            t.prev = 5;
            t.t0 = t.catch(0);
            console.log('' + t.t0.message);

          case 8:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.readSoundPackageRobotBom = function (t) {
  var o;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            s.next = 2;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.getItem(x));

          case 2:
            o = s.sent;
            if (t) t(o);

          case 4:
          case 'end':
            return s.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.saveSoundPackageRobotBom = function (t) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.prev = 0;
            o.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.setItem(x, t));

          case 3:
            o.next = 8;
            break;

          case 5:
            o.prev = 5;
            o.t0 = o.catch(0);
            console.log('AsyncStorage setItem error: ' + o.t0.message);

          case 8:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.clearSoundPackageRobotBom = function () {
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            t.prev = 0;
            t.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.removeItem(x));

          case 3:
            t.next = 8;
            break;

          case 5:
            t.prev = 5;
            t.t0 = t.catch(0);
            console.log('' + t.t0.message);

          case 8:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.readRobotSerialNumber = function (t) {
  var o;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            s.next = 2;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.getItem(S));

          case 2:
            o = s.sent;
            if (t) t(o);

          case 4:
          case 'end':
            return s.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.saveRobotSerialNumber = function (t) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.prev = 0;
            o.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.setItem(S, t));

          case 3:
            o.next = 8;
            break;

          case 5:
            o.prev = 5;
            o.t0 = o.catch(0);
            console.log('AsyncStorage setItem error: ' + o.t0.message);

          case 8:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.clearRobotSerialNumber = function () {
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            t.prev = 0;
            t.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.removeItem(S));

          case 3:
            t.next = 8;
            break;

          case 5:
            t.prev = 5;
            t.t0 = t.catch(0);
            console.log('' + t.t0.message);

          case 8:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.readStat = function (t) {
  var o;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            s.next = 2;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.getItem(w));

          case 2:
            o = s.sent;
            if (t) t(o);

          case 4:
          case 'end':
            return s.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.saveStat = function (t) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.prev = 0;
            o.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.setItem(w, t));

          case 3:
            o.next = 8;
            break;

          case 5:
            o.prev = 5;
            o.t0 = o.catch(0);
            console.log('AsyncStorage setItem error: ' + o.t0.message);

          case 8:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

exports.clearStat = function () {
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            t.prev = 0;
            t.next = 3;
            return regeneratorRuntime.default.awrap(module13.AsyncStorage.removeItem(w));

          case 3:
            t.next = 8;
            break;

          case 5:
            t.prev = 5;
            t.t0 = t.catch(0);
            console.log('' + t.t0.message);

          case 8:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    [[0, 5]],
    Promise
  );
};

require('react');

var regeneratorRuntime = require('regenerator-runtime'),
  module13 = require('./13'),
  module393 = require('./393'),
  s = '@RockroboVacuum_SoundPackageRobotLocation' + module393.deviceId + ':key',
  u = '@RockroboVacuum_SoundPackageRobotLanguage' + module393.deviceId + ':key',
  l = '@RockroboVacuum_SoundPackageLoadingDone' + module393.deviceId + ':key',
  f = '@RockroboVacuum_SoundPackageResourcesPath' + module393.deviceId + ':key',
  p = '@RockroboVacuum_SoundPackageLocalInfoLanguage' + module393.deviceId + ':key',
  v = '@RockroboVacuum_RemoteControlMode' + module393.deviceId + ':key',
  y = '@RockroboVacuum_Timezone' + module393.deviceId + ':key',
  x = '@RockroboVacuum_SoundPackageRobotBom' + module393.deviceId + ':key',
  S = '@RockroboVacuum_RobotSerialNumber' + module393.deviceId + ':key',
  w = '@RockroboVacuum_Stat' + module393.deviceId + ':key';

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module386 = require('./386'),
  module377 = require('./377'),
  module415 = require('./415'),
  module385 = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var s = p(n);
    if (s && s.has(t)) return s.get(t);
    var o = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(o, l, c);
        else o[l] = t[l];
      }

    o.default = t;
    if (s) s.set(t, o);
    return o;
  })(require('./385'));

function p(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    s = new WeakMap();
  return (p = function (t) {
    return t ? s : n;
  })(t);
}

require('./389');

var f = null,
  y = (function () {
    function t() {
      module4.default(this, t);

      if (!f) {
        f = this;
        this.cameraEnabled = false;
        this.petModeEnabled = false;
        this.realTimeMonitorEnabled = false;
        this.ledSetting = 0;
        this.monitorPrivacyPolicyAgreed = false;
        this.explorationEnabled = false;
        this.mapObjectPhotoEnabled = false;
        this.mapObjectPhotoPrivacyPolicyAgreed = false;
        this.hasShownPetModeAlert = true;
        this.listeners = [];
        this.hasGot = false;
        this.realVideoSetting = this.getRealVideoSettingDefault();
      }

      return f;
    }

    module5.default(
      t,
      [
        {
          key: 'getCameraStatus',
          value: function () {
            var t, s;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      if (!module386.default.isCameraSupported() && !module386.default.isStructuredLightSupported()) {
                        o.next = 13;
                        break;
                      }

                      o.prev = 1;
                      o.next = 4;
                      return regeneratorRuntime.default.awrap(RobotApi.getCameraStatus());

                    case 4:
                      t = o.sent;
                      s = t.result[0];
                      this.parseCameraStatus(s);
                      console.log('getCameraStatus - ' + JSON.stringify(t));
                      o.next = 13;
                      break;

                    case 10:
                      o.prev = 10;
                      o.t0 = o.catch(1);
                      console.log('get Camera Status error - ' + JSON.stringify(o.t0));

                    case 13:
                    case 'end':
                      return o.stop();
                  }
              },
              null,
              this,
              [[1, 10]],
              Promise
            );
          },
        },
        {
          key: 'parseCameraStatus',
          value: function (t) {
            this.hasGot = true;
            this.cameraEnabled = 1 == (1 & t);
            this.petModeEnabled = 1 == ((t >> 1) & 1);
            this.realTimeMonitorEnabled = 1 == ((t >> 2) & 1);
            this.ledSetting = (t >> 3) & 3;
            this.monitorPrivacyPolicyAgreed = 1 == ((t >> 5) & 1);
            this.explorationEnabled = 1 == ((t >> 6) & 1);
            this.hasShownPetModeAlert = 1 == ((t >> 7) & 1);
            this.mapObjectPhotoEnabled = 1 == ((t >> 10) & 1);
            this.mapObjectPhotoPrivacyPolicyAgreed = 1 == ((t >> 11) & 1);
            if (module386.default.isVideoSettingSupported()) this.realVideoSetting = (t >> 8) & 3;
            this.triggerListeners();
          },
        },
        {
          key: 'updateCameraStatus',
          value: function () {
            var t, module4, module5, module386, module377, module415, module385, p, f, y;
            return regeneratorRuntime.default.async(
              function (S) {
                for (;;)
                  switch ((S.prev = S.next)) {
                    case 0:
                      t = 0;
                      module4 = this.cameraEnabled ? 1 : 0;
                      module5 = this.monitorPrivacyPolicyAgreed ? 1 : 0;
                      module386 = this.petModeEnabled ? 1 : 0;
                      module377 = this.realTimeMonitorEnabled ? 1 : 0;
                      module415 = this.explorationEnabled ? 1 : 0;
                      module385 = this.ledSetting;
                      p = this.hasShownPetModeAlert ? 1 : 0;
                      f = this.mapObjectPhotoEnabled ? 1 : 0;
                      y = this.mapObjectPhotoPrivacyPolicyAgreed ? 1 : 0;
                      t =
                        module4 |
                        (module386 << 1) |
                        (module377 << 2) |
                        (module385 << 3) |
                        (module5 << 5) |
                        (module415 << 6) |
                        (p << 7) |
                        (this.realVideoSetting << 8) |
                        (f << 10) |
                        (y << 11);
                      console.log(
                        'camera-' +
                          module4 +
                          ',pet - ' +
                          module386 +
                          ',monitor- ' +
                          module377 +
                          ',led - ' +
                          module385 +
                          ',monitorPrivacy - ' +
                          module5 +
                          ',\n    exploration-' +
                          module415 +
                          ',hasShowPetModeAlertVal-' +
                          p +
                          ',realVideoSetting - ' +
                          this.realVideoSetting
                      );
                      S.prev = 12;
                      S.next = 15;
                      return regeneratorRuntime.default.awrap(RobotApi.setCameraStatus(t));

                    case 15:
                      console.log('updateCameraStatus - ' + t);
                      this.triggerListeners();
                      return S.abrupt('return', true);

                    case 21:
                      S.prev = 21;
                      S.t0 = S.catch(12);
                      console.log('updateCameraStatus  error: ' + ('object' == typeof S.t0 ? JSON.stringify(S.t0) : S.t0));
                      return S.abrupt('return', false);

                    case 25:
                    case 'end':
                      return S.stop();
                  }
              },
              null,
              this,
              [[12, 21]],
              Promise
            );
          },
        },
        {
          key: 'updateMonitorPrivacy',
          value: function (t, s) {
            var o;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      this.monitorPrivacyPolicyAgreed = t;
                      module377.RSM.lockCameraStatus();
                      u.next = 4;
                      return regeneratorRuntime.default.awrap(this.updateCameraStatus());

                    case 4:
                      if (!(o = u.sent)) this.monitorPrivacyPolicyAgreed = !t;
                      if (s) s(o);

                    case 7:
                    case 'end':
                      return u.stop();
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
          key: 'updateRRAI',
          value: function (t, s) {
            var o;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      this.cameraEnabled = t;
                      module377.RSM.lockCameraStatus();
                      u.next = 4;
                      return regeneratorRuntime.default.awrap(this.updateCameraStatus());

                    case 4:
                      if (!(o = u.sent)) this.cameraEnabled = !t;
                      if (s) s(o);

                    case 7:
                    case 'end':
                      return u.stop();
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
          key: 'updatePetModeEnabled',
          value: function (t) {
            var s;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      this.petModeEnabled = t;
                      this.hasShownPetModeAlert = true;
                      module377.RSM.lockCameraStatus();
                      o.next = 5;
                      return regeneratorRuntime.default.awrap(this.updateCameraStatus());

                    case 5:
                      if (!(s = o.sent)) this.petModeEnabled = !t;
                      if (!s) this.hasShownPetModeAlert = false;

                    case 8:
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
          key: 'updatePhotoPrivacy',
          value: function (t, s) {
            var o;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      this.mapObjectPhotoPrivacyPolicyAgreed = t;
                      module377.RSM.lockCameraStatus();
                      u.next = 4;
                      return regeneratorRuntime.default.awrap(this.updateCameraStatus());

                    case 4:
                      if (!(o = u.sent)) this.mapObjectPhotoPrivacyPolicyAgreed = !t;
                      if (s) s(o);

                    case 7:
                    case 'end':
                      return u.stop();
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
          key: 'updateRealTimeVideoSetting',
          value: function (t, s) {
            var o;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      this.realVideoSetting = t;
                      u.next = 3;
                      return regeneratorRuntime.default.awrap(this.updateCameraStatus());

                    case 3:
                      o = u.sent;
                      if (s) s(o);

                    case 5:
                    case 'end':
                      return u.stop();
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
          key: 'triggerListeners',
          value: function () {
            this.listeners.forEach(function (t) {
              t();
            });
          },
        },
        {
          key: 'addChangeListener',
          value: function (t) {
            this.listeners.push(t);
          },
        },
        {
          key: 'removeChangeListener',
          value: function (t) {
            var n = this.listeners.findIndex(function (n) {
              return n.toString() === t.toString();
            });
            if (-1 != n) this.listeners.splice(n, 1);
          },
        },
        {
          key: 'getRealVideoSettingDefault',
          value: function () {
            return module415.DMM.currentSeries == module415.DeviceSeries.a09
              ? module385.VideoSettingMap().VideoSettingNotDisturb
              : module385.VideoSettingMap().VideoSettingLightlyDisturb;
          },
        },
      ],
      [
        {
          key: 'sharedInstance',
          value: function () {
            return new t();
          },
        },
      ]
    );
    return t;
  })(),
  S = (CSM = y.sharedInstance());

exports.default = S;

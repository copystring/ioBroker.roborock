require('./393');

var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module390 = require('./390'),
  module381 = require('./381'),
  module424 = require('./424'),
  module389 = require('./389'),
  f = null,
  S = (function () {
    function t() {
      module6.default(this, t);

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

    module7.default(
      t,
      [
        {
          key: 'getCameraStatus',
          value: function () {
            var t, n;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      if (!module390.default.isCameraSupported() && !module390.default.isStructuredLightSupported()) {
                        o.next = 13;
                        break;
                      }

                      o.prev = 1;
                      o.next = 4;
                      return regeneratorRuntime.default.awrap(RobotApi.getCameraStatus());

                    case 4:
                      t = o.sent;
                      n = t.result[0];
                      this.parseCameraStatus(n);
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
            if (module390.default.isVideoSettingSupported()) this.realVideoSetting = (t >> 8) & 3;
            this.triggerListeners();
          },
        },
        {
          key: 'updateCameraStatus',
          value: function () {
            var t, n, module6, module7, module390, module381, module424, module389, f, S;
            return regeneratorRuntime.default.async(
              function (v) {
                for (;;)
                  switch ((v.prev = v.next)) {
                    case 0:
                      t = 0;
                      n = this.cameraEnabled ? 1 : 0;
                      module6 = this.monitorPrivacyPolicyAgreed ? 1 : 0;
                      module7 = this.petModeEnabled ? 1 : 0;
                      module390 = this.realTimeMonitorEnabled ? 1 : 0;
                      module381 = this.explorationEnabled ? 1 : 0;
                      module424 = this.ledSetting;
                      module389 = this.hasShownPetModeAlert ? 1 : 0;
                      f = this.mapObjectPhotoEnabled ? 1 : 0;
                      S = this.mapObjectPhotoPrivacyPolicyAgreed ? 1 : 0;
                      t =
                        n |
                        (module7 << 1) |
                        (module390 << 2) |
                        (module424 << 3) |
                        (module6 << 5) |
                        (module381 << 6) |
                        (module389 << 7) |
                        (this.realVideoSetting << 8) |
                        (f << 10) |
                        (S << 11);
                      console.log(
                        'camera-' +
                          n +
                          ',pet - ' +
                          module7 +
                          ',monitor- ' +
                          module390 +
                          ',led - ' +
                          module424 +
                          ',monitorPrivacy - ' +
                          module6 +
                          ',\n    exploration-' +
                          module381 +
                          ',hasShowPetModeAlertVal-' +
                          module389 +
                          ',realVideoSetting - ' +
                          this.realVideoSetting
                      );
                      v.prev = 12;
                      v.next = 15;
                      return regeneratorRuntime.default.awrap(RobotApi.setCameraStatus(t));

                    case 15:
                      console.log('updateCameraStatus - ' + t);
                      this.triggerListeners();
                      return v.abrupt('return', true);

                    case 21:
                      v.prev = 21;
                      v.t0 = v.catch(12);
                      console.log('updateCameraStatus  error: ' + ('object' == typeof v.t0 ? JSON.stringify(v.t0) : v.t0));
                      return v.abrupt('return', false);

                    case 25:
                    case 'end':
                      return v.stop();
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
          value: function (t, n) {
            var o;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      this.monitorPrivacyPolicyAgreed = t;
                      module381.RSM.lockCameraStatus();
                      u.next = 4;
                      return regeneratorRuntime.default.awrap(this.updateCameraStatus());

                    case 4:
                      if (!(o = u.sent)) this.monitorPrivacyPolicyAgreed = !t;
                      if (n) n(o);

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
          value: function (t, n) {
            var o;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      this.cameraEnabled = t;
                      module381.RSM.lockCameraStatus();
                      u.next = 4;
                      return regeneratorRuntime.default.awrap(this.updateCameraStatus());

                    case 4:
                      if (!(o = u.sent)) this.cameraEnabled = !t;
                      if (n) n(o);

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
            var n;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      this.petModeEnabled = t;
                      this.hasShownPetModeAlert = true;
                      module381.RSM.lockCameraStatus();
                      o.next = 5;
                      return regeneratorRuntime.default.awrap(this.updateCameraStatus());

                    case 5:
                      if (!(n = o.sent)) this.petModeEnabled = !t;
                      if (!n) this.hasShownPetModeAlert = false;

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
          value: function (t, n) {
            var o;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      this.mapObjectPhotoPrivacyPolicyAgreed = t;
                      module381.RSM.lockCameraStatus();
                      u.next = 4;
                      return regeneratorRuntime.default.awrap(this.updateCameraStatus());

                    case 4:
                      if (!(o = u.sent)) this.mapObjectPhotoPrivacyPolicyAgreed = !t;
                      if (n) n(o);

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
          value: function (t, n) {
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
                      if (n) n(o);

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
          key: 'updateLedSetting',
          value: function (t, n) {
            var o;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      this.ledSetting = t;
                      u.next = 3;
                      return regeneratorRuntime.default.awrap(this.updateCameraStatus());

                    case 3:
                      o = u.sent;
                      if (n) n(o);

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
            return module424.DMM.currentSeries == module424.DeviceSeries.a09
              ? module389.VideoSettingMap().VideoSettingNotDisturb
              : module389.VideoSettingMap().VideoSettingLightlyDisturb;
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
  v = (CSM = S.sharedInstance());

exports.default = v;

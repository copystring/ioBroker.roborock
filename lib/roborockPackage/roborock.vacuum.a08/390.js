var module4 = require('./4'),
  module5 = require('./5'),
  n = null,
  h = (function () {
    function t() {
      module4.default(this, t);

      if (!n) {
        this.spotCleanEnabled = false;
        this.ScreenHeight = 0;
        this.isConnected = false;
        this.serialNumber = ' ';
        this.mapObjectPhotos = {};
        this.mapObjectLargePhotos = {};
        this.areaUnitIndex = 0;
        this.rsaKey = null;
        this.rsaExecutor = null;
        this.carPetCleanMode = -1;
        this.photoPrivacyVersionAgreedOnServer = -1;
        this.MonitorPrivacyVersionAgreedOnServer = -1;
        this.RemoteViewingAlertAgreedTimesOnServer = -1;
        n = this;
        this.mapObjectMosaicPhotos = {};
        this.waterShortageNotification = false;
        this.error24 = false;
        this.error25 = false;
        this.notDisturbReminder = false;
        this.robotTimeZone = ' ';
        this.phoneTimeZone = ' ';
        this.dustCollectionMode = 0;
        this.washTowelMode = 0;
      }

      return n;
    }

    module5.default(
      t,
      [
        {
          key: 'reset',
          value: function () {
            this.RemoteViewingAlertAgreedTimesOnServer = -1;
            this.waterShortageNotification = false;
            this.error24 = false;
            this.error25 = false;
            this.notDisturbReminder = false;
          },
        },
        {
          key: 'resetForAutoTest',
          value: function () {},
        },
      ],
      [
        {
          key: 'sharedCache',
          value: function () {
            return new t();
          },
        },
      ]
    );
    return t;
  })();

exports.default = h;
var u = h.sharedCache();
exports.MC = u;

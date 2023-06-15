var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module13 = require('./13'),
  u = null,
  c = (function () {
    function t() {
      module6.default(this, t);

      if (!u) {
        this.spotCleanEnabled = false;
        this.ScreenHeight = module13.Dimensions.get('window').height;
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
        u = this;
        this.mapObjectMosaicPhotos = {};
        this.waterShortageNotification = false;
        this.notDisturbReminder = false;
        this.robotTimeZone = ' ';
        this.phoneTimeZone = ' ';
        this.dustCollectionMode = 0;
        this.washTowelMode = 0;
        this.maxVelocity = 0;
        this.isShowCarpet = false;
        this.sapMapBeautify = false;
        this.soundPackageListData = '';
        this.lastShow72HourMopWarningTime = 0;
      }

      return u;
    }

    module7.default(
      t,
      [
        {
          key: 'reset',
          value: function () {
            this.waterShortageNotification = false;
            this.notDisturbReminder = false;
            this.lastShow72HourMopWarningTime = 0;
          },
        },
        {
          key: 'resetForAutoTest',
          value: function () {},
        },
        {
          key: 'getRsaKey',
          value: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      if (this.rsaKey) {
                        n.next = 12;
                        break;
                      }

                      if (this.rsaExecutor) {
                        n.next = 4;
                        break;
                      }

                      console.warn('rsaExecutor not ready');
                      return n.abrupt('return');

                    case 4:
                      n.next = 6;
                      return regeneratorRuntime.default.awrap(this.rsaExecutor.execute('generateRSAKeys'));

                    case 6:
                      if (((t = n.sent).constructor == String && (t = JSON.parse(t)), t && t.pub)) {
                        n.next = 11;
                        break;
                      }

                      console.warn('rsaKey not valid');
                      return n.abrupt('return');

                    case 11:
                      if (!this.rsaKey) this.rsaKey = t;

                    case 12:
                    case 'end':
                      return n.stop();
                  }
              },
              null,
              this,
              null,
              Promise
            );
          },
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

exports.default = c;
var l = c.sharedCache();
exports.MC = l;

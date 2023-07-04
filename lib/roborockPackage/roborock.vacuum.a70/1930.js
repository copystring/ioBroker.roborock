var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module391 = require('./391'),
  module381 = require('./381'),
  module424 = require('./424'),
  module13 = require('./13'),
  module420 = require('./420'),
  module393 = require('./393'),
  module1337 = require('./1337'),
  h = null,
  module1931 = (function () {
    function n() {
      module6.default(this, n);

      if (!h) {
        this.config = null;
        h = this;
      }

      return h;
    }

    module7.default(
      n,
      [
        {
          key: 'getConfig',
          value: function () {
            var n,
              o,
              u = this;
            return regeneratorRuntime.default.async(
              function (h) {
                for (;;)
                  switch ((h.prev = h.next)) {
                    case 0:
                      if (
                        ((n = function () {
                          var n, o, h, module1931, x, k, w;
                          return regeneratorRuntime.default.async(
                            function (b) {
                              for (;;)
                                switch ((b.prev = b.next)) {
                                  case 0:
                                    if (
                                      (console.log('Will update ConfigInfo.'),
                                      (n = module1337.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].host),
                                      (o = module424.DMM.configFilePath),
                                      !module393.isAutoTestSupported())
                                    ) {
                                      b.next = 7;
                                      break;
                                    }

                                    h = require('./1931');
                                    b.next = 20;
                                    break;

                                  case 7:
                                    module1931 = 'https://' + n + o;
                                    x = '/config.json';
                                    console.log('' + module1931 + x + '?time=' + new Date().getTime());
                                    b.next = 12;
                                    return regeneratorRuntime.default.awrap(module391.default.asyncDownloadFile('' + module1931 + x + '?time=' + new Date().getTime(), 'infoTemp'));

                                  case 12:
                                    k = b.sent;
                                    console.log('SoundPackageManager : ' + JSON.stringify(k));
                                    b.next = 16;
                                    return regeneratorRuntime.default.awrap(module391.default.asyncReadFile(k.filename));

                                  case 16:
                                    w = b.sent;
                                    h = JSON.parse(w);
                                    b.next = 20;
                                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.ConfigInfoStorage, JSON.stringify(h)));

                                  case 20:
                                    u.config = h;
                                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.ConfigDidLoad);
                                    return b.abrupt('return', h);

                                  case 23:
                                  case 'end':
                                    return b.stop();
                                }
                            },
                            null,
                            null,
                            null,
                            Promise
                          );
                        }),
                        !this.config)
                      ) {
                        h.next = 4;
                        break;
                      }

                      console.log('ConfigInfoRAM.');
                      return h.abrupt('return', this.config);

                    case 4:
                      h.next = 6;
                      return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.ConfigInfoStorage));

                    case 6:
                      if (!(o = h.sent)) {
                        h.next = 14;
                        break;
                      }

                      console.log('ConfigInfoCache. ' + o);
                      n();
                      this.config = JSON.parse(o);
                      return h.abrupt('return', JSON.parse(o));

                    case 14:
                      console.log('ConfigInfoFetch.');
                      h.next = 17;
                      return regeneratorRuntime.default.awrap(n());

                    case 17:
                      return h.abrupt('return', h.sent);

                    case 18:
                    case 'end':
                      return h.stop();
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
          key: 'dockSetSNPrefixes',
          get: function () {
            var n, t;
            return null != (n = null == (t = this.config) ? undefined : t.dockSetSNPrefixes) ? n : [];
          },
        },
        {
          key: 'foamRemoveSNPrefixes',
          get: function () {
            var n, t;
            return null != (n = null == (t = this.config) ? undefined : t.foamRemoveSNPrefixes) ? n : [];
          },
        },
      ],
      [
        {
          key: 'sharedManager',
          value: function () {
            return new n();
          },
        },
      ]
    );
    return n;
  })();

exports.default = module1931;

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module387 = require('./387'),
  module377 = require('./377'),
  module415 = require('./415'),
  module12 = require('./12'),
  module411 = require('./411'),
  module389 = require('./389'),
  module936 = require('./936'),
  h = null,
  module1811 = (function () {
    function n() {
      module4.default(this, n);

      if (!h) {
        this.config = null;
        h = this;
      }

      return h;
    }

    module5.default(
      n,
      [
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
                          var n, o, h, module1811, x, k, w;
                          return regeneratorRuntime.default.async(
                            function (b) {
                              for (;;)
                                switch ((b.prev = b.next)) {
                                  case 0:
                                    if (
                                      (console.log('Will update ConfigInfo.'),
                                      (n = module936.areaServerMap[module377.RobotStatusManager.sharedManager().serverCode].host),
                                      (o = module415.DMM.configFilePath),
                                      !module389.isAutoTestSupported())
                                    ) {
                                      b.next = 7;
                                      break;
                                    }

                                    h = require('./1811');
                                    b.next = 20;
                                    break;

                                  case 7:
                                    module1811 = 'https://' + n + o;
                                    x = '/config.json';
                                    console.log('' + module1811 + x + '?time=' + new Date().getTime());
                                    b.next = 12;
                                    return regeneratorRuntime.default.awrap(module387.default.asyncDownloadFile('' + module1811 + x + '?time=' + new Date().getTime(), 'infoTemp'));

                                  case 12:
                                    k = b.sent;
                                    console.log('SoundPackageManager : ' + JSON.stringify(k));
                                    b.next = 16;
                                    return regeneratorRuntime.default.awrap(module387.default.asyncReadFile(k.filename));

                                  case 16:
                                    w = b.sent;
                                    h = JSON.parse(w);
                                    b.next = 20;
                                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.ConfigInfoStorage, JSON.stringify(h)));

                                  case 20:
                                    u.config = h;
                                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.ConfigDidLoad);
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
                      return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.ConfigInfoStorage));

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

exports.default = module1811;

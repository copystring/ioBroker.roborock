var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module387 = require('./387'),
  module377 = require('./377'),
  module415 = require('./415'),
  module12 = require('./12'),
  module411 = require('./411'),
  module389 = require('./389'),
  module934 = require('./934'),
  S = null,
  module1809 = (function () {
    function t() {
      module4.default(this, t);

      if (!S) {
        this.config = null;
        S = this;
      }

      return S;
    }

    module5.default(
      t,
      [
        {
          key: 'dockSetSNPrefixes',
          get: function () {
            var t, n;
            return null != (t = null == (n = this.config) ? undefined : n.dockSetSNPrefixes) ? t : [];
          },
        },
        {
          key: 'getConfig',
          value: function () {
            var t, o, u, S, module1809, y, x;
            return regeneratorRuntime.default.async(
              function (M) {
                for (;;)
                  switch ((M.prev = M.next)) {
                    case 0:
                      if (!this.config) {
                        M.next = 2;
                        break;
                      }

                      return M.abrupt('return', this.config);

                    case 2:
                      if (
                        ((t = module934.areaServerMap[module377.RobotStatusManager.sharedManager().serverCode].host),
                        (o = module415.DMM.configFilePath),
                        !module389.isAutoTestSupported())
                      ) {
                        M.next = 8;
                        break;
                      }

                      u = require('./1809');
                      M.next = 19;
                      break;

                    case 8:
                      S = 'https://' + t + o;
                      module1809 = '/config.json';
                      console.log('' + S + module1809 + '?time=' + new Date().getTime());
                      M.next = 13;
                      return regeneratorRuntime.default.awrap(module387.default.asyncDownloadFile('' + S + module1809 + '?time=' + new Date().getTime(), 'infoTemp'));

                    case 13:
                      y = M.sent;
                      console.log('SoundPackageManager : ' + JSON.stringify(y));
                      M.next = 17;
                      return regeneratorRuntime.default.awrap(module387.default.asyncReadFile(y.filename));

                    case 17:
                      x = M.sent;
                      u = JSON.parse(x);

                    case 19:
                      this.config = u;
                      module12.DeviceEventEmitter.emit(module411.NotificationKeys.ConfigDidLoad);
                      return M.abrupt('return', u);

                    case 22:
                    case 'end':
                      return M.stop();
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
            return new t();
          },
        },
      ]
    );
    return t;
  })();

exports.default = module1809;

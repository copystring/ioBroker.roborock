require('./13');

require('./1958');

require('./510').strings;
module424.DMM.bucket;

var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module391 = require('./391'),
  module381 = require('./381'),
  module420 = require('./420'),
  module416 = require('./416'),
  module424 = require('./424'),
  module394 = require('./394'),
  module390 = require('./390'),
  module393 = require('./393'),
  module1343 = require('./1343'),
  k = module424.DMM.soundPackageFilePath,
  P = null,
  _ = (function () {
    function t() {
      module6.default(this, t);
      if (!P) P = this;
      return P;
    }

    module7.default(t, null, [
      {
        key: 'sharedManager',
        value: function () {
          return new t();
        },
      },
      {
        key: 'wavFileName',
        value: function (t, n) {
          return module424.DMM.bucket + '_pre_' + t + '_' + n + '.wav';
        },
      },
      {
        key: 'downloadPreviewWavFiles',
        value: function (t, o) {
          var s = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    t.forEach(function (t) {
                      var u, l;
                      return regeneratorRuntime.default.async(
                        function (f) {
                          for (;;)
                            switch ((f.prev = f.next)) {
                              case 0:
                                try {
                                  u = s.wavFileName(t.voice_id, t.version);
                                  l = 'https://' + o + t.voice_pre_listen.split('.com')[1];
                                  module393.readFileList(function (t, o) {
                                    return regeneratorRuntime.default.async(
                                      function (t) {
                                        for (;;)
                                          switch ((t.prev = t.next)) {
                                            case 0:
                                              if (
                                                !o.find(function (t) {
                                                  return u == (module393.isMiApp || module391.default.isRRAndroid() ? t.name : t);
                                                })
                                              ) {
                                                t.next = 4;
                                                break;
                                              }

                                              t.next = 7;
                                              break;

                                            case 4:
                                              t.next = 6;
                                              return regeneratorRuntime.default.awrap(module391.default.asyncDownloadFile(l, u));

                                            case 6:
                                              t.sent;

                                            case 7:
                                            case 'end':
                                              return t.stop();
                                          }
                                      },
                                      null,
                                      null,
                                      null,
                                      Promise
                                    );
                                  });
                                } catch (n) {
                                  console.log('downloadPreviewWavFiles  failed - ' + t.voice_id + ' - ' + n);
                                }

                              case 1:
                              case 'end':
                                return f.stop();
                            }
                        },
                        null,
                        null,
                        null,
                        Promise
                      );
                    });

                  case 1:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
      {
        key: 'getListDataFromServer',
        value: function () {
          var t,
            o,
            s,
            f,
            module424,
            P,
            module2024,
            w,
            x,
            b,
            M,
            D,
            N,
            F,
            O,
            L = arguments;
          return regeneratorRuntime.default.async(
            function (J) {
              for (;;)
                switch ((J.prev = J.next)) {
                  case 0:
                    if (
                      ((t = L.length > 0 && undefined !== L[0] ? L[0] : null),
                      (J.prev = 1),
                      (o = module1343.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].host),
                      (s = module1343.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].cdnHost),
                      !module393.isAutoTestSupported())
                    ) {
                      J.next = 8;
                      break;
                    }

                    f = require('./2024');
                    J.next = 19;
                    break;

                  case 8:
                    module424 = 'https://' + o + k;
                    console.log('soundpackage info url : ' + module424 + 'info?time=' + new Date().getTime());
                    J.next = 12;
                    return regeneratorRuntime.default.awrap(module391.default.asyncDownloadFile(module424 + 'info?time=' + new Date().getTime(), 'infoTemp'));

                  case 12:
                    P = J.sent;
                    console.log('SoundPackageManager : ' + JSON.stringify(P));
                    J.next = 16;
                    return regeneratorRuntime.default.awrap(module391.default.asyncReadFile(P.filename));

                  case 16:
                    module2024 = J.sent;
                    f = JSON.parse(module2024);
                    module394.default.sharedCache().soundPackageListData = JSON.stringify(f);

                  case 19:
                    w = t || (module381.RobotStatusManager.sharedManager().deviceLocation || 'cn').replace('cn', 'prc');
                    x = (x = f.voice_list.filter(function (t) {
                      return -1 != t.applicable.indexOf(w);
                    })).sort(function (t, n) {
                      return n.voice_pri - t.voice_pri > 0 ? -1 : n.voice_pri == t.voice_pri ? 0 : 1;
                    });
                    b = [];
                    if (f.special_voice_list && f.special_voice_list.length)
                      b = (b = f.special_voice_list.filter(function (t) {
                        return -1 != t.applicable.indexOf(w);
                      })).sort(function (t, n) {
                        return n.voice_pri - t.voice_pri > 0 ? -1 : n.voice_pri == t.voice_pri ? 0 : 1;
                      });
                    this.downloadPreviewWavFiles(x, s);
                    this.downloadPreviewWavFiles(b, s);
                    J.next = 28;
                    return regeneratorRuntime.default.awrap(this.filterSpecialVoicesByServer(b));

                  case 28:
                    M = J.sent;
                    D = x.filter(function (t) {
                      return t.voice_id <= 999;
                    });
                    N = (N = x.filter(function (t) {
                      return t.voice_id >= 1e3;
                    })).concat(M);
                    this.sharedManager().soundPackages = x;
                    this.sharedManager().specialSoundPackages = b;
                    J.prev = 34;
                    J.next = 37;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.SoundPackageLsitData, JSON.stringify(x)));

                  case 37:
                    J.next = 39;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.SpecialSoundPackageLsitData, JSON.stringify(b)));

                  case 39:
                    J.next = 44;
                    break;

                  case 41:
                    J.prev = 41;
                    J.t0 = J.catch(34);
                    console.log('SoundPackageManager  SetStorageKey error: ' + ('object' == typeof J.t0 ? JSON.stringify(J.t0) : J.t0));

                  case 44:
                    F = [];

                    if (module390.default.isSupportedDownloadTestVoice() && f.factory_test_list && f.factory_test_list.length > 0) {
                      (O = f.factory_test_list[0]).voice_title = '\u5de5\u5382\u6d4b\u8bd5\u8bed\u97f3\u5305';
                      O.voice_sub_title = ' ';
                      F.push(O);
                    }

                    return J.abrupt('return', {
                      normal: D,
                      special: N,
                      factoryTest: F,
                    });

                  case 49:
                    J.prev = 49;
                    J.t1 = J.catch(1);
                    console.log('SoundPackageManager  error: ' + ('object' == typeof J.t1 ? JSON.stringify(J.t1) : J.t1));

                  case 52:
                  case 'end':
                    return J.stop();
                }
            },
            null,
            this,
            [
              [1, 49],
              [34, 41],
            ],
            Promise
          );
        },
      },
      {
        key: 'filterSpecialVoicesByServer',
        value: function (t) {
          var module6, module7, module391, module381;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (t && t.constructor === Array && t.length) {
                      l.next = 2;
                      break;
                    }

                    return l.abrupt('return', []);

                  case 2:
                    if (!module393.isAutoTestSupported()) {
                      l.next = 4;
                      break;
                    }

                    return l.abrupt('return', t);

                  case 4:
                    [];
                    module6 = [];
                    l.next = 8;
                    return regeneratorRuntime.default.awrap(module416.default.getSerialNumber());

                  case 8:
                    module7 = l.sent;
                    module391 = module7.result[0].serial_number;
                    l.prev = 10;
                    l.next = 13;
                    return regeneratorRuntime.default.awrap(module393.getVoicePackageList(module391));

                  case 13:
                    module6 = l.sent;
                    l.next = 19;
                    break;

                  case 16:
                    l.prev = 16;
                    l.t0 = l.catch(10);
                    console.log('SoundPackageManager getVoicePackageList error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

                  case 19:
                    module381 = [];
                    t.map(function (t) {
                      var n = module6.findIndex(function (n) {
                        return n.bizId == t.voice_id;
                      });

                      if (-1 != n) {
                        t.validEndTime = module6[n].validEndTime;
                        module381.push(t);
                      }
                    });
                    return l.abrupt('return', module381);

                  case 22:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            null,
            [[10, 16]],
            Promise
          );
        },
      },
      {
        key: 'getInUseSoundPackage',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getCurrentSoundPackage());

                  case 3:
                    t = o.sent;
                    this.sharedManager().currentUsedVoiceId = t.result[0].sid_in_use;
                    this.sharedManager().currentUsedVoiceVersion = t.result[0].sid_version;
                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    console.log('getCurrentSoundPackage  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                  case 11:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[0, 8]],
            Promise
          );
        },
      },
      {
        key: 'getListDataFromLocal',
        value: function () {
          var t, module6, module7, module391, module416, module424, module394, module390;
          return regeneratorRuntime.default.async(
            function (y) {
              for (;;)
                switch ((y.prev = y.next)) {
                  case 0:
                    y.prev = 0;
                    t = module1343.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].cdnHost;
                    y.next = 4;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.SoundPackageLsitData));

                  case 4:
                    module6 = y.sent;
                    y.next = 7;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.SpecialSoundPackageLsitData));

                  case 7:
                    module7 = y.sent;
                    module391 = JSON.parse(module6);
                    module416 = [];
                    if (module7) module416 = JSON.parse(module7);
                    this.downloadPreviewWavFiles(module391, t);
                    this.downloadPreviewWavFiles(module416, t);
                    y.next = 15;
                    return regeneratorRuntime.default.awrap(this.filterSpecialVoicesByServer(module416));

                  case 15:
                    module424 = y.sent;
                    module394 = module391.filter(function (t) {
                      return t.voice_id <= 999;
                    });
                    module390 = (module390 = module391.filter(function (t) {
                      return t.voice_id >= 1e3;
                    })).concat(module424);
                    return y.abrupt('return', {
                      normal: module394 || [],
                      special: module390,
                    });

                  case 22:
                    y.prev = 22;
                    y.t0 = y.catch(0);
                    console.log('getListDataFromLocal  error: ' + ('object' == typeof y.t0 ? JSON.stringify(y.t0) : y.t0));

                  case 25:
                  case 'end':
                    return y.stop();
                }
            },
            null,
            this,
            [[0, 22]],
            Promise
          );
        },
      },
      {
        key: 'checkSoundPackageNeedUpgrade',
        value: function () {
          var t = 0,
            n = this.sharedManager(),
            o = n.currentUsedVoiceId,
            s = n.currentUsedVoiceVersion;

          if (o) {
            if (n.soundPackages)
              n.soundPackages.forEach(function (n) {
                if (o == n.voice_id && s < n.version) t = o;
              });
            if (n.specialSoundPackages)
              n.specialSoundPackages.forEach(function (n) {
                if (o == n.voice_id && s < n.version) t = o;
              });
          }

          console.log('checkSoundPackageNeedUpgrade - id - ' + t);
          return t;
        },
      },
      {
        key: 'startPlay',
        value: function (t, o) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    return n.abrupt(
                      'return',
                      new Promise(function (n, s) {
                        module393.startPlay(t, o, function (o, c) {
                          if (o) n(true);
                          else
                            s({
                              error: 'RRMISDK startPlay error : ' + t,
                              data: c,
                            });
                        });
                      })
                    );

                  case 1:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
      {
        key: 'getCurrentSoundPackage',
        value: function (t) {
          var o, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getCurrentSoundPackage());

                  case 3:
                    o = c.sent;
                    s = 'info.' + module393.deviceModel;
                    module393.readFile(s, function (n, s) {
                      if (n && s) {
                        var c = JSON.parse(s),
                          u = o.result[0].sid_in_use,
                          l = c.voice_list.find(function (t) {
                            return t.voice_id == u;
                          });
                        t(l);
                      }
                    });
                    c.next = 11;
                    break;

                  case 8:
                    c.prev = 8;
                    c.t0 = c.catch(0);
                    console.log(c.t0);

                  case 11:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            null,
            [[0, 8]],
            Promise
          );
        },
      },
      {
        key: 'stopPlay',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return t.abrupt(
                      'return',
                      new Promise(function (t, n) {
                        module393.stopPlay(function (o) {
                          if (o) t(true);
                          else
                            n({
                              error: 'RRMISDK stopPlay error : ',
                              data: 'unknow reason',
                            });
                        });
                      })
                    );

                  case 1:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
    ]);
    return t;
  })();

exports.default = _;

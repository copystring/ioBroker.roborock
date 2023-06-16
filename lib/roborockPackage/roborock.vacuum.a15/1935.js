require('./12');

require('./1875');

require('./505').strings;
module423.DMM.bucket;

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module391 = require('./391'),
  module381 = require('./381'),
  module419 = require('./419'),
  module415 = require('./415'),
  module423 = require('./423'),
  module394 = require('./394'),
  module390 = require('./390'),
  module393 = require('./393'),
  module1265 = require('./1265'),
  k = module423.DMM.soundPackageFilePath,
  P = null,
  module1936 = (function () {
    function t() {
      module4.default(this, t);
      if (!P) P = this;
      return P;
    }

    module5.default(t, null, [
      {
        key: 'sharedManager',
        value: function () {
          return new t();
        },
      },
      {
        key: 'wavFileName',
        value: function (t, n) {
          return module423.DMM.bucket + '_pre_' + t + '_' + n + '.wav';
        },
      },
      {
        key: 'downloadPreviewWavFiles',
        value: function (t, s) {
          var o = this;
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
                                  u = o.wavFileName(t.voice_id, t.version);
                                  l = 'https://' + s + t.voice_pre_listen.split('.com')[1];
                                  module393.readFileList(function (t, s) {
                                    return regeneratorRuntime.default.async(
                                      function (t) {
                                        for (;;)
                                          switch ((t.prev = t.next)) {
                                            case 0:
                                              if (
                                                !s.find(function (t) {
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
          var t, s, o, module415, module423, P, module1936, w, x, b, M, D, N, F;
          return regeneratorRuntime.default.async(
            function (O) {
              for (;;)
                switch ((O.prev = O.next)) {
                  case 0:
                    if (
                      ((O.prev = 0),
                      (t = module1265.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].host),
                      (s = module1265.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].cdnHost),
                      !module393.isAutoTestSupported())
                    ) {
                      O.next = 7;
                      break;
                    }

                    o = require('./1936');
                    O.next = 18;
                    break;

                  case 7:
                    module415 = 'https://' + t + k;
                    console.log('soundpackage info url : ' + module415 + 'info?time=' + new Date().getTime());
                    O.next = 11;
                    return regeneratorRuntime.default.awrap(module391.default.asyncDownloadFile(module415 + 'info?time=' + new Date().getTime(), 'infoTemp'));

                  case 11:
                    module423 = O.sent;
                    console.log('SoundPackageManager : ' + JSON.stringify(module423));
                    O.next = 15;
                    return regeneratorRuntime.default.awrap(module391.default.asyncReadFile(module423.filename));

                  case 15:
                    P = O.sent;
                    o = JSON.parse(P);
                    module394.default.sharedCache().soundPackageListData = JSON.stringify(o);

                  case 18:
                    module1936 = (module381.RobotStatusManager.sharedManager().deviceLocation || 'cn').replace('cn', 'prc');
                    w = (w = o.voice_list.filter(function (t) {
                      return -1 != t.applicable.indexOf(module1936);
                    })).sort(function (t, n) {
                      return n.voice_pri - t.voice_pri > 0 ? -1 : n.voice_pri == t.voice_pri ? 0 : 1;
                    });
                    x = [];
                    if (o.special_voice_list && o.special_voice_list.length)
                      x = (x = o.special_voice_list.filter(function (t) {
                        return -1 != t.applicable.indexOf(module1936);
                      })).sort(function (t, n) {
                        return n.voice_pri - t.voice_pri > 0 ? -1 : n.voice_pri == t.voice_pri ? 0 : 1;
                      });
                    this.downloadPreviewWavFiles(w, s);
                    this.downloadPreviewWavFiles(x, s);
                    O.next = 27;
                    return regeneratorRuntime.default.awrap(this.filterSpecialVoicesByServer(x));

                  case 27:
                    b = O.sent;
                    M = w.filter(function (t) {
                      return t.voice_id <= 999;
                    });
                    D = (D = w.filter(function (t) {
                      return t.voice_id >= 1e3;
                    })).concat(b);
                    this.sharedManager().soundPackages = w;
                    this.sharedManager().specialSoundPackages = x;
                    O.prev = 33;
                    O.next = 36;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.SoundPackageLsitData, JSON.stringify(w)));

                  case 36:
                    O.next = 38;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.SpecialSoundPackageLsitData, JSON.stringify(x)));

                  case 38:
                    O.next = 43;
                    break;

                  case 40:
                    O.prev = 40;
                    O.t0 = O.catch(33);
                    console.log('SoundPackageManager  SetStorageKey error: ' + ('object' == typeof O.t0 ? JSON.stringify(O.t0) : O.t0));

                  case 43:
                    N = [];

                    if (module390.default.isSupportedDownloadTestVoice() && o.factory_test_list && o.factory_test_list.length > 0) {
                      (F = o.factory_test_list[0]).voice_title = '\u5de5\u5382\u6d4b\u8bd5\u8bed\u97f3\u5305';
                      F.voice_sub_title = ' ';
                      N.push(F);
                    }

                    return O.abrupt('return', {
                      normal: M,
                      special: D,
                      factoryTest: N,
                    });

                  case 48:
                    O.prev = 48;
                    O.t1 = O.catch(0);
                    console.log('SoundPackageManager  error: ' + ('object' == typeof O.t1 ? JSON.stringify(O.t1) : O.t1));

                  case 51:
                  case 'end':
                    return O.stop();
                }
            },
            null,
            this,
            [
              [0, 48],
              [33, 40],
            ],
            Promise
          );
        },
      },
      {
        key: 'filterSpecialVoicesByServer',
        value: function (t) {
          var module4, module5, module391, module381;
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
                    module4 = [];
                    l.next = 8;
                    return regeneratorRuntime.default.awrap(module415.default.getSerialNumber());

                  case 8:
                    module5 = l.sent;
                    module391 = module5.result[0].serial_number;
                    l.prev = 10;
                    l.next = 13;
                    return regeneratorRuntime.default.awrap(module393.getVoicePackageList(module391));

                  case 13:
                    module4 = l.sent;
                    l.next = 19;
                    break;

                  case 16:
                    l.prev = 16;
                    l.t0 = l.catch(10);
                    console.log('SoundPackageManager getVoicePackageList error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

                  case 19:
                    module381 = [];
                    t.map(function (t) {
                      var n = module4.findIndex(function (n) {
                        return n.bizId == t.voice_id;
                      });

                      if (-1 != n) {
                        t.validEndTime = module4[n].validEndTime;
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
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getCurrentSoundPackage());

                  case 3:
                    t = s.sent;
                    this.sharedManager().currentUsedVoiceId = t.result[0].sid_in_use;
                    this.sharedManager().currentUsedVoiceVersion = t.result[0].sid_version;
                    s.next = 11;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(0);
                    console.log('getCurrentSoundPackage  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 11:
                  case 'end':
                    return s.stop();
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
          var t, module4, module5, module391, module415, module423, module394, module390;
          return regeneratorRuntime.default.async(
            function (y) {
              for (;;)
                switch ((y.prev = y.next)) {
                  case 0:
                    y.prev = 0;
                    t = module1265.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].cdnHost;
                    y.next = 4;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.SoundPackageLsitData));

                  case 4:
                    module4 = y.sent;
                    y.next = 7;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.SpecialSoundPackageLsitData));

                  case 7:
                    module5 = y.sent;
                    module391 = JSON.parse(module4);
                    module415 = [];
                    if (module5) module415 = JSON.parse(module5);
                    this.downloadPreviewWavFiles(module391, t);
                    this.downloadPreviewWavFiles(module415, t);
                    y.next = 15;
                    return regeneratorRuntime.default.awrap(this.filterSpecialVoicesByServer(module415));

                  case 15:
                    module423 = y.sent;
                    module394 = module391.filter(function (t) {
                      return t.voice_id <= 999;
                    });
                    module390 = (module390 = module391.filter(function (t) {
                      return t.voice_id >= 1e3;
                    })).concat(module423);
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
            s = n.currentUsedVoiceId,
            o = n.currentUsedVoiceVersion;

          if (s) {
            if (n.soundPackages)
              n.soundPackages.forEach(function (n) {
                if (s == n.voice_id && o < n.version) t = s;
              });
            if (n.specialSoundPackages)
              n.specialSoundPackages.forEach(function (n) {
                if (s == n.voice_id && o < n.version) t = s;
              });
          }

          console.log('checkSoundPackageNeedUpgrade - id - ' + t);
          return t;
        },
      },
      {
        key: 'startPlay',
        value: function (t, s) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    return n.abrupt(
                      'return',
                      new Promise(function (n, o) {
                        module393.startPlay(t, s, function (s, c) {
                          if (s) n(true);
                          else
                            o({
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
          var s, o;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getCurrentSoundPackage());

                  case 3:
                    s = c.sent;
                    o = 'info.' + module393.deviceModel;
                    module393.readFile(o, function (n, o) {
                      if (n && o) {
                        var c = JSON.parse(o),
                          u = s.result[0].sid_in_use,
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
                        module393.stopPlay(function (s) {
                          if (s) t(true);
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

exports.default = module1936;

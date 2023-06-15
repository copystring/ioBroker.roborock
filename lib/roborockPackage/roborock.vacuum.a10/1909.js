require('./12');

require('./1851');

module415.DMM.bucket;

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module387 = require('./387'),
  module377 = require('./377'),
  module411 = require('./411'),
  module407 = require('./407'),
  module415 = require('./415'),
  module389 = require('./389'),
  module491 = require('./491').strings,
  module934 = require('./934'),
  y = module415.DMM.soundPackageFilePath,
  k =
    {
      'zh-Hans': 'info',
      'zh-Hant': 'info.zh_TW',
      en: 'info.en',
      'zh-HK': 'info.zh_TW',
      'zh-TW': 'info.zh_TW',
    }[module491.getLanguage()] || 'info',
  P = null,
  module1910 = (function () {
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
          return module415.DMM.bucket + '_pre_' + t + '_' + n + '.wav';
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
                                  module389.readFileList(function (t, s) {
                                    return regeneratorRuntime.default.async(
                                      function (t) {
                                        for (;;)
                                          switch ((t.prev = t.next)) {
                                            case 0:
                                              if (
                                                !s.find(function (t) {
                                                  return u == (module389.isMiApp || module387.default.isRRAndroid() ? t.name : t);
                                                })
                                              ) {
                                                t.next = 4;
                                                break;
                                              }

                                              t.next = 7;
                                              break;

                                            case 4:
                                              t.next = 6;
                                              return regeneratorRuntime.default.awrap(module387.default.asyncDownloadFile(l, u));

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
          var t, s, o, module407, module415, h, P, module1910, _, x;

          return regeneratorRuntime.default.async(
            function (b) {
              for (;;)
                switch ((b.prev = b.next)) {
                  case 0:
                    if (
                      ((b.prev = 0),
                      (t = module934.areaServerMap[module377.RobotStatusManager.sharedManager().serverCode].host),
                      (s = module934.areaServerMap[module377.RobotStatusManager.sharedManager().serverCode].cdnHost),
                      !module389.isAutoTestSupported())
                    ) {
                      b.next = 7;
                      break;
                    }

                    o = require('./1910');
                    b.next = 17;
                    break;

                  case 7:
                    module407 = 'https://' + t + y;
                    console.log('' + module407 + k + '?time=' + new Date().getTime());
                    b.next = 11;
                    return regeneratorRuntime.default.awrap(module387.default.asyncDownloadFile('' + module407 + k + '?time=' + new Date().getTime(), 'infoTemp'));

                  case 11:
                    module415 = b.sent;
                    console.log('SoundPackageManager : ' + JSON.stringify(module415));
                    b.next = 15;
                    return regeneratorRuntime.default.awrap(module387.default.asyncReadFile(module415.filename));

                  case 15:
                    h = b.sent;
                    o = JSON.parse(h);

                  case 17:
                    P = (module377.RobotStatusManager.sharedManager().deviceLocation || 'cn').replace('cn', 'prc');
                    module1910 = (module1910 = o.voice_list.filter(function (t) {
                      return -1 != t.applicable.indexOf(P);
                    })).sort(function (t, n) {
                      return n.voice_pri - t.voice_pri > 0 ? -1 : n.voice_pri == t.voice_pri ? 0 : 1;
                    });
                    _ = [];
                    if (o.special_voice_list && o.special_voice_list.length)
                      _ = (_ = o.special_voice_list.filter(function (t) {
                        return -1 != t.applicable.indexOf(P);
                      })).sort(function (t, n) {
                        return n.voice_pri - t.voice_pri > 0 ? -1 : n.voice_pri == t.voice_pri ? 0 : 1;
                      });
                    this.downloadPreviewWavFiles(module1910, s);
                    this.downloadPreviewWavFiles(_, s);
                    b.next = 26;
                    return regeneratorRuntime.default.awrap(this.filterSpecialVoicesByServer(_));

                  case 26:
                    x = b.sent;
                    this.sharedManager().soundPackages = module1910;
                    this.sharedManager().specialSoundPackages = _;
                    b.prev = 29;
                    b.next = 32;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.SoundPackageLsitData, JSON.stringify(module1910)));

                  case 32:
                    b.next = 34;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.SpecialSoundPackageLsitData, JSON.stringify(_)));

                  case 34:
                    b.next = 39;
                    break;

                  case 36:
                    b.prev = 36;
                    b.t0 = b.catch(29);
                    console.log('SoundPackageManager  SetStorageKey error: ' + ('object' == typeof b.t0 ? JSON.stringify(b.t0) : b.t0));

                  case 39:
                    return b.abrupt('return', {
                      special: x,
                      normal: module1910,
                    });

                  case 42:
                    b.prev = 42;
                    b.t1 = b.catch(0);
                    console.log('SoundPackageManager  error: ' + ('object' == typeof b.t1 ? JSON.stringify(b.t1) : b.t1));

                  case 45:
                  case 'end':
                    return b.stop();
                }
            },
            null,
            this,
            [
              [0, 42],
              [29, 36],
            ],
            Promise
          );
        },
      },
      {
        key: 'filterSpecialVoicesByServer',
        value: function (t) {
          var module4, module5, module387, module377;
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
                    if (!module389.isAutoTestSupported()) {
                      l.next = 4;
                      break;
                    }

                    return l.abrupt('return', t);

                  case 4:
                    [];
                    module4 = [];
                    l.next = 8;
                    return regeneratorRuntime.default.awrap(module407.default.getSerialNumber());

                  case 8:
                    module5 = l.sent;
                    module387 = module5.result[0].serial_number;
                    l.prev = 10;
                    l.next = 13;
                    return regeneratorRuntime.default.awrap(module389.getVoicePackageList(module387));

                  case 13:
                    module4 = l.sent;
                    l.next = 19;
                    break;

                  case 16:
                    l.prev = 16;
                    l.t0 = l.catch(10);
                    console.log('SoundPackageManager getVoicePackageList error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

                  case 19:
                    module377 = [];
                    t.map(function (t) {
                      var n = module4.findIndex(function (n) {
                        return n.bizId == t.voice_id;
                      });

                      if (-1 != n) {
                        t.validEndTime = module4[n].validEndTime;
                        module377.push(t);
                      }
                    });
                    return l.abrupt('return', module377);

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
                    return regeneratorRuntime.default.awrap(module407.default.getCurrentSoundPackage());

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
          var t, module4, module5, module387, module407, module415;
          return regeneratorRuntime.default.async(
            function (v) {
              for (;;)
                switch ((v.prev = v.next)) {
                  case 0:
                    v.prev = 0;
                    t = module934.areaServerMap[module377.RobotStatusManager.sharedManager().serverCode].cdnHost;
                    v.next = 4;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.SoundPackageLsitData));

                  case 4:
                    module4 = v.sent;
                    v.next = 7;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.SpecialSoundPackageLsitData));

                  case 7:
                    module5 = v.sent;
                    module387 = JSON.parse(module4);
                    module407 = [];
                    if (module5) module407 = JSON.parse(module5);
                    this.downloadPreviewWavFiles(module387, t);
                    this.downloadPreviewWavFiles(module407, t);
                    v.next = 15;
                    return regeneratorRuntime.default.awrap(this.filterSpecialVoicesByServer(module407));

                  case 15:
                    module415 = v.sent;
                    return v.abrupt('return', {
                      special: module415,
                      normal: module387 || [],
                    });

                  case 19:
                    v.prev = 19;
                    v.t0 = v.catch(0);
                    console.log('getListDataFromLocal  error: ' + ('object' == typeof v.t0 ? JSON.stringify(v.t0) : v.t0));

                  case 22:
                  case 'end':
                    return v.stop();
                }
            },
            null,
            this,
            [[0, 19]],
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
                        module389.startPlay(t, s, function (s, c) {
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
                    return regeneratorRuntime.default.awrap(module407.default.getCurrentSoundPackage());

                  case 3:
                    s = c.sent;
                    o = 'info.' + module389.deviceModel;
                    module389.readFile(o, function (n, o) {
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
                        module389.stopPlay(function (s) {
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

exports.default = module1910;

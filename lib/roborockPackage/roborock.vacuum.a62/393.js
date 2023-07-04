exports.getDiskSize = function () {
  if (!y) return S.getDiskSize();
};

exports.enableAVCall = function (n) {
  if (!y) S.enableAVCall && S.enableAVCall(n);
};

exports.setMaxFramerate = function (n) {
  if (!y) S.setMaxFramerate && S.setMaxFramerate(n);
};

exports.getDeviceType = function () {
  if (y) return -1;

  if (!S.iotType) {
    console.log('\u5f53\u524d\u8bbe\u5907\u7c7b\u578b \u4e3a \u672a\u77e5\u7c7b\u578b');
    return 0;
  }

  if (1 == S.iotType) {
    console.log('\u5f53\u524d\u8bbe\u5907\u7c7b\u578b \u4e3a tuya');
    return 1;
  }

  if (2 == S.iotType) {
    console.log('\u5f53\u524d\u8bbe\u5907\u7c7b\u578b \u4e3a rriot');
    return 2;
  }
};

exports.getDevicePropertyFromMemCache = function (n, o) {
  if (y)
    o({
      localip: N.IP,
      ssid: N.SSID,
      mac: N.mac,
      lastVersion: N.lastVersion,
    });
};

exports.callMethod = function (n, o, t, c) {
  if (y)
    return void N.getDeviceWifi()
      .callMethod(n, o)
      .then(function (n) {
        return c(true, n);
      })
      .catch(function (n) {
        return c(false, n);
      });
  if ('android' === module12.Platform.OS) o.constructor === Array ? S.callMethod(n, o, t, c) : S.callMethodWithObject(n, o, t, c);
  else S.callMethod(n, o, t, c);
};

exports.callMethodFromCloud = function (n, o, t, c) {
  if (y)
    return void N.getDeviceWifi()
      .callMethod(n, o)
      .then(function (n) {
        return c(true, n);
      })
      .catch(function (n) {
        return c(false, n);
      });
  S.callMethodFromCloud(n, o, t, c);
};

exports.callMethodForceWay = function (n, o, t, c, u) {
  if (y)
    return void N.getDeviceWifi()
      .callMethodFromLocal(n, o)
      .then(function (n) {
        return u(n);
      })
      .catch(function (n) {
        return u(n);
      });
  S.callMethodFromLocal(n, o, t, u);
};

exports.callMethodForceWayNew = function (n, o, t) {
  return y
    ? N.getDeviceWifi().callMethodFromLocal(n, o)
    : new Promise(function (c, u) {
        console.log('callMethodForceWayNew 1');
        S.callMethodFromLocal(n, o, t, function (n, o) {
          console.log('callMethodForceWayNew callback');
          if (n) c(true);
          else u(o);
        });
      });
};

exports.callSmartHomeAPI = function (n, o, t) {
  if (t) t({});
};

exports.getMapData = function (n, o, t) {
  if (y) {
    var module413 = require('./413');

    module413.downloadMap(n, o, function (n, o) {
      t(n, o);
    });
  } else
    S.getMapData(n, o, function (n, o) {
      if (n && module395.default.isValidatedMapData(o)) t(true, o);
      else t(false, o || 'invalidated map data');
    });
};

exports.getMapBase64Data = function () {
  return regeneratorRuntime.default.async(
    function (n) {
      for (;;)
        switch ((n.prev = n.next)) {
          case 0:
            n.next = 2;
            return regeneratorRuntime.default.awrap(le('get_map', {}, module399.DecryptorType.Lz4));

          case 2:
            return n.abrupt('return', n.sent);

          case 3:
          case 'end':
            return n.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.getPhotoBase64Data = function (n, o, t) {
  le(
    'get_photo',
    {
      data_filter: {
        img_id: n,
        type: o,
      },
    },
    module399.DecryptorType.gzip
  )
    .then(function (n) {
      var o = module399.parsePhotoData(n);
      if (o) t(true, o);
      else t(false, 'getPhotoBase64Data decrypt failed');
    })
    .catch(function (n) {
      t(false, 'getPhotoBase64Data decrypt failed');
    });
};

exports.getAndDecBase64Data = le;
exports.getRobotData = se;

exports.closeCurrentPage = function () {
  if (y) return void M.exit();
  S.closeCurrentPage();
};

exports.getPhoneTimezone = function () {
  return y
    ? new Promise(function (n, o) {
        n(w.locale.timeZone);
      })
    : new Promise(function (n, o) {
        S.getSystemTimezoneNameWithCallback(function (t, c) {
          if (t) n(c);
          else o('getPhoneTimezone error');
        });
      });
};

exports.getCurrentCountryInfoCallback = function (n) {
  if (y)
    x.getServerName()
      .then(function (o) {
        return n(true, o);
      })
      .catch(function () {
        n(false);
      });
  else S.getCurrentCountryInfoCallback(n);
};

exports.saveInfo = function (n) {
  if (y)
    return void w.storage.save({
      roborock_key: n,
    });
  S.saveInfo(n);
};

exports.loadInfoCallback = function (n) {
  if (y)
    return void w.storage.get('roborock_key').then(function (o) {
      return n(o);
    });
  S.loadInfoCallback(n);
};

exports.postPrivacyAgreementStatus = function (n, o) {
  return y
    ? new Promise(function (t, c) {
        var u = ie.PrivacyAgreementStatusKey,
          l = JSON.stringify({
            deviceId: j,
            deviceModel: G,
            server: n,
            type: o,
          });
        x.storage
          .setThirdUserConfigsForOneKey(G, u, l)
          .then(function (n) {
            t(true);
          })
          .catch(function (n) {
            c(false);
          });
      })
    : new Promise(function (t, c) {
        var module410 = require('./410').version;

        S.uploadSignStatus(j, G, n, o, module410, '', function (n) {
          if (n) t(true);
          else c(false);
        });
      });
};

exports.getDeviceExtraInfoForKey = function (n) {
  return y
    ? fe(n)
    : new Promise(function (o, t) {
        S.getDeviceExtraInfoForKey(n)
          .then(function (n) {
            o(n);
          })
          .catch(function (n) {
            t(n);
          });
      });
};

exports.saveDeviceExtraValue = function (n, o) {
  return y
    ? new Promise(function (t, c) {
        ve(n, o);
        t(true);
      })
    : new Promise(function (t, c) {
        S.saveDeviceExtraValue(o, n)
          .then(function (n) {
            t(n);
          })
          .catch(function (n) {
            c(n);
          });
      });
};

exports.postPrivacyAgreementStatusWithVersion = function (n, o, t) {
  return y
    ? new Promise(function (c, u) {
        var l = ie.PrivacyAgreementStatusWithVersionKey,
          s = JSON.stringify({
            deviceId: j,
            deviceModel: G,
            server: n,
            type: o,
            version: t,
          });
        x.storage
          .setThirdUserConfigsForOneKey(G, l, s)
          .then(function (n) {
            c(true);
          })
          .catch(function (n) {
            u(false);
          });
      })
    : new Promise(function (c, u) {
        S.uploadSignStatus(j, G, n, o, t, '', function (n) {
          if (n) c(true);
          else u(false);
        });
      });
};

exports.getPrivacyAgreementByKey = function (n) {
  if (y)
    return new Promise(function (o, t) {
      x.storage
        .getThirdUserConfigsForOneKey(G, n)
        .then(function (n) {
          o(n);
        })
        .catch(function (n) {
          t(n);
        });
    });
};

exports.setValue = ve;
exports.getValue = fe;

exports.canOpenDeviceSharePage = function () {
  if (y) return false;
  return S.openDeviceSharePage;
};

exports.openDeviceSharePage = function () {
  if (!y) S.openDeviceSharePage(j);
};

exports.localPingWithCallback = function (n) {
  if (y)
    return void N.getDeviceWifi()
      .localPing()
      .then(function (o) {
        return n(true);
      })
      .catch(function (o) {
        return n(false);
      });
  S.localPingWithCallback(n);
};

exports.downloadFile = function (n, o, t) {
  if (y)
    w.file
      .downloadFile(n, o)
      .then(function (n) {
        t(true, n);
      })
      .catch(function (n) {
        t(false);
      });
  else S.downloadFile(n, o, t);
};

exports.readFile = function (n, o) {
  if (y)
    w.file
      .readFile(n)
      .then(function (n) {
        o(true, n);
      })
      .catch(function (n) {
        o(false, n);
      });
  else S.readFile(n, o);
};

exports.readFilePromise = function (n) {
  return y
    ? w.file.readFile(n)
    : new Promise(function (o, t) {
        S.readFile(n, function (n, c) {
          if (n) o(c);
          else t('readFile error');
        });
      });
};

exports.deleteFile = function (n, o) {
  if (y)
    w.file
      .deleteFile(n)
      .then(function (n) {
        o(true);
      })
      .catch(function (n) {
        o(false, n);
      });
  else S.deleteFile(n, o);
};

exports.readFileList = function (n) {
  if (y)
    w.file
      .readFileList()
      .then(function (o) {
        n(true, o);
      })
      .catch(function (o) {
        n(false, o);
      });
  else S.readFileList(n);
};

exports.readFileListAtPath = function (n) {
  var o, module22;
  return regeneratorRuntime.default.async(
    function (l) {
      for (;;)
        switch ((l.prev = l.next)) {
          case 0:
            o = y ? w.file.readFileList(n) : S.readFileListAtPath(n);
            l.prev = 1;
            l.next = 4;
            return regeneratorRuntime.default.awrap(o);

          case 4:
            module22 = l.sent;
            return l.abrupt(
              'return',
              'android' === module12.Platform.OS || y
                ? module22.map(function (n) {
                    return n.name;
                  })
                : module22
            );

          case 8:
            l.prev = 8;
            l.t0 = l.catch(1);
            return l.abrupt('return', null);

          case 11:
          case 'end':
            return l.stop();
        }
    },
    null,
    null,
    [[1, 8]],
    Promise
  );
};

exports.writeFileToPath = function (n, o) {
  var module22, u;
  return regeneratorRuntime.default.async(
    function (l) {
      for (;;)
        switch ((l.prev = l.next)) {
          case 0:
            module22 = y ? w.file.writeFile(n, o) : S.writeFileToPath(n, o);
            l.prev = 1;
            l.next = 4;
            return regeneratorRuntime.default.awrap(module22);

          case 4:
            u = l.sent;
            console.log('writeFileToPath success ' + n, u);
            l.next = 11;
            break;

          case 8:
            l.prev = 8;
            l.t0 = l.catch(1);
            console.log('writeFileToPath  error ' + n + ': ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

          case 11:
          case 'end':
            return l.stop();
        }
    },
    null,
    null,
    [[1, 8]],
    Promise
  );
};

exports.isLogFunctionSupported = function () {
  return y || !!S.writeFileToPath;
};

exports.startPlay = function (n, o, t) {
  if (y)
    w.audio
      .startPlay(n, o)
      .then(function (n) {
        console.log('Host.audio.startPlay - ' + JSON.stringify(n));
        t(true, n);
      })
      .catch(function (n) {
        console.log('Host.audio.startPlay error: ' + ('object' == typeof n ? JSON.stringify(n) : n));
        t(false, n);
      });
  else if (S.startPlay) S.startPlay(n, o, t);
  else t(true, {});
};

exports.stopPlay = function (n) {
  if (y)
    w.audio
      .stopPlay()
      .then(function () {
        n(true);
      })
      .catch(function (o) {
        n(false);
      });
  else if (S.stopPlay) S.stopPlay(n);
  else n(true);
};

exports.openRoomManagementPage = function () {
  if (y) w.ui.openRoomManagementPage();
};

exports.openShareDevicePage = function () {
  if (y) w.ui.openShareDevicePage();
};

exports.openDeviceUpgradePage = function () {
  if (y) w.ui.openDeviceUpgradePage();
  else S.openDeviceUpgradePage();
};

exports.openIftttAutoPage = function () {
  if (y) w.ui.openIftttAutoPage();
};

exports.openNewMorePage = function () {
  if (y) console.log('openNewMorePage openNewMorePage');
};

exports.openAddToDesktopPage = function () {
  if (y) w.ui.openAddToDesktopPage();
};

exports.openPrivacyLicense = function (n, o, t, c, u) {
  var module177 = require('./177'),
    s = module177(o).uri,
    v = module177(c).uri;

  S.openPrivacyLicense(n, s, t, v, u);
};

exports.openPrivacyLicenseNew = function (n, o, t, c, u) {
  if (!y) S.openPrivacyLicense(n, o, t, c, u);
};

exports.openDeleteDevice = function (n) {
  if (y) w.ui.openDeleteDevice(n);
  else S.openDeleteDevice();
};

exports.openShopPage = function (n) {
  if (y) {
    console.log('openShopPage -- ' + n);
    w.ui.openShopPage(n);
  }
};

exports.isOpenSmallProgram = function () {
  return S.gotoWxMiniProgramMall && !y;
};

exports.openSmallProgram = function (n) {
  if (!y) S.gotoWxMiniProgramMall(n);
};

exports.miAddTimer = function (n) {
  return new Promise(function (o, t) {
    var c = x.scene.createTimerScene(j, n);
    console.log('miAddTimer - deviceId - ' + j + ' - opt - ' + JSON.stringify(n));
    c.save()
      .then(function (n) {
        o(n);
      })
      .catch(function (n) {
        t(n);
      });
  });
};

exports.rrAddOrEditTimer = function (n, o, t, c) {
  return new Promise(function (u, l) {
    S.addOrSetTimer(j, c, o, n, t, function (n, o) {
      if (n) u(true);
      else l(o);
    });
  });
};

exports.setSmartSceneParams = function (n, o) {
  if (!S.setSmartSceneParams)
    return new Promise(function (n, o) {
      o('Native method not found.');
    });
  return S.setSmartSceneParams(n, o);
};

exports.getServerTimers = function () {
  return regeneratorRuntime.default.async(
    function (n) {
      for (;;)
        switch ((n.prev = n.next)) {
          case 0:
            if (!y) {
              n.next = 4;
              break;
            }

            return n.abrupt('return', x.scene.loadTimerScenes(j));

          case 4:
            return n.abrupt(
              'return',
              new Promise(function (n, o) {
                S.getTimers(j, function (t, c) {
                  if (t) n(c);
                  else o(c);
                });
              })
            );

          case 5:
          case 'end':
            return n.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.delServerTimer = function (n) {
  return y
    ? n.remove()
    : new Promise(function (o, t) {
        S.removeTimer(j, n, function (n, c) {
          if (n) o(true);
          else t(c);
        });
      });
};

exports.updateTimer = function (n, o) {
  if (y) {
    console.log('timerScene -', n);
    var t = JSON.parse(JSON.stringify(n.setting));
    t.enable_timer = o;
    var c = {
      name: n.name,
      setting: t,
    };
    console.log('mi updateTimer - ' + JSON.stringify(c));
    return n.save(c);
  }

  return new Promise(function (t, c) {
    S.updateTimerStatus(j, n, o, function (n, o) {
      if (n) t(true);
      else c(o);
    });
  });
};

exports.getFirmwareVersion = function () {
  return regeneratorRuntime.default.async(
    function (n) {
      for (;;)
        switch ((n.prev = n.next)) {
          case 0:
            if (!y) {
              n.next = 4;
              break;
            }

            return n.abrupt('return', N.getDeviceWifi().getVersion());

          case 4:
            n.next = 6;
            return regeneratorRuntime.default.awrap(S.getLastVersionInfo());

          case 6:
            return n.abrupt('return', n.sent);

          case 7:
          case 'end':
            return n.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.isSupportFirmwareVersion = function () {
  return !!y || undefined != S.getLastVersionInfo;
};

exports.getFirmwareUpgradingInfo = function (n, o) {
  if (y) return x.smarthome.checkDeviceVersion(n, o);
};

exports.isOwner = function () {
  return y ? N.isOwner : H == B;
};

exports.isDarkMode = function () {
  return de() == ue.dark;
};

exports.syncTheme = function (n) {
  var o, t;
  if (!(y || null == b || null == b.getColorScheme || null == (o = (t = b.getColorScheme()).then)))
    o.call(t, function (o) {
      n(o);
    });
};

exports.getRoomList = function (n) {
  var o, t;
  return regeneratorRuntime.default.async(
    function (l) {
      for (;;)
        switch ((l.prev = l.next)) {
          case 0:
            if (!y) {
              l.next = 4;
              break;
            }

            if ('ios' === module12.Platform.OS || U >= p)
              x.room
                .loadAllRoom(true)
                .then(function (o) {
                  var t = o
                    .filter(function (n) {
                      return 'mijia.roomid.default' != n.roomID;
                    })
                    .map(function (n) {
                      return {
                        roomId: n.roomID,
                        name: n.name,
                      };
                    });
                  n(true, t);
                })
                .catch(function (o) {
                  n(false, o);
                });
            l.next = 16;
            break;

          case 4:
            if (!S.getRoomList) {
              l.next = 16;
              break;
            }

            l.prev = 5;
            l.next = 8;
            return regeneratorRuntime.default.awrap(S.getRoomList());

          case 8:
            o = l.sent;
            t = 'object' == typeof o ? o : JSON.parse(o);
            n(true, t);
            l.next = 16;
            break;

          case 13:
            l.prev = 13;
            l.t0 = l.catch(5);
            n(false, l.t0);

          case 16:
          case 'end':
            return l.stop();
        }
    },
    null,
    null,
    [[5, 13]],
    Promise
  );
};

exports.addNewRoomWithName = function (n) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            return o.abrupt(
              'return',
              new Promise(function (o, t) {
                if (y)
                  'ios' === module12.Platform.OS || U >= p
                    ? x.room
                        .createRoom(n)
                        .then(function (n) {
                          var t = {
                            roomId: n.roomID,
                            name: n.name,
                          };
                          o(t);
                        })
                        .catch(function (n) {
                          t(n);
                        })
                    : t('Method not availiable');
                else if (S.addNewRoomWithName)
                  S.addNewRoomWithName(n)
                    .then(function (n) {
                      var t = 'object' == typeof n ? n : JSON.parse(n);
                      o(t);
                    })
                    .catch(function (n) {
                      t(n);
                    });
                else t('Method not availiable');
              })
            );

          case 1:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.isModel = me;

exports.isRubyplus = function () {
  return me(['roborock.vacuum.t4', 'roborock.vacuum.t4v2', 'roborock.vacuum.t4v3', 'roborock.vacuum.s4', 'roborock.vacuum.s4v2', 'roborock.vacuum.s4v3']);
};

exports.isTanosT6 = function () {
  return me(['roborock.vacuum.t6', 'roborock.vacuum.t6v2', 'roborock.vacuum.t6v3']);
};

exports.isTanosS6 = function () {
  return me(['roborock.vacuum.s6', 'roborock.vacuum.s6v2', 'roborock.vacuum.s6v3']);
};

exports.isRubysLite = function () {
  return me([
    'roborock.vacuum.p6',
    'roborock.vacuum.p6v2',
    'roborock.vacuum.p6v3',
    'roborock.vacuum.p6v4',
    'roborock.vacuum.p6v5',
    'roborock.vacuum.s5e',
    'roborock.vacuum.s5ev2',
    'roborock.vacuum.s5ev3',
    'roborock.vacuum.s5ev4',
    'roborock.vacuum.s5ev5',
    'roborock.vacuum.a05',
    'roborock.vacuum.a05v2',
    'roborock.vacuum.a05v3',
  ]);
};

exports.isRubysC = function () {
  return me([
    'roborock.vacuum.p5',
    'roborock.vacuum.p5v2',
    'roborock.vacuum.p5v3',
    'roborock.vacuum.p5v4',
    'roborock.vacuum.p5v5',
    'roborock.vacuum.a08',
    'roborock.vacuum.a08v2',
    'roborock.vacuum.a08v3',
  ]);
};

exports.isRubysE = pe;

exports.isRubysCP5 = function () {
  return me(['roborock.vacuum.p5', 'roborock.vacuum.p5v2', 'roborock.vacuum.p5v3', 'roborock.vacuum.p5v4', 'roborock.vacuum.p5v5']);
};

exports.isTanosE = function () {
  return me([
    'roborock.vacuum.t7',
    'roborock.vacuum.t7v2',
    'roborock.vacuum.t7v3',
    'roborock.vacuum.a11',
    'roborock.vacuum.a11v2',
    'roborock.vacuum.a11v3',
    'roborock.vacuum.a11v4',
    'roborock.vacuum.a11v5',
  ]);
};

exports.isTanosV = function () {
  return me([
    'roborock.vacuum.t7p',
    'roborock.vacuum.t7pv2',
    'roborock.vacuum.t7pv3',
    'roborock.vacuum.a09',
    'roborock.vacuum.a09v2',
    'roborock.vacuum.a09v3',
    'roborock.vacuum.a09v4',
    'roborock.vacuum.a09v5',
    'roborock.vacuum.a10',
    'roborock.vacuum.a10v2',
    'roborock.vacuum.a10v3',
    'roborock.vacuum.a10v4',
    'roborock.vacuum.a10v5',
  ]);
};

exports.isTanosV_CN = function () {
  return me([
    'roborock.vacuum.t7p',
    'roborock.vacuum.t7pv2',
    'roborock.vacuum.t7pv3',
    'roborock.vacuum.a09',
    'roborock.vacuum.a09v2',
    'roborock.vacuum.a09v3',
    'roborock.vacuum.a09v4',
    'roborock.vacuum.a09v5',
  ]);
};

exports.isTanosV_CE = function () {
  return me(['roborock.vacuum.a10', 'roborock.vacuum.a10v2', 'roborock.vacuum.a10v3', 'roborock.vacuum.a10v4', 'roborock.vacuum.a10v5']);
};

exports.isTanosVA09 = function () {
  return me(['roborock.vacuum.a09', 'roborock.vacuum.a09v2', 'roborock.vacuum.a09v3', 'roborock.vacuum.a09v4', 'roborock.vacuum.a09v5']);
};

exports.isRubys = function () {
  return me(['roborock.vacuum.s5', 'roborock.sweeper.s5v2', 'roborock.sweeper.s5v3']);
};

exports.isTanosS = ge;

exports.isGarnet = function () {
  return me(['roborock.vacuum.a16', 'roborock.vacuum.a16v2', 'roborock.vacuum.a16v3']);
};

exports.isTanosSPlus = function () {
  return me([
    'roborock.vacuum.a23',
    'roborock.vacuum.a23v2',
    'roborock.vacuum.a23v3',
    'roborock.vacuum.a23v4',
    'roborock.vacuum.a23v5',
    'roborock.vacuum.a24',
    'roborock.vacuum.a24v2',
    'roborock.vacuum.a24v3',
    'roborock.vacuum.a24v4',
    'roborock.vacuum.a24v5',
  ]);
};

exports.isTopazSV = function () {
  return me([
    'roborock.vacuum.a26',
    'roborock.vacuum.a26v2',
    'roborock.vacuum.a26v3',
    'roborock.vacuum.a26v4',
    'roborock.vacuum.a26v5',
    'roborock.vacuum.a27',
    'roborock.vacuum.a27v2',
    'roborock.vacuum.a27v3',
    'roborock.vacuum.a27v4',
    'roborock.vacuum.a27v5',
  ]);
};

exports.isV1Model = function () {
  return !(he() || Se() || be() || Pe());
};

exports.isV2Model = he;
exports.isV3Model = Se;
exports.isV4Model = be;
exports.isV5Model = Pe;

exports.fixDeviceScreenHeight = function () {
  module394.MC.ScreenHeight = module12.Dimensions.get('window').height;
  if (y) 'ios' != module12.Platform.OS ? (U >= 10065 ? ke() : !re && ke()) : re && ye();
  else if ('ios' != module12.Platform.OS) ye();
};

exports.adjustDefaultFont = function () {
  var n = module12.StyleSheet.create({
      defaultFontFamily: {
        fontFamily: y ? 'lucida grande' : 'Droid Sans',
      },
    }),
    o = module12.Text.render;

  module12.Text.render = function (...args) {
    var v = o.call(this, ...args);
    return React.default.cloneElement(v, {
      style: [v.props.style, 'android' == module12.Platform.OS ? n.defaultFontFamily : {}],
      allowFontScaling: false,
    });
  };

  module12.TextInput.defaultProps = module22.default({}, module12.TextInput.defaultProps, {
    allowFontScaling: false,
  });
};

exports.adjustDefaultTextAlign = function () {
  var n = module12.StyleSheet.create({
      defaultTextAlign: {
        textAlign: globals.isRTL ? 'right' : 'left',
      },
    }),
    o = module12.Text.render;

  module12.Text.render = function (...args) {
    var s = o.call(this, ...args);
    return React.default.cloneElement(s, {
      style: [n.defaultTextAlign, s.props.style],
    });
  };
};

exports.openHelpPage = function () {
  if (y) w.ui.openHelpPage();
};

exports.getOperatorsCountryCode = function () {
  var n;
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.next = 2;
            return regeneratorRuntime.default.awrap(we());

          case 2:
            n = o.sent;
            return o.abrupt('return', De(n));

          case 4:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.getOperatorsInfo = we;

exports.getPrivacyCode = function (n) {
  if (!y && S.getPrivacyCode) return S.getPrivacyCode(n);
};

exports.getVoicePackageList = function (n) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            if (!y) {
              o.next = 4;
              break;
            }

            return o.abrupt('return', []);

          case 4:
            if (S.getVoicePackageList) {
              o.next = 6;
              break;
            }

            return o.abrupt('return', []);

          case 6:
            o.next = 8;
            return regeneratorRuntime.default.awrap(S.getVoicePackageList(n));

          case 8:
            return o.abrupt('return', o.sent);

          case 9:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.monitorAllowed = function () {
  return !(('ios' == module12.Platform.OS && q.mobileModel.includes('x86')) || y);
};

exports.isSimulator = function () {
  return q.mobileModel.includes('x86') || y;
};

exports.checkFirmwareUpdateAndAlert = function () {
  if (y)
    return new Promise(function (n, o) {
      N.checkFirmwareUpdateAndAlert()
        .then(function (o) {
          n(o);
        })
        .catch(function (n) {
          o(n);
        });
    });
};

exports.keepScreenOn = function (n) {
  if (!y) S.keepScreenOn && S.keepScreenOn(true);
};

exports.reload = function (n) {
  if (!y) S.reload && S.reload();
};

exports.currentAppVersion = function () {
  var n = null;
  if (!y) n = S.appVersion;
  return n || 'no support';
};

exports.isRecordSupported = function () {
  return !!module12.NativeModules.RRRecorder && U >= 10006;
};

exports.isRoomNameSupported = function () {
  return y || S.getRoomList;
};

exports.isTestModeSupport = function () {
  return (
    -1 !=
    [
      '2216005876',
      '2190670496',
      '1199370858',
      '2397321470',
      'rr5c8b25d54c5830',
      'rr5c6048f7e35820',
      'rr5ab65412abbcc0',
      'rr5ab8d94812fc60',
      'rr5ab75a279b3c70',
      'rr5a54644a91df60',
      'rr5ca9f70e281850',
      'rr5cbfcfae0c1830',
      'rr5a96285530fd50',
      'rr5e1764a1351820',
      'rr5d1dac17479830',
      'rr5f541f748cd850',
    ].findIndex(function (n) {
      return H == n;
    })
  );
};

exports.isNewBottomControlSupported = function () {
  return true;
};

exports.isAutoTestSupported = function () {
  return (
    -1 !=
    [
      'rr5d2308b5469820',
      '1155970109',
      '1147621019',
      'rr5b7ed488f03d70',
      'rr5e984d4e5a9830',
      'rr5cc0ccc796d830',
      'rr5ef3b740af9870',
      'rr5f75f4bd031840',
      'rr5f75f5d5db9860',
      'rr5f75f66d76d860',
      'rr5f75f6c4791860',
      'rr5f75f73bb2d840',
      'rr5f7e7bf92bd870',
      'rr5f7e858aad1870',
      'rr5f7ea288f15850',
      'rr5f7eab39ba9840',
      'rr5fec1e27e01850',
      'rr5fec2095135870',
      'rr5fec22202c9870',
      'rr5fec22fa2c9840',
      'rr5fec23b0af5830',
    ].findIndex(function (n) {
      return H == n;
    })
  );
};

exports.isSpecSupported = function () {
  return y && (ge() || pe());
};

exports.openShareListBar = function (n, o, t, c) {
  if (y) w.ui.openShareListBar(n, o, t, c);
  else if (U >= 10009 && S.openShareListBar) S.openShareListBar(n, o, t, c);
};

exports.longScreenShot = function (n, o) {
  return y
    ? w.file.longScreenShot(n, o)
    : new Promise(function (t, c) {
        if (U >= 10009 && S.longScreenShot)
          S.longScreenShot(n, o)
            .then(function (n) {
              t(n);
            })
            .catch(function (n) {
              c(n);
            });
        else c('share apilevel too low');
      });
};

exports.logEventStatus = function (n, o) {
  var t = {};
  t[n] = o;
  console.log('Will log event status: ' + JSON.stringify(t));
  if (!(null == S || null == S.eventStatusWithParamDic)) S.eventStatusWithParamDic(t);
};

exports.logEventCommon = function (n, o) {
  console.log('Will log event common: ' + n + ', ' + JSON.stringify(o));
  if (!(null == S || null == S.eventCommonWithEventIDDict)) S.eventCommonWithEventIDDict(n, o);
};

exports.logEventRecordView = function (n, o, t) {
  var c = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : {};
  if (!(null == S || null == S.eventRecordView)) S.eventRecordView(n, o, t, c);
};

exports.getSmartSceneInfo = function () {
  return null == S ? undefined : S.getSmartScenes();
};

exports.syncSmartSceneInfo = function (n) {
  return null == S ? undefined : S.syncSmartScenes(n);
};

exports.isSmartSceneSupported = function () {
  return null == S ? undefined : S.syncSmartScenes;
};

exports.selectSystemMediaPaths = function () {
  if (!y)
    return new Promise(function (n, o) {
      S.getSystemMedia()
        .then(function (o) {
          n(o);
        })
        .catch(function (n) {
          o(n);
        });
    });
  reject('not support on MiApp');
};

exports.uploadFilesToOss = function (n) {
  if (!y)
    return new Promise(function (o, t) {
      S.uploadFilesToOss(n)
        .then(function (n) {
          o(n);
        })
        .catch(function (n) {
          t(n);
        });
    });
  reject('not support on MiApp');
};

exports.fileInternalBug = function (n, o, t, c, u, l, s, v, f) {
  if (!y)
    return new Promise(function (p, h) {
      S.fileInternalBug(n, o, t, c, u, l, s, v, f)
        .then(function (n) {
          p(n);
        })
        .catch(function (n) {
          h(n);
        });
    });
  reject('not support on MiApp');
};

exports.open3DMapTestPage = function (n) {
  if (y) return;
  S.open3DMapTestPage(n);
};

exports.isSupport3DMap = function () {
  return !!S && !!module12.UIManager.RR3DMapView;
};

exports.isSupportLidar = function () {
  return !!S && !!S.supportLidar;
};

exports.isIphoneXSeries = function () {
  if ('ios' != module12.Platform.OS) return false;
  var n;
  if (y) return null == (n = w) ? undefined : n.isIphoneXSeries;

  try {
    var o;
    return null != (o = null == S ? undefined : S.isBangsScreen) && o;
  } catch (n) {
    return false;
  }
};

exports.isSupportNewAgreementAndPolicy = function () {
  return !!S && !!S.agreementAndPolicy;
};

exports.agreementAndPolicy = function () {
  if (!y)
    return new Promise(function (n, o) {
      S.agreementAndPolicy()
        .then(function (o) {
          n(o);
        })
        .catch(function (n) {
          o(n);
        });
    });
  reject('not support on MiApp');
};

exports.appBuildVersion = function () {
  var n;
  if (y) return '';
  return null != (n = null == S ? undefined : S.appBuildVersion) ? n : 'Unknown';
};

exports.isSupportGotoMainlandMall = function () {
  return !!S && !!S.gotoMainlandMall;
};

exports.gotoMainlandMall = function (n) {
  S.gotoMainlandMall(n);
};

exports.isSupportDeleteDevice = function () {
  return !!S && !!S.deleteDevice;
};

exports.deleteDevice = function () {
  if (!y)
    return new Promise(function (n, o) {
      if (!(null == S))
        S.deleteDevice()
          .then(function (o) {
            n(o);
          })
          .catch(function (n) {
            o(n);
          });
    });
};

exports.collectUserInfo = function (n, o) {
  return new Promise(function (t, c) {
    if (!(null == S || null == S.collectUserInfo))
      S.collectUserInfo('userInfo', n, o)
        .then(function (n) {
          t(n);
        })
        .catch(function (n) {
          c(n);
        });
  });
};

exports.getSmartSceneList = function (n) {
  return null == S ? undefined : null == S.getSmartSceneList ? undefined : S.getSmartSceneList(n);
};

exports.addSmartScene = function (n, o) {
  return null == S ? undefined : null == S.addSmartScene ? undefined : S.addSmartScene(n, o);
};

exports.deleteSmartScene = function (n) {
  return null == S ? undefined : S.deleteSmartScene(n);
};

exports.editSmartScene = function (n, o) {
  return null == S ? undefined : null == S.putSmartScene ? undefined : S.putSmartScene(n, o);
};

exports.editSmartSceneName = function (n, o) {
  return null == S ? undefined : S.updateSmartScene(n, o);
};

exports.editSmartSceneTimer = function (n, o) {
  return null == S ? undefined : S.putSmartSceneTriggers(n, o);
};

exports.notifyNativeUpdateSceneDataSource = function () {
  if (!(null == S || null == S.notifyNativeUpdateSceneDataSource)) S.notifyNativeUpdateSceneDataSource();
};

exports.getConfigTestUrlList = function () {
  return new Promise(function (n, o) {
    if (!(null == S || null == S.getConfigTestUrlList))
      S.getConfigTestUrlList()
        .then(function (o) {
          n(o);
        })
        .catch(function (n) {
          o(n);
        });
  });
};

exports.openChangeDeviceName = function () {
  if (!y) S.openChangeDeviceName();
};

module12.NativeModules.MHRoom;

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module12 = require('./12'),
  React = require('react'),
  module394 = require('./394'),
  module395 = require('./395'),
  module399 = require('./399'),
  p = 10021;

exports.androidRoomApiLevel = p;
require('./411').JsExecutor;

var h = 10039,
  S = module12.NativeModules.RRPluginSDK,
  b = module12.NativeModules.RRPluginDarkMode,
  module409 = require('./409'),
  module410 = require('./410'),
  y = !S;

exports.isMiApp = y;
var D = '';
exports.MCC = D;
var w = null;
exports.Host = w;
var M = null;
exports.Package = M;
var C = null;
exports.Entrance = C;
var T = null;
exports.PackageEvent = T;
var x = null;
exports.Service = x;
var N = null;
exports.Device = N;
var O = null;
exports.DeviceEvent = O;
var I = null;
exports.CommonSetting = I;
var E = null;
exports.MoreSetting = E;
var A = null;
exports.SETTING_KEYS = A;
var L = 0;
exports.MiApiLevel = L;
var F = null;
exports.AudioEvent = F;
var R = null;
exports.MiDarkMode = R;
var V = null;

if (((exports.PrivacyEvent = V), y)) {
  var module412 = require('./412');

  exports.Host = w = module412.Host;
  exports.Package = M = module412.Package;
  exports.Entrance = C = module412.Entrance;
  exports.PackageEvent = T = module412.PackageEvent;
  exports.Service = x = module412.Service;
  exports.Device = N = module412.Device;
  exports.DeviceEvent = O = module412.DeviceEvent;
  exports.CommonSetting = I = module412.CommonSetting;
  exports.MoreSetting = E = module412.MoreSetting;
  exports.SETTING_KEYS = A = module412.SETTING_KEYS;
  exports.MiApiLevel = L = module412.API_LEVEL;
  exports.AudioEvent = F = module412.AudioEvent;
  exports.MiDarkMode = R = module412.DarkMode;
  exports.PrivacyEvent = V = module412.PrivacyEvent;
}

var W = {
  OPERATOR_NONE: 0,
  OPERATOR_CN: 1,
  OPERATOR_NOT_CN: 2,
};
exports.OperatorCode = W;
var J = y ? '' : S.basePath;
exports.basePath = J;
var U = y ? w.apiLevel : S.apiLevel;
exports.apiLevel = U;
var B = y ? N.owner : S.ownerId;
exports.ownerId = B;
var H = y ? x.account.ID : S.userId;
exports.userId = H;
var K = y ? w.isDebug : S.devMode;
exports.devMode = K;
var j = y ? N.deviceID : S.deviceId;
exports.deviceId = j;
var z = y ? N.name : S.deviceName;
exports.deviceName = z;
var G = y ? N.model : S.deviceModel;
exports.deviceModel = G;
var Z = y ? '' : S.storageBasePath;
exports.storageBasePath = Z;
var Y = y ? '' : S.activeTime;
exports.activeTime = Y;
var X = y ? '' : S.robotTimeZone;
exports.robotTimeZone = X;
console.log('robotTimeZone - ' + X);
var q = y ? w.systemInfo : S.systemInfo;
exports.systemInfo = q;
var Q = y ? O.deviceNameChanged : S.deviceNameChangedEvent;
exports.deviceNameChangedEvent = Q;
var $ = y ? w.audio.audioPlayerDidFinishPlayingEvent : S.audioPlayerDidFinishPlayingEvent;
exports.audioPlayerDidFinishPlayingEvent = $;
var ee = y ? module409.version_code : module410.version;
exports.pluginVersion = ee;
var ne = y ? 'no supported' : S.clientID;
exports.appClientID = ne;
var oe = y ? '' : S.iotType;
exports.iotType = oe;
var te = y ? 0 : S.memory ? S.memory : 0;
exports.systemMemorySize = te;
var re = y && U >= 10051 && w.isPad;
exports.isWindowDisplay = re;
var ae = y ? '' : S.userScope;
exports.userScope = ae;
var ce = y ? {} : S.safeAreaInsets || {};
exports.iphoneSafeareaInsets = ce;
var ie = {
  PrivacyAgreementStatusKey: '1_' + j + '_' + H,
  PrivacyAgreementStatusWithVersionKey: '2_' + j + '_' + H,
};
exports.CloudStorageKeys = ie;
var ue = {
  light: 'light',
  dark: 'dark',
};

function le(n, o, u) {
  var React;
  return regeneratorRuntime.default.async(
    function (v) {
      for (;;)
        switch ((v.prev = v.next)) {
          case 0:
            v.next = 2;
            return regeneratorRuntime.default.awrap(module394.MC.getRsaKey());

          case 2:
            React = {
              endpoint: 'xxx',
              security: {
                pub_key: JSON.parse(module394.MC.rsaKey.pub),
                cipher_suite: 1,
              },
            };
            if (o) React = module22.default(React, o);
            return v.abrupt(
              'return',
              new Promise(function (o, t) {
                se(n, React, function (n, c) {
                  if (n)
                    module399.decryptRobotData(c, u, function (n, c) {
                      if (n) o(c);
                      else
                        t({
                          error: 'getAndDecBase64Data erro',
                          data: c || 'invalidated map data',
                        });
                    });
                  else
                    t({
                      error: 'getAndDecBase64Data erro',
                      data: c || 'invalidated map data',
                    });
                });
              })
            );

          case 5:
          case 'end':
            return v.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
}

function se(n, o, t) {
  if (y)
    require('./1410').downloadFile(n, o, function (n, o) {
      t(n, o);
    });
  else
    S.getRobotData(n, o, function (n, o) {
      if (n) t(true, o);
      else t(false, o || 'invalidated map data');
    });
}

function ve(n, o) {
  return y
    ? new Promise(function (t, c) {
        var u = {
          did: j,
          props: ['prop.s_mixxx'],
        };
        x.smarthome
          .batchGetDeviceDatas([u])
          .then(function (t) {
            var u = t[j]['prop.s_mixxx'];
            console.log('batchSetDeviceDatas get last- ' + JSON.stringify(t));
            var l = u ? JSON.parse(u) : {};
            l[n] = o;
            var s = {
              did: j,
              props: {
                'prop.s_mixxx': JSON.stringify(l),
              },
            };
            x.smarthome
              .batchSetDeviceDatas([s])
              .then(function (n) {
                console.log('batchSetDeviceDatas - ' + JSON.stringify(s));
              })
              .catch(function (n) {
                c(n);
              });
          })
          .catch(function (n) {
            c(n);
          });
      })
    : new Promise(function (t, c) {
        S.setValue(n, o);
        t(true);
      });
}

function fe(n) {
  if (y) {
    var o = {
      did: j,
      props: ['prop.s_mixxx'],
    };
    return new Promise(function (t, c) {
      x.smarthome
        .batchGetDeviceDatas([o])
        .then(function (o) {
          var c = o[j]['prop.s_mixxx'];
          console.log('batchGetDeviceDatas - ' + JSON.stringify(o));
          t(c ? JSON.parse(c)[n] : null);
        })
        .catch(function (n) {
          c(n);
        });
    });
  }

  return new Promise(function (o, t) {
    S.getValue(n, function (n) {
      o(n);
    });
  });
}

function de() {
  if (y) {
    if (R && U >= h) {
      R.preparePluginOwnDarkMode();
      return R.getColorScheme();
    } else return ue.light;
  } else return b && null != (n = null == b ? undefined : b.colorScheme) ? n : ue.light;
  var n;
}

exports.Theme = ue;

exports.addThemeChangeListener = function (n) {
  if (y) {
    if (R) R.addChangeListener(n);
  } else if (b) new module12.NativeEventEmitter(b).addListener('themeDidChange', n);
};

function me(n) {
  return -1 != n.indexOf(G);
}

function pe() {
  return me(['roborock.vacuum.a19', 'roborock.vacuum.a19v2', 'roborock.vacuum.a19v3', 'roborock.vacuum.a19v4', 'roborock.vacuum.a19v5']);
}

function ge() {
  return me([
    'roborock.vacuum.a14',
    'roborock.vacuum.a14v2',
    'roborock.vacuum.a14v3',
    'roborock.vacuum.a14v4',
    'roborock.vacuum.a14v5',
    'roborock.vacuum.a15',
    'roborock.vacuum.a15v2',
    'roborock.vacuum.a15v3',
    'roborock.vacuum.a15v4',
    'roborock.vacuum.a15v5',
  ]);
}

function he() {
  return -1 != G.toLowerCase().search('v2');
}

function Se() {
  return -1 != G.toLowerCase().search('v3');
}

function be() {
  return -1 != G.toLowerCase().search('v4');
}

function Pe() {
  return -1 != G.toLowerCase().search('v5');
}

function ke() {
  var n, o;
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            t.prev = 0;
            t.next = 3;
            return regeneratorRuntime.default.awrap(w.getPhoneScreenInfo());

          case 3:
            n = t.sent;
            console.log('getPhoneScreenInfo - ' + JSON.stringify(n) + ' - screenHeight - ' + module12.Dimensions.get('screen').height);
            o = n.viewHeightPixel ? n.viewHeightPixel / module12.Dimensions.get('window').scale : n.viewHeight;
            module394.MC.ScreenHeight = o;
            module394.MC.NavigationBarHeight = n.navigationBarHeight || 0;
            module12.DeviceEventEmitter.emit('ScreenHeightUpdate');
            t.next = 14;
            break;

          case 11:
            t.prev = 11;
            t.t0 = t.catch(0);
            console.log('getPhoneScreenInfo  error: ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0));

          case 14:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    [[0, 11]],
    Promise
  );
}

function ye() {
  module12.DeviceEventEmitter.addListener('didUpdateDimensions', function (n) {
    if (!y) null == S.updateDimension || S.updateDimension(n);
    var o = module12.Dimensions.get('window').height,
      t = n.windowPhysicalPixels;
    if (undefined != t) o = t.height / t.scale;

    if (o != module394.MC.ScreenHeight) {
      module394.MC.ScreenHeight = o;
      console.log('RR - ' + !y + ', didUpdateDimensions - ' + o);
      module12.DeviceEventEmitter.emit('ScreenHeightUpdate');
    }
  });
}

function De(n) {
  if (n) {
    console.log('getOperatorsInfo \uff1a + ' + JSON.stringify(n));

    if (n[1] && n[1].countryCode && 'cn' == n[1].countryCode.toLowerCase()) {
      exports.MCC = D = n[1].countryCode.toLowerCase();
      return W.OPERATOR_CN;
    } else if (n[2] && n[2].countryCode && 'cn' == n[2].countryCode.toLowerCase()) {
      exports.MCC = D = n[2].countryCode.toLowerCase();
      return W.OPERATOR_CN;
    } else if (n[1] && '' == n[1].countryCode.toLowerCase()) return W.OPERATOR_NONE;
    else {
      exports.MCC = D = 'not-cn';
      return W.OPERATOR_NOT_CN;
    }
  } else {
    console.log('getOperatorsInfo error\uff1a + ' + n);
    return W.OPERATOR_NONE;
  }
}

function we() {
  return regeneratorRuntime.default.async(
    function (n) {
      for (;;)
        switch ((n.prev = n.next)) {
          case 0:
            if (((n.prev = 0), !y)) {
              n.next = 7;
              break;
            }

            n.next = 4;
            return regeneratorRuntime.default.awrap(w.getOperatorsInfo());

          case 4:
            n.t0 = n.sent;
            n.next = 8;
            break;

          case 7:
            n.t0 = S.getOperatorsInfo();

          case 8:
            return n.abrupt('return', n.t0);

          case 11:
            n.prev = 11;
            n.t1 = n.catch(0);
            console.log('getOperatorsInfo error ' + n.t1);
            return n.abrupt('return', null);

          case 15:
          case 'end':
            return n.stop();
        }
    },
    null,
    null,
    [[0, 11]],
    Promise
  );
}

exports.removeThemeChangeListener = function (n) {
  if (y) {
    if (R) R.removeChangeListener(n);
  } else if (b) new module12.NativeEventEmitter(b).removeListener('themeDidChange', n);
};

exports.getDiskSize = function () {
  if (!D) return S.getDiskSize();
};

exports.enableAVCall = function (n) {
  if (!D) S.enableAVCall && S.enableAVCall(n);
};

exports.setMaxFramerate = function (n) {
  if (!D) S.setMaxFramerate && S.setMaxFramerate(n);
};

exports.getDeviceType = function () {
  if (D) return -1;

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

exports.getDevicePropertyFromMemCache = function (n, t) {
  if (D)
    t({
      localip: E.IP,
      ssid: E.SSID,
      mac: E.mac,
      rssi: E.RSSI,
      lastVersion: E.lastVersion,
    });
};

exports.callMethod = function (n, t, o, c) {
  if (D)
    return void E.getDeviceWifi()
      .callMethod(n, t)
      .then(function (n) {
        return c(true, n);
      })
      .catch(function (n) {
        return c(false, n);
      });
  if ('android' === module13.Platform.OS) t.constructor === Array ? S.callMethod(n, t, o, c) : S.callMethodWithObject(n, t, o, c);
  else S.callMethod(n, t, o, c);
};

exports.callMethodFromCloud = function (n, t, o, c) {
  if (D)
    return void E.getDeviceWifi()
      .callMethod(n, t)
      .then(function (n) {
        return c(true, n);
      })
      .catch(function (n) {
        return c(false, n);
      });
  S.callMethodFromCloud(n, t, o, c);
};

exports.callMethodForceWay = function (n, t, o, c, u) {
  if (D)
    return void E.getDeviceWifi()
      .callMethodFromLocal(n, t)
      .then(function (n) {
        return u(n);
      })
      .catch(function (n) {
        return u(n);
      });
  S.callMethodFromLocal(n, t, o, u);
};

exports.callMethodForceWayNew = function (n, t, o) {
  return D
    ? E.getDeviceWifi().callMethodFromLocal(n, t)
    : new Promise(function (c, u) {
        console.log('callMethodForceWayNew 1');
        S.callMethodFromLocal(n, t, o, function (n, t) {
          console.log('callMethodForceWayNew callback');
          if (n) c(true);
          else u(t);
        });
      });
};

exports.callSmartHomeAPI = function (n, t, o) {
  if (o) o({});
};

exports.getMapData = function (n, t, o) {
  if (D) {
    var module414 = require('./414');

    module414.downloadMap(n, t, function (n, t) {
      o(n, t);
    });
  } else
    S.getMapData(n, t, function (n, t) {
      if (n && module395.default.isValidatedMapData(t)) o(true, t);
      else o(false, t || 'invalidated map data');
    });
};

exports.getMapBase64Data = function () {
  return regeneratorRuntime.default.async(
    function (n) {
      for (;;)
        switch ((n.prev = n.next)) {
          case 0:
            n.next = 2;
            return regeneratorRuntime.default.awrap(ve('get_map', {}, module399.DecryptorType.Lz4));

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

exports.getPhotoBase64Data = function (n, t, o) {
  ve(
    'get_photo',
    {
      data_filter: {
        img_id: n,
        type: t,
      },
    },
    module399.DecryptorType.gzip
  )
    .then(function (n) {
      var t = module399.parsePhotoData(n);
      if (t) o(true, t);
      else o(false, 'getPhotoBase64Data decrypt failed');
    })
    .catch(function (n) {
      o(false, 'getPhotoBase64Data decrypt failed');
    });
};

exports.getAndDecBase64Data = ve;
exports.getRobotData = fe;

exports.closeCurrentPage = function () {
  if (D) return void T.exit();
  S.closeCurrentPage();
};

exports.getPhoneTimezone = function () {
  return D
    ? new Promise(function (n, t) {
        n(C.locale.timeZone);
      })
    : new Promise(function (n, t) {
        S.getSystemTimezoneNameWithCallback(function (o, c) {
          if (o) n(c);
          else t('getPhoneTimezone error');
        });
      });
};

exports.getCurrentCountryInfoCallback = function (n) {
  if (D)
    N.getServerName()
      .then(function (t) {
        return n(true, t);
      })
      .catch(function () {
        n(false);
      });
  else S.getCurrentCountryInfoCallback(n);
};

exports.saveInfo = function (n) {
  if (D)
    return void C.storage.save({
      roborock_key: n,
    });
  S.saveInfo(n);
};

exports.loadInfoCallback = function (n) {
  if (D)
    return void C.storage.get('roborock_key').then(function (t) {
      return n(t);
    });
  S.loadInfoCallback(n);
};

exports.postPrivacyAgreementStatus = function (n, t) {
  return D
    ? new Promise(function (o, c) {
        var u = se.PrivacyAgreementStatusKey,
          s = JSON.stringify({
            deviceId: G,
            deviceModel: Z,
            server: n,
            type: t,
          });
        N.storage
          .setThirdUserConfigsForOneKey(Z, u, s)
          .then(function (n) {
            o(true);
          })
          .catch(function (n) {
            c(false);
          });
      })
    : new Promise(function (o, c) {
        var module410 = require('./410').version;

        S.uploadSignStatus(G, Z, n, t, module410, '', function (n) {
          if (n) o(true);
          else c(false);
        });
      });
};

exports.getDeviceExtraInfoForKey = function (n) {
  return D
    ? me(n)
    : new Promise(function (t, o) {
        S.getDeviceExtraInfoForKey(n)
          .then(function (n) {
            t(n);
          })
          .catch(function (n) {
            o(n);
          });
      });
};

exports.saveDeviceExtraValue = function (n, t) {
  return D
    ? new Promise(function (o, c) {
        de(n, t);
        o(true);
      })
    : new Promise(function (o, c) {
        S.saveDeviceExtraValue(t, n)
          .then(function (n) {
            o(n);
          })
          .catch(function (n) {
            c(n);
          });
      });
};

exports.postPrivacyAgreementStatusWithVersion = function (n, t, o) {
  return D
    ? new Promise(function (c, u) {
        var s = se.PrivacyAgreementStatusWithVersionKey,
          l = JSON.stringify({
            deviceId: G,
            deviceModel: Z,
            server: n,
            type: t,
            version: o,
          });
        N.storage
          .setThirdUserConfigsForOneKey(Z, s, l)
          .then(function (n) {
            c(true);
          })
          .catch(function (n) {
            u(false);
          });
      })
    : new Promise(function (c, u) {
        S.uploadSignStatus(G, Z, n, t, o, '', function (n) {
          if (n) c(true);
          else u(false);
        });
      });
};

exports.getPrivacyAgreementByKey = function (n) {
  if (D)
    return new Promise(function (t, o) {
      N.storage
        .getThirdUserConfigsForOneKey(Z, n)
        .then(function (n) {
          t(n);
        })
        .catch(function (n) {
          o(n);
        });
    });
};

exports.setValue = de;
exports.getValue = me;

exports.canOpenDeviceSharePage = function () {
  if (D) return false;
  return S.openDeviceSharePage;
};

exports.openDeviceSharePage = function () {
  if (!D) S.openDeviceSharePage(G);
};

exports.localPingWithCallback = function (n) {
  if (D)
    return void E.getDeviceWifi()
      .localPing()
      .then(function (t) {
        return n(true);
      })
      .catch(function (t) {
        return n(false);
      });
  S.localPingWithCallback(n);
};

exports.downloadFile = function (n, t, o) {
  if (D)
    C.file
      .downloadFile(n, t)
      .then(function (n) {
        o(true, n);
      })
      .catch(function (n) {
        o(false);
      });
  else S.downloadFile(n, t, o);
};

exports.readFile = function (n, t) {
  if (D)
    C.file
      .readFile(n)
      .then(function (n) {
        t(true, n);
      })
      .catch(function (n) {
        t(false, n);
      });
  else S.readFile(n, t);
};

exports.readFilePromise = function (n) {
  return D
    ? C.file.readFile(n)
    : new Promise(function (t, o) {
        S.readFile(n, function (n, c) {
          if (n) t(c);
          else o('readFile error');
        });
      });
};

exports.deleteFile = function (n, t) {
  if (D)
    C.file
      .deleteFile(n)
      .then(function (n) {
        t(true);
      })
      .catch(function (n) {
        t(false, n);
      });
  else S.deleteFile(n, t);
};

exports.readFileList = function (n) {
  if (D)
    C.file
      .readFileList()
      .then(function (t) {
        n(true, t);
      })
      .catch(function (t) {
        n(false, t);
      });
  else S.readFileList(n);
};

exports.readFileListAtPath = function (n) {
  var t, module22;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            t = D ? C.file.readFileList(n) : S.readFileListAtPath(n);
            s.prev = 1;
            s.next = 4;
            return regeneratorRuntime.default.awrap(t);

          case 4:
            module22 = s.sent;
            return s.abrupt(
              'return',
              'android' === module13.Platform.OS || D
                ? module22.map(function (n) {
                    return n.name;
                  })
                : module22
            );

          case 8:
            s.prev = 8;
            s.t0 = s.catch(1);
            return s.abrupt('return', null);

          case 11:
          case 'end':
            return s.stop();
        }
    },
    null,
    null,
    [[1, 8]],
    Promise
  );
};

exports.writeFileToPath = function (n, t) {
  var module22, u;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            module22 = D ? C.file.writeFile(n, t) : S.writeFileToPath(n, t);
            s.prev = 1;
            s.next = 4;
            return regeneratorRuntime.default.awrap(module22);

          case 4:
            u = s.sent;
            console.log('writeFileToPath success ' + n, u);
            s.next = 11;
            break;

          case 8:
            s.prev = 8;
            s.t0 = s.catch(1);
            console.log('writeFileToPath  error ' + n + ': ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

          case 11:
          case 'end':
            return s.stop();
        }
    },
    null,
    null,
    [[1, 8]],
    Promise
  );
};

exports.isLogFunctionSupported = function () {
  return D || !!S.writeFileToPath;
};

exports.startPlay = function (n, t, o) {
  if (D)
    C.audio
      .startPlay(n, t)
      .then(function (n) {
        console.log('Host.audio.startPlay - ' + JSON.stringify(n));
        o(true, n);
      })
      .catch(function (n) {
        console.log('Host.audio.startPlay error: ' + ('object' == typeof n ? JSON.stringify(n) : n));
        o(false, n);
      });
  else if (S.startPlay) S.startPlay(n, t, o);
  else o(true, {});
};

exports.stopPlay = function (n) {
  if (D)
    C.audio
      .stopPlay()
      .then(function () {
        n(true);
      })
      .catch(function (t) {
        n(false);
      });
  else if (S.stopPlay) S.stopPlay(n);
  else n(true);
};

exports.openRoomManagementPage = function () {
  if (D) C.ui.openRoomManagementPage();
};

exports.openShareDevicePage = function () {
  if (D) C.ui.openShareDevicePage();
};

exports.openDeviceUpgradePage = function () {
  if (D) C.ui.openDeviceUpgradePage();
  else S.openDeviceUpgradePage();
};

exports.openIftttAutoPage = function () {
  if (D) C.ui.openIftttAutoPage();
};

exports.openNewMorePage = function () {
  if (D) console.log('openNewMorePage openNewMorePage');
};

exports.openAddToDesktopPage = function () {
  if (D) C.ui.openAddToDesktopPage();
};

exports.openPrivacyLicense = function (n, t, o, c, u) {
  var module177 = require('./177'),
    l = module177(t).uri,
    v = module177(c).uri;

  S.openPrivacyLicense(n, l, o, v, u);
};

exports.openPrivacyLicenseNew = function (n, t, o, c, u) {
  if (!D) S.openPrivacyLicense(n, t, o, c, u);
};

exports.openDeleteDevice = function (n) {
  if (D) C.ui.openDeleteDevice(n);
  else S.openDeleteDevice();
};

exports.openShopPage = function (n) {
  if (D) {
    console.log('openShopPage -- ' + n);
    C.ui.openShopPage(n);
  }
};

exports.isOpenSmallProgram = function () {
  return S.gotoWxMiniProgramMall && !D;
};

exports.openSmallProgram = function (n) {
  if (!D) S.gotoWxMiniProgramMall(n);
};

exports.miAddTimer = function (n) {
  return new Promise(function (t, o) {
    var c = N.scene.createTimerScene(G, n);
    console.log('miAddTimer - deviceId - ' + G + ' - opt - ' + JSON.stringify(n));
    c.save()
      .then(function (n) {
        t(n);
      })
      .catch(function (n) {
        o(n);
      });
  });
};

exports.rrAddOrEditTimer = function (n, t, o, c) {
  return new Promise(function (u, s) {
    S.addOrSetTimer(G, c, t, n, o, function (n, t) {
      if (n) u(true);
      else s(t);
    });
  });
};

exports.setSmartSceneParams = function (n, t) {
  if (!S.setSmartSceneParams)
    return new Promise(function (n, t) {
      t('Native method not found.');
    });
  return S.setSmartSceneParams(n, t);
};

exports.getServerTimers = function () {
  return regeneratorRuntime.default.async(
    function (n) {
      for (;;)
        switch ((n.prev = n.next)) {
          case 0:
            if (!D) {
              n.next = 4;
              break;
            }

            return n.abrupt('return', N.scene.loadTimerScenes(G));

          case 4:
            return n.abrupt(
              'return',
              new Promise(function (n, t) {
                S.getTimers(G, function (o, c) {
                  if (o) n(c);
                  else t(c);
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
  return D
    ? n.remove()
    : new Promise(function (t, o) {
        S.removeTimer(G, n, function (n, c) {
          if (n) t(true);
          else o(c);
        });
      });
};

exports.updateTimer = function (n, t) {
  if (D) {
    console.log('timerScene -', n);
    var o = JSON.parse(JSON.stringify(n.setting));
    o.enable_timer = t;
    var c = {
      name: n.name,
      setting: o,
    };
    console.log('mi updateTimer - ' + JSON.stringify(c));
    return n.save(c);
  }

  return new Promise(function (o, c) {
    S.updateTimerStatus(G, n, t, function (n, t) {
      if (n) o(true);
      else c(t);
    });
  });
};

exports.getFirmwareVersion = function () {
  return regeneratorRuntime.default.async(
    function (n) {
      for (;;)
        switch ((n.prev = n.next)) {
          case 0:
            if (!D) {
              n.next = 4;
              break;
            }

            return n.abrupt('return', E.getDeviceWifi().getVersion());

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
  return !!D || undefined != S.getLastVersionInfo;
};

exports.getFirmwareUpgradingInfo = function (n, t) {
  if (D) return N.smarthome.checkDeviceVersion(n, t);
};

exports.isOwner = function () {
  return D ? E.isOwner : j == K;
};

exports.isDarkMode = function () {
  return pe() == le.dark;
};

exports.syncTheme = function (n) {
  var t, o;
  if (!(D || null == b || null == b.getColorScheme || null == (t = (o = b.getColorScheme()).then)))
    t.call(o, function (t) {
      n(t);
    });
};

exports.getRoomList = function (n) {
  var t, o;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            if (!D) {
              s.next = 4;
              break;
            }

            if ('ios' === module13.Platform.OS || H >= p)
              N.room
                .loadAllRoom(true)
                .then(function (t) {
                  var o = t
                    .filter(function (n) {
                      return 'mijia.roomid.default' != n.roomID;
                    })
                    .map(function (n) {
                      return {
                        roomId: n.roomID,
                        name: n.name,
                      };
                    });
                  n(true, o);
                })
                .catch(function (t) {
                  n(false, t);
                });
            s.next = 16;
            break;

          case 4:
            if (!S.getRoomList) {
              s.next = 16;
              break;
            }

            s.prev = 5;
            s.next = 8;
            return regeneratorRuntime.default.awrap(S.getRoomList());

          case 8:
            t = s.sent;
            o = 'object' == typeof t ? t : JSON.parse(t);
            n(true, o);
            s.next = 16;
            break;

          case 13:
            s.prev = 13;
            s.t0 = s.catch(5);
            n(false, s.t0);

          case 16:
          case 'end':
            return s.stop();
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
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            return t.abrupt(
              'return',
              new Promise(function (t, o) {
                if (D)
                  'ios' === module13.Platform.OS || H >= p
                    ? N.room
                        .createRoom(n)
                        .then(function (n) {
                          var o = {
                            roomId: n.roomID,
                            name: n.name,
                          };
                          t(o);
                        })
                        .catch(function (n) {
                          o(n);
                        })
                    : o('Method not availiable');
                else if (S.addNewRoomWithName)
                  S.addNewRoomWithName(n)
                    .then(function (n) {
                      var o = 'object' == typeof n ? n : JSON.parse(n);
                      t(o);
                    })
                    .catch(function (n) {
                      o(n);
                    });
                else o('Method not availiable');
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
};

exports.isModel = ge;

exports.isRubyplus = function () {
  return ge(['roborock.vacuum.t4', 'roborock.vacuum.t4v2', 'roborock.vacuum.t4v3', 'roborock.vacuum.s4', 'roborock.vacuum.s4v2', 'roborock.vacuum.s4v3']);
};

exports.isTanosT6 = function () {
  return ge(['roborock.vacuum.t6', 'roborock.vacuum.t6v2', 'roborock.vacuum.t6v3']);
};

exports.isTanosS6 = function () {
  return ge(['roborock.vacuum.s6', 'roborock.vacuum.s6v2', 'roborock.vacuum.s6v3']);
};

exports.isRubysLite = function () {
  return ge([
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
  return ge([
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

exports.isRubysE = he;

exports.isRubysCP5 = function () {
  return ge(['roborock.vacuum.p5', 'roborock.vacuum.p5v2', 'roborock.vacuum.p5v3', 'roborock.vacuum.p5v4', 'roborock.vacuum.p5v5']);
};

exports.isTanosE = function () {
  return ge([
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
  return ge([
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
  return ge([
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
  return ge(['roborock.vacuum.a10', 'roborock.vacuum.a10v2', 'roborock.vacuum.a10v3', 'roborock.vacuum.a10v4', 'roborock.vacuum.a10v5']);
};

exports.isTanosVA09 = function () {
  return ge(['roborock.vacuum.a09', 'roborock.vacuum.a09v2', 'roborock.vacuum.a09v3', 'roborock.vacuum.a09v4', 'roborock.vacuum.a09v5']);
};

exports.isRubys = function () {
  return ge(['roborock.vacuum.s5', 'roborock.sweeper.s5v2', 'roborock.sweeper.s5v3']);
};

exports.isTanosS = Se;

exports.isGarnet = function () {
  return ge(['roborock.vacuum.a16', 'roborock.vacuum.a16v2', 'roborock.vacuum.a16v3']);
};

exports.isTanosSPlus = function () {
  return ge([
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
  return ge([
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
  return !(be() || Pe() || ke() || ye());
};

exports.isV2Model = be;
exports.isV3Model = Pe;
exports.isV4Model = ke;
exports.isV5Model = ye;

exports.fixDeviceScreenHeight = function () {
  module394.MC.ScreenHeight = module13.Dimensions.get('window').height;
  if (D) 'ios' != module13.Platform.OS ? (H >= 10065 ? we() : !ce && we()) : ce && De();
  else if ('ios' != module13.Platform.OS) De();
};

exports.adjustDefaultFont = function () {
  var n = module13.StyleSheet.create({
      defaultFontFamily: {
        fontFamily: D ? 'lucida grande' : 'Droid Sans',
      },
    }),
    t = module13.Text.render;

  module13.Text.render = function (...args) {
    var v = t.call(this, ...args);
    return React.default.cloneElement(v, {
      style: [v.props.style, 'android' == module13.Platform.OS ? n.defaultFontFamily : {}],
      allowFontScaling: false,
    });
  };

  module13.TextInput.defaultProps = module22.default({}, module13.TextInput.defaultProps, {
    allowFontScaling: false,
  });
};

exports.adjustDefaultTextAlign = function () {
  var n = module13.StyleSheet.create({
      defaultTextAlign: {
        textAlign: globals.isRTL ? 'right' : 'left',
      },
    }),
    t = module13.Text.render;

  module13.Text.render = function (...args) {
    var l = t.call(this, ...args);
    return React.default.cloneElement(l, {
      style: [n.defaultTextAlign, l.props.style],
    });
  };
};

exports.openHelpPage = function () {
  if (D) C.ui.openHelpPage();
};

exports.getOperatorsCountryCode = function () {
  var n;
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            t.next = 2;
            return regeneratorRuntime.default.awrap(Ce());

          case 2:
            n = t.sent;
            return t.abrupt('return', Me(n));

          case 4:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.getOperatorsInfo = Ce;

exports.getPrivacyCode = function (n) {
  if (!D && S.getPrivacyCode) return S.getPrivacyCode(n);
};

exports.getVoicePackageList = function (n) {
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            if (!D) {
              t.next = 4;
              break;
            }

            return t.abrupt('return', []);

          case 4:
            if (S.getVoicePackageList) {
              t.next = 6;
              break;
            }

            return t.abrupt('return', []);

          case 6:
            t.next = 8;
            return regeneratorRuntime.default.awrap(S.getVoicePackageList(n));

          case 8:
            return t.abrupt('return', t.sent);

          case 9:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.monitorAllowed = function () {
  return !(('ios' == module13.Platform.OS && $.mobileModel.includes('x86')) || D);
};

exports.isSimulator = function () {
  return $.mobileModel.includes('x86') || D;
};

exports.checkFirmwareUpdateAndAlert = function () {
  if (D)
    return new Promise(function (n, t) {
      E.checkFirmwareUpdateAndAlert()
        .then(function (t) {
          n(t);
        })
        .catch(function (n) {
          t(n);
        });
    });
};

exports.keepScreenOn = function (n) {
  if (!D) S.keepScreenOn && S.keepScreenOn(true);
};

exports.reload = function (n) {
  if (!D) S.reload && S.reload();
};

exports.currentAppVersion = function () {
  var n = null;
  if (!D) n = S.appVersion;
  return n || 'no support';
};

exports.isRecordSupported = function () {
  return !!module13.NativeModules.RRRecorder && H >= 10006;
};

exports.isRoomNameSupported = function () {
  return D || S.getRoomList;
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
      return j == n;
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
      '295058548',
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
      'rr607ebc1d195870',
      'rr61dba2d3a31850',
    ].findIndex(function (n) {
      return j == n;
    })
  );
};

exports.isSpecSupported = function () {
  return D && (Se() || he());
};

exports.openShareListBar = function (n, t, o, c) {
  if (D) C.ui.openShareListBar(n, t, o, c);
  else if (H >= 10009 && S.openShareListBar) S.openShareListBar(n, t, o, c);
};

exports.longScreenShot = function (n, t) {
  return D
    ? C.file.longScreenShot(n, t)
    : new Promise(function (o, c) {
        if (H >= 10009 && S.longScreenShot)
          S.longScreenShot(n, t)
            .then(function (n) {
              o(n);
            })
            .catch(function (n) {
              c(n);
            });
        else c('share apilevel too low');
      });
};

exports.logEventStatus = function (n, t) {
  var o = {};
  o[n] = t;
  console.log('Will log event status: ' + JSON.stringify(o));
  if (!(null == S || null == S.eventStatusWithParamDic)) S.eventStatusWithParamDic(o);
};

exports.logEventCommon = function (n, t) {
  console.log('Will log event common: ' + n + ', ' + JSON.stringify(t));
  if (!(null == S || null == S.eventCommonWithEventIDDict)) S.eventCommonWithEventIDDict(n, t);
};

exports.logEventRecordView = function (n, t, o) {
  var c = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : {};
  if (!(null == S || null == S.eventRecordView)) S.eventRecordView(n, t, o, c);
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
  if (!D)
    return new Promise(function (n, t) {
      S.getSystemMedia()
        .then(function (t) {
          n(t);
        })
        .catch(function (n) {
          t(n);
        });
    });
  reject('not support on MiApp');
};

exports.uploadFilesToOss = function (n) {
  if (!D)
    return new Promise(function (t, o) {
      S.uploadFilesToOss(n)
        .then(function (n) {
          t(n);
        })
        .catch(function (n) {
          o(n);
        });
    });
  reject('not support on MiApp');
};

exports.fileInternalBug = function (n, t, o, c, u, s, l, v, f) {
  if (!D)
    return new Promise(function (p, h) {
      S.fileInternalBug(n, t, o, c, u, s, l, v, f)
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
  if (D) return;
  S.open3DMapTestPage(n);
};

exports.isSupport3DMap = function () {
  return !!S && !!module13.UIManager.RR3DMapView;
};

exports.isSupportLidar = function () {
  return !!S && !!S.supportLidar;
};

exports.isIphoneXSeries = function () {
  if ('ios' != module13.Platform.OS) return false;
  var n;
  if (D) return null == (n = C) ? undefined : n.isIphoneXSeries;

  try {
    var t;
    return null != (t = null == S ? undefined : S.isBangsScreen) && t;
  } catch (n) {
    return false;
  }
};

exports.isSupportNewAgreementAndPolicy = function () {
  return !!S && !!S.agreementAndPolicy;
};

exports.agreementAndPolicy = function () {
  if (!D)
    return new Promise(function (n, t) {
      S.agreementAndPolicy()
        .then(function (t) {
          n(t);
        })
        .catch(function (n) {
          t(n);
        });
    });
  reject('not support on MiApp');
};

exports.appBuildVersion = function () {
  var n;
  if (D) return '';
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
  if (!D)
    return new Promise(function (n, t) {
      if (!(null == S))
        S.deleteDevice()
          .then(function (t) {
            n(t);
          })
          .catch(function (n) {
            t(n);
          });
    });
};

exports.collectUserInfo = function (n, t, o) {
  return new Promise(function (c, u) {
    if (!(null == S || null == S.collectUserInfo))
      S.collectUserInfo(n || 'userInfo', t, o)
        .then(function (n) {
          c(n);
        })
        .catch(function (n) {
          u(n);
        });
  });
};

exports.getSmartSceneList = function (n) {
  return null == S ? undefined : null == S.getSmartSceneList ? undefined : S.getSmartSceneList(n);
};

exports.addSmartScene = function (n, t) {
  return null == S ? undefined : null == S.addSmartScene ? undefined : S.addSmartScene(n, t);
};

exports.deleteSmartScene = function (n) {
  return null == S ? undefined : S.deleteSmartScene(n);
};

exports.editSmartScene = function (n, t) {
  return null == S ? undefined : null == S.putSmartScene ? undefined : S.putSmartScene(n, t);
};

exports.editSmartSceneName = function (n, t) {
  return null == S ? undefined : S.updateSmartScene(n, t);
};

exports.editSmartSceneTimer = function (n, t) {
  return null == S ? undefined : S.putSmartSceneTriggers(n, t);
};

exports.notifyNativeUpdateSceneDataSource = function () {
  if (!(null == S || null == S.notifyNativeUpdateSceneDataSource)) S.notifyNativeUpdateSceneDataSource();
};

exports.getConfigTestUrlList = function () {
  return new Promise(function (n, t) {
    if (!(null == S || null == S.getConfigTestUrlList))
      S.getConfigTestUrlList()
        .then(function (t) {
          n(t);
        })
        .catch(function (n) {
          t(n);
        });
  });
};

exports.openChangeDeviceName = function () {
  if (!D) S.openChangeDeviceName();
};

exports.isAutoUpdateOn = function () {
  return new Promise(function (n, t) {
    if (D) n(false);
    else if (undefined == S.isAutoUpdateOn) n(false);
    else if (!(null == S.isAutoUpdateOn))
      S.isAutoUpdateOn()
        .then(function (t) {
          n(t);
        })
        .catch(function (n) {
          t(n);
        });
  });
};

exports.isRRLogSupported = function () {
  return !D && !!S.uploadAppAndPluginLog;
};

exports.rrUploadPluginLogs = function () {
  var n;
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            if (!D) {
              t.next = 2;
              break;
            }

            return t.abrupt('return');

          case 2:
            t.prev = 2;
            t.next = 5;
            return regeneratorRuntime.default.awrap(null == S ? undefined : S.uploadAppAndPluginLog(0, 0));

          case 5:
            n = t.sent;
            return t.abrupt('return', n);

          case 9:
            t.prev = 9;
            t.t0 = t.catch(2);
            console.log('uploadPluginLogs error', t.t0);
            return t.abrupt('return', {
              error: t.t0,
            });

          case 13:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    [[2, 9]],
    Promise
  );
};

exports.isSupportMqttStatusCheck = Te;

exports.getMqttConnectStatus = function () {
  return Te()
    ? 'android' == module13.Platform.OS
      ? new Promise(function (n, t) {
          if (!(null == S.getMqttConnectStatus))
            S.getMqttConnectStatus(function (t) {
              n(t);
            });
        })
      : null == S.getMqttConnectStatus
      ? undefined
      : S.getMqttConnectStatus()
    : new Promise(function (n, t) {
        t('not support');
      });
};

exports.isSupportSceneOrders = function () {
  if (D) return false;
  return S.getSceneOrders;
};

exports.setSceneOrders = function (n) {
  return regeneratorRuntime.default.async(
    function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            if (!D) {
              t.next = 2;
              break;
            }

            throw new Error('Mi App does not support scene.');

          case 2:
            t.next = 4;
            return regeneratorRuntime.default.awrap(S.setSceneOrders(n, G));

          case 4:
            return t.abrupt('return', t.sent);

          case 5:
          case 'end':
            return t.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.getSceneOrders = function () {
  var n, t, o, module13, React, module394;
  return regeneratorRuntime.default.async(
    function (v) {
      for (;;)
        switch ((v.prev = v.next)) {
          case 0:
            if (!D) {
              v.next = 2;
              break;
            }

            throw new Error('Mi App does not support scene.');

          case 2:
            v.next = 4;
            return regeneratorRuntime.default.awrap(S.getSceneOrders([G]));

          case 4:
            module13 = v.sent;
            React = 'object' == typeof module13 ? (null == module13 ? undefined : module13.result) : null == (n = JSON.parse(module13)) ? undefined : n.result;
            module394 =
              null !=
              (t =
                null == React
                  ? undefined
                  : null ==
                    (o = React.find(function (n) {
                      return n.duid == G;
                    }))
                  ? undefined
                  : o.sceneIds)
                ? t
                : [];
            return v.abrupt('return', module394);

          case 8:
          case 'end':
            return v.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

module13.NativeModules.MHRoom;

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module13 = require('./13'),
  React = require('react'),
  module394 = require('./394'),
  module395 = require('./395'),
  module399 = require('./399'),
  p = 10021;

exports.androidRoomApiLevel = p;
require('./412').JsExecutor;

var h = 10039,
  S = module13.NativeModules.RRPluginSDK,
  b = module13.NativeModules.RRPluginDarkMode,
  P = module13.NativeModules.RRPluginDeviceFirmware,
  module409 = require('./409'),
  module410 = require('./410'),
  module411 = require('./411'),
  D = !S;

exports.isMiApp = D;
var M = '';
exports.MCC = M;
var C = null;
exports.Host = C;
var T = null;
exports.Package = T;
var O = null;
exports.Entrance = O;
var x = null;
exports.PackageEvent = x;
var N = null;
exports.Service = N;
var E = null;
exports.Device = E;
var A = null;
exports.DeviceEvent = A;
var L = null;
exports.CommonSetting = L;
var I = null;
exports.MoreSetting = I;
var F = null;
exports.SETTING_KEYS = F;
var R = 0;
exports.MiApiLevel = R;
var V = null;
exports.AudioEvent = V;
var _ = null;
exports.MiDarkMode = _;
var U = null;

if (((exports.PrivacyEvent = U), D)) {
  var module413 = require('./413');

  exports.Host = C = module413.Host;
  exports.Package = T = module413.Package;
  exports.Entrance = O = module413.Entrance;
  exports.PackageEvent = x = module413.PackageEvent;
  exports.Service = N = module413.Service;
  exports.Device = E = module413.Device;
  exports.DeviceEvent = A = module413.DeviceEvent;
  exports.CommonSetting = L = module413.CommonSetting;
  exports.MoreSetting = I = module413.MoreSetting;
  exports.SETTING_KEYS = F = module413.SETTING_KEYS;
  exports.MiApiLevel = R = module413.API_LEVEL;
  exports.AudioEvent = V = module413.AudioEvent;
  exports.MiDarkMode = _ = module413.DarkMode;
  exports.PrivacyEvent = U = module413.PrivacyEvent;
}

var J = {
  OPERATOR_NONE: 0,
  OPERATOR_CN: 1,
  OPERATOR_NOT_CN: 2,
};
exports.OperatorCode = J;
var B = D ? '' : S.basePath;
exports.basePath = B;
var H = D ? C.apiLevel : S.apiLevel;
exports.apiLevel = H;
var K = D ? E.owner : S.ownerId;
exports.ownerId = K;
var j = D ? N.account.ID : S.userId;
exports.userId = j;
var z = D ? C.isDebug : S.devMode;
exports.devMode = z;
var G = D ? E.deviceID : S.deviceId;
exports.deviceId = G;
var q = D ? E.name : S.deviceName;
exports.deviceName = q;
var Z = module411.model || (D ? E.model : S.deviceModel);
exports.deviceModel = Z;
var Y = D ? '' : S.storageBasePath;
exports.storageBasePath = Y;
var X = D ? '' : S.activeTime;
exports.activeTime = X;
var Q = D ? '' : S.robotTimeZone;
exports.robotTimeZone = Q;
console.log('robotTimeZone - ' + Q);
var $ = D ? C.systemInfo : S.systemInfo;
exports.systemInfo = $;
var ee = D ? A.deviceNameChanged : S.deviceNameChangedEvent;
exports.deviceNameChangedEvent = ee;
var ne = D ? C.audio.audioPlayerDidFinishPlayingEvent : S.audioPlayerDidFinishPlayingEvent;
exports.audioPlayerDidFinishPlayingEvent = ne;
var te = D ? module409.version_code : module410.version;
exports.pluginVersion = te;
var re = D ? 'no supported' : S.clientID;
exports.appClientID = re;
var oe = D ? '' : S.iotType;
exports.iotType = oe;
var ae = D ? 0 : S.memory ? S.memory : 0;
exports.systemMemorySize = ae;
var ce = D && H >= 10051 && C.isPad;
exports.isWindowDisplay = ce;
var ie = D ? '' : S.userScope;
exports.userScope = ie;
var ue = D ? {} : S.safeAreaInsets || {};
exports.iphoneSafeareaInsets = ue;
var se = {
  PrivacyAgreementStatusKey: '1_' + G + '_' + j,
  PrivacyAgreementStatusWithVersionKey: '2_' + G + '_' + j,
};
exports.CloudStorageKeys = se;
var le = {
  light: 'light',
  dark: 'dark',
};

function ve(n, t, u) {
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
            if (t) React = module22.default(React, t);
            return v.abrupt(
              'return',
              new Promise(function (t, o) {
                fe(n, React, function (n, c) {
                  if (n)
                    module399.decryptRobotData(c, u, function (n, c) {
                      if (n) t(c);
                      else
                        o({
                          error: 'getAndDecBase64Data erro',
                          data: c || 'invalidated map data',
                        });
                    });
                  else
                    o({
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

function fe(n, t, o) {
  if (D)
    require('./1490').downloadFile(n, t, function (n, t) {
      o(n, t);
    });
  else
    S.getRobotData(n, t, function (n, t) {
      if (n) o(true, t);
      else o(false, t || 'invalidated map data');
    });
}

function de(n, t) {
  return D
    ? new Promise(function (o, c) {
        var u = {
          did: G,
          props: ['prop.s_mixxx'],
        };
        N.smarthome
          .batchGetDeviceDatas([u])
          .then(function (o) {
            var u = o[G]['prop.s_mixxx'];
            console.log('batchSetDeviceDatas get last- ' + JSON.stringify(o));
            var s = u ? JSON.parse(u) : {};
            s[n] = t;
            var l = {
              did: G,
              props: {
                'prop.s_mixxx': JSON.stringify(s),
              },
            };
            N.smarthome
              .batchSetDeviceDatas([l])
              .then(function (n) {
                console.log('batchSetDeviceDatas - ' + JSON.stringify(l));
              })
              .catch(function (n) {
                c(n);
              });
          })
          .catch(function (n) {
            c(n);
          });
      })
    : new Promise(function (o, c) {
        S.setValue(n, t);
        o(true);
      });
}

function me(n) {
  if (D) {
    var t = {
      did: G,
      props: ['prop.s_mixxx'],
    };
    return new Promise(function (o, c) {
      N.smarthome
        .batchGetDeviceDatas([t])
        .then(function (t) {
          var c = t[G]['prop.s_mixxx'];
          console.log('batchGetDeviceDatas - ' + JSON.stringify(t));
          o(c ? JSON.parse(c)[n] : null);
        })
        .catch(function (n) {
          c(n);
        });
    });
  }

  return new Promise(function (t, o) {
    S.getValue(n, function (n) {
      t(n);
    });
  });
}

function pe() {
  if (D) {
    if (_ && H >= h) {
      _.preparePluginOwnDarkMode();

      return _.getColorScheme();
    } else return le.light;
  } else return b && null != (n = null == b ? undefined : b.colorScheme) ? n : le.light;
  var n;
}

exports.Theme = le;

exports.addThemeChangeListener = function (n) {
  if (D) {
    if (_) _.addChangeListener(n);
  } else if (b) new module13.NativeEventEmitter(b).addListener('themeDidChange', n);
};

exports.removeThemeChangeListener = function (n) {
  if (D) {
    if (_) _.removeChangeListener(n);
  } else if (b) new module13.NativeEventEmitter(b).removeListener('themeDidChange', n);
};

exports.addFirmwareProcessListener = function (n) {
  if (!D) P && new module13.NativeEventEmitter(P).addListener('RRDeviceOTAProgressUpdateEvent', n);
};

function ge(n) {
  return -1 != n.indexOf(Z);
}

function he() {
  return ge(['roborock.vacuum.a19', 'roborock.vacuum.a19v2', 'roborock.vacuum.a19v3', 'roborock.vacuum.a19v4', 'roborock.vacuum.a19v5']);
}

function Se() {
  return ge([
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

function be() {
  return -1 != Z.toLowerCase().search('v2');
}

function Pe() {
  return -1 != Z.toLowerCase().search('v3');
}

function ke() {
  return -1 != Z.toLowerCase().search('v4');
}

function ye() {
  return -1 != Z.toLowerCase().search('v5');
}

function we() {
  var n, t;
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.prev = 0;
            o.next = 3;
            return regeneratorRuntime.default.awrap(C.getPhoneScreenInfo());

          case 3:
            n = o.sent;
            console.log('getPhoneScreenInfo - ' + JSON.stringify(n) + ' - screenHeight - ' + module13.Dimensions.get('screen').height);
            t = n.viewHeightPixel ? n.viewHeightPixel / module13.Dimensions.get('window').scale : n.viewHeight;
            module394.MC.ScreenHeight = t;
            module394.MC.NavigationBarHeight = n.navigationBarHeight || 0;
            module13.DeviceEventEmitter.emit('ScreenHeightUpdate');
            o.next = 14;
            break;

          case 11:
            o.prev = 11;
            o.t0 = o.catch(0);
            console.log('getPhoneScreenInfo  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

          case 14:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    [[0, 11]],
    Promise
  );
}

function De() {
  module13.DeviceEventEmitter.addListener('didUpdateDimensions', function (n) {
    if (!D) null == S.updateDimension || S.updateDimension(n);
    var t = module13.Dimensions.get('window').height,
      o = n.windowPhysicalPixels;
    if (undefined != o) t = o.height / o.scale;

    if (t != module394.MC.ScreenHeight) {
      module394.MC.ScreenHeight = t;
      console.log('RR - ' + !D + ', didUpdateDimensions - ' + t);
      module13.DeviceEventEmitter.emit('ScreenHeightUpdate');
    }
  });
}

function Me(n) {
  if (n) {
    console.log('getOperatorsInfo \uff1a + ' + JSON.stringify(n));

    if (n[1] && n[1].countryCode && 'cn' == n[1].countryCode.toLowerCase()) {
      exports.MCC = M = n[1].countryCode.toLowerCase();
      return J.OPERATOR_CN;
    } else if (n[2] && n[2].countryCode && 'cn' == n[2].countryCode.toLowerCase()) {
      exports.MCC = M = n[2].countryCode.toLowerCase();
      return J.OPERATOR_CN;
    } else if (n[1] && '' == n[1].countryCode.toLowerCase()) return J.OPERATOR_NONE;
    else {
      exports.MCC = M = 'not-cn';
      return J.OPERATOR_NOT_CN;
    }
  } else {
    console.log('getOperatorsInfo error\uff1a + ' + n);
    return J.OPERATOR_NONE;
  }
}

function Ce() {
  return regeneratorRuntime.default.async(
    function (n) {
      for (;;)
        switch ((n.prev = n.next)) {
          case 0:
            if (((n.prev = 0), !D)) {
              n.next = 7;
              break;
            }

            n.next = 4;
            return regeneratorRuntime.default.awrap(C.getOperatorsInfo());

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

function Te() {
  return !D && (null == S ? undefined : S.getMqttConnectStatus);
}

exports.removeFirmwareProcessListener = function (n) {
  if (!D) P && new module13.NativeEventEmitter(P).removeListener('RRDeviceOTAProgressUpdateEvent', n);
};

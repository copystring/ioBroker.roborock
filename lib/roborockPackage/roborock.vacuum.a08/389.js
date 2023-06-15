exports.getDiskSize = function () {
  if (!y) return b.getDiskSize();
};

exports.enableAVCall = function (o) {
  if (!y) b.enableAVCall && b.enableAVCall(o);
};

exports.setMaxFramerate = function (o) {
  if (!y) b.setMaxFramerate && b.setMaxFramerate(o);
};

exports.getDeviceType = function () {
  if (y) return -1;

  if (!b.iotType) {
    console.log('\u5f53\u524d\u8bbe\u5907\u7c7b\u578b \u4e3a \u672a\u77e5\u7c7b\u578b');
    return 0;
  }

  if (1 == b.iotType) {
    console.log('\u5f53\u524d\u8bbe\u5907\u7c7b\u578b \u4e3a tuya');
    return 1;
  }

  if (2 == b.iotType) {
    console.log('\u5f53\u524d\u8bbe\u5907\u7c7b\u578b \u4e3a rriot');
    return 2;
  }
};

exports.getDevicePropertyFromMemCache = function (o, n) {
  if (y)
    n({
      localip: O.IP,
      ssid: O.SSID,
      mac: O.mac,
      lastVersion: O.lastVersion,
    });
};

exports.callMethod = function (o, n, t, u) {
  if (y)
    return void O.getDeviceWifi()
      .callMethod(o, n)
      .then(function (o) {
        return u(true, o);
      })
      .catch(function (o) {
        return u(false, o);
      });
  if ('android' === module12.Platform.OS) n.constructor === Array ? b.callMethod(o, n, t, u) : b.callMethodWithObject(o, n, t, u);
  else b.callMethod(o, n, t, u);
};

exports.callMethodFromCloud = function (o, n, t, c) {
  if (y)
    return void O.getDeviceWifi()
      .callMethod(o, n)
      .then(function (o) {
        return c(true, o);
      })
      .catch(function (o) {
        return c(false, o);
      });
  b.callMethodFromCloud(o, n, t, c);
};

exports.callMethodForceWay = function (o, n, t, c, u) {
  if (y)
    return void O.getDeviceWifi()
      .callMethodFromLocal(o, n)
      .then(function (o) {
        return u(o);
      })
      .catch(function (o) {
        return u(o);
      });
  b.callMethodFromLocal(o, n, t, u);
};

exports.callMethodForceWayNew = function (o, n, t) {
  return y
    ? O.getDeviceWifi().callMethodFromLocal(o, n)
    : new Promise(function (c, u) {
        console.log('callMethodForceWayNew 1');
        b.callMethodFromLocal(o, n, t, function (o, n) {
          console.log('callMethodForceWayNew callback');
          if (o) c(true);
          else u(n);
        });
      });
};

exports.callSmartHomeAPI = function (o, n, t) {
  if (t) t({});
};

exports.getMapData = function (o, n, t) {
  if (y) {
    var module406 = require('./406');

    module406.downloadMap(o, n, function (o, n) {
      t(o, n);
    });
  } else
    b.getMapData(o, n, function (o, n) {
      if (o && module391.default.isValidatedMapData(n)) t(true, n);
      else t(false, n || 'invalidated map data');
    });
};

exports.getPhotoBase64Data = function (o, n, c) {
  var u;
  return regeneratorRuntime.default.async(
    function (l) {
      for (;;)
        switch ((l.prev = l.next)) {
          case 0:
            if (module390.default.sharedCache().rsaKey) {
              l.next = 12;
              break;
            }

            if (module390.default.sharedCache().rsaExecutor) {
              l.next = 4;
              break;
            }

            c(false, 'rsaExecutor not ready');
            return l.abrupt('return');

          case 4:
            l.next = 6;
            return regeneratorRuntime.default.awrap(module390.default.sharedCache().rsaExecutor.execute('generateRSAKeys'));

          case 6:
            if (((u = l.sent).constructor == String && (u = JSON.parse(u)), u && u.pub)) {
              l.next = 11;
              break;
            }

            c(false, 'rsaKey not valid');
            return l.abrupt('return');

          case 11:
            if (!module390.default.sharedCache().rsaKey) module390.default.sharedCache().rsaKey = u;

          case 12:
            ce(
              'get_photo',
              {
                endpoint: 'xxx',
                data_filter: {
                  img_id: o,
                  type: n,
                },
                security: {
                  pub_key: JSON.parse(module390.default.sharedCache().rsaKey.pub),
                  cipher_suite: 1,
                },
              },
              function (o, n) {
                if (o)
                  module395.decryptRobotData(n, function (o, n) {
                    if (o) c(true, n);
                    else c(false, n || 'invalidated map data');
                  });
                else c(false, n || 'invalidated map data');
              }
            );

          case 13:
          case 'end':
            return l.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.getRobotData = ce;

exports.closeCurrentPage = function () {
  if (y) return void C.exit();
  b.closeCurrentPage();
};

exports.getPhoneTimezone = function () {
  return y
    ? new Promise(function (o, n) {
        o(D.locale.timeZone);
      })
    : new Promise(function (o, n) {
        b.getSystemTimezoneNameWithCallback(function (t, c) {
          if (t) o(c);
          else n('getPhoneTimezone error');
        });
      });
};

exports.getCurrentCountryInfoCallback = function (o) {
  if (y)
    T.getServerName()
      .then(function (n) {
        return o(true, n);
      })
      .catch(function () {
        o(false);
      });
  else b.getCurrentCountryInfoCallback(o);
};

exports.saveInfo = function (o) {
  if (y)
    return void D.storage.save({
      roborock_key: o,
    });
  b.saveInfo(o);
};

exports.loadInfoCallback = function (o) {
  if (y)
    return void D.storage.get('roborock_key').then(function (n) {
      return o(n);
    });
  b.loadInfoCallback(o);
};

exports.postPrivacyAgreementStatus = function (o, n) {
  return y
    ? new Promise(function (t, c) {
        var u = te.PrivacyAgreementStatusKey,
          s = JSON.stringify({
            deviceId: B,
            deviceModel: U,
            server: o,
            type: n,
          });
        T.storage
          .setThirdUserConfigsForOneKey(U, u, s)
          .then(function (o) {
            t(true);
          })
          .catch(function (o) {
            c(false);
          });
      })
    : new Promise(function (t, c) {
        var module403 = require('./403').version;

        b.uploadSignStatus(B, U, o, n, module403, '', function (o) {
          if (o) t(true);
          else c(false);
        });
      });
};

exports.getDeviceExtraInfoForKey = function (o) {
  return y
    ? ue(o)
    : new Promise(function (n, t) {
        b.getDeviceExtraInfoForKey(o)
          .then(function (o) {
            n(o);
          })
          .catch(function (o) {
            t(o);
          });
      });
};

exports.saveDeviceExtraValue = function (o, n) {
  return y
    ? new Promise(function (t, c) {
        ie(o, n);
        t(true);
      })
    : new Promise(function (t, c) {
        b.saveDeviceExtraValue(n, o)
          .then(function (o) {
            t(o);
          })
          .catch(function (o) {
            c(o);
          });
      });
};

exports.postPrivacyAgreementStatusWithVersion = function (o, n, t) {
  return y
    ? new Promise(function (c, u) {
        var s = te.PrivacyAgreementStatusWithVersionKey,
          l = JSON.stringify({
            deviceId: B,
            deviceModel: U,
            server: o,
            type: n,
            version: t,
          });
        T.storage
          .setThirdUserConfigsForOneKey(U, s, l)
          .then(function (o) {
            c(true);
          })
          .catch(function (o) {
            u(false);
          });
      })
    : new Promise(function (c, u) {
        b.uploadSignStatus(B, U, o, n, t, '', function (o) {
          if (o) c(true);
          else u(false);
        });
      });
};

exports.getPrivacyAgreementByKey = function (o) {
  if (y)
    return new Promise(function (n, t) {
      T.storage
        .getThirdUserConfigsForOneKey(U, o)
        .then(function (o) {
          n(o);
        })
        .catch(function (o) {
          t(o);
        });
    });
};

exports.setValue = ie;
exports.getValue = ue;

exports.openChangeDeviceName = function () {
  if (y) D.ui.openChangeDeviceName();
  else b.openChangeDeviceName();
};

exports.canOpenDeviceSharePage = function () {
  if (y) return false;
  return b.openDeviceSharePage;
};

exports.openDeviceSharePage = function () {
  if (!y) b.openDeviceSharePage(B);
};

exports.localPingWithCallback = function (o) {
  if (y)
    return void O.getDeviceWifi()
      .localPing()
      .then(function (n) {
        return o(true);
      })
      .catch(function (n) {
        return o(false);
      });
  b.localPingWithCallback(o);
};

exports.downloadFile = function (o, n, t) {
  if (y)
    D.file
      .downloadFile(o, n)
      .then(function (o) {
        t(true, o);
      })
      .catch(function (o) {
        t(false);
      });
  else b.downloadFile(o, n, t);
};

exports.readFile = function (o, n) {
  if (y)
    D.file
      .readFile(o)
      .then(function (o) {
        n(true, o);
      })
      .catch(function (o) {
        n(false, o);
      });
  else b.readFile(o, n);
};

exports.readFilePromise = function (o) {
  return y
    ? D.file.readFile(o)
    : new Promise(function (n, t) {
        b.readFile(o, function (o, c) {
          if (o) n(c);
          else t('readFile error');
        });
      });
};

exports.deleteFile = function (o, n) {
  if (y)
    D.file
      .deleteFile(o)
      .then(function (o) {
        n(true);
      })
      .catch(function (o) {
        n(false, o);
      });
  else b.deleteFile(o, n);
};

exports.readFileList = function (o) {
  if (y)
    D.file
      .readFileList()
      .then(function (n) {
        o(true, n);
      })
      .catch(function (n) {
        o(false, n);
      });
  else b.readFileList(o);
};

exports.readFileListAtPath = function (o) {
  var module21, React;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            module21 = y ? D.file.readFileList(o) : b.readFileListAtPath(o);
            s.prev = 1;
            s.next = 4;
            return regeneratorRuntime.default.awrap(module21);

          case 4:
            React = s.sent;
            return s.abrupt(
              'return',
              'android' === module12.Platform.OS || y
                ? React.map(function (o) {
                    return o.name;
                  })
                : React
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

exports.writeFileToPath = function (o, n) {
  var module12, u;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            module12 = y ? D.file.writeFile(o, n) : b.writeFileToPath(o, n);
            s.prev = 1;
            s.next = 4;
            return regeneratorRuntime.default.awrap(module12);

          case 4:
            u = s.sent;
            console.log('writeFileToPath success ' + o, u);
            s.next = 11;
            break;

          case 8:
            s.prev = 8;
            s.t0 = s.catch(1);
            console.log('writeFileToPath  error ' + o + ': ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

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
  return y || !!b.writeFileToPath;
};

exports.startPlay = function (o, n, t) {
  if (y)
    D.audio
      .startPlay(o, n)
      .then(function (o) {
        console.log('Host.audio.startPlay - ' + JSON.stringify(o));
        t(true, o);
      })
      .catch(function (o) {
        console.log('Host.audio.startPlay error: ' + ('object' == typeof o ? JSON.stringify(o) : o));
        t(false, o);
      });
  else if (b.startPlay) b.startPlay(o, n, t);
  else t(true, {});
};

exports.stopPlay = function (o) {
  if (y)
    D.audio
      .stopPlay()
      .then(function () {
        o(true);
      })
      .catch(function (n) {
        o(false);
      });
  else if (b.stopPlay) b.stopPlay(o);
  else o(true);
};

exports.openRoomManagementPage = function () {
  if (y) D.ui.openRoomManagementPage();
};

exports.openShareDevicePage = function () {
  if (y) D.ui.openShareDevicePage();
};

exports.openDeviceUpgradePage = function () {
  if (y) D.ui.openDeviceUpgradePage();
  else b.openDeviceUpgradePage();
};

exports.openIftttAutoPage = function () {
  if (y) D.ui.openIftttAutoPage();
};

exports.openNewMorePage = function () {
  if (y) console.log('openNewMorePage openNewMorePage');
};

exports.openAddToDesktopPage = function () {
  if (y) D.ui.openAddToDesktopPage();
};

exports.openPrivacyLicense = function (o, n, t, c, u) {
  if (y)
    D.ui.openPrivacyLicense(o, n, t, c).then(function (o) {
      console.log('agreement did agree -' + o);
      u(o);
    });
  else {
    var module175 = require('./175'),
      l = module175(n).uri,
      v = module175(c).uri;

    b.openPrivacyLicense(o, l, t, v, u);
  }
};

exports.alertLegalInformationAuthorization = function (o, n) {
  if (y)
    D.ui.alertLegalInformationAuthorization(o).then(function (o) {
      console.log('agreement did agree -' + o);
      n(o);
    });
};

exports.privacyAndProtocolReview = function (o, n, t, c) {
  if (y) D.ui.privacyAndProtocolReview(o, n, t, c);
};

exports.previewLegalInformationAuthorization = function (o) {
  if (y)
    D.ui.previewLegalInformationAuthorization(o).then(function (o) {
      console.log('agreement did agree -' + o);
      callback(o);
    });
};

exports.openDeleteDevice = function (o) {
  if (y) D.ui.openDeleteDevice(o);
  else b.openDeleteDevice();
};

exports.openShopPage = function (o) {
  if (y) {
    console.log('openShopPage -- ' + o);
    D.ui.openShopPage(o);
  }
};

exports.isOpenSmallProgram = function () {
  return b.gotoWxMiniProgramMall && !y;
};

exports.openSmallProgram = function (o) {
  if (!y) b.gotoWxMiniProgramMall(o);
};

exports.miAddTimer = function (o) {
  return new Promise(function (n, t) {
    var c = T.scene.createTimerScene(B, o);
    console.log('miAddTimer - deviceId - ' + B + ' - opt - ' + JSON.stringify(o));
    c.save()
      .then(function (o) {
        n(o);
      })
      .catch(function (o) {
        t(o);
      });
  });
};

exports.rrAddOrEditTimer = function (o, n, t, c) {
  return new Promise(function (u, s) {
    b.addOrSetTimer(B, c, n, o, t, function (o, n) {
      if (o) u(true);
      else s(n);
    });
  });
};

exports.setSmartSceneParams = function (o, n) {
  if (!b.setSmartSceneParams)
    return new Promise(function (o, n) {
      n('Native method not found.');
    });
  return b.setSmartSceneParams(o, n);
};

exports.getServerTimers = function () {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            if (!y) {
              o.next = 4;
              break;
            }

            return o.abrupt('return', T.scene.loadTimerScenes(B));

          case 4:
            return o.abrupt(
              'return',
              new Promise(function (o, n) {
                b.getTimers(B, function (t, c) {
                  if (t) o(c);
                  else n(c);
                });
              })
            );

          case 5:
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

exports.delServerTimer = function (o) {
  return y
    ? o.remove()
    : new Promise(function (n, t) {
        b.removeTimer(B, o, function (o, c) {
          if (o) n(true);
          else t(c);
        });
      });
};

exports.updateTimer = function (o, n) {
  if (y) {
    console.log('timerScene -', o);
    var t = JSON.parse(JSON.stringify(o.setting));
    t.enable_timer = n;
    var c = {
      name: o.name,
      setting: t,
    };
    console.log('mi updateTimer - ' + JSON.stringify(c));
    return o.save(c);
  }

  return new Promise(function (t, c) {
    b.updateTimerStatus(B, o, n, function (o, n) {
      if (o) t(true);
      else c(n);
    });
  });
};

exports.getFirmwareVersion = function () {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            if (!y) {
              o.next = 4;
              break;
            }

            return o.abrupt('return', O.getDeviceWifi().getVersion());

          case 4:
            o.next = 6;
            return regeneratorRuntime.default.awrap(b.getLastVersionInfo());

          case 6:
            return o.abrupt('return', o.sent);

          case 7:
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

exports.isSupportFirmwareVersion = function () {
  return !!y || undefined != b.getLastVersionInfo;
};

exports.getFirmwareUpgradingInfo = function (o, n) {
  if (y) return T.smarthome.checkDeviceVersion(o, n);
};

exports.isOwner = function () {
  return y ? O.isOwner : K == H;
};

exports.isDarkMode = function () {
  return se() == ae.dark;
};

exports.getRoomList = function (o) {
  var n, u;
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            if (!y) {
              s.next = 4;
              break;
            }

            if ('ios' === module12.Platform.OS || J >= p)
              T.room
                .loadAllRoom(true)
                .then(function (n) {
                  var t = n
                    .filter(function (o) {
                      return 'mijia.roomid.default' != o.roomID;
                    })
                    .map(function (o) {
                      return {
                        roomId: o.roomID,
                        name: o.name,
                      };
                    });
                  o(true, t);
                })
                .catch(function (n) {
                  o(false, n);
                });
            s.next = 16;
            break;

          case 4:
            if (!b.getRoomList) {
              s.next = 16;
              break;
            }

            s.prev = 5;
            s.next = 8;
            return regeneratorRuntime.default.awrap(b.getRoomList());

          case 8:
            n = s.sent;
            u = 'object' == typeof n ? n : JSON.parse(n);
            o(true, u);
            s.next = 16;
            break;

          case 13:
            s.prev = 13;
            s.t0 = s.catch(5);
            o(false, s.t0);

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

exports.addNewRoomWithName = function (o, n) {
  var u, s;
  return regeneratorRuntime.default.async(
    function (l) {
      for (;;)
        switch ((l.prev = l.next)) {
          case 0:
            if (!y) {
              l.next = 4;
              break;
            }

            if ('ios' === module12.Platform.OS || J >= p)
              T.room
                .createRoom(o)
                .then(function (o) {
                  var t = {
                    roomId: o.roomID,
                    name: o.name,
                  };
                  n(true, t);
                })
                .catch(function (o) {
                  n(false, o);
                });
            l.next = 16;
            break;

          case 4:
            if (!b.addNewRoomWithName) {
              l.next = 16;
              break;
            }

            l.prev = 5;
            l.next = 8;
            return regeneratorRuntime.default.awrap(b.addNewRoomWithName(o));

          case 8:
            u = l.sent;
            s = 'object' == typeof u ? u : JSON.parse(u);
            n(true, s);
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

exports.isModel = le;

exports.isRubyplus = function () {
  return le(['roborock.vacuum.t4', 'roborock.vacuum.t4v2', 'roborock.vacuum.t4v3', 'roborock.vacuum.s4', 'roborock.vacuum.s4v2', 'roborock.vacuum.s4v3']);
};

exports.isTanosT6 = function () {
  return le(['roborock.vacuum.t6', 'roborock.vacuum.t6v2', 'roborock.vacuum.t6v3']);
};

exports.isTanosS6 = function () {
  return le(['roborock.vacuum.s6', 'roborock.vacuum.s6v2', 'roborock.vacuum.s6v3']);
};

exports.isRubysLite = function () {
  return le([
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
  return le([
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

exports.isRubysE = ve;

exports.isRubysCP5 = function () {
  return le(['roborock.vacuum.p5', 'roborock.vacuum.p5v2', 'roborock.vacuum.p5v3', 'roborock.vacuum.p5v4', 'roborock.vacuum.p5v5']);
};

exports.isTanosE = function () {
  return le([
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
  return le([
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
  return le([
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
  return le(['roborock.vacuum.a10', 'roborock.vacuum.a10v2', 'roborock.vacuum.a10v3', 'roborock.vacuum.a10v4', 'roborock.vacuum.a10v5']);
};

exports.isTanosVA09 = function () {
  return le(['roborock.vacuum.a09', 'roborock.vacuum.a09v2', 'roborock.vacuum.a09v3', 'roborock.vacuum.a09v4', 'roborock.vacuum.a09v5']);
};

exports.isRubys = function () {
  return le(['roborock.vacuum.s5', 'roborock.sweeper.s5v2', 'roborock.sweeper.s5v3']);
};

exports.isTanosS = fe;

exports.isGarnet = function () {
  return le(['roborock.vacuum.a16', 'roborock.vacuum.a16v2', 'roborock.vacuum.a16v3']);
};

exports.isTanosSPlus = function () {
  return le([
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
  return le([
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
  return !(de() || me() || pe() || ge());
};

exports.isV2Model = de;
exports.isV3Model = me;
exports.isV4Model = pe;
exports.isV5Model = ge;

exports.fixDeviceScreenHeight = function () {
  module390.default.sharedCache().ScreenHeight = module12.Dimensions.get('window').height;
  if ('ios' != module12.Platform.OS)
    y
      ? !re &&
        regeneratorRuntime.default.async(
          function (u) {
            for (;;)
              switch ((u.prev = u.next)) {
                case 0:
                  u.prev = 0;
                  u.next = 3;
                  return regeneratorRuntime.default.awrap(D.getPhoneScreenInfo());

                case 3:
                  o = u.sent;
                  console.log('getPhoneScreenInfo - ' + JSON.stringify(o) + ' - screenHeight - ' + module12.Dimensions.get('screen').height);
                  n = o.viewHeightPixel ? o.viewHeightPixel / module12.Dimensions.get('window').scale : o.viewHeight;
                  module390.default.sharedCache().ScreenHeight = n;
                  module390.default.sharedCache().NavigationBarHeight = o.navigationBarHeight || 0;
                  module12.DeviceEventEmitter.emit('ScreenHeightUpdate');
                  u.next = 14;
                  break;

                case 11:
                  u.prev = 11;
                  u.t0 = u.catch(0);
                  console.log('getPhoneScreenInfo  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                case 14:
                case 'end':
                  return u.stop();
              }
          },
          null,
          null,
          [[0, 11]],
          Promise
        )
      : module12.DeviceEventEmitter.addListener('didUpdateDimensions', function (o) {
          if (b.updateDimension) b.updateDimension(o);
          var n = module12.Dimensions.get('window').height,
            t = o.windowPhysicalPixels;
          if (undefined != t) n = t.height / t.scale;
          module390.default.sharedCache().ScreenHeight = n;
          console.log('RR fixDeviceScreenHeight - ' + n);
          module12.DeviceEventEmitter.emit('ScreenHeightUpdate');
        });
  var o, n;
};

exports.adjustDefaultFont = function () {
  var o = module12.StyleSheet.create({
      defaultFontFamily: {
        fontFamily: y ? 'lucida grande' : 'Droid Sans',
      },
    }),
    t = module12.Text.render;

  module12.Text.render = function (...args) {
    var v = t.call(this, ...args);
    return React.default.cloneElement(v, {
      style: [v.props.style, 'android' == module12.Platform.OS ? o.defaultFontFamily : {}],
      allowFontScaling: false,
    });
  };

  module12.TextInput.defaultProps = module21.default({}, module12.TextInput.defaultProps, {
    allowFontScaling: false,
  });
};

exports.adjustDefaultTextAlign = function () {
  var o = module12.StyleSheet.create({
      defaultTextAlign: {
        textAlign: globals.isRTL ? 'right' : 'left',
      },
    }),
    n = module12.Text.render;

  module12.Text.render = function (...args) {
    var l = n.call(this, ...args);
    return React.default.cloneElement(l, {
      style: [o.defaultTextAlign, l.props.style],
    });
  };
};

exports.openHelpPage = function () {
  if (y) D.ui.openHelpPage();
};

exports.getOperatorsCountryCode = function () {
  var o;
  return regeneratorRuntime.default.async(
    function (n) {
      for (;;)
        switch ((n.prev = n.next)) {
          case 0:
            n.next = 2;
            return regeneratorRuntime.default.awrap(be());

          case 2:
            o = n.sent;
            return n.abrupt('return', he(o));

          case 4:
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

exports.getOperatorsInfo = be;

exports.getPrivacyCode = function (o) {
  if (!y && b.getPrivacyCode) return b.getPrivacyCode(o);
};

exports.getVoicePackageList = function (o) {
  return regeneratorRuntime.default.async(
    function (n) {
      for (;;)
        switch ((n.prev = n.next)) {
          case 0:
            if (!y) {
              n.next = 4;
              break;
            }

            return n.abrupt('return', []);

          case 4:
            if (b.getVoicePackageList) {
              n.next = 6;
              break;
            }

            return n.abrupt('return', []);

          case 6:
            n.next = 8;
            return regeneratorRuntime.default.awrap(b.getVoicePackageList(o));

          case 8:
            return n.abrupt('return', n.sent);

          case 9:
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

exports.monitorAllowed = function () {
  return !(('ios' == module12.Platform.OS && X.mobileModel.includes('x86')) || y);
};

exports.isSimulator = function () {
  return X.mobileModel.includes('x86') || y;
};

exports.checkFirmwareUpdateAndAlert = function () {
  if (y)
    return new Promise(function (o, n) {
      O.checkFirmwareUpdateAndAlert()
        .then(function (n) {
          o(n);
        })
        .catch(function (o) {
          n(o);
        });
    });
};

exports.keepScreenOn = function (o) {
  if (!y) b.keepScreenOn && b.keepScreenOn(true);
};

exports.reload = function (o) {
  if (!y) b.reload && b.reload();
};

exports.currentAppVersion = function () {
  var o = null;
  if (!y) o = b.appVersion;
  return o || 'no support';
};

exports.isRecordSupported = function () {
  return !!module12.NativeModules.RRRecorder && J >= 10006;
};

exports.isRoomNameSupported = function () {
  return y || b.getRoomList;
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
    ].findIndex(function (o) {
      return K == o;
    })
  );
};

exports.isRemoteViewingAlertTestModeSupport = function () {
  return (
    -1 !=
    ['rr5ab65412abbcc0', 'rr5ab8d94812fc60', 'rr5c224ed78c9830'].findIndex(function (o) {
      return K == o;
    })
  );
};

exports.isAutoTestSupported = function () {
  return (
    -1 !=
    [
      'rr5c5cc29af05820',
      '15899336',
      'rr5d2308b5469820',
      '1155970109',
      'rr5ccc5c8c4f1820',
      '2279714042',
      'rr5b7ed488f03d70',
      'rr5cc0ccc796d830',
      'rr5ada6d9c85bd70',
      'rr5e984d4e5a9830',
    ].findIndex(function (o) {
      return K == o;
    })
  );
};

exports.isSpecSupported = function () {
  return y && (fe() || ve());
};

exports.openShareListBar = function (o, n, t, c) {
  if (y) D.ui.openShareListBar(o, n, t, c);
  else if (J >= 10009 && b.openShareListBar) b.openShareListBar(o, n, t, c);
};

exports.longScreenShot = function (o, n) {
  return y
    ? D.file.longScreenShot(o, n)
    : new Promise(function (t, c) {
        if (J >= 10009 && b.longScreenShot)
          b.longScreenShot(o, n)
            .then(function (o) {
              t(o);
            })
            .catch(function (o) {
              c(o);
            });
        else c('share apilevel too low');
      });
};

exports.logEventStatus = function (o, n) {
  var t = {};
  t[o] = n;
  console.log('Will log event status: ' + JSON.stringify(t));
  if (!(null == b || null == b.eventStatusWithParamDic)) b.eventStatusWithParamDic(t);
};

exports.logEventCommon = function (o, n) {
  console.log('Will log event common: ' + o + ', ' + JSON.stringify(n));
  if (!(null == b || null == b.eventCommonWithEventIDDict)) b.eventCommonWithEventIDDict(o, n);
};

exports.logEventRecordView = function (o, n, t) {
  var c = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : {};
  if (!(null == b || null == b.eventRecordView)) b.eventRecordView(o, n, t, c);
};

exports.getSmartSceneInfo = function () {
  return null == b ? undefined : b.getSmartScenes();
};

exports.syncSmartSceneInfo = function (o) {
  return null == b ? undefined : b.syncSmartScenes(o);
};

exports.isSmartSceneSupported = function () {
  return null == b ? undefined : b.syncSmartScenes;
};

exports.selectSystemMediaPaths = function () {
  if (!y)
    return new Promise(function (o, n) {
      b.getSystemMedia()
        .then(function (n) {
          o(n);
        })
        .catch(function (o) {
          n(o);
        });
    });
  reject('not support on MiApp');
};

exports.uploadFilesToOss = function (o) {
  if (!y)
    return new Promise(function (n, t) {
      b.uploadFilesToOss(o)
        .then(function (o) {
          n(o);
        })
        .catch(function (o) {
          t(o);
        });
    });
  reject('not support on MiApp');
};

exports.fileInternalBug = function (o, n, t, c, u, s, l, v, f) {
  if (!y)
    return new Promise(function (p, h) {
      b.fileInternalBug(o, n, t, c, u, s, l, v, f)
        .then(function (o) {
          p(o);
        })
        .catch(function (o) {
          h(o);
        });
    });
  reject('not support on MiApp');
};

exports.open3DMapTestPage = function (o) {
  if (y) return;
  b.open3DMapTestPage(o);
};

exports.isSupport3DMap = function () {
  return !!b && !!b.open3DMapTestPage;
};

exports.isIphoneXSeries = function () {
  if ('ios' != module12.Platform.OS) return false;
  var o;
  if (y) return null == (o = D) ? undefined : o.isIphoneXSeries;

  try {
    var n;
    return null != (n = null == b ? undefined : b.isBangsScreen) && n;
  } catch (o) {
    return false;
  }
};

var module21 = require('./21'),
  regeneratorRuntime = require('regenerator-runtime'),
  module12 = require('./12'),
  React = require('react'),
  module390 = require('./390'),
  module391 = require('./391'),
  module395 = (function (o, n) {
    if (!n && o && o.__esModule) return o;
    if (null === o || ('object' != typeof o && 'function' != typeof o))
      return {
        default: o,
      };
    var t = f(n);
    if (t && t.has(o)) return t.get(o);
    var c = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in o)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(o, s)) {
        var l = u ? Object.getOwnPropertyDescriptor(o, s) : null;
        if (l && (l.get || l.set)) Object.defineProperty(c, s, l);
        else c[s] = o[s];
      }

    c.default = o;
    if (t) t.set(o, c);
    return c;
  })(require('./395'));

function f(o) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    t = new WeakMap();
  return (f = function (o) {
    return o ? t : n;
  })(o);
}

module12.NativeModules.MHRoom;
var p = 10021;
exports.androidRoomApiLevel = p;
require('./404').JsExecutor;

var h = 10039,
  b = module12.NativeModules.RRPluginSDK,
  k = module12.NativeModules.RRPluginDarkMode,
  module402 = require('./402'),
  module403 = require('./403'),
  y = !b;

exports.isMiApp = y;
var w = '';
exports.MCC = w;
var D = null;
exports.Host = D;
var C = null;
exports.Package = C;
var M = null;
exports.Entrance = M;
var x = null;
exports.PackageEvent = x;
var T = null;
exports.Service = T;
var O = null;
exports.Device = O;
var N = null;
exports.DeviceEvent = N;
var E = null;
exports.CommonSetting = E;
var I = null;
exports.MoreSetting = I;
var A = null;
exports.SETTING_KEYS = A;
var F = 0;
exports.MiApiLevel = F;
var L = null;
exports.AudioEvent = L;
var R = null;

if (((exports.MiDarkMode = R), y)) {
  var module405 = require('./405');

  exports.Host = D = module405.Host;
  exports.Package = C = module405.Package;
  exports.Entrance = M = module405.Entrance;
  exports.PackageEvent = x = module405.PackageEvent;
  exports.Service = T = module405.Service;
  exports.Device = O = module405.Device;
  exports.DeviceEvent = N = module405.DeviceEvent;
  exports.CommonSetting = E = module405.CommonSetting;
  exports.MoreSetting = I = module405.MoreSetting;
  exports.SETTING_KEYS = A = module405.SETTING_KEYS;
  exports.MiApiLevel = F = module405.API_LEVEL;
  exports.AudioEvent = L = module405.AudioEvent;
  exports.MiDarkMode = R = module405.DarkMode;
}

var _ = {
  OPERATOR_NONE: 0,
  OPERATOR_CN: 1,
  OPERATOR_NOT_CN: 2,
};
exports.OperatorCode = _;
var W = y ? '' : b.basePath;
exports.basePath = W;
var J = y ? D.apiLevel : b.apiLevel;
exports.apiLevel = J;
var H = y ? O.owner : b.ownerId;
exports.ownerId = H;
var K = y ? T.account.ID : b.userId;
exports.userId = K;
var j = y ? D.isDebug : b.devMode;
exports.devMode = j;
var B = y ? O.deviceID : b.deviceId;
exports.deviceId = B;
var z = y ? O.name : b.deviceName;
exports.deviceName = z;
var U = y ? O.model : b.deviceModel;
exports.deviceModel = U;
var G = y ? '' : b.storageBasePath;
exports.storageBasePath = G;
var Z = y ? '' : b.activeTime;
exports.activeTime = Z;
var Y = y ? '' : b.robotTimeZone;
exports.robotTimeZone = Y;
console.log('robotTimeZone - ' + Y);
var X = y ? D.systemInfo : b.systemInfo;
exports.systemInfo = X;
var q = y ? N.deviceNameChanged : b.deviceNameChangedEvent;
exports.deviceNameChangedEvent = q;
var Q = y ? D.audio.audioPlayerDidFinishPlayingEvent : b.audioPlayerDidFinishPlayingEvent;
exports.audioPlayerDidFinishPlayingEvent = Q;
var $ = y ? module402.version_code : module403.version;
exports.pluginVersion = $;
var ee = y ? 'no supported' : b.clientID;
exports.appClientID = ee;
var oe = y ? '' : b.iotType;
exports.iotType = oe;
var ne = y ? 0 : b.memory ? b.memory : 0;
exports.systemMemorySize = ne;
var re = y && J >= 10051 && D.isPad;
exports.isWindowDisplay = re;
var te = {
  PrivacyAgreementStatusKey: '1_' + B + '_' + K,
  PrivacyAgreementStatusWithVersionKey: '2_' + B + '_' + K,
};
exports.CloudStorageKeys = te;
var ae = {
  light: 'light',
  dark: 'dark',
};

function ce(o, n, t) {
  if (y)
    require('./501').downloadFile(o, n, function (o, n) {
      t(o, n);
    });
  else
    b.getRobotData(o, n, function (o, n) {
      if (o) t(true, n);
      else t(false, n || 'invalidated map data');
    });
}

function ie(o, n) {
  return y
    ? new Promise(function (t, c) {
        var u = {
          did: B,
          props: ['prop.s_mixxx'],
        };
        T.smarthome
          .batchGetDeviceDatas([u])
          .then(function (t) {
            var u = t[B]['prop.s_mixxx'];
            console.log('batchSetDeviceDatas get last- ' + JSON.stringify(t));
            var s = u ? JSON.parse(u) : {};
            s[o] = n;
            var l = {
              did: B,
              props: {
                'prop.s_mixxx': JSON.stringify(s),
              },
            };
            T.smarthome
              .batchSetDeviceDatas([l])
              .then(function (o) {
                console.log('batchSetDeviceDatas - ' + JSON.stringify(l));
              })
              .catch(function (o) {
                c(o);
              });
          })
          .catch(function (o) {
            c(o);
          });
      })
    : new Promise(function (t, c) {
        b.setValue(o, n);
        t(true);
      });
}

function ue(o) {
  if (y) {
    var n = {
      did: B,
      props: ['prop.s_mixxx'],
    };
    return new Promise(function (t, c) {
      T.smarthome
        .batchGetDeviceDatas([n])
        .then(function (n) {
          var c = n[B]['prop.s_mixxx'];
          console.log('batchGetDeviceDatas - ' + JSON.stringify(n));
          t(c ? JSON.parse(c)[o] : null);
        })
        .catch(function (o) {
          c(o);
        });
    });
  }

  return new Promise(function (n, t) {
    b.getValue(o, function (o) {
      n(o);
    });
  });
}

function se() {
  if (y) {
    if (R && J >= h) {
      R.preparePluginOwnDarkMode();
      return R.getColorScheme();
    } else return ae.light;
  } else return k ? k.colorScheme : ae.light;
}

exports.Theme = ae;

exports.addThemeChangeListener = function (o) {
  if (y) {
    if (R) R.addChangeListener(o);
  } else if (k) new module12.NativeEventEmitter(k).addListener('themeDidChange', o);
};

function le(o) {
  return -1 != o.indexOf(U);
}

function ve() {
  return le(['roborock.vacuum.a19', 'roborock.vacuum.a19v2', 'roborock.vacuum.a19v3', 'roborock.vacuum.a19v4', 'roborock.vacuum.a19v5']);
}

function fe() {
  return le([
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

function de() {
  return -1 != U.toLowerCase().search('v2');
}

function me() {
  return -1 != U.toLowerCase().search('v3');
}

function pe() {
  return -1 != U.toLowerCase().search('v4');
}

function ge() {
  return -1 != U.toLowerCase().search('v5');
}

function he(o) {
  if (o) {
    console.log('getOperatorsInfo \uff1a + ' + JSON.stringify(o));

    if (o[1] && o[1].countryCode && 'cn' == o[1].countryCode.toLowerCase()) {
      exports.MCC = w = o[1].countryCode.toLowerCase();
      return _.OPERATOR_CN;
    } else if (o[2] && o[2].countryCode && 'cn' == o[2].countryCode.toLowerCase()) {
      exports.MCC = w = o[2].countryCode.toLowerCase();
      return _.OPERATOR_CN;
    } else if (o[1] && '' == o[1].countryCode.toLowerCase()) return _.OPERATOR_NONE;
    else {
      exports.MCC = w = 'not-cn';
      return _.OPERATOR_NOT_CN;
    }
  } else {
    console.log('getOperatorsInfo error\uff1a + ' + o);
    return _.OPERATOR_NONE;
  }
}

function be() {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            if (((o.prev = 0), !y)) {
              o.next = 7;
              break;
            }

            o.next = 4;
            return regeneratorRuntime.default.awrap(D.getOperatorsInfo());

          case 4:
            o.t0 = o.sent;
            o.next = 8;
            break;

          case 7:
            o.t0 = b.getOperatorsInfo();

          case 8:
            return o.abrupt('return', o.t0);

          case 11:
            o.prev = 11;
            o.t1 = o.catch(0);
            console.log('getOperatorsInfo error ' + o.t1);
            return o.abrupt('return', null);

          case 15:
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

exports.removeThemeChangeListener = function (o) {
  if (y) {
    if (R) R.removeChangeListener(o);
  } else if (k) new module12.NativeEventEmitter(k).removeListener('themeDidChange', o);
};

var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module394 = require('./394'),
  module1199 = require('./1199'),
  module391 = require('./391'),
  module416 = require('./416'),
  module390 = require('./390'),
  module381 = require('./381'),
  module420 = require('./420'),
  module418 = require('./418'),
  module385 = require('./385'),
  module2086 = require('./2086'),
  module2087 = require('./2087'),
  module2090 = require('./2090'),
  module2091 = require('./2091');

require('./2092');

function L() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

require('./1343');

var module510 = require('./510').strings,
  module393 = require('./393'),
  module1644 = require('./1644'),
  R = {
    keyOther: 'other',
    keySoft: 'Software',
    keyHard: 'Hardware',
  },
  A = [
    {
      typeName: '\u8f6f\u4ef6\u95ee\u9898',
      key: 'Software',
      typeQuestions: [
        {
          category: '\u8def\u5f84\u89c4\u5212',
          detail: '\u8def\u5f84\u91cd\u590d/\u6df7\u4e71\u3001\u7ed5\u8fdc\u8def\u7b49',
        },
        {
          category: '\u8bc6\u522b\u95ee\u9898',
          detail: '\u8bc6\u522b\u9519\u8bef\u3001\u6f0f\u8bc6\u522b\u649e\u4e0a\u53bb\u3001\u8bef\u8bc6\u522b\u6f0f\u626b\uff0c\u6ca1\u907f\u969c\u7b49',
        },
        {
          category: '\u5730\u56fe\u95ee\u9898',
          detail: '\u5730\u56fe\u82b1\u3001\u91cd\u53e0\u3001\u6df7\u4e71\u3001\u5b9a\u4f4d\u5f02\u5e38\u7b49',
        },
        {
          category: '\u6f0f\u626b\u95ee\u9898',
          detail: '\u623f\u95f4\u6f0f\u626b\u3001\u5c0f\u7a7a\u95f4\u6f0f\u626b\u7b49',
        },
        {
          category: '\u57fa\u5ea7\u95ee\u9898',
          detail: '\u56de\u5145/\u56de\u6d17\u5931\u8d25\u3001\u6d17\u5e03/\u96c6\u5c18/\u70d8\u5e72\u5f02\u5e38\u7b49',
        },
        {
          category: 'App\u95ee\u9898',
          detail: 'UI\u89c6\u89c9\u4e0d\u7f8e\u89c2\u3001\u529f\u80fd\u663e\u793a\u4e0d\u5bf9\u3001\u8bbe\u5907\u79bb\u7ebf\uff0c\u8054\u7f51\u5931\u8d25\u7b49',
        },
        {
          category: '\u5176\u4ed6\u95ee\u9898',
          detail: '\u4e0a\u8ff0\u672a\u5305\u542b\u7684\u5206\u7c7b',
        },
      ],
    },
    {
      typeName: '\u786c\u4ef6\u95ee\u9898',
      key: 'Hardware',
      typeQuestions: [
        {
          category: '\u626b\u5730\u4e0d\u5e72\u51c0',
        },
        {
          category: '\u62d6\u5730\u4e0d\u5e72\u51c0',
        },
        {
          category: '\u96c6\u5c18\u4e0d\u5e72\u51c0',
        },
        {
          category: '\u6d17\u5e03\u4e0d\u5e72\u51c0',
        },
        {
          category: '\u62d6\u5e03\u70d8\u4e0d\u5e72',
        },
        {
          category: '\u6709\u566a\u97f3\u5f02\u54cd',
        },
        {
          category: '\u5305\u88c5\u95ee\u9898',
        },
        {
          category: '\u5143\u5668\u4ef6\u5f02\u5e38',
        },
        {
          category: '\u5176\u4ed6\u95ee\u9898',
        },
      ],
    },
    {
      typeName: '\u4f53\u9a8c\u95ee\u9898',
      key: 'other',
      typeQuestions: [],
    },
  ],
  E = (function (t) {
    module9.default(O, t);

    var n = O,
      module1199 = L(),
      E = function () {
        var t,
          o = module12.default(n);

        if (module1199) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function O(t) {
      var n;
      module6.default(this, O);

      (n = E.call(this, t)).onPressSubmit = function () {
        var t, l, u, c, f, h, p, y, S, v, b, w, module390, T, _, P;

        return regeneratorRuntime.default.async(
          function (C) {
            for (;;)
              switch ((C.prev = C.next)) {
                case 0:
                  if (!n.isSubmiting) {
                    C.next = 2;
                    break;
                  }

                  return C.abrupt('return');

                case 2:
                  n.isSubmiting = true;
                  n.startLoading();
                  C.next = 6;
                  return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.InnerTestUsersName, n.state.fbName));

                case 6:
                  C.next = 8;
                  return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.InnerTestHDVersion, n.state.fbHDVersion));

                case 8:
                  if (
                    ((t = []),
                    n.state.imageArray.length > 0 &&
                      n.state.imageArray.forEach(function (n) {
                        if (n.filePath && n.filePath.length > 0) t.push(n.filePath);
                      }),
                    (l = []),
                    n.state.historyImage && l.push(n.state.historyImage),
                    (u = false),
                    (c = l.length <= 0),
                    (f = t.length <= 0),
                    (h = !module393.isRRLogSupported()),
                    (C.prev = 16),
                    !n.shouldUploadLog)
                  ) {
                    C.next = 20;
                    break;
                  }

                  C.next = 20;
                  return regeneratorRuntime.default.awrap(n.setLogUploadLevelOnRobot());

                case 20:
                  if (!module393.isRRLogSupported()) {
                    C.next = 27;
                    break;
                  }

                  n.logId = null;
                  C.next = 24;
                  return regeneratorRuntime.default.awrap(module418.Log.rrlogUpload());

                case 24:
                  if (null == (y = C.sent) ? undefined : y.logId) {
                    n.logId = y.logId;
                    h = true;
                  }

                  console.log('cyzcyz ' + JSON.stringify(y));

                case 27:
                  if (((S = []), (v = ''), !(l.length > 0))) {
                    C.next = 35;
                    break;
                  }

                  C.next = 32;
                  return regeneratorRuntime.default.awrap(module393.uploadFilesToOss(l));

                case 32:
                  S = C.sent;
                  c = true;
                  if (S.length > 0 && (b = S[0].split('/')).length > 0) v = b.pop();

                case 35:
                  if (((w = []), !(t.length > 0))) {
                    C.next = 41;
                    break;
                  }

                  C.next = 39;
                  return regeneratorRuntime.default.awrap(module393.uploadFilesToOss(t));

                case 39:
                  w = C.sent;
                  f = true;

                case 41:
                  if (S.length > 0) (p = w).push.apply(p, module31.default(S));
                  module390 = n.getDeviceInfo();
                  if ((T = n.state.fbName + (n.state.fbQuestion ? '-' + n.state.fbQuestion : '') + (n.state.remark ? '-' + n.state.remark : '')).length >= 32)
                    console.log('!!!!!! name \u5b57\u6bb5\u957f\u5ea6\u5927\u4e8e32 !!!!!!');
                  C.next = 47;
                  return regeneratorRuntime.default.awrap(
                    module393.fileInternalBug(T, n.state.fbType, module393.deviceModel, n.state.fbSummary, n.state.fbDetail, n.state.isoTime, module390, w, v)
                  );

                case 47:
                  u = C.sent;
                  C.next = 54;
                  break;

                case 50:
                  C.prev = 50;
                  C.t0 = C.catch(16);
                  _ = 'fileInternalBug error: ' + ('object' == typeof C.t0 ? JSON.stringify(C.t0) : C.t0);
                  module418.Log.log(module418.LogTypes.Debug, _);

                case 54:
                  C.prev = 54;
                  n.isSubmiting = false;
                  n.endLoading();
                  if (u) n.props.navigation.pop();
                  else {
                    P = '';
                    P = h
                      ? c
                        ? f
                          ? '\u4e0a\u4f20bug\u4fe1\u606f\u5931\u8d25'
                          : '\u4e0a\u4f20\u9644\u56fe\u5931\u8d25'
                        : '\u4e0a\u4f20\u6e05\u626b\u8bb0\u5f55\u56fe\u7247\u5931\u8d25'
                      : '\u4e0a\u4f20log\u5931\u8d25';
                    globals.showToast(P);
                  }
                  return C.finish(54);

                case 59:
                case 'end':
                  return C.stop();
              }
          },
          null,
          null,
          [[16, 50, 54, 59]],
          Promise
        );
      };

      n.onSelectCategory = function (t) {
        n.setState({
          fbType: t,
        });
      };

      n.onPressHistoryInfo = function () {
        n.props.navigation.navigate('HistoryPage', {
          title: module510.localization_strings_Setting_History_index_2,
          feedbackCallback: n.onHistoryFeedback,
        });
      };

      n.onHistoryFeedback = function (t) {
        n.cleanStartTime = n.parseCleanStartTime(t.startTime);
        var o = n.cleanStartTime[0] + '/' + n.cleanStartTime[1] + ' ' + n.cleanStartTime[2] + ':' + n.cleanStartTime[3];
        o = o + ' | ' + t.text;
        n.setState({
          historyInfo: o,
          historyImage: t.uri,
        });
      };

      n.onUploadLog = function () {
        var t,
          o = module390.default.isShowPicUpload() ? module510.log_for_v4_dialog_title : module510.upload_log_legal_statement,
          s = {
            text: module510.localization_strings_Main_MainPage_11,
          },
          l = {
            text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
            onPress: n.setLogUploadLevelOnRobot,
          };
        if (!(null == (t = globals.Alert))) t.alert(o, '', [s, l]);
      };

      n.setLogUploadLevelOnRobot = function () {
        var t;
        return regeneratorRuntime.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  if (!module390.default.isShowPicUpload()) {
                    s.next = 11;
                    break;
                  }

                  s.prev = 1;
                  s.next = 4;
                  return regeneratorRuntime.default.awrap(module393.postPrivacyAgreementStatusWithVersion(module381.RSM.serverCode, 1, 9999));

                case 4:
                  t = s.sent;
                  console.warn('postPrivacyAgreementStatusWithVersion - ' + t);
                  s.next = 11;
                  break;

                case 8:
                  s.prev = 8;
                  s.t0 = s.catch(1);
                  console.warn('postPrivacyAgreementStatusWithVersion  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                case 11:
                  s.prev = 11;
                  s.next = 14;
                  return regeneratorRuntime.default.awrap(module416.default.userUploadLog());

                case 14:
                  n.hasUploadLog = true;
                  globals.showToast(module510.rubys_setting_guide_contact_report_succ);
                  s.next = 21;
                  break;

                case 18:
                  s.prev = 18;
                  s.t1 = s.catch(11);
                  globals.showToast(module510.robot_communication_exception);

                case 21:
                case 'end':
                  return s.stop();
              }
          },
          null,
          null,
          [
            [1, 8],
            [11, 18],
          ],
          Promise
        );
      };

      n.state = {
        fbName: '',
        fbHDVersion: '',
        fbSummary: '',
        fbDetail: '',
        fbType: R.keyOther,
        historyInfo: '\u8bf7\u9009\u62e9\u6e05\u6d01\u8bb0\u5f55',
        historyImage: null,
        isoTime: null,
        fbQuestion: null,
        isShowCommitDialog: false,
        imageArray: [],
      };
      n.animatedWrapMarginBottom = new module13.Animated.Value(-500);
      n.hasUploadLog = false;
      n.shouldUploadLog = true;
      return n;
    }

    module7.default(O, [
      {
        key: 'componentDidMount',
        value: function () {
          var t,
            n,
            s = this;
          regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.InnerTestUsersName));

                  case 2:
                    if ((t = n.sent))
                      s.setState({
                        fbName: t,
                      });

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
          regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.InnerTestHDVersion));

                  case 2:
                    if ((n = t.sent))
                      s.setState({
                        fbHDVersion: n,
                      });

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
          this.getDebugInfo();
        },
      },
      {
        key: 'onPressConfirm',
        value: function () {
          var t,
            n,
            o,
            s,
            l,
            u,
            c,
            f = this;
          if (this.state.fbName.length <= 0) globals.showToast('\u8bf7\u586b\u5199\u5185\u6d4b\u7528\u6237\u540d');
          else if (this.state.fbName.length >= 5) globals.showToast('\u5185\u6d4b\u7528\u6237\u540d\u957f\u5ea6\u4e0d\u8d85\u8fc75');
          else if ((null != (t = null == (n = this.state.remark) ? undefined : n.length) ? t : 0) >= 10)
            globals.showToast('\u7279\u522b\u5907\u6ce8\u957f\u5ea6\u4e0d\u8d85\u8fc710');
          else if ((null != (o = null == (s = this.state.fbSummary) ? undefined : s.length) ? o : 0) >= 30)
            globals.showToast('\u95ee\u9898\u63cf\u8ff0\u957f\u5ea6\u4e0d\u8d85\u8fc730');
          else if ((this.state.fbType != R.keySoft && this.state.fbType != R.keyHard) || null != this.state.fbQuestion)
            this.state.fbType == R.keyHard && this.state.imageArray.length <= 0
              ? globals.showToast('\u786c\u4ef6\u95ee\u9898\u8bf7\u4e0a\u4f20\u7167\u7247\u6216\u89c6\u9891')
              : this.state.fbHDVersion.length >= 20
              ? globals.showToast('\u8bf7\u6b63\u786e\u586b\u5199\u786c\u4ef6\u7248\u672c\uff0c\u957f\u5ea6\u4e0d\u8d85\u8fc720')
              : this.state.fbSummary.length <= 0
              ? globals.showToast('\u8bf7\u586b\u5199\u95ee\u9898\u6982\u8ff0')
              : null != this.state.isoTime
              ? (null != (l = null == (u = this.state.fbQuestion) ? undefined : u.length) ? l : 0) > 10
                ? globals.showToast(
                    '\u95ee\u9898\u7c7b\u578b\u957f\u5ea6\u4e0d\u80fd\u5927\u4e8e10, \u8bf7\u8054\u7cfb\u5f00\u53d1\u540c\u5b66\u4fee\u6539\u95ee\u9898\u5206\u7c7b.'
                  )
                : null == (c = this.selectDialog) ||
                  c.customAlert(
                    '\u611f\u8c22\u5404\u4f4d\u5bf9\u91c7\u96c6\u5de5\u4f5c\u7684\u652f\u6301\u4e0e\u914d\u5408\u3002\u6b64\u6b3e\u5185\u6d4b\u673a\u5728\u6e05\u626b\u7684\u8fc7\u7a0b\u4e2d\u4f1a\u4e0d\u65ad\u8fdb\u884c\u5b9e\u666f\u62cd\u6444\u5e76\u5c06\u7167\u7247\u52a0\u5bc6\u4e0a\u4f20\u5230\u670d\u52a1\u5668\u7aef\u3002\u5728\u8fdb\u884c\u6545\u969c\u5206\u6790\u65f6\uff0c\u5f00\u53d1\u4eba\u5458\u53ef\u80fd\u4f1a\u9700\u8981\u4f60\u63d0\u4f9b\u5185\u6d4b\u673a\u7684\u201c\u56fe\u7247\u533f\u540did\u201d\u6765\u4e0b\u8f7d\u76f8\u5e94\u7684\u7167\u7247\u3002\u8bf7\u60a8\u5728\u5185\u6d4b\u673a\u5de5\u4f5c\u7684\u8fc7\u7a0b\u4e2d\u4fdd\u62a4\u597d\u4e2a\u4eba\u9690\u79c1\uff0c\u5982\u60f3\u5220\u9664\u7167\u7247\u8bf7\u53ca\u65f6\u90ae\u4ef6\u8054\u7cfb lezhan@roborock.com',
                    '',
                    function () {
                      var t;
                      if (!(null == (t = f.selectDialog)))
                        t.hide(function () {
                          setTimeout(function () {
                            f.onPressSubmit();
                          }, 100);
                        });
                    },
                    undefined,
                    {
                      option: '\u540c\u65f6\u53d1\u9001\u95ee\u9898\u73af\u5883\u7167\u7247',
                      isSelected: this.shouldUploadLog,
                    }
                  )
              : globals.showToast('\u8bf7\u9009\u62e9\u95ee\u9898\u53d1\u751f\u65f6\u95f4');
          else globals.showToast('\u8bf7\u9009\u62e9\u95ee\u9898\u7c7b\u578b');
        },
      },
      {
        key: 'getDebugInfo',
        value: function () {
          var t = this;
          if (module393.isMiApp)
            module393.getDevicePropertyFromMemCache(['ssid', 'localip', 'mac'], function (n) {
              if (n.ssid || n.localip || n.mac) {
                t.firmwareVersion = n.lastVersion || Unknown;
                t.networkInfo = n;
                t.networkInfo.ip = n.localip;
              } else t.fetchNetworkInfo();
            });
          else {
            this.fetchNetworkInfo();
            this.getFirmwareVersionRoborock();
          }
        },
      },
      {
        key: 'fetchNetworkInfo',
        value: function () {
          var t,
            n = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getNetworkInfo());

                  case 3:
                    t = s.sent;
                    this.networkInfo = t.result;
                    s.next = 10;
                    break;

                  case 7:
                    s.prev = 7;
                    s.t0 = s.catch(0);

                    if (FetchNetworkInfoRetry < 10) {
                      FetchNetworkInfoRetry++;
                      setTimeout(function () {
                        n.fetchNetworkInfo();
                      }, 1e3);
                    }

                  case 10:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[0, 7]],
            Promise
          );
        },
      },
      {
        key: 'getFirmwareVersionRoborock',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (!module391.default.isShareUser()) {
                      n.next = 3;
                      break;
                    }

                    this.firmwareVersion = module510.share_device;
                    return n.abrupt('return');

                  case 3:
                    if (module393.isSupportFirmwareVersion()) {
                      n.next = 5;
                      break;
                    }

                    return n.abrupt('return');

                  case 5:
                    n.next = 7;
                    return regeneratorRuntime.default.awrap(module393.getFirmwareVersion());

                  case 7:
                    if (undefined != (t = n.sent) && undefined != t.currentVersion) this.firmwareVersion = t.currentVersion;

                  case 9:
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
      {
        key: 'parseCleanStartTime',
        value: function (t) {
          if (t.length <= 0) return [];
          var n = module1644.utcTimeConvertToPhoneTimeZoneTime(1e3 * t);
          return [module1644.addZeroPrefix(n.month), module1644.addZeroPrefix(n.day), module1644.addZeroPrefix(n.hour), module1644.addZeroPrefix(n.minute)];
        },
      },
      {
        key: 'getCleanStartTime',
        value: function () {
          var t = '';

          if (this.cleanStartTime && this.cleanStartTime.length >= 0) {
            var n = new Date();
            n.setMonth(parseInt(this.cleanStartTime[0]) - 1);
            n.setDate(parseInt(this.cleanStartTime[1]));
            n.setHours(parseInt(this.cleanStartTime[2]));
            n.setMinutes(parseInt(this.cleanStartTime[3]));
            t = n.toISOString();
          }

          return t;
        },
      },
      {
        key: 'getDeviceInfo',
        value: function () {
          var t = module393.isMiApp ? module510.debug_info_xiaomi_id : 'UID',
            n = module391.default.getAppDisplayVersion(),
            o = module394.default.sharedCache().serialNumber;
          o = '' === o || undefined == o || o.length < 1 ? ' ' : o;
          var s = this.getCleanStartTime(),
            l = this.state.chargerRelative ? '+' + this.state.chargerName : '',
            u = {};
          u.Model = module393.deviceModel;
          u['\u5e8f\u5217\u53f7'] = o;
          u['' + t] = module393.userId;
          u['App\u7248\u672c'] = n;
          u['\u56fa\u4ef6\u7248\u672c'] = this.firmwareVersion;
          u['\u63d2\u4ef6\u7248\u672c'] = module391.default.pluginVersion();
          u.DID = module391.default.getDid();
          u['WiFi\u540d\u79f0'] = '' + (this.networkInfo.ssid || Unknown);
          u['IP\u5730\u5740'] = '' + (this.networkInfo.ip || Unknown);
          u['Mac\u5730\u5740'] = '' + (this.networkInfo.mac || Unknown);
          u['\u786c\u4ef6\u7248\u672c'] = '' + this.state.fbHDVersion + l;
          if (s && s.length > 0) u.cleanStartTime = s;
          if (this.logId && this.logId.length > 0) u['app/pluginlogid'] = this.logId;
          return JSON.stringify(u);
        },
      },
      {
        key: 'startLoading',
        value: function () {
          var t;
          if (!(null == (t = this.loadingView))) t.showWithText('\u63d0\u4ea4\u4e2d');
        },
      },
      {
        key: 'endLoading',
        value: function () {
          var t;
          if (!(null == (t = this.loadingView))) t.hide();
        },
      },
      {
        key: 'getTextView',
        value: function (t) {
          return React.default.createElement(
            module13.Text,
            {
              style: [
                M.textStyle,
                {
                  color: this.theme.feedbackPage.textColor,
                },
              ],
            },
            t
          );
        },
      },
      {
        key: 'getUploadLogView',
        value: function () {
          return React.default.createElement(
            module13.View,
            {
              style: M.chargerTypeView,
            },
            this.getTextView('\u8bf7\u70b9\u51fb\u4e0a\u62a5\u95ee\u9898\u65e5\u5fd7\uff1a'),
            React.default.createElement(module385.PureButton, {
              style: M.uploadLogStyle,
              textColor: this.theme.feedbackPage.textColor,
              title: module510.rubys_setting_guide_contact_report_log,
              onPress: this.onUploadLog,
            })
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.theme;
          this.getUploadLogView();
          return React.default.createElement(
            module13.ScrollView,
            {
              style: [
                M.root,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
              contentContainerStyle: M.rootContent,
            },
            React.default.createElement(module2086.default, {
              title: '*\u5185\u6d4b\u59d3\u540d',
              subtitle: '(\u5fc5\u586b)',
              placeholder: '\u8bf7\u8f93\u5165\u5185\u6d4b\u59d3\u540d',
              onContentTextChange: function (n) {
                return t.setState({
                  fbName: n,
                });
              },
            }),
            React.default.createElement(module2086.default, {
              title: '\u7279\u522b\u5907\u6ce8',
              subtitle: '',
              placeholder: '\u8bf7\u6309\u7167\u5185\u6d4b\u7fa4\u8981\u6c42\u586b\u5199',
              onContentTextChange: function (n) {
                return t.setState({
                  remark: n,
                });
              },
            }),
            React.default.createElement(module2086.default, {
              title: '*\u95ee\u9898\u63cf\u8ff0',
              subtitle: '\uff0830\u5b57/\u5fc5\u586b\uff09',
              placeholder: '\u8bf7\u7b80\u8981\u63cf\u8ff0\u95ee\u9898\uff0c\u8be6\u7ec6\u95ee\u9898\u5199\u5728\u590d\u73b0\u6b65\u9aa4\u91cc',
              onContentTextChange: function (n) {
                return t.setState({
                  fbSummary: n,
                });
              },
            }),
            React.default.createElement(module2086.default, {
              title: '\u8be6\u7ec6\u63cf\u8ff0',
              subtitle: '',
              placeholder:
                '\u8bf7\u5c3d\u91cf\u63cf\u8ff0\u573a\u666f\u3001\u590d\u73b0\u6b65\u9aa4, \u4e0d\u7136\u540e\u7eed\u6d4b\u8bd5\u540c\u5b66\u8fd8\u5f97\u79c1\u804a\u60a8\u8be2\u95ee\u8be6\u7ec6\u60c5\u51b5',
              multiline: true,
              onContentTextChange: function (n) {
                return t.setState({
                  fbDetail: n,
                });
              },
            }),
            React.default.createElement(module2087.default, {
              title: '\u53cd\u9988\u9644\u56fe',
              subtitle: '(\u786c\u4ef6\u95ee\u9898\u5fc5\u586b)',
              onImagesChange: function (n) {
                return t.setState({
                  imageArray: n,
                });
              },
            }),
            React.default.createElement(module2091.default, {
              types: A,
              onSelectedTypeChange: function (n) {
                return t.onSelectCategory(n);
              },
              onSelectedQuestionChange: function (n) {
                var o;
                return t.setState({
                  fbQuestion: null != (o = null == n ? undefined : n.category) ? o : null,
                });
              },
              onSelectedDateChange: function (n) {
                var o;
                return t.setState({
                  isoTime: null != (o = null == n ? undefined : null == n.toISOString ? undefined : n.toISOString()) ? o : null,
                });
              },
            }),
            React.default.createElement(module385.SettingListItemView, {
              title: '\u6e05\u626b\u8bb0\u5f55',
              shouldShowRightArrow: true,
              style: [
                M.settingListItem,
                {
                  marginTop: 40,
                },
              ],
              shouldShowBottomLine: false,
              bottomDetail: this.state.historyInfo,
              onPress: this.onPressHistoryInfo,
            }),
            React.default.createElement(module2090.default, {
              style: {
                marginHorizontal: 20,
                marginTop: 40,
              },
              enabled: true,
              onPress: function () {
                return t.onPressConfirm();
              },
            }),
            React.default.createElement(module385.AlertView, {
              ref: function (n) {
                return (t.selectDialog = n);
              },
              didSelectOption: function (n) {
                return (t.shouldUploadLog = n);
              },
            }),
            React.default.createElement(module385.CancelableLoadingView, {
              ref: function (n) {
                t.loadingView = n;
              },
            })
          );
        },
      },
      {
        key: 'theme',
        get: function () {
          return this.context.theme;
        },
      },
    ]);
    return O;
  })(React.Component);

exports.default = E;
E.contextType = module1199.AppConfigContext;
var M = module13.StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  rootContent: {
    paddingBottom: 60,
  },
  settingListItem: {
    borderRadius: 8,
  },
});

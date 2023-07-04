var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module394 = require('./394'),
  module515 = require('./515'),
  module391 = require('./391'),
  module414 = require('./414'),
  module390 = require('./390'),
  module381 = require('./381'),
  module418 = require('./418'),
  module385 = require('./385');

function P() {
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

var module500 = require('./500').strings,
  module1153 = require('./1153'),
  module393 = require('./393'),
  module1513 = require('./1513'),
  D = {
    keySoft: 'Software',
    keyHard: 'Hardware',
  },
  E = [
    '\u65e0\u6869',
    '\u5c0f\u6869',
    'Onyx1\uff08\u6c14\u65cb\u96c6\u5c18\u6869\uff09',
    'OnyxC\uff08\u96c6\u5c18\u6869\uff09',
    'Onyx2\uff08\u6d17\u5e03\u6869\uff09',
    'Onyx3\uff08\u96c6\u5c18+\u6d17\u5e03\u6869\uff09',
  ],
  M = (function (t) {
    module7.default(module1952, t);

    var n = module1952,
      module515 = P(),
      _ = function () {
        var t,
          o = module11.default(n);

        if (module515) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function module1952(t) {
      var n;
      module4.default(this, module1952);

      (n = _.call(this, t)).onPressSubmit = function () {
        var t, o, c, u, h, f, p, y, w, S, module515, module391, module414, x;
        return regeneratorRuntime.default.async(
          function (I) {
            for (;;)
              switch ((I.prev = I.next)) {
                case 0:
                  if (!(n.state.fbName.length <= 0)) {
                    I.next = 3;
                    break;
                  }

                  globals.showToast('\u8bf7\u586b\u5199\u5185\u6d4b\u7528\u6237\u540d');
                  return I.abrupt('return');

                case 3:
                  if (!(n.state.fbName.length >= 20)) {
                    I.next = 6;
                    break;
                  }

                  globals.showToast('\u5185\u6d4b\u7528\u6237\u540d\u957f\u5ea6\u4e0d\u8d85\u8fc720');
                  return I.abrupt('return');

                case 6:
                  if (!(n.state.fbHDVersion.length <= 0)) {
                    I.next = 9;
                    break;
                  }

                  globals.showToast('\u8bf7\u586b\u5199\u786c\u4ef6\u7248\u672c');
                  return I.abrupt('return');

                case 9:
                  if (!(n.state.fbHDVersion.length >= 20)) {
                    I.next = 12;
                    break;
                  }

                  globals.showToast('\u8bf7\u6b63\u786e\u586b\u5199\u786c\u4ef6\u7248\u672c\uff0c\u957f\u5ea6\u4e0d\u8d85\u8fc720');
                  return I.abrupt('return');

                case 12:
                  if (!(n.state.fbDetail.length >= 250)) {
                    I.next = 15;
                    break;
                  }

                  globals.showToast('\u590d\u73b0\u6b65\u9aa4\u957f\u5ea6\u4e0d\u8d85\u8fc7250');
                  return I.abrupt('return');

                case 15:
                  if (!(n.state.fbSummary.length <= 0)) {
                    I.next = 18;
                    break;
                  }

                  globals.showToast('\u8bf7\u586b\u5199\u95ee\u9898\u6982\u8ff0');
                  return I.abrupt('return');

                case 18:
                  if (null != n.state.occurHour && null != n.state.occurMinute) {
                    I.next = 21;
                    break;
                  }

                  globals.showToast('\u8bf7\u9009\u62e9\u95ee\u9898\u53d1\u751f\u65f6\u95f4');
                  return I.abrupt('return');

                case 21:
                  if (!(n.state.chargerRelative && n.state.chargerName.length <= 0)) {
                    I.next = 24;
                    break;
                  }

                  globals.showToast('\u6869\u76f8\u5173\u8bf7\u9009\u62e9\u6869\u7c7b\u578b');
                  return I.abrupt('return');

                case 24:
                  if (!n.state.AIRelative || n.hasUploadLog) {
                    I.next = 27;
                    break;
                  }

                  globals.showToast('\u672a\u4e0a\u4f20\u95ee\u9898\u65e5\u5fd7\uff0c\u6216\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5');
                  return I.abrupt('return');

                case 27:
                  n.startLoading();
                  I.next = 30;
                  return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.InnerTestUsersName, n.state.fbName));

                case 30:
                  I.next = 32;
                  return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.InnerTestHDVersion, n.state.fbHDVersion));

                case 32:
                  if (
                    ((t = []),
                    n.state.imageArray.length > 0 &&
                      n.state.imageArray.forEach(function (n) {
                        if (n.filePath && n.filePath.length > 0) t.push(n.filePath);
                      }),
                    (o = []),
                    n.state.historyImage && o.push(n.state.historyImage),
                    (c = false),
                    (u = o.length <= 0),
                    (h = t.length <= 0),
                    (I.prev = 39),
                    (p = []),
                    (y = ''),
                    !(o.length > 0))
                  ) {
                    I.next = 48;
                    break;
                  }

                  I.next = 45;
                  return regeneratorRuntime.default.awrap(module393.uploadFilesToOss(o));

                case 45:
                  p = I.sent;
                  u = true;
                  if (p.length > 0 && (w = p[0].split('/')).length > 0) y = w.pop();

                case 48:
                  if (((S = []), !(t.length > 0))) {
                    I.next = 54;
                    break;
                  }

                  I.next = 52;
                  return regeneratorRuntime.default.awrap(module393.uploadFilesToOss(t));

                case 52:
                  S = I.sent;
                  h = true;

                case 54:
                  if (p.length > 0) (f = S).push.apply(f, module31.default(p));
                  module515 = n.state.radioSelect ? D.keySoft : D.keyHard;
                  module391 = n.getOccurTime();
                  module414 = n.getDeviceInfo();
                  I.next = 60;
                  return regeneratorRuntime.default.awrap(
                    module393.fileInternalBug(n.state.fbName, module515, module393.deviceModel, n.state.fbSummary, n.state.fbDetail, module391, module414, S, y)
                  );

                case 60:
                  c = I.sent;
                  I.next = 66;
                  break;

                case 63:
                  I.prev = 63;
                  I.t0 = I.catch(39);
                  console.log('fileInternalBug error: ' + ('object' == typeof I.t0 ? JSON.stringify(I.t0) : I.t0));

                case 66:
                  I.prev = 66;
                  n.endLoading();
                  if (c) n.props.navigation.pop();
                  else {
                    x = '';
                    x = u
                      ? h
                        ? '\u4e0a\u4f20bug\u4fe1\u606f\u5931\u8d25'
                        : '\u4e0a\u4f20\u9644\u56fe\u5931\u8d25'
                      : '\u4e0a\u4f20\u6e05\u626b\u8bb0\u5f55\u56fe\u7247\u5931\u8d25';
                    globals.showToast(x);
                  }
                  return I.finish(66);

                case 70:
                case 'end':
                  return I.stop();
              }
          },
          null,
          null,
          [[39, 63, 66, 70]],
          Promise
        );
      };

      n.onSelectCategory = function (t) {
        if (t != D.keySoft || n.state.radioSelect) {
          if (t == D.keyHard && n.state.radioSelect)
            n.setState({
              radioSelect: false,
            });
        } else
          n.setState({
            radioSelect: true,
          });
      };

      n.onChargerRelative = function (t) {
        if (0 == t && n.state.chargerRelative)
          n.setState({
            chargerRelative: false,
          });
        else if (!(1 != t || n.state.chargerRelative))
          n.setState({
            chargerRelative: true,
          });
      };

      n.onAIRelative = function (t) {
        if (0 == t && n.state.AIRelative)
          n.setState({
            AIRelative: false,
          });
        else if (!(1 != t || n.state.AIRelative))
          n.setState({
            AIRelative: true,
          });
      };

      n.onShowChargerSelectView = function () {
        var t;
        if (!(null == (t = n.actionSheet))) t.show();
      };

      n.onChargerSelSheetAction = function (t) {
        n.actionSheet.hide();
        var o = t >= 0 && t < E.length ? E[t] : '';
        n.setState({
          chargerName: o,
        });
      };

      n.onPressHistoryInfo = function () {
        n.props.navigation.navigate('HistoryPage', {
          title: module500.localization_strings_Setting_History_index_2,
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

      n.onPressSelectTime = function () {
        n.showTimerPicker();
      };

      n.onPressSelectImage = function () {
        var t, o, l;
        return regeneratorRuntime.default.async(
          function (c) {
            for (;;)
              switch ((c.prev = c.next)) {
                case 0:
                  c.next = 2;
                  return regeneratorRuntime.default.awrap(module393.selectSystemMediaPaths());

                case 2:
                  if ((t = c.sent).length > 0) {
                    o = n.state.imageArray;
                    l = {};
                    o.forEach(function (t) {
                      l[t.sourceId] = 1;
                    });
                    t.forEach(function (t) {
                      if (l[t.sourceId]) globals.showToast('\u9009\u62e9\u56fe\u7247\u5df2\u5b58\u5728');
                      else o.push(t);
                    });
                    n.setState({
                      imageArray: o,
                    });
                  }

                case 4:
                case 'end':
                  return c.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      n.onPressDeleteImage = function (t) {
        var o,
          s = {
            text: module500.localization_strings_Main_MainPage_11,
          },
          l = {
            text: module500.rubys_history_del_button,
            onPress: function () {
              return n.deleteSelectImage(t);
            },
          };
        if (!(null == (o = globals.Alert))) o.alert('\u662f\u5426\u5220\u9664\u9009\u4e2d\u56fe\u7247', '', [s, l]);
      };

      n.onOverTimer = function () {
        globals.showToast(module500.map_object_ignore_failed);
      };

      n.onHideKeyboard = function () {
        module12.Keyboard.dismiss();
      };

      n.onUploadLog = function () {
        var t,
          o = module390.default.isShowPicUpload() ? module500.log_for_v4_dialog_title : module500.upload_log_legal_statement,
          s = {
            text: module500.localization_strings_Main_MainPage_11,
          },
          l = {
            text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
            onPress: n.setLogUploadLevelOnRobot,
          };
        if (!(null == (t = globals.Alert))) t.alert(o, '', [s, l]);
      };

      n.setLogUploadLevelOnRobot = function () {
        var t;
        return regeneratorRuntime.default.async(
          function (o) {
            for (;;)
              switch ((o.prev = o.next)) {
                case 0:
                  if (!module390.default.isShowPicUpload()) {
                    o.next = 11;
                    break;
                  }

                  o.prev = 1;
                  o.next = 4;
                  return regeneratorRuntime.default.awrap(module393.postPrivacyAgreementStatusWithVersion(module381.RSM.serverCode, 1, 9999));

                case 4:
                  t = o.sent;
                  console.warn('postPrivacyAgreementStatusWithVersion - ' + t);
                  o.next = 11;
                  break;

                case 8:
                  o.prev = 8;
                  o.t0 = o.catch(1);
                  console.warn('postPrivacyAgreementStatusWithVersion  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                case 11:
                  o.prev = 11;
                  o.next = 14;
                  return regeneratorRuntime.default.awrap(module414.default.userUploadLog());

                case 14:
                  n.hasUploadLog = true;
                  globals.showToast(module500.rubys_setting_guide_contact_report_succ);
                  o.next = 21;
                  break;

                case 18:
                  o.prev = 18;
                  o.t1 = o.catch(11);
                  globals.showToast(module500.robot_communication_exception);

                case 21:
                case 'end':
                  return o.stop();
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

      n.getShowOccurTime = function () {
        return null == n.state.occurHour || null == n.state.occurMinute
          ? '\u672a\u8bbe\u7f6e'
          : module1513.addZeroPrefix(n.state.occurHour) + ':' + module1513.addZeroPrefix(n.state.occurMinute);
      };

      n.hideTimerPicker = function () {
        n.hideModalView(function () {
          n.setState({
            shouldShowTimePicker: false,
          });
        });
      };

      n.didSelectTime = function (t) {
        n.hideModalView(function () {
          n.setState({
            shouldShowTimePicker: false,
            occurMinute: t.getMinutes(),
            occurHour: t.getHours(),
          });
        });
      };

      n.state = {
        fbName: '',
        fbHDVersion: '',
        fbSummary: '',
        fbDetail: '',
        radioSelect: true,
        historyInfo: '\u8bf7\u9009\u62e9\u6e05\u6d01\u8bb0\u5f55',
        historyImage: null,
        shouldShowTimePicker: false,
        occurMinute: null,
        occurHour: null,
        imageArray: [],
        chargerRelative: false,
        chargerName: '',
        AIRelative: false,
      };
      n.animatedWrapMarginBottom = new module12.Animated.Value(-500);
      n.hasUploadLog = false;
      return n;
    }

    module5.default(module1952, [
      {
        key: 'componentDidMount',
        value: function () {
          var t,
            n,
            o = this;
          regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.InnerTestUsersName));

                  case 2:
                    if ((t = n.sent))
                      o.setState({
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
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.InnerTestHDVersion));

                  case 2:
                    if ((n = t.sent))
                      o.setState({
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
        key: 'getItems',
        value: function () {
          return [
            {
              title: '\u95ee\u9898\u6e05\u626b\u8bb0\u5f55',
              bottomDetail: this.state.historyInfo,
              funcId: 'debug_fb_history_list',
              visible: true,
              onPress: this.onPressHistoryInfo,
            },
            {
              title: '\u95ee\u9898\u53d1\u751f\u65f6\u95f4 (\u5fc5\u586b)',
              bottomDetail: this.getShowOccurTime(),
              funcId: 'debug_fb_occur_list',
              shouldShowBottomLine: false,
              visible: true,
              onPress: this.onPressSelectTime,
            },
          ];
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
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.getNetworkInfo());

                  case 3:
                    t = o.sent;
                    this.networkInfo = t.result;
                    o.next = 10;
                    break;

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(0);

                    if (FetchNetworkInfoRetry < 10) {
                      FetchNetworkInfoRetry++;
                      setTimeout(function () {
                        n.fetchNetworkInfo();
                      }, 1e3);
                    }

                  case 10:
                  case 'end':
                    return o.stop();
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

                    this.firmwareVersion = module500.share_device;
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
          var n = module1513.utcTimeConvertToPhoneTimeZoneTime(1e3 * t);
          return [module1513.addZeroPrefix(n.month), module1513.addZeroPrefix(n.day), module1513.addZeroPrefix(n.hour), module1513.addZeroPrefix(n.minute)];
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
        key: 'getOccurTime',
        value: function () {
          var t = new Date();
          if (null != this.state.occurHour) t.setHours(this.state.occurHour);
          if (null != this.state.occurMinute) t.setMinutes(this.state.occurMinute);

          if (this.cleanStartTime && this.cleanStartTime.length >= 0) {
            t.setMonth(parseInt(this.cleanStartTime[0]) - 1);
            t.setDate(parseInt(this.cleanStartTime[1]));
          }

          return t.toISOString();
        },
      },
      {
        key: 'getDeviceInfo',
        value: function () {
          var t = module393.isMiApp ? module500.debug_info_xiaomi_id : 'UID',
            n = module393.currentAppVersion() + '(' + ('ios' == module12.Platform.OS ? 'iOS' : 'Android') + ' ' + module12.Platform.Version + ')',
            o = module394.default.sharedCache().serialNumber;
          o = '' === o || undefined == o || o.length < 1 ? ' ' : o;
          var s = this.getCleanStartTime(),
            l = this.state.chargerRelative ? '+' + this.state.chargerName : '',
            c = {};
          c.Model = module393.deviceModel;
          c['\u5e8f\u5217\u53f7'] = o;
          c['' + t] = module393.userId;
          c['App\u7248\u672c'] = n;
          c['\u56fa\u4ef6\u7248\u672c'] = this.firmwareVersion;
          c['\u63d2\u4ef6\u7248\u672c'] = module391.default.pluginVersion();
          c.DID = module391.default.getDid();
          c['WiFi\u540d\u79f0'] = '' + (this.networkInfo.ssid || Unknown);
          c['IP\u5730\u5740'] = '' + (this.networkInfo.ip || Unknown);
          c['Mac\u5730\u5740'] = '' + (this.networkInfo.mac || Unknown);
          c['\u786c\u4ef6\u7248\u672c'] = '' + this.state.fbHDVersion + l;
          if (s && s.length > 0) c.cleanStartTime = s;
          return JSON.stringify(c);
        },
      },
      {
        key: 'deleteSelectImage',
        value: function (t) {
          if (this.state.imageArray && 0 != this.state.imageArray.length) {
            var n = this.state.imageArray.filter(function (n) {
              return n.sourceId != t.sourceId;
            });
            this.setState({
              imageArray: n,
            });
          }
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
        key: 'showTimerPicker',
        value: function () {
          var t = this;
          this.setState(
            {
              shouldShowTimePicker: true,
            },
            function () {
              module12.Animated.spring(t.animatedWrapMarginBottom, {
                toValue: 0,
                duration: 200,
              }).start();
            }
          );
        },
      },
      {
        key: 'hideModalView',
        value: function (t) {
          module12.Animated.timing(this.animatedWrapMarginBottom, {
            toValue: -500,
            duration: 200,
          }).start(function () {
            if (t) t();
          });
        },
      },
      {
        key: 'getTextView',
        value: function (t) {
          return React.default.createElement(
            module12.Text,
            {
              style: [
                H.textStyle,
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
        key: 'getRadioView',
        value: function () {
          var t = {
            color: this.theme.feedbackPage.radioTxtColor,
          };
          return React.default.createElement(
            module12.View,
            {
              style: H.categoryView,
            },
            React.default.createElement(module385.Radio, {
              text: '\u8f6f\u4ef6\u95ee\u9898',
              radioSelect: this.state.radioSelect,
              textStyle: t,
              child: D.keySoft,
              onClick: this.onSelectCategory,
            }),
            React.default.createElement(module385.Radio, {
              text: '\u786c\u4ef6\u95ee\u9898',
              radioSelect: !this.state.radioSelect,
              textStyle: t,
              child: D.keyHard,
              onClick: this.onSelectCategory,
            })
          );
        },
      },
      {
        key: 'getChargerSelView',
        value: function () {
          var t = {
            color: this.theme.feedbackPage.radioTxtColor,
          };
          return React.default.createElement(
            module12.View,
            {
              style: H.chargerView,
            },
            this.getTextView('\u95ee\u9898\u662f\u5426\u4e0e\u6869\u76f8\u5173: '),
            React.default.createElement(module385.Radio, {
              text: '\u5426',
              radioSelect: !this.state.chargerRelative,
              textStyle: t,
              child: 0,
              onClick: this.onChargerRelative,
            }),
            React.default.createElement(module385.Radio, {
              text: '\u662f',
              radioSelect: this.state.chargerRelative,
              textStyle: t,
              child: 1,
              onClick: this.onChargerRelative,
            })
          );
        },
      },
      {
        key: 'getChargerTypeSelView',
        value: function () {
          var t = this.state.chargerName && this.state.chargerName.length > 0 ? this.state.chargerName : '\u8bf7\u9009\u62e9\u6869\u7c7b\u578b';
          return React.default.createElement(
            module12.View,
            {
              style: H.chargerTypeView,
            },
            this.getTextView('\u6869\u7c7b\u578b: '),
            React.default.createElement(
              module12.TouchableOpacity,
              {
                style: [
                  H.chargerSelView,
                  {
                    backgroundColor: this.theme.feedbackPage.inputBackgroundColor,
                  },
                ],
                onPress: this.onShowChargerSelectView,
              },
              this.getTextView(t),
              React.default.createElement(module12.Image, {
                source: this.theme.settingListItem.rightArrowImg,
                style: {
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                },
              })
            )
          );
        },
      },
      {
        key: 'getLostOrAISelView',
        value: function () {
          var t = {
            color: this.theme.feedbackPage.radioTxtColor,
          };
          return React.default.createElement(
            module12.View,
            {
              style: H.chargerView,
            },
            this.getTextView('\u95ee\u9898\u662f\u5426\u4e0e\u6f0f\u626b\u6216\u8bc6\u522b\u76f8\u5173: '),
            React.default.createElement(module385.Radio, {
              text: '\u5426',
              radioSelect: !this.state.AIRelative,
              textStyle: t,
              child: 0,
              onClick: this.onAIRelative,
            }),
            React.default.createElement(module385.Radio, {
              text: '\u662f',
              radioSelect: this.state.AIRelative,
              textStyle: t,
              child: 1,
              onClick: this.onAIRelative,
            })
          );
        },
      },
      {
        key: 'getUploadLogView',
        value: function () {
          return React.default.createElement(
            module12.View,
            {
              style: H.chargerTypeView,
            },
            this.getTextView('\u8bf7\u70b9\u51fb\u4e0a\u62a5\u95ee\u9898\u65e5\u5fd7\uff1a'),
            React.default.createElement(module385.PureButton, {
              style: H.uploadLogStyle,
              textColor: this.theme.feedbackPage.textColor,
              title: module500.rubys_setting_guide_contact_report_log,
              onPress: this.onUploadLog,
            })
          );
        },
      },
      {
        key: 'getContentInputView',
        value: function (t, n, o, s) {
          return React.default.createElement(module12.TextInput, {
            onChangeText: o,
            style: [
              H.contentInputStyle,
              s,
              {
                height: t,
              },
            ],
            multiline: true,
            clearButtonMode: 'while-editing',
            placeholder: n,
            placeholderTextColor: this.theme.feedbackPage.inputPlaceholderColor,
          });
        },
      },
      {
        key: 'getHistoryInfoList',
        value: function () {
          var t = this;
          return this.getItems().map(function (n, s) {
            return n.visible
              ? React.default.createElement(
                  module385.SettingListItemView,
                  module22.default({}, n, {
                    key: s,
                    detailWidth: 350,
                    style: {
                      height: 86,
                    },
                    innterVPadding: 18,
                    bottomDetailTop: 10,
                    titleStyle: {
                      color: t.theme.feedbackPage.radioTxtColor,
                    },
                  })
                )
              : null;
          });
        },
      },
      {
        key: 'getSelectedImageList',
        value: function () {
          var t = this,
            module1951 = React.default.createElement(
              module12.TouchableOpacity,
              {
                onPress: this.onPressSelectImage,
              },
              React.default.createElement(module12.Image, {
                style: H.imageItemView,
                source: require('./1951'),
              })
            );
          return React.default.createElement(
            module12.View,
            {
              style: H.imageInfoView,
            },
            React.default.createElement(module12.FlatList, {
              data: this.state.imageArray,
              renderItem: function (n) {
                var o = n.item;
                return React.default.createElement(
                  module12.View,
                  {
                    style: H.flatItemView,
                  },
                  React.default.createElement(module12.Image, {
                    source: {
                      uri: o.posterPath,
                    },
                    style: H.imageItemView,
                  }),
                  React.default.createElement(module385.PureImageButton, {
                    style: H.deleteImageBtn,
                    image: require('./1952'),
                    imageWidth: 22,
                    imageHeight: 22,
                    onPress: function () {
                      return t.onPressDeleteImage(o);
                    },
                  })
                );
              },
              keyExtractor: function (t) {
                return t.posterPath;
              },
              horizontal: true,
              ListFooterComponent: module1951,
            })
          );
        },
      },
      {
        key: 'getDatePicker',
        value: function () {
          var t = this,
            n = new Date();
          if (null != this.state.occurHour) n.setHours(this.state.occurHour);
          if (null != this.state.occurMinute) n.setMinutes(this.state.occurMinute);
          return React.default.createElement(
            module385.BaseModal,
            {
              transparent: true,
              onRequestClose: this.hideTimerPicker,
            },
            React.default.createElement(
              module12.Animated.View,
              {
                style: [
                  H.modal,
                  {
                    opacity: this.animatedWrapMarginBottom.interpolate({
                      inputRange: [-500, 0],
                      outputRange: [0, 1],
                    }),
                    height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.TouchableWithoutFeedback,
                {
                  onPress: this.hideTimerPicker,
                },
                React.default.createElement(module12.View, {
                  style: H.timerOutView,
                })
              ),
              React.default.createElement(
                module12.Animated.View,
                {
                  style: [
                    H.pickerView,
                    {
                      bottom: this.animatedWrapMarginBottom,
                    },
                  ],
                },
                React.default.createElement(module385.CustomDatePicker, {
                  ref: function (n) {
                    t.timePicker = n;
                  },
                  showDate: n,
                  title: '\u95ee\u9898\u53d1\u751f\u65f6\u95f4',
                  onPressCancelButton: this.hideTimerPicker,
                  onPressConfirmButton: this.didSelectTime,
                })
              )
            )
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.theme,
            o = {
              backgroundColor: n.feedbackPage.inputBackgroundColor,
              color: n.feedbackPage.textColor,
            },
            s = React.default.createElement(module12.TextInput, {
              onChangeText: function (n) {
                return t.setState({
                  fbName: n,
                });
              },
              value: this.state.fbName,
              style: [H.nameInputStyle, o],
              clearButtonMode: 'while-editing',
              placeholder: '\u8bf7\u8f93\u5165\u5185\u6d4b\u59d3\u540d',
              placeholderTextColor: n.feedbackPage.inputPlaceholderColor,
            }),
            l = React.default.createElement(module12.TextInput, {
              onChangeText: function (n) {
                return t.setState({
                  fbHDVersion: n,
                });
              },
              value: this.state.fbHDVersion,
              style: [H.nameInputStyle, o],
              clearButtonMode: 'while-editing',
              placeholder: '\u786c\u4ef6\u7248\u672c\uff08B* \uff5c \u65b9\u6848** | \u4e8c\u4f9b**\uff09',
              placeholderTextColor: n.feedbackPage.inputPlaceholderColor,
            }),
            c = this.getRadioView(),
            u = this.getChargerSelView(),
            h = this.getChargerTypeSelView(),
            f = this.getLostOrAISelView(),
            p = this.getUploadLogView(),
            S = this.getContentInputView(
              62,
              '\u8bf7\u63cf\u8ff0\u95ee\u9898',
              function (n) {
                return t.setState({
                  fbSummary: n,
                });
              },
              o
            ),
            b = this.getContentInputView(
              100,
              '\u8bf7\u5c3d\u91cf\u5b8c\u6574\u63cf\u8ff0\u590d\u73b0\u6b65\u9aa4',
              function (n) {
                return t.setState({
                  fbDetail: n,
                });
              },
              o
            ),
            v = this.getHistoryInfoList(),
            k = this.getSelectedImageList(),
            x = this.state.shouldShowTimePicker && this.getDatePicker();
          return React.default.createElement(
            module12.View,
            {
              style: [
                H.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: [
                  H.containter,
                  {
                    backgroundColor: n.settingBackgroundColor,
                  },
                ],
                onScrollBeginDrag: this.onHideKeyboard,
                showsVerticalScrollIndicator: false,
              },
              s,
              l,
              c,
              u,
              this.state.chargerRelative && h,
              f,
              this.state.AIRelative && p,
              this.getTextView('\u95ee\u9898\u6982\u8ff0:\uff08\u5fc5\u586b\uff09'),
              S,
              this.getTextView('\u590d\u73b0\u6b65\u9aa4: '),
              b,
              React.default.createElement(
                module12.View,
                {
                  style: H.historyView,
                },
                v
              ),
              this.getTextView('\u53cd\u9988\u9644\u56fe: '),
              k,
              React.default.createElement(module385.PureButton, {
                style: H.buttonStyle,
                textColor: 'white',
                title: '\u63d0\u4ea4',
                onPress: this.onPressSubmit,
              }),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    H.failedTip,
                    {
                      color: this.theme.feedbackPage.textColor,
                    },
                  ],
                },
                '\u5982\u63d0\u4ea4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\u6216\u8005\u9000\u51fa\u8be5\u9875\u9762\u91cd\u65b0\u63d0\u4ea4'
              )
            ),
            x,
            React.default.createElement(module385.ActionSheetView, {
              ref: function (n) {
                return (t.actionSheet = n);
              },
              actions: E,
              didSelectRow: this.onChargerSelSheetAction,
              onPressCancel: function () {
                return t.actionSheet.hide();
              },
            }),
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'feedback_view_loading',
              closeAccessibilityLabelKey: 'feedback_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onOverTimer: this.onOverTimer,
              showButton: true,
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
    return module1952;
  })(React.Component);

exports.default = M;
M.contextType = module515.AppConfigContext;
var H = module12.StyleSheet.create({
  containterView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: module1153.NavigationBarHeight + 2,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    width: 270,
    backgroundColor: 'transparent',
  },
  imageInfoView: {
    height: 96,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  flatItemView: {
    height: 86,
    width: 90,
  },
  imageItemView: {
    height: 75,
    width: 75,
    top: 11,
    resizeMode: 'contain',
  },
  deleteImageBtn: {
    position: 'absolute',
    top: 0,
    left: 64,
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyView: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 30,
  },
  nameInputStyle: {
    paddingLeft: 19,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
    height: 48,
    marginTop: 15,
  },
  contentInputStyle: {
    paddingLeft: 19,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    height: 62,
    marginTop: 10,
    marginBottom: 20,
  },
  textStyle: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 8,
  },
  buttonStyle: {
    height: 40,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#3384ff',
    margin: 10,
  },
  uploadLogStyle: {
    flex: 1,
    height: 36,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    marginLeft: 10,
  },
  chargerView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    marginBottom: 10,
  },
  chargerTypeView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginBottom: 15,
  },
  chargerSelView: {
    flex: 1,
    backgroundColor: 'white',
    height: 36,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    paddingLeft: 20,
    paddingRight: 10,
  },
  failedTip: {
    fontSize: 12,
    textAlign: 'center',
  },
  modal: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    alignItems: 'stretch',
  },
  timerOutView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  pickerView: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 99999,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    overflow: 'hidden',
  },
});

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module30 = require('./30'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = P(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
        else s[u] = t[u];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module390 = require('./390'),
  module506 = require('./506'),
  module387 = require('./387'),
  module407 = require('./407'),
  module411 = require('./411'),
  module381 = require('./381');

function P(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (P = function (t) {
    return t ? o : n;
  })(t);
}

function T() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module491 = require('./491').strings,
  module936 = require('./936'),
  module389 = require('./389'),
  module1368 = require('./1368'),
  _ = {
    keySoft: 'Software',
    keyHard: 'Hardware',
  },
  H = (function (t) {
    module7.default(module1979, t);

    var module506 = module1979,
      P = T(),
      V = function () {
        var t,
          n = module11.default(module506);

        if (P) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function module1979(t) {
      var o;
      module4.default(this, module1979);

      (o = V.call(this, t)).onPressSubmit = function () {
        var t, l, u, c, f, h, p, y, module390, module506, module387;
        return regeneratorRuntime.default.async(
          function (S) {
            for (;;)
              switch ((S.prev = S.next)) {
                case 0:
                  if (!(o.state.fbName.length <= 0)) {
                    S.next = 3;
                    break;
                  }

                  globals.showToast('\u8bf7\u586b\u5199\u5185\u6d4b\u7528\u6237\u540d');
                  return S.abrupt('return');

                case 3:
                  if (!(o.state.fbSummary.length <= 0)) {
                    S.next = 6;
                    break;
                  }

                  globals.showToast('\u8bf7\u586b\u5199\u95ee\u9898\u6982\u8ff0');
                  return S.abrupt('return');

                case 6:
                  if (null != o.state.occurHour && null != o.state.occurMinute) {
                    S.next = 9;
                    break;
                  }

                  globals.showToast('\u8bf7\u9009\u62e9\u95ee\u9898\u53d1\u751f\u65f6\u95f4');
                  return S.abrupt('return');

                case 9:
                  o.startLoading();
                  S.next = 12;
                  return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.InnerTestUsersName, o.state.fbName));

                case 12:
                  if (
                    ((t = []),
                    o.state.imageArray.length > 0 &&
                      o.state.imageArray.forEach(function (n) {
                        if (n.filePath && n.filePath.length > 0) t.push(n.filePath);
                      }),
                    (l = []),
                    o.state.historyImage && l.push(o.state.historyImage),
                    (u = false),
                    (S.prev = 17),
                    (f = []),
                    (h = ''),
                    !(l.length > 0))
                  ) {
                    S.next = 25;
                    break;
                  }

                  S.next = 23;
                  return regeneratorRuntime.default.awrap(module389.uploadFilesToOss(l));

                case 23:
                  if ((f = S.sent).length > 0 && (p = f[0].split('/')).length > 0) h = p.pop();

                case 25:
                  if (((y = []), !(t.length > 0))) {
                    S.next = 30;
                    break;
                  }

                  S.next = 29;
                  return regeneratorRuntime.default.awrap(module389.uploadFilesToOss(t));

                case 29:
                  y = S.sent;

                case 30:
                  if (f.length > 0) (c = y).push.apply(c, module30.default(f));
                  module390 = o.state.radioSelect ? _.keySoft : _.keyHard;
                  module506 = o.getOccurTime();
                  module387 = o.getDeviceInfo();
                  S.next = 36;
                  return regeneratorRuntime.default.awrap(
                    module389.fileInternalBug(o.state.fbName, module390, module389.deviceModel, o.state.fbSummary, o.state.fbDetail, module506, module387, y, h)
                  );

                case 36:
                  u = S.sent;
                  S.next = 42;
                  break;

                case 39:
                  S.prev = 39;
                  S.t0 = S.catch(17);
                  console.log('fileInternalBug error: ' + ('object' == typeof S.t0 ? JSON.stringify(S.t0) : S.t0));

                case 42:
                  S.prev = 42;
                  o.endLoading();
                  if (u) o.props.navigation.pop();
                  else globals.showToast(module491.map_object_ignore_failed);
                  return S.finish(42);

                case 46:
                case 'end':
                  return S.stop();
              }
          },
          null,
          null,
          [[17, 39, 42, 46]],
          Promise
        );
      };

      o.onSelectCategory = function (t) {
        if (t != _.keySoft || o.state.radioSelect) {
          if (o.state.radioSelect)
            o.setState({
              radioSelect: false,
            });
        } else
          o.setState({
            radioSelect: true,
          });
      };

      o.onPressHistoryInfo = function () {
        o.props.navigation.navigate('HistoryPage', {
          title: module491.localization_strings_Setting_History_index_2,
          feedbackCallback: o.onHistoryFeedback,
        });
      };

      o.onHistoryFeedback = function (t) {
        o.cleanStartTime = o.parseCleanStartTime(t.startTime);
        var n = o.cleanStartTime[0] + '/' + o.cleanStartTime[1] + ' ' + o.cleanStartTime[2] + ':' + o.cleanStartTime[3];
        n = n + ' | ' + t.text;
        o.setState({
          historyInfo: n,
          historyImage: t.uri,
        });
      };

      o.onPressSelectTime = function () {
        o.showTimerPicker();
      };

      o.onPressSelectImage = function () {
        var t, s, l;
        return regeneratorRuntime.default.async(
          function (u) {
            for (;;)
              switch ((u.prev = u.next)) {
                case 0:
                  u.next = 2;
                  return regeneratorRuntime.default.awrap(module389.selectSystemMediaPaths());

                case 2:
                  if ((t = u.sent).length > 0) {
                    s = o.state.imageArray;
                    l = {};
                    s.forEach(function (t) {
                      l[t.sourceId] = 1;
                    });
                    t.forEach(function (t) {
                      if (l[t.sourceId]) globals.showToast('\u9009\u62e9\u56fe\u7247\u5df2\u5b58\u5728');
                      else s.push(t);
                    });
                    o.setState({
                      imageArray: s,
                    });
                  }

                case 4:
                case 'end':
                  return u.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      o.onPressDeleteImage = function (t) {
        var n,
          s = {
            text: module491.localization_strings_Main_MainPage_11,
          },
          l = {
            text: module491.rubys_history_del_button,
            onPress: function () {
              return o.deleteSelectImage(t);
            },
          };
        if (!(null == (n = globals.Alert))) n.alert('\u662f\u5426\u5220\u9664\u9009\u4e2d\u56fe\u7247', '', [s, l]);
      };

      o.onOverTimer = function () {
        globals.showToast(module491.map_object_ignore_failed);
      };

      o.onHideKeyboard = function () {
        module12.Keyboard.dismiss();
      };

      o.getShowOccurTime = function () {
        return null == o.state.occurHour || null == o.state.occurMinute
          ? '\u672a\u8bbe\u7f6e'
          : module1368.addZeroPrefix(o.state.occurHour) + ':' + module1368.addZeroPrefix(o.state.occurMinute);
      };

      o.hideTimerPicker = function () {
        o.hideModalView(function () {
          o.setState({
            shouldShowTimePicker: false,
          });
        });
      };

      o.didSelectTime = function (t) {
        o.hideModalView(function () {
          o.setState({
            shouldShowTimePicker: false,
            occurMinute: t.getMinutes(),
            occurHour: t.getHours(),
          });
        });
      };

      o.state = {
        fbName: '',
        fbSummary: '',
        fbDetail: '',
        radioSelect: true,
        historyInfo: '\u8bf7\u9009\u62e9\u6e05\u6d01\u8bb0\u5f55',
        historyImage: null,
        shouldShowTimePicker: false,
        occurMinute: null,
        occurHour: null,
        imageArray: [],
      };
      o.animatedWrapMarginBottom = new module12.Animated.Value(-500);
      return o;
    }

    module5.default(module1979, [
      {
        key: 'componentDidMount',
        value: function () {
          var t,
            o = this;
          regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.InnerTestUsersName));

                  case 2:
                    if ((t = s.sent))
                      o.setState({
                        fbName: t,
                      });

                  case 4:
                  case 'end':
                    return s.stop();
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
              fontSize: 14,
              innterVPadding: 10,
              detailWidth: 350,
              bottomDetailTop: 2,
              onPress: this.onPressHistoryInfo,
            },
            {
              title: '\u95ee\u9898\u53d1\u751f\u65f6\u95f4 (\u5fc5\u586b)',
              bottomDetail: this.getShowOccurTime(),
              funcId: 'debug_fb_occur_list',
              shouldShowBottomLine: false,
              visible: true,
              fontSize: 14,
              innterVPadding: 10,
              detailWidth: 350,
              bottomDetailTop: 2,
              onPress: this.onPressSelectTime,
            },
          ];
        },
      },
      {
        key: 'getDebugInfo',
        value: function () {
          var t = this;
          if (module389.isMiApp)
            module389.getDevicePropertyFromMemCache(['ssid', 'localip', 'mac'], function (n) {
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
            o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getNetworkInfo());

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
                        o.fetchNetworkInfo();
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
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (!module387.default.isShareUser()) {
                      o.next = 3;
                      break;
                    }

                    this.firmwareVersion = module491.share_device;
                    return o.abrupt('return');

                  case 3:
                    if (module389.isSupportFirmwareVersion()) {
                      o.next = 5;
                      break;
                    }

                    return o.abrupt('return');

                  case 5:
                    o.next = 7;
                    return regeneratorRuntime.default.awrap(module389.getFirmwareVersion());

                  case 7:
                    if (undefined != (t = o.sent) && undefined != t.currentVersion) this.firmwareVersion = t.currentVersion;

                  case 9:
                  case 'end':
                    return o.stop();
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
          var n = module1368.utcTimeConvertToPhoneTimeZoneTime(1e3 * t);
          return [module1368.addZeroPrefix(n.month), module1368.addZeroPrefix(n.day), module1368.addZeroPrefix(n.hour), module1368.addZeroPrefix(n.minute)];
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
          return t.toISOString();
        },
      },
      {
        key: 'getDeviceInfo',
        value: function () {
          var t = module389.isMiApp ? module491.debug_info_xiaomi_id : 'UID',
            n = module389.currentAppVersion() + '(' + ('ios' == module12.Platform.OS ? 'iOS' : 'Android') + ' ' + module12.Platform.Version + ')',
            o = module390.default.sharedCache().serialNumber;
          o = '' === o || undefined == o || o.length < 1 ? ' ' : o;
          var s = this.getCleanStartTime(),
            l = {};
          l.Model = module389.deviceModel;
          l['\u5e8f\u5217\u53f7'] = o;
          l['' + t] = module389.userId;
          l['App\u7248\u672c'] = n;
          l['\u56fa\u4ef6\u7248\u672c'] = this.firmwareVersion;
          l['\u63d2\u4ef6\u7248\u672c'] = module387.default.pluginVersion();
          l.DID = module387.default.getDid();
          l['WiFi\u540d\u79f0'] = '' + (this.networkInfo.ssid || Unknown);
          l['IP\u5730\u5740'] = '' + (this.networkInfo.ip || Unknown);
          l['Mac\u5730\u5740'] = '' + (this.networkInfo.mac || Unknown);
          if (s && s.length > 0) l.cleanStartTime = s;
          return JSON.stringify(l);
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
          var n = this.context.theme;
          return React.default.createElement(
            module12.Text,
            {
              style: [
                D.textStyle,
                {
                  color: n.feedbackPage.textColor,
                },
              ],
            },
            t
          );
        },
      },
      {
        key: 'getContentInputView',
        value: function (t, n, o, s) {
          var l = this.context.theme;
          return React.default.createElement(module12.TextInput, {
            onChangeText: o,
            style: [
              D.contentInputStyle,
              s,
              {
                height: t,
              },
            ],
            multiline: true,
            clearButtonMode: 'while-editing',
            placeholder: n,
            placeholderTextColor: l.feedbackPage.inputPlaceholderColor,
          });
        },
      },
      {
        key: 'getHistoryInfoList',
        value: function () {
          return this.getItems().map(function (t, n) {
            return t.visible
              ? React.default.createElement(
                  module381.SettingListItemView,
                  module21.default({}, t, {
                    key: n,
                    titleColor: 'rgba(0,0,0,0.8)',
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
            n = React.default.createElement(
              module12.TouchableOpacity,
              {
                onPress: this.onPressSelectImage,
              },
              React.default.createElement(module12.Image, {
                style: D.imageItemView,
                source: this.context.theme.timerListSetting.confirmButton,
              })
            );
          return React.default.createElement(
            module12.View,
            {
              style: D.imageInfoView,
            },
            React.default.createElement(module12.FlatList, {
              data: this.state.imageArray,
              renderItem: function (n) {
                var o = n.item;
                return React.default.createElement(
                  module12.View,
                  null,
                  React.default.createElement(module12.Image, {
                    source: {
                      uri: o.posterPath,
                    },
                    style: D.imageItemView,
                  }),
                  React.default.createElement(module381.PureImageButton, {
                    style: D.deleteImageBtn,
                    image: require('./1979'),
                    imageWidth: 20,
                    imageHeight: 20,
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
              ListFooterComponent: n,
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
            module381.BaseModal,
            {
              transparent: true,
              onRequestClose: this.hideTimerPicker,
            },
            React.default.createElement(
              module12.Animated.View,
              {
                style: [
                  D.modal,
                  {
                    opacity: this.animatedWrapMarginBottom.interpolate({
                      inputRange: [-500, 0],
                      outputRange: [0, 1],
                    }),
                    height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.TouchableWithoutFeedback,
                {
                  onPress: this.hideTimerPicker,
                },
                React.default.createElement(module12.View, {
                  style: D.timerOutView,
                })
              ),
              React.default.createElement(
                module12.Animated.View,
                {
                  style: {
                    position: 'absolute',
                    zIndex: 99999,
                    bottom: this.animatedWrapMarginBottom,
                    justifyContent: 'flex-end',
                    paddingBottom: 20,
                    overflow: 'hidden',
                  },
                },
                React.default.createElement(module381.CustomDatePicker, {
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
            n = this.context.theme,
            o = React.default.createElement(
              module12.View,
              {
                style: [
                  D.categoryView,
                  {
                    backgroundColor: n.feedbackPage.inputBackgroundColor,
                  },
                ],
              },
              React.default.createElement(module381.Radio, {
                text: '\u8f6f\u4ef6\u95ee\u9898',
                radioSelect: this.state.radioSelect,
                txtColor: n.settingListItem.titleColor,
                child: _.keySoft,
                onClick: this.onSelectCategory,
              }),
              React.default.createElement(module381.Radio, {
                text: '\u786c\u4ef6\u95ee\u9898',
                radioSelect: !this.state.radioSelect,
                txtColor: n.settingListItem.titleColor,
                child: _.keyHard,
                onClick: this.onSelectCategory,
              })
            ),
            s = {
              backgroundColor: n.feedbackPage.inputBackgroundColor,
              color: n.feedbackPage.textColor,
            },
            l = React.default.createElement(module12.TextInput, {
              onChangeText: function (n) {
                return t.setState({
                  fbName: n,
                });
              },
              value: this.state.fbName,
              style: [D.nameInputStyle, s],
              clearButtonMode: 'while-editing',
              placeholder: '\u8bf7\u8f93\u5165\u5185\u6d4b\u59d3\u540d',
              placeholderTextColor: n.feedbackPage.inputPlaceholderColor,
            }),
            u = this.getContentInputView(
              60,
              '\u8bf7\u63cf\u8ff0\u95ee\u9898',
              function (n) {
                return t.setState({
                  fbSummary: n,
                });
              },
              s
            ),
            c = this.getContentInputView(
              150,
              '\u8bf7\u5c3d\u91cf\u5b8c\u6574\u63cf\u8ff0\u590d\u73b0\u6b65\u9aa4',
              function (n) {
                return t.setState({
                  fbDetail: n,
                });
              },
              s
            ),
            f = this.getHistoryInfoList(),
            h = this.getSelectedImageList(),
            w = this.state.shouldShowTimePicker && this.getDatePicker();
          return React.default.createElement(
            module12.View,
            {
              style: [
                D.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: [
                  D.containter,
                  {
                    backgroundColor: n.settingBackgroundColor,
                  },
                ],
                onScrollBeginDrag: this.onHideKeyboard,
                showsVerticalScrollIndicator: false,
              },
              this.getTextView('\u5185\u6d4b\u59d3\u540d:\uff08\u5fc5\u586b\uff09'),
              l,
              this.getTextView('\u95ee\u9898\u6a21\u5757:\uff08\u975e\u5fc5\u586b\uff09'),
              o,
              this.getTextView('\u95ee\u9898\u6982\u8ff0:\uff08\u5fc5\u586b\uff09'),
              u,
              this.getTextView('\u590d\u73b0\u6b65\u9aa4: '),
              c,
              this.getTextView('\u95ee\u9898\u4fe1\u606f: '),
              React.default.createElement(
                module12.View,
                {
                  style: D.historyView,
                },
                f
              ),
              this.getTextView('\u53cd\u9988\u9644\u56fe: '),
              h,
              React.default.createElement(module381.PureButton, {
                style: D.buttonStyle,
                textColor: 'white',
                title: '\u63d0\u4ea4',
                onPress: this.onPressSubmit,
              }),
              w
            ),
            React.default.createElement(module381.CancelableLoadingView, {
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
    ]);
    return module1979;
  })(React.Component);

exports.default = H;
H.contextType = module506.AppConfigContext;
var D = module12.StyleSheet.create({
  containterView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: module936.NavigationBarHeight + 10,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 8,
  },
  imageInfoView: {
    height: 100,
    paddingVertical: 10,
  },
  imageItemView: {
    height: 80,
    width: 80,
    backgroundColor: 'white',
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  deleteImageBtn: {
    position: 'absolute',
    top: -5,
    left: 65,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyView: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  nameInputStyle: {
    height: 40,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  contentInputStyle: {
    height: 60,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  textStyle: {
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'left',
    marginVertical: 5,
  },
  buttonStyle: {
    height: 40,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#3384ff',
    margin: 10,
  },
});

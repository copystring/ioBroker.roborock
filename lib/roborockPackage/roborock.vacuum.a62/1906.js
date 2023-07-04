var module50 = require('./50'),
  module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1907 = require('./1907'),
  module1055 = require('./1055'),
  module385 = require('./385'),
  module381 = require('./381'),
  module414 = require('./414'),
  module1846 = require('./1846'),
  module391 = require('./391'),
  module419 = require('./419'),
  module390 = require('./390'),
  module423 = require('./423'),
  module1121 = require('./1121'),
  module515 = require('./515'),
  module1328 = require('./1328'),
  module387 = require('./387'),
  module394 = require('./394'),
  module1317 = require('./1317');

function z(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function H(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      z(Object(l), true).forEach(function (o) {
        module50.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      z(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function F() {
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

var module1340 = require('./1340'),
  module505 = require('./505').strings,
  module393 = require('./393'),
  module389 = require('./389'),
  module1265 = require('./1265'),
  base64js = require('base64-js'),
  module398 = require('./398'),
  G = module398.fromSecToMin,
  K = module398.fromSqmmToSqm,
  module1565 = require('./1565'),
  q = 0,
  X = module391.default.isIphoneX() ? 110 : 100,
  Y = X + 70,
  J = 1,
  Q = 0,
  module1901 = (function (t) {
    module7.default(z, t);

    var module50 = z,
      module1121 = F(),
      D = function () {
        var t,
          o = module11.default(module50);

        if (module1121) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function z(t) {
      var n;
      module4.default(this, z);

      (n = D.call(this, t)).onPressShareButton = function () {
        var t = module6.default(n);
        if (t.shareView)
          t.shareView.capture(t.mapData, function (t, n) {
            console.log('share path -' + n + ' - name - ' + t);
            module393.openShareListBar(
              '\u5206\u4eab',
              '\u5206\u4eab',
              {
                uri: n,
              },
              ''
            );
          });
      };

      n.onPressFBAddMarkButton = function () {
        var t;
        if (!(null == (t = n.mapView))) t.addHistoryMark();
      };

      n.onPressFBCommitButton = function () {
        if (n.feedbackCallback) {
          var t = n.fbParams;

          n.didFinishScreenShot = function (o) {
            n.feedbackCallback({
              text: t,
              uri: o,
              startTime: n.state.start,
            });
            n.props.navigation.pop();
          };

          n._startLoading();

          if (n.loadComplete) n._capture();
        }
      };

      n.onOverTimer = function () {
        globals.showToast(module505.map_object_ignore_failed);
      };

      n.state = {
        start: t.navigation.state.params.start,
        time: t.navigation.state.params.time,
        area: t.navigation.state.params.area,
        avoidCount: t.navigation.state.params.avoidCount,
        finishReasonCode: t.navigation.state.params.finishReasonCode,
        dustCollectionStatus: t.navigation.state.params.dustCollectionStatus,
        startType: t.navigation.state.params.startType,
        cleanType: t.navigation.state.params.cleanType,
        cleanMop: t.navigation.state.params.cleanMop,
        washCount: t.navigation.state.params.washCount,
        washTime: t.navigation.state.params.washTime,
        mapFlag: t.navigation.state.params.mapFlag,
        obstaclesCount: 0,
        map: null,
        path: null,
        charger: null,
        hasGotMap: false,
        shareBtnEnabled: false,
        mapDebugInfoVisible: false,
        areaUnit: module391.default.getAreaUnit(),
        uiStatus: J,
        recordSpeed: 1,
      };
      n.countryCode = module381.RobotStatusManager.sharedManager().countryCode;
      n.shouldShowShareButton = (module393.isMiApp && module381.RobotStatusManager.sharedManager().serverCode, module390.default.isSharedAllowed());
      n.shouldShowShareButton = false;
      n.unMount = false;
      n.mapImageHasOnLoad = {};
      Q = n.shouldShowShareButton && 'android' == module12.Platform.OS ? 1 : 0;
      return n;
    }

    module5.default(z, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.feedbackCallback = this.props.navigation.getParam('feedbackCallback', null);
          if (this.feedbackCallback)
            this.mapLoadEmitter = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.MapImageLoaded, function (n) {
              if (n.types && 0 != n.types.length) {
                n.types.forEach(function (n) {
                  t.mapImageHasOnLoad[n] = true;
                });
                var o = Object.values(module1055.shareViewLoadType),
                  l = 0;
                o.forEach(function (n) {
                  l += t.mapImageHasOnLoad[n] ? 1 : 0;
                });

                if (l > 0 && l == o.length) {
                  t.loadComplete = true;

                  t._capture();

                  t.mapImageHasOnLoad = {};
                }
              }
            });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.renderNavRightButton();
          this.fetchRemoteMap();
          var n;
          regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.MapDebugInfoVisible));

                  case 2:
                    n = !!o.sent;
                    if (!t.unMount)
                      t.setState({
                        mapDebugInfoVisible: n,
                      });

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
          this.areaUnitListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.AreaUnitChange, function (n) {
            t.setState({
              areaUnit: module391.default.getAreaUnit(),
            });
          });
          module387.LogEventCommon('enter_record_detail');
        },
      },
      {
        key: 'renderNavRightButton',
        value: function () {
          this.context.theme;
          var module1866 = React.default.createElement(module385.PureImageButton, {
            image: require('./1866'),
            onPress: this.onPressShareButton,
            imageWidth: 40,
            imageHeight: 40,
            enabled: this.state.shareBtnEnabled,
            style: ee.shareButton,
          });
          this.props.navigation.setParams({
            navBarBackgroundColor: 'transparent',
            hiddenBottomLine: true,
            rightItems: this.shouldShowShareButton ? [module1866] : [],
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.unMount = true;
          if (this.areaUnitListener) this.areaUnitListener.remove();
        },
      },
      {
        key: 'fetchRemoteMap',
        value: function () {
          var t = this,
            n = module393.isMiApp
              ? [this.state.start]
              : {
                  start_time: this.state.start,
                };
          module393.getMapData(module389.Methods.GetCleanRecordMap, n, function (n, o) {
            if (n) {
              t.setState({
                hasGotMap: true,
                shareBtnEnabled: true,
              });
              t.renderNavRightButton();

              t._renderMapData(o);
            } else if (q < 8) {
              q++;
              setTimeout(function () {
                t.fetchRemoteMap();
              }, 1e3);
            } else {
              if (t.mapView)
                t.mapView.setState({
                  map: '',
                });
              t.setState({
                hasGotMap: true,
                shareBtnEnabled: false,
              });
            }
          });
        },
      },
      {
        key: '_renderMapData',
        value: function (t) {
          var n,
            l,
            s,
            c,
            u = module1907.parse(t, globals.app.state.theme != module515.Themes.light, module423.DMM.isSapphirePlus, module394.MC.sapMapBeautify),
            h = {
              carpetMap: u.carpetMap || {},
              customCarpet: u.customCarpet || {},
              floorMap: u.floorMap || {},
              map: u.map || {},
              path: u.path,
              charger: u.charger,
              zones: u.zones || {},
              walls: u.walls || {},
              fbzs: u.fbzs || {},
              mfbzs: u.mfbzs || {},
              clfbzs: u.clfbzs || {},
              furnitures: u.furnitures || {},
              obstacles: u.obstacles || u.obstaclesOld || {},
              ignoredObstacles: u.ignoredObstacles || u.ignoredObstaclesOld || {},
              mopPath: u.mopPath || {},
              robot: u.robot,
              dockType: u.dockType || {},
              dsfbz: u.dsfbz || {},
            };

          if (
            (h &&
              h.map &&
              h.map.data &&
              module22.default(h.map.data, {
                data: base64js.toByteArray(t),
              }),
            -2 != this.state.mapFlag && module414.MM.mapRotateAngle)
          ) {
            var f = module414.MM.mapRotateAngle[this.state.mapFlag];
            module22.default(h, {
              mapDeg: f || 0,
            });
          }

          this.mapData = h;
          if (this.mapView) this.mapView.setState(H({}, h));
          this.setState({
            obstaclesCount:
              (null == (n = this.mapView) ? undefined : null == (l = n.map) ? undefined : null == (s = l.state) ? undefined : null == (c = s.obstacles) ? undefined : c.length) ||
              0,
          });
        },
      },
      {
        key: '_capture',
        value: function () {
          var t,
            n = this;

          if (this.didFinishScreenShot) {
            var o = this.didFinishScreenShot;
            this.didFinishScreenShot = null;
            if (!(null == (t = this.mapView))) t.clearAllMarkFocus();
            module1340.setTimeout(function () {
              var t = module12.findNodeHandle(n.rootView);
              if (t)
                module393
                  .longScreenShot(t, 'shareImage.png')
                  .then(function (t) {
                    n._endLoading();

                    o(t);
                  })
                  .catch(function (t) {
                    console.log('shareView capture  error: ' + ('object' == typeof t ? JSON.stringify(t) : t));
                  });
            }, 500);
          }
        },
      },
      {
        key: '_startLoading',
        value: function () {
          var t;
          if (!(null == (t = this.loadingView))) t.showWithText(module505.robot_status_locked_when_saving_map);
        },
      },
      {
        key: '_endLoading',
        value: function () {
          var t;
          if (!(null == (t = this.loadingView))) t.hide();
        },
      },
      {
        key: 'showShareMaskView',
        value: function () {
          return Q > 0
            ? React.default.createElement(module12.View, {
                style: ee.maskShare,
              })
            : null;
        },
      },
      {
        key: 'showFeedbackView',
        value: function () {
          var t = this.context.theme,
            n = [
              {
                title: '\u6807\u8bb0\u95ee\u9898\u533a\u57df',
                image: t.feedbackPage.addMarkImg,
                onPress: this.onPressFBAddMarkButton,
              },
              {
                title: '\u9009\u62e9\u6b64\u6761\u8bb0\u5f55',
                image: t.mapEdit.confirmImg,
                onPress: this.onPressFBCommitButton,
              },
            ];
          return this.feedbackCallback
            ? React.default.createElement(
                module12.View,
                {
                  style: ee.feedbackView,
                },
                n.map(function (n, l) {
                  return React.default.createElement(
                    module385.LeftImageButton,
                    module22.default(
                      {
                        key: l,
                        style: [
                          ee.feedbackBtnStyle,
                          {
                            backgroundColor: t.cleanHistory.infoBackgroundColor,
                          },
                        ],
                      },
                      n,
                      {
                        imageWidth: 20,
                        imageHeight: 20,
                        textColor: t.cleanHistory.titleColor,
                        fontWeight: 'bold',
                        textLeft: 6,
                        fontSize: 16,
                      }
                    )
                  );
                })
              )
            : null;
        },
      },
      {
        key: 'render',
        value: function () {
          if (1 == this.props.navigation.state.params.status) require('./1900');
          else require('./1901');
          if (module390.default.isStructuredLightSupported() || module423.DMM.isTopazSV)
            React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(module12.View, {
                style: [
                  ee.lineView,
                  {
                    backgroundColor: n.cleanHistory.lineColor,
                  },
                ],
              }),
              React.default.createElement(
                module12.View,
                {
                  style: ee.detailView,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: {
                      marginLeft: 2,
                      fontSize: 12,
                      color: n.cleanHistory.detailTitleColor,
                      textAlign: 'center',
                    },
                  },
                  ' ',
                  module505.localization_strings_CommonModules_NumberView_4
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: ee.horizontalView,
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        opacity: globals.isRTL ? 1 : 0,
                      },
                    },
                    M
                  ),
                  E,
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        opacity: globals.isRTL ? 0 : 1,
                      },
                    },
                    M
                  )
                )
              )
            );
          else React.default.createElement(module12.View, null);
          var t = this,
            n = this.context.theme,
            l = this.getDescText(),
            s = Math.ceil(this.props.navigation.state.params.time / 60),
            c = module1565.utcTimeConvertToPhoneTimeZoneTime(1e3 * this.state.start),
            u = module1565.addZeroPrefix(c.month) + '/' + module1565.addZeroPrefix(c.day) + ' ' + module1565.addZeroPrefix(c.hour) + ':' + module1565.addZeroPrefix(c.minute),
            h = {
              marginHorizontal: 2,
              fontSize: 20,
              color: n.cleanHistory.titleColor,
            },
            f = {
              fontSize: module391.default.scaledPixelForPad(13),
              color: n.cleanHistory.titleColor,
            },
            p = React.default.createElement(
              module12.Text,
              {
                style: h,
              },
              module391.default.getAreaUnitValue(this.generateAreaText())
            ),
            b = React.default.createElement(
              module12.Text,
              {
                style: H(
                  {
                    marginRight: 2,
                  },
                  f
                ),
              },
              this.state.areaUnit
            ),
            S = React.default.createElement(
              module12.Text,
              {
                style: h,
              },
              this.generateTimeText()
            ),
            V = React.default.createElement(
              module12.Text,
              {
                style: f,
              },
              this.generateTimeTextUnit()
            ),
            E = React.default.createElement(
              module12.Text,
              {
                style: h,
              },
              this.state.obstaclesCount || 0
            ),
            M = React.default.createElement(
              module12.Text,
              {
                style: f,
              },
              "'"
            ),
            P = React.default.createElement(
              module12.Text,
              {
                style: h,
              },
              this.state.washCount
            ),
            R = React.default.createElement(
              module12.Text,
              {
                style: h,
              },
              this.state.washTime
            ),
            D = React.default.createElement(
              module12.Text,
              {
                style: f,
              },
              'min'
            ),
            z =
              this.state.washCount > 0
                ? React.default.createElement(
                    React.default.Fragment,
                    null,
                    React.default.createElement(module12.View, {
                      style: [
                        ee.lineView,
                        {
                          backgroundColor: n.cleanHistory.lineColor,
                        },
                      ],
                    }),
                    React.default.createElement(
                      module12.View,
                      {
                        style: ee.detailView,
                      },
                      React.default.createElement(
                        module12.Text,
                        {
                          style: {
                            marginLeft: 2,
                            fontSize: 12,
                            color: n.cleanHistory.detailTitleColor,
                            textAlign: 'center',
                          },
                        },
                        ' ',
                        module505.mop_mode_setting_page_wash_count
                      ),
                      React.default.createElement(
                        module12.View,
                        {
                          style: ee.horizontalView,
                        },
                        P
                      )
                    )
                  )
                : React.default.createElement(module12.View, null),
            F =
              this.state.washTime > 0 && (1 == this.state.cleanMop || 3 == this.state.cleanMop)
                ? React.default.createElement(
                    React.default.Fragment,
                    null,
                    React.default.createElement(module12.View, {
                      style: [
                        ee.lineView,
                        {
                          backgroundColor: n.cleanHistory.lineColor,
                        },
                      ],
                    }),
                    React.default.createElement(
                      module12.View,
                      {
                        style: ee.detailView,
                      },
                      React.default.createElement(
                        module12.Text,
                        {
                          style: {
                            marginLeft: 2,
                            fontSize: 12,
                            color: n.cleanHistory.detailTitleColor,
                            textAlign: 'center',
                          },
                        },
                        ' ',
                        module505.mop_cleaning_time
                      ),
                      React.default.createElement(
                        module12.View,
                        {
                          style: ee.horizontalView,
                        },
                        R,
                        React.default.createElement(module12.View, null, D)
                      )
                    )
                  )
                : React.default.createElement(module12.View, null),
            A = module505.localization_strings_CommonModules_NumberView_2,
            I = React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(module12.View, {
                style: [
                  ee.lineView,
                  {
                    backgroundColor: n.cleanHistory.lineColor,
                  },
                ],
              }),
              React.default.createElement(
                module12.View,
                {
                  style: ee.detailView,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: {
                      marginLeft: 2,
                      fontSize: 12,
                      color: n.cleanHistory.detailTitleColor,
                    },
                  },
                  ' ',
                  A
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: ee.horizontalView,
                  },
                  S,
                  React.default.createElement(module12.View, null, V)
                )
              )
            ),
            j = module505.localization_strings_CommonModules_NumberView_0,
            N = React.default.createElement(
              module12.View,
              {
                style: ee.detailView,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    fontSize: 12,
                    color: n.cleanHistory.detailTitleColor,
                  },
                },
                j
              ),
              React.default.createElement(
                module12.View,
                {
                  style: ee.horizontalView,
                },
                p,
                React.default.createElement(module12.View, null, b)
              )
            ),
            W = [module505.home_bottom_menu_global, module505.home_bottom_menu_draw_zone, module505.home_bottom_menu_select_zone][this.state.cleanType - 1],
            G = this.state.cleanMop
              ? [module505.localization_strings_Main_MainPage_3, module505.clean_method_mop, module505.localization_strings_Main_MainPage_3, module505.clean_method_mop][
                  this.state.cleanMop
                ]
              : module505.localization_strings_Main_MainPage_3,
            K = W + ' | ' + (module1265.CleanStartType()[this.state.startType] || module505.localization_strings_Setting_General_index_0) + ' | ' + u + ' ';
          if (module390.default.isNewDataForCleanHistoryDetail() && this.state.dustCollectionStatus) K = K + '| ' + module505.dust_collection_status_1;
          var q = [n.cleanHistory.gradSuccessLeft, n.cleanHistory.gradSuccessRight],
            module1900 = [n.cleanHistory.gradFailLeft, n.cleanHistory.gradFailRight],
            te = React.default.createElement(
              module12.View,
              {
                style: [
                  ee.verticalView,
                  {
                    flex: 1,
                    paddingLeft: globals.isRTL ? 0 : 20,
                    paddingRight: globals.isRTL ? 20 : 0,
                  },
                ],
              },
              React.default.createElement(
                module12.TouchableWithoutFeedback,
                {
                  onPress: this.onPressFinishReason.bind(this),
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      {
                        fontSize: 18,
                        color: n.cleanHistory.cleanFlagTextColor,
                      },
                    ],
                  },
                  l
                )
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    ee.TextStyle,
                    {
                      color: n.cleanHistory.descTextColor,
                    },
                  ],
                },
                K
              )
            ),
            module1908 =
              module423.DMM.isV1 && !module390.default.isObaAccount()
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(
                    module12.TouchableWithoutFeedback,
                    module22.default(
                      {
                        onPress: this.onPressPlay.bind(this),
                      },
                      module391.default.getAccessibilityLabel('clean_path_record_palyback')
                    ),
                    React.default.createElement(
                      module12.View,
                      {
                        style: [
                          ee.imageStyleView,
                          {
                            flex: 0,
                            marginLeft: globals.isRTL ? 20 : 0,
                            marginRight: globals.isRTL ? 0 : 20,
                          },
                        ],
                      },
                      React.default.createElement(module12.Image, {
                        style: ee.imageStyle,
                        source: require('./1908'),
                      }),
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            ee.iconDescText,
                            {
                              color: n.cleanHistory.actionTextColor,
                            },
                          ],
                        },
                        ' ',
                        module505.clean_path_record_palyback,
                        ' '
                      )
                    )
                  ),
            ie = React.default.createElement(
              module12.View,
              {
                style: [ee.horizontalView],
              },
              globals.isRTL ? module1908 : te,
              globals.isRTL ? te : module1908
            ),
            module1909 = React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: this.onPressFinish.bind(this),
              },
              React.default.createElement(
                module12.View,
                {
                  style: ee.imageStyleView,
                },
                React.default.createElement(module12.Image, {
                  style: ee.imageStyle,
                  source: require('./1909'),
                }),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      ee.iconDescText,
                      {
                        color: n.cleanHistory.actionTextColor,
                      },
                    ],
                  },
                  ' ',
                  module505.map_object_cancel_privacy_stop,
                  ' '
                )
              )
            ),
            module1910 = React.default.createElement(
              module12.TouchableWithoutFeedback,
              module22.default(
                {
                  onPress: this.onPressPause.bind(this),
                },
                module391.default.getAccessibilityLabel('clean_path_record_pause')
              ),
              React.default.createElement(
                module12.View,
                {
                  style: ee.imageStyleView,
                },
                React.default.createElement(module12.Image, {
                  style: ee.imageStyle,
                  source: require('./1910'),
                }),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      ee.iconDescText,
                      {
                        color: n.cleanHistory.actionTextColor,
                      },
                    ],
                  },
                  ' ',
                  module505.clean_path_record_pause,
                  ' '
                )
              )
            ),
            module1908 = React.default.createElement(
              module12.TouchableWithoutFeedback,
              module22.default(
                {
                  onPress: this.onPressPlay.bind(this),
                },
                module391.default.getAccessibilityLabel('clean_path_record_play')
              ),
              React.default.createElement(
                module12.View,
                {
                  style: ee.imageStyleView,
                },
                React.default.createElement(module12.Image, {
                  style: ee.imageStyle,
                  source: require('./1908'),
                }),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      ee.iconDescText,
                      {
                        color: n.cleanHistory.actionTextColor,
                      },
                    ],
                  },
                  ' ',
                  module505.clean_path_record_play,
                  ' '
                )
              )
            ),
            module1911 = React.default.createElement(
              module12.TouchableWithoutFeedback,
              module22.default(
                {
                  onPress: this.onPressSpeed.bind(this),
                },
                module391.default.getAccessibilityLabel('clean_path_record_speed')
              ),
              React.default.createElement(
                module12.View,
                {
                  style: ee.imageStyleView,
                },
                React.default.createElement(
                  module12.ImageBackground,
                  {
                    style: [
                      ee.imageStyle,
                      {
                        transform: [
                          {
                            rotateY: '0deg',
                          },
                        ],
                      },
                    ],
                    source: require('./1911'),
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        ee.speedText,
                        {
                          color: n.cleanHistory.actionTextColor,
                        },
                      ],
                    },
                    ' ',
                    'X' + this.state.recordSpeed,
                    ' '
                  )
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      ee.iconDescText,
                      {
                        color: n.cleanHistory.actionTextColor,
                      },
                    ],
                  },
                  module505.clean_path_record_speed
                )
              )
            );

          if (this.state.uiStatus != J) {
            var se = 3 == this.state.uiStatus;
            ie = React.default.createElement(
              module12.View,
              {
                style: [
                  ee.horizontalView,
                  {
                    marginHorizontal: 80,
                  },
                ],
              },
              globals.isRTL ? module1911 : module1909,
              se ? module1908 : module1910,
              globals.isRTL ? module1909 : module1911
            );
          }

          this.fbParams = W + ' | ' + G;
          var ce = H(
            H(
              {
                width: module12.Dimensions.get('window').width,
                height: X,
                radius: 14,
              },
              n.shadowConfig
            ),
            {},
            {
              style: ee.infoBackgroundView,
            }
          );
          return React.default.createElement(
            module12.View,
            {
              style: [
                ee.container,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                contentContainerStyle: ee.contentView,
                ref: function (n) {
                  return (t.rootView = n);
                },
                scrollEnabled: false,
              },
              this.state.hasGotMap
                ? React.default.createElement(module1055.MapView, {
                    style: {
                      flex: 1,
                      justifyContent: 'center',
                      backgroundColor: n.settingBackgroundColor,
                    },
                    ref: function (n) {
                      return (t.mapView = n);
                    },
                    map: this.state.map,
                    path: this.state.path,
                    charger: this.state.charger,
                    syncMapDeg: false,
                    left: module1055.MapEditCommonStyles.mapLeft,
                    right: module1055.MapEditCommonStyles.mapRight,
                    top: module1055.MapEditCommonStyles.mapTop,
                    bottom: Y + 40,
                    alwaysShowFBZ: true,
                    showMapObjectDebugInfo: !module423.DMM.isV1 && this.state.mapDebugInfoVisible,
                    showFurnitureIcon: !module394.MC.showAllFurnitureModel,
                    isCollectDustDock: !!this.state.dustCollectionStatus,
                    shouldShowRobotMovingAnimation: true,
                    onPathPlaybackFinished: function () {
                      t.setState({
                        uiStatus: J,
                      });
                    },
                  })
                : React.default.createElement(
                    module12.View,
                    {
                      style: {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: Y,
                      },
                    },
                    React.default.createElement(module385.Spinner, null)
                  ),
              React.default.createElement(
                module12.View,
                {
                  style: ee.textContainer,
                },
                React.default.createElement(
                  module385.GradientView,
                  {
                    colors: 1 == this.props.navigation.state.params.status ? q : module1900,
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 0,
                    },
                    style: [
                      ee.gradView,
                      {
                        width: module12.Dimensions.get('window').width,
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: ee.topView,
                    },
                    ie
                  ),
                  React.default.createElement(
                    module1328.BoxShadow,
                    {
                      setting: ce,
                    },
                    React.default.createElement(module12.View, {
                      style: [
                        ee.infoBackgroundView,
                        {
                          height: X,
                          backgroundColor: n.cleanHistory.infoBackgroundColor,
                        },
                      ],
                    })
                  ),
                  React.default.createElement(
                    module12.View,
                    {
                      style: [
                        ee.textContent,
                        {
                          height: X,
                          padding: 10,
                        },
                      ],
                    },
                    N,
                    I,
                    z,
                    F
                  )
                )
              ),
              React.default.createElement(module1846.default, {
                style: {
                  position: 'absolute',
                  bottom: 0,
                  height: Q,
                },
                cleanArea: module391.default.getAreaUnitValue(this.generateAreaText()),
                cleanTime: s,
                ref: function (n) {
                  return (t.shareView = n);
                },
              }),
              this.showShareMaskView(),
              this.showFeedbackView()
            ),
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'clean_record_detail_view_loading',
              closeAccessibilityLabelKey: 'clean_record_detail_view_loading_close',
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
        key: 'generateTimeText',
        value: function () {
          return this.props.navigation.state.params.time < 60 ? '' + this.props.navigation.state.params.time : '' + G(this.props.navigation.state.params.time);
        },
      },
      {
        key: 'generateTimeTextUnit',
        value: function () {
          return this.props.navigation.state.params.time < 60 ? 's' : 'min';
        },
      },
      {
        key: 'generateAreaText',
        value: function () {
          var t = this.props.navigation.state.params.area;
          return t < 1e6 ? (t / 1e6).toFixed(1) : K(t);
        },
      },
      {
        key: 'isV2Model',
        value: function () {
          var t = module393.deviceModel;
          return (
            'roborock.vacuum.t4v2' == t ||
            'roborock.vacuum.s4v2' == t ||
            'roborock.vacuum.t6v2' == t ||
            'roborock.vacuum.s6v2' == t ||
            'roborock.vacuum.p6v2' == t ||
            'roborock.vacuum.p5v2' == t
          );
        },
      },
      {
        key: 'onPressFinishReason',
        value: function () {
          if (module390.default.isShowCleanFinishReasonSupported()) globals.showToast(this.state.finishReasonCode);
        },
      },
      {
        key: 'getDescText',
        value: function () {
          var t = module1265.CleanFinishCleanReasons()[this.state.finishReasonCode];
          return undefined == t || '' == t || t.length < 1
            ? 1 == this.props.navigation.state.params.status
              ? module505.localization_strings_Main_Constants_68
              : module505.localization_strings_Setting_History_index_15
            : t;
        },
      },
      {
        key: 'onPressPlay',
        value: function () {
          this.setState({
            uiStatus: 2,
          });
          if (this.mapView) this.mapView.playRobotAnimation();
          module387.LogEventCommon('clean_path_record_playback_play');
        },
      },
      {
        key: 'onPressPause',
        value: function () {
          this.setState({
            uiStatus: 3,
          });
          if (this.mapView) this.mapView.pauseRobotAnimation();
          module387.LogEventCommon('clean_path_record_playback_pause');
        },
      },
      {
        key: 'onPressFinish',
        value: function () {
          this.setState({
            uiStatus: J,
          });
          if (this.mapView) this.mapView.stopRobotAnimation();
          module387.LogEventCommon('clean_path_record_playback_finish');
        },
      },
      {
        key: 'onPressSpeed',
        value: function () {
          var t = this.state.recordSpeed;
          if (5 == t) t = 1;
          else t += 2;
          this.setState({
            recordSpeed: t,
          });
          if (this.mapView) this.mapView.setRobotMovingSpeed(t);
          module387.LogEventCommon('clean_path_record_playback_speed', {
            speed: t,
          });
        },
      },
    ]);
    return z;
  })(React.default.Component);

exports.default = module1901;
module1901.contextType = module1121.AppConfigContext;
var ee = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: -module391.default.iOSAndroidReturn(
      module1317.titleBarContentHeight + module1265.StatusBarHeight + module1265.AppBarMarginTop,
      (module12.StatusBar.currentHeight || 0) + module1317.titleBarContentHeight
    ),
  },
  contentView: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    height: Y,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  gradView: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    flexDirection: 'column',
  },
  topView: {
    alignSelf: 'stretch',
    height: 70,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageStyleView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  TextStyle: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
    marginTop: 5,
  },
  ViewforTextStyle: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  shareButton: {
    marginRight: globals.isRTL ? 14 : null,
    marginLeft: globals.isRTL ? null : 14,
  },
  detailView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  maskShare: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    height: Q,
    bottom: 0,
  },
  horizontalView: {
    flexDirection: 'row',
  },
  verticalView: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  lineView: {
    height: 25,
    width: 0.8,
    alignSelf: 'center',
  },
  speedText: {
    fontSize: 12,
    alignSelf: 'center',
    lineHeight: 30,
  },
  imageStyle: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  iconDescText: {
    marginTop: 5,
    fontSize: 10,
    alignSelf: 'center',
  },
  infoBackgroundView: {
    position: 'absolute',
    opacity: 0.8,
    left: 0,
    right: 0,
    bottom: 0,
  },
  feedbackBtnStyle: {
    flex: 1,
    marginHorizontal: 15,
    height: 40,
    borderRadius: 8,
  },
  feedbackView: {
    position: 'absolute',
    bottom: Y + 5,
    left: 0,
    right: 0,
    height: 60,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

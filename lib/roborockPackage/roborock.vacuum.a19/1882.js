var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1233 = require('./1233'),
  module381 = require('./381'),
  module377 = require('./377'),
  module1798 = require('./1798'),
  module387 = require('./387'),
  module411 = require('./411'),
  module386 = require('./386'),
  module415 = require('./415'),
  module506 = require('./506'),
  module507 = require('./507'),
  module1067 = require('./1067'),
  module383 = require('./383');

function R(t, n) {
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

function L(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      R(Object(l), true).forEach(function (n) {
        module49.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      R(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function H() {
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
  module389 = require('./389'),
  module1341 = require('./1341'),
  F = module1341.parse,
  O = module1341.convertMap,
  I = module1341.convertCarpetMap,
  j = module1341.convertFloorMap,
  module385 = require('./385'),
  module936 = require('./936'),
  base64js = require('base64-js'),
  module394 = require('./394'),
  G = module394.fromSecToMin,
  K = module394.fromSqmmToSqm,
  module1368 = require('./1368'),
  X = 0,
  q = module387.default.isIphoneX() ? 110 : 100,
  Y = q + 70,
  J = 1,
  Q = 0,
  module1877 = (function (t) {
    module7.default(D, t);

    var module49 = D,
      module506 = H(),
      R = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function D(t) {
      var n;
      module4.default(this, D);

      (n = R.call(this, t)).onPressShareButton = function () {
        var t = module6.default(n);
        if (t.shareView)
          t.shareView.capture(t.mapData, function (t, n) {
            console.log('share path -' + n + ' - name - ' + t);
            module389.openShareListBar(
              '\u5206\u4eab',
              '\u5206\u4eab',
              {
                uri: n,
              },
              ''
            );
          });
      };

      n.onPressRotateMap = function () {
        var t;
        if (!(null == (t = n.mapView))) t.rotateMap(true);
      };

      n.onPressFeedbackButton = function () {
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
        globals.showToast(module491.map_object_ignore_failed);
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
        obstaclesCount: 0,
        map: null,
        path: null,
        charger: null,
        hasGotMap: false,
        shareBtnEnabled: false,
        mapDebugInfoVisible: false,
        areaUnit: module387.default.getAreaUnit(),
        uiStatus: J,
        recordSpeed: 1,
      };
      n.countryCode = module377.RobotStatusManager.sharedManager().countryCode;
      n.shouldShowShareButton = (module389.isMiApp && module377.RobotStatusManager.sharedManager().serverCode, module386.default.isSharedAllowed());
      n.unMount = false;
      n.mapImageHasOnLoad = {};
      Q = n.shouldShowShareButton && 'android' == module12.Platform.OS ? 1 : 0;
      return n;
    }

    module5.default(D, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.feedbackCallback = this.props.navigation.getParam('feedbackCallback', null);
          if (this.feedbackCallback)
            this.mapLoadEmitter = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapImageLoaded, function (n) {
              if (n.types && 0 != n.types.length) {
                n.types.forEach(function (n) {
                  t.mapImageHasOnLoad[n] = true;
                });
                var o = Object.values(module1233.shareViewLoadType),
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
          var o;
          regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.next = 2;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.MapDebugInfoVisible));

                  case 2:
                    o = !!l.sent;
                    if (!t.unMount)
                      t.setState({
                        mapDebugInfoVisible: o,
                      });

                  case 4:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
          this.areaUnitListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.AreaUnitChange, function (n) {
            t.setState({
              areaUnit: module387.default.getAreaUnit(),
            });
          });
          module383.LogEventCommon('enter_record_detail');
        },
      },
      {
        key: 'renderNavRightButton',
        value: function () {
          var t = this.context.theme,
            module1813 = React.default.createElement(module381.PureImageButton, {
              image: require('./1813'),
              onPress: this.onPressShareButton,
              imageWidth: 40,
              imageHeight: 40,
              enabled: this.state.shareBtnEnabled,
              style: ee.shareButton,
            }),
            o = React.default.createElement(module381.PureImageButton, {
              image: t.cleanHistory.rotateNavImg,
              onPress: this.onPressRotateMap,
              imageWidth: 26,
              imageHeight: 26,
              enabled: true,
              style: ee.rotateButton,
            }),
            l = globals.isRTL ? [o, module1813] : [module1813, o];
          this.props.navigation.setParams({
            navBarBackgroundColor: 'transparent',
            hiddenBottomLine: true,
            rightItems: this.shouldShowShareButton ? l : [o],
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
          var t = this;
          module389.getMapData(
            module385.Methods.GetCleanRecordMap,
            {
              start_time: this.state.start,
            },
            function (n, o) {
              if (n) {
                var l = base64js.toByteArray(o);
                t.setState({
                  hasGotMap: true,
                  shareBtnEnabled: true,
                });
                t.renderNavRightButton();

                t._renderMapData(l);
              } else
                X < 8
                  ? (X++,
                    setTimeout(function () {
                      t.fetchRemoteMap();
                    }, 1e3))
                  : (t.mapView &&
                      t.mapView.setState({
                        map: '',
                      }),
                    t.setState({
                      hasGotMap: true,
                      shareBtnEnabled: false,
                    }));
            }
          );
        },
      },
      {
        key: '_renderMapData',
        value: function (t) {
          var n = this;
          F(t, function (o) {
            var s,
              c,
              u,
              f,
              h = {
                carpetMap: I(o.map, o.carpetMap),
                customCarpet: o.customCarpet || {},
                floorMap: j(o.map, o.floorMap),
                map: O(o.map, globals.app.state.theme != module507.Themes.light),
                path: o.path,
                charger: o.charger,
                zones: o.zones || {},
                walls: o.walls || {},
                fbzs: o.fbzs || {},
                mfbzs: o.mfbzs || {},
                clfbzs: o.clfbzs || {},
                furnitures: o.furnitures || {},
                obstacles: o.obstacles || o.obstaclesOld || {},
                ignoredObstacles: o.ignoredObstacles || o.ignoredObstaclesOld || {},
                mopPath: o.mopPath || {},
                robot: o.robot,
              };
            if (h && h.map && h.map.data)
              module21.default(h.map.data, {
                data: t,
              });
            if (!h.map) h.map = {};
            n.mapData = h;
            if (n.mapView) n.mapView.setState(L({}, h));
            n.setState({
              obstaclesCount:
                (null == (s = n.mapView) ? undefined : null == (c = s.map) ? undefined : null == (u = c.state) ? undefined : null == (f = u.obstacles) ? undefined : f.length) || 0,
            });
          });
        },
      },
      {
        key: '_capture',
        value: function () {
          var t = this;

          if (this.didFinishScreenShot) {
            var n = this.didFinishScreenShot;
            this.didFinishScreenShot = null;
            var o = module12.findNodeHandle(this.rootView);
            if (o)
              module389
                .longScreenShot(o, 'shareImage.png')
                .then(function (o) {
                  t._endLoading();

                  n(o);
                })
                .catch(function (t) {
                  console.log('shareView capture  error: ' + ('object' == typeof t ? JSON.stringify(t) : t));
                });
          }
        },
      },
      {
        key: '_startLoading',
        value: function () {
          var t;
          if (!(null == (t = this.loadingView))) t.showWithText(module491.robot_status_locked_when_saving_map);
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
        key: 'render',
        value: function () {
          if (1 == this.props.navigation.state.params.status) require('./1876');
          else require('./1877');
          var t = this,
            n = this.context.theme,
            o = this.getDescText(),
            l = Math.ceil(this.props.navigation.state.params.time / 60),
            s = module1368.utcTimeConvertToPhoneTimeZoneTime(1e3 * this.state.start),
            c = module1368.addZeroPrefix(s.month) + '/' + module1368.addZeroPrefix(s.day) + ' ' + module1368.addZeroPrefix(s.hour) + ':' + module1368.addZeroPrefix(s.minute),
            u = React.default.createElement(
              module12.Text,
              {
                style: {
                  marginHorizontal: 2,
                  fontSize: 20,
                  color: n.cleanHistory.titleColor,
                },
              },
              module387.default.getAreaUnitValue(this.generateAreaText())
            ),
            f = React.default.createElement(
              module12.Text,
              {
                style: {
                  marginRight: 2,
                  fontSize: module387.default.scaledPixelForPad(13),
                  color: n.cleanHistory.titleColor,
                },
              },
              this.state.areaUnit
            ),
            h = React.default.createElement(
              module12.Text,
              {
                style: {
                  marginHorizontal: 2,
                  fontSize: 20,
                  color: n.cleanHistory.titleColor,
                },
              },
              this.generateTimeText()
            ),
            p = React.default.createElement(
              module12.Text,
              {
                style: {
                  fontSize: module387.default.scaledPixelForPad(13),
                  color: n.cleanHistory.titleColor,
                },
              },
              this.generateTimeTextUnit()
            ),
            S = React.default.createElement(
              module12.Text,
              {
                style: {
                  marginHorizontal: 2,
                  fontSize: 20,
                  color: n.cleanHistory.titleColor,
                },
              },
              this.state.obstaclesCount || 0
            ),
            V = React.default.createElement(
              module12.Text,
              {
                style: {
                  fontSize: module387.default.scaledPixelForPad(13),
                  color: n.cleanHistory.titleColor,
                },
              },
              "'"
            ),
            x = React.default.createElement(
              module12.Text,
              {
                style: {
                  marginHorizontal: 2,
                  fontSize: 20,
                  color: n.cleanHistory.titleColor,
                },
              },
              this.state.washCount
            ),
            k = React.default.createElement(
              module12.Text,
              {
                style: {
                  marginHorizontal: 2,
                  fontSize: 20,
                  color: n.cleanHistory.titleColor,
                },
              },
              this.state.washTime
            ),
            P = React.default.createElement(
              module12.Text,
              {
                style: {
                  fontSize: module387.default.scaledPixelForPad(13),
                  color: n.cleanHistory.titleColor,
                },
              },
              'min'
            ),
            R = module386.default.isStructuredLightSupported()
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
                      module491.localization_strings_CommonModules_NumberView_4
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
                        V
                      ),
                      S,
                      React.default.createElement(
                        module12.View,
                        {
                          style: {
                            opacity: globals.isRTL ? 0 : 1,
                          },
                        },
                        V
                      )
                    )
                  )
                )
              : React.default.createElement(module12.View, null),
            H =
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
                        module491.clean_history_mop_swap_time
                      ),
                      React.default.createElement(
                        module12.View,
                        {
                          style: ee.horizontalView,
                        },
                        x
                      )
                    )
                  )
                : React.default.createElement(module12.View, null),
            B =
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
                        module491.mop_cleaning_time
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
                          P
                        ),
                        k,
                        React.default.createElement(
                          module12.View,
                          {
                            style: {
                              opacity: globals.isRTL ? 0 : 1,
                            },
                          },
                          P
                        )
                      )
                    )
                  )
                : React.default.createElement(module12.View, null),
            D = module491.localization_strings_CommonModules_NumberView_2,
            F = React.default.createElement(
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
                  D
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
                    p
                  ),
                  h,
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        opacity: globals.isRTL ? 0 : 1,
                      },
                    },
                    p
                  )
                )
              )
            ),
            O = module491.localization_strings_CommonModules_NumberView_0,
            I = React.default.createElement(
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
                O
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
                  f
                ),
                u,
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      opacity: globals.isRTL ? 0 : 1,
                    },
                  },
                  f
                )
              )
            ),
            j = [module491.home_bottom_menu_global, module491.home_bottom_menu_draw_zone, module491.home_bottom_menu_select_zone][this.state.cleanType - 1],
            A = this.state.cleanMop
              ? [module491.localization_strings_Main_MainPage_3, module491.clean_method_mop, module491.localization_strings_Main_MainPage_3, module491.clean_method_mop][
                  this.state.cleanMop
                ]
              : module491.localization_strings_Main_MainPage_3,
            N = j + ' | ' + A + ' | ' + (module936.CleanStartType()[this.state.startType] || module491.localization_strings_Setting_General_index_0) + ' | ' + c + ' ';
          if (module386.default.isNewDataForCleanHistoryDetail() && this.state.dustCollectionStatus) N = N + '| ' + module491.dust_collection_status_1;
          var W = [n.cleanHistory.gradSuccessLeft, n.cleanHistory.gradSuccessRight],
            G = [n.cleanHistory.gradFailLeft, n.cleanHistory.gradFailRight],
            K = React.default.createElement(
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
                  o
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
                N
              )
            ),
            module1883 =
              module415.DMM.isV1 && !module386.default.isObaAccount()
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(
                    module12.TouchableWithoutFeedback,
                    {
                      onPress: this.onPressPlay.bind(this),
                    },
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
                        source: require('./1883'),
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
                        module491.clean_path_record_palyback,
                        ' '
                      )
                    )
                  ),
            module1876 = React.default.createElement(
              module12.View,
              {
                style: [ee.horizontalView],
              },
              globals.isRTL ? module1883 : K,
              globals.isRTL ? K : module1883
            ),
            module1884 = React.default.createElement(
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
                  source: require('./1884'),
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
                  module491.map_object_cancel_privacy_stop,
                  ' '
                )
              )
            ),
            module1885 = React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: this.onPressPause.bind(this),
              },
              React.default.createElement(
                module12.View,
                {
                  style: ee.imageStyleView,
                },
                React.default.createElement(module12.Image, {
                  style: ee.imageStyle,
                  source: require('./1885'),
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
                  module491.clean_path_record_pause,
                  ' '
                )
              )
            ),
            module1883 = React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: this.onPressPlay.bind(this),
              },
              React.default.createElement(
                module12.View,
                {
                  style: ee.imageStyleView,
                },
                React.default.createElement(module12.Image, {
                  style: ee.imageStyle,
                  source: require('./1883'),
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
                  module491.clean_path_record_play,
                  ' '
                )
              )
            ),
            module1886 = React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: this.onPressSpeed.bind(this),
              },
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
                    source: require('./1886'),
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
                  module491.clean_path_record_speed
                )
              )
            );

          if (this.state.uiStatus != J) {
            var oe = 3 == this.state.uiStatus;
            module1876 = React.default.createElement(
              module12.View,
              {
                style: [
                  ee.horizontalView,
                  {
                    marginHorizontal: 80,
                  },
                ],
              },
              globals.isRTL ? module1886 : module1884,
              oe ? module1883 : module1885,
              globals.isRTL ? module1884 : module1886
            );
          }

          this.fbParams = j + ' | ' + A;
          var le = React.default.createElement(module381.PureImageButton, {
              image: n.mopModeList.addIcon,
              onPress: this.onPressFeedbackButton,
              imageWidth: 40,
              imageHeight: 40,
              style: ee.feedbackBtnStyle,
            }),
            re = L(
              L(
                {
                  width: module12.Dimensions.get('window').width,
                  height: q,
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
                ? React.default.createElement(module1233.MapView, {
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
                    left: module1233.MapEditCommonStyles.mapLeft,
                    right: module1233.MapEditCommonStyles.mapRight,
                    top: module1233.MapEditCommonStyles.mapTop,
                    bottom: Y + 40,
                    alwaysShowFBZ: true,
                    showMapObjectDebugInfo: !module415.DMM.isV1 && this.state.mapDebugInfoVisible,
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
                    React.default.createElement(module381.Spinner, null)
                  ),
              React.default.createElement(
                module12.View,
                {
                  style: ee.textContainer,
                },
                React.default.createElement(
                  module381.GradientView,
                  {
                    colors: 1 == this.props.navigation.state.params.status ? W : G,
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 0,
                    },
                    style: ee.gradView,
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: ee.topView,
                    },
                    module1876
                  ),
                  React.default.createElement(
                    module1067.BoxShadow,
                    {
                      setting: re,
                    },
                    React.default.createElement(module12.View, {
                      style: [
                        ee.infoBackgroundView,
                        {
                          height: q,
                          backgroundColor: n.cleanHistory.infoBackgroundColor,
                        },
                      ],
                    })
                  ),
                  React.default.createElement(
                    module12.View,
                    {
                      style: ee.textContent,
                    },
                    React.default.createElement(
                      module12.View,
                      {
                        style: ee.ViewforTextStyle,
                      },
                      React.default.createElement(
                        module12.View,
                        {
                          style: [
                            ee.horizontalView,
                            {
                              width: module12.Dimensions.get('window').width,
                              height: q,
                              padding: 10,
                            },
                          ],
                        },
                        I,
                        F,
                        H,
                        R,
                        B
                      )
                    )
                  )
                )
              ),
              React.default.createElement(module1798.default, {
                style: {
                  position: 'absolute',
                  bottom: 0,
                  height: Q,
                },
                cleanArea: module387.default.getAreaUnitValue(this.generateAreaText()),
                cleanTime: l,
                ref: function (n) {
                  return (t.shareView = n);
                },
              }),
              this.showShareMaskView(),
              this.feedbackCallback && le
            ),
            React.default.createElement(module381.CancelableLoadingView, {
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
          var t = module389.deviceModel;
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
          if (module386.default.isShowCleanFinishReasonSupported()) globals.showToast(this.state.finishReasonCode);
        },
      },
      {
        key: 'getDescText',
        value: function () {
          var t = module936.CleanFinishCleanReasons()[this.state.finishReasonCode];
          return undefined == t || '' == t || t.length < 1
            ? 1 == this.props.navigation.state.params.status
              ? module491.localization_strings_Setting_History_index_16
              : module491.localization_strings_Setting_History_index_15
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
          module383.LogEventCommon('clean_path_record_playback_play');
        },
      },
      {
        key: 'onPressPause',
        value: function () {
          this.setState({
            uiStatus: 3,
          });
          if (this.mapView) this.mapView.pauseRobotAnimation();
          module383.LogEventCommon('clean_path_record_playback_pause');
        },
      },
      {
        key: 'onPressFinish',
        value: function () {
          this.setState({
            uiStatus: J,
          });
          if (this.mapView) this.mapView.stopRobotAnimation();
          module383.LogEventCommon('clean_path_record_playback_finish');
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
          module383.LogEventCommon('clean_path_record_playback_speed', {
            speed: t,
          });
        },
      },
    ]);
    return D;
  })(React.default.Component);

exports.default = module1877;
module1877.contextType = module506.AppConfigContext;
var ee = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: -module387.default.iOSAndroidReturn(44 + module936.StatusBarHeight + module936.AppBarMarginTop, (module12.StatusBar.currentHeight || 0) + 44),
  },
  contentView: {
    flex: 1,
  },
  modal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(240, 240, 240, 0.2)',
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
    alignItems: 'center',
  },
  gradView: {
    width: module12.Dimensions.get('window').width,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    flexDirection: 'column',
  },
  topView: {
    width: module12.Dimensions.get('window').width,
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
  statistics: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginLeft: 40,
    marginRight: 40,
  },
  cancelDialog: {
    flex: 0.2,
    backgroundColor: '#FFFFFF',
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  spinner: {
    marginLeft: 40,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.7)',
  },
  mapLoadingView: {
    width: 150,
    height: 150,
  },
  cancel: {
    marginRight: 20,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.7)',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'rgba(240, 240, 240, 0.8)',
    borderWidth: 1,
    borderRadius: 10,
  },
  shareButton: {
    marginRight: globals.isRTL ? 14 : null,
    marginLeft: globals.isRTL ? null : 14,
  },
  rotateButton: {
    marginLeft: globals.isRTL ? 14 : null,
    marginRight: globals.isRTL ? null : 14,
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
    width: module12.Dimensions.get('window').width,
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
    width: module12.Dimensions.get('window').width,
    opacity: 0.8,
    left: 0,
    bottom: 0,
  },
  feedbackBtnStyle: {
    position: 'absolute',
    right: 22,
    top: module387.default.isIphoneX() ? module936.StatusBarHeight + module936.AppBarHeight + 36 : module936.StatusBarHeight + module936.AppBarHeight + 12,
  },
});

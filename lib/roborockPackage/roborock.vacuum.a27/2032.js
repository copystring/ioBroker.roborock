var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module415 = require('./415'),
  module419 = require('./419'),
  module394 = require('./394'),
  module390 = require('./390'),
  module381 = require('./381'),
  module1121 = require('./1121'),
  module1268 = require('./1268'),
  module1857 = require('./1857');

require('./423');

function x() {
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

var module505 = require('./505').strings,
  module389 = require('./389'),
  V = 0,
  B = (function (t) {
    module7.default(P, t);

    var o = P,
      module1121 = x(),
      B = function () {
        var t,
          n = module11.default(o);

        if (module1121) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var o;
      module4.default(this, P);
      o = B.call(this, t);
      var n = t.navigation.state.params || {};
      o.state = {
        isSetMode: n.isSetMode,
        carpetPressurizeSwitch: false,
        titleSelected: module394.default.sharedCache().dustCollectionMode,
        loading: true,
        requestFailed: false,
        refreshing: false,
        dustCollectionSwitch: false,
      };
      return o;
    }

    module5.default(P, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.configNavibar();
                    this.props.navigation.setParams({
                      navBarBackgroundColor: this.context.theme.settingBackgroundColor,
                      hiddenBottomLine: true,
                    });
                    this.initData(false);

                  case 3:
                  case 'end':
                    return t.stop();
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
        key: 'configNavibar',
        value: function () {
          React.default.createElement(module385.PureImageButton, {
            style: I.questionButton,
            image: this.context.theme.navQuestionIcon,
            onPress: this.onNavigationGuidePress.bind(this),
            imageWidth: 40,
            imageHeight: 40,
            enabled: true,
            funcId: 'dust_collection_question',
            imageStyle: {
              resizeMode: 'contain',
              width: 24,
              height: 24,
            },
          });
          this.props.navigation.setParams({});
        },
      },
      {
        key: 'onNavigationGuidePress',
        value: function () {
          var t;

          if (module381.RSM.isCollectDustDock) {
            var o = module394.MC.serialNumber;

            if (o) {
              var n,
                l,
                s = module1857.default.sharedManager().dockSetSNPrefixes;
              if (
                ((l = false),
                s.forEach(function (t) {
                  if (o.startsWith(t)) l = true;
                }),
                l)
              )
                null == (n = this.dockDetectedGuideView) || n.next();
              if (!(null == (t = this.dockDetectedGuideView))) t.show();
            }
          }
        },
      },
      {
        key: 'getMenus',
        value: function () {
          var t = this;
          return [
            {
              title: module505.dust_collection_title_1,
              funcId: 'dust_collection_mode_1',
              bottomDetail: module505.dust_collection_desc_1,
              onPress: function () {
                return t.onChangeDustCollectionMode(module389.DustCollectionModeSettingMap.DustCollectionModeSmart);
              },
              visible: module390.default.isDustCollectionSettingSupported(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.DustCollectionModeSettingMap.DustCollectionModeSmart,
              shouldShowRightArrow: this.state.titleSelected == module389.DustCollectionModeSettingMap.DustCollectionModeSmart,
            },
            {
              title: module505.dust_collection_title_2,
              funcId: 'dust_collection_mode_2',
              bottomDetail: module505.dust_collection_desc_2,
              onPress: function () {
                return t.onChangeDustCollectionMode(module389.DustCollectionModeSettingMap.DustCollectionModeQuick);
              },
              visible: module390.default.isDustCollectionSettingSupported(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.DustCollectionModeSettingMap.DustCollectionModeQuick,
              shouldShowRightArrow: this.state.titleSelected == module389.DustCollectionModeSettingMap.DustCollectionModeQuick,
            },
            {
              title: module505.dust_collection_title_3,
              funcId: 'dust_collection_mode_3',
              bottomDetail: module505.dust_collection_desc_3,
              onPress: function () {
                return t.onChangeDustCollectionMode(module389.DustCollectionModeSettingMap.DustCollectionModeDaily);
              },
              visible: module390.default.isDustCollectionSettingSupported(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.DustCollectionModeSettingMap.DustCollectionModeDaily,
              shouldShowRightArrow: this.state.titleSelected == module389.DustCollectionModeSettingMap.DustCollectionModeDaily,
            },
            {
              title: module505.localization_strings_Common_Protocol_2,
              funcId: 'dust_collection_mode_4',
              bottomDetail: module505.dust_collection_desc_4,
              onPress: function () {
                return t.onChangeDustCollectionMode(module389.DustCollectionModeSettingMap.DustCollectionModeStrong);
              },
              visible: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.DustCollectionModeSettingMap.DustCollectionModeStrong,
              shouldShowRightArrow: this.state.titleSelected == module389.DustCollectionModeSettingMap.DustCollectionModeStrong,
            },
            {
              title: module505.dust_collection_title_5,
              funcId: 'dust_collection_mode_5',
              bottomDetail: module505.dust_collection_desc_5,
              onPress: function () {
                return t.onChangeDustCollectionMode(module389.DustCollectionModeSettingMap.DustCollectionModeMax);
              },
              visible: module390.default.isDustCollectionSettingSupported(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: false,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.DustCollectionModeSettingMap.DustCollectionModeMax,
              shouldShowRightArrow: this.state.titleSelected == module389.DustCollectionModeSettingMap.DustCollectionModeMax,
            },
          ];
        },
      },
      {
        key: 'getTopMenus',
        value: function () {
          return [
            {
              title: module505.dust_collection_title,
              funcId: 'setting_page_dust_collection',
              bottomDetail: this.state.dustCollectionSwitch ? module505.dust_collection_info : module505.dust_collection_info_close,
              shouldShowSwitch: true,
              switchOn: this.state.dustCollectionSwitch,
              switchValueChanged: this._onDustCollectionValueChanged.bind(this),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: false,
              visible: true,
              shouldShowBottomLongLine: false,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            l = React.default.createElement(module385.RequestRetryView, {
              onPressButton: function () {
                V = 0;
                t.initData(false);
              },
            });
          if (this.state.requestFailed) return l;
          var s = React.default.createElement(
            module12.View,
            {
              style: [
                I.containterView,
                {
                  backgroundColor: o.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ],
            },
            React.default.createElement(module385.Spinner, null)
          );
          if (this.state.loading) return s;
          var c = this.getTopMenus().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: o,
                        bottomDetailWidth: module12.Dimensions.get('window').width - 70,
                        titleColor: 'rgba(0,0,0,0.8)',
                        style: {
                          width: module12.Dimensions.get('window').width - 30,
                        },
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: I.sectionTitle,
                        key: o,
                      },
                      t.sectionTitle
                    )
                : null;
            }),
            module1989 = this.getMenus().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: o,
                        fontSize: 16,
                        rightImgStyle: I.rightImgStyle,
                        bottomDetailWidth: module12.Dimensions.get('window').width - 90,
                        rightCenter: false,
                        isDetailCenter: false,
                        rightSrc: require('./1989'),
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: I.sectionTitle,
                        key: o,
                      },
                      t.sectionTitle
                    )
                : null;
            }),
            h = React.default.createElement(
              module12.View,
              null,
              React.default.createElement(
                module12.View,
                {
                  style: {
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginHorizontal: 15,
                  },
                },
                c
              ),
              this.state.dustCollectionSwitch &&
                module390.default.isDustCollectionSettingSupported() &&
                React.default.createElement(
                  module12.View,
                  {
                    style: I.infoTextView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        I.infoText,
                        {
                          color: this.context.theme.settingListItem.detailColor,
                        },
                      ],
                    },
                    module505.dust_collection_desc_title
                  )
                )
            );
          return React.default.createElement(
            module12.View,
            {
              style: [
                I.containter,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: I.containterScroll,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module12.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    V = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(module12.View, {
                style: I.section,
              }),
              !this.state.isSetMode && h,
              React.default.createElement(
                module12.View,
                {
                  style: {
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginHorizontal: 15,
                  },
                },
                this.state.dustCollectionSwitch && module390.default.isDustCollectionSettingSupported() && module1989
              )
            ),
            React.default.createElement(module1268.default, {
              ref: function (o) {
                t.dockDetectedGuideView = o;
              },
              isModal: true,
              groups: [
                {
                  bgImage: o.guideImages.dockGuide0,
                  topTitle: module505.dock_guide_title,
                  context: module505.dock_guide_content_0,
                  buttonInfo: [module505.next_step],
                  buttonFuncId: ['dock_detect_guide_0_ok'],
                  onPressSingleButton: function () {
                    t.dockDetectedGuideView.next();
                  },
                },
                {
                  bgImage: o.guideImages.dockGuide1,
                  topTitle: module505.dock_guide_title,
                  context: module505.dock_guide_content_1,
                  buttonInfo: [module505.localization_strings_Setting_RemoteControlPage_51],
                  buttonFuncId: ['dock_detect_guide_1_ok'],
                  onPressSingleButton: function () {
                    t.dockDetectedGuideView.dismissModalView();
                  },
                },
              ],
            })
          );
        },
      },
      {
        key: 'initData',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.setState({
                      loading: !t,
                      requestFailed: false,
                      refreshing: t,
                    });
                    o.prev = 1;
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(this.getDustCollectionStatus());

                  case 4:
                    if (!module390.default.isDustCollectionSettingSupported()) {
                      o.next = 7;
                      break;
                    }

                    o.next = 7;
                    return regeneratorRuntime.default.awrap(this.getDustCollectionModeStatus());

                  case 7:
                    this.setState({
                      refreshing: false,
                    });
                    this.finishLoading(false);
                    V = 0;
                    o.next = 16;
                    break;

                  case 12:
                    o.prev = 12;
                    o.t0 = o.catch(1);
                    console.log('initData - ' + JSON.stringify(o.t0));
                    this.retry(t);

                  case 16:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[1, 12]],
            Promise
          );
        },
      },
      {
        key: 'retry',
        value: function (t) {
          var o = this;

          if (V < 3) {
            V++;
            setTimeout(function () {
              console.warn('retryTimes:' + V);
              o.initData(t);
            }, 1e3);
          } else
            this.setState({
              requestFailed: true,
            });
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          this.setState({
            requestFailed: t,
          });
          if (this.state.loading)
            this.setState({
              loading: false,
            });
        },
      },
      {
        key: 'onChangeDustCollectionMode',
        value: function (t) {
          var o, n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    o = this.state.mode;
                    this.setState({
                      titleSelected: t,
                    });
                    module12.DeviceEventEmitter.emit(module419.NotificationKeys.SelfCleaningSetDidChange, {
                      name: 'dustCollectionMode',
                      mode: t,
                    });
                    s.prev = 3;
                    s.next = 6;
                    return regeneratorRuntime.default.awrap(module415.default.setDustCollectionMode(t));

                  case 6:
                    n = s.sent;
                    module394.default.sharedCache().dustCollectionMode = t;
                    console.log('onChangeDustCollectionMode: ' + JSON.stringify(n));
                    s.next = 16;
                    break;

                  case 11:
                    s.prev = 11;
                    s.t0 = s.catch(3);
                    globals.showToast(module505.robot_communication_exception);
                    this.setState({
                      titleSelected: o,
                    });
                    console.log(s.t0);

                  case 16:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[3, 11]],
            Promise
          );
        },
      },
      {
        key: 'getDustCollectionModeStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getDustCollectionMode());

                  case 3:
                    t = o.sent;
                    console.log('getDustCollectionModeStatus: ' + JSON.stringify(t));
                    this.setState({
                      titleSelected: t.result.mode,
                    });
                    o.next = 12;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    globals.showToast(module505.robot_communication_exception);
                    console.log(o.t0);

                  case 12:
                  case 'end':
                    return o.stop();
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
        key: 'getDustCollectionStatus',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getDustCollectionStatus());

                  case 3:
                    t = n.sent;
                    console.log('getDustCollectionModeStatus - ' + JSON.stringify(t));
                    o = t.result.status;
                    this.setState({
                      dustCollectionSwitch: 1 == o,
                    });
                    n.next = 13;
                    break;

                  case 9:
                    n.prev = 9;
                    n.t0 = n.catch(0);
                    console.log(n.t0);
                    this.setState({
                      dustCollectionVisible: false,
                    });

                  case 13:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[0, 9]],
            Promise
          );
        },
      },
      {
        key: '_onDustCollectionValueChanged',
        value: function (t) {
          var o;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    console.log('_onDustCollectionValueChanged Switch - ' + t);
                    this.setState({
                      dustCollectionSwitch: t,
                    });
                    n.prev = 2;
                    n.next = 5;
                    return regeneratorRuntime.default.awrap(module415.default.setDustCollectionStatus(t ? 1 : 0));

                  case 5:
                    o = n.sent;
                    console.log('_onDustCollectionValueChanged - ' + JSON.stringify(o));
                    n.next = 14;
                    break;

                  case 9:
                    n.prev = 9;
                    n.t0 = n.catch(2);
                    this.setState({
                      dustCollectionSwitch: !t,
                    });
                    globals.showToast(module505.robot_communication_exception);
                    console.log(n.t0);

                  case 14:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[2, 9]],
            Promise
          );
        },
      },
    ]);
    return P;
  })(React.Component);

exports.default = B;
B.contextType = module1121.AppConfigContext;
var I = module12.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containterScroll: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 65,
  },
  infoTextView: {
    backgroundColor: 'transparent',
  },
  infoText: {
    color: 'rgba(0,0,0,0.3)',
    fontSize: 16,
    marginHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  rightImgStyle: {
    width: 22,
    height: 22,
    marginTop: -5,
    transform: [],
  },
  ignoreCarpetStyle: {
    position: 'absolute',
    minWidth: 0,
    minHeight: 0,
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 30,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
  },
  section: {
    paddingVertical: 7,
  },
  questionButton: {
    marginLeft: 14,
    marginRight: 14,
    alignSelf: 'center',
  },
});

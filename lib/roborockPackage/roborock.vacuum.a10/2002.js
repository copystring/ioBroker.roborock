require('./411');

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = b(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module407 = require('./407'),
  module390 = b(require('./390')),
  module386 = require('./386'),
  module377 = require('./377'),
  module506 = require('./506'),
  module1806 = require('./1806'),
  module1808 = require('./1808');

function k(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (k = function (t) {
    return t ? n : o;
  })(t);
}

function b(t, o) {
  if (!o && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var n = k(o);
  if (n && n.has(t)) return n.get(t);
  var l = {},
    s = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var c in t)
    if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
      var u = s ? Object.getOwnPropertyDescriptor(t, c) : null;
      if (u && (u.get || u.set)) Object.defineProperty(l, c, u);
      else l[c] = t[c];
    }

  l.default = t;
  if (n) n.set(t, l);
  return l;
}

function x() {
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
  module385 = require('./385'),
  P = 0,
  V = (function (t) {
    module7.default(V, t);

    var module506 = V,
      k = x(),
      b = function () {
        var t,
          o = module11.default(module506);

        if (k) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function V(t) {
      var o;
      module4.default(this, V);
      (o = b.call(this, t)).state = {
        carpetPressurizeSwitch: false,
        titleSelected: module390.default.sharedCache().dustCollectionMode,
        loading: true,
        requestFailed: false,
        refreshing: false,
        dustCollectionSwitch: false,
      };
      return o;
    }

    module5.default(V, [
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
                    this.initData(false);

                  case 2:
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
          var t = React.default.createElement(module381.PureImageButton, {
            style: I.questionButton,
            image: this.context.theme.navQuestionIcon,
            onPress: this.onNavigationGuidePress.bind(this),
            imageWidth: 40,
            imageHeight: 40,
            enabled: true,
            imageStyle: {
              resizeMode: 'contain',
              width: 24,
              height: 24,
            },
          });
          this.props.navigation.setParams({
            title: module491.dust_collection_setting_title,
            rightItems: [t],
          });
        },
      },
      {
        key: 'onNavigationGuidePress',
        value: function () {
          var t;

          if (module377.RSM.isO1Dock()) {
            var o = module390.MC.serialNumber;

            if (o) {
              var n,
                l,
                s = module1808.default.sharedManager().dockSetSNPrefixes;
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
              title: module491.dust_collection_title_1,
              funcId: 'dust_collection_mode_1',
              bottomDetail: module491.dust_collection_desc_1,
              onPress: function () {
                return t.onChangeDustCollectionMode(module385.DustCollectionModeSettingMap.DustCollectionModeSmart);
              },
              visible: module386.default.isDustCollectionSettingSupported(),
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module385.DustCollectionModeSettingMap.DustCollectionModeSmart,
              shouldShowRightArrow: this.state.titleSelected == module385.DustCollectionModeSettingMap.DustCollectionModeSmart,
            },
            {
              title: module491.dust_collection_title_2,
              funcId: 'dust_collection_mode_2',
              bottomDetail: module491.dust_collection_desc_2,
              onPress: function () {
                return t.onChangeDustCollectionMode(module385.DustCollectionModeSettingMap.DustCollectionModeQuick);
              },
              visible: module386.default.isDustCollectionSettingSupported(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module385.DustCollectionModeSettingMap.DustCollectionModeQuick,
              shouldShowRightArrow: this.state.titleSelected == module385.DustCollectionModeSettingMap.DustCollectionModeQuick,
            },
            {
              title: module491.dust_collection_title_3,
              funcId: 'dust_collection_mode_3',
              bottomDetail: module491.dust_collection_desc_3,
              onPress: function () {
                return t.onChangeDustCollectionMode(module385.DustCollectionModeSettingMap.DustCollectionModeDaily);
              },
              visible: module386.default.isDustCollectionSettingSupported(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module385.DustCollectionModeSettingMap.DustCollectionModeDaily,
              shouldShowRightArrow: this.state.titleSelected == module385.DustCollectionModeSettingMap.DustCollectionModeDaily,
            },
            {
              title: module491.localization_strings_Common_Protocol_2,
              funcId: 'dust_collection_mode_4',
              bottomDetail: module491.dust_collection_desc_4,
              onPress: function () {
                return t.onChangeDustCollectionMode(module385.DustCollectionModeSettingMap.DustCollectionModeStrong);
              },
              visible: false,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module385.DustCollectionModeSettingMap.DustCollectionModeStrong,
              shouldShowRightArrow: this.state.titleSelected == module385.DustCollectionModeSettingMap.DustCollectionModeStrong,
            },
            {
              title: module491.dust_collection_title_5,
              funcId: 'dust_collection_mode_5',
              bottomDetail: module491.dust_collection_desc_5,
              onPress: function () {
                return t.onChangeDustCollectionMode(module385.DustCollectionModeSettingMap.DustCollectionModeMax);
              },
              visible: module386.default.isDustCollectionSettingSupported(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: true,
              selected: this.state.titleSelected == module385.DustCollectionModeSettingMap.DustCollectionModeMax,
              shouldShowRightArrow: this.state.titleSelected == module385.DustCollectionModeSettingMap.DustCollectionModeMax,
            },
          ];
        },
      },
      {
        key: 'getTopMenus',
        value: function () {
          return [
            {
              title: module491.dust_collection_title,
              funcId: 'setting_page_dust_collection',
              bottomDetail: this.state.dustCollectionSwitch ? module491.dust_collection_info : module491.dust_collection_info_close,
              shouldShowSwitch: true,
              switchOn: this.state.dustCollectionSwitch,
              switchValueChanged: this._onDustCollectionValueChanged.bind(this),
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              visible: true,
              shouldShowBottomLongLine: true,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            l = React.default.createElement(module381.RequestRetryView, {
              onPressButton: function () {
                P = 0;
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
            React.default.createElement(module381.Spinner, null)
          );
          if (this.state.loading) return s;
          var c = this.getTopMenus().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module381.SettingListItemView,
                      module21.default({}, t, {
                        key: o,
                        titleColor: 'rgba(0,0,0,0.8)',
                        style: {
                          width: module12.Dimensions.get('window').width,
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
            module1965 = this.getMenus().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module381.SettingListItemView,
                      module21.default({}, t, {
                        key: o,
                        fontSize: 16,
                        rightImgStyle: I.rightImgStyle,
                        bottomDetailWidth: module12.Dimensions.get('window').width - 60,
                        rightCenter: false,
                        isDetailCenter: false,
                        rightSrc: require('./1965'),
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
            });
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
                    P = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(module12.View, {
                style: I.section,
              }),
              c,
              this.state.dustCollectionSwitch &&
                module386.default.isDustCollectionSettingSupported() &&
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
                    module491.dust_collection_desc_title
                  )
                ),
              this.state.dustCollectionSwitch && module386.default.isDustCollectionSettingSupported() && module1965
            ),
            React.default.createElement(module1806.default, {
              ref: function (o) {
                t.dockDetectedGuideView = o;
              },
              isModal: true,
              groups: [
                {
                  bgImage: o.guideImages.dockGuide0,
                  topTitle: module491.dock_guide_title,
                  context: module491.dock_guide_content_0,
                  buttonInfo: [module491.next_step],
                  buttonFuncId: ['dock_detect_guide_0_ok'],
                  onPressSingleButton: function () {
                    t.dockDetectedGuideView.next();
                  },
                },
                {
                  bgImage: o.guideImages.dockGuide1,
                  topTitle: module491.dock_guide_title,
                  context: module491.dock_guide_content_1,
                  buttonInfo: [module491.localization_strings_Setting_RemoteControlPage_51],
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.setState({
                      loading: !t,
                      requestFailed: false,
                      refreshing: t,
                    });
                    n.prev = 1;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(this.getDustCollectionStatus());

                  case 4:
                    if (!module386.default.isDustCollectionSettingSupported()) {
                      n.next = 7;
                      break;
                    }

                    n.next = 7;
                    return regeneratorRuntime.default.awrap(this.getDustCollectionModeStatus());

                  case 7:
                    this.setState({
                      refreshing: false,
                    });
                    this.finishLoading(false);
                    P = 0;
                    n.next = 16;
                    break;

                  case 12:
                    n.prev = 12;
                    n.t0 = n.catch(1);
                    console.log('initData - ' + JSON.stringify(n.t0));
                    this.retry(t);

                  case 16:
                  case 'end':
                    return n.stop();
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

          if (P < 3) {
            P++;
            setTimeout(function () {
              console.warn('retryTimes:' + P);
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
          var module21, l;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    module21 = this.state.mode;
                    this.setState({
                      titleSelected: t,
                    });
                    s.prev = 2;
                    s.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.setDustCollectionMode(t));

                  case 5:
                    l = s.sent;
                    module390.default.sharedCache().dustCollectionMode = t;
                    console.log('onChangeDustCollectionMode: ' + JSON.stringify(l));
                    s.next = 15;
                    break;

                  case 10:
                    s.prev = 10;
                    s.t0 = s.catch(2);
                    globals.showToast(module491.robot_communication_exception);
                    this.setState({
                      titleSelected: module21,
                    });
                    console.log(s.t0);

                  case 15:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[2, 10]],
            Promise
          );
        },
      },
      {
        key: 'getDustCollectionModeStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getDustCollectionMode());

                  case 3:
                    t = n.sent;
                    console.log('getDustCollectionModeStatus: ' + JSON.stringify(t));
                    this.setState({
                      titleSelected: t.result.mode,
                    });
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module491.robot_communication_exception);
                    console.log(n.t0);

                  case 12:
                  case 'end':
                    return n.stop();
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
          var t, n;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getDustCollectionStatus());

                  case 3:
                    t = l.sent;
                    console.log('getDustCollectionModeStatus - ' + JSON.stringify(t));
                    n = t.result.status;
                    this.setState({
                      dustCollectionSwitch: 1 == n,
                    });
                    l.next = 13;
                    break;

                  case 9:
                    l.prev = 9;
                    l.t0 = l.catch(0);
                    console.log(l.t0);
                    this.setState({
                      dustCollectionVisible: false,
                    });

                  case 13:
                  case 'end':
                    return l.stop();
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
          var n;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    console.log('_onDustCollectionValueChanged Switch - ' + t);
                    this.setState({
                      dustCollectionSwitch: t,
                    });
                    l.prev = 2;
                    l.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.setDustCollectionStatus(t ? 1 : 0));

                  case 5:
                    n = l.sent;
                    console.log('_onDustCollectionValueChanged - ' + JSON.stringify(n));
                    l.next = 14;
                    break;

                  case 9:
                    l.prev = 9;
                    l.t0 = l.catch(2);
                    this.setState({
                      dustCollectionSwitch: !t,
                    });
                    globals.showToast(module491.robot_communication_exception);
                    console.log(l.t0);

                  case 14:
                  case 'end':
                    return l.stop();
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
    return V;
  })(React.Component);

exports.default = V;
V.contextType = module506.AppConfigContext;
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
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
  },
  rightImgStyle: {
    width: 22,
    height: 22,
    marginTop: -5,
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

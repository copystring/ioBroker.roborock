require('./407');

require('./1926');

require('./1931');

require('./390');

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
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
    var o = B(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = s ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, u, c);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module387 = require('./387'),
  module381 = require('./381'),
  module377 = require('./377'),
  module386 = require('./386'),
  module1363 = require('./1363'),
  module506 = require('./506'),
  module415 = require('./415'),
  module383 = require('./383'),
  module507 = require('./507'),
  module1261 = require('./1261');

function B(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (B = function (t) {
    return t ? o : n;
  })(t);
}

function k() {
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

require('./936');

require('./1867');

var module389 = require('./389'),
  module491 = require('./491').strings,
  x = (function (t) {
    module7.default(F, t);

    var module506 = F,
      B = k(),
      module1932 = function () {
        var t,
          n = module11.default(module506);

        if (B) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function F(t) {
      var n;
      module4.default(this, F);
      (n = module1932.call(this, t)).mounted = false;

      n.changeListener = function () {
        if (n.mounted) n.forceUpdate();
      };

      n.animatedWrapMarginBottom = new module12.Animated.Value(-500);
      return n;
    }

    module5.default(F, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          if (this.props.navigation.state.params && this.props.navigation.state.params.isMonitorPage)
            globals.app.state.theme == module507.Themes.dark
              ? (module12.StatusBar.setBarStyle('light-content'), 'android' == module12.Platform.OS && module12.StatusBar.setBackgroundColor('transparent', false))
              : (module12.StatusBar.setBarStyle('dark-content'), 'android' == module12.Platform.OS && module12.StatusBar.setBackgroundColor('transparent', false));
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.mounted = false;
          module1363.default.removeChangeListener(this.changeListener);

          if (this.props.navigation.state.params && this.props.navigation.state.params.isMonitorPage) {
            module12.StatusBar.setBarStyle('light-content');
            if ('android' == module12.Platform.OS) module12.StatusBar.setBackgroundColor('black', false);
          }
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.mounted = true;
          module1363.default.getCameraStatus();
          this.props.navigation.setParams({
            title: module491.camera_setting_title,
          });
          module1363.default.addChangeListener(this.changeListener);
        },
      },
      {
        key: 'getMenus',
        value: function () {
          module387.default.ScreenWidth;
          var t = this,
            n = this.context.theme.settingListItem.disableColor;
          return [
            {
              title: module491.camera_setting_rrai_title,
              detail: module1363.default.cameraEnabled ? module491.setting_camera_on : module491.setting_camera_off,
              bottomDetail: module491.camera_setting_rrai_detail,
              isDetailCenter: false,
              rightCenter: true,
              detailColor: module1363.default.cameraEnabled ? '#007AFF' : n,
              funcId: 'camera_setting_rrai',
              onPress: function () {
                return t.props.navigation.navigate('CameraSettingDetail', {
                  mode: 0,
                });
              },
              visible: true,
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
            },
            {
              title: module491.robot_setting_exploration_mode_title,
              detail: module1363.default.explorationEnabled ? module491.setting_camera_on : module491.setting_camera_off,
              bottomDetail: module491.robot_setting_exploration_mode_detail,
              isDetailCenter: false,
              rightCenter: true,
              detailColor: module1363.default.explorationEnabled ? '#007AFF' : n,
              funcId: 'camera_setting_exploration',
              onPress: function () {
                return t.props.navigation.navigate('CameraSettingDetail', {
                  mode: 1,
                });
              },
              visible: module386.default.isExplorationFuncSupported(),
              shouldShowBottomLongLine: true,
            },
            {
              title: module491.obstacle_pop_type_photo,
              detail: module1363.default.mapObjectPhotoEnabled ? module491.setting_camera_on : module491.setting_camera_off,
              bottomDetail: module491.map_object_enable_intro_short,
              isDetailCenter: false,
              rightCenter: true,
              detailColor: module1363.default.mapObjectPhotoEnabled ? '#007AFF' : n,
              visible: module386.default.isFwFilterObstacleSupported(),
              funcId: 'camera_setting_real_things_photo',
              onPress: function () {
                return t.props.navigation.navigate('CameraSettingDetail', {
                  mode: 3,
                });
              },
              shouldShowBottomLine: true,
            },
            {
              title: module491.camera_setting_pet_mode_title,
              visible: module1363.default.cameraEnabled,
              shouldShowBottomLongLine: true,
              shouldShowBottomLongLine: true,
              isDetailCenter: false,
              rightCenter: true,
              detailColor: module1363.default.cameraEnabled ? '#007AFF' : n,
              detail: module1363.default.petModeEnabled ? module491.has_or_no_has : module491.has_or_no_no,
              bottomDetail: module491.if_has_pet_tip_detail,
              funcId: 'camera_setting_pet_mode',
              onPress: function () {
                console.log('onPress pet - ', module377.RSM.isRunning);
                if (module377.RSM.isRunning)
                  module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                    globals.showToast(module491.robot_communication_exception);
                  });
                else t.setPetDia();
              },
            },
            {
              visible: true,
            },
            {
              title: module491.setting_realtime_monitor_switch_title,
              detail: module1363.default.realTimeMonitorEnabled ? module491.setting_camera_on : module491.setting_camera_off,
              bottomDetail: module491.setting_realtime_monitor_switch_desc,
              isDetailCenter: false,
              rightCenter: true,
              detailColor: module1363.default.realTimeMonitorEnabled ? '#007AFF' : n,
              visible:
                module386.default.isVideoMonitorSupported() &&
                !module387.default.isShareUser() &&
                !module389.isMiApp &&
                (module415.DMM.isTanosV || module415.DMM.isTopazSV || module415.DMM.isTanosSV),
              funcId: 'camera_setting_real_time_monitor',
              onPress: function () {
                return t.props.navigation.navigate('CameraSettingDetail', {
                  mode: 2,
                  isMonitorPage: t.props.navigation.state.params.isMonitorPage,
                });
              },
              shouldShowTopLongLine: true,
              shouldShowBottomLongLine: true,
            },
          ];
        },
      },
      {
        key: 'setPetDia',
        value: function () {
          if (this.actionSheet) this.actionSheet.show();
        },
      },
      {
        key: 'hidePetDiaView',
        value: function () {
          if (this.actionSheet) this.actionSheet.hide();
        },
      },
      {
        key: 'petModeDidChange',
        value: function (t) {
          var module21;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    this.hidePetDiaView();
                    module21 = 0 == t;
                    l.next = 4;
                    return regeneratorRuntime.default.awrap(module1363.default.updatePetModeEnabled(module21));

                  case 4:
                    module383.LogEventStatus('pet_mode_status', {
                      enabled: module21,
                    });

                  case 5:
                  case 'end':
                    return l.stop();
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
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            l = this.getMenus().map(function (t, n) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module381.SettingListItemView,
                      module21.default({}, t, {
                        key: n,
                        fontSize: 16,
                        titleColor: 'rgba(0,0,0,0.8)',
                      })
                    )
                  : React.default.createElement(module12.View, {
                      style: O.section,
                      key: n,
                    })
                : null;
            }),
            s = React.default.createElement(module381.ActionSheetView, {
              ref: function (n) {
                return (t.actionSheet = n);
              },
              title: module491.if_has_pet_tip_title,
              actions: [module491.has_or_no_has, module491.has_or_no_no],
              didSelectRow: this.petModeDidChange.bind(this),
              onPressCancel: function () {
                return t.actionSheet.hide();
              },
            });
          return React.default.createElement(
            module12.View,
            {
              style: [
                O.containter,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              null,
              React.default.createElement(
                module12.View,
                {
                  style: [
                    O.top,
                    {
                      backgroundColor: n.componentBackgroundColor,
                    },
                  ],
                },
                React.default.createElement(module381.TopImageButton, {
                  style: O.indicatorButton,
                  image: require('./1932'),
                  title:
                    module491.setting_camera_title +
                    ':' +
                    (module1363.default.cameraEnabled || module1363.default.realTimeMonitorEnabled ? module491.setting_camera_on : module491.setting_camera_off),
                  imageWidth: 75,
                  imageHeight: 75,
                  fontSize: 14,
                  textColor: n.settingListItem.titleColor,
                })
              ),
              l
            ),
            s
          );
        },
      },
    ]);
    return F;
  })(React.Component);

exports.default = x;
x.contextType = module506.AppConfigContext;
var O = module12.StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  indicatorButton: {
    width: 150,
    height: 110,
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginVertical: 20,
  },
  section: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#888888',
  },
  modal: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});

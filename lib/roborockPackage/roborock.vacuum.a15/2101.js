var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module381 = require('./381'),
  module391 = require('./391'),
  module390 = require('./390'),
  module1121 = require('./1121'),
  module423 = require('./423'),
  module2089 = require('./2089');

function I() {
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

var module393 = require('./393');

require('./505').strings;
exports.FuncTabBackgroundHeight = 50;
exports.PortraitActionRemote = 'monitor_tab_remote';
exports.PortraitActionRecord = 'monitor_tab_record';
exports.PortraitActionShortcut = 'monitor_tab_shortcut';
exports.PortraitActionCall = 'monitor_tab_call';

var C = (function (t) {
  module7.default(C, t);

  var o = C,
    module391 = I(),
    v = function () {
      var t,
        n = module11.default(o);

      if (module391) {
        var c = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, c);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function C(t) {
    var o;
    module4.default(this, C);
    (o = v.call(this, t)).state = {};
    return o;
  }

  module5.default(C, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          o = this.context.theme,
          n = this.props,
          c = n.isRemoteActive,
          u = n.isScreenCasting,
          l = n.isLiveCall,
          s = n.stopScreenCast,
          b = n.isMonitoring,
          p = this.tabItems.map(function (o) {
            var n = ('monitor_tab_call' == o.action && l) || ('monitor_tab_remote' == o.action && c);
            if (u && 'monitor_tab_record' == o.action)
              return React.default.createElement(module2089.default, {
                onPress: function () {
                  return s();
                },
                didExceedLimitedDuration: function () {
                  return s(true);
                },
              });
            var h = (('monitor_tab_record' == o.action || 'monitor_tab_shortcut' == o.action) && b) || ('monitor_tab_record' != o.action && 'monitor_tab_shortcut' != o.action);
            return React.default.createElement(module385.PureImageButton, {
              funcId: o.action,
              enabled: h,
              onPress: t.selectItem.bind(t, o.action),
              image: (n ? o.selectedIcon : o.icon) || o.icon,
              imageWidth: 30,
              imageHeight: 30,
              style:
                'monitor_tab_record' == o.action
                  ? {
                      width: 50,
                    }
                  : {},
            });
          });
        return React.default.createElement(
          module12.ImageBackground,
          {
            style: [P.containter, this.props.style],
            source: o.monitor.funcTabMenu,
          },
          p
        );
      },
    },
    {
      key: 'selectItem',
      value: function (t) {
        var o;
        if (!(null == (o = this.props))) o.didSelectItem(t);
      },
    },
    {
      key: 'isRecordAndShortcutSupported',
      get: function () {
        return (module423.DMM.isTopazSV_CN || module423.DMM.isCoral) && 'cn' == module381.RSM.countryCode && 'cn' == module381.RSM.deviceLocation;
      },
    },
    {
      key: 'tabItems',
      get: function () {
        var t = this.context.theme.monitor,
          o = {
            icon: t.tabRemoteIcon,
            selectedIcon: t.tabRemoteSelectedIcon,
            action: 'monitor_tab_remote',
          },
          n = {
            icon: t.tabRecordIcon,
            action: 'monitor_tab_record',
          },
          c = {
            icon: t.tabShotcutIcon,
            action: 'monitor_tab_shortcut',
          },
          u = {
            icon: t.tabCallIcon,
            selectedIcon: t.tabCallSelectedIcon,
            action: 'monitor_tab_call',
          };
        return module390.default.isRecordAllowed() && module393.isRecordSupported() ? (this.isRecordAndShortcutSupported ? [u, c, n, o] : [u, o]) : [o];
      },
    },
  ]);
  return C;
})(React.Component);

exports.PortraitActionMenu = C;
C.contextType = module1121.AppConfigContext;
var P = module12.StyleSheet.create({
  containter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
  },
  item: {
    alignSelf: 'center',
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: module391.default.scaledPixel(14),
  },
  point: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#007AFF',
  },
  indicatorLine: {
    position: 'absolute',
    alignSelf: 'center',
    height: 2,
    width: 28,
    bottom: 0,
  },
});

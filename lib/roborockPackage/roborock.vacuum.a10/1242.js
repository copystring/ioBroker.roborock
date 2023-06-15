var module4 = require('./4'),
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

    var o = _(n);

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
  module381 = require('./381'),
  module411 = require('./411'),
  module1229 = require('./1229'),
  module377 = require('./377'),
  module383 = require('./383'),
  module1243 = require('./1243');

function _(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (_ = function (t) {
    return t ? o : n;
  })(t);
}

function R() {
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
  k = {
    Default: 0,
    SaveNewMapInSingleFloor: 1,
    SingleFloorWithoutSave: 2,
    KeepMap: 3,
  };

exports.MapSaveActionSheetMode = k;

var P = (function (t) {
  module7.default(F, t);

  var _ = F,
    P = R(),
    b = function () {
      var t,
        n = module11.default(_);

      if (P) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function F(t) {
    var o;
    module4.default(this, F);
    (o = b.call(this, t)).mode = t.mode;
    o.isHiddenSaveAction = false;
    o.state = {
      maps: o.getMapItems(),
    };
    return o;
  }

  module5.default(F, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        if (this.multiMapslistener) this.multiMapslistener.remove();
      },
    },
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        this.multiMapslistener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (n) {
          if (n.data == module411.EventKeys.MultiMapsDidReceive) {
            t.setState({
              maps: t.getMapItems(),
            });
            console.log('multiMapslistener - ' + JSON.stringify(module1229.MM.maps));
          }
        });
      },
    },
    {
      key: 'getMapItems',
      value: function () {
        var t = {
          name: module491.map_save_pop_box_new_map,
          id: -1,
        };

        switch (((this.isHiddenSaveAction = module1229.MM.maps.length >= module1229.MM.mapCountMax), this.mode)) {
          case k.SingleFloorWithoutSave:
            return module1229.MM.maps;

          case k.SaveNewMapInSingleFloor:
            return [t].concat(module1229.MM.maps);

          case k.KeepMap:
            return module1229.MM.maps;

          case k.Default:
          default:
            return this.isHiddenSaveAction ? module1229.MM.maps : [t].concat(module1229.MM.maps);
        }
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.state.maps.map(function (n, o) {
            var l = t.props.actionPrefix
              ? module1243.FloorMapPageUtils.getRealName(n.name)
              : module491.soundpackage_update + ' ' + module1243.FloorMapPageUtils.getRealName(n.name);
            return o > 0 ? l : t.isHiddenSaveAction ? l : module1243.FloorMapPageUtils.getRealName(n.name);
          });

        switch (this.mode) {
          case k.SaveNewMapInSingleFloor:
            n = this.state.maps.map(function (t, n) {
              return 0 == n ? module1243.FloorMapPageUtils.getRealName(t.name) : module491.soundpackage_update + ' ' + module1243.FloorMapPageUtils.getRealName(t.name);
            });
        }

        var o = this.mode == k.KeepMap ? module491.save_map_pop_box_save_title2 : null;
        return React.default.createElement(module381.ActionSheetView, {
          ref: function (n) {
            return (t.actionSheet = n);
          },
          title: o,
          actions: n,
          didSelectRow: this.didSelectRow.bind(this),
          onPressCancel: function () {
            module383.LogEventCommon('map_save_action_sheet_cancel');
            t.actionSheet.hide();
          },
        });
      },
    },
    {
      key: 'mapActionSheetEnabledAdapter',
      value: function (t) {
        var n =
          (module1229.MM.maps.length <= module1229.MM.mapCountMax && -1 == module377.RSM.currentMapId && module377.RSM.multiFloorEnabled) ||
          (!module377.RSM.multiFloorEnabled && 0 == module1229.MM.maps.length);
        return 0 == t ? !this.props.actionPrefix && n : module1229.MM.maps.length >= 1;
      },
    },
    {
      key: 'didSelectRow',
      value: function (t) {
        var n = this.state.maps[t];
        this.handleSaveMap(n.id);
      },
    },
    {
      key: 'handleSaveMap',
      value: function (t) {
        if (this.props.handleSaveMap) this.props.handleSaveMap(t);
      },
    },
    {
      key: 'hide',
      value: function (t) {
        this.actionSheet.hide(t);
      },
    },
    {
      key: 'show',
      value: function () {
        this.actionSheet.show();
      },
    },
  ]);
  return F;
})(React.Component);

exports.default = P;

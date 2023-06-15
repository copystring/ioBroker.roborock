var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module420 = require('./420'),
  module415 = require('./415'),
  module381 = require('./381'),
  module387 = require('./387'),
  module1208 = require('./1208');

function R() {
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

var module510 = require('./510').strings,
  k = {
    Default: 0,
    SaveNewMapInSingleFloor: 1,
    SingleFloorWithoutSave: 2,
    KeepMap: 3,
  };

exports.MapSaveActionSheetMode = k;

var w = (function (t) {
  module9.default(A, t);

  var n = A,
    w = R(),
    N = function () {
      var t,
        o = module12.default(n);

      if (w) {
        var s = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function A(t) {
    var n;
    module6.default(this, A);
    (n = N.call(this, t)).mode = t.mode;
    n.isHiddenSaveAction = false;
    n.state = {
      maps: n.getMapItems(),
    };
    return n;
  }

  module7.default(A, [
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
        this.multiMapslistener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.DidReceiveSpecialEvent, function (n) {
          if (n.data == module420.EventKeys.MultiMapsDidReceive) {
            t.setState({
              maps: t.getMapItems(),
            });
            console.log('multiMapslistener - ' + JSON.stringify(module415.MM.maps));
          }
        });
      },
    },
    {
      key: 'getMapItems',
      value: function () {
        var t = {
          name: module510.map_save_pop_box_new_map,
          id: -1,
        };

        switch (((this.isHiddenSaveAction = module415.MM.maps.length >= module415.MM.mapCountMax), this.mode)) {
          case k.SingleFloorWithoutSave:
            return module415.MM.maps;

          case k.SaveNewMapInSingleFloor:
            return [t].concat(module415.MM.maps);

          case k.KeepMap:
            return module415.MM.maps;

          case k.Default:
          default:
            return this.isHiddenSaveAction ? module415.MM.maps : [t].concat(module415.MM.maps);
        }
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.state.maps.map(function (n, o) {
            var s = t.props.actionPrefix
              ? module1208.FloorMapPageUtils.getRealName(n.name)
              : module510.soundpackage_update + ' ' + module1208.FloorMapPageUtils.getRealName(n.name);
            return o > 0 ? s : t.isHiddenSaveAction ? s : module1208.FloorMapPageUtils.getRealName(n.name);
          });

        switch (this.mode) {
          case k.SaveNewMapInSingleFloor:
            n = this.state.maps.map(function (t, n) {
              return 0 == n ? module1208.FloorMapPageUtils.getRealName(t.name) : module510.soundpackage_update + ' ' + module1208.FloorMapPageUtils.getRealName(t.name);
            });
        }

        var o = this.mode == k.KeepMap ? module510.save_map_pop_box_save_title2 : null;
        return React.default.createElement(module385.ActionSheetView, {
          ref: function (n) {
            return (t.actionSheet = n);
          },
          title: o,
          actions: n,
          didSelectRow: this.didSelectRow.bind(this),
          onPressCancel: function () {
            module387.LogEventCommon('map_save_action_sheet_cancel');
            t.actionSheet.hide();
          },
        });
      },
    },
    {
      key: 'mapActionSheetEnabledAdapter',
      value: function (t) {
        var n =
          (module415.MM.maps.length <= module415.MM.mapCountMax && -1 == module381.RSM.currentMapId && module381.RSM.multiFloorEnabled) ||
          (!module381.RSM.multiFloorEnabled && 0 == module415.MM.maps.length);
        return 0 == t ? !this.props.actionPrefix && n : module415.MM.maps.length >= 1;
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
  return A;
})(React.Component);

exports.default = w;

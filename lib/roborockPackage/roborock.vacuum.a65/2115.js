var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module2111 = require('./2111'),
  module1199 = require('./1199'),
  module1127 = require('./1127'),
  module415 = require('./415'),
  module381 = require('./381'),
  module420 = require('./420'),
  module390 = require('./390'),
  module387 = require('./387');

function _(t, o) {
  var l = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    if (o)
      n = n.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    l.push.apply(l, n);
  }

  return l;
}

function O(t) {
  for (var l = 1; l < arguments.length; l++) {
    var n = null != arguments[l] ? arguments[l] : {};
    if (l % 2)
      _(Object(n), true).forEach(function (l) {
        module50.default(t, l, n[l]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      _(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

function w() {
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

var module1344 = require('./1344'),
  module510 = require('./510').strings,
  b = (function (t) {
    module9.default(b, t);

    var module50 = b,
      module2111 = w(),
      _ = function () {
        var t,
          l = module12.default(module50);

        if (module2111) {
          var n = module12.default(this).constructor;
          t = Reflect.construct(l, arguments, n);
        } else t = l.apply(this, arguments);

        return module11.default(this, t);
      };

    function b(t) {
      var o;
      module6.default(this, b);

      (o = _.call(this, t)).onPressAddSlideSillButton = function () {
        var t;
        if (!(null == (t = o.mapView))) t.addDoorSill(module1127.DoorConfig.silde_df_height);
      };

      o.onPressAddStoneSillButton = function () {
        var t;
        if (!(null == (t = o.mapView))) t.addDoorSill(module1127.DoorConfig.stone_df_height);
      };

      o.onPressAddOtherSillButton = function () {
        var t;
        if (!(null == (t = o.mapView))) t.addDoorSill(module1127.DoorConfig.other_df_height);
      };

      o.initParams = o.props.navigation.getParam('initParams', null);
      return o;
    }

    module7.default(b, [
      {
        key: 'getExProps',
        value: function () {
          return {
            ignoreSegment: true,
            showGuideBtn: true,
            showResetBtn: false,
            mapProps: {
              hideAccessory: true,
              mapMode: module1344.MAP_MODE_DOORSILL_EDIT,
              initDoorSill: this.initParams,
            },
            menuProps: {
              type: module1199.MenuType.Menu_DoorSill,
              onPressAddSlideSillButton: this.onPressAddSlideSillButton,
              onPressAddStoneSillButton: this.onPressAddStoneSillButton,
              onPressAddOtherSillButton: this.onPressAddOtherSillButton,
            },
            guideProps: {
              guideKey: module420.StorageKeys.DoorSillbyGuide,
              topTitle: module510.map_edit_door_sill_title2,
              context: module510.map_edit_door_sill_detail,
            },
          };
        },
      },
      {
        key: 'savingChanges',
        value: function (t) {
          var o,
            l,
            n = module381.RSM.currentMapId,
            u = null;
          if (module390.default.isSupportSmartDoorSill()) u = null == (o = this.mapView) ? undefined : o.getAllSmartDoorSillParams();
          else u = null == (l = this.mapView) ? undefined : l.getAllDoorSillParams();
          if (null == u) u = [];
          this.startMapSave(n, u, t);
        },
      },
      {
        key: 'resetMapEdit',
        value: function () {
          var t, o;
          if (!(null == (t = this.mapView))) t.clearAllDoorSillFocus();
          if (!(null == (o = this.mapView))) o.setState(O({}, module415.MM.mapData));
        },
      },
      {
        key: 'updataEvent',
        value: function () {
          var t,
            o = 0,
            l = 0;
          (null == (t = this.mapView) ? undefined : t.getAllDoorSills()).forEach(function (t) {
            if (true === t.newAdded) o++;
            if (true === t.aiToReal) l++;
          });
          module387.LogEventCommon('map_edit_door_sill_save', {
            aiToReal: l,
            customAdd: o,
          });
        },
      },
      {
        key: 'startMapSave',
        value: function (t, o, l) {
          if (module390.default.isSupportSmartDoorSill()) module415.MM.saveSmartDoorSillBlocks(t, o, l);
          else module415.MM.saveDoorSillBlocks(t, o, l);
        },
      },
    ]);
    return b;
  })(module2111.default);

exports.default = b;

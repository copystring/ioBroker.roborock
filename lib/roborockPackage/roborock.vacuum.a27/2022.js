var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module2018 = require('./2018'),
  module1120 = require('./1120'),
  module1057 = require('./1057'),
  module414 = require('./414'),
  module381 = require('./381'),
  module419 = require('./419'),
  module390 = require('./390'),
  module387 = require('./387');

function _(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (o)
      l = l.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, l);
  }

  return n;
}

function O(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      _(Object(l), true).forEach(function (n) {
        module50.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      _(Object(l)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(l, o));
      });
  }

  return t;
}

function M() {
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

var module1265 = require('./1265'),
  module505 = require('./505').strings,
  A = (function (t) {
    module7.default(A, t);

    var module50 = A,
      module2018 = M(),
      _ = function () {
        var t,
          n = module11.default(module50);

        if (module2018) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function A(t) {
      var o;
      module4.default(this, A);

      (o = _.call(this, t)).onPressAddSlideSillButton = function () {
        var t;
        if (!(null == (t = o.mapView))) t.addDoorSill(module1057.DoorConfig.silde_df_height);
      };

      o.onPressAddStoneSillButton = function () {
        var t;
        if (!(null == (t = o.mapView))) t.addDoorSill(module1057.DoorConfig.stone_df_height);
      };

      o.onPressAddOtherSillButton = function () {
        var t;
        if (!(null == (t = o.mapView))) t.addDoorSill(module1057.DoorConfig.other_df_height);
      };

      o.initParams = o.props.navigation.getParam('initParams', null);
      return o;
    }

    module5.default(A, [
      {
        key: 'getExProps',
        value: function () {
          return {
            ignoreSegment: true,
            showGuideBtn: true,
            mapProps: {
              hideAccessory: true,
              mapMode: module1265.MAP_MODE_DOORSILL_EDIT,
              initDoorSill: this.initParams,
            },
            menuProps: {
              type: module1120.MenuType.Menu_DoorSill,
              onPressAddSlideSillButton: this.onPressAddSlideSillButton,
              onPressAddStoneSillButton: this.onPressAddStoneSillButton,
              onPressAddOtherSillButton: this.onPressAddOtherSillButton,
            },
            guideProps: {
              guideKey: module419.StorageKeys.DoorSillbyGuide,
              topTitle: module505.map_edit_door_sill_title2,
              context: module505.map_edit_door_sill_detail,
            },
          };
        },
      },
      {
        key: 'savingChanges',
        value: function (t) {
          var o,
            n,
            l = module381.RSM.currentMapId,
            u = null;
          if (module390.default.isSupportSmartDoorSill()) u = null == (o = this.mapView) ? undefined : o.getAllSmartDoorSillParams();
          else u = null == (n = this.mapView) ? undefined : n.getAllDoorSillParams();
          if (null == u) u = [];
          this.startMapSave(l, u, t);
        },
      },
      {
        key: 'resetMapEdit',
        value: function () {
          var t, o;
          if (!(null == (t = this.mapView))) t.setState(O({}, module414.MM.mapData));
          if (!(null == (o = this.mapView))) o.resetSelectBlocks();
        },
      },
      {
        key: 'updataEvent',
        value: function () {
          var t,
            o = 0,
            n = 0;
          (null == (t = this.mapView) ? undefined : t.getAllDoorSills()).forEach(function (t) {
            if (true === t.newAdded) o++;
            if (true === t.aiToReal) n++;
          });
          module387.LogEventCommon('map_edit_door_sill_save', {
            aiToReal: n,
            customAdd: o,
          });
        },
      },
      {
        key: 'startMapSave',
        value: function (t, o, n) {
          if (module390.default.isSupportSmartDoorSill()) module414.MM.saveSmartDoorSillBlocks(t, o, n);
          else module414.MM.saveDoorSillBlocks(t, o, n);
        },
      },
    ]);
    return A;
  })(module2018.default);

exports.default = A;

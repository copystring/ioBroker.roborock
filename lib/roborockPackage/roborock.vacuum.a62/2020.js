var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module2018 = require('./2018'),
  module1120 = require('./1120'),
  module390 = require('./390'),
  module381 = require('./381');

function v() {
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
  E = (function (t) {
    module7.default(M, t);

    var module2018 = M,
      E = v(),
      h = function () {
        var t,
          o = module11.default(module2018);

        if (E) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function M(t) {
      var n;
      module4.default(this, M);

      (n = h.call(this, t)).onPressFloorEditButton = function () {
        n.props.navigation.navigate('MapEditFloorMaterialPage', {
          title: module505.map_edit_floor_wood_tile,
        });
      };

      n.onPressCarpetEditButton = function () {
        n.props.navigation.navigate('MapEditCarpetPage', {
          action: module390.default.isMapCarpetAddSupport() ? module381.CarpetEditMode.CarpetIgnore | module381.CarpetEditMode.CarpetAdd : module381.CarpetEditMode.CarpetIgnore,
          title: module505.map_edit_carpet_ignore_title,
        });
      };

      n.onPressDoorSillEditButton = function () {
        if (-1 != module381.RSM.currentMapId)
          n.props.navigation.navigate('MapEditDoorSillPage', {
            title: module505.map_edit_door_sill_title,
          });
        else globals.showToast(module505.no_map_status_description);
      };

      return n;
    }

    module5.default(M, [
      {
        key: 'getExProps',
        value: function () {
          return {
            hideNavComfirm: true,
            ignoreSegment: true,
            ignoreNoSave: true,
            mapProps: {
              hideAccessory: true,
            },
            menuProps: {
              type: module1120.MenuType.Menu_Ground,
              onPressFloorEditButton: this.onPressFloorEditButton,
              onPressCarpetEditButton: this.onPressCarpetEditButton,
              onPressDoorSillEditButton: this.onPressDoorSillEditButton,
            },
          };
        },
      },
    ]);
    return M;
  })(module2018.default);

exports.default = E;

var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module2099 = require('./2099'),
  module1192 = require('./1192'),
  module1191 = require('./1191'),
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

var module510 = require('./510').strings,
  h = (function (t) {
    module9.default(y, t);

    var module2099 = y,
      h = v(),
      E = function () {
        var t,
          o = module12.default(module2099);

        if (h) {
          var n = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function y(t) {
      var n;
      module6.default(this, y);

      (n = E.call(this, t)).onPressFloorEditButton = function () {
        n.props.navigation.navigate('MapEditFloorMaterialPage', {
          title: module510.map_edit_floor_wood_tile,
        });
      };

      n.onPressCarpetEditButton = function () {
        n.props.navigation.navigate('MapEditCarpetPage', {
          action: module1191.getCarpetPageAction(),
          title: module510.map_edit_carpet_ignore_title,
        });
      };

      n.onPressDoorSillEditButton = function () {
        if (-1 != module381.RSM.currentMapId)
          n.props.navigation.navigate('MapEditDoorSillPage', {
            title: module510.map_edit_door_sill_title,
          });
        else globals.showToast(module510.no_map_status_description);
      };

      return n;
    }

    module7.default(y, [
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
              type: module1192.MenuType.Menu_Ground,
              onPressFloorEditButton: this.onPressFloorEditButton,
              onPressCarpetEditButton: this.onPressCarpetEditButton,
              onPressDoorSillEditButton: this.onPressDoorSillEditButton,
            },
          };
        },
      },
    ]);
    return y;
  })(module2099.default);

exports.default = h;

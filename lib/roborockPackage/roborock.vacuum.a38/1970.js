var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module1968 = require('./1968'),
  module1390 = require('./1390'),
  module390 = require('./390'),
  module381 = require('./381');

function P() {
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

var module500 = require('./500').strings,
  C = (function (t) {
    module7.default(y, t);

    var module1968 = y,
      C = P(),
      h = function () {
        var t,
          o = module11.default(module1968);

        if (C) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function y(t) {
      var n;
      module4.default(this, y);

      (n = h.call(this, t)).onPressFloorEditButton = function () {
        n.props.navigation.navigate('MapEditFloorMaterialPage', {
          title: module500.map_edit_floor_wood_tile,
        });
      };

      n.onPressCarpetEditButton = function () {
        n.props.navigation.navigate('MapCarpetIgnorePage', {
          action: module390.default.isMapCarpetAddSupport() ? module381.CarpetEditMode.CarpetIgnore | module381.CarpetEditMode.CarpetAdd : module381.CarpetEditMode.CarpetIgnore,
          title: module500.map_edit_carpet_ignore_title,
        });
      };

      return n;
    }

    module5.default(y, [
      {
        key: 'getExProps',
        value: function () {
          return {
            hideNavComfirm: true,
            ignoreSegment: true,
            mapProps: {
              hideAccessory: true,
            },
            menuProps: {
              type: module1390.MenuType.Menu_Ground,
              onPressFloorEditButton: this.onPressFloorEditButton,
              onPressCarpetEditButton: this.onPressCarpetEditButton,
            },
          };
        },
      },
    ]);
    return y;
  })(module1968.default);

exports.default = C;

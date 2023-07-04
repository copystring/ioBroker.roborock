var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module2018 = require('./2018'),
  module414 = require('./414'),
  module415 = require('./415'),
  module1120 = require('./1120'),
  module390 = require('./390');

function O(t, o) {
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

function P(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      O(Object(l), true).forEach(function (n) {
        module50.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      O(Object(l)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(l, o));
      });
  }

  return t;
}

function F() {
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

var module1340 = require('./1340'),
  module505 = require('./505').strings,
  b = (function (t) {
    module7.default(b, t);

    var module50 = b,
      module2018 = F(),
      O = function () {
        var t,
          n = module11.default(module50);

        if (module2018) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function b(t) {
      var o;
      module4.default(this, b);

      (o = O.call(this, t)).onPressTileFloorButton = function () {
        o.setMapFloorInfo(4, -1);
      };

      o.onPressWoodFloorButton = function (t) {
        o.setMapFloorInfo(3, t ? 0 : 90);
      };

      o.onPressOtherFloorButton = function () {
        o.setMapFloorInfo(0, -1);
      };

      o.floorData = {};
      return o;
    }

    module5.default(b, [
      {
        key: 'getExProps',
        value: function () {
          return {
            mapProps: {
              hideAccessory: true,
              inBlockMode: true,
              editAction: module1120.EditAction.Floor,
            },
            menuProps: {
              type: module1120.MenuType.Menu_Floor,
              onPressTileFloorButton: this.onPressTileFloorButton,
              onPressWoodFloorButton: this.onPressWoodFloorButton,
              onPressOtherFloorButton: this.onPressOtherFloorButton,
            },
          };
        },
      },
      {
        key: 'savingChanges',
        value: function (t) {
          var o,
            n,
            l,
            u,
            s = this,
            c = [],
            f = (null == (o = module414.MM.mapData) ? undefined : null == (n = o.floorMap) ? undefined : n.data) || [],
            v = (null == (l = module414.MM.mapData) ? undefined : null == (u = l.floorMap) ? undefined : u.direction) || [];
          Object.keys(this.floorData).map(function (t) {
            var o = parseInt(t),
              n = s.floorData[t],
              l = true,
              u = true,
              p = v.find(function (t) {
                return t[0] == o;
              }),
              h = !module390.default.isSupportFloorDirection() || (p && p[1] == n[1]);

            if ((f[o] == n[0] && h && (l = false), h && (u = false), l)) {
              var O = [];
              O.push(o);
              O.push(n[0]);
              if (u && null != n[1]) O.push(n[1]);
              c.push(O);
            }
          });
          if (c.length <= 0) {
            if (t) t(true, false);
          } else
            module415.default
              .saveFloorMaterial({
                data: c,
              })
              .then(function (o) {
                s.floorData = {};
                if (t) t(true);
              })
              .catch(function (o) {
                if (t) t(false);
              });
        },
      },
      {
        key: 'resetMapEdit',
        value: function () {
          var t, o;
          this.floorData = {};
          if (!(null == (t = this.mapView)))
            t.setState(
              P(
                P({}, module414.MM.mapData),
                {},
                {
                  eidtFloor: this.floorData,
                }
              )
            );
          if (!(null == (o = this.mapView))) o.resetSelectBlocks();
        },
      },
      {
        key: 'setMapFloorInfo',
        value: function (t) {
          var o,
            n,
            l = this,
            u = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null;
          if (!module390.default.isSupportFloorDirection()) u = null;
          var s = (null == (o = this.mapView) ? undefined : o.getCurrentSelectBlock()) || [];

          if (0 != s.length) {
            s.map(function (o) {
              l.floorData[o] = [t, u];
            });
            this.showRingLoading(true);
            module1340.setTimeout(function () {
              return l.showRingLoading(false);
            }, 1e3);
            if (!(null == (n = this.mapView)))
              n.setState({
                eidtFloor: this.floorData,
              });
            this.setSaveButtonEnable();
          } else this.showToast(module505.map_edit_floor_select_segment_tip);
        },
      },
    ]);
    return b;
  })(module2018.default);

exports.default = b;

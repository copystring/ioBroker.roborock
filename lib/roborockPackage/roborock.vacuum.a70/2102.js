var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module2099 = require('./2099'),
  module415 = require('./415'),
  module416 = require('./416'),
  module1192 = require('./1192'),
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

function D() {
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

var module1414 = require('./1414'),
  module510 = require('./510').strings,
  b = (function (t) {
    module9.default(b, t);

    var module50 = b,
      module2099 = D(),
      O = function () {
        var t,
          n = module12.default(module50);

        if (module2099) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function b(t) {
      var o;
      module6.default(this, b);

      (o = O.call(this, t)).onPressTileFloorButton = function () {
        o.setMapFloorInfo(4, -1);
      };

      o.onPressWoodFloorButton = function (t) {
        var n,
          l = Math.abs((null == (n = o.mapView) ? undefined : n.getMapDeg()) || 0);
        if (!(90 != l && 270 != l)) t = !t;
        o.setMapFloorInfo(3, t ? 0 : 90);
      };

      o.onPressOtherFloorButton = function () {
        o.setMapFloorInfo(0, -1);
      };

      o.floorData = {};
      return o;
    }

    module7.default(b, [
      {
        key: 'getExProps',
        value: function () {
          return {
            mapProps: {
              hideAccessory: true,
              inBlockMode: true,
              editAction: module1192.EditAction.Floor,
            },
            menuProps: {
              type: module1192.MenuType.Menu_Floor,
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
            f = (null == (o = module415.MM.mapData) ? undefined : null == (n = o.floorMap) ? undefined : n.data) || [],
            v = (null == (l = module415.MM.mapData) ? undefined : null == (u = l.floorMap) ? undefined : u.direction) || [];
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
            module416.default
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
                P({}, module415.MM.mapData),
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
            l,
            u = this,
            s = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null;
          if (!module390.default.isSupportFloorDirection()) s = null;
          var c = (null == (o = this.mapView) ? undefined : o.getCurrentSelectBlock()) || [];

          if (0 != c.length) {
            c.map(function (o) {
              u.floorData[o] = [t, s];
            });
            this.showRingLoading(true);
            module1414.setTimeout(function () {
              return u.showRingLoading(false);
            }, 1e3);
            if (!(null == (n = this.mapView)))
              n.setState({
                eidtFloor: this.floorData,
              });
            this.setSaveButtonEnable();
            if (!(null == (l = this.mapView))) l.resetSelectBlocks();
          } else this.showToast(module510.map_edit_floor_select_segment_tip);
        },
      },
    ]);
    return b;
  })(module2099.default);

exports.default = b;

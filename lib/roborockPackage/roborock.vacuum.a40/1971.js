var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module1968 = require('./1968'),
  module1329 = require('./1329'),
  module414 = require('./414'),
  module1390 = require('./1390'),
  module1330 = require('./1330');

function O(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (o)
      s = s.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, s);
  }

  return n;
}

function P(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      O(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      O(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
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

var module1404 = require('./1404'),
  module500 = require('./500').strings,
  j = (function (t) {
    module7.default(j, t);

    var module50 = j,
      module1968 = F(),
      O = function () {
        var t,
          n = module11.default(module50);

        if (module1968) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function j(t) {
      var o;
      module4.default(this, j);

      (o = O.call(this, t)).onPressTileFloorButton = function () {
        o.setMapFloorInfo(4);
      };

      o.onPressWoodFloorButton = function () {
        o.setMapFloorInfo(3);
      };

      o.onPressOtherFloorButton = function () {
        o.setMapFloorInfo(0);
      };

      o.floorData = {};
      return o;
    }

    module5.default(j, [
      {
        key: 'getExProps',
        value: function () {
          return {
            mapProps: {
              hideAccessory: true,
              inBlockMode: true,
              editAction: module1330.EditAction.Floor,
            },
            menuProps: {
              type: module1390.MenuType.Menu_Floor,
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
          var o = this,
            n = [];
          Object.keys(this.floorData).map(function (t) {
            var s = [];
            s.push(parseInt(t));
            s.push(o.floorData[t]);
            n.push(s);
          });
          if (n.length <= 0) {
            if (t) t(true, false);
          } else
            module414.default
              .saveFloorMaterial({
                data: n,
              })
              .then(function (n) {
                o.floorData = {};
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
                P({}, module1329.MM.mapData),
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
            s = this,
            u = (null == (o = this.mapView) ? undefined : o.getCurrentSelectBlock()) || [];

          if (0 != u.length) {
            u.map(function (o) {
              s.floorData[o] = t;
            });
            this.showRingLoading(true);
            module1404.setTimeout(function () {
              return s.showRingLoading(false);
            }, 1e3);
            if (!(null == (n = this.mapView)))
              n.setState({
                eidtFloor: this.floorData,
              });
            this.setSaveButtonEnable();
          } else this.showToast(module500.map_edit_floor_select_segment_tip);
        },
      },
    ]);
    return j;
  })(module1968.default);

exports.default = j;

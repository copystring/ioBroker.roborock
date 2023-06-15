var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module2018 = require('./2018'),
  module12 = require('./12'),
  module381 = require('./381'),
  module414 = require('./414'),
  module419 = require('./419'),
  module1120 = require('./1120');

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

var b = (function (t) {
  module7.default(w, t);

  var module2018 = w,
    b = P(),
    k = function () {
      var t,
        n = module11.default(module2018);

      if (b) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function w(t) {
    var n;
    u.default(this, w);

    (n = k.call(this, t)).onPressRotateLeftButton = function () {
      var t;
      if (!(null == (t = n.mapView))) t.rotateMap(false, n.rotateMapCallback.bind(module6.default(n)));
    };

    n.onPressRotateRightButton = function () {
      var t;
      if (!(null == (t = n.mapView))) t.rotateMap(true, n.rotateMapCallback.bind(module6.default(n)));
    };

    return n;
  }

  module5.default(w, [
    {
      key: 'getExProps',
      value: function () {
        return {
          ignoreSegment: true,
          mapProps: {
            hideAccessory: true,
          },
          menuProps: {
            type: module1120.MenuType.Menu_Rotate,
            onPressRotateLeftButton: this.onPressRotateLeftButton,
            onPressRotateRightButton: this.onPressRotateRightButton,
          },
        };
      },
    },
    {
      key: 'savingChanges',
      value: function (t) {
        var u, module5, c;
        return regeneratorRuntime.default.async(
          function (l) {
            for (;;)
              switch ((l.prev = l.next)) {
                case 0:
                  l.prev = 0;
                  l.next = 3;
                  return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.MapRotateAngle));

                case 3:
                  u = l.sent;
                  module5 = module381.RSM.currentMapId;
                  (c = u ? JSON.parse(u) : module22.default({}))[module5] = this.mapView.state.mapDeg;
                  u = JSON.stringify(c);
                  module414.MM.mapRotateAngle = c;
                  l.next = 11;
                  return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.MapRotateAngle, u));

                case 11:
                  module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
                    data: module419.EventKeys.MapDidRotate,
                    sender: this,
                  });
                  if (t) t(true);
                  l.next = 18;
                  break;

                case 15:
                  l.prev = 15;
                  l.t0 = l.catch(0);
                  if (t) t(false);

                case 18:
                case 'end':
                  return l.stop();
              }
          },
          null,
          this,
          [[0, 15]],
          Promise
        );
      },
    },
    {
      key: 'resetMapEdit',
      value: function () {
        var t, o, u;
        return regeneratorRuntime.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  o = module414.MM.mapRotateAngle || {};
                  u = o[module381.RSM.currentMapId] ? o[module381.RSM.currentMapId] : 0;
                  if (!(null == (t = this.mapView))) t.setMapDeg(u);

                case 3:
                case 'end':
                  return n.stop();
              }
          },
          null,
          this,
          null,
          Promise
        );
      },
    },
    {
      key: 'rotateMapCallback',
      value: function () {
        this.setSaveButtonEnable();
      },
    },
  ]);
  return w;
})(module2018.default);

exports.default = b;

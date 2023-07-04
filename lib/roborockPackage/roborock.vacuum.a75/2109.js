var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  u = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module2110 = require('./2110'),
  module13 = require('./13'),
  module381 = require('./381'),
  module415 = require('./415'),
  module420 = require('./420'),
  module1198 = require('./1198');

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
  module9.default(w, t);

  var module2110 = w,
    b = P(),
    k = function () {
      var t,
        n = module12.default(module2110);

      if (b) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function w(t) {
    var n;
    u.default(this, w);

    (n = k.call(this, t)).onPressRotateLeftButton = function () {
      var t;
      if (!(null == (t = n.mapView))) t.rotateMap(false, n.rotateMapCallback.bind(module8.default(n)));
    };

    n.onPressRotateRightButton = function () {
      var t;
      if (!(null == (t = n.mapView))) t.rotateMap(true, n.rotateMapCallback.bind(module8.default(n)));
    };

    return n;
  }

  module7.default(w, [
    {
      key: 'getExProps',
      value: function () {
        return {
          ignoreSegment: true,
          mapProps: {
            hideAccessory: true,
          },
          menuProps: {
            type: module1198.MenuType.Menu_Rotate,
            onPressRotateLeftButton: this.onPressRotateLeftButton,
            onPressRotateRightButton: this.onPressRotateRightButton,
          },
        };
      },
    },
    {
      key: 'savingChanges',
      value: function (t) {
        var u, module7, c;
        return regeneratorRuntime.default.async(
          function (l) {
            for (;;)
              switch ((l.prev = l.next)) {
                case 0:
                  l.prev = 0;
                  l.next = 3;
                  return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.MapRotateAngle));

                case 3:
                  u = l.sent;
                  module7 = module381.RSM.currentMapId;
                  (c = u ? JSON.parse(u) : module22.default({}))[module7] = this.mapView.state.mapDeg;
                  u = JSON.stringify(c);
                  module415.MM.mapRotateAngle = c;
                  l.next = 11;
                  return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.MapRotateAngle, u));

                case 11:
                  module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                    data: module420.EventKeys.MapDidRotate,
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
                  o = module415.MM.mapRotateAngle || {};
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
})(module2110.default);

exports.default = b;

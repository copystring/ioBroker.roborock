var n,
  module4 = require('./4'),
  module43 = require('./43'),
  module40 = require('./40'),
  module64 = require('./64'),
  module13 = require('./13'),
  v = new module43.default(),
  h = false,
  w = (function () {
    function t() {
      module4.default(this, t);
    }

    module5.default(t, null, [
      {
        key: 'get',
        value: function (t) {
          module13.default(n[t], 'No dimension set for key ' + t);
          return n[t];
        },
      },
      {
        key: 'set',
        value: function (t) {
          var s = t.screen,
            o = t.window,
            l = t.windowPhysicalPixels;
          if (l)
            o = {
              width: l.width / l.scale,
              height: l.height / l.scale,
              scale: l.scale,
              fontScale: l.fontScale,
            };
          var c = t.screenPhysicalPixels;
          if (c)
            s = {
              width: c.width / c.scale,
              height: c.height / c.scale,
              scale: c.scale,
              fontScale: c.fontScale,
            };
          else if (null == s) s = o;
          n = {
            window: o,
            screen: s,
          };
          if (h) v.emit('change', n);
          else h = true;
        },
      },
      {
        key: 'addEventListener',
        value: function (n, t) {
          module13.default('change' === n, 'Trying to subscribe to unknown event: "%s"', n);
          v.addListener(n, t);
        },
      },
      {
        key: 'removeEventListener',
        value: function (n, t) {
          module13.default('change' === n, 'Trying to remove listener for unknown event: "%s"', n);
          v.removeListener(n, t);
        },
      },
    ]);
    return t;
  })(),
  y = globals.nativeExtensions && globals.nativeExtensions.DeviceInfo && globals.nativeExtensions.DeviceInfo.Dimensions;

if (!y) {
  module40.default.addListener('didUpdateDimensions', function (n) {
    w.set(n);
  });
  y = module64.default.getConstants().Dimensions;
}

w.set(y);
module.exports = w;

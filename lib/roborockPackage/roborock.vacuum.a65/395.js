var module6 = require('./6'),
  module396 = require('./396'),
  base64js = require('base64-js'),
  module397 = require('./397'),
  module398 = require('./398'),
  y = {
    1: {
      0: {
        length: 20,
        offset: 20,
      },
      1: {
        length: 20,
        offset: 20,
      },
    },
  },
  _ = new Array(20),
  c = (function () {
    function t() {
      module6.default(this, t);
    }

    module7.default(t, null, [
      {
        key: 'isValidatedMapData',
        value: function (l) {
          var o = base64js.toByteArray(l);
          return t.validate(o);
        },
      },
      {
        key: 'validate',
        value: function (l) {
          if (t.validate_magic_str(l)) {
            if (t.validate_total_length(l)) {
              if (t.validate_sha1(l)) return !!t.validate_payload(l) || (console.log('MapValidator.validate_payload'), false);
              else {
                console.log('MapValidator.validate_sha1');
                return false;
              }
            } else {
              console.log('MapValidator.validate_total_length');
              return false;
            }
          } else {
            console.log('MapValidator.validate_magic_str');
            return false;
          }
        },
      },
      {
        key: 'validate_magic_str',
        value: function (t) {
          var l = module398.BytesToASCII(t, 0, 2);
          return 'rr' == l || (console.log('[MapDownloader.js:validate_magic_str():] Magic Number: ' + l + ' incorrect!'), false);
        },
      },
      {
        key: 'validate_total_length',
        value: function (t) {
          var l = module398.BytesToInt(t, 2, 2),
            o = module398.BytesToInt(t, 4, 4);
          return (
            l + o == t.length ||
            (console.log('[MapDownloader.js:validate_total_length():] Total length incorrect, Header: ' + l + ', Payload: ' + o + ', Total: ' + t.length), false)
          );
        },
      },
      {
        key: 'validate_sha1',
        value: function (l) {
          var o = module398.BytesToInt(l, 8, 2),
            n = module398.BytesToInt(l, 10, 2),
            s = y[o][n],
            _ = module398.BytesToInt(l, 2, 2),
            c = module398.BytesToInt(l, 4, 4),
            h = s.length,
            f = _ + c - h,
            p = module397.digest(l, f, 0);

          return !!t.validate_sha1_bytes(p, l, f, h) || (console.log('[MapDownloader.js:validate_sha1():] Failed sha1 validation!'), false);
        },
      },
      {
        key: 'compareSha1',
        value: function (l) {
          var o = module398.BytesToInt(l, 8, 2),
            s = module398.BytesToInt(l, 10, 2),
            c = y[o][s],
            h = module398.BytesToInt(l, 2, 2),
            f = module398.BytesToInt(l, 4, 4),
            p = c.length,
            T = f - p,
            B = module397.digest(l, T, h);

          if (t.validate_sha1_bytes(B, _, 0, p)) {
            console.log('[MapDownloader.js:validate_sha1():] CompareSha1 same sha1 with last time!');
            return false;
          } else {
            module396.default('lastSha1Value');
            _ = B;
            return true;
          }
        },
      },
      {
        key: 'validate_sha1_bytes',
        value: function (t, l, o, n) {
          for (var s = 0; s < n; s++) if (t[s] != l[o + s]) return false;

          return true;
        },
      },
      {
        key: 'validate_payload',
        value: function (t) {
          for (var l = module398.BytesToInt(t, 2, 2), o = module398.BytesToInt(t, 4, 4), n = l, s = 0; n < t.length; ) {
            var v = module398.BytesToInt(t, n + 2, 2),
              y = module398.BytesToInt(t, n + 4, 4);
            s += v + y;
            n += v + y;
          }

          return s == o || (console.log('MapDownloader.js:validate_payload():] Payload sum incorrect, Sum:' + s + ', Payload:' + o), false);
        },
      },
      {
        key: 'validate_single_payload',
        value: function (t) {
          for (var l = 0, o = 0; o < t.length; ) {
            var n = module398.BytesToInt(t, o + 2, 2),
              s = module398.BytesToInt(t, o + 4, 4);
            l += n + s;
            o += n + s;
          }

          return l == t.length || (console.log('validate_single_payload(): Payload sum incorrect, Sum:' + l + ', Payload:' + t.length), false);
        },
      },
    ]);
    return t;
  })();

exports.default = c;

var module391 = require('./391'),
  o = {
    getRealName: function (t) {
      var o = this.getRealLength(t),
        l = t.substring(0, o);
      return unescape(module391.default.specDecode(l));
    },
    getRealLength: function (t) {
      for (var n = 0, o = t.length, l = -1, u = 0; u < o; u++) n += (l = t.charCodeAt(u)) >= 0 && l <= 128 ? 1 : l < 2048 ? 2 : l < 55296 ? 3 : l < 56320 ? 4 : 3;

      return n;
    },
    isLengthValid: function (t) {
      var o = module391.default.specEncode(t);
      return this.getRealLength(o) < 30;
    },
  };

exports.FloorMapPageUtils = o;

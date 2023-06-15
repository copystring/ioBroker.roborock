var module374 = require('@babel/runtime/helpers/interopRequireDefault')(require('./374'));

require('./51');

var n = {
  vibrate: function () {
    var n = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : 400,
      o = arguments.length > 1 && undefined !== arguments[1] && arguments[1];
    if ('number' == typeof n) module374.default.vibrate(n);
    else {
      if (!Array.isArray(n)) throw new Error('Vibration pattern should be a number or array');
      module374.default.vibrateByPattern(n, o ? 0 : -1);
    }
  },
  cancel: function () {
    module374.default.cancel();
  },
};
module.exports = n;

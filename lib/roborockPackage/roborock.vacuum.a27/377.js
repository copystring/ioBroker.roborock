var module378 = require('@babel/runtime/helpers/interopRequireDefault')(require('./378'));

require('./52');

var n = {
  vibrate: function () {
    var n = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : 400,
      o = arguments.length > 1 && undefined !== arguments[1] && arguments[1];
    if ('number' == typeof n) module378.default.vibrate(n);
    else {
      if (!Array.isArray(n)) throw new Error('Vibration pattern should be a number or array');
      module378.default.vibrateByPattern(n, o ? 0 : -1);
    }
  },
  cancel: function () {
    module378.default.cancel();
  },
};
module.exports = n;

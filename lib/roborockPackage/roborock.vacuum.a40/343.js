var module344 = require('./344'),
  f = [];

require('./40').default.addListener('hardwareBackPress', function () {
  for (var n = f.length - 1; n >= 0; n--) if (f[n]()) return;

  u.exitApp();
});

var u = {
  exitApp: function () {
    if (module344.default) module344.default.invokeDefaultBackPressHandler();
  },
  addEventListener: function (n, t) {
    if (-1 === f.indexOf(t)) f.push(t);
    return {
      remove: function () {
        return u.removeEventListener(n, t);
      },
    };
  },
  removeEventListener: function (n, t) {
    if (-1 !== f.indexOf(t)) f.splice(f.indexOf(t), 1);
  },
};
module.exports = u;

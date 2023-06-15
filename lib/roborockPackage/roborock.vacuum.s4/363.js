var n = {
  get: function (n) {
    console.warn('Settings is not yet supported on Android');
    return null;
  },
  set: function (n) {
    console.warn('Settings is not yet supported on Android');
  },
  watchKeys: function (n, t) {
    console.warn('Settings is not yet supported on Android');
    return -1;
  },
  clearWatch: function (n) {
    console.warn('Settings is not yet supported on Android');
  },
};
module.exports = n;

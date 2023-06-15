var module264 = require('@babel/runtime/helpers/interopRequireDefault')(require('./264')),
  module14 = require('./14'),
  l = {
    setGlobalOptions: function (l) {
      if ((undefined !== l.debug && module14(module264.default, 'Trying to debug FrameRateLogger without the native module!'), module264.default)) {
        var u = {
          debug: !!l.debug,
          reportStackTraces: !!l.reportStackTraces,
        };
        module264.default.setGlobalOptions(u);
      }
    },
    setContext: function (o) {
      if (module264.default) module264.default.setContext(o);
    },
    beginScroll: function () {
      if (module264.default) module264.default.beginScroll();
    },
    endScroll: function () {
      if (module264.default) module264.default.endScroll();
    },
  };

module.exports = l;

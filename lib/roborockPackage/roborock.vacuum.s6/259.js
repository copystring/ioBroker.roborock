var module260 = require('@babel/runtime/helpers/interopRequireDefault')(require('./260')),
  module13 = require('./13'),
  l = {
    setGlobalOptions: function (l) {
      if ((undefined !== l.debug && module13(module260.default, 'Trying to debug FrameRateLogger without the native module!'), module260.default)) {
        var u = {
          debug: !!l.debug,
          reportStackTraces: !!l.reportStackTraces,
        };
        module260.default.setGlobalOptions(u);
      }
    },
    setContext: function (o) {
      if (module260.default) module260.default.setContext(o);
    },
    beginScroll: function () {
      if (module260.default) module260.default.beginScroll();
    },
    endScroll: function () {
      if (module260.default) module260.default.endScroll();
    },
  };

module.exports = l;

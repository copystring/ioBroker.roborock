var module266 = require('@babel/runtime/helpers/interopRequireDefault')(require('./266')),
  module267 = require('./267'),
  module125 = require('./125'),
  module268 = require('./268'),
  module13 = require('./13'),
  c = {
    addListener: function (n, o) {
      module13(false, 'Dummy method used for documentation');
    },
    removeListener: function (n, o) {
      module13(false, 'Dummy method used for documentation');
    },
    removeAllListeners: function (n) {
      module13(false, 'Dummy method used for documentation');
    },
    dismiss: function () {
      module13(false, 'Dummy method used for documentation');
    },
    scheduleLayoutAnimation: function (n) {
      module13(false, 'Dummy method used for documentation');
    },
  };

(c = new module125(module266.default)).dismiss = module268;

c.scheduleLayoutAnimation = function (n) {
  var t = n.duration,
    u = n.easing;
  if (null != t && 0 !== t)
    module267.configureNext({
      duration: t,
      update: {
        duration: t,
        type: (null != u && module267.Types[u]) || 'keyboard',
      },
    });
};

module.exports = c;

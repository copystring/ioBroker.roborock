var module262 = require('@babel/runtime/helpers/interopRequireDefault')(require('./262')),
  module263 = require('./263'),
  module123 = require('./123'),
  module264 = require('./264'),
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

(c = new module123(module262.default)).dismiss = module264;

c.scheduleLayoutAnimation = function (n) {
  var t = n.duration,
    u = n.easing;
  if (null != t && 0 !== t)
    module263.configureNext({
      duration: t,
      update: {
        duration: t,
        type: (null != u && module263.Types[u]) || 'keyboard',
      },
    });
};

module.exports = c;

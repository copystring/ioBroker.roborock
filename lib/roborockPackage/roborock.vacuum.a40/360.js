var module20 = require('./20'),
  module52 = 'android' === require('./52').default.OS ? module20.getEnforcing('IntentAndroid') : module20.getEnforcing('LinkingManager');

exports.default = module52;

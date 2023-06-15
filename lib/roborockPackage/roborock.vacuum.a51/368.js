require('./331');

require('./52');

require('./78');

var module6 = require('./6'),
  module369 = require('./369'),
  module14 = require('./14'),
  u = (function () {
    function t() {
      module6.default(this, t);
    }

    module7.default(t, null, [
      {
        key: 'share',
        value: function (t) {
          var s = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {};
          module14('object' == typeof t && null !== t, 'Content to share must be a valid object');
          module14('string' == typeof t.url || 'string' == typeof t.message, 'At least one of URL and message is required');
          module14('object' == typeof s && null !== s, 'Options must be a valid object');
          module14(module369.default, 'ShareModule should be registered on Android.');
          module14(!t.title || 'string' == typeof t.title, 'Invalid title: title should be a string.');
          var o = {
            title: t.title,
            message: 'string' == typeof t.message ? t.message : undefined,
          };
          return module369.default.share(o, s.dialogTitle);
        },
      },
    ]);
    return t;
  })();

u.sharedAction = 'sharedAction';
u.dismissedAction = 'dismissedAction';
module.exports = u;

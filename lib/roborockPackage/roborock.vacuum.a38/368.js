require('./331');

require('./52');

require('./78');

var module4 = require('./4'),
  module369 = require('./369'),
  module13 = require('./13'),
  u = (function () {
    function t() {
      module4.default(this, t);
    }

    module5.default(t, null, [
      {
        key: 'share',
        value: function (t) {
          var s = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {};
          module13('object' == typeof t && null !== t, 'Content to share must be a valid object');
          module13('string' == typeof t.url || 'string' == typeof t.message, 'At least one of URL and message is required');
          module13('object' == typeof s && null !== s, 'Options must be a valid object');
          module13(module369.default, 'ShareModule should be registered on Android.');
          module13(!t.title || 'string' == typeof t.title, 'Invalid title: title should be a string.');
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

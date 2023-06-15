var module1221 = require('./1221'),
  module1224 = require('./1224'),
  u = function (t) {
    return {
      goBack: function (u) {
        var f = u;

        if (undefined === u && t.key) {
          module1224.default('string' == typeof t.key, 'key should be a string');
          f = t.key;
        }

        return module1221.default.back({
          key: f,
        });
      },
      navigate: function (t, u, f) {
        if ('string' == typeof t)
          return module1221.default.navigate({
            routeName: t,
            params: u,
            action: f,
          });
        else {
          module1224.default('object' == typeof t, 'Must navigateTo an object or a string');
          module1224.default(null == u, 'Params must not be provided to .navigate() when specifying an object');
          module1224.default(null == f, 'Child action must not be provided to .navigate() when specifying an object');
          return module1221.default.navigate(t);
        }
      },
      setParams: function (u) {
        module1224.default(t.key && 'string' == typeof t.key, 'setParams cannot be called by root navigator');
        return module1221.default.setParams({
          params: u,
          key: t.key,
        });
      },
    };
  };

exports.default = u;

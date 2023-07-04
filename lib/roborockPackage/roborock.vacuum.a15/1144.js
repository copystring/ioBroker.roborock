var module1142 = require('./1142'),
  module1145 = require('./1145'),
  u = function (t) {
    return {
      goBack: function (u) {
        var f = u;

        if (undefined === u && t.key) {
          module1145.default('string' == typeof t.key, 'key should be a string');
          f = t.key;
        }

        return module1142.default.back({
          key: f,
        });
      },
      navigate: function (t, u, f) {
        if ('string' == typeof t)
          return module1142.default.navigate({
            routeName: t,
            params: u,
            action: f,
          });
        else {
          module1145.default('object' == typeof t, 'Must navigateTo an object or a string');
          module1145.default(null == u, 'Params must not be provided to .navigate() when specifying an object');
          module1145.default(null == f, 'Child action must not be provided to .navigate() when specifying an object');
          return module1142.default.navigate(t);
        }
      },
      setParams: function (u) {
        module1145.default(t.key && 'string' == typeof t.key, 'setParams cannot be called by root navigator');
        return module1142.default.setParams({
          params: u,
          key: t.key,
        });
      },
    };
  };

exports.default = u;

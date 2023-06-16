var module939 = require('./939'),
  module942 = require('./942'),
  u = function (t) {
    return {
      goBack: function (u) {
        var f = u;

        if (undefined === u && t.key) {
          module942.default('string' == typeof t.key, 'key should be a string');
          f = t.key;
        }

        return module939.default.back({
          key: f,
        });
      },
      navigate: function (t, u, f) {
        if ('string' == typeof t)
          return module939.default.navigate({
            routeName: t,
            params: u,
            action: f,
          });
        else {
          module942.default('object' == typeof t, 'Must navigateTo an object or a string');
          module942.default(null == u, 'Params must not be provided to .navigate() when specifying an object');
          module942.default(null == f, 'Child action must not be provided to .navigate() when specifying an object');
          return module939.default.navigate(t);
        }
      },
      setParams: function (u) {
        module942.default(t.key && 'string' == typeof t.key, 'setParams cannot be called by root navigator');
        return module939.default.setParams({
          params: u,
          key: t.key,
        });
      },
    };
  };

exports.default = u;

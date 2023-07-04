var module941 = require('./941'),
  module944 = require('./944'),
  u = function (t) {
    return {
      goBack: function (u) {
        var f = u;

        if (undefined === u && t.key) {
          module944.default('string' == typeof t.key, 'key should be a string');
          f = t.key;
        }

        return module941.default.back({
          key: f,
        });
      },
      navigate: function (t, u, f) {
        if ('string' == typeof t)
          return module941.default.navigate({
            routeName: t,
            params: u,
            action: f,
          });
        else {
          module944.default('object' == typeof t, 'Must navigateTo an object or a string');
          module944.default(null == u, 'Params must not be provided to .navigate() when specifying an object');
          module944.default(null == f, 'Child action must not be provided to .navigate() when specifying an object');
          return module941.default.navigate(t);
        }
      },
      setParams: function (u) {
        module944.default(t.key && 'string' == typeof t.key, 'setParams cannot be called by root navigator');
        return module941.default.setParams({
          params: u,
          key: t.key,
        });
      },
    };
  };

exports.default = u;

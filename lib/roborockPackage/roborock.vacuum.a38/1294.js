var module1257 = require('./1257'),
  module1238 = require('./1238'),
  module1243 = require('./1243'),
  module1237 = require('./1237'),
  module1239 = require('./1239'),
  module1233 = require('./1233'),
  l = Object.getOwnPropertyDescriptor;

exports.f = require('./1234')
  ? l
  : function (p, y) {
      if (((p = module1243(p)), (y = module1237(y, true)), module1233))
        try {
          return l(p, y);
        } catch (t) {}
      if (module1239(p, y)) return module1238(!module1257.f.call(p, y), p[y]);
    };

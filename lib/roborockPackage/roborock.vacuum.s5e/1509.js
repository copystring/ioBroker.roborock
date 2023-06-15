var module1472 = require('./1472'),
  module1453 = require('./1453'),
  module1458 = require('./1458'),
  module1452 = require('./1452'),
  module1454 = require('./1454'),
  module1448 = require('./1448'),
  l = Object.getOwnPropertyDescriptor;

exports.f = require('./1449')
  ? l
  : function (p, y) {
      if (((p = module1458(p)), (y = module1452(y, true)), module1448))
        try {
          return l(p, y);
        } catch (t) {}
      if (module1454(p, y)) return module1453(!module1472.f.call(p, y), p[y]);
    };

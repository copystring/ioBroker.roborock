var module1553 = require('./1553'),
  module1534 = require('./1534'),
  module1539 = require('./1539'),
  module1533 = require('./1533'),
  module1535 = require('./1535'),
  module1529 = require('./1529'),
  l = Object.getOwnPropertyDescriptor;

exports.f = require('./1530')
  ? l
  : function (p, y) {
      if (((p = module1539(p)), (y = module1533(y, true)), module1529))
        try {
          return l(p, y);
        } catch (t) {}
      if (module1535(p, y)) return module1534(!module1553.f.call(p, y), p[y]);
    };

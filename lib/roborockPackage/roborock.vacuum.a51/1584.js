var module1547 = require('./1547'),
  module1528 = require('./1528'),
  module1533 = require('./1533'),
  module1527 = require('./1527'),
  module1529 = require('./1529'),
  module1523 = require('./1523'),
  l = Object.getOwnPropertyDescriptor;

exports.f = require('./1524')
  ? l
  : function (p, y) {
      if (((p = module1533(p)), (y = module1527(y, true)), module1523))
        try {
          return l(p, y);
        } catch (t) {}
      if (module1529(p, y)) return module1528(!module1547.f.call(p, y), p[y]);
    };

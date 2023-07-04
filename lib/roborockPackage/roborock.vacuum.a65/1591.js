var module1554 = require('./1554'),
  module1535 = require('./1535'),
  module1540 = require('./1540'),
  module1534 = require('./1534'),
  module1536 = require('./1536'),
  module1530 = require('./1530'),
  l = Object.getOwnPropertyDescriptor;

exports.f = require('./1531')
  ? l
  : function (p, y) {
      if (((p = module1540(p)), (y = module1534(y, true)), module1530))
        try {
          return l(p, y);
        } catch (t) {}
      if (module1536(p, y)) return module1535(!module1554.f.call(p, y), p[y]);
    };

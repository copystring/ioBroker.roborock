var module1474 = require('./1474'),
  module1455 = require('./1455'),
  module1460 = require('./1460'),
  module1454 = require('./1454'),
  module1456 = require('./1456'),
  module1450 = require('./1450'),
  l = Object.getOwnPropertyDescriptor;

exports.f = require('./1451')
  ? l
  : function (p, y) {
      if (((p = module1460(p)), (y = module1454(y, true)), module1450))
        try {
          return l(p, y);
        } catch (t) {}
      if (module1456(p, y)) return module1455(!module1474.f.call(p, y), p[y]);
    };

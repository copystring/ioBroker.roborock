var module1160 = require('./1160'),
  module1141 = require('./1141'),
  module1146 = require('./1146'),
  module1140 = require('./1140'),
  module1142 = require('./1142'),
  module1136 = require('./1136'),
  l = Object.getOwnPropertyDescriptor;

exports.f = require('./1137')
  ? l
  : function (p, y) {
      if (((p = module1146(p)), (y = module1140(y, true)), module1136))
        try {
          return l(p, y);
        } catch (t) {}
      if (module1142(p, y)) return module1141(!module1160.f.call(p, y), p[y]);
    };

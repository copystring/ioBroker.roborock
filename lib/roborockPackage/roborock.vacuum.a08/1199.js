var module1162 = require('./1162'),
  module1143 = require('./1143'),
  module1148 = require('./1148'),
  module1142 = require('./1142'),
  module1144 = require('./1144'),
  module1138 = require('./1138'),
  l = Object.getOwnPropertyDescriptor;

exports.f = require('./1139')
  ? l
  : function (p, y) {
      if (((p = module1148(p)), (y = module1142(y, true)), module1138))
        try {
          return l(p, y);
        } catch (t) {}
      if (module1144(p, y)) return module1143(!module1162.f.call(p, y), p[y]);
    };

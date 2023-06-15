var module26 = require('./26');

module.exports = function (o, n) {
  if (o) {
    if ('string' == typeof o) return module26(o, n);
    var s = Object.prototype.toString.call(o).slice(8, -1);
    if ('Object' === s && o.constructor) s = o.constructor.name;
    return 'Map' === s || 'Set' === s ? Array.from(o) : 'Arguments' === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? module26(o, n) : undefined;
  }
};

module.exports.default = module.exports;
module.exports.__esModule = true;

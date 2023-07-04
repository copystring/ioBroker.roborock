var module196 = require('./196'),
  c = module196.checkMergeObjectArg,
  n = module196.checkMergeIntoObjectArg;

module.exports = function (t, o) {
  if ((n(t), null != o)) for (var f in (c(o), o)) Object.prototype.hasOwnProperty.call(o, f) && (t[f] = o[f]);
};

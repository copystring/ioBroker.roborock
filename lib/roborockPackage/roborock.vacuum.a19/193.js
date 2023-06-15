var module194 = require('./194'),
  c = module194.checkMergeObjectArg,
  n = module194.checkMergeIntoObjectArg;

module.exports = function (t, o) {
  if ((n(t), null != o)) for (var f in (c(o), o)) Object.prototype.hasOwnProperty.call(o, f) && (t[f] = o[f]);
};

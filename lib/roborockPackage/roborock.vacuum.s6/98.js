module.exports = function (t) {
  if (!t || !t.stack) return [];

  for (var module99 = require('./99'), o = Array.isArray(t.stack) ? t.stack : module99.parse(t.stack), f = 'number' == typeof t.framesToPop ? t.framesToPop : 0; f--; ) o.shift();

  return o;
};

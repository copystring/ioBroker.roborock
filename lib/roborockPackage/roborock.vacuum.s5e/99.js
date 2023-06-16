module.exports = function (t) {
  if (!t || !t.stack) return [];

  for (var module100 = require('./100'), o = Array.isArray(t.stack) ? t.stack : module100.parse(t.stack), f = 'number' == typeof t.framesToPop ? t.framesToPop : 0; f--; )
    o.shift();

  return o;
};

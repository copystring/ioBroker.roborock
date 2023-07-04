module.exports = function (t) {
  if (Array.isArray(t)) return 0 === t.length;

  if ('object' == typeof t) {
    for (var n in t) return false;

    return true;
  }

  return !t;
};

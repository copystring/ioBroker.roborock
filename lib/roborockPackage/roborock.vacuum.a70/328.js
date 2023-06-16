module.exports = function (n) {
  var t;

  for (t in n) if (n.hasOwnProperty(t)) return t;

  return null;
};

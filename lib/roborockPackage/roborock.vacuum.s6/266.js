require('./51');

module.exports = function (t) {
  return 'normal' === t ? 0.985 : 'fast' === t ? 0.9 : t;
};

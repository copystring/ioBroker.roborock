exports._TESTING_ONLY_normalize_keys = function () {
  n = 'id';
  t = 0;
};

exports.generateKey = function () {
  return n + '-' + t++;
};

var n = 'id-' + Date.now(),
  t = 0;

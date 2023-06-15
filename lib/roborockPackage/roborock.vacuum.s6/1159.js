var n = 0,
  o = Math.random();

module.exports = function (t) {
  return 'Symbol('.concat(undefined === t ? '' : t, ')_', (++n + o).toString(36));
};

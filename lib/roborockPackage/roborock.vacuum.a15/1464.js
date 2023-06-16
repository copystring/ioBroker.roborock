var t = Math.ceil,
  n = Math.floor;

module.exports = function (o) {
  return isNaN((o = +o)) ? 0 : (o > 0 ? n : t)(o);
};

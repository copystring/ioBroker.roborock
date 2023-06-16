module.exports = function (n, t, o) {
  if (t < o) return n < t ? t : n > o ? o : n;
  else return n < o ? o : n > t ? t : n;
};

module.exports = function (n) {
  if (undefined === n) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
};

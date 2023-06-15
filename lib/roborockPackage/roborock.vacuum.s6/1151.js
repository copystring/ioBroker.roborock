module.exports = function (o) {
  if (undefined == o) throw TypeError("Can't call method on  " + o);
  return o;
};

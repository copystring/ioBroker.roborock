module.exports = function (t) {
  try {
    return !!t();
  } catch (t) {
    return true;
  }
};

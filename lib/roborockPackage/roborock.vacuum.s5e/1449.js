module.exports = !require('./1450')(function () {
  return (
    7 !=
    Object.defineProperty({}, 'a', {
      get: function () {
        return 7;
      },
    }).a
  );
});

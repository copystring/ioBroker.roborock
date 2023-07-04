module.exports = !require('./1525')(function () {
  return (
    7 !=
    Object.defineProperty({}, 'a', {
      get: function () {
        return 7;
      },
    }).a
  );
});

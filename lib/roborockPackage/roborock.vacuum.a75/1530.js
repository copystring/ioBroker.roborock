module.exports = !require('./1531')(function () {
  return (
    7 !=
    Object.defineProperty({}, 'a', {
      get: function () {
        return 7;
      },
    }).a
  );
});

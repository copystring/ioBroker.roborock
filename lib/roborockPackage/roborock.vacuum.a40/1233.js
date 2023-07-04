module.exports =
  !require('./1234') &&
  !require('./1235')(function () {
    return (
      7 !=
      Object.defineProperty(require('./1236')('div'), 'a', {
        get: function () {
          return 7;
        },
      }).a
    );
  });

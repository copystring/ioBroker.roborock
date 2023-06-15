module.exports =
  !require('./1137') &&
  !require('./1138')(function () {
    return (
      7 !=
      Object.defineProperty(require('./1139')('div'), 'a', {
        get: function () {
          return 7;
        },
      }).a
    );
  });

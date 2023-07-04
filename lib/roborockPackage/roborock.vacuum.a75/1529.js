module.exports =
  !require('./1530') &&
  !require('./1531')(function () {
    return (
      7 !=
      Object.defineProperty(require('./1532')('div'), 'a', {
        get: function () {
          return 7;
        },
      }).a
    );
  });

module.exports =
  !require('./1449') &&
  !require('./1450')(function () {
    return (
      7 !=
      Object.defineProperty(require('./1451')('div'), 'a', {
        get: function () {
          return 7;
        },
      }).a
    );
  });

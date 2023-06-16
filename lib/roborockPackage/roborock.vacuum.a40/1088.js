exports.default = function (n, o) {
  var f = n[o];
  if (!f)
    throw new Error(
      'There is no route defined for key ' +
        o +
        '.\nMust be one of: ' +
        Object.keys(n)
          .map(function (n) {
            return "'" + n + "'";
          })
          .join(',')
    );
  if (f.screen) return f.screen;

  if ('function' == typeof f.getScreen) {
    var u = f.getScreen();
    module1040.default(
      'function' == typeof u,
      "The getScreen defined for route '" +
        o +
        " didn't return a valid screen or navigator.\n\nPlease pass it like this:\n" +
        o +
        ": {\n  getScreen: () => require('./MyScreen').default\n}"
    );
    return u;
  }

  return f;
};

var module1040 = require('./1040');

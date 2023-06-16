var module1145 = require('./1145');

function t(n) {
  return n ? (n.screen ? n.screen : n) : null;
}

var c = function (n) {
  var c = Object.keys(n);
  module1145.default(c.length > 0, 'Please specify at least one route when configuring a navigator.');
  c.forEach(function (o) {
    var c = n[o],
      u = t(c);
    if (!u || ('function' != typeof u && 'string' != typeof u && !c.getScreen))
      throw new Error(
        "The component for route '" +
          o +
          "' must be a React component. For example:\n\nimport MyScreen from './MyScreen';\n...\n" +
          o +
          ": MyScreen,\n}\n\nYou can also use a navigator:\n\nimport MyNavigator from './MyNavigator';\n...\n" +
          o +
          ': MyNavigator,\n}'
      );
    if (c.screen && c.getScreen) throw new Error("Route '" + o + "' should declare a screen or a getScreen, not both.");
  });
};

exports.default = c;

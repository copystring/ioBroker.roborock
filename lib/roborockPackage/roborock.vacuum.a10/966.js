var module936 = require('./936'),
  module967 = require('./967');

var u = function (t) {
  var u = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
    l = u.initialRouteKey,
    s = u.initialRouteName,
    v = u.initialRouteParams,
    c = u.paths,
    R = u.navigationOptions,
    f = u.disableKeyboardHandling,
    p = {
      initialRouteKey: l,
      initialRouteName: s,
      initialRouteParams: v,
      paths: c,
      navigationOptions: R,
      getCustomActionCreators: u.getCustomActionCreators,
    },
    y = module936.StackRouter(t, p),
    b = module936.createNavigator(module967.default, y, u);
  if (!f) b = module936.createKeyboardAwareNavigator(b, u);
  return b;
};

exports.default = u;

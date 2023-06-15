var module1218 = require('./1218'),
  module1246 = require('./1246');

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
    y = module1218.StackRouter(t, p),
    b = module1218.createNavigator(module1246.default, y, u);
  if (!f) b = module1218.createKeyboardAwareNavigator(b, u);
  return b;
};

exports.default = u;

var module1217 = require('./1217'),
  module1245 = require('./1245');

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
    y = module1217.StackRouter(t, p),
    b = module1217.createNavigator(module1245.default, y, u);
  if (!f) b = module1217.createKeyboardAwareNavigator(b, u);
  return b;
};

exports.default = u;

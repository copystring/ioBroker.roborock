var module1139 = require('./1139'),
  module1167 = require('./1167');

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
    y = module1139.StackRouter(t, p),
    b = module1139.createNavigator(module1167.default, y, u);
  if (!f) b = module1139.createKeyboardAwareNavigator(b, u);
  return b;
};

exports.default = u;

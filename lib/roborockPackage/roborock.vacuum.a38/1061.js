var module1034 = require('./1034'),
  module1062 = require('./1062');

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
    y = module1034.StackRouter(t, p),
    b = module1034.createNavigator(module1062.default, y, u);
  if (!f) b = module1034.createKeyboardAwareNavigator(b, u);
  return b;
};

exports.default = u;

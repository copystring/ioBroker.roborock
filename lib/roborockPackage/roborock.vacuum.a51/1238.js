var module1211 = require('./1211'),
  module1239 = require('./1239');

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
    y = module1211.StackRouter(t, p),
    b = module1211.createNavigator(module1239.default, y, u);
  if (!f) b = module1211.createKeyboardAwareNavigator(b, u);
  return b;
};

exports.default = u;

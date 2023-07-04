var module938 = require('./938'),
  module969 = require('./969');

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
    y = module938.StackRouter(t, p),
    b = module938.createNavigator(module969.default, y, u);
  if (!f) b = module938.createKeyboardAwareNavigator(b, u);
  return b;
};

exports.default = u;

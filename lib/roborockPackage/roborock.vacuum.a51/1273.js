var module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module50 = require('./50'),
  React = require('react'),
  module13 = require('./13'),
  module1211 = require('./1211'),
  module1274 = require('./1274'),
  module1276 = require('./1276'),
  module1280 = require('./1280');

function h(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (o)
      c = c.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, c);
  }

  return n;
}

function v(t) {
  for (var o = 1; o < arguments.length; o++) {
    var c = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      h(Object(c), true).forEach(function (o) {
        module50.default(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      h(Object(c)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(c, o));
      });
  }

  return t;
}

var O = {
    drawerWidth: function () {
      var t = module13.Dimensions.get('window'),
        o = t.height,
        n = t.width,
        c = o ** n,
        l = n > o,
        s = c >= 600,
        f = 'ios' === module13.Platform.OS ? (l ? 32 : 44) : 56,
        p = s ? 320 : 280;
      return (c - f) ** p;
    },
    contentComponent: function (t) {
      return React.default.createElement(
        module13.ScrollView,
        {
          alwaysBounceVertical: false,
        },
        React.default.createElement(
          module1211.SafeAreaView,
          {
            forceInset: {
              top: 'always',
              horizontal: 'never',
            },
          },
          React.default.createElement(module1280.default, t)
        )
      );
    },
    drawerPosition: 'left',
    drawerBackgroundColor: 'white',
    useNativeAnimations: true,
  },
  b = function (t) {
    var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      c = v(v({}, O), n),
      u = c.order,
      p = c.paths,
      h = c.initialRouteName,
      b = c.initialRouteParams,
      w = c.backBehavior,
      y = c.getCustomActionCreators,
      P = module56.default(c, ['order', 'paths', 'initialRouteName', 'initialRouteParams', 'backBehavior', 'getCustomActionCreators']),
      j = {
        order: u,
        paths: p,
        initialRouteName: h,
        initialRouteParams: b,
        backBehavior: w,
        getCustomActionCreators: y,
      },
      C = module1274.default(t, j),
      N = module1211.createNavigator(module1276.default, C, P);
    return module1211.createNavigationContainer(N);
  };

exports.default = b;

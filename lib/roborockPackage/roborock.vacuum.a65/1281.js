var module50 = require('./50'),
  module1218 = require('./1218'),
  module1282 = require('./1282');

function c(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function l(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      c(Object(u), true).forEach(function (o) {
        module50.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      c(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function f(t, n, o) {
  if (t.hasOwnProperty(n) && undefined !== t[n]) return t;
  else {
    t[n] = o;
    return t;
  }
}

var s = function t(n) {
  return n.routes && n.routes[n.index] ? t(n.routes[n.index]) : n.key;
};

exports.default = function (t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {};
  n = f((n = f((n = l({}, n)), 'resetOnBlur', false)), 'backBehavior', 'initialRoute');
  var c = module1218.SwitchRouter(t, n);
  return l(
    l({}, c),
    {},
    {
      getActionCreators: function (t, n) {
        return l(
          {
            openDrawer: function () {
              return module1282.default.openDrawer({
                key: n,
              });
            },
            closeDrawer: function () {
              return module1282.default.closeDrawer({
                key: n,
              });
            },
            toggleDrawer: function () {
              return module1282.default.toggleDrawer({
                key: n,
              });
            },
          },
          c.getActionCreators(t, n)
        );
      },
      getStateForAction: function (t, n) {
        if (!n)
          return l(
            l({}, c.getStateForAction(t, undefined)),
            {},
            {
              isDrawerOpen: false,
              openId: 0,
              closeId: 0,
              toggleId: 0,
            }
          );

        if (null == t.key || t.key === n.key) {
          if (t.type === module1282.default.DRAWER_CLOSED)
            return l(
              l({}, n),
              {},
              {
                isDrawerOpen: false,
              }
            );
          if (t.type === module1282.default.DRAWER_OPENED)
            return l(
              l({}, n),
              {},
              {
                isDrawerOpen: true,
              }
            );
          if (t.type === module1282.default.CLOSE_DRAWER)
            return l(
              l({}, n),
              {},
              {
                closeId: n.closeId + 1,
              }
            );
          if (t.type === module1218.NavigationActions.BACK && n.isDrawerOpen)
            return l(
              l({}, n),
              {},
              {
                closeId: n.closeId + 1,
              }
            );
          if (t.type === module1282.default.OPEN_DRAWER)
            return l(
              l({}, n),
              {},
              {
                openId: n.openId + 1,
              }
            );
          if (t.type === module1282.default.TOGGLE_DRAWER)
            return l(
              l({}, n),
              {},
              {
                toggleId: n.toggleId + 1,
              }
            );
        }

        var f = c.getStateForAction(t, n);
        return null === f
          ? null
          : f !== n
          ? s(f) !== s(n)
            ? l(
                l({}, f),
                {},
                {
                  closeId: n.closeId + 1,
                }
              )
            : f
          : n;
      },
    }
  );
};

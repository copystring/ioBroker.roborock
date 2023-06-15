exports.default = function (t) {
  var v = t.navigation.state.params || {},
    w = v.dustCollectionMode,
    y = v.onDustCollectionModeChange,
    b = React.useState(w || 0),
    h = module22.default(b, 2),
    M = h[0],
    C = h[1];
  return React.default.createElement(
    module12.View,
    {
      style: {
        backgroundColor: globals.app.state.theme.settingBackgroundColor,
        flex: 1,
      },
    },
    Object.keys(module2006.DustCollectionModes).map(function (t, o) {
      var v = module2006.DustCollectionModes[t];
      return v.visible
        ? React.default.createElement(module381.SettingListItemView, {
            title: v.title,
            selected: M == t,
            bottomDetail: v.desc,
            bottomDetailWidth: module12.Dimensions.get('window').width - 80,
            key: o,
            shouldShowRightArrow: false,
            onPress: function () {
              var o;
              return regeneratorRuntime.default.async(
                function (l) {
                  for (;;)
                    switch ((l.prev = l.next)) {
                      case 0:
                        l.prev = 0;
                        o = parseInt(t);
                        l.next = 4;
                        return regeneratorRuntime.default.awrap(module407.default.setDustCollectionMode(o));

                      case 4:
                        C(o);
                        module390.default.sharedCache().dustCollectionMode = v;
                        if (y) y(o);
                        l.next = 12;
                        break;

                      case 9:
                        l.prev = 9;
                        l.t0 = l.catch(0);
                        console.warn(l.t0);

                      case 12:
                      case 'end':
                        return l.stop();
                    }
                },
                null,
                null,
                [[0, 9]],
                Promise
              );
            },
          })
        : React.default.createElement(module12.View, null);
    })
  );
};

var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var s = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (s && (s.get || s.set)) Object.defineProperty(l, c, s);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module2006 = require('./2006'),
  module381 = require('./381'),
  module407 = require('./407'),
  module390 = require('./390');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

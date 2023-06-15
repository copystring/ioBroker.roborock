(function (t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var s = o(n);
  if (s && s.has(t)) return s.get(t);
  var u = {},
    l = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var f in t)
    if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
      var c = l ? Object.getOwnPropertyDescriptor(t, f) : null;
      if (c && (c.get || c.set)) Object.defineProperty(u, f, c);
      else u[f] = t[f];
    }

  u.default = t;
  if (s) s.set(t, u);
})(require('react'));

var module4 = require('./4'),
  module5 = require('./5'),
  module386 = require('./386');

function o(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    s = new WeakMap();
  return (o = function (t) {
    return t ? s : n;
  })(t);
}

var l = null,
  f = (function () {
    function t() {
      module4.default(this, t);

      if (!l) {
        l = this;
        this.isDisableTitleBarActions = false;
      }

      return l;
    }

    module5.default(
      t,
      [
        {
          key: 'isDisableBackAndMore',
          get: function () {
            return !!module386.default.isDisableBackAndMore() || this.isDisableTitleBarActions;
          },
        },
        {
          key: 'enableBackAndMore',
          value: function () {
            this.isDisableTitleBarActions = false;
          },
        },
        {
          key: 'disableBackAndMore',
          value: function () {
            this.isDisableTitleBarActions = true;
          },
        },
        {
          key: 'navigation',
          get: function () {
            return globals.navigation;
          },
        },
        {
          key: 'settings',
          get: function () {
            return this.navigation.state.params;
          },
          set: function (t) {
            this.navigation.setParams(t);
          },
        },
        {
          key: 'title',
          get: function () {
            return this.settings.title;
          },
          set: function (t) {
            this.navigation.setParams({
              title: t,
            });
          },
        },
        {
          key: 'subTitle',
          get: function () {
            return this.settings.subTitle;
          },
          set: function (t) {
            this.navigation.setParams({
              subTitle: t,
            });
          },
        },
        {
          key: 'popGestureEnabled',
          get: function () {
            return this.settings && this.settings.gesturesEnabled;
          },
          set: function (t) {
            if (t !== this.popGestureEnabled)
              this.navigation.setParams({
                gesturesEnabled: t,
              });
          },
        },
        {
          key: 'rightItems',
          get: function () {
            return this.settings.rightItems;
          },
          set: function (t) {
            this.navigation.setParams({
              rightItems: t,
            });
          },
        },
      ],
      [
        {
          key: 'shared',
          value: function () {
            return new t();
          },
        },
      ]
    );
    return t;
  })();

exports.default = f;

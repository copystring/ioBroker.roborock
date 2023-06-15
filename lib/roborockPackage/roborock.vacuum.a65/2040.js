require('./416');

var module50 = require('./50'),
  module6 = require('./6'),
  module1625 = require('./1625');

function u(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function f(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      u(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      u(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

var l = null,
  p = (function () {
    function t() {
      module6.default(this, t);

      if (!l) {
        l = this;
        this.customMopModeListData = [];
        this.listeners = [];
      }

      return l;
    }

    module7.default(
      t,
      [
        {
          key: 'getCustomMopModeConfigById',
          value: function (t) {
            return this.customMopModeListData.find(function (n) {
              return n.id == t;
            });
          },
        },
        {
          key: 'getCustomMopModeNameById',
          value: function (t) {
            var n = this.getCustomMopModeConfigById(t);
            return (null == n ? undefined : n.name) || '';
          },
        },
        {
          key: 'addChangeListener',
          value: function (t) {
            this.listeners.push(t);
          },
        },
        {
          key: 'removeChangeListener',
          value: function (t) {
            var n = this.listeners.findIndex(function (n) {
              return t == n;
            });
            this.listeners.splice(n, 1);
          },
        },
        {
          key: 'modePannelCustomMops',
          get: function () {
            var t = globals.app.state.theme.ModeSettingPanel,
              n = module1625.getSystemCustomMopModes(),
              o = [];
            this.customMopModeListData.forEach(function (s, c) {
              var u = n.find(function (t) {
                return s.id === t.id;
              });

              if (u) {
                s.name = u.name;
                s.desc = u.desc;
                s.icon = u.icon;
                s.selectedIcon = u.selectedIcon;
              }

              if (!s.sys_type) {
                s.icon = t.mopModeNormalCustom;
                s.selectedIcon = t.mopModeSelectedCustom;
              }

              s.key = 'custom_mop_mode_' + c;
              if (s.show && 4 != s.id && o.length <= 5) o.push(f({}, s));
            });
            return o;
          },
        },
      ],
      [
        {
          key: 'sharedInstancee',
          value: function () {
            return new t();
          },
        },
      ]
    );
    return t;
  })().sharedInstancee();

exports.ModeDataInstance = p;

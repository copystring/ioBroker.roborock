var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module407 = require('./407'),
  module1228 = require('./1228');

function p(t, n) {
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
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      p(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      p(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

var M = null,
  h = (function () {
    function t() {
      module4.default(this, t);

      if (!M) {
        M = this;
        this.customMopModeListData = [];
        this.listeners = [];
      }

      return M;
    }

    module5.default(
      t,
      [
        {
          key: 'getCustomMopList',
          value: function () {
            var t,
              o = this;
            return regeneratorRuntime.default.async(
              function (s) {
                for (;;)
                  switch ((s.prev = s.next)) {
                    case 0:
                      s.prev = 0;
                      s.next = 3;
                      return regeneratorRuntime.default.awrap(module407.default.getCustomMopModeList());

                    case 3:
                      t = s.sent;
                      this.customMopModeListData = t.result;
                      console.log('ModeData getCustomMopList', t);
                      this.listeners.forEach(function (t) {
                        return t && t(o.customMopModeListData);
                      });
                      s.next = 12;
                      break;

                    case 9:
                      s.prev = 9;
                      s.t0 = s.catch(0);
                      console.log('ModeData getCustomMopList error', s.t0);

                    case 12:
                    case 'end':
                      return s.stop();
                  }
              },
              null,
              this,
              [[0, 9]],
              Promise
            );
          },
        },
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
          key: 'modePannelCustomMops',
          get: function () {
            var t = globals.app.state.theme.ModeSettingPanel,
              n = module1228.getSystemCustomMopModes(),
              o = [];
            this.customMopModeListData.forEach(function (s, u) {
              var c = n.find(function (t) {
                return s.id === t.id;
              });

              if (c) {
                s.name = c.name;
                s.desc = c.desc;
                s.icon = c.icon;
                s.selectedIcon = c.selectedIcon;
              }

              if (!s.sys_type) {
                s.icon = t.mopModeNormalCustom;
                s.selectedIcon = t.mopModeSelectedCustom;
              }

              s.key = 'custom_mop_mode_' + u;
              if (s.show && 4 != s.id && o.length <= 5) o.push(f({}, s));
            });
            return o;
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

exports.ModeDataInstance = h;

var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1055 = require('./1055');

function p() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var v = {
    willFocus: 'onWillFocus',
    didFocus: 'onDidFocus',
    willBlur: 'onWillBlur',
    didBlur: 'onDidBlur',
  },
  h = Object.keys(v),
  y = (function (t, ...args) {
    module7.default(b, t);

    var React = b,
      module1055 = p(),
      y = function () {
        var t,
          n = module11.default(React);

        if (module1055) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function b() {
      var t;
      module4.default(this, b);

      (t = y.call(this, ...args)).addListener = function (n) {
        var o = t.props[v[n]];
        if (o) t.subscriptions[n] = t.props.navigation.addListener(n, o);
      };

      t.removeListener = function (n) {
        if (t.subscriptions[n]) {
          t.subscriptions[n].remove();
          t.subscriptions[n] = undefined;
        }
      };

      return t;
    }

    module5.default(b, [
      {
        key: 'componentDidMount',
        value: function () {
          this.subscriptions = {};
          h.forEach(this.addListener);
        },
      },
      {
        key: 'componentDidUpdate',
        value: function (t) {
          var n = this;
          h.forEach(function (o) {
            if (n.props[v[o]] !== t[v[o]]) {
              n.removeListener(o);
              n.addListener(o);
            }
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          h.forEach(this.removeListener);
        },
      },
      {
        key: 'render',
        value: function () {
          return null;
        },
      },
    ]);
    return b;
  })(React.default.Component),
  b = module1055.default(y);

exports.default = b;

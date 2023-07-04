var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1327 = require('./1327');

function p() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
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
    module9.default(b, t);

    var React = b,
      module1327 = p(),
      y = function () {
        var t,
          n = module12.default(React);

        if (module1327) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function b() {
      var t;
      module6.default(this, b);

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

    module7.default(b, [
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
  b = module1327.default(y);

exports.default = b;

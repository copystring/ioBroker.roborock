require('./381');

require('./1796');

require('./1911');

require('./1922');

require('./1345');

var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var l = c ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, f, l);
        else u[f] = t[f];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module1354 = require('./1354'),
  module1352 = require('./1352');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function h() {
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

var M = (function (t) {
  module7.default(P, t);

  var v = P,
    M = h(),
    O = function () {
      var t,
        n = module11.default(v);

      if (M) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function P(t) {
    var o;
    module4.default(this, P);
    (o = O.call(this, t)).state = {};
    return o;
  }

  module5.default(P, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        module1352.ModeDataInstance.addChangeListener(function (n) {
          console.log('ModeDataInstance change', module1352.ModeDataInstance.modePannelCustomMops);
          t.forceUpdate();
        });
      },
    },
    {
      key: 'render',
      value: function () {
        return React.default.createElement(
          module12.View,
          {
            style: w.containter,
          },
          React.default.createElement(module1354.CustomMopModeView, {
            items: module1352.ModeDataInstance.modePannelCustomMops,
          })
        );
      },
    },
  ]);
  return P;
})(React.Component);

exports.default = M;
var w = module12.StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#E6EAEE',
  },
  testButton: {
    marginTop: 100,
    marginLeft: 50,
    width: module12.Dimensions.get('window').width / 2 - 10,
    height: Utils.scaledPixel(40),
  },
});

var n,
  module4 = require('./4'),
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
    var l = v(n);
    if (l && l.has(t)) return l.get(t);
    var u = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var o in t)
      if ('default' !== o && Object.prototype.hasOwnProperty.call(t, o)) {
        var f = c ? Object.getOwnPropertyDescriptor(t, o) : null;
        if (f && (f.get || f.set)) Object.defineProperty(u, o, f);
        else u[o] = t[o];
      }

    u.default = t;
    if (l) l.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module2027 = require('./2027');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    l = new WeakMap();
  return (v = function (t) {
    return t ? l : n;
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

var S = (function (t) {
  module7.default(x, t);

  var v = x,
    S = h(),
    k = function () {
      var t,
        n = module11.default(v);

      if (S) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function x(t) {
    var n;
    module4.default(this, x);
    (n = k.call(this, t)).state = {
      span: 0,
    };
    return n;
  }

  module5.default(x, [
    {
      key: 'componentDidMount',
      value: function () {
        this.startTime();
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        clearInterval(n);
      },
    },
    {
      key: 'setMinute',
      value: function () {
        return Math.floor((this.state.span % 3600) / 60);
      },
    },
    {
      key: 'setSecond',
      value: function () {
        return this.state.span % 60;
      },
    },
    {
      key: 'startTime',
      value: function () {
        var t = this;
        if (n) clearInterval(n);
        this.setState({
          span: module2027.timeTool.getSpan(),
        });
        n = setInterval(function () {
          t.setState({
            span: (t.state.span += 1),
          });
        }, 1e3);
      },
    },
    {
      key: 'cancle',
      value: function () {
        clearInterval(n);
      },
    },
    {
      key: 'render',
      value: function () {
        return React.default.createElement(
          module12.View,
          {
            style: j.container,
          },
          React.default.createElement(
            module12.View,
            {
              style: j.cellViewStyle,
            },
            React.default.createElement(
              module12.Text,
              {
                style: j.textStyle,
              },
              w(this.setMinute(), 2)
            )
          ),
          React.default.createElement(
            module12.View,
            {
              style: j.cellViewStyle,
            },
            React.default.createElement(
              module12.Text,
              {
                style: j.textStyle,
              },
              ':'
            )
          ),
          React.default.createElement(
            module12.View,
            {
              style: j.cellViewStyle,
            },
            React.default.createElement(
              module12.Text,
              {
                style: j.textStyle,
              },
              w(this.setSecond(), 2)
            )
          )
        );
      },
    },
  ]);
  return x;
})(React.Component);

function w(t, n) {
  return String(t).length > n ? t : (Array(n).join(0) + t).slice(-n);
}

exports.default = S;
var j = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cellViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textStyle: {
    color: '#ffffff',
    fontSize: 14,
  },
});

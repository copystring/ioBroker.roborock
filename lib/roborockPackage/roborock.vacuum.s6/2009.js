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
    var u = v(n);
    if (u && u.has(t)) return u.get(t);
    var l = {},
      o = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var c = o ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, f, c);
        else l[f] = t[f];
      }

    l.default = t;
    if (u) u.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module2010 = require('./2010'),
  module2011 = require('./2011');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    u = new WeakMap();
  return (v = function (t) {
    return t ? u : n;
  })(t);
}

function h(t) {
  var n = w();
  return function () {
    var u,
      l = module11.default(t);

    if (n) {
      var c = module11.default(this).constructor;
      u = Reflect.construct(l, arguments, c);
    } else u = l.apply(this, arguments);

    return module9.default(this, u);
  };
}

function w() {
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

var k = (function (t) {
  module7.default(f, t);
  var o = h(f);

  function f(t) {
    var u;
    module4.default(this, f);

    (u = o.call(this, t)).renderRow = function (t) {
      return React.default.createElement(O, {
        item: t,
      });
    };

    u.state = {
      data: [
        {
          key: 0,
          title: '1\u3001\u4e54\u5e03\u65af\u4f20',
        },
        {
          key: 1,
          title: '2\u3001\u7406\u6027\u4e50\u89c2\u6d3e',
        },
        {
          key: 2,
          title: '3\u3001\u6309\u81ea\u5df1\u7684\u610f\u613f\u8fc7\u4e00\u751f',
        },
        {
          key: 3,
          title: '4\u3001\u4eba\u7c7b\u7b80\u53f2',
        },
        {
          key: 4,
          title: '5\u3001\u6309\u81ea\u5df1\u7684\u610f\u613f\u8fc7\u4e00\u751f',
        },
        {
          key: 5,
          title: '6\u3001\u5c0f\u72d7\u94b1\u94b1',
        },
        {
          key: 6,
          title: '7\u3001\u5411\u524d\u4e00\u6b65',
        },
      ],
    };
    u.rowsData = u.state.data;
    return u;
  }

  module5.default(f, [
    {
      key: 'render',
      value: function () {
        var t = this;
        return React.default.createElement(
          module12.View,
          {
            style: module2010.default.mainContainer,
          },
          React.default.createElement(module2011.default, {
            ref: function (n) {
              return (t.list = n);
            },
            rows: this.rowsData,
            renderRow: this.renderRow,
            height: 55,
          })
        );
      },
    },
  ]);
  return f;
})(React.Component);

exports.default = k;

k.navigationOptions = function (t) {
  return {
    title: '' + t.navigation.state.params.title,
  };
};

var O = (function (t) {
  module7.default(f, t);
  var o = h(f);

  function f(t) {
    module4.default(this, f);
    return o.call(this, t);
  }

  module5.default(f, [
    {
      key: 'render',
      value: function () {
        return React.default.createElement(
          module12.View,
          {
            style: module2010.default.rowContainer,
          },
          React.default.createElement(
            module12.Text,
            {
              style: module2010.default.textStyle,
            },
            this.props.item.title
          )
        );
      },
    },
  ]);
  return f;
})(React.Component);

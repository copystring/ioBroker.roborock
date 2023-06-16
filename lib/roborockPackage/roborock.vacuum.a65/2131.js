var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2132 = require('./2132'),
  module2133 = require('./2133');

function p(t) {
  var n = k();
  return function () {
    var u,
      l = module12.default(t);

    if (n) {
      var f = module12.default(this).constructor;
      u = Reflect.construct(l, arguments, f);
    } else u = l.apply(this, arguments);

    return module11.default(this, u);
  };
}

function k() {
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

var w = (function (t) {
  module9.default(o, t);
  var n = p(o);

  function o(t) {
    var l;
    module6.default(this, o);

    (l = n.call(this, t)).renderRow = function (t) {
      return React.default.createElement(R, {
        item: t,
      });
    };

    l.state = {
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
    l.rowsData = l.state.data;
    return l;
  }

  module7.default(o, [
    {
      key: 'render',
      value: function () {
        var t = this;
        return React.default.createElement(
          module13.View,
          {
            style: module2132.default.mainContainer,
          },
          React.default.createElement(module2133.default, {
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
  return o;
})(React.Component);

exports.default = w;

w.navigationOptions = function (t) {
  return {
    title: '' + t.navigation.state.params.title,
  };
};

var R = (function (t) {
  module9.default(o, t);
  var n = p(o);

  function o(t) {
    module6.default(this, o);
    return n.call(this, t);
  }

  module7.default(o, [
    {
      key: 'render',
      value: function () {
        return React.default.createElement(
          module13.View,
          {
            style: module2132.default.rowContainer,
          },
          React.default.createElement(
            module13.Text,
            {
              style: module2132.default.textStyle,
            },
            this.props.item.title
          )
        );
      },
    },
  ]);
  return o;
})(React.Component);

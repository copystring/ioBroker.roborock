var l,
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module2036 = require('./2036');

function v() {
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

var S = (function (t) {
  module7.default(k, t);

  var n = k,
    S = v(),
    T = function () {
      var t,
        l = module11.default(n);

      if (S) {
        var c = module11.default(this).constructor;
        t = Reflect.construct(l, arguments, c);
      } else t = l.apply(this, arguments);

      return module9.default(this, t);
    };

  function k(t) {
    var n;
    module4.default(this, k);
    (n = T.call(this, t)).state = {
      span: 0,
    };
    return n;
  }

  module5.default(k, [
    {
      key: 'componentDidMount',
      value: function () {
        this.startTime();
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        clearInterval(l);
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
        if (l) clearInterval(l);
        this.setState({
          span: module2036.timeTool.getSpan(),
        });
        l = setInterval(function () {
          t.setState({
            span: (t.state.span += 1),
          });
          if (t.setMinute() >= 50) t.showChatTips();
        }, 1e3);
      },
    },
    {
      key: 'cancle',
      value: function () {
        clearInterval(l);
      },
    },
    {
      key: 'showChatTips',
      value: function () {
        if (this.props.showChatTips) this.props.showChatTips();
      },
    },
    {
      key: 'render',
      value: function () {
        return React.default.createElement(
          module12.View,
          {
            style: x.container,
          },
          React.default.createElement(
            module12.View,
            {
              style: x.cellViewStyle,
            },
            React.default.createElement(
              module12.Text,
              {
                style: x.textStyle,
              },
              w(this.setMinute(), 2)
            )
          ),
          React.default.createElement(
            module12.View,
            {
              style: x.cellViewStyle,
            },
            React.default.createElement(
              module12.Text,
              {
                style: x.textStyle,
              },
              ':'
            )
          ),
          React.default.createElement(
            module12.View,
            {
              style: x.cellViewStyle,
            },
            React.default.createElement(
              module12.Text,
              {
                style: x.textStyle,
              },
              w(this.setSecond(), 2)
            )
          )
        );
      },
    },
  ]);
  return k;
})(React.Component);

function w(t, n) {
  return String(t).length > n ? t : (Array(n).join(0) + t).slice(-n);
}

exports.default = S;
var x = module12.StyleSheet.create({
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

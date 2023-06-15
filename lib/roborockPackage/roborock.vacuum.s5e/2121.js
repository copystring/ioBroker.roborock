var l,
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module2090 = require('./2090');

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

var S = (function (t) {
  module7.default(M, t);

  var n = M,
    S = p(),
    E = function () {
      var t,
        l = module11.default(n);

      if (S) {
        var c = module11.default(this).constructor;
        t = Reflect.construct(l, arguments, c);
      } else t = l.apply(this, arguments);

      return module9.default(this, t);
    };

  function M(t) {
    var n;
    module4.default(this, M);
    (n = E.call(this, t)).state = {
      span: 0,
    };
    n.hasTriggedTimerout = false;
    return n;
  }

  module5.default(M, [
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
        this.hasTriggedTimerout = false;
        if (l) clearInterval(l);
        this.setState({
          span: module2090.timeTool.getSpan(),
        });
        l = setInterval(function () {
          t.setState({
            span: (t.state.span += 1),
          });
          if (t.setMinute() >= 50) t.hasTriggedTimerout || ((t.hasTriggedTimerout = true), t.didExceedCallingMaxTime());
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
      key: 'didExceedCallingMaxTime',
      value: function () {
        if (this.props.didExceedCallingMaxTime) this.props.didExceedCallingMaxTime();
      },
    },
    {
      key: 'render',
      value: function () {
        return React.default.createElement(
          module12.View,
          {
            style: T.container,
          },
          React.default.createElement(
            module12.View,
            {
              style: T.cellViewStyle,
            },
            React.default.createElement(
              module12.Text,
              {
                style: T.textStyle,
              },
              x(this.setMinute(), 2)
            )
          ),
          React.default.createElement(
            module12.View,
            {
              style: T.cellViewStyle,
            },
            React.default.createElement(
              module12.Text,
              {
                style: T.textStyle,
              },
              ':'
            )
          ),
          React.default.createElement(
            module12.View,
            {
              style: T.cellViewStyle,
            },
            React.default.createElement(
              module12.Text,
              {
                style: T.textStyle,
              },
              x(this.setSecond(), 2)
            )
          )
        );
      },
    },
  ]);
  return M;
})(React.Component);

function x(t, n) {
  return String(t).length > n ? t : (Array(n).join(0) + t).slice(-n);
}

exports.default = S;
var T = module12.StyleSheet.create({
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
    color: '#a5a5a5',
    fontSize: 14,
  },
});

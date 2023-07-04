var l,
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2206 = require('./2206'),
  module391 = require('./391');

function w() {
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

var x = (function (t) {
  module9.default(b, t);

  var n = b,
    x = w(),
    V = function () {
      var t,
        l = module12.default(n);

      if (x) {
        var c = module12.default(this).constructor;
        t = Reflect.construct(l, arguments, c);
      } else t = l.apply(this, arguments);

      return module11.default(this, t);
    };

  function b(t) {
    var n;
    module6.default(this, b);
    (n = V.call(this, t)).state = {
      span: 0,
    };
    return n;
  }

  module7.default(b, [
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
          span: module2206.timeTool.getRecordSpan(),
        });
        l = setInterval(function () {
          var n;
          if (
            (t.setState({
              span: (t.state.span += 1),
            }),
            t.setMinute() >= 60)
          )
            null == (n = t.props) || n.didExceedLimitedDuration();
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
      key: 'render',
      value: function () {
        return React.default.createElement(
          module13.TouchableOpacity,
          module22.default({}, module391.default.getAccessibilityLabel('call_time_button'), {
            onPress: this.props.onPress,
          }),
          React.default.createElement(
            module13.View,
            {
              style: [k.container, this.props.style],
            },
            React.default.createElement(
              module13.View,
              {
                style: k.cellViewStyle,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: k.textStyle,
                },
                E(this.setMinute(), 2)
              )
            ),
            React.default.createElement(
              module13.View,
              {
                style: k.cellViewStyle,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: k.textStyle,
                },
                ':'
              )
            ),
            React.default.createElement(
              module13.View,
              {
                style: k.cellViewStyle,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: k.textStyle,
                },
                E(this.setSecond(), 2)
              )
            )
          )
        );
      },
    },
  ]);
  return b;
})(React.Component);

function E(t, n) {
  return String(t).length > n ? t : (Array(n).join(0) + t).slice(-n);
}

exports.default = x;
var k = module13.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e22920',
    borderRadius: 3.33,
    height: 20,
    width: 50,
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

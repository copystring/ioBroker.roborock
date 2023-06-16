var l,
  module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module2036 = require('./2036'),
  module391 = require('./391');

function V() {
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

var R = (function (t) {
  module7.default(E, t);

  var n = E,
    R = V(),
    x = function () {
      var t,
        l = module11.default(n);

      if (R) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(l, arguments, o);
      } else t = l.apply(this, arguments);

      return module9.default(this, t);
    };

  function E(t) {
    var n;
    module4.default(this, E);
    (n = x.call(this, t)).state = {
      span: 0,
    };
    return n;
  }

  module5.default(E, [
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
          span: module2036.timeTool.getRecordSpan(),
        });
        l = setInterval(function () {
          t.setState({
            span: (t.state.span += 1),
          });
          if (t.setMinute() >= 60) t.stopRecordVideo();
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
      key: 'stopRecordVideo',
      value: function () {
        if (this.props.stopRecordVideo) this.props.stopRecordVideo();
      },
    },
    {
      key: 'render',
      value: function () {
        return React.default.createElement(
          module12.TouchableOpacity,
          module22.default({}, module391.default.getAccessibilityLabel('call_time_button'), {
            onPress: this.props.onPress,
          }),
          React.default.createElement(
            module12.View,
            {
              style: [k.container, this.props.style],
            },
            React.default.createElement(
              module12.View,
              {
                style: k.cellViewStyle,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: k.textStyle,
                },
                w(this.setMinute(), 2)
              )
            ),
            React.default.createElement(
              module12.View,
              {
                style: k.cellViewStyle,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: k.textStyle,
                },
                ':'
              )
            ),
            React.default.createElement(
              module12.View,
              {
                style: k.cellViewStyle,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: k.textStyle,
                },
                w(this.setSecond(), 2)
              )
            )
          )
        );
      },
    },
  ]);
  return E;
})(React.Component);

function w(t, n) {
  return String(t).length > n ? t : (Array(n).join(0) + t).slice(-n);
}

exports.default = R;
var k = module12.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e22920',
    borderRadius: 3.33,
    height: 20,
    width: 40,
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

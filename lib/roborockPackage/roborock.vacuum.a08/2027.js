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
    var o = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var s = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (s && (s.get || s.set)) Object.defineProperty(o, c, s);
        else o[c] = t[c];
      }

    o.default = t;
    if (l) l.set(t, o);
    return o;
  })(require('react')),
  module12 = require('./12'),
  module2028 = require('./2028');

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
  module7.default(O, t);

  var v = O,
    S = h(),
    V = function () {
      var t,
        n = module11.default(v);

      if (S) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function O(t) {
    var n;
    module4.default(this, O);
    (n = V.call(this, t)).state = {
      span: 0,
    };
    return n;
  }

  module5.default(O, [
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
          span: module2028.timeTool.getRecordSpan(),
        });
        n = setInterval(function () {
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
        clearInterval(n);
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
          {
            onPress: this.props.onPress,
          },
          React.default.createElement(
            module12.View,
            {
              style: [this.props.style ? this.props.style : k.container],
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
  return O;
})(React.Component);

function w(t, n) {
  return String(t).length > n ? t : (Array(n).join(0) + t).slice(-n);
}

exports.default = S;
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

var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

function h() {
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

var p = (function (t) {
  module7.default(b, t);

  var p = b,
    P = h(),
    y = function () {
      var t,
        s = module11.default(p);

      if (P) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(s, arguments, n);
      } else t = s.apply(this, arguments);

      return module9.default(this, t);
    };

  function b(t) {
    var n;
    module4.default(this, b);
    (n = y.call(this, t)).state = {
      buttonPressed: false,
    };
    return n;
  }

  module5.default(b, [
    {
      key: '_buttonPressIn',
      value: function () {
        this.setState({
          buttonPressed: true,
        });
      },
    },
    {
      key: '_buttonPressOut',
      value: function () {
        this.setState({
          buttonPressed: false,
        });
      },
    },
    {
      key: '_isButtonPressed',
      value: function () {
        return this.state.buttonPressed;
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props.source;
        if (this._isButtonPressed() && this.props.highlightedSource) t = this.props.highlightedSource;
        return React.default.createElement(
          module12.TouchableWithoutFeedback,
          {
            onPress: this.props.onPress || null,
            onLayout: this.props.onLayout || null,
            onPressIn: this._buttonPressIn.bind(this),
            onPressOut: this._buttonPressOut.bind(this),
          },
          React.default.createElement(module12.Image, {
            style: this.props.style,
            source: t,
          })
        );
      },
    },
  ]);
  return b;
})(React.default.Component);

exports.default = p;
p.initialState = {
  buttonPressed: false,
};
p.defaultProps = {
  source: null,
  highlightedSource: null,
  onPress: null,
};

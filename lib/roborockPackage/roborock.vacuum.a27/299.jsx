var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function f() {
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

require('./52');

var module265 = require('./265'),
  module267 = require('./267'),
  React = require('react'),
  module61 = require('./61'),
  module84 = require('./84');

class _ {
  constructor(t) {
    var n;
    module4(this, w);
    (n = R.call(this, t))._frame = null;
    n._subscriptions = [];
    n._initialFrameHeight = 0;

    n._onKeyboardChange = function (t) {
      if (null != t) {
        var o = t.duration,
          s = t.easing,
          u = t.endCoordinates,
          c = n._relativeKeyboardHeight(u);

        if (n.state.bottom !== c) {
          if (o && s)
            module267.configureNext({
              duration: o > 10 ? o : 10,
              update: {
                duration: o > 10 ? o : 10,
                type: module267.Types[s] || 'keyboard',
              },
            });
          n.setState({
            bottom: c,
          });
        }
      } else
        n.setState({
          bottom: 0,
        });
    };

    n._onLayout = function (t) {
      n._frame = t.nativeEvent.layout;
      if (!n._initialFrameHeight) n._initialFrameHeight = n._frame.height;
    };

    n.state = {
      bottom: 0,
    };
    n.viewRef = React.createRef();
    return n;
  }

  _relativeKeyboardHeight(t) {
    var n = this._frame;
    if (!n || !t) return 0;
    var o = t.screenY - this.props.keyboardVerticalOffset;
    return (n.y + n.height - o) ** 0;
  }

  componentDidMount() {
    this._subscriptions = [module265.addListener('keyboardDidHide', this._onKeyboardChange), module265.addListener('keyboardDidShow', this._onKeyboardChange)];
  }

  componentWillUnmount() {
    this._subscriptions.forEach(function (t) {
      t.remove();
    });
  }

  render() {
    var o = this.props,
      s = o.behavior,
      u = o.children,
      c = o.contentContainerStyle,
      l = o.enabled,
      f = o.style,
      h = module56(o, ['behavior', 'children', 'contentContainerStyle', 'enabled', 'keyboardVerticalOffset', 'style']),
      y = l ? this.state.bottom : 0;

    switch (s) {
      case 'height':
        var _;

        if (null != this._frame && this.state.bottom > 0)
          _ = {
            height: this._initialFrameHeight - y,
            flex: 0,
          };
        return <module84>{u}</module84>;

      case 'position':
        return (
          <module84>
            <module84
              style={module61.compose(c, {
                bottom: y,
              })}
            >
              {u}
            </module84>
          </module84>
        );

      case 'padding':
        return <module84>{u}</module84>;

      default:
        return <module84>{u}</module84>;
    }
  }
}

_.defaultProps = {
  enabled: true,
  keyboardVerticalOffset: 0,
};
module.exports = _;

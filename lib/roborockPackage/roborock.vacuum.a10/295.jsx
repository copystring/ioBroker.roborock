var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  f = ['behavior', 'children', 'contentContainerStyle', 'enabled', 'keyboardVerticalOffset', 'style'];

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

require('./51');

var module261 = require('./261'),
  module263 = require('./263'),
  React = require('react'),
  module60 = require('./60'),
  module83 = require('./83'),
  k = (function (k) {
    module7(C, k);

    var L = C,
      R = h(),
      w = function () {
        var t,
          n = module11(L);

        if (R) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function C(t) {
      var n;
      module4(this, C);
      (n = w.call(this, t))._frame = null;
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
              module263.configureNext({
                duration: o > 10 ? o : 10,
                update: {
                  duration: o > 10 ? o : 10,
                  type: module263.Types[s] || 'keyboard',
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

    module5(C, [
      {
        key: '_relativeKeyboardHeight',
        value: function (t) {
          var n = this._frame;
          if (!n || !t) return 0;
          var o = t.screenY - this.props.keyboardVerticalOffset;
          return (n.y + n.height - o) ** 0;
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this._subscriptions = [module261.addListener('keyboardDidHide', this._onKeyboardChange), module261.addListener('keyboardDidShow', this._onKeyboardChange)];
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this._subscriptions.forEach(function (t) {
            t.remove();
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var o = this.props,
            s = o.behavior,
            u = o.children,
            c = o.contentContainerStyle,
            l = o.enabled,
            h = o.style,
            y = module55(o, f),
            v = l ? this.state.bottom : 0;

          switch (s) {
            case 'height':
              var k;
              if (null != this._frame && this.state.bottom > 0)
                k = {
                  height: this._initialFrameHeight - v,
                  flex: 0,
                };
              return <module83>{u}</module83>;

            case 'position':
              return (
                <module83>
                  <module83
                    style={module60.compose(c, {
                      bottom: v,
                    })}
                  >
                    {u}
                  </module83>
                </module83>
              );

            case 'padding':
              return <module83>{u}</module83>;

            default:
              return <module83>{u}</module83>;
          }
        },
      },
    ]);
    return C;
  })(React.Component);

k.defaultProps = {
  enabled: true,
  keyboardVerticalOffset: 0,
};
module.exports = k;

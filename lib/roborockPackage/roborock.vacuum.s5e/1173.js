exports.default = function (t) {
  return (function (y) {
    module7.default(R, y);

    var P = R,
      E = v(),
      x = function () {
        var t,
          n = module11.default(P);

        if (E) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t, n) {
      var s;
      module4.default(this, R);

      (s = x.call(this, t, n))._onComponentRef = function (t) {
        s._component = t;
        if (t) module1174.default('function' == typeof t.setNativeProps, 'component must implement method `setNativeProps`');
      };

      s._onPositionChange = function () {
        if (s._component) {
          var t = s._computePointerEvents();

          if (s._pointerEvents !== t) {
            s._pointerEvents = t;

            s._component.setNativeProps({
              pointerEvents: t,
            });
          }
        }
      };

      s._pointerEvents = s._computePointerEvents();
      return s;
    }

    module5.default(R, [
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this._positionListener) this._positionListener.remove();
        },
      },
      {
        key: 'render',
        value: function () {
          this._bindPosition();

          this._pointerEvents = this._computePointerEvents();
          return React.default.createElement(
            t,
            module22.default({}, this.props, {
              pointerEvents: this._pointerEvents,
              onComponentRef: this._onComponentRef,
            })
          );
        },
      },
      {
        key: '_bindPosition',
        value: function () {
          if (this._positionListener) this._positionListener.remove();
          this._positionListener = new h(this.props.position, this._onPositionChange);
        },
      },
      {
        key: '_computePointerEvents',
        value: function () {
          var t = this.props,
            n = t.navigation,
            o = t.position,
            s = t.scene;
          if (s.isStale || n.state.index !== s.index) return s.index > n.state.index ? 'box-only' : 'none';
          var u = o.__getAnimatedValue() - n.state.index;
          return Math.abs(u) > _ ? 'box-only' : 'auto';
        },
      },
    ]);
    return R;
  })(React.default.Component);
};

var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1174 = require('./1174');

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

var _ = 0.01;

var h = (function () {
  function t(n, s) {
    module4.default(this, t);
    this._value = n;
    this._token = n.addListener(s);
  }

  module5.default(t, [
    {
      key: 'remove',
      value: function () {
        this._value.removeListener(this._token);
      },
    },
  ]);
  return t;
})();

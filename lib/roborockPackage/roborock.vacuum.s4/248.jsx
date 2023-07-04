var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function _() {
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

var module220 = require('./220').AnimatedEvent,
  module235 = require('./235'),
  React = require('react'),
  module76 = require('./76'),
  module13 = require('./13');

module.exports = function (y, N) {
  module13(
    'function' != typeof y || (y.prototype && y.prototype.isReactComponent),
    '`createAnimatedComponent` does not support stateless functional components; use a class component instead.'
  );

  var k = (function (v) {
    module7(P, v);

    var module13 = P,
      k = _(),
      A = function () {
        var t,
          n = module11(module13);

        if (k) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function P(t) {
      var o;
      module4(this, P);
      (o = A.call(this, t))._invokeAnimatedPropsCallbackOnMount = false;
      o._eventDetachers = [];

      o._animatedPropsCallback = function () {
        if (null == o._component) o._invokeAnimatedPropsCallbackOnMount = true;
        else if (P.__skipSetNativeProps_FOR_TESTS_ONLY || 'function' != typeof o._component.setNativeProps) o.forceUpdate();
        else {
          if (o._propsAnimated.__isNative)
            throw new Error('Attempting to run JS driven animation on animated node that has been moved to "native" earlier by starting an animation with `useNativeDriver: true`');

          o._component.setNativeProps(o._propsAnimated.__getAnimatedValue());
        }
      };

      o._setComponentRef = function (t) {
        o._prevComponent = o._component;
        o._component = t;
      };

      return o;
    }

    module5(P, [
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this._propsAnimated) this._propsAnimated.__detach();

          this._detachNativeEvents();
        },
      },
      {
        key: 'setNativeProps',
        value: function (t) {
          this._component.setNativeProps(t);
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this._attachProps(this.props);
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          if (this._invokeAnimatedPropsCallbackOnMount) {
            this._invokeAnimatedPropsCallbackOnMount = false;

            this._animatedPropsCallback();
          }

          this._propsAnimated.setNativeView(this._component);

          this._attachNativeEvents();
        },
      },
      {
        key: '_attachNativeEvents',
        value: function () {
          var t,
            n = this,
            o = null != (t = this._component) && t.getScrollableNode ? this._component.getScrollableNode() : this._component,
            s = function (t) {
              var s = n.props[t];

              if (s instanceof module220 && s.__isNative) {
                s.__attach(o, t);

                n._eventDetachers.push(function () {
                  return s.__detach(o, t);
                });
              }
            };

          for (var p in this.props) s(p);
        },
      },
      {
        key: '_detachNativeEvents',
        value: function () {
          this._eventDetachers.forEach(function (t) {
            return t();
          });

          this._eventDetachers = [];
        },
      },
      {
        key: '_attachProps',
        value: function (t) {
          var n = this._propsAnimated;
          this._propsAnimated = new module235(t, this._animatedPropsCallback);
          if (n) n.__detach();
        },
      },
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          this._attachProps(t);
        },
      },
      {
        key: 'componentDidUpdate',
        value: function (t) {
          if (this._component !== this._prevComponent) this._propsAnimated.setNativeView(this._component);

          if (!(this._component === this._prevComponent && t === this.props)) {
            this._detachNativeEvents();

            this._attachNativeEvents();
          }
        },
      },
      {
        key: 'render',
        value: function () {
          var n = this._propsAnimated.__getValue();

          return <y />;
        },
      },
      {
        key: 'getNode',
        value: function () {
          return this._component;
        },
      },
    ]);
    return P;
  })(React.Component);

  k.__skipSetNativeProps_FOR_TESTS_ONLY = false;
  var A = y.propTypes;
  k.propTypes = {
    style: function (t, n, o) {
      if (A)
        for (var s in module76)
          A[s] ||
            undefined === t[s] ||
            console.warn('You are setting the style `{ ' + s + ': ... }` as a prop. You should nest it in a style object. E.g. `{ style: { ' + s + ': ... } }`');
    },
  };
  return k;
};

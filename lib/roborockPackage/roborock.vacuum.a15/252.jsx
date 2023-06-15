var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function _() {
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

var module224 = require('./224').AnimatedEvent,
  module239 = require('./239'),
  React = require('react'),
  module77 = require('./77'),
  module13 = require('./13');

module.exports = function (y, N) {
  module13(
    'function' != typeof y || (y.prototype && y.prototype.isReactComponent),
    '`createAnimatedComponent` does not support stateless functional components; use a class component instead.'
  );

  class k {
    constructor(t) {
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

    componentWillUnmount() {
      if (this._propsAnimated) this._propsAnimated.__detach();

      this._detachNativeEvents();
    }

    setNativeProps(t) {
      this._component.setNativeProps(t);
    }

    UNSAFE_componentWillMount() {
      this._attachProps(this.props);
    }

    componentDidMount() {
      if (this._invokeAnimatedPropsCallbackOnMount) {
        this._invokeAnimatedPropsCallbackOnMount = false;

        this._animatedPropsCallback();
      }

      this._propsAnimated.setNativeView(this._component);

      this._attachNativeEvents();
    }

    _attachNativeEvents() {
      var t,
        n = this,
        o = (null == (t = this._component) ? undefined : t.getScrollableNode) ? this._component.getScrollableNode() : this._component,
        s = function (t) {
          var s = n.props[t];

          if (s instanceof module224 && s.__isNative) {
            s.__attach(o, t);

            n._eventDetachers.push(function () {
              return s.__detach(o, t);
            });
          }
        };

      for (var p in this.props) s(p);
    }

    _detachNativeEvents() {
      this._eventDetachers.forEach(function (t) {
        return t();
      });

      this._eventDetachers = [];
    }

    _attachProps(t) {
      var n = this._propsAnimated;
      this._propsAnimated = new module239(t, this._animatedPropsCallback);
      if (n) n.__detach();
    }

    UNSAFE_componentWillReceiveProps(t) {
      this._attachProps(t);
    }

    componentDidUpdate(t) {
      if (this._component !== this._prevComponent) this._propsAnimated.setNativeView(this._component);

      if (!(this._component === this._prevComponent && t === this.props)) {
        this._detachNativeEvents();

        this._attachNativeEvents();
      }
    }

    render() {
      var n = this._propsAnimated.__getValue();

      return <y />;
    }

    getNode() {
      return this._component;
    }
  }

  k.__skipSetNativeProps_FOR_TESTS_ONLY = false;
  var A = y.propTypes;
  k.propTypes = {
    style: function (t, n, o) {
      if (A)
        for (var s in module77)
          A[s] ||
            undefined === t[s] ||
            console.warn('You are setting the style `{ ' + s + ': ... }` as a prop. You should nest it in a style object. E.g. `{ style: { ' + s + ': ... } }`');
    },
  };
  return k;
};

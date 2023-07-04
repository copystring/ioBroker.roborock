var t,
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module21 = require('./21'),
  module291 = require('./291');

function k() {
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

var React = require('react'),
  module77 = require('./77');

function _(t) {
  return {
    backgroundColor:
      null != t.backgroundColor
        ? {
            value: t.backgroundColor,
            animated: t.animated,
          }
        : null,
    barStyle:
      null != t.barStyle
        ? {
            value: t.barStyle,
            animated: t.animated,
          }
        : null,
    translucent: t.translucent,
    hidden:
      null != t.hidden
        ? {
            value: t.hidden,
            animated: t.animated,
            transition: t.showHideTransition,
          }
        : null,
    networkActivityIndicatorVisible: t.networkActivityIndicatorVisible,
  };
}

var S = (function (t, ...args) {
  module7.default(S, t);

  var n = S,
    module21 = k(),
    v = function () {
      var t,
        u = module11.default(n);

      if (module21) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(u, arguments, l);
      } else t = u.apply(this, arguments);

      return module9.default(this, t);
    };

  function S() {
    var t;
    module4.default(this, S);
    (t = v.call(this, ...args))._stackEntry = null;
    return t;
  }

  module5.default(
    S,
    [
      {
        key: 'componentDidMount',
        value: function () {
          this._stackEntry = S.pushStackEntry(this.props);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          S.popStackEntry(this._stackEntry);
        },
      },
      {
        key: 'componentDidUpdate',
        value: function () {
          this._stackEntry = S.replaceStackEntry(this._stackEntry, this.props);
        },
      },
      {
        key: 'render',
        value: function () {
          return null;
        },
      },
    ],
    [
      {
        key: 'setHidden',
        value: function (t, n) {
          n = n || 'none';
          S._defaultProps.hidden.value = t;
          module291.default.setHidden(t);
        },
      },
      {
        key: 'setBarStyle',
        value: function (t, n) {
          n = n || false;
          S._defaultProps.barStyle.value = t;
          module291.default.setStyle(t);
        },
      },
      {
        key: 'setNetworkActivityIndicatorVisible',
        value: function (t) {
          console.warn('`setNetworkActivityIndicatorVisible` is only available on iOS');
        },
      },
      {
        key: 'setBackgroundColor',
        value: function (t, n) {
          n = n || false;
          S._defaultProps.backgroundColor.value = t;
          var u = module77(t);
          if (null != u) module291.default.setColor(u, n);
          else console.warn('`StatusBar.setBackgroundColor`: Color ' + t + ' parsed to null or undefined');
        },
      },
      {
        key: 'setTranslucent',
        value: function (t) {
          S._defaultProps.translucent = t;
          module291.default.setTranslucent(t);
        },
      },
      {
        key: 'pushStackEntry',
        value: function (t) {
          var n = _(t);

          S._propsStack.push(n);

          S._updatePropsStack();

          return n;
        },
      },
      {
        key: 'popStackEntry',
        value: function (t) {
          var n = S._propsStack.indexOf(t);

          if (-1 !== n) S._propsStack.splice(n, 1);

          S._updatePropsStack();
        },
      },
      {
        key: 'replaceStackEntry',
        value: function (t, n) {
          var u = _(n),
            l = S._propsStack.indexOf(t);

          if (-1 !== l) S._propsStack[l] = u;

          S._updatePropsStack();

          return u;
        },
      },
    ]
  );
  return S;
})(React.Component);

S._propsStack = [];
S._defaultProps = _({
  animated: false,
  showHideTransition: 'fade',
  backgroundColor: null != (t = module291.default.getConstants().DEFAULT_BACKGROUND_COLOR) ? t : 'black',
  barStyle: 'default',
  translucent: false,
  hidden: false,
  networkActivityIndicatorVisible: false,
});
S._updateImmediate = null;
S._currentValues = null;
S.currentHeight = module291.default.getConstants().HEIGHT;
S.defaultProps = {
  animated: false,
  showHideTransition: 'fade',
};

S._updatePropsStack = function () {
  clearImmediate(S._updateImmediate);
  S._updateImmediate = setImmediate(function () {
    var t = S._propsStack,
      n = S._defaultProps,
      u = S._currentValues,
      l = t.reduce(function (t, n) {
        for (var u in n) null != n[u] && (t[u] = n[u]);

        return t;
      }, module21.default({}, n));

    if (((u && u.barStyle.value === l.barStyle.value) || module291.default.setStyle(l.barStyle.value), !u || u.backgroundColor.value !== l.backgroundColor.value)) {
      var o = module77(l.backgroundColor.value);
      if (null == o) console.warn('`StatusBar._updatePropsStack`: Color ' + l.backgroundColor.value + ' parsed to null or undefined');
      else module291.default.setColor(o, l.backgroundColor.animated);
    }

    if (!(u && u.hidden.value === l.hidden.value)) module291.default.setHidden(l.hidden.value);
    if (!(u && u.translucent === l.translucent)) module291.default.setTranslucent(l.translucent);
    S._currentValues = l;
  });
};

module.exports = S;

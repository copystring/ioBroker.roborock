var t,
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module22 = require('./22'),
  module295 = require('./295');

function k() {
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

var React = require('react'),
  module78 = require('./78');

function S(t) {
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

var _ = (function (t, ...args) {
  module7.default(_, t);

  var n = _,
    module22 = k(),
    v = function () {
      var t,
        u = module11.default(n);

      if (module22) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(u, arguments, l);
      } else t = u.apply(this, arguments);

      return module9.default(this, t);
    };

  function _() {
    var t;
    module4.default(this, _);
    (t = v.call(this, ...args))._stackEntry = null;
    return t;
  }

  module5.default(
    _,
    [
      {
        key: 'componentDidMount',
        value: function () {
          this._stackEntry = _.pushStackEntry(this.props);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          _.popStackEntry(this._stackEntry);
        },
      },
      {
        key: 'componentDidUpdate',
        value: function () {
          this._stackEntry = _.replaceStackEntry(this._stackEntry, this.props);
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
          _._defaultProps.hidden.value = t;
          module295.default.setHidden(t);
        },
      },
      {
        key: 'setBarStyle',
        value: function (t, n) {
          n = n || false;
          _._defaultProps.barStyle.value = t;
          module295.default.setStyle(t);
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
          _._defaultProps.backgroundColor.value = t;
          var u = module78(t);
          if (null != u) module295.default.setColor(u, n);
          else console.warn('`StatusBar.setBackgroundColor`: Color ' + t + ' parsed to null or undefined');
        },
      },
      {
        key: 'setTranslucent',
        value: function (t) {
          _._defaultProps.translucent = t;
          module295.default.setTranslucent(t);
        },
      },
      {
        key: 'pushStackEntry',
        value: function (t) {
          var n = S(t);

          _._propsStack.push(n);

          _._updatePropsStack();

          return n;
        },
      },
      {
        key: 'popStackEntry',
        value: function (t) {
          var n = _._propsStack.indexOf(t);

          if (-1 !== n) _._propsStack.splice(n, 1);

          _._updatePropsStack();
        },
      },
      {
        key: 'replaceStackEntry',
        value: function (t, n) {
          var u = S(n),
            l = _._propsStack.indexOf(t);

          if (-1 !== l) _._propsStack[l] = u;

          _._updatePropsStack();

          return u;
        },
      },
    ]
  );
  return _;
})(React.Component);

_._propsStack = [];
_._defaultProps = S({
  animated: false,
  showHideTransition: 'fade',
  backgroundColor: null != (t = module295.default.getConstants().DEFAULT_BACKGROUND_COLOR) ? t : 'black',
  barStyle: 'default',
  translucent: false,
  hidden: false,
  networkActivityIndicatorVisible: false,
});
_._updateImmediate = null;
_._currentValues = null;
_.currentHeight = module295.default.getConstants().HEIGHT;
_.defaultProps = {
  animated: false,
  showHideTransition: 'fade',
};

_._updatePropsStack = function () {
  clearImmediate(_._updateImmediate);
  _._updateImmediate = setImmediate(function () {
    var t = _._propsStack,
      n = _._defaultProps,
      u = _._currentValues,
      l = t.reduce(function (t, n) {
        for (var u in n) null != n[u] && (t[u] = n[u]);

        return t;
      }, module22.default({}, n));

    if (((u && u.barStyle.value === l.barStyle.value) || module295.default.setStyle(l.barStyle.value), !u || u.backgroundColor.value !== l.backgroundColor.value)) {
      var o = module78(l.backgroundColor.value);
      if (null == o) console.warn('`StatusBar._updatePropsStack`: Color ' + l.backgroundColor.value + ' parsed to null or undefined');
      else module295.default.setColor(o, l.backgroundColor.animated);
    }

    if (!(u && u.hidden.value === l.hidden.value)) module295.default.setHidden(l.hidden.value);
    if (!(u && u.translucent === l.translucent)) module295.default.setTranslucent(l.translucent);
    _._currentValues = l;
  });
};

module.exports = _;

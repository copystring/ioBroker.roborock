var o =
    Object.assign ||
    function (t) {
      for (var o = 1; o < arguments.length; o++) {
        var n = arguments[o];

        for (var l in n) Object.prototype.hasOwnProperty.call(n, l) && (t[l] = n[l]);
      }

      return t;
    },
  React = require('react'),
  module13 = require('./13'),
  module1205 = require('./1205'),
  PropTypes = require('prop-types');

function c(t, o) {
  var n = {};

  for (var l in t) o.indexOf(l) >= 0 || (Object.prototype.hasOwnProperty.call(t, l) && (n[l] = t[l]));

  return n;
}

function p(t) {
  if (Array.isArray(t)) {
    for (var o = 0, n = Array(t.length); o < t.length; o++) n[o] = t[o];

    return n;
  }

  return Array.from(t);
}

function y(t, o) {
  if (!(t instanceof o)) throw new TypeError('Cannot call a class as a function');
}

function h(t, o) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !o || ('object' != typeof o && 'function' != typeof o) ? t : o;
}

function v(t, o) {
  if ('function' != typeof o && null !== o) throw new TypeError('Super expression must either be null or a function, not ' + typeof o);
  t.prototype = Object.create(o && o.prototype, {
    constructor: {
      value: t,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (o) Object.setPrototypeOf ? Object.setPrototypeOf(t, o) : (t.__proto__ = o);
}

var b = module1205.default.component({
    viewName: 'LottieAnimationView',
    mockComponent: module13.View,
  }),
  w = module13.Animated.createAnimatedComponent(b),
  A = module1205.default.module({
    moduleName: 'LottieAnimationView',
    mock: {
      play: function () {},
      reset: function () {},
    },
  }),
  O = o({}, module13.ViewPropTypes, {
    style: function (t, o, n) {
      for (var u = arguments.length, s = Array(u > 3 ? u - 3 : 0), f = 3; f < u; f++) s[f - 3] = arguments[f];

      var c = module13.StyleSheet.flatten(t[o]);
      return Object.keys(c).some(function (t) {
        return t.startsWith('border');
      })
        ? Error(
            n +
              " does not allow any border related style properties to be specified. Border styles for this component will behave differently across platforms. If you'd like to render a border around this component, wrap it with a View."
          )
        : module13.ViewPropTypes.style.apply(module13.ViewPropTypes, [t, o, n].concat(s));
    },
    children: function (t, o, n) {
      return null != t[o] ? Error(n + " cannot specify '" + o + "'.") : null;
    },
    resizeMode: PropTypes.default.oneOf(['cover', 'contain', 'center']),
    progress: PropTypes.default.oneOfType([PropTypes.default.number, PropTypes.default.object]),
    speed: PropTypes.default.number,
    loop: PropTypes.default.bool,
    autoPlay: PropTypes.default.bool,
    autoSize: PropTypes.default.bool,
    enableMergePathsAndroidForKitKatAndAbove: PropTypes.default.bool,
    source: PropTypes.default.oneOfType([PropTypes.default.object, PropTypes.default.string]).isRequired,
    hardwareAccelerationAndroid: PropTypes.default.bool,
    cacheStrategy: PropTypes.default.oneOf(['none', 'weak', 'strong']),
  }),
  P = {
    uiViewClassName: 'LottieAnimationView',
    validAttributes: {
      progress: true,
    },
  };

class j {
  constructor(t) {
    y(this, s);
    var o = h(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, t));
    o.viewConfig = P;
    o.refRoot = o.refRoot.bind(o);
    return o;
  }

  componentDidUpdate(t) {
    if (this.props.source.nm !== t.source.nm && this.props.autoPlay) this.play();
  }

  setNativeProps(t) {
    module13.UIManager.updateView(this.getHandle(), this.viewConfig.uiViewClassName, {
      progress: t.progress,
    });
  }

  play() {
    var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : -1,
      o = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : -1;
    this.runCommand('play', [t, o]);
  }

  reset() {
    this.runCommand('reset');
  }

  runCommand(t) {
    var o = this,
      n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : [],
      u = this.getHandle();
    if (u)
      return module13.Platform.select({
        android: function () {
          return module13.UIManager.dispatchViewManagerCommand(u, module13.UIManager.LottieAnimationView.Commands[t], n);
        },
        ios: function () {
          return A[t](o.getHandle(), ...p(n));
        },
      })();
    else {
      console.warn('Trying to animate a view on an unmounted component');
      return null;
    }
  }

  getHandle() {
    return module13.findNodeHandle(this.root);
  }

  refRoot(t) {
    this.root = t;
    if (this.props.autoPlay) this.play();
  }

  render() {
    var t = this.props,
      u = t.style,
      s = t.source,
      f = t.autoSize,
      p = c(t, ['style', 'source', 'autoSize']),
      y = 'string' == typeof s ? s : undefined,
      h = 'string' == typeof s ? undefined : JSON.stringify(s),
      v = h
        ? {
            aspectRatio: s.w / s.h,
          }
        : undefined,
      b = module13.StyleSheet.flatten(u),
      A = undefined;
    if (!b || (undefined === b.width && undefined === b.height))
      A =
        f && h
          ? {
              width: s.w,
            }
          : module13.StyleSheet.absoluteFill;
    return React.default.createElement(
      module13.View,
      {
        style: [v, A, u],
        __source: {
          fileName: 'src/js/LottieView.js',
          lineNumber: 153,
        },
      },
      React.default.createElement(
        w,
        o(
          {
            ref: this.refRoot,
          },
          p,
          {
            style: [
              v,
              A || {
                width: '100%',
                height: '100%',
              },
              u,
            ],
            sourceName: y,
            sourceJson: h,
            __source: {
              fileName: 'src/js/LottieView.js',
              lineNumber: 154,
            },
          }
        )
      )
    );
  }
}

j.propTypes = O;
j.defaultProps = {
  progress: 0,
  speed: 1,
  loop: true,
  autoPlay: false,
  autoSize: false,
  enableMergePathsAndroidForKitKatAndAbove: false,
  resizeMode: 'contain',
};
module.exports = j;

var o =
    Object.assign ||
    function (t) {
      for (var o = 1; o < arguments.length; o++) {
        var n = arguments[o];

        for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
      }

      return t;
    },
  React = require('react'),
  module12 = require('./12'),
  module926 = require('./926'),
  PropTypes = require('prop-types');

function p(t, o) {
  var n = {};

  for (var s in t) o.indexOf(s) >= 0 || (Object.prototype.hasOwnProperty.call(t, s) && (n[s] = t[s]));

  return n;
}

function c(t) {
  if (Array.isArray(t)) {
    for (var o = 0, n = Array(t.length); o < t.length; o++) n[o] = t[o];

    return n;
  }

  return Array.from(t);
}

function h(t, o) {
  if (!(t instanceof o)) throw new TypeError('Cannot call a class as a function');
}

function y(t, o) {
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

var b = module926.default.component({
    viewName: 'LottieAnimationView',
    mockComponent: module12.View,
  }),
  w = module12.Animated.createAnimatedComponent(b),
  A = module926.default.module({
    moduleName: 'LottieAnimationView',
    mock: {
      play: function () {},
      reset: function () {},
    },
  }),
  O = o({}, module12.ViewPropTypes, {
    style: function (t, o, n) {
      for (var u = arguments.length, l = Array(u > 3 ? u - 3 : 0), f = 3; f < u; f++) l[f - 3] = arguments[f];

      var p = module12.StyleSheet.flatten(t[o] || {});
      return Object.keys(p).some(function (t) {
        return t.startsWith('border');
      })
        ? Error(
            n +
              " does not allow any border related style properties to be specified. Border styles for this component will behave differently across platforms. If you'd like to render a border around this component, wrap it with a View."
          )
        : module12.ViewPropTypes.style.apply(module12.ViewPropTypes, [t, o, n].concat(l));
    },
    children: function (t, o, n) {
      return null != t[o] ? Error(n + " cannot specify '" + o + "'.") : null;
    },
    resizeMode: PropTypes.default.oneOf(['cover', 'contain', 'center']),
    progress: PropTypes.default.oneOfType([PropTypes.default.number, PropTypes.default.object]),
    speed: PropTypes.default.number,
    duration: PropTypes.default.number,
    loop: PropTypes.default.bool,
    autoPlay: PropTypes.default.bool,
    autoSize: PropTypes.default.bool,
    enableMergePathsAndroidForKitKatAndAbove: PropTypes.default.bool,
    source: PropTypes.default.oneOfType([PropTypes.default.object, PropTypes.default.string]).isRequired,
    hardwareAccelerationAndroid: PropTypes.default.bool,
    cacheStrategy: PropTypes.default.oneOf(['none', 'weak', 'strong']),
    onAnimationFinish: PropTypes.default.func,
  }),
  P = {
    uiViewClassName: 'LottieAnimationView',
    validAttributes: {
      progress: true,
    },
  };

class j {
  constructor(t) {
    h(this, l);
    var o = y(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, t));
    o.viewConfig = P;
    o.refRoot = o.refRoot.bind(o);
    o.onAnimationFinish = o.onAnimationFinish.bind(o);
    return o;
  }

  componentDidUpdate(t) {
    if (this.props.source.nm !== t.source.nm && this.props.autoPlay) this.play();
  }

  setNativeProps(t) {
    module12.UIManager.updateView(this.getHandle(), this.viewConfig.uiViewClassName, {
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
    return u
      ? module12.Platform.select({
          android: function () {
            return module12.UIManager.dispatchViewManagerCommand(u, module12.UIManager.LottieAnimationView.Commands[t], n);
          },
          ios: function () {
            return A[t](o.getHandle(), ...c(n));
          },
        })()
      : null;
  }

  getHandle() {
    return module12.findNodeHandle(this.root);
  }

  refRoot(t) {
    this.root = t;
    if (this.props.autoPlay) this.play();
  }

  onAnimationFinish(t) {
    if (this.props.onAnimationFinish) this.props.onAnimationFinish(t.nativeEvent.isCancelled);
  }

  render() {
    var t = this.props,
      u = t.style,
      l = t.source,
      f = t.autoSize,
      c = p(t, ['style', 'source', 'autoSize']),
      h = 'string' == typeof l ? l : undefined,
      y = 'string' == typeof l ? undefined : JSON.stringify(l),
      v = y
        ? {
            aspectRatio: l.w / l.h,
          }
        : undefined,
      b = module12.StyleSheet.flatten(u),
      A = undefined;
    if (!b || (undefined === b.width && undefined === b.height))
      A =
        f && y
          ? {
              width: l.w,
            }
          : module12.StyleSheet.absoluteFill;
    var O = this.props.duration && y && this.props.source.fr ? Math.round(((this.props.source.op / this.props.source.fr) * 1e3) / this.props.duration) : this.props.speed;
    return React.default.createElement(
      module12.View,
      {
        style: [v, A, u],
        __source: {
          fileName: 'src/js/LottieView.js',
          lineNumber: 166,
        },
      },
      React.default.createElement(
        w,
        o(
          {
            ref: this.refRoot,
          },
          c,
          {
            speed: O,
            style: [
              v,
              A || {
                width: '100%',
                height: '100%',
              },
              u,
            ],
            sourceName: h,
            sourceJson: y,
            onAnimationFinish: this.onAnimationFinish,
            __source: {
              fileName: 'src/js/LottieView.js',
              lineNumber: 167,
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

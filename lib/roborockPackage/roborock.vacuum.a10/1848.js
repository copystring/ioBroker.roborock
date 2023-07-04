var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module1845 = require('./1845'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = O(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var p = f ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (p && (p.get || p.set)) Object.defineProperty(u, l, p);
        else u[l] = t[l];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module1849 = require('./1849'),
  P = ['width', 'height', 'style', 'onLoad', 'onProgress', 'eventsThrough'];

function O(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (O = function (t) {
    return t ? o : n;
  })(t);
}

function C(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function j(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      C(Object(o), true).forEach(function (n) {
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      C(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function F() {
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

var w = function (t) {
    return t.format + ':' + t.type + ':' + t.quality;
  },
  k = module12.requireNativeComponent('GLCanvas', _, {
    nativeOnly: {
      onGLChange: true,
      onGLProgress: true,
      onGLCaptureFrame: true,
    },
  }),
  _ = (function (t, ...args) {
    module7.default(_, t);

    var module49 = _,
      O = F(),
      C = function () {
        var t,
          n = module11.default(module49);

        if (O) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function _() {
      var t;
      module4.default(this, _);
      (t = C.call(this, ...args)).viewConfig = {
        uiViewClassName: 'GLCanvas',
      };

      t.onGLCaptureFrame = function (n) {
        var o = n.nativeEvent,
          u = o.error,
          f = o.result,
          l = o.config,
          p = w(l);
        module1845.default(p in t._pendingCaptureFrame, "capture '%s' is not scheduled in this._pendingCaptureFrame", p);
        if (u) t._pendingCaptureFrame[p].reject(u);
        else t._pendingCaptureFrame[p].resolve(f);
        delete t._pendingCaptureFrame[p];
      };

      return t;
    }

    module5.default(_, [
      {
        key: 'componentWillMount',
        value: function () {
          this._pendingCaptureFrame = {};
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          var t = this;
          Object.keys(this._pendingCaptureFrame).forEach(function (n) {
            return t._pendingCaptureFrame[n].reject(new Error('GLCanvas is unmounting'));
          });
          this._pendingCaptureFrame = null;
        },
      },
      {
        key: 'setNativeProps',
        value: function (t) {
          this.refs.native.setNativeProps(t);
        },
      },
      {
        key: '_addPendingCaptureFrame',
        value: function (t) {
          var n = w(t);
          return this._pendingCaptureFrame[n] || (module1849.default(module12.findNodeHandle(this.refs.native), t), (this._pendingCaptureFrame[n] = this._makeDeferred()));
        },
      },
      {
        key: '_makeDeferred',
        value: function () {
          var t = {},
            n = new Promise(function (n, o) {
              t.resolve = n;
              t.reject = o;
            });
          t.promise = n;
          return t;
        },
      },
      {
        key: 'captureFrame',
        value: function (t) {
          var n;

          if (t) {
            module1845.default('object' == typeof t, 'captureFrame takes an object option in parameter');
            var o = 0;

            if ('format' in t) {
              module1845.default('string' == typeof t.format, "captureFrame({format}): format must be a string (e.g: 'base64'), Got: '%s'", t.format);
              if ('file' === t.format)
                module1845.default(
                  'string' == typeof t.filePath && t.filePath,
                  "captureFrame({filePath}): filePath must be defined when using 'file' format and be an non-empty string, Got: '%s'",
                  t.filePath
                );
              o++;
            }

            if ('type' in t) {
              module1845.default('string' == typeof t.type, "captureFrame({type}): type must be a string (e.g: 'png', 'jpg'), Got: '%s'", t.type);
              o++;
            }

            if ('quality' in t) {
              module1845.default(
                'number' == typeof t.quality && t.quality >= 0 && t.quality <= 1,
                "captureFrame({quality}): quality must be a number between 0 and 1, Got: '%s'",
                t.quality
              );
              o++;
            }

            if ('filePath' in t) o++;
            var u = Object.keys(t);
            module1845.default(u.length === o, "captureFrame(config): config must be an object with {format, type, quality, filePath}, found some invalid keys in '%s'", u);
            n = t;
          }

          return this._addPendingCaptureFrame(
            j(
              {
                format: 'base64',
                type: 'png',
                quality: 1,
                filePath: '',
              },
              n
            )
          ).promise;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.props,
            u = t.width,
            f = t.height,
            l = t.style,
            p = t.onLoad,
            s = t.onProgress,
            c = t.eventsThrough,
            y = module55.default(t, P),
            b = l.backgroundColor;
          return React.default.createElement(
            k,
            module21.default(
              {
                ref: 'native',
              },
              y,
              {
                backgroundColor: module12.processColor(b),
                style: {
                  width: u,
                  height: f,
                },
                onGLLoad: p || null,
                onGLProgress: s || null,
                onGLCaptureFrame: this.onGLCaptureFrame,
                pointerEvents: c ? 'none' : 'auto',
              }
            )
          );
        },
      },
    ]);
    return _;
  })(React.Component);

module.exports = _;

var n,
  module22 = require('./22'),
  React = require('react'),
  module13 = require('./13'),
  module29 = require('./29'),
  module2006 = require('./2006'),
  module2007 = require('./2007'),
  module2009 = require('./2009'),
  h =
    (this && this.__extends) ||
    ((n = function (t, o) {
      return (n =
        Object.setPrototypeOf ||
        ({
          __proto__: [],
        } instanceof Array &&
          function (t, n) {
            t.__proto__ = n;
          }) ||
        function (t, n) {
          for (var o in n) n.hasOwnProperty(o) && (t[o] = n[o]);
        })(t, o);
    }),
    function (t, o) {
      function s() {
        this.constructor = t;
      }

      n(t, o);
      t.prototype = null === o ? Object.create(o) : ((s.prototype = o.prototype), new s());
    }),
  v =
    (this && this.__awaiter) ||
    function (t, n, o, s) {
      return new (o || (o = Promise))(function (l, u) {
        function c(t) {
          try {
            f(s.next(t));
          } catch (t) {
            u(t);
          }
        }

        function p(t) {
          try {
            f(s.throw(t));
          } catch (t) {
            u(t);
          }
        }

        function f(t) {
          var n;
          if (t.done) l(t.value);
          else
            ((n = t.value),
            n instanceof o
              ? n
              : new o(function (t) {
                  t(n);
                })).then(c, p);
        }

        f((s = s.apply(t, n || [])).next());
      });
    },
  w =
    (this && this.__generator) ||
    function (t, n) {
      var o,
        s,
        l,
        module29,
        c = {
          label: 0,
          sent: function () {
            if (1 & l[0]) throw l[1];
            return l[1];
          },
          trys: [],
          ops: [],
        };
      module29 = {
        next: p(0),
        throw: p(1),
        return: p(2),
      };
      if ('function' == typeof Symbol)
        module29['function' == typeof Symbol ? Symbol.iterator : '@@iterator'] = function () {
          return this;
        };
      return module29;

      function p(t) {
        return function (n) {
          return f([t, n]);
        };
      }

      function f(u) {
        if (o) throw new TypeError('Generator is already executing.');

        for (; c; )
          try {
            if (((o = 1), s && (l = 2 & u[0] ? s.return : u[0] ? s.throw || ((l = s.return) && l.call(s), 0) : s.next) && !(l = l.call(s, u[1])).done)) return l;

            switch (((s = 0), l && (u = [2 & u[0], l.value]), u[0])) {
              case 0:
              case 1:
                l = u;
                break;

              case 4:
                c.label++;
                return {
                  value: u[1],
                  done: false,
                };

              case 5:
                c.label++;
                s = u[1];
                u = [0];
                continue;

              case 7:
                u = c.ops.pop();
                c.trys.pop();
                continue;

              default:
                if (!(l = (l = c.trys).length > 0 && l[l.length - 1]) && (6 === u[0] || 2 === u[0])) {
                  c = 0;
                  continue;
                }

                if (3 === u[0] && (!l || (u[1] > l[0] && u[1] < l[3]))) {
                  c.label = u[1];
                  break;
                }

                if (6 === u[0] && c.label < l[1]) {
                  c.label = l[1];
                  l = u;
                  break;
                }

                if (l && c.label < l[2]) {
                  c.label = l[2];
                  c.ops.push(u);
                  break;
                }

                if (l[2]) c.ops.pop();
                c.trys.pop();
                continue;
            }

            u = n.call(t, c);
          } catch (t) {
            u = [6, t];
            s = 0;
          } finally {
            o = l = 0;
          }

        if (5 & u[0]) throw u[1];
        return {
          value: u[0] ? u[1] : undefined,
          done: true,
        };
      }
    },
  b =
    (this && this.__rest) ||
    function (t, n) {
      var o = {};

      for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && n.indexOf(s) < 0 && (o[s] = t[s]);

      if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
        var l = 0;

        for (s = Object.getOwnPropertySymbols(t); l < s.length; l++) n.indexOf(s[l]) < 0 && Object.prototype.propertyIsEnumerable.call(t, s[l]) && (o[s[l]] = t[s[l]]);
      }

      return o;
    },
  S = module13.UIManager,
  y = module13.requireNativeComponent('RNCWebView'),
  E = module13.Image.resolveAssetSource,
  C = 0,
  V = (function (t) {
    function n() {
      var n = (null !== t && t.apply(this, arguments)) || this;
      n.startUrl = null;
      n.state = {
        viewState: n.props.startInLoadingState ? 'LOADING' : 'IDLE',
        lastErrorEvent: null,
      };
      n.webViewRef = React.default.createRef();
      n.messagingModuleName = 'WebViewMessageHandler' + (C += 1);

      n.componentDidMount = function () {
        module29.default.registerCallableModule(n.messagingModuleName, n);
      };

      n.getCommands = function () {
        return S.getViewManagerConfig('RNCWebView').Commands;
      };

      n.goForward = function () {
        S.dispatchViewManagerCommand(n.getWebViewHandle(), n.getCommands().goForward, undefined);
      };

      n.goBack = function () {
        S.dispatchViewManagerCommand(n.getWebViewHandle(), n.getCommands().goBack, undefined);
      };

      n.reload = function () {
        n.setState({
          viewState: 'LOADING',
        });
        S.dispatchViewManagerCommand(n.getWebViewHandle(), n.getCommands().reload, undefined);
      };

      n.stopLoading = function () {
        S.dispatchViewManagerCommand(n.getWebViewHandle(), n.getCommands().stopLoading, undefined);
      };

      n.requestFocus = function () {
        S.dispatchViewManagerCommand(n.getWebViewHandle(), n.getCommands().requestFocus, undefined);
      };

      n.postMessage = function (t) {
        S.dispatchViewManagerCommand(n.getWebViewHandle(), n.getCommands().postMessage, [String(t)]);
      };

      n.clearFormData = function () {
        S.dispatchViewManagerCommand(n.getWebViewHandle(), n.getCommands().clearFormData, undefined);
      };

      n.clearCache = function (t) {
        S.dispatchViewManagerCommand(n.getWebViewHandle(), n.getCommands().clearCache, [t]);
      };

      n.clearHistory = function () {
        S.dispatchViewManagerCommand(n.getWebViewHandle(), n.getCommands().clearHistory, undefined);
      };

      n.injectJavaScript = function (t) {
        S.dispatchViewManagerCommand(n.getWebViewHandle(), n.getCommands().injectJavaScript, [t]);
      };

      n.updateNavigationState = function (t) {
        if (n.props.onNavigationStateChange) n.props.onNavigationStateChange(t.nativeEvent);
      };

      n.getWebViewHandle = function () {
        var t = module13.findNodeHandle(n.webViewRef.current);
        module2006.default(null != t, 'nodeHandle expected to be non-null');
        return t;
      };

      n.onLoadingStart = function (t) {
        var o = n.props.onLoadStart,
          s = t.nativeEvent.url;
        n.startUrl = s;
        if (o) o(t);
        n.updateNavigationState(t);
      };

      n.onLoadingError = function (t) {
        t.persist();
        var o = n.props,
          s = o.onError,
          l = o.onLoadEnd;
        if (s) s(t);
        if (l) l(t);
        console.warn('Encountered an error loading page', t.nativeEvent);
        n.setState({
          lastErrorEvent: t.nativeEvent,
          viewState: 'ERROR',
        });
      };

      n.onHttpError = function (t) {
        var o = n.props.onHttpError;
        if (o) o(t);
      };

      n.onLoadingFinish = function (t) {
        var o = n.props,
          s = o.onLoad,
          l = o.onLoadEnd,
          u = t.nativeEvent.url;
        if (s) s(t);
        if (l) l(t);
        if (u === n.startUrl)
          n.setState({
            viewState: 'IDLE',
          });
        n.updateNavigationState(t);
      };

      n.onMessage = function (t) {
        var o = n.props.onMessage;
        if (o) o(t);
      };

      n.onLoadingProgress = function (t) {
        var o = n.props.onLoadProgress;
        if (1 === t.nativeEvent.progress)
          n.setState(function (t) {
            return 'LOADING' === t.viewState
              ? {
                  viewState: 'IDLE',
                }
              : null;
          });
        if (o) o(t);
      };

      n.onShouldStartLoadWithRequestCallback = function (t, o) {
        if (t) S.dispatchViewManagerCommand(n.getWebViewHandle(), n.getCommands().loadUrl, [String(o)]);
      };

      return n;
    }

    h(n, t);

    n.prototype.render = function () {
      var t = this.props,
        n = t.onMessage,
        u = t.onShouldStartLoadWithRequest,
        h = t.originWhitelist,
        v = t.renderError,
        w = t.renderLoading,
        S = t.source,
        C = t.style,
        V = t.containerStyle,
        L = t.nativeConfig,
        M = undefined === L ? {} : L,
        W = b(t, ['onMessage', 'onShouldStartLoadWithRequest', 'originWhitelist', 'renderError', 'renderLoading', 'source', 'style', 'containerStyle', 'nativeConfig']),
        O = null;
      if ('LOADING' === this.state.viewState) O = (w || module2007.defaultRenderLoading)();
      else if ('ERROR' === this.state.viewState) {
        var H = this.state.lastErrorEvent;
        module2006.default(null != H, 'lastErrorEvent expected to be non-null');
        O = (v || module2007.defaultRenderError)(H.domain, H.code, H.description);
      } else 'IDLE' !== this.state.viewState && console.error('RNCWebView invalid state encountered: ' + this.state.viewState);
      var R = [module2009.default.container, module2009.default.webView, C],
        N = [module2009.default.container, V];
      if ('number' != typeof S && S && 'method' in S)
        'POST' === S.method && S.headers
          ? console.warn('WebView: `source.headers` is not supported when using POST.')
          : 'GET' === S.method && S.body && console.warn('WebView: `source.body` is not supported when using GET.');

      var _ = M.component || y,
        P = module2007.createOnShouldStartLoadWithRequest(this.onShouldStartLoadWithRequestCallback, h, u),
        F = React.default.createElement(
          _,
          module22.default(
            {
              key: 'webViewKey',
            },
            W,
            {
              messagingEnabled: 'function' == typeof n,
              messagingModuleName: this.messagingModuleName,
              onLoadingError: this.onLoadingError,
              onLoadingFinish: this.onLoadingFinish,
              onLoadingProgress: this.onLoadingProgress,
              onLoadingStart: this.onLoadingStart,
              onHttpError: this.onHttpError,
              onMessage: this.onMessage,
              onShouldStartLoadWithRequest: P,
              ref: this.webViewRef,
              source: E(S),
              style: R,
            },
            M.props
          )
        );

      return React.default.createElement(
        module13.View,
        {
          style: N,
        },
        F,
        O
      );
    };

    n.defaultProps = {
      overScrollMode: 'always',
      javaScriptEnabled: true,
      thirdPartyCookiesEnabled: true,
      scalesPageToFit: true,
      allowsFullscreenVideo: false,
      allowFileAccess: false,
      saveFormDataDisabled: false,
      cacheEnabled: true,
      androidHardwareAccelerationDisabled: false,
      originWhitelist: module2007.defaultOriginWhitelist,
    };

    n.isFileUploadSupported = function () {
      return v(undefined, undefined, undefined, function () {
        return w(this, function (t) {
          return [2, module13.NativeModules.RNCWebView.isFileUploadSupported()];
        });
      });
    };

    return n;
  })(React.default.Component);

exports.default = V;

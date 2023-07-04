var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = s ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(u, l, c);
        else u[l] = t[l];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module1892 = require('./1892');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function b() {
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

var y = '(function() {\n  var result = document.documentElement.scrollHeight || document.body.scrollHeight;\n  window.ReactNativeWebView.postMessage(result) })();\n',
  k = (function (t) {
    module7.default(M, t);

    var v = M,
      k = b(),
      j = function () {
        var t,
          n = module11.default(v);

        if (k) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function M(t) {
      var n;
      module4.default(this, M);
      (n = j.call(this, t)).state = {
        webViewHeight: Number,
      };
      n.state = {
        webViewHeight: n.props.defaultHeight || module12.Dimensions.get('window').height,
        webViewBackgroundColor: '#f8f8f8',
      };
      n._onMessage = n._onMessage.bind(module6.default(n));
      return n;
    }

    module5.default(M, [
      {
        key: '_onMessage',
        value: function (t) {
          var n = parseInt(t.nativeEvent.data) || module12.Dimensions.get('window').height;
          if (n > 0)
            this.setState({
              webViewHeight: n,
              webViewBackgroundColor: 'white',
            });
        },
      },
      {
        key: 'onWebLoadEnd',
        value: function () {
          if (this.webview) this.webview.injectJavaScript(y);
        },
      },
      {
        key: 'stopLoading',
        value: function () {
          this.webview.stopLoading();
        },
      },
      {
        key: 'reload',
        value: function () {
          this.webview.reload();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.props.width || module12.Dimensions.get('window').width,
            u = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
          return React.default.createElement(
            module1892.WebView,
            module21.default(
              {
                ref: function (n) {
                  t.webview = n;
                },
                injectedJavaScript: y,
                scrollEnabled: this.props.scrollEnabled || false,
                onMessage: this._onMessage,
                javaScriptEnabled: true,
                automaticallyAdjustContentInsets: true,
                onLoadEnd: this.onWebLoadEnd.bind(this),
              },
              this.props,
              {
                style: [
                  {
                    width: o,
                  },
                  this.props.style,
                  {
                    height: u,
                  },
                  {
                    backgroundColor: this.state.webViewBackgroundColor,
                  },
                ],
              }
            )
          );
        },
      },
    ]);
    return M;
  })(React.Component);

exports.default = k;
k.defaultProps = {
  autoHeight: true,
};

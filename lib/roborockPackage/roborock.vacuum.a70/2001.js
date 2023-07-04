var module22 = require('./22'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1992 = require('./1992');

function b() {
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

var y = '(function() {\n  var result = document.documentElement.scrollHeight || document.body.scrollHeight;\n  window.ReactNativeWebView.postMessage(result) })();\n',
  H = (function (t) {
    module9.default(E, t);

    var n = E,
      H = b(),
      k = function () {
        var t,
          o = module12.default(n);

        if (H) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function E(t) {
      var n;
      module6.default(this, E);
      (n = k.call(this, t)).state = {
        webViewHeight: Number,
      };
      n.state = {
        webViewHeight: n.props.defaultHeight || module13.Dimensions.get('window').height,
        webViewBackgroundColor: '#f8f8f8',
      };
      n._onMessage = n._onMessage.bind(module8.default(n));
      return n;
    }

    module7.default(E, [
      {
        key: '_onMessage',
        value: function (t) {
          var n = parseInt(t.nativeEvent.data) || module13.Dimensions.get('window').height;
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
            n = this.props.width || module13.Dimensions.get('window').width,
            s = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
          return React.default.createElement(
            module1992.WebView,
            module22.default(
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
                    width: n,
                  },
                  this.props.style,
                  {
                    height: s,
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
    return E;
  })(React.Component);

exports.default = H;
H.defaultProps = {
  autoHeight: true,
};

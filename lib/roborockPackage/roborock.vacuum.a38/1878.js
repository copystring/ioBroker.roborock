var module22 = require('./22'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1869 = require('./1869');

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
    module7.default(E, t);

    var n = E,
      H = b(),
      k = function () {
        var t,
          o = module11.default(n);

        if (H) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var n;
      module4.default(this, E);
      (n = k.call(this, t)).state = {
        webViewHeight: Number,
      };
      n.state = {
        webViewHeight: n.props.defaultHeight || module12.Dimensions.get('window').height,
        webViewBackgroundColor: '#f8f8f8',
      };
      n._onMessage = n._onMessage.bind(module6.default(n));
      return n;
    }

    module5.default(E, [
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
            n = this.props.width || module12.Dimensions.get('window').width,
            s = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
          return React.default.createElement(
            module1869.WebView,
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

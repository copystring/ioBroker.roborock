var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module390 = require('./390'),
  module1992 = require('./1992');

function w() {
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

var b = module13.Dimensions.get('window'),
  v = b.width,
  k = (function (t) {
    module9.default(x, t);

    var n = x,
      b = w(),
      k = function () {
        var t,
          o = module12.default(n);

        if (b) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function x(t) {
      module6.default(this, x);
      return k.call(this, t);
    }

    module7.default(x, [
      {
        key: 'render',
        value: function () {
          if (!module390.default.isShowProductGuideVideo() || '' == this.props.url) return React.default.createElement(module13.View, null);
          var t =
            '<html>      <head>        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" >        <style type="text/css">          video::-webkit-media-controls-fullscreen-button{ display: none !important; }          video::-webkit-media-controls-mute-button { display: none !important;}        </style>      </head>      <body style="margin:0px;background-color:#f8f8f8">      <Video id="video" preload="none" controlsList="nodownload nofullscreen noremoteplayback" src="' +
            this.props.url +
            '" poster = "' +
            this.props.posterUrl +
            '" webkit-playsinline controls height=' +
            0.5625 * v +
            ' width=' +
            v +
            '/>      </body>    </html>';
          return React.default.createElement(
            module13.View,
            {
              style: R.imageRowContainer,
            },
            React.default.createElement(module1992.WebView, {
              allowsInlineMediaPlayback: true,
              mediaPlaybackRequiresUserAction: false,
              scalesPageToFit: false,
              scrollEnabled: false,
              source: {
                html: t,
              },
              startInLoadingState: false,
              javaScriptEnabled: true,
              style: {
                flex: 1,
                height: 240,
                width: v,
                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
              },
            })
          );
        },
      },
    ]);
    return x;
  })(React.default.Component);

exports.default = k;
var R = module13.StyleSheet.create({
  imageRowContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 0.5625 * v,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
});

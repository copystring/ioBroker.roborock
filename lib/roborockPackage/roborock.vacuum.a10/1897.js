var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = h(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(l, c, f);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module386 = require('./386'),
  module1890 = require('./1890');

function h(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (h = function (t) {
    return t ? o : n;
  })(t);
}

function w() {
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

var b = module12.Dimensions.get('window'),
  v = b.width,
  k = (function (t) {
    module7.default(j, t);

    var h = j,
      b = w(),
      k = function () {
        var t,
          n = module11.default(h);

        if (b) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function j(t) {
      module4.default(this, j);
      return k.call(this, t);
    }

    module5.default(j, [
      {
        key: 'render',
        value: function () {
          if (!module386.default.isShowProductGuideVideo() || '' == this.props.url) return React.default.createElement(module12.View, null);
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
            module12.View,
            {
              style: P.imageRowContainer,
            },
            React.default.createElement(module1890.WebView, {
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
    return j;
  })(React.default.Component);

exports.default = k;
var P = module12.StyleSheet.create({
  imageRowContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 0.5625 * v,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
});

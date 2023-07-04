var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module12 = require('./12');

function c(t, n) {
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

function s(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      c(Object(u), true).forEach(function (n) {
        module50.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      c(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

require('./86');

var module66 = require('./66'),
  module201 = require('./201'),
  module276 = require('./276'),
  module21 = require('./21'),
  PropTypes = require('prop-types'),
  React = require('react'),
  module61 = require('./61'),
  module203 = require('./203'),
  module83 = require('./83'),
  module194 = require('./194'),
  module177 = require('./177'),
  j = module21.ImageLoader,
  module279 = require('./279'),
  P = module12.ImageBackground;

console.warn(JSON.stringify(module12.UIManager));
if (module12.UIManager.MHImageView) P = module12.requireNativeComponent('MHImageView');
else if (module12.UIManager.RRImageView) P = module12.requireNativeComponent('RRImageView');
var z = 1;
var L = s(
  s({}, module276),
  {},
  {
    style: module201(module66),
    source: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
        headers: PropTypes.objectOf(PropTypes.string),
      }),
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.shape({
          uri: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
          headers: PropTypes.objectOf(PropTypes.string),
        })
      ),
    ]),
    blurRadius: PropTypes.number,
    defaultSource: PropTypes.number,
    loadingIndicatorSource: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.number,
    ]),
    progressiveRenderingEnabled: PropTypes.bool,
    fadeDuration: PropTypes.number,
    onLoadStart: PropTypes.func,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
    testID: PropTypes.string,
    resizeMethod: PropTypes.oneOf(['auto', 'resize', 'scale']),
    resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center']),
  }
);

var R = function (t, n) {
  var o,
    u,
    c = module177(t.source),
    s = module177(t.defaultSource),
    l = module177(t.loadingIndicatorSource);
  if (
    (c && c.uri && '' === c.uri && console.warn('source.uri should not be an empty string'),
    t.src && console.warn('The <Image> component requires a `source` property rather than `src`.'),
    t.children)
  )
    throw new Error(
      'The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.'
    );
  if (t.defaultSource && t.loadingIndicatorSource)
    throw new Error('The <Image> component cannot have defaultSource and loadingIndicatorSource at the same time. Please use either defaultSource or loadingIndicatorSource.');

  if ((!c || c.uri || Array.isArray(c) || (c = null), c && c.uri && null != c.uri)) {
    var f = c,
      h = f.width,
      p = f.height;
    o = module83([
      {
        width: h,
        height: p,
      },
      M.base,
      t.style,
    ]);
    u = [
      {
        uri: c.uri,
      },
    ];
  } else {
    o = module83([M.base, t.style]);
    u = c;
  }

  var b = t.onLoadStart,
    w = t.onLoad,
    j = t.onLoadEnd,
    z = t.onError,
    L = module194(t, {
      style: o,
      shouldNotifyLoadEvents: !!(b || w || j || z),
      src: u,
      headers: c && c.headers ? c.headers : null,
      defaultSrc: s ? s.uri : null,
      loadingIndicatorSrc: l ? l.uri : null,
      ref: n,
    });
  return (
    <module203.Consumer>
      {function (t) {
        return t ? <module279 /> : <P />;
      }}
    </module203.Consumer>
  );
};

(R = React.forwardRef(R)).displayName = 'Image';

R.getSize = function (t, n, o) {
  return j
    .getSize(t)
    .then(function (t) {
      n(t.width, t.height);
    })
    .catch(
      o ||
        function () {
          console.warn('Failed to get size for image: ' + t);
        }
    );
};

R.getSizeWithHeaders = function (t, n, o, u) {
  return j
    .getSizeWithHeaders(t, n)
    .then(function (t) {
      o(t.width, t.height);
    })
    .catch(
      u ||
        function () {
          console.warn('Failed to get size for image: ' + t);
        }
    );
};

R.prefetch = function (t, n) {
  var o = z++;
  if (n) n(o);
  return j.prefetchImage(t, o);
};

R.abortPrefetch = function (t) {
  j.abortRequest(t);
};

R.queryCache = function (t) {
  return regeneratorRuntime.default.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.next = 2;
            return regeneratorRuntime.default.awrap(j.queryCache(t));

          case 2:
            return o.abrupt('return', o.sent);

          case 3:
          case 'end':
            return o.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

R.resolveAssetSource = module177;
R.propTypes = L;
var M = module61.create({
  base: {
    overflow: 'hidden',
  },
});
module.exports = R;

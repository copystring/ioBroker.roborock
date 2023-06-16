var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
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
        module49.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      c(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

require('./85');

var module65 = require('./65'),
  module199 = require('./199'),
  module272 = require('./272'),
  module20 = require('./20'),
  PropTypes = require('prop-types'),
  React = require('react'),
  module60 = require('./60'),
  module201 = require('./201'),
  module82 = require('./82'),
  module192 = require('./192'),
  module175 = require('./175'),
  j = module20.ImageLoader,
  module275 = require('./275'),
  P = module12.ImageBackground;

console.warn(JSON.stringify(module12.UIManager));
if (module12.UIManager.MHImageView) P = module12.requireNativeComponent('MHImageView');
else if (module12.UIManager.RRImageView) P = module12.requireNativeComponent('RRImageView');
var z = 1;
var L = s(
  s({}, module272),
  {},
  {
    style: module199(module65),
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
    c = module175(t.source),
    s = module175(t.defaultSource),
    l = module175(t.loadingIndicatorSource);
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
    o = module82([
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
    o = module82([M.base, t.style]);
    u = c;
  }

  var b = t.onLoadStart,
    w = t.onLoad,
    j = t.onLoadEnd,
    z = t.onError,
    L = module192(t, {
      style: o,
      shouldNotifyLoadEvents: !!(b || w || j || z),
      src: u,
      headers: c && c.headers ? c.headers : null,
      defaultSrc: s ? s.uri : null,
      loadingIndicatorSrc: l ? l.uri : null,
      ref: n,
    });
  return (
    <module201.Consumer>
      {function (t) {
        return t ? <module275 /> : <P />;
      }}
    </module201.Consumer>
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

R.resolveAssetSource = module175;
R.propTypes = L;
var M = module60.create({
  base: {
    overflow: 'hidden',
  },
});
module.exports = R;

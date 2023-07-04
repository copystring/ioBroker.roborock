var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49');

function o(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (n)
      c = c.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, c);
  }

  return o;
}

function c(t) {
  for (var c = 1; c < arguments.length; c++) {
    var u = null != arguments[c] ? arguments[c] : {};
    if (c % 2)
      o(Object(u), true).forEach(function (o) {
        module49(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      o(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

require('./85');

var module65 = require('./65'),
  module199 = require('./199'),
  module272 = require('./272'),
  module274 = require('./274'),
  module20 = require('./20'),
  PropTypes = require('prop-types'),
  React = require('react'),
  module60 = require('./60'),
  module201 = require('./201'),
  module82 = require('./82'),
  module192 = require('./192'),
  module175 = require('./175'),
  I = module20.ImageLoader,
  module275 = require('./275'),
  E = 1;

var P = c(
  c({}, module272),
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

var z = function (t, n) {
  var o,
    c,
    u,
    s,
    l = module175(t.source),
    h = module175(t.defaultSource),
    p = module175(t.loadingIndicatorSource);
  if (
    (l && '' === l.uri && console.warn('source.uri should not be an empty string'),
    t.src && console.warn('The <Image> component requires a `source` property rather than `src`.'),
    t.children)
  )
    throw new Error(
      'The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.'
    );
  if (t.defaultSource && t.loadingIndicatorSource)
    throw new Error('The <Image> component cannot have defaultSource and loadingIndicatorSource at the same time. Please use either defaultSource or loadingIndicatorSource.');

  if ((!l || l.uri || Array.isArray(l) || (l = null), null != (null == (o = l) ? undefined : o.uri))) {
    var y = l,
      I = y.width,
      E = y.height;
    u = module82([
      {
        width: I,
        height: E,
      },
      L.base,
      t.style,
    ]);
    s = [
      {
        uri: l.uri,
      },
    ];
  } else {
    u = module82([L.base, t.style]);
    s = l;
  }

  var P = t.onLoadStart,
    z = t.onLoad,
    D = t.onLoadEnd,
    T = t.onError,
    q = module192(t, {
      style: u,
      shouldNotifyLoadEvents: !!(P || z || D || T),
      src: s,
      headers: null == (c = l) ? undefined : c.headers,
      defaultSrc: h ? h.uri : null,
      loadingIndicatorSrc: p ? p.uri : null,
      ref: n,
    });
  return (
    <module201.Consumer>
      {function (t) {
        return t ? <module275 /> : <module274 />;
      }}
    </module201.Consumer>
  );
};

(z = React.forwardRef(z)).displayName = 'Image';

z.getSize = function (t, n, o) {
  return I.getSize(t)
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

z.getSizeWithHeaders = function (t, n, o, c) {
  return I.getSizeWithHeaders(t, n)
    .then(function (t) {
      o(t.width, t.height);
    })
    .catch(
      c ||
        function () {
          console.warn('Failed to get size for image: ' + t);
        }
    );
};

z.prefetch = function (t, n) {
  var o = E++;
  if (n) n(o);
  return I.prefetchImage(t, o);
};

z.abortPrefetch = function (t) {
  I.abortRequest(t);
};

z.queryCache = function (n) {
  return regeneratorRuntime.async(
    function (o) {
      for (;;)
        switch ((o.prev = o.next)) {
          case 0:
            o.next = 2;
            return regeneratorRuntime.awrap(I.queryCache(n));

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

z.resolveAssetSource = module175;
z.propTypes = P;
var L = module60.create({
  base: {
    overflow: 'hidden',
  },
});
module.exports = z;

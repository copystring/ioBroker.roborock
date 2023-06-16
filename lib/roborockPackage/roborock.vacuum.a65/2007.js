var module2008 = require('./2008'),
  React = require('react'),
  module13 = require('./13'),
  module2009 = require('./2009'),
  f =
    (this && this.__spreadArrays) ||
    function () {
      for (var t = 0, n = 0, l = arguments.length; n < l; n++) t += arguments[n].length;

      var u = Array(t),
        o = 0;

      for (n = 0; n < l; n++) for (var f = arguments[n], c = 0, s = f.length; c < s; c++, o++) u[o] = f[c];

      return u;
    };

exports.defaultOriginWhitelist = ['http://*', 'https://*'];

var c = function (t) {
    var n = /^[A-Za-z][A-Za-z0-9+\-.]+:(\/\/)?[^/]*/.exec(t);
    return null === n ? '' : n[0];
  },
  s = function (t) {
    return '^' + module2008.default(t).replace(/\\\*/g, '.*');
  },
  E = function (t, n) {
    var l = c(n);
    return t.some(function (t) {
      return new RegExp(t).test(l);
    });
  },
  h = function (t) {
    return f(['about:blank'], t || []).map(s);
  };

exports.createOnShouldStartLoadWithRequest = function (t, n, l) {
  return function (o) {
    var f = o.nativeEvent,
      c = true,
      s = f.url,
      v = f.lockIdentifier;
    if (E(h(n), s)) {
      if (l) c = l(f);
    } else {
      module13.Linking.canOpenURL(s)
        .then(function (t) {
          if (t) return module13.Linking.openURL(s);
          console.warn("Can't open url: " + s);
        })
        .catch(function (t) {
          console.warn('Error opening URL: ', t);
        });
      c = false;
    }
    t(c, s, v);
  };
};

exports.defaultRenderLoading = function () {
  return React.default.createElement(
    module13.View,
    {
      style: module2009.default.loadingOrErrorView,
    },
    React.default.createElement(module13.ActivityIndicator, null)
  );
};

exports.defaultRenderError = function (t, n, f) {
  return React.default.createElement(
    module13.View,
    {
      style: module2009.default.loadingOrErrorView,
    },
    React.default.createElement(
      module13.Text,
      {
        style: module2009.default.errorTextTitle,
      },
      'Error loading page'
    ),
    React.default.createElement(
      module13.Text,
      {
        style: module2009.default.errorText,
      },
      'Domain: ' + t
    ),
    React.default.createElement(
      module13.Text,
      {
        style: module2009.default.errorText,
      },
      'Error Code: ' + n
    ),
    React.default.createElement(
      module13.Text,
      {
        style: module2009.default.errorText,
      },
      'Description: ' + f
    )
  );
};

var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function s() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (n) {
    return false;
  }
}

var module93 = (function (l, ...args) {
    module7(E, l);

    var p = E,
      f = s(),
      u = function () {
        var n,
          o = module11(p);

        if (f) {
          var s = module11(this).constructor;
          n = Reflect.construct(o, arguments, s);
        } else n = o.apply(this, arguments);

        return module9(this, n);
      };

    function E() {
      var o;
      module4(this, E);
      (o = u.call(this, ...args)).name = '';
      return o;
    }

    return E;
  })(require('./93')(Error)),
  p = 0;

function f(n, o) {
  var module97 = require('./97').default;

  if (module97) {
    var module98 = require('./98')(n),
      s = ++p,
      l = n.message || '',
      f = l;

    if (null != n.componentStack) f += '\n\nThis error is located at:' + n.componentStack;
    var u = null == n.name || '' === n.name ? '' : n.name + ': ',
      E = 'console.error' === n.name;
    if (!f.startsWith(u)) f = u + f;
    if (!E) console._errorOriginal ? console._errorOriginal(f) : console.error(f);
    f = null == n.jsEngine ? f : f + ', js engine: ' + n.jsEngine;
    module97.reportException({
      message: f,
      originalMessage: f === l ? null : l,
      name: null == n.name || '' === n.name ? null : n.name,
      componentStack: 'string' == typeof n.componentStack ? n.componentStack : null,
      stack: module98,
      id: s,
      isFatal: o,
      extraData: {
        jsEngine: n.jsEngine,
        rawStack: n.stack,
        framesPopped: n.framesToPop,
      },
    });
  }
}

function u() {
  if (console.reportErrorsAsExceptions) {
    if (arguments[0] && arguments[0].stack) f(arguments[0], false);
    else {
      console._errorOriginal.apply(console, arguments);

      var module37 = require('./37'),
        o = Array.prototype.map.call(arguments, module37).join(', ');

      if ('"Warning: ' === o.slice(0, 10)) return;
      var t = new module93(o);
      t.name = 'console.error';
      t.framesToPop = (t.framesToPop || 0) + 1;
      f(t, false);
    }
  } else console._errorOriginal.apply(console, arguments);
}

module.exports = {
  handleException: function (n, o) {
    f(n instanceof Error ? n : new module93(n), o);
  },
  installConsoleErrorReporter: function () {
    if (!console._errorOriginal) {
      console._errorOriginal = console.error.bind(console);
      console.error = u;
      if (undefined === console.reportErrorsAsExceptions) console.reportErrorsAsExceptions = true;
    }
  },
  SyntheticError: module93,
};

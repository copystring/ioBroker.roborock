var module49 = require('./49'),
  module329 = require('./329'),
  module330 = require('./330');

function c(n, t) {
  var o = Object.keys(n);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(n);
    if (t)
      s = s.filter(function (t) {
        return Object.getOwnPropertyDescriptor(n, t).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function u(n) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      c(Object(s), true).forEach(function (o) {
        module49.default(n, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(s));
    else
      c(Object(s)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(s, t));
      });
  }

  return n;
}

var f,
  module28 = require('./28'),
  module331 = require('./331'),
  module85 = require('./85'),
  module335 = require('./335'),
  module152 = require('./152'),
  module13 = require('./13'),
  module336 = require('./336'),
  module151 = require('./151'),
  C = {},
  w = 1,
  j = {},
  T = new Map(),
  A = new Map(),
  P = function (n) {
    return n();
  },
  R = false,
  S = {
    setWrapperComponentProvider: function (n) {
      f = n;
    },
    enableFabricIndicator: function (n) {
      R = n;
    },
    registerConfig: function (n) {
      n.forEach(function (n) {
        if (n.run) S.registerRunnable(n.appKey, n.run);
        else {
          module13(null != n.component, 'AppRegistry.registerConfig(...): Every config is expected to set either `run` or `component`, but `%s` has neither.', n.appKey);
          S.registerComponent(n.appKey, n.component, n.section);
        }
      });
    },
    registerComponent: function (n, t, o) {
      var s = module151();
      C[n] = {
        componentProvider: t,
        run: function (n) {
          module336(P(t, s), n.initialProps, n.rootTag, f && f(n), n.fabric, R, s);
        },
      };
      if (o) j[n] = C[n];
      return n;
    },
    registerRunnable: function (n, t) {
      C[n] = {
        run: t,
      };
      return n;
    },
    registerSection: function (n, t) {
      S.registerComponent(n, t, true);
    },
    getAppKeys: function () {
      return Object.keys(C);
    },
    getSectionKeys: function () {
      return Object.keys(j);
    },
    getSections: function () {
      return u({}, j);
    },
    getRunnable: function (n) {
      return C[n];
    },
    getRegistry: function () {
      return {
        sections: S.getSectionKeys(),
        runnables: u({}, C),
      };
    },
    setComponentProviderInstrumentationHook: function (n) {
      P = n;
    },
    runApplication: function (n, t) {
      var o = 'Running "' + n + '" with ' + JSON.stringify(t);
      module152(o);
      module331.addSource('AppRegistry.runApplication' + w++, function () {
        return o;
      });
      module13(
        C[n] && C[n].run,
        '"' +
          n +
          '" has not been registered. This can happen if:\n* Metro (the local dev server) is run from the wrong folder. Check if Metro is running, stop it and restart it in the current project.\n* A module failed to load due to an error and `AppRegistry.registerComponent` wasn\'t called.'
      );
      module335.setActiveScene({
        name: n,
      });
      C[n].run(t);
    },
    unmountApplicationComponentAtRootTag: function (n) {
      module85.unmountComponentAtNodeAndRemoveContainer(n);
    },
    registerHeadlessTask: function (n, t) {
      this.registerCancellableHeadlessTask(n, t, function () {
        return function () {};
      });
    },
    registerCancellableHeadlessTask: function (n, t, o) {
      if (T.has(n)) console.warn("registerHeadlessTask or registerCancellableHeadlessTask called multiple times for same key '" + n + "'");
      T.set(n, t);
      A.set(n, o);
    },
    startHeadlessTask: function (n, t, c) {
      var u = T.get(t);

      if (!u) {
        console.warn('No task registered for key ' + t);
        return void (module329.default && module329.default.notifyTaskFinished(n));
      }

      u()(c)
        .then(function () {
          if (module329.default) module329.default.notifyTaskFinished(n);
        })
        .catch(function (t) {
          console.error(t);
          if (module329.default && t instanceof module330.default)
            module329.default.notifyTaskRetry(n).then(function (t) {
              if (!t) module329.default.notifyTaskFinished(n);
            });
        });
    },
    cancelHeadlessTask: function (n, t) {
      var o = A.get(t);
      if (!o) throw new Error("No task canceller registered for key '" + t + "'");
      o()();
    },
  };

module28.registerCallableModule('AppRegistry', S);
module.exports = S;

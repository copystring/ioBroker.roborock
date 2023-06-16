var module6 = require('./6'),
  module13 = require('./13').NativeModules.RRPluginSDK,
  c = !module13,
  s = null;

if (c) {
  var module413 = require('./413');

  s = module413.Host;
}

var f = (function () {
  function o(n) {
    module6.default(this, o);
    this.executorId = n;
  }

  module7.default(
    o,
    [
      {
        key: 'createJsExecutor',
        value: function () {},
      },
      {
        key: 'remove',
        value: function () {
          if (this.executorId) module13.stopBackground(this.executorId);
        },
      },
      {
        key: 'execute',
        value: function (o) {
          for (var t = this, n = arguments.length, c = new Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) c[s - 1] = arguments[s];

          return new Promise(function (n, s) {
            var l = [];
            if (undefined !== c && c.length > 0) l.push.apply(l, c);
            module13.callJsExecutorWithArray(t.executorId, o, l, function (o, t) {
              if (o) n(t);
              else
                s({
                  error: 'error: ',
                  data: t || 'unknow reason',
                });
            });
          });
        },
      },
    ],
    [
      {
        key: 'createJsExecutor',
        value: function (t) {
          return new Promise(function (n, l) {
            if (c)
              s.createBackgroundExecutor(t, {})
                .then(function (o) {
                  console.log('createBackgroundExecutor res:', o);
                  n(o);
                })
                .catch(function (o) {
                  console.log('createBackgroundExecutor error: ', o);
                  l('XiaoMi - createBackgroundExecutor error: ', o);
                });
            else {
              var module177 = require('./177')(t).uri;

              module13.startBackgroundJsExecutor(module177, function (t, u) {
                if (t && '' != t) {
                  var c = new o(t);
                  n(c);
                } else
                  l({
                    error: 'error: ',
                    data: u || 'unknow reason',
                  });
              });
            }
          });
        },
      },
    ]
  );
  return o;
})();

exports.JsExecutor = f;

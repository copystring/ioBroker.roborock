var module4 = require('./4'),
  module5 = require('./5'),
  module12 = require('./12').NativeModules.RRPluginSDK,
  c = !module12,
  s = null;

if (c) {
  var module405 = require('./405');

  s = module405.Host;
}

var f = (function () {
  function o(u) {
    module4.default(this, o);
    this.executorId = u;
  }

  module5.default(
    o,
    [
      {
        key: 'createJsExecutor',
        value: function () {},
      },
      {
        key: 'remove',
        value: function () {
          if (this.executorId) module12.stopBackground(this.executorId);
        },
      },
      {
        key: 'execute',
        value: function (o, t, u) {
          var c = this;
          return new Promise(function (s, l) {
            var f = [];
            if (undefined !== t) f = [t];
            if (undefined !== u) f = [t, u];
            module12.callJsExecutorWithArray(c.executorId, o, f, function (o, t) {
              if (o) s(t);
              else
                l({
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
          return new Promise(function (u, l) {
            if (c)
              s.createBackgroundExecutor(t, {})
                .then(function (o) {
                  console.log('createBackgroundExecutor res:', o);
                  u(o);
                })
                .catch(function (o) {
                  console.log('createBackgroundExecutor error: ', o);
                  l('XiaoMi - createBackgroundExecutor error: ', o);
                });
            else {
              var module175 = require('./175')(t).uri;

              module12.startBackgroundJsExecutor(module175, function (t, n) {
                if (t && '' != t) {
                  var c = new o(t);
                  u(c);
                } else
                  l({
                    error: 'error: ',
                    data: n || 'unknow reason',
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

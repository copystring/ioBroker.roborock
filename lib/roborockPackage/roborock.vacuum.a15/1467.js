var module1441 = require('./1441'),
  module1440 = (globals = require('./1440'))['__core-js_shared__'] || (globals['__core-js_shared__'] = {});

(module.exports = function (o, _) {
  return module1440[o] || (module1440[o] = undefined !== _ ? _ : {});
})('versions', []).push({
  version: module1441.version,
  mode: require('./1468') ? 'pure' : 'global',
  copyright: '\xa9 2019 Denis Pushkarev (zloirock.ru)',
});

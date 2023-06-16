var module1226 = require('./1226'),
  module1225 = (globals = require('./1225'))['__core-js_shared__'] || (globals['__core-js_shared__'] = {});

(module.exports = function (o, _) {
  return module1225[o] || (module1225[o] = undefined !== _ ? _ : {});
})('versions', []).push({
  version: module1226.version,
  mode: require('./1253') ? 'pure' : 'global',
  copyright: '\xa9 2019 Denis Pushkarev (zloirock.ru)',
});

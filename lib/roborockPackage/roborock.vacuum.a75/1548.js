var module1522 = require('./1522'),
  module1521 = (globals = require('./1521'))['__core-js_shared__'] || (globals['__core-js_shared__'] = {});

(module.exports = function (o, _) {
  return module1521[o] || (module1521[o] = undefined !== _ ? _ : {});
})('versions', []).push({
  version: module1522.version,
  mode: require('./1549') ? 'pure' : 'global',
  copyright: '\xa9 2019 Denis Pushkarev (zloirock.ru)',
});

var module1523 = require('./1523'),
  module1522 = (globals = require('./1522'))['__core-js_shared__'] || (globals['__core-js_shared__'] = {});

(module.exports = function (o, _) {
  return module1522[o] || (module1522[o] = undefined !== _ ? _ : {});
})('versions', []).push({
  version: module1523.version,
  mode: require('./1550') ? 'pure' : 'global',
  copyright: '\xa9 2019 Denis Pushkarev (zloirock.ru)',
});

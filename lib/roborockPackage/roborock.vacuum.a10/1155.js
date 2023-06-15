var module1129 = require('./1129'),
  module1128 = (globals = require('./1128'))['__core-js_shared__'] || (globals['__core-js_shared__'] = {});

(module.exports = function (o, _) {
  return module1128[o] || (module1128[o] = undefined !== _ ? _ : {});
})('versions', []).push({
  version: module1129.version,
  mode: require('./1156') ? 'pure' : 'global',
  copyright: '\xa9 2020 Denis Pushkarev (zloirock.ru)',
});

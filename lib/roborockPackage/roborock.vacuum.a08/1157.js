var module1131 = require('./1131'),
  module1130 = (globals = require('./1130'))['__core-js_shared__'] || (globals['__core-js_shared__'] = {});

(module.exports = function (o, _) {
  return module1130[o] || (module1130[o] = undefined !== _ ? _ : {});
})('versions', []).push({
  version: module1131.version,
  mode: require('./1158') ? 'pure' : 'global',
  copyright: '\xa9 2020 Denis Pushkarev (zloirock.ru)',
});

var module1516 = require('./1516'),
  module1515 = (globals = require('./1515'))['__core-js_shared__'] || (globals['__core-js_shared__'] = {});

(module.exports = function (o, _) {
  return module1515[o] || (module1515[o] = undefined !== _ ? _ : {});
})('versions', []).push({
  version: module1516.version,
  mode: require('./1543') ? 'pure' : 'global',
  copyright: '\xa9 2019 Denis Pushkarev (zloirock.ru)',
});

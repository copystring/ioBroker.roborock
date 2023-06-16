var module1443 = require('./1443'),
  module1442 = (globals = require('./1442'))['__core-js_shared__'] || (globals['__core-js_shared__'] = {});

(module.exports = function (o, _) {
  return module1442[o] || (module1442[o] = undefined !== _ ? _ : {});
})('versions', []).push({
  version: module1443.version,
  mode: require('./1470') ? 'pure' : 'global',
  copyright: '\xa9 2019 Denis Pushkarev (zloirock.ru)',
});

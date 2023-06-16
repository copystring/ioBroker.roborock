var module20 = require('./20'),
  c = module20.get('AsyncSQLiteDBStorage') || module20.get('AsyncLocalStorage');

exports.default = c;

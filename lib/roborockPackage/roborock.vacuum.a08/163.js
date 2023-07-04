var module92 = require('./92');

module.exports = {
  showErrorDialog: function (o) {
    var t,
      c = o.componentStack,
      p = o.error;
    t = p instanceof Error ? p : 'string' == typeof p ? new module92.SyntheticError(p) : new module92.SyntheticError('Unspecified error');

    try {
      t.componentStack = c;
    } catch (n) {}

    module92.handleException(t, false);
    return false;
  },
};

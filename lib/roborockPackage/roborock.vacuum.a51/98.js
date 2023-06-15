require('./52');

var module20 = require('./20'),
  n = module20.getEnforcing('ExceptionsManager'),
  p = {
    reportFatalException: function (t, o, p) {
      n.reportFatalException(t, o, p);
    },
    reportSoftException: function (t, o, p) {
      n.reportSoftException(t, o, p);
    },
    updateExceptionMessage: function (t, o, p) {
      n.updateExceptionMessage(t, o, p);
    },
    dismissRedbox: function () {
      if (n.dismissRedbox) n.dismissRedbox();
    },
    reportException: function (t) {
      if (n.reportException) n.reportException(t);
      else if (t.isFatal) p.reportFatalException(t.message, t.stack, t.id);
      else p.reportSoftException(t.message, t.stack, t.id);
    },
  },
  s = p;

exports.default = s;

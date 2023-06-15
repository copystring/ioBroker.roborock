require('./13');

var n = false,
  t = 0,
  c = {
    installReactHook: function () {
      true;
    },
    setEnabled: function (t) {
      if (n !== t) n = t;
    },
    isEnabled: function () {
      return n;
    },
    beginEvent: function (t, c) {
      if (n) {
        t = 'function' == typeof t ? t() : t;
        globals.nativeTraceBeginSection(131072, t, c);
      }
    },
    endEvent: function () {
      if (n) globals.nativeTraceEndSection(131072);
    },
    beginAsyncEvent: function (c) {
      var o = t;

      if (n) {
        t++;
        c = 'function' == typeof c ? c() : c;
        globals.nativeTraceBeginAsyncSection(131072, c, o);
      }

      return o;
    },
    endAsyncEvent: function (t, c) {
      if (n) {
        t = 'function' == typeof t ? t() : t;
        globals.nativeTraceEndAsyncSection(131072, t, c);
      }
    },
    counterEvent: function (t, c) {
      if (n) {
        t = 'function' == typeof t ? t() : t;
        if (globals.nativeTraceCounter) globals.nativeTraceCounter(131072, t, c);
      }
    },
  };
module.exports = c;

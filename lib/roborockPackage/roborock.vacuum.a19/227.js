require('./152');

var module28 = require('./28'),
  module42 = require('./42'),
  module228 = require('./228'),
  module13 = require('./13'),
  module208 = require('./208'),
  u = new module42(),
  l = {
    Events: module208({
      interactionStart: true,
      interactionComplete: true,
    }),
    runAfterInteractions: function (n) {
      var t = [],
        o = new Promise(function (o) {
          k();
          if (n) t.push(n);
          t.push({
            run: o,
            name: 'resolve ' + ((n && n.name) || '?'),
          });
          h.enqueueTasks(t);
        });
      return {
        then: o.then.bind(o),
        done: function () {
          if (o.done) return o.done.apply(o, arguments);
          console.warn('Tried to call done when not supported by current Promise implementation.');
        },
        cancel: function () {
          h.cancelTasks(t);
        },
      };
    },
    createInteractionHandle: function () {
      k();
      var n = ++T;
      p.add(n);
      return n;
    },
    clearInteractionHandle: function (n) {
      module13(!!n, 'InteractionManager: Must provide a handle to clear.');
      k();
      p.delete(n);
      v.add(n);
    },
    addListener: u.addListener.bind(u),
    setDeadline: function (n) {
      E = n;
    },
  },
  f = new Set(),
  p = new Set(),
  v = new Set(),
  h = new module228({
    onMoreTasks: k,
  }),
  w = 0,
  T = 0,
  E = -1;

function k() {
  if (!w) w = E > 0 ? setTimeout(I, 0) : setImmediate(I);
}

function I() {
  w = 0;
  var t = f.size;
  p.forEach(function (n) {
    return f.add(n);
  });
  v.forEach(function (n) {
    return f.delete(n);
  });
  var o = f.size;
  if ((0 !== t && 0 === o ? u.emit(l.Events.interactionComplete) : 0 === t && 0 !== o && u.emit(l.Events.interactionStart), 0 === o))
    for (; h.hasTasksToProcess(); )
      if ((h.processNext(), E > 0 && module28.getEventLoopRunningTime() >= E)) {
        k();
        break;
      }
  p.clear();
  v.clear();
}

module.exports = l;

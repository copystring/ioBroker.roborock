var module50 = require('./50'),
  module6 = require('./6');

function s(t, n) {
  var u = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    u.push.apply(u, s);
  }

  return u;
}

function o(n) {
  for (var u = 1; u < arguments.length; u++) {
    var o = null != arguments[u] ? arguments[u] : {};
    if (u % 2)
      s(Object(o), true).forEach(function (u) {
        module50(n, u, o[u]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(o));
    else
      s(Object(o)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(o, t));
      });
  }

  return n;
}

require('./154');

var module14 = require('./14');

class h {
  constructor(u) {
    var s = u.onMoreTasks;
    module6(this, t);
    this._onMoreTasks = s;
    this._queueStack = [
      {
        tasks: [],
        popable: false,
      },
    ];
  }

  enqueue(t) {
    this._getCurrentQueue().push(t);
  }

  enqueueTasks(t) {
    var n = this;
    t.forEach(function (t) {
      return n.enqueue(t);
    });
  }

  cancelTasks(t) {
    this._queueStack = this._queueStack
      .map(function (n) {
        return o(
          o({}, n),
          {},
          {
            tasks: n.tasks.filter(function (n) {
              return -1 === t.indexOf(n);
            }),
          }
        );
      })
      .filter(function (t, n) {
        return t.tasks.length > 0 || 0 === n;
      });
  }

  hasTasksToProcess() {
    return this._getCurrentQueue().length > 0;
  }

  processNext() {
    var t = this._getCurrentQueue();

    if (t.length) {
      var n = t.shift();

      try {
        if (n.gen) this._genPromise(n);
        else if (n.run) n.run();
        else {
          module14('function' == typeof n, 'Expected Function, SimpleTask, or PromiseTask, but got:\n' + JSON.stringify(n, null, 2));
          n();
        }
      } catch (t) {
        throw ((t.message = 'TaskQueue: Error with task ' + (n.name || '') + ': ' + t.message), t);
      }
    }
  }

  _getCurrentQueue() {
    var t = this._queueStack.length - 1,
      n = this._queueStack[t];

    if (n.popable && 0 === n.tasks.length && this._queueStack.length > 1) {
      this._queueStack.pop();

      return this._getCurrentQueue();
    } else return n.tasks;
  }

  _genPromise(t) {
    var n = this;

    this._queueStack.push({
      tasks: [],
      popable: false,
    });

    var u = this._queueStack.length - 1;
    t.gen()
      .then(function () {
        n._queueStack[u].popable = true;
        if (n.hasTasksToProcess()) n._onMoreTasks();
      })
      .catch(function (n) {
        throw ((n.message = 'TaskQueue: Error resolving Promise in task ' + t.name + ': ' + n.message), n);
      })
      .done();
  }
}

module.exports = h;

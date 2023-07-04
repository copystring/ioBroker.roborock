var module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5');

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
        module49(n, u, o[u]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(o));
    else
      s(Object(o)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(o, t));
      });
  }

  return n;
}

require('./152');

var module13 = require('./13'),
  h = (function () {
    function t(u) {
      var s = u.onMoreTasks;
      module4(this, t);
      this._onMoreTasks = s;
      this._queueStack = [
        {
          tasks: [],
          popable: false,
        },
      ];
    }

    module5(t, [
      {
        key: 'enqueue',
        value: function (t) {
          this._getCurrentQueue().push(t);
        },
      },
      {
        key: 'enqueueTasks',
        value: function (t) {
          var n = this;
          t.forEach(function (t) {
            return n.enqueue(t);
          });
        },
      },
      {
        key: 'cancelTasks',
        value: function (t) {
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
        },
      },
      {
        key: 'hasTasksToProcess',
        value: function () {
          return this._getCurrentQueue().length > 0;
        },
      },
      {
        key: 'processNext',
        value: function () {
          var t = this._getCurrentQueue();

          if (t.length) {
            var n = t.shift();

            try {
              if (n.gen) this._genPromise(n);
              else if (n.run) n.run();
              else {
                module13('function' == typeof n, 'Expected Function, SimpleTask, or PromiseTask, but got:\n' + JSON.stringify(n, null, 2));
                n();
              }
            } catch (t) {
              throw ((t.message = 'TaskQueue: Error with task ' + (n.name || '') + ': ' + t.message), t);
            }
          }
        },
      },
      {
        key: '_getCurrentQueue',
        value: function () {
          var t = this._queueStack.length - 1,
            n = this._queueStack[t];

          if (n.popable && 0 === n.tasks.length && this._queueStack.length > 1) {
            this._queueStack.pop();

            return this._getCurrentQueue();
          } else return n.tasks;
        },
      },
      {
        key: '_genPromise',
        value: function (t) {
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
        },
      },
    ]);
    return t;
  })();

module.exports = h;

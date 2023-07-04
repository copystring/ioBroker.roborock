var module4 = require('./4'),
  module5 = require('./5'),
  module13 = require('./13'),
  v = (function () {
    function v() {
      module4(this, v);
      this._heldEvents = {};
      this._currentEventKey = null;
    }

    module5(v, [
      {
        key: 'holdEvent',
        value: function (t) {
          this._heldEvents[t] = this._heldEvents[t] || [];

          for (
            var n = this._heldEvents[t],
              s = {
                eventType: t,
                index: n.length,
              },
              v = arguments.length,
              h = new Array(v > 1 ? v - 1 : 0),
              u = 1;
            u < v;
            u++
          )
            h[u - 1] = arguments[u];

          n.push(h);
          return s;
        },
      },
      {
        key: 'emitToListener',
        value: function (t, n, s) {
          var v = this,
            h = this._heldEvents[t];

          if (h) {
            var u = this._currentEventKey;
            h.forEach(function (h, u) {
              if (h) {
                v._currentEventKey = {
                  eventType: t,
                  index: u,
                };
                n.apply(s, h);
              }
            });
            this._currentEventKey = u;
          }
        },
      },
      {
        key: 'releaseCurrentEvent',
        value: function () {
          module13(null !== this._currentEventKey, 'Not in an emitting cycle; there is no current event');
          if (this._currentEventKey) this.releaseEvent(this._currentEventKey);
        },
      },
      {
        key: 'releaseEvent',
        value: function (t) {
          delete this._heldEvents[t.eventType][t.index];
        },
      },
      {
        key: 'releaseEventType',
        value: function (t) {
          this._heldEvents[t] = [];
        },
      },
    ]);
    return v;
  })();

module.exports = v;

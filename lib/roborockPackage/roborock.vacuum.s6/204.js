var module13 = require('./13'),
  n = function (t) {
    if (this.instancePool.length) {
      var n = this.instancePool.pop();
      this.call(n, t);
      return n;
    }

    return new this(t);
  },
  o = function (n) {
    module13(n instanceof this, 'Trying to release an instance into a pool of a different type.');
    n.destructor();
    if (this.instancePool.length < this.poolSize) this.instancePool.push(n);
  },
  s = n,
  l = {
    addPoolingTo: function (t, n) {
      var l = t;
      l.instancePool = [];
      l.getPooled = n || s;
      if (!l.poolSize) l.poolSize = 10;
      l.release = o;
      return l;
    },
    oneArgumentPooler: n,
    twoArgumentPooler: function (t, n) {
      if (this.instancePool.length) {
        var o = this.instancePool.pop();
        this.call(o, t, n);
        return o;
      }

      return new this(t, n);
    },
    threeArgumentPooler: function (t, n, o) {
      if (this.instancePool.length) {
        var s = this.instancePool.pop();
        this.call(s, t, n, o);
        return s;
      }

      return new this(t, n, o);
    },
    fourArgumentPooler: function (t, n, o, s) {
      if (this.instancePool.length) {
        var l = this.instancePool.pop();
        this.call(l, t, n, o, s);
        return l;
      }

      return new this(t, n, o, s);
    },
  };

module.exports = l;

var module206 = require('./206'),
  o = module206.twoArgumentPooler;

function n(t, o) {
  this.width = t;
  this.height = o;
}

n.prototype.destructor = function () {
  this.width = null;
  this.height = null;
};

n.getPooledFromElement = function (t) {
  return n.getPooled(t.offsetWidth, t.offsetHeight);
};

module206.addPoolingTo(n, o);
module.exports = n;

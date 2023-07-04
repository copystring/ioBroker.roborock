var module204 = require('./204'),
  o = module204.twoArgumentPooler;

function n(t, o) {
  this.left = t;
  this.top = o;
}

n.prototype.destructor = function () {
  this.left = null;
  this.top = null;
};

module204.addPoolingTo(n, o);
module.exports = n;

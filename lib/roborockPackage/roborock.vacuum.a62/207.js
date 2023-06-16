var module206 = require('./206'),
  o = module206.twoArgumentPooler;

function n(t, o) {
  this.left = t;
  this.top = o;
}

n.prototype.destructor = function () {
  this.left = null;
  this.top = null;
};

module206.addPoolingTo(n, o);
module.exports = n;

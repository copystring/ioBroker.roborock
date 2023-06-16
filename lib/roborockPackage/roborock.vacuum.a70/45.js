var module6 = require('./6');

class n {
  constructor(s) {
    module6(this, n);
    this.subscriber = s;
  }

  remove() {
    this.subscriber.removeSubscription(this);
  }
}

module.exports = n;
